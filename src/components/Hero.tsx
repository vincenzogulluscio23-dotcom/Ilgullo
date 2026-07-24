import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Button } from './Button';
import { useCMS } from '../context/CMSContext';
import { Volume2, VolumeX, Play, Pause, Disc } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (route: RoutePath) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { siteContent } = useCMS();
  const heroData = siteContent.hero;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-8 px-4 sm:px-6 lg:px-12 bg-[#09090A] overflow-hidden">
      
      {/* Full-Bleed Free Floating Atmospheric Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: isPlaying ? [1.05, 1.08, 1.05] : 1,
            opacity: isPlaying ? 0.35 : 0.2,
          }}
          transition={{
            scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.8 },
          }}
          src={heroData.bgImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85"}
          alt="Gullo Cinematic Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
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

        {/* Floating Controls */}
        <div className="absolute top-28 right-6 sm:right-12 flex items-center gap-3 z-20">
          {/* Animated Film Reel indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121214]/70 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#C9C7C1]">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <Disc className="w-3.5 h-3.5 text-[#FF5A36]" />
            </motion.div>
            <span>{heroData.reelLabel || "REEL 2026"}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-[#121214]/80 text-[#C9C7C1] hover:text-white border border-white/10 backdrop-blur-md transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center shadow-lg"
            title={isMuted ? "Attiva audio" : "Disattiva audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#8D8D89]" /> : <Volume2 className="w-4 h-4 text-[#FF5A36]" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full bg-[#121214]/80 text-[#C9C7C1] hover:text-white border border-white/10 backdrop-blur-md transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center shadow-lg"
            title={isPlaying ? "Metti in pausa" : "Riproduci"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#FF5A36]" />}
          </motion.button>
        </div>
      </div>

      {/* Hero Top Eyebrow Info */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-[#8D8D89]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse"></span>
          <span className="uppercase tracking-widest text-[#C9C7C1]">Filmmaker · Photographer · Storyteller</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Travagliato, Brescia — IT</span>
          <span className="hidden sm:inline text-[#28282D]">•</span>
          <span className="text-[#FF5A36]">Available for selected projects</span>
        </div>
      </motion.div>

      {/* Hero Center Display Headline */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center py-12 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F1F0EB] leading-[0.92] tracking-tight text-balance mb-6 drop-shadow-sm"
        >
          {heroData.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#C9C7C1] font-sans font-normal leading-relaxed text-pretty mb-8"
        >
          {heroData.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="md"
            icon="arrow-right"
            fullWidthOnMobile
            onClick={() => {
              const el = document.getElementById('featured-projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigate('projects');
            }}
          >
            Esplora i progetti
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidthOnMobile
            onClick={() => onNavigate('contact')}
          >
            Inizia una conversazione
          </Button>
        </motion.div>
      </div>

      {/* Hero Bottom Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-[#8D8D89] pt-4 border-t border-[#28282D]/30"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#FF5A36] rounded-full"></span>
          <span className="uppercase tracking-widest text-[10px]">Scroll to explore</span>
        </div>
        <div className="hidden sm:block">
          <span>Gullo Studio © 2026</span>
        </div>
      </motion.div>

    </section>
  );
};

