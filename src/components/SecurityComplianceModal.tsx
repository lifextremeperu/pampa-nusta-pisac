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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-white/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-sadhana-dark/10 rounded-3xl shadow-2xl overflow-hidden text-sadhana-dark">
        
        {/* Header with Andean & Security Badges */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-sadhana-sand/50 border-b border-sadhana-dark/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm sm:text-base font-extrabold text-sadhana-primary tracking-wider">
                  COMPROMISO DE NO RIESGO & SEGURIDAD
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold">
                  <Lock className="w-2.5 h-2.5" />
                  SSL 256-BIT ACTIVO
                </span>
              </div>
              <p className="font-mono text-[11px] text-sadhana-brown font-bold mt-0.5">
                Santuario Ecológico Pampa Ñusta · Pisac, Valle Sagrado (3,347 msnm)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-sadhana-brown hover:text-sadhana-primary hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-sadhana-dark/10 shadow-sm"
            aria-label="Cerrar ventana de protocolos de seguridad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-8 pt-3 bg-white border-b border-sadhana-dark/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('guarantee')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'guarantee'
                ? 'border-sadhana-primary text-sadhana-primary bg-sadhana-sand/30'
                : 'border-transparent text-sadhana-brown/70 hover:text-sadhana-dark'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Compromiso de No Riesgo</span>
          </button>

          <button
            onClick={() => setActiveTab('ssl')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'ssl'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-sadhana-brown/70 hover:text-sadhana-dark'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Certificación SSL & Cifrado</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'payments'
                ? 'border-sadhana-primary text-sadhana-primary bg-sadhana-sand/30'
                : 'border-transparent text-sadhana-brown/70 hover:text-sadhana-dark'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pagos Seguros & Pasarelas</span>
          </button>

          <button
            onClick={() => setActiveTab('altitude')}
            className={`px-3.5 py-2 rounded-t-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeTab === 'altitude'
                ? 'border-sky-600 text-sky-700 bg-sky-50/50'
                : 'border-transparent text-sadhana-brown/70 hover:text-sadhana-dark'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Aclimatación 3,347m & Salud</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-sm">
          
          {/* TAB 1: COMPROMISO DE NO RIESGO */}
          {activeTab === 'guarantee' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Highlight Hero Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border-2 border-emerald-200 text-sadhana-dark shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                      DECLARACIÓN SOLEMNE DE PAMPA ÑUSTA
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-sadhana-dark">
                      Compromiso de No Riesgo: Tu Bienestar Físico y Financiero Primero
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-sadhana-brown mt-1.5 leading-relaxed font-medium">
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
                    className="p-4 rounded-2xl bg-white border border-sadhana-dark/10 hover:border-sadhana-primary/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-sadhana-primary font-bold bg-sadhana-sand/50 px-2 py-0.5 rounded border border-sadhana-primary/20">
                          {protocol.quechuaBadge}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          {protocol.statusText}
                        </span>
                      </div>
                      <h4 className="font-sans text-xs sm:text-sm font-extrabold text-sadhana-dark mb-1.5">
                        {protocol.title}
                      </h4>
                      <p className="text-xs text-sadhana-brown font-sans leading-relaxed font-medium">
                        {protocol.fullDesc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-sadhana-dark/5 flex items-center justify-between text-[10px] font-mono text-sadhana-brown/70 font-bold">
                      <span className="truncate max-w-[260px]">Auditoría: {protocol.verificationAgency}</span>
                      <span className="text-sadhana-primary font-bold">ACTIVO</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: CERTIFICACIÓN SSL */}
          {activeTab === 'ssl' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-white border border-sadhana-dark/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sadhana-dark/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-extrabold text-sadhana-dark">
                        Certificado SSL / TLS 1.3 de Alta Seguridad
                      </h3>
                      <p className="font-mono text-xs text-emerald-700 font-bold">
                        Cifrado 256-Bit SHA-256 · Conexión Segura Validada
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold shadow-sm">
                    VERIFICADO
                  </span>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5">
                    <span className="text-sadhana-brown block text-[10px] uppercase font-bold">Protocolo de Cifrado:</span>
                    <span className="text-sadhana-dark font-bold">TLS 1.3 (Transport Layer Security)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5">
                    <span className="text-sadhana-brown block text-[10px] uppercase font-bold">Algoritmo Criptográfico:</span>
                    <span className="text-sadhana-dark font-bold">AES_256_GCM con SHA-384 MAC</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5">
                    <span className="text-sadhana-brown block text-[10px] uppercase font-bold">Protección de Datos:</span>
                    <span className="text-emerald-600 font-bold">Prevención MITM, XSS & Inyecciones</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5">
                    <span className="text-sadhana-brown block text-[10px] uppercase font-bold">Cumplimiento Privacidad:</span>
                    <span className="text-sadhana-primary font-bold">Ley de Protección de Datos Personales (Perú 29733)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-start gap-3 text-xs text-sadhana-brown font-medium">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
              <div className="p-5 rounded-2xl bg-white border border-sadhana-dark/10 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sadhana-dark/5">
                  <div className="w-10 h-10 rounded-xl bg-sadhana-sand/50 border border-sadhana-primary/20 flex items-center justify-center text-sadhana-primary shadow-sm">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-extrabold text-sadhana-dark">
                      Pasarela de Pagos Tokenizada (Estándar PCI-DSS Nivel 1)
                    </h3>
                    <p className="font-mono text-xs text-sadhana-brown font-medium">
                      Cero retención de tarjetas en nuestros servidores · Transacciones auditadas
                    </p>
                  </div>
                </div>

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <div
                      key={pm.id}
                      className="p-3.5 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-sans text-xs font-bold text-sadhana-dark flex items-center gap-2">
                          <span>{pm.name}</span>
                          <span className="text-[9px] font-mono bg-sadhana-primary/10 text-sadhana-primary px-1.5 py-0.5 rounded border border-sadhana-primary/20">
                            {pm.badge}
                          </span>
                        </h4>
                        <p className="font-mono text-[10px] text-sadhana-brown/80 mt-1 font-bold">
                          {pm.encryption}
                        </p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-sadhana-sand/50 border border-sadhana-primary/30 text-xs text-sadhana-dark flex items-center gap-3 font-medium shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-sadhana-primary shrink-0" />
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
              <div className="p-5 rounded-2xl bg-white border border-sadhana-dark/10 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-sadhana-dark/5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-extrabold text-sadhana-dark">
                      Protocolo de Aclimatación a 3,347 msnm & Asistencia Médica
                    </h3>
                    <p className="font-mono text-xs text-sky-700 font-bold">
                      Pisac · Faldas del Apu Linli · Cordillera de Vilcanota
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center font-bold font-mono shadow-sm">
                      O₂
                    </div>
                    <h4 className="font-bold text-sadhana-dark">Oxígeno Medicinal</h4>
                    <p className="text-sadhana-brown text-[11px] leading-relaxed font-medium">
                      Balones portátiles de alta pureza médica siempre disponibles en el santuario para emergencias inmediatas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center font-bold font-mono shadow-sm">
                      🌿
                    </div>
                    <h4 className="font-bold text-sadhana-dark">Botica de Altura</h4>
                    <p className="text-sadhana-brown text-[11px] leading-relaxed font-medium">
                      Infusiones frescas de Hoja de Coca orgánica, Muña silvestre y plantas adaptógenas andinas cosechadas in situ.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sadhana-sand/30 border border-sadhana-dark/5 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-200 text-sky-600 mx-auto flex items-center justify-center font-bold font-mono shadow-sm">
                      📡
                    </div>
                    <h4 className="font-bold text-sadhana-dark">Enlace Satelital</h4>
                    <p className="text-sadhana-brown text-[11px] leading-relaxed font-medium">
                      Comunicación de emergencia permanente con el Centro de Salud de Pisac y clínicas especializadas de Cusco.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200 text-xs text-sadhana-dark font-medium shadow-sm">
                  <span className="font-bold block mb-1 text-sky-700">Recomendación de llegada:</span>
                  Aconsejamos pasar al menos 24 a 48 horas de aclimatación suave en Cusco o en el Valle Sagrado (Pisac, Urubamba) antes de iniciar caminatas exigentes o ceremonias profundas.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-sadhana-sand/50 border-t border-sadhana-dark/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-mono text-sadhana-brown font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pampa Ñusta cumple con los estándares de Turismo Rural Comunitario de MINCETUR & DIRCETUR Cusco.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sadhana-primary hover:bg-sadhana-orange text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            Entendido
          </button>
        </div>

      </div>

    </div>
  );
};
