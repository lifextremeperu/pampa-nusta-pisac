import React, { useState } from 'react';
import { Leaf, ShieldAlert, ArrowRight, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { STORY_ACTS } from '../data/mockData';
import { andeanAudio } from '../utils/audioSynthesizer';
import { DualStonesLegendArtwork } from './DualStonesLegendArtwork';

export const NustaScrollTelling: React.FC = () => {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [petrificationFactor, setPetrificationFactor] = useState(0); // 0 to 100
  const activeAct = STORY_ACTS[activeActIndex];

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
    <section id="leyenda" className="relative py-20 bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Natural Reserve Storytelling style */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-amber-700" />
            <span>MEMORIA ORAL ANCESTRAL & PATRIMONIO INMATERIAL</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950">
            La Leyenda de la <span className="text-amber-800">Ñusta Encantada</span>
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-medium">
            Inquill Chumpi y el príncipe Asto Rímac: amor, pacto con los Apus y la transmutación en guardianes pétreos de la siembra en Pisac.
          </p>
        </div>

        {/* FEATURED ARTWORK: Las 2 Piedras (Energía Femenina y Masculina enseñando a sembrar a los niños y al pueblo) */}
        <div className="mb-14">
          <DualStonesLegendArtwork />
        </div>

        {/* Divider with Natural Reserve Inscription */}
        <div className="flex items-center justify-center gap-3 my-10 text-stone-400 font-mono text-xs uppercase tracking-widest">
          <div className="h-px bg-stone-300 w-16" />
          <span className="text-stone-600 font-bold">Relato en 4 Actos Históricos</span>
          <div className="h-px bg-stone-300 w-16" />
        </div>

        {/* Story Acts Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {STORY_ACTS.map((act, idx) => (
            <button
              key={act.id}
              onClick={() => handleSelectAct(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                activeActIndex === idx
                  ? 'bg-amber-50 border-amber-600 shadow-md ring-2 ring-amber-600/20'
                  : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-mono text-amber-800 font-bold text-[10px]">ACTO 0{act.id}</span>
                  <span className="text-[10px] text-stone-600 font-mono font-medium">{act.stoneProgress}% Roca</span>
                </div>
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                  {act.title}
                </h3>
              </div>
              <span className="text-[10px] text-amber-800 font-mono mt-2 font-semibold">
                {act.quechuaTitle}
              </span>
            </button>
          ))}
        </div>

        {/* Narrative Stage: Interactive Visuals & Petrification Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Left Column: Visual Canvas with Petrification Transition */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-300 shadow-xl group bg-stone-950">
              <img
                src={activeAct.image}
                alt={activeAct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                style={{
                  filter: `grayscale(${petrificationFactor}%) contrast(${100 + petrificationFactor * 0.35}%) sepia(${
                    petrificationFactor * 0.3
                  }%) brightness(${100 - petrificationFactor * 0.2}%)`,
                  willChange: 'filter, transform'
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-700 text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    petrificationFactor === 100
                      ? 'bg-stone-400'
                      : petrificationFactor > 50
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-emerald-400 animate-ping'
                  }`}
                />
                <span className="font-mono uppercase tracking-wider text-[11px] text-stone-200 font-medium">
                  {petrificationFactor === 100
                    ? 'ESTADO: WAK\'A SAGRADA (ROCA)'
                    : petrificationFactor > 50
                    ? 'PETRIFICACIÓN EN PROCESO'
                    : 'FORMA HUMANA VIVA'}
                </span>
              </div>

              {/* Character Marker */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono">Personaje Clave:</span>
                  <p className="font-cinzel text-stone-100 font-semibold text-xs">{activeAct.character}</p>
                </div>
                <button
                  onClick={() => andeanAudio.toggle()}
                  className="p-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-amber-300 transition-colors cursor-pointer"
                  title="Sonido de escena"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Petrification Interactive Slider */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-stone-700 uppercase tracking-wider flex items-center gap-1.5 text-[11px] font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  Efecto Cinemático de Petrificación:
                </span>
                <span className="font-mono font-bold text-amber-800 text-xs">{petrificationFactor}% Transmutación</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={petrificationFactor}
                onChange={handleSliderChange}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Petrification progress slider"
              />
              <div className="flex justify-between text-[9px] text-stone-500 font-mono pt-0.5 font-medium">
                <span>0% Carne Mortal</span>
                <span>50% La Mirada Atrás</span>
                <span>100% Granito Inmortal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Historical & Mythological Text */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-mono tracking-widest uppercase mb-1 font-bold">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>{activeAct.quechuaTitle}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-950">
                {activeAct.title}
              </h3>
            </div>

            <p className="text-amber-950 bg-amber-50 border-l-4 border-amber-600 p-3 rounded-r-xl text-xs sm:text-sm font-serif italic">
              {activeAct.quote}
            </p>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans">
              {activeAct.summary}
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => handleSelectAct((activeActIndex - 1 + STORY_ACTS.length) % STORY_ACTS.length)}
                className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 bg-white text-stone-800 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer font-bold shadow-sm"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Acto Anterior</span>
              </button>

              <button
                onClick={() => handleSelectAct((activeActIndex + 1) % STORY_ACTS.length)}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>Siguiente Acto</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
