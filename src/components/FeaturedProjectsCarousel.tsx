import React from 'react';
import { Project, RoutePath } from '../types';
import { SectionLabel } from './EditorialText';
import { Button } from './Button';
import { Project3DDeck } from './Project3DDeck';

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onNavigate: (route: RoutePath) => void;
}

export const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({
  projects,
  onSelectProject,
  onNavigate,
}) => {
  const featured = projects.filter((p) => p.featured);
  const displayProjects = featured.length > 0 ? featured : projects;

  return (
    <section id="featured-projects" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#09090A] relative overflow-hidden">
      
      {/* Background Soft Glow & Grid Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <SectionLabel number="02" label="Selected projects" className="mb-4" />
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#F1F0EB] text-balance">
              Storie costruite da <span className="font-sans not-italic text-white font-normal">punti di vista</span> diversi.
            </h2>
          </div>

          <div>
            <Button
              variant="pill"
              onClick={() => onNavigate('projects')}
            >
              Tutti i progetti ({projects.length})
            </Button>
          </div>
        </div>

        {/* 3D Stacked Deck Slider */}
        <Project3DDeck
          projects={displayProjects}
          onSelectProject={onSelectProject}
        />

      </div>
    </section>
  );
};

