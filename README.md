# 🚀 Portfolio — Fawas Thongkham

เว็บไซต์พอร์ตโฟลิโอส่วนตัว สร้างด้วย React + TypeScript + Tailwind CSS รวบรวมผลงาน ประสบการณ์ และทักษะทั้งหมดไว้ในที่เดียว

## ✨ ฟีเจอร์หลัก

- 🌗 **Dark / Light Mode** — สลับธีมได้ พร้อมตั้งค่าอัตโนมัติตามเวลา (กลางวัน/กลางคืน)
- 🌐 **รองรับ 2 ภาษา** — ไทย / อังกฤษ สลับได้ทันที
- 📱 **Responsive** — รองรับทุกขนาดหน้าจอ ทั้งมือถือ แท็บเล็ต และเดสก์ท็อป
- 🎞️ **Slide Gallery** — กดดูรายละเอียดโปรเจกต์แต่ละตัว พร้อมรูปสไลด์และ Workflow
- ⚡ **Smooth Scroll** — แอนิเมชันเลื่อนหน้าลื่นไหล ไม่กระตุก
- 📄 **ดาวน์โหลด Resume** — กดดาวน์โหลด Resume ได้โดยตรง

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| **React 19** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS 4** | Styling |
| **Vite 6** | Build Tool & Dev Server |
| **Motion (Framer Motion)** | แอนิเมชัน |
| **React Icons** | ไอคอนต่าง ๆ |
| **Lucide React** | ไอคอนเพิ่มเติม |
| **Lottie** | แอนิเมชัน Lottie |

## 📁 โครงสร้างโปรเจกต์

```
Portfolio/
├── components/           # คอมโพเนนต์ทั้งหมด
│   ├── Header.tsx        # เมนูด้านบน + สลับธีม/ภาษา
│   ├── Hero.tsx          # หน้าแรก แนะนำตัว
│   ├── About.tsx         # เกี่ยวกับตัวเอง + ทักษะ
│   ├── Projects.tsx      # ผลงานโปรเจกต์ทั้งหมด
│   ├── ProjectModal.tsx  # Modal แสดงรายละเอียดโปรเจกต์
│   ├── Experience.tsx    # ประสบการณ์ด้านเทคนิค
│   ├── WorkExperience.tsx # ประสบการณ์ฝึกงาน
│   ├── Contact.tsx       # ข้อมูลติดต่อ
│   ├── Footer.tsx        # ส่วนท้ายเว็บ
│   └── ScrollToTopButton.tsx # ปุ่มเลื่อนกลับด้านบน
├── public/
│   ├── logoicon/         # ไอคอนโลโก้ต่าง ๆ
│   ├── logoprofile/      # รูปโปรไฟล์ + Resume PDF
│   └── project-slides/   # รูปสไลด์โปรเจกต์ทั้งหมด
├── App.tsx               # คอมโพเนนต์หลัก
├── index.tsx             # Entry Point
├── index.css             # Global Styles + Tailwind
├── translations.ts       # ข้อความภาษาไทย/อังกฤษ
├── LanguageContext.tsx   # Context สำหรับสลับภาษา
├── vite.config.ts        # ตั้งค่า Vite
├── vercel.json           # ตั้งค่า Vercel Deploy
└── package.json
```

## 📂 ผลงานที่แสดงในเว็บ

| โปรเจกต์ | คำอธิบาย |
|---------|----------|
| **RecommendationsAI** | เว็บ AI แนะนำร้านอาหาร/ท่องเที่ยวจากรีวิว Google Maps ด้วย OpenAI |
| **Social Listening Dashboard** | แดชบอร์ดวิเคราะห์กระแสแบรนด์บนโซเชียลด้วย Zocial Eye + Tableau |
| **Bot Creates File Banner** | Chatbot สร้างเอกสารไฟล์ขอ LINE Beacon Banner อัตโนมัติ |
| **GeoCheck** | ระบบเช็คอินพนักงานภาคสนามด้วย GPS + รูปถ่าย + Telegram |

## 🚀 วิธีรันในเครื่อง

**ต้องติดตั้ง:** [Node.js](https://nodejs.org/) (v18 ขึ้นไป)

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รันเว็บ
npm run dev
```

เว็บจะเปิดที่ `http://localhost:3000`

## 📦 วิธี Build

```bash
npm run build
```

ไฟล์ที่ build จะอยู่ในโฟลเดอร์ `dist/`

## 🌐 Deploy ขึ้น Vercel

1. Push โค้ดขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → **Import Project** → เลือก repo
3. Vercel จะตรวจจับ Vite อัตโนมัติ
4. กด **Deploy** ✅

## 📬 ติดต่อ

- 📧 Email: fawas1997s@gmail.com
- 📱 Line: fa.shanks
- 🐙 GitHub: [Fawas1997](https://github.com/Fawas1997)

---

สร้างด้วย ❤ โดย **Fawas Thongkham**
