import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'es', label: 'ES', title: 'Español (PEN)' },
  { code: 'en', label: 'EN', title: 'English (USD)' },
  { code: 'fr', label: 'FR', title: 'Français (EUR)' },
  { code: 'pt', label: 'PT', title: 'Português (BRL)' }
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 text-xs font-mono font-bold">
      <Globe className="w-4 h-4 opacity-50 hidden sm:block" />
      <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            title={lang.title}
            className={px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-300 }
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};