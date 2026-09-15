import React, { useRef } from 'react';
import { Award, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TRIPADVISOR_REVIEWS } from '../data/mockData';

export const SocialProofSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.6, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.6, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonios" className="relative py-32 md:py-48 bg-sadhana-sand/20 text-sadhana-dark overflow-hidden">
      
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-sadhana-primary font-bold mb-8">
            03 — Voces de la Comunidad
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-sadhana-dark mb-8">
            RESEÑAS & <br />
            <span className="text-sadhana-sand">TESTIMONIOS</span>
          </h2>
          
          <a 
            href="https://www.tripadvisor.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full border border-sadhana-dark/10 hover:border-[#34E0A1] hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#34E0A1] flex items-center justify-center shrink-0">
               <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                 <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4 12.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm8 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
               </svg>
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] text-sadhana-dark/50 font-bold tracking-[0.2em] uppercase leading-none mb-1">TripAdvisor</span>
              <span className="text-sm text-sadhana-dark font-black tracking-widest uppercase group-hover:text-[#34E0A1] transition-colors leading-none">Pampa Ñusta</span>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={scrollLeft}
            className="w-16 h-16 rounded-full border border-sadhana-dark/20 flex items-center justify-center hover:bg-sadhana-dark hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-16 h-16 rounded-full border border-sadhana-dark/20 flex items-center justify-center hover:bg-sadhana-dark hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:gap-8 px-6 md:px-12 pb-12 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRIPADVISOR_REVIEWS.map((review, idx) => (
          <div 
            key={idx}
            className="snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[22vw] flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-4 text-sadhana-orange">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sadhana-orange" />
                ))}
              </div>
              <h3 className="font-serif italic text-xl md:text-2xl lg:text-3xl text-sadhana-dark leading-tight mb-4">
                «{review.title}»
              </h3>
              <p className="text-sm md:text-base text-sadhana-brown/80 font-medium leading-relaxed mb-8 max-w-2xl">
                {review.comment}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-sadhana-dark/10">
              <img
                src={review.avatarUrl}
                alt={review.author}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover grayscale"
              />
              <div>
                <span className="font-bold text-lg text-sadhana-dark block uppercase tracking-wide">
                  {review.author}
                </span>
                <span className="text-xs text-sadhana-primary font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                  {review.countryFlag} {review.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
