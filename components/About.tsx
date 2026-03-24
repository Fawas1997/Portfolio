
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { 
  SiHtml5, SiCss3, SiJavascript, SiPython, 
  SiTailwindcss, SiFlask, SiPandas, SiNgrok, SiVercel, 
  SiAwslambda, SiTableau, SiOpenai
} from 'react-icons/si';
import { 
  FaLine, FaTelegramPlane, FaFileExcel, FaChartBar, 
  FaCode
} from 'react-icons/fa';
import { FiCode, FiLayers, FiCpu, FiBarChart2, FiAward, FiStar } from 'react-icons/fi';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  categoryIcon: React.ReactNode;
  skills: Skill[];
}

const iconSize = 20;

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages (Vibe Coding)',
    categoryIcon: <span className="text-blue-500"><FiCode /></span>,
    skills: [
      { name: 'HTML', icon: <span className="text-orange-600"><SiHtml5 size={iconSize} /></span> },
      { name: 'CSS', icon: <span className="text-blue-500"><SiCss3 size={iconSize} /></span> },
      { name: 'JavaScript', icon: <span className="text-yellow-400 bg-black rounded"><SiJavascript size={iconSize} /></span> },
      { name: 'Python', icon: <span className="text-[#3776AB]"><SiPython size={iconSize} /></span> },
    ]
  },
  {
    title: 'Frameworks & Libraries (Vibe Coding)',
    categoryIcon: <span className="text-blue-500"><FiLayers /></span>,
    skills: [
      { name: 'Vue 3', icon: <img src="/logoicon/vue 3.webp" alt="Vue 3" className="w-5 h-5 object-contain" /> },
      { name: 'Tailwind CSS', icon: <span className="text-cyan-400"><SiTailwindcss size={iconSize} /></span> },
      { name: 'SweetAlert 2', icon: <img src="/logoicon/SweetAlert 2.webp" alt="SW2" className="w-5 h-5 object-contain" /> },
      { name: 'Flask', icon: <span className="text-black dark:text-white"><SiFlask size={iconSize} /></span> },
      { name: 'Pandas', icon: <span className="text-[#150458] dark:text-white"><SiPandas size={iconSize} /></span> },
    ]
  },
  {
    title: 'Tools & AI',
    categoryIcon: <span className="text-blue-500"><FiCpu /></span>,
    skills: [
      { name: 'VS CODE', icon: <img src="/logoicon/VisuaStudioCode.webp" alt="VS CODE" className="w-5 h-5 object-contain" /> },
      { name: 'Zocial Eye', icon: <img src="/logoicon/Zocial Eye.webp" alt="Zocial" className="w-5 h-5 object-contain" /> },
      { name: 'LineOA', icon: <span className="text-green-500"><FaLine size={iconSize} /></span> },
      { name: 'Ngrok', icon: <span className="text-blue-600"><SiNgrok size={iconSize} /></span> },
      { name: 'Vercel', icon: <span className="text-black dark:text-white"><SiVercel size={iconSize} /></span> },
      { name: 'Lovable AI', icon: <img src="/logoicon/Lovable AI.webp" alt="Lovable AI" className="w-5 h-5 object-contain" /> },
      { name: 'Colab', icon: <img src="/logoicon/Colab.webp" alt="Colab" className="w-5 h-5 object-contain" /> },
      { name: 'Antigravity', icon: <img src="/logoicon/antigravity.webp" alt="Antigravity" className="w-5 h-5 object-contain" /> },
      { name: 'Groq API', icon: <img src="/logoicon/Groq.webp" alt="Groq" className="w-5 h-5 object-contain" /> },
      { name: 'OpenAI', icon: <span className="text-teal-500"><SiOpenai size={iconSize} /></span> },
      { name: 'App Script', icon: <img src="/logoicon/App Script.webp" alt="App Script" className="w-5 h-5 object-contain" /> },
      { name: 'Bot Line', icon: <span className="text-green-500"><FaLine size={iconSize} /></span> },
      { name: 'AWS Lambda', icon: <span className="text-orange-500"><SiAwslambda size={iconSize} /></span> },
      { name: 'Bot Telegram', icon: <span className="text-[#26A5E4]"><FaTelegramPlane size={iconSize} /></span> },
    ]
  },
  {
    title: 'Data Analysis',
    categoryIcon: <span className="text-blue-500"><FiBarChart2 /></span>,
    skills: [
      { name: 'Tableau', icon: <span className="text-[#E97627]"><SiTableau size={iconSize} /></span> },
      { name: 'Excel', icon: <span className="text-[#217346]"><FaFileExcel size={iconSize} /></span> },
      { name: 'Power BI', icon: <span className="text-[#F2C811]"><FaChartBar size={iconSize} /></span> },
    ]
  }
];

const HonorsBadge: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  return (
    <div className="relative group">
      <div className="absolute -top-4 -right-2 animate-sparkle-pop text-yellow-400 pointer-events-none">
        <FiStar size={16} />
      </div>
      <div className="absolute -bottom-2 -left-3 animate-sparkle-pop text-yellow-500 pointer-events-none" style={{ animationDelay: '0.7s' }}>
        <FiStar size={12} />
      </div>

      <div className="relative flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 dark:from-yellow-600 dark:via-yellow-400 dark:to-yellow-600 border border-yellow-300 dark:border-yellow-700 rounded-full shadow-lg transition-all duration-500 group-hover:scale-105 overflow-hidden">
         <div className="absolute inset-0 bg-shimmer-gold animate-shimmer pointer-events-none"></div>
         <span className="text-yellow-800 dark:text-yellow-900 animate-float relative z-10"><FiAward size={16} /></span>
         <span className="text-xs md:text-sm font-bold text-yellow-900 dark:text-yellow-950 relative z-10 drop-shadow-sm whitespace-nowrap">
           {t.honors}
         </span>
      </div>
    </div>
  );
};

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

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="about" className="pt-20 pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded"></div>
          </div>
        </Reveal>

        {/* Top Section: Profile & Bio */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 mb-20 md:mb-32">
          {/* Profile Picture */}
          <Reveal initialX={-50} initialY={0} className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative w-full max-w-[220px] sm:max-w-[320px] aspect-square group mt-8 lg:mt-12">
               <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/5 rounded-[3rem] rounded-tr-[7rem] rounded-bl-[7rem] blur-2xl opacity-50"></div>
               <div className="relative z-10 w-full h-full bg-white dark:bg-white rounded-[3rem] rounded-tr-[7rem] rounded-bl-[7rem] shadow-xl transition-all duration-700 hover:-translate-y-2 border border-gray-100 dark:border-gray-200 overflow-hidden">
                  <img
                     src="/logoprofile/profileutcc.webp"
                    alt={t.profileAlt}
                     className="w-full h-full object-contain scale-95 transition-transform duration-[2s] ease-out group-hover:scale-105" 
                  />
               </div>
            </div>
          </Reveal>

          {/* Bio & Education Card */}
          <div className="w-full lg:w-2/3 space-y-10 text-left">
             <Reveal initialX={0} initialY={30}>
               <div className="text-center lg:text-left">
                 <h3 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                   {t.greeting}
                 </h3>
                 <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 space-y-4 md:space-y-6 whitespace-pre-line">
                   <p>
                     {t.bio1}
                   </p>
                   <p>
                     {t.bio2}
                   </p>
                   <p>
                     {t.bio3}
                   </p>
                 </div>
               </div>
             </Reveal>

             {/* Education Card */}
             <Reveal initialX={0} initialY={30} delay={0.2}>
               <div className="mt-16 lg:mt-10 bg-gray-50 dark:bg-gray-800/40 rounded-3xl p-6 md:p-8 border border-gray-200/60 dark:border-gray-700/50 shadow-sm relative overflow-hidden group hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start relative z-10">
                     {/* University Logo - Reduced size as requested */}
                     <div className="shrink-0 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                        <img 
                          src="/logoprofile/logoutcc.webp" 
                          alt="UTCC" 
                          className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-sm" 
                        />
                     </div>

                     {/* Education Details */}
                     <div className="flex-1 space-y-4 w-full">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{t.eduTitle}</h4>
                          <HonorsBadge />
                        </div>
                        
                        <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center sm:text-left">
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{t.university}</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">{t.degree}</p>
                          </div>
                          <div className="space-y-1 md:text-right">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.faculty}</p>
                            <p className="text-base font-bold text-gray-700 dark:text-gray-300">{t.major}</p>
                          </div>
                        </div>
                     </div>
                  </div>
               </div>
             </Reveal>
          </div>
        </div>

        {/* Skills Section */}
        <Reveal initialY={50}>
           <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t.skillsTitle}</h2>
                <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
                {skillCategories.map((category, catIdx) => (
                  <Reveal 
                    key={catIdx} 
                    initialX={0}
                    initialY={20}
                    delay={catIdx * 0.1}
                    duration={0.6}
                    className="w-full h-full"
                  >
                    <div className="bg-white dark:bg-gray-800/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700/50 hover:border-blue-500 dark:hover:border-blue-500 p-6 md:p-8 transition-all duration-500 transform hover:-translate-y-1 group h-full">
                      <div className="flex flex-col items-center lg:flex-row lg:items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                          <span className="group-hover:text-white transition-colors">
                            {React.cloneElement(category.categoryIcon as React.ReactElement<any>, { size: 22 })}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                           {category.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 md:gap-3 justify-center">
                        {category.skills.map((skill, skillIdx) => (
                          <motion.div 
                            key={skillIdx} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: skillIdx * 0.05 }}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-700/40 border border-transparent hover:border-blue-400 dark:hover:border-blue-500 rounded-full transition-all duration-300 ease-in-out cursor-default hover:bg-white dark:hover:bg-gray-700 group/skill whitespace-nowrap w-full lg:w-auto"
                          >
                            <div className="flex items-center justify-center shrink-0">
                              {skill.icon}
                            </div>
                            <span className="text-[13px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
           </div>
        </Reveal>

      </div>
    </section>
  );
};

export default About;
