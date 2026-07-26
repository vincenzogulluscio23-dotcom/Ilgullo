import { Project, FrameItem, LabArticle, SiteContent, MediaAsset, EditorialBlock, ProjectTemplate, ImageOrientation } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { FRAMES_DATA } from '../data/frames';
import { LAB_ARTICLES_DATA } from '../data/lab';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

const STORAGE_KEYS = {
  PROJECTS: 'gullo_cms_projects_v2',
  FRAMES: 'gullo_cms_frames_v2',
  ARTICLES: 'gullo_cms_articles_v2',
  SITE_CONTENT: 'gullo_cms_site_v2',
  MEDIA_ASSETS: 'gullo_cms_media_v2',
  AUTH: 'gullo_cms_auth_v2',
  ADMIN_PASSWORD: 'gullo_cms_password_v2',
};

// Default initial media assets compiled from static datasets
const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  ...PROJECTS_DATA.map((p) => ({
    id: `media-proj-${p.id}`,
    url: p.coverImage,
    name: `${p.title} - Cover`,
    category: 'projects' as const,
    uploadedAt: '2026-01-15',
    client: p.client,
    year: p.year,
  })),
  ...FRAMES_DATA.map((f) => ({
    id: `media-frame-${f.id}`,
    url: f.image,
    name: f.title || `Frame ${f.number}`,
    category: 'frames' as const,
    uploadedAt: '2026-02-01',
    orientation: f.orientation as ImageOrientation,
  })),
  {
    id: 'media-hero-bg',
    url: INITIAL_SITE_CONTENT.hero.bgImage,
    name: 'Hero Atmospheric Background',
    category: 'hero' as const,
    uploadedAt: '2026-01-01',
  },
];

// Helper to generate blocks for project templates
export const generateTemplateBlocks = (template: ProjectTemplate, project: Partial<Project>): EditorialBlock[] => {
  const title = project.title || 'Titolo Progetto';
  const cover = project.coverImage || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85';

  switch (template) {
    case 'Editorial':
      return [
        {
          id: `block-${Date.now()}-1`,
          type: 'hero',
          title: title,
          subtitle: project.excerpt || 'Un racconto visivo profondo sull’identità e l’atmosfera.',
          images: [{ id: 'img-1', url: cover, altText: title, cropPreference: 'auto' }],
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'chapter',
          title: 'Capitolo I',
          subtitle: 'L’Origine del Racconto',
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'text',
          content: project.context || 'Il progetto nasce dall’esigenza di esplorare un linguaggio visivo autentico, lontano dagli automatismi della produzione di massa.',
        },
        {
          id: `block-${Date.now()}-4`,
          type: 'quote',
          quote: 'Ogni inquadratura deve contenere una ragione di esistere, non solo una valenza estetica.',
          author: 'Vincenzo Gulluscio',
        },
        {
          id: `block-${Date.now()}-5`,
          type: 'adaptive-gallery',
          layout: 'collage',
          images: (project.galleryImages || []).map((url, i) => ({
            id: `gal-img-${i}`,
            url,
            cropPreference: 'auto',
          })),
        },
        {
          id: `block-${Date.now()}-6`,
          type: 'credits',
          credits: project.credits || { Direzione: 'Vincenzo Gulluscio' },
        },
      ];

    case 'Visual Story':
      return [
        {
          id: `block-${Date.now()}-1`,
          type: 'hero',
          title: title,
          subtitle: project.excerpt,
          images: [{ id: 'img-1', url: cover, cropPreference: 'auto' }],
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'sticky-story',
          title: 'Sguardo e Dettaglio',
          stickyText: 'Soffermarsi sui gesti minimi permette di rivelare l’anima autentica delle persone e dei luoghi.',
          images: (project.galleryImages || []).slice(0, 3).map((url, i) => ({ id: `st-${i}`, url, cropPreference: 'auto' })),
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'media-sequence',
          title: 'Sequenza di Campo',
          sequence: (project.galleryImages || []).map((url, i) => ({
            id: `seq-${i}`,
            type: 'photo',
            image: { id: `seq-img-${i}`, url, cropPreference: 'fit' },
          })),
        },
        {
          id: `block-${Date.now()}-4`,
          type: 'outro',
          title: 'Continua l’esplorazione',
          subtitle: 'Scopri gli altri progetti cinematografici e fotografici.',
        },
      ];

    case 'Case Study':
      return [
        {
          id: `block-${Date.now()}-1`,
          type: 'hero',
          title: title,
          subtitle: project.client ? `Case Study per ${project.client}` : 'Brand Film & Strategic Storytelling',
          images: [{ id: 'img-1', url: cover, cropPreference: 'auto' }],
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'process',
          title: 'Il Metodo di Lavoro',
          items: [
            { title: '01. Ricerca e Visione', description: project.context || 'Analisi dei valori del brand e ricerca del tono di voce autentico.' },
            { title: '02. Produzione e Regia', description: project.process || 'Riprese sul campo con troupe snella per massima naturalezza.' },
            { title: '03. Post-Produzione Editorial', description: 'Montaggio, color grading e sound design su misura.' },
          ],
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'text-video',
          title: 'Il Film',
          content: 'Guarda il video finale in alta definizione.',
          video: {
            url: project.heroVideoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
            poster: cover,
            preset: 'reel',
          },
        },
        {
          id: `block-${Date.now()}-4`,
          type: 'gallery',
          layout: 'dual-image',
          images: (project.galleryImages || []).map((url, i) => ({ id: `cs-img-${i}`, url, cropPreference: 'fit' })),
        },
      ];

    case 'Film':
      return [
        {
          id: `block-${Date.now()}-1`,
          type: 'text-video',
          title: title,
          content: project.excerpt || 'Film documentario e cinematografico.',
          video: {
            url: project.heroVideoUrl || '',
            poster: cover,
            preset: 'hero',
          },
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'text',
          title: 'Sinossi',
          content: project.context || project.pointOfView || 'Una narrazione visiva intensa.',
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'backstage',
          title: 'Dietro le Quinte',
          content: 'I momenti di lavorazione sul set durante le riprese.',
          images: (project.galleryImages || []).map((url, i) => ({ id: `bts-${i}`, url, cropPreference: 'fit' })),
        },
        {
          id: `block-${Date.now()}-4`,
          type: 'credits',
          credits: project.credits || { Regia: 'Vincenzo Gulluscio' },
        },
      ];

    default:
      return [
        {
          id: `block-${Date.now()}-1`,
          type: 'hero',
          title: title,
          subtitle: project.excerpt,
          images: [{ id: 'img-1', url: cover, cropPreference: 'auto' }],
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'text',
          title: 'La Storia',
          content: project.context || 'Contenuto editoriale del progetto.',
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'adaptive-gallery',
          layout: 'masonry',
          images: (project.galleryImages || []).map((url, i) => ({ id: `img-${i}`, url, cropPreference: 'auto' })),
        },
      ];
  }
};

// Validation Auditor Interface
export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'projects' | 'frames' | 'articles' | 'site' | 'seo';
  title: string;
  message: string;
  targetId?: string;
  field?: string;
}

export const runCMSValidationAudit = (
  projects: Project[],
  frames: FrameItem[],
  articles: LabArticle[],
  site: SiteContent
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  // Audit Projects
  projects.forEach((p) => {
    if (!p.title || p.title.trim() === '') {
      issues.push({
        id: `val-p-title-${p.id}`,
        type: 'error',
        category: 'projects',
        title: 'Manca il Titolo',
        message: `Un progetto (#${p.number}) non ha un titolo valido.`,
        targetId: p.id,
        field: 'title',
      });
    }

    if (!p.coverImage) {
      issues.push({
        id: `val-p-cover-${p.id}`,
        type: 'error',
        category: 'projects',
        title: 'Manca Immagine di Copertina',
        message: `Il progetto "${p.title || p.number}" non ha un’immagine di copertina impostata.`,
        targetId: p.id,
        field: 'coverImage',
      });
    }

    if (!p.excerpt || p.excerpt.length < 10) {
      issues.push({
        id: `val-p-excerpt-${p.id}`,
        type: 'warning',
        category: 'projects',
        title: 'Estratto / Excerpt Incompleto',
        message: `Il progetto "${p.title}" ha una descrizione breve troppo corta per un’ottima resa grafica.`,
        targetId: p.id,
        field: 'excerpt',
      });
    }

    if (p.heroVideoUrl && !p.heroVideoPoster) {
      issues.push({
        id: `val-p-poster-${p.id}`,
        type: 'warning',
        category: 'projects',
        title: 'Manca il Video Poster',
        message: `Il progetto "${p.title}" ha un video ma nessun poster di caricamento iniziale.`,
        targetId: p.id,
        field: 'heroVideoPoster',
      });
    }

    if (!p.seo?.title || !p.seo?.description) {
      issues.push({
        id: `val-p-seo-${p.id}`,
        type: 'info',
        category: 'seo',
        title: 'SEO Non Configurato',
        message: `Il progetto "${p.title}" usera i meta tag predefiniti. Considera di personalizzare il SEO.`,
        targetId: p.id,
        field: 'seo',
      });
    }
  });

  // Audit Frames
  frames.forEach((f) => {
    if (!f.image) {
      issues.push({
        id: `val-f-img-${f.id}`,
        type: 'error',
        category: 'frames',
        title: 'Frame senza immagine',
        message: `Il frame #${f.number} è privo di file immagine.`,
        targetId: f.id,
      });
    }
    if (!f.altText) {
      issues.push({
        id: `val-f-alt-${f.id}`,
        type: 'info',
        category: 'frames',
        title: 'Manca Alt Text Accessibilità',
        message: `Il frame #${f.number} (${f.title || 'Senza titolo'}) non ha il testo alternativo alt text.`,
        targetId: f.id,
      });
    }
  });

  // Audit Site Content
  if (!site.hero.headline) {
    issues.push({
      id: 'val-site-headline',
      type: 'error',
      category: 'site',
      title: 'Manca l’Headline della Homepage',
      message: 'Il testo principale dell’Hero della homepage è vuoto.',
    });
  }

  return issues;
};

// Auto aspect ratio detection helper for image files/URLs
export const detectImageOrientation = (
  width: number,
  height: number
): ImageOrientation => {
  const ratio = width / height;
  if (ratio > 1.8) return 'panoramic';
  if (ratio > 1.15) return 'horizontal';
  if (ratio >= 0.85 && ratio <= 1.15) return 'square';
  return 'vertical';
};

export const getInitialProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading projects from storage:', e);
  }
  // Auto-enrich default dataset with blocks if empty
  return PROJECTS_DATA.map((p) => ({
    ...p,
    template: p.template || 'Editorial',
    blocks: p.blocks && p.blocks.length > 0 ? p.blocks : generateTemplateBlocks('Editorial', p),
  }));
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

export const syncServerCMSData = async (data: {
  projects?: Project[];
  frames?: FrameItem[];
  articles?: LabArticle[];
  siteContent?: SiteContent;
  mediaAssets?: MediaAsset[];
}) => {
  try {
    await fetch('/api/cms/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn('Server sync skipped:', e);
  }
};

export const fetchServerCMSData = async () => {
  try {
    const res = await fetch('/api/cms/data');
    if (res.ok) {
      const data = await res.json();
      if (data && data.status !== 'empty') {
        return data;
      }
    }
  } catch (e) {
    console.warn('Server fetch skipped:', e);
  }
  return null;
};

export const resetAllCMSToDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.FRAMES);
  localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  localStorage.removeItem(STORAGE_KEYS.SITE_CONTENT);
  localStorage.removeItem(STORAGE_KEYS.MEDIA_ASSETS);
};

