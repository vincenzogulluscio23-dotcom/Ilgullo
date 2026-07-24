import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Smartphone, Tablet, Monitor, X, Eye, RefreshCw, ExternalLink } from 'lucide-react';
import { Hero } from '../Hero';
import { HomeManifesto } from '../HomeManifesto';
import { FeaturedProjectsCarousel } from '../FeaturedProjectsCarousel';
import { FramesSection } from '../FramesSection';
import { LabSection } from '../LabSection';
import { ProjectDetailView } from '../ProjectDetailView';

interface CMSLivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'home' | 'project' | 'frames' | 'lab';
}

export const CMSLivePreviewModal: React.FC<CMSLivePreviewModalProps> = ({
  isOpen,
  onClose,
  initialView = 'home',
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewView, setPreviewView] = useState<'home' | 'project' | 'frames' | 'lab'>(initialView);
  const { projects, frames, articles } = useCMS();

  if (!isOpen) return null;

  const currentProject = projects[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col animate-fadeIn">
      
      {/* Top Header Controls Bar */}
      <div className="px-6 py-4 bg-[#121214] border-b border-[#28282D] flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#FF5A36]/20 text-[#FF5A36]">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif italic text-lg text-white">Live Real-Time Preview</h3>
            <p className="text-[11px] text-[#8D8D89] font-mono">
              Visualizzazione dal vivo con rendering responsive del codice.
            </p>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1 bg-[#09090A] p-1 rounded-xl border border-[#28282D] font-mono text-xs">
          <button
            onClick={() => setPreviewView('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              previewView === 'home' ? 'bg-[#FF5A36] text-white font-medium' : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            Homepage
          </button>
          <button
            onClick={() => setPreviewView('project')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              previewView === 'project' ? 'bg-[#FF5A36] text-white font-medium' : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            Scheda Progetto
          </button>
          <button
            onClick={() => setPreviewView('frames')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              previewView === 'frames' ? 'bg-[#FF5A36] text-white font-medium' : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            Frames
          </button>
          <button
            onClick={() => setPreviewView('lab')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              previewView === 'lab' ? 'bg-[#FF5A36] text-white font-medium' : 'text-[#8D8D89] hover:text-white'
            }`}
          >
            Lab
          </button>
        </div>

        {/* Device breakpoint simulation buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#09090A] p-1 rounded-xl border border-[#28282D]">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'mobile' ? 'bg-[#28282D] text-[#FF5A36]' : 'text-[#8D8D89] hover:text-white'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'tablet' ? 'bg-[#28282D] text-[#FF5A36]' : 'text-[#8D8D89] hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'desktop' ? 'bg-[#28282D] text-[#FF5A36]' : 'text-[#8D8D89] hover:text-white'
              }`}
              title="Desktop Fullwidth"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#28282D] text-[#8D8D89] hover:text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Preview Container Frame */}
      <div className="flex-grow p-4 sm:p-6 overflow-y-auto flex justify-center bg-[#09090A]">
        <div
          className={`bg-[#09090A] border border-[#28282D] rounded-3xl overflow-y-auto custom-scrollbar shadow-2xl transition-all duration-300 relative ${
            deviceMode === 'mobile'
              ? 'w-[380px] h-[720px] my-auto'
              : deviceMode === 'tablet'
              ? 'w-[768px] h-[880px] my-auto'
              : 'w-full max-w-7xl h-full'
          }`}
        >
          {previewView === 'home' && (
            <div className="space-y-12 pb-12">
              <Hero onNavigate={() => {}} />
              <HomeManifesto onNavigate={() => {}} />
              <FeaturedProjectsCarousel
                projects={projects}
                onSelectProject={() => {}}
                onNavigate={() => {}}
              />
              <FramesSection frames={frames} onNavigate={() => {}} isTeaser />
              <LabSection articles={articles} onNavigate={() => {}} isTeaser />
            </div>
          )}

          {previewView === 'project' && currentProject && (
            <ProjectDetailView
              project={currentProject}
              allProjects={projects}
              onSelectProject={() => {}}
              onNavigate={() => {}}
            />
          )}

          {previewView === 'frames' && (
            <div className="p-8">
              <FramesSection frames={frames} onNavigate={() => {}} />
            </div>
          )}

          {previewView === 'lab' && (
            <div className="p-8">
              <LabSection articles={articles} onNavigate={() => {}} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
