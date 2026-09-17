import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Mountain, Sun } from 'lucide-react';

export const IdentitySection: React.FC = () => {
  return (
    <section className="relative py-24 bg-sadhana-dark text-white border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sadhana-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sadhana-orange/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/5 text-sadhana-primary text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Nuestra Identidad</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6"
          >
            SANTUARIO ECOLÓGICO
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quiénes Somos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-panel-dark p-8 md:p-10 rounded-[2rem] border border-white/5 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sadhana-orange mb-6 shadow-sm">
              <Mountain className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-xl font-bold tracking-widest uppercase text-white mb-4">¿Quiénes Somos?</h3>
            <p className="text-sadhana-brown/80 leading-relaxed font-medium text-sm md:text-base">
              Somos un colectivo de guardianes de la tierra ubicados en la comunidad de Maska, Pisac. Conformamos una ecoaldea viva dedicada a preservar la memoria ancestral andina, la bioconstrucción y el legado espiritual de los Andes para las futuras generaciones.
            </p>
          </motion.div>

          {/* Misión */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel-dark p-8 md:p-10 rounded-[2rem] border border-white/5 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sadhana-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-full bg-sadhana-primary/10 border border-sadhana-primary/20 flex items-center justify-center text-sadhana-primary mb-6 shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-xl font-bold tracking-widest uppercase text-white mb-4">Nuestra Misión</h3>
            <p className="text-sadhana-brown/80 leading-relaxed font-medium text-sm md:text-base">
              Proteger y cultivar el banco genético del cactus sagrado Wachuma y de semillas nativas, brindando un espacio de educación alternativa para niños y un refugio de sanación integral a través de ceremonias y tecnologías regenerativas.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-panel-dark p-8 md:p-10 rounded-[2rem] border border-white/5 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 shadow-sm">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-xl font-bold tracking-widest uppercase text-white mb-4">Nuestra Visión</h3>
            <p className="text-sadhana-brown/80 leading-relaxed font-medium text-sm md:text-base">
              Convertirnos en un epicentro global de sabiduría ancestral y permacultura, donde la humanidad recuerde cómo convivir en armonía con la Pachamama, expandiendo la conciencia colectiva desde el Valle Sagrado de los Incas hacia el mundo entero.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
