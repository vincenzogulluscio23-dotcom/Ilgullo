import React, { useState } from 'react';
import { RoutePath } from './types';
import { CMSProvider, useCMS } from './context/CMSContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PageTransition, LanguageCrossFade } from './components/motion/PageTransition';

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

const SanityStudioPage = React.lazy(() => import('./components/SanityStudio'));

function MainAppContent() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('home');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const { projects, frames, articles, siteContent } = useCMS();
  const { language } = useLanguage();

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check URL path on load or popstate for Sanity Studio access (/superman)
  React.useEffect(() => {
    const checkCMSAccess = () => {
      const pathname = window.location.pathname.toLowerCase();
      if (pathname.startsWith('/superman')) {
        setCurrentRoute('cms');
      }
    };

    checkCMSAccess();
    window.addEventListener('popstate', checkCMSAccess);
    return () => window.removeEventListener('popstate', checkCMSAccess);
  }, []);

  const handleNavigate = (route: RoutePath) => {
    setCurrentRoute(route);
    if (route !== 'project-detail') {
      setActiveProjectSlug(null);
    }

    if (route === 'cms') {
      if (!window.location.pathname.toLowerCase().startsWith('/superman')) {
        window.history.pushState({}, '', '/superman');
      }
    } else if (window.location.pathname.toLowerCase().startsWith('/superman')) {
      window.history.pushState({}, '', '/');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string) => {
    setActiveProjectSlug(slug);
    setCurrentRoute('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = projects.find((p) => p.slug === activeProjectSlug) || projects[0];

  // Dedicated route for Sanity Studio at /superman
  if (currentRoute === 'cms') {
    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-[#09090A] flex flex-col items-center justify-center p-6 text-white font-mono text-xs">
            <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin mb-4" />
            <span>Caricamento Sanity Studio (/superman)...</span>
          </div>
        }
      >
        <SanityStudioPage />
      </React.Suspense>
    );
  }

  return (
    <div
      data-theme={theme}
      className={`min-h-screen font-sans selection:bg-[#FF5A36] selection:text-white flex flex-col relative grain-overlay transition-colors duration-500 ${
        theme === 'light' ? 'bg-[#F8F8F6] text-[#18181B]' : 'bg-[#09090A] text-[#F1F0EB]'
      }`}
    >
      {/* Custom Pointer Cursor for Desktop */}
      <CustomCursor />

      {/* Global Shell Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Router wrapped in Framer Motion Page & Language Transitions */}
      <main className="flex-grow flex flex-col">
        <PageTransition routeKey={currentRoute}>
          <LanguageCrossFade langKey={language}>
            {currentRoute === 'home' && (
              <>
                <Hero onNavigate={handleNavigate} />
                <HomeManifesto onNavigate={handleNavigate} />
                <FeaturedProjectsCarousel
                  projects={projects}
                  onSelectProject={handleSelectProject}
                  onNavigate={handleNavigate}
                />
                <WhatMattersSection />
                <FramesSection
                  frames={frames}
                  onNavigate={handleNavigate}
                  isTeaser
                />
                <BeyondProcessSection />
                <LabSection
                  articles={articles}
                  onNavigate={handleNavigate}
                  isTeaser
                />
                <ContactCTA onNavigate={handleNavigate} />
              </>
            )}

            {currentRoute === 'projects' && (
              <ProjectsView
                projects={projects}
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'project-detail' && activeProject && (
              <ProjectDetailView
                project={activeProject}
                allProjects={projects}
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'lab' && (
              <div className="pt-28">
                <LabSection
                  articles={articles}
                  onNavigate={handleNavigate}
                />
              </div>
            )}

            {currentRoute === 'frames' && (
              <div className="pt-28">
                <FramesSection
                  frames={frames}
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

            {!['home', 'projects', 'project-detail', 'lab', 'frames', 'about', 'contact', 'privacy', 'cms'].includes(currentRoute) && (
              <NotFoundView onNavigate={handleNavigate} />
            )}
          </LanguageCrossFade>
        </PageTransition>
      </main>

      {/* Global Shell Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <CMSProvider>
        <MainAppContent />
      </CMSProvider>
    </LanguageProvider>
  );
}

export default App;
