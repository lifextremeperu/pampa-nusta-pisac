import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Leaf, Compass, ChevronRight } from 'lucide-react';
import { andeanAudio } from '../utils/audioSynthesizer';

interface CinematicTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
}

interface Scene {
  id: number;
  time: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
  quote: string;
  moduleId: string;
}

const TRAILER_SCENES: Scene[] = [
  {
    id: 1,
    time: '00:15',
    title: 'EL DESPERTAR DE LA WACHUMA',
    subtitle: 'El cactus de cuatro vientos y la memoria de las cumbres',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
    quote: '«El cactus no te enseña nada nuevo; sólo descorre el velo de lo que siempre fuiste.»',
    moduleId: 'wachuma',
  },
  {
    id: 2,
    time: '00:45',
    title: 'LA MEMORIA DE LA SEMILLA',
    subtitle: 'Tres mil años de domesticación andina en cada grano',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-trees-of-a-forest-41130-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1920&q=85',
    quote: '«Una sola mazorca de maíz gigante sostiene la genealogía de diez generaciones.»',
    moduleId: 'semillas',
  },
  {
    id: 3,
    time: '01:20',
    title: 'LA INFANCIA Y LA TIERRA',
    subtitle: 'Manos en el barro, cantos al río y libertad bajo el queñual',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1920&q=85',
    quote: '«La escuela más sagrada no tiene paredes: tiene cielo, tierra y raíces.»',
    moduleId: 'ninos',
  },
  {
    id: 4,
    time: '01:55',
    title: 'EL FUEGO DE LAS PLANTAS MAESTRAS',
    subtitle: 'La noche cósmica del Willakamayu y la disolución del ego',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-slow-motion-41617-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1920&q=85',
    quote: '«Bajo el manto de la Vía Láctea terrenal, los abuelos encienden la luz interior.»',
    moduleId: 'ceremonias',
  },
  {
    id: 5,
    time: '02:40',
    title: 'LA VIDA COMUNITARIA REGENERATIVA',
    subtitle: 'Cuatro días para recordar cómo tejer el futuro con la Pachamama',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-valley-during-sunset-41484-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=85',
    quote: '«Vivir en la ecoaldea es volver al pacto sagrado del Ayni.»',
    moduleId: 'talleres',
  },
];

export const CinematicTrailerModal: React.FC<CinematicTrailerModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Start ambient sound if not playing
      if (!andeanAudio.getIsPlaying()) {
        andeanAudio.toggle();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentScene = TRAILER_SCENES[activeSceneIndex];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6 animate-fadeIn">
      {/* Natural Sanctuary Frame Container */}
      <div className="relative w-full max-w-6xl bg-[#14100c] border border-[#6b492d] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col">
        {/* Sanctuary Header */}
        <div className="bg-[#100c09] px-5 py-3 border-b border-[#3b2c20] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#322318] border border-[#6b492d] text-[10px] font-mono tracking-widest text-[#e5aa5d] font-bold uppercase">
              <Leaf className="w-3 h-3 text-[#d8974a]" />
              SANTUARIO VIVO · 4K HDR
            </div>
            <span className="hidden sm:inline text-xs text-[#a89582] font-mono">
              PAMPA ÑUSTA: RESERVA NATURAL (EXPLORACIÓN 360)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
              title="Cerrar reproductor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video / Visual Screen with 2.39:1 ratio */}
        <div className="relative aspect-[21/9] w-full bg-black overflow-hidden group">
          <video
            key={currentScene.videoUrl}
            src={currentScene.videoUrl}
            poster={currentScene.posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 cinema-vignette pointer-events-none" />

          {/* Film Title Watermark */}
          <div className="absolute top-6 left-6 z-10">
            <span className="font-cinzel text-xs tracking-widest text-amber-400/80 uppercase font-bold block">
              Escena {currentScene.id} de {TRAILER_SCENES.length} · {currentScene.time}
            </span>
            <h3 className="font-cinzel text-xl sm:text-3xl text-stone-100 font-bold tracking-tight drop-shadow-md">
              {currentScene.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 max-w-xl drop-shadow">
              {currentScene.subtitle}
            </p>
          </div>

          {/* Quote Banner */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <p className="font-cinzel text-sm sm:text-base italic text-amber-200/90 max-w-2xl bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-amber-500/20">
              {currentScene.quote}
            </p>

            <button
              onClick={() => {
                onClose();
                onSelectModule(currentScene.moduleId);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wider uppercase font-cinzel flex items-center gap-2 shadow-lg shadow-amber-900/40 hover:scale-[1.03] transition-all whitespace-nowrap"
            >
              <span>Explorar Módulo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scene Selector Strip (Film Roll) */}
        <div className="bg-stone-950 px-4 py-3 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Carrete de Capítulos de la Ecoaldea
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              {activeSceneIndex + 1} / {TRAILER_SCENES.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {TRAILER_SCENES.map((scene, idx) => {
              const isCurrent = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`relative p-2 rounded-xl border text-left transition-all overflow-hidden ${
                    isCurrent
                      ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/20'
                      : 'border-stone-800 hover:border-stone-700 bg-stone-900/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="block text-[9px] font-mono text-amber-400 tracking-wider font-bold">
                    {scene.time}
                  </span>
                  <span className="block font-cinzel text-[11px] font-bold text-stone-200 truncate mt-0.5">
                    {scene.title.split(' ')[0]} {scene.title.split(' ')[1] || ''}
                  </span>
                  {isCurrent && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
