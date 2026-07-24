import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSValidationsPanel } from './CMSValidationsPanel';
import {
  Layers,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Link,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface CMSDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenLivePreview: () => void;
}

export const CMSDashboard: React.FC<CMSDashboardProps> = ({
  onNavigateTab,
  onOpenLivePreview,
}) => {
  const { projects, frames, articles, mediaAssets } = useCMS();
  const [copiedLink, setCopiedLink] = useState(false);

  const externalLink = `${window.location.origin}/superman`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(externalLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome & Quick External Link Bar */}
      <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A36]/20 border border-[#FF5A36]/40 text-[#FF5A36] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ILGULLO.COM — Advanced Editorial CMS v2.0</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
            Benvenuto, Vincenzo.
          </h2>

          <p className="text-xs text-[#C9C7C1] font-sans leading-relaxed">
            Pannello di controllo editoriale ad alte prestazioni. Modifica storie, caroselli, schede e metadati SEO senza toccare una riga di codice.
          </p>
        </div>

        {/* External Link Copy Box */}
        <div className="bg-[#09090A] border border-[#28282D] p-4 rounded-2xl w-full md:w-auto shrink-0 space-y-2">
          <span className="text-[10px] font-mono text-[#8D8D89] uppercase tracking-wider block">
            Link di Accesso Esterno Riservato:
          </span>
          <div className="flex items-center gap-2 bg-[#121214] border border-[#28282D] rounded-xl px-3 py-2">
            <Link className="w-4 h-4 text-[#FF5A36] shrink-0" />
            <span className="font-mono text-xs text-white truncate max-w-[200px] sm:max-w-[280px]">
              {externalLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 rounded-lg bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs shrink-0 flex items-center gap-1 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiato!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copia</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-[#8D8D89] font-mono">
            Salva questo link tra i preferiti per accedere al CMS direttamente.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Progetti */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8D8D89] uppercase tracking-wider">Progetti Editorial</span>
            <div className="p-2 rounded-xl bg-[#09090A] border border-[#28282D] text-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif italic text-3xl text-white">{projects.length}</span>
            <span className="text-xs font-mono text-emerald-400">
              {projects.filter((p) => p.featured).length} in evidenza
            </span>
          </div>
        </div>

        {/* Frames */}
        <div
          onClick={() => onNavigateTab('frames')}
          className="bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8D8D89] uppercase tracking-wider">Archivio Frames</span>
            <div className="p-2 rounded-xl bg-[#09090A] border border-[#28282D] text-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif italic text-3xl text-white">{frames.length}</span>
            <span className="text-xs font-mono text-[#8D8D89]">fotografie</span>
          </div>
        </div>

        {/* Media Assets */}
        <div
          onClick={() => onNavigateTab('media')}
          className="bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8D8D89] uppercase tracking-wider">Libreria Media</span>
            <div className="p-2 rounded-xl bg-[#09090A] border border-[#28282D] text-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif italic text-3xl text-white">{mediaAssets.length}</span>
            <span className="text-xs font-mono text-[#8D8D89]">risorse caricate</span>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#121214] border border-[#28282D] p-5 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#8D8D89] uppercase tracking-wider">Stato Sistema</span>
            <div className="p-2 rounded-xl bg-[#09090A] border border-[#28282D] text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif italic text-3xl text-white">100%</span>
            <span className="text-xs font-mono text-emerald-400">Attivo & Sincronizzato</span>
          </div>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => onNavigateTab('projects')}
          className="py-3 px-5 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Gestisci Progetti</span>
        </button>

        <button
          onClick={() => onNavigateTab('frames')}
          className="py-3 px-5 rounded-xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] text-white font-mono text-xs font-medium inline-flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 text-[#FF5A36]" />
          <span>Carica Frames</span>
        </button>

        <button
          onClick={onOpenLivePreview}
          className="py-3 px-5 rounded-xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] text-[#FF5A36] font-mono text-xs font-medium inline-flex items-center gap-2 transition-all ml-auto"
        >
          <Eye className="w-4 h-4" />
          <span>Apri Anteprima Live</span>
        </button>
      </div>

      {/* Validation Auditor Section */}
      <CMSValidationsPanel onNavigateToTab={onNavigateTab} />

    </div>
  );
};
