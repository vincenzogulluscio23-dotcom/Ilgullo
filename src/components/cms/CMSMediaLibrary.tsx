import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaAsset, ImageOrientation } from '../../types';
import { Search, Copy, Check, Trash2, Filter, Upload, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { processAndUploadMedia } from '../../lib/uploadService';

export const CMSMediaLibrary: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const categories = ['All', 'projects', 'frames', 'hero', 'lab'];

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files) as File[];
    setIsUploading(true);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadStatus(`Ottimizzazione e caricamento (${i + 1}/${fileList.length}): ${file.name}`);
      try {
        const res = await processAndUploadMedia(file);
        addMediaAsset({
          url: res.url,
          name: file.name,
          category: 'projects',
          orientation: res.orientation,
        });
      } catch (err) {
        console.error('Error uploading asset:', file?.name, err);
      }
    }

    setIsUploading(false);
    setUploadStatus(null);
  };

  const filtered = mediaAssets.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.client && m.client.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Libreria Media & File ({mediaAssets.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Archivio centrale di tutte le risorse grafiche, fotografie e video presenti sul sito.
          </p>
        </div>

        <label className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 cursor-pointer transition-all shadow-lg">
          <Upload className="w-4 h-4" />
          <span>Carica Foto / Video</span>
          <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {isUploading && (
        <div className="p-4 bg-[#FF5A36]/15 border border-[#FF5A36]/40 rounded-2xl flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-[#FF5A36] animate-spin shrink-0" />
          <span className="text-xs font-mono text-white font-medium">{uploadStatus}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#8D8D89] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cerca media per nome o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121214] border border-[#28282D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#8D8D89] focus:outline-none focus:border-[#FF5A36]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#FF5A36] text-white font-medium'
                  : 'bg-[#121214] border border-[#28282D] text-[#8D8D89] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden group hover:border-[#FF5A36]/60 transition-all flex flex-col justify-between shadow-md"
          >
            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#FF5A36] border border-white/10 uppercase">
                {asset.category}
              </span>
            </div>

            <div className="p-3">
              <h5 className="text-xs font-mono text-white truncate" title={asset.name}>
                {asset.name}
              </h5>
              <span className="text-[10px] font-mono text-[#8D8D89] block mt-0.5">
                {asset.uploadedAt || '2026'}
              </span>
            </div>

            <div className="p-2 bg-[#09090A] border-t border-[#28282D] flex items-center justify-between">
              <button
                onClick={() => handleCopy(asset.url, asset.id)}
                className="py-1 px-2 rounded-lg bg-[#28282D] hover:bg-[#FF5A36] text-white font-mono text-[10px] inline-flex items-center gap-1 transition-colors"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copia URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm(`Eliminare il file media "${asset.name}"?`)) {
                    deleteMediaAsset(asset.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Elimina Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
