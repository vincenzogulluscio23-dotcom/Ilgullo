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
}

export interface MediaAsset {
  id: string;
  url: string;
  name: string;
  category: 'projects' | 'frames' | 'hero' | 'general';
  uploadedAt: string;
  size?: string;
}
