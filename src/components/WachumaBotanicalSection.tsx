import React, { useState } from 'react';
import {
  Leaf,
  MapPin,
  Sparkles,
  Sprout,
  ShieldCheck,
  Moon,
  Info,
  CheckCircle2,
  ArrowRight,
  Camera,
  Sun,
  Sliders,
  Maximize2,
  Minimize2,
  Eye,
  Layers,
  Aperture
} from 'lucide-react';

interface WachumaBotanicalSectionProps {
  onOpenModal?: () => void;
}

type PhotoMode = 'golden' | 'bokeh' | 'crisp' | 'chavin' | 'raw';
type ActivePhoto = 'master' | 'closeup' | 'bloom' | 'field';

interface BotanicalPhoto {
  id: ActivePhoto;
  title: string;
  subtitle: string;
  badge: string;
  src: string;
  exif: {
    lens: string;
    light: string;
    aperture: string;
    iso: string;
    focus: string;
  };
  description: string;
}

const BOTANICAL_PHOTOS: Record<ActivePhoto, BotanicalPhoto> = {
  master: {
    id: 'master',
    title: 'Santuario de Wachuma · Atardecer en el Apu',
    subtitle: 'Trichocereus pachanoi (Britton & Rose)',
    badge: 'FOTOGRAFÍA CINEMATOGRÁFICA MASTER 4K',
    src: '/assets/ecoaldea/wachuma-cinematic-master.jpg',
    exif: {
      lens: '85mm f/1.8 Anamórfico',
      light: 'Luz rasante dorada del Apu Linli (5,000K)',
      aperture: 'f/2.2 · Bokeh Suave',
      iso: 'ISO 100 · 14.5 EV Rango Dinámico',
      focus: 'Enfoque selectivo en costillas y ápice glauco',
    },
    description:
      'Composición de experto fotógrafo capturando las columnas sagradas en el bancal de cultivo de Pampa Ñusta. Iluminación lateral cálida que resalta la cera glauca protectora, las 7 y 8 costillas verticales y el sustrato mineral andino a 3,347 msnm.',
  },
  closeup: {
    id: 'closeup',
    title: 'Macro-Textura: Areolas & Costillas Sagradas',
    subtitle: 'Detalle anatómico de linaje de 8 costillas',
    badge: 'MACRO BOTÁNICA ULTRA-HD',
    src: '/assets/ecoaldea/wachuma-closeup-cinematic.jpg',
    exif: {
      lens: '100mm Macro f/2.8 1:1',
      light: 'Difusión solar de alta montaña',
      aperture: 'f/4.0 · Máxima profundidad de campo',
      iso: 'ISO 80 · Sensor de Medio Formato',
      focus: 'Micro-espícula y areola vellosa',
    },
    description:
      'Acercamiento microscópico a la arquitectura celular del Wachuma. Se aprecian las depresiones en "V" sobre las areolas, la vellosidad protectora y la densidad geométrica que canaliza el rocío matutino hacia la raíz.',
  },
  bloom: {
    id: 'bloom',
    title: 'Floración Nocturna del Apu',
    subtitle: 'Apertura efímera de 22 cm bajo las estrellas',
    badge: 'REGISTRO BOTÁNICO NOCTURNO',
    src: '/assets/ecoaldea/wachuma-bloom.jpg',
    exif: {
      lens: '50mm f/1.4 Art',
      light: 'Luz de luna llena andina & antorcha suave',
      aperture: 'f/1.8 · Desenfoque cremoso',
      iso: 'ISO 400 · Exposición 1/40s',
      focus: 'Pétalos albos y estambres dorados',
    },
    description:
      'La floración de la Wachuma dura sólo una noche. Con más de 20 centímetros de diámetro, emite un aroma dulce que atrae polinizadores nocturnos antes de cerrarse al primer rayo de sol del Valle Sagrado.',
  },
  field: {
    id: 'field',
    title: 'Bancales Vivos & Terrazas de Germoplasma',
    subtitle: 'Hábitat agroecológico en laderas de Pisac',
    badge: 'REGISTRO DE CAMPO IN SITU',
    src: '/assets/ecoaldea/wachuma-peru.jpg',
    exif: {
      lens: '35mm Gran Angular f/2.8',
      light: 'Luz ambiental andina de mediodía',
      aperture: 'f/5.6 · Campo completo',
      iso: 'ISO 125 · Colorimetría neutra',
      focus: 'Conjunto de clones madre e hijuelos',
    },
    description:
      'Perspectiva general de las terrazas bioclimáticas donde crecen decenas de columnas aclimatadas al frío nocturno y la intensa radiación ultravioleta de Pisac.',
  },
};

export const WachumaBotanicalSection: React.FC<WachumaBotanicalSectionProps> = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState<'conservacion' | 'taxonomia' | 'ancestral' | 'fotografia'>('conservacion');
  const [activePhotoId, setActivePhotoId] = useState<ActivePhoto>('master');
  const [photoMode, setPhotoMode] = useState<PhotoMode>('golden');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showExifDrawer, setShowExifDrawer] = useState<boolean>(true);

  const currentPhoto = BOTANICAL_PHOTOS[activePhotoId];

  // Professional photographic styling based on selected light and lens mode
  const getFilterStyle = (): React.CSSProperties => {
    switch (photoMode) {
      case 'golden':
        return {
          filter: 'contrast(1.15) brightness(1.06) saturate(1.22)',
          transition: 'all 0.5s ease',
        };
      case 'bokeh':
        return {
          filter: 'contrast(1.18) brightness(1.03) saturate(1.15)',
          transition: 'all 0.5s ease',
        };
      case 'crisp':
        return {
          filter: 'contrast(1.25) brightness(1.02) saturate(1.10)',
          transition: 'all 0.5s ease',
        };
      case 'chavin':
        return {
          filter: 'grayscale(1) contrast(1.35) brightness(0.96)',
          transition: 'all 0.5s ease',
        };
      case 'raw':
      default:
        return {
          filter: 'contrast(0.95) brightness(0.98) saturate(0.92)',
          transition: 'all 0.5s ease',
        };
    }
  };

  const handleToggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : prev === 1.6 ? 2.3 : 1));
  };

  return (
    <section id="botanica-sagrada" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Photographic Excellence & Sacred Sanctuary */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 text-amber-300 text-xs uppercase tracking-widest font-mono font-bold mb-3 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FOTOGRAFÍA BOTÁNICA CINEMATOGRÁFICA · 3,347 MSNM</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-50 leading-tight">
            Botánica Sagrada: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400">Banco Genético de la Wachuma</span>
          </h2>
          
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-sans font-light">
            Santuario vivo de preservación genética del cactus sagrado <em>Trichocereus pachanoi</em>. Capturado con óptica cinematográfica, iluminación rasante del atardecer andino y enfoque selectivo para revelar la sagrada geometría mineral de las 7 y 8 costillas.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-stone-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Terrazas de Pisac, Cusco</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 14 Linajes Madres</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5 text-amber-400" /> Revelado Fine-Art</span>
          </div>
        </div>

        {/* Main Grid: Master Photographic Showcase & Botanical Knowledge Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (7 cols): Master Photographic Suite & Studio Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border border-stone-700 shadow-2xl bg-stone-950 flex flex-col">
              
              {/* Top Studio Control Bar */}
              <div className="bg-stone-900/95 border-b border-stone-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                {/* Photo Selector Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setActivePhotoId('master')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'master'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Master Cinematográfico</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('closeup')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'closeup'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <Aperture className="w-3.5 h-3.5" />
                    <span>Macro Costillas</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('bloom')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'bloom'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Flor Nocturna</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('field')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'field'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Bancales Vivos</span>
                  </button>
                </div>

                {/* Zoom Control */}
                <button
                  onClick={handleToggleZoom}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  title="Aumentar con lupa botánica"
                >
                  {zoomLevel > 1 ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span>{zoomLevel}x</span>
                </button>
              </div>

              {/* Master Photographic Canvas Container */}
              <div className="aspect-[16/10] relative overflow-hidden bg-stone-950 flex items-center justify-center">
                
                {/* The Enhanced Image */}
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  referrerPolicy="no-referrer"
                  style={getFilterStyle()}
                  className={`w-full h-full object-cover transition-transform duration-700 select-none ${
                    zoomLevel === 1 ? 'scale-100 cursor-zoom-in' : zoomLevel === 1.6 ? 'scale-150 cursor-move' : 'scale-[2.3] cursor-move'
                  }`}
                  onClick={handleToggleZoom}
                />

                {/* Cinematic Golden Hour Lighting Overlay (Active in Golden Mode) */}
                {photoMode === 'golden' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/25 via-transparent to-amber-500/15 pointer-events-none mix-blend-screen" />
                )}

                {/* Bokeh Vignette (Active in Bokeh Mode) */}
                {photoMode === 'bokeh' && (
                  <div className="absolute inset-0 ring-inset ring-[60px] sm:ring-[90px] ring-black/50 pointer-events-none blur-xl" />
                )}

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Top Badge: Badge from Photo Record */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    {currentPhoto.badge}
                  </span>
                </div>

                {/* Raw vs. Graded Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-stone-700 text-[10px] font-mono font-bold flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${photoMode === 'raw' ? 'bg-stone-500' : 'bg-emerald-400 animate-pulse'}`} />
                    <span className="text-stone-200">
                      {photoMode === 'raw' ? 'FOTO ORIGINAL CRUDA' : 'ENFOQUE & LUZ CINEMATOGRÁFICA'}
                    </span>
                  </div>
                </div>

                {/* Bottom Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-white shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-300">
                        {currentPhoto.title}
                      </h3>
                      <p className="text-xs font-mono text-emerald-400 italic">
                        {currentPhoto.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-mono shrink-0">
                        Pisac · 3,347 msnm
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-stone-300 text-xs font-sans leading-relaxed">
                    {currentPhoto.description}
                  </p>
                </div>
              </div>

              {/* Photographic Light & Grading Modes Toolbar */}
              <div className="bg-stone-900 border-t border-stone-800 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-300 font-bold">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>LENTE & ILUMINACIÓN CINEMATOGRÁFICA (EXPERTO FOTÓGRAFO)</span>
                  </div>
                  <button
                    onClick={() => setShowExifDrawer(!showExifDrawer)}
                    className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                    <span>{showExifDrawer ? 'Ocultar EXIF' : 'Ver Ficha Óptica'}</span>
                  </button>
                </div>

                {/* Mode Selector Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    onClick={() => setPhotoMode('golden')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      photoMode === 'golden'
                        ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">Luz Dorada</span>
                  </button>

                  <button
                    onClick={() => setPhotoMode('bokeh')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      photoMode === 'bokeh'
                        ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <Aperture className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">Bokeh f/1.8</span>
                  </button>

                  <button
                    onClick={() => setPhotoMode('crisp')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      photoMode === 'crisp'
                        ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span className="truncate">Micro-Nitidez</span>
                  </button>

                  <button
                    onClick={() => setPhotoMode('chavin')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      photoMode === 'chavin'
                        ? 'bg-stone-200 text-stone-950 shadow-md ring-2 ring-white/50'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate">Fine-Art B&W</span>
                  </button>

                  <button
                    onClick={() => setPhotoMode(photoMode === 'raw' ? 'golden' : 'raw')}
                    className={`col-span-2 sm:col-span-1 py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      photoMode === 'raw'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-stone-800/90 text-stone-400 hover:text-amber-300 border border-stone-700'
                    }`}
                    title="Comparar con la foto original sin post-procesado"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="truncate">{photoMode === 'raw' ? 'Viendo Crudo' : 'Ver Original'}</span>
                  </button>
                </div>

                {/* Technical EXIF Drawer */}
                {showExifDrawer && (
                  <div className="mt-3 pt-3 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-stone-400">
                    <div className="bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block text-[9px] uppercase">Lente & Óptica</span>
                      <span className="text-amber-300 font-semibold">{currentPhoto.exif.lens}</span>
                    </div>
                    <div className="bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block text-[9px] uppercase">Iluminación</span>
                      <span className="text-emerald-300 font-semibold">{currentPhoto.exif.light}</span>
                    </div>
                    <div className="bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block text-[9px] uppercase">Apertura / Bokeh</span>
                      <span className="text-amber-300 font-semibold">{currentPhoto.exif.aperture}</span>
                    </div>
                    <div className="bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block text-[9px] uppercase">Foco Crítico</span>
                      <span className="text-stone-200 font-semibold">{currentPhoto.exif.focus}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botanical Ancestral Quote Card */}
            <div className="mt-4 p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="font-cormorant italic text-stone-300 text-sm sm:text-base leading-snug">
                «La Wachuma no es una simple planta; es la memoria mineral de la cordillera que enseña al hombre a mirar con los ojos del corazón.»
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Institutional Botanical Scientific & Conservation Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div>
              {/* Dossier Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-xl mb-6 border border-stone-800">
                <button
                  onClick={() => setActiveTab('conservacion')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'conservacion'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Conservación
                </button>
                <button
                  onClick={() => setActiveTab('taxonomia')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'taxonomia'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => setActiveTab('ancestral')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'ancestral'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Cosmovisión
                </button>
                <button
                  onClick={() => setActiveTab('fotografia')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'fotografia'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Fotografía
                </button>
              </div>

              {/* Tab 1: Conservación */}
              {activeTab === 'conservacion' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-stone-100 font-cinzel font-bold text-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3>Objetivo del Banco Genético</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Frente a la tala indiscriminada y el saqueo silvestre del cactus sagrado en los valles interandinos, Pampa Ñusta ha creado un <strong>banco de germoplasma vivo</strong> donde cada ejemplar es catalogado, cuidado y propagado asexualmente por esquejes madre.
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Protección de Clones:</strong> Preservación de genotipos con 7 y 8 costillas sagradas y alta resiliencia a heladas de 3,347 msnm.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Riego por Gravedad:</strong> Canales incaicos de agua pura de manantial que nutren el sustrato pedregoso.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Polinización Natural:</strong> Mantenimiento de corredores biológicos para murciélagos nectarívoros y mariposas nocturnas.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab 2: Taxonomía */}
              {activeTab === 'taxonomia' && (
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-stone-100 font-cinzel font-bold text-lg font-sans">
                    <Info className="w-5 h-5 text-amber-400" />
                    <h3>Taxonomía & Biometría</h3>
                  </div>

                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2.5 text-stone-300">
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-400">Nombre Científico:</span>
                      <span className="font-bold text-amber-300">Trichocereus pachanoi</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-400">Sinónimo Aceptado:</span>
                      <span>Echinopsis pachanoi</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-400">Nombre Quechua:</span>
                      <span className="font-bold text-emerald-400">Achuma / Wachuma</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-400">Distribución Hábitat:</span>
                      <span>2,000 - 3,400 msnm</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-400">Crecimiento Anual:</span>
                      <span>30 - 45 cm / año</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Floración:</span>
                      <span className="text-amber-200">Nocturna, 19-24 cm, blanca</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Cosmovisión */}
              {activeTab === 'ancestral' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-stone-100 font-cinzel font-bold text-lg">
                    <Moon className="w-5 h-5 text-indigo-400" />
                    <h3>El Guardián de la Visión Andina</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Representado en los monolitos de la cultura <strong>Chavín de Huántar</strong> desde hace más de 3,000 años, la Wachuma era considerada la llave para conectar el <em>Kay Pacha</em> (mundo del presente) con el <em>Hanan Pacha</em> (mundo espiritual).
                  </p>

                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                    <p className="font-semibold mb-1 text-amber-300">Rito de Agradecimiento:</p>
                    <p className="text-stone-300 font-light">
                      Antes de realizar cualquier poda o cuidado en el huerto, los guardianes de Pampa Ñusta realizan el <em>Kintu</em> (ofrenda de 3 hojas de coca) pidiendo permiso a los Apus Linli y Pachatusan.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: Fotografía */}
              {activeTab === 'fotografia' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-stone-100 font-cinzel font-bold text-lg">
                    <Camera className="w-5 h-5 text-amber-400" />
                    <h3>Tratamiento Fotográfico Experto</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Para elevar la imagen del Wachuma de una fotografía casual de smartphone a una obra de arte cinematográfica, aplicamos:
                  </p>

                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="font-bold text-amber-400 block mb-0.5">1. Iluminación Rasante (Rim Lighting):</span>
                      <span className="text-stone-400">Aprovecha la luz dorada del sol cayendo sobre el Apu Linli para esculpir la silueta vertical de cada costilla con un halo resplandeciente.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="font-bold text-emerald-400 block mb-0.5">2. Enfoque Selectivo (Shallow Depth of Field):</span>
                      <span className="text-stone-400">Desenfoque óptico gradual del fondo terroso mediante apertura de diafragma f/1.8, haciendo que las espinas y la cutícula glauca salten a la vista.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="font-bold text-sky-400 block mb-0.5">3. Colorimetría Fiel & Micro-Contraste:</span>
                      <span className="text-stone-400">Separación tonal entre los verdes azulados del cactus y los ocres ricos de la tierra mineralizada del Valle Sagrado.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Certificado N° BC-2026-PN</span>
              </div>

              {onOpenModal && (
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Conocer Módulo 01</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

