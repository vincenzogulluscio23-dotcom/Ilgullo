import React, { useState } from 'react';
import { LabArticle, RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { ArticleModal } from './ArticleModal';
import { SectionHeaderReveal, ScrollReveal } from './motion/ScrollReveal';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedLabArticle } from '../utils/i18nHelpers';

interface LabSectionProps {
  articles: LabArticle[];
  onNavigate?: (route: RoutePath) => void;
  isTeaser?: boolean;
}

export const LabSection: React.FC<LabSectionProps> = ({
  articles,
  onNavigate,
  isTeaser = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<LabArticle | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const localizedArticles = articles.map((a) => getLocalizedLabArticle(a, language));

  const categories = ['All', 'Process', 'Behind the scenes', 'Field notes', 'Experiments', 'Thoughts'];

  const filteredArticles = selectedCategory === 'All'
    ? localizedArticles
    : localizedArticles.filter(a => a.category === selectedCategory);

  const displayArticles = isTeaser ? (localizedArticles.length > 0 ? [localizedArticles[0]] : []) : filteredArticles;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel number={isTeaser ? '06' : undefined} label="Lab — Notes & Process" className="mb-4" />
            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] text-balance">
              {isEn ? (
                <>Ideas, processes <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">and works still in motion.</span></>
              ) : (
                <>Idee, processi <br className="hidden sm:inline" /><span className="font-sans not-italic text-white">e cose ancora in movimento.</span></>
              )}
            </h2>
          </div>

          {isTeaser && onNavigate && (
            <Button
              variant="outline"
              size="md"
              icon="arrow-right"
              onClick={() => onNavigate('lab')}
            >
              {isEn ? 'Explore Lab' : 'Entra nel Lab'}
            </Button>
          )}
        </div>

        {/* Filter Pills */}
        {!isTeaser && (
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#28282D]/40">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#FF5A36] text-white font-medium'
                    : 'bg-[#121214] text-[#C9C7C1] border border-transparent hover:border-[#8D8D89]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Teaser Mode: Single Latest Article Card with Cover Image */}
        {isTeaser && displayArticles.length > 0 ? (
          <div
            data-cursor="READ"
            onClick={() => setSelectedArticle(displayArticles[0])}
            className="group cursor-pointer bg-[#121214] border border-[#28282D] rounded-2xl md:rounded-3xl p-6 sm:p-8 hover:border-[#FF5A36] transition-all duration-500 shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[#09090A]">
                <img
                  src={displayArticles[0].coverImage}
                  alt={displayArticles[0].title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 font-mono text-xs text-[#8D8D89]">
                  <span className="text-[#FF5A36] font-medium">{displayArticles[0].number}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">{displayArticles[0].category}</span>
                  <span>•</span>
                  <span>{displayArticles[0].date}</span>
                </div>

                <h3 className="font-serif italic text-2xl sm:text-4xl text-[#F1F0EB] group-hover:text-white transition-colors leading-tight">
                  {displayArticles[0].title}
                </h3>

                <p className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed line-clamp-3">
                  {displayArticles[0].excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between font-mono text-xs text-[#8D8D89]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {displayArticles[0].readingTime}
                  </span>
                  <span className="text-[#FF5A36] group-hover:underline flex items-center gap-1 font-medium">
                    {isEn ? 'Read article' : 'Leggi articolo'}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Lab Stream with Cover Images & Rich Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <div
                key={article.id}
                data-cursor="READ"
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden hover:border-[#FF5A36] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#09090A] relative">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#09090A]/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] uppercase text-white/90 border border-white/10">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#8D8D89] mb-2">
                      <span className="text-[#FF5A36]">{article.number}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-serif italic text-2xl text-[#F1F0EB] group-hover:text-white transition-colors mb-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#C9C7C1] font-sans leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#28282D]/60 flex items-center justify-between font-mono text-xs text-[#8D8D89]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTime}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#28282D] group-hover:border-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Article Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </section>
  );
};

