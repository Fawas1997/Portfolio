import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { FaLaptopCode, FaChartSimple, FaRobot, FaChartLine, FaCommentDots, FaLocationDot } from 'react-icons/fa6';

import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import Hero3DBackground from './Hero3DBackground';

interface HeroProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const Hero: React.FC<HeroProps> = ({ scrollContainerRef }) => {
  const { language } = useLanguage();
  const t = translations[language].hero;


  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current;
    const element = id === 'hero' ? null : document.getElementById(id);
    if (container) {
      let targetPosition = 0;
      if (element && id !== 'hero') {
        let offsetTop = 0;
        let el: HTMLElement | null = element;
        while (el && el !== container && el !== document.documentElement) {
          offsetTop += el.offsetTop;
          el = el.offsetParent as HTMLElement;
        }
        targetPosition = offsetTop;
      }
      
      const startPosition = container.scrollTop;
      const distance = targetPosition - startPosition;

      const duration = Math.min(Math.abs(distance) * 0.8 + 500, 1600);

      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        container.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          container.scrollTo(0, targetPosition);
        }
      };

      function easeInOutCubic(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  };

  const projectTags = [
    { name: "AI Recommendations Web", icon: <FaLaptopCode /> },
    { name: "Social Listening Dashboard", icon: <FaChartLine /> },
    { name: "Chatbot create file banner", icon: <FaCommentDots /> },
    { name: "Geo Check in", icon: <FaLocationDot /> }
  ];

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-screen flex items-center bg-white dark:bg-gray-950 transition-colors duration-500 py-4 lg:py-0 pt-[110px] md:pt-[81px]">
      {/* Background Gradient Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-white dark:bg-gray-950">
        {/* Ambient Gradient Mesh - Dark Mode */}
        <div className="hidden dark:block absolute inset-0 opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
          
          {/* Fill Top Right and Bottom Right completely */}
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/15 blur-[120px]"></div>
          <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-blue-600/15 blur-[120px]"></div>
          <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]"></div>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full space-y-4 lg:space-y-10 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-3 lg:space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-4 mb-4"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -20, 20, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block origin-bottom-right text-4xl md:text-5xl"
                >
                  👋
                </motion.span>
                <span className="text-xl md:text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                  {t.greeting}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight lg:leading-[1.15] tracking-tighter"
              >
                <span className="flex flex-row items-baseline justify-center lg:justify-start gap-2 lg:gap-4 whitespace-nowrap">
                  <span>{t.name}</span>
                  <span className="text-blue-600 dark:text-blue-400 text-2xl md:text-4xl lg:text-[0.6em] font-bold opacity-90">{t.nickname}</span>
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-base md:text-2xl font-medium text-gray-700 dark:text-gray-300"
              >
                <span className="text-sm md:text-xl font-bold text-gray-800 dark:text-gray-200">{t.internshipExp}</span>
                <div className="flex flex-wrap justify-center gap-2">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-black rounded-full shadow-[0_3px_0_#1e3a8a] hover:shadow-[0_5px_0_#1e3a8a] transition-all duration-200 cursor-default"
                  >
                    <span className="text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]"><FaLaptopCode size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">{language === 'th' ? 'Web' : 'Web'}</span>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-black rounded-full shadow-[0_3px_0_#1e3a8a] hover:shadow-[0_5px_0_#1e3a8a] transition-all duration-200 cursor-default"
                  >
                    <span className="text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]"><FaChartSimple size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">{language === 'th' ? 'Data' : 'Data'}</span>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-black rounded-full shadow-[0_3px_0_#1e3a8a] hover:shadow-[0_5px_0_#1e3a8a] transition-all duration-200 cursor-default"
                  >
                    <span className="text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]"><FaRobot size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">{language === 'th' ? 'AI' : 'AI'}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-semibold tracking-tight whitespace-pre-line"
              >
                {t.description.includes('บทบาทในสายเทคโนโลยี') ? (
                  <>
                    {t.description.split('บทบาทในสายเทคโนโลยี')[0]}
                    <span className="block lg:inline">บทบาทในสายเทคโนโลยี</span>
                  </>
                ) : t.description}
              </motion.p>
            </div>

            {/* Desktop Tags Marquee */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:block relative w-full max-w-2xl overflow-hidden py-4 -mt-4 -mx-4 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex w-max"
                style={{ willChange: "transform" }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 pr-4">
                    {projectTags.map((tag, idx) => (
                      <motion.div
                        key={`${tag.name}-${i}-${idx}`}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-xs md:text-sm font-bold border-2 border-gray-100 border-b-gray-200 dark:border-gray-700 dark:border-b-gray-900 shadow-[0_4px_0_#d1d5db] dark:shadow-[0_4px_0_#000000] hover:shadow-[0_6px_0_#d1d5db] dark:hover:shadow-[0_6px_0_#000000] transition-all whitespace-nowrap cursor-default tracking-tight"
                      >
                        <div className="flex items-center justify-center w-7 h-7 bg-blue-50 dark:bg-white/10 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_#ffffff] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] border border-blue-200 dark:border-white/10 flex-shrink-0">
                          <span className="text-sm text-blue-600 dark:text-blue-400 drop-shadow-[0_1px_0_#1e3a8a] dark:drop-shadow-[0_1px_0_#000000]">{tag.icon}</span>
                        </div>
                        {tag.name}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Mobile Marquee Tags */}
            <motion.div
              variants={itemVariants}
              className="lg:hidden relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)]"
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex w-max"
                style={{ willChange: "transform" }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 pr-4">
                    {projectTags.map((tag, idx) => (
                      <div
                        key={`${tag.name}-${i}-${idx}`}
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl text-xs font-bold border-2 border-gray-100 border-b-gray-200 dark:border-gray-700 dark:border-b-gray-900 shadow-[0_4px_0_#d1d5db] dark:shadow-[0_4px_0_#000000] whitespace-nowrap tracking-tight"
                      >
                        <div className="flex items-center justify-center w-7 h-7 bg-blue-50 dark:bg-white/10 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_#ffffff] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] border border-blue-200 dark:border-white/10 flex-shrink-0">
                          <span className="text-sm text-blue-600 dark:text-blue-400 drop-shadow-[0_1px_0_#1e3a8a] dark:drop-shadow-[0_1px_0_#000000]">{tag.icon}</span>
                        </div>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 lg:pt-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 4 }}
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 lg:px-14 py-3.5 lg:py-5 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-black rounded-full transition-all duration-200 overflow-hidden shadow-[0_6px_0_#1e3a8a] hover:shadow-[0_8px_0_#1e3a8a] active:shadow-[0_2px_0_#1e3a8a]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 lg:gap-4 tracking-tighter text-base lg:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  {t.myWork}
                  <span className="flex items-center -space-x-1.5 overflow-visible drop-shadow-[0_3px_0_#1e3a8a] lg:translate-y-[3px]">
                    <span className="animate-[slide_1.5s_infinite] opacity-40 inline-block w-5 h-5 lg:w-6 lg:h-6"><FiChevronRight size={language === 'th' ? 20 : 24} /></span>
                    <span className="animate-[slide_1.5s_infinite_200ms] opacity-70 inline-block w-6 h-6 lg:w-8 lg:h-8"><FiChevronRight size={language === 'th' ? 24 : 32} /></span>
                    <span className="animate-[slide_1.5s_infinite_400ms] inline-block w-7 h-7 lg:w-9 lg:h-9 text-white"><FiChevronRight size={language === 'th' ? 30 : 38} /></span>
                  </span>
                </span>

                {/* Custom Animation Keyframes for Triple Chevron */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes slide {
                    0%, 100% { transform: translateX(0); opacity: 0.3; }
                    50% { transform: translateX(5px); opacity: 1; }
                  }
                `}} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2 lg:translate-x-6 xl:translate-x-10"
          >
            <div className="relative w-full max-w-[140px] sm:max-w-[200px] md:max-w-[450px] lg:max-w-[550px]">

              {/* Premium Orbital Portrait */}
              <div className="aspect-square relative z-10">
                
                {/* Centered 3D Aura Globe */}
                <div className="absolute inset-[-50%] lg:inset-[-30%] z-[-1] pointer-events-none">
                     <Hero3DBackground />
                </div>

                {/* Soft Ambient Backdrop */}
                <div
                  className="absolute inset-[-8%] rounded-full pointer-events-none opacity-60 dark:opacity-40 blur-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)',
                  }}
                />

                {/* Pop-out Portrait (Out of Bounds Effect) */}
                <motion.div
                  className="relative w-full h-full group z-10 select-none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ WebkitTouchCallout: 'none' }}
                >
                  {/* Gradient Circle Background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 z-0 shadow-inner"></div>

                  {/* Bottom Half: Clipped to the circle */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-10">
                    <img
                      src="/logoprofile/profilenew.webp"
                      alt={t.name}
                      className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none select-none"
                      draggable="false"
                    />
                  </div>

                  {/* Top Half: Unclipped so the head pops out */}
                  <div className="absolute inset-0 z-20 pointer-events-none" style={{ clipPath: 'inset(-50% -20% 50% -20%)' }}>
                    <img
                      src="/logoprofile/profilenew.webp"
                      alt={t.name}
                      className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none select-none"
                      draggable="false"
                    />
                  </div>
                </motion.div>


              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;