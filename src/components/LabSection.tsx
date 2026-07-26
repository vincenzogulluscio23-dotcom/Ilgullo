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

  const displayArticles = isTeaser ? localizedArticles.slice(0, 3) : filteredArticles;

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

        {/* Free Borderless Article Stream */}
        <div className="space-y-4">
          {displayArticles.map((article) => (
            <div
              key={article.id}
              data-cursor="READ"
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer border-b border-[#28282D]/40 py-6 sm:py-8 transition-all duration-300 hover:border-[#FF5A36] hover:pl-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8D8D89] mb-3">
                    <span className="text-[#FF5A36]">{article.number}</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F1F0EB] group-hover:text-white transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C9C7C1] font-sans leading-relaxed text-pretty line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0">
                  <span className="font-mono text-xs text-[#8D8D89] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>

                  <div className="w-10 h-10 rounded-full border border-[#28282D] group-hover:border-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </section>
  );
};

