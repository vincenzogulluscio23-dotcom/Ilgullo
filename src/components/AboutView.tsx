import React, { useState } from 'react';
import { RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { PROJECTS_DATA } from '../data/projects';
import { FRAMES_DATA } from '../data/frames';
import { OverlappingTabletopCollage } from './OverlappingTabletopCollage';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Globe,
  CheckCircle2,
  Sparkles,
  Camera,
  X,
  Compass,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (route: RoutePath) => void;
  onSelectProject?: (slug: string) => void;
}

interface DynamicMediaItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  type: 'project' | 'frame';
  slug?: string;
  location?: string;
  yearOrDate?: string;
  rotationStyle?: string;
  aspectRatio?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  const [mediaFilter] = useState<'all' | 'projects' | 'frames'>('all');
  const [activeFrameModal, setActiveFrameModal] = useState<DynamicMediaItem | null>(null);

  // Harvest media items from PROJECTS_DATA and FRAMES_DATA
  const harvestedProjects: DynamicMediaItem[] = PROJECTS_DATA.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: `${p.client} · ${p.year}`,
    tag: p.category,
    image: p.coverImage,
    type: 'project',
    slug: p.slug,
    location: p.location,
    yearOrDate: p.year,
  }));

  const harvestedFrames: DynamicMediaItem[] = FRAMES_DATA.map((f) => ({
    id: f.id,
    title: f.title,
    subtitle: `${f.location} · ${f.date}`,
    tag: f.category,
    image: f.image,
    type: 'frame',
    location: f.location,
    yearOrDate: f.date,
  }));

  // Interleave project covers & photography frames dynamically
  const combinedPool: DynamicMediaItem[] = [];
  const maxLen = Math.max(harvestedProjects.length, harvestedFrames.length);
  for (let i = 0; i < maxLen; i++) {
    if (harvestedProjects[i]) combinedPool.push(harvestedProjects[i]);
    if (harvestedFrames[i]) combinedPool.push(harvestedFrames[i]);
  }

  const displayedMedia =
    mediaFilter === 'projects'
      ? harvestedProjects
      : mediaFilter === 'frames'
      ? harvestedFrames
      : combinedPool;

  const clients = [
    'Riva Yacht',
    'Ca\' del Bosco',
    'Furla',
    'Casa Sant\'Orsola',
    'General Fittings',
    'ENGIE',
    'Spezia Calcio',
    'Sorgenia',
    'UBI Banca',
    'Zonin',
    'Bruno Vanzan',
    'Kariba',
    'Forge Fedriga',
    'Hawe Italia',
  ];

  const services = [
    'Film e video corporate',
    'Branded content',
    'Campagne video e fotografiche',
    'Storytelling aziendale',
    'Fotografia editoriale',
    'Interviste e testimonianze',
    'Case study visivi',
    'Contenuti social & digital',
    'Backstage e making of',
    'Direzione e sviluppo creativo',
    'Riprese cinematografiche',
    'Montaggio e post-produzione',
  ];

  const approachQuestions = [
    'Chi guarderà questo contenuto?',
    'Cosa deve rimanere impresso?',
    'Quale storia autentica esiste già?',
    'Cosa percepisce davvero chi osserva?',
    'Cosa si può superare o tralasciare?',
  ];

  const disciplines = [
    { num: '#01', label: 'Direzione Creativa & Storytelling' },
    { num: '#02', label: 'Filmmaking & Regia Corporate' },
    { num: '#03', label: 'Fotografia & Frames d\'Autore' },
    { num: '#04', label: 'Montaggio & Post-Produzione' },
  ];

  const handleMediaClick = (item: DynamicMediaItem) => {
    if (item.type === 'project' && item.slug && onSelectProject) {
      onSelectProject(item.slug);
    } else {
      setActiveFrameModal(item);
    }
  };

  return (
    <div className="pt-20 pb-24 bg-[#09090A] min-h-screen text-[#F1F0EB] relative overflow-hidden">
      
      {/* 1. HERO SECTION WITH FIERY ATMOSPHERE & FULL-CONTAINER PORTRAIT BACKGROUND */}
      <section className="relative w-full pt-16 pb-20 px-4 sm:px-6 lg:px-12 bg-[#1A0C08] border-b border-[#28282D]/50 rounded-b-[2.5rem] md:rounded-b-[4rem] overflow-hidden min-h-[550px] md:min-h-[640px] flex flex-col justify-between">
        
        {/* Full Section Background Image with Fiery Color Blend & Gradient Masking */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.5 }}
            transition={{ duration: 1.2 }}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85"
            alt="Vincenzo Gulluscio"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top lg:object-[70%_20%] mix-blend-luminosity"
          />
          
          {/* Fiery Red/Orange Ambient Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E04B28]/70 via-[#E04B28]/30 to-[#09090A]/80 mix-blend-color-dodge" />
          <div className="absolute inset-0 bg-[#FF5A36]/15 mix-blend-overlay" />
          
          {/* Left-to-Right & Bottom-to-Top Dark Gradients for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090A] via-[#09090A]/80 to-transparent lg:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-transparent to-[#09090A]/50" />
        </div>

        {/* Soft Ambient Light Aura */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/3 w-[800px] h-[500px] bg-[#FF5A36]/30 rounded-full blur-[200px] pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 mb-12">
            
            {/* Left Column: Big Bold Display Typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hey, I'm Vincenzo Gulluscio</span>
              </span>

              <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-6">
                Filmmaker & <br />
                <span className="font-serif italic font-normal text-[#F1F0EB]">Visual Storyteller</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-[#C9C7C1]">
                <div className="flex items-center gap-2 bg-[#09090A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Travagliato, Brescia (IT)</span>
                </div>
                <div className="flex items-center gap-2 bg-[#09090A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <Globe className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Propaganda3 & Freelance</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Floating Manifesto Quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:pl-4"
            >
              <div className="bg-[#09090A]/75 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="font-serif italic text-xl sm:text-2xl text-white mb-3 leading-snug">
                  Le storie più forti nascono da ciò che c'è già.
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#C9C7C1] leading-relaxed">
                  Dalla regia alla fotografia, costruisco racconti visivi che connettono le persone, rispettano l'identità di chi parla e durano nel tempo.
                </p>
              </div>
            </motion.div>

          </div>

          {/* 4 Pillars Discipline Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/15"
          >
            {disciplines.map((d) => (
              <div key={d.num} className="flex flex-col">
                <span className="font-mono text-xs text-[#FF5A36] mb-1 font-semibold">{d.num}</span>
                <span className="font-sans text-xs sm:text-sm text-white font-medium">{d.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 2. CONTINUOUS SCROLLING CLIENT LOGO MARQUEE (Under Hero) */}
      <section className="w-full py-8 bg-[#121214] border-b border-[#28282D]/60 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-3">
          <span className="font-mono text-[11px] text-[#8D8D89] uppercase tracking-widest block">
            Trusted by Brands & Agencies I've Helped Shape
          </span>
        </div>

        {/* Infinite Ticker Track */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-6 sm:gap-10 shrink-0">
            {[...clients, ...clients].map((client, idx) => (
              <div
                key={idx}
                className="px-5 py-2.5 rounded-full bg-[#09090A] border border-[#28282D] font-mono text-xs sm:text-sm text-[#C9C7C1] hover:text-white hover:border-[#FF5A36] transition-colors whitespace-nowrap flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
                <span>{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PERSONAL PRESENTATION & BIOGRAPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionLabel label="Bio & Vision" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Main Biography Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#C9C7C1] font-sans leading-relaxed"
          >
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white leading-tight mb-8">
              Un approccio basato sull'osservazione e sulla sintesi visiva.
            </h2>

            <p>
              Sono Vincenzo Gulluscio, ma da sempre quasi tutti mi chiamano <strong className="text-white font-medium">Gullo</strong>. Lavoro come filmmaker, fotografo e content creator. Mi occupo di immagini, ma il punto di partenza del mio lavoro non è mai soltanto visivo.
            </p>
            <p>
              Lavoro in agenzia, all’interno di <strong className="text-white">Propaganda3</strong>, dove seguo progetti di comunicazione integrata, ma sviluppo anche produzioni autonome e progetti personali. Nel tempo ho collaborato con aziende, brand luxury, realizzazioni industriali e cantine vitivinicole.
            </p>
            <p>
              Un’azienda può aver bisogno di mostrare il proprio processo artigianale. Un brand di lusso di restituire un’atmosfera. Una persona di raccontare la propria storia senza filtri artificiosi. Il mio compito è trovare la misura e la direzione per farlo rimanere impresso.
            </p>
          </motion.div>

          {/* Guiding Questions Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 relative"
          >
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-4 h-4 text-[#FF5A36]" />
              <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest font-medium">
                La bussola prima di ogni ciak
              </span>
            </div>

            <ul className="space-y-4 font-mono text-xs sm:text-sm text-[#C9C7C1]">
              {approachQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-3 border-b border-[#28282D]/40 pb-3 last:border-0">
                  <span className="text-[#FF5A36] font-semibold">0{idx + 1}.</span>
                  <span className="text-white font-medium">{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Services / What I Do Grid */}
        <div className="pt-12 border-t border-[#28282D]/40">
          <SectionLabel label="Services & Capabilities" className="mb-6" />
          <h3 className="font-serif italic text-2xl sm:text-4xl text-white mb-8">
            Linguaggi e strumenti per dare forma ai racconti.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                whileHover={{ y: -3 }}
                className="py-3 px-4 rounded-2xl bg-[#121214] border border-[#28282D]/80 text-xs font-mono text-[#C9C7C1] flex items-center gap-3 hover:text-white hover:border-[#FF5A36] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEHIND THE LENS — CASUAL TABLETOP SCATTERED PHOTO COLLAGE (After presentation) */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#0C0C0E] border-t border-[#28282D]/60 relative overflow-hidden">
        
        {/* Subtle Background Surface Grid Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#28282D_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest block mb-2 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Behind the Lens</span>
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white text-balance">
              Foto e frammenti <span className="font-sans not-italic font-normal">buttati sul tavolo</span>.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8D8D89] mt-2 max-w-xl">
              Un archivio aperto di scatti rubati sul set, frames cinematografici e dettagli estrapolati dalle produzioni.
            </p>
          </div>

          {/* OVERLAPPING TABLETOP SCATTERED PHOTO COLLAGE */}
          <div className="pt-2">
            <OverlappingTabletopCollage
              items={displayedMedia.map((m) => ({
                id: m.id,
                title: m.title,
                subtitle: m.subtitle,
                category: m.tag,
                image: m.image,
                type: m.type,
                slug: m.slug,
                location: m.location,
              }))}
              onItemClick={(item) => {
                const found = displayedMedia.find((m) => m.id === item.id);
                if (found) handleMediaClick(found);
              }}
              theme="light"
            />
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center border-t border-[#28282D]/40">
        <h3 className="font-serif italic text-3xl sm:text-5xl text-white mb-6 leading-tight">
          Non mi interessa soltanto mostrare cosa fai. Mi interessa capire perché qualcuno dovrebbe ricordarlo.
        </h3>
        <Button
          variant="primary"
          size="md"
          icon="arrow-right"
          onClick={() => onNavigate('contact')}
        >
          Raccontami il tuo progetto
        </Button>
      </section>

      {/* Frame Lightbox Modal */}
      <AnimatePresence>
        {activeFrameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveFrameModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full bg-[#121214] border border-[#28282D] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveFrameModal(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-[#09090A]/80 text-white hover:text-[#FF5A36] border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <img
                  src={activeFrameModal.image}
                  alt={activeFrameModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121214]">
                <div>
                  <span className="font-mono text-xs text-[#FF5A36] block mb-1">
                    {activeFrameModal.subtitle}
                  </span>
                  <h3 className="font-serif italic text-2xl text-white">
                    {activeFrameModal.title}
                  </h3>
                </div>

                <Button
                  variant="pill"
                  size="sm"
                  onClick={() => {
                    setActiveFrameModal(null);
                    onNavigate('frames');
                  }}
                >
                  Tutti i frames
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
