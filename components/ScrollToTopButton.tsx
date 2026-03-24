import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

interface ScrollToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const toggleVisibility = () => {
      if (container.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', toggleVisibility);

    return () => container.removeEventListener('scroll', toggleVisibility);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startPosition = container.scrollTop;
    const targetPosition = 0;
    const distance = targetPosition - startPosition;
    
    if (Math.abs(distance) < 2) return;

    // Snappy duration: 0.2ms per pixel, max 600ms
    const duration = Math.min(Math.abs(distance) * 0.2, 600); 
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeOutExpo(timeElapsed, startPosition, distance, duration);
      container.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        container.scrollTo(0, targetPosition);
      }
    };

    // Easing function: easeOutExpo starts extremely fast and slows down
    function easeOutExpo(t: number, b: number, c: number, d: number) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    requestAnimationFrame(animation);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-14 right-8 z-[60] p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      aria-label="เลื่อนขึ้นบนสุด"
    >
      <FiArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;