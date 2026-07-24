import { Project, FrameItem, LabArticle, SiteContent, MediaAsset } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { FRAMES_DATA } from '../data/frames';
import { LAB_ARTICLES_DATA } from '../data/lab';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

const STORAGE_KEYS = {
  PROJECTS: 'gullo_cms_projects_v1',
  FRAMES: 'gullo_cms_frames_v1',
  ARTICLES: 'gullo_cms_articles_v1',
  SITE_CONTENT: 'gullo_cms_site_v1',
  MEDIA_ASSETS: 'gullo_cms_media_v1',
  AUTH: 'gullo_cms_auth_v1',
  ADMIN_PASSWORD: 'gullo_cms_password_v1',
};

// Default initial media assets compiled from static datasets
const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  ...PROJECTS_DATA.map((p) => ({
    id: `media-proj-${p.id}`,
    url: p.coverImage,
    name: `${p.title} - Cover`,
    category: 'projects' as const,
    uploadedAt: '2026-01-15',
  })),
  ...FRAMES_DATA.map((f) => ({
    id: `media-frame-${f.id}`,
    url: f.image,
    name: f.title || `Frame ${f.number}`,
    category: 'frames' as const,
    uploadedAt: '2026-02-01',
  })),
  {
    id: 'media-hero-bg',
    url: INITIAL_SITE_CONTENT.hero.bgImage,
    name: 'Hero Atmospheric Background',
    category: 'hero' as const,
    uploadedAt: '2026-01-01',
  },
];

export const getInitialProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading projects from storage:', e);
  }
  return PROJECTS_DATA;
};

export const getInitialFrames = (): FrameItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FRAMES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading frames from storage:', e);
  }
  return FRAMES_DATA;
};

export const getInitialArticles = (): LabArticle[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading articles from storage:', e);
  }
  return LAB_ARTICLES_DATA;
};

export const getInitialSiteContent = (): SiteContent => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONTENT);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading site content from storage:', e);
  }
  return INITIAL_SITE_CONTENT;
};

export const getInitialMediaAssets = (): MediaAsset[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA_ASSETS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading media assets from storage:', e);
  }
  return INITIAL_MEDIA_ASSETS;
};

export const getAdminPassword = (): string => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || 'gullo2026';
};

export const setAdminPasswordInStorage = (password: string) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, password);
};

export const saveProjectsToStorage = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

export const saveFramesToStorage = (frames: FrameItem[]) => {
  localStorage.setItem(STORAGE_KEYS.FRAMES, JSON.stringify(frames));
};

export const saveArticlesToStorage = (articles: LabArticle[]) => {
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
};

export const saveSiteContentToStorage = (content: SiteContent) => {
  localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(content));
};

export const saveMediaAssetsToStorage = (media: MediaAsset[]) => {
  localStorage.setItem(STORAGE_KEYS.MEDIA_ASSETS, JSON.stringify(media));
};

export const resetAllCMSToDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.FRAMES);
  localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  localStorage.removeItem(STORAGE_KEYS.SITE_CONTENT);
  localStorage.removeItem(STORAGE_KEYS.MEDIA_ASSETS);
};
