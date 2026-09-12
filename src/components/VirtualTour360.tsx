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

export const VirtualTour360: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active Viewing Mode: 'video' (Video Referencial & 360) or 'panorama360' (Explorador Esférico Canvas)
  const [activeMode, setActiveMode] = useState<'video' | 'panorama360'>('video');

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
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: VIDEO REFERENCIAL E INTERACTIVO DE LAS INSTALACIONES */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'video' && (
          <div className="space-y-6">

            {/* Video Playlist Selector: 3 Curated Referential Videos */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                    Selecciona el Video Referencial del Santuario:
                  </span>
                </div>
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="text-[11px] font-mono text-amber-800 hover:text-amber-950 flex items-center gap-1 font-bold underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Probar otro enlace de video / dron</span>
                </button>
              </div>

              {/* Custom URL Input Drawer */}
              {showCustomInput && (
                <form onSubmit={handleApplyCustomVideo} className="mb-3 p-3 rounded-xl bg-white border border-amber-300 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customVideoInput}
                    onChange={(e) => setCustomVideoInput(e.target.value)}
                    placeholder="Pega un enlace de YouTube o archivo .mp4..."
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Cargar Video
                  </button>
                </form>
              )}

              {/* 3 Video Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SANCTUARY_REFERENCE_VIDEOS.map((vid) => {
                  const isSelected = activeVideo.id === vid.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => handleSelectReferenceVideo(vid)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 group ${
                        isSelected
                          ? 'bg-white border-amber-600 ring-2 ring-amber-600/30 shadow-md'
                          : 'bg-white/80 border-stone-200 hover:border-amber-400 hover:bg-white'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-900">
                        <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                          <span className={`font-bold uppercase ${isSelected ? 'text-amber-800' : 'text-stone-500'}`}>
                            {vid.tag}
                          </span>
                          <span className="text-stone-400">{vid.duration}</span>
                        </div>
                        <h4 className="font-cinzel text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 font-sans line-clamp-1 mt-0.5">
                          {vid.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Facility Chapter Selector Bar */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-amber-700" />
                  Capítulos del Recorrido por Instalación de Pampa Ñusta:
                </span>
                <span className="text-[10px] font-mono text-stone-500 hidden sm:inline-block">
                  Selecciona una instalación para saltar a su sección
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {PAMPA_NUSTA_FACILITIES.map((facility, idx) => {
                  const isSelected = selectedVideoFacility.id === facility.id;
                  return (
                    <button
                      key={facility.id}
                      onClick={() => handleJumpToVideoFacility(facility)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-white border-amber-600 ring-2 ring-amber-600/30 shadow-md'
                          : 'bg-white/80 border-stone-200 hover:border-amber-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={`font-bold ${isSelected ? 'text-amber-800' : 'text-stone-500'}`}>
                          0{idx + 1} · {facility.videoTimestamp}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />}
                      </div>
                      <span className="font-cinzel text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                        {facility.name.split('&')[0]}
                      </span>
                      <span className="text-[10px] text-stone-500 font-sans line-clamp-1 mt-0.5">
                        {facility.category.split('&')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Video Viewport Container */}
            <div className="relative w-full aspect-[16/9] min-h-[440px] sm:min-h-[560px] rounded-3xl overflow-hidden border border-stone-300 shadow-2xl bg-stone-950">
              
              {/* Telemetry & Badges Top Bar */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-200 text-xs shadow-lg">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <div className="font-mono text-[11px] sm:text-xs">
                  <span className="font-bold text-amber-300 uppercase">Video Referencial Oficial:</span>{' '}
                  <span className="text-stone-300 hidden sm:inline">
                    {activeVideo.title} · Pisac (3,347 msnm)
                  </span>
                </div>
              </div>

              {/* Active Player (Embed YouTube, YouTube 360 or HTML5 MP4) */}
              {isVideoPlaying ? (
                activeVideo.type === 'mp4' ? (
                  <video
                    src={activeVideo.embedUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    title="Pampa Ñusta Video Referencial"
                    src={activeEmbedUrl}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; vr"
                    allowFullScreen
                  />
                )
              ) : (
                /* Poster Cover View if paused */
                <div
                  className="relative w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img
                    src={activeVideo.thumbnailUrl}
                    alt={activeVideo.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[2px] group-hover:bg-stone-950/40 transition-colors" />

                  <div className="relative z-10 text-center max-w-xl">
                    <span className="px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-mono uppercase tracking-widest mb-4 inline-block font-bold">
                      {activeVideo.tag} · {activeVideo.duration}
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-2">
                      {activeVideo.title}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm font-sans mb-6">
                      {activeVideo.description}
                    </p>

                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-2xl group-hover:bg-amber-500 transition-all">
                      <Play className="w-5 h-5 fill-white" />
                      <span>Reproducir Video Referencial</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Floating Card of Currently Selected Facility */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md z-20 p-3.5 sm:p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-amber-500/40 text-stone-100 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    {selectedVideoFacility.tag} · {selectedVideoFacility.altitude}
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                    Capítulo {selectedVideoFacility.videoTimestamp}
                  </span>
                </div>
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-white line-clamp-1">
                  {selectedVideoFacility.name}
                </h4>
                <p className="text-xs text-stone-300 font-sans mt-1 line-clamp-2">
                  {selectedVideoFacility.shortDesc}
                </p>

                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedFacility(selectedVideoFacility)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Ver Servicios & Ficha</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/51958050928?text=Hola%20Pampa%20%C3%91usta%2C%20vi%20el%20video%20referencial%20y%20deseo%20visitar%20el%20sector%3A%20${encodeURIComponent(selectedVideoFacility.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
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
                <div className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="font-cinzel text-xs text-amber-300 uppercase tracking-widest">
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
                        className="relative p-3 rounded-full bg-amber-500 text-stone-950 shadow-xl hover:scale-125 transition-transform cursor-pointer border-2 border-white ring-2 ring-amber-600/50"
                        title={facility.name}
                      >
                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60 pointer-events-none" />
                        <Sparkles className="w-4 h-4 text-stone-950" />
                      </button>

                      <div className="absolute left-1/2 -top-14 -translate-x-1/2 hidden group-hover/marker:flex flex-col items-center px-3 py-1.5 rounded-xl bg-stone-950/95 backdrop-blur-md border border-amber-500/60 text-stone-100 whitespace-nowrap shadow-2xl z-30 pointer-events-none">
                        <span className="font-cinzel text-xs font-bold text-amber-300">{facility.name}</span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {facility.quechuaName} · {facility.altitude}
                        </span>
                      </div>
                    </div>
                  );
                })}

              {/* HUD */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-3 p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-xs text-stone-300 shadow-md">
                <Compass className="w-4 h-4 text-amber-400" />
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span>GUIÑADA: {Math.round(yaw)}°</span>
                  <span className="text-stone-600">|</span>
                  <span>CABECEO: {Math.round(pitch)}°</span>
                  <span className="text-stone-600">|</span>
                  <span>ZOOM: {Math.round(fov)}°</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                    isAutoRotating
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-md'
                      : 'bg-stone-950/80 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title={isAutoRotating ? 'Detener autorrotación' : 'Activar autorrotación'}
                >
                  <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleZoomIn}
                  className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 backdrop-blur-md transition-all cursor-pointer"
                  title="Acercar (Zoom In)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={handleZoomOut}
                  className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 backdrop-blur-md transition-all cursor-pointer"
                  title="Alejar (Zoom Out)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 backdrop-blur-md transition-all cursor-pointer"
                  title="Pantalla Completa"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-stone-950/85 backdrop-blur-md border border-stone-800 text-xs text-stone-300 font-sans flex items-center gap-2 pointer-events-none shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Arrastra con el ratón o el dedo para rotar 360° · Pulsa en los iconos dorados para explorar las instalaciones</span>
              </div>
            </div>
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
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-600 hover:bg-white text-left transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2.5">
                    <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      SECTOR 0{idx + 1}
                    </span>
                    <MapPin className="w-3.5 h-3.5 group-hover:text-amber-700 transition-colors" />
                  </div>

                  <h4 className="font-cinzel text-sm font-bold text-stone-950 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                    {facility.name}
                  </h4>

                  <span className="text-[10px] text-amber-800 font-serif italic block mt-0.5 line-clamp-1">
                    {facility.quechuaName}
                  </span>

                  <p className="text-xs text-stone-600 font-sans mt-2 line-clamp-3 leading-relaxed">
                    {facility.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                    <Users className="w-3 h-3 text-amber-700" />
                    <span>{facility.capacity}</span>
                  </div>

                  <button
                    onClick={() => setSelectedFacility(facility)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Ver Servicios</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-stone-100 text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
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
