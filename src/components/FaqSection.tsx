import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: '¿Qué incluye mi participación en los retiros o talleres?',
    answer: 'Nuestros retiros incluyen alojamiento en la ecoaldea (glamping o habitaciones de adobe), alimentación orgánica basada en el ecosistema andino, acceso al santuario arqueológico privado, ceremonias guiadas por líderes espirituales auténticos y participación en los módulos de Ayni (siembra, cuidado de la Wachuma).'
  },
  {
    question: '¿Necesito experiencia previa con plantas maestras?',
    answer: 'No. El santuario recibe tanto a iniciados como a personas sin experiencia. Nuestros maestros Wachumeros y guías espirituales realizan una evaluación y orientación previa para asegurar que tu inmersión sea segura, respetuosa y alineada a tu nivel de preparación.'
  },
  {
    question: '¿A dónde se destinan las donaciones de Adopción (Ayni)?',
    answer: 'El 100% de los aportes de los custodios se destina directamente a tres pilares: 1) Restauración y mantenimiento de los andenes milenarios. 2) Protección del banco genético de la Wachuma y semillas nativas. 3) Sostenimiento de la Escuela Viva para los niños de las comunidades locales.'
  },
  {
    question: '¿Puedo visitar el santuario solo por un día?',
    answer: 'Sí. Aunque recomendamos inmersiones de 4+ días para una experiencia completa, contamos con programas de visita de un día (Full Day) que incluyen recorrido por el santuario botánico, almuerzo orgánico y una introducción a la cosmovisión andina.'
  },
  {
    question: '¿Cómo funciona la garantía de Ayni en caso de emergencias?',
    answer: 'Comprendemos que los planes pueden cambiar. Nuestra Garantía de Ayni sin penalidad te permite reprogramar tu fecha de visita de por vida o solicitar un reembolso si nos avisas con al menos 24 horas de anticipación a tu llegada.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-sadhana-sand/30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <HelpCircle className="w-8 h-8 text-sadhana-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-sadhana-dark tracking-tighter uppercase mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-sadhana-brown font-medium max-w-2xl mx-auto">
            Resolvemos tus dudas sobre la ecoaldea, los retiros y el sistema de Ayni.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-sadhana-primary bg-sadhana-sand/20 shadow-md' : 'border-sadhana-dark/10 bg-white hover:border-sadhana-primary/30'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`font-bold text-sm md:text-base ${isOpen ? 'text-sadhana-primary' : 'text-sadhana-dark'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-sadhana-primary' : 'text-sadhana-brown'}`} />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-sadhana-brown/80 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};