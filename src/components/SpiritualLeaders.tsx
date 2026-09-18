import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SpiritualLeaders: React.FC = () => {
  const { t } = useTranslation();

  const LEADERS = [
    {
      id: 'lider1',
      name: t('leaders.lider1.name'),
      role: t('leaders.lider1.role'),
      region: t('leaders.lider1.region'),
      description: t('leaders.lider1.desc'),
      image: '/assets/leaders/lider1.jpg'
    },
    {
      id: 'lider2',
      name: t('leaders.lider2.name'),
      role: t('leaders.lider2.role'),
      region: t('leaders.lider2.region'),
      description: t('leaders.lider2.desc'),
      image: '/assets/leaders/lider2.jpg'
    },
    {
      id: 'lider3',
      name: t('leaders.lider3.name'),
      role: t('leaders.lider3.role'),
      region: t('leaders.lider3.region'),
      description: t('leaders.lider3.desc'),
      image: '/assets/leaders/lider3.jpg'
    },
    {
      id: 'lider4',
      name: t('leaders.lider4.name'),
      role: t('leaders.lider4.role'),
      region: t('leaders.lider4.region'),
      description: t('leaders.lider4.desc'),
      image: '/assets/leaders/lider4.jpg'
    }
  ];

  return (
    <section id="lideres" className="relative py-24 md:py-32 bg-sadhana-dark text-white border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/5 text-sadhana-primary text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('leaders.subtitle')}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase"
          >
            {t('leaders.title')}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sadhana-brown/80 max-w-2xl text-sm md:text-base font-medium leading-relaxed"
          >
            {t('leaders.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {LEADERS.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.15) }}
              className="group relative h-[450px] rounded-3xl overflow-hidden bg-sadhana-dark/50 border border-sadhana-primary/10 shadow-2xl"
            >
              <motion.img 
                initial={{ opacity: 0, scale: 1.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (index * 0.15) }}
                src={leader.image} 
                alt={leader.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/40 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-sadhana-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {leader.region}
                </p>
                <h3 className="font-cinzel font-bold text-2xl text-white mb-1 drop-shadow-md">
                  {leader.name}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-sadhana-orange font-bold mb-4">
                  {leader.role}
                </p>
                <p className="text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {leader.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
