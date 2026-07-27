import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, User, Mail, Globe, Sparkles } from 'lucide-react';

export const CMSSitePagesManager: React.FC = () => {
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
            Gestione Pagine statiche, Brand & Contatti
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Modifica il logo header, la favicon, la hero di Chi Sono, i loghi dei brand collaboratori ed i recapiti.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saveSuccess ? 'Modifiche Salvate!' : 'Salva Pagine'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Brand & Favicon Identity Card */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <Sparkles className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Identità Visiva (Logo & Favicon)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Logo Personalizzato (Header)</label>
              <input
                type="text"
                placeholder="https://.../logo.png"
                value={formData.customLogoUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customLogoUrl: e.target.value,
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
              <span className="text-[10px] text-[#8D8D89] font-mono mt-1 block">
                Lascia vuoto per utilizzare il monogramma Gullo.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Favicon Personalizzata (Browser Icon)</label>
              <input
                type="text"
                placeholder="https://.../favicon.ico"
                value={formData.faviconUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faviconUrl: e.target.value,
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
              <span className="text-[10px] text-[#8D8D89] font-mono mt-1 block">
                Icona mostrata nella scheda del browser del sito web.
              </span>
            </div>
          </div>
        </div>

        {/* About Page Hero Settings */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <User className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Hero della Pagina "Chi Sono"</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine o Video Hero *</label>
              <input
                type="text"
                required
                value={formData.aboutHeroMediaUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    aboutHeroMediaUrl: e.target.value,
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Tipo Media Hero *</label>
              <select
                value={formData.aboutHeroMediaType || 'image'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    aboutHeroMediaType: e.target.value as 'image' | 'video',
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              >
                <option value="image">Immagine d'impatto</option>
                <option value="video">Video Sfondo (Vimeo/Embed)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collaborating Brands Manager (Up to 25 brands) */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#FF5A36]" />
              <h3 className="font-serif italic text-xl text-white">Brand & Clienti Collaboratori (fino a 25)</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = formData.brands || [];
                if (current.length >= 25) return;
                setFormData({
                  ...formData,
                  brands: [...current, { name: 'Nuovo Brand', logoUrl: '' }],
                });
              }}
              className="py-1.5 px-3.5 rounded-lg bg-[#28282D] hover:bg-[#FF5A36] text-white font-mono text-xs transition-colors"
            >
              + Aggiungi Brand
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {(formData.brands || []).map((brand, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 bg-[#09090A] p-3 rounded-xl border border-[#28282D]">
                <span className="font-mono text-xs text-[#8D8D89] w-6 shrink-0">#{idx + 1}</span>
                <input
                  type="text"
                  placeholder="Nome Brand"
                  value={brand.name}
                  onChange={(e) => {
                    const newBrands = [...(formData.brands || [])];
                    newBrands[idx] = { ...newBrands[idx], name: e.target.value };
                    setFormData({ ...formData, brands: newBrands });
                  }}
                  className="w-full sm:w-1/3 bg-[#121214] border border-[#28282D] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
                <input
                  type="text"
                  placeholder="URL Logo Immagine (opzionale)"
                  value={brand.logoUrl || ''}
                  onChange={(e) => {
                    const newBrands = [...(formData.brands || [])];
                    newBrands[idx] = { ...newBrands[idx], logoUrl: e.target.value };
                    setFormData({ ...formData, brands: newBrands });
                  }}
                  className="w-full sm:flex-1 bg-[#121214] border border-[#28282D] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBrands = (formData.brands || []).filter((_, i) => i !== idx);
                    setFormData({ ...formData, brands: newBrands });
                  }}
                  className="text-xs font-mono text-red-400 hover:text-red-300 px-2 py-1 shrink-0"
                >
                  Rimuovi
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <Mail className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Contatti & Canali Social</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Email di Contatto *</label>
              <input
                type="email"
                required
                value={formData.contact?.email || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Numero di Telefono *</label>
              <input
                type="text"
                required
                value={formData.contact?.phone || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Instagram URL</label>
              <input
                type="text"
                value={formData.contact?.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialLinks: { ...formData.contact?.socialLinks, instagram: e.target.value },
                    },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Vimeo URL</label>
              <input
                type="text"
                value={formData.contact?.socialLinks?.vimeo || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialLinks: { ...formData.contact?.socialLinks, vimeo: e.target.value },
                    },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="py-3 px-8 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>Salva Pagine & Contatti</span>
          </button>
        </div>

      </form>
    </div>
  );
};
