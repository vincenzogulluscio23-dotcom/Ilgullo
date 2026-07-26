import { Variants } from 'motion/react';

export const motionDuration = {
  micro: 0.2,
  fast: 0.3,
  medium: 0.55,
  slow: 0.85,
  cinematic: 1.1,
};

export const motionEase = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
  editorial: [0.22, 1, 0.36, 1] as const,
  image: [0.76, 0, 0.24, 1] as const,
  softSpring: { type: 'spring' as const, stiffness: 350, damping: 28 },
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDuration.medium,
      ease: motionEase.editorial,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.995,
    transition: {
      duration: motionDuration.fast,
      ease: motionEase.exit,
    },
  },
};

export const fadeCrossVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motionDuration.fast, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};
