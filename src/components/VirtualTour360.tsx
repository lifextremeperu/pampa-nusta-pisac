import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { InterdimensionalJourney } from './InterdimensionalJourney';
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Info,
  Layers,
  Sparkles,
  MapPin,
  X,
  Eye,
  ShieldCheck,
  Video,
  Play,
  Clock,
  Users,
  MessageCircle,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ExternalLink,
  Film,
  Compass as CompassIcon,
  HelpCircle,
  Plus,
  Target,
  Banknote,
  GitCommit,
  Quote,
  Zap
} from 'lucide-react';
import {
  PAMPA_NUSTA_FACILITIES,
  SANCTUARY_PANORAMA_SCENES,
  SANCTUARY_REFERENCE_VIDEOS,
  SanctuaryFacility,
  PanoramaSceneItem,
  SanctuaryReferenceVideo
} from '../data/sanctuaryFacilities';
import { InteractiveSanctuaryMap } from './InteractiveSanctuaryMap';

interface VirtualTour360Props {
  onOpenProject?: (facility: SanctuaryFacility) => void;
}

export const VirtualTour360: React.FC<VirtualTour360Props> = ({ onOpenProject }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [activeMode, setActiveMode] = useState<'video' | 'panorama360' | 'map' | 'journey'>('video');
  const [showJourney, setShowJourney] = useState(false);
  const [activeCinematicIndex, setActiveCinematicIndex] = useState(0);

  // Auto-advance cinematic slider
  useEffect(() => {
    if (activeMode !== 'video') return;
    const interval = setInterval(() => {
      setActiveCinematicIndex((prev) => (prev + 1) % PAMPA_NUSTA_FACILITIES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [activeMode]);

  // Video Player State
  const [activeVideo, setActiveVideo] = useState<SanctuaryReferenceVideo>(SANCTUARY_REFERENCE_VIDEOS[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [selectedVideoFacility, setSelectedVideoFacility] = useState<SanctuaryFacility>(PAMPA_NUSTA_FACILITIES[0]);
  const [customVideoInput, setCustomVideoInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [activeEmbedUrl, setActiveEmbedUrl] = useState<string>(
    'https://www.youtube-nocookie.com/embed/CheJWYQvP98?autoplay=1&rel=0&modestbranding=1'
  );

  // Panoramic Canvas State
  const [activeScene, setActiveScene] = useState<PanoramaSceneItem>(SANCTUARY_PANORAMA_SCENES[0]);
  const [yaw, setYaw] = useState<number>(15);
  const [pitch, setPitch] = useState<number>(-5);
  const [fov, setFov] = useState<number>(75);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Helper to extract YouTube video ID from various formats
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 450 + 32 : window.innerWidth * 0.85 + 24;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Change selected reference video
  const handleSelectReferenceVideo = (video: SanctuaryReferenceVideo) => {
    setActiveVideo(video);
    setIsVideoPlaying(true);
    setActiveEmbedUrl(video.embedUrl);
  };

  // Apply custom video URL if entered by user
  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoInput.trim()) return;

    const ytId = extractYouTubeId(customVideoInput.trim());
    if (ytId) {
      const newVideo: SanctuaryReferenceVideo = {
        id: 'custom-video',
        title: 'Video Personalizado de Pampa Ñusta',
        subtitle: 'Video referencial provisto por el usuario',
        type: 'youtube',
        url: customVideoInput.trim(),
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        duration: 'En vivo',
        tag: 'Video Personalizado',
        description: 'Video externo configurado para el santuario ecológico Pampa Ñusta.'
      };
      setActiveVideo(newVideo);
      setActiveEmbedUrl(newVideo.embedUrl);
      setIsVideoPlaying(true);
      setShowCustomInput(false);
    } else if (customVideoInput.trim().endsWith('.mp4') || customVideoInput.trim().startsWith('http')) {
      const newVideo: SanctuaryReferenceVideo = {
        id: 'custom-mp4',
        title: 'Video MP4 Personalizado',
        subtitle: 'Transmisión directa de video',
        type: 'mp4',
        url: customVideoInput.trim(),
        embedUrl: customVideoInput.trim(),
        thumbnailUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1600&auto=format&fit=crop',
        duration: 'HD',
        tag: 'MP4 Directo',
        description: 'Archivo de video directo configurado para la reserva.'
      };
      setActiveVideo(newVideo);
      setActiveEmbedUrl(newVideo.embedUrl);
      setIsVideoPlaying(true);
      setShowCustomInput(false);
    }
  };

  // Jump to specific facility in video
  const handleJumpToVideoFacility = (facility: SanctuaryFacility) => {
    setSelectedVideoFacility(facility);
    setIsVideoPlaying(true);

    if (activeVideo.type === 'youtube' || activeVideo.type === 'youtube360') {
      const ytId = extractYouTubeId(activeVideo.url) || 'CheJWYQvP98';
      setActiveEmbedUrl(
        `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1&start=${facility.videoTimeSeconds}`
      );
    }
  };

  // Load Panorama Image for WebGL/Canvas 360 viewer
  useEffect(() => {
    if (activeMode !== 'panorama360') return;
    setImageLoaded(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeScene.imageUrl;
    img.onload = () => {
      loadedImageRef.current = img;
      setImageLoaded(true);
      setYaw(activeScene.initialYaw);
      setPitch(activeScene.initialPitch);
    };
  }, [activeScene, activeMode]);

  // Main Canvas Rendering Loop
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImageRef.current || !imageLoaded) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const img = loadedImageRef.current;

    ctx.clearRect(0, 0, width, height);

    const normalizedYaw = (((yaw % 360) + 360) % 360) / 360;
    const clampedPitch = Math.max(-45, Math.min(45, pitch));
    const normalizedPitch = (clampedPitch + 90) / 180;

    const fovH = fov / 360;
    const fovV = (fov * (height / width)) / 180;

    const sx = normalizedYaw * img.width - (fovH * img.width) / 2;
    const sy = Math.max(0, Math.min(img.height - fovV * img.height, normalizedPitch * img.height - (fovV * img.height) / 2));
    const sWidth = fovH * img.width;
    const sHeight = fovV * img.height;

    if (sx < 0) {
      const part1Width = -sx;
      ctx.drawImage(img, img.width - part1Width, sy, part1Width, sHeight, 0, 0, (part1Width / sWidth) * width, height);
      ctx.drawImage(img, 0, sy, sWidth - part1Width, sHeight, (part1Width / sWidth) * width, 0, width - (part1Width / sWidth) * width, height);
    } else if (sx + sWidth > img.width) {
      const part1Width = img.width - sx;
      ctx.drawImage(img, sx, sy, part1Width, sHeight, 0, 0, (part1Width / sWidth) * width, height);
      ctx.drawImage(img, 0, sy, sWidth - part1Width, sHeight, (part1Width / sWidth) * width, 0, width - (part1Width / sWidth) * width, height);
    } else {
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
    }

    const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, width * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }, [yaw, pitch, fov, imageLoaded]);

  // Animation Loop with Auto-Rotation
  useEffect(() => {
    if (activeMode !== 'panorama360') return;

    const loop = () => {
      if (isAutoRotating && !isDraggingRef.current) {
        setYaw((prev) => (prev + 0.08) % 360);
      }
      renderFrame();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoRotating, renderFrame, activeMode]);

  // Handle Resize of Canvas
  useEffect(() => {
    if (activeMode !== 'panorama360') return;

    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        renderFrame();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame, activeMode]);

  // Mouse & Touch Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    const sensitivity = (fov / 75) * 0.25;
    setYaw((prev) => (prev - dx * sensitivity) % 360);
    setPitch((prev) => Math.max(-45, Math.min(45, prev + dy * sensitivity)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const sensitivity = (fov / 75) * 0.3;
    setYaw((prev) => (prev - dx * sensitivity) % 360);
    setPitch((prev) => Math.max(-45, Math.min(45, prev + dy * sensitivity)));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleZoomIn = () => setFov((prev) => Math.max(35, prev - 10));
  const handleZoomOut = () => setFov((prev) => Math.min(95, prev + 10));

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getHotspotScreenPos = (facility: SanctuaryFacility) => {
    if (!containerRef.current) return null;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    let deltaYaw = (facility.coordinates.yaw - yaw) % 360;
    if (deltaYaw > 180) deltaYaw -= 360;
    if (deltaYaw < -180) deltaYaw += 360;

    const deltaPitch = facility.coordinates.pitch - pitch;

    const halfFovH = fov / 2;
    const halfFovV = (fov * (height / width)) / 2;

    if (Math.abs(deltaYaw) <= halfFovH && Math.abs(deltaPitch) <= halfFovV) {
      const screenX = width / 2 + (deltaYaw / halfFovH) * (width / 2);
      const screenY = height / 2 - (deltaPitch / halfFovV) * (height / 2);
      return { x: screenX, y: screenY, visible: true };
    }

    return { x: 0, y: 0, visible: false };
  };

  return (
    <section id="tour360" className="relative py-32 md:py-48 bg-white text-sadhana-dark overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-sadhana-primary font-bold mb-8">
            02 — Recorrido Inmersivo
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-sadhana-dark mb-6">
            TOUR <br />
            <span className="text-sadhana-sand">360°</span>
          </h2>
          <p className="text-lg md:text-xl text-sadhana-brown/70 font-medium max-w-2xl leading-relaxed">
            Conoce a través de nuestro video referencial y recorrido virtual las instalaciones ecológicas, domos botánicos y servicios comunitarios del santuario.
          </p>
        </div>

        {/* Mode Selector Pill Strip */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            onClick={() => setActiveMode('video')}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-3 ${
              activeMode === 'video'
                ? 'bg-sadhana-primary text-white'
                : 'bg-sadhana-sand/20 text-sadhana-dark hover:bg-sadhana-sand/40'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Explorador Cinemático</span>
          </button>

          <button
            onClick={() => setActiveMode('panorama360')}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-3 ${
              activeMode === 'panorama360'
                ? 'bg-sadhana-primary text-white'
                : 'bg-sadhana-sand/20 text-sadhana-dark hover:bg-sadhana-sand/40'
            }`}
          >
            <CompassIcon className="w-4 h-4" />
            <span>Explorador 360°</span>
          </button>

          <button
            onClick={() => setActiveMode('map')}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-3 ${
              activeMode === 'map'
                ? 'bg-sadhana-primary text-white'
                : 'bg-sadhana-sand/20 text-sadhana-dark hover:bg-sadhana-sand/40'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Mapa del Santuario</span>
          </button>

          {/* JOURNEY BUTTON - special gradient */}
          <button
            onClick={() => setShowJourney(true)}
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 text-white"
            style={{
              background: 'linear-gradient(135deg, #0d4a1f, #1a2e50, #2d1a4a)',
              boxShadow: '0 0 20px rgba(74,222,128,0.3), 0 0 40px rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.4)',
              animation: 'pulse-glow 2.5s ease-in-out infinite',
            }}
          >
            <Zap className="w-4 h-4" style={{ color: '#4ade80' }} />
            <span style={{ background: 'linear-gradient(90deg, #4ade80, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Viaje Interdimensional</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: EXPLORADOR CINEMÁTICO (REPLACES YOUTUBE)            */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'video' && (
          <div className="space-y-6">
            
            {/* Simple Reseña (Description) */}
            <div className="bg-white/80 backdrop-blur-md border border-sadhana-dark/10 rounded-2xl p-5 sm:p-6 shadow-xl text-sadhana-brown/90 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                Sumérgete en la inmensidad del Valle Sagrado a través de esta expedición visual en ultra alta definición. Este recorrido cinemático te transporta por la bioconstrucción y la herencia viva de cada una de nuestras instalaciones ecológicas.
              </p>
            </div>

            {/* Cinematic Viewport Container */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-sadhana-dark overflow-hidden rounded-2xl shadow-2xl">
              {PAMPA_NUSTA_FACILITIES.map((facility, idx) => (
                <div
                  key={facility.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    activeCinematicIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={facility.imageUrl}
                    alt={facility.name}
                    className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-out ${
                      activeCinematicIndex === idx ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/20 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-sadhana-primary mb-4 block">
                      {facility.category} · {facility.altitude}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                      {facility.name}
                    </h3>
                    <p className="text-sadhana-sand/90 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
                      {facility.shortDesc}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Progress Indicators */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {PAMPA_NUSTA_FACILITIES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCinematicIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      activeCinematicIndex === idx ? 'w-10 bg-sadhana-primary' : 'w-2.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Ver instalación ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: RECORRIDO ESFÉRICO 360° INTERACTIVO POR SECTORES */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'panorama360' && (
          <div>
            {/* Scene Selector Pill Strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 flex-wrap">
              {SANCTUARY_PANORAMA_SCENES.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 font-bold ${
                    activeScene.id === scene.id
                      ? 'bg-amber-50 border-2 border-amber-600 text-amber-900 shadow-sm ring-1 ring-amber-600/30'
                      : 'bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span>{scene.name}</span>
                </button>
              ))}
            </div>

            {/* 360 Viewer Canvas Viewport */}
            <div
              ref={containerRef}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-sadhana-dark cursor-grab active:cursor-grabbing select-none overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

              {!imageLoaded && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-2 border-sadhana-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-sans font-bold text-xs text-sadhana-primary uppercase tracking-widest">
                    Cargando Entorno 360° del Santuario...
                  </span>
                </div>
              )}

              {/* Hotspots */}
              {imageLoaded &&
                PAMPA_NUSTA_FACILITIES.map((facility) => {
                  const pos = getHotspotScreenPos(facility);
                  if (!pos || !pos.visible) return null;
                  return (
                    <div
                      key={facility.id}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto'
                      }}
                      className="absolute z-20 group/marker"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFacility(facility);
                      }}
                    >
                      <button
                        className="relative p-3 rounded-full bg-sadhana-orange text-white shadow-xl hover:scale-125 transition-transform cursor-pointer border-2 border-white ring-2 ring-sadhana-orange/50"
                        title={facility.name}
                      >
                        <span className="absolute inset-0 rounded-full bg-sadhana-orange animate-ping opacity-60 pointer-events-none" />
                        <Sparkles className="w-4 h-4 text-white" />
                      </button>

                      <div className="absolute left-1/2 -top-14 -translate-x-1/2 hidden group-hover/marker:flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-sadhana-dark/10 text-sadhana-dark whitespace-nowrap shadow-2xl z-30 pointer-events-none">
                        <span className="font-sans text-xs font-bold text-sadhana-primary">{facility.name}</span>
                        <span className="text-[10px] text-sadhana-brown/70 font-mono font-medium">
                          {facility.quechuaName} · {facility.altitude}
                        </span>
                      </div>
                    </div>
                  );
                })}

              {/* HUD */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-sadhana-dark/10 text-xs text-sadhana-dark shadow-md">
                <Compass className="w-4 h-4 text-sadhana-orange" />
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
                  <span>GUIÑADA: {Math.round(yaw)}°</span>
                  <span className="text-sadhana-brown/30">|</span>
                  <span>CABECEO: {Math.round(pitch)}°</span>
                  <span className="text-sadhana-brown/30">|</span>
                  <span>ZOOM: {Math.round(fov)}°</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                    isAutoRotating
                      ? 'bg-sadhana-orange/10 border-sadhana-orange/30 text-sadhana-orange shadow-md'
                      : 'bg-white/90 border-sadhana-dark/10 text-sadhana-brown/60 hover:text-sadhana-primary'
                  }`}
                  title={isAutoRotating ? 'Detener autorrotación' : 'Activar autorrotación'}
                >
                  <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleZoomIn}
                  className="p-2.5 rounded-xl bg-white/90 border border-sadhana-dark/10 text-sadhana-brown/70 hover:text-sadhana-primary hover:border-sadhana-primary/30 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  title="Acercar (Zoom In)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={handleZoomOut}
                  className="p-2.5 rounded-xl bg-white/90 border border-sadhana-dark/10 text-sadhana-brown/70 hover:text-sadhana-primary hover:border-sadhana-primary/30 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  title="Alejar (Zoom Out)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-white/90 border border-sadhana-dark/10 text-sadhana-brown/70 hover:text-sadhana-primary hover:border-sadhana-primary/30 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  title="Pantalla Completa"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-sadhana-dark/10 text-xs text-sadhana-dark font-sans flex items-center gap-2 pointer-events-none shadow-lg font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sadhana-primary animate-pulse" />
                <span>Arrastra con el ratón o el dedo para rotar 360° · Pulsa en los iconos naranjas para explorar las instalaciones</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: MAPA INTERACTIVO OPENSTREETMAP */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'map' && (
          <div className="w-full mt-6">
            <InteractiveSanctuaryMap />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* THE 5 SANCTUARY FACILITIES & SERVICES */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-32 md:mt-48">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-sadhana-dark">
              INSTALACIONES
            </h3>
            
            <div className="flex gap-3">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-12 h-12 rounded-full border border-sadhana-dark/20 text-sadhana-dark flex items-center justify-center hover:bg-sadhana-dark hover:text-white transition-colors cursor-pointer shadow-sm"
                aria-label="Desplazar a la izquierda"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-12 h-12 rounded-full bg-sadhana-dark text-white flex items-center justify-center hover:bg-sadhana-primary transition-colors cursor-pointer shadow-sm"
                aria-label="Desplazar a la derecha"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 md:gap-8 pb-12 cursor-grab active:cursor-grabbing px-6 md:px-12 -mx-6 md:-mx-12 scroll-smooth">
            {PAMPA_NUSTA_FACILITIES.map((facility, idx) => (
              <div
                key={facility.id}
                className="relative group cursor-pointer flex-shrink-0 w-[85vw] md:w-[450px] aspect-[4/5] snap-center overflow-hidden bg-sadhana-dark"
                onClick={() => setSelectedFacility(facility)}
              >
                {/* Background Image */}
                <img 
                  src={facility.imageUrl} 
                  alt={facility.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                
                {/* Dark Overlays for Cinematic Effect */}
                <div className="absolute inset-0 bg-sadhana-dark/40 group-hover:bg-sadhana-dark/20 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/20 to-transparent opacity-90" />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="text-xs md:text-sm font-bold text-sadhana-primary font-mono uppercase tracking-[0.3em]">
                      0{idx + 1}
                    </div>
                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-3 drop-shadow-md">
                      {facility.name}
                    </h4>
                    <p className="text-sadhana-sand/90 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                      {facility.shortDesc}
                    </p>
                    
                    {/* Fake Button Line */}
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-white group-hover:text-sadhana-primary transition-colors">
                      <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12"></span>
                      <span>Explorar Instalación</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>

    {/* === INTERDIMENSIONAL JOURNEY PORTAL === */}
    {showJourney && createPortal(
      <InterdimensionalJourney onClose={() => setShowJourney(false)} />,
      document.body
    )}

    <style>{`
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(74,222,128,0.3), 0 0 40px rgba(74,222,128,0.1); }
        50% { box-shadow: 0 0 30px rgba(74,222,128,0.6), 0 0 60px rgba(74,222,128,0.25); }
      }
    `}</style>
  );
};
