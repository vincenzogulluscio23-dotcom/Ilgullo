import React from 'react';
import { SEOData } from '../../types';
import { Search, Globe, Share2, Sparkles } from 'lucide-react';

interface CMSSEOEditorProps {
  seo?: SEOData;
  onChange: (seo: SEOData) => void;
  defaultTitle?: string;
  defaultDesc?: string;
}

export const CMSSEOEditor: React.FC<CMSSEOEditorProps> = ({
  seo,
  onChange,
  defaultTitle = 'Vincenzo Gulluscio — Director & Photographer',
  defaultDesc = 'Portfolio di Vincenzo Gulluscio. Film, fotografia e contenuti editoriali per brand e progetti con voce autentica.',
}) => {
  const currentSeo: SEOData = {
    title: seo?.title || defaultTitle,
    description: seo?.description || defaultDesc,
    ogImage: seo?.ogImage || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    canonical: seo?.canonical || 'https://ilgullo.com',
    keywords: seo?.keywords || 'regia, fotografia, filmmaker, brescia, milano, branded content, gullo',
  };

  const handleChange = (field: keyof SEOData, value: string) => {
    onChange({
      ...currentSeo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6 bg-[#09090A] border border-[#28282D] rounded-2xl p-5">
      <div className="pb-3 border-b border-[#28282D]">
        <h4 className="text-sm font-mono text-white font-medium flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#FF5A36]" />
          <span>Ottimizzazione SEO & Meta Tag Social</span>
        </h4>
        <p className="text-[11px] text-[#8D8D89] font-mono mt-0.5">
          Gestisci l’indicizzazione su Google e l’aspetto delle anteprime quando condividi il link su WhatsApp, LinkedIn e Instagram.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-[#C9C7C1] mb-1">
            Meta Title ({currentSeo.title.length}/60 caratteri)
          </label>
          <input
            type="text"
            value={currentSeo.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine Open Graph (Social Banner)</label>
          <input
            type="text"
            value={currentSeo.ogImage || ''}
            onChange={(e) => handleChange('ogImage', e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-[#C9C7C1] mb-1">
            Meta Description ({currentSeo.description.length}/160 caratteri)
          </label>
          <textarea
            rows={2}
            value={currentSeo.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Canonical</label>
          <input
            type="text"
            value={currentSeo.canonical || ''}
            onChange={(e) => handleChange('canonical', e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Parole Chiave (Keywords)</label>
          <input
            type="text"
            value={currentSeo.keywords || ''}
            onChange={(e) => handleChange('keywords', e.target.value)}
            placeholder="filmmaker, fotografia, regia"
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
          />
        </div>
      </div>

      {/* Real-time Previews */}
      <div className="pt-4 border-t border-[#28282D] space-y-4">
        
        {/* Google Search Result Snippet Preview */}
        <div>
          <span className="text-xs font-mono text-[#8D8D89] block mb-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Anteprima Risultato di Ricerca Google</span>
          </span>

          <div className="bg-white rounded-xl p-4 text-black shadow font-sans space-y-1">
            <div className="text-[11px] text-[#202124] truncate flex items-center gap-1">
              <span className="font-medium">ilgullo.com</span>
              <span className="text-[#5f6368]">› {currentSeo.canonical ? currentSeo.canonical.replace('https://', '') : 'progetto'}</span>
            </div>
            <h5 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
              {currentSeo.title}
            </h5>
            <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
              {currentSeo.description}
            </p>
          </div>
        </div>

        {/* Social Share Card Preview */}
        <div>
          <span className="text-xs font-mono text-[#8D8D89] block mb-2 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Anteprima Card Condivisione Social (WhatsApp, LinkedIn, IG)</span>
          </span>

          <div className="bg-[#121214] border border-[#28282D] rounded-xl overflow-hidden max-w-md shadow-lg">
            <div className="aspect-[1.91/1] bg-black overflow-hidden relative">
              {currentSeo.ogImage ? (
                <img
                  src={currentSeo.ogImage}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#8D8D89]">
                  Nessun OgImage impostato
                </div>
              )}
            </div>
            <div className="p-3 space-y-1 bg-[#121214]">
              <span className="text-[10px] font-mono text-[#8D8D89] uppercase tracking-wider block">
                ilgullo.com
              </span>
              <h6 className="text-xs font-semibold text-white line-clamp-1">{currentSeo.title}</h6>
              <p className="text-[11px] text-[#C9C7C1] line-clamp-2">{currentSeo.description}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
