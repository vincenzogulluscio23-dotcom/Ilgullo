import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CMSDashboard } from './CMSDashboard';
import { CMSHomepageManager } from './CMSHomepageManager';
import { CMSProjectsManager } from './CMSProjectsManager';
import { CMSFramesManager } from './CMSFramesManager';
import { CMSMediaLibrary } from './CMSMediaLibrary';
import { CMSSitePagesManager } from './CMSSitePagesManager';
import { CMSContactMessages } from './CMSContactMessages';
import { CMSLivePreviewModal } from './CMSLivePreviewModal';
import { CMSLogin } from './CMSLogin';
import { CMSErrorBoundary } from './CMSErrorBoundary';
import {
  LayoutDashboard,
  Home,
  Layers,
  Image as ImageIcon,
  BookOpen,
  FileText,
  Lock,
  LogOut,
  Eye,
  ExternalLink,
  Sparkles,
  Link,
  Copy,
  Check,
  ShieldAlert,
  Settings,
  ArrowLeft,
  Mail,
} from 'lucide-react';

import { RoutePath } from '../../types';

interface CMSMainViewProps {
  onExitCMS?: () => void;
  onNavigate?: (route: RoutePath) => void;
}

export const CMSMainView: React.FC<CMSMainViewProps> = ({ onExitCMS, onNavigate }) => {
  const handleExit = () => {
    if (onExitCMS) {
      onExitCMS();
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  const { isLoggedIn, logout, setAdminPassword, adminPassword } = useCMS();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'homepage' | 'projects' | 'frames' | 'lab' | 'pages' | 'messages' | 'media' | 'settings'
  >('dashboard');

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const directExternalLink = `${window.location.origin}/superman`;

  if (!isLoggedIn) {
    return (
      <CMSLogin
        onNavigate={(route) => {
          if (route !== 'cms') handleExit();
        }}
      />
    );
  }

  const handleCopyDirectLink = () => {
    navigator.clipboard.writeText(directExternalLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setAdminPassword(newPassword.trim());
    setPasswordSaved(true);
    setNewPassword('');
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090A] text-white flex flex-col font-sans selection:bg-[#FF5A36] selection:text-white">
      
      {/* Top External Access Banner */}
      <div className="bg-[#121214] border-b border-[#28282D] px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono gap-2 shrink-0">
        <div className="flex items-center gap-2 text-[#8D8D89]">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
          <span className="text-white font-medium">Link di Accesso Esterno al CMS:</span>
          <span className="text-[#FF5A36] underline hidden sm:inline">{directExternalLink}</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleCopyDirectLink}
            className="px-2.5 py-1 rounded bg-[#28282D] hover:bg-[#FF5A36] text-white text-[11px] font-mono flex items-center gap-1 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copiato!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copia Link Esterno</span>
              </>
            )}
          </button>

          <button
            onClick={handleExit}
            className="px-2.5 py-1 rounded bg-black/60 hover:bg-white/20 text-[#C9C7C1] text-[11px] font-mono flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Torna al Sito Pubblico</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Content) */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#121214] border-r border-[#28282D] p-5 flex flex-col justify-between shrink-0 space-y-6">
          <div className="space-y-6">
            
            {/* Brand Logo Header */}
            <div className="pb-4 border-b border-[#28282D]">
              <span className="font-serif italic text-2xl tracking-wide text-white block">
                ilgullo.com
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5A36] block mt-0.5 font-medium">
                Editorial CMS v2.0
              </span>
            </div>

            {/* Navigation Menu Links */}
            <nav className="space-y-1.5 font-mono text-xs">
              
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Panoramica</span>
              </button>

              <button
                onClick={() => setActiveTab('homepage')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'homepage'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Homepage</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Progetti & Storie</span>
              </button>

              <button
                onClick={() => setActiveTab('frames')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'frames'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Archivio Frames</span>
              </button>

              <button
                onClick={() => setActiveTab('pages')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'pages'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Pagine & Contatti</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Messaggi Ricevuti</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'media'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Libreria Media</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                    : 'text-[#8D8D89] hover:text-white hover:bg-[#09090A]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Sicurezza Password</span>
              </button>

            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-[#28282D]">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#09090A] border border-[#28282D] hover:border-[#FF5A36] text-[#FF5A36] font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Anteprima Live</span>
            </button>

            <button
              onClick={logout}
              className="w-full py-2.5 px-3.5 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnetti CMS</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-x-hidden">
          <CMSErrorBoundary>
            {activeTab === 'dashboard' && (
              <CMSDashboard
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onOpenLivePreview={() => setIsPreviewOpen(true)}
              />
            )}

            {activeTab === 'homepage' && <CMSHomepageManager />}

            {activeTab === 'projects' && <CMSProjectsManager />}

            {activeTab === 'frames' && <CMSFramesManager />}

            {activeTab === 'pages' && <CMSSitePagesManager />}

            {activeTab === 'messages' && <CMSContactMessages />}

            {activeTab === 'media' && <CMSMediaLibrary />}

            {activeTab === 'settings' && (
              <div className="max-w-xl space-y-6">
                <div className="pb-4 border-b border-[#28282D]">
                  <h2 className="font-serif italic text-2xl text-white">Sicurezza & Accesso CMS</h2>
                  <p className="text-xs text-[#8D8D89] font-mono mt-1">
                    Modifica la password segreta richiesta per accedere al pannello di controllo.
                  </p>
                </div>

                <form onSubmit={handlePasswordChange} className="bg-[#121214] border border-[#28282D] p-6 rounded-2xl space-y-4 shadow-lg">
                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">
                      Password Attuale
                    </label>
                    <input
                      type="text"
                      disabled
                      value={adminPassword}
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-[#8D8D89]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C9C7C1] mb-1">
                      Nuova Password Segreta *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digita la nuova password..."
                      className="w-full bg-[#09090A] border border-[#28282D] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A36]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {passwordSaved && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>Password aggiornata con successo!</span>
                      </span>
                    )}

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-[#FF5A36] hover:bg-[#E04826] text-white font-mono text-xs font-medium inline-flex items-center gap-2 shadow-lg ml-auto"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Aggiorna Password</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </CMSErrorBoundary>
        </main>
      </div>

      {/* Live Preview Modal Overlay */}
      <CMSLivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

    </div>
  );
};
