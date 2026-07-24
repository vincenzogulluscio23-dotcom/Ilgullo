import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Upload, Copy, Check, Trash2, Search, Filter, Image as ImageIcon, ExternalLink, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CMSMediaLibrary: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    (Array.from(files) as File[]).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          addMediaAsset({
            url: base64Url,
            name: file.name,
            category: 'general',
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    addMediaAsset({
      url: newUrl,
      name: newName || 'Immagine Personalizzata',
      category: 'general',
    });

    setNewUrl('');
    setNewName('');
    setShowAddModal(false);
  };

  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Libreria Media & Immagini
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            {mediaAssets.length} file multimediali registrati
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* File Upload Button */}
          <label className="cursor-pointer py-2.5 px-4 rounded-xl bg-[#121214] border border-white/10 hover:border-[#FF5A36] text-white font-mono text-xs inline-flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4 text-[#FF5A36]" />
            <span>Carica da Computer</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Add URL Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="py-2.5 px-4 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs inline-flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Aggiungi URL Immagine</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8D8D89] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca per nome o URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8D8D89] focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {['all', 'projects', 'frames', 'hero', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#FF5A36] text-white'
                  : 'bg-[#121214] text-[#8D8D89] hover:text-white border border-[#28282D]'
              }`}
            >
              {cat === 'all' ? 'Tutte' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredAssets.length === 0 ? (
        <div className="py-20 text-center bg-[#121214]/40 rounded-3xl border border-dashed border-[#28282D]">
          <ImageIcon className="w-10 h-10 text-[#8D8D89] mx-auto mb-3 opacity-40" />
          <p className="font-mono text-xs text-[#8D8D89]">Nessuna immagine trovata con i filtri attuali.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => (
            <motion.div
              key={asset.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden hover:border-[#FF5A36]/60 transition-all shadow-md flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-[#09090A] overflow-hidden">
                <img
                  src={asset.url}
                  alt={asset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#09090A]/80 text-[10px] font-mono text-[#FF5A36] uppercase tracking-wider backdrop-blur-md">
                  {asset.category}
                </span>

                {/* Quick Copy Link Hover Overlay */}
                <div className="absolute inset-0 bg-[#09090A]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="p-2.5 rounded-xl bg-[#FF5A36] text-white hover:bg-[#E04826] transition-colors shadow-lg"
                    title="Copia URL Immagine"
                  >
                    {copiedId === asset.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#28282D] text-white hover:bg-white hover:text-black transition-colors"
                    title="Apri immagine full size"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => deleteMediaAsset(asset.id)}
                    className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                    title="Elimina dalla libreria"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#121214] border-t border-[#28282D]/60">
                <p className="font-mono text-[11px] text-white truncate font-medium mb-0.5">
                  {asset.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8D8D89]">
                  <span>{asset.uploadedAt}</span>
                  {copiedId === asset.id && <span className="text-[#FF5A36] font-bold">Copiato!</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Add URL */}
      <AnimatePresence>
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 bg-[#09090A]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-[#121214] border border-[#28282D] rounded-3xl p-6 shadow-2xl space-y-5"
            >
              <h3 className="font-serif italic text-2xl text-white">Aggiungi URL Immagine</h3>
              
              <form onSubmit={handleAddCustomUrl} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Nome Immagine</label>
                  <input
                    type="text"
                    placeholder="Es. Copertina Campagna 2026"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine (Unsplash, CDN, Web)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#28282D]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#FF5A36] text-white text-xs font-mono font-medium hover:bg-[#E04826]"
                  >
                    Salva in Libreria
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
