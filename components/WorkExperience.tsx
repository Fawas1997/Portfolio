
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const workExperienceLogos = [
  ["/logoicon/Emquartier.webp"],
  [
    "/logoicon/Lineman.webp",
    "/logoicon/Grab.webp",
    "/logoicon/Robinhood.webp",
    "/logoicon/Lalamove.webp",
    "/logoicon/Shopee.webp"
  ],
  [],
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

const WorkExperience: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].workExperience;

  return (
    <section id="work-experience" className="py-16 md:py-24 transition-colors duration-500">
      <div className="container mx-auto px-0 md:px-6 max-w-6xl">
        <Reveal initialY={30}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              {t.title}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded"></div>
          </div>
        </Reveal>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-8 md:before:mx-auto before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500 before:to-transparent">
          {t.data.map((work, index) => (
            <div key={index} className={`relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
              index === 0 ? 'md:translate-x-8' : 
              index === 1 ? 'md:-translate-x-8' : 
              index === 2 ? 'md:translate-x-8' : ''
            }`}>
              {/* Period Dot */}
              <Reveal 
                initialY={0} 
                initialX={0}
                className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-600 text-white border-[3px] border-blue-400 border-b-blue-700 dark:border-blue-500 dark:border-b-blue-900 shadow-[0_6px_0_#1e3a8a] dark:shadow-[0_6px_0_#0f172a] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-300 hover:bg-blue-500 hover:border-blue-300 hover:border-b-blue-600 hover:shadow-[0_8px_0_#1d4ed8] dark:hover:shadow-[0_8px_0_#1e3a8a] hover:-translate-y-1 active:shadow-[0_0px_0_transparent] active:translate-y-1"
              >
                <span className="relative z-10 text-[10px] md:text-xs font-black tracking-tighter text-center px-1 leading-tight">
                  {work.period.includes(' - ') ? (
                    <div className="flex flex-col items-center justify-center">
                      <span>{work.period.split(' - ')[0]}</span>
                      <span className="my-0.5">-</span>
                      <span>{work.period.split(' - ')[1]}</span>
                    </div>
                  ) : (
                    work.period
                  )}
                </span>
              </Reveal>

              {/* Card */}
              <Reveal
                initialX={index % 2 === 0 ? -50 : 50}
                initialY={0}
                delay={index * 0.1}
                className="flex-1 md:flex-none md:w-[calc(50%-4rem)] ml-2 md:ml-0 p-6 md:p-8 bg-white dark:bg-gray-800/90 rounded-3xl overflow-hidden border-2 border-gray-200 border-b-gray-300 dark:border-gray-700 dark:border-b-gray-900 shadow-[0_8px_0_#d1d5db,0_15px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_0_#000000,0_15px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_0_#2563eb,0_20px_25px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_8px_0_#1d4ed8,0_20px_25px_rgba(37,99,235,0.15)] hover:border-blue-400 hover:border-b-blue-600 dark:hover:border-blue-500 dark:hover:border-b-blue-800 transition-all duration-300 transform hover:-translate-y-2 group md:group-even:mr-12 md:group-odd:ml-12"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                      {work.role}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {work.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    {workExperienceLogos[index].map((logo, i) => {
                      const isEmquartier = work.role.toLowerCase().includes('emquartier');
                      return (
                        <img 
                          key={i} 
                          src={logo} 
                          alt="logo" 
                          className={`${isEmquartier ? 'w-24 h-12 md:w-32 md:h-16 rounded-xl object-contain bg-white dark:bg-gray-800' : 'w-12 h-12 md:w-16 md:h-16 rounded-full object-cover bg-white dark:bg-gray-800'} border-2 border-gray-200 border-b-gray-300 dark:border-gray-700 dark:border-b-gray-800 shadow-[0_4px_0_#d1d5db] dark:shadow-[0_4px_0_#1f2937] hover:border-gray-300 hover:border-b-gray-400 dark:hover:border-gray-600 dark:hover:border-b-gray-700 hover:shadow-[0_6px_0_#9ca3af] dark:hover:shadow-[0_6px_0_#111827] hover:-translate-y-1 active:shadow-[0_0px_0_transparent] active:translate-y-1 transition-all duration-300`}
                          referrerPolicy="no-referrer"
                        />
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
