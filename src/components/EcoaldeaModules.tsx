import React, { useState } from 'react';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';
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
  const [activeModuleId, setActiveModuleId] = useState<string>('wachuma');

  // Filter out the wachuma-01, wachuma-02 sub-varieties that belong to the slider
  const MAIN_MODULES = ECOALDEA_MODULES.filter(m => !m.id.match(/^wachuma-\d+$/));
  const activeModule = MAIN_MODULES.find((m) => m.id === activeModuleId) || MAIN_MODULES[0];

  return (
    <section className="relative py-20 sm:py-28 bg-sadhana-dark text-white overflow-hidden">
      {/* Background cinematic glow & grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sadhana-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sadhana-sand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Movie Billing Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-sadhana-sand/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-sadhana-primary/10 border border-sadhana-primary/30 text-[10px] font-mono tracking-widest text-sadhana-primary font-bold uppercase">
                RESERVA NATURAL & CONSERVACIÓN · 5 PILARES
              </span>
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Cinco Capítulos Vivos
            </h2>
            <p className="text-xs sm:text-sm text-sadhana-sand/70 font-mono tracking-wide mt-4 max-w-xl">
              / ARQUITECTURA BIOCLIMÁTICA, AGROECOLOGÍA Y MEDICINA ANCESTRAL EN EL VALLE SAGRADO.
            </p>
          </div>

          <button
            onClick={onOpenTrailer}
            className="self-start md:self-auto px-6 py-3.5 rounded-xl bg-sadhana-dark hover:bg-white border border-sadhana-sand/20 text-white hover:text-sadhana-dark font-sans text-xs tracking-widest font-bold uppercase flex items-center gap-3 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explorar Santuario</span>
          </button>
        </div>

        {/* 5-Chapter Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {MAIN_MODULES.map((mod, index) => {
            const isActive = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-sadhana-primary bg-sadhana-sand/10 scale-[1.02]'
                    : 'border-sadhana-sand/10 bg-sadhana-dark hover:bg-sadhana-sand/5 hover:border-sadhana-sand/30'
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-sadhana-primary" />
                )}

                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className={isActive ? 'text-sadhana-primary font-bold' : 'text-sadhana-sand/50'}>
                      0{index + 1}
                    </span>
                    <span className="text-sadhana-sand/50 text-[9px] uppercase tracking-wider">
                      {mod.element}
                    </span>
                  </div>

                  <h3 className={`font-sans text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                    isActive ? 'text-white' : 'text-sadhana-sand/70 group-hover:text-white'
                  }`}>
                    {mod.title}
                  </h3>
                </div>

                <p className="text-[10px] text-sadhana-sand/50 font-mono mt-3 truncate">
                  {mod.altitude}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase */}
        <div className="bg-sadhana-dark border border-sadhana-sand/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Sanctuary Image */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              <img
                src={activeModule.imageUrl}
                alt={activeModule.title}
                className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-sadhana-dark" />
              
              <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-sadhana-primary/40 text-[10px] font-mono tracking-widest text-sadhana-primary uppercase font-bold">
                  {activeModule.badge}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-sans font-bold text-xs sm:text-sm text-white/90 bg-sadhana-dark/60 backdrop-blur-md p-4 rounded-2xl border border-sadhana-sand/20 max-w-lg">
                  {activeModule.quote}
                </p>
              </div>
            </div>

            {/* Right: Crisp Metadata, Metrics & Actions */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-sadhana-primary uppercase tracking-widest font-bold mb-2">
                  <span>{activeModule.chapterNumber}</span>
                  <span>·</span>
                  <span className="text-sadhana-sand/70">{activeModule.quechuaTitle}</span>
                </div>

                <h3 className="font-sans text-3xl sm:text-4xl font-black tracking-tighter text-white mb-3 leading-none">
                  {activeModule.title}
                </h3>

                <p className="text-xs sm:text-sm text-sadhana-sand/80 font-medium leading-relaxed mb-6">
                  {activeModule.cinemaLogline}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {activeModule.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-sadhana-sand/5 border border-sadhana-sand/10 text-left"
                    >
                      <span className="block text-[10px] font-mono text-sadhana-sand/50 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span className="block text-xs font-mono font-bold text-white mt-1">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Highlights Bulleted */}
                <div className="space-y-3 mb-6">
                  {activeModule.keyHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs font-medium text-sadhana-sand/90">
                      <Sparkles className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-6 border-t border-sadhana-sand/10">
                <button
                  onClick={() => onSelectModuleForExperience(activeModule)}
                  className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-sadhana-sand text-sadhana-dark font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <span>{activeModule.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-sadhana-dark" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-sadhana-sand/50 px-2">
                  <span>Capacidad: {activeModule.capacity}</span>
                  <span>Permanencia: {activeModule.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
