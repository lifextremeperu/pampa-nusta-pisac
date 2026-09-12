import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ShieldCheck,
  Lock,
  RotateCcw,
  Activity,
  CreditCard,
  Video,
  Sparkles,
  Compass,
  CheckCircle2,
  Layers,
  Calendar,
  ExternalLink,
  Info
} from 'lucide-react';
import { REFERENTIAL_VIDEO_SCENES, SECURITY_PROTOCOLS } from '../data/securityTrustData';
import { andeanAudio } from '../utils/audioSynthesizer';

interface ReferentialVideoShowcaseProps {
  onOpenSecurityModal: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
  onOpenChatbot?: () => void;
  onExploreModules?: () => void;
}

export const ReferentialVideoShowcase: React.FC<ReferentialVideoShowcaseProps> = ({
  onOpenSecurityModal,
  onOpenChatbot,
  onExploreModules,
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isSynthesizerActive, setIsSynthesizerActive] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoQuality, setVideoQuality] = useState<'4k' | '1080p'>('4k');
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentScene = REFERENTIAL_VIDEO_SCENES[selectedSceneIndex] || REFERENTIAL_VIDEO_SCENES[0];

  // Subscribe to nature audio
  useEffect(() => {
    const unsub = andeanAudio.subscribe((playing) => {
      setIsSynthesizerActive(playing);
    });
    return unsub;
  }, []);

  // Handle video element time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 1);
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isAudioMuted;
    videoRef.current.muted = newMuted;
    setIsAudioMuted(newMuted);

    // If unmuting, also enhance with gentle andean flute/water chime
    if (!newMuted) {
      andeanAudio.autoStart();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-10">
      
      {/* ------------------------------------------------------------- */}
      {/* MAIN CINEMATIC VIDEO CONTAINER (4K PLAYER + CONTROLS)         */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden border-2 border-amber-600/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] bg-[#120d09] flex flex-col group"
      >
        {/* Upper Video Screen */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-black overflow-hidden flex items-center justify-center">
          
          <video
            ref={videoRef}
            key={currentScene.videoSrc}
            src={currentScene.videoSrc}
            poster={currentScene.poster}
            autoPlay
            loop
            muted={isAudioMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] transition-all duration-700"
          />

          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 cinema-vignette pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#120d09] via-black/60 to-transparent pointer-events-none" />

          {/* Top Video Header: Scene Label & Quality Tag */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/60 text-amber-300 font-mono text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>VIDEO REFERENCIAL OFICIAL</span>
              </div>

              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-stone-600 text-stone-300 font-mono text-[10px]">
                {currentScene.quechuaTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/70 border border-amber-600/50 text-amber-400 font-mono text-[10px] font-bold">
                {currentScene.resolution}
              </span>
              <button
                onClick={() => setVideoQuality(videoQuality === '4k' ? '1080p' : '4k')}
                className="px-2 py-0.5 rounded bg-[#241a12]/80 border border-[#523c2a] text-stone-300 hover:text-amber-300 font-mono text-[9px] uppercase cursor-pointer"
              >
                {videoQuality === '4k' ? 'HD 4K' : '1080P'}
              </button>
            </div>
          </div>

          {/* Center Play Overlay Icon when Paused */}
          {!isPlaying && (
            <button
              onClick={handleTogglePlay}
              className="absolute z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center border-4 border-white/20 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Reproducir video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-stone-950 ml-1" />
            </button>
          )}

          {/* Captions / Narrative Subtitle at Bottom Center of Video */}
          {showCaptions && (
            <div className="absolute bottom-12 sm:bottom-14 left-4 right-4 text-center z-20 pointer-events-none">
              <div className="inline-block max-w-2xl px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-[#443123]/80 text-stone-200 text-xs sm:text-sm font-sans shadow-2xl">
                <span className="text-amber-300 font-bold block mb-0.5 font-cinzel text-[11px] sm:text-xs">
                  {currentScene.title}
                </span>
                <span className="font-light leading-snug">
                  {currentScene.description}
                </span>
              </div>
            </div>
          )}

          {/* Bottom In-Video Interactive Controls Bar */}
          <div className="absolute bottom-2 left-3 right-3 z-30 flex items-center gap-3 bg-black/80 backdrop-blur-xl p-2 sm:p-2.5 rounded-2xl border border-white/10 shadow-2xl">
            
            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="p-1.5 sm:p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors cursor-pointer shrink-0"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
              aria-label="Pausa o reproducción"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
            </button>

            {/* Mute/Unmute Audio */}
            <button
              onClick={handleToggleMute}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                !isAudioMuted
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                  : 'bg-[#291c13] border-[#4b3524] text-stone-300 hover:text-amber-300'
              }`}
              title={isAudioMuted ? 'Activar sonido del video' : 'Silenciar sonido'}
              aria-label="Silenciar sonido"
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Time Slider */}
            <div className="flex-1 flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="font-mono text-[10px] text-stone-300 whitespace-nowrap hidden xs:inline">
                {formatSeconds(currentTime)} / {formatSeconds(duration || 165)}
              </span>
            </div>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                showCaptions ? 'bg-amber-600 text-stone-950' : 'bg-stone-800 text-stone-400'
              }`}
              title="Alternar subtítulos descriptivos"
            >
              CC
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="p-1.5 sm:p-2 rounded-xl text-stone-400 hover:text-amber-300 bg-[#291c13] border border-[#4b3524] transition-colors cursor-pointer shrink-0"
              title="Pantalla completa"
              aria-label="Pantalla completa"
            >
              <Maximize className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LOWER CHAPTER & PERSPECTIVE SELECTION BAR                     */}
        {/* ------------------------------------------------------------- */}
        <div className="p-3 sm:p-5 bg-gradient-to-r from-[#1a130d] via-[#150f0a] to-[#1a130d] border-t border-[#3e2c1e]">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <div>
              <span className="font-mono text-[10px] text-[#e5aa5d] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d8974a]" />
                <span>4 PERSPECTIVAS DEL SANTUARIO · ELIGE QUÉ VER:</span>
              </span>
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-stone-200 mt-0.5">
                Capítulo Activo: {currentScene.title}
              </h3>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {onOpenChatbot && (
                <button
                  onClick={onOpenChatbot}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/60 text-amber-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Video className="w-3.5 h-3.5 text-amber-400" />
                  <span>Videollamada 1 a 1</span>
                </button>
              )}

              <button
                onClick={() => onOpenSecurityModal('guarantee')}
                className="px-3 py-1.5 rounded-xl bg-[#281c13] hover:bg-[#38281b] border border-emerald-600/60 text-emerald-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ver Garantías</span>
              </button>
            </div>
          </div>

          {/* Perspective Selector Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {REFERENTIAL_VIDEO_SCENES.map((scene, idx) => {
              const isCurrent = idx === selectedSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setSelectedSceneIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isCurrent
                      ? 'bg-[#2a1c12] border-amber-500 shadow-[0_0_20px_rgba(216,151,74,0.3)]'
                      : 'bg-[#18110b] border-[#3e2c1e] hover:border-amber-600/60 hover:bg-[#22170f]'
                  }`}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2 bg-stone-900 border border-white/5">
                    <img
                      src={scene.poster}
                      alt={scene.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isCurrent ? 'scale-105' : 'group-hover:scale-105 opacity-80'
                      }`}
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-stone-200">
                      {scene.duration}
                    </span>
                    {isCurrent && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 font-mono text-[8px] font-bold">
                        EN REPRODUCCIÓN
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-cinzel text-[11px] sm:text-xs font-bold text-stone-100 group-hover:text-amber-300 line-clamp-1">
                      {scene.title}
                    </h4>
                    <p className="font-mono text-[9px] text-stone-400 line-clamp-1 mt-0.5">
                      {scene.highlights.join(' · ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
