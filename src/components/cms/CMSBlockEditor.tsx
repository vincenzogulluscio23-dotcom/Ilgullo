import React, { useState } from 'react';
import { EditorialBlock, BlockType, GalleryLayoutMode } from '../../types';
import { CMSMediaUploader } from './CMSMediaUploader';
import {
  Plus,
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
  Layout,
  Type,
  Image as ImageIcon,
  Video,
  Quote,
  ListOrdered,
  Layers,
  Sparkles,
  Columns,
  Grid,
} from 'lucide-react';

interface CMSBlockEditorProps {
  blocks: EditorialBlock[];
  onChange: (blocks: EditorialBlock[]) => void;
}

export const CMSBlockEditor: React.FC<CMSBlockEditorProps> = ({ blocks, onChange }) => {
  const [activePickerIdx, setActivePickerIdx] = useState<number | null>(null);

  const blockTypes: { type: BlockType; label: string; icon: React.ReactNode; desc: string }[] = [
    { type: 'hero', label: 'Hero', icon: <Layout className="w-4 h-4" />, desc: 'Apertura con grande titolo e media atmosferico' },
    { type: 'text', label: 'Testo', icon: <Type className="w-4 h-4" />, desc: 'Paragrafo editoriale per narrazione ed analisi' },
    { type: 'text-image', label: 'Testo + Immagine', icon: <Columns className="w-4 h-4" />, desc: 'Layout a due colonne affiancate' },
    { type: 'text-video', label: 'Testo + Video', icon: <Video className="w-4 h-4" />, desc: 'Video integrato con testo a lato' },
    { type: 'gallery', label: 'Gallery', icon: <Grid className="w-4 h-4" />, desc: 'Griglia o slider di fotografie' },
    { type: 'adaptive-gallery', label: 'Gallery Adattiva', icon: <Grid className="w-4 h-4" />, desc: 'Griglia che adatta automaticamente verticali e orizzontali' },
    { type: 'media-sequence', label: 'Sequenza Media', icon: <Layers className="w-4 h-4" />, desc: 'Sequenza fluida di foto, video, citazioni e divisori' },
    { type: 'sticky-story', label: 'Sticky Story', icon: <Columns className="w-4 h-4" />, desc: 'Testo fisso con immagini che scorrono a fianco' },
    { type: 'slideshow', label: 'Slideshow', icon: <ImageIcon className="w-4 h-4" />, desc: 'Carosello fotografico interattivo' },
    { type: 'chapter', label: 'Capitolo', icon: <Type className="w-4 h-4" />, desc: 'Intestazione di capitolo con numeri romani' },
    { type: 'quote', label: 'Citazione', icon: <Quote className="w-4 h-4" />, desc: 'Grande citazione in font serif italico' },
    { type: 'process', label: 'Processo', icon: <ListOrdered className="w-4 h-4" />, desc: 'Fasi del metodo di lavoro in griglia' },
    { type: 'backstage', label: 'Backstage', icon: <ImageIcon className="w-4 h-4" />, desc: 'Dietro le quinte del set' },
    { type: 'credits', label: 'Credits', icon: <ListOrdered className="w-4 h-4" />, desc: 'Elenco ruoli e collaboratori' },
    { type: 'outro', label: 'Outro', icon: <Sparkles className="w-4 h-4" />, desc: 'Chiusura e invito a scoprire altri progetti' },
  ];

  const handleAddBlock = (type: BlockType, insertAtIdx?: number) => {
    const newBlock: EditorialBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      title: type === 'chapter' ? 'Nuovo Capitolo' : '',
      subtitle: '',
      content: '',
      images: [],
      layout: 'collage',
    };

    if (insertAtIdx !== undefined) {
      const copy = [...blocks];
      copy.splice(insertAtIdx + 1, 0, newBlock);
      onChange(copy);
    } else {
      onChange([...blocks, newBlock]);
    }

    setActivePickerIdx(null);
  };

  const handleUpdateBlock = (id: string, updated: Partial<EditorialBlock>) => {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...updated } : b)));
  };

  const handleDeleteBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
  };

  const handleDuplicateBlock = (block: EditorialBlock, index: number) => {
    const clone: EditorialBlock = {
      ...block,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: block.title ? `${block.title} (Copia)` : '',
    };
    const copy = [...blocks];
    copy.splice(index + 1, 0, clone);
    onChange(copy);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }
    const copy = [...blocks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
        <div>
          <h3 className="font-serif italic text-xl text-white">Composizione Editoriale a Blocchi ({blocks.length})</h3>
          <p className="text-xs text-[#8D8D89] font-mono mt-0.5">
            Aggiungi, duplica e riordina liberamente i blocchi narrativi per strutturare la storia del progetto.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActivePickerIdx(activePickerIdx === -1 ? null : -1)}
          className="py-2 px-4 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Blocco</span>
        </button>
      </div>

      {/* Global Block Picker Popup */}
      {activePickerIdx === -1 && (
        <div className="p-4 bg-[#121214] border border-[#FF5A36] rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#FF5A36] font-medium uppercase tracking-wider">
              Seleziona la Tipologia di Blocco da Inserire:
            </span>
            <button
              type="button"
              onClick={() => setActivePickerIdx(null)}
              className="text-xs text-[#8D8D89] hover:text-white font-mono"
            >
              Chiudi ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {blockTypes.map((bt) => (
              <button
                key={bt.type}
                type="button"
                onClick={() => handleAddBlock(bt.type)}
                className="p-3 rounded-xl bg-[#09090A] border border-[#28282D] hover:border-[#FF5A36] text-left transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-2 text-white font-mono text-xs mb-1 group-hover:text-[#FF5A36]">
                  {bt.icon}
                  <span className="font-semibold">{bt.label}</span>
                </div>
                <p className="text-[11px] text-[#8D8D89] font-sans line-clamp-1">{bt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blocks List */}
      <div className="space-y-4">
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            className="bg-[#121214] border border-[#28282D] rounded-2xl p-5 hover:border-[#FF5A36]/60 transition-all space-y-4 relative group shadow-md"
          >
            {/* Block Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#28282D]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#FF5A36]/20 text-[#FF5A36] font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                  {block.type}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleMoveBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-[#09090A] text-white hover:bg-[#FF5A36] disabled:opacity-30 transition-colors"
                  title="Sposta Su"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleMoveBlock(idx, 'down')}
                  disabled={idx === blocks.length - 1}
                  className="p-1.5 rounded-lg bg-[#09090A] text-white hover:bg-[#FF5A36] disabled:opacity-30 transition-colors"
                  title="Sposta Giù"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDuplicateBlock(block, idx)}
                  className="p-1.5 rounded-lg bg-[#09090A] text-white hover:bg-[#FF5A36] transition-colors"
                  title="Duplica Blocco"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteBlock(block.id)}
                  className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                  title="Elimina Blocco"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Block Fields based on Type */}
            <div className="space-y-4">
              {/* Title & Subtitle for blocks that support it */}
              {['hero', 'chapter', 'text', 'text-image', 'text-video', 'sticky-story', 'process', 'backstage', 'outro'].includes(
                block.type
              ) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Titolo Blocco</label>
                    <input
                      type="text"
                      value={block.title || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                      placeholder="Es: Capitolo I — La Luce"
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Sottotitolo / Eyebrow</label>
                    <input
                      type="text"
                      value={block.subtitle || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                      placeholder="Sottotitolo descrittivo"
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>
                </div>
              )}

              {/* Main Content Text Area */}
              {['text', 'text-image', 'text-video', 'sticky-story', 'backstage'].includes(block.type) && (
                <div>
                  <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Contenuto Testuale</label>
                  <textarea
                    rows={4}
                    value={block.content || ''}
                    onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                    placeholder="Scrivi qui il paragrafo editoriale..."
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>
              )}

              {/* Quote Block */}
              {block.type === 'quote' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Citazione</label>
                    <textarea
                      rows={2}
                      value={block.quote || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { quote: e.target.value })}
                      placeholder="“Le immagini devono parlare...”"
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Autore / Fonte</label>
                    <input
                      type="text"
                      value={block.author || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { author: e.target.value })}
                      placeholder="Es: Vincenzo Gulluscio"
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>
                </div>
              )}

              {/* Video Fields */}
              {['text-video', 'hero'].includes(block.type) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#09090A] p-3 rounded-xl border border-[#28282D]">
                  <div>
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">URL Video (MP4 / YouTube / Vimeo)</label>
                    <input
                      type="text"
                      value={block.video?.url || ''}
                      onChange={(e) =>
                        handleUpdateBlock(block.id, {
                          video: { ...block.video, url: e.target.value },
                        })
                      }
                      placeholder="https://..."
                      className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Preset Video</label>
                    <select
                      value={block.video?.preset || 'normal'}
                      onChange={(e) =>
                        handleUpdateBlock(block.id, {
                          video: { ...block.video, preset: e.target.value as any },
                        })
                      }
                      className="w-full bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    >
                      <option value="hero">Hero Background Loop</option>
                      <option value="reel">Reel Cinematografico</option>
                      <option value="background">Background Silenzioso</option>
                      <option value="normal">Video Interattivo con Controlli</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Gallery Layout Selector */}
              {['gallery', 'adaptive-gallery', 'slideshow'].includes(block.type) && (
                <div>
                  <label className="block text-[10px] font-mono text-[#8D8D89] mb-1">Composizione Gallery</label>
                  <select
                    value={block.layout || 'collage'}
                    onChange={(e) =>
                      handleUpdateBlock(block.id, {
                        layout: e.target.value as GalleryLayoutMode,
                      })
                    }
                    className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="collage">Collage Editoriale</option>
                    <option value="masonry">Masonry Adattivo (Auto Verticali/Orizzontali)</option>
                    <option value="dual-image">Doppia Immagine Affiancata</option>
                    <option value="vertical">Sequenza Verticale Full-Width</option>
                    <option value="horizontal">Carosello Orizzontale</option>
                    <option value="slider">Interactive Slider</option>
                    <option value="alternate">Alternato Destra/Sinistra</option>
                    <option value="photo-sequence">Sequenza Fotografica Pura</option>
                  </select>
                </div>
              )}

              {/* Image Uploader for Blocks that contain images */}
              {['hero', 'text-image', 'gallery', 'adaptive-gallery', 'sticky-story', 'slideshow', 'backstage'].includes(
                block.type
              ) && (
                <CMSMediaUploader
                  title="Fotografie per questo blocco"
                  images={block.images || []}
                  onChange={(images) => handleUpdateBlock(block.id, { images })}
                />
              )}
            </div>

            {/* Inline Add Block Trigger */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setActivePickerIdx(activePickerIdx === idx ? null : idx)}
                className="py-1 px-3 rounded-full bg-[#09090A] border border-[#28282D] hover:border-[#FF5A36] text-[#8D8D89] hover:text-[#FF5A36] font-mono text-[10px] flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Inserisci blocco qui sotto</span>
              </button>
            </div>

            {/* Inline Block Picker Popup */}
            {activePickerIdx === idx && (
              <div className="p-4 bg-[#121214] border border-[#FF5A36] rounded-2xl space-y-3 animate-fadeIn my-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF5A36] font-medium uppercase tracking-wider">
                    Seleziona la Tipologia di Blocco da Inserire dopo la posizione {idx + 1}:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePickerIdx(null)}
                    className="text-xs text-[#8D8D89] hover:text-white font-mono"
                  >
                    Chiudi ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {blockTypes.map((bt) => (
                    <button
                      key={bt.type}
                      type="button"
                      onClick={() => handleAddBlock(bt.type, idx)}
                      className="p-3 rounded-xl bg-[#09090A] border border-[#28282D] hover:border-[#FF5A36] text-left transition-all hover:scale-[1.01] group"
                    >
                      <div className="flex items-center gap-2 text-white font-mono text-xs mb-1 group-hover:text-[#FF5A36]">
                        {bt.icon}
                        <span className="font-semibold">{bt.label}</span>
                      </div>
                      <p className="text-[11px] text-[#8D8D89] font-sans line-clamp-1">{bt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
