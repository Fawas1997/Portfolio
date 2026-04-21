import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

// ==================== Types ====================
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ==================== API Configuration ====================
// 🔧 เปลี่ยน URL นี้เป็น API Gateway URL จริงหลัง deploy Lambda
const API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'https://YOUR_API_GATEWAY_ID.execute-api.ap-southeast-1.amazonaws.com/chat';

// ==================== AI Response Engine (RAG via AWS Lambda) ====================
const generateResponse = async (messages: Message[], language: string): Promise<string> => {
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  const isThai = language === 'th';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: lastUserMessage,
        language: language,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      return data.error;
    }

    return data.response || (isThai
      ? 'ขออภัยครับ ไม่สามารถประมวลผลได้ในขณะนี้ 🙏'
      : 'Sorry, unable to process your request right now 🙏');

  } catch (error: any) {
    console.error('Chatbot API error:', error);

    if (error.name === 'AbortError') {
      return isThai
        ? '⏳ ขออภัยครับ การตอบใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง'
        : '⏳ Sorry, the response timed out. Please try again.';
    }

    return isThai
      ? '❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่ภายหลัง\n\nหากต้องการติดต่อโดยตรง:\n📧 Email: fawas1997s@gmail.com\n📱 Line: fa.shanks'
      : '❌ Unable to connect to the server. Please try again later.\n\nFor direct contact:\n📧 Email: fawas1997s@gmail.com\n📱 Line: fa.shanks';
  }
};

// ==================== Markdown-like renderer ====================
const renderContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // Bold text **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i} className="block">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
          }
          // Inline link [text](url)
          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            return (
              <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300 transition-colors">
                {linkMatch[1]}
              </a>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </span>
    );
  });
};

// ==================== Typing Indicator ====================
const TypingIndicator: React.FC = () => (
  <div className="flex items-end gap-3 mb-4">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="4" x2="20" y2="9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="3" r="2.5" fill="#93c5fd" />
        <rect x="8" y="9" width="24" height="16" rx="5" fill="white" opacity="0.95" />
        <ellipse cx="15" cy="16" rx="4" ry="3.5" fill="#1d4ed8" opacity="0.9" />
        <ellipse cx="25" cy="16" rx="4" ry="3.5" fill="#1d4ed8" opacity="0.9" />
        <ellipse cx="15" cy="16" rx="2.5" ry="2.2" fill="#93c5fd" />
        <ellipse cx="25" cy="16" rx="2.5" ry="2.2" fill="#93c5fd" />
        <circle cx="15" cy="16" r="1" fill="white" />
        <circle cx="25" cy="16" r="1" fill="white" />
        <path d="M14 21.5 Q20 25 26 21.5" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <rect x="11" y="26" width="18" height="10" rx="4" fill="white" opacity="0.85" />
        <circle cx="16" cy="31" r="1.8" fill="#60a5fa" />
        <circle cx="20" cy="31" r="1.8" fill="#93c5fd" />
        <circle cx="24" cy="31" r="1.8" fill="#60a5fa" />
        <rect x="4" y="27" width="6" height="8" rx="3" fill="white" opacity="0.8" />
        <rect x="30" y="27" width="6" height="8" rx="3" fill="white" opacity="0.8" />
      </svg>
    </div>
    <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl rounded-bl-none px-4 py-3 backdrop-blur-sm">
      <div className="flex gap-1.5 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400"
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  </div>
);

// ==================== Quick Suggestion Chips ====================
const suggestions = {
  th: ['📁 ดูผลงานทั้งหมด', '💼 ประสบการณ์ฝึกงาน', '🛠️ ทักษะสำคัญ', '📬 ช่องทางติดต่อ'],
  en: ['📁 View all projects', '💼 Internship experience', '🛠️ Key skills', '📬 Contact info'],
};

// ==================== Main Component ====================
const AIChatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isThai = language === 'th';

  // Scroll detection for mobile position switch
  useEffect(() => {
    const mainScroll = document.getElementById('main-scroll-container');
    if (!mainScroll) return;
    const handleScroll = () => {
      setScrolledPastHero(mainScroll.scrollTop > 300);
    };
    mainScroll.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainScroll.removeEventListener('scroll', handleScroll);
  }, []);

  // Welcome message
  useEffect(() => {
    const welcome: Message = {
      id: 'welcome',
      role: 'assistant',
      content: isThai
        ? 'สวัสดีครับ! 👋 ผมชื่อ **WasBot** ผู้ช่วย AI ของฟาวาซร์\nสามารถถามเกี่ยวกับผลงาน ประสบการณ์ หรือทักษะของเขาได้เลยครับ 😊'
        : "Hi there! 👋 I'm **WasBot**, Fawas's AI assistant!\nAsk me anything about his projects, experience, or skills! 😊",
      timestamp: new Date(),
    };
    setMessages([welcome]);
  }, [language]);

  // Auto scroll
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowPulse(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay
    const delay = 800 + Math.random() * 600;
    await new Promise(resolve => setTimeout(resolve, delay));

    const newMessages = [...messages, userMsg];
    const responseText = await generateResponse(newMessages, language);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  }, [input, isTyping, messages, language]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ======== Floating Button ======== */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-[70] group transition-all duration-500 ease-in-out md:bottom-24 md:right-32 ${scrolledPastHero ? 'bottom-32 right-6' : 'top-[108px] right-6 md:top-auto md:right-32'}`}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.88 }}
        aria-label="Open AI Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.22, ease: 'backOut' }}
              className="relative w-11 h-11 md:w-14 md:h-14 flex items-center justify-center"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="robot"
              initial={{ rotate: 20, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -20, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.25, ease: 'backOut' }}
              className="relative"
            >
              {/* Thinking robot - standalone SVG */}
              <div className="animate-robot-float w-11 h-11 md:w-14 md:h-14 flex items-center justify-center">
                <svg className="w-11 h-11 md:w-14 md:h-14 animate-robot-think drop-shadow-[0_4px_20px_rgba(37,99,235,0.5)]" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Antenna */}
                  <line x1="24" y1="6" x2="24" y2="12" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="24" cy="5" r="3" fill="#3b82f6" className="animate-pulse" />
                  <circle cx="24" cy="5" r="5" fill="#3b82f6" opacity="0.25" className="animate-ping" />

                  {/* Head */}
                  <rect x="8" y="12" width="32" height="20" rx="7" fill="#2563eb" />
                  <rect x="9.5" y="13.5" width="29" height="17" rx="5.5" fill="#3b82f6" />
                  {/* Head shine */}
                  <rect x="12" y="14" width="20" height="4" rx="2" fill="#93c5fd" opacity="0.4" />

                  {/* Eyes - left */}
                  <ellipse cx="17" cy="22" rx="4.5" ry="4" fill="#1e3a8a" />
                  <ellipse cx="17" cy="22" rx="3.2" ry="2.8" fill="#93c5fd" />
                  <circle cx="18" cy="21" r="1.2" fill="white" />
                  {/* Eyes - right */}
                  <ellipse cx="31" cy="22" rx="4.5" ry="4" fill="#1e3a8a" />
                  <ellipse cx="31" cy="22" rx="3.2" ry="2.8" fill="#93c5fd" />
                  <circle cx="32" cy="21" r="1.2" fill="white" />

                  {/* Smile */}
                  <path d="M18 28 Q24 33 30 28" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Body */}
                  <rect x="14" y="34" width="20" height="12" rx="5" fill="#2563eb" />
                  <rect x="15.5" y="35.5" width="17" height="9" rx="3.5" fill="#3b82f6" />
                  {/* Chest lights */}
                  <circle cx="20" cy="40" r="2" fill="#93c5fd" className="animate-pulse" />
                  <circle cx="24" cy="40" r="2" fill="#60a5fa" />
                  <circle cx="28" cy="40" r="2" fill="#93c5fd" className="animate-pulse" />

                  {/* Left arm */}
                  <rect x="4" y="35" width="8" height="10" rx="4" fill="#2563eb" />
                  <rect x="5" y="36" width="6" height="8" rx="3" fill="#3b82f6" />
                  {/* Right arm */}
                  <rect x="36" y="35" width="8" height="10" rx="4" fill="#2563eb" />
                  <rect x="37" y="36" width="6" height="8" rx="3" fill="#3b82f6" />
                </svg>
              </div>

              {/* Thinking dots bubble - below robot */}
              {!isOpen && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-2.5 py-1 shadow-lg border border-blue-300 dark:border-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CSS Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes robot-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes robot-think {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(4deg); }
            75% { transform: rotate(-4deg); }
          }
          .animate-robot-float { animation: robot-float 3s ease-in-out infinite; }
          .animate-robot-think { animation: robot-think 4s ease-in-out infinite; }
        `}} />

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-950 border border-blue-500/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-2xl shadow-blue-900/30">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            {isThai ? 'AI ผู้ช่วยพอร์ตโฟลิโอ' : 'AI Portfolio Assistant'}
          </span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-950" />
        </div>
      </motion.button>

      {/* ======== Chat Window ======== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: scrolledPastHero ? 30 : -30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: scrolledPastHero ? 30 : -30, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ transformOrigin: scrolledPastHero ? 'bottom right' : 'top right' }}
            className={`fixed z-[70] w-[320px] md:w-[390px] max-w-[calc(100vw-2rem)] h-[420px] md:h-[570px] max-h-[calc(100vh-180px)] flex flex-col rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:bottom-44 md:right-32 ${scrolledPastHero ? 'bottom-48 right-4' : 'top-[76px] right-4 md:top-auto md:bottom-44'}`}
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl" />
            <div className="absolute inset-0 border border-gray-200 dark:border-white/10 rounded-2xl md:rounded-3xl pointer-events-none" />

            {/* Gradient decorations */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-400/10 dark:bg-blue-600/15 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-400/10 dark:bg-indigo-600/15 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl pointer-events-none" />

            {/* ---- Maintenance Header ---- */}
            <div className="relative flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-blue-100/80 via-blue-50/60 to-white/40 dark:from-blue-700/30 dark:via-blue-600/20 dark:to-blue-500/10 flex-shrink-0">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                    <line x1="20" y1="4" x2="20" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="3" r="2" fill="#93c5fd" />
                    <rect x="8" y="9" width="24" height="16" rx="5" fill="white" opacity="0.95" />
                    <ellipse cx="15" cy="16" rx="4" ry="3.5" fill="#1d4ed8" opacity="0.9" />
                    <ellipse cx="25" cy="16" rx="4" ry="3.5" fill="#1d4ed8" opacity="0.9" />
                    <ellipse cx="15" cy="16" rx="2.5" ry="2.2" fill="#93c5fd" />
                    <ellipse cx="25" cy="16" rx="2.5" ry="2.2" fill="#93c5fd" />
                    <circle cx="15" cy="16" r="1" fill="white" />
                    <circle cx="25" cy="16" r="1" fill="white" />
                    <path d="M14 21.5 Q20 25 26 21.5" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <rect x="11" y="26" width="18" height="10" rx="4" fill="white" opacity="0.85" />
                    <circle cx="16" cy="31" r="1.8" fill="#60a5fa" />
                    <circle cx="20" cy="31" r="1.8" fill="#93c5fd" />
                    <circle cx="24" cy="31" r="1.8" fill="#60a5fa" />
                    <rect x="4" y="27" width="6" height="8" rx="3" fill="white" opacity="0.8" />
                    <rect x="30" y="27" width="6" height="8" rx="3" fill="white" opacity="0.8" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-gray-950 shadow-lg shadow-amber-400/50" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight">WasBot</h3>
                <p className="text-amber-500 dark:text-amber-400 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full inline-block animate-pulse" />
                  {isThai ? 'กำลังปรับปรุง' : 'Under maintenance'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center justify-center transition-colors group"
              >
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ---- Maintenance Content ---- */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-8 text-center">
              {/* Animated Robot with Gears */}
              <div className="relative mb-5 md:mb-8">
                {/* Gear behind robot */}
                <svg className="absolute -top-3 -right-4 md:-top-4 md:-right-6 w-9 h-9 md:w-12 md:h-12 text-blue-500/20 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64L19.43 12.97z" />
                </svg>
                <svg className="absolute -bottom-1 -left-3 md:-bottom-2 md:-left-4 w-6 h-6 md:w-8 md:h-8 text-indigo-500/20 animate-spin-slow-reverse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64L19.43 12.97z" />
                </svg>

                {/* Robot SVG */}
                <svg className="w-16 h-16 md:w-24 md:h-24 animate-robot-think drop-shadow-[0_4px_30px_rgba(59,130,246,0.3)]" viewBox="0 0 48 52" fill="none">
                  <line x1="24" y1="6" x2="24" y2="12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="24" cy="5" r="3" fill="#2563eb" className="animate-pulse" />
                  <rect x="8" y="12" width="32" height="20" rx="7" fill="#1e3a8a" />
                  <rect x="9.5" y="13.5" width="29" height="17" rx="5.5" fill="#1d4ed8" />
                  <rect x="12" y="14" width="20" height="4" rx="2" fill="#3b82f6" opacity="0.35" />
                  {/* Eyes - looking up thinking */}
                  <ellipse cx="17" cy="21" rx="4.5" ry="4" fill="#0f172a" />
                  <ellipse cx="17" cy="20" rx="3.2" ry="2.8" fill="#60a5fa" />
                  <circle cx="17" cy="19" r="1.2" fill="white" />
                  <ellipse cx="31" cy="21" rx="4.5" ry="4" fill="#0f172a" />
                  <ellipse cx="31" cy="20" rx="3.2" ry="2.8" fill="#60a5fa" />
                  <circle cx="31" cy="19" r="1.2" fill="white" />
                  {/* Thinking mouth - straight line */}
                  <line x1="19" y1="28" x2="29" y2="28" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                  <rect x="14" y="34" width="20" height="12" rx="5" fill="#1e3a8a" />
                  <rect x="15.5" y="35.5" width="17" height="9" rx="3.5" fill="#1d4ed8" />
                  <circle cx="20" cy="40" r="2" fill="#60a5fa" className="animate-pulse" />
                  <circle cx="24" cy="40" r="2" fill="#3b82f6" />
                  <circle cx="28" cy="40" r="2" fill="#60a5fa" className="animate-pulse" />
                  <rect x="4" y="35" width="8" height="10" rx="4" fill="#1e3a8a" />
                  <rect x="5" y="36" width="6" height="8" rx="3" fill="#1d4ed8" />
                  <rect x="36" y="35" width="8" height="10" rx="4" fill="#1e3a8a" />
                  <rect x="37" y="36" width="6" height="8" rx="3" fill="#1d4ed8" />
                </svg>
              </div>

              {/* Wrench + Sparkle icons */}
              <div className="flex items-center gap-3 mb-5">
                <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                </svg>
                <svg className="w-5 h-5 text-blue-400 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-gray-900 dark:text-white font-black text-lg mb-3 tracking-wide">
                {isThai ? 'ขออภัย กำลังปรับปรุง' : 'Under Maintenance'}
              </h3>

              {/* Subtitle */}
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-[280px]">
                {isThai
                  ? 'ระบบแชทบอท AI+RAG Portfolio กำลังอัปเกรดให้ฉลาดและตอบได้แม่นยำมากยิ่งขึ้นจะเปิดเร็วๆนี้ 🙏'
                  : 'The AI+RAG chatbot is being upgraded for smarter and more accurate responses. Please check back soon! 🙏'}
              </p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 w-full max-w-[280px]">
                {['AI', 'RAG', 'Pinecone', 'Groq', 'Cohere'].map((tech) => (
                  <span key={tech} className="text-[9px] md:text-[10px] font-bold bg-blue-100 dark:bg-blue-600/15 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 px-2 md:px-2.5 py-1 rounded-full whitespace-nowrap">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Maintenance animation styles */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
              .animate-spin-slow { animation: spin-slow 8s linear infinite; }
              .animate-spin-slow-reverse { animation: spin-slow-reverse 6s linear infinite; }
            `}} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
