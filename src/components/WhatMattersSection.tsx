import React from 'react';
import { SectionLabel } from './EditorialText';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const WhatMattersSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const statementLines = isEn
    ? [
        {
          italicFirst: true,
          italicText: 'Atmosphere',
          sansText: 'before aesthetics.',
        },
        {
          italicFirst: false,
          sansText: 'Authenticity before',
          italicText: 'perfection.',
        },
        {
          italicFirst: true,
          italicText: 'Relationships',
          sansText: 'before places.',
        },
        {
          italicFirst: false,
          sansText: 'Emotion before',
          italicText: 'technique.',
        },
        {
          italicFirst: true,
          italicText: 'Intention',
          sansText: 'before effect.',
        },
      ]
    : [
        {
          italicFirst: true,
          italicText: 'Atmosfera',
          sansText: 'prima dell’estetica.',
        },
        {
          italicFirst: false,
          sansText: 'Autenticità prima della',
          italicText: 'perfezione.',
        },
        {
          italicFirst: true,
          italicText: 'Relazioni',
          sansText: 'prima dei luoghi.',
        },
        {
          italicFirst: false,
          sansText: 'Emozione prima della',
          italicText: 'tecnica.',
        },
        {
          italicFirst: true,
          italicText: 'Intentione',
          sansText: 'prima dell’effetto.',
        },
      ];

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Soft Ambient Light Aura */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5A36]/10 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <SectionLabel number="04" label="What matters" className="mb-12 md:mb-16" />

        {/* Big Display Typography Block matching reference screenshot */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.15] md:leading-[1.1]">
          {statementLines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-default transition-all duration-300 hover:translate-x-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <span className="font-mono text-xs sm:text-sm text-[#FF5A36] tracking-widest shrink-0 opacity-80">
                0{idx + 1} /
              </span>
              <div>
                {line.italicFirst ? (
                  <>
                    <span className="font-serif italic font-normal text-white group-hover:text-[#FF5A36] transition-colors duration-300">
                      {line.italicText}
                    </span>{' '}
                    <span className="font-sans font-normal text-[#F1F0EB] group-hover:text-white transition-colors duration-300">
                      {line.sansText}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-sans font-normal text-[#F1F0EB] group-hover:text-white transition-colors duration-300">
                      {line.sansText}
                    </span>{' '}
                    <span className="font-serif italic font-normal text-white group-hover:text-[#FF5A36] transition-colors duration-300">
                      {line.italicText}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Concluding Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#28282D]/40 max-w-2xl"
        >
          <p className="text-xs sm:text-sm text-[#8D8D89] font-mono leading-relaxed">
            {isEn
              ? 'These are not rigid formulas. They are the compass that guides what to capture, what to omit, and how to give every narrative space to breathe.'
              : 'Non sono regole assolute. Sono la bussola con cui scelgo cosa mostrare, cosa tralasciare e come dare respiro a ogni storia.'}
          </p>
        </motion.div>

      </div>
    </section>
  );
};


