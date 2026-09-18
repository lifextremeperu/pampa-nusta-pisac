import React, { useState, useEffect, useRef } from 'react';
import { SHOWREEL_ITEMS, ShowreelItem } from '../data/showreelData';
import { Volume2, VolumeX, Play, Pause, Info, ChevronLeft, ChevronRight, Eye, Leaf, Compass, Sparkles, Upload, Maximize2 } from 'lucide-react';
import { TenOutOfTenDrawer } from './TenOutOfTenDrawer';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface TenOutOfTenShowreelProps {
  onOpenTrailerModal: () => void;
  onExploreFullDocumentary: () => void;
  onOpenDillingerSelector?: () => void;
  externalSlideIndex?: number;
}

export const TenOutOfTenShowreel: React.FC<TenOutOfTenShowreelProps> = ({
  onOpenTrailerModal,
  onExploreFullDocumentary,
  onOpenDillingerSelector,
  externalSlideIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(externalSlideIndex ?? 0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync external index if provided
  useEffect(() => {
    if (typeof externalSlideIndex === 'number') {
      setActiveIndex(externalSlideIndex);
      setSlideProgress(0);
      setCurrentTimeSec(0);
    }
  }, [externalSlideIndex]);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'video' | 'photo'>('video');
  const [slideProgress, setSlideProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [userPhotos, setUserPhotos] = useState<Record<string, string>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTimerRef = useRef<number | null>(null);

  const currentItem = SHOWREEL_ITEMS[activeIndex];

  // Touch gestures for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Load custom photos from localStorage if previously stored
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pampa_nusta_user_photos');
      if (stored) {
        setUserPhotos(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  }, []);

  // Slide timer & progress tracking
  useEffect(() => {
    if (!isPlaying || isDrawerOpen) return;

    const duration = currentItem.durationSeconds || 14;
    const intervalMs = 100;
    const stepIncrement = (intervalMs / (duration * 1000)) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide
          setActiveIndex((idx) => (idx + 1) % SHOWREEL_ITEMS.length);
          return 0;
        }
        return prev + stepIncrement;
      });

      setCurrentTimeSec((prev) => {
        const next = prev + intervalMs / 1000;
        return next >= duration ? 0 : next;
      });
    }, intervalMs);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [activeIndex, isPlaying, isDrawerOpen, currentItem.durationSeconds]);

  // Reset progress on manual slide change
  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
    setSlideProgress(0);
    setCurrentTimeSec(0);
  };

  const handleNext = () => {
    handleSelectSlide((activeIndex + 1) % SHOWREEL_ITEMS.length);
  };

  const handlePrev = () => {
    handleSelectSlide((activeIndex - 1 + SHOWREEL_ITEMS.length) % SHOWREEL_ITEMS.length);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleSound = () => {
    setIsSoundOn((prev) => {
      const next = !prev;
      if (next) {
        audioSynthesizer.playFluteNote(432, 2.5);
        audioSynthesizer.startDrone();
      } else {
        audioSynthesizer.stopDrone();
      }
      return next;
    });
  };

  const handleUploadPhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updated = { ...userPhotos, [currentItem.id]: dataUrl };
        setUserPhotos(updated);
        try {
          localStorage.setItem('pampa_nusta_user_photos', JSON.stringify(updated));
        } catch (err) {
          console.warn('Could not save photo to storage:', err);
        }
        setViewMode('photo');
      }
    };
    reader.readAsDataURL(file);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.key === 'Escape' && isDrawerOpen) setIsDrawerOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isDrawerOpen]);

  const currentPhoto = userPhotos[currentItem.id] || currentItem.photoSrc;

  return (
    <section
      id="showreel"
      aria-label="Pampa Ñusta 10 out of 10 Cinematic Reel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[94vh] sm:h-screen min-h-[640px] bg-black overflow-hidden select-none font-mono"
    >
      {/* BACKGROUND FULL-BLEED MEDIA LAYER */}
      <div className="absolute inset-0 w-full h-full">
        {viewMode === 'video' ? (
          <video
            ref={videoRef}
            key={currentItem.videoSrc}
            src={currentItem.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
          />
        ) : (
          <img
            key={currentPhoto}
            src={currentPhoto}
            alt={currentItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out animate-fade-in animate-ken-burns"
          />
        )}

        {/* Ambient Film Grain and Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 cinema-vignette pointer-events-none" />
      </div>

      {/* TOP SEGMENTED PROGRESS BARS (Signature 10outof10.tv `ll-bar`) */}
      <nav aria-label="Progreso de capítulos del showreel" className="absolute top-0 left-0 w-full z-30 px-3 sm:px-6 pt-3 sm:pt-4 flex gap-1.5 sm:gap-2">
        {SHOWREEL_ITEMS.map((item, idx) => {
          let fillPercent = 0;
          if (idx < activeIndex) fillPercent = 100;
          else if (idx === activeIndex) fillPercent = slideProgress;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectSlide(idx)}
              title={`${item.indexNumber} / ${item.navTitle}`}
              className="flex-1 h-[4px] sm:h-[6px] bg-white/20 hover:bg-white/40 rounded-full overflow-hidden transition-all duration-200 cursor-pointer relative group"
            >
              <div
                className="h-full bg-amber-400 group-hover:bg-amber-300 rounded-full transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                style={{ width: `${fillPercent}%` }}
              />
            </button>
          );
        })}
      </nav>

      {/* FIXED FLOATING BRAND LOGO (`mix-blend-exclusion` like 10/10) */}
      <div className="absolute top-7 sm:top-9 right-5 sm:right-10 z-30 flex items-center gap-3 mix-blend-exclusion pointer-events-auto">
        <button
          onClick={onExploreFullDocumentary}
          data-cursor="HISTORIA"
          className="text-right cursor-pointer group"
        >
          <div className="flex items-center gap-1.5 justify-end">
            <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-white">
              PAMPA ÑUSTA
            </span>
            <span className="text-amber-300 text-xs">·</span>
            <span className="text-[10px] sm:text-xs text-white/80 font-bold">10/10</span>
          </div>
          <span className="block text-[9px] tracking-widest text-white/70 uppercase">
            Pisac · Ecoaldea & Cine
          </span>
        </button>
      </div>

      {/* TOP-LEFT CONTROLS: Sound & Media Switcher */}
      <div className="absolute top-7 sm:top-9 left-5 sm:left-10 z-30 flex items-center gap-3">
        {/* Sound Toggle (10/10 signature `/ sound on`) */}
        <button
          onClick={toggleSound}
          data-cursor="SONIDO"
          className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer hover:border-amber-400"
        >
          {isSoundOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>/ SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span>/ SOUND OFF</span>
            </>
          )}
        </button>

        {/* View mode toggle: Real Photo vs Cinematic Reel Video */}
        <div className="hidden sm:flex items-center bg-black/50 backdrop-blur-md rounded-full border border-white/20 p-0.5">
          <button
            onClick={() => setViewMode('video')}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === 'video'
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            / VIDEO
          </button>
          <button
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            / FOTO REAL
          </button>
        </div>

        {/* Dillinger Selector Mode Link */}
        {onOpenDillingerSelector && (
          <button
            onClick={onOpenDillingerSelector}
            data-cursor="DILLINGER"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-stone-200 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all cursor-pointer hover:border-amber-400 hover:text-amber-300"
          >
            <span>/ SANTUARIO VIVO</span>
          </button>
        )}
      </div>

      {/* FLOATING 10/10 MENU NAVIGATION (`ll-menu--primary`) */}
      <div className="absolute z-30 left-4 sm:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2.5 text-left mix-blend-exclusion">
        {SHOWREEL_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectSlide(idx)}
              data-cursor="VER"
              className={`group flex items-center gap-3 text-xs tracking-wider transition-all cursor-pointer text-left py-1 ${
                isActive ? 'text-white font-bold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span className="font-mono text-[10px] text-amber-400">
                {item.indexNumber} /
              </span>
              <span className="uppercase text-[11px] font-sans font-medium tracking-widest relative">
                {item.navTitle}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* RIGHT-SIDE DURATION & CHAPTER TICK MARKS */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 mix-blend-exclusion">
        <span className="font-mono text-[10px] text-white/70 tracking-widest">
          / 00:{String(Math.floor(currentTimeSec)).padStart(2, '0')}
        </span>

        <div className="flex flex-col gap-1.5 py-2">
          {SHOWREEL_ITEMS.map((_, idx) => (
            <div
              key={idx}
              className={`w-1 transition-all rounded-full ${
                idx === activeIndex
                  ? 'h-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]'
                  : 'h-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>

        <span className="font-mono text-[9px] text-white/50 tracking-tighter">
          0{SHOWREEL_ITEMS.length}
        </span>
      </div>

      {/* BOTTOM-LEFT OVERLAYS: Module Title & Info (Natural Reserve format) */}
      <div className="absolute bottom-24 sm:bottom-10 left-4 sm:left-10 z-30 max-w-lg mix-blend-exclusion pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#e5aa5d] uppercase tracking-widest mb-0.5">
          <span>/ CAPÍTULO {currentItem.indexNumber}</span>
          <span className="text-white/40">·</span>
          <span>{currentItem.category}</span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span className="text-stone-300 hidden sm:inline">{currentItem.altitude}</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white leading-tight mb-1 text-shadow">
          {currentItem.title}
        </h2>

        <p className="text-xs sm:text-sm text-[#f5eee6] font-sans line-clamp-1 max-w-md font-light leading-relaxed mb-2">
          {currentItem.logline}
        </p>
      </div>

      {/* BOTTOM-RIGHT METADATA & CONTROLS */}
      <div className="absolute bottom-24 sm:bottom-10 right-4 sm:right-10 z-30 flex flex-col items-end gap-2.5">
        {/* Right Reserve Label */}
        <div className="text-right hidden sm:block mix-blend-exclusion font-mono text-[10px] uppercase text-white/80 tracking-widest">
          <div>/ RESERVA NATURAL & SANTUARIO</div>
          <div className="text-[#e5aa5d]">Pisac · 3,347 MSNM</div>
        </div>

        {/* Action Buttons: Pause/Play, More Info */}
        <div className="flex items-center gap-2">
          {/* Pause / Play */}
          <button
            onClick={togglePlayPause}
            data-cursor={isPlaying ? 'PAUSA' : 'PLAY'}
            className="px-3 py-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            aria-label="Toggle Play/Pause"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">/ PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">/ PLAY</span>
              </>
            )}
          </button>

          {/* Prev / Next */}
          <div className="flex items-center bg-black/70 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
            <button
              onClick={handlePrev}
              title="Capítulo Anterior"
              className="px-2.5 py-2 hover:bg-white/10 text-white transition-colors cursor-pointer active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              title="Siguiente Capítulo"
              className="px-2.5 py-2 hover:bg-white/10 text-white transition-colors cursor-pointer active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* More Info Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            data-cursor="DETALLES"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Info className="w-3.5 h-3.5" />
            <span>/ FICHA</span>
          </button>
        </div>
      </div>

      {/* QUICK FLOATING DOCUMENTARY SCROLL PILL */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={onExploreFullDocumentary}
          className="text-[10px] font-mono text-stone-400 hover:text-amber-300 uppercase tracking-widest flex items-center gap-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 transition-all cursor-pointer"
        >
          <span>SCROLL PARA EXPLORAR LA HISTORIA COMPLETA</span>
          <span className="animate-bounce">↓</span>
        </button>
      </div>

      {/* SLIDING 10/10 CREDITS & MORE INFO DRAWER */}
      <TenOutOfTenDrawer
        item={currentItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onBookExperience={() => {
          setIsDrawerOpen(false);
          onOpenTrailerModal();
        }}
        customPhotoUrl={userPhotos[currentItem.id]}
        onUploadPhoto={handleUploadPhoto}
      />
    </section>
  );
};
