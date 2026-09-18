import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useTranslation } from 'react-i18next';

export const ImpactStoryScroll: React.FC = () => {
  const { t } = useTranslation();
  
  const IMPACT_STORIES = [
    {
      id: 'ecologico',
      title: t('impact.stories.ecologico.title'),
      subtitle: t('impact.stories.ecologico.subtitle'),
      description: t('impact.stories.ecologico.description'),
      imageUrl: '/assets/impacto/impacto_antropologico.jpg', // Keeping the original image path just in case
      accentColor: 'from-amber-900/80 to-sadhana-dark'
    },
    {
      id: 'social',
      title: t('impact.stories.social.title'),
      subtitle: t('impact.stories.social.subtitle'),
      description: t('impact.stories.social.description'),
      imageUrl: '/assets/impacto/impacto_social.jpg',
      accentColor: 'from-orange-800/80 to-sadhana-dark'
    },
    {
      id: 'economico',
      title: t('impact.stories.economico.title'),
      subtitle: t('impact.stories.economico.subtitle'),
      description: t('impact.stories.economico.description'),
      imageUrl: '/assets/impacto/impacto_economico.jpg',
      accentColor: 'from-emerald-900/80 to-sadhana-dark'
    },
    {
      id: 'educacion',
      title: t('impact.stories.educacion.title'),
      subtitle: t('impact.stories.educacion.subtitle'),
      description: t('impact.stories.educacion.description'),
      imageUrl: '/assets/impacto/impacto_educacion.jpg',
      accentColor: 'from-blue-900/80 to-sadhana-dark'
    },
    {
      id: 'tecnologico',
      title: t('impact.stories.tecnologico.title'),
      subtitle: t('impact.stories.tecnologico.subtitle'),
      description: t('impact.stories.tecnologico.description'),
      imageUrl: '/assets/impacto/impacto_tecnologico.jpg',
      accentColor: 'from-purple-900/80 to-sadhana-dark'
    },
    {
      id: 'espiritual',
      title: t('impact.stories.espiritual.title'),
      subtitle: t('impact.stories.espiritual.subtitle'),
      description: t('impact.stories.espiritual.description'),
      imageUrl: '/assets/impacto/impacto_espiritual.jpg',
      accentColor: 'from-indigo-900/80 to-sadhana-dark'
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;
    
    // Configurar scroll horizontal con GSAP
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.impact-slide');
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // suavidad de scroll
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.2, max: 0.8 },
            delay: 0.1,
            ease: 'power1.inOut'
          },
          // Distancia de scroll: igual al ancho total para un ratio 1:1 de scroll natural
          end: () => `+=${sliderRef.current?.offsetWidth || window.innerWidth * slides.length}`
        }
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="relative bg-sadhana-dark text-white overflow-hidden">
      
      {/* Intro Overlay / Título fijo superior */}
      <div className="absolute top-12 left-0 w-full z-10 pointer-events-none px-6 md:px-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-sadhana-sand opacity-90">
          Impacto Integral
        </h2>
        <div className="w-12 h-0.5 bg-sadhana-primary mx-auto mt-4 opacity-50" />
      </div>

      {/* The Pinning Container */}
      <div ref={containerRef} className="h-screen w-full relative">
        
        {/* The Horizontal Slider */}
        <div 
          ref={sliderRef}
          className="flex h-full w-[600vw]" // 6 slides = 600vw
        >
          {IMPACT_STORIES.map((story, index) => (
            <div 
              key={story.id} 
              className="impact-slide h-screen w-screen relative flex items-center justify-center shrink-0"
            >
              {/* Imagen de fondo hiperrealista */}
              <div className="absolute inset-0">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover object-[center_30%] animate-ken-burns"
                />
                {/* Gradiente de oscurecimiento suave para no saturar la imagen */}
                <div className={`absolute inset-0 bg-gradient-to-t ${story.accentColor} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-sadhana-dark/30" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sadhana-dark to-transparent opacity-80" />
              </div>

              {/* Contenido Narrativo */}
              <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col items-start text-left">
                
                {/* Número del slide (01, 02...) */}
                <div className="text-5xl md:text-8xl font-black text-white/10 tracking-tighter mb-2 md:mb-8 font-serif italic">
                  0{index + 1}
                </div>
                
                <h4 className="text-sadhana-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-lg mb-2">
                  {story.subtitle}
                </h4>
                
                <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-8 leading-tight drop-shadow-lg">
                  {story.title}
                </h3>
                
                <p className="text-sadhana-sand/90 text-sm md:text-2xl max-w-3xl leading-relaxed font-medium md:pl-6 md:border-l-4 border-sadhana-primary/50 drop-shadow-md">
                  {story.description}
                </p>
              </div>

              {/* Indicador de Swipe/Scroll sutil */}
              {index < IMPACT_STORIES.length - 1 && (
                <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 text-white/50 flex items-center gap-2 md:gap-4 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
                  <span>Scroll</span>
                  <div className="w-8 md:w-12 h-px bg-white/50 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-r border-white/50 rotate-45 transform origin-center" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
