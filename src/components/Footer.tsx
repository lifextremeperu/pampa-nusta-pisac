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
        {/* COMPLIANCE, RISK-FREE & CERTIFICATIONS (TEXT-ONLY FOOTNOTES)  */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-8 pt-8 border-t border-stone-300 bg-transparent text-stone-500 text-[10px] sm:text-[11px] font-mono leading-relaxed space-y-4">
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center w-full">
            <span><strong className="text-stone-700">CERTIFICADO ACTIVO:</strong> Conexión SSL 256-Bit TLS 1.3</span>
            <span className="text-stone-300">|</span>
            <span><strong className="text-stone-700">PCI-DSS NIVEL 1:</strong> Pagos Seguros (Yape · Plin · Tarjetas)</span>
            <span className="text-stone-300">|</span>
            <span><strong className="text-stone-700">SIN PENALIDADES:</strong> Garantía Cero Riesgo (Reprogramación o devolución 100%)</span>
            <span className="text-stone-300">|</span>
            <span><strong className="text-stone-700">PISAC · 3,347 MSNM:</strong> Oxígeno 24/7 & Protocolo preventivo</span>
          </div>

          <div className="text-center max-w-5xl mx-auto space-y-3 text-stone-500">
            <p>
              <strong className="text-stone-700">CUMPLIMIENTO DE SEGURIDAD & TURISMO RESPONSABLE · COMPROMISO DE NO RIESGO & CERTIFICACIONES:</strong> Viaja y conecta con la sabiduría andina con absoluta tranquilidad. Garantizamos seguridad financiera, protocolos médicos de altura a 3,347 msnm, cifrado SSL bancario y pasarelas de pago 100% auditadas.
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] sm:text-[10px]">
              <span><strong className="text-stone-700">Ayni Allin Kawsay:</strong> Reprogramación de por vida sin penalidad o reembolso total si sufres soroche o imprevistos de viaje.</span>
              <span><strong className="text-stone-700">Samay Wasi Hampiy:</strong> Oximetría a la llegada, oxígeno medicinal 24/7 y botica de plantas andinas.</span>
              <span><strong className="text-stone-700">Apu Linli Guardián:</strong> Guías bilingües certificados WFR, radiocomunicación VHF.</span>
              <span><strong className="text-stone-700">Willka Kancha Hampiy:</strong> Protocolo Ceremonial Ético & Consentimiento Informado.</span>
              <span><strong className="text-stone-700">Allpa Wasichiy Kawsay:</strong> Bioconstrucción Sismorresistente & Agua de Manantial Certificada.</span>
              <span><strong className="text-stone-700">Taqikuy Asegurado:</strong> Cifrado SSL 256-Bit & Pasarela de Pagos Tokenizada (PCI-DSS).</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-stone-500 mt-4">
            <span className="border border-stone-300 px-2 py-0.5 rounded bg-white">📱 YAPE</span>
            <span className="border border-stone-300 px-2 py-0.5 rounded bg-white">⚡ PLIN</span>
            <span className="border border-stone-300 px-2 py-0.5 rounded bg-white">💳 VISA / MASTERCARD</span>
            <span className="border border-stone-300 px-2 py-0.5 rounded bg-white">🏦 BCP / BBVA / INTERBANK</span>
            <span className="border border-emerald-300 px-2 py-0.5 rounded text-emerald-800 bg-emerald-50">🛡️ PCI-DSS NIVEL 1</span>
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

