import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FaqSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [
    {
      question: t('faq.items.0.question'),
      answer: t('faq.items.0.answer')
    },
    {
      question: t('faq.items.1.question'),
      answer: t('faq.items.1.answer')
    },
    {
      question: t('faq.items.2.question'),
      answer: t('faq.items.2.answer')
    },
    {
      question: t('faq.items.3.question'),
      answer: t('faq.items.3.answer')
    },
    {
      question: t('faq.items.4.question'),
      answer: t('faq.items.4.answer')
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-sadhana-sand/30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <HelpCircle className="w-8 h-8 text-sadhana-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-sadhana-dark tracking-tighter uppercase mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-sadhana-brown font-medium max-w-2xl mx-auto">
            {t('faq.desc')}
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