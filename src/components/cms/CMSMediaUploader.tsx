import React, { useRef, useState } from 'react';
import { EditorialImage, ImageCropPreference, ImageOrientation } from '../../types';
import { Upload, Trash2, Copy, MoveUp, MoveDown, Focus, Eye, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { processAndUploadMedia } from '../../lib/uploadService';

interface CMSMediaUploaderProps {
  images: EditorialImage[];
  onChange: (images: EditorialImage[]) => void;
  title?: string;
  maxFiles?: number;
}

export const CMSMediaUploader: React.FC<CMSMediaUploaderProps> = ({
  images,
  onChange,
  title = 'Gestione Immagini & Media',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Handle multi-file drop or selection with async upload service
  const handleFilesAdded = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setIsUploading(true);
    setUploadProgress(`Elaborazione 0 di ${fileList.length} file...`);

    const newUploadedImages: EditorialImage[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadProgress(`Ottimizzazione e caricamento (${i + 1}/${fileList.length}): ${file.name}`);

      try {
        const result = await processAndUploadMedia(file);
        const newImg: EditorialImage = {
          id: `img-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          url: result.url,
          altText: file.name.replace(/\.[^/.]+$/, ''),
          caption: '',
          credit: 'Vincenzo Gulluscio',
          cropPreference: 'auto',
          orientation: result.orientation,
          hotspot: { x: 50, y: 50 },
        };
        newUploadedImages.push(newImg);
      } catch (err) {
        console.error('Error uploading file:', file.name, err);
      }
    }

    if (newUploadedImages.length > 0) {
      onChange([...images, ...newUploadedImages]);
    }

    setIsUploading(false);
    setUploadProgress(null);
  };

  const handleUpdateImage = (id: string, updated: Partial<EditorialImage>) => {
    onChange(images.map((img) => (img.id === id ? { ...img, ...updated } : img)));
  };

  const handleDelete = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  const handleDuplicate = (img: EditorialImage) => {
    const clone: EditorialImage = {
      ...img,
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      altText: `${img.altText || 'Immagine'} (Copia)`,
    };
    onChange([...images, clone]);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === images.length - 1)
    ) {
      return;
    }
    const newArr = [...images];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    onChange(newArr);
  };

  return (
    <div className="space-y-4 bg-[#09090A] border border-[#28282D] rounded-2xl p-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#28282D]">
        <div>
          <h4 className="text-sm font-mono text-white font-medium">{title}</h4>
          <p className="text-[11px] text-[#8D8D89] font-mono mt-0.5">
            Trascina più immagini, imposta alt text, orientamento e adattamento per non tagliare ritratti o prodotti.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] text-[#FF5A36] font-mono text-xs font-medium inline-flex items-center gap-1.5 transition-all shadow"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Carica Foto / Video</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFilesAdded(e.target.files)}
        />
      </div>

      {/* Uploading Status Overlay Bar */}
      {isUploading && (
        <div className="p-3 bg-[#FF5A36]/15 border border-[#FF5A36]/40 rounded-xl flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-[#FF5A36] animate-spin shrink-0" />
          <span className="text-xs font-mono text-white font-medium">{uploadProgress}</span>
        </div>
      )}

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFilesAdded(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#28282D] hover:border-[#FF5A36]/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#121214]/50 group"
      >
        <Upload className="w-8 h-8 text-[#8D8D89] group-hover:text-[#FF5A36] mx-auto mb-2 transition-colors" />
        <p className="text-xs text-[#C9C7C1] font-mono">
          Trascina qui le tue fotografie o <span className="text-[#FF5A36] underline">sfoglia dal dispositivo</span>
        </p>
        <span className="text-[10px] text-[#8D8D89] font-mono mt-1 block">
          Supporta JPG, PNG, WebP — riconoscimento automatico verticali/orizzontali
        </span>
      </div>

      {/* Images List */}
      {images.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8D8D89]">
            <span>Immagini caricate ({images.length})</span>
            <span>Usa le frecce per riordinare la sequenza</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="bg-[#121214] border border-[#28282D] rounded-xl p-3.5 flex flex-col md:flex-row items-start md:items-center gap-4 hover:border-[#FF5A36]/40 transition-all shadow-sm"
              >
                {/* Image Thumbnail Preview */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 group">
                  <img
                    src={img.url}
                    alt={img.altText || 'Image preview'}
                    className={`w-full h-full ${
                      img.cropPreference === 'fit' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                  <div className="absolute top-1.5 left-1.5 bg-black/80 px-1.5 py-0.5 rounded font-mono text-[9px] text-[#FF5A36]">
                    {img.orientation || 'auto'}
                  </div>
                </div>

                {/* Metadata & Controls */}
                <div className="flex-grow space-y-2.5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8D8D89] mb-0.5">Alt Text (Accessibilità)</label>
                      <input
                        type="text"
                        value={img.altText || ''}
                        onChange={(e) => handleUpdateImage(img.id, { altText: e.target.value })}
                        placeholder="Descrizione immagine per SEO"
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8D8D89] mb-0.5">Didascalia / Caption</label>
                      <input
                        type="text"
                        value={img.caption || ''}
                        onChange={(e) => handleUpdateImage(img.id, { caption: e.target.value })}
                        placeholder="Testo visibile sotto l'immagine"
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  </div>

                  {/* Adattamento automatico & Crop Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                    <div>
                      <label className="block text-[10px] font-mono text-[#8D8D89] mb-0.5">Modalità Adattamento</label>
                      <select
                        value={img.cropPreference || 'auto'}
                        onChange={(e) =>
                          handleUpdateImage(img.id, {
                            cropPreference: e.target.value as ImageCropPreference,
                          })
                        }
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      >
                        <option value="auto">Automatico (Saggio)</option>
                        <option value="fit">Mostra Interamente (No Taglio)</option>
                        <option value="cover">Riempi Contenitore</option>
                        <option value="custom">Crop Personalizzato</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8D8D89] mb-0.5">Orientamento</label>
                      <select
                        value={img.orientation || 'horizontal'}
                        onChange={(e) =>
                          handleUpdateImage(img.id, {
                            orientation: e.target.value as ImageOrientation,
                          })
                        }
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      >
                        <option value="vertical">Verticale (Bottiglie/Ritratti)</option>
                        <option value="horizontal">Orizzontale (16:9)</option>
                        <option value="square">Quadrato (1:1)</option>
                        <option value="panoramic">Panoramico</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#8D8D89] mb-0.5">Credito Fotografo</label>
                      <input
                        type="text"
                        value={img.credit || ''}
                        onChange={(e) => handleUpdateImage(img.id, { credit: e.target.value })}
                        placeholder="Es: Vincenzo Gulluscio"
                        className="w-full bg-[#09090A] border border-[#28282D] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex md:flex-col items-center gap-1.5 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-[#28282D] w-full md:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] disabled:opacity-30 transition-colors"
                    title="Sposta Su"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === images.length - 1}
                    className="p-1.5 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] disabled:opacity-30 transition-colors"
                    title="Sposta Giù"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(img)}
                    className="p-1.5 rounded-lg bg-[#28282D] text-white hover:bg-[#FF5A36] transition-colors"
                    title="Duplica Immagine"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                    title="Elimina Immagine"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
