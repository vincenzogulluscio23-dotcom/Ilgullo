import React from 'react';
import { RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { MessageSquare, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ContactCTAProps {
  onNavigate: (route: RoutePath) => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#FF5A36] text-white relative overflow-hidden">
      
      {/* Soft Light Pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto text-left relative z-10">
        
        <SectionLabel label="Contact" className="mb-6 text-white/80" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.05] tracking-tight text-balance mb-6"
        >
          {isEn ? (
            <>Do you have something <br />deserving a <span className="font-sans not-italic font-medium underline underline-offset-8 decoration-white/40">closer look</span>?</>
          ) : (
            <>Hai qualcosa che merita <br />di essere <span className="font-sans not-italic font-medium underline underline-offset-8 decoration-white/40">guardato</span> più da vicino?</>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-base sm:text-lg text-white/90 font-sans leading-relaxed text-pretty max-w-2xl mb-10"
        >
          {isEn
            ? "Tell me about your project, even if it's currently just an idea. We can start with a conversation and explore the narrative that already lives within it."
            : "Raccontami il progetto, anche se è ancora soltanto un’idea. Possiamo partire da una conversazione e capire insieme quale storia existe già al suo interno."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="mailto:vincenzo@ilgullo.com"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#09090A] font-sans font-medium text-sm hover:bg-[#F1F0EB] transition-all shadow-xl min-h-[50px]"
          >
            <Mail className="w-4 h-4 text-[#FF5A36]" />
            <span>vincenzo@ilgullo.com</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://wa.me/393206406483"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/40 text-white font-sans font-medium text-sm hover:bg-white/10 transition-all min-h-[50px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp (+39 320 640 6483)</span>
          </motion.a>

          <Button
            variant="ghost"
            size="md"
            className="text-white hover:text-white/80 underline"
            onClick={() => onNavigate('contact')}
          >
            {isEn ? 'Go to contact form →' : 'Vai al form contatti →'}
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
