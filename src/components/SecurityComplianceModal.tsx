import React, { useState } from 'react';
import {
  X,
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
  FileCheck,
  Award,
  AlertCircle
} from 'lucide-react';
import { SECURITY_PROTOCOLS, PAYMENT_METHODS } from '../data/securityTrustData';

interface SecurityComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'guarantee' | 'ssl' | 'altitude' | 'payments';
}

export const SecurityComplianceModal: React.FC<SecurityComplianceModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'guarantee',
}) => {
  const [activeTab, setActiveTab] = useState<'guarantee' | 'ssl' | 'altitude' | 'payments'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#16110c] border border-amber-600/60 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden text-stone-100">
        
        {/* Header with Andean & Security Badges */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[#261a12] via-[#1d130c] to-[#261a12] border-b border-[#443123] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/80 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-sm sm:text-base font-bold text-amber-200 tracking-wider">
                  COMPROMISO DE NO RIESGO & SEGURIDAD
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/60 text-[9px] font-mono font-bold">
                  <Lock className="w-2.5 h-2.5" />
                  SSL 256-BIT ACTIVO
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#ded0bf]">
                Santuario Ecológico Pampa Ñusta · Pisac, Valle Sagrado (3,347 msnm)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-amber-300 hover:bg-[#322216] transition-colors cursor-pointer"
            aria-label="Cerrar ventana de protocolos de seguridad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-8 pt-3 bg-[#1a120b] border-b border-[#3e2c1e] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('guarantee')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'guarantee'
                ? 'border-amber-400 text-amber-300 bg-[#291c13]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Compromiso de No Riesgo</span>
          </button>

          <button
            onClick={() => setActiveTab('ssl')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'ssl'
                ? 'border-emerald-400 text-emerald-300 bg-[#291c13]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certificación SSL & Cifrado</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'payments'
                ? 'border-amber-400 text-amber-300 bg-[#291c13]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Pagos Seguros & Pasarelas</span>
          </button>

          <button
            onClick={() => setActiveTab('altitude')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'altitude'
                ? 'border-sky-400 text-sky-300 bg-[#291c13]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Aclimatación 3,347m & Salud</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-sm">
          
          {/* TAB 1: COMPROMISO DE NO RIESGO */}
          {activeTab === 'guarantee' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Highlight Hero Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-[#1c2e22] border-2 border-emerald-500/60 text-stone-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                      DECLARACIÓN SOLEMNE DE PAMPA ÑUSTA
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-100">
                      Compromiso de No Riesgo: Tu Bienestar Físico y Financiero Primero
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
                      El viaje a los Andes debe ser una experiencia de transformación, no de incertidumbre. En Pampa Ñusta eliminamos todo riesgo: si tu vuelo se reprograma, sufres soroche en Cusco o surge cualquier contingencia personal, tienes garantía total de reprogramación sin costo alguno o reembolso transparente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {SECURITY_PROTOCOLS.map((protocol) => (
                  <div
                    key={protocol.id}
                    className="p-4 rounded-2xl bg-[#1d140e] border border-[#433123] hover:border-amber-500/80 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-amber-400 font-bold bg-[#291c13] px-2 py-0.5 rounded border border-amber-600/40">
                          {protocol.quechuaBadge}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          {protocol.statusText}
                        </span>
                      </div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-stone-100 mb-1.5">
                        {protocol.title}
                      </h4>
                      <p className="text-xs text-stone-300 font-sans leading-relaxed">
                        {protocol.fullDesc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#382619] flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span className="truncate max-w-[260px]">Auditoría: {protocol.verificationAgency}</span>
                      <span className="text-amber-400/90 font-bold">ACTIVO</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: CERTIFICACIÓN SSL */}
          {activeTab === 'ssl' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#1e150f] border border-[#4a3627] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#3b281a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/80 flex items-center justify-center text-emerald-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-amber-200">
                        Certificado SSL / TLS 1.3 de Alta Seguridad
                      </h3>
                      <p className="font-mono text-xs text-emerald-400">
                        Cifrado 256-Bit SHA-256 · Conexión Segura Validada
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold">
                    VERIFICADO
                  </span>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#140e09] border border-[#38271a]">
                    <span className="text-stone-400 block text-[10px] uppercase">Protocolo de Cifrado:</span>
                    <span className="text-stone-100 font-bold">TLS 1.3 (Transport Layer Security)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140e09] border border-[#38271a]">
                    <span className="text-stone-400 block text-[10px] uppercase">Algoritmo Criptográfico:</span>
                    <span className="text-stone-100 font-bold">AES_256_GCM con SHA-384 MAC</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140e09] border border-[#38271a]">
                    <span className="text-stone-400 block text-[10px] uppercase">Protección de Datos:</span>
                    <span className="text-emerald-400 font-bold">Prevención MITM, XSS & Inyecciones</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140e09] border border-[#38271a]">
                    <span className="text-stone-400 block text-[10px] uppercase">Cumplimiento Privacidad:</span>
                    <span className="text-amber-300 font-bold">Ley de Protección de Datos Personales (Perú 29733)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/50 flex items-start gap-3 text-xs text-stone-300">
                  <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    Toda la navegación, formularios de reserva de videollamada, aportes a la preservación del Wachuma y datos personales ingresados en Pampa Ñusta viajan protegidos bajo túneles criptográficos directos e inalterables.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAGOS SEGUROS */}
          {activeTab === 'payments' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#1e150f] border border-[#4a3627]">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#3b281a]">
                  <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/80 flex items-center justify-center text-amber-400">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-amber-200">
                      Pasarela de Pagos Tokenizada (Estándar PCI-DSS Nivel 1)
                    </h3>
                    <p className="font-mono text-xs text-stone-300">
                      Cero retención de tarjetas en nuestros servidores · Transacciones auditadas
                    </p>
                  </div>
                </div>

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-3.5 rounded-xl bg-[#140e09] border border-[#38271a] flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-cinzel text-xs font-bold text-stone-100 flex items-center gap-2">
                          <span>{pm.name}</span>
                          <span className="text-[9px] font-mono bg-[#281a10] text-amber-400 px-1.5 py-0.2 rounded border border-amber-700/40">
                            {pm.badge}
                          </span>
                        </h4>
                        <p className="font-mono text-[10px] text-stone-400 mt-1">
                          {pm.encryption}
                        </p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-[#281c13] border border-amber-600/40 text-xs text-[#ded0bf] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    Todos los comprobantes de donación o reserva generan constancia oficial inmediata en PDF con código QR y notificación automática a tu correo y WhatsApp.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACLIMATACIÓN Y SALUD */}
          {activeTab === 'altitude' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-[#1e150f] border border-[#4a3627] space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#3b281a]">
                  <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/80 flex items-center justify-center text-sky-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-amber-200">
                      Protocolo de Aclimatación a 3,347 msnm & Asistencia Médica
                    </h3>
                    <p className="font-mono text-xs text-sky-300">
                      Pisac · Faldas del Apu Linli · Cordillera de Vilcanota
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#140e09] border border-[#38271a] text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center font-bold font-mono">
                      O₂
                    </div>
                    <h4 className="font-bold text-stone-100">Oxígeno Medicinal</h4>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Balones portátiles de alta pureza médica siempre disponibles en el santuario para emergencias inmediatas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#140e09] border border-[#38271a] text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-500 text-amber-400 mx-auto flex items-center justify-center font-bold font-mono">
                      🌿
                    </div>
                    <h4 className="font-bold text-stone-100">Botica de Altura</h4>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Infusiones frescas de Hoja de Coca orgánica, Muña silvestre y plantas adaptógenas andinas cosechadas in situ.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#140e09] border border-[#38271a] text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-sky-950 border border-sky-500 text-sky-400 mx-auto flex items-center justify-center font-bold font-mono">
                      📡
                    </div>
                    <h4 className="font-bold text-stone-100">Enlace Satelital</h4>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Comunicación de emergencia permanente con el Centro de Salud de Pisac y clínicas especializadas de Cusco.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-600/40 text-xs text-sky-200">
                  <span className="font-bold block mb-1">Recomendación de llegada:</span>
                  Aconsejamos pasar al menos 24 a 48 horas de aclimatación suave en Cusco o en el Valle Sagrado (Pisac, Urubamba) antes de iniciar caminatas exigentes o ceremonias profundas.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-[#140e09] border-t border-[#38271a] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pampa Ñusta cumple con los estándares de Turismo Rural Comunitario de MINCETUR & DIRCETUR Cusco.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#c2853f] hover:bg-[#d8974a] text-[#14100c] font-cinzel font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>

    </div>
  );
};
