import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Leaf, Heart, Home } from 'lucide-react';

export type ApplicationType = 'voluntariado' | 'retiro' | 'residencia' | null;

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ApplicationType;
}

const FORM_CONFIG = {
  voluntariado: {
    title: 'Postulación a Voluntariado (Ayni)',
    icon: <Leaf className="w-6 h-6 text-sadhana-primary" />,
    description: 'Únete a nuestro equipo de campo. Aprende bioconstrucción y permacultura.',
    extraFields: [
      { id: 'availability', label: 'Disponibilidad de tiempo', type: 'select', options: ['2 Semanas', '1 Mes', '3 Meses'] },
      { id: 'skills', label: 'Habilidades (Carpintería, huerto, etc.)', type: 'textarea' }
    ]
  },
  retiro: {
    title: 'Agendar Retiro y Sanación',
    icon: <Heart className="w-6 h-6 text-sadhana-orange" />,
    description: 'Inicia tu proceso de purificación profunda con plantas maestras.',
    extraFields: [
      { id: 'dates', label: 'Fechas estimadas de viaje', type: 'text', placeholder: 'Ej. Mayo 2027' },
      { id: 'experience', label: '¿Tienes experiencia previa con plantas maestras?', type: 'select', options: ['Sí, tengo experiencia', 'No, es mi primera vez'] }
    ]
  },
  residencia: {
    title: 'Postulación a Residencia',
    icon: <Home className="w-6 h-6 text-amber-500" />,
    description: 'El primer paso para convertirte en Guardián permanente del Santuario.',
    extraFields: [
      { id: 'contribution', label: '¿Cómo aportarías a la Ecoaldea a largo plazo?', type: 'textarea', placeholder: 'Describe tus proyectos o visión...' },
      { id: 'family', label: '¿Postulas solo o con familia?', type: 'select', options: ['Individual', 'Pareja', 'Familia con niños'] }
    ]
  }
};

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ isOpen, onClose, type }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen || !type) return null;

  const config = FORM_CONFIG[type];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 sm:p-6 py-8 text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-sadhana-dark/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-sadhana-dark rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 my-auto overflow-hidden"
          >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-black/20 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 shadow-inner flex items-center justify-center">
                {config.icon}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white font-sans tracking-tight">
                  {config.title}
                </h2>
                <p className="text-xs md:text-sm text-white/70 font-medium mt-1 max-w-sm">
                  {config.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto overflow-x-hidden">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-sadhana-primary/20 border border-sadhana-primary/30 rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <CheckCircle className="w-10 h-10 text-sadhana-primary" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-3">¡Solicitud Recibida!</h3>
                <p className="text-white/70 max-w-md leading-relaxed text-sm md:text-base">
                  Hemos recibido tus datos correctamente. El Consejo de Pampa Ñusta evaluará tu perfil y nos pondremos en contacto contigo pronto a través de los canales proporcionados.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">Nombre Completo</label>
                    <input required type="text" className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">País de Residencia</label>
                    <input required type="text" className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner" placeholder="Ej. Perú, España..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">Correo Electrónico</label>
                    <input required type="email" className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">WhatsApp / Teléfono</label>
                    <input required type="tel" className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner" placeholder="+51 999 999 999" />
                  </div>
                </div>

                {config.extraFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea required className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm min-h-[100px] shadow-inner custom-scrollbar" placeholder={field.placeholder || ''} />
                    ) : field.type === 'select' ? (
                      <select required className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner appearance-none cursor-pointer">
                        <option value="" className="bg-sadhana-dark text-white/50">Selecciona una opción...</option>
                        {field.options?.map(opt => <option key={opt} value={opt} className="bg-sadhana-dark text-white">{opt}</option>)}
                      </select>
                    ) : (
                      <input required type={field.type} className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm shadow-inner" placeholder={field.placeholder || ''} />
                    )}
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold font-mono tracking-widest uppercase text-sadhana-primary">Cuéntanos sobre ti (Motivación)</label>
                  <textarea required className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm min-h-[120px] shadow-inner custom-scrollbar" placeholder="¿Por qué sientes el llamado de unirte a Pampa Ñusta?" />
                </div>

                <div className="pt-4 pb-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl border border-sadhana-primary bg-sadhana-primary/10 hover:bg-sadhana-primary text-white font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Enviar Solicitud</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
