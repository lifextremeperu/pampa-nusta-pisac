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
      {/* 1-Tap Chapter Rail for Thumbs (Scrollable Horizontal) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 px-1">
        <span className="text-[9px] font-mono uppercase tracking-wider text-[#e5aa5d] font-bold shrink-0">
          CAPÍTULOS:
        </span>
        {SHOWREEL_ITEMS.map((item, idx) => {
          const isCurrent = idx === selectedChapterIndex;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectChapter(idx);
                // Subtle audio feedback
                andeanAudio.playFluteNote?.(360 + idx * 30, 0.2);
              }}
              className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                isCurrent
                  ? 'bg-[#c2853f] text-[#14100c] font-bold shadow-[0_0_10px_rgba(194,133,63,0.5)] scale-105'
                  : 'bg-[#251d16] text-[#b8a695] border border-[#443324]'
              }`}
            >
              <span>{item.indexNumber}</span>
              <span className="max-w-[85px] truncate">{item.navTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Sanctuary Action Bar (Thumb-Height 44px+) */}
      <div className="flex items-center justify-between gap-1.5 pt-1.5 px-1 border-t border-[#31241a]">
        {/* Experience Mode Toggles */}
        <div className="flex items-center bg-[#241c15] rounded-xl p-0.5 border border-[#433123]">
          <button
            onClick={() => {
              onChangeView('dillinger');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
              activeView === 'dillinger'
                ? 'bg-[#c2853f] text-[#14100c] font-bold'
                : 'text-[#a89582] hover:text-white'
            }`}
          >
            / SANTUARIO
          </button>
          <button
            onClick={() => {
              onChangeView('reel');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all ${
              activeView === 'reel'
                ? 'bg-[#c2853f] text-[#14100c] font-bold'
                : 'text-[#a89582] hover:text-white'
            }`}
          >
            / SHOWREEL 360
          </button>
        </div>

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
