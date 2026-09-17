import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Heart, Home, ArrowRight, Sparkles } from 'lucide-react';
import { ApplicationFormModal, ApplicationType } from './ApplicationFormModal';

const JOIN_PATHS = [
  {
    id: 'voluntariado',
    title: 'Voluntariado (Ayni)',
    icon: <Leaf className="w-6 h-6 text-sadhana-primary" />,
    description: 'Aprende bioconstrucción, permacultura y conservación de semillas. Una inmersión de 1 a 3 meses trabajando en armonía con la tierra.',
    requirements: ['Amor por la naturaleza', 'Disposición física', 'Estadía mínima de 2 semanas'],
    action: 'Ver Programa'
  },
  {
    id: 'retiro',
    title: 'Inmersión y Sanación',
    icon: <Heart className="w-6 h-6 text-sadhana-orange" />,
    description: 'Participa en nuestros retiros inmersivos. Conecta con las medicinas ancestrales, ceremonias de fuego y limpieza espiritual.',
    requirements: ['Entrevista previa', 'Preparación de dieta', 'Respeto absoluto al linaje'],
    action: 'Agendar Retiro'
  },
  {
    id: 'residencia',
    title: 'Residencia (Guardián)',
    icon: <Home className="w-6 h-6 text-amber-500" />,
    description: 'Postula para ser un habitante permanente de la Ecoaldea. Comparte nuestra visión de sostenibilidad y ayuda a guiar el proyecto a largo plazo.',
    requirements: ['Aprobación del Consejo', 'Habilidad de aporte', 'Compromiso vitalicio'],
    action: 'Postular'
  }
];

export const JoinUsSection: React.FC = () => {
  const [modalType, setModalType] = useState<ApplicationType>(null);

  return (
    <section id="unirse" className="relative py-24 md:py-32 bg-sadhana-dark text-white border-t border-white/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sadhana-primary/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/5 text-sadhana-primary text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sé Parte de la Tribu</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase"
          >
            Cómo Unirse a Pampa Ñusta
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sadhana-sand/80 text-sm md:text-base font-medium leading-relaxed"
          >
            El llamado de la montaña es para quienes sienten el profundo deseo de reconectar con la Pachamama. Existen diferentes caminos para integrarte a nuestra comunidad, desde visitas cortas de aprendizaje hasta convertirte en un guardián permanente del santuario.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {JOIN_PATHS.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.15) }}
              className="relative p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/10 transition-colors duration-500 flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-sadhana-dark border border-white/10 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                {path.icon}
              </div>
              
              <h3 className="font-sans text-2xl font-bold tracking-tight text-white mb-4">
                {path.title}
              </h3>
              
              <p className="text-sadhana-sand/80 text-sm leading-relaxed mb-8 flex-grow">
                {path.description}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] font-mono tracking-widest text-sadhana-primary uppercase">Requisitos:</h4>
                <ul className="space-y-2">
                  {path.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <span className="w-1 h-1 rounded-full bg-sadhana-primary/50 mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setModalType(path.id as ApplicationType)}
                className="w-full py-4 rounded-xl border border-white/10 bg-sadhana-dark hover:bg-sadhana-primary hover:border-sadhana-primary hover:text-sadhana-dark text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn mt-auto"
              >
                <span>{path.action}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ApplicationFormModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType} 
      />
    </section>
  );
};
