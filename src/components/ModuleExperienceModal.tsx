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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/60 my-auto">
        {/* Modal Top Banner with Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img
            src={module.imageUrl}
            alt={module.title}
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-black/80 transition-colors border border-stone-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header titles */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold">
                {module.chapterNumber}
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {module.altitude} · Elemento {module.element}
              </span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100">
              {module.title}
            </h2>
            <p className="text-xs text-amber-300/80 font-mono italic">
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
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  Ejes de la Experiencia
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {module.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 flex items-start gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Controls */}
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Fecha de Inmersión / Luna
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-10-01"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs font-mono focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Participantes
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setParticipants((p) => Math.max(1, p - 1))}
                        className="w-8 h-8 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 hover:border-amber-400 text-sm font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-mono text-sm font-bold text-stone-200">
                        {participants} {participants === 1 ? 'persona' : 'personas'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setParticipants((p) => Math.min(8, p + 1))}
                        className="w-8 h-8 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 hover:border-amber-400 text-sm font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-800">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* Currency & Total */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-mono">Moneda:</span>
                    <div className="inline-flex rounded-lg border border-stone-700 bg-stone-950 p-0.5">
                      <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          currency === 'USD' ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        USD
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('PEN')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          currency === 'PEN' ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        PEN (S/)
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-mono">Aporte Total Sugerido</span>
                    <span className="text-lg font-mono font-bold text-amber-300">
                      {currency === 'USD' ? `$${totalPrice} USD` : `S/ ${totalPrice} PEN`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-cinzel font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <HeartHandshake className="w-5 h-5 text-stone-950" />
                  <span>Emitir Pase Ceremonial de la Ecoaldea</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>

                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-300 text-stone-950" />
                  <span>Reservar con Yape / Plin por WhatsApp (+51 958 050 928)</span>
                </a>
              </div>
            </form>
          ) : (
            /* Digital Certificate / Pase Ceremonial */
            <div className="p-6 rounded-2xl bg-stone-900 border border-amber-400 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center">
                <Check className="w-6 h-6 text-amber-400" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  PASE CEREMONIAL EMITIDO
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-100 mt-1">
                  Bienvenido a la Ecoaldea Pampa Ñusta
                </h3>
                <p className="text-xs text-stone-300 font-mono mt-1">
                  Titular: <strong className="text-amber-300">{contactName || 'Hermano de la Tierra'}</strong>
                </p>
                <p className="text-xs text-stone-400 font-mono">
                  Módulo: {module.title} · Fecha: {selectedDate} · {participants} cupo(s)
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-400 text-left space-y-1">
                <div className="flex justify-between">
                  <span>Código de Pase:</span>
                  <span className="text-amber-400 font-bold">PN-{Math.random().toString(36).substring(2, 8).toUpperCase()}-2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Punto de Encuentro:</span>
                  <span className="text-stone-200">Puente Colgante Pisac, 3,347 msnm</span>
                </div>
                <div className="flex justify-between">
                  <span>Aporte Ayni:</span>
                  <span className="text-emerald-400 font-bold">
                    {currency === 'USD' ? `$${totalPrice} USD` : `S/ ${totalPrice} PEN`}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 italic">
                Hemos enviado las pautas de dieta y preparación sagrada a <strong>{contactEmail}</strong>. ¡Nos vemos bajo el cielo del Valle Sagrado!
              </p>

              <div className="space-y-2">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950" />
                  <span>Enviar Constancia Yape/Plin a WhatsApp (+51 958 050 928)</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
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
