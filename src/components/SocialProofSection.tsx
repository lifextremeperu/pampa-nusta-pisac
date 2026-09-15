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
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-sadhana-dark">
            RESEÑAS & <br />
            <span className="text-sadhana-sand">TESTIMONIOS</span>
          </h2>
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
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 md:gap-16 px-6 md:px-12 pb-12 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRIPADVISOR_REVIEWS.map((review, idx) => (
          <div 
            key={idx}
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-8 text-sadhana-orange">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-sadhana-orange" />
                ))}
              </div>
              <h3 className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-sadhana-dark leading-tight mb-8">
                «{review.title}»
              </h3>
              <p className="text-lg md:text-xl text-sadhana-brown/80 font-medium leading-relaxed mb-12 max-w-2xl">
                {review.comment}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-sadhana-dark/10">
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
