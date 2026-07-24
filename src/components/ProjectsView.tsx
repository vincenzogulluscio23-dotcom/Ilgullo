import React, { useState } from 'react';
import { Project, ProjectCategory, RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { Project3DDeck } from './Project3DDeck';
import { ArrowUpRight, Layers, LayoutGrid } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onNavigate: (route: RoutePath) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [layoutMode, setLayoutMode] = useState<'3d-deck' | 'editorial'>('3d-deck');

  const categories: ProjectCategory[] = [
    'All',
    'Film',
    'Photography',
    'Branded Content',
    'Corporate',
    'Campaign',
    'Social',
    'Personal'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090A] min-h-screen relative overflow-hidden">
      
      {/* Organic Background Light Atmosphere */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#FF5A36]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Projects Header */}
        <div className="mb-12">
          <SectionLabel label="Selected work" className="mb-4" />
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-[#F1F0EB] text-balance">
              Progetti diversi. <br />
              <span className="font-sans not-italic text-white font-normal">La stessa attenzione per ciò che conta.</span>
            </h1>

            {/* View Mode & Filter Stats */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center p-1 rounded-full bg-[#121214] border border-[#28282D]">
                <button
                  onClick={() => setLayoutMode('3d-deck')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                    layoutMode === '3d-deck'
                      ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                      : 'text-[#8D8D89] hover:text-white'
                  }`}
                  title="3D Card Deck Carousel"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Deck</span>
                </button>

                <button
                  onClick={() => setLayoutMode('editorial')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                    layoutMode === 'editorial'
                      ? 'bg-[#FF5A36] text-white font-medium shadow-sm'
                      : 'text-[#8D8D89] hover:text-white'
                  }`}
                  title="Free Editorial Stream"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Editorial Stream</span>
                </button>
              </div>

              <span className="font-mono text-xs text-[#FF5A36] bg-[#121214] px-3.5 py-2 rounded-full border border-[#28282D]">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'progetto' : 'progetti'}
              </span>
            </div>
          </div>

          <p className="max-w-2xl text-sm sm:text-base text-[#C9C7C1] font-sans leading-relaxed text-pretty">
            Film, fotografie, campagne e contenuti costruiti a partire dalle persone, dagli obiettivi e dall’identità di ogni progetto. Non una raccolta rigida, ma una mappa di storie in continuo movimento.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#28282D]/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#FF5A36] text-white font-medium shadow-md'
                  : 'bg-[#121214]/80 text-[#C9C7C1] hover:text-white hover:border-[#FF5A36]/60 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-[#121214]/50 rounded-3xl border border-[#28282D]/40">
            <p className="font-serif italic text-2xl text-[#C9C7C1] mb-4">
              Nessun progetto disponibile in questa categoria.
            </p>
            <Button variant="outline" onClick={() => setSelectedCategory('All')}>
              Mostra tutti i progetti
            </Button>
          </div>
        ) : layoutMode === '3d-deck' ? (
          /* Mode 1: 3D Stacked Deck Slider */
          <div className="py-6">
            <Project3DDeck
              projects={filteredProjects}
              onSelectProject={onSelectProject}
            />
          </div>
        ) : (
          /* Mode 2: Free Open Editorial Stream (No heavy enclosing boxes!) */
          <div className="space-y-24 py-6">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  data-cursor="VIEW"
                  onClick={() => onSelectProject(project.slug)}
                  className={`group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center transition-all duration-500 hover:opacity-100 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Free Media Cover (Borderless with soft rounded corners) */}
                  <div
                    className={`relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden bg-[#121214] shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(255,90,54,0.15)] group-hover:scale-[1.01] ${
                      isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'
                    }`}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Floating Pill Tag */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-[#09090A]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[#FF5A36] border border-white/10">
                      {project.number} — {project.category}
                    </div>

                    {project.location && (
                      <div className="absolute bottom-4 right-4 font-mono text-[10px] bg-[#09090A]/80 backdrop-blur-md px-3 py-1 rounded-full text-[#C9C7C1]">
                        {project.location}
                      </div>
                    )}
                  </div>

                  {/* Open Editorial Content Column */}
                  <div
                    className={`flex flex-col justify-center ${
                      isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-[#8D8D89] mb-3">
                      <span>{project.client}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>

                    <h2 className="font-serif italic text-3xl sm:text-5xl text-[#F1F0EB] group-hover:text-white transition-colors duration-300 leading-tight mb-4">
                      {project.title}
                    </h2>

                    <p className="text-sm text-[#C9C7C1] font-sans leading-relaxed text-pretty mb-6">
                      {project.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.services.map((s, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#121214] text-[#8D8D89]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-3 font-mono text-xs text-[#F1F0EB] group-hover:text-[#FF5A36] transition-colors">
                      <span className="uppercase tracking-widest font-sans font-medium">Esplora la storia</span>
                      <div className="w-8 h-8 rounded-full border border-[#28282D] group-hover:border-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Free Floating Closing Quote */}
        <div className="mt-28 py-16 text-center max-w-3xl mx-auto border-t border-[#28282D]/40">
          <h3 className="font-serif italic text-3xl sm:text-5xl text-white mb-6 text-balance leading-tight">
            Ogni progetto richiede un linguaggio diverso. Il punto di partenza, però, resta sempre lo stesso.
          </h3>
          <Button
            variant="primary"
            size="md"
            icon="arrow-right"
            onClick={() => onNavigate('contact')}
          >
            Iniziamo da una conversazione
          </Button>
        </div>

      </div>
    </div>
  );
};

