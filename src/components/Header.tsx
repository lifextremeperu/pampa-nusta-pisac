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
  const { i18n, t } = useTranslation();

  const languages = ['es', 'en', 'fr', 'pt'];
  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(i18n.language) || 0;
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex]);
  };

  useEffect(() => {
    const unsub = andeanAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });

    const handleFirstInteraction = () => {
      andeanAudio.autoStart();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Try to auto-start immediately (some browsers may allow it)
    setTimeout(() => andeanAudio.autoStart(), 500);

    return () => {
      unsub();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
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
                title={t('header.audioLog')}
              >
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">{t('header.audioLog')}</span>
                <Radio className="w-5 h-5" />
              </button>
            )}

            {/* Trailer / Scene Index */}
            <button
              onClick={onOpenTrailer}
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              title={t('header.scenes')}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">{t('header.scenes')}</span>
              <Video className="w-5 h-5" />
            </button>

            {/* Language & Audio Pill */}
            <div className="flex items-center rounded-full border border-white/20 bg-black/10 backdrop-blur-md overflow-hidden shadow-sm">
              <button
                onClick={toggleLanguage}
                className="font-mono text-[10px] tracking-widest px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                title="Change Language"
              >
                {i18n.language.toUpperCase()}
              </button>
              
              <div className="w-px h-4 bg-white/20" />
              
              {/* Sound Toggle */}
              <button
                onClick={handleToggleAudio}
                className="flex items-center justify-center px-3 py-1.5 hover:bg-white hover:text-black transition-colors text-white/90"
                title={isAudioPlaying ? t('header.mute') : t('header.audio')}
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
