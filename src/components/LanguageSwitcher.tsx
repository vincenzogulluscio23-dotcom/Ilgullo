import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface LanguageSwitcherProps {
  className?: string;
  isMobileMenu?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', isMobileMenu = false }) => {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    if (language === lang) return;
    setLanguage(lang);
  };

  if (isMobileMenu) {
    return (
      <div className={`flex items-center gap-4 text-xs font-mono tracking-widest uppercase pt-6 border-t border-neutral-200 dark:border-neutral-800 ${className}`}>
        <span className="text-neutral-400 dark:text-neutral-500">Language:</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSelect('it')}
            className={`transition-colors py-1 px-2.5 rounded-full ${
              language === 'it'
                ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            IT
          </button>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <button
            type="button"
            onClick={() => handleSelect('en')}
            className={`transition-colors py-1 px-2.5 rounded-full ${
              language === 'en'
                ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-widest ${className}`}>
      <button
        type="button"
        onClick={() => handleSelect('it')}
        className={`transition-all duration-200 py-1 px-1.5 ${
          language === 'it'
            ? 'text-neutral-900 dark:text-neutral-100 font-bold border-b border-neutral-900 dark:border-neutral-100'
            : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
        }`}
        aria-label="Seleziona Lingua Italiana"
      >
        IT
      </button>
      <span className="text-neutral-300 dark:text-neutral-700 select-none">/</span>
      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`transition-all duration-200 py-1 px-1.5 ${
          language === 'en'
            ? 'text-neutral-900 dark:text-neutral-100 font-bold border-b border-neutral-900 dark:border-neutral-100'
            : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
        }`}
        aria-label="Select English Language"
      >
        EN
      </button>
    </div>
  );
};
