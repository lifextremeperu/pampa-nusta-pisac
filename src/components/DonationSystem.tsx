import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Lock,
  Sparkles,
  Download,
  X,
  MessageCircle,
  Copy,
  Check,
  Leaf
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCurrency } from '../hooks/useCurrency';

export const DonationSystem: React.FC = () => {
  const { currency, symbol, formatPrice, getRawPrice } = useCurrency();
  const [customAmount, setCustomAmount] = useState<number>(getRawPrice(30)); // Initialize correctly

  React.useEffect(() => {
    // When currency changes, reset to base 30 USD equivalent
    setCustomAmount(getRawPrice(30));
  }, [currency]);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape_plin' | 'stripe'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [certificateData, setCertificateData] = useState<{
    name: string;
    amount: string;
    date: string;
    code: string;
  } | null>(null);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('958050928');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const getWhatsAppYapeUrl = () => {
    const text = `¡Hola Santuario Pampa Ñusta! Deseo confirmar mi aporte de Ayni mediante Yape / Plin por un monto de S/ ${customAmount}. Mi nombre es ${donorName || 'Custodio'}. Les adjunto aquí el comprobante.`;
    return `https://wa.me/51958050928?text=${encodeURIComponent(text)}`;
  };

  // Dynamic impact metrics calculation based on USD base amount
  const usdAmount = customAmount / getRawPrice(1);
  const calculatedTerraceMeters = Math.round(usdAmount * 0.45);
  const calculatedSeedBags = Math.max(1, Math.round(usdAmount * 0.2));
  const calculatedHydraulicHours = Math.round(usdAmount * 0.3);

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert('Por favor, ingresa tu nombre de custodio para el registro del santuario.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#10b981', '#ffffff']
      });

      const certCode = 'PN-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026';
      setCertificateData({
        name: donorName,
        amount: symbol + ' ' + customAmount,
        date: new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }),
        code: certCode
      });

      // Redirect Yape/Plin contributors directly to WhatsApp
      if (paymentMethod === 'yape_plin') {
        window.open(getWhatsAppYapeUrl(), '_blank');
      }
    }, 1200);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 bg-sadhana-dark text-white overflow-hidden">
      
      {/* Background ambient elements */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sadhana-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sadhana-sand/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Subtle Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Leaf className="w-6 h-6 text-sadhana-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-white mb-6">
            PROGRAMA DE CUSTODIA VIVA
          </h2>
          <p className="text-sm md:text-base text-sadhana-sand/80 font-medium leading-relaxed">
            Tu contribución no es una transacción, es un acto de Ayni (reciprocidad) que 
            nos permite continuar protegiendo la genética de nuestras semillas, restaurando 
            los andenes milenarios y educando a las futuras generaciones. 
            Elige libremente con cuánto deseas aportar.
          </p>
        </div>

        {/* Currency Switcher has been replaced by the dynamic i18n Language Switcher */}


        {/* Main Content: Impact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Impact Metrics Calculator */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-sadhana-primary font-bold mb-3 block">
                Tu impacto en el ecosistema
              </span>
              <h3 className="text-3xl font-black tracking-tight text-white mb-4">
                LA TRANSFORMACIÓN FÍSICA
              </h3>
              <p className="text-sadhana-sand/70 text-sm leading-relaxed">
                Desliza para visualizar cómo tu aporte se traduce en acciones 
                concretas dentro del parque arqueológico.
              </p>
            </div>

            {/* Custom Amount Slider */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-sadhana-sand/70 font-bold uppercase tracking-widest text-[10px]">Tu Aporte Voluntario:</span>
                <span className="font-black text-3xl text-sadhana-primary">
                  {currency === 'PEN' ? 'S/' : '$'} {customAmount}
                </span>
              </div>
              <input
                type="range"
                min={getRawPrice(10)}
                max={getRawPrice(300)}
                step={getRawPrice(5)}
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-sadhana-primary rounded-full"
                aria-label="Monto de aporte voluntario"
              />
            </div>

            {/* Impact Visual Cards */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* Terrace Restoration */}
              <div className="relative rounded-[30px] overflow-hidden h-64 border border-white/10 group shadow-2xl">
                <img src="/assets/ecoaldea/mecenazgo_andenes_1789490501293.jpg" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-125 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-1000" alt="Andenes Milenarios" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <span className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">{calculatedTerraceMeters} <span className="text-xl md:text-2xl font-bold text-white/70">m²</span></span>
                  <span className="text-sm md:text-base uppercase tracking-widest text-white/90 font-bold mt-2">Restauración de <br/><span className="text-[#34E0A1]">Andenes Inkas</span></span>
                </div>
              </div>
              
              {/* Family Support */}
              <div className="relative rounded-[30px] overflow-hidden h-64 border border-white/10 group shadow-2xl">
                <img src="/assets/ecoaldea/mecenazgo_ninos_1789490513046.jpg" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-125 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-1000" alt="Niños y Familias" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <span className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">{calculatedSeedBags} <span className="text-xl md:text-2xl font-bold text-white/70">niños</span></span>
                  <span className="text-sm md:text-base uppercase tracking-widest text-white/90 font-bold mt-2">Educación Viva <br/><span className="text-[#FF7A00]">Familias Locales</span></span>
                </div>
              </div>

              {/* Water & Seeds */}
              <div className="relative rounded-[30px] overflow-hidden h-64 border border-white/10 group shadow-2xl">
                <img src="/assets/ecoaldea/capitulo_semillas_1789490316096.jpg" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-125 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-1000" alt="Agua y Semillas" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <span className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl">{calculatedHydraulicHours} <span className="text-xl md:text-2xl font-bold text-white/70">semillas</span></span>
                  <span className="text-sm md:text-base uppercase tracking-widest text-white/90 font-bold mt-2">Preservación de <br/><span className="text-sadhana-primary">Bancos Genéticos</span></span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Subtle Checkout Form */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md">
            <h4 className="text-lg font-black text-white mb-8 flex items-center justify-between">
              <span>HACER EFECTIVO EL AYNI</span>
              <Lock className="w-4 h-4 text-sadhana-primary opacity-80" />
            </h4>

            <form onSubmit={handleProcessDonation} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-sadhana-sand/70 font-bold mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Tupac Yupanqui"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:bg-white/15 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-sadhana-sand/70 font-bold mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu.correo@ejemplo.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:bg-white/15 transition-all text-sm"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-sadhana-sand/70 font-bold mb-3">
                  Medio de Contribución
                </label>
                {currency === 'PEN' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('yape_plin')}
                        className={`p-4 text-[10px] rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border ${
                          paymentMethod === 'yape_plin'
                            ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Yape / Plin</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 text-[10px] rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border ${
                          paymentMethod === 'card'
                            ? 'bg-sadhana-primary/20 border-sadhana-primary/50 text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Tarjeta</span>
                      </button>
                    </div>

                    {paymentMethod === 'yape_plin' && (
                      <div className="p-5 rounded-xl bg-purple-900/40 border border-purple-500/20 text-purple-100 space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[10px] uppercase tracking-widest opacity-80">
                            Coordinación directa
                          </span>
                        </div>

                        <div className="p-4 bg-black/20 rounded-lg flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest font-bold opacity-60 block mb-1">Número Oficial:</span>
                            <span className="text-lg font-bold tracking-wider text-white">
                              +51 958 050 928
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyPhone}
                            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
                          >
                            {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedPhone ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-sky-900/30 border border-sky-500/20 text-sky-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest">
                      <CreditCard className="w-4 h-4" />
                      <span>Pago Seguro vía Stripe</span>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between font-black text-white">
                <span className="text-sm">Total del Aporte:</span>
                <span className="text-xl text-sadhana-primary">
                  {currency === 'PEN' ? 'S/' : '$'} {customAmount}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${
                  paymentMethod === 'yape_plin'
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20'
                    : 'bg-white hover:bg-sadhana-sand text-sadhana-dark shadow-lg shadow-white/10'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Conectando con el Santuario...</span>
                  </>
                ) : paymentMethod === 'yape_plin' ? (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar vía WhatsApp</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar Aporte Seguro</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Patron Certificate Celebration Modal */}
      {certificateData && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-sadhana-dark/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg bg-sadhana-dark border border-sadhana-primary/30 rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sadhana-primary to-transparent" />
            <button
              onClick={() => setCertificateData(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-sadhana-sand/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sacred Seal Emblem */}
            <div className="w-16 h-16 mx-auto rounded-full bg-sadhana-primary/10 border border-sadhana-primary/50 flex items-center justify-center text-sadhana-primary mb-6 shadow-sm">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>

            <span className="text-[9px] uppercase font-mono tracking-widest text-sadhana-primary font-bold block mb-2">
              Registro Oficial de Custodia
            </span>
            <h3 className="font-sans text-2xl font-extrabold text-white mb-1">
              Gratitud Andina
            </h3>
            <p className="text-[10px] text-sadhana-sand/60 font-sans mt-1 uppercase tracking-widest">
              Santuario Pampa Ñusta · Pisac
            </p>

            <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-4 relative">
              <div className="relative z-10">
                <span className="text-[9px] font-mono uppercase text-sadhana-sand/50 font-bold block mb-1">Hermano Custodio:</span>
                <p className="font-sans text-lg font-bold text-white">{certificateData.name}</p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-sadhana-sand/50 font-bold block mb-1">Monto de Ayni:</span>
                  <p className="font-bold text-sadhana-primary text-base">{certificateData.amount}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-sadhana-sand/50 font-bold block mb-1">Fecha de Registro:</span>
                  <p className="text-white/90">{certificateData.date}</p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 text-xs">
                <span className="text-[9px] font-mono text-sadhana-sand/50 font-bold block mb-1">Código Criptográfico:</span>
                <p className="font-mono text-white/70 text-[10px] font-bold tracking-widest">{certificateData.code}</p>
              </div>
            </div>

            <p className="text-xs font-serif italic text-sadhana-sand/80 mb-8 px-2">
              «Que los Apus tutelares y el río sagrado colmen de bendiciones tu camino en retribución a tu generosidad.»
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {paymentMethod === 'yape_plin' && (
                <a
                  href={getWhatsAppYapeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/40 text-purple-200 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar Asesor</span>
                </a>
              )}
              <button
                onClick={() => setCertificateData(null)}
                className="px-8 py-3 rounded-xl bg-white hover:bg-sadhana-sand text-sadhana-dark font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer shadow-sm"
              >
                Volver
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

