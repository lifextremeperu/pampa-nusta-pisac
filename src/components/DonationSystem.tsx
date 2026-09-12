import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  CreditCard,
  QrCode,
  Lock,
  Sparkles,
  CheckCircle2,
  Download,
  X,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DONATION_TIERS } from '../data/mockData';
import { DonationTier } from '../types';

export const DonationSystem: React.FC = () => {
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  const [selectedTier, setSelectedTier] = useState<DonationTier>(DONATION_TIERS[1]); // Default to popular tier
  const [customAmount, setCustomAmount] = useState<number>(currency === 'PEN' ? 120 : 35);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape_plin' | 'stripe'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [certificateData, setCertificateData] = useState<{
    name: string;
    tier: string;
    amount: string;
    date: string;
    code: string;
  } | null>(null);

  const YAPE_PLIN_PHONE = '+51958050928';
  const YAPE_PLIN_DISPLAY = '+51 958 050 928';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('958050928');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const getWhatsAppYapeUrl = () => {
    const text = `¡Hola Santuario Pampa Ñusta! Deseo confirmar mi aporte mediante Yape / Plin por un monto de S/ ${customAmount} para el mecenazgo "${selectedTier.name}". Mi nombre es ${donorName || 'Mecenas'}. Les adjunto aquí el comprobante.`;
    return `https://wa.me/51958050928?text=${encodeURIComponent(text)}`;
  };

  // Dynamic impact metrics calculation
  const calculatedTerraceMeters = Math.round(customAmount * (currency === 'PEN' ? 0.12 : 0.45));
  const calculatedSeedBags = Math.max(1, Math.round(customAmount * (currency === 'PEN' ? 0.05 : 0.2)));
  const calculatedHydraulicHours = Math.round(customAmount * (currency === 'PEN' ? 0.08 : 0.3));

  const handleSelectTier = (tier: DonationTier) => {
    setSelectedTier(tier);
    setCustomAmount(currency === 'PEN' ? tier.pricePEN : tier.priceUSD);
  };

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert('Por favor, ingresa tu nombre de mecenas para el certificado ancestral.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#10b981', '#ffffff']
      });

      const certCode = 'PN-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2026';
      setCertificateData({
        name: donorName,
        tier: selectedTier.name,
        amount: `${currency === 'PEN' ? 'S/' : '$'} ${customAmount}`,
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
    <section id="donaciones" className="relative py-24 bg-white text-stone-900 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-xs uppercase tracking-widest mb-4 font-mono font-bold shadow-sm">
            <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700/20" />
            <span>AYNI SAGRADO · MECENAZGO PATRIMONIAL</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950">
            Arquitectura de Apoyo & <span className="text-amber-800">Preservación</span>
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-medium">
            En el mundo andino rige el <strong>Ayni</strong>: la reciprocidad sagrada. Tu patrocinio financia
            directamente la estabilización de los andenes, la investigación arqueológica y las comunidades quechuas de Pisac.
          </p>

          {/* Currency Switcher (Culqi PEN vs Stripe USD) */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-stone-100 border border-stone-300 shadow-inner">
            <button
              onClick={() => {
                setCurrency('PEN');
                setCustomAmount(selectedTier.pricePEN);
                setPaymentMethod('card');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                currency === 'PEN'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              🇵🇪 Soles Peruanos (PEN · Culqi / Yape)
            </button>
            <button
              onClick={() => {
                setCurrency('USD');
                setCustomAmount(selectedTier.priceUSD);
                setPaymentMethod('stripe');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              🌐 Divisas Globales (USD · Stripe)
            </button>
          </div>
        </div>

        {/* Andenería Topography Stepped Cards (translate-y-4, translate-y-8 as mandated on page 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end mb-16">
          {DONATION_TIERS.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            const price = currency === 'PEN' ? tier.pricePEN : tier.priceUSD;
            const symbol = currency === 'PEN' ? 'S/' : '$';

            // Topographic terrace offset classes from directive
            const terraceOffsetClass =
              tier.terraceLevel === 1
                ? 'md:translate-y-6'
                : tier.terraceLevel === 2
                ? 'md:translate-y-0'
                : 'md:translate-y-12';

            return (
              <div
                key={tier.id}
                onClick={() => handleSelectTier(tier)}
                className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${terraceOffsetClass} ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-600 shadow-xl ring-2 ring-amber-600/30 scale-[1.02] z-10'
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50 shadow-md'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-600 text-white font-cinzel font-bold text-[10px] uppercase tracking-widest shadow-md">
                    Más Elegido por la Comunidad
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                    <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      Andén Nivel 0{tier.terraceLevel}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded border border-stone-300">
                      Mecenazgo {tier.period}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-950">{tier.name}</h3>
                  <p className="text-amber-800 font-cinzel font-semibold text-xs mt-0.5">{tier.quechuaName}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-stone-500 font-mono text-lg font-bold">{symbol}</span>
                    <span className="font-cinzel text-4xl sm:text-5xl font-extrabold text-stone-950">{price}</span>
                    <span className="text-stone-500 text-xs font-mono font-medium">/ mes</span>
                  </div>

                  <p className="mt-4 text-xs text-stone-700 font-sans leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-amber-100/60 border border-amber-300 text-[11px] text-amber-950">
                    <span className="font-bold block font-mono text-amber-900">Impacto Mensual Directo:</span>
                    {tier.impactMetric}
                  </div>

                  <div className="mt-6 pt-6 border-t border-stone-200 space-y-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-stone-600 font-bold block">
                      Beneficios & Privilegios:
                    </span>
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTier(tier);
                  }}
                  className={`mt-8 w-full py-3 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                >
                  <span>{isSelected ? 'Nivel Seleccionado' : 'Elegir Nivel'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Impact Calculator & Checkout Integration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl">
          {/* Left Column: Impact Metrics Calculator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-700" />
                Calculadora de Impacto Comunitario
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-stone-950">
                Tu Aporte en la Tierra Sagrada
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Ajusta el monto o ingresa una cantidad personalizada para visualizar la transformación física en el parque.
              </p>
            </div>

            {/* Custom Amount Slider */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-600 font-medium">Aporte mensual asignado:</span>
                <span className="font-bold text-base text-amber-900 font-mono">
                  {currency === 'PEN' ? 'S/' : '$'} {customAmount}
                </span>
              </div>
              <input
                type="range"
                min={currency === 'PEN' ? 20 : 10}
                max={currency === 'PEN' ? 1000 : 300}
                step={currency === 'PEN' ? 10 : 5}
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                aria-label="Custom donation amount"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>Mínimo ({currency === 'PEN' ? 'S/ 20' : '$ 10'})</span>
                <span>Intermedio ({currency === 'PEN' ? 'S/ 500' : '$ 150'})</span>
                <span>Mecenas Honorario ({currency === 'PEN' ? 'S/ 1,000' : '$ 300'})</span>
              </div>
            </div>

            {/* Impact Metric Counters Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-800 block">
                  {calculatedTerraceMeters} m²
                </span>
                <span className="text-[10px] text-stone-600 font-mono font-medium mt-1 block">
                  Andenes estabilizados
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-sky-800 block">
                  {calculatedSeedBags} fam.
                </span>
                <span className="text-[10px] text-stone-600 font-mono font-medium mt-1 block">
                  Familias con insumos
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-800 block">
                  {calculatedHydraulicHours} hrs
                </span>
                <span className="text-[10px] text-stone-600 font-mono font-medium mt-1 block">
                  Canales descolmatados
                </span>
              </div>
            </div>

            {/* Technical Directive Security Badge */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-2 text-stone-800 font-mono text-[11px] font-bold">
                <Cpu className="w-3.5 h-3.5 text-amber-700" />
                <span>Arquitectura Transaccional Blindada:</span>
              </div>
              <p className="text-[11px] text-stone-600">
                La pasarela {currency === 'PEN' ? 'Culqi / Yape' : 'Stripe'} implementa llaves de idempotencia obligatorias (<code>event.id</code>), extracción de <em>raw body</em> y verificación de firma criptográfica <strong>HMAC-SHA256</strong>, imposibilitando transacciones duplicadas por caídas de red.
              </p>
            </div>
          </div>

          {/* Right Column: Checkout Form Simulation */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-stone-200 shadow-md">
            <h4 className="font-cinzel text-lg font-bold text-stone-950 mb-4 flex items-center justify-between">
              <span>Finalizar Reciprocidad (Ayni)</span>
              <Lock className="w-4 h-4 text-emerald-700" />
            </h4>

            <form onSubmit={handleProcessDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1">
                  Nombre Completo del Mecenas
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Tupac Yupanqui / Sofia Morales"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-1">
                  Correo Electrónico (Para recibo e informe)
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu.correo@ejemplo.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-amber-600 transition-colors"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-bold mb-2">
                  Método de Procesamiento
                </label>
                {currency === 'PEN' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('yape_plin')}
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'yape_plin'
                            ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold shadow-sm ring-1 ring-purple-600'
                            : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-purple-700" />
                        <span>Yape / Plin WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-sm ring-1 ring-amber-600'
                            : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-amber-700" />
                        <span>Tarjeta Culqi</span>
                      </button>
                    </div>

                    {paymentMethod === 'yape_plin' && (
                      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 text-xs space-y-2.5 animate-fadeIn shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700">
                              <MessageCircle className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-purple-900">
                              Yape / Plin Directo a WhatsApp
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 text-[10px] font-mono font-bold">
                            ACTIVO
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-purple-200 flex items-center justify-between gap-2 shadow-sm">
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 font-bold block">Número Yape / Plin & WhatsApp:</span>
                            <span className="font-mono text-base font-bold text-stone-950 tracking-wider">
                              +51 958 050 928
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyPhone}
                            className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 border border-purple-300 text-xs font-mono font-bold text-purple-900 flex items-center gap-1 transition-all cursor-pointer"
                          >
                            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedPhone ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>

                        <p className="text-[11px] text-stone-700 leading-relaxed font-sans">
                          Realiza tu transferencia desde tu app de <strong>Yape</strong> o <strong>Plin</strong> al número <strong className="text-purple-900 font-mono">+51 958 050 928</strong>. Al confirmar, serás derivado directamente al WhatsApp oficial para enviar tu comprobante.
                        </p>

                        <a
                          href={getWhatsAppYapeUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Abrir WhatsApp (+51 958 050 928)</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl border border-sky-300 bg-sky-50 text-xs font-mono text-sky-950 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <CreditCard className="w-4 h-4 text-sky-700" />
                      <span>Stripe Checkout Global (Apple Pay, Google Pay, Tarjetas)</span>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
                <span className="font-semibold">Total a donar:</span>
                <span className="font-cinzel text-lg font-bold text-amber-900">
                  {currency === 'PEN' ? 'S/' : '$'} {customAmount} {currency}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-cinzel font-bold text-sm uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                  paymentMethod === 'yape_plin'
                    ? 'bg-purple-700 hover:bg-purple-800 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Conectando con WhatsApp (+51 958 050 928)...</span>
                  </>
                ) : paymentMethod === 'yape_plin' ? (
                  <>
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirmar con Yape / Plin por WhatsApp</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar Aporte al Santuario</span>
                  </>
                )}
              </button>

              {/* Verified Trust & SSL Badges */}
              <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-stone-500">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SSL 256-Bit TLS 1.3 Verificado</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>PCI-DSS Nivel 1 · Compromiso de No Riesgo</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Patron Certificate Celebration Modal */}
      {certificateData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <button
              onClick={() => setCertificateData(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sacred Seal Emblem */}
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 mb-4 shadow-md">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block mb-1">
              Registro Oficial de Mecenazgo Ancestral
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-950">
              Certificado de Gratitud Andina
            </h3>
            <p className="text-xs text-stone-600 font-sans mt-1">
              Parque Arqueológico de Pisac · Valle Sagrado de los Incas
            </p>

            <div className="my-6 p-6 rounded-2xl bg-stone-50 border border-amber-200 text-left space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block">Mecenas Distinguido:</span>
                <p className="font-cinzel text-xl font-bold text-amber-900">{certificateData.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold block">Nivel Asignado:</span>
                  <p className="font-semibold text-stone-900">{certificateData.tier}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold block">Monto Consignado:</span>
                  <p className="font-bold text-amber-900">{certificateData.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold block">Fecha de Emisión:</span>
                  <p className="text-stone-700">{certificateData.date}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold block">Código Criptográfico:</span>
                  <p className="font-mono text-stone-600 text-[11px] font-bold">{certificateData.code}</p>
                </div>
              </div>
            </div>

            <p className="text-xs font-serif italic text-amber-950 mb-6">
              «Que los Apus tutelares y el río Willakamayu colmen de bendiciones tu generosidad hacia nuestra memoria milenaria.»
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {paymentMethod === 'yape_plin' && (
                <a
                  href={getWhatsAppYapeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar Constancia WhatsApp (+51 958 050 928)</span>
                </a>
              )}
              <button
                onClick={() => {
                  alert(`Certificado descargado con código: ${certificateData.code}`);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Credencial</span>
              </button>
              <button
                onClick={() => setCertificateData(null)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 font-cinzel text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
