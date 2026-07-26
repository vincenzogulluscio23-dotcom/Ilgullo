import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

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

  // Exact overlapping positioning coordinates for desktop view
  const desktopLayouts = [
    {
      wrapperClass: 'top-[10%] left-[2%] w-[42%] z-10',
      aspectClass: 'aspect-[16/10]',
      rotation: 'rotate-[-0.8deg]',
      floatDelay: 0,
    },
    {
      wrapperClass: 'top-[0%] right-[0%] w-[38%] z-15',
      aspectClass: 'aspect-[16/10]',
      rotation: 'rotate-[0.5deg]',
      floatDelay: 0.8,
    },
    {
      wrapperClass: 'top-[16%] right-[22%] w-[23%] z-30',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[-1.2deg]',
      floatDelay: 0.4,
    },
    {
      wrapperClass: 'top-[34%] left-[0%] w-[38%] z-25',
      aspectClass: 'aspect-[16/9]',
      rotation: 'rotate-[1deg]',
      floatDelay: 1.2,
    },
    {
      wrapperClass: 'bottom-[0%] left-[16%] w-[24%] z-15',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[-0.6deg]',
      floatDelay: 0.2,
    },
    {
      wrapperClass: 'bottom-[4%] left-[38%] w-[26%] z-35',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[0.8deg]',
      floatDelay: 1.0,
    },
    {
      wrapperClass: 'bottom-[0%] right-[0%] w-[32%] z-30',
      aspectClass: 'aspect-[3/4]',
      rotation: 'rotate-[-0.4deg]',
      floatDelay: 0.6,
    },
    {
      wrapperClass: 'top-[0%] left-[27%] w-[26%] z-5',
      aspectClass: 'aspect-[4/3]',
      rotation: 'rotate-[-0.2deg]',
      floatDelay: 1.4,
    },
  ];

  // Mobile/Tablet overlapping styling offsets
  const mobileLayouts = [
    'w-[92%] z-10 rotate-[-1deg]',
    'w-[88%] ml-auto -mt-16 z-20 rotate-[2deg]',
    'w-[78%] ml-4 -mt-12 z-30 rotate-[-2deg]',
    'w-[90%] mr-auto -mt-14 z-25 rotate-[1.5deg]',
    'w-[75%] ml-auto -mt-10 z-15 rotate-[-1deg]',
    'w-[84%] ml-6 -mt-12 z-35 rotate-[2deg]',
    'w-[90%] ml-auto -mt-14 z-30 rotate-[-1.5deg]',
  ];

  return (
    <div className="w-full relative py-4">
      {/* DESKTOP OVERLAPPING CANVAS VIEW (md and up) */}
      <div className="hidden md:block relative w-full aspect-[16/11] min-h-[620px] max-h-[850px]">
        {items.slice(0, 8).map((item, idx) => {
          const config = desktopLayouts[idx % desktopLayouts.length];
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onItemClick(item, idx)}
              data-cursor={item.type === 'project' ? 'OPEN' : 'VIEW'}
              className={`absolute cursor-pointer group rounded-2xl overflow-hidden shadow-2xl ${
                config.wrapperClass
              } ${config.rotation} ${
                isHovered ? 'z-50 shadow-[0_30px_70px_rgba(255,90,54,0.3)] ring-2 ring-[#FF5A36]' : 'hover:z-50'
              }`}
            >
              <motion.div
                animate={
                  isHovered
                    ? { y: -8, scale: 1.04 }
                    : { y: [0, -6, 0] }
                }
                transition={
                  isHovered
                    ? { type: 'spring', stiffness: 300, damping: 20 }
                    : { duration: 5 + (idx % 3), repeat: Infinity, ease: 'easeInOut', delay: config.floatDelay }
                }
                className="relative w-full aspect-auto h-full bg-[#18181B] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />

                {/* Hover Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
                  <div className="flex justify-between items-end text-white">
                    <div>
                      {item.subtitle && (
                        <span className="font-mono text-[10px] text-[#FF5A36] block mb-0.5">
                          {item.subtitle}
                        </span>
                      )}
                      <h4 className="font-serif italic text-base sm:text-lg leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    <div className="p-2 rounded-full bg-[#FF5A36] text-white shrink-0 ml-2 shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE OVERLAPPING STACKED STREAM (under md breakpoint) */}
      <div className="block md:hidden space-y-2 pt-2 pb-6">
        {items.slice(0, 7).map((item, idx) => {
          const mobileClass = mobileLayouts[idx % mobileLayouts.length];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => onItemClick(item, idx)}
              className={`relative cursor-pointer group rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 active:scale-98 ${mobileClass}`}
            >
              <div
                className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#18181B] overflow-hidden border border-white/20"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Bottom Text Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <h4 className="font-serif italic text-base leading-tight">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <span className="font-mono text-[10px] text-white/70 block">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
