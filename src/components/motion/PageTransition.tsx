import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { pageVariants, fadeCrossVariants } from '../../motion/motionConfig';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ routeKey, children }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div key={routeKey}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const LanguageCrossFade: React.FC<{ langKey: string; children: React.ReactNode }> = ({
  langKey,
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div key={langKey}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={langKey}
        variants={fadeCrossVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
