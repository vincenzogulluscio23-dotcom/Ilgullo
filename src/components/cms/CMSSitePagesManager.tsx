import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, Sparkles, Check, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const CMSSitePagesManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCMS();
  const [formData, setFormData] = useState(siteContent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Pagine & Testi del Sito
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Modifica i messaggi principali dell'Home Hero, del Manifesto visivo e della Biografia.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Modifiche Salvate!' : 'Salva Tutte le Pagine'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Section 1: Hero Settings */}
        <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#28282D]">
            <Sparkles className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">1. Homepage Hero Block</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Titolo / Slogan Principale Hero *</label>
              <textarea
                rows={2}
                value={formData.hero.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, headline: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Sottotitolo Descrittivo *</label>
              <textarea
                rows={2}
                value={formData.hero.subtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subtitle: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine Sfondo Hero</label>
                <input
                  type="url"
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
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Etichetta Disponibilità</label>
                <input
                  type="text"
                  value={formData.hero.availableBadge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, availableBadge: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Manifesto Settings */}
        <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#28282D]">
            <Globe className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">2. Manifesto & Dichiarazione di Poetica</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Dichiarazione Principale</label>
              <textarea
                rows={2}
                value={formData.manifesto.mainStatement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    manifesto: { ...formData.manifesto, mainStatement: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Paragrafo di Approfondimento</label>
              <textarea
                rows={3}
                value={formData.manifesto.subParagraph}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    manifesto: { ...formData.manifesto, subParagraph: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: About & Contact Settings */}
        <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#28282D]">
            <Mail className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">3. Bio, Studio & Contatti</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Titolo Biografia (About)</label>
              <input
                type="text"
                value={formData.about.bioTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, bioTitle: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Paragrafo 1 Biografia</label>
              <textarea
                rows={3}
                value={formData.about.bioParagraph1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, bioParagraph1: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={formData.about.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, email: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Telefono / WhatsApp</span>
                </label>
                <input
                  type="text"
                  value={formData.about.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, phone: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Sede / Base</span>
                </label>
                <input
                  type="text"
                  value={formData.about.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, location: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3.5 px-8 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xl"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Salvataggio Completato!' : 'Salva Tutte le Modifiche'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
