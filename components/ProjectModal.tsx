import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { FiX, FiGithub, FiExternalLink, FiTarget, FiUserCheck, FiTool, FiChevronLeft, FiChevronRight, FiMapPin, FiActivity, FiUser, FiCpu, FiCheckCircle, FiTrendingUp, FiAlertTriangle, FiZap, FiMaximize2, FiMinimize2, FiLayers, FiBriefcase, FiDatabase, FiBarChart2, FiFilter, FiPieChart, FiArrowRight, FiStar, FiFileText, FiImage, FiArchive, FiInfo, FiSettings, FiPackage, FiCloudLightning, FiClock, FiCamera, FiSend, FiBell } from 'react-icons/fi';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTailwindcss, SiOpenai, 
  SiNgrok, SiPython, SiTableau, SiFlask, SiVercel, SiAwslambda,
  SiPandas, SiReact, SiVite, SiGoogleforms, SiTypescript
} from 'react-icons/si';
import { FaLine, FaFileExcel, FaRobot, FaFileArchive, FaTelegramPlane } from 'react-icons/fa';
import { GiRabbit } from 'react-icons/gi';
import { Project } from './Projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { language } = useLanguage();
  const t = translations[language].projects;
  const [showArrows, setShowArrows] = useState(true);
  const [showPageNumber, setShowPageNumber] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [uiTrigger, setUiTrigger] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tagsScrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const lastManualScrollPos = useRef<number>(0);
  const scrollDirectionRef = useRef<'forward' | 'backward'>('forward');

  const minSwipeDistance = 50;

  useEffect(() => {
    if (project) {
      setActiveSlide(0);
    }
  }, [project?.title]);

  useEffect(() => {
    if (!project) return;
    setShowArrows(true);
    setShowPageNumber(true);
    const timer = setTimeout(() => {
      setShowArrows(false);
      setShowPageNumber(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [project?.title, activeSlide, isZoomed, uiTrigger]);

  const nextSlide = () => {
    if (!project) return;
    const total = project.slides.length;
    setActiveSlide((prev) => (prev < total - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    if (!project) return;
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (project) {
      thumbnailRefs.current = new Array(project.slides.length).fill(null);
      
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          nextSlide();
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          prevSlide();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [project, onClose, isZoomed]);

  useEffect(() => {
    if (!project) return;

    const scrollActiveThumbnail = () => {
      const container = scrollContainerRef.current;
      const target = thumbnailRefs.current[activeSlide];
      
      if (container && target) {
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;
        const targetLeft = target.offsetLeft;
        const targetWidth = target.offsetWidth;
        
        const gap = window.innerWidth < 768 ? 16 : 24;
        const margin = targetWidth + gap;

        if (targetLeft + targetWidth > scrollLeft + containerWidth - margin) {
          container.scrollTo({
            left: targetLeft + targetWidth - containerWidth + margin,
            behavior: 'smooth'
          });
        } else if (targetLeft < scrollLeft + margin) {
          container.scrollTo({
            left: Math.max(0, targetLeft - margin),
            behavior: 'smooth'
          });
        }
      }
    };

    const timer = setTimeout(scrollActiveThumbnail, 50);
    return () => clearTimeout(timer);
  }, [activeSlide, project]);

  // ระบบ Auto-scroll บน Mobile ที่ไม่หยุดรอ และจำทิศทางตามที่ผู้ใช้ไถล่าสุด
  useEffect(() => {
    if (!project || window.innerWidth >= 768) return;

    let animationId: number;
    const speed = 0.8;

    const animate = () => {
      const container = tagsScrollRef.current;
      if (container) {
        // ทำงานทันทีเมื่อ isInteractingRef เป็น false (ไม่ได้เอามือแตะ/เลื่อน)
        if (!isInteractingRef.current) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (maxScroll > 5) {
            if (scrollDirectionRef.current === 'forward') {
              container.scrollLeft += speed;
              if (container.scrollLeft >= maxScroll - 0.5) {
                scrollDirectionRef.current = 'backward';
              }
            } else {
              container.scrollLeft -= speed;
              if (container.scrollLeft <= 0.5) {
                scrollDirectionRef.current = 'forward';
              }
            }
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [project?.title]);

  const handleTagsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const currentScroll = container.scrollLeft;

    // ตรวจสอบทิศทางแบบเรียลไทม์ระหว่างเลื่อนมือ
    if (Math.abs(currentScroll - lastManualScrollPos.current) > 1) {
      if (currentScroll > lastManualScrollPos.current) {
        scrollDirectionRef.current = 'forward'; // เลื่อนไปขวา -> ออโต้ไปขวาต่อ
      } else {
        scrollDirectionRef.current = 'backward'; // เลื่อนไปซ้าย -> ออโต้ไปซ้ายต่อ
      }
    }
    lastManualScrollPos.current = currentScroll;
  };

  const setInteracting = (val: boolean) => {
    isInteractingRef.current = val;
  };

  if (!project) return null;

  const totalSlides = project.slides.length;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const renderTagIcon = (tag: string) => {
    const iconSize = 24; 
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
      'cohere': <img src="/logoicon/Cohere.webp" alt="Cohere" style={{ width: iconSize, height: iconSize }} />,
      'pinecone': <img src="/logoicon/Pinecone.webp" alt="Pinecone" style={{ width: iconSize, height: iconSize }} />,
      'groq': <img src="/logoicon/Groq.webp" alt="Groq" style={{ width: iconSize, height: iconSize }} />,
      'zocial eye': <img src="/logoicon/Zocial Eye.webp" alt="Zocial Eye" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
      'react leaflet': <img src="/logoicon/react-leaflet.webp" alt="React Leaflet" style={{ width: iconSize, height: iconSize }} />,
      'google ai studio': <img src="/logoicon/google-ai-studio.webp" alt="Google AI Studio" style={{ width: iconSize, height: iconSize }} />,
      'capacitor': <img src="/logoicon/capacitor.webp" alt="Capacitor" style={{ width: iconSize, height: iconSize }} />,
      'manus ai': <img src="/logoicon/manus-ai.webp" alt="Manus AI" style={{ width: iconSize, height: iconSize }} />,
    };

    return iconMap[lowerTag] || null;
  };

  const responsibilitiesContent = project.responsibilities && (
    <div className="mt-6 md:mt-10 p-6 md:p-10 bg-white dark:bg-gray-800/40 rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-gray-700/60 shadow-2xl shadow-gray-200 dark:shadow-black/20 text-left overflow-hidden relative group">
      <h4 className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 mb-8 relative z-10">
        <div className="p-2.5 md:p-3 bg-blue-600 text-white rounded-xl md:rounded-2xl shadow-xl shadow-blue-600/30">
          <span className="md:w-6 md:h-6"><FiUserCheck size={20} /></span>
        </div>
        {t.responsibilities}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 relative z-10">
        {project.responsibilities.map((item, index) => (
          <div key={index} className="flex gap-4 md:gap-5 items-start group/item">
            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-xl md:rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm md:text-lg font-black md:group-hover/item:bg-blue-600 md:group-hover/item:text-white transition-all duration-500 shadow-sm">
              {index + 1}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium transition-colors">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 overflow-y-auto overflow-x-hidden scroll-smooth transition-all duration-300"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="sticky top-0 z-[120] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate max-w-[180px] md:max-w-md">
            {project.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-gray-500 md:hover:text-red-500 active:text-red-600 transition-colors p-2 rounded-full md:hover:bg-red-50 dark:md:hover:bg-red-900/20 flex items-center justify-center"
            aria-label="ปิด"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>
      
      <div className="w-full flex flex-col items-center bg-white dark:bg-gray-950">
        <div 
          className="relative w-full group bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden aspect-[4/3] md:aspect-video md:h-[55vh] touch-pan-y cursor-pointer"
          onClick={() => setUiTrigger(prev => prev + 1)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-full h-full flex items-center justify-center p-2 md:p-0">
            <img
              key={activeSlide}
              src={project.slides[activeSlide] || project.imageUrl}
              alt={`${project.title} slide ${activeSlide + 1}`}
              className="w-full h-full object-contain drop-shadow-sm animate-fade-in-up select-none pointer-events-none"
              draggable="false"
            />
          </div>

          {totalSlides > 1 && (
            <>
              {activeSlide > 0 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-gray-500 md:hover:text-blue-600 dark:md:hover:text-blue-400 active:scale-90 transition-all z-20 drop-shadow-md flex items-center justify-center ${showArrows ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`}
                  aria-label="ก่อนหน้า"
                >
                  <FiChevronLeft size={36} />
                </button>
              )}
              {activeSlide < totalSlides - 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 dark:text-gray-500 md:hover:text-blue-600 dark:md:hover:text-blue-400 active:scale-90 transition-all z-20 drop-shadow-md flex items-center justify-center ${showArrows ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`}
                  aria-label="ถัดไป"
                >
                  <FiChevronRight size={36} />
                </button>
              )}
            </>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
            className={`absolute bottom-14 right-3 md:bottom-12 md:right-12 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-transparent text-gray-400 dark:text-gray-500 border-2 border-gray-300 dark:border-gray-600 rounded-full transition-all duration-300 z-30 active:scale-90 ${showArrows ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hover:border-blue-600 md:hover:text-blue-600`}
            aria-label="ขยายเต็มจอ"
          >
            <div className="flex items-center justify-center">
              <div className="md:hidden">
                <FiMaximize2 size={20} />
              </div>
              <div className="hidden md:block">
                <FiMaximize2 size={24} />
              </div>
            </div>
          </button>

          <div className={`absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 text-white rounded-full text-[10px] md:text-sm font-black backdrop-blur-md border border-white/10 transition-all duration-500 z-10 
            ${showPageNumber ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-2'} md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
            {activeSlide + 1} / {totalSlides}
          </div>
        </div>

        <div className="relative w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex justify-center pt-0 pb-4 md:py-6">
          <div 
            ref={scrollContainerRef}
            className="max-w-[1000px] w-full px-4 md:px-6 overflow-x-auto scroll-auto scrollbar-custom-blue"
            style={{ paddingBottom: '12px' }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .scrollbar-custom-blue::-webkit-scrollbar { height: 6px; }
              .scrollbar-custom-blue::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
              .dark .scrollbar-custom-blue::-webkit-scrollbar-track { background: #111827; }
              .scrollbar-custom-blue::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
              .scrollbar-custom-blue::-webkit-scrollbar-thumb:hover { background: #2563eb; }
            `}} />
            <div className={`relative flex items-center ${totalSlides <= 8 ? 'justify-center' : 'justify-start'} gap-4 md:gap-6 min-w-max px-2 pt-1 pb-3 md:py-3`}>
              {project.slides.map((slide, index) => (
                <button
                  key={index}
                  ref={el => { thumbnailRefs.current[index] = el; }}
                  onClick={() => setActiveSlide(index)}
                  className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-[3px] md:border-4 outline-none transition-all duration-300 transform ${
                    activeSlide === index 
                      ? 'border-blue-600 shadow-xl shadow-blue-500/30 scale-110 z-10' 
                      : 'border-gray-200 dark:border-gray-700 opacity-60 md:hover:opacity-100 md:hover:scale-105'
                  }`}
                >
                  <img src={slide} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  <div className={`absolute bottom-1 right-1 px-1 py-0.5 rounded text-[8px] font-bold text-white backdrop-blur-sm transition-colors ${activeSlide === index ? 'bg-blue-600' : 'bg-black/60'}`}>
                    P{index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {project.title === 'RecommendationsAI' && (
            <div className="hidden md:flex absolute bottom-6 right-4 z-40 items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 px-3 py-1.5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/40 backdrop-blur-md">
              <span className="text-[11px] font-black text-gray-900 dark:text-white whitespace-nowrap">{t.demoVersion}</span>
              <img 
                src="/logoicon/Lovable-AI -bg.webp" 
                alt="Lovable-AI -bg" 
                className="h-4 w-auto object-contain opacity-100" 
              />
              <span className="text-[11px] font-black text-gray-900 dark:text-white whitespace-nowrap">{t.basedOnRealProject}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-10 md:space-y-14 flex-1 text-left">
            <div className="animate-fade-in-up">
              {project.title === 'RecommendationsAI' && (
                <div className="flex md:hidden items-center justify-center gap-1 mb-4 bg-gray-50/60 dark:bg-gray-800/40 px-2 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700/20">
                  <span className="text-[8px] font-black text-gray-800 dark:text-gray-200 whitespace-nowrap">{t.demoVersion}</span>
                  <img 
                    src="/logoicon/Lovable-AI -bg.webp" 
                    alt="Lovable-AI -bg"  
                    className="h-3 w-auto object-contain opacity-90" 
                  />
                  <span className="text-[8px] font-black text-gray-800 dark:text-gray-200 whitespace-nowrap">{t.basedOnRealProject}</span>
                </div>
              )}
              <div className="mb-8 md:mb-12 space-y-6 md:space-y-8 flex flex-col items-center">
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center w-full">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl md:rounded-2xl md:hover:bg-gray-200 dark:md:hover:bg-gray-700 transition-all font-bold transform hover:-translate-y-1 active:scale-95 text-sm md:text-2xl">
                      <span className="md:w-6 md:h-6"><FiGithub size={18} /></span>
                      <span>{t.sourceCode}</span>
                    </a>
                  )}
                </div>

                <div className="w-full">
                  <h4 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3 justify-center text-center">
                    <span className="text-blue-500"><FiTool /></span>
                    {t.toolsUsed}
                  </h4>
                  <div className="w-full bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-2xl md:rounded-[2.5rem] shadow-inner transition-all duration-300 hover:border-blue-500 overflow-hidden">
                    <div 
                      ref={tagsScrollRef}
                      onScroll={handleTagsScroll}
                      onTouchStart={() => setInteracting(true)}
                      onTouchEnd={() => setInteracting(false)}
                      onMouseDown={() => setInteracting(true)}
                      onMouseUp={() => setInteracting(false)}
                      onMouseLeave={() => setInteracting(false)}
                      className="w-full overflow-x-auto scrollbar-custom-blue cursor-pointer outline-none">
                      <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 767px) {
                          .scrollbar-custom-blue::-webkit-scrollbar { height: 4px; }
                          .scrollbar-custom-blue::-webkit-scrollbar-track { 
                            background: transparent; 
                            margin: 0 20px;
                          }
                          .scrollbar-custom-blue::-webkit-scrollbar-thumb { 
                            background: #3b82f6; 
                            border-radius: 10px;
                          }
                          .dark .scrollbar-custom-blue::-webkit-scrollbar-thumb { background: #3b82f6; }
                        }
                      `}} />
                      <div 
                        className="flex items-center justify-center py-3 md:py-6 px-4 md:px-8 flex-nowrap min-w-full w-max gap-1.5 md:gap-3"
                      >
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          tabIndex={0}
                          className={`flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 md:hover:border-blue-400 active:border-blue-500 focus:border-blue-500 active:ring-2 active:ring-blue-500/20 rounded-full shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0 outline-none
                            px-2 py-1.5 md:px-4 md:py-3`}
                        >
                          {renderTagIcon(tag)}
                          <span className={`font-bold text-gray-700 dark:text-gray-200 text-[10px] sm:text-xs md:text-xl`}>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
            <div className="space-y-5 md:space-y-8">
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight text-left">
                  {project.title}
                </h1>
                <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/50 dark:border-blue-800/30 shadow-xl shadow-blue-500/5">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 md:mb-5 flex items-center gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 bg-blue-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-blue-600/20">
                      <span className="md:w-6 md:h-6"><FiTarget size={20} /></span>
                    </div>
                    {t.projectOverview}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium whitespace-pre-wrap text-left">
                    {project.detailedDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2 md:mt-4">
              <div className="group p-6 md:p-8 bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-red-100/50 dark:border-red-900/30 shadow-xl shadow-red-500/5 transition-all duration-300 md:hover:shadow-red-500/10 md:hover:-translate-y-1">
                <h4 className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-red-700 dark:text-red-400 mb-4 md:mb-5">
                  <div className="p-2.5 md:p-3 bg-red-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-blue-600/20">
                    <span className="md:w-6 md:h-6"><FiAlertTriangle size={20} /></span>
                  </div>
                  {project.problemLabel || t.problemGoal}
                </h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium text-left">{project.problemGoal}</p>
              </div>
              <div className="group p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-emerald-100/50 dark:border-emerald-900/30 shadow-xl shadow-emerald-500/5 transition-all duration-300 md:hover:shadow-emerald-500/10 md:hover:-translate-y-1">
                <h4 className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 md:mb-5">
                  <div className="p-2.5 md:p-3 bg-emerald-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-emerald-600/20">
                    <span className="md:w-6 md:h-6"><FiZap size={20} /></span>
                  </div>
                  {project.solutionLabel || t.role}
                </h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium text-left">{project.myRole}</p>
              </div>
            </div>

            {/* Responsibilities: Show here for projects other than 'Social Listening Dashboard' */}
            {project.title !== 'Social Listening Dashboard' && responsibilitiesContent}

            {project.title === 'GeoCheck' && (
              <div className="mt-16 md:mt-24">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4">
                    <div className="p-2.5 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-3xl shadow-xl shadow-blue-600/30">
                      <span className="md:w-8 md:h-8"><FiMapPin size={24} /></span>
                    </div>
                    {t.workflowTitle}
                  </h3>
                  <div className="w-20 h-1.5 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="w-full">
                  <div className="flex flex-col md:flex-row md:overflow-x-auto pt-10 pb-12 px-4 md:px-8 no-scrollbar scroll-smooth gap-16 md:gap-0">
                    {project.customWorkflow?.map((item, idx, arr) => (
                      <div key={idx} className="flex items-start shrink-0 md:flex-1 group relative w-full md:w-auto">
                        <div className="flex flex-col items-center text-center w-full relative px-2">
                          
                          {/* Vertical Connector line (Mobile Only) */}
                          {idx < arr.length - 1 && (
                              <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 h-16 w-[3px] bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 z-0"></div>
                            )}

                          {/* Connector line (Desktop Only) */}
                          {idx < arr.length - 1 && (
                              <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[-50%] h-[3px] bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 z-0"></div>
                            )}
                          
                          {/* Icon Circle */}
                          <div className={`relative z-10 w-24 h-24 flex items-center justify-center rounded-[2rem] bg-white dark:bg-gray-800 border-4 border-${item.color}-500/20 text-${item.color}-600 dark:text-${item.color}-400 shadow-xl shadow-${item.color}-500/10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 mb-6`}>
                               <div className={`absolute inset-0 bg-${item.color}-500/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                               {item.step === 1 && <FiUser size={36} />}
                               {item.step === 2 && <FiTarget size={36} />}
                               {item.step === 3 && <FiCamera size={36} />}
                               {item.step === 4 && <FaTelegramPlane size={36} />}
                               {item.step === 5 && <FiBell size={36} />}
                               {item.step === 6 && <FiDatabase size={36} />}
                               <div className={`absolute -top-3 -right-3 w-10 h-10 bg-${item.color}-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg`}>
                                 {item.step}
                               </div>
                            </div>

                          <div className={`mb-3 inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${item.color}-50 dark:bg-${item.color}-900/30 text-${item.color}-700 dark:text-${item.color}-400`}>
                            {item.badge}
                          </div>
                          
                          <h4 className="text-xl font-black mb-2 text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-bold leading-snug px-4 max-w-xs md:max-w-none">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 animate-fade-in-up items-start">
                  <div className="group p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/50 dark:border-blue-800/40 shadow-2xl shadow-blue-500/5 transition-all duration-500 md:hover:shadow-blue-500/15 text-left h-full">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-blue-600/30">
                        <span className="md:w-8 md:h-8"><FiCheckCircle size={24} /></span>
                      </div>
                      {t.outcomes}
                    </h4>
                    <ul className="space-y-4">
                      {project.outcomes?.map((item, index) => (
                        <li key={index} className="flex gap-4 items-center group/li">
                          <div className="w-2 h-2 shrink-0 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 group-hover/li:scale-150 transition-transform"></div>
                          <p className="text-gray-800 dark:text-gray-200 leading-tight text-xl font-medium">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="group p-6 md:p-8 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-purple-100/50 dark:border-purple-800/40 shadow-2xl shadow-purple-500/5 transition-all duration-500 md:hover:shadow-purple-500/15 text-left h-full">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-purple-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-purple-600/30">
                        <span className="md:w-8 md:h-8"><FiStar size={24} /></span>
                      </div>
                      {t.projectSummary}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium whitespace-pre-wrap">
                      {project.projectSummary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {project.title === 'Bot Creates File Banner' && (
              <div className="mt-16 md:mt-24">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4">
                    <div className="p-2.5 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-3xl shadow-xl shadow-blue-600/30">
                      <span className="md:w-8 md:h-8"><FiActivity size={24} /></span>
                    </div>
                    {t.workflowTitle}
                  </h3>
                  <div className="w-20 h-1.5 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto py-10">
                  <div className="flex flex-col items-center">
                    {project.workflowSteps?.map((step, idx) => {
                      const icons = [
                        <FiUser size={40} />,
                        <SiGoogleforms size={40} />,
                        <FaFileExcel size={40} />,
                        <FaRobot size={40} />,
                        <FaFileArchive size={40} />,
                        <GiRabbit size={40} />
                      ];
                      
                      const colors = [
                        '#8B4513',
                        '#4c1d95',
                        'green-600',
                        'blue-600',
                        'yellow-500',
                        'indigo-600'
                      ];

                      if (step.step <= 4) {
                        return (
                          <React.Fragment key={idx}>
                            <div className="relative flex flex-col items-center">
                              <div className={`z-10 w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 border-4 ${colors[idx].startsWith('#') ? '' : 'border-' + colors[idx]} flex items-center justify-center shadow-xl`} style={colors[idx].startsWith('#') ? { borderColor: colors[idx] } : {}}>
                                <span style={colors[idx].startsWith('#') ? { color: colors[idx] } : {}} className={colors[idx].startsWith('#') ? '' : `text-${colors[idx]}`}>{icons[idx]}</span>
                              </div>
                              <div className="mt-6 font-black text-gray-800 dark:text-white text-lg md:text-2xl max-w-xs flex items-start justify-center">
                                <span className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-blue-600 text-white text-sm md:text-lg mr-2 shrink-0 -mt-1 md:-mt-1.5">{step.step}</span>
                                <div className={step.step === 1 ? "text-left" : "text-center"}>{step.title}</div>
                              </div>
                            </div>
                            <div className="w-1 h-16 bg-blue-500 opacity-30 my-4"></div>
                          </React.Fragment>
                        );
                      }

                      if (step.step === 5) {
                        return (
                          <div key={idx} className="w-full flex flex-col items-center mt-4">
                            <div className="w-full flex h-12">
                              <div className="flex-1 relative flex justify-center">
                                <div className="w-1 h-full bg-blue-500 opacity-30"></div>
                                <div className="absolute top-0 left-1/2 right-0 h-1 bg-blue-500 opacity-30"></div>
                              </div>
                              <div className="w-4 md:w-20 relative">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 opacity-30"></div>
                              </div>
                              <div className="flex-1 relative flex justify-center">
                                <div className="w-1 h-full bg-blue-500 opacity-30"></div>
                                <div className="absolute top-0 left-0 right-1/2 h-1 bg-blue-500 opacity-30"></div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:gap-20 w-full pt-0">
                              <div className="flex flex-col items-center">
                                <div className="z-10 w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 border-4 border-yellow-500 flex items-center justify-center shadow-xl shadow-yellow-500/20">
                                  <span className="text-yellow-500">{icons[4]}</span>
                                </div>
                                <div className="mt-6 font-black text-gray-800 dark:text-white text-base md:text-2xl leading-tight px-2 flex items-start justify-center">
                                  <span className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-blue-600 text-white text-xs md:text-lg mr-2 shrink-0 -mt-1 md:-mt-1.5">5</span>
                                  <div className="text-center">{step.title}</div>
                                </div>
                              </div>
                              {project.workflowSteps[5] && (
                                <div className="flex flex-col items-center">
                                  <div className="z-10 w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 border-4 border-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                                    <span className="text-purple-600">{icons[5]}</span>
                                  </div>
                                  <div className="mt-6 font-black text-gray-800 dark:text-white text-base md:text-2xl leading-tight px-2 flex items-start justify-center">
                                    <span className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-blue-600 text-white text-sm md:text-lg mr-2 shrink-0 -mt-1 md:-mt-1.5">6</span>
                                    <div className="text-center">{project.workflowSteps[5].title}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 animate-fade-in-up items-start">
                  <div className="group p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/50 dark:border-blue-800/40 shadow-2xl shadow-blue-500/5 transition-all duration-500 md:hover:shadow-blue-500/15 text-left h-full">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-blue-600/30">
                        <span className="md:w-8 md:h-8"><FiCheckCircle size={24} /></span>
                      </div>
                      {t.outcomes}
                    </h4>
                    <ul className="space-y-4">
                      {project.outcomes?.map((item, index) => (
                        <li key={index} className="flex gap-4 items-center group/li">
                          <div className="w-2 h-2 shrink-0 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 group-hover/li:scale-150 transition-transform"></div>
                          <p className="text-gray-800 dark:text-gray-200 leading-tight text-xl font-medium">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="group p-6 md:p-8 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-purple-100/50 dark:border-purple-800/40 shadow-2xl shadow-purple-500/5 transition-all duration-500 md:hover:shadow-purple-500/15 text-left h-full">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-purple-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-purple-600/30">
                        <span className="md:w-8 md:h-8"><FiStar size={24} /></span>
                      </div>
                      {t.projectSummary}
                    </h4>
                    <div className="space-y-6">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium">
                        {project.projectSummary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(project.dataSource || project.dataPrep) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                {project.dataSource && (
                  <div className="group p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/50 dark:border-blue-900/30 shadow-xl shadow-blue-500/5 transition-all duration-300 md:hover:shadow-blue-500/10 md:hover:-translate-y-1 text-left">
                    <h4 className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 md:mb-5">
                      <div className="p-2.5 md:p-3 bg-blue-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-blue-600/20">
                        <span className="md:w-6 md:h-6"><FiDatabase size={20} /></span>
                      </div>
                      {t.dataSource}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium whitespace-pre-wrap">
                      {project.dataSource}
                    </p>
                  </div>
                )}
                {project.dataPrep && (
                  <div className="group p-6 md:p-8 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/10 dark:to-gray-900 rounded-[2rem] md:rounded-[2.5rem] border border-indigo-100/50 dark:border-indigo-900/30 shadow-xl shadow-emerald-500/5 transition-all duration-300 md:hover:shadow-emerald-500/10 md:hover:-translate-y-1 text-left">
                    <h4 className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 md:mb-5">
                      <div className="p-2.5 md:p-3 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-indigo-600/20">
                        <span className="md:w-6 md:h-6"><FiLayers size={20} /></span>
                      </div>
                      {t.dataPrep}
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium whitespace-pre-wrap">
                      {project.dataPrep}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Responsibilities: Show here ONLY for 'Social Listening Dashboard' after data block */}
            {project.title === 'Social Listening Dashboard' && responsibilitiesContent}

            {project.title === 'Social Listening Dashboard' && (
              <>
                <div className="mt-16 md:mt-24 animate-fade-in-up">
                  <div className="text-center mb-12 md:mb-16 px-4">
                    <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white flex flex-col md:flex-row items-center gap-3 md:gap-5 justify-center">
                      <div className="p-3 md:p-4 bg-indigo-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-indigo-600/30">
                        <span className="md:w-10 md:h-10"><FiBarChart2 size={28} /></span>
                      </div>
                      <span>{t.analysisProcess}</span>
                    </h3>
                    <div className="w-24 h-1.5 bg-indigo-500 mx-auto mt-6 rounded-full opacity-50"></div>
                  </div>

                  <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
                      <div className="hidden md:flex absolute top-[40px] left-0 w-full justify-around items-center pointer-events-none z-0 px-20">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="text-indigo-200 dark:text-indigo-900/50 w-8 h-8"><FiArrowRight /></span>
                        ))}
                      </div>

                      {project.analysisProcessSteps?.map((step, idx) => {
                        const icons = [
                          <FiDatabase />,
                          <FiFilter />,
                          <FaFileExcel />,
                          <FiTrendingUp />,
                          <SiTableau />
                        ];
                        return (
                          <div key={idx} className="relative z-10 flex flex-col items-center group">
                            <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-[1.5rem] bg-white dark:bg-gray-800 border-2 border-${step.color}-500 text-${step.color}-500 shadow-xl shadow-${step.color}-500/10 transition-all duration-500 transform md:group-hover:scale-110 md:group-hover:-translate-y-2`}>
                              <span className="md:w-10 md:h-10">{React.cloneElement(icons[idx] as React.ReactElement<any>, { size: 32 })}</span>
                            </div>
                            <div className="mt-5 text-center px-2">
                              <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{step.title}</h4>
                              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-bold leading-relaxed">{step.detail}</p>
                            </div>
                            {idx < 4 && (
                              <div className="md:hidden w-1 h-8 bg-gradient-to-b from-indigo-200 to-transparent my-4"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 animate-fade-in-up">
                  <div className="group p-8 md:p-10 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[3rem] border border-blue-100/50 dark:border-blue-800/40 shadow-2xl shadow-blue-500/5 transition-all duration-500 md:hover:shadow-blue-500/15 text-left">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-blue-600/30">
                        <span className="md:w-8 md:h-8"><FiCheckCircle size={24} /></span>
                      </div>
                      {t.outcomes}
                    </h4>
                    <ul className="space-y-4 md:space-y-5">
                      {project.outcomes?.map((item, index) => (
                        <li key={index} className="flex gap-4 md:gap-5 items-start group/li">
                          <div className="w-2 md:w-2.5 h-2 md:h-2.5 mt-2 md:mt-2.5 shrink-0 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 md:group-hover/li:scale-150 transition-transform"></div>
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-bold">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="group p-8 md:p-10 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[3rem] border border-purple-100/50 dark:border-purple-800/40 shadow-2xl shadow-purple-500/5 transition-all duration-500 md:hover:shadow-purple-500/15 text-left">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-purple-600 text-white rounded-xl md:rounded-[1.5rem] shadow-xl shadow-purple-600/30">
                        <span className="md:w-8 md:h-8"><FiStar size={24} /></span>
                      </div>
                      {t.projectSummary}
                    </h4>
                    <div className="space-y-6">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium">
                        {project.projectSummary}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {project.workflowSteps && project.title !== 'Social Listening Dashboard' && project.title !== 'Bot Creates File Banner' && project.title !== 'GeoCheck' && (
              <div className="mt-16 md:mt-24 animate-fade-in-up">
                <div className="text-center mb-10 md:mb-16 px-4">
                  <h3 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 md:gap-5 justify-center">
                    <div className="p-2.5 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-3xl shadow-xl shadow-blue-600/30">
                      <span className="md:w-8 md:h-8"><FiActivity size={24} /></span>
                    </div>
                    <span className="text-left md:text-center">
                      {t.workflowTitle}
                    </span>
                  </h3>
                  
                  <div className={`mt-6 md:mt-10 border-t border-gray-100 dark:border-gray-800 pt-6 md:pt-8 ${project.title === 'RecommendationsAI' ? 'grid grid-cols-2 max-w-6xl mx-auto' : 'flex justify-center gap-6 md:gap-16'}`}>
                    <div className={`flex items-center justify-center ${project.title === 'RecommendationsAI' ? 'gap-4 md:gap-6' : 'gap-2'}`}>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <FiUser size={16} />
                      </div>
                      <span className="text-[10px] md:text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{t.userActor}</span>
                    </div>
                    <div className={`flex items-center justify-center ${project.title === 'RecommendationsAI' ? 'gap-4 md:gap-6' : 'gap-2'}`}>
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <FiCpu size={16} />
                      </div>
                      <span className="text-[10px] md:text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{t.systemActor}</span>
                    </div>
                  </div>
                </div>

                <div className="relative max-w-6xl mx-auto px-1 md:px-4">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 md:w-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="h-full w-full bg-gradient-to-b from-blue-500 via-emerald-500 to-blue-600 rounded-full opacity-30"></div>
                  </div>

                  <div className="space-y-6 md:space-y-12">
                    {project.workflowSteps.map((step, index) => {
                      const isUser = step.actor === 'user';
                      return (
                        <div key={index} className={`relative flex items-center w-full justify-between group ${isUser ? 'flex-row' : 'flex-row-reverse'}`}>
                          
                          <div className="absolute left-1/2 -translate-x-1/2 z-10">
                            <div className={`w-7 h-7 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-2xl bg-white dark:bg-gray-900 border-2 md:border-3 shadow-xl transition-all duration-700 transform md:group-hover:scale-110
                              ${isUser ? 'border-blue-500 text-blue-600 shadow-blue-500/20' : 'border-emerald-500 text-emerald-500 shadow-emerald-500/20'}`}>
                              <span className="text-[10px] md:text-lg font-black">{step.step}</span>
                            </div>
                          </div>

                          <div className={`w-[46%] md:w-[42%] transition-all duration-700 transform md:group-hover:-translate-y-1`}>
                            <div className={`p-2.5 sm:p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border shadow-2xl transition-all duration-500 relative overflow-hidden
                              ${isUser 
                                ? 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/30 text-right' 
                                : 'bg-white dark:bg-gray-800 border-emerald-100 dark:border-emerald-900/30 text-left'}`}
                            >
                              <div className={`flex items-center gap-1.5 md:gap-4 mb-1.5 md:mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`p-1.5 md:p-2.5 rounded-lg md:rounded-xl shrink-0 shadow-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                  {isUser ? <span className="md:w-5 md:h-5"><FiUser size={12} /></span> : <span className="md:w-5 md:h-5"><FiCpu size={12} /></span>}
                                </div>
                                <h4 className={`text-[10px] sm:text-base md:text-xl font-black leading-tight break-words
                                  ${isUser ? 'text-blue-900 dark:text-blue-100' : 'text-emerald-900 dark:text-emerald-100'}`}>
                                  {step.title}
                                </h4>
                              </div>
                              <p className="text-[11px] sm:text-base md:text-xl text-gray-700 dark:text-gray-300 leading-tight md:leading-relaxed font-bold break-words">
                                {step.detail}
                              </p>
                            </div>
                          </div>
                          <div className="w-[46%] md:w-[42%]"></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {project.businessConcept && project.title !== 'GeoCheck' && (
              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 animate-fade-in-up">
                {project.outcomes && (
                  <div className="group p-8 md:p-10 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[3rem] border border-blue-100/50 dark:border-blue-800/40 shadow-2xl shadow-blue-500/5 transition-all duration-500 md:hover:shadow-blue-500/15 text-left">
                    <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-blue-600 text-white rounded-xl md:rounded-3xl shadow-xl shadow-blue-600/30">
                        <span className="md:w-8 md:h-8"><FiCheckCircle size={24} /></span>
                      </div>
                      {t.outcomes}
                    </h4>
                    <ul className="space-y-4 md:space-y-5">
                      {project.outcomes.map((item, index) => (
                        <li key={index} className="flex gap-4 md:gap-5 items-start group/li">
                          <div className="w-2 md:w-2.5 h-2 md:h-2.5 mt-2 md:mt-2.5 shrink-0 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 md:group-hover/li:scale-150 transition-transform"></div>
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-bold">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="group p-8 md:p-10 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-[2rem] md:rounded-[3rem] border border-purple-100/50 dark:border-purple-800/40 shadow-2xl shadow-purple-500/5 transition-all duration-500 md:hover:shadow-purple-500/15 text-left">
                  <h4 className="flex items-center gap-4 md:gap-5 text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-6 md:mb-8">
                    <div className="p-3 md:p-4 bg-purple-600 text-white rounded-xl md:rounded-3xl shadow-xl shadow-purple-600/30">
                      {project.title === 'RecommendationsAI' ? <span className="md:w-8 md:h-8"><FiStar size={24} /></span> : <span className="md:w-8 md:h-8"><FiTrendingUp size={24} /></span>}
                    </div>
                    {project.title === 'RecommendationsAI' ? t.projectSummary : t.businessConceptLabel}
                  </h4>
                  {project.title === 'RecommendationsAI' ? (
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium whitespace-pre-wrap text-left">
                      {project.projectSummary}
                    </p>
                  ) : (
                    <ul className="space-y-4 md:space-y-5">
                      {project.businessConcept.map((item, index) => (
                        <li key={index} className="flex gap-4 md:gap-5 items-start group/li">
                          <div className="w-2 md:w-2.5 h-2 md:h-2.5 mt-2 md:mt-2.5 shrink-0 rounded-full bg-purple-500 shadow-lg shadow-blue-500/50 md:group-hover/li:scale-150 transition-transform"></div>
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-bold">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-500 animate-fade-in-up touch-pan-y"
          onClick={() => setIsZoomed(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full transition-all z-[210] backdrop-blur-md border border-white/20 active:scale-90"
            aria-label={language === 'th' ? 'ย่อกลับ' : 'Minimize'}
          >
            <FiMinimize2 size={32} />
          </button>

          {totalSlides > 1 && (
            <>
              {activeSlide > 0 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className={`absolute left-2 md:left-10 top-1/2 -translate-y-1/2 p-2 text-gray-400 md:hover:text-blue-400 active:scale-90 transition-all z-[210] drop-shadow-md flex items-center justify-center ${showArrows ? 'opacity-100' : 'opacity-0'} md:opacity-100`}
                  aria-label={language === 'th' ? 'ก่อนหน้า' : 'Previous'}
                >
                  <FiChevronLeft size={48} />
                </button>
              )}
              {activeSlide < totalSlides - 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className={`absolute right-2 md:right-10 top-1/2 -translate-y-1/2 p-2 text-gray-400 md:hover:text-blue-400 active:scale-90 transition-all z-[210] drop-shadow-md flex items-center justify-center ${showArrows ? 'opacity-100' : 'opacity-0'} md:opacity-100`}
                  aria-label={language === 'th' ? 'ถัดไป' : 'Next'}
                >
                  <FiChevronRight size={48} />
                </button>
              )}
            </>
          )}

          <img
            key={`zoomed-${activeSlide}`}
            src={project.slides[activeSlide] || project.imageUrl}
            alt="Zoomed project view"
            className="max-w-full max-h-[90vh] object-contain select-none drop-shadow-2xl animate-fade-in-up cursor-pointer"
            draggable="false"
          />

          <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 text-white rounded-full text-lg font-black backdrop-blur-md border border-white/20 transition-all duration-500 z-[210] ${showPageNumber ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} md:opacity-100 md:translate-y-0`}>
            {activeSlide + 1} / {totalSlides}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;