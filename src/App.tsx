import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { PROJECTS_DATA } from './data/projects';
import { LAB_ARTICLES_DATA } from './data/lab';
import { FRAMES_DATA } from './data/frames';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

import { Hero } from './components/Hero';
import { HomeManifesto } from './components/HomeManifesto';
import { FeaturedProjectsCarousel } from './components/FeaturedProjectsCarousel';
import { BeyondProcessSection } from './components/BeyondProcessSection';
import { WhatMattersSection } from './components/WhatMattersSection';
import { FramesSection } from './components/FramesSection';
import { LabSection } from './components/LabSection';
import { ContactCTA } from './components/ContactCTA';

import { ProjectsView } from './components/ProjectsView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { PrivacyView } from './components/PrivacyView';
import { NotFoundView } from './components/NotFoundView';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('home');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);

  // Handle browser back/forward and hash or direct state transitions
  const handleNavigate = (route: RoutePath) => {
    setCurrentRoute(route);
    if (route !== 'project-detail') {
      setActiveProjectSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string) => {
    setActiveProjectSlug(slug);
    setCurrentRoute('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = PROJECTS_DATA.find((p) => p.slug === activeProjectSlug) || PROJECTS_DATA[0];

  return (
    <div className="min-h-screen bg-[#09090A] text-[#F1F0EB] font-sans selection:bg-[#FF5A36] selection:text-white flex flex-col relative grain-overlay">
      
      {/* Custom Pointer Cursor for Desktop */}
      <CustomCursor />

      {/* Global Shell Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <HomeManifesto onNavigate={handleNavigate} />
            <FeaturedProjectsCarousel
              projects={PROJECTS_DATA}
              onSelectProject={handleSelectProject}
              onNavigate={handleNavigate}
            />
            <BeyondProcessSection />
            <WhatMattersSection />
            <FramesSection
              frames={FRAMES_DATA}
              onNavigate={handleNavigate}
              isTeaser
            />
            <LabSection
              articles={LAB_ARTICLES_DATA}
              onNavigate={handleNavigate}
              isTeaser
            />
            <ContactCTA onNavigate={handleNavigate} />
          </>
        )}

        {currentRoute === 'projects' && (
          <ProjectsView
            projects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'project-detail' && activeProject && (
          <ProjectDetailView
            project={activeProject}
            allProjects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'lab' && (
          <div className="pt-28">
            <LabSection
              articles={LAB_ARTICLES_DATA}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentRoute === 'frames' && (
          <div className="pt-28">
            <FramesSection
              frames={FRAMES_DATA}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentRoute === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactView />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyView onNavigate={handleNavigate} />
        )}

        {!['home', 'projects', 'project-detail', 'lab', 'frames', 'about', 'contact', 'privacy'].includes(currentRoute) && (
          <NotFoundView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Shell Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default App;
