import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { FrameItem, FrameCategory } from '../../types';
import { Plus, Trash2, Edit2, Image as ImageIcon, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CMSFramesManager: React.FC = () => {
  const { frames, addFrame, updateFrame, deleteFrame } = useCMS();
  const [editingFrame, setEditingFrame] = useState<FrameItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyFrame: FrameItem = {
    id: `frame-${Date.now()}`,
    number: `0${frames.length + 1}`,
    title: 'Nuovo Scatto',
    location: 'Milano, Italy',
    date: '2026',
    category: 'Places',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '3:4',
    orientation: 'vertical',
    featured: true,
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

  const frameCategories: FrameCategory[] = ['All', 'People', 'Places', 'Details', 'Motion', 'Personal', 'Work'];

  return (
    <div className="space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Archivio Frames ({frames.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Gestisci la collezione di fotografie, ritratti, frammenti visivi e istanti.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingFrame(emptyFrame);
            setIsCreating(true);
          }}
          className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Frame</span>
        </button>
      </div>

      {/* Frames Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {frames.map((f) => (
          <div
            key={f.id}
            className="group bg-[#121214] border border-[#28282D] rounded-2xl overflow-hidden hover:border-[#FF5A36]/60 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[3/4] w-full bg-black overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title || 'Frame'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#09090A]/80 text-[10px] font-mono text-[#FF5A36] backdrop-blur-md">
                  {f.category}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                  {f.aspectRatio}
                </span>
              </div>

              <div className="p-4">
                <span className="font-mono text-[10px] text-[#8D8D89] uppercase tracking-wider block mb-0.5">
                  {f.location || 'Location'} · {f.date}
                </span>
                <h4 className="font-serif italic text-base text-white truncate">
                  {f.title || `Frame ${f.number}`}
                </h4>
              </div>
            </div>

            <div className="px-4 py-3 bg-[#09090A]/60 border-t border-[#28282D] flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setEditingFrame(f);
                  setIsCreating(false);
                }}
                className="p-1.5 rounded bg-[#28282D] text-white hover:bg-[#FF5A36] transition-colors"
                title="Modifica"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Eliminare il frame "${f.title}"?`)) {
                    deleteFrame(f.id);
                  }
                }}
                className="p-1.5 rounded bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Elimina"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Frame Edit Modal */}
      <AnimatePresence>
        {editingFrame && (
          <div
            className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setEditingFrame(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-[#121214] border border-[#28282D] rounded-3xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
                <h3 className="font-serif italic text-2xl text-white">
                  {isCreating ? 'Aggiungi Nuovo Frame' : 'Modifica Frame'}
                </h3>
                <button
                  onClick={() => setEditingFrame(null)}
                  className="p-2 rounded-full bg-[#09090A] text-[#8D8D89] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Titolo / Soggetto *</label>
                  <input
                    type="text"
                    required
                    value={editingFrame.title || ''}
                    onChange={(e) => setEditingFrame({ ...editingFrame, title: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Categoria *</label>
                    <select
                      value={editingFrame.category}
                      onChange={(e) => setEditingFrame({ ...editingFrame, category: e.target.value as FrameCategory })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    >
                      {frameCategories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Aspect Ratio *</label>
                    <select
                      value={editingFrame.aspectRatio}
                      onChange={(e) => setEditingFrame({ ...editingFrame, aspectRatio: e.target.value as any })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    >
                      {['3:4', '4:3', '16:9', '16:10', '4:5', '1:1'].map((ratio) => (
                        <option key={ratio} value={ratio}>
                          {ratio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Luogo</label>
                    <input
                      type="text"
                      value={editingFrame.location || ''}
                      onChange={(e) => setEditingFrame({ ...editingFrame, location: e.target.value })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Anno / Data</label>
                    <input
                      type="text"
                      value={editingFrame.date || ''}
                      onChange={(e) => setEditingFrame({ ...editingFrame, date: e.target.value })}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9C7C1] mb-1">URL Immagine *</label>
                  <input
                    type="url"
                    required
                    value={editingFrame.image}
                    onChange={(e) => setEditingFrame({ ...editingFrame, image: e.target.value })}
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#28282D]">
                  <button
                    type="button"
                    onClick={() => setEditingFrame(null)}
                    className="px-4 py-2 text-xs font-mono text-[#8D8D89] hover:text-white"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#FF5A36] text-white text-xs font-mono font-medium hover:bg-[#E04826]"
                  >
                    Salva Frame
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
