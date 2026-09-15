import React, { useRef, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ECOALDEA_MODULES } from '../data/ecoaldeaModules';
import { EcoaldeaModule } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface EcoaldeaModulesProps {
  onSelectModuleForExperience: (module: EcoaldeaModule) => void;
  onOpenTrailer: () => void;
}

export const EcoaldeaModules: React.FC<EcoaldeaModulesProps> = ({
  onSelectModuleForExperience,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter out the wachuma-01, wachuma-02 sub-varieties that belong to the slider
  const MAIN_MODULES = ECOALDEA_MODULES.filter(m => !m.id.match(/^wachuma-\d+$/));

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;
    
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.ecoaldea-slide');
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1,
            ease: 'power1.inOut'
          },
          end: () => `+=${sliderRef.current?.offsetWidth || window.innerWidth * slides.length}`
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [MAIN_MODULES.length]);

  return (
    <section className="relative bg-sadhana-dark text-white overflow-hidden">
      
      {/* Intro Overlay / Título fijo superior */}
      <div className="absolute top-6 md:top-8 left-0 w-full z-20 pointer-events-none px-6 md:px-12 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white drop-shadow-lg">
            Cinco Capítulos Vivos
          </h2>
          <span className="px-3 py-1 rounded-full bg-sadhana-primary/30 border border-sadhana-primary/50 text-[10px] md:text-xs font-mono tracking-widest text-white uppercase mt-2 inline-block backdrop-blur-md font-bold shadow-lg">
            Reserva Natural & Conservación
          </span>
        </div>
        
        <button
          onClick={onOpenTrailer}
          className="pointer-events-auto px-4 py-2.5 md:px-6 md:py-3 rounded-xl bg-sadhana-dark/80 backdrop-blur-xl hover:bg-white border border-sadhana-sand/30 text-white hover:text-sadhana-dark font-sans text-[10px] md:text-xs tracking-widest font-bold uppercase flex items-center gap-2 md:gap-3 transition-all hover:scale-[1.02] shadow-2xl"
        >
          <Compass className="w-4 h-4 md:w-5 md:h-5" />
          <span>Explorar Santuario</span>
        </button>
      </div>

      {/* The Pinning Container */}
      <div ref={containerRef} className="h-screen w-full relative">
        
        {/* The Horizontal Slider */}
        <div 
          ref={sliderRef}
          className="flex h-full"
          style={{ width: `${MAIN_MODULES.length * 100}vw` }}
        >
          {MAIN_MODULES.map((mod, index) => (
            <div 
              key={mod.id} 
              className="ecoaldea-slide h-screen w-screen relative flex items-center shrink-0"
            >
              {/* Imagen panorámica de fondo */}
              <div className="absolute inset-0">
                <img 
                  src={mod.imageUrl} 
                  alt={mod.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sadhana-dark via-sadhana-dark/70 to-transparent opacity-95" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Glassmorphism Card Contenido (Lado Izquierdo) */}
              <div className="relative z-10 w-full max-w-2xl px-4 md:px-12 lg:ml-12 mt-20 md:mt-16 h-[80vh] md:h-auto flex items-center">
                
                <div className="bg-sadhana-dark/40 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-h-full overflow-y-auto hide-scrollbar">
                  <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono text-sadhana-primary uppercase tracking-widest font-bold mb-3 md:mb-4 flex-wrap">
                    <span className="bg-white/10 px-2 py-1 rounded">{mod.chapterNumber}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="text-white/90 truncate">{mod.quechuaTitle}</span>
                  </div>

                  <h3 className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-white mb-2 md:mb-4 leading-tight drop-shadow-md">
                    {mod.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-sadhana-sand/90 font-medium leading-relaxed mb-4 md:mb-6 italic border-l-2 border-sadhana-primary/50 pl-3">
                    "{mod.cinemaLogline}"
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                    {mod.metrics.map((metric, i) => (
                      <div key={i} className="p-2 md:p-3 rounded-xl bg-black/30 border border-white/5 text-left backdrop-blur-sm">
                        <span className="block text-[8px] md:text-[10px] font-mono text-sadhana-sand/60 uppercase tracking-wider">
                          {metric.label}
                        </span>
                        <span className="block text-[11px] md:text-sm font-mono font-bold text-white mt-1">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights Bulleted */}
                  <div className="space-y-2 md:space-y-3 mb-6 hidden sm:block">
                    {mod.keyHighlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-[11px] md:text-sm font-medium text-white/80 leading-snug">
                        <Sparkles className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-4 md:pt-6 border-t border-white/10">
                    <button
                      onClick={() => onSelectModuleForExperience(mod)}
                      className="w-full py-3 md:py-4 px-6 rounded-xl bg-white hover:bg-sadhana-primary text-sadhana-dark hover:text-white font-sans font-black text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg"
                    >
                      <span>{mod.ctaText}</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] md:text-[10px] font-mono font-bold text-white/50 px-2 uppercase tracking-wider text-center sm:text-left">
                      <span>Capacidad: {mod.capacity}</span>
                      <span>{mod.duration}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Indicador de Swipe/Scroll sutil */}
              {index < MAIN_MODULES.length - 1 && (
                <div className="absolute bottom-12 right-12 text-white/50 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
                  <span className="hidden md:inline">Siguiente Capítulo</span>
                  <span className="md:hidden">Scroll</span>
                  <div className="w-12 md:w-24 h-px bg-white/50 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/50 rotate-45 transform origin-center" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
