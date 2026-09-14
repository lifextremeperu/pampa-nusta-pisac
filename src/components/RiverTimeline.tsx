import React, { useState } from 'react';
import { Compass, Waves, ArrowDownRight, MapPin, Sparkles, Mountain } from 'lucide-react';
import { RIVER_STATIONS } from '../data/mockData';
import { RiverStation } from '../types';

export const RiverTimeline: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<RiverStation>(RIVER_STATIONS[2]); // Default to Intihuatana

  return (
    <section id="rio-sagrado" className="relative py-24 bg-[#050505] text-stone-100 border-b border-stone-800 overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 text-sky-300 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm backdrop-blur-md">
            <Waves className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>LA VÍA LÁCTEA TERRESTRE · MAYU SAGRADO</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-50">
            El Caudal del <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-400">Willakamayu</span>
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-sans font-light">
            En la cosmogonía inca, las aguas del río Vilcanota son la proyección física del río de estrellas
            que surca el firmamento nocturno. Desciende por su corriente y descubre los hitos sagrados que alimentó en su paso por Pisac.
          </p>
        </div>

        {/* River Flow Path Representation with Interactive Stepper Stations */}
        <div className="relative mb-16">
          {/* Animated Glowing River Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-sky-600 to-amber-500 rounded-full transform -translate-y-1/2 opacity-60 shadow-sm" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {RIVER_STATIONS.map((station, idx) => {
              const isSelected = selectedStation.id === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md ${
                    isSelected
                      ? 'bg-sky-950/40 border-sky-500 shadow-md ring-2 ring-sky-500/20 -translate-y-1'
                      : 'bg-stone-900/50 border-stone-800 hover:border-stone-600 hover:bg-stone-800/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-sky-500 text-stone-950'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800 font-bold">
                        {station.altitude} msnm
                      </span>
                    </div>

                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-100 line-clamp-1">
                      {station.name}
                    </h4>
                    <p className="text-[11px] text-amber-400 font-cinzel mt-0.5 line-clamp-1 font-semibold">
                      {station.quechuaName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <span className="text-[10px] font-mono font-medium">{station.distanceKm} km desde origen</span>
                    <ArrowDownRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-sky-400 rotate-45' : 'text-stone-500'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Station Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/50 backdrop-blur-md border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Station Image with Atmospheric Frame */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-700 shadow-xl">
            <img
              src={selectedStation.image}
              alt={selectedStation.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-stone-950/85 backdrop-blur-md p-3 rounded-xl border border-stone-700 shadow-xl">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-amber-400" />
                <span className="font-mono">{selectedStation.altitude} msnm</span>
              </div>
              <span className="font-cinzel text-amber-300 font-semibold">{selectedStation.quechuaName}</span>
            </div>
          </div>

          {/* Station Narrative Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-mono uppercase tracking-wider mb-2 font-bold backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Estación #{selectedStation.id} en la Ribera del Willakamayu</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-50">
                {selectedStation.name}
              </h3>
              <p className="text-amber-400 font-cinzel font-semibold text-sm sm:text-base mt-1">
                {selectedStation.significance}
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              {selectedStation.culturalNote}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 shadow-sm backdrop-blur-sm">
                <span className="text-[10px] uppercase font-mono text-stone-500 font-bold block">Hidrología Inca:</span>
                <span className="font-semibold text-xs text-sky-400">Cuenca del Urubamba/Vilcanota</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 shadow-sm backdrop-blur-sm">
                <span className="text-[10px] uppercase font-mono text-stone-500 font-bold block">Conexión Arqueológica:</span>
                <span className="font-semibold text-xs text-amber-400">Ruta Maestra del Qhapaq Ñan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
