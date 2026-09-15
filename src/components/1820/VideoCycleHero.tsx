import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
}

const SLIDES: Slide[] = [
  {
    id: '01',
    title: 'WACHUMA AL AMANECER',
    subtitle: 'El Despertar del Guía',
    videoUrl: 'https://videos.pexels.com/video-files/3015511/3015511-uhd_2560_1440_24fps.mp4',
  },
  {
    id: '02',
    title: 'COMUNIDAD SEMBRANDO',
    subtitle: 'Tarpuy Raymi',
    videoUrl: 'https://videos.pexels.com/video-files/2823136/2823136-uhd_2560_1440_24fps.mp4',
  },
  {
    id: '03',
    title: 'SABIDURÍA ANCESTRAL',
    subtitle: 'La Memoria de los Apus',
    videoUrl: 'https://videos.pexels.com/video-files/3246830/3246830-uhd_2560_1440_25fps.mp4',
  }
];

interface VideoCycleHeroProps {
  onOpenTrailer: () => void;
}

export const VideoCycleHero: React.FC<VideoCycleHeroProps> = ({ onOpenTrailer }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  
  // Auto cycle logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(interval);
  }, []);

  // Title animations on change
  useEffect(() => {
    SLIDES.forEach((_, idx) => {
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
    <section className="relative w-full h-screen overflow-hidden bg-sadhana-dark text-white">
      {/* Background Videos */}
      {SLIDES.map((slide, idx) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <video 
            src={slide.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability & cinematic feel */}
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>
      ))}

      {/* Noise Overlay Effect (1820productions style) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(https://cdn.prod.website-files.com/6891a5aecbde722a4a9adbba/6894193b0e7e93e86b69656d_noise.png)' }}></div>

      {/* Main Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center items-center px-6 md:px-12 text-center">
        <div className="relative h-[200px] w-full flex justify-center items-center">
          {SLIDES.map((slide, idx) => (
            <div 
              key={`title-${slide.id}`} 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${idx === activeIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {/* Title that receives animation */}
              <div ref={el => titlesRef.current[idx] = el} className="opacity-0">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-lg mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg tracking-[0.2em] font-medium text-sadhana-sand/90 uppercase">
                  {slide.subtitle}
                </p>
                
                {/* Play Button */}
                <div className="mt-8 flex justify-center opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                  <button 
                    onClick={onOpenTrailer}
                    className="group relative flex items-center gap-4 border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-sadhana-dark transition-all duration-500"
                  >
                    <span className="text-xs uppercase tracking-widest font-medium">Ver Documental</span>
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Component (Bottom Timeline) */}
      <div className="absolute bottom-0 left-0 w-full z-40 px-6 md:px-12 pb-8 flex items-end justify-between">
        
        {/* Left Side: Dynamic Numbers */}
        <div className="w-12 h-6 overflow-hidden relative">
          {SLIDES.map((slide, idx) => (
            <span 
              key={`num-${slide.id}`}
              className={`absolute top-0 left-0 text-sm font-medium tracking-widest transition-transform duration-500 ${
                idx === activeIndex ? 'translate-y-0 opacity-100' : idx < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
              }`}
            >
              {slide.id}
            </span>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="flex-1 max-w-lg mx-8 flex gap-4 items-center">
          {SLIDES.map((_, idx) => (
            <div key={`progress-${idx}`} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={() => setActiveIndex(idx)}>
              <div 
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width: idx === activeIndex ? '100%' : idx < activeIndex ? '100%' : '0%',
                  transitionDuration: idx === activeIndex ? '7s' : '0.3s'
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Side: Total */}
        <div className="text-sm font-medium tracking-widest text-white/50">
          0{SLIDES.length}
        </div>
      </div>
    </section>
  );
};
