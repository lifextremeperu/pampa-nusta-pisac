import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

import { useTranslation } from 'react-i18next';

interface CinematicTransition {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  altitude: string;
}

export const CinematicTransitions: React.FC = () => {
  const { t } = useTranslation();

  const TRANSITIONS: CinematicTransition[] = [
    {
      id: '01',
      title: t('cinematic_transitions.tierra.title'),
      subtitle: t('cinematic_transitions.tierra.subtitle'),
      altitude: '3,347 msnm',
      image: '/assets/ecoaldea/elemento_tierra.jpg',
    },
    {
      id: '02',
      title: t('cinematic_transitions.agua.title'),
      subtitle: t('cinematic_transitions.agua.subtitle'),
      altitude: '3,200 msnm',
      image: '/assets/ecoaldea/elemento_agua.jpg',
    },
    {
      id: '03',
      title: t('cinematic_transitions.viento.title'),
      subtitle: t('cinematic_transitions.viento.subtitle'),
      altitude: '3,150 msnm',
      image: '/assets/ecoaldea/elemento_viento.jpg',
    },
    {
      id: '04',
      title: t('cinematic_transitions.fuego.title'),
      subtitle: t('cinematic_transitions.fuego.subtitle'),
      altitude: '3,300 msnm',
      image: '/assets/ecoaldea/elemento_fuego.jpg',
    },
    {
      id: '05',
      title: t('cinematic_transitions.eter.title'),
      subtitle: t('cinematic_transitions.eter.subtitle'),
      altitude: '3,250 msnm',
      image: '/assets/ecoaldea/elemento_eter.jpg',
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TRANSITIONS.length);
    }, 8000); // 8 seconds per slide
  }, []);

  // Auto cycle logic
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  // Native wheel & touch handling to trap scroll and advance slides
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown && activeIndex < TRANSITIONS.length - 1) {
        e.preventDefault();
        const now = Date.now();
        if (now - throttleRef.current > 1200) {
          throttleRef.current = now;
          startAutoPlay();
          setActiveIndex(prev => prev + 1);
        }
      }
      
      if (isScrollingUp && activeIndex > 0) {
        e.preventDefault();
        const now = Date.now();
        if (now - throttleRef.current > 1200) {
          throttleRef.current = now;
          startAutoPlay();
          setActiveIndex(prev => prev - 1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      
      if (Math.abs(diff) < 30) return; // Threshold

      if (diff > 0 && activeIndex < TRANSITIONS.length - 1) {
        e.preventDefault();
        const now = Date.now();
        if (now - throttleRef.current > 1000) {
          throttleRef.current = now;
          startAutoPlay();
          setActiveIndex(prev => prev + 1);
          touchStartY.current = touchEndY;
        }
      }

      if (diff < 0 && activeIndex > 0) {
        e.preventDefault();
        const now = Date.now();
        if (now - throttleRef.current > 1000) {
          throttleRef.current = now;
          startAutoPlay();
          setActiveIndex(prev => prev - 1);
          touchStartY.current = touchEndY;
        }
      }
    };

    // Use passive: false to allow e.preventDefault()
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeIndex, startAutoPlay]);

  // Title animations on change
  useEffect(() => {
    TRANSITIONS.forEach((_, idx) => {
      const el = titlesRef.current[idx];
      if (el) {
        if (idx === activeIndex) {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0, rotateX: -35, scale: 0.9 },
            { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
          );
        } else {
          gsap.to(el, {
            y: -50, opacity: 0, duration: 0.6, ease: 'power3.in'
          });
        }
      }
    });
  }, [activeIndex]);

  const handleManualClick = (idx: number) => {
    startAutoPlay();
    setActiveIndex(idx);
  };

  const handlePrev = () => {
    startAutoPlay();
    setActiveIndex(prev => (prev === 0 ? TRANSITIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    startAutoPlay();
    setActiveIndex(prev => (prev + 1) % TRANSITIONS.length);
  };

  return (
    <section ref={sectionRef} id="transiciones-cinematicas" className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-sadhana-dark text-white">
      {/* Background Images with Ken Burns Effect */}
      {TRANSITIONS.map((transition, idx) => (
        <div 
          key={transition.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Using img for stability, scale-110 handles the slow zoom (Ken Burns) */}
          <img 
            src={transition.image}
            alt={transition.subtitle}
            className={`w-full h-full object-cover transition-transform ease-out will-change-transform ${
              idx === activeIndex ? 'scale-110 duration-[20000ms]' : 'scale-100 duration-1000'
            }`}
          />
          {/* Overlay to ensure text readability & cinematic feel */}
          <div className="absolute inset-0 bg-sadhana-dark/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-transparent to-sadhana-dark/40" />
        </div>
      ))}

      {/* Noise Overlay Effect (1820productions style) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/6891a5aecbde722a4a9adbba/6894193b0e7e93e86b69656d_noise.png)' }}></div>

      {/* Main Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center items-center px-6 md:px-12 text-center">
        
        {/* Top Tagline */}
        <div className="absolute top-32 md:top-32 left-0 w-full flex justify-center z-40">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sadhana-primary/40 bg-sadhana-dark/40 text-sadhana-sand text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono font-bold shadow-sm backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>{t('cinematic_transitions.memoria')}</span>
          </div>
        </div>

        <div className="relative h-[250px] w-full flex justify-center items-center mt-12 md:mt-24">
          {TRANSITIONS.map((transition, idx) => (
            <div 
              key={`title-${transition.id}`} 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${idx === activeIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {/* Title that receives animation */}
              <div ref={el => titlesRef.current[idx] = el} className="opacity-0 px-4">
                <div className="flex items-center justify-center gap-2 text-sadhana-primary font-mono text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-sadhana-primary" />
                  <span>{transition.altitude}</span>
                  <span className="w-2 h-2 rounded-full bg-sadhana-primary" />
                </div>
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mb-4 leading-none uppercase">
                  {transition.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base tracking-[0.2em] md:tracking-[0.4em] font-bold text-sadhana-sand uppercase mb-12 drop-shadow-md">
                  {transition.subtitle}
                </p>
                
                {/* Visual anchor line to guide the eye */}
                <div className="flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-sadhana-primary to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-40 flex justify-between px-2 md:px-6 pointer-events-none">
        <button onClick={handlePrev} className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-black/20 hover:bg-sadhana-primary/80 border border-white/20 flex items-center justify-center backdrop-blur-md text-white transition-all pointer-events-auto group">
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={handleNext} className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-black/20 hover:bg-sadhana-primary/80 border border-white/20 flex items-center justify-center backdrop-blur-md text-white transition-all pointer-events-auto group">
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Control Component (Bottom Timeline) */}
      <div className="absolute bottom-0 left-0 w-full z-40 px-6 md:px-12 pb-8 md:pb-12 flex items-end justify-between">
        
        {/* Left Side: Dynamic Numbers */}
        <div className="w-12 h-6 overflow-hidden relative">
          {TRANSITIONS.map((transition, idx) => (
            <span 
              key={`num-${transition.id}`}
              className={`absolute top-0 left-0 text-xs md:text-sm font-bold font-mono tracking-widest transition-transform duration-500 ${
                idx === activeIndex ? 'translate-y-0 opacity-100 text-sadhana-primary' : idx < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
              }`}
            >
              {transition.id}
            </span>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="flex-1 max-w-lg mx-6 md:mx-12 flex gap-3 md:gap-4 items-center">
          {TRANSITIONS.map((_, idx) => (
            <div key={`progress-${idx}`} className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden cursor-pointer hover:h-[4px] transition-all" onClick={() => handleManualClick(idx)}>
              <div 
                className="h-full bg-sadhana-primary transition-all ease-linear"
                style={{
                  width: idx === activeIndex ? '100%' : idx < activeIndex ? '100%' : '0%',
                  transitionDuration: idx === activeIndex ? '8s' : '0.3s'
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Total */}
        <div className="text-xs md:text-sm font-bold font-mono tracking-widest text-white/30">
          0{TRANSITIONS.length}
        </div>
      </div>
    </section>
  );
};
