import json
import logging
import os
import sys

# === LOGGING SETUP ===
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# === Robust Path Searching ===
current_dir = os.path.dirname(os.path.abspath(__file__))
package_dir = os.path.join(current_dir, "package")

if not os.path.exists(package_dir):
    for entry in os.listdir(current_dir):
        potential_path = os.path.join(current_dir, entry, "package")
        if os.path.isdir(potential_path):
            package_dir = potential_path
            break

if os.path.exists(package_dir):
    sys.path.insert(0, package_dir)

# Import external libraries
try:
    from groq import Groq
    from pinecone import Pinecone
    import cohere
    logger.info("✅ Successfully imported all external libraries.")
except ImportError as e:
    logger.error(f"❌ Failed to import library: {e}")
    raise e

# === Environment Variables ===
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY', '')
PINECONE_INDEX_NAME = os.environ.get('PINECONE_INDEX_NAME', '')
COHERE_API_KEY = os.environ.get('COHERE_API_KEY', '')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')

# Allowed origins for CORS (update with your actual domain)
ALLOWED_ORIGINS = [
    'https://www.portfoliofawas.xyz',
    'https://portfoliofawas.xyz',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
]

# === Initialize Clients (top-level for Lambda warm starts) ===
pine_pc = Pinecone(api_key=PINECONE_API_KEY)
pinecone_index = pine_pc.Index(PINECONE_INDEX_NAME) if PINECONE_INDEX_NAME else None
co = cohere.Client(COHERE_API_KEY)
groq_client = Groq(api_key=GROQ_API_KEY)


def get_cors_headers(event):
    """
    คืนค่า CORS headers โดยตรวจสอบ origin ที่อนุญาต
    """
    origin = ''
    headers = event.get('headers', {})
    if headers:
        origin = headers.get('origin', '') or headers.get('Origin', '')
    
    allowed = origin if origin in ALLOWED_ORIGINS else ALLOWED_ORIGINS[0]
    
    return {
        'Access-Control-Allow-Origin': allowed,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }


def lambda_handler(event, context):
    """
    AWS Lambda Handler สำหรับ Web Portfolio Chatbot (ไม่ใช่ LINE Bot)
    รับ POST { message, language } → ตอบ { response }
    """
    cors_headers = get_cors_headers(event)
    
    # Handle CORS preflight
    http_method = event.get('httpMethod', '') or event.get('requestContext', {}).get('http', {}).get('method', '')
    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'message': 'OK'})
        }
    
    try:
        # Parse body
        body = event.get('body', '{}')
        if isinstance(body, str):
            body = json.loads(body)
        
        user_message = body.get('message', '').strip()
        language = body.get('language', 'th')
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Message is required'})
            }
        
        logger.info(f"Received message: {user_message} (lang: {language})")
        
        # === Step 1: สร้าง Embeddings ด้วย Cohere ===
        embeddings_response = co.embed(
            texts=[user_message],
            model='embed-multilingual-v3.0',
            input_type='search_query'
        )
        query_embedding = embeddings_response.embeddings[0]
        
        # === Step 2: ค้นหาใน Pinecone ===
        search_results = pinecone_index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )
        
        matches = search_results.get('matches', [])
        logger.info(f"Pinecone returned {len(matches)} matches")
        
        # === Step 3: ถ้า score > 0.95 → ตอบตรงเลย (ประหยัด LLM token) ===
        exact_match = next((m for m in matches if m['score'] > 0.95), None)
        if exact_match:
            answer = exact_match['metadata'].get('answer', '')
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({'response': answer}, ensure_ascii=False)
            }
        
        # === Step 4: RAG - สร้าง prompt จาก FAQ + Groq ===
        if matches:
            faq_texts = []
            for m in matches:
                metadata = m.get('metadata', {})
                q = metadata.get('question', '')
                a = metadata.get('answer', '')
                if q and a:
                    faq_texts.append(f"คำถาม: {q}\nคำตอบ: {a}")
            
            relevant_faqs = "\n\n".join(faq_texts)
            
            system_prompt = f"""คุณคือ WasBot ผู้ช่วย AI ประจำพอร์ตโฟลิโอของ ฟาวาซร์ ทองคำ (Fawas Thongkham) 
คุณมีหน้าที่ตอบคำถามเกี่ยวกับผลงาน ประสบการณ์ฝึกงาน ทักษะ และข้อมูลส่วนตัวของฟาวาซร์เท่านั้น

ใช้ข้อมูลต่อไปนี้ในการตอบคำถาม:

{relevant_faqs}

กฎการตอบ:
- ตอบเป็นภาษา{"ไทย" if language == "th" else "อังกฤษ"}
- ให้ข้อมูลที่ชัดเจน กระชับ ตรงประเด็น
- ถ้าถามเรื่องโปรเจกต์ ให้เน้น Tech Stack, หน้าที่, ผลลัพธ์
- รักษาน้ำเสียงเป็นมิตร สุภาพ เป็นมืออาชีพ
- ใช้ emoji ได้บ้างเพื่อความเป็นกันเอง
- ใช้ **bold** สำหรับหัวข้อสำคัญ
- หากไม่มีข้อมูลเพียงพอ ให้บอกตรงๆ ว่าไม่มีข้อมูลและแนะนำให้ถามเรื่องอื่น"""

            chat_completion = groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            ai_response = chat_completion.choices[0].message.content.strip()
            
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({'response': ai_response}, ensure_ascii=False)
            }
        
        # === Step 5: ไม่เจอข้อมูลเลย ===
        else:
            fallback = (
                "ขออภัยครับ ผมไม่มีข้อมูลเกี่ยวกับคำถามนี้ 😅\nลองถามเกี่ยวกับ:\n- 📁 ผลงานโปรเจกต์\n- 💼 ประสบการณ์ฝึกงาน\n- 🛠️ ทักษะเทคนิค\n- 📬 ช่องทางติดต่อ"
                if language == 'th' else
                "Sorry, I don't have information about that 😅\nTry asking about:\n- 📁 Projects\n- 💼 Internship experience\n- 🛠️ Technical skills\n- 📬 Contact info"
            )
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({'response': fallback}, ensure_ascii=False)
            }
    
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        error_msg = (
            "ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง 🙏"
            if 'th' in str(event.get('body', ''))
            else "Sorry, an error occurred. Please try again 🙏"
        )
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': error_msg}, ensure_ascii=False)
        }
