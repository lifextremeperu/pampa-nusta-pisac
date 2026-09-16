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
import { useTranslation } from 'react-i18next';
import { ThemeMode } from '../types';
import { andeanAudio } from '../utils/audioSynthesizer';
import { AtmosphericParticles } from './AtmosphericParticles';
import { InterdimensionalScene } from './Experience3D/Scene';
import { useMotionValueEvent } from 'motion/react';

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
  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProg, setScrollProg] = useState(0);

  // Parallax effect for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProg(latest);
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
    <section ref={containerRef} className="relative w-full h-[100svh] min-h-[800px] flex flex-col justify-center overflow-hidden bg-sadhana-bg">
      
      {/* ------------------------------------------------------------- */}
      {/* NATGEO BORDER OVERLAY                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-50 natgeo-border mix-blend-overlay opacity-80" />
      
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
              className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] transition-opacity duration-700"
            />
            {/* Soft Ambient Glow */}
            <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <AtmosphericParticles />
          </div>
        ) : (
          <div className="relative w-full h-full ken-burns">
            <img
              src={imageLoadError ? 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=85&w=1920&auto=format&fit=crop' : effectivePosterUrl}
              alt="Pampa Ñusta - El Origen"
              referrerPolicy="no-referrer"
              onError={() => setImageLoadError(true)}
              className="w-full h-full object-cover object-[50%_35%] brightness-[0.70] contrast-[1.1] transition-all duration-1000"
            />
            <AtmosphericParticles />
          </div>
        )}

        {/* 3D Interdimensional Astronaut Scene */}
        <InterdimensionalScene scrollProgress={scrollProg} />

        {/* Camera Reticle Crosshairs (Documentary Lens Effect) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/30" />
          <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/30" />
          <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/30" />
          <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/20 rounded-full" />
        </div>

        {/* Cinematic Vignette & Bottom Fade to merge with next section (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-sadhana-bg via-transparent to-sadhana-bg/40 pointer-events-none" />
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
                  ? 'bg-sadhana-primary/20 text-sadhana-dark border border-sadhana-primary/50 shadow-[0_0_20px_rgba(0,174,66,0.2)]'
                  : 'bg-white/60 text-sadhana-brown border border-sadhana-dark/20 hover:bg-white/80'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-sadhana-dark" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAudioActive ? t('hero.audioOn') : t('hero.audioOff')}</span>
            </button>

            <div className="flex items-center bg-white/60 rounded-xl p-1 border border-sadhana-dark/10">
              <button
                onClick={() => setHeroViewMode('video')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${
                  heroViewMode === 'video' ? 'bg-sadhana-primary/20 text-sadhana-dark shadow-sm' : 'text-sadhana-brown/50 hover:text-sadhana-brown/80'
                }`}
              >
                <Film className="w-3 h-3 inline mr-1.5" /> {t('hero.video')}
              </button>
              <button
                onClick={() => setHeroViewMode('poster')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${
                  heroViewMode === 'poster' ? 'bg-sadhana-primary/20 text-sadhana-dark shadow-sm' : 'text-sadhana-brown/50 hover:text-sadhana-brown/80'
                }`}
              >
                <Sparkles className="w-3 h-3 inline mr-1.5" /> {t('hero.poster')}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-dark/20 bg-sadhana-sand/40 text-sadhana-dark text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            <Leaf className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          {/* Main Title - Reveal Animation */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-widest text-sadhana-dark drop-shadow-md leading-none py-2"
            >
              {t('hero.title')}
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 font-sans text-xs sm:text-sm text-sadhana-orange tracking-[0.3em] uppercase font-bold"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Ocultamos el párrafo largo para mantener la carga cognitiva al mínimo */}
          {/* 
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 max-w-2xl mx-auto text-sadhana-brown/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-medium"
          >
            Santuario botánico y banco genético de Wachuma. Un ecosistema de bioconstrucción donde la tecnología ancestral andina se encuentra con el futuro sustentable.
          </motion.p> 
          */}

          {/* CTAs simplificados */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 relative z-20"
          >
            <button
              onClick={onScrollToVideoShowcase}
              className="group relative px-6 sm:px-8 py-4 rounded-full bg-sadhana-primary text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(0,174,66,0.3)] hover:shadow-[0_0_30px_rgba(0,174,66,0.5)] hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Play className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{t('hero.enter')}</span>
            </button>
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
        <span className="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase">{t('hero.discover')}</span>
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
