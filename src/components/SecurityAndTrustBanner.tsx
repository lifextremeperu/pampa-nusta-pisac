import React from 'react';
import {
  ShieldCheck,
  Lock,
  RotateCcw,
  Activity,
  Mountain,
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  CreditCard,
  Building2,
  Sparkles,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { SECURITY_PROTOCOLS, PAYMENT_METHODS } from '../data/securityTrustData';

interface SecurityAndTrustBannerProps {
  onOpenModal: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const SecurityAndTrustBanner: React.FC<SecurityAndTrustBannerProps> = ({
  onOpenModal,
}) => {
  return (
    <section id="certificaciones-seguridad" className="relative w-full py-12 bg-gradient-to-b from-[#140e09] via-[#18110b] to-[#120d09] border-y border-[#3d2a1c] overflow-hidden scroll-mt-20">
      
      {/* Background Subtle Andean Geometric Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-600/50 bg-emerald-950/40 text-emerald-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CUMPLIMIENTO DE SEGURIDAD & TURISMO RESPONSABLE · PISAC</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-stone-100 tracking-tight">
              COMPROMISO DE NO RIESGO & CERTIFICACIONES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#ded0bf] max-w-2xl mt-1.5 leading-relaxed">
              Viaja y conecta con la sabiduría andina con absoluta tranquilidad. Garantizamos seguridad financiera, protocolos médicos de altura a 3,347 msnm, cifrado SSL bancario y pasarelas de pago 100% auditadas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenModal('guarantee')}
              className="px-4 py-2 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] text-[#14100c] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
            >
              <span>Ver Auditoría Completa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. 6 PROTOCOLS OF THE NO-RISK COMMITMENT (INTERACTIVE CARDS)  */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {SECURITY_PROTOCOLS.map((item) => {
            const getIcon = () => {
              switch (item.iconName) {
                case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-emerald-400" />;
                case 'Activity': return <Activity className="w-5 h-5 text-sky-400" />;
                case 'Mountain': return <Mountain className="w-5 h-5 text-amber-400" />;
                case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
                case 'ShieldCheck': return <Building2 className="w-5 h-5 text-emerald-400" />;
                default: return <Lock className="w-5 h-5 text-amber-400" />;
              }
            };

            const tabTarget = item.category === 'payment'
              ? 'payments'
              : item.category === 'altitude'
              ? 'altitude'
              : 'guarantee';

            return (
              <div
                key={item.id}
                onClick={() => onOpenModal(tabTarget)}
                className="p-5 rounded-2xl bg-[#17100b] border border-[#3f2c1e] hover:border-amber-500/70 transition-all cursor-pointer group flex flex-col justify-between hover:scale-[1.01] shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#251a12] border border-[#4d3624] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon()}
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#281c13] text-amber-400 border border-amber-700/50 font-bold">
                      {item.quechuaBadge}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xs sm:text-sm font-bold text-stone-100 group-hover:text-amber-200 transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#342418] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.statusText}
                  </span>
                  <span className="text-stone-400 group-hover:text-amber-400 flex items-center gap-0.5">
                    Detalles
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. VERIFIED PAYMENT PLATFORMS & SSL SECURITY STRIP            */}
        {/* ------------------------------------------------------------- */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#1a120b] border border-[#4a3424] shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* SSL Badge Info */}
            <div className="flex items-center gap-4 text-left w-full lg:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-sm sm:text-base font-bold text-amber-200">
                    CERTIFICADO SSL 256-BIT (TLS 1.3)
                  </span>
                  <span className="px-2 py-0.2 rounded bg-emerald-900/60 border border-emerald-500/80 text-emerald-300 text-[9px] font-mono font-bold">
                    ACTIVO
                  </span>
                </div>
                <p className="font-mono text-xs text-stone-300 mt-0.5">
                  Protección de navegación, datos de reserva y aportes tokenizados de extremo a extremo.
                </p>
              </div>
            </div>

            {/* Payment Method Badges Grid */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center lg:justify-end w-full lg:w-auto">
              <span className="px-3 py-1 rounded-xl bg-[#261a12] border border-amber-600/40 text-amber-300 font-mono text-[11px] font-bold">
                📱 YAPE
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#261a12] border border-sky-600/40 text-sky-300 font-mono text-[11px] font-bold">
                ⚡ PLIN
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#261a12] border border-stone-600 text-stone-200 font-mono text-[11px] font-bold">
                💳 VISA / MASTERCARD
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#261a12] border border-amber-600/40 text-amber-300 font-mono text-[11px] font-bold">
                🏦 BCP / BBVA / INTERBANK
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#261a12] border border-emerald-600/40 text-emerald-300 font-mono text-[11px] font-bold">
                🛡️ PCI-DSS NIVEL 1
              </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
