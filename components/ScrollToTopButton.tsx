import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

interface ScrollToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setIsAtBottom(scrollHeight - scrollTop - clientHeight <= 20);
      
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const start = container.scrollTop;
    const duration = 1000; // 1 second for smooth movement
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // easeInOutCubic easing function
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      container.scrollTop = start * (1 - ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const radius = 22; // Reduced radius so the very thick stroke fits without clipping
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`global-floating-btn group fixed right-6 md:right-8 z-[60] w-14 h-14 flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      } ${isAtBottom ? 'bottom-40 md:bottom-14' : 'bottom-8 md:bottom-14'}`}
      aria-label="เลื่อนขึ้นบนสุด"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
        {/* Background track (Translucent White) */}
        <circle 
          cx="28" cy="28" r={radius} 
          fill="none" 
          strokeWidth="8" 
          stroke="rgba(255, 255, 255, 0.2)"
        />
        {/* Progress track (Solid White/Light Blue) */}
        <circle 
          cx="28" cy="28" r={radius} 
          fill="none" 
          strokeWidth="8" 
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="#ffffff"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
      
      {/* 3D Premium Arrow (Clean & Elegant) */}
      <div className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="arrow-silver-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* 3D Drop Shadow */}
        <FaArrowUp 
          size={22} 
          className="absolute top-[2px] left-0 text-blue-900/50 blur-[1px]"
        />
        
        {/* Silver/White 3D Body */}
        <FaArrowUp 
          size={22} 
          className="relative drop-shadow-sm"
          style={{ fill: "url(#arrow-silver-grad)" }} 
        />
      </div>
    </button>
  );
};

export default ScrollToTopButton;