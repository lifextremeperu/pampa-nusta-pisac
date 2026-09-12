import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Leaf,
  Film,
  Play,
  ShieldCheck,
  Video,
  ChevronDown
} from 'lucide-react';
import { ThemeMode } from '../types';
import { andeanAudio } from '../utils/audioSynthesizer';

interface HeroProps {
  themeMode: ThemeMode;
  onExploreClick: () => void;
  onOpenTrailer: () => void;
  onSelectModule?: (moduleId: string) => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
  onOpenChatbot?: () => void;
  onScrollToVideoShowcase?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  themeMode,
  onExploreClick,
  onOpenTrailer,
  onSelectModule,
  onOpenSecurityModal,
  onOpenChatbot,
  onScrollToVideoShowcase,
}) => {
  const [heroViewMode, setHeroViewMode] = useState<'video' | 'poster'>('video');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [customCoverUrl, setCustomCoverUrl] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const unsub = andeanAudio.subscribe((playing) => {
      setIsAudioActive(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    andeanAudio.autoStart();
    const handleFirstGesture = () => {
      andeanAudio.autoStart();
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(e => 
        window.removeEventListener(e, handleFirstGesture)
      );
    };

    ['click', 'touchstart', 'scroll', 'keydown'].forEach(e => 
      window.addEventListener(e, handleFirstGesture, { once: true })
    );

    return () => {
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(e => 
        window.removeEventListener(e, handleFirstGesture)
      );
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pampa_nusta_cover_image');
      if (saved) setCustomCoverUrl(saved);
    } catch {}
  }, []);

  const effectivePosterUrl = customCoverUrl || '/Go1cn.jpg';

  const handleToggleAudio = async () => {
    await andeanAudio.toggle();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomCoverUrl(result);
        setImageLoadError(false);
        try {
          localStorage.setItem('pampa_nusta_cover_image', result);
        } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] min-h-[800px] flex flex-col justify-center overflow-hidden bg-stone-950">
      
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND MEDIA CON PARALLAX Y GLASSMORPHISM                */}
      {/* ------------------------------------------------------------- */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 overflow-hidden">
        {heroViewMode === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover brightness-[0.6] contrast-[1.2] transition-opacity duration-700"
            />
            {/* Soft Ambient Glow */}
            <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          </div>
        ) : (
          <div className="relative w-full h-full scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]">
            <img
              src={imageLoadError ? 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=85&w=1920&auto=format&fit=crop' : effectivePosterUrl}
              alt="Pampa Ñusta - El Origen"
              referrerPolicy="no-referrer"
              onError={() => setImageLoadError(true)}
              className="w-full h-full object-cover object-[50%_35%] brightness-[0.70] contrast-[1.1] transition-all duration-1000"
            />
          </div>
        )}

        {/* Cinematic Vignette & Bottom Fade to merge with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40 pointer-events-none" />
        <div className="absolute inset-0 cinema-vignette pointer-events-none opacity-80" />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* TOP STATUS BAR (Flotante)                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-24 left-0 right-0 z-20 px-4 sm:px-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs glass-panel rounded-2xl px-4 py-3"
        >
          <div className="flex items-center gap-3 text-[#d9cbba]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)] shrink-0" />
            <span className="font-mono text-[#e5aa5d] font-bold uppercase tracking-widest text-[10px] sm:text-xs">
              SANTUARIO VIVO · 3,347 MSNM
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono flex-wrap">
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300 ${
                isAudioActive
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-black/30 text-amber-300 border border-white/10 hover:bg-white/5'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAudioActive ? 'AUDIO NATURALEZA' : 'ACTIVAR AUDIO'}</span>
            </button>

            <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/5">
              <button
                onClick={() => setHeroViewMode('video')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${
                  heroViewMode === 'video' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Film className="w-3 h-3 inline mr-1.5" /> Video
              </button>
              <button
                onClick={() => setHeroViewMode('poster')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${
                  heroViewMode === 'poster' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Sparkles className="w-3 h-3 inline mr-1.5" /> Póster
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTER CINEMATIC CONTENT (Glassmorphism & Scroll-Telling)     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full glass-panel-dark rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle hover gradient effect inside the glass panel */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8a5e37]/30 bg-black/40 text-[#e5aa5d] text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>ECOALDEA VIVA · VALLE SAGRADO</span>
          </motion.div>

          {/* Main Title - Reveal Animation */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f7e4c6] to-[#c2853f] drop-shadow-lg leading-none py-2"
            >
              PAMPA ÑUSTA
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 font-mono text-xs sm:text-sm text-[#e5aa5d] tracking-[0.3em] uppercase font-semibold"
          >
            EL ORIGEN VIVO · LA TIERRA RECUERDA
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 max-w-2xl mx-auto text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light"
          >
            Santuario botánico y banco genético de Wachuma. Un ecosistema de bioconstrucción donde la tecnología ancestral andina se encuentra con el futuro sustentable.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 relative z-20"
          >
            <button
              onClick={onScrollToVideoShowcase}
              className="group relative px-6 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 text-black font-cinzel font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Play className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Explorar Documental</span>
            </button>

            {onOpenSecurityModal && (
              <button
                onClick={() => onOpenSecurityModal('guarantee')}
                className="px-6 sm:px-8 py-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-100 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all duration-300 backdrop-blur-md"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protocolos & Ayni</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onExploreClick}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase">Descubrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-amber-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};
