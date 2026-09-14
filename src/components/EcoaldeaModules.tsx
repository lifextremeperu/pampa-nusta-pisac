import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, ArrowRight, Play, Compass, ShieldCheck, Leaf } from 'lucide-react';
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

  const activeModule = ECOALDEA_MODULES.find((m) => m.id === activeModuleId) || ECOALDEA_MODULES[0];

  return (
    <section id="ecoaldea-modulos" className="relative py-20 sm:py-28 bg-[#14100c] text-[#f5eee6] overflow-hidden">
      {/* Background cinematic glow & grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8a4a25]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#506842]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Movie Billing Header - Menos texto, alto impacto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#3b2c20] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#322318] border border-[#6b492d] text-[10px] font-mono tracking-widest text-[#e5aa5d] font-bold uppercase">
                RESERVA NATURAL & CONSERVACIÓN · 5 PILARES
              </span>
              <span className="text-xs font-mono text-[#a89582] uppercase tracking-wider">
                Pisac · Valle Sagrado
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-[#fcf7f1] uppercase leading-none">
              Cinco Capítulos Vivos
            </h2>
            <p className="text-xs sm:text-sm text-[#b8a695] font-mono tracking-wide mt-2 max-w-xl">
              / ARQUITECTURA BIOCLIMÁTICA, AGROECOLOGÍA Y MEDICINA ANCESTRAL EN EL VALLE SAGRADO.
            </p>
          </div>

          <button
            onClick={onOpenTrailer}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#221a13] hover:bg-[#2e2319] border border-[#6b492d] text-[#e5aa5d] font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#d8974a]" />
            <span>Explorar Santuario y Capítulos</span>
          </button>
        </div>

        {/* 5-Chapter Navigation Bar (Horizontal Natural Sanctuary Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {ECOALDEA_MODULES.map((mod, index) => {
            const isActive = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`relative p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-[#c2853f] bg-[#291e16] shadow-lg shadow-[#c2853f]/15 scale-[1.02]'
                    : 'border-[#3b2c20] bg-[#1a140f]/90 hover:bg-[#251d16] hover:border-[#523d2b]'
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#c2853f]" />
                )}

                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className={isActive ? 'text-[#e5aa5d] font-bold' : 'text-[#8c7764]'}>
                      0{index + 1}
                    </span>
                    <span className="text-[#a89582] text-[9px] uppercase tracking-wider">
                      {mod.element}
                    </span>
                  </div>

                  <h3 className={`font-cinzel text-xs sm:text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                    isActive ? 'text-[#e5aa5d]' : 'text-[#d9cbba] group-hover:text-[#f5eee6]'
                  }`}>
                    {mod.title}
                  </h3>
                </div>

                <p className="text-[10px] text-[#8c7764] font-mono mt-2 truncate">
                  {mod.altitude}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase - Natural Sanctuary Showcase Card with Live Interaction */}
        <div className="bg-[#1a140e]/90 border border-[#443224] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Sanctuary Image with Letterbox feel (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              <img
                src={activeModule.imageUrl}
                alt={activeModule.title}
                className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-[#14100c]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#14100c]" />
              <div className="absolute inset-0 cinema-vignette pointer-events-none" />

              {/* Badges on Image */}
              <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#14100c]/80 backdrop-blur-md border border-[#8a5d35]/60 text-[10px] font-mono tracking-widest text-[#e5aa5d] uppercase font-bold">
                  {activeModule.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#14100c]/70 backdrop-blur-md border border-[#433123] text-[10px] font-mono text-[#a89582]">
                  {activeModule.altitude}
                </span>
              </div>

              {/* Floating Quote */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-cinzel text-xs sm:text-sm italic text-[#f7e3c3] bg-[#14100c]/85 backdrop-blur-md p-3.5 rounded-2xl border border-[#6b492d]/40 max-w-lg">
                  {activeModule.quote}
                </p>
              </div>
            </div>

            {/* Right: Crisp Metadata, Metrics & Actions (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#e5aa5d] uppercase tracking-widest font-bold mb-1">
                  <span>{activeModule.chapterNumber}</span>
                  <span>·</span>
                  <span className="text-[#a89582]">{activeModule.quechuaTitle}</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-[#fcf7f1] mb-2">
                  {activeModule.title}
                </h3>

                {/* Natural Reserve Logline */}
                <p className="text-xs sm:text-sm text-[#dfd3c5] font-mono leading-relaxed mb-6">
                  {activeModule.cinemaLogline}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {activeModule.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#201811] border border-[#3b2c20] text-left"
                    >
                      <span className="block text-[10px] font-mono text-[#8c7764] uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span className="block text-xs font-mono font-bold text-[#f5eee6] mt-0.5">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Highlights Bulleted */}
                <div className="space-y-2 mb-6">
                  {activeModule.keyHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#d9cbba]">
                      <Sparkles className="w-3.5 h-3.5 text-[#d8974a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-[#3b2c20]">
                <button
                  onClick={() => onSelectModuleForExperience(activeModule)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#c2853f] hover:bg-[#d8974a] text-[#14100c] font-cinzel font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#c2853f]/20 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <span>{activeModule.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#14100c]" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8c7764] px-2">
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
