import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const GlobalAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Frecuencia Solfeggio pura (432 Hz Healing Frequency Meditation)
  const AUDIO_SRC = "https://archive.org/download/jamendo-524803/01-2039515-STOCK%20ELITE%20MUSIC-432%20Hz%20Healing%20Frequency%20Meditation.mp3";

  // Intentar auto-reproducir después de la primera interacción
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        // Opcional: auto-reproducir al primer click en la pantalla
        // audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    return () => document.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3">
      {/* Etiqueta de texto sutil - Neuromarketing: Genera curiosidad */}
      <div 
        className={`transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'} hidden md:block`}
      >
        <span className="text-[10px] uppercase tracking-widest text-sadhana-brown bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-sadhana-sand shadow-sm cursor-pointer" onClick={togglePlay}>
          Activar Frecuencia de Sanación
        </span>
      </div>
      
      {/* Botón Flotante */}
      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center border border-sadhana-sand/50 transition-transform hover:scale-105 active:scale-95 group relative"
        aria-label="Toggle Shamanic Audio"
      >
        {/* Anillos de expansión cuando suena */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-sadhana-primary/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            <span className="absolute inset-0 rounded-full border border-sadhana-primary/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></span>
          </>
        )}
        
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-sadhana-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-sadhana-brown/50 group-hover:text-sadhana-brown transition-colors" />
        )}
      </button>

      <audio 
        ref={audioRef} 
        src={AUDIO_SRC} 
        loop 
        preload="auto"
      />
    </div>
  );
};
