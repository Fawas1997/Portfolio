import React from 'react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, className = '' }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[96px] h-[40px] rounded-full overflow-hidden transition-all duration-500 border-[3px] flex-shrink-0 ${
        isDark 
          ? 'bg-[#1b2536] border-[#293548] shadow-[0_4px_0_#0f172a,inset_0_2px_6px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_0_#0f172a,inset_0_2px_6px_rgba(0,0,0,0.5)] active:shadow-[0_1px_0_#0f172a,inset_0_2px_6px_rgba(0,0,0,0.5)]' 
          : 'bg-[#6ab0e5] border-[#81bdec] shadow-[0_4px_0_#94a3b8,inset_0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_#94a3b8,inset_0_2px_6px_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_#94a3b8,inset_0_2px_6px_rgba(0,0,0,0.3)]'
      } hover:-translate-y-0.5 active:translate-y-1 focus:outline-none ${className}`}
      aria-label="Toggle Theme"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Night Sky Elements */}
      <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        {/* Glow rings */}
        <div className="absolute top-1/2 right-[20px] -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/5 blur-[2px]"></div>
        <div className="absolute top-1/2 right-[10px] -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-white/5 blur-[3px]"></div>
        <div className="absolute top-1/2 right-[0px] -translate-y-1/2 w-[76px] h-[76px] rounded-full bg-white/5 blur-[4px]"></div>
        
        {/* Stars */}
        <motion.div 
          animate={isDark ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10px] left-[18px] w-[3px] h-[3px] bg-[#d7e1ea] rounded-full"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        ></motion.div>
        
        <motion.div 
          animate={isDark ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[24px] left-[32px] w-[4px] h-[4px] bg-[#d7e1ea] rounded-full"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        ></motion.div>

        <motion.div 
          animate={isDark ? { opacity: [0.4, 0.9, 0.4] } : { opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[14px] left-[40px] w-[2px] h-[2px] bg-[#d7e1ea] rounded-full"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        ></motion.div>
      </div>

      {/* Day Sky Elements */}
      <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        {/* Glow rings around sun */}
        <div className="absolute top-1/2 left-[20px] -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/10 blur-[1px]"></div>
        <div className="absolute top-1/2 left-[10px] -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-white/10 blur-[2px]"></div>
        <div className="absolute top-1/2 left-[0px] -translate-y-1/2 w-[76px] h-[76px] rounded-full bg-white/10 blur-[3px]"></div>
        
        {/* Cloud Base Layers */}
        <div className="absolute bottom-[-2px] left-0 right-0 h-[16px]">
          {/* Back dark cloud */}
          <div className="absolute bottom-[2px] right-[6px] w-[16px] h-[16px] rounded-full bg-[#d0d8e2]"></div>
          <div className="absolute bottom-[2px] right-[18px] w-[24px] h-[24px] rounded-full bg-[#d0d8e2]"></div>
          <div className="absolute bottom-[2px] right-[36px] w-[20px] h-[20px] rounded-full bg-[#d0d8e2]"></div>
          
          {/* Front white cloud */}
          <div className="absolute bottom-[-4px] right-[-2px] w-[20px] h-[20px] rounded-full bg-[#f8fbff]"></div>
          <div className="absolute bottom-[-2px] right-[10px] w-[24px] h-[24px] rounded-full bg-[#f8fbff]"></div>
          <div className="absolute bottom-[-6px] right-[26px] w-[30px] h-[30px] rounded-full bg-[#f8fbff]"></div>
          <div className="absolute bottom-[-4px] right-[46px] w-[22px] h-[22px] rounded-full bg-[#f8fbff]"></div>
          <div className="absolute bottom-[-8px] right-[60px] w-[26px] h-[26px] rounded-full bg-[#f8fbff]"></div>
        </div>
      </div>

      {/* The Knob (Sun / Moon) */}
      <motion.div
        initial={false}
        animate={{
          x: isDark ? 59 : 3,
          rotate: isDark ? 360 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`absolute top-[3px] w-[28px] h-[28px] rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.2)] z-10 overflow-hidden transition-colors duration-500 ${
          isDark ? 'bg-[#cdd4de]' : 'bg-[#ffcf40]'
        }`}
      >
        {/* Moon Craters */}
        <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute top-[4px] left-[6px] w-[6px] h-[6px] rounded-full bg-[#a3adb8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"></div>
          <div className="absolute top-[10px] left-[16px] w-[4px] h-[4px] rounded-full bg-[#a3adb8] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"></div>
          <div className="absolute top-[16px] left-[10px] w-[7px] h-[7px] rounded-full bg-[#a3adb8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"></div>
        </div>
      </motion.div>
    </button>
  );
};
