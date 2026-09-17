import React, { useState } from 'react';
import { Sparkles, Compass, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ECOALDEA_MODULES } from '../data/ecoaldeaModules';
import { EcoaldeaModule } from '../types';

interface EcoaldeaModulesProps {
  onSelectModuleForExperience: (module: EcoaldeaModule) => void;
  onOpenTrailer: () => void;
}

export const EcoaldeaModules: React.FC<EcoaldeaModulesProps> = ({
  onSelectModuleForExperience,
  onOpenTrailer,
}) => {
  const MAIN_MODULES = ECOALDEA_MODULES.filter(m => !m.id.match(/^wachuma-\d+$/));
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % MAIN_MODULES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + MAIN_MODULES.length) % MAIN_MODULES.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const currentModule = MAIN_MODULES[activeIndex];

  const pageVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
      scale: 0.95
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: 'center center',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="relative bg-sadhana-dark text-white overflow-hidden min-h-screen flex flex-col justify-center py-20" style={{ perspective: '2000px' }}>
      
      {/* Intro Overlay / Título fijo superior */}
      <div className="absolute top-6 md:top-8 left-0 w-full z-30 px-6 md:px-12 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
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
          className="px-4 py-2.5 md:px-6 md:py-3 rounded-xl bg-sadhana-dark/80 backdrop-blur-xl hover:bg-white border border-sadhana-sand/30 text-white hover:text-sadhana-dark font-sans text-[10px] md:text-xs tracking-widest font-bold uppercase flex items-center gap-2 md:gap-3 transition-all hover:scale-[1.02] shadow-2xl"
        >
          <Compass className="w-4 h-4 md:w-5 md:h-5" />
          <span>Explorar Santuario</span>
        </button>
      </div>

      {/* Book Index (Top Pagination) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-24 md:mt-32 flex flex-wrap justify-center gap-2 md:gap-4">
        {MAIN_MODULES.map((mod, index) => (
          <button
            key={mod.id}
            onClick={() => handleSelect(index)}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-all ${
              activeIndex === index 
                ? 'bg-sadhana-primary text-black shadow-[0_0_15px_rgba(0,174,66,0.3)] scale-105' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {/* Book Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 mt-12 md:mt-16 mb-24">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Imagen panorámica de fondo */}
            <div className="absolute inset-0">
              <img 
                src={currentModule.imageUrl} 
                alt={currentModule.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sadhana-dark via-sadhana-dark/70 to-transparent opacity-95 md:opacity-80" />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Contenido (Glassmorphism) */}
            <div className="relative z-10 w-full lg:max-w-2xl px-6 py-12 md:px-12 md:py-16 flex flex-col justify-center min-h-[70vh] md:min-h-[600px]">
              <div className="bg-sadhana-dark/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full">
                <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono text-sadhana-primary uppercase tracking-widest font-bold mb-3 md:mb-4 flex-wrap">
                  <span className="bg-white/10 px-2 py-1 rounded">{currentModule.chapterNumber}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="text-white/90 truncate">{currentModule.quechuaTitle}</span>
                </div>

                <h3 className="font-sans text-2xl md:text-5xl font-black tracking-tighter text-white mb-2 md:mb-4 leading-tight drop-shadow-md">
                  {currentModule.title}
                </h3>
                
                <p className="text-xs md:text-sm text-sadhana-sand/90 font-medium leading-relaxed mb-4 md:mb-6 italic border-l-2 border-sadhana-primary/50 pl-3">
                  "{currentModule.cinemaLogline}"
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                  {currentModule.metrics.map((metric, i) => (
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

                {/* Key Highlights */}
                <div className="space-y-2 md:space-y-3 mb-6 hidden sm:block">
                  {currentModule.keyHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[11px] md:text-sm font-medium text-white/80 leading-snug">
                      <Sparkles className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-4 md:pt-6 border-t border-white/10">
                  <button
                    onClick={() => onSelectModuleForExperience(currentModule)}
                    className="w-full py-3 md:py-4 px-6 rounded-xl bg-white hover:bg-sadhana-primary text-sadhana-dark hover:text-white font-sans font-black text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg"
                  >
                    <span>{currentModule.ctaText}</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] md:text-[10px] font-mono font-bold text-white/50 px-2 uppercase tracking-wider text-center sm:text-left">
                    <span>Capacidad: {currentModule.capacity}</span>
                    <span>{currentModule.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Arrows (Side) */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-sadhana-primary hover:text-black hover:scale-110 transition-all shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 pr-0.5" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-sadhana-primary hover:text-black hover:scale-110 transition-all shadow-xl"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 pl-0.5" />
        </button>
      </div>

    </section>
  );
};
