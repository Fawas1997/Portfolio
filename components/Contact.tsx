
import React, { useRef, useEffect, useState } from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { FaPhoneAlt, FaLine, FaEnvelope, FaGithub } from 'react-icons/fa';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

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
  const inView = useInView(ref, { margin: "-100px", once: false });
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
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, x: initialX, y: initialY }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ContactItem: React.FC<{ 
  info: any; 
  index: number; 
  t: any;
  activeTooltipIndex: number | null;
  setActiveTooltipIndex: (index: number | null) => void;
}> = ({ info, index, t, activeTooltipIndex, setActiveTooltipIndex }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px", once: false });
  const tooltipInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });
  const [isVisible, setIsVisible] = useState(false);
  const showTooltip = activeTooltipIndex === index;

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

  useEffect(() => {
    // Let the parent manage the active tooltip, triggered only when item enters center screen
    if (tooltipInView && window.innerWidth < 768) {
      setActiveTooltipIndex(index);
    }
  }, [tooltipInView, index, setActiveTooltipIndex]);

  return (
    <div ref={ref} className="group flex flex-col items-center transition-all duration-300 relative w-full md:w-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        className="w-full"
      >
        <a
          href={info.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          {/* Click Hint Tooltip - Shows for 3s on scroll in mobile, hover on desktop */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap shadow-xl z-20 shadow-blue-500/40 md:opacity-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:translate-y-1 md:group-hover:translate-y-4 md:animate-none ${showTooltip ? 'opacity-100 translate-y-3 animate-pulse pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
            {t.clickToOpen} <ExternalLink size={10} className="inline ml-1" />
          </div>

          {/* Organic Animated Icon Container */}
          <div className={`relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-6 ${info.color}`}>
            {/* Layer 1: Primary Organic Border */}
            <motion.div 
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ 
                borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 transition-all duration-500 border-2 border-current opacity-20 group-hover:opacity-100"
            />

            {/* Layer 2: Secondary Counter-Rotating Border */}
            <motion.div 
              animate={{ 
                borderRadius: ["60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%"],
                rotate: [360, 270, 180, 90, 0]
              }}
              transition={{ 
                borderRadius: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-2 transition-all duration-500 border border-current opacity-10 group-hover:opacity-60"
            />

            {/* Layer 3: Floating Particles/Dots Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, (i - 1) * 20, 0],
                    y: [0, (i - 1) * -20, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute w-1 h-1 bg-current rounded-full left-1/2 top-1/2"
                />
              ))}
            </div>

            {/* Icon with Hover Animation */}
            <div className="relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
              {info.icon}
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-full ${info.bgColor} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`}></div>
          </div>
          
          <div className="text-center">
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
              {info.label}
            </p>
            <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
              {info.value}
            </p>
          </div>
        </a>
      </motion.div>
    </div>
  );
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTooltipIndex !== null) {
      // Auto-hide the active tooltip after 3 seconds
      timer = setTimeout(() => {
        setActiveTooltipIndex(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [activeTooltipIndex]);

  const contactInfo = [
    {
      icon: <FaPhoneAlt size={40} />,
      label: t.phone,
      value: '06-23434143',
      href: 'tel:0623434143',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      icon: <FaLine size={44} />,
      label: 'Line ID',
      value: 'fa.shanks',
      href: 'https://line.me/ti/p/~fa.shanks',
      color: 'text-[#00B900]',
      bgColor: 'bg-[#00B900]/10',
    },
    {
      icon: <img src="/logoicon/Gmail.webp" alt="Email" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />,
      label: t.email,
      value: 'fawas1997s@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=fawas1997s@gmail.com',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-500/10',
    },
    {
      icon: <img src="/logoicon/google-maps.webp" alt="Address" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />,
      label: t.address,
      value: t.addressValue,
      href: 'https://www.google.com/maps/search/?api=1&query=Phatthanakan+Suan+Luang+Bangkok+10250',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      icon: <FaGithub size={40} />,
      label: 'GitHub',
      value: 'Fawas1997',
      href: 'https://github.com/Fawas1997',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-100 dark:bg-white/10',
    },
  ];

  return (
    <section id="contact" className="py-24 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal initialY={30}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              {t.title}
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              {t.description}
            </p>
          </div>
        </Reveal>

        {/* Contact Items Row */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-12 lg:gap-16 mb-20">
          {contactInfo.map((info, index) => (
            <ContactItem 
              key={index} 
              info={info} 
              index={index} 
              t={t} 
              activeTooltipIndex={activeTooltipIndex}
              setActiveTooltipIndex={setActiveTooltipIndex}
            />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-bold">{t.responseTime}</span>
          </div>
          
          <motion.a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=fawas1997s@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white font-black rounded-2xl transition-all duration-500 overflow-hidden shadow-xl shadow-blue-500/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaEnvelope size={20} />
              {t.sendEmail}
            </span>
            
            {/* Glassy Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
            
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
