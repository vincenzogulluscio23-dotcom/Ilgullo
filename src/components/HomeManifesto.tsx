import React from 'react';
import { RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { motion } from 'motion/react';

interface HomeManifestoProps {
  onNavigate: (route: RoutePath) => void;
}

export const HomeManifesto: React.FC<HomeManifestoProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Background Soft Atmospheric Accent */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF5A36]/10 rounded-full blur-[160px] pointer-events-none -translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <SectionLabel number="01" label="Point of view" className="mb-8" />

        {/* Free Editorial Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F1F0EB] font-normal leading-[1.08] tracking-tight text-balance mb-12"
        >
          Non cerco soltanto immagini belle. <br />
          Cerco <span className="font-serif italic text-white font-normal hover:text-[#FF5A36] transition-colors duration-300">persone</span>,{' '}
          <span className="font-serif italic text-[#FF5A36] font-normal">relazioni</span> e{' '}
          <span className="font-serif italic text-white font-normal hover:text-[#FF5A36] transition-colors duration-300">momenti</span> che abbiano qualcosa da lasciare.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-[#28282D]/30"
        >
          <p className="md:col-span-8 text-base sm:text-lg text-[#C9C7C1] leading-relaxed text-pretty font-sans font-normal">
            Il mio lavoro parte dall’<span className="font-serif italic text-white font-medium">osservazione</span>. Prima di pensare a una camera o a un’inquadratura, cerco di capire cosa renda davvero autentica una storia. A volte è una persona, altre volte un gesto o un <span className="font-serif italic text-white font-medium">dettaglio</span> che rischierebbe di passare inosservato. La tecnica arriva dopo, per dare forma a ciò che vale la pena ricordare.
          </p>

          <div className="md:col-span-4 flex md:justify-end">
            <Button
              variant="outline"
              size="md"
              icon="arrow-right"
              onClick={() => onNavigate('about')}
            >
              Scopri il mio approccio
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

