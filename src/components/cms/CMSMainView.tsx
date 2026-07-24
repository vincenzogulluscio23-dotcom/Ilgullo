import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { RoutePath } from '../../types';
import { CMSLogin } from './CMSLogin';
import { CMSDashboard } from './CMSDashboard';
import { CMSProjectsManager } from './CMSProjectsManager';
import { CMSFramesManager } from './CMSFramesManager';
import { CMSSitePagesManager } from './CMSSitePagesManager';
import { CMSMediaLibrary } from './CMSMediaLibrary';

import {
  LayoutDashboard,
  FolderKanban,
  Camera,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CMSMainViewProps {
  onNavigate: (route: RoutePath) => void;
}

export const CMSMainView: React.FC<CMSMainViewProps> = ({ onNavigate }) => {
  const { isLoggedIn, logout } = useCMS();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'frames' | 'pages' | 'media'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not authenticated, render login page
  if (!isLoggedIn) {
    return <CMSLogin onNavigate={onNavigate} />;
  }

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as const, label: 'Progetti (Portfolio)', icon: FolderKanban },
    { id: 'frames' as const, label: 'Frames (Fotografia)', icon: Camera },
    { id: 'pages' as const, label: 'Pagine & Testi', icon: FileText },
    { id: 'media' as const, label: 'Libreria Media', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#09090A] text-[#F1F0EB] font-sans flex flex-col md:flex-row relative">
      
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121214] border-b border-[#28282D] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5A36]" />
          <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
            Gullo CMS
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#8D8D89] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-[#121214] border-r border-[#28282D] p-6 flex flex-col justify-between shrink-0 ${
        mobileMenuOpen ? 'block' : 'hidden md:flex'
      } fixed md:sticky top-0 h-screen z-30`}>
        
        <div className="space-y-8">
          
          {/* Brand Logo & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A36] font-bold">
                CMS Admin
              </span>
            </div>
            <h1 className="font-serif italic text-2xl text-white">
              Gullo Studio
            </h1>
            <p className="text-[10px] font-mono text-[#8D8D89]">
              Gestione Contenuti v1.0
            </p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-mono text-xs transition-all flex items-center gap-3 relative ${
                    isActive
                      ? 'bg-[#FF5A36] text-white shadow-lg shadow-[#FF5A36]/20 font-medium'
                      : 'text-[#8D8D89] hover:text-white hover:bg-[#18181B]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8D8D89]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-[#28282D] space-y-3">
          
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#09090A] border border-[#28282D] hover:border-[#FF5A36] text-[#C9C7C1] hover:text-white font-mono text-xs inline-flex items-center justify-between transition-colors"
          >
            <span>Anteprima Sito Live</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF5A36]" />
          </button>

          <button
            onClick={logout}
            className="w-full py-2.5 px-3 rounded-xl bg-red-950/40 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white font-mono text-xs inline-flex items-center justify-between transition-colors"
          >
            <span>Esci (Logout)</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>

        </div>

      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Bar Status */}
          <div className="hidden md:flex items-center justify-between pb-6 border-b border-[#28282D]/60 text-xs font-mono text-[#8D8D89]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
              <span>Connessione Amministratore Sicura</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Sito: <strong className="text-white">Online</strong></span>
              <span className="text-[#FF5A36]">•</span>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white underline underline-offset-4 decoration-[#FF5A36]"
              >
                Vai al Sito →
              </button>
            </div>
          </div>

          {/* Active Tab Router */}
          {activeTab === 'dashboard' && (
            <CMSDashboard
              onNavigateTab={(tab) => {
                if (tab === 'projects' || tab === 'frames' || tab === 'pages' || tab === 'media') {
                  setActiveTab(tab);
                }
              }}
              onNavigatePublic={onNavigate}
            />
          )}

          {activeTab === 'projects' && <CMSProjectsManager />}

          {activeTab === 'frames' && <CMSFramesManager />}

          {activeTab === 'pages' && <CMSSitePagesManager />}

          {activeTab === 'media' && <CMSMediaLibrary />}

        </div>
      </main>

    </div>
  );
};
