import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Leaf, Trees, Compass, Video, ShieldCheck, Lock } from 'lucide-react';
import { andeanAudio } from '../utils/audioSynthesizer';
import { ThemeMode } from '../types';

interface HeaderProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenDonate: () => void;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  onOpenTrailer: () => void;
  onOpenChatbot?: () => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const Header: React.FC<HeaderProps> = ({
  themeMode,
  onToggleTheme,
  onOpenDonate,
  isCinemaMode,
  onToggleCinemaMode,
  onOpenTrailer,
  onOpenChatbot,
  onOpenSecurityModal,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(andeanAudio.getIsPlaying());
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = andeanAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = async () => {
    await andeanAudio.toggle();
  };

  const navLinks = [
    { name: 'Showreel Vivo', quechua: 'Santuario 360', href: '#showreel' },
    { name: 'Los 5 Módulos', quechua: 'Pichqa Kawsay', href: '#ecoaldea-modulos' },
    { name: 'Botánica Sagrada', quechua: 'Wachuma Kawsay', href: '#botanica-sagrada' },
    { name: 'Recorrido 360°', quechua: 'Pampa Ñusta 360', href: '#tour360' },
    { name: 'Leyenda Andina', quechua: 'Ñusta Willakuy', href: '#leyenda' },
    { name: 'Río Sagrado', quechua: 'Willakamayu', href: '#rio-sagrado' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 py-3 shadow-md'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-100 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity - Natural Reserve & Botanical Sanctuary */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl border border-amber-600/30 bg-amber-50 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-600 shadow-sm">
              <Leaf className="w-5 h-5 text-amber-700 transition-transform group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base sm:text-lg font-bold tracking-widest text-stone-950 group-hover:text-amber-800 transition-colors">
                  PAMPA ÑUSTA
                </span>
                <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded border border-amber-700/30 text-amber-900 font-mono bg-amber-50/80 font-bold hidden sm:inline-block">
                  RESERVA NATURAL
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-stone-600 uppercase font-mono font-medium">
                Pisac · Santuario Ecológico & Banco Genético
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Clean & Crisp */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-stone-800 hover:text-amber-800 hover:bg-stone-100 transition-all flex flex-col items-center group"
              >
                <span className="font-cinzel tracking-wider text-xs font-bold text-stone-900 group-hover:text-amber-800">{link.name}</span>
                <span className="text-[9px] text-stone-500 tracking-wider group-hover:text-amber-700 transition-colors font-mono">
                  {link.quechua}
                </span>
              </a>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* SSL & No-Risk Security Guarantee Button */}
            {onOpenSecurityModal && (
              <button
                onClick={() => onOpenSecurityModal('ssl')}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-500/60 text-emerald-800 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer font-bold shadow-sm"
                title="Certificado SSL 256-Bit y Compromiso de No Riesgo"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Seguro</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}

            {/* Conecta Videollamada Button */}
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-500/70 text-amber-900 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer font-bold shadow-sm"
                title="Agendar Videollamada 1 a 1 con un colaborador"
              >
                <Video className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Videollamada</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </button>
            )}

            {/* Exploration Tour Button */}
            <button
              onClick={onOpenTrailer}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer font-bold"
            >
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Explorar Reserva</span>
            </button>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={handleToggleAudio}
              id="audio-toggle-btn"
              title={isAudioPlaying ? 'Silenciar sonido natural de la reserva' : 'Reproducir sonido natural de la reserva'}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
                isAudioPlaying
                  ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm'
                  : 'border-stone-300 bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <div className="flex items-end gap-0.5 h-3 w-3">
                    <span className="w-0.5 bg-amber-700 animate-wave-1" />
                    <span className="w-0.5 bg-amber-700 animate-wave-2" />
                    <span className="w-0.5 bg-amber-700 animate-wave-3" />
                  </div>
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* Donate / Pases CTA */}
            <button
              onClick={onOpenDonate}
              id="header-donate-btn"
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Pases / Ayni</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-stone-200 bg-white rounded-xl p-4 space-y-2 shadow-xl">
            {onOpenSecurityModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSecurityModal('guarantee');
                }}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="font-cinzel text-sm">Compromiso de No Riesgo</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">SSL 256-Bit</span>
              </button>
            )}
            {onOpenChatbot && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChatbot();
                }}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-700" />
                  <span className="font-cinzel text-sm">Videollamada Programada</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-mono font-bold">1 a 1</span>
              </button>
            )}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-stone-900 hover:bg-stone-100 hover:text-amber-800 font-semibold"
              >
                <span className="font-cinzel text-sm">{link.name}</span>
                <span className="text-xs text-stone-500 font-mono">{link.quechua}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
