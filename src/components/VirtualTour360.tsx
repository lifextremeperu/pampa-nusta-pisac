import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Plus
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

export const VirtualTour360: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active Viewing Mode: 'video' (Video Referencial & 360) or 'panorama360' (Explorador Esférico Canvas)
  const [activeMode, setActiveMode] = useState<'video' | 'panorama360' | 'map'>('video');

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
  const [selectedFacility, setSelectedFacility] = useState<SanctuaryFacility | null>(null);
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
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`,
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
        `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&start=${facility.videoTimeSeconds}`
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
    <section id="tour360" className="relative py-20 sm:py-28 bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm">
            <Film className="w-3.5 h-3.5 text-amber-700" />
            <span>VIDEO REFERENCIAL & RECORRIDO VIRTUAL · PAMPA ÑUSTA</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            Recorrido Virtual: <span className="text-amber-800">Pampa Ñusta</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-medium">
            Conoce a través de nuestro video referencial y recorrido virtual las instalaciones ecológicas, domos botánicos y servicios comunitarios del santuario en las laderas de Pisac (3,347 msnm).
          </p>
        </div>

        {/* Mode Selector Pill Strip */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveMode('video')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 font-bold shadow-sm ${
              activeMode === 'video'
                ? 'bg-amber-600 text-white border-2 border-amber-600 shadow-amber-900/20'
                : 'bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Referencial de las Instalaciones (4K & 360°)</span>
          </button>

          <button
            onClick={() => setActiveMode('panorama360')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 font-bold shadow-sm ${
              activeMode === 'panorama360'
                ? 'bg-amber-600 text-white border-2 border-amber-600 shadow-amber-900/20'
                : 'bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            <CompassIcon className="w-4 h-4" />
            <span>Explorador Esférico Panorámico por Sectores</span>
          </button>

          <button
            onClick={() => setActiveMode('map')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 font-bold shadow-sm ${
              activeMode === 'map'
                ? 'bg-amber-600 text-white border-2 border-amber-600 shadow-amber-900/20'
                : 'bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Mapa Interactivo del Santuario</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: VIDEO REFERENCIAL E INTERACTIVO DE LAS INSTALACIONES */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'video' && (
          <div className="space-y-6">
            
            {/* Simple Reseña (Description) */}
            <div className="bg-white/80 backdrop-blur-md border border-sadhana-dark/10 rounded-2xl p-5 sm:p-6 shadow-xl text-sadhana-brown/90 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                Sumérgete en la inmensidad del Valle Sagrado a través de esta expedición visual. Este documento audiovisual te lleva por las laderas, la andenería y la geografía sagrada que rodea a Pampa Ñusta en Pisac, ofreciendo una perspectiva única de la biodiversidad, la bioconstrucción y la herencia viva que protegemos a más de 3,300 metros sobre el nivel del mar.
              </p>
            </div>

            {/* Main Video Viewport Container (Simplified) */}
            <div className="relative w-full aspect-[16/9] min-h-[440px] sm:min-h-[560px] rounded-3xl overflow-hidden border border-sadhana-primary/30 shadow-2xl bg-sadhana-sand/30">
              {isVideoPlaying ? (
                <iframe
                  title="Pampa Ñusta Video Referencial"
                  src="https://www.youtube-nocookie.com/embed/CheJWYQvP98?autoplay=1&rel=0&modestbranding=1"
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; vr"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img
                    src="https://img.youtube.com/vi/CheJWYQvP98/hqdefault.jpg"
                    alt="Expedición Andina"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-sadhana-dark/40 backdrop-blur-[2px] group-hover:bg-sadhana-dark/20 transition-colors" />

                  <div className="relative z-10 text-center max-w-xl">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4 inline-block font-bold">
                      Documental Oficial · 22:45 min
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-6">
                      Expedición Andina: Enigma y Entorno de Pisac
                    </h3>

                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-2xl group-hover:bg-emerald-500 transition-all">
                      <Play className="w-5 h-5 fill-white" />
                      <span>Reproducir Documental</span>
                    </div>
                  </div>
                </div>
              )}
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
              className="relative w-full aspect-[16/9] min-h-[460px] sm:min-h-[580px] rounded-3xl overflow-hidden border border-stone-300 shadow-2xl bg-stone-900 cursor-grab active:cursor-grabbing select-none"
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
        {/* THE 5 SANCTUARY FACILITIES & SERVICES CARDS STRIP */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-stone-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
                Directorio Oficial del Santuario
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-stone-950">
                Las 5 Instalaciones y Servicios de Pampa Ñusta
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-mono">
              Abiertas a investigadores, familias, mecenas y comunidades
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PAMPA_NUSTA_FACILITIES.map((facility, idx) => (
              <div
                key={facility.id}
                className="rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-600 hover:bg-white text-left transition-all flex flex-col group shadow-sm hover:shadow-md overflow-hidden"
              >
                {/* Thumbnail Image Header */}
                <div className="w-full h-36 relative overflow-hidden bg-stone-900 shrink-0">
                  <img 
                    src={facility.imageUrl} 
                    alt={facility.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded border border-white/20 bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white font-bold uppercase">
                    SECTOR 0{idx + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-stone-950 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-snug">
                      {facility.name}
                    </h4>

                    <span className="text-[10px] text-emerald-800 font-serif italic block mt-0.5 line-clamp-1">
                      {facility.quechuaName}
                    </span>

                    <p className="text-xs text-stone-600 font-sans mt-2 line-clamp-3 leading-relaxed">
                      {facility.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                      <Users className="w-3 h-3 text-emerald-700" />
                      <span>{facility.capacity}</span>
                    </div>

                    <button
                      onClick={() => setSelectedFacility(facility)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Ver Servicios</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* SELECTED FACILITY & SERVICES MODAL DRAWER */}
      {/* ------------------------------------------------------------- */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white border border-sadhana-dark/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-sadhana-sand/30 text-sadhana-brown hover:text-sadhana-dark hover:bg-sadhana-sand/50 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Altitude Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{selectedFacility.category} · {selectedFacility.altitude}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-950">
              {selectedFacility.name}
            </h3>
            <p className="text-amber-800 font-serif italic text-sm mt-0.5">
              {selectedFacility.quechuaName}
            </p>

            {/* Facility Image with Overlay */}
            <div className="mt-4 aspect-[16/9] rounded-2xl overflow-hidden border border-stone-200 relative shadow-sm">
              <img
                src={selectedFacility.imageUrl}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-stone-950/80 text-stone-200 text-[11px] font-mono backdrop-blur-sm">
                Sector en Pampa Ñusta, Pisac · 3,347 msnm
              </div>
            </div>

            {/* Full Description */}
            <p className="mt-5 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              {selectedFacility.fullDesc}
            </p>

            {/* Structured Services Offered List */}
            <div className="mt-6 space-y-3">
              <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                Servicios del Santuario en esta Instalación:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedFacility.servicesOffered.map((service, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold font-cinzel text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{service.title}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                      {service.description}
                    </p>
                    <span className="text-[10px] font-mono text-stone-500 block pt-1 border-t border-stone-200/80">
                      Público: {service.targetAudience}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Specs */}
            <div className="mt-6 space-y-2">
              <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Especificaciones de Infraestructura & Bioconstrucción:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 font-sans">
                {selectedFacility.infrastructureDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logistics & Booking info */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span><strong>Horario:</strong> {selectedFacility.schedule}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Users className="w-3.5 h-3.5 text-amber-800" />
                  <span><strong>Capacidad:</strong> {selectedFacility.capacity}</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-600">
                Las visitas y actividades se realizan bajo principios de respeto comunitario andino (Ayni) y reciprocidad voluntaria con la reserva natural.
              </p>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`https://wa.me/51958050928?text=Hola%20Pampa%20%C3%91usta%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20y%20agendar%20una%20visita%20para%20el%20sector%3A%20${encodeURIComponent(selectedFacility.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Consultar por WhatsApp (+51 958 050 928)</span>
              </a>

              <button
                onClick={() => setSelectedFacility(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-cinzel font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-stone-300"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
