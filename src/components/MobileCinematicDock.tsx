import React from 'react';
import { Play, Volume2, VolumeX, Sparkles, Layers, Compass, Leaf, Video, MessageSquare, ShieldCheck } from 'lucide-react';
import { SHOWREEL_ITEMS } from '../data/showreelData';
import { andeanAudio } from '../utils/audioSynthesizer';

interface MobileCinematicDockProps {
  activeView?: 'dillinger' | 'reel' | 'full';
  onChangeView?: (view: 'dillinger' | 'reel' | 'full') => void;
  selectedChapterIndex?: number;
  onSelectChapter?: (index: number) => void;
  onOpenTrailer: () => void;
  onOpenDonate?: () => void;
  onScrollToTop?: () => void;
  onOpenChatbot?: () => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const MobileCinematicDock: React.FC<MobileCinematicDockProps> = ({
  activeView = 'dillinger',
  onChangeView,
  selectedChapterIndex = 0,
  onSelectChapter,
  onOpenTrailer,
  onOpenDonate,
  onScrollToTop,
  onOpenChatbot,
  onOpenSecurityModal,
}) => {
  const [isAudioActive, setIsAudioActive] = React.useState(false);

  const toggleSound = async () => {
    const active = await andeanAudio.toggle();
    setIsAudioActive(active);
  };

  return (
    <div
      id="mobile-cinematic-dock"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#18130e]/95 backdrop-blur-xl border-t border-[#413123] shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 px-2"
    >
      {/* Primary Sanctuary Action Bar (Thumb-Height 44px+) */}
      <div className="flex items-center justify-between gap-1.5 pt-1.5 px-1">

        {/* Quick Conecta Videollamada CTA */}
        {onOpenChatbot && (
          <button
            onClick={onOpenChatbot}
            className="px-2.5 py-1.5 rounded-xl bg-[#281d14] hover:bg-[#38281b] border border-amber-500/60 text-amber-300 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md shrink-0"
            title="Agendar Videollamada"
          >
            <Video className="w-3 h-3 text-amber-400" />
            <span>CONECTA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>
        )}

        {/* Quick Security & No-Risk Guarantee CTA */}
        {onOpenSecurityModal && (
          <button
            onClick={() => onOpenSecurityModal('guarantee')}
            className="px-2 py-1.5 rounded-xl bg-[#142319] hover:bg-[#1a3123] border border-emerald-500/60 text-emerald-300 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md shrink-0"
            title="Ver Compromiso de No Riesgo y SSL"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="hidden xs:inline">SEGURO</span>
          </button>
        )}

        {/* Quick Tráiler CTA */}
        <button
          onClick={onOpenTrailer}
          className="px-2.5 py-1.5 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] text-[#14100c] font-mono font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-md shrink-0"
        >
          <Play className="w-3 h-3 fill-[#14100c] text-[#14100c]" />
          <span>EXPLORAR</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-xl border transition-all shrink-0 ${
            isAudioActive
              ? 'border-[#c2853f] bg-[#c2853f]/20 text-[#e5aa5d]'
              : 'border-[#413123] bg-[#241c15] text-[#a89582]'
          }`}
          aria-label="Toggle Sound"
        >
          {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-[#e5aa5d]" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
