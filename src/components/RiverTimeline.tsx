import React, { useState } from 'react';
import { Compass, Waves, ArrowDownRight, MapPin, Sparkles, Mountain } from 'lucide-react';
import { RIVER_STATIONS } from '../data/mockData';
import { RiverStation } from '../types';

export const RiverTimeline: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<RiverStation>(RIVER_STATIONS[2]); // Default to Intihuatana

  return (
    <section id="rio-sagrado" className="relative py-24 bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-600/30 bg-sky-50 text-sky-900 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm">
            <Waves className="w-3.5 h-3.5 text-sky-700 animate-pulse" />
            <span>LA VÍA LÁCTEA TERRESTRE · MAYU SAGRADO</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            El Caudal del <span className="text-sky-800">Willakamayu</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-medium">
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
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-sky-600 shadow-md ring-2 ring-sky-600/20 -translate-y-1'
                      : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-sky-700 text-white'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-sky-900 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-300 font-bold">
                        {station.altitude} msnm
                      </span>
                    </div>

                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 line-clamp-1">
                      {station.name}
                    </h4>
                    <p className="text-[11px] text-amber-800 font-cinzel mt-0.5 line-clamp-1 font-semibold">
                      {station.quechuaName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[10px] font-mono font-medium">{station.distanceKm} km desde origen</span>
                    <ArrowDownRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-sky-700 rotate-45' : 'text-stone-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Station Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl">
          {/* Station Image with Atmospheric Frame */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-300 shadow-lg">
            <img
              src={selectedStation.image}
              alt={selectedStation.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-stone-950/85 backdrop-blur-md p-3 rounded-xl border border-stone-700">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                <Compass className="w-3.5 h-3.5 text-sky-700" />
                <span>Estación #{selectedStation.id} en la Ribera del Willakamayu</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-stone-950">
                {selectedStation.name}
              </h3>
              <p className="text-amber-800 font-cinzel font-semibold text-sm sm:text-base mt-1">
                {selectedStation.significance}
              </p>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              {selectedStation.culturalNote}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                <span className="text-[10px] uppercase font-mono text-stone-500 font-bold block">Hidrología Inca:</span>
                <span className="font-semibold text-xs text-sky-900">Cuenca del Urubamba/Vilcanota</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                <span className="text-[10px] uppercase font-mono text-stone-500 font-bold block">Conexión Arqueológica:</span>
                <span className="font-semibold text-xs text-amber-900">Ruta Maestra del Qhapaq Ñan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
