import React from 'react';
import { RoutePath } from '../types';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { CoordinatesTag } from './EditorialText';

interface HeroProps {
  onNavigate: (route: RoutePath) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { siteContent } = useCMS();
  const { language } = useLanguage();

  const isEn = language === 'en';
  const heroData = {
    headline: (isEn && siteContent.en?.hero?.headline) || siteContent.hero.headline,
    subtitle: (isEn && siteContent.en?.hero?.subtitle) || siteContent.hero.subtitle,
    bgImage: siteContent.hero.bgImage,
  };

  const renderMixedHeadline = (text: string) => {
    if (text.includes("Le storie esistono")) {
      return (
        <span className="font-sans font-light tracking-tight text-[#F1F0EB]">
          Le <span className="font-serif italic font-normal text-white">storie</span> esistono già.{' '}
          Bisogna solo <span className="font-serif italic font-normal text-[#FF5A36]">fermarsi</span> a{' '}
          <span className="font-serif italic font-normal text-white">guardarle</span> davvero.
        </span>
      );
    }
    if (text.includes("Stories are already")) {
      return (
        <span className="font-sans font-light tracking-tight text-[#F1F0EB]">
          <span className="font-serif italic font-normal text-white">Stories</span> are already everywhere.{' '}
          We just need to <span className="font-serif italic font-normal text-[#FF5A36]">pause</span> and{' '}
          <span className="font-serif italic font-normal text-white font-serif">truly observe</span> them.
        </span>
      );
    }
    const words = text.split(' ');
    return (
      <span className="font-sans font-light tracking-tight text-[#F1F0EB]">
        {words.map((word, index) => {
          const isItalic = index % 3 === 1;
          if (isItalic) {
            return (
              <React.Fragment key={index}>
                <span className="font-serif italic font-normal text-white">{word.toLowerCase()}</span>{' '}
              </React.Fragment>
            );
          }
          return <React.Fragment key={index}>{word} </React.Fragment>;
        })}
      </span>
    );
  };

  return (
    <section className="relative min-h-[92svh] w-full flex flex-col justify-between pt-28 pb-8 px-4 sm:px-6 lg:px-12 bg-[#09090A] overflow-hidden">
      
      {/* Full-Bleed Free Floating Atmospheric Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{
            scale: [1.05, 1.08, 1.05],
            opacity: 0.35,
          }}
          transition={{
            scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.8 },
          }}
          src={heroData.bgImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85"}
          alt="Gullo Atmospheric Background"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center will-change-transform pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-[#09090A]/70 to-[#09090A]/90" />
        
        {/* Animated Fiery Light Aura */}
        <motion.div
          animate={{
            x: ['-50%', '-48%', '-52%', '-50%'],
            y: ['0%', '-5%', '3%', '0%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-[#FF5A36]/15 rounded-full blur-[170px] pointer-events-none"
        />
      </div>

      {/* Hero Top Eyebrow Info */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[#8D8D89]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse"></span>
          <span className="uppercase tracking-widest text-[#C9C7C1]">Filmmaker · Photographer · Storyteller</span>
        </div>
        <CoordinatesTag location="BRESCIA, ITALY" coords="45°32'N 10°02'E" />
      </motion.div>

      {/* Hero Center Display Headline */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full border border-[#FF5A36]/20"
        >
          [ ARCHIVE INDEX · VINCENZO GULLUSCIO ]
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F1F0EB] leading-[1.08] tracking-tight text-balance mb-6"
        >
          {renderMixedHeadline(heroData.headline)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#C9C7C1] font-sans font-normal leading-relaxed text-pretty"
        >
          {heroData.subtitle}
        </motion.p>
      </div>

      {/* Hero Bottom Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[#8D8D89] pt-4 border-t border-[#28282D]/30"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-[#FF5A36] rounded-full"></span>
          <span className="uppercase tracking-widest text-[10px]">SCROLL TO EXPLORE ARCHIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#8D8D89]">
          <span>CINEMATOGRAPHY & DOCUMENTARY</span>
          <span className="text-[#28282D]">•</span>
          <span>GULLO STUDIO © 2026</span>
        </div>
      </motion.div>

    </section>
  );
};
