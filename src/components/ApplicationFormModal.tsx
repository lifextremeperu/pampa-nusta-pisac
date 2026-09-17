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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-sadhana-dark/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-sadhana-dark/10 bg-sadhana-sand/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                {config.icon}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-sadhana-dark font-sans tracking-tight">
                  {config.title}
                </h2>
                <p className="text-sm text-sadhana-brown/80 font-medium mt-1">
                  {config.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-sadhana-dark transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-sadhana-dark mb-2">¡Solicitud Recibida!</h3>
                <p className="text-sadhana-brown/80 max-w-md">
                  Hemos recibido tus datos correctamente. El Consejo de Pampa Ñusta evaluará tu perfil y nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">Nombre Completo</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">País de Residencia</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm" placeholder="Ej. Perú, España..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">Correo Electrónico</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">WhatsApp / Teléfono</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm" placeholder="+51 999 999 999" />
                  </div>
                </div>

                {config.extraFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea required className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm min-h-[100px]" placeholder={field.placeholder || ''} />
                    ) : field.type === 'select' ? (
                      <select required className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm">
                        <option value="">Selecciona una opción...</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input required type={field.type} className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm" placeholder={field.placeholder || ''} />
                    )}
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono tracking-widest uppercase text-sadhana-dark">Cuéntanos sobre ti (Motivación)</label>
                  <textarea required className="w-full px-4 py-3 rounded-xl border border-sadhana-dark/20 bg-white focus:outline-none focus:border-sadhana-primary focus:ring-1 focus:ring-sadhana-primary transition-all text-sm min-h-[120px]" placeholder="¿Por qué sientes el llamado de unirte a Pampa Ñusta?" />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-sadhana-primary hover:bg-sadhana-dark text-white font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enviar Solicitud</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
