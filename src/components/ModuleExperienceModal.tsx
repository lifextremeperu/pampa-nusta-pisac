import React, { useState } from 'react';
import { X, Check, Calendar, Users, MapPin, Sparkles, Shield, ArrowRight, Compass, HeartHandshake, MessageCircle } from 'lucide-react';
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
    const text = `¡Hola Santuario Pampa Ñusta! Deseo reservar el módulo "${module.title}" para ${participants} persona(s) con fecha ${selectedDate}. Mi nombre es ${contactName || 'Hermano de la Tierra'} y deseo coordinar mi aporte por Yape / Plin (+51 958 050 928).`;
    return `https://wa.me/${YAPE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  // Pricing based on module
  const basePricesUSD: Record<string, number> = {
    wachuma: 65,
    semillas: 40,
    ninos: 50,
    ceremonias: 190,
    talleres: 380,
  };

  const unitPriceUSD = basePricesUSD[module.id] || 80;
  const exchangeRate = 3.75;
  const unitPrice = currency === 'USD' ? unitPriceUSD : Math.round(unitPriceUSD * exchangeRate);
  const totalPrice = unitPrice * participants;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706', '#10b981', '#38bdf8'],
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-sadhana-dark/10 rounded-3xl overflow-hidden shadow-2xl shadow-sadhana-dark/10 my-auto">
        {/* Modal Top Banner with Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-sadhana-sand">
          <img
            src={module.imageUrl}
            alt={module.title}
            className="w-full h-full object-cover filter brightness-[0.85] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-sadhana-dark hover:text-sadhana-primary hover:bg-white transition-colors border border-sadhana-dark/10 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header titles */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-sadhana-primary/10 border border-sadhana-primary/20 text-[10px] font-mono tracking-widest text-sadhana-primary uppercase font-bold">
                {module.chapterNumber}
              </span>
              <span className="text-[11px] font-mono text-sadhana-brown font-bold">
                {module.altitude} · Elemento {module.element}
              </span>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-sadhana-dark">
              {module.title}
            </h2>
            <p className="text-xs text-sadhana-primary/80 font-mono italic font-bold">
              {module.quechuaTitle} — {module.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!isBooked ? (
            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Highlights Chips - Menos texto, alta claridad */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-sadhana-orange font-bold mb-2">
                  Ejes de la Experiencia
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {module.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5 text-xs text-sadhana-dark flex items-start gap-2 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-sadhana-orange shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Controls */}
              <div className="bg-white p-4 rounded-2xl border border-sadhana-dark/10 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-mono text-sadhana-brown uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-sadhana-orange" />
                      Fecha de Inmersión / Luna
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-10-01"
                      className="w-full px-3 py-2 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/10 text-sadhana-dark text-xs font-mono focus:outline-none focus:border-sadhana-primary shadow-inner"
                      required
                    />
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-xs font-mono text-sadhana-brown uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold">
                      <Users className="w-3.5 h-3.5 text-sadhana-orange" />
                      Participantes
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setParticipants((p) => Math.max(1, p - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-sadhana-dark/20 text-sadhana-dark hover:border-sadhana-primary hover:bg-sadhana-sand/30 text-sm font-bold flex items-center justify-center shadow-sm"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono text-sm font-bold text-sadhana-dark">
                        {participants} {participants === 1 ? 'persona' : 'personas'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setParticipants((p) => Math.min(8, p + 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-sadhana-dark/20 text-sadhana-dark hover:border-sadhana-primary hover:bg-sadhana-sand/30 text-sm font-bold flex items-center justify-center shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sadhana-dark/5">
                  <div>
                    <label className="block text-xs font-mono text-sadhana-brown uppercase tracking-wider mb-1 font-bold">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/10 text-sadhana-dark text-xs focus:outline-none focus:border-sadhana-primary shadow-inner"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-sadhana-brown uppercase tracking-wider mb-1 font-bold">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/10 text-sadhana-dark text-xs focus:outline-none focus:border-sadhana-primary shadow-inner"
                      required
                    />
                  </div>
                </div>

                {/* Currency & Total */}
                <div className="flex items-center justify-between pt-3 border-t border-sadhana-dark/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sadhana-brown font-mono font-bold">Moneda:</span>
                    <div className="inline-flex rounded-lg border border-sadhana-dark/10 bg-sadhana-sand p-0.5">
                      <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          currency === 'USD' ? 'bg-sadhana-primary text-white shadow-sm' : 'text-sadhana-brown hover:text-sadhana-dark'
                        }`}
                      >
                        USD
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('PEN')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          currency === 'PEN' ? 'bg-sadhana-primary text-white shadow-sm' : 'text-sadhana-brown hover:text-sadhana-dark'
                        }`}
                      >
                        PEN (S/)
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-sadhana-brown block font-mono font-bold">Aporte Total Sugerido</span>
                    <span className="text-lg font-mono font-extrabold text-sadhana-primary">
                      {currency === 'USD' ? `$${totalPrice} USD` : `S/ ${totalPrice} PEN`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sadhana-primary to-sadhana-orange text-white font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <HeartHandshake className="w-5 h-5 text-white" />
                  <span>Emitir Pase Ceremonial de la Ecoaldea</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-sadhana-primary/5 hover:bg-sadhana-primary/10 border border-sadhana-primary/30 text-sadhana-primary font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-sadhana-primary text-white" />
                  <span>Reservar con Yape / Plin por WhatsApp (+51 958 050 928)</span>
                </a>
              </div>
            </form>
          ) : (
            /* Digital Certificate / Pase Ceremonial */
            <div className="p-6 rounded-2xl bg-white border-2 border-sadhana-primary/50 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 mx-auto rounded-full bg-sadhana-primary/10 border border-sadhana-primary flex items-center justify-center shadow-sm">
                <Check className="w-6 h-6 text-sadhana-primary" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sadhana-orange font-bold block">
                  PASE CEREMONIAL EMITIDO
                </span>
                <h3 className="font-sans text-xl font-bold text-sadhana-dark mt-1">
                  Bienvenido a la Ecoaldea Pampa Ñusta
                </h3>
                <p className="text-xs text-sadhana-brown font-mono mt-1">
                  Titular: <strong className="text-sadhana-primary">{contactName || 'Hermano de la Tierra'}</strong>
                </p>
                <p className="text-xs text-sadhana-brown font-mono font-medium">
                  Módulo: {module.title} · Fecha: {selectedDate} · {participants} cupo(s)
                </p>
              </div>

              <div className="p-3 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/10 text-[11px] font-mono text-sadhana-brown text-left space-y-1">
                <div className="flex justify-between">
                  <span>Código de Pase:</span>
                  <span className="text-sadhana-primary font-bold">PN-{Math.random().toString(36).substring(2, 8).toUpperCase()}-2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Punto de Encuentro:</span>
                  <span className="text-sadhana-dark font-medium">Puente Colgante Pisac, 3,347 msnm</span>
                </div>
                <div className="flex justify-between">
                  <span>Aporte Ayni:</span>
                  <span className="text-sadhana-orange font-bold">
                    {currency === 'USD' ? `$${totalPrice} USD` : `S/ ${totalPrice} PEN`}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-sadhana-brown italic font-medium">
                Hemos enviado las pautas de dieta y preparación sagrada a <strong>{contactEmail}</strong>. ¡Nos vemos bajo el cielo del Valle Sagrado!
              </p>

              <div className="space-y-2">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-sadhana-primary hover:bg-sadhana-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar Constancia Yape/Plin a WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white border border-sadhana-dark/20 hover:bg-sadhana-sand/50 text-sadhana-dark font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  Cerrar y Volver a la Película
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
