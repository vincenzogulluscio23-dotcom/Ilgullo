import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSSEOEditor } from './CMSSEOEditor';
import { Save, Sparkles, Image as ImageIcon, Eye, Layers } from 'lucide-react';

export const CMSHomepageManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCMS();
  const [formData, setFormData] = useState(siteContent);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Homepage Editoriale
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Modifica tutti i testi, i media di sfondo, la dichiarazione d’intenti e l'impostazione SEO della Home.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saveSuccess ? 'Modifiche Salvate!' : 'Salva Homepage'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Hero Section Card */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <Layers className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Sezione Hero di Apertura</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">
                Headline Principale (Supporta HTML o testo formattato) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.hero.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, headline: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Sottotitolo / Estratto Introductivo *</label>
              <textarea
                rows={2}
                required
                value={formData.hero.subtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subtitle: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine o Video di Sfondo Hero *</label>
              <input
                type="text"
                required
                value={formData.hero.bgImage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, bgImage: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Etichetta Badge Reel (Es: REEL 2026)</label>
              <input
                type="text"
                value={formData.hero.reelLabel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, reelLabel: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>
          </div>
        </div>

        {/* Manifesto Section Card */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <Sparkles className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Manifesto & Dichiarazione d’Intenti</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Dichiarazione Principale Manifesto *</label>
              <textarea
                rows={3}
                required
                value={formData.manifesto.mainStatement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    manifesto: { ...formData.manifesto, mainStatement: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Paragrafo Approfondimento Metodo *</label>
              <textarea
                rows={4}
                required
                value={formData.manifesto.subParagraph}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    manifesto: { ...formData.manifesto, subParagraph: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>
          </div>
        </div>

        {/* Homepage SEO Editor */}
        <CMSSEOEditor
          seo={formData.seo}
          onChange={(seo) => setFormData({ ...formData, seo })}
          defaultTitle="Vincenzo Gulluscio — Director & Photographer"
          defaultDesc="Portfolio di Vincenzo Gulluscio. Regia, fotografia e branded content per aziende e agenzie che cercano verita e personalita."
        />

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="py-3 px-8 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Salva Tutte le Modifiche Homepage</span>
          </button>
        </div>

      </form>
    </div>
  );
};
