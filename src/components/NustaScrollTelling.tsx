import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const NUSTA_SLIDES = [
  {
    id: 'intro',
    title: 'Leyenda de la Ñusta Encantada',
    subtitle: 'DOCUMENTAL ORIGINAL: MEMORIA ANCESTRAL',
    description: 'Inquill Chumpi y el príncipe Asto Rímac: amor, pacto con los Apus y la transmutación en guardianes pétreos de la siembra en Pisac.',
    imageUrl: '/assets/nusta/intro.jpg',
    accentColor: 'from-amber-900/80 to-sadhana-dark',
    progress: 'Memoria Viva'
  },
  {
    id: 'piedras',
    title: 'Energía Femenina & Masculina',
    subtitle: 'MONOLITOS TUTELARES DE PISAC',
    description: 'La Ñusta y el Príncipe transmutados en roca viva, enseñando la siembra sagrada (Tarpuy) a los niños y al pueblo andino.',
    imageUrl: '/assets/nusta/piedras.jpg',
    accentColor: 'from-orange-900/80 to-sadhana-dark',
    progress: 'Dualidad Yanantin'
  },
  {
    id: 'acto1',
    title: 'El Desafío Imposible',
    subtitle: 'ACTO 01 · 0% ROCA',
    description: 'Huayllapumap Sasa Munaynin. El cacique exigió construir en una sola noche un puente de piedra o los andenes para probar el valor del príncipe. La princesa Inquill Chumpi rogó a los Apus por su amado.',
    imageUrl: '/assets/nusta/acto1.jpg',
    accentColor: 'from-rose-900/80 to-sadhana-dark',
    progress: '0% Roca',
    objectPosition: 'object-top'
  },
  {
    id: 'acto2',
    title: 'El Juramento de Asto Rímac',
    subtitle: 'ACTO 02 · 25% ROCA',
    description: 'Asto Rimacpa Tuta Ruwaynin. «Camina sin vacilar hacia la cima sagrada; si tus ojos buscan mi fatiga, la montaña reclamará nuestras almas.» Enamorado, el guerrero convoca a las fuerzas ocultas y a los Apus para levantar los pilares en la tiniebla.',
    imageUrl: '/assets/nusta/acto2.jpg',
    accentColor: 'from-indigo-900/80 to-sadhana-dark',
    progress: '25% Roca',
    objectPosition: 'object-top'
  },
  {
    id: 'acto3',
    title: 'La Mirada Prohibida',
    subtitle: 'ACTO 03 · 65% ROCA',
    description: 'Hark\'asqa Qaway. Casi al amanecer, con la obra a punto de culminar, Inquill Chumpi no pudo resistir y volteó a ver si su amado sobrevivía al esfuerzo titánico. El pacto con la montaña se rompió.',
    imageUrl: '/assets/nusta/acto3.jpg',
    accentColor: 'from-red-900/80 to-sadhana-dark',
    progress: '65% Roca',
    objectPosition: 'object-top'
  },
  {
    id: 'acto4',
    title: 'La Petrificación Eterna',
    subtitle: 'ACTO 04 · 100% ROCA',
    description: 'Wiñay Rumi Tukupuy. Ambos fueron convertidos en granito. Hoy, la Piedra Femenina custodia la fertilidad del agua, y la Piedra Masculina guía el calor del sol en los andenes, bendiciendo el Tarpuy Raymi.',
    imageUrl: '/assets/nusta/acto4.jpg',
    accentColor: 'from-stone-900/80 to-sadhana-dark',
    progress: '100% Roca',
    objectPosition: 'object-[center_15%]'
  }
];

export const NustaScrollTelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;
    
    // Configurar scroll horizontal con GSAP
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.nusta-slide');
      
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
    <section id="leyenda" className="relative bg-sadhana-dark text-white overflow-hidden font-sans">
      
      {/* Intro Overlay / Título fijo superior */}
      <div className="absolute top-8 left-0 w-full z-10 pointer-events-none px-6 md:px-12 text-center">
        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-sadhana-primary drop-shadow-md">
          Reseña Histórica
        </h2>
        <div className="w-12 h-px bg-sadhana-primary mx-auto mt-2 md:mt-4 opacity-50" />
      </div>

      {/* The Pinning Container */}
      <div ref={containerRef} className="h-screen w-full relative">
        
        {/* The Horizontal Slider */}
        <div 
          ref={sliderRef}
          className="flex h-full w-[600vw]" // 6 slides = 600vw
        >
          {NUSTA_SLIDES.map((story, index) => (
            <div 
              key={story.id} 
              className="nusta-slide group h-screen w-screen relative flex items-center justify-center shrink-0"
            >
              {/* Imagen de fondo hiperrealista */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.15, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={story.imageUrl} 
                  alt={story.title}
                  className={`w-full h-full object-cover animate-ken-burns transition-transform duration-[2000ms] group-hover:scale-110 ${story.objectPosition || 'object-center'}`}
                />
                
                {/* Efecto de Neblina Animado */}
                <div 
                  className="absolute inset-0 bg-white/20 mix-blend-screen pointer-events-none animate-fog-move blur-3xl"
                  style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)' }}
                />

                {/* Gradiente de oscurecimiento suave para que la foto se vea bien */}
                <div className={`absolute inset-0 bg-gradient-to-t ${story.accentColor} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-sadhana-dark/30" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sadhana-dark to-transparent opacity-80" />
              </div>

              {/* Contenido Narrativo */}
              <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col items-start text-left">
                
                {/* Porcentaje de transformación (estilo Neuromarketing) */}
                <div className="text-4xl md:text-7xl lg:text-8xl font-black text-white/20 tracking-tighter mb-4 font-cinzel">
                  {story.progress}
                </div>
                
                <h4 className="text-sadhana-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-sadhana-primary inline-block"></span>
                  {t(`nusta.story.${story.id}.subtitle`)}
                </h4>
                
                <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-8 leading-tight drop-shadow-lg">
                  {t(`nusta.story.${story.id}.title`)}
                </h3>
                
                <p className="text-base md:text-2xl text-sadhana-sand/90 font-light leading-relaxed max-w-3xl drop-shadow-md">
                  {t(`nusta.story.${story.id}.description`)}
                </p>
              </div>

              {/* Indicador de Swipe/Scroll sutil */}
              {index < NUSTA_SLIDES.length - 1 && (
                <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 text-white/50 flex items-center gap-2 md:gap-4 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
                  <span>Siguiente</span>
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
