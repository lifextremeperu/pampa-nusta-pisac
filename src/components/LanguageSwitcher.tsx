import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'es', label: 'ES', title: 'Español (PEN)' },
  { code: 'en', label: 'EN', title: 'English (USD)' },
  { code: 'fr', label: 'FR', title: 'Français (EUR)' },
  { code: 'pt', label: 'PT', title: 'Português (BRL)' }
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code)) || LANGUAGES[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono font-bold text-xs" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300"
      >
        <Globe className="w-3.5 h-3.5 opacity-70" />
        <span>{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-0 top-full mt-2 w-36 bg-sadhana-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-1">
          {LANGUAGES.map((lang) => {
            const isSelected = i18n.language.startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected 
                    ? 'bg-sadhana-primary/20 text-sadhana-primary' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{lang.title}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sadhana-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};