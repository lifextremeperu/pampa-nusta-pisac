import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SHOWREEL_ITEMS } from '../data/showreelData';
import { Volume2, VolumeX, Info, ChevronRight } from 'lucide-react';
import { TenOutOfTenDrawer } from './TenOutOfTenDrawer';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface TenOutOfTenShowreelProps {
  onOpenTrailerModal: () => void;
  onExploreFullDocumentary: () => void;
  onOpenDillingerSelector?: () => void;
}

export const TenOutOfTenShowreel: React.FC<TenOutOfTenShowreelProps> = ({
  onOpenTrailerModal,
  onExploreFullDocumentary,
  onOpenDillingerSelector,
}) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'video' | 'photo'>('video');
  const [userPhotos, setUserPhotos] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion Scroll Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Convert scroll progress (0 to 1) into horizontal translation
  // If there are 5 items, we want to slide by -80% (4/5) to show the last one
  const itemsCount = SHOWREEL_ITEMS.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * ((itemsCount - 1) / itemsCount)}%`]);

  // Update active item based on scroll progress to change metadata/labels
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Calculate which item is currently in view
      const segment = 1 / itemsCount;
      let currentIndex = Math.floor(latest / segment);
      if (currentIndex >= itemsCount) currentIndex = itemsCount - 1;
      
      if (currentIndex !== activeItemIndex) {
        setActiveItemIndex(currentIndex);
      }
    });
  }, [scrollYProgress, activeItemIndex, itemsCount]);

  // Load custom photos from localStorage
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
        const currentId = SHOWREEL_ITEMS[activeItemIndex].id;
        const updated = { ...userPhotos, [currentId]: dataUrl };
        setUserPhotos(updated);
        try {
          localStorage.setItem('pampa_nusta_user_photos', JSON.stringify(updated));
        } catch (err) {}
        setViewMode('photo');
      }
    };
    reader.readAsDataURL(file);
  };

  const currentItem = SHOWREEL_ITEMS[activeItemIndex] || SHOWREEL_ITEMS[0];

  return (
    // The section is artificially tall (e.g., 500vh for 5 items) to force scrolling
    <section 
      ref={containerRef} 
      id="showreel"
      className="relative w-full bg-black font-mono"
      style={{ height: `${itemsCount * 100}vh` }}
    >
      {/* Sticky container that stays on screen while scrolling */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Horizontal Sliding Track */}
        <motion.div 
          className="flex h-full will-change-transform"
          style={{ 
            width: `${itemsCount * 100}%`,
            x 
          }}
        >
          {SHOWREEL_ITEMS.map((item, idx) => {
            const currentPhoto = userPhotos[item.id] || item.photoSrc;
            const isActive = idx === activeItemIndex;
            
            return (
              <div key={item.id} className="relative w-full h-full flex-shrink-0">
                {/* Media Layer */}
                {viewMode === 'video' ? (
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                  />
                ) : (
                  <img
                    src={currentPhoto}
                    alt={item.title}
                    className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                  />
                )}
                {/* Ambient Film Grain and Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute inset-0 cinema-vignette pointer-events-none" />
              </div>
            );
          })}
        </motion.div>

        {/* --- GLOBAL OVERLAYS (These stay static over the sliding track) --- */}

        {/* TOP PROGRESS BAR (Scroll-driven) */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10 z-30">
          <motion.div 
            className="h-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: "left" 
            }}
          />
        </div>

        {/* BRAND LOGO */}
        <div className="absolute top-6 sm:top-8 right-5 sm:right-10 z-30 flex flex-col items-end gap-1 mix-blend-exclusion">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-white">
              PAMPA ÑUSTA
            </span>
            <span className="text-amber-300 text-xs">·</span>
            <span className="text-[10px] text-white/80 font-bold">10/10</span>
          </div>
          <span className="text-[8px] tracking-widest text-white/70 uppercase">
            SCROLL-TELLING HORIZONTAL
          </span>
        </div>

        {/* TOP-LEFT CONTROLS */}
        <div className="absolute top-6 sm:top-8 left-5 sm:left-10 z-30 flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] sm:text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isSoundOn ? <><Volume2 className="w-3 h-3 text-amber-400" /><span>/ SOUND ON</span></> : <><VolumeX className="w-3 h-3 text-stone-400" /><span>/ SOUND OFF</span></>}
          </button>

          <div className="hidden sm:flex items-center bg-black/50 backdrop-blur-md rounded-full border border-white/20 p-0.5">
            <button
              onClick={() => setViewMode('video')}
              className={`px-2 py-1 rounded-full text-[9px] uppercase tracking-widest transition-all cursor-pointer ${viewMode === 'video' ? 'bg-amber-400 text-black font-bold shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-stone-300 hover:text-white'}`}
            >
              / VIDEO
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`px-2 py-1 rounded-full text-[9px] uppercase tracking-widest transition-all cursor-pointer ${viewMode === 'photo' ? 'bg-amber-400 text-black font-bold shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-stone-300 hover:text-white'}`}
            >
              / FOTO
            </button>
          </div>
        </div>

        {/* BOTTOM CONTENT OVERLAYS (Dynamic based on active item) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeItemIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 sm:bottom-12 left-5 sm:left-10 z-30 max-w-xl pointer-events-none"
          >
            <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-amber-400 uppercase tracking-widest mb-1.5">
              <span>/ CAPÍTULO {currentItem.indexNumber}</span>
              <span className="text-white/40">·</span>
              <span>{currentItem.category}</span>
            </div>
            
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-widest text-white leading-tight mb-2 text-shadow drop-shadow-2xl">
              {currentItem.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-200 font-sans font-light leading-relaxed mb-4 max-w-md drop-shadow-md">
              {currentItem.logline}
            </p>
            
            <div className="pointer-events-auto flex items-center gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
              >
                <Info className="w-4 h-4" />
                <span>DESCUBRIR CAPÍTULO</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT SIDE NAVIGATION TICK MARKS */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2 mix-blend-exclusion pointer-events-none">
          <span className="font-mono text-[9px] text-amber-400 tracking-widest font-bold">
            0{activeItemIndex + 1}
          </span>
          <div className="flex flex-col gap-1.5 py-1">
            {SHOWREEL_ITEMS.map((_, idx) => (
              <div
                key={idx}
                className={`w-1 rounded-full transition-all duration-300 ${
                  idx === activeItemIndex ? 'h-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]' : 'h-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-white/50 tracking-tighter">
            0{itemsCount}
          </span>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-70 pointer-events-none">
          <span className="text-[8px] font-mono tracking-widest text-white uppercase">SCROLL HORIZONTAL</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-gradient-to-b from-white to-transparent"
          />
        </div>

      </div>

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
