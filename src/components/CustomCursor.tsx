import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check interactive targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest('[data-cursor]');
      if (hoverable) {
        setIsHovered(true);
        setCursorText(hoverable.getAttribute('data-cursor') || 'VIEW');
      } else if (target.closest('a, button, input, textarea, select')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[150] transition-transform duration-100 ease-out hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-[#FF5A36] text-white text-[10px] font-mono tracking-widest uppercase shadow-lg scale-100'
            : 'w-3 h-3 bg-white/80 mix-blend-difference scale-100'
        }`}
      >
        {cursorText && <span className="font-mono text-[9px] font-bold tracking-wider">{cursorText}</span>}
      </div>
    </div>
  );
};
