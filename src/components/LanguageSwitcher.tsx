import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { motion } from 'motion/react';

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
      <div className={`flex items-center justify-between text-xs font-mono tracking-widest uppercase pt-4 border-t border-[#28282D] ${className}`}>
        <span className="text-[#8D8D89]">Language / Lingua:</span>
        <div className="flex items-center gap-2 bg-[#121214] border border-[#28282D] p-1 rounded-full">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('it')}
            aria-pressed={language === 'it'}
            aria-label="Passa alla lingua italiana"
            className={`py-1 px-3 rounded-full text-xs font-bold transition-all ${
              language === 'it'
                ? 'bg-[#FF5A36] text-white shadow-md'
                : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            IT
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('en')}
            aria-pressed={language === 'en'}
            aria-label="Switch to English language"
            className={`py-1 px-3 rounded-full text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-[#FF5A36] text-white shadow-md'
                : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            EN
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-widest bg-[#121214]/80 border border-[#28282D] px-2.5 py-1 rounded-full ${className}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSelect('it')}
        aria-pressed={language === 'it'}
        aria-label="Passa alla lingua italiana"
        className={`transition-colors py-0.5 px-1.5 rounded-md ${
          language === 'it'
            ? 'text-[#FF5A36] font-bold underline underline-offset-4 decoration-[#FF5A36]'
            : 'text-[#8D8D89] hover:text-white'
        }`}
      >
        IT
      </motion.button>
      <span className="text-[#28282D] select-none">•</span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSelect('en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English language"
        className={`transition-colors py-0.5 px-1.5 rounded-md ${
          language === 'en'
            ? 'text-[#FF5A36] font-bold underline underline-offset-4 decoration-[#FF5A36]'
            : 'text-[#8D8D89] hover:text-white'
        }`}
      >
        EN
      </motion.button>
    </div>
  );
};

