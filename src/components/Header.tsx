import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX, Video, Compass, Radio } from 'lucide-react';
import { andeanAudio } from '../utils/audioSynthesizer';
import { ThemeMode } from '../types';

interface HeaderProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenDonate: () => void;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  onOpenTrailer: () => void;
  onOpenChatbot?: () => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrailer,
  onOpenChatbot,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(andeanAudio.getIsPlaying());
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const unsub = andeanAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggleAudio = async () => {
    await andeanAudio.toggle();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none mix-blend-difference text-white">
      <div className="flex items-start justify-between">
        
        {/* Top Left: Recording Status / Movie Title */}
        <div className="flex flex-col gap-2 pointer-events-auto cursor-default">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-xs tracking-widest font-bold">REC</span>
            <span className="font-mono text-[10px] tracking-widest opacity-60 ml-2">CH-01</span>
          </div>
          <span className="font-cinzel text-lg font-bold tracking-[0.2em] uppercase">Pampa Ñusta</span>
        </div>

        {/* Top Right: Director's HUD Controls */}
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          
          <div className="flex items-center gap-4">
            {/* Audio Log / Radio Toggle (Chatbot) */}
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                title="Abrir Comunicador"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Audio Log</span>
                <Radio className="w-5 h-5" />
              </button>
            )}

            {/* Trailer / Scene Index */}
            <button
              onClick={onOpenTrailer}
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              title="Escenas"
            >
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Escenas</span>
              <Video className="w-5 h-5" />
            </button>

            {/* Language Selection */}
            <button
              onClick={toggleLanguage}
              className="font-mono text-[10px] tracking-widest border border-white/30 px-2 py-1 hover:bg-white hover:text-black transition-colors"
            >
              {i18n.language.toUpperCase()}
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleAudio}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">
              {isAudioPlaying ? 'Mute' : 'Audio'}
            </span>
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
