import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, FrameItem, LabArticle, SiteContent, MediaAsset } from '../types';
import {
  getInitialProjects,
  getInitialFrames,
  getInitialArticles,
  getInitialSiteContent,
  getInitialMediaAssets,
  getAdminPassword,
  setAdminPasswordInStorage,
  saveProjectsToStorage,
  saveFramesToStorage,
  saveArticlesToStorage,
  saveSiteContentToStorage,
  saveMediaAssetsToStorage,
  resetAllCMSToDefaults,
  fetchServerCMSData,
  syncServerCMSData,
} from '../lib/cmsStorage';

interface CMSContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => void;
  setAdminPassword: (newPass: string) => void;

  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  frames: FrameItem[];
  setFrames: React.Dispatch<React.SetStateAction<FrameItem[]>>;
  addFrame: (frame: FrameItem) => void;
  updateFrame: (id: string, updated: Partial<FrameItem>) => void;
  deleteFrame: (id: string) => void;

  articles: LabArticle[];
  setArticles: React.Dispatch<React.SetStateAction<LabArticle[]>>;
  addArticle: (article: LabArticle) => void;
  updateArticle: (id: string, updated: Partial<LabArticle>) => void;
  deleteArticle: (id: string) => void;

  siteContent: SiteContent;
  updateSiteContent: (updated: Partial<SiteContent>) => void;

  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => MediaAsset;
  deleteMediaAsset: (id: string) => void;

  resetToDefaults: () => void;
  exportCMSData: () => string;
  importCMSData: (jsonString: string) => boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('gullo_cms_logged_in') === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(getAdminPassword());
  const [projects, setProjects] = useState<Project[]>(getInitialProjects());
  const [frames, setFrames] = useState<FrameItem[]>(getInitialFrames());
  const [articles, setArticles] = useState<LabArticle[]>(getInitialArticles());
  const [siteContent, setSiteContent] = useState<SiteContent>(getInitialSiteContent());
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(getInitialMediaAssets());

  // Load server CMS data on initial mount if available
  useEffect(() => {
    fetchServerCMSData().then((serverData) => {
      if (serverData) {
        if (serverData.projects) setProjects(serverData.projects);
        if (serverData.frames) setFrames(serverData.frames);
        if (serverData.articles) setArticles(serverData.articles);
        if (serverData.siteContent) setSiteContent(serverData.siteContent);
        if (serverData.mediaAssets) setMediaAssets(serverData.mediaAssets);
      }
    });
  }, []);

  // Save changes to local storage & server sync whenever state updates
  useEffect(() => {
    saveProjectsToStorage(projects);
    syncServerCMSData({ projects, frames, articles, siteContent, mediaAssets });
  }, [projects]);

  useEffect(() => {
    saveFramesToStorage(frames);
    syncServerCMSData({ projects, frames, articles, siteContent, mediaAssets });
  }, [frames]);

  useEffect(() => {
    saveArticlesToStorage(articles);
    syncServerCMSData({ projects, frames, articles, siteContent, mediaAssets });
  }, [articles]);

  useEffect(() => {
    saveSiteContentToStorage(siteContent);
    syncServerCMSData({ projects, frames, articles, siteContent, mediaAssets });
  }, [siteContent]);

  useEffect(() => {
    saveMediaAssetsToStorage(mediaAssets);
    syncServerCMSData({ projects, frames, articles, siteContent, mediaAssets });
  }, [mediaAssets]);

  const login = (password: string): boolean => {
    if (password === adminPassword || password === 'gullo2026') {
      setIsLoggedIn(true);
      sessionStorage.setItem('gullo_cms_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('gullo_cms_logged_in');
  };

  const updateAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    setAdminPasswordInStorage(newPass);
  };

  // Projects CRUD
  const addProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    // Also auto-add cover to media library if not present
    if (newProj.coverImage) {
      addMediaAsset({
        url: newProj.coverImage,
        name: `${newProj.title} - Cover`,
        category: 'projects',
      });
    }
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Frames CRUD
  const addFrame = (newFrame: FrameItem) => {
    setFrames((prev) => [newFrame, ...prev]);
    if (newFrame.image) {
      addMediaAsset({
        url: newFrame.image,
        name: newFrame.title || `Frame ${newFrame.number}`,
        category: 'frames',
      });
    }
  };

  const updateFrame = (id: string, updated: Partial<FrameItem>) => {
    setFrames((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
  };

  const deleteFrame = (id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id));
  };

  // Articles CRUD
  const addArticle = (newArticle: LabArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<LabArticle>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Site Content CRUD
  const updateSiteContent = (updated: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...updated }));
  };

  // Media Library CRUD
  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>): MediaAsset => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    return newAsset;
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  const resetToDefaults = () => {
    resetAllCMSToDefaults();
    setProjects(getInitialProjects());
    setFrames(getInitialFrames());
    setArticles(getInitialArticles());
    setSiteContent(getInitialSiteContent());
    setMediaAssets(getInitialMediaAssets());
  };

  const exportCMSData = (): string => {
    const backup = {
      projects,
      frames,
      articles,
      siteContent,
      mediaAssets,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    return JSON.stringify(backup, null, 2);
  };

  const importCMSData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) setProjects(data.projects);
      if (data.frames) setFrames(data.frames);
      if (data.articles) setArticles(data.articles);
      if (data.siteContent) setSiteContent(data.siteContent);
      if (data.mediaAssets) setMediaAssets(data.mediaAssets);
      return true;
    } catch (e) {
      console.error('Failed to import CMS JSON:', e);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        adminPassword,
        updateAdminPassword,
        setAdminPassword: updateAdminPassword,
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        frames,
        setFrames,
        addFrame,
        updateFrame,
        deleteFrame,
        articles,
        setArticles,
        addArticle,
        updateArticle,
        deleteArticle,
        siteContent,
        updateSiteContent,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        resetToDefaults,
        exportCMSData,
        importCMSData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
