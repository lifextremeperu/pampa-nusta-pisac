import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    // Hide native cursor on desktop for true Dillinger feel
    document.body.classList.add('dillinger-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target has interactive attribute or is clickable
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, video, [data-cursor], input, [role="button"]');
      if (clickable) {
        setIsHovered(true);
        const label = clickable.getAttribute('data-cursor') || 'VIEW';
        setHoverLabel(label);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dillinger smooth RAF lerp loop (linear interpolation 0.18 ease)
    const updatePosition = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      document.body.classList.remove('dillinger-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`,
      }}
    >
      {/* 3x Smaller circular container (from 80px down to ~27px) with Dillinger micro-border and scale transitions */}
      <div
        className={`rounded-full flex items-center justify-center relative transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isHovered
            ? 'min-w-[27px] h-[27px] px-2 border border-amber-400 bg-black/85 backdrop-blur-xs shadow-[0_0_12px_rgba(245,158,11,0.45)]'
            : isMouseDown
            ? 'w-[20px] h-[20px] border border-white/70 bg-white/20 scale-90'
            : 'w-[24px] h-[24px] border border-stone-500/60 bg-black/30'
        }`}
      >
        {isHovered ? (
          /* Micro kinetic label */
          <span className="font-mono text-[7.5px] font-bold uppercase tracking-widest text-amber-300 whitespace-nowrap leading-none select-none">
            {hoverLabel || 'VIEW'}
          </span>
        ) : (
          /* Subtle 3px central precision point */
          <div className="w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.9)]" />
        )}
      </div>
    </div>
  );
};
