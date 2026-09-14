import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import { Preloader } from './components/Preloader';
import { OpeningCredits } from './components/OpeningCredits';
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
import { SocialProofSection } from './components/SocialProofSection';
import { DonationSystem } from './components/DonationSystem';
import { Footer } from './components/Footer';
import { ModuleExperienceModal } from './components/ModuleExperienceModal';
import { MobileCinematicDock } from './components/MobileCinematicDock';
import { ConectaPampaNustaChatbot } from './components/ConectaPampaNustaChatbot';

const VirtualTour360 = lazy(() => import('./components/VirtualTour360').then(module => ({ default: module.VirtualTour360 })));
const CinematicTrailerModal = lazy(() => import('./components/CinematicTrailerModal').then(module => ({ default: module.CinematicTrailerModal })));
import { ECOALDEA_MODULES } from './data/ecoaldeaModules';
import { SHOWREEL_ITEMS, ShowreelItem } from './data/showreelData';
import { ThemeMode, EcoaldeaModule } from './types';
import { MoviePlayerUI } from './components/MoviePlayerUI';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>('hanan');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(true); // Default to true in documentary mode
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  const [securityModalTab, setSecurityModalTab] = useState<'guarantee' | 'ssl' | 'altitude' | 'payments'>('guarantee');
  const [selectedExperienceModule, setSelectedExperienceModule] = useState<EcoaldeaModule | null>(null);
  const [activeExperienceView, setActiveExperienceView] = useState<'dillinger' | 'reel' | 'full'>('dillinger');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  
  // Movie Player States
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSceneName, setCurrentSceneName] = useState('Escena 1: Introducción');

  // Track scrolling for progress bar
  useEffect(() => {
    const container = document.querySelector('.scene-container');
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress || 0);

      // Determine current scene by dividing progress roughly
      if (progress < 15) setCurrentSceneName('El Origen de Pampa Ñusta');
      else if (progress < 30) setCurrentSceneName('Santuario Wachuma');
      else if (progress < 45) setCurrentSceneName('Recorrido Virtual 360°');
      else if (progress < 60) setCurrentSceneName('El Río Willakamayu');
      else if (progress < 75) setCurrentSceneName('Críticas & Testimonios');
      else if (progress < 90) setCurrentSceneName('Mecenazgo Patrimonial');
      else setCurrentSceneName('Créditos Finales');
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // AutoPlay logic
  useEffect(() => {
    const container = document.querySelector('.scene-container') as HTMLElement | null;
    if (!container || !isAutoPlaying) return;

    // Disable scroll snap during autoplay for smooth scrolling
    container.style.scrollSnapType = 'none';

    let animationId: number;
    const playFrame = () => {
      container.scrollTop += 4.5; // Auto-scroll speed (3x faster)
      
      // Stop if reached bottom
      if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
        setIsAutoPlaying(false);
        return;
      }
      animationId = requestAnimationFrame(playFrame);
    };

    animationId = requestAnimationFrame(playFrame);

    return () => {
      cancelAnimationFrame(animationId);
      container.style.scrollSnapType = 'y mandatory';
    };
  }, [isAutoPlaying]);

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    // Lenis conflicts with native scroll-snap, but we keep it for elements inside scenes if needed, 
    // or just disable it entirely for the true "cut" effect. We will disable smooth scroll 
    // and let CSS Scroll Snap handle the scenes.
    return () => {};
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
      className={`min-h-screen text-sadhana-brown bg-sadhana-bg transition-colors duration-700 font-sans relative overflow-x-hidden scene-container`}
    >
      {/* 0. OPENING CREDITS (DOCUMENTARY INTRO) */}
      {showIntro && <OpeningCredits onComplete={() => setShowIntro(false)} />}

      {/* 4. ANIMACIÓN DE CARGA (PRELOADER) */}
      <Preloader />

      {/* Dillinger & 10/10 Hybrid Custom Cursor */}
      <CustomCursor />

      {/* 2.39:1 Cinema Letterbox Overlays when Cinema Mode is active */}
      {isCinemaMode && (
        <>
          <div className="cinema-letterbox-top" aria-hidden="true">
            {/* Optional Top Letterbox Content (e.g. Logo watermark) */}
          </div>
          <div className="cinema-letterbox-bottom">
            <MoviePlayerUI 
              isPlaying={isAutoPlaying}
              onTogglePlay={() => setIsAutoPlaying(!isAutoPlaying)}
              progress={scrollProgress}
              currentSceneName={currentSceneName}
            />
          </div>
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
      <div className="scene">
        <Hero
          themeMode={themeMode}
          onExploreClick={() => scrollToSection('ecoaldea-modulos')}
          onOpenTrailer={() => setIsTrailerOpen(true)}
          onSelectModule={handleSelectModuleById}
          onOpenSecurityModal={handleOpenSecurityModal}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onScrollToVideoShowcase={() => scrollToSection('video-referencial')}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIDEO REFERENCIAL OFICIAL 4K - OCULTADO POR NEUROMARKETING    */}
      {/* ------------------------------------------------------------- */}
      {/* 
      <div id="video-referencial" className="scene relative z-10 scroll-mt-20">
        <ReferentialVideoShowcase
          onOpenSecurityModal={handleOpenSecurityModal}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onExploreModules={() => scrollToSection('ecoaldea-modulos')}
        />
      </div>
      */}

      {/* ------------------------------------------------------------- */}
      {/* SHOWREEL INTERACTIVO & EXPLORADOR VISUAL - OCULTADO           */}
      {/* ------------------------------------------------------------- */}
      {/* 
      <div id="showreel" className="scene">
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
      */}

      {/* ------------------------------------------------------------- */}
      {/* 3. MÓDULOS DE EXPERIENCIA E INSTALACIONES (OPTIMIZADO MÓVIL)  */}
      {/* ------------------------------------------------------------- */}
      
      {/* Botanical Sanctuary: Sacred Wachuma Genetic Bank & Seed Sanctuary */}
      <div id="botanica-sagrada" className="scene">
        <WachumaBotanicalSection
          onOpenModal={() => handleSelectModuleById('wachuma')}
        />
      </div>

      {/* 360° Virtual Tour & Astronomical Hotspots */}
      <div className="scene">
        <Suspense fallback={<div className="h-[500px] w-full flex items-center justify-center bg-sadhana-sand text-sadhana-dark">Cargando Recorrido 360°...</div>}>
          <VirtualTour360 />
        </Suspense>
      </div>

      {/* Cinematic Storyboard: La Leyenda en 4 Actos - OCULTADO */}
      {/* 
      <div className="scene">
        <NustaScrollTelling />
      </div>
      */}

      {/* The Sacred River Willakamayu / Milky Way Timeline - OCULTADO */}
      {/* 
      <div className="scene">
        <RiverTimeline />
      </div>
      */}

      {/* Critics & Documentary Film Facade 4K */}
      <div className="scene">
        <SocialProofSection />
      </div>

      {/* Financial Reciprocity: Ayni, Padrinazgo & Pases para la Ecoaldea */}
      <div id="donaciones" className="scene">
        <DonationSystem />
      </div>

      {/* Footer */}
      <div className="scene">
        <Footer
          onSelectModule={handleSelectModuleById}
          onOpenSecurityModal={handleOpenSecurityModal}
        />
      </div>

      {/* Full Cinematic 4K Documentary Trailer Modal */}
      <Suspense fallback={null}>
        <CinematicTrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      </Suspense>

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
