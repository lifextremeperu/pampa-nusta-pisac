import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
  onComplete?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Number reel progression mimicking 10outof10.tv: 01 -> 10
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 10) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsDismissed(true);
              onComplete?.();
            }, 750);
          }, 400);
          return 10;
        }
        return prev + 1;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
    }, 300);
  };

  if (isDismissed) return null;

  const leftDigit = Math.floor(count / 10);
  const rightDigit = count % 10;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 flex items-center justify-center w-full h-screen bg-black text-white z-[9999] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
      style={{
        clipPath: isExiting
          ? 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
          : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transition: 'clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1), transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      <div className="relative flex items-center justify-center select-none">
        {/* Left Number Block */}
        <div className="flex items-center font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mr-4 sm:mr-8 text-stone-100">
          <span>{leftDigit}</span>
          <span className="w-10 sm:w-16 text-center tabular-nums text-amber-400">
            {rightDigit}
          </span>
        </div>

        {/* Diagonal Slash Line (exact 10/10 signature 21° line) */}
        <div className="relative h-16 sm:h-24 md:h-28 w-[2px] bg-amber-500/80 rotate-[21deg] origin-center mx-2 sm:mx-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

        {/* Center Subtext */}
        <div className="flex flex-col text-left font-mono tracking-widest text-[11px] sm:text-xs md:text-sm text-stone-300 ml-4 sm:ml-8 uppercase leading-tight">
          <span className="text-amber-400 font-bold tracking-[0.25em]">PAMPA ÑUSTA</span>
          <span className="text-stone-400 text-[9px] sm:text-[10px]">10 / 10 FILM & REEL</span>
          <span className="text-stone-500 text-[8px] sm:text-[9px]">PISAC · VALLE SAGRADO</span>
        </div>

        {/* Right 10 Number Indicator */}
        <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter ml-6 sm:ml-10 text-stone-500 hidden sm:block">
          10
        </div>
      </div>

      {/* Subtle skip prompt at bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] text-stone-500 tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>CLICK O ESPERA PARA ENTRAR AL REEL</span>
      </div>
    </div>
  );
};
