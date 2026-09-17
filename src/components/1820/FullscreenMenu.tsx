import React, { useEffect, useRef } from 'react';
import { X, Instagram, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  const MENU_ITEMS = [
    { label: 'INICIO', id: 'hero' },
    { label: 'LEYENDA ORIGINARIA', id: 'leyenda' },
    { label: 'BOTÁNICA SAGRADA', id: 'ecoaldea-modulos' },
    { label: 'IDENTIDAD', id: 'identidad' },
    { label: 'LÍDERES ESPIRITUALES', id: 'lideres' },
    { label: 'CENTRO MULTIMEDIA', id: 'multimedia' },
    { label: 'RECORRIDO 360°', id: 'recorrido-360' },
    { label: 'TESTIMONIOS', id: 'testimonios' },
    { label: 'AYNI / DONACIONES', id: 'donaciones' },
  ];

  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      
      gsap.fromTo(
        linksRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(id);
    }, 600); // Wait for menu close animation
  };

  return (
    <div 
      ref={menuRef}
      className={`fixed inset-0 z-[110] bg-sadhana-sand/95 backdrop-blur-lg flex flex-col justify-center px-8 md:px-24 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }} // Start hidden (bottom up clip)
    >
      {/* Header Bar inside menu */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center">
        <div className="text-xl font-bold tracking-[0.2em] text-sadhana-dark">PAMPA ÑUSTA</div>
        <button 
          onClick={onClose}
          className="text-sadhana-brown hover:text-sadhana-dark transition-colors flex items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest hidden md:inline">Cerrar</span>
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full h-full max-h-[70vh] items-start md:items-center mt-20 md:mt-0">
        
        {/* Main Links */}
        <ul ref={linksRef} className="space-y-4 md:space-y-8 flex-1">
          {MENU_ITEMS.map((item, index) => (
            <li key={item.id} className="overflow-hidden">
              <button 
                onClick={() => handleLinkClick(item.id)}
                className="group relative text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-sadhana-dark hover:text-sadhana-primary transition-colors text-left"
              >
                {/* 1820 Style Number indicator */}
                <span className="absolute -left-8 top-2 md:top-6 text-[10px] md:text-sm font-normal tracking-widest opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-300">
                  0{index + 1}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social / Contact Links (Right side or bottom) */}
        <div className="mt-16 md:mt-0 flex flex-col gap-8 md:w-1/4">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-sadhana-brown mb-4">Contacto</h4>
            <a href="mailto:info@pampanusta.com" className="text-sadhana-dark hover:text-sadhana-primary transition-colors text-lg flex items-center gap-2">
              <Mail className="w-4 h-4" /> info@pampanusta.com
            </a>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-sadhana-brown mb-4">Sociales</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-sadhana-brown/20 flex items-center justify-center text-sadhana-brown hover:bg-sadhana-primary hover:text-white hover:border-sadhana-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-sadhana-brown/20 flex items-center justify-center text-sadhana-brown hover:bg-sadhana-primary hover:text-white hover:border-sadhana-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
