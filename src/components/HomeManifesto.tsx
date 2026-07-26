import React from 'react';
import { RoutePath } from '../types';
import { Button } from './Button';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { StackImage } from './StackImage';
import { SectionHeaderReveal } from './motion/ScrollReveal';
import { EditorialSideNote } from './EditorialText';

interface HomeManifestoProps {
  onNavigate: (route: RoutePath) => void;
}

export const HomeManifesto: React.FC<HomeManifestoProps> = ({ onNavigate }) => {
  const { siteContent, frames } = useCMS();
  const { language } = useLanguage();

  const isEn = language === 'en';
  const manifesto = {
    mainStatement: (isEn && siteContent.en?.manifesto?.mainStatement) || siteContent.manifesto.mainStatement,
    subParagraph: (isEn && siteContent.en?.manifesto?.subParagraph) || siteContent.manifesto.subParagraph,
  };

  const stackImages = (frames && frames.length >= 3
    ? frames.slice(0, 3)
    : [
        {
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          title: 'Frammenti di luce',
        },
        {
          image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
          title: 'Iseo',
        },
        {
          image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85',
          title: 'Riva Yachting',
        },
      ]
  ).map((f, i) => ({
    src: f.image,
    alt: f.title || `Frame ${i + 1}`,
    badgeLabel: f.category || 'Visual',
  }));

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

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        <SectionHeaderReveal
          number="01"
          label="Point of view"
          title={manifesto.mainStatement}
        />

        {/* Editorial Stacked Image Showcase & Side Note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
          <div className="lg:col-span-6 space-y-6">
            <StackImage
              images={stackImages}
              preset="editorial"
              align="left"
              aspectRatio="aspect-[16/10]"
              onClickImage={() => onNavigate('frames')}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-base sm:text-lg text-[#C9C7C1] leading-relaxed text-pretty font-sans font-normal">
              {manifesto.subParagraph}
            </p>

            <EditorialSideNote noteNumber="NOTE N° 01 — VISION">
              {isEn
                ? "Every frame is an intentional balance between truth and narrative construction. We remove noise to let emotion breathe."
                : "Ogni inquadratura è un equilibrio intenzionale tra realtà e racconto. Rimuoviamo il superfluo per lasciar respirare l'emozione."}
            </EditorialSideNote>

            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                icon="arrow-right"
                onClick={() => onNavigate('about')}
              >
                {isEn ? 'Discover my approach' : 'Scopri il mio approccio'}
              </Button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};



