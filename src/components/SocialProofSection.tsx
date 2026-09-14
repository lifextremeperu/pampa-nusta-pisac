import React, { useState } from 'react';
import { Star, Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TRIPADVISOR_REVIEWS } from '../data/mockData';

export const SocialProofSection: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const activeReview = TRIPADVISOR_REVIEWS[currentReviewIndex];

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % TRIPADVISOR_REVIEWS.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + TRIPADVISOR_REVIEWS.length) % TRIPADVISOR_REVIEWS.length);
  };

  return (
    <section id="testimonios" className="relative py-24 bg-sadhana-bg text-sadhana-dark border-b border-sadhana-dark/5 overflow-hidden">
      {/* Cinematic ambient background glow -> Natural soft glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sadhana-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/10 text-sadhana-dark text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>TESTIMONIOS Y RECONOCIMIENTO INTERNACIONAL</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-sadhana-dark">
            Voces de la Comunidad & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sadhana-primary to-sadhana-orange">Experiencias en Pisac</span>
          </h2>
          <p className="mt-4 text-sadhana-brown/80 text-sm sm:text-base leading-relaxed font-sans font-medium">
            Elogios y testimonios internacionales de visitantes en el santuario y la ecoaldea en el Valle Sagrado.
          </p>
        </div>

        {/* Reviews Card Centered */}
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-sadhana-dark/10 shadow-2xl relative overflow-hidden">
            {/* Cinematic light flare top -> Subtle primary flare */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sadhana-primary/30 to-transparent" />
            
            <div className="flex items-center justify-between pb-4 border-b border-sadhana-dark/5 mb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-sadhana-sand border border-sadhana-primary/20 flex items-center justify-center text-sadhana-primary shadow-sm">
                  <Quote className="w-4 h-4 fill-sadhana-primary" />
                </div>
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider text-sadhana-orange font-mono">
                    Opiniones de la Audiencia
                  </span>
                  <h3 className="font-sans text-base font-bold text-sadhana-dark">Pisac & Ecoaldea Pampa Ñusta</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-sadhana-sand/50 px-2.5 py-1 rounded-lg border border-sadhana-dark/5">
                <Star className="w-4 h-4 fill-sadhana-orange text-sadhana-orange" />
                <span className="font-mono font-bold text-sm text-sadhana-dark">4.9 / 5.0</span>
              </div>
            </div>

            {/* Active Review Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-sadhana-dark/5 min-h-[200px] flex flex-col justify-between shadow-sm">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeReview.avatarUrl}
                      alt={activeReview.author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-sadhana-sand p-0.5 shadow-sm"
                    />
                    <div>
                      <span className="font-bold text-sm text-sadhana-dark block">{activeReview.author}</span>
                      <span className="text-[11px] text-sadhana-brown/70 font-mono font-medium">
                        {activeReview.countryFlag} {activeReview.country} · {activeReview.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-sadhana-orange">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-sadhana-orange" />
                    ))}
                  </div>
                </div>

                <h4 className="font-sans text-base sm:text-lg font-bold text-sadhana-primary mb-2">
                  «{activeReview.title}»
                </h4>
                <p className="text-sm sm:text-base text-sadhana-brown/90 leading-relaxed font-sans font-medium italic">
                  {activeReview.comment}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-sadhana-dark/5 flex items-center justify-between text-xs text-sadhana-brown/60 font-mono font-bold">
                <span>{activeReview.helpfulCount} viajeros coinciden con esta reseña</span>
                <span className="text-sadhana-primary font-bold flex items-center gap-1.5"><Award className="w-3 h-3" /> Experiencia Verificada</span>
              </div>
            </div>

            {/* Review Carousel Controls */}
            <div className="flex items-center justify-between mt-6 relative z-10">
              <span className="text-xs font-mono text-sadhana-brown/60 font-bold tracking-widest uppercase">
                Testimonio {currentReviewIndex + 1} de {TRIPADVISOR_REVIEWS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevReview}
                  className="p-3 rounded-xl bg-white border border-sadhana-dark/10 text-sadhana-brown/70 hover:text-sadhana-primary hover:border-sadhana-primary/30 hover:bg-sadhana-sand/30 transition-all cursor-pointer shadow-sm"
                  aria-label="Opinión anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="p-3 rounded-xl bg-white border border-sadhana-dark/10 text-sadhana-brown/70 hover:text-sadhana-primary hover:border-sadhana-primary/30 hover:bg-sadhana-sand/30 transition-all cursor-pointer shadow-sm"
                  aria-label="Siguiente opinión"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
