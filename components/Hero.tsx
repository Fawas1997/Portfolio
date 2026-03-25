import React from 'react';
import { FiGlobe, FiDatabase, FiCpu, FiLayout, FiBarChart2, FiMessageSquare, FiArrowRight, FiMapPin } from 'react-icons/fi';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface HeroProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const Hero: React.FC<HeroProps> = ({ scrollContainerRef }) => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const element = id === 'hero' ? null : document.getElementById(id);
    const targetPosition = id === 'hero' ? 0 : (element ? element.offsetTop : 0);
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

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-screen flex items-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-500 py-4 lg:py-0 pt-[110px] md:pt-[81px]">
      <div className="container mx-auto px-6 md:px-12">
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
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black rounded-xl border border-blue-100 dark:border-blue-800/50 shadow-sm cursor-default"
                  >
                    <span className="text-blue-500"><FiLayout size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight">{language === 'th' ? 'Web' : 'Web'}</span>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black rounded-xl border border-blue-100 dark:border-blue-800/50 shadow-sm cursor-default"
                  >
                    <span className="text-blue-500"><FiBarChart2 size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight">{language === 'th' ? 'Data' : 'Data'}</span>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black rounded-xl border border-blue-100 dark:border-blue-800/50 shadow-sm cursor-default"
                  >
                    <span className="text-blue-500"><FiCpu size={14} /></span>
                    <span className="text-[10px] md:text-base uppercase tracking-tight">{language === 'th' ? 'AI' : 'AI'}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-semibold tracking-tight whitespace-pre-line"
              >
                {t.description}
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
                    {[
                      { name: "AI Recommendations Web", icon: <FiLayout /> },
                      { name: "Social Listening Dashboard", icon: <FiBarChart2 /> },
                      { name: "Chatbot create file banner", icon: <FiMessageSquare /> },
                      { name: "Geo Check in", icon: <FiMapPin /> }
                    ].map((tag, idx) => (
                      <motion.div
                        key={`${tag.name}-${i}-${idx}`}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-xs md:text-sm font-bold border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow whitespace-nowrap cursor-default tracking-tight"
                      >
                        <span className="text-blue-500">{tag.icon}</span>
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
                    {[
                      { name: "AI Recommendations Web", icon: <FiLayout /> },
                      { name: "Social Listening Dashboard", icon: <FiBarChart2 /> },
                      { name: "Chatbot create file banner", icon: <FiMessageSquare /> },
                      { name: "Geo Check in", icon: <FiMapPin /> }
                    ].map((tag, idx) => (
                      <div
                        key={`${tag.name}-${i}-${idx}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl text-xs font-bold shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] whitespace-nowrap tracking-tight"
                      >
                        <span className="text-blue-500">{tag.icon}</span>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 lg:pt-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 lg:px-14 py-3.5 lg:py-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white font-black rounded-xl lg:rounded-2xl transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 lg:gap-3 tracking-tighter text-base lg:text-xl">
                  {t.myWork}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-lg lg:text-2xl"><FiArrowRight /></span>
                  </motion.span>
                </span>

                {/* Glassy Shine Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>

                {/* Subtle Inner Border */}
                <div className="absolute inset-0 rounded-xl lg:rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="flex-1 w-full flex justify-center lg:justify-end order-1 lg:order-2 lg:pr-16"
          >
            <div className="relative w-full max-w-[140px] sm:max-w-[200px] md:max-w-[450px] lg:max-w-[550px]">
              {/* Animated Sparkles (Stars) Outside the Frame */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {[
                  // Top edge
                  { top: '-12%', left: '10%', delay: 0, size: 22, className: "" },
                  { top: '-10%', left: '30%', delay: 0.5, size: 16, className: "hidden lg:block" },
                  { top: '-15%', left: '50%', delay: 1, size: 24, className: "" },
                  { top: '-10%', left: '70%', delay: 1.5, size: 18, className: "hidden lg:block" },
                  { top: '-12%', left: '90%', delay: 2, size: 20, className: "" },
                  // Right edge - More stars and slightly inward to avoid clipping
                  { top: '5%', right: '-8%', delay: 0.2, size: 24, className: "" },
                  { top: '15%', right: '-2%', delay: 0.6, size: 18, className: "hidden lg:block" },
                  { top: '25%', right: '-10%', delay: 1.0, size: 22, className: "" },
                  { top: '35%', right: '-4%', delay: 1.4, size: 26, className: "hidden lg:block" },
                  { top: '45%', right: '-12%', delay: 0.4, size: 20, className: "" },
                  { top: '55%', right: '-6%', delay: 0.9, size: 18, className: "hidden lg:block" },
                  { top: '65%', right: '-10%', delay: 1.3, size: 22, className: "" },
                  { top: '75%', right: '-4%', delay: 1.7, size: 16, className: "hidden lg:block" },
                  { top: '85%', right: '-12%', delay: 2.1, size: 20, className: "" },
                  { top: '95%', right: '-6%', delay: 2.5, size: 24, className: "hidden lg:block" },
                  // Bottom edge
                  { bottom: '-12%', left: '10%', delay: 0.4, size: 20, className: "" },
                  { bottom: '-10%', left: '30%', delay: 0.9, size: 24, className: "hidden lg:block" },
                  { bottom: '-15%', left: '50%', delay: 1.4, size: 16, className: "" },
                  { bottom: '-10%', left: '70%', delay: 1.9, size: 22, className: "hidden lg:block" },
                  { bottom: '-12%', left: '90%', delay: 2.4, size: 18, className: "" },
                  // Left edge
                  { top: '10%', left: '-12%', delay: 0.6, size: 24, className: "" },
                  { top: '30%', left: '-10%', delay: 1.1, size: 18, className: "hidden lg:block" },
                  { top: '50%', left: '-15%', delay: 1.6, size: 22, className: "" },
                  { top: '70%', left: '-10%', delay: 2.1, size: 16, className: "hidden lg:block" },
                  { top: '90%', left: '-12%', delay: 2.6, size: 20, className: "" },
                ].map((star, i) => (
                  <motion.div
                    key={i}
                    className={`absolute text-blue-500 dark:text-blue-400 ${star.className}`}
                    style={{
                      top: star.top,
                      left: star.left,
                      right: star.right,
                      bottom: star.bottom
                    }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 90, 180],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: star.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <Star size={star.size} className="fill-current scale-50 lg:scale-100" />
                  </motion.div>
                ))}
              </div>

              {/* Soft Gradient Border Wrapper */}
              <div className="aspect-square relative p-[6px] lg:p-[12px] rounded-3xl lg:rounded-[3rem] bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 transition-transform duration-700 ease-out overflow-hidden z-10">
                <div className="w-full h-full relative z-10 overflow-hidden rounded-2xl lg:rounded-[2.2rem] bg-white dark:bg-gray-900">
                  <img
                    src="/logoprofile/profile.webp"
                    alt={t.name}
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;