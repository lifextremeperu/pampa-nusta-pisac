import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMPACT_STORIES = [
  {
    id: 'antropologico',
    title: 'Legado Antropológico',
    subtitle: 'Preservación de la Cultura Viva',
    description: 'Rescatamos y documentamos tradiciones milenarias, protegiendo la identidad andina frente a la globalización. Un puente vivo entre los sabios ancestrales y las nuevas generaciones.',
    imageUrl: '/assets/impacto/impacto_antropologico.jpg',
    accentColor: 'from-amber-900/80 to-sadhana-dark'
  },
  {
    id: 'social',
    title: 'Impacto Comunitario',
    subtitle: 'Empoderamiento Local',
    description: 'Generamos fuentes de trabajo dignas y sostenibles para las familias de Pisac, integrando a la comunidad local en todas las fases de bioconstrucción, agricultura y hospitalidad.',
    imageUrl: '/assets/impacto/impacto_social.jpg',
    accentColor: 'from-orange-800/80 to-sadhana-dark'
  },
  {
    id: 'economico',
    title: 'Economía Circular',
    subtitle: 'Prosperidad Sostenible',
    description: 'Fomentamos un ecosistema económico donde los recursos se reutilizan. Apoyamos el comercio justo, el consumo de productos orgánicos locales y la independencia financiera comunitaria.',
    imageUrl: '/assets/impacto/impacto_economico.jpg',
    accentColor: 'from-yellow-700/80 to-sadhana-dark'
  },
  {
    id: 'tecnologico',
    title: 'Innovación Ecológica',
    subtitle: 'Bioconstrucción y Energía Limpia',
    description: 'Fusionamos ingeniería ancestral con tecnología de vanguardia. Utilizamos barro, madera local y energía limpia para crear infraestructuras que respetan y se funden con el paisaje.',
    imageUrl: '/assets/impacto/impacto_tecnologico.jpg',
    accentColor: 'from-emerald-900/80 to-sadhana-dark'
  },
  {
    id: 'educacion',
    title: 'Conocimiento Compartido',
    subtitle: 'La Escuela Viva',
    description: 'Nuestras terrazas de permacultura son aulas abiertas. Educamos a niños y adultos sobre biodiversidad, botánica sagrada y técnicas milenarias de conservación de semillas nativas.',
    imageUrl: '/assets/impacto/impacto_educacion.jpg',
    accentColor: 'from-green-800/80 to-sadhana-dark'
  },
  {
    id: 'espiritual',
    title: 'El Principio del Ayni',
    subtitle: 'Reciprocidad Absoluta',
    description: 'Todo lo que tomamos de la Pachamama se lo devolvemos con gratitud profunda. A través de despachos, ceremonias y trabajo sagrado, mantenemos el equilibrio espiritual del Valle.',
    imageUrl: '/assets/impacto/impacto_espiritual.jpg',
    accentColor: 'from-purple-900/80 to-sadhana-dark'
  }
];

export const ImpactStoryScroll: React.FC = () => {
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
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradiente de oscurecimiento */}
                <div className={`absolute inset-0 bg-gradient-to-t ${story.accentColor} opacity-90 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/40" />
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
