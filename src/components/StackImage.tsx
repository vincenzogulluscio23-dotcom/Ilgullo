import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionDuration, motionEase } from '../motion/motionConfig';

export interface StackImageItem {
  src: string;
  alt?: string;
  badgeLabel?: string;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  decorative?: boolean;
}

export type StackPreset = 'subtle' | 'editorial' | 'casual' | 'layered';

interface StackImageProps {
  images: StackImageItem[];
  preset?: StackPreset;
  className?: string;
  aspectRatio?: string;
  align?: 'left' | 'center' | 'right';
  onClickImage?: (index: number) => void;
}

const PRESET_CONFIGS: Record<
  StackPreset,
  { rotation: number[]; offsetX: number[]; offsetY: number[]; scale: number[] }
> = {
  subtle: {
    rotation: [-2, 1.5, -1],
    offsetX: [-10, 12, -6],
    offsetY: [8, -6, 4],
    scale: [0.97, 1, 0.98],
  },
  editorial: {
    rotation: [-4, 3, -2],
    offsetX: [-18, 16, -10],
    offsetY: [14, -10, 8],
    scale: [0.95, 1, 0.97],
  },
  casual: {
    rotation: [-6, 5, -3],
    offsetX: [-24, 22, -12],
    offsetY: [18, -14, 10],
    scale: [0.93, 1, 0.96],
  },
  layered: {
    rotation: [-3, 4, -1.5],
    offsetX: [-14, 18, -8],
    offsetY: [10, -8, 6],
    scale: [0.96, 1, 0.98],
  },
};

export const StackImage: React.FC<StackImageProps> = ({
  images,
  preset = 'editorial',
  className = '',
  aspectRatio = 'aspect-[4/3]',
  align = 'center',
  onClickImage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const config = PRESET_CONFIGS[preset];

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full max-w-xl mx-auto flex items-center ${
        align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
      } ${className}`}
    >
      <div className={`relative w-full ${aspectRatio}`}>
        {images.map((item, index) => {
          const defaultRot = config.rotation[index % config.rotation.length];
          const defaultX = config.offsetX[index % config.offsetX.length];
          const defaultY = config.offsetY[index % config.offsetY.length];
          const defaultScale = config.scale[index % config.scale.length];

          const rot = item.rotation ?? defaultRot;
          const x = item.offsetX ?? defaultX;
          const y = item.offsetY ?? defaultY;
          const scale = item.scale ?? defaultScale;

          // Main top card is the last item or item with highest index
          const isTop = index === images.length - 1;
          const zIndex = isTop ? 20 : 10 + index;

          return (
            <motion.div
              key={item.src + index}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                  : { opacity: 0, y: 30 + index * 10, rotate: rot * 1.5, scale: scale * 0.95 }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                  : { opacity: 1, x: x, y: y, rotate: rot, scale: scale }
              }
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: motionDuration.slow,
                delay: index * 0.12,
                ease: motionEase.editorial,
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: scale * 1.03,
                      rotate: rot * 0.8,
                      zIndex: 30,
                      transition: { duration: 0.3 },
                    }
              }
              style={{ zIndex }}
              onClick={() => onClickImage && onClickImage(index)}
              className={`absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#121214] group cursor-pointer transition-shadow ${
                isTop ? 'ring-1 ring-white/15' : ''
              }`}
            >
              <img
                src={item.src}
                alt={item.decorative ? '' : item.alt || 'Editorial visual'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {item.badgeLabel && (
                <div className="absolute top-3 left-3 bg-[#09090A]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono text-white tracking-widest uppercase">
                  {item.badgeLabel}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
