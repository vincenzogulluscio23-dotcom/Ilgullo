import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { RoutePath } from '../../types';
import {
  FolderKanban,
  Camera,
  BookOpen,
  Image as ImageIcon,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface CMSDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'projects' | 'frames' | 'articles' | 'pages' | 'media' | 'settings') => void;
  onNavigatePublic: (route: RoutePath) => void;
}

export const CMSDashboard: React.FC<CMSDashboardProps> = ({ onNavigateTab, onNavigatePublic }) => {
  const {
    projects,
    frames,
    articles,
    mediaAssets,
    adminPassword,
    updateAdminPassword,
    resetToDefaults,
    exportCMSData,
    importCMSData,
  } = useCMS();

  const [newPassword, setNewPassword] = useState('');
  const [passUpdated, setPassUpdated] = useState(false);
  const [importString, setImportString] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const stats = [
    {
      title: 'Progetti Portfolio',
      count: projects.length,
      label: 'Progetti registrati',
      icon: FolderKanban,
      tab: 'projects' as const,
    },
    {
      title: 'Frames & Fotografia',
      count: frames.length,
      label: 'Scatti in galleria',
      icon: Camera,
      tab: 'frames' as const,
    },
    {
      title: 'Saggi & Lab',
      count: articles.length,
      label: 'Articoli pubblicati',
      icon: BookOpen,
      tab: 'articles' as const,
    },
    {
      title: 'Libreria Media',
      count: mediaAssets.length,
      label: 'Asset e immagini',
      icon: ImageIcon,
      tab: 'media' as const,
    },
  ];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 4) return;
    updateAdminPassword(newPassword.trim());
    setPassUpdated(true);
    setNewPassword('');
    setTimeout(() => setPassUpdated(false), 3000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportCMSData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gullo_studio_cms_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportBackup = () => {
    if (!importString) return;
    const ok = importCMSData(importString);
    if (ok) {
      setImportStatus('success');
      setImportString('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#121214] via-[#121214] to-[#181210] border border-[#28282D] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] block font-semibold">
            Pannello di Controllo · Gullo Studio CMS
          </span>
          <h2 className="font-serif italic text-2xl sm:text-4xl text-white">
            Benvenuto nell'Area Riservata
          </h2>
          <p className="text-xs sm:text-sm text-[#C9C7C1] font-sans leading-relaxed">
            Da questo centro di gestione puoi aggiornare in tempo reale i progetti, la galleria fotografica, gli articoli dell'osservatorio e le immagini del sito.
          </p>
        </div>

        <button
          onClick={() => onNavigatePublic('home')}
          className="py-3 px-5 rounded-2xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg shrink-0 self-start md:self-auto transition-transform hover:scale-105"
        >
          <span>Visualizza Sito Live</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.tab}
              onClick={() => onNavigateTab(s.tab)}
              className="p-6 rounded-2xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36]/60 transition-all text-left flex flex-col justify-between group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#8D8D89]">{s.title}</span>
                <div className="p-2.5 rounded-xl bg-[#09090A] text-[#FF5A36] border border-white/5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="font-sans text-3xl font-light text-white block mb-1">
                  {s.count}
                </span>
                <span className="font-mono text-[11px] text-[#8D8D89] flex items-center gap-1 group-hover:text-[#FF5A36] transition-colors">
                  <span>Gestisci →</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Security & Backup Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Security Password Box */}
        <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#28282D]">
            <KeyRound className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Cambia Password Accesso</h3>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#C9C7C1] mb-1">Nuova Password Amministratore</label>
              <input
                type="text"
                required
                minLength={4}
                placeholder="Inserisci nuova password..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[11px] text-[#8D8D89]">
                Password attuale: <code className="text-white font-bold">{adminPassword}</code>
              </span>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#28282D] hover:bg-[#FF5A36] text-white text-xs font-mono transition-colors inline-flex items-center gap-1.5"
              >
                {passUpdated ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{passUpdated ? 'Aggiornata!' : 'Salva Nuova Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Data Backup & Restore Box */}
        <div className="bg-[#121214] border border-[#28282D] rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#28282D]">
            <Download className="w-5 h-5 text-[#FF5A36]" />
            <h3 className="font-serif italic text-xl text-white">Backup & Ripristino Dati</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono text-white font-medium">Esporta Backup JSON</h4>
                <p className="text-[11px] font-mono text-[#8D8D89]">Scarica l'intero archivio progetti e testi</p>
              </div>

              <button
                onClick={handleDownloadBackup}
                className="px-4 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white text-xs font-mono inline-flex items-center gap-2 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Backup</span>
              </button>
            </div>

            <hr className="border-[#28282D]" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-mono text-white font-medium">Ripristina Dati Iniziali</h4>
                <button
                  onClick={() => {
                    if (confirm('Ripristinare tutti i progetti e testi ai dati iniziali originali?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white text-[11px] font-mono inline-flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ripristina Default</span>
                </button>
              </div>
              <p className="text-[11px] font-mono text-[#8D8D89]">
                Azzera le modifiche locali e ricarica i dati ufficiali di partenza.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
