import React, { useState } from 'react';
import { FrameItem, RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { LightboxModal } from './LightboxModal';
import { EditorialCollageBoard } from './EditorialCollageBoard';
import { SectionHeaderReveal, ScrollReveal } from './motion/ScrollReveal';
import { Maximize2, Layers, Grid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedFrame } from '../utils/i18nHelpers';

interface FramesSectionProps {
  frames: FrameItem[];
  onNavigate?: (route: RoutePath) => void;
  isTeaser?: boolean;
}

export const FramesSection: React.FC<FramesSectionProps> = ({
  frames,
  onNavigate,
  isTeaser = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'collage' | 'grid'>('collage');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const localizedFrames = frames.map((f) => getLocalizedFrame(f, language));

  const categories = ['All', 'People', 'Places', 'Details', 'Motion', 'Personal', 'Work'];

  const filteredFrames = selectedCategory === 'All'
    ? localizedFrames
    : localizedFrames.filter(f => f.category === selectedCategory);

  const displayFrames = isTeaser ? localizedFrames.slice(0, 7) : filteredFrames;

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#09090A] border-b border-[#28282D]/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel number={isTeaser ? '05' : undefined} label="Frames — Visual Archive" className="mb-4" />
            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] text-balance">
              {isEn ? (
                <>What lingers <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">between one story and the next.</span></>
              ) : (
                <>Quello che resta <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">tra una storia e l’altra.</span></>
              )}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-full bg-[#121214] border border-[#28282D]">
              <button
                onClick={() => setViewMode('collage')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  viewMode === 'collage'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                    : 'text-[#8D8D89] hover:text-white'
                }`}
                title="Visual Collage Board"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Collage</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                    : 'text-[#8D8D89] hover:text-white'
                }`}
                title="Structured Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {isTeaser && onNavigate && (
              <Button
                variant="outline"
                size="md"
                icon="arrow-right"
                onClick={() => onNavigate('frames')}
              >
                {isEn ? 'Explore Frames' : 'Esplora Frames'}
              </Button>
            )}
          </div>
        </div>

        {/* Filter Pills (if standalone page or full view) */}
        {!isTeaser && (
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#28282D]/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#FF5A36] text-white font-medium'
                    : 'bg-[#121214] text-[#C9C7C1] border border-[#28282D] hover:border-[#F1F0EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Render Selected View Mode */}
        {viewMode === 'collage' ? (
          <EditorialCollageBoard
            frames={displayFrames}
            onSelectFrame={(index) => setLightboxIndex(index)}
          />
        ) : (
          /* Masonry / Grid Display */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayFrames.map((frame, index) => (
              <div
                key={frame.id}
                data-cursor="OPEN"
                onClick={() => setLightboxIndex(index)}
                className="group cursor-pointer bg-[#121214] border border-[#28282D]/60 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#FF5A36] relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#09090A]">
                  <img
                    src={frame.image}
                    alt={frame.title || 'Gullo Frame'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-[#09090A]/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A36] block mb-1">
                      {frame.number} — {frame.category}
                    </span>
                    {frame.title && (
                      <h4 className="font-serif italic text-xl text-white mb-1">{frame.title}</h4>
                    )}
                    {frame.location && (
                      <span className="font-mono text-xs text-[#8D8D89] block">{frame.location}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        frames={displayFrames}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex(prev => (prev !== null ? (prev + 1) % displayFrames.length : null))}
        onPrev={() => setLightboxIndex(prev => (prev !== null ? (prev - 1 + displayFrames.length) % displayFrames.length : null))}
      />

    </section>
  );
};

