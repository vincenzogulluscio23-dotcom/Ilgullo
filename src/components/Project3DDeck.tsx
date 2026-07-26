import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Project3DDeckProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
}

export const Project3DDeck: React.FC<Project3DDeckProps> = ({
  projects,
  onSelectProject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const total = projects.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const activeProject = projects[currentIndex];

  // Helper to get offset relative to currentIndex (-1 for left, 0 for center, +1 for right, etc.)
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      
      {/* 3D Perspective Stage Container */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center perspective-[1200px] overflow-visible">
        
        {projects.map((project, index) => {
          const offset = getOffset(index);
          const isCenter = offset === 0;
          const isLeft = offset === -1 || (offset < 0 && Math.abs(offset) <= 2);
          const isRight = offset === 1 || (offset > 0 && Math.abs(offset) <= 2);
          const isVisible = Math.abs(offset) <= 2; // Only render up to 2 items away for clean performance

          if (!isVisible) return null;

          // Compute 3D transforms matching the reference image layout
          let xOffset = 0;
          let scale = 1;
          let rotateY = 0;
          let rotateZ = 0;
          let opacity = 1;
          let zIndex = 30 - Math.abs(offset) * 10;

          if (offset === 0) {
            // Center active card
            xOffset = 0;
            scale = 1;
            rotateY = 0;
            rotateZ = 0;
            opacity = 1;
          } else if (offset === -1) {
            // Immediate left card
            xOffset = -220; // Mobile responsiveness handles container bounds
            scale = 0.85;
            rotateY = 18;
            rotateZ = -4;
            opacity = 0.75;
          } else if (offset === 1) {
            // Immediate right card
            xOffset = 220;
            scale = 0.85;
            rotateY = -18;
            rotateZ = 4;
            opacity = 0.75;
          } else if (offset < -1) {
            // Far left card
            xOffset = -380;
            scale = 0.72;
            rotateY = 28;
            rotateZ = -8;
            opacity = 0.35;
          } else if (offset > 1) {
            // Far right card
            xOffset = 380;
            scale = 0.72;
            rotateY = -28;
            rotateZ = 8;
            opacity = 0.35;
          }

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: `${xOffset}px`,
                scale,
                rotateY,
                rotateZ,
                opacity,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
                mass: 0.8,
              }}
              onClick={() => {
                if (isCenter) {
                  onSelectProject(project.slug);
                } else {
                  setCurrentIndex(index);
                }
              }}
              data-cursor={isCenter ? 'OPEN' : 'SELECT'}
              className={`absolute top-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] md:w-[400px] aspect-[3/4] rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden shadow-2xl transition-all duration-300 border border-white/10 ${
                isCenter
                  ? 'ring-2 ring-[#FF5A36]/60 shadow-[0_25px_60px_-15px_rgba(255,90,54,0.2)]'
                  : 'hover:opacity-90'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Media Image */}
              <div className="relative w-full h-full bg-[#121214]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none will-change-transform"
                />

                {/* Subtle Gradient Film Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090A]/90 via-[#09090A]/20 to-transparent" />

                {/* Top Badge on Card */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-[#09090A]/80 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/10">
                    0{index + 1} / {project.category}
                  </span>
                </div>

                {/* In-Card Typography for side/active status */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                  <span className="font-mono text-[11px] text-[#FF5A36] block mb-1">
                    {project.client} · {project.year}
                  </span>
                  <h3 className="font-serif italic text-xl sm:text-2xl text-white font-normal leading-tight line-clamp-2">
                    {project.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Center Active Project Editorial Card Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="mt-6 md:mt-10 max-w-2xl mx-auto text-center px-4"
        >
          {/* Metadata pill */}
          <div className="flex items-center justify-center gap-3 font-mono text-xs text-[#8D8D89] mb-3">
            <span>PROJECT {activeProject.number}</span>
            <span>•</span>
            <span className="text-[#FF5A36] font-medium">{activeProject.category}</span>
            <span>•</span>
            <span>{activeProject.year}</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] mb-4 leading-tight">
            {activeProject.title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#C9C7C1] leading-relaxed max-w-xl mx-auto mb-6 text-pretty">
            {activeProject.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {activeProject.services.map((service, idx) => (
              <span
                key={idx}
                className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#121214] border border-[#28282D] text-[#8D8D89]"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectProject(activeProject.slug)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FF5A36] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#E04B28] transition-all shadow-lg hover:shadow-[#FF5A36]/30"
            >
              <span>Esplora il progetto</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Interactive Deck Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-full bg-[#121214] border border-[#28282D] text-[#C9C7C1] hover:text-white hover:border-[#FF5A36] transition-all min-w-[48px] min-h-[48px] flex items-center justify-center shadow-lg active:scale-95"
          aria-label="Progetto precedente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots/Numbers Bar */}
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#FF5A36]'
                  : 'w-2 bg-[#28282D] hover:bg-[#8D8D89]'
              }`}
              title={p.title}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-full bg-[#121214] border border-[#28282D] text-[#C9C7C1] hover:text-white hover:border-[#FF5A36] transition-all min-w-[48px] min-h-[48px] flex items-center justify-center shadow-lg active:scale-95"
          aria-label="Progetto successivo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
