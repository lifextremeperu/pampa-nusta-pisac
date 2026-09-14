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
    <section id="botanica-sagrada" className="py-20 bg-sadhana-bg text-sadhana-dark border-b border-sadhana-dark/10 relative overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sadhana-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sadhana-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Photographic Excellence & Sacred Sanctuary */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/10 text-sadhana-dark text-xs uppercase tracking-widest font-mono font-bold mb-3 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>FOTOGRAFÍA BOTÁNICA CINEMATOGRÁFICA · 3,347 MSNM</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-sadhana-dark leading-tight">
            Botánica Sagrada: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sadhana-primary to-sadhana-orange">Banco Genético Wachuma</span>
          </h2>
          
          <p className="mt-3 text-sadhana-brown/80 text-sm sm:text-base leading-relaxed font-sans font-medium">
            Santuario vivo de preservación genética del cactus sagrado <em>Trichocereus pachanoi</em>. Capturado con óptica cinematográfica, iluminación rasante del atardecer andino y enfoque selectivo para revelar la sagrada geometría mineral de las 7 y 8 costillas.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-sadhana-brown/60 uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sadhana-orange" /> Terrazas de Pisac, Cusco</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sadhana-primary" /> 14 Linajes Madres</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5 text-sadhana-dark" /> Revelado Fine-Art</span>
          </div>
        </div>

        {/* Main Grid: Master Photographic Showcase & Botanical Knowledge Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (7 cols): Master Photographic Suite & Studio Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border border-sadhana-dark/10 shadow-2xl bg-white flex flex-col">
              
              {/* Top Studio Control Bar */}
              <div className="bg-sadhana-sand/30 border-b border-sadhana-dark/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                {/* Photo Selector Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setActivePhotoId('master')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'master'
                        ? 'bg-sadhana-primary text-white shadow-md'
                        : 'bg-white text-sadhana-brown/70 hover:text-sadhana-dark hover:bg-sadhana-sand/50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Master Cinematográfico</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('closeup')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'closeup'
                        ? 'bg-sadhana-primary text-white shadow-md'
                        : 'bg-white text-sadhana-brown/70 hover:text-sadhana-dark hover:bg-sadhana-sand/50'
                    }`}
                  >
                    <Aperture className="w-3.5 h-3.5" />
                    <span>Macro Costillas</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('bloom')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'bloom'
                        ? 'bg-sadhana-primary text-white shadow-md'
                        : 'bg-white text-sadhana-brown/70 hover:text-sadhana-dark hover:bg-sadhana-sand/50'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Flor Nocturna</span>
                  </button>
                  <button
                    onClick={() => setActivePhotoId('field')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activePhotoId === 'field'
                        ? 'bg-sadhana-primary text-white shadow-md'
                        : 'bg-white text-sadhana-brown/70 hover:text-sadhana-dark hover:bg-sadhana-sand/50'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Bancales Vivos</span>
                  </button>
                </div>

                {/* Zoom Control */}
                <button
                  onClick={handleToggleZoom}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-sadhana-sand/50 text-sadhana-primary border border-sadhana-dark/10 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
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
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-sadhana-dark/10 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div>
                      <h3 className="font-sans text-base sm:text-lg font-bold text-sadhana-dark">
                        {currentPhoto.title}
                      </h3>
                      <p className="text-xs font-mono text-sadhana-primary italic">
                        {currentPhoto.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-sadhana-orange/10 border border-sadhana-orange/30 text-sadhana-orange text-[10px] font-mono shrink-0 font-bold">
                        Pisac · 3,347 msnm
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sadhana-brown/80 text-xs font-sans leading-relaxed mt-2 font-medium">
                    {currentPhoto.description}
                  </p>
                </div>
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
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-sadhana-dark/10 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div>
              {/* Dossier Tabs */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-sadhana-sand/30 rounded-xl mb-6 border border-sadhana-dark/5 shadow-inner">
                <button
                  onClick={() => setActiveTab('conservacion')}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'conservacion'
                      ? 'bg-white text-sadhana-primary shadow-sm border border-sadhana-dark/5'
                      : 'text-sadhana-brown/70 hover:text-sadhana-dark'
                  }`}
                >
                  Conservación
                </button>
                <button
                  onClick={() => setActiveTab('taxonomia')}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'taxonomia'
                      ? 'bg-white text-sadhana-primary shadow-sm border border-sadhana-dark/5'
                      : 'text-sadhana-brown/70 hover:text-sadhana-dark'
                  }`}
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => setActiveTab('ancestral')}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'ancestral'
                      ? 'bg-white text-sadhana-primary shadow-sm border border-sadhana-dark/5'
                      : 'text-sadhana-brown/70 hover:text-sadhana-dark'
                  }`}
                >
                  Cosmovisión
                </button>
                <button
                  onClick={() => setActiveTab('fotografia')}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'fotografia'
                      ? 'bg-white text-sadhana-primary shadow-sm border border-sadhana-dark/5'
                      : 'text-sadhana-brown/70 hover:text-sadhana-dark'
                  }`}
                >
                  Fotografía
                </button>
              </div>

              {/* Tab 1: Conservación */}
              {activeTab === 'conservacion' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sadhana-dark font-sans font-bold text-lg">
                    <ShieldCheck className="w-5 h-5 text-sadhana-primary" />
                    <h3>Objetivo del Banco Genético</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sadhana-brown/90 leading-relaxed font-medium">
                    Frente a la tala indiscriminada y el saqueo silvestre del cactus sagrado en los valles interandinos, Pampa Ñusta ha creado un <strong>banco de germoplasma vivo</strong> donde cada ejemplar es catalogado, cuidado y propagado asexualmente por esquejes madre.
                  </p>

                  <ul className="space-y-3 text-xs text-sadhana-brown/80 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                      <span><strong>Protección de Clones:</strong> Preservación de genotipos con 7 y 8 costillas sagradas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                      <span><strong>Riego por Gravedad:</strong> Canales incaicos de agua pura de manantial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sadhana-primary shrink-0 mt-0.5" />
                      <span><strong>Polinización Natural:</strong> Mantenimiento de corredores biológicos.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab 2: Taxonomía */}
              {activeTab === 'taxonomia' && (
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-sadhana-dark font-sans font-bold text-lg">
                    <Info className="w-5 h-5 text-sadhana-primary" />
                    <h3>Taxonomía & Biometría</h3>
                  </div>

                  <div className="bg-sadhana-sand/20 p-4 rounded-xl border border-sadhana-dark/10 space-y-3 text-sadhana-brown/80">
                    <div className="flex justify-between border-b border-sadhana-dark/10 pb-1.5">
                      <span className="text-sadhana-brown/60">Nombre Científico:</span>
                      <span className="font-bold text-sadhana-dark">Trichocereus pachanoi</span>
                    </div>
                    <div className="flex justify-between border-b border-sadhana-dark/10 pb-1.5">
                      <span className="text-sadhana-brown/60">Sinónimo Aceptado:</span>
                      <span>Echinopsis pachanoi</span>
                    </div>
                    <div className="flex justify-between border-b border-sadhana-dark/10 pb-1.5">
                      <span className="text-sadhana-brown/60">Nombre Quechua:</span>
                      <span className="font-bold text-sadhana-primary">Achuma / Wachuma</span>
                    </div>
                    <div className="flex justify-between border-b border-sadhana-dark/10 pb-1.5">
                      <span className="text-sadhana-brown/60">Distribución Hábitat:</span>
                      <span>2,000 - 3,400 msnm</span>
                    </div>
                    <div className="flex justify-between border-b border-sadhana-dark/10 pb-1.5">
                      <span className="text-sadhana-brown/60">Crecimiento Anual:</span>
                      <span>30 - 45 cm / año</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sadhana-brown/60">Floración:</span>
                      <span className="text-sadhana-orange">Nocturna, 19-24 cm, blanca</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Cosmovisión */}
              {activeTab === 'ancestral' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sadhana-dark font-sans font-bold text-lg">
                    <Moon className="w-5 h-5 text-sadhana-primary" />
                    <h3>El Guardián de la Visión Andina</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sadhana-brown/90 leading-relaxed font-medium">
                    Representado en los monolitos de la cultura <strong>Chavín de Huántar</strong> desde hace más de 3,000 años, la Wachuma era considerada la llave para conectar el <em>Kay Pacha</em> (mundo del presente) con el <em>Hanan Pacha</em> (mundo espiritual).
                  </p>

                  <div className="p-3.5 rounded-xl bg-sadhana-orange/10 border border-sadhana-orange/20 text-sadhana-dark text-xs">
                    <p className="font-bold mb-1 text-sadhana-orange">Rito de Agradecimiento:</p>
                    <p className="text-sadhana-brown/80 font-medium">
                      Antes de cualquier poda, realizamos el <em>Kintu</em> (ofrenda de 3 hojas de coca) pidiendo permiso a los Apus Linli y Pachatusan.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: Fotografía */}
              {activeTab === 'fotografia' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sadhana-dark font-sans font-bold text-lg">
                    <Camera className="w-5 h-5 text-sadhana-primary" />
                    <h3>Tratamiento Fotográfico Experto</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sadhana-brown/90 leading-relaxed font-medium">
                    Aplicamos técnicas cinematográficas para elevar la imagen del Wachuma a obra de arte:
                  </p>

                  <div className="space-y-3 text-xs text-sadhana-brown/80">
                    <div className="p-2.5 rounded-lg bg-sadhana-sand/30 border border-sadhana-dark/5">
                      <span className="font-bold text-sadhana-primary block mb-0.5">1. Iluminación Rasante:</span>
                      <span className="font-medium">Aprovecha la luz dorada del sol cayendo sobre el Apu Linli para esculpir la silueta.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sadhana-sand/30 border border-sadhana-dark/5">
                      <span className="font-bold text-sadhana-orange block mb-0.5">2. Enfoque Selectivo:</span>
                      <span className="font-medium">Desenfoque óptico gradual f/1.8, haciendo que las espinas y cutícula resalten.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sadhana-sand/30 border border-sadhana-dark/5">
                      <span className="font-bold text-sadhana-dark block mb-0.5">3. Colorimetría Fiel:</span>
                      <span className="font-medium">Separación tonal entre los verdes azulados del cactus y la tierra mineralizada.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-sadhana-dark/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-sadhana-brown/60 flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-sadhana-primary" />
                <span>Certificado N° BC-2026-PN</span>
              </div>

              {onOpenModal && (
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sadhana-primary hover:bg-sadhana-primary/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
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

