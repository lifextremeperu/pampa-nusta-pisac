import React, { useState, useRef, useEffect } from 'react';
import { SHOWREEL_ITEMS, ShowreelItem } from '../data/showreelData';
import {
  ArrowLeft,
  Play,
  Pause,
  Sparkles,
  MapPin,
  Leaf,
  ChevronRight,
  ChevronLeft,
  Eye,
  Volume2,
  VolumeX,
  Maximize2,
  Compass
} from 'lucide-react';
import { andeanAudio } from '../utils/audioSynthesizer';

interface DillingerContentSelectorProps {
  externalIndex?: number;
  onSelectForShowreel: (index: number) => void;
  onOpenTrailerModal: () => void;
  onOpenExperienceModal: (item: ShowreelItem) => void;
}

export const DillingerContentSelector: React.FC<DillingerContentSelectorProps> = ({
  externalIndex = 0,
  onSelectForShowreel,
  onOpenTrailerModal,
  onOpenExperienceModal,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(externalIndex);
  const [selectedItem, setSelectedItem] = useState<ShowreelItem | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(true);
  const [previewMediaType, setPreviewMediaType] = useState<'video' | 'photo'>('video');
  const [isMuted, setIsMuted] = useState(true);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const activeItem = selectedItem || SHOWREEL_ITEMS[hoveredIndex] || SHOWREEL_ITEMS[0];

  // Sync with externalIndex if changed
  useEffect(() => {
    if (externalIndex >= 0 && externalIndex < SHOWREEL_ITEMS.length) {
      setHoveredIndex(externalIndex);
      if (selectedItem) {
        setSelectedItem(SHOWREEL_ITEMS[externalIndex]);
      }
    }
  }, [externalIndex]);

  const handleHoverItem = (idx: number) => {
    if (hoveredIndex !== idx) {
      setHoveredIndex(idx);
      andeanAudio.playFluteNote?.(320 + idx * 40, 0.25);
    }
  };

  const handleSelectItem = (item: ShowreelItem) => {
    setSelectedItem(item);
    setIsPlayingPreview(true);
    andeanAudio.playFluteNote?.(432, 0.8);
  };

  const handleBackToDirectory = () => {
    setSelectedItem(null);
  };

  const togglePreviewPlay = () => {
    setIsPlayingPreview((prev) => {
      if (previewVideoRef.current) {
        if (prev) previewVideoRef.current.pause();
        else previewVideoRef.current.play();
      }
      return !prev;
    });
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Next
      const nextIdx = (hoveredIndex + 1) % SHOWREEL_ITEMS.length;
      handleHoverItem(nextIdx);
      if (selectedItem) setSelectedItem(SHOWREEL_ITEMS[nextIdx]);
    } else if (isRightSwipe) {
      // Prev
      const prevIdx = (hoveredIndex - 1 + SHOWREEL_ITEMS.length) % SHOWREEL_ITEMS.length;
      handleHoverItem(prevIdx);
      if (selectedItem) setSelectedItem(SHOWREEL_ITEMS[prevIdx]);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="dillinger-selector"
      aria-label="Selector Kinético de Contenidos Dillinger"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#060505] text-stone-100 overflow-hidden flex flex-col justify-between select-none py-6 sm:py-12 px-3 sm:px-10 lg:px-16"
    >
      {/* FULL-SCREEN AMBIENT BACKGROUND WITH DILLINGER CROSSFADE */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div
          key={activeItem.id}
          className="absolute inset-0 w-full h-full transition-all duration-700 ease-out transform scale-105"
        >
          {previewMediaType === 'video' ? (
            <video
              src={activeItem.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 filter blur-[1px] contrast-125 brightness-75"
            />
          ) : (
            <img
              src={activeItem.photoSrc}
              alt={activeItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 filter blur-[1px] contrast-125 brightness-75"
            />
          )}
        </div>

        {/* 2.39:1 Cinema Vignette & Film Grain */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/95" />
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      </div>

      {/* TOP NATURAL RESERVE BANNER */}
      <div className="relative z-20 flex items-center justify-between border-b border-[#3d2c1e] pb-3 sm:pb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#e5aa5d] font-bold flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#d8974a]" />
            <span>RESERVA NATURAL PAMPA ÑUSTA</span>
          </span>
          <span className="text-[#5a402d] hidden sm:inline">|</span>
          <span className="text-[#a89582] font-mono text-[10px] sm:text-xs uppercase tracking-widest hidden sm:inline">
            SANTUARIO ECOLÓGICO · PISAC 3,347M
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {selectedItem && (
            <button
              onClick={handleBackToDirectory}
              data-cursor="VOLVER"
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#241c14] border border-[#523c2a] hover:border-[#c2853f] text-[#d9cbba] hover:text-[#f5eee6] font-mono text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>/ VOLVER</span>
            </button>
          )}

          {/* Media Switcher: Video vs Foto Real */}
          <div className="flex items-center bg-[#201811] rounded-full border border-[#433122] p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setPreviewMediaType('video')}
              className={`px-2.5 py-1 rounded-full uppercase transition-all cursor-pointer ${
                previewMediaType === 'video'
                  ? 'bg-[#c2853f] text-[#14100c] font-bold shadow-[0_0_8px_rgba(194,133,63,0.5)]'
                  : 'text-[#a89582] hover:text-[#f5eee6]'
              }`}
            >
              VIDEO
            </button>
            <button
              onClick={() => setPreviewMediaType('photo')}
              className={`px-2.5 py-1 rounded-full uppercase transition-all cursor-pointer ${
                previewMediaType === 'photo'
                  ? 'bg-[#c2853f] text-[#14100c] font-bold shadow-[0_0_8px_rgba(194,133,63,0.5)]'
                  : 'text-[#a89582] hover:text-[#f5eee6]'
              }`}
            >
              FOTO REAL
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE QUICK SWIPE / CHAPTER SCROLLER (Visible on mobile for effortless navigation) */}
      <div className="relative z-20 md:hidden pt-3 pb-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1.5 px-1">
          <span className="text-amber-400 font-bold uppercase tracking-widest">
            / DESLIZA O TOCA UN CAPÍTULO:
          </span>
          <span>{hoveredIndex + 1} / {SHOWREEL_ITEMS.length}</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SHOWREEL_ITEMS.map((item, idx) => {
            const isSelected = idx === hoveredIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleHoverItem(idx);
                  handleSelectItem(item);
                }}
                className={`px-3 py-2 rounded-xl text-left whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'border-amber-400 bg-stone-900 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'border-stone-800 bg-stone-950/80 text-stone-400'
                }`}
              >
                <div className="font-mono text-[9px] text-amber-400">{item.indexNumber} /</div>
                <div className="font-bebas text-sm uppercase tracking-wide">{item.navTitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN INTERACTIVE KINETIC AREA */}
      <div className="relative z-20 my-auto py-4 sm:py-8">
        {!selectedItem ? (
          /* DIRECTORY LIST WITH KINETIC TYPOGRAPHY TRANSITIONS */
          <div className="flex flex-col gap-2.5 sm:gap-4 max-w-5xl">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#9c8976] mb-1">
              / SELECCIONA UN CAPÍTULO DEL SANTUARIO:
            </div>

            {SHOWREEL_ITEMS.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleHoverItem(idx)}
                  onClick={() => handleSelectItem(item)}
                  data-cursor={`VER ${item.indexNumber}`}
                  className={`group flex items-center gap-3 sm:gap-6 cursor-pointer transition-all duration-400 py-1.5 sm:py-2.5 px-2 rounded-xl ${
                    isHovered
                      ? 'translate-x-2 sm:translate-x-5 bg-[#201811]/90 border border-[#523d2b]'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* Number Tag */}
                  <span
                    className={`font-mono text-xs sm:text-2xl font-bold tracking-tighter transition-colors duration-300 ${
                      isHovered ? 'text-[#e5aa5d]' : 'text-[#735d49]'
                    }`}
                  >
                    {item.indexNumber} /
                  </span>

                  {/* Kinetic Headline with Natural Reserve Typography */}
                  <div className="flex flex-col min-w-0">
                    <h3
                      className={`font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide transition-all duration-300 truncate ${
                        isHovered
                          ? 'text-[#fbf6f0] tracking-[0.03em] drop-shadow-[0_0_24px_rgba(229,170,93,0.4)]'
                          : 'text-[#ab9784]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div
                      className={`flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-xs uppercase tracking-widest transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 text-[#e5aa5d]' : 'opacity-0 text-[#8c7764]'
                      }`}
                    >
                      <span>{item.category}</span>
                      <span>·</span>
                      <span>{item.altitude}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline">ECOSISTEMA VIVO</span>
                    </div>
                  </div>

                  {/* Open chapter pill */}
                  <div
                    className={`ml-auto flex items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#e5aa5d] border border-[#8a5d35]/40 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-300 shrink-0 ${
                      isHovered ? 'opacity-100 scale-100 bg-[#342418]' : 'opacity-0 sm:opacity-30 scale-90'
                    }`}
                  >
                    <span>ABRIR</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d8974a]" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* DILLINGER SELECTION TRANSITION: Split Screen with Realisations Panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center animate-fade-in">
            {/* Left Column: Natural Reserve Metadata & Razor-Sharp Logline */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Sanctuary Header Tag */}
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#e5aa5d] mb-1 sm:mb-2">
                <span>/ CAPÍTULO {selectedItem.indexNumber}</span>
                <span className="text-[#5a402d]">·</span>
                <span>{selectedItem.category}</span>
                <span className="text-[#5a402d]">·</span>
                <span className="text-[#a89582]">{selectedItem.altitude}</span>
              </div>

              {/* Display Sanctuary Title */}
              <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#fcf7f1] leading-tight mb-2 sm:mb-3">
                {selectedItem.title}
              </h2>

              {/* Single-line punchy logline */}
              <p className="text-[#dfd3c5] text-xs sm:text-sm md:text-base font-light font-sans leading-relaxed mb-4">
                {selectedItem.logline}
              </p>

              {/* Sanctuary Technical Billing Block */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#1e1711] border border-[#4a3626] text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a89582] mb-5 space-y-1.5">
                <div className="flex items-center justify-between border-b border-[#3b2c20] pb-1">
                  <span className="text-[#7a6452]">CONSERVACIÓN:</span>
                  <span className="text-[#f5eee6] font-bold">BANCO BIOCULTURAL · PISAC 3,347M</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#3b2c20] pb-1">
                  <span className="text-[#7a6452]">LOCACIÓN:</span>
                  <span className="text-[#f5eee6] font-bold">{selectedItem.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7a6452]">SANTUARIO:</span>
                  <span className="text-[#e5aa5d] font-bold">PAMPA ÑUSTA · RESERVA NATURAL PISAC</span>
                </div>
              </div>

              {/* Action Buttons: 100% Touch-Friendly (Min 44px height) */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => {
                    const idx = SHOWREEL_ITEMS.findIndex((i) => i.id === selectedItem.id);
                    onSelectForShowreel(idx !== -1 ? idx : 0);
                  }}
                  data-cursor="REEL 10/10"
                  className="py-3 px-5 sm:px-6 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] text-[#14100c] font-cinzel font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(194,133,63,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>/ SHOWREEL 360 COMPLETO</span>
                </button>

                <button
                  onClick={() => onOpenExperienceModal(selectedItem)}
                  data-cursor="RESERVAR"
                  className="py-3 px-4 sm:px-5 rounded-xl border border-[#5a402d] bg-[#221a13] text-[#f5eee6] hover:text-[#e5aa5d] font-cinzel text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#d8974a]" />
                  <span>/ RESERVAR ESTANCIA</span>
                </button>
              </div>
            </div>

            {/* Right Column: Realisations Player Panel (16:9 / 2.39:1) */}
            <div className="lg:col-span-6 dillinger-panel-active">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-2xl group">
                {previewMediaType === 'video' ? (
                  <video
                    ref={previewVideoRef}
                    key={selectedItem.videoSrc}
                    src={selectedItem.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    key={selectedItem.photoSrc}
                    src={selectedItem.photoSrc}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Overlaid Cinema Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] text-amber-300 uppercase px-2 py-1 rounded bg-black/70 border border-stone-700">
                      TC 00:{selectedItem.durationSeconds}:00 · {selectedItem.indexNumber}
                    </span>

                    <button
                      onClick={() => setIsMuted((prev) => !prev)}
                      className="p-2 rounded-full bg-black/70 text-white hover:text-amber-400 transition-colors cursor-pointer"
                      aria-label="Toggle Audio"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={togglePreviewPlay}
                      className="p-2.5 rounded-full bg-amber-400 text-stone-950 font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      aria-label="Play/Pause"
                    >
                      {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-950" />}
                    </button>

                    <button
                      onClick={() => {
                        const idx = SHOWREEL_ITEMS.findIndex((i) => i.id === selectedItem.id);
                        onSelectForShowreel(idx !== -1 ? idx : 0);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-white font-mono text-[10px] uppercase tracking-wider hover:text-amber-300 cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>EXPANDIR</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Prev / Next Mobile Switchers */}
              <div className="flex items-center justify-between mt-3 font-mono text-[10px] text-stone-400">
                <button
                  onClick={() => {
                    const currentIdx = SHOWREEL_ITEMS.findIndex((i) => i.id === selectedItem.id);
                    const prevIdx = (currentIdx - 1 + SHOWREEL_ITEMS.length) % SHOWREEL_ITEMS.length;
                    setSelectedItem(SHOWREEL_ITEMS[prevIdx]);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-400 text-stone-300 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>ANTERIOR</span>
                </button>

                <span className="uppercase text-amber-400 font-bold">
                  {selectedItem.indexNumber} / 05
                </span>

                <button
                  onClick={() => {
                    const currentIdx = SHOWREEL_ITEMS.findIndex((i) => i.id === selectedItem.id);
                    const nextIdx = (currentIdx + 1) % SHOWREEL_ITEMS.length;
                    setSelectedItem(SHOWREEL_ITEMS[nextIdx]);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-400 text-stone-300 cursor-pointer"
                >
                  <span>SIGUIENTE</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM FOOTNOTE (Dillinger Index Ticker) */}
      <div className="relative z-20 border-t border-stone-800/80 pt-3 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest">
        <div>
          <span>/ SELECCIÓN: </span>
          <span className="text-amber-400 font-bold">
            {activeItem.indexNumber} {activeItem.navTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTrailerModal}
            data-cursor="TRÁILER"
            className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>TRÁILER OFICIAL</span>
          </button>
        </div>
      </div>
    </section>
  );
};
