
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import ProjectModal from './ProjectModal';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import {
  FiArrowRight, FiCpu, FiDatabase, FiGlobe, FiSmartphone, FiLayout, FiCopy,
  FiCheckCircle, FiZap, FiTarget, FiActivity, FiCompass, FiMap, FiPieChart,
  FiImage, FiLayers, FiCamera, FiBell, FiTrendingUp, FiTool
} from 'react-icons/fi';
import {
  SiHtml5, SiCss3, SiJavascript, SiTailwindcss, SiOpenai,
  SiNgrok, SiPython, SiTableau, SiFlask, SiVercel, SiAwslambda,
  SiPandas, SiReact, SiVite, SiGoogleforms, SiTypescript
} from 'react-icons/si';
import { FaLine, FaFileExcel, FaTelegramPlane } from 'react-icons/fa';

// Define the type for a single project
export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  tags: string[]; // Still used for internal Tech Stack (Inside)
  highlights: string[]; // New: Used for main card highlights (Outside)
  imageUrl: string;
  slides: string[];
  githubUrl: string;
  liveUrl: string;
  myRole: string;
  problemGoal: string;
  problemLabel?: string;
  solutionLabel?: string;
  keyFeatures: string[];
  challengesSolutions: string;
  learningOutcomes: string;
  workflowImageUrl?: string;
  responsibilities?: string[];
  workflowSteps?: { step: number; title: string; detail: string; actor: 'user' | 'system' }[];
  customWorkflow?: { step: number; title: string; detail: string; color: string; badge: string }[];
  outcomes?: string[];
  businessConcept?: string[];
  dataSource?: string;
  dataPrep?: string;
}

const projectsData: Project[] = [
  {
    title: 'RecommendationsAI',
    description: 'ผู้ช่วยอัจฉริยะแนะนำสถานที่ท่องเที่ยว ร้านอาหาร และโรงแรม ขับเคลื่อนด้วย OpenAI',
    detailedDescription: 'เว็บแอปสำหรับช่วยแนะนำร้านอาหาร คาเฟ่ โรงแรม และสถานที่ท่องเที่ยว โดยใช้ AI วิเคราะห์รีวิวจาก Google Maps เพื่อช่วยให้ผู้ใช้ตัดสินใจได้รวดเร็วขึ้น',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Vue 3', 'OpenAI', 'Ngrok', 'Line OA', 'SweetAlert2', 'Google Maps'],
    highlights: ['วิเคราะห์อัจฉริยะด้วย AI', 'ช่วยตัดสินใจท่องเที่ยว', 'เชื่อมต่อระบบแผนที่', 'สรุปรีวิวจาก Google'],
    imageUrl: "/project-slides/RecommendationsAI/1.webp",
    slides: [
      "/project-slides/RecommendationsAI/1.webp",
      "/project-slides/RecommendationsAI/2.webp",
      "/project-slides/RecommendationsAI/3.webp",
      "/project-slides/RecommendationsAI/4.webp",
      "/project-slides/RecommendationsAI/5.webp",
      "/project-slides/RecommendationsAI/6.webp",
      "/project-slides/RecommendationsAI/7.webp",
      "/project-slides/RecommendationsAI/8.webp",
      "/project-slides/RecommendationsAI/9.webp",
      "/project-slides/RecommendationsAI/10.webp",
      "/project-slides/RecommendationsAI/11.webp",
      "/project-slides/RecommendationsAI/12.webp",
      "/project-slides/RecommendationsAI/13.webp",
      "/project-slides/RecommendationsAI/14.webp",
      "/project-slides/RecommendationsAI/15.webp",
      "/project-slides/RecommendationsAI/16.webp",
      "/project-slides/RecommendationsAI/17.webp",
      "/project-slides/RecommendationsAI/18.webp",
      "/project-slides/RecommendationsAI/19.webp"
    ],
    githubUrl: 'https://github.com/Fawas1997/RecommendationsAI.git',
    liveUrl: '#',
    myRole: 'ระบบใช้ AI วิเคราะห์รีวิวจาก Google Maps เพื่อประมวลผลความคิดเห็นจำนวนมากในเวลาอันสั้น AI จะช่วยสรุปภาพรวมของรีวิว ทั้งข้อดี ข้อเสีย และประเด็นสำคัญที่ผู้ใช้ควรรู้ โดยแสดงผลในรูปแบบที่เข้าใจง่ายและอ่านได้รวดเร็ว',
    problemGoal: 'ผู้ใช้ต้องใช้เวลาอ่านรีวิวจาก Google Mapจำนวนมากก่อนตัดสินใจ เพราะรีวิวมีทั้งดีและไม่ดีปะปนกัน การอ่านรีวิวทีละรายการทำให้เสียเวลา และยากต่อการสรุปว่าที่นั้นเหมาะกับความต้องการจริงหรือไม่',
    responsibilities: [
      'รับผิดชอบการออกแบบหน้าเว็บและประสบการณ์ผู้ใช้ (UX) รวมถึงพัฒนา frontend ด้วย Vue 3 และ Tailwind CSS',
      'เชื่อมต่อ OpenAI API เพื่อใช้วิเคราะห์และสรุปรีวิว และทำงานร่วมกับเพื่อนที่รับผิดชอบส่วน backend ในการออกแบบและเชื่อมต่อ API',
      'นำ LINE มาใช้สำหรับการล็อกอินผู้ใช้ (LINE Login) เพื่อยืนยันตัวตนและจัดการสถานะการเข้าสู่ระบบ',
      'พัฒนาระบบแจ้งเตือนสถานะต่าง ๆ ภายในเว็บ เช่น การแจ้งเตือนข้อผิดพลาด การกรอกข้อมูลไม่ครบ และการดำเนินการสำเร็จ',
      'ปรับปรุงหน้าเว็บให้รองรับการใช้งานบนอุปกรณ์มือถือ โดยออกแบบและพัฒนาในรูปแบบ Responsive Mobile'
    ],
    workflowSteps: [
      { step: 1, title: 'ผู้ใช้เข้าสู่ระบบด้วย LINE Login', detail: 'เพื่อยืนยันตัวตนก่อนเริ่มใช้งานระบบ', actor: 'user' },
      { step: 2, title: 'ผู้ใช้เลือกประเภทสถานที่ที่ต้องการ', detail: 'เช่น ร้านอาหาร คาเฟ่ โรงแรม หรือสถานที่ท่องเที่ยว', actor: 'user' },
      { step: 3, title: 'ผู้ใช้ค้นหาสถานที่ที่สนใจ', detail: 'ระบบแสดงผลตำแหน่งบนแผนที่', actor: 'user' },
      { step: 4, title: 'ระบบรับ Place ID ของสถานที่', detail: 'เพื่อใช้เป็นตัวอ้างอิงข้อมูลจาก Google Maps', actor: 'system' },
      { step: 5, title: 'ระบบส่ง Place ID ไปยัง Google Maps API', detail: 'เพื่อดึงข้อมูลรายละเอียดของสถานที่', actor: 'system' },
      { step: 6, title: 'ระบบดึงชื่อสถานที่และรีวิวจาก Google Maps', detail: 'เพื่อนำมาใช้ในการวิเคราะห์', actor: 'system' },
      { step: 7, title: 'ผู้ใช้ใส่ prompt', detail: 'เพื่อระบุความต้องการในการแนะนำสถานที่', actor: 'user' },
      { step: 8, title: 'ระบบส่งข้อมูลรีวิวและ prompt ไปยัง OpenAI', detail: 'เพื่อประมวลผลและวิเคราะห์ข้อมูล', actor: 'system' },
      { step: 9, title: 'OpenAI ประมวลผลและสร้างคำแนะนำ', detail: 'จากรีวิวและคำถามของผู้ใช้', actor: 'system' },
      { step: 10, title: 'ระบบแสดงผลคำแนะนำบนหน้าเว็บ', detail: 'ให้ผู้ใช้เห็นผลลัพธ์และใช้ประกอบการตัดสินใจ', actor: 'system' }
    ],
    outcomes: [
      'ระบบสามารถสรุปรีวิวจำนวนมากให้เข้าใจได้ในเวลาอันสั้น',
      'ช่วยลดเวลาการตัดสินใจของผู้ใช้ได้อย่างชัดเจน',
      'ผู้ใช้สามารถเลือกสถานที่ได้ง่ายขึ้น',
      'และเว็บรองรับการใช้งานบนอุปกรณ์มือถือ'
    ],
    businessConcept: [
      'โปรเจกต์นี้ทำให้ผมได้พัฒนาเว็บ AI แนะนำร้านอาหารและสถานที่จากรีวิว Google Maps โดยเชื่อมต่อ OpenAI และ API ภายนอกจริง ได้ฝึกออกแบบ UX/UI พัฒนา frontend ด้วย Vue และเชื่อมต่อ API ร่วมกับ backend จนสามารถใช้งานได้จริง\n\nช่วยพัฒนาทักษะการสร้างระบบ AI บนเว็บ การทำงานร่วมกับ API จริง การออกแบบประสบการณ์ผู้ใช้ และการพัฒนาโปรเจกต์ตั้งแต่ไอเดียจน deploy ใช้งานได้บนมือถือและเว็บ'
    ],
    keyFeatures: [
      'OpenAI Decision Making based on Google Maps reviews',
      'Smart recommendations for Food, Hotels, and Travel',
      'Token System integration (Future Roadmap)',
      'Automated Booking Service (Future Roadmap)',
    ],
    challengesSolutions: 'ความท้าทายหลักคือการจัดการค่าใช้จ่าย API ที่ค่อนข้างสูง จึงได้วางแผนใช้ระบบ Token เพื่อจำกัดการใช้งานและรักษาสมดุลของธุรกิจ',
    learningOutcomes: 'ได้เรียนรู้วิธีการเปลี่ยน AI จากแค่แชทบอทให้กลายเป็นเครื่องมือช่วยตัดสินใจทางธุรกิจที่มีแผนการสร้างรายได้จริง',
    workflowImageUrl: 'https://lh3.googleusercontent.com/d/1RD-cBCiGUZkxcrl-PEXKAkP6k6eBh789'
  },
  {
    title: 'Social Listening Dashboard',
    description: 'แดชบอร์ดวิเคราะห์กระแสแบรนด์แชมพูบนโลกโซเชียล โดยใช้ Zocial Eye และ Tableau',
    detailedDescription: 'โปรเจกนี้เป็นการวิเคราะห์ข้อมูลโซเชีลมีเดีย เพื่อศึกษาการมีส่วนร่วม (Engagement) และความคิดเห็นของผู้บริโภค ที่มีต่อแบรนด์แชมพู Falles และแบรนด์คู่แข่ง โดยใช้ข้อมูลจาก Zocial Eye และนำมาวิเคราะห์ เพื่อช่วยให้เข้าใจพฤติกรรมผู้บริโภคและภาพลักษณ์ของแบรนด์',
    tags: ['Zocial Eye', 'Tableau', 'Python', 'Pandas', 'Excel'],
    highlights: ['วิเคราะห์ความรู้สึกต่อแบรนด์', 'สรุปข้อมูลด้วยภาพ', 'เจาะลึก 12,000+ ข้อมูล', 'เปรียบเทียบคู่แข่ง'],
    imageUrl: "/project-slides/DataAnalyst/1.webp",
    slides: [
      "/project-slides/DataAnalyst/1.webp",
      "/project-slides/DataAnalyst/2.webp",
      "/project-slides/DataAnalyst/3.webp",
      "/project-slides/DataAnalyst/4.webp",
      "/project-slides/DataAnalyst/5.webp",
      "/project-slides/DataAnalyst/6.webp",
      "/project-slides/DataAnalyst/7.webp",
      "/project-slides/DataAnalyst/8.webp",
      "/project-slides/DataAnalyst/9.webp",
      "/project-slides/DataAnalyst/10.webp",
      "/project-slides/DataAnalyst/11.webp",
      "/project-slides/DataAnalyst/12.webp",
      "/project-slides/DataAnalyst/13.webp",
      "/project-slides/DataAnalyst/14.webp",
      "/project-slides/DataAnalyst/15.webp",
      "/project-slides/DataAnalyst/16.webp",
      "/project-slides/DataAnalyst/17.webp",
      "/project-slides/DataAnalyst/18.webp",
      "/project-slides/DataAnalyst/19.webp",
      "/project-slides/DataAnalyst/20.webp",
      "/project-slides/DataAnalyst/21.webp",
      "/project-slides/DataAnalyst/22.webp",
      "/project-slides/DataAnalyst/23.webp",
      "/project-slides/DataAnalyst/24.webp",
      "/project-slides/DataAnalyst/25.webp",
      "/project-slides/DataAnalyst/26.webp",
      "/project-slides/DataAnalyst/27.webp",
      "/project-slides/DataAnalyst/28.webp",
      "/project-slides/DataAnalyst/29.webp",
      "/project-slides/DataAnalyst/30.webp",
      "/project-slides/DataAnalyst/31.webp",
      "/project-slides/DataAnalyst/32.webp"
    ],
    githubUrl: '',
    liveUrl: '#',
    myRole: 'นำข้อมูลจาก Zocial Eye มาวิเคราะห์เชิงโครงสร้าง โดยจัดกลุ่มข้อมูลตาม Brand, Topic, Post Type และ Source ทำการวิเคราะห์ Engagement และ Sentiment พร้อมสร้าง Dashboard เพื่อให้เห็นข้อมูลเชิงลึกได้ง่ายและชัดเจน',
    problemGoal: 'แบรนด์มีข้อมูลจากโซเชีลมีเดียจำนวนมาก แต่ยากต่อการสรุปว่าผู้บริโภคมีความคิดเห็นอย่างไรต่อแบรนด์ ไม่สามารถมองเห็นภาพรวมของการมีส่วนร่วมความรู้สึกของผู้ใช้ และประสิทธิภาพของคอนเทนต์ได้อย่างชัดเจน',
    responsibilities: [
      'รับผิดชอบการเตรียมและจัดการข้อมูล',
      'รวมถึงการทำ Data Labelling และวิเคราะห์ข้อมูล',
      'วิเคราะห์ Engagement, Sentiment และพฤ็ติกรรมผู้บริโภค',
      'พร้อมสร้าง Dashboard ด้วย Tableau เพื่อสรุปผลลัพธ์'
    ],
    dataSource: 'ใช้ข้อมูลจาก Zocial Eye ซึ่งเป็นเครื่องมือรวบรวมข้อมูลโพสต์และคอมเมนต์ จากแพลตฟอร์ลโซเชีลมีเดียต่าง ๆ ข้อมูลครอบคลุมช่วงเวลา 6 เดือน ตั้งแต่เดือนตุลาคม 2023 ถึงมีนาคม 2024',
    dataPrep: 'มีการทำ Data Labelling เพิ่มเติม 5 คอลัมน์ เพื่อระบุประเภทของโพสต์ แบรนด์ และประเภทสินค้า ใช้ Python ในการจัดการและเตรียมข้อมูล โดยข้อมูลทั้งหมดมีมากกว่า 12,000 แถว',
    keyFeatures: ['Data Cleaning & Preparation', 'Sentiment Analysis', 'Competitor Comparison', 'Interactive Visualization'],
    challengesSolutions: 'ข้อมูลจากโซเชีลมี Noise เยอะมาก จึงต้องใช้ Python ในการทำ Data Cleaning และ Labeling ข้อมูลอย่างเป็นระบบ',
    learningOutcomes: 'เชี่ยวชาญการใช้เครื่องมือ Social Listening และการนำเสนอข้อมูลด้วย Tableau ให้กับผู้บริหาร',
  },
  {
    title: 'Bot Creates File Banner',
    description: 'Chatbot อัจฉริยะที่ช่วยจัดการเอกสารและสร้างเอกสารไฟล์ขอ Banner โฆษณาอัตโนมัติ',
    detailedDescription: 'โปรเจกต์นี้เป็นระบบแชทบอทสำหรับสร้างไฟล์เอกสารการขออนุมัติ LINE Beacon Banner และจัดการข้อมูลแบบอัตโนมัติ โดยพัฒนาขึ้นเพื่อช่วยลดขั้นตอนการทำงานซ้ำ ลดความผิดพลาดจากการจัดการไฟล์ด้วยมือ และเพิ่มความสะดวกในการจัดการข้อมูลจำนวนมากเมื่อมีลูกค้าซื้อผลิตภัณฑ์ AiBeacon ของบริษัท จำเป็นต้องจัดเตรียมและส่งเอกสารการขออนุมัติ Banner ให้กับ LINE ตามรูปแบบที่กำหนด ผู้ใช้สามารถอัปโหลดไฟล์ Excel เพียงครั้งเดียว ระบบจะทำการสร้างไฟล์ Banner ตามข้อมูลที่กำหนด รวมไฟล์เป็น ZIP และอัปเดตข้อมูลเข้าสู่ Directus ของบริษัทได้ทันทีแบบอัตโนมัติ',
    tags: ['HTML', 'CSS', 'Javascript', 'Tailwind CSS', 'Vue 3', 'LineOA', 'Vercel', 'Flask', 'Python'],
    highlights: ['สร้างแบนเนอร์อัตโนมัติ', 'จัดการไฟล์ ZIP ทันที', 'เชื่อมต่อระบบ Directus', 'ลดงานเอกสาร 100%'],
    imageUrl: "/project-slides/BotCreatesFileBanner/0.webp",
    slides: [
      "/project-slides/BotCreatesFileBanner/0.webp",
      "/project-slides/BotCreatesFileBanner/1.webp",
      "/project-slides/BotCreatesFileBanner/2.webp",
      "/project-slides/BotCreatesFileBanner/3.webp",
      "/project-slides/BotCreatesFileBanner/4.webp",
      "/project-slides/BotCreatesFileBanner/5.webp",
      "/project-slides/BotCreatesFileBanner/6.webp",
      "/project-slides/BotCreatesFileBanner/7.webp",
      "/project-slides/BotCreatesFileBanner/8.webp",
      "/project-slides/BotCreatesFileBanner/9.webp",
      "/project-slides/BotCreatesFileBanner/10.webp",
      "/project-slides/BotCreatesFileBanner/11.webp",
      "/project-slides/BotCreatesFileBanner/12.webp"
    ],
    githubUrl: 'https://github.com/Fawas1997/Bot-creates-file-banner-.git',
    liveUrl: '#',
    myRole: 'สร้าง Automation มาใช้กับงานเอกสาร โดยให้ผู้ใช้กรอกข้อมูลเพียงครั้งเดียวผ่านไฟล์ Excel ระบบจะเป็นผู้จัดการขั้นตอนที่เหลือทั้งหมด ตั้งแต่การสร้างไฟล์ ไปจนถึงการอัปเดตข้อมูลเข้าสู่ระบบหลังบ้านของบริษัท',
    problemGoal: 'การสร้างไฟล์เอกสารการขออนุมัติ LINE Beacon Banner และการอัปเดตข้อมูลในระบบจำเป็นต้องดำเนินการหลายขั้นตอน ภายในองค์กรต้องกรอกข้อมูลหลายจุด และนำข้อมูลไปสร้างไฟล์ Banner รวมถึงอัปเดตระบบด้วยวิธีการจัดการด้วยมือขั้นตอนเหล่านี้ใช้เวลานานและมีโอกาสเกิดความผิดพลาดสูง โดยเฉพาะเมื่อมีหลายไฟล์หรือหลาย HWID ซึ่งอาจเกิดความผิดพลาดจากการคัดลอกหรือกรอกข้อมูลซ้ำ',
    problemLabel: 'ปัญหาการทำงานเดิม',
    solutionLabel: 'แนวคิดของระบบ',
    keyFeatures: ['Auto-generate Image Banner', 'Directus CMS Integration', 'Generative AI Response', 'Vector Database Search'],
    challengesSolutions: 'การสร้างรูปภาพที่มี Layout สม่ำเสมอจากแชทบอท แก้ไขโดยใช้ Library จัดการภาพใน Python และกำหนดเทมเพลตที่แน่นอน',
    learningOutcomes: 'ได้ทักษะการสร้าง Backend ด้วย Flask และการใช้เทคโนโลยี RAG (Retrieval-Augmented Generation)',
    responsibilities: [
      'ออกแบบและพัฒนา Frontend ของระบบด้วย Vue 3 และ Tailwind CSS เพื่อให้ผู้ใช้เข้าใจขั้นตอนการทำงานได้ง่าย',
      'พัฒนา UX ของแชทบอท ตั้งแต่การ Login การอัปโหลดไฟล์ ไปจนถึงการแสดงผลลัพธ์',
      'เชื่อมต่อระบบ Login ผ่าน LINE',
      'ระบบ Backend ในการเชื่อมต่อ API ต่างๆ และแสดงผลข้อมูล',
      'Deploy ให้ใช้งานได้'
    ],
  },
  {
    title: 'GeoCheck',
    description: 'ระบบติดตามการทำงานของพนักงานคนที่ทำงานแทนแบบเรียลไทม์ พร้อมตำแหน่ง และรูปถ่าย',
    detailedDescription: 'GeoCheck เป็นระบบติดตามเเละเก็บข้อมูลการทำงานพนักงานภาคสนามคนที่ทำงานแทน สำหรับงานที่ต้องไปหลายจุดต่อวัน งานตั้งกล้องถ่ายภาพเก็บข้อมูลจราจร จุดละ 16 นาที วันละ 15 จุด แบ่งเป็น 3 ช่วงเวลา ระบบช่วยให้ผู้จ้างเห็นการทำงานแบบเรียลไทม์ผ่าน Telegram โดยทุกการเช็คอินต้องมีพิกัด GPS เวลา และรูปถ่ายจริงจากหน้างาน พร้อมบันทึกข้อมูลลง Google Sheet เพื่อดูย้อนหลังได้ทันที',
    tags: ['React', 'Vite', 'TypeScript', 'React Leaflet', 'Google AI Studio', 'Telegram', 'Apps Script', 'Capacitor', 'Manus AI'],
    highlights: ['ติดตามด้วยพิกัด GPS', 'ยืนยันตัวตนด้วยรูปถ่าย', 'แจ้งเตือนเรียลไทม์', 'บันทึกข้อมูลอัตโนมัติ'],
    imageUrl: '/project-slides/Geocheckin/1.webp',
    slides: [
      '/project-slides/Geocheckin/1.webp',
      '/project-slides/Geocheckin/2.webp',
      '/project-slides/Geocheckin/3.webp',
      '/project-slides/Geocheckin/4.webp',
      '/project-slides/Geocheckin/5.webp',
      '/project-slides/Geocheckin/6.webp',
      '/project-slides/Geocheckin/7.webp',
      '/project-slides/Geocheckin/8.webp'
    ],
    githubUrl: 'https://github.com/Fawas1997/Geolocation-Check-in.git',
    liveUrl: '#',
    problemLabel: 'ปัญหาการทำงานเดิม',
    problemGoal: 'เดิมการตรวจสอบพนักงานภาคสนามคนที่ทำงานแทนทำได้ยาก ไม่สามารถยืนยันได้ว่าพนักงานอยู่หน้างานจริงตามเวลาหรือไม่ การส่งรายงานผ่านแชทมีโอกาสปลอมแปลง และข้อมูลกระจัดกระจาย ต้องคอยตามงานเอง ทำให้เสียเวลาบริหารและควบคุมคุณภาพงานได้ลำบาก โดยเฉพาะงานที่ต้องไปหลายจุดในหนึ่งวัน',
    solutionLabel: 'แนวคิดของระบบ',
    myRole: 'ระบบออกแบบให้การเช็คอินต้องมี 3 อย่างเสมอ คือ พิกัดจริงจาก GPS รูปถ่ายหน้างาน และเวลาที่ระบบบันทึกอัตโนมัติ พร้อมกำหนดรัศมีการเช็คอิน เช่น 200 เมตร และกำหนดช่วงเวลางานแต่ละรอบ เพื่อให้มั่นใจว่าพนักงานอยู่สถานที่จริงในเวลาที่กำหนด และรายงานถูกส่งเข้า Telegram ทันที',
    keyFeatures: ['Real-time Telegram Alerts', 'GPS Geofencing', 'Photo Verification', 'Google Sheets Integration'],
    challengesSolutions: 'การป้องกันการปลอมแปลงพิกัดและการตรวจสอบความถูกต้องของรูปถ่ายในเวลาจริง',
    learningOutcomes: 'การใช้ Google Apps Script เชื่อมต่อ Telegram Bot และการจัดการข้อมูลเชิงพื้นที่เบื้องต้น',
    responsibilities: [
      'ใช้ Google AI Studio ในการช่วยออกแบบ and พัฒนา logic ของระบบ (vibe coding) ตั้งแต่โครงสร้างหน้าเว็บจนถึง workflow การเช็คอิน',
      'ใช้ Manus AI ในการ build และสร้างไฟล์ APK สำหรับใช้งานบน Android',
      'พัฒนาเว็บและแอปด้วย React, TypeScript, Tailwind CSS และ Capacitor เพื่อให้ใช้งานได้ทั้งบนเว็บและแอปAPK',
      'พัฒนา Backend ด้วย Google Apps Script สำหรับรับ-ส่งข้อมูล บันทึกลง Google Sheet และเชื่อมต่อ Telegram',
      'ออกแบบระบบเช็คอินด้วย GPS + กล้องถ่ายรูป เพื่อยืนยันการอยู่หน้างานจริง',
      'เชื่อมต่อ Telegram Bot เพื่อส่งรายงานการเช็คอินแบบเรียลไทม์ให้ผู้จ้าง',
      'วางโครงสร้างข้อมูลและระบบแจ้งเตือนให้รองรับงานหลายจุดต่อวันและหลายช่วงเวลา',
      'ออกแบบ UI ให้พนักงานใช้งานง่าย เน้นกดไม่กี่ขั้นตอน “เปิดแอป → ถ่ายรูป → เช็คอิน”'
    ],
  },
];

const Reveal: React.FC<{
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({
  children,
  initialX = 0,
  initialY = 30,
  delay = 0,
  duration = 0.8,
  className = "w-full"
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: "-50px", once: false });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (inView) {
        setIsVisible(true);
      } else {
        const rect = (ref.current as any)?.getBoundingClientRect();
        if (rect && rect.top > 100) {
          setIsVisible(false);
        }
      }
    }, [inView]);

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, x: initialX, y: initialY }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

const ProjectCard: React.FC<{ project: Project; onCardClick: (project: Project) => void }> = ({ project, onCardClick }) => {
  const { title, description, highlights, imageUrl, slides } = project;
  const { language } = useLanguage();
  const t = translations[language].projects;

  const getCategoryInfo = () => {
    if (title.includes('RecommendationsAI')) return { label: 'AI & Web', icon: <FiCpu />, color: 'bg-blue-600' };
    if (title.includes('Social Listening')) return { label: 'Data Analysis', icon: <FiDatabase />, color: 'bg-indigo-600' };
    if (title.includes('Bot Creates')) return { label: 'Automation', icon: <FiLayout />, color: 'bg-emerald-600' };
    if (title.includes('GeoCheck')) return { label: 'Mobile & GPS', icon: <FiSmartphone />, color: 'bg-orange-600' };
    return { label: 'Web Solution', icon: <FiGlobe />, color: 'bg-blue-600' };
  };

  const getHighlightIcon = (text: string) => {
    const size = 12;
    if (text.includes('AI') || text.includes('อัจฉริยะ')) return <FiCpu size={size} />;
    if (text.includes('ท่องเที่ยว') || text.includes('ตัดสินใจ')) return <FiCompass size={size} />;
    if (text.includes('แผนที่')) return <FiMap size={size} />;
    if (text.includes('ความรู้สึก')) return <FiActivity size={size} />;
    if (text.includes('ภาพ') || text.includes('เปรียบเทียบ')) return <FiPieChart size={size} />;
    if (text.includes('ข้อมูล') || text.includes('Insights')) return <FiDatabase size={size} />;
    if (text.includes('แบนเนอร์')) return <FiImage size={size} />;
    if (text.includes('Directus') || text.includes('จัดการ')) return <FiLayers size={size} />;
    if (text.includes('ประสิทธิภาพ') || text.includes('รวดเร็ว') || text.includes('100%')) return <FiZap size={size} />;
    if (text.includes('GPS') || text.includes('พิกัด')) return <FiTarget size={size} />;
    if (text.includes('รูปถ่าย')) return <FiCamera size={size} />;
    if (text.includes('แจ้งเตือน')) return <FiBell size={size} />;
    if (text.includes('สรุป') || text.includes('คู่แข่ง')) return <FiTrendingUp size={size} />;
    return <FiCheckCircle size={size} />;
  };

  const category = getCategoryInfo();

  const renderTagIcon = (tag: string) => {
    const iconSize = 14;
    const lowerTag = tag.toLowerCase();

    const iconMap: { [key: string]: React.ReactElement } = {
      'html': <span className="text-orange-600"><SiHtml5 size={iconSize} /></span>,
      'css': <span className="text-blue-500"><SiCss3 size={iconSize} /></span>,
      'javascript': <span className="text-yellow-400 bg-black rounded-[2px]"><SiJavascript size={iconSize} /></span>,
      'tailwind css': <span className="text-cyan-400"><SiTailwindcss size={iconSize} /></span>,
      'vue 3': <img src="/logoicon/vue 3.webp" alt="Vue 3" style={{ width: iconSize, height: iconSize }} />,
      'openai': <span className="text-teal-500"><SiOpenai size={iconSize} /></span>,
      'ngrok': <span className="text-blue-600"><SiNgrok size={iconSize} /></span>,
      'line oa': <span className="text-green-500"><FaLine size={iconSize} /></span>,
      'lineoa': <span className="text-green-500"><FaLine size={iconSize} /></span>,
      'sweetalert2': <img src="/logoicon/SweetAlert 2.webp" alt="SweetAlert2" style={{ width: iconSize, height: iconSize }} />,
      'python': <span className="text-[#3776AB]"><SiPython size={iconSize} /></span>,
      'google maps': <img src="/logoicon/google-maps.webp" alt="Google Maps" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
      'tableau': <span className="text-[#E97627]"><SiTableau size={iconSize} /></span>,
      'excel': <span className="text-[#217346]"><FaFileExcel size={iconSize} /></span>,
      'flask': <span className="text-black dark:text-white"><SiFlask size={iconSize} /></span>,
      'vercel': <span className="text-black dark:text-white"><SiVercel size={iconSize} /></span>,
      'aws lambda': <span className="text-orange-500"><SiAwslambda size={iconSize} /></span>,
      'pandas': <span className="text-[#150458] dark:text-white"><SiPandas size={iconSize} /></span>,
      'react': <span className="text-blue-400"><SiReact size={iconSize} /></span>,
      'vite': <img src="/logoicon/Vite.webp" alt="Vite" style={{ width: iconSize, height: iconSize }} />,
      'typescript': <span className="text-[#3178C6]"><SiTypescript size={iconSize} /></span>,
      'telegram': <span className="text-[#26A5E4]"><FaTelegramPlane size={iconSize} /></span>,
      'apps script': <img src="/logoicon/App Script.webp" alt="Apps Script" style={{ width: iconSize, height: iconSize }} />,
      'zocial eye': <img src="/logoicon/Zocial Eye.webp" alt="Zocial Eye" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
      'capacitor': <img src="/logoicon/capacitor.webp" alt="Capacitor" style={{ width: iconSize, height: iconSize }} />,
      'manus ai': <img src="/logoicon/manus-ai.webp" alt="Manus AI" style={{ width: iconSize, height: iconSize }} />,
    };

    return iconMap[lowerTag] || <FiTool size={iconSize} />;
  };

  return (
    <Reveal initialY={30} duration={0.6}>
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm dark:shadow-lg border border-gray-100 dark:border-gray-700/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/15 group cursor-pointer"
        onClick={() => onCardClick(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(project)}
        aria-label={`View details for ${title}`}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center border-b border-gray-100 dark:border-gray-700/50">
          {/* Category Badge Floating (Left) */}
          <div className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 ${category.color} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1`}>
            {category.icon}
            {category.label}
          </div>

          {/* Slide Count Badge (Right) */}
          {slides && slides.length > 0 && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 text-white text-xs font-black rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform group-hover:-translate-y-1">
              <span className="text-blue-400"><FiCopy size={12} /></span>
              <span>{slides.length}</span>
            </div>
          )}

          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6">
            <span className="text-white text-xs md:text-sm font-black bg-blue-600 px-6 py-2.5 rounded-full shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
              {t.viewDetails} <span className="animate-pulse"><FiArrowRight /></span>
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {title}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-500"><FiArrowRight /></span>
            </h3>
          </div>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>

          {/* ไฮไลท์โปรเจกต์ (ภาษาไทย เเละไอคอนสื่อความหมายเเยกตามหัวข้อ) - ปรับปรุงการแสดงผล Mobile */}
          <div className="relative z-10 pt-5 border-t border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-colors duration-500">
            <div className="flex flex-col gap-4">
              {/* Highlights Grid/Flex */}
              <div className="grid grid-cols-2 md:flex md:flex-nowrap items-center gap-2 md:gap-2.5">
                {highlights.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2 py-1.5 md:px-3.5 md:py-1.5 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-100/60 dark:border-blue-800/40 shadow-sm transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-blue-500/10 w-full md:w-auto">
                    <div className="shrink-0 text-blue-500 group-hover:scale-125 group-hover:text-blue-600 transition-all duration-300">
                      {getHighlightIcon(tag)}
                    </div>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold truncate md:whitespace-nowrap">{tag}</span>
                  </div>
                ))}
              </div>

              {/* เครื่องมือที่ใช้ (Icons) - เฉพาะ Mobile ถูกนำออกตามคำขอ */}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};


const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language } = useLanguage();
  const t = translations[language].projects;

  // Merge static project data with translated content
  const projects = projectsData.map((project, index) => {
    const translatedProject = t.data[index];
    return {
      ...project,
      ...translatedProject
    };
  });

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section id="projects" className="pt-20 pb-24 lg:pt-32">
        <Reveal initialY={30}>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">{t.title}</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium whitespace-pre-line">
              {t.subtitle}
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onCardClick={handleCardClick} />
          ))}
        </div>
      </section>
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </>
  );
};

export default Projects;
