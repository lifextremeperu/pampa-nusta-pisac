import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import { Menu } from 'lucide-react';

// Core 1820 Layout Components
import { Preloader } from './components/Preloader';
import { GlobalAudioPlayer } from './components/1820/GlobalAudioPlayer';
import { FullscreenMenu } from './components/1820/FullscreenMenu';

import { EcoaldeaModules } from './components/EcoaldeaModules';
import { ImpactStoryScroll } from './components/ImpactStoryScroll';
import { SocialProofSection } from './components/SocialProofSection';
import { DonationBanner } from './components/DonationBanner';
import { DonationSystem } from './components/DonationSystem';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { IdentitySection } from './components/IdentitySection';
import { SpiritualLeaders } from './components/SpiritualLeaders';
import { MediaHub } from './components/MediaHub';
import { JoinUsSection } from './components/JoinUsSection';

// Modals & Overlays
import { CustomCursor } from './components/CustomCursor';
import { CinematicTransitions } from './components/CinematicTransitions';
import { ConectaPampaNustaChatbot } from './components/ConectaPampaNustaChatbot';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SecurityComplianceModal } from './components/SecurityComplianceModal';
import { ModuleExperienceModal } from './components/ModuleExperienceModal';
import { MobileCinematicDock } from './components/MobileCinematicDock';
import { ECOALDEA_MODULES } from './data/ecoaldeaModules';
import { EcoaldeaModule } from './types';
import { SanctuaryFacility } from './data/sanctuaryFacilities';
import { ProjectLandingPage } from './components/ProjectLandingPage';
import { NustaScrollTelling } from './components/NustaScrollTelling';

const VirtualTour360 = lazy(() => import('./components/VirtualTour360').then(module => ({ default: module.VirtualTour360 })));
const CinematicTrailerModal = lazy(() => import('./components/CinematicTrailerModal').then(module => ({ default: module.CinematicTrailerModal })));

const WachumaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Columna Izquierda */}
    <path d="M6 22V10c0-1 1-2 2-2s2 1 2 2v12" fill="currentColor" fillOpacity="0.1" />
    <path d="M6 22V10c0-1 1-2 2-2s2 1 2 2v12" />
    <path d="M8 9v13" strokeWidth="1" strokeOpacity="0.5" />
    
    {/* Columna Central (Más alta) */}
    <path d="M10 22V4c0-1 1-2 2-2s2 1 2 2v18" fill="currentColor" fillOpacity="0.15" />
    <path d="M10 22V4c0-1 1-2 2-2s2 1 2 2v18" />
    <path d="M12 3v19" strokeWidth="1" strokeOpacity="0.5" />
    
    {/* Columna Derecha */}
    <path d="M14 22V13c0-.8.8-1.5 1.5-1.5s1.5.8 1.5 1.5v9" fill="currentColor" fillOpacity="0.1" />
    <path d="M14 22V13c0-.8.8-1.5 1.5-1.5s1.5.8 1.5 1.5v9" />
    <path d="M15.5 12v10" strokeWidth="1" strokeOpacity="0.5" />
    
    {/* Espinas sutiles (Areolas) */}
    <path d="M10 7h-.5 M14 9h.5 M10 14h-.5 M14 16h.5 M6 13h-.5 M10 18h-.5 M17 17h.5" strokeWidth="1.5" />
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [securityModalTab, setSecurityModalTab] = useState<'guarantee' | 'ssl' | 'altitude' | 'payments'>('guarantee');
  const [selectedExperienceModule, setSelectedExperienceModule] = useState<EcoaldeaModule | null>(null);
  
  const [currentPage, setCurrentPage] = useState<'home' | 'mecenazgo' | 'project-landing'>('home');
  const [selectedSanctuaryFacility, setSelectedSanctuaryFacility] = useState<SanctuaryFacility | null>(null);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSecurityModal = (tab: 'guarantee' | 'ssl' | 'altitude' | 'payments' = 'guarantee') => {
    setSecurityModalTab(tab);
    setIsSecurityModalOpen(true);
  };

  if (currentPage === 'mecenazgo') {
    return (
      <div className="min-h-screen bg-sadhana-dark text-white font-sans relative overflow-x-hidden selection:bg-sadhana-primary selection:text-white">
        <CustomCursor />
        <GlobalAudioPlayer />
        
        <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center text-white mix-blend-difference">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 cursor-pointer group">
            <span className="text-xl font-bold tracking-[0.2em]">PAMPA ÑUSTA</span>
            <WachumaIcon className="w-5 h-5 opacity-90 group-hover:text-sadhana-primary transition-colors" />
          </button>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 hover:text-sadhana-primary transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Volver al Inicio</span>
          </button>
        </header>

        <DonationSystem />
        
        <Footer
          onSelectModule={(id) => setSelectedExperienceModule(ECOALDEA_MODULES.find(m => m.id === id) || null)}
          onOpenSecurityModal={handleOpenSecurityModal}
        />
      </div>
    );
  }

  if (currentPage === 'project-landing' && selectedSanctuaryFacility) {
    return (
      <>
        <CustomCursor />
        <GlobalAudioPlayer />
        <ProjectLandingPage 
          project={selectedSanctuaryFacility} 
          onBack={() => setCurrentPage('home')} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-sadhana-dark font-sans relative overflow-x-hidden selection:bg-sadhana-primary selection:text-white">
      {/* 1. INITIAL LOADERS & AUDIO */}
      <Preloader />
      <CustomCursor />      {/* 2. FIXED NAVIGATION HEADER (Minimalist) */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center mix-blend-difference text-white">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 cursor-pointer group">
          <span className="text-xl font-bold tracking-[0.2em] uppercase">Pampa Ñusta</span>
          <WachumaIcon className="w-5 h-5 opacity-90 group-hover:text-sadhana-primary transition-colors" />
        </button>
        <div className="flex items-center gap-3 md:gap-6">
          <GlobalAudioPlayer />
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 hover:text-sadhana-primary transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest hidden md:inline font-medium">Menú</span>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      <FullscreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={scrollToSection} 
      />

      {/* 4. MAIN CONTENT SECTIONS (Parallax & Normal Scroll) */}
      <div className="relative z-10 bg-white">

        <div id="memoria-viva">
          <CinematicTransitions />
        </div>

        <div id="identidad-corporativa">
          <IdentitySection />
        </div>

        <div id="leyenda-originaria">
          <NustaScrollTelling />
        </div>

        <div id="ecoaldea-modulos">
          <EcoaldeaModules 
            onSelectModuleForExperience={(module) => setSelectedExperienceModule(module)} 
            onOpenTrailer={() => setIsTrailerOpen(true)} 
          />
        </div>

        <div id="historia-impacto">
          <ImpactStoryScroll />
        </div>

        <div id="recorrido-360">
          <Suspense fallback={<div className="h-[50vh] w-full flex items-center justify-center bg-sadhana-sand text-sadhana-dark">Cargando Recorrido 360°...</div>}>
            <VirtualTour360 onOpenProject={(fac) => {
              setSelectedSanctuaryFacility(fac);
              setCurrentPage('project-landing');
            }} />
          </Suspense>
        </div>

        <div id="testimonios">
          <SocialProofSection />
        </div>

        <div id="guardianes">
          <SpiritualLeaders />
        </div>

        <div id="media-hub">
          <MediaHub />
        </div>

        <div id="como-unirse">
          <JoinUsSection />
        </div>

        <div id="donaciones">
          <DonationBanner onNavigate={() => {
            setCurrentPage('mecenazgo');
            window.scrollTo(0, 0);
          }} />
        </div>
        
        <FaqSection />

        <LocationSection />

      </div>

      {/* 5. FOOTER */}
      <Footer
        onSelectModule={(id) => setSelectedExperienceModule(ECOALDEA_MODULES.find(m => m.id === id) || null)}
        onOpenSecurityModal={handleOpenSecurityModal}
      />

      {/* 6. MODALS & OVERLAYS */}
      <Suspense fallback={null}>
        <CinematicTrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      </Suspense>

      {selectedExperienceModule && (
        <ModuleExperienceModal
          module={selectedExperienceModule}
          onClose={() => setSelectedExperienceModule(null)}
        />
      )}

      <MobileCinematicDock
        onOpenTrailer={() => setIsTrailerOpen(true)}
        onOpenDonate={() => scrollToSection('donaciones')}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenChatbot={() => {
          setIsChatbotOpen(false);
          setTimeout(() => setIsChatbotOpen(true), 10);
        }}
        onOpenSecurityModal={handleOpenSecurityModal}
      />

      <ConectaPampaNustaChatbot
        isOpenExternal={isChatbotOpen}
        onCloseExternal={() => setIsChatbotOpen(false)}
      />

      <SecurityComplianceModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        defaultTab={securityModalTab}
      />
    </div>
  );
}

