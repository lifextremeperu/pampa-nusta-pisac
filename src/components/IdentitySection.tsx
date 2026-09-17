import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Mountain, Sun } from 'lucide-react';

export const IdentitySection: React.FC = () => {
  return (
    <section id="identidad" className="relative py-24 md:py-32 bg-sadhana-dark text-white border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-sadhana-dark opacity-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sadhana-primary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sadhana-orange/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-[2.5rem] border border-white/10 relative group overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            {/* Dynamic Image Background */}
            <img src="/assets/ecoaldea/identidad_quienes_somos_1789663565033.jpg" alt="Quiénes Somos" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
              <div className="w-14 h-14 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-sadhana-orange mb-6 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-2xl font-black tracking-widest uppercase text-white mb-4 drop-shadow-md">¿Quiénes Somos?</h3>
              <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">
              Somos un colectivo de guardianes de la tierra ubicados en la comunidad de Maska, Pisac. Conformamos una ecoaldea viva dedicada a preservar la memoria ancestral andina, la bioconstrucción y el legado espiritual de los Andes para las futuras generaciones.
            </p>
            </div>
          </motion.div>

          {/* Misión */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-[2.5rem] border border-white/10 relative group overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            {/* Dynamic Image Background */}
            <img src="/assets/ecoaldea/identidad_mision_1789663588075.jpg" alt="Nuestra Misión" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-sadhana-primary/10 mix-blend-overlay" />

            {/* Content Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
              <div className="w-14 h-14 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-sadhana-primary/30 flex items-center justify-center text-sadhana-primary mb-6 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-2xl font-black tracking-widest uppercase text-white mb-4 drop-shadow-md">Nuestra Misión</h3>
              <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">
              Proteger y cultivar el banco genético del cactus sagrado Wachuma y de semillas nativas, brindando un espacio de educación alternativa para niños y un refugio de sanación integral a través de ceremonias y tecnologías regenerativas.
            </p>
            </div>
          </motion.div>

          {/* Visión */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-[2.5rem] border border-white/10 relative group overflow-hidden shadow-2xl flex flex-col md:col-span-1 lg:col-span-1 h-[500px]"
          >
            {/* Dynamic Image Background */}
            <img src="/assets/ecoaldea/identidad_vision_1789663600150.jpg" alt="Nuestra Visión" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay" />

            {/* Content Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
              <div className="w-14 h-14 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-yellow-500/30 flex items-center justify-center text-yellow-500 mb-6 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-2xl font-black tracking-widest uppercase text-white mb-4 drop-shadow-md">Nuestra Visión</h3>
              <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">
                Convertirnos en un epicentro global de sabiduría ancestral y permacultura, donde la humanidad recuerde cómo convivir en armonía con la Pachamama, expandiendo la conciencia colectiva desde el Valle Sagrado de los Incas hacia el mundo entero.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
