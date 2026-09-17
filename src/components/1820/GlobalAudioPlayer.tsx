import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player/youtube';

export const GlobalAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Música chamánica del Camino Rojo (Pájaro - Temazcal)
  const YOUTUBE_URL = "https://www.youtube.com/watch?v=SkxLdLael84";

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    return () => document.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 text-white relative z-[100]">
      {/* Etiqueta de texto sutil - Neuromarketing */}
      <div 
        className={`transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'} hidden md:block`}
      >
        <span className="text-[9px] uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm cursor-pointer hover:bg-white/20 transition-all font-mono font-bold" onClick={togglePlay}>
          Activar Frecuencia
        </span>
      </div>
      
      {/* Botón Flotante */}
      <button 
        onClick={togglePlay}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white/20 transition-transform hover:scale-105 active:scale-95 group relative cursor-pointer"
        aria-label="Toggle Shamanic Audio"
      >
        {/* Anillos de expansión cuando suena */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-white/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            <span className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></span>
          </>
        )}
        
        {isPlaying ? (
          <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
        ) : (
          <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-white transition-colors" />
        )}
      </button>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <ReactPlayer 
          url={YOUTUBE_URL}
          playing={isPlaying}
          loop={true}
          volume={0.6}
          width="0"
          height="0"
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0,
                controls: 0,
                modestbranding: 1
              }
            }
          }}
        />
      </div>
    </div>
  );
};