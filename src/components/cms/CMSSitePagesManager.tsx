import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, User, Mail, Globe, Shield, Sparkles } from 'lucide-react';

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
            Gestione Pagine statiche & Contatti
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Modifica la biografia della pagina About, i recapiti di contatto, i link social e la privacy policy.
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
        
        {/* About Page Section */}
        <div className="bg-[#121214] border border-[#28282D] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#28282D]">
            <User className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Pagina About & Biografia</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Dichiarazione Principale Biografia *</label>
              <textarea
                rows={3}
                required
                value={formData.about.statement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, statement: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Testo Approfondimento *</label>
              <textarea
                rows={4}
                required
                value={formData.about.bioParagraph}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, bioParagraph: e.target.value },
                  })
                }
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Ritratto Vincenzo *</label>
                <input
                  type="text"
                  required
                  value={formData.about.portraitImage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, portraitImage: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Studio / Base *</label>
                <input
                  type="text"
                  required
                  value={formData.about.baseLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, baseLocation: e.target.value },
                    })
                  }
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>
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
                value={formData.contact.email}
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
                value={formData.contact.phone}
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
                value={formData.contact.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialLinks: { ...formData.contact.socialLinks, instagram: e.target.value },
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
                value={formData.contact.socialLinks?.vimeo || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialLinks: { ...formData.contact.socialLinks, vimeo: e.target.value },
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
