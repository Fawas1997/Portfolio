
import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface HeaderProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ scrollContainerRef }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const manual = localStorage.getItem('theme-manual');
    if (manual) return manual;
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  });
  const [animationKey, setAnimationKey] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTopRef = React.useRef(0);
  const isScrollingRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);
  const activeSectionRef = React.useRef('hero');
  const isVisibleRef = React.useRef(true);

  const navLinks = [
    { title: t.home, id: 'hero' },
    { title: t.about, id: 'about' },
    { title: t.projects, id: 'projects' },
    { title: t.experience, id: 'experience' },
    { title: t.contact, id: 'contact' },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (isOpen) {
      document.documentElement.classList.add('menu-open');
      if (container) container.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('menu-open');
      if (container) container.style.overflow = '';
    }
    return () => {
      document.documentElement.classList.remove('menu-open');
      if (container) container.style.overflow = '';
    };
  }, [isOpen, scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Section IDs cached to avoid re-creating array each call
    const sectionIds = ['hero', 'about', 'projects', 'experience', 'contact'];

    const processScroll = () => {
      rafRef.current = null;
      if (isScrollingRef.current) return;

      const currentScrollTop = container.scrollTop;
      const lastScrollTop = lastScrollTopRef.current;

      // Determine scroll direction and visibility — only setState when changed
      let newVisible = isVisibleRef.current;
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        newVisible = false;
      } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 0) {
        newVisible = true;
      }
      if (newVisible !== isVisibleRef.current) {
        isVisibleRef.current = newVisible;
        setIsVisible(newVisible);
      }

      lastScrollTopRef.current = currentScrollTop;

      // Handle active section detection
      let currentSectionId = 'hero';
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && currentScrollTop >= section.offsetTop - 100) {
          currentSectionId = id;
        }
      }

      if ((container.clientHeight + currentScrollTop) >= container.scrollHeight - 50) {
        currentSectionId = 'contact';
      }

      // Only setState when section actually changed
      if (currentSectionId !== activeSectionRef.current) {
        activeSectionRef.current = currentSectionId;
        setActiveSection(currentSectionId);
      }

      // Scrollbar visibility
      if (currentScrollTop > 700) {
        container.classList.remove('hide-scrollbar');
      } else {
        container.classList.add('hide-scrollbar');
      }
    };

    const handleScroll = () => {
      // Throttle with requestAnimationFrame — runs at most once per frame (~16ms)
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(processScroll);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set state correctly
    processScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme-manual', next);
    setTheme(next);
  };

  const toggleLang = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Mark as scrolling to disable header hide/show logic and active section detection
    isScrollingRef.current = true;

    const isMobile = window.innerWidth < 768;

    // Close mobile menu
    setIsOpen(false);
    setActiveSection(id);
    activeSectionRef.current = id;

    const element = id === 'hero' ? null : document.getElementById(id);
    const targetPosition = id === 'hero' ? 0 : (element ? element.offsetTop : 0);
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;

    // If already at target, skip animation
    if (Math.abs(distance) < 2) {
      isScrollingRef.current = false;
      return;
    }

    // Snappy duration: shorter and capped at 800ms
    const duration = Math.min(Math.abs(distance) * 0.3 + 300, 800);

    let start: number | null = null;

    function easeInOutCubic(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    }

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

      container.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        container.scrollTo(0, targetPosition);
        // Small delay before re-enabling scroll detection to avoid jumpy behavior
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
    };

    // On mobile, wait for the menu closing animation to finish slightly before scrolling
    // to avoid heavy CPU usage causing stutter
    const delay = isMobile ? 300 : 0;

    if (delay > 0) {
      setTimeout(() => {
        requestAnimationFrame(animation);
      }, delay);
    } else {
      requestAnimationFrame(animation);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-transform duration-500 md:duration-400 ease-out will-change-transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center py-2 md:py-4">
          <div
            key={animationKey}
            className={`text-2xl font-bold text-gray-900 dark:text-white cursor-pointer animate-typewriter relative ${isOpen ? 'z-30' : 'z-10'}`}
            onClick={() => scrollToSection('hero')}>
            <span className="text-blue-600 dark:text-blue-400">{t.portfolio.slice(0, 4)}</span>{t.portfolio.slice(4)}
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-300 font-medium relative group ${activeSection === link.id
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                    }`}
                >
                  {link.title}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transition-transform duration-300 origin-center group-hover:scale-x-100 ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                    }`}></span>
                </button>
              ))}
              <a
                href="/logoprofile/Resume_Fawas_Thongkham_IT_Software_AI_Data.pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ml-4"
              >
                <FiDownload size={16} />
                Resume
              </a>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ml-4 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={22} /> : <FiMoon size={22} />}
              </button>
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ml-4 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                aria-label="Toggle language"
              >
                <img
                  src={language === 'th' ? '/logoicon/TH.webp' : '/logoicon/EN.webp'}
                  alt={language.toUpperCase()}
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[24px]">{language.toUpperCase()}</span>
              </button>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[60] w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block w-8 h-1 bg-blue-600 dark:bg-white mb-1.5 rounded-full"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block w-8 h-1 bg-blue-600 dark:bg-white mb-1.5 rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block w-8 h-1 bg-blue-600 dark:bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Transparent Backdrop to maintain click-to-close functionality */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-transparent z-40 md:hidden"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 right-0 h-screen w-[75%] bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col pt-24"
              >
                <nav className="flex flex-col items-center py-4 px-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={() => scrollToSection(link.id)}
                      className={`py-4 text-xl w-full font-bold transition-colors duration-300 text-center border-b border-gray-100 dark:border-gray-800 last:border-none ${activeSection === link.id
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                        }`}
                    >
                      {link.title}
                    </motion.button>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-8 mt-8 mb-8 w-full"
                  >
                    <button
                      onClick={() => {
                        toggleTheme();
                        setTimeout(() => setIsOpen(false), 100);
                      }}
                      className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                      aria-label="Toggle theme"
                    >
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                        {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>

                    <button
                      onClick={() => {
                        toggleLang();
                        setTimeout(() => setIsOpen(false), 100);
                      }}
                      className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                      aria-label="Toggle language"
                    >
                      <div className="p-1 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                        <img
                          src={language === 'th' ? '/logoicon/TH.webp' : '/logoicon/EN.webp'}
                          alt={language.toUpperCase()}
                          className="w-12 h-12 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">{language.toUpperCase()}</span>
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full flex justify-center pb-10"
                  >
                    <a
                      href="/logoprofile/Resume_Fawas_Thongkham_IT_Software_AI_Data.pdf.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white font-bold rounded-full shadow-xl shadow-blue-500/30 active:scale-95 transition-all duration-300"
                    >
                      <FiDownload size={20} />
                      Resume
                    </a>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
