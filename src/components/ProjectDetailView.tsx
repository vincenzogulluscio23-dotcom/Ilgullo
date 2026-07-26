import React, { useState } from 'react';
import { Project, RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { ScrollReveal, ImageScrollReveal } from './motion/ScrollReveal';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProject } from '../utils/i18nHelpers';

interface ProjectDetailViewProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (slug: string) => void;
  onNavigate: (route: RoutePath) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project: rawProject,
  allProjects,
  onSelectProject,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const project = getLocalizedProject(rawProject, language);

  // Find next project
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProjectRaw = allProjects[(currentIndex + 1) % allProjects.length];
  const nextProject = nextProjectRaw ? getLocalizedProject(nextProjectRaw, language) : null;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Back Navigation */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8D8D89] hover:text-[#FF5A36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? 'Back to projects' : 'Torna ai progetti'}</span>
          </button>
        </div>

        {/* Project Header Info */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#FF5A36] mb-3">
            <span>PROJECT {project.number}</span>
            <span className="text-[#28282D]">•</span>
            <span className="text-[#C9C7C1]">{project.category}</span>
            <span className="text-[#28282D]">•</span>
            <span className="text-[#8D8D89]">{project.year}</span>
          </div>

          <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-[#F1F0EB] leading-tight text-balance mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#C9C7C1] font-sans leading-relaxed max-w-3xl text-pretty">
            {project.excerpt}
          </p>
        </div>

        {/* Main Hero Media / Video Player */}
        <div className="relative aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden bg-[#121214] border border-[#28282D] mb-16 shadow-2xl">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090A]/80 via-transparent to-transparent opacity-60" />

          {/* Interactive Player Overlay Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3 bg-[#09090A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#28282D] font-mono text-xs text-white">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 hover:text-[#FF5A36] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#FF5A36]" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? (isEn ? 'Pause film' : 'Pause film') : (isEn ? 'Play film' : 'Play film')}</span>
              </button>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-[#09090A]/80 backdrop-blur-md text-[#C9C7C1] hover:text-white border border-[#28282D] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              title={isMuted ? "Sound on" : "Sound off"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#8D8D89]" /> : <Volume2 className="w-4 h-4 text-[#FF5A36]" />}
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 px-6 rounded-2xl bg-[#121214] border border-[#28282D] font-mono text-xs mb-16">
          <div>
            <span className="text-[#8D8D89] uppercase tracking-wider block mb-1">{isEn ? 'Client' : 'Cliente'}</span>
            <span className="text-white font-sans text-sm font-medium">{project.client}</span>
          </div>
          <div>
            <span className="text-[#8D8D89] uppercase tracking-wider block mb-1">{isEn ? 'Role' : 'Ruolo'}</span>
            <span className="text-white font-sans text-sm font-medium">{project.role}</span>
          </div>
          <div>
            <span className="text-[#8D8D89] uppercase tracking-wider block mb-1">{isEn ? 'Year' : 'Anno'}</span>
            <span className="text-white font-sans text-sm font-medium">{project.year}</span>
          </div>
          <div>
            <span className="text-[#8D8D89] uppercase tracking-wider block mb-1">{isEn ? 'Location' : 'Sede'}</span>
            <span className="text-white font-sans text-sm font-medium">{project.location}</span>
          </div>
        </div>

        {/* Editorial Story Blocks: Context, Point of View, Process, Outcome */}
        <div className="space-y-16 max-w-4xl mx-auto mb-20">
          
          {/* Context */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="border-l-2 border-[#FF5A36] pl-6 py-1">
              <SectionLabel label="The Context" className="mb-2" />
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
                {isEn ? 'What needed to be told' : 'Cosa doveva essere raccontato'}
              </h3>
              <p className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
                {project.context}
              </p>
            </div>
          </ScrollReveal>

          {/* Point of View */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="border-l-2 border-[#28282D] pl-6 py-1">
              <SectionLabel label="The Point of View" className="mb-2" />
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
                {isEn ? 'The narrative & visual direction' : 'La scelta narrativa e visiva'}
              </h3>
              <p className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
                {project.pointOfView}
              </p>
            </div>
          </ScrollReveal>

          {/* Process */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="border-l-2 border-[#28282D] pl-6 py-1">
              <SectionLabel label="The Process" className="mb-2" />
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
                {isEn ? 'How the work was crafted' : 'Come è stato costruito il lavoro'}
              </h3>
              <p className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
                {project.process}
              </p>
            </div>
          </ScrollReveal>

          {/* Outcome */}
          {project.outcome && (
            <ScrollReveal direction="up" delay={0.2}>
              <div className="border-l-2 border-[#28282D] pl-6 py-1">
                <SectionLabel label="The Outcome" className="mb-2" />
                <h3 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
                  {isEn ? 'The narrative impact' : 'L’impatto del racconto'}
                </h3>
                <p className="text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
                  {project.outcome}
                </p>
              </div>
            </ScrollReveal>
          )}

        </div>

        {/* Gallery Grid */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mb-20">
            <SectionLabel label="Gallery & Frames" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((imgUrl, idx) => (
                <ImageScrollReveal
                  key={idx}
                  src={imgUrl}
                  alt={`${project.title} frame ${idx + 1}`}
                  aspectRatio="aspect-[4/3]"
                  parallaxStrength={5}
                />
              ))}
            </div>
          </div>
        )}

        {/* Credits Section */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#121214] border border-[#28282D] mb-20">
          <SectionLabel label="Credits" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
            {Object.entries(project.credits).map(([key, val]) => (
              val ? (
                <div key={key}>
                  <span className="text-[#8D8D89] uppercase tracking-wider block mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-white font-sans text-sm">{val}</span>
                </div>
              ) : null
            ))}
          </div>
        </div>

        {/* Next Project Teaser */}
        {nextProject && (
          <div
            onClick={() => onSelectProject(nextProject.slug)}
            className="group cursor-pointer p-8 sm:p-12 rounded-2xl bg-[#121214] border border-[#28282D] hover:border-[#FF5A36] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div>
              <span className="font-mono text-xs text-[#FF5A36] uppercase tracking-widest block mb-2">Next Project</span>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-white group-hover:text-[#FF5A36] transition-colors">
                {nextProject.title}
              </h3>
              <span className="font-mono text-xs text-[#8D8D89]">{nextProject.client} — {nextProject.category}</span>
            </div>

            <Button variant="primary" icon="arrow-right">
              Vedi progetto
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};
