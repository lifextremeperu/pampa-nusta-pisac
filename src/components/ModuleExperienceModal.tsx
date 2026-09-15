import React, { useState } from 'react';
import { X, Check, Calendar, Users, HeartHandshake, MessageCircle, Target, Sparkles, Milestone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EcoaldeaModule } from '../types';

interface ModuleExperienceModalProps {
  module: EcoaldeaModule | null;
  onClose: () => void;
}

export const ModuleExperienceModal: React.FC<ModuleExperienceModalProps> = ({ module, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [participants, setParticipants] = useState(1);
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('USD');
  const [isBooked, setIsBooked] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  if (!module) return null;

  const YAPE_WHATSAPP_NUMBER = '51958050928';
  const getWhatsAppBookingUrl = () => {
    const text = `¡Hola Santuario Pampa Ñusta! Deseo sumarme al módulo "${module.title}" para ${participants} persona(s) con fecha ${selectedDate}. Mi nombre es ${contactName || 'Hermano de la Tierra'} y deseo coordinar mi aporte por Yape / Plin.`;
    return `https://wa.me/${YAPE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const basePricesUSD: Record<string, number> = { wachuma: 65, semillas: 40, ninos: 50, ceremonias: 190, talleres: 380 };
  const unitPriceUSD = basePricesUSD[module.id.split('-')[0]] || 80;
  const exchangeRate = 3.75;
  const unitPrice = currency === 'USD' ? unitPriceUSD : Math.round(unitPriceUSD * exchangeRate);
  const totalPrice = unitPrice * participants;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#34E0A1', '#FF7A00', '#ffffff'] });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-0 md:p-6 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-sadhana-dark border border-white/10 md:rounded-[40px] overflow-hidden shadow-2xl h-full flex flex-col">
        
        {/* Sticky Header with Close Button */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[60]">
          <button 
            onClick={onClose} 
            className="p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-sadhana-primary hover:text-sadhana-dark transition-all backdrop-blur-md border border-white/20 hover:scale-110 cursor-pointer"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div 
          className="overflow-y-auto flex-1 relative w-full h-full pb-20 md:pb-0 scrollbar-thin scrollbar-thumb-sadhana-primary/50 scrollbar-track-black/20"
          data-lenis-prevent="true"
        >
          
          {/* Hero Cinematic Section */}
          <div className="relative h-[45vh] md:h-[60vh] w-full shrink-0">
            <img 
              src={module.imageUrl} 
              alt={module.title} 
              className="w-full h-full object-cover filter brightness-[0.6] contrast-125" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4 md:mb-6">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-sadhana-primary" />
                <span className="text-[9px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">{module.badge}</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4 md:mb-8 drop-shadow-2xl">
                {module.title}
              </h2>
              
              <p className="text-sm md:text-xl lg:text-3xl text-sadhana-sand font-serif italic max-w-4xl leading-relaxed border-l-4 border-sadhana-primary pl-4 md:pl-6">
                «{module.neuromarketingHook}»
              </p>
            </div>
          </div>

          {/* Body Content - The Story */}
          <div className="px-5 py-10 md:px-8 md:py-16 lg:p-24 space-y-16 md:space-y-24 bg-sadhana-dark">
            
            {/* Vision & Mission */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-xs font-mono text-sadhana-primary tracking-[0.4em] uppercase mb-6 font-bold flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-sadhana-primary"></span>
                  La Visión
                </h3>
                <p className="text-sadhana-sand/90 text-lg md:text-xl leading-relaxed font-medium">
                  {module.projectVision}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {module.keyHighlights?.map((highlight, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-sadhana-sand">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {module.gallery?.map((img, idx) => (
                  <img key={idx} src={img} alt="Gallery" className="w-full h-48 md:h-64 object-cover rounded-3xl border border-white/10 hover:scale-105 transition-transform duration-500" />
                ))}
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-white/5 rounded-3xl md:rounded-[40px] p-6 md:p-16 border border-white/5 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-sadhana-primary/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-[10px] md:text-xs font-mono text-sadhana-primary tracking-[0.4em] uppercase mb-8 md:mb-12 font-bold flex items-center gap-4">
                <Target className="w-5 h-5" /> Objetivos Fundamentales
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                {module.objectives?.map((obj, idx) => (
                  <div key={idx} className="flex flex-col gap-3 md:gap-4">
                    <span className="text-4xl md:text-5xl font-black text-white/10 leading-none">0{idx + 1}</span>
                    <p className="text-white text-sm md:text-base leading-relaxed font-medium">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-[10px] md:text-xs font-mono text-sadhana-primary tracking-[0.4em] uppercase mb-10 md:mb-16 font-bold flex items-center justify-center gap-4 text-center">
                <Milestone className="w-5 h-5" /> Mapa de Ruta del Proyecto
              </h3>
              
              <div className="relative border-l border-white/20 ml-3 md:ml-12 space-y-12 md:space-y-16">
                {module.roadmap?.map((step, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-16">
                    {/* Glowing Dot */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-sadhana-dark border-2 border-sadhana-primary shadow-[0_0_20px_rgba(52,224,161,0.6)]" />
                    
                    <span className="text-[9px] md:text-[10px] font-mono text-sadhana-orange tracking-[0.3em] uppercase font-bold block mb-2 md:mb-3">
                      {step.phase}
                    </span>
                    <h4 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-4">{step.title}</h4>
                    <p className="text-sadhana-sand/70 text-sm md:text-base leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Area (Reservation / Support) */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl md:rounded-[40px] p-6 md:p-16 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              
              <div className="text-center mb-10 md:mb-12">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">Involúcrate en este Capítulo</h3>
                <p className="text-sadhana-sand/80 text-sm md:text-lg max-w-2xl mx-auto">Únete a nuestra misión. Selecciona tu fecha de inmersión y asegura tu lugar en la historia de Pampa Ñusta.</p>
              </div>

              {!isBooked ? (
                <form onSubmit={handleConfirm} className="max-w-2xl mx-auto space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date Selector */}
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                      <label className="block text-xs font-mono text-sadhana-sand/50 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                        <Calendar className="w-4 h-4 text-sadhana-primary" /> Fecha de Inmersión
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min="2026-10-01"
                        className="w-full bg-transparent border-b border-white/20 text-white font-mono text-lg focus:outline-none focus:border-sadhana-primary py-2"
                        required
                      />
                    </div>

                    {/* Participants */}
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                      <label className="block text-xs font-mono text-sadhana-sand/50 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                        <Users className="w-4 h-4 text-sadhana-primary" /> Participantes
                      </label>
                      <div className="flex items-center justify-between bg-white/5 rounded-xl border border-white/10 p-1">
                        <button type="button" onClick={() => setParticipants((p) => Math.max(1, p - 1))} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-sadhana-primary text-white flex items-center justify-center font-bold transition-colors">-</button>
                        <span className="font-mono text-xl font-bold text-white">{participants}</span>
                        <button type="button" onClick={() => setParticipants((p) => Math.min(8, p + 1))} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-sadhana-primary text-white flex items-center justify-center font-bold transition-colors">+</button>
                      </div>
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" placeholder="Nombre Completo" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-sadhana-primary transition-colors" required />
                    <input type="email" placeholder="Correo Electrónico" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-sadhana-primary transition-colors" required />
                  </div>

                  {/* Currency & Total */}
                  <div className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5">
                    <div className="flex flex-col gap-2">
                      <span className="text-sadhana-sand/50 text-[10px] font-mono tracking-widest uppercase">Moneda</span>
                      <div className="flex bg-white/10 rounded-lg p-1">
                        <button type="button" onClick={() => setCurrency('USD')} className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-colors ${ currency === 'USD' ? 'bg-sadhana-primary text-sadhana-dark' : 'text-white hover:bg-white/10'}`}>USD</button>
                        <button type="button" onClick={() => setCurrency('PEN')} className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-colors ${ currency === 'PEN' ? 'bg-sadhana-primary text-sadhana-dark' : 'text-white hover:bg-white/10'}`}>PEN</button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-sadhana-sand/50 block font-mono tracking-widest uppercase mb-1">Aporte Total</span>
                      <span className="text-4xl font-black text-sadhana-primary">
                        {currency === 'USD' ? `$${totalPrice}` : `S/${totalPrice}`}
                      </span>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="space-y-4 pt-4">
                    <button type="submit" className="w-full py-5 rounded-2xl bg-sadhana-primary hover:bg-white text-sadhana-dark font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(52,224,161,0.3)]">
                      <span>{module.ctaText}</span>
                    </button>

                    <a href={getWhatsAppBookingUrl()} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all">
                      <MessageCircle className="w-5 h-5" />
                      <span>Coordinar por WhatsApp (+51 958 050 928)</span>
                    </a>
                  </div>
                </form>
              ) : (
                /* Digital Certificate / Pase Ceremonial */
                <div className="max-w-md mx-auto p-8 rounded-3xl bg-black/40 border border-sadhana-primary/50 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-sadhana-primary/20 border border-sadhana-primary flex items-center justify-center animate-bounce">
                    <Check className="w-10 h-10 text-sadhana-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-sadhana-primary font-bold block mb-2">¡Pase Emitido!</span>
                    <h3 className="text-2xl font-black text-white">Bienvenido a la tribu, {contactName || 'Hermano'}</h3>
                    <p className="text-sadhana-sand/80 mt-4 text-sm leading-relaxed">
                      Se ha generado tu código sagrado. Te hemos enviado las pautas de inmersión a {contactEmail}.
                    </p>
                  </div>
                  <div className="space-y-4 pt-6">
                    <a href={getWhatsAppBookingUrl()} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg">
                      <MessageCircle className="w-5 h-5" /> Enviar constancia por WhatsApp
                    </a>
                    <button onClick={onClose} className="w-full py-4 rounded-xl bg-white/10 text-white hover:bg-white/20 font-bold text-xs uppercase tracking-widest transition-colors">
                      Cerrar y Volver
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
