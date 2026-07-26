import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { FrameItem, FrameCategory, ImageOrientation } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Upload,
  Filter,
  CheckSquare,
  Square,
  Layers,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { detectImageOrientation } from '../../lib/cmsStorage';

interface BulkUploadItem {
  id: string;
  file?: File;
  previewUrl: string;
  title: string;
  altText: string;
  category: string;
  location: string;
  date: string;
  orientation: ImageOrientation;
  status: 'pending' | 'uploading' | 'ready' | 'error';
  errorMessage?: string;
}

export const CMSFramesManager: React.FC = () => {
  const { frames, addFrame, updateFrame, deleteFrame, projects } = useCMS();
  const [editingFrame, setEditingFrame] = useState<FrameItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Multi-Selection state
  const [selectedFrameIds, setSelectedFrameIds] = useState<string[]>([]);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);

  // Bulk Upload Modal state
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [bulkSharedCategory, setBulkSharedCategory] = useState<string>('Places');
  const [bulkSharedLocation, setBulkSharedLocation] = useState<string>('Milano, Italy');
  const [bulkSharedDate, setBulkSharedDate] = useState<string>('2026');
  const [bulkSharedProjectId, setBulkSharedProjectId] = useState<string>('');
  const [bulkSharedTags, setBulkSharedTags] = useState<string>('Travel, Editorial');
  const [bulkItems, setBulkItems] = useState<BulkUploadItem[]>([]);

  // Bulk Edit Modal field inputs
  const [bulkEditCategory, setBulkEditCategory] = useState<string>('');
  const [bulkEditLocation, setBulkEditLocation] = useState<string>('');
  const [bulkEditDate, setBulkEditDate] = useState<string>('');

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

  // Selection Logic
  const toggleSelectFrame = (id: string) => {
    setSelectedFrameIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFrameIds.length === filteredFrames.length) {
      setSelectedFrameIds([]);
    } else {
      setSelectedFrameIds(filteredFrames.map((f) => f.id));
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (confirm(`Sei sicuro di voler eliminare ${selectedFrameIds.length} frame selezionati?`)) {
      selectedFrameIds.forEach((id) => deleteFrame(id));
      setSelectedFrameIds([]);
    }
  };

  // Bulk Edit Submit
  const handleApplyBulkEdit = () => {
    selectedFrameIds.forEach((id) => {
      const patch: Partial<FrameItem> = {};
      if (bulkEditCategory) patch.category = bulkEditCategory as FrameCategory;
      if (bulkEditLocation) patch.location = bulkEditLocation;
      if (bulkEditDate) patch.date = bulkEditDate;

      updateFrame(id, patch);
    });

    setIsBulkEditModalOpen(false);
    setSelectedFrameIds([]);
  };

  // Multi-File Upload Handlers
  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;

    const newItems: BulkUploadItem[] = Array.from(files).map((file, i) => {
      const url = URL.createObjectURL(file);
      return {
        id: `bulk-upload-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 5)}`,
        file,
        previewUrl: url,
        title: file.name.replace(/\.[^/.]+$/, ''),
        altText: `Fotografia d’autore - ${file.name}`,
        category: bulkSharedCategory,
        location: bulkSharedLocation,
        date: bulkSharedDate,
        orientation: 'horizontal',
        status: 'ready',
      };
    });

    // Automatically detect orientations asynchronously
    newItems.forEach((item) => {
      const img = new Image();
      img.onload = () => {
        const orientation = detectImageOrientation(img.width, img.height);
        setBulkItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, orientation } : it))
        );
      };
      img.src = item.previewUrl;
    });

    setBulkItems((prev) => [...prev, ...newItems]);
  };

  // Convert files to Data URL & add frames in batch
  const handleConfirmBulkUpload = async () => {
    if (bulkItems.length === 0) return;

    for (let i = 0; i < bulkItems.length; i++) {
      const item = bulkItems[i];
      let imageUrl = item.previewUrl;

      if (item.file) {
        // Convert to Base64 Data URL for persistent storage without remote server setup
        try {
          imageUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(item.file!);
          });
        } catch (e) {
          console.error('File read error:', e);
        }
      }

      const newFrame: FrameItem = {
        id: `frame-${Date.now()}-${i}`,
        number: `${frames.length + i + 1}`.padStart(2, '0'),
        image: imageUrl,
        title: item.title || `Frame ${frames.length + i + 1}`,
        category: (item.category || bulkSharedCategory) as FrameCategory,
        location: item.location || bulkSharedLocation,
        date: item.date || bulkSharedDate,
        aspectRatio: '16:9',
        orientation: item.orientation || 'horizontal',
        projectId: bulkSharedProjectId || undefined,
        altText: item.altText,
      };

      addFrame(newFrame);
    }

    setIsBulkUploadOpen(false);
    setBulkItems([]);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#28282D]">
        <div>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white">
            Gestione Archivio Frames ({frames.length})
          </h2>
          <p className="text-xs text-[#8D8D89] font-mono mt-1">
            Archivio fotografico libero con caricamento multiplo batch e rilevamento orientamento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBulkUploadOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow"
          >
            <Upload className="w-4 h-4 text-[#FF5A36]" />
            <span>Caricamento Multiplo</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="py-2.5 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Aggiungi Singolo Frame</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Selection Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#28282D]/40">
        <div className="flex items-center gap-2 overflow-x-auto">
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

        <button
          onClick={handleSelectAll}
          className="text-xs font-mono text-[#8D8D89] hover:text-white inline-flex items-center gap-1.5"
        >
          {selectedFrameIds.length === filteredFrames.length && filteredFrames.length > 0 ? (
            <CheckSquare className="w-4 h-4 text-[#FF5A36]" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          <span>
            {selectedFrameIds.length === filteredFrames.length && filteredFrames.length > 0
              ? 'Deseleziona Tutti'
              : 'Seleziona Tutti'}
          </span>
        </button>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedFrameIds.length > 0 && (
        <div className="sticky top-20 z-30 p-4 rounded-2xl bg-[#FF5A36]/15 border border-[#FF5A36]/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-ping" />
            <span className="font-bold text-[#FF5A36]">{selectedFrameIds.length}</span>
            <span>elementi selezionati</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBulkEditModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-[#28282D] text-xs font-mono text-white hover:border-[#FF5A36] transition-colors"
            >
              Modifica Multipla
            </button>

            <button
              onClick={handleBulkDelete}
              className="px-3.5 py-1.5 rounded-xl bg-red-950/80 border border-red-500/30 text-xs font-mono text-red-300 hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Elimina Selezionati</span>
            </button>
          </div>
        </div>
      )}

      {/* Frames Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFrames.map((f) => {
          const isSelected = selectedFrameIds.includes(f.id);
          return (
            <div
              key={f.id}
              onClick={() => toggleSelectFrame(f.id)}
              className={`bg-[#121214] border rounded-2xl overflow-hidden group transition-all flex flex-col justify-between shadow-md cursor-pointer relative ${
                isSelected
                  ? 'border-[#FF5A36] ring-2 ring-[#FF5A36]/30'
                  : 'border-[#28282D] hover:border-[#FF5A36]/60'
              }`}
            >
              {/* Checkbox badge */}
              <div className="absolute top-3 right-3 z-10 bg-black/80 rounded-md p-1 border border-white/20">
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-[#FF5A36]" />
                ) : (
                  <Square className="w-4 h-4 text-white/50" />
                )}
              </div>

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

              <div
                className="p-2.5 bg-[#09090A] border-t border-[#28282D] flex items-center justify-end gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
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
          );
        })}
      </div>

      {/* Multi-Upload Modal */}
      {isBulkUploadOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsBulkUploadOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#28282D]">
              <div>
                <h3 className="font-serif italic text-2xl text-white">Caricamento Multiplo Frame</h3>
                <p className="text-xs text-[#8D8D89] font-mono mt-0.5">
                  Seleziona più immagini insieme e imposta i parametri condivisi per tutta la serie.
                </p>
              </div>
              <button onClick={() => setIsBulkUploadOpen(false)} className="text-[#8D8D89] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shared Settings Card */}
            <div className="p-4 rounded-2xl bg-[#09090A] border border-[#28282D] space-y-4">
              <span className="font-mono text-xs uppercase text-[#FF5A36] font-semibold block">
                Impostazioni Condivise per la Serie
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#C9C7C1] mb-1">Categoria</label>
                  <select
                    value={bulkSharedCategory}
                    onChange={(e) => setBulkSharedCategory(e.target.value)}
                    className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#C9C7C1] mb-1">Luogo</label>
                  <input
                    type="text"
                    value={bulkSharedLocation}
                    onChange={(e) => setBulkSharedLocation(e.target.value)}
                    className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#C9C7C1] mb-1">Anno / Data</label>
                  <input
                    type="text"
                    value={bulkSharedDate}
                    onChange={(e) => setBulkSharedDate(e.target.value)}
                    className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>
              </div>
            </div>

            {/* Drag & Drop File Zone */}
            <div className="border-2 border-dashed border-[#28282D] hover:border-[#FF5A36] rounded-2xl p-8 text-center transition-colors relative cursor-pointer group bg-[#09090A]/50">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFilesSelected(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <Upload className="w-8 h-8 text-[#FF5A36] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-mono text-xs text-white">
                Trascina qui le tue immagini o <span className="text-[#FF5A36] underline">clicca per selezionarle</span>
              </p>
              <p className="font-mono text-[10px] text-[#8D8D89] mt-1">
                Puoi caricare decine di file JPG, PNG, WebP contemporaneamente
              </p>
            </div>

            {/* Uploaded items queue */}
            {bulkItems.length > 0 && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-white font-medium block">
                  File Pronti per l'Aggiunta ({bulkItems.length}):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
                  {bulkItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-[#09090A] border border-[#28282D] rounded-xl p-2 relative flex items-center gap-2 group"
                    >
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBulkItems((prev) =>
                              prev.map((it) => (it.id === item.id ? { ...it, title: val } : it))
                            );
                          }}
                          className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none border-b border-transparent focus:border-[#FF5A36] truncate"
                        />
                        <span className="text-[9px] font-mono text-[#8D8D89] block uppercase">
                          {item.orientation}
                        </span>
                      </div>

                      <button
                        onClick={() => setBulkItems((prev) => prev.filter((it) => it.id !== item.id))}
                        className="text-red-400 hover:text-red-300 p-1 opacity-60 group-hover:opacity-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-[#28282D]">
              <button
                type="button"
                onClick={() => setIsBulkUploadOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
              >
                Annulla
              </button>
              <button
                type="button"
                disabled={bulkItems.length === 0}
                onClick={handleConfirmBulkUpload}
                className="px-6 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] disabled:opacity-40 text-white font-mono text-xs font-medium inline-flex items-center gap-1.5 shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Conferma e Crea {bulkItems.length} Frame</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Edit Modal */}
      {isBulkEditModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#09090A]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsBulkEditModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#121214] border border-[#28282D] rounded-3xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
              <h3 className="font-serif italic text-xl text-white">Modifica Multipla ({selectedFrameIds.length})</h3>
              <button onClick={() => setIsBulkEditModalOpen(false)} className="text-[#8D8D89] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Nuova Categoria (Lascia vuoto se invariato)</label>
                <select
                  value={bulkEditCategory}
                  onChange={(e) => setBulkEditCategory(e.target.value)}
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                >
                  <option value="">Invariato</option>
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Nuovo Luogo (Lascia vuoto se invariato)</label>
                <input
                  type="text"
                  placeholder="Es. Roma, Italy"
                  value={bulkEditLocation}
                  onChange={(e) => setBulkEditLocation(e.target.value)}
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Nuovo Anno / Data (Lascia vuoto se invariato)</label>
                <input
                  type="text"
                  placeholder="Es. 2026"
                  value={bulkEditDate}
                  onChange={(e) => setBulkEditDate(e.target.value)}
                  className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#28282D]">
              <button
                type="button"
                onClick={() => setIsBulkEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-[#8D8D89] hover:text-white"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleApplyBulkEdit}
                className="px-5 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Applica a {selectedFrameIds.length} elementi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frame Single Edit Modal */}
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
                    value={editingFrame.category || 'Places'}
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
