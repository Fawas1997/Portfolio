import React, { useState, useEffect, useCallback, useRef } from 'react';

interface CustomScrollbarProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  hideOnTop?: boolean;
  className?: string;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ scrollContainerRef, hideOnTop = false, className }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // Calculate thumb height proportionally
    const newThumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 40);
    setThumbHeight(newThumbHeight);

    // Calculate progress
    const scrollableHeight = scrollHeight - clientHeight;
    const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
    setScrollProgress(progress);

    // Old functionality: hide scrollbar in hero section (scrollTop <= 700)
    setShowScrollbar(hideOnTop ? scrollTop > 700 : true);
  }, [scrollContainerRef, hideOnTop]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScroll);
      window.addEventListener('resize', updateScroll);
      updateScroll(); // Initial calculation
      
      // Setup mutation observer to watch for content size changes
      const observer = new MutationObserver(updateScroll);
      observer.observe(container, { childList: true, subtree: true, attributes: true });
      
      return () => {
        container.removeEventListener('scroll', updateScroll);
        window.removeEventListener('resize', updateScroll);
        observer.disconnect();
      };
    }
  }, [updateScroll]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startScrollTop = scrollContainerRef.current?.scrollTop || 0;

    const handleDrag = (moveEvent: MouseEvent | TouchEvent) => {
      if (!scrollContainerRef.current || !trackRef.current) return;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = currentY - startY;
      
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const trackHeight = trackRef.current.clientHeight;
      const scrollableHeight = scrollHeight - clientHeight;
      const trackScrollableHeight = trackHeight - thumbHeight;
      
      const scrollRatio = scrollableHeight / trackScrollableHeight;
      scrollContainerRef.current.scrollTop = startScrollTop + deltaY * scrollRatio;
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current || !trackRef.current) return;
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    
    const trackScrollableHeight = trackRect.height - thumbHeight;
    const clickProgress = Math.max(0, Math.min(1, (clickY - thumbHeight/2) / trackScrollableHeight));
    
    const scrollableHeight = scrollHeight - clientHeight;
    scrollContainerRef.current.scrollTo({
      top: clickProgress * scrollableHeight,
      behavior: 'smooth'
    });
  };

  if (!scrollContainerRef.current || scrollContainerRef.current.scrollHeight <= scrollContainerRef.current.clientHeight) {
    return null;
  }

  const isVisible = showScrollbar || isHovering || isDragging;

  return (
    <div 
      className={`fixed right-0 bottom-0 w-3 z-[9999] transition-opacity duration-300 ${className ? className : 'top-0 custom-scrollbar-container'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div 
        ref={trackRef}
        className="absolute right-[1px] md:right-[2px] top-2 bottom-2 w-[10px] cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* The visible thumb */}
        <div
          className={`absolute right-0 w-1 md:w-1.5 rounded-full transition-colors duration-200 cursor-grab active:cursor-grabbing ${isHovering || isDragging ? 'bg-blue-500' : 'bg-blue-400/60 dark:bg-blue-500/60'}`}
          style={{ 
            height: `${thumbHeight}px`, 
            top: `${scrollProgress * (trackRef.current?.clientHeight ? trackRef.current.clientHeight - thumbHeight : 0)}px`
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={(e) => e.stopPropagation()} // Prevent track click when clicking thumb
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;
