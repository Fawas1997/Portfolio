
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FiCode, FiDatabase, FiMessageSquare } from 'react-icons/fi';
import {
  SiPython, SiPandas, SiTableau, SiHtml5, SiCss3,
  SiJavascript, SiTailwindcss, SiOpenai, SiVercel,
  SiFlask, SiAwslambda, SiNgrok
} from 'react-icons/si';
import { FaLine, FaFileExcel } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const experienceIcons = [
  <FiCode size={24} />,
  <FiDatabase size={24} />,
  <FiMessageSquare size={24} />
];

const experienceLogos = [
  "/logoicon/data-first.webp",
  "/logoicon/data-first.webp",
  "/logoicon/AIYA.webp"
];

const experienceTechStacks = [
  ['HTML', 'CSS', 'Vue 3', 'Ngrok', 'OpenAI', 'Line OA', 'JavaScript', 'Tailwind CSS', 'Google Maps', 'SweetAlert2'],
  ['Python', 'Pandas', 'Tableau', 'Zocial Eye', 'Microsoft Excel'],
  ['OpenAI', 'Groq', 'Cohere', 'HTML', 'CSS', 'Vue 3', 'Vercel', 'Flask', 'Python', 'LineOA', 'Javascript', 'Pinecone', 'Tailwind CSS', 'AWS Lambda']
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

const TechItem: React.FC<{ tech: string }> = ({ tech }) => {
  const iconSize = 20;
  const commonClasses = "flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 border border-transparent hover:border-blue-400 dark:hover:border-blue-500 rounded-full transition-all duration-300 ease-in-out cursor-default whitespace-nowrap shrink-0";

  const iconMap: { [key: string]: React.ReactElement } = {
    'python': <span className="text-[#3776AB]"><SiPython size={iconSize} /></span>,
    'pandas': <span className="text-[#150458] dark:text-white"><SiPandas size={iconSize} /></span>,
    'zocial eye': <img src="/logoicon/Zocial Eye.webp" alt="Zocial Eye" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
    'microsoft excel': <span className="text-[#217346]"><FaFileExcel size={iconSize} /></span>,
    'tableau': <span className="text-[#E97627]"><SiTableau size={iconSize} /></span>,
    'html': <span className="text-orange-600"><SiHtml5 size={iconSize} /></span>,
    'css': <span className="text-blue-500"><SiCss3 size={iconSize} /></span>,
    'javascript': <span className="text-yellow-400 bg-black rounded"><SiJavascript size={iconSize} /></span>,
    'tailwind css': <span className="text-cyan-400"><SiTailwindcss size={iconSize} /></span>,
    'vue 3': <img src="/logoicon/vue 3.webp" alt="Vue 3" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
    'openai': <span className="text-teal-500"><SiOpenai size={iconSize} /></span>,
    'ngrok': <span className="text-blue-600"><SiNgrok size={iconSize} /></span>,
    'line oa': <span className="text-green-500"><FaLine size={iconSize} /></span>,
    'lineoa': <span className="text-green-500"><FaLine size={iconSize} /></span>,
    'vercel': <span className="text-black dark:text-white"><SiVercel size={iconSize} /></span>,
    'flask': <span className="text-black dark:text-white"><SiFlask size={iconSize} /></span>,
    'aws lambda': <span className="text-orange-500"><SiAwslambda size={iconSize} /></span>,
    'sweetalert2': <img src="/logoicon/SweetAlert 2.webp" alt="SweetAlert2" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
    'cohere': <img src="/logoicon/Cohere.webp" alt="Cohere" style={{ width: iconSize, height: iconSize }} />,
    'pinecone': <img src="/logoicon/Pinecone.webp" alt="Pinecone" style={{ width: iconSize, height: iconSize }} />,
    'groq': <img src="/logoicon/Groq.webp" alt="Groq" style={{ width: iconSize, height: iconSize }} />,
    'google maps': <img src="/logoicon/google-maps.webp" alt="Google Maps" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />,
  };

  const normalizedTech = tech.toLowerCase();
  const icon = iconMap[normalizedTech];

  if (icon) {
    return (
      <div className={commonClasses}>
        {icon}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech}</span>
      </div>
    );
  }

  return (
    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 text-sm font-medium rounded-full whitespace-nowrap shrink-0">
      {tech}
    </span>
  );
};


const Experience: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section id="experience" className="pt-12 pb-24 md:py-24">
      <Reveal initialY={30}>
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">{t.title}</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mb-10 md:mb-16 rounded"></div>
      </Reveal>
     
      <div className="relative -mx-3 sm:mx-0">
        <div className="absolute left-4 sm:left-6 top-4 sm:top-6 w-0.5 h-[calc(100%-32px)] sm:h-[calc(100%-48px)] -translate-x-1/2 bg-gradient-to-b from-blue-600 via-blue-400/50 to-transparent"></div>

        <div className="space-y-12">
          {t.data.map((exp, index) => {
            const [datePart, durationPart] = exp.period.split(' (');
           
            return (
              <div key={index} className="relative pl-8 sm:pl-16">
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10 border-4 border-transparent transition-all duration-300 hover:scale-110">
                  {experienceIcons[index]}
                </div>

                <Reveal 
                  initialX={-30} 
                  delay={index * 0.1}
                  duration={0.6}
                >
                  <div className="bg-white dark:bg-gray-800 px-2 py-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 ease-in-out transform hover:-translate-y-1">
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-x-4 gap-y-2 mb-4">
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">{exp.role}</h3>
                     
                      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 flex-shrink sm:flex-shrink-0">
                        <img src={experienceLogos[index]} alt={`${exp.company} logo`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-md border-2 border-gray-100 dark:border-gray-700" />
                        <div className="text-center sm:text-left">
                          <p className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">{exp.company}</p>
                          <p className="text-xs sm:text-base font-medium text-gray-500 dark:text-gray-400">
                            <span className="block sm:inline whitespace-nowrap tracking-tighter sm:tracking-normal">{datePart}</span>
                            {durationPart && (
                              <span className="block sm:inline sm:ml-1 whitespace-nowrap tracking-tighter sm:tracking-normal">
                                ({durationPart}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                   
                    <ul className="mt-8 sm:mt-2 space-y-6 sm:space-y-2 text-gray-600 dark:text-gray-300 list-disc list-outside text-left sm:text-left ml-5">
                      {exp.description.map((point, i) => (
                        <li key={i} className="pl-1">{point}</li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3 text-center sm:text-left">{t.techStack}</h4>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 pb-2">
                        {experienceTechStacks[index].map((tech) => (
                          <TechItem key={tech} tech={tech} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
