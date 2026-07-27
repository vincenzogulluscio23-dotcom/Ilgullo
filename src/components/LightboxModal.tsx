import React, { useEffect } from 'react';
import { FrameItem } from '../types';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { UniversalMedia } from './UniversalMedia';

interface LightboxModalProps {
  frames: FrameItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  frames,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !frames[currentIndex]) return null;

  const currentFrame = frames[currentIndex];

  return (
    <div className="fixed inset-0 z-[200] bg-[#09090A]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
      
      {/* Lightbox Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#8D8D89] z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#FF5A36]">{currentFrame.number}</span>
          <span>/</span>
          <span className="uppercase tracking-widest text-[#C9C7C1]">{currentFrame.category}</span>
        </div>

        <span className="text-[11px]">
          {currentIndex + 1} of {frames.length}
        </span>

        <button
          onClick={onClose}
          className="p-2 rounded-full border border-[#28282D] text-[#F1F0EB] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#121214]"
          aria-label="Chiudi Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative my-auto flex items-center justify-center max-h-[75vh] w-full">
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full border border-[#28282D] text-[#C9C7C1] hover:text-white hover:border-[#FF5A36] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#09090A]/80 backdrop-blur-md"
          aria-label="Immagine precedente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <UniversalMedia
          src={currentFrame.image}
          alt={currentFrame.title || 'Gullo Frame'}
          className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
        />

        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full border border-[#28282D] text-[#C9C7C1] hover:text-white hover:border-[#FF5A36] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#09090A]/80 backdrop-blur-md"
          aria-label="Immagine successiva"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Lightbox Footer Metadata */}
      <div className="max-w-3xl mx-auto w-full text-center z-10 pt-4 border-t border-[#28282D]/40">
        {currentFrame.title && (
          <h3 className="font-serif italic text-xl sm:text-2xl text-white mb-2">
            {currentFrame.title}
          </h3>
        )}

        <div className="flex items-center justify-center gap-6 font-mono text-xs text-[#8D8D89]">
          {currentFrame.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
              {currentFrame.location}
            </span>
          )}
          {currentFrame.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8D8D89]" />
              {currentFrame.date}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
