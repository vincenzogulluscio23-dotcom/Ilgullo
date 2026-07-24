import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { FrameItem, FrameCategory, ImageOrientation } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Upload, Filter } from 'lucide-react';
import { detectImageOrientation } from '../../lib/cmsStorage';

export const CMSFramesManager: React.FC = () => {
  const { frames, addFrame, updateFrame, deleteFrame, projects } = useCMS();
  const [editingFrame, setEditingFrame] = useState<FrameItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: FrameCategory[] = ['All', 'People', 'Places', 'Details', 'Motion', 'Personal', 'Work'];

  const emptyFrame: FrameItem = {
    id: `frame-${Date.now()}`,
    number: `0${frames.length + 1}`,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    title: 'Fotografia senza titolo',
    category: 'Places',
    location: 'Milano, Italy',
    date: '2026',
    aspectRatio: '16:9',
    orientation: 'horizontal',
    altText: 'Fotografia d’autore di Vincenzo Gulluscio',
  };

  const handleStartCreate = () => {
    setEditingFrame(emptyFrame);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFrame) return;

    if (isCreating) {
      addFrame(editingFrame);
    } else {
      updateFrame(editingFrame.id, editingFrame);
    }

    setEditingFrame(null);
    setIsCreating(false);
  };

  const filteredFrames = frames.filter(
    (f) => selectedCategory === 'All' || (f.category || 'Uncategorized').toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Archivio Frames ({frames.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Archivio fotografico libero con rilevamento automatico dell'orientamento e tag di luogo.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Frame</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-[#8D8D89] flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtra:</span>
        </span>
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

      {/* Frames Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFrames.map((f) => (
          <div
            key={f.id}
            className="bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden group hover:border-[#FF5A36]/60 transition-all flex flex-col justify-between shadow-md"
          >
            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={f.image}
                alt={f.title || f.number}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded font-mono text-[9px] text-[#FF5A36] border border-white/10">
                #{f.number} • {f.orientation}
              </div>
            </div>

            <div className="p-3">
              <h4 className="text-xs font-serif italic text-white line-clamp-1">{f.title || 'Senza titolo'}</h4>
              <span className="text-[10px] font-mono text-[#8D8D89] block mt-0.5">{f.location || 'N/D'}</span>
            </div>

            <div className="p-2.5 bg-[#09090A] border-t border-[#28282D] flex items-center justify-end gap-1.5">
              <button
                onClick={() => {
                  setEditingFrame(f);
                  setIsCreating(false);
                }}
                className="p-1.5 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] transition-colors"
                title="Modifica Frame"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Eliminare il frame #${f.number}?`)) {
                    deleteFrame(f.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Elimina Frame"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Frame Edit Modal */}
      {editingFrame && (
        <div
          className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setEditingFrame(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-[#121214] border border-[#28282D] rounded-3xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
              <h3 className="font-serif italic text-xl text-white">
                {isCreating ? 'Aggiungi Nuovo Frame' : `Modifica Frame #${editingFrame.number}`}
              </h3>
              <button onClick={() => setEditingFrame(null)} className="text-[#8D8D89] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL File Immagine *</label>
                <input
                  type="text"
                  required
                  value={editingFrame.image}
                  onChange={(e) => {
                    const url = e.target.value;
                    const img = new Image();
                    img.onload = () => {
                      const orientation = detectImageOrientation(img.width, img.height);
                      setEditingFrame({ ...editingFrame, image: url, orientation });
                    };
                    img.src = url;
                    setEditingFrame({ ...editingFrame, image: url });
                  }}
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Titolo / Didascalia</label>
                  <input
                    type="text"
                    value={editingFrame.title || ''}
                    onChange={(e) => setEditingFrame({ ...editingFrame, title: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Categoria</label>
                  <select
                    value={editingFrame.category || 'Street'}
                    onChange={(e) => setEditingFrame({ ...editingFrame, category: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Luogo</label>
                  <input
                    type="text"
                    value={editingFrame.location || ''}
                    onChange={(e) => setEditingFrame({ ...editingFrame, location: e.target.value })}
                    placeholder="Milano, Italy"
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Orientamento Detected</label>
                  <select
                    value={editingFrame.orientation || 'horizontal'}
                    onChange={(e) =>
                      setEditingFrame({ ...editingFrame, orientation: e.target.value as ImageOrientation })
                    }
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="horizontal">Orizzontale</option>
                    <option value="vertical">Verticale</option>
                    <option value="square">Quadrato</option>
                    <option value="panoramic">Panoramico</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Collega a un Progetto (Opzionale)</label>
                <select
                  value={editingFrame.projectId || ''}
                  onChange={(e) => setEditingFrame({ ...editingFrame, projectId: e.target.value })}
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="">Nessun progetto collegato</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.client})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingFrame(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Salva Frame</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
