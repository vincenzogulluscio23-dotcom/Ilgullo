import React, { useEffect } from 'react';
import { LabArticle } from '../types';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleModalProps {
  article: LabArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[180] bg-[#09090A]/95 backdrop-blur-xl overflow-y-auto py-12 px-4 sm:px-6 lg:px-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto bg-[#121214] border border-[#28282D] rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 relative my-8 shadow-2xl"
          >
            
            {/* Top Controls Bar */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#28282D]/60 font-mono text-xs text-[#8D8D89]">
              <button
                onClick={onClose}
                className="flex items-center gap-2 hover:text-[#FF5A36] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Torna al Lab</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full border border-[#28282D] text-[#F1F0EB] hover:text-[#FF5A36] hover:border-[#FF5A36] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#09090A]"
                aria-label="Chiudi Articolo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Header */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#8D8D89] mb-4">
                <span className="text-[#FF5A36] font-medium">{article.number} / {article.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>

              <h1 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] leading-tight text-balance mb-6">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-[#C9C7C1] font-sans font-normal leading-relaxed text-pretty border-l-2 border-[#FF5A36] pl-4 py-1 italic">
                {article.excerpt}
              </p>
            </div>

            {/* Cover Image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-12 bg-[#09090A] border border-[#28282D]/80">
              <img
                src={article.coverImage}
                alt={article.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#C9C7C1] leading-relaxed space-y-6 font-sans">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-[#28282D]/60 flex items-center justify-between font-mono text-xs text-[#8D8D89]">
              <span>Gullo Lab — Note di processo</span>
              <button
                onClick={onClose}
                className="text-[#FF5A36] hover:underline"
              >
                Chiudi articolo ↑
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
