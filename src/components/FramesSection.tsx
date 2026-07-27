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
import { UniversalMedia } from './UniversalMedia';

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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] border-b border-[#28282D]/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* STANDALONE PAGE HERO BANNER (When !isTeaser) */}
        {!isTeaser && (
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end p-8 sm:p-12 md:p-16 mb-12 border border-[#28282D]">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85"
                alt="Frames Visual Archive Background"
                className="w-full h-full object-cover brightness-65 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-[#09090A]/60 to-transparent" />
              <div className="absolute inset-0 bg-[#FF5A36]/10 mix-blend-overlay" />
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 max-w-3xl">
              <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest block mb-3 font-semibold">
                Frames — Visual Archive
              </span>
              <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white leading-tight mb-4">
                {isEn ? (
                  <>What lingers <br /><span className="font-sans not-italic text-white">between one story and the next.</span></>
                ) : (
                  <>Quello che resta <br /><span className="font-sans not-italic text-[#F1F0EB]">tra una storia e l’altra.</span></>
                )}
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#C9C7C1] max-w-xl">
                {isEn
                  ? 'A curated collection of unscripted moments, cinematic light, and quiet details captured across sets, travels, and personal observations.'
                  : 'Una raccolta di momenti spontanei, luce cinematografica e dettagli rubati tra set, viaggi ed esplorazioni personali.'}
              </p>
            </div>
          </div>
        )}

        {/* Section Header (For Teaser View) */}
        {isTeaser && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel number="05" label="Frames — Visual Archive" className="mb-4" />
              <h2 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] text-balance">
                {isEn ? (
                  <>What lingers <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">between one story and the next.</span></>
                ) : (
                  <>Quello che resta <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">tra una storia e l’altra.</span></>
                )}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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

              {onNavigate && (
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
        )}

        {/* Filter Pills & View Mode Switcher for Standalone Page */}
        {!isTeaser && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#28282D]/60">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                      : 'bg-[#121214] text-[#C9C7C1] border border-[#28282D] hover:border-[#F1F0EB]'
                  }`}
                >
                  {cat} ({cat === 'All' ? localizedFrames.length : localizedFrames.filter(f => f.category === cat).length})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-full bg-[#121214] border border-[#28282D] shrink-0">
              <button
                onClick={() => setViewMode('collage')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                  viewMode === 'collage'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                    : 'text-[#8D8D89] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Masonry</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                    : 'text-[#8D8D89] hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Dense Grid</span>
              </button>
            </div>
          </div>
        )}

        {/* Render Selected View Mode - Dense Packed Grid/Masonry or Tabletop Collage */}
        {viewMode === 'collage' ? (
          <EditorialCollageBoard
            frames={displayFrames}
            onSelectFrame={(index) => setLightboxIndex(index)}
          />
        ) : (
          /* Dense Multi-Column Photo Grid (Filled Edge-to-Edge with no black gap holes) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {displayFrames.map((frame, index) => (
              <div
                key={frame.id}
                data-cursor="OPEN"
                onClick={() => setLightboxIndex(index)}
                className="group cursor-pointer bg-[#121214] border border-[#28282D]/80 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#FF5A36] hover:shadow-[0_20px_40px_rgba(255,90,54,0.15)] relative flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#09090A]">
                  <UniversalMedia
                    src={frame.image}
                    alt={frame.title || 'Gullo Frame'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-transparent to-transparent opacity-0 group-hover:opacity-85 transition-opacity duration-300" />

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-[#09090A]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF5A36] block mb-0.5">
                      {frame.number} — {frame.category}
                    </span>
                    {frame.title && (
                      <h4 className="font-serif italic text-lg text-white mb-0.5 leading-tight">{frame.title}</h4>
                    )}
                    {frame.location && (
                      <span className="font-mono text-[11px] text-[#C9C7C1] block">{frame.location}</span>
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

