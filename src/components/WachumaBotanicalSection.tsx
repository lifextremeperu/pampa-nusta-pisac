import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import gsap from 'gsap';

interface WachumaVariety {
  id: string;
  title: string;
  subtitle: string;
  video: string;
}

const WACHUMA_VARIETIES: WachumaVariety[] = [
  {
    id: '01',
    title: 'LINAJE ANCESTRAL',
    subtitle: 'Trichocereus Pachanoi · 7 y 8 Costillas',
    video: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/18/The_Andes.webm/The_Andes.webm.720p.vp9.webm',
  },
  {
    id: '02',
    title: 'FLORACIÓN NOCTURNA',
    subtitle: 'El Despertar de la Reina',
    video: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/14/Cactus_Flower_Blooming.webm/Cactus_Flower_Blooming.webm.720p.vp9.webm',
  },
  {
    id: '03',
    title: 'RESERVA GENÉTICA',
    subtitle: 'Esquejes Madre en Custodia',
    video: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ea/Macchu_Picchu_Timelapse.webm/Macchu_Picchu_Timelapse.webm.720p.vp9.webm',
  }
];

interface WachumaBotanicalSectionProps {
  onOpenModal?: (id: string) => void;
}

export const WachumaBotanicalSection: React.FC<WachumaBotanicalSectionProps> = ({ onOpenModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  
  // Auto cycle logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WACHUMA_VARIETIES.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(interval);
  }, []);

  // Title animations on change
  useEffect(() => {
    WACHUMA_VARIETIES.forEach((_, idx) => {
      const el = titlesRef.current[idx];
      if (el) {
        if (idx === activeIndex) {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0, rotateX: -35, scale: 0.9 },
            { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
          );
        } else {
          gsap.to(el, {
            y: -50, opacity: 0, duration: 0.6, ease: 'power3.in'
          });
        }
      }
    });
  }, [activeIndex]);

  return (
    <section id="botanica-sagrada" className="relative w-full h-screen overflow-hidden bg-sadhana-dark text-white">
      {/* Background Images with Ken Burns Effect */}
      {WACHUMA_VARIETIES.map((variety, idx) => (
        <div 
          key={variety.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* 
            Ken Burns Effect: 
            The video scales from 1 to 1.1 very slowly while active. 
            When inactive, it returns to normal scale.
          */}
          <video 
            src={variety.video}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-transform ease-out will-change-transform ${
              idx === activeIndex ? 'scale-110 duration-[20000ms]' : 'scale-100 duration-1000'
            }`}
          />
          {/* Overlay to ensure text readability & cinematic feel */}
          <div className="absolute inset-0 bg-sadhana-dark/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-transparent to-sadhana-dark/30" />
        </div>
      ))}

      {/* Noise Overlay Effect (1820productions style) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/6891a5aecbde722a4a9adbba/6894193b0e7e93e86b69656d_noise.png)' }}></div>

      {/* Main Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center items-center px-6 md:px-12 text-center">
        
        {/* Top Tagline */}
        <div className="absolute top-32 left-0 w-full flex justify-center z-40">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sadhana-primary/30 bg-sadhana-primary/10 text-sadhana-sand text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono font-bold shadow-sm backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>01 — Banco Genético de Pisac</span>
          </div>
        </div>

        <div className="relative h-[250px] w-full flex justify-center items-center mt-12">
          {WACHUMA_VARIETIES.map((variety, idx) => (
            <div 
              key={`title-${variety.id}`} 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${idx === activeIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {/* Title that receives animation */}
              <div ref={el => titlesRef.current[idx] = el} className="opacity-0">
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-lg mb-4 leading-none">
                  {variety.title}
                </h2>
                <p className="text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] font-medium text-sadhana-sand/90 uppercase mb-12">
                  {variety.subtitle}
                </p>
                
                {/* Action Button */}
                {onOpenModal && (
                  <div className="flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                    <button 
                      onClick={() => onOpenModal(`wachuma-${variety.id}`)}
                      className="group relative flex items-center gap-4 border border-sadhana-primary/40 rounded-full px-6 md:px-8 py-3 md:py-4 bg-sadhana-dark/40 hover:bg-sadhana-primary backdrop-blur-sm transition-all duration-500"
                    >
                      <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white group-hover:text-white">
                        Explorar Ficha Técnica
                      </span>
                      <ArrowRight className="w-4 h-4 text-sadhana-primary group-hover:text-white transition-colors" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Component (Bottom Timeline) */}
      <div className="absolute bottom-0 left-0 w-full z-40 px-6 md:px-12 pb-8 flex items-end justify-between">
        
        {/* Left Side: Dynamic Numbers */}
        <div className="w-12 h-6 overflow-hidden relative">
          {WACHUMA_VARIETIES.map((variety, idx) => (
            <span 
              key={`num-${variety.id}`}
              className={`absolute top-0 left-0 text-sm font-bold font-mono tracking-widest transition-transform duration-500 ${
                idx === activeIndex ? 'translate-y-0 opacity-100 text-sadhana-primary' : idx < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
              }`}
            >
              {variety.id}
            </span>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="flex-1 max-w-lg mx-8 flex gap-4 items-center">
          {WACHUMA_VARIETIES.map((_, idx) => (
            <div key={`progress-${idx}`} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={() => setActiveIndex(idx)}>
              <div 
                className="h-full bg-sadhana-primary transition-all ease-linear"
                style={{
                  width: idx === activeIndex ? '100%' : idx < activeIndex ? '100%' : '0%',
                  transitionDuration: idx === activeIndex ? '7s' : '0.3s'
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Total */}
        <div className="text-sm font-bold font-mono tracking-widest text-white/50">
          0{WACHUMA_VARIETIES.length}
        </div>
      </div>
    </section>
  );
};
