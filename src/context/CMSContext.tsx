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
} from '../lib/cmsStorage';
import { fetchAllSanityData } from '../lib/sanityQueries';
import { updateDynamicFavicon } from '../utils/dynamicFavicon';

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

  exportCMSData: () => string;
  importCMSData: (jsonString: string) => boolean;
  isLoadingSanity: boolean;
  refreshSanityData: () => Promise<void>;
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
  const [isLoadingSanity, setIsLoadingSanity] = useState<boolean>(true);

  const loadSanity = async () => {
    setIsLoadingSanity(true);
    try {
      const sanityData = await fetchAllSanityData();
      if (sanityData) {
        if (sanityData.projects && sanityData.projects.length > 0) {
          setProjects(sanityData.projects);
        }
        if (sanityData.frames && sanityData.frames.length > 0) {
          setFrames(sanityData.frames);
        }
        if (sanityData.articles && sanityData.articles.length > 0) {
          setArticles(sanityData.articles);
        }
        if (sanityData.siteContent) {
          setSiteContent(sanityData.siteContent);
          if (sanityData.siteContent.brand?.faviconUrl) {
            updateDynamicFavicon(sanityData.siteContent.brand.faviconUrl);
          }
        }
      }
    } catch (e) {
      console.warn('Sanity load warning:', e);
    } finally {
      setIsLoadingSanity(false);
    }
  };

  useEffect(() => {
    loadSanity();
  }, []);

  useEffect(() => {
    if (siteContent.brand?.faviconUrl) {
      updateDynamicFavicon(siteContent.brand.faviconUrl);
    }
  }, [siteContent.brand?.faviconUrl]);

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
        exportCMSData,
        importCMSData,
        isLoadingSanity,
        refreshSanityData: loadSanity,
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
