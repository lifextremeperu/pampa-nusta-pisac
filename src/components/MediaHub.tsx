import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Radio, Calendar, Video, Clock } from 'lucide-react';

const INTERVIEWS = [
  {
    id: 1,
    title: 'Sanando con Wachuma: El Camino del Corazón',
    duration: '45:20',
    thumbnail: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    host: 'Pampa Ñusta Podcast'
  },
  {
    id: 2,
    title: 'Bioconstrucción: El Futuro es Ancestral',
    duration: '32:15',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    host: 'Ecoaldeas Andinas'
  },
  {
    id: 3,
    title: 'Preservación de Semillas Nativas en el Valle',
    duration: '50:00',
    thumbnail: 'https://images.unsplash.com/photo-1595806653372-5256eeb9b251?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    host: ' Guardianes de la Tierra'
  }
];

export const MediaHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'interviews'>('live');

  return (
    <section className="relative py-24 bg-black text-white border-t border-white/5 overflow-hidden">
      {/* Cinematic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sadhana-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sadhana-primary/20 bg-sadhana-primary/5 text-sadhana-primary text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-4"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Conexión Global</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
              Centro Multimedia
            </h2>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 ${
                activeTab === 'live' ? 'bg-sadhana-primary text-sadhana-dark font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'live' ? 'bg-sadhana-dark animate-pulse' : 'bg-white/20'}`} />
              TikTok Live
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 ${
                activeTab === 'interviews' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              Entrevistas
            </button>
          </div>
        </div>

        {/* CONTENIDO TIKTOK LIVE */}
        {activeTab === 'live' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel-dark p-6 md:p-10 rounded-[2.5rem] border border-white/10"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono font-bold uppercase tracking-widest animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Transmisión Programada
              </div>
              <h3 className="text-3xl font-bold font-sans text-white">Sanación a Distancia: Ceremonia del Sonido</h3>
              <p className="text-sadhana-brown/80 leading-relaxed font-medium">
                Únete a nuestra próxima transmisión en vivo desde la Maloka Ceremonial en el Valle Sagrado. Comparte con la comunidad global, haz preguntas en tiempo real y recibe la vibración de los cantos ancestrales.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sadhana-orange" />
                  <span className="font-mono text-sm">Viernes, 20:00 EST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sadhana-orange" />
                  <span className="font-mono text-sm">Duración: 2 Horas</span>
                </div>
              </div>

              <div className="pt-6">
                <button className="px-8 py-4 rounded-full bg-sadhana-primary text-sadhana-dark font-sans font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,174,66,0.3)] hover:scale-105 transition-all">
                  Agendar en TikTok
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Live Preview" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-sadhana-primary hover:text-sadhana-dark hover:border-sadhana-primary transition-all group-hover:scale-110">
                  <Play className="w-8 h-8 ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <img src="/logo.svg" alt="Pampa Ñusta Logo" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="text-xs font-bold text-white">@pampanusta.live</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTENIDO ENTREVISTAS */}
        {activeTab === 'interviews' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {INTERVIEWS.map((interview) => (
              <div key={interview.id} className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer">
                <div className="h-48 md:h-56 relative overflow-hidden">
                  <img 
                    src={interview.thumbnail} 
                    alt={interview.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono tracking-widest text-white">
                    {interview.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-sadhana-primary text-sadhana-dark flex items-center justify-center">
                      <Play className="w-5 h-5 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-mono uppercase tracking-widest text-sadhana-primary mb-2">
                    {interview.host}
                  </p>
                  <h3 className="font-sans font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-sadhana-primary transition-colors">
                    {interview.title}
                  </h3>
                  <button className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors mt-4 flex items-center gap-1">
                    Ver Episodio <Play className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
