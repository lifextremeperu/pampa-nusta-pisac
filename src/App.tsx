import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReferentialVideoShowcase } from './components/ReferentialVideoShowcase';
import { SecurityComplianceModal } from './components/SecurityComplianceModal';
import { TenOutOfTenShowreel } from './components/TenOutOfTenShowreel';
import { DillingerContentSelector } from './components/DillingerContentSelector';
import { CustomCursor } from './components/CustomCursor';
import { NustaScrollTelling } from './components/NustaScrollTelling';
import { WachumaBotanicalSection } from './components/WachumaBotanicalSection';
import { RiverTimeline } from './components/RiverTimeline';
import { VirtualTour360 } from './components/VirtualTour360';
import { SocialProofSection } from './components/SocialProofSection';
import { DonationSystem } from './components/DonationSystem';
import { Footer } from './components/Footer';
import { CinematicTrailerModal } from './components/CinematicTrailerModal';
import { ModuleExperienceModal } from './components/ModuleExperienceModal';
import { MobileCinematicDock } from './components/MobileCinematicDock';
import { ConectaPampaNustaChatbot } from './components/ConectaPampaNustaChatbot';
import { ECOALDEA_MODULES } from './data/ecoaldeaModules';
import { SHOWREEL_ITEMS, ShowreelItem } from './data/showreelData';
import { ThemeMode, EcoaldeaModule } from './types';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('hanan');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  const [securityModalTab, setSecurityModalTab] = useState<'guarantee' | 'ssl' | 'altitude' | 'payments'>('guarantee');
  const [selectedExperienceModule, setSelectedExperienceModule] = useState<EcoaldeaModule | null>(null);
  const [activeExperienceView, setActiveExperienceView] = useState<'dillinger' | 'reel' | 'full'>('dillinger');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenSecurityModal = (tab: 'guarantee' | 'ssl' | 'altitude' | 'payments' = 'guarantee') => {
    setSecurityModalTab(tab);
    setIsSecurityModalOpen(true);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'hanan' ? 'hurin' : 'hanan'));
  };

  const toggleCinemaMode = () => {
    setIsCinemaMode((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModuleById = (moduleId: string) => {
    const mod = ECOALDEA_MODULES.find((m) => m.id === moduleId) || ECOALDEA_MODULES[0];
    setSelectedExperienceModule(mod);
  };

  const handleOpenExperienceFromShowreelItem = (item: ShowreelItem) => {
    const match = ECOALDEA_MODULES.find((m) => m.id === item.id) || ECOALDEA_MODULES[0];
    setSelectedExperienceModule(match);
  };

  return (
    <div
      className={`min-h-screen text-stone-100 transition-colors duration-700 font-sans relative overflow-x-hidden ${
        themeMode === 'hanan' ? 'bg-stone-950' : 'bg-[#09080d]'
      } ${isCinemaMode ? 'cinema-scope-active pb-16' : ''}`}
    >
      {/* 4. ANIMACIÓN DE CARGA (PRELOADER) */}
      <Preloader />

      {/* Dillinger & 10/10 Hybrid Custom Cursor */}
      <CustomCursor />

      {/* 2.39:1 Cinema Letterbox Overlays when Cinema Mode is active */}
      {isCinemaMode && (
        <>
          <div className="cinema-letterbox-top" aria-hidden="true" />
          <div className="cinema-letterbox-bottom" aria-hidden="true" />
        </>
      )}

      {/* Global Cinematic Navigation Header */}
      <Header
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenDonate={() => scrollToSection('donaciones')}
        isCinemaMode={isCinemaMode}
        onToggleCinemaMode={toggleCinemaMode}
        onOpenTrailer={() => setIsTrailerOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenSecurityModal={handleOpenSecurityModal}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. INICIO: VIDEO DEL ORIGEN DE PAMPA ÑUSTA CON SONIDOS DE      */}
      {/*    NATURALEZA ACTIVADOS AUTOMÁTICAMENTE & LOS 5 MÓDULOS        */}
      {/* ------------------------------------------------------------- */}
      <Hero
        themeMode={themeMode}
        onExploreClick={() => scrollToSection('ecoaldea-modulos')}
        onOpenTrailer={() => setIsTrailerOpen(true)}
        onSelectModule={handleSelectModuleById}
        onOpenSecurityModal={handleOpenSecurityModal}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onScrollToVideoShowcase={() => scrollToSection('video-referencial')}
      />

      {/* ------------------------------------------------------------- */}
      {/* VIDEO REFERENCIAL OFICIAL 4K                                  */}
      {/* ------------------------------------------------------------- */}
      <div id="video-referencial" className="relative z-10 scroll-mt-20">
        <ReferentialVideoShowcase
          onOpenSecurityModal={handleOpenSecurityModal}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onExploreModules={() => scrollToSection('ecoaldea-modulos')}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SHOWREEL INTERACTIVO & EXPLORADOR VISUAL (DILLINGER / 10/10) */}
      {/* ------------------------------------------------------------- */}
      <div id="showreel">
        {activeExperienceView === 'dillinger' ? (
          <DillingerContentSelector
            externalIndex={selectedSlideIndex}
            onSelectForShowreel={(index) => {
              setSelectedSlideIndex(index);
              setActiveExperienceView('reel');
            }}
            onOpenTrailerModal={() => setIsTrailerOpen(true)}
            onOpenExperienceModal={handleOpenExperienceFromShowreelItem}
          />
        ) : (
          <TenOutOfTenShowreel
            externalSlideIndex={selectedSlideIndex}
            onOpenTrailerModal={() => setIsTrailerOpen(true)}
            onOpenDillingerSelector={() => setActiveExperienceView('dillinger')}
            onExploreFullDocumentary={() => {
              setActiveExperienceView('full');
              scrollToSection('botanica-sagrada');
            }}
          />
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MÓDULOS DE EXPERIENCIA E INSTALACIONES (OPTIMIZADO MÓVIL)  */}
      {/* ------------------------------------------------------------- */}
      <main id="documental-completo" className="relative z-10">
        {/* Botanical Sanctuary: Sacred Wachuma Genetic Bank & Seed Sanctuary */}
        <WachumaBotanicalSection
          onOpenModal={() => handleSelectModuleById('wachuma')}
        />

        {/* 360° Virtual Tour & Astronomical Hotspots */}
        <VirtualTour360 />

        {/* Cinematic Storyboard: La Leyenda en 4 Actos & Motor de Petrificación */}
        <NustaScrollTelling />

        {/* The Sacred River Willakamayu / Milky Way Timeline */}
        <RiverTimeline />

        {/* Critics & Documentary Film Facade 4K */}
        <SocialProofSection />

        {/* Financial Reciprocity: Ayni, Padrinazgo & Pases para la Ecoaldea */}
        <DonationSystem />
      </main>

      {/* Footer */}
      <Footer
        onSelectModule={handleSelectModuleById}
        onOpenSecurityModal={handleOpenSecurityModal}
      />

      {/* Full Cinematic 4K Documentary Trailer Modal */}
      <CinematicTrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

      {/* Module In-Depth Experience Drawer Modal */}
      {selectedExperienceModule && (
        <ModuleExperienceModal
          module={selectedExperienceModule}
          onClose={() => setSelectedExperienceModule(null)}
        />
      )}

      {/* Mobile Cinematic Navigation Dock (iOS/Android PWA experience) */}
      <MobileCinematicDock
        onOpenTrailer={() => setIsTrailerOpen(true)}
        onOpenDonate={() => scrollToSection('donaciones')}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenSecurityModal={handleOpenSecurityModal}
      />

      {/* Chatbot de Reserva Conecta con Pampa Ñusta (Videollamada Programada 1 a 1) */}
      <ConectaPampaNustaChatbot
        isOpenExternal={isChatbotOpen}
        onCloseExternal={() => setIsChatbotOpen(false)}
      />

      {/* Modal de Auditoría de Seguridad SSL, Pagos y Protocolos de Ecoturismo */}
      <SecurityComplianceModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        defaultTab={securityModalTab}
      />
    </div>
  );
}
