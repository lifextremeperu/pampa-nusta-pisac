import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Navigation, MessageCircle, Zap } from 'lucide-react';
import { InterdimensionalJourney } from './InterdimensionalJourney';

export const LocationSection: React.FC = () => {
  const [showJourney, setShowJourney] = useState(false);
  const latitude = -13.407585;
  const longitude = -71.836324;
  const locationName = "Santuario Ecológico Pampa Ñusta, Pisac";
  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  
  const whatsappMessage = `¡Hola! Aquí tienes la ubicación exacta del ${locationName}:\n\n${googleMapsUrl}`;
  const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
    <section id="ubicacion" className="relative py-24 bg-sadhana-dark text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-sadhana-primary font-bold">
              04 — Coordenadas Sagradas
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-white drop-shadow-md">
            CÓMO <span className="text-sadhana-sand/80">LLEGAR</span>
          </h2>
        </div>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Map Container */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative h-[400px] md:h-[500px] group bg-black">
            {/* Overlay hint before interaction */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0 bg-sadhana-dark/20">
              <span className="bg-black/50 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase font-bold border border-white/20">
                Mapa Satelital Interactivo
              </span>
            </div>

            <iframe 
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              title="Ubicación Pampa Ñusta"
            ></iframe>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[400px] shadow-2xl">
            <div>
              <div className="w-12 h-12 bg-sadhana-primary/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-sadhana-primary/30">
                <MapPin className="w-6 h-6 text-sadhana-primary" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                Comunidad de Maska
              </h3>
              <p className="text-sadhana-sand/80 font-medium text-sm mb-6 leading-relaxed">
                A pocos minutos del pueblo de Pisac, enclavado en la pureza de las montañas del Valle Sagrado. Nuestro santuario ecológico todavía no figura con nombre en los mapas comerciales, pero estas coordenadas te guiarán directo a la puerta.
              </p>

              <div className="space-y-4 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <Navigation className="w-5 h-5 text-sadhana-primary shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="block text-[9px] font-mono text-sadhana-sand/60 uppercase tracking-widest mb-1">Coordenadas Exactas</span>
                    <span className="font-mono text-sm text-white font-bold">{latitude}, {longitude}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">

              {/* ── VER EL LUGAR (Viaje Interdimensional) ── */}
              <button
                onClick={() => setShowJourney(true)}
                className="w-full py-4 px-6 rounded-xl text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #0d4a1f, #1a2e50, #2d1a4a)',
                  border: '1px solid rgba(74,222,128,0.45)',
                  boxShadow: '0 0 22px rgba(74,222,128,0.25)',
                  animation: 'pulse-glow-loc 2.5s ease-in-out infinite',
                }}
              >
                <Zap className="w-4 h-4" style={{ color: '#4ade80' }} />
                <span style={{ background: 'linear-gradient(90deg,#4ade80,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Ver el Lugar
                </span>
              </button>

              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-sadhana-primary text-sadhana-dark hover:text-white font-sans font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg"
              >
                <span>Abrir en Maps</span>
                <Navigation className="w-4 h-4" />
              </a>

              <a 
                href={whatsappShareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-white font-sans font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all border border-[#25D366]/30 shadow-lg group"
              >
                <span>Enviar por WhatsApp</span>
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            {/* Alianza del Ayllu */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="block text-[10px] font-mono text-sadhana-primary uppercase tracking-[0.2em] font-bold mb-3">
                Alianza del Ayllu
              </span>
              <div className="bg-black/30 rounded-2xl p-4 border border-white/5 flex flex-col gap-3">
                <h4 className="text-white font-bold text-sm">Hospedaje Medicina Wallparisonqo</h4>
                <p className="text-sadhana-sand/70 text-xs leading-relaxed">
                  Refugio aliado para tu inmersión y dietas, ubicado en el corazón energético del valle.
                </p>
                <a 
                  href="https://maps.app.goo.gl/rcQ53jY81aDfykQo7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sadhana-primary text-xs font-bold hover:text-white transition-colors mt-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Ver Hospedaje en Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Journey portal */}
    {showJourney && createPortal(
      <InterdimensionalJourney onClose={() => setShowJourney(false)} />,
      document.body
    )}

    <style>{`
      @keyframes pulse-glow-loc {
        0%,100% { box-shadow: 0 0 22px rgba(74,222,128,0.25); }
        50%      { box-shadow: 0 0 36px rgba(74,222,128,0.55); }
      }
    `}</style>
    </>
  );
};
