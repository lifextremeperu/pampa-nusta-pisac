import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SolfeggioAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const natureAudioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = () => {
    if (!natureAudioRef.current) {
      // Audio de naturaleza, río, viento (Valle Sagrado)
      const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/2/20/River_stream_in_forest.ogg');
      audio.loop = true;
      audio.volume = 0.6;
      natureAudioRef.current = audio;
    }

    setIsPlaying(true);
    setIsMuted(false);
    
    natureAudioRef.current.play().catch(e => console.log('Audio autoplay prevented'));
  };

  const toggleMute = () => {
    if (!natureAudioRef.current) {
      initAudio();
      return;
    }

    const natureAudio = natureAudioRef.current;
    
    if (isMuted) {
      natureAudio.play().catch(e => console.log('Audio autoplay prevented'));
      setIsMuted(false);
    } else {
      natureAudio.pause();
      setIsMuted(true);
    }
  };

  // Auto-play attempt on first user interaction anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!natureAudioRef.current) {
        initAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      if (natureAudioRef.current) {
        natureAudioRef.current.pause();
        natureAudioRef.current = null;
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-sadhana-dark transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      aria-label={isMuted ? "Activar Sonido del Valle" : "Silenciar Sonido"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-emerald-400" />
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20 scale-150" />
        </div>
      )}
    </button>
  );
};
