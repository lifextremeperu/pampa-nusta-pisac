import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DonationBannerProps {
  onNavigate: () => void;
}

export const DonationBanner: React.FC<DonationBannerProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
    <section className="py-32 md:py-48 bg-sadhana-dark text-white flex flex-col items-center justify-center text-center px-6 border-t border-sadhana-sand/10 relative overflow-hidden">
      
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sadhana-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <Leaf className="w-8 h-8 text-sadhana-primary mb-8 opacity-90" />
        
        <h2 className="text-xs md:text-sm font-mono tracking-[0.3em] text-sadhana-primary font-bold uppercase mb-6">
          {t('donation_banner.subtitle')}
        </h2>
        
        <h3 className="text-4xl md:text-6xl font-sans font-black tracking-tighter text-white mb-8 leading-tight">
          {t('donation_banner.title_line1')} <br className="hidden md:block" />
          <span className="text-sadhana-sand">{t('donation_banner.title_line2')}</span>
        </h3>
        
        <p className="text-base md:text-lg text-sadhana-sand/80 font-medium leading-relaxed mb-12 max-w-2xl">
          {t('donation_banner.desc')}
        </p>

        <button 
          onClick={onNavigate}
          className="group relative flex items-center gap-4 px-8 py-4 bg-transparent border border-sadhana-primary/30 hover:bg-sadhana-primary/10 rounded-full transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-sadhana-sand transition-colors">
            {t('donation_banner.action')}
          </span>
          <ArrowRight className="w-4 h-4 text-sadhana-primary group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
