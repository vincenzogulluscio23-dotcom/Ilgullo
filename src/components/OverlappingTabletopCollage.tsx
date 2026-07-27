import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { UniversalMedia } from './UniversalMedia';

export interface CollagePhotoItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  tag?: string;
  image: string;
  type?: 'project' | 'frame';
  slug?: string;
  number?: string;
  location?: string;
}

interface OverlappingTabletopCollageProps {
  items: CollagePhotoItem[];
  onItemClick: (item: CollagePhotoItem, index: number) => void;
  theme?: 'light' | 'dark';
}

export const OverlappingTabletopCollage: React.FC<OverlappingTabletopCollageProps> = ({
  items,
  onItemClick,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Exact 2D overlapping tabletop positions matching the user's reference photo
  const tabletopPositions = [
    {
      // 1. Top Left Background Harbour/Hills (Wide Landscape)
      wrapperClass: 'top-[8%] left-[0%] w-[48%] z-10',
      aspectClass: 'aspect-[16/10]',
      rotation: 'rotate-[-1.5deg]',
      floatDelay: 0,
    },
    {
      // 2. Top Right Background Fortress/Castle (Wide Landscape)
      wrapperClass: 'top-[0%] right-[0%] w-[45%] z-10',
      aspectClass: 'aspect-[16/10]',
      rotation: 'rotate-[0.8deg]',
      floatDelay: 0.8,
    },
    {
      // 3. Top Center Foreground Anchor/Promenade (Tall Portrait)
      wrapperClass: 'top-[14%] left-[45%] w-[27%] z-30',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[1.6deg]',
      floatDelay: 0.4,
    },
    {
      // 4. Middle Left Dock/Pier & Blue Boat (Wide Landscape Overlay)
      wrapperClass: 'top-[32%] left-[0%] w-[42%] z-25',
      aspectClass: 'aspect-[16/9]',
      rotation: 'rotate-[0.5deg]',
      floatDelay: 1.2,
    },
    {
      // 5. Bottom Center Blue Stairs & Pots (Tall Portrait Foreground)
      wrapperClass: 'bottom-[0%] left-[36%] w-[27%] z-40',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[1deg]',
      floatDelay: 1.0,
    },
    {
      // 6. Bottom Left White Alleyway (Tall Portrait Background)
      wrapperClass: 'bottom-[0%] left-[17%] w-[25%] z-20',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[-1.2deg]',
      floatDelay: 0.2,
    },
    {
      // 7. Bottom Right Beach Path & Walkway (Wide Landscape Foreground)
      wrapperClass: 'bottom-[0%] right-[0%] w-[44%] z-35',
      aspectClass: 'aspect-[16/10]',
      rotation: 'rotate-[-0.6deg]',
      floatDelay: 0.6,
    },
  ];

  // Mobile stacked overlapping layout offsets
  const mobileLayouts = [
    'w-[92%] z-10 rotate-[-2deg]',
    'w-[88%] ml-auto -mt-12 z-20 rotate-[2.5deg]',
    'w-[82%] ml-3 -mt-10 z-30 rotate-[-1.8deg]',
    'w-[90%] mr-auto -mt-12 z-25 rotate-[1.5deg]',
    'w-[80%] ml-auto -mt-10 z-15 rotate-[-2.2deg]',
    'w-[85%] ml-5 -mt-12 z-35 rotate-[2deg]',
    'w-[90%] ml-auto -mt-12 z-30 rotate-[-1.5deg]',
  ];

  // Helper to split items into chunks of 7 for tabletop composite blocks
  const chunks: CollagePhotoItem[][] = [];
  for (let i = 0; i < items.length; i += 7) {
    chunks.push(items.slice(i, i + 7));
  }

  return (
    <div className="w-full relative py-4 select-none">
      {/* DESKTOP EXACT OVERLAPPING TABLETOP COLLAGE VIEW (md and up) */}
      <div className="hidden md:block space-y-12">
        {chunks.map((chunk, chunkIdx) => (
          <div
            key={chunkIdx}
            className="relative w-full aspect-[16/11] min-h-[580px] max-h-[820px]"
          >
            {chunk.map((item, idx) => {
              const globalIndex = chunkIdx * 7 + idx;
              const config = tabletopPositions[idx % tabletopPositions.length];
              const isHovered = hoveredId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onItemClick(item, globalIndex)}
                  data-cursor={item.type === 'project' ? 'OPEN' : 'VIEW'}
                  className={`absolute cursor-pointer group rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ${
                    config.wrapperClass
                  } ${
                    isHovered
                      ? 'z-50 shadow-[0_35px_80px_rgba(255,90,54,0.45)] ring-2 ring-[#FF5A36] scale-105 -rotate-0 -translate-y-2'
                      : config.rotation
                  }`}
                >
                  <motion.div
                    animate={
                      isHovered
                        ? { y: -4, scale: 1.02 }
                        : { y: [0, -5, 0] }
                    }
                    transition={
                      isHovered
                        ? { type: 'spring', stiffness: 300, damping: 20 }
                        : { duration: 5 + (idx % 3), repeat: Infinity, ease: 'easeInOut', delay: config.floatDelay }
                    }
                    className={`relative w-full ${config.aspectClass} bg-[#09090A] overflow-hidden`}
                  >
                    <UniversalMedia
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
                    />

                    {/* Gradient Overlay & Text Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090A]/95 via-[#09090A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 z-20">
                      <div className="flex justify-between items-end text-white">
                        <div>
                          {item.number && (
                            <span className="font-mono text-[10px] text-[#FF5A36] uppercase tracking-widest block mb-0.5 font-semibold text-white-force">
                              {item.number} {item.category ? `· ${item.category}` : ''}
                            </span>
                          )}
                          <h4 className="font-serif italic text-base sm:text-xl text-white font-normal leading-snug line-clamp-1 text-white-force">
                            {item.title}
                          </h4>
                          {item.location && (
                            <span className="font-mono text-[10px] sm:text-xs text-[#E4E4E7] block mt-0.5 text-white-force">
                              {item.location}
                            </span>
                          )}
                        </div>
                        <div className="p-2 rounded-full bg-[#FF5A36] text-white shrink-0 ml-2 shadow-lg">
                          <ArrowUpRight className="w-4 h-4 text-white-force" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* MOBILE SCATTERED STACKED OVERLAPPING STREAM */}
      <div className="block md:hidden space-y-2 pt-2 pb-6">
        {items.map((item, idx) => {
          const mobileClass = mobileLayouts[idx % mobileLayouts.length];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => onItemClick(item, idx)}
              className={`relative cursor-pointer group rounded-xl overflow-hidden shadow-2xl transition-all duration-300 active:scale-98 ${mobileClass}`}
            >
              <div className="relative w-full aspect-[4/3] bg-[#09090A] overflow-hidden">
                <UniversalMedia
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#09090A]/95 via-[#09090A]/50 to-transparent text-white">
                  <span className="font-mono text-[9px] text-[#FF5A36] block uppercase tracking-wider mb-0.5 text-white-force">
                    {item.number} {item.category ? `· ${item.category}` : ''}
                  </span>
                  <h4 className="font-serif italic text-base leading-tight text-white text-white-force">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
