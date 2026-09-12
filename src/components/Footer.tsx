import React from 'react';
import { Sparkles, MapPin, Award, HeartHandshake, Leaf, Compass, Trees, MessageCircle, ShieldCheck, Lock, RotateCcw, Activity, CheckCircle2, ChevronRight, CreditCard, Building2, Mountain } from 'lucide-react';
import { ECOALDEA_MODULES } from '../data/ecoaldeaModules';

interface FooterProps {
  onSelectModule?: (moduleId: string) => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectModule, onOpenSecurityModal }) => {
  const handleSecurityClick = (tab: 'guarantee' | 'ssl' | 'altitude' | 'payments' = 'guarantee') => {
    if (onOpenSecurityModal) {
      onOpenSecurityModal(tab);
    } else {
      const el = document.getElementById('certificaciones-seguridad');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-stone-100 text-stone-700 border-t border-stone-300 pt-16 pb-12 overflow-hidden">
      {/* Earth Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Natural Reserve Billing Block */}
        <div className="mb-14 pb-12 border-b border-stone-200 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-50 text-amber-900 text-[10px] font-mono uppercase tracking-widest mb-4 font-bold shadow-sm">
            <Leaf className="w-3 h-3 text-amber-700" />
            <span>FICHA DE CONSERVACIÓN · RESERVA NATURAL & SANTUARIO</span>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-stone-950 uppercase mb-4">
            PAMPA ÑUSTA: LA MEMORIA VIVA DE PISAC
          </h3>

          {/* Billing Names */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-mono text-stone-600 uppercase tracking-widest max-w-4xl mx-auto">
            <span>UN PROYECTO DE <strong className="text-stone-950 font-bold">RESERVA NATURAL PAMPA ÑUSTA</strong></span>
            <span className="text-amber-700 font-bold">·</span>
            <span>DIRECCIÓN BOTÁNICA <strong className="text-stone-950 font-bold">BANCO GENÉTICO DE LA WACHUMA</strong></span>
            <span className="text-amber-700 font-bold">·</span>
            <span>CUSTODIA DE BIODIVERSIDAD <strong className="text-stone-950 font-bold">ARCA DE SEMILLAS ANDINAS</strong></span>
            <span className="text-amber-700 font-bold">·</span>
            <span>PEDAGOGÍA DE LA TIERRA <strong className="text-stone-950 font-bold">ESCUELA VIVA</strong></span>
            <span className="text-amber-700 font-bold">·</span>
            <span>MEDICINA SAGRADA <strong className="text-stone-950 font-bold">CÍRCULOS DE PLANTAS MAESTRAS</strong></span>
            <span className="text-amber-700 font-bold">·</span>
            <span>SONIDO DE LA NATURALEZA <strong className="text-stone-950 font-bold">FRECUENCIAS 432HZ</strong></span>
          </div>
        </div>

        {/* 4 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-amber-500/40 bg-amber-50 flex items-center justify-center shadow-sm">
                <Leaf className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold text-stone-950 block tracking-wider">
                  PAMPA ÑUSTA
                </span>
                <span className="text-[10px] text-amber-800 tracking-widest font-mono uppercase font-bold">
                  Pisac · Valle Sagrado · Perú
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Reserva natural, santuario ecológico y comunidad regenerativa dedicada a la preservación del cactus sagrado Wachuma, las semillas ancestrales y el aprendizaje comunitario de la tierra.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-600 font-mono font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Pisac, Valle Sagrado, 3,347 msnm</span>
            </div>
          </div>

          {/* 5 Ecoaldea Modules Direct Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 font-bold mb-4">
              Los 5 Módulos del Santuario
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {ECOALDEA_MODULES.map((mod, i) => (
                <a
                  key={mod.id}
                  href="#ecoaldea-modulos"
                  onClick={(e) => {
                    if (onSelectModule) {
                      onSelectModule(mod.id);
                    }
                  }}
                  className="p-3 rounded-xl bg-white border border-stone-200 hover:border-amber-600 hover:bg-amber-50/50 shadow-sm transition-all flex flex-col group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-800 font-bold mb-0.5">
                    <span>0{i + 1} · {mod.chapterNumber}</span>
                    <span className="text-stone-500 uppercase">{mod.element}</span>
                  </div>
                  <span className="font-cinzel font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                    {mod.title}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono truncate mt-0.5">
                    {mod.tagline}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Access & Passes */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 font-bold">
              Involúcrate / Ayni
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Todos los programas están abiertos a mecenas, familias, voluntarios y buscadores del camino sagrado.
            </p>
            <a
              href="#donaciones"
              className="block w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold text-center uppercase tracking-wider transition-all shadow-sm"
            >
              Apadrinar Módulo & Pases
            </a>
            <a
              href="https://wa.me/51958050928?text=Hola%20Pampa%20%C3%91usta%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20para%20aportar%20por%20Yape%20o%20Plin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Yape / Plin: +51 958 050 928</span>
            </a>
            <div className="flex items-center gap-2 text-stone-600 text-[10px] font-mono">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Certificación de Impacto Agroecológico</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* COMPLIANCE, RISK-FREE & CERTIFICATIONS IN FOOTER (TEXTUAL)    */}
        {/* En letras muy pequeñas con enlaces clicables a contenido      */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-10 pt-8 pb-7 border-t border-stone-300/80 bg-stone-200/60 rounded-2xl p-4 sm:p-6 text-stone-800">
          
          {/* Quick Micro-Badges Bar en letras pequeñas */}
          <div className="mb-5 pb-4 border-b border-stone-300/90 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono">
            <button
              onClick={() => handleSecurityClick('ssl')}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-emerald-700" />
              <span>SSL 256-Bit TLS 1.3</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </button>

            <button
              onClick={() => handleSecurityClick('payments')}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-amber-900 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3 h-3 text-amber-700" />
              <span>Pagos Seguros (Yape · Plin · Tarjetas)</span>
            </button>

            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-emerald-700" />
              <span>Garantía 100% Sin Penalidad</span>
            </button>

            <button
              onClick={() => handleSecurityClick('altitude')}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-sky-800 transition-colors cursor-pointer"
            >
              <Activity className="w-3 h-3 text-sky-700" />
              <span>Oxígeno & Aclimatación 3,347 msnm</span>
            </button>
          </div>

          {/* 4 Trust Micro-Cards in Very Small Letters */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Card 1: SSL */}
            <button
              onClick={() => handleSecurityClick('ssl')}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-stone-300 hover:border-emerald-600 transition-all text-left flex items-start gap-2.5 group cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[9px] text-emerald-800 font-bold uppercase tracking-wider">
                    CERTIFICADO ACTIVO
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <h5 className="font-cinzel text-[11px] font-bold text-stone-950 truncate">
                  Conexión SSL 256-Bit
                </h5>
                <p className="font-mono text-[9px] text-stone-600">
                  Cifrado bancario TLS 1.3
                </p>
              </div>
            </button>

            {/* Card 2: PCI-DSS */}
            <button
              onClick={() => handleSecurityClick('payments')}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-stone-300 hover:border-amber-600 transition-all text-left flex items-start gap-2.5 group cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[9px] text-amber-900 font-bold uppercase tracking-wider block">
                  PCI-DSS NIVEL 1
                </span>
                <h5 className="font-cinzel text-[11px] font-bold text-stone-950 truncate">
                  Pagos 100% Seguros
                </h5>
                <p className="font-mono text-[9px] text-stone-600 truncate">
                  Yape · Plin · Visa · Master · BCP
                </p>
              </div>
            </button>

            {/* Card 3: Garantía */}
            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-stone-300 hover:border-emerald-600 transition-all text-left flex items-start gap-2.5 group cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[9px] text-emerald-800 font-bold uppercase tracking-wider block">
                  SIN PENALIDADES
                </span>
                <h5 className="font-cinzel text-[11px] font-bold text-stone-950 truncate">
                  Garantía Cero Riesgo
                </h5>
                <p className="font-mono text-[9px] text-stone-600 truncate">
                  Reprogramación o devolución 100%
                </p>
              </div>
            </button>

            {/* Card 4: Oxígeno */}
            <button
              onClick={() => handleSecurityClick('altitude')}
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-stone-300 hover:border-sky-600 transition-all text-left flex items-start gap-2.5 group cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-800 shrink-0 mt-0.5">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[9px] text-sky-900 font-bold uppercase tracking-wider block">
                  PISAC · 3,347 MSNM
                </span>
                <h5 className="font-cinzel text-[11px] font-bold text-stone-950 truncate">
                  Oxígeno 24/7 & Botiquín
                </h5>
                <p className="font-mono text-[9px] text-stone-600 truncate">
                  Protocolo médico preventivo
                </p>
              </div>
            </button>
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-300">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold mb-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>CUMPLIMIENTO DE SEGURIDAD & TURISMO RESPONSABLE · PISAC</span>
              </div>
              <h4 className="font-cinzel text-sm sm:text-base font-bold tracking-tight text-stone-950 uppercase">
                COMPROMISO DE NO RIESGO & CERTIFICACIONES
              </h4>
              <p className="text-[11px] text-stone-600 max-w-3xl leading-relaxed mt-0.5">
                Viaja y conecta con la sabiduría andina con absoluta tranquilidad. Garantizamos seguridad financiera, protocolos médicos de altura a 3,347 msnm, cifrado SSL bancario y pasarelas de pago 100% auditadas.
              </p>
            </div>

            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-sm self-start md:self-auto"
            >
              <span>Ver Auditoría Completa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Protocols in Small Clickable Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-[11px] font-sans">
            
            {/* Protocol 1: Garantía */}
            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-amber-900">Ayni Allin Kawsay</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 text-[9px]">
                    100% GARANTIZADO
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Garantía 100% Sin Riesgo: Cancelación & Reprogramación Flexible
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Reprogramación de por vida sin penalidad o reembolso total si sufres soroche o imprevistos de viaje.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

            {/* Protocol 2: Oxígeno & Aclimatación */}
            <button
              onClick={() => handleSecurityClick('altitude')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-sky-900">Samay Wasi Hampiy</span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold border border-sky-300 text-[9px]">
                    OXÍGENO & BOTIQUÍN ACTIVO
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Protocolo de Aclimatación a 3,347 msnm & Oxigenoterapia Preventiva
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Oximetría a la llegada, oxígeno medicinal 24/7 y botica de plantas andinas (Coca & Muña).
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

            {/* Protocol 3: Guías WFR */}
            <button
              onClick={() => handleSecurityClick('altitude')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-amber-900">Apu Linli Guardián</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300 text-[9px]">
                    PERSONAL CERTIFICADO
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Guías DIRCETUR & Primeros Auxilios en Zonas Agrestes (WFR)
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Guías bilingües certificados WFR, radiocomunicación VHF directa y enlace satelital con Pisac.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

            {/* Protocol 4: Ético Ceremonial */}
            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-indigo-900">Willka Kancha Hampiy</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-900 font-bold border border-indigo-300 text-[9px]">
                    CÓDIGO ÉTICO AUDITADO
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Protocolo Ceremonial Ético & Consentimiento Informado
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Evaluación de salud previa, ratio seguro de 1 facilitador por 4 personas y contención 24/7.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

            {/* Protocol 5: Bioconstrucción */}
            <button
              onClick={() => handleSecurityClick('guarantee')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-emerald-900">Allpa Wasichiy Kawsay</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 text-[9px]">
                    INFRAESTRUCTURA VERIFICADA
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Bioconstrucción Sismorresistente & Agua de Manantial Certificada
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Estructuras de quincha y piedra antisísmicas, luz solar ininterrumpida y filtración por osmosis.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

            {/* Protocol 6: SSL & Pasarela */}
            <button
              onClick={() => handleSecurityClick('payments')}
              className="text-left p-2.5 rounded-xl bg-stone-100/90 hover:bg-white border border-stone-300/70 hover:border-amber-600 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-amber-900">Taqikuy Asegurado</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300 text-[9px]">
                    CONEXIÓN CIFRADA & AUDITADA
                  </span>
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-800 text-[11px] leading-tight mb-1">
                  Cifrado SSL 256-Bit & Pasarela de Pagos Tokenizada (PCI-DSS)
                </div>
                <p className="text-[10px] text-stone-600 leading-snug">
                  Encriptación de grado bancario TLS 1.3, certificación SSL vigente y cero retención de tarjetas.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-end text-[10px] font-mono text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>Detalles</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>

          </div>

          {/* SSL Certificate & Payment Methods Strip */}
          <div className="mt-4 pt-3 border-t border-stone-300 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono">
            {/* SSL 256-Bit Text Link */}
            <button
              onClick={() => handleSecurityClick('ssl')}
              className="flex items-center gap-2 text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer text-left"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>
                <strong className="text-stone-950 font-bold">CERTIFICADO SSL 256-BIT (TLS 1.3)</strong> · <span className="text-emerald-700 font-bold">ACTIVO</span>: Protección de navegación, datos de reserva y aportes tokenizados de extremo a extremo.
              </span>
            </button>

            {/* Payment Method Text Badges */}
            <div
              onClick={() => handleSecurityClick('payments')}
              className="flex items-center gap-2 flex-wrap justify-center md:justify-end text-[10px] text-stone-700 cursor-pointer hover:text-stone-950 transition-colors"
              title="Click para ver pasarelas y métodos de pago auditados"
            >
              <span className="px-2 py-0.5 rounded bg-white border border-stone-300 font-bold">📱 YAPE</span>
              <span className="px-2 py-0.5 rounded bg-white border border-stone-300 font-bold">⚡ PLIN</span>
              <span className="px-2 py-0.5 rounded bg-white border border-stone-300 font-bold">💳 VISA / MASTERCARD</span>
              <span className="px-2 py-0.5 rounded bg-white border border-stone-300 font-bold">🏦 BCP / BBVA / INTERBANK</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">🛡️ PCI-DSS NIVEL 1</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Attribution */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <p>© 2026 Pampa Ñusta · Reserva Natural & Santuario Ecológico. Pisac, Cusco, Perú.</p>
          <div className="flex items-center gap-4 text-stone-600">
            <span>Santuario Vivo</span>
            <span>·</span>
            <span>Frecuencias 432Hz</span>
            <span>·</span>
            <span className="text-amber-800 font-bold">Pachamama Kawsay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

