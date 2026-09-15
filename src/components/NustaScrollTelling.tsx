import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Leaf, ShieldAlert, ArrowRight, RotateCcw, Volume2, Sparkles, Video } from 'lucide-react';
import { STORY_ACTS } from '../data/mockData';
import { andeanAudio } from '../utils/audioSynthesizer';
import { DualStonesLegendArtwork } from './DualStonesLegendArtwork';

export const NustaScrollTelling: React.FC = () => {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [petrificationFactor, setPetrificationFactor] = useState(0); // 0 to 100
  const activeAct = STORY_ACTS[activeActIndex];
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const handleSelectAct = (index: number) => {
    setActiveActIndex(index);
    setPetrificationFactor(STORY_ACTS[index].stoneProgress);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPetrificationFactor(val);
    if (val < 20) setActiveActIndex(0);
    else if (val < 50) setActiveActIndex(1);
    else if (val < 85) setActiveActIndex(2);
    else setActiveActIndex(3);
  };

  return (
    <>
      {/* Cinematic Letterboxing (Fixed to viewport) */}
      <div className="cinema-letterbox-top" style={{ height: isInView ? '8vh' : '0' }} />
      <div className="cinema-letterbox-bottom" style={{ height: isInView ? '8vh' : '0' }} />

      <section ref={sectionRef} id="leyenda" className="relative py-32 md:py-48 bg-sadhana-dark text-white overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Cinematic Documentary Style */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sadhana-primary/30 bg-sadhana-primary/10 text-sadhana-sand text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono font-bold shadow-sm backdrop-blur-md mb-8">
            <Video className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>DOCUMENTAL ORIGINAL: MEMORIA ANCESTRAL</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            LEYENDA DE LA <br />
            <span className="text-sadhana-sand">ÑUSTA ENCANTADA</span>
          </h2>
          <p className="mt-8 text-sadhana-sand/80 text-lg md:text-xl leading-relaxed font-medium">
            Inquill Chumpi y el príncipe Asto Rímac: amor, pacto con los Apus y la transmutación en guardianes pétreos de la siembra en Pisac.
          </p>
        </div>

        {/* FEATURED ARTWORK: Las 2 Piedras (Energía Femenina y Masculina enseñando a sembrar a los niños y al pueblo) */}
        <div className="mb-14">
          <DualStonesLegendArtwork />
        </div>

        {/* Divider with Cinematic Inscription */}
        <div className="flex items-center justify-center gap-4 my-16 text-sadhana-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
          <div className="h-px bg-white/20 w-16 md:w-32" />
          <span className="font-bold text-sadhana-sand">Relato en 4 Actos Históricos</span>
          <div className="h-px bg-white/20 w-16 md:w-32" />
        </div>

        {/* Story Acts Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {STORY_ACTS.map((act, idx) => (
            <button
              key={act.id}
              onClick={() => handleSelectAct(idx)}
              className={`p-5 md:p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                activeActIndex === idx
                  ? 'bg-sadhana-primary/20 border-sadhana-primary shadow-xl backdrop-blur-md'
                  : 'bg-white/5 border-white/10 hover:border-white/30 backdrop-blur-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-sadhana-sand/70 mb-3">
                  <span className={`font-mono font-bold tracking-[0.2em] uppercase ${activeActIndex === idx ? 'text-white' : 'text-sadhana-sand/70'}`}>ACTO 0{act.id}</span>
                  <span className="font-mono font-bold text-sadhana-primary">{act.stoneProgress}% Roca</span>
                </div>
                <h3 className={`text-sm md:text-base font-bold tracking-widest uppercase line-clamp-1 ${activeActIndex === idx ? 'text-white' : 'text-sadhana-sand'}`}>
                  {act.title}
                </h3>
              </div>
              <span className="text-[10px] md:text-xs text-sadhana-primary/80 font-mono uppercase tracking-[0.2em] mt-4 font-bold">
                {act.quechuaTitle}
              </span>
            </button>
          ))}
        </div>

        {/* Narrative Stage: Interactive Visuals & Petrification Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Canvas with Petrification Transition */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-sadhana-dark">
              <img
                src={activeAct.image}
                alt={activeAct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
                style={{
                  filter: `grayscale(${petrificationFactor}%) contrast(${100 + petrificationFactor * 0.35}%) sepia(${
                    petrificationFactor * 0.3
                  }%) brightness(${100 - petrificationFactor * 0.2}%)`,
                  willChange: 'filter'
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-3 px-4 py-2 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-white/20 text-xs shadow-lg">
                <span
                  className={`w-2 h-2 rounded-full ${
                    petrificationFactor === 100
                      ? 'bg-white'
                      : petrificationFactor > 50
                      ? 'bg-sadhana-primary animate-pulse'
                      : 'bg-emerald-400 animate-ping'
                  }`}
                />
                <span className="font-mono uppercase tracking-[0.2em] text-[10px] font-bold text-white">
                  {petrificationFactor === 100
                    ? 'ESTADO: WAK\'A SAGRADA (ROCA)'
                    : petrificationFactor > 50
                    ? 'PETRIFICACIÓN EN PROCESO'
                    : 'FORMA HUMANA VIVA'}
                </span>
              </div>

              {/* Character Marker */}
              <div className="absolute bottom-6 left-6 right-6 z-10 p-4 bg-sadhana-dark/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-sadhana-primary font-mono font-bold block mb-1">Personaje Clave:</span>
                  <p className="font-bold tracking-widest uppercase text-white text-sm md:text-base">{activeAct.character}</p>
                </div>
                <button
                  onClick={() => andeanAudio.toggle()}
                  className="p-3 rounded-full bg-white/10 hover:bg-sadhana-primary transition-colors cursor-pointer border border-white/20"
                  title="Sonido de escena"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Petrification Interactive Slider */}
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-sadhana-sand uppercase tracking-[0.2em] flex items-center gap-2 text-[10px] font-bold">
                  <ShieldAlert className="w-4 h-4 text-sadhana-primary" />
                  Efecto Cinemático de Petrificación:
                </span>
                <span className="font-mono font-bold text-white tracking-widest">{petrificationFactor}% Transmutación</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={petrificationFactor}
                onChange={handleSliderChange}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-sadhana-primary"
                aria-label="Petrification progress slider"
              />
              <div className="flex justify-between text-[10px] text-sadhana-sand/50 font-mono pt-2 font-bold uppercase tracking-widest">
                <span>0% Carne Mortal</span>
                <span>50% La Mirada Atrás</span>
                <span>100% Granito Inmortal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Historical & Mythological Text */}
          <div className="lg:col-span-5 space-y-8 pl-0 lg:pl-12">
            <div>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-sadhana-primary font-mono tracking-[0.3em] uppercase mb-4 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>{activeAct.quechuaTitle}</span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9]">
                {activeAct.title}
              </h3>
            </div>

            <p className="text-sadhana-sand/90 text-lg md:text-xl font-medium italic border-l-2 border-sadhana-primary pl-6 py-2 leading-relaxed">
              {activeAct.quote}
            </p>

            <motion.p 
              key={activeAct.summary}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.015 } }
              }}
              className="text-sadhana-sand/70 text-sm md:text-base leading-relaxed font-mono typewriter-cursor font-medium"
            >
              {activeAct.summary.split("").map((char, index) => (
                <motion.span key={`${index}-${char}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <button
                onClick={() => handleSelectAct((activeActIndex - 1 + STORY_ACTS.length) % STORY_ACTS.length)}
                className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={() => handleSelectAct((activeActIndex + 1) % STORY_ACTS.length)}
                className="px-6 py-3 bg-white text-sadhana-dark hover:bg-sadhana-sand text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
};
