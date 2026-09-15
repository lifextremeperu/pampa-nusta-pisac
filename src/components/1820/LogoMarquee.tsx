import React from 'react';

const PARTNERS = [
  "CERTIFICADO ORGÁNICO",
  "PERMACULTURA VIVA",
  "TURISMO RESPONSABLE",
  "PATRIMONIO ANDINO",
  "CONSERVACIÓN WACHUMA",
  "SANTUARIO ECOLÓGICO"
];

export const LogoMarquee = () => {
  return (
    <section className="relative py-6 md:py-8 bg-white overflow-hidden border-t border-b border-sadhana-sand/30">
      {/* Gradients to hide the edges for a smooth fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="relative flex w-[200%] md:w-max group">
        <div className="flex w-1/2 md:w-max justify-around animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
          {PARTNERS.map((partner, idx) => (
            <div key={`marquee-1-${idx}`} className="flex items-center justify-center px-12">
              <span className="text-sm md:text-lg font-black tracking-[0.3em] text-sadhana-primary opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                {partner}
              </span>
              {/* Separator Dot */}
              <span className="w-2 h-2 rounded-full bg-sadhana-primary ml-12 opacity-50" />
            </div>
          ))}
        </div>

        {/* Duplicate for infinite effect */}
        <div className="flex w-1/2 md:w-max justify-around animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
          {PARTNERS.map((partner, idx) => (
            <div key={`marquee-2-${idx}`} className="flex items-center justify-center px-12">
              <span className="text-sm md:text-lg font-black tracking-[0.3em] text-sadhana-primary opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                {partner}
              </span>
              <span className="w-2 h-2 rounded-full bg-sadhana-primary ml-12 opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
