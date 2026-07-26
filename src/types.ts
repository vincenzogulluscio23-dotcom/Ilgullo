export type Language = 'it' | 'en';

export type RoutePath = 
  | 'home' 
  | 'projects' 
  | 'project-detail' 
  | 'lab' 
  | 'article-detail' 
  | 'frames' 
  | 'about' 
  | 'contact' 
  | 'privacy'
  | 'cms';

export type ProjectCategory = 
  | 'All'
  | 'Film'
  | 'Photography'
  | 'Branded Content'
  | 'Corporate'
  | 'Campaign'
  | 'Social'
  | 'Personal';

export type ProjectTemplate =
  | 'Editorial'
  | 'Visual Story'
  | 'Case Study'
  | 'Film'
  | 'Gallery'
  | 'Sticky Story';

export type ImageCropPreference = 'auto' | 'fit' | 'cover' | 'custom';
export type ImageOrientation = 'vertical' | 'horizontal' | 'square' | 'panoramic';

export interface EditorialImage {
  id: string;
  url: string;
  altText?: string;
  caption?: string;
  credit?: string;
  hotspot?: { x: number; y: number }; // percentage 0-100
  cropPreference?: ImageCropPreference;
  orientation?: ImageOrientation;
}

export type GalleryLayoutMode =
  | 'vertical'
  | 'horizontal'
  | 'collage'
  | 'masonry'
  | 'slider'
  | 'dual-image'
  | 'alternate'
  | 'photo-sequence';

export type VideoPreset = 'hero' | 'reel' | 'background' | 'normal';

export interface VideoMedia {
  url: string;
  poster?: string;
  preset?: VideoPreset;
  vimeoId?: string;
  youtubeId?: string;
  caption?: string;
}

export type MediaSequenceItemType = 'photo' | 'video' | 'text' | 'quote' | 'divider';

export interface MediaSequenceItem {
  id: string;
  type: MediaSequenceItemType;
  image?: EditorialImage;
  video?: VideoMedia;
  text?: string;
  quote?: string;
  author?: string;
}

export type BlockType =
  | 'hero'
  | 'text'
  | 'text-image'
  | 'text-video'
  | 'gallery'
  | 'adaptive-gallery'
  | 'media-sequence'
  | 'sticky-story'
  | 'slideshow'
  | 'chapter'
  | 'quote'
  | 'process'
  | 'backstage'
  | 'credits'
  | 'outro';

export interface EditorialBlock {
  id: string;
  type: BlockType;
  title?: string;
  subtitle?: string;
  content?: string;
  quote?: string;
  author?: string;
  layout?: GalleryLayoutMode;
  images?: EditorialImage[];
  video?: VideoMedia;
  sequence?: MediaSequenceItem[];
  items?: Array<{ title: string; description: string }>;
  credits?: Record<string, string>;
  stickyText?: string;
}

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  services: string[];
  role: string;
  location: string;
  agency?: string;
  duration?: string;
  excerpt: string;
  context: string;
  pointOfView: string;
  process: string;
  outcome?: string;
  coverImage: string;
  heroVideoUrl?: string;
  heroVideoPoster?: string;
  galleryImages: string[];
  sideImages?: string[];
  imagesData?: EditorialImage[];
  blocks?: EditorialBlock[];
  template?: ProjectTemplate;
  seo?: SEOData;
  credits: {
    client?: string;
    agency?: string;
    production?: string;
    creativeDirection?: string;
    direction?: string;
    photography?: string;
    cinematography?: string;
    editing?: string;
    color?: string;
    sound?: string;
    motionDesign?: string;
    specialThanks?: string;
    [key: string]: string | undefined;
  };
  featured: boolean;
  layoutPattern?: 'side-images' | 'collage' | 'full-bleed' | 'typography';
  en?: {
    title?: string;
    excerpt?: string;
    context?: string;
    pointOfView?: string;
    process?: string;
    outcome?: string;
    role?: string;
    location?: string;
    category?: ProjectCategory;
    blocks?: EditorialBlock[];
    credits?: Record<string, string>;
    seo?: SEOData;
  };
}

export type LabCategory = 
  | 'All'
  | 'Process'
  | 'Behind the scenes'
  | 'Field notes'
  | 'Experiments'
  | 'Thoughts'
  | 'Visual essays';

export interface LabArticle {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: LabCategory;
  excerpt: string;
  content: string[]; // rich paragraphs & quotes
  date: string;
  readingTime: string;
  coverImage: string;
  relatedProjectsSlugs?: string[];
  seo?: SEOData;
  en?: {
    title?: string;
    excerpt?: string;
    content?: string[];
    readingTime?: string;
    category?: LabCategory;
    seo?: SEOData;
  };
}

export type FrameCategory = 
  | 'All'
  | 'People'
  | 'Places'
  | 'Details'
  | 'Motion'
  | 'Personal'
  | 'Work';

export interface FrameItem {
  id: string;
  number: string;
  title?: string;
  location?: string;
  date?: string;
  category: FrameCategory;
  image: string;
  videoPreview?: string;
  aspectRatio: '16:9' | '16:10' | '4:3' | '3:4' | '4:5' | '3:2' | '9:16' | '1:1';
  orientation: 'horizontal' | 'vertical' | 'square';
  featured?: boolean;
  linkedProjectSlug?: string;
  projectId?: string;
  altText?: string;
  en?: {
    title?: string;
    location?: string;
    category?: FrameCategory;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  privacyAccepted: boolean;
}

export interface SiteContent {
  hero: {
    headline: string;
    subtitle: string;
    bgImage: string;
    availableBadge: string;
    reelLabel: string;
  };
  manifesto: {
    mainStatement: string;
    subParagraph: string;
  };
  about: {
    bioTitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    email: string;
    phone: string;
    location: string;
    instagramUrl: string;
    vimeoUrl: string;
    linkedinUrl: string;
  };
  seo?: SEOData;
  en?: {
    hero?: {
      headline?: string;
      subtitle?: string;
      availableBadge?: string;
      reelLabel?: string;
    };
    manifesto?: {
      mainStatement?: string;
      subParagraph?: string;
    };
    about?: {
      bioTitle?: string;
      bioParagraph1?: string;
      bioParagraph2?: string;
      bioParagraph3?: string;
      location?: string;
    };
    seo?: SEOData;
  };
}

export interface MediaAsset {
  id: string;
  url: string;
  name: string;
  category: 'projects' | 'frames' | 'hero' | 'general';
  uploadedAt: string;
  size?: string;
  orientation?: ImageOrientation;
  client?: string;
  year?: string;
}

