import React, { useState } from 'react';
import { SectionLabel } from './EditorialText';
import { Layers, Eye, Film, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const BeyondProcessSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'superficie' | 'dettaglio' | 'processo' | 'significato'>('superficie');
  const { language } = useLanguage();
  const isEn = language === 'en';

  const layers = [
    {
      id: 'superficie',
      label: isEn ? '01 / Surface' : '01 / Superficie',
      title: isEn ? 'The Visible Form' : 'L\'aspetto visibile',
      icon: Eye,
      text: isEn
        ? 'What a brand normally displays: the finished product, the pristine workshop, the polished showreel. It is the necessary doorway, yet alone it cannot forge a lasting connection.'
        : 'Quello che l\'azienda o il brand mostra normalmente: il prodotto finito, lo stabilimento pulito, lo showreel patinato. È il punto d\'ingresso necessario, ma da solo non basta a creare connessione.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'dettaglio',
      label: isEn ? '02 / Detail' : '02 / Dettaglio',
      title: isEn ? 'What Escapes Notice' : 'Ciò che sfugge',
      icon: Sparkles,
      text: isEn
        ? 'An artisan\'s hand checking a fold, late afternoon light streaming through glass, quiet focus before an event. Details reveal the obsession with mastery.'
        : 'La mano dell\'artigiano che controlla una piega, la luce del tardo pomeriggio che penetra dalle vetrate, la tensione negli sguardi prima di un evento. I dettagli rivelano l\'ossessione per la qualità.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'processo',
      label: isEn ? '03 / Process' : '03 / Processo',
      title: isEn ? 'Unfiltered Craft' : 'La verità del lavoro',
      icon: Layers,
      text: isEn
        ? 'Hours of waiting, quiet conversations around the workbench, doubts resolved together. Creative work is non-linear; honoring its organic rhythm ensures true credibility.'
        : 'Le ore di attesa, le conversazioni informali attorno al banco, i dubbi risolti insieme. Il processo creativo non è lineare, e proteggere la sua naturalezza garantisce un racconto credibile.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'significato',
      label: isEn ? '04 / Meaning' : '04 / Significato',
      title: isEn ? 'What Lingers' : 'Quello che resta',
      icon: Film,
      text: isEn
        ? 'The lasting impression left with the audience: not a bullet-point summary of services, but the core reason a brand deserves to be remembered.'
        : 'La sensazione finale che il pubblico trattiene: non un riassunto tecnico di quello che fa l\'azienda, ma la ragione profonda per cui merita di essere ricordata e scelta.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  const currentLayer = layers.find(l => l.id === activeTab) || layers[0];

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF5A36]/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Interactive Tabs */}
          <div className="lg:col-span-6">
            <SectionLabel number="03" label={isEn ? "Beyond the process" : "Oltre il processo"} className="mb-4" />
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] leading-tight text-balance mb-6"
            >
              {isEn ? (
                <>Layers of a narrative: <br /><span className="font-sans not-italic text-white">from surface to lasting value.</span></>
              ) : (
                <>Strati di un racconto: <br /><span className="font-sans not-italic text-white">dalla superficie al valore.</span></>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed mb-8"
            >
              {isEn
                ? 'A film or photo essay is never created by stringing together pretty shots. It is built by exploring four layers of depth to find the most authentic angle.'
                : 'Un film o un progetto fotografico non nasce dall’assemblaggio di belle inquadrature. Si costruisce esplorando quattro livelli di profondità per trovare l’angolo più veritiero.'}
            </motion.p>

            {/* Free Layer Tabs */}
            <div className="flex flex-col gap-3 mb-8">
              {layers.map((layer) => {
                const isActive = activeTab === layer.id;
                const Icon = layer.icon;

                return (
                  <motion.button
                    key={layer.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(layer.id as any)}
                    className={`text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between relative overflow-hidden ${
                      isActive
                        ? 'bg-[#121214] text-white shadow-xl ring-1 ring-[#FF5A36]/50'
                        : 'bg-[#121214]/30 text-[#8D8D89] hover:text-[#C9C7C1] hover:bg-[#121214]/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="layerActivePill"
                        className="absolute inset-0 bg-[#FF5A36]/10 border-l-2 border-[#FF5A36] pointer-events-none"
                      />
                    )}
                    <div className="flex items-center gap-4 relative z-10">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF5A36]' : 'text-[#8D8D89]'}`} />
                      <div>
                        <span className="font-mono text-[10px] text-[#8D8D89] uppercase tracking-wider block">{layer.label}</span>
                        <span className={`font-sans text-sm sm:text-base font-medium ${isActive ? 'text-white' : 'text-[#C9C7C1]'}`}>{layer.title}</span>
                      </div>
                    </div>
                    <span className={`font-mono text-xs relative z-10 ${isActive ? 'text-[#FF5A36]' : 'text-[#28282D]'}`}>→</span>
                  </motion.button>
                );
              })}
            </div>

          </div>

          {/* Right Floating Image Frame */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#121214] shadow-2xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(255,90,54,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={currentLayer.image}
                  alt={currentLayer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090A] via-[#09090A]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] block mb-2">
                    {currentLayer.label}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-4xl text-white mb-3">
                    {currentLayer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C9C7C1] font-sans leading-relaxed text-pretty">
                    {currentLayer.text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

