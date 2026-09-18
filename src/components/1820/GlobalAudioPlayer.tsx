import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GlobalAudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();

  const initAudio = () => {
    if (!audioRef.current) {
      // Audio de naturaleza y flauta andina (Placeholder de libre uso)
      const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/2/20/River_stream_in_forest.ogg');
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    setIsMuted(false);
    audioRef.current.play().catch(e => console.log('Audio autoplay prevented'));
  };

  const toggleMute = () => {
    if (!audioRef.current) {
      initAudio();
      return;
    }

    if (isMuted) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented'));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // Auto-play attempt on first user interaction anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioRef.current) {
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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-8 right-8 z-[9999] w-12 h-12 rounded-full bg-[#E5E0D8]/90 backdrop-blur-md border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#E5E0D8] transition-all hover:scale-110 shadow-xl group"
      aria-label={isMuted ? "Activar Sonidos Andinos" : "Silenciar"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-[#34E0A1]" />
          <span className="absolute inset-0 rounded-full animate-ping bg-[#34E0A1]/20 scale-150" />
        </div>
      )}
    </button>
  );
};
