import React from 'react';
import { RoutePath } from '../types';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundViewProps {
  onNavigate: (route: RoutePath) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] min-h-screen flex items-center justify-center text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="font-mono text-4xl text-[#FF5A36] font-bold block">404</span>
        <h1 className="font-serif italic text-4xl sm:text-6xl text-white">
          {isEn ? 'This story isn’t here.' : 'Questa storia non è qui.'}
        </h1>
        <p className="text-sm sm:text-base font-mono text-[#C9C7C1] max-w-md mx-auto">
          {isEn
            ? 'The page you are looking for does not exist, has been moved, or is no longer available.'
            : 'La pagina che stai cercando non esiste, è stata spostata oppure non è più disponibile.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button variant="primary" onClick={() => onNavigate('home')}>
            {isEn ? 'Back to Home' : 'Torna alla Home'}
          </Button>
          <Button variant="outline" onClick={() => onNavigate('projects')}>
            {isEn ? 'Explore projects' : 'Esplora i progetti'}
          </Button>
        </div>
      </div>
    </div>
  );
};
