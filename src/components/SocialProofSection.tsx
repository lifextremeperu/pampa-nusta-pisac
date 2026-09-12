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
    <section id="testimonios" className="relative py-16 bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>TESTIMONIOS Y RECONOCIMIENTO INTERNACIONAL</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Voces de la Comunidad & <span className="text-amber-800">Experiencias en Pisac</span>
          </h2>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed font-sans font-medium">
            Elogios y testimonios internacionales de visitantes en el santuario y la ecoaldea en el Valle Sagrado.
          </p>
        </div>

        {/* Reviews Card Centered */}
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider text-amber-800 font-mono">
                    Opiniones de la Audiencia
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-stone-950">Pisac & Ecoaldea Pampa Ñusta</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">
                <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
                <span className="font-mono font-bold text-sm text-amber-900">4.9 / 5.0</span>
              </div>
            </div>

            {/* Active Review Box */}
            <div className="relative p-5 rounded-2xl bg-white border border-stone-200 min-h-[170px] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeReview.avatarUrl}
                      alt={activeReview.author}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-stone-300"
                    />
                    <div>
                      <span className="font-semibold text-sm text-stone-900 block">{activeReview.author}</span>
                      <span className="text-xs text-stone-500 font-mono">
                        {activeReview.countryFlag} {activeReview.country} · {activeReview.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <h4 className="font-cinzel text-sm sm:text-base font-bold text-amber-900 mb-1.5">
                  «{activeReview.title}»
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">
                  {activeReview.comment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{activeReview.helpfulCount} personas coinciden con esta reseña</span>
                <span className="text-emerald-700 font-bold">Experiencia Verificada</span>
              </div>
            </div>

            {/* Review Carousel Controls */}
            <div className="flex items-center justify-between mt-5">
              <span className="text-xs font-mono text-stone-600 font-medium">
                Reseña {currentReviewIndex + 1} de {TRIPADVISOR_REVIEWS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevReview}
                  className="p-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer shadow-sm"
                  aria-label="Opinión anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="p-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer shadow-sm"
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
