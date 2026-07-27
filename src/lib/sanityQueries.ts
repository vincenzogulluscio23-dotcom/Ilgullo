import groq from 'groq';
import { sanityClient, urlFor } from './sanityClient';
import { Project, FrameItem, LabArticle, SiteContent } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { FRAMES_DATA } from '../data/frames';
import { LAB_ARTICLES_DATA } from '../data/lab';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    "mainLogoUrl": mainLogo.asset->url,
    "logoDarkUrl": logoDark.asset->url,
    "logoLightUrl": logoLight.asset->url,
    "faviconUrl": favicon.asset->url,
    "appleTouchIconUrl": appleTouchIcon.asset->url,
    "defaultOgImageUrl": defaultOgImage.asset->url,
    email,
    phone,
    whatsapp,
    location,
    socialLinks,
    footerText,
    copyright,
    privacyText
  }
`;

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubtitle,
    heroTagline,
    "heroBgImageUrl": heroBgImage.asset->url,
    heroVideoUrl,
    manifestoTitle,
    manifestoText,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      number,
      category,
      client,
      year,
      excerpt,
      "coverImage": coverImage.asset->url,
      heroVideoUrl,
      featured
    },
    selectedFrames[]-> {
      _id,
      number,
      title,
      "image": image.asset->url,
      videoUrl,
      category,
      orientation,
      year,
      location,
      caption,
      altText
    },
    showFramesSection,
    showLabSection,
    ctaText
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    number,
    category,
    client,
    agency,
    year,
    location,
    role,
    excerpt,
    "coverImage": coverImage.asset->url,
    heroVideoUrl,
    "heroVideoPoster": heroVideoPoster.asset->url,
    featured,
    order,
    layoutTemplate,
    blocks[] {
      blockType,
      title,
      content,
      quote,
      author,
      "imageUrl": image.asset->url,
      "imageCaption": image.caption,
      images[] {
        "url": asset->url,
        caption
      },
      videoUrl,
      "videoPosterUrl": videoPoster.asset->url,
      creditsList
    },
    galleryImages[] {
      "url": asset->url
    },
    creditsText,
    seoTitle,
    seoDescription
  }
`;

export const FRAMES_QUERY = groq`
  *[_type == "frame"] | order(order asc, number asc) {
    _id,
    number,
    title,
    "image": image.asset->url,
    videoUrl,
    category,
    orientation,
    year,
    location,
    caption,
    altText,
    order,
    featuredInHomepage
  }
`;

export const LAB_ARTICLES_QUERY = groq`
  *[_type == "labArticle"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    category,
    date,
    readTime,
    content
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {
    title,
    "portraitImageUrl": portraitImage.asset->url,
    headline,
    biography,
    shortBio,
    servicesList,
    clientsList,
    resumePdfUrl
  }
`;

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage"][0] {
    title,
    subtitle,
    availabilityStatus,
    email,
    phone,
    whatsapp,
    locationText
  }
`;

// Helper function to fetch all Sanity CMS data with graceful fallback to local defaults
export async function fetchAllSanityData() {
  try {
    const [settings, home, projects, frames, articles, about, contact] = await Promise.all([
      sanityClient.fetch(SITE_SETTINGS_QUERY).catch(() => null),
      sanityClient.fetch(HOME_PAGE_QUERY).catch(() => null),
      sanityClient.fetch(PROJECTS_QUERY).catch(() => null),
      sanityClient.fetch(FRAMES_QUERY).catch(() => null),
      sanityClient.fetch(LAB_ARTICLES_QUERY).catch(() => null),
      sanityClient.fetch(ABOUT_PAGE_QUERY).catch(() => null),
      sanityClient.fetch(CONTACT_PAGE_QUERY).catch(() => null),
    ]);

    // Format Projects
    let formattedProjects: Project[] = [];
    if (Array.isArray(projects) && projects.length > 0) {
      formattedProjects = projects.map((p, idx) => ({
        id: p._id || `proj-${idx}`,
        title: p.title || 'Senza Titolo',
        slug: p.slug || `project-${idx}`,
        number: p.number || `#0${idx + 1}`,
        category: p.category || 'Direction & Film',
        client: p.client || '',
        agency: p.agency || '',
        year: p.year || '2026',
        location: p.location || '',
        role: p.role || 'Director',
        services: p.services || ['Direction', 'Visual Storytelling'],
        excerpt: p.excerpt || '',
        context: p.context || p.excerpt || '',
        pointOfView: p.pointOfView || '',
        process: p.process || '',
        coverImage: p.coverImage || PROJECTS_DATA[idx % PROJECTS_DATA.length]?.coverImage || '',
        heroVideoUrl: p.heroVideoUrl || '',
        heroVideoPoster: p.heroVideoPoster || '',
        featured: Boolean(p.featured),
        order: p.order ?? idx,
        template: p.layoutTemplate || 'Editorial',
        blocks: p.blocks || [],
        galleryImages: (p.galleryImages || []).map((g: any) => g.url).filter(Boolean),
        creditsText: p.creditsText || '',
        credits: {
          client: p.client || '',
          agency: p.agency || '',
          direction: 'Vincenzo Gulluscio',
        },
      }));
    } else {
      formattedProjects = PROJECTS_DATA;
    }

    // Format Frames
    let formattedFrames: FrameItem[] = [];
    if (Array.isArray(frames) && frames.length > 0) {
      formattedFrames = frames.map((f, idx) => {
        const orient = (f.orientation === 'panoramic' ? 'horizontal' : f.orientation || 'vertical') as 'horizontal' | 'vertical' | 'square';
        const ratio = orient === 'horizontal' ? '16:9' : orient === 'square' ? '1:1' : '4:5';
        return {
          id: f._id || `frame-${idx}`,
          number: f.number || `0${idx + 1}`,
          title: f.title || 'Frame',
          image: f.image || FRAMES_DATA[idx % FRAMES_DATA.length]?.image || '',
          videoUrl: f.videoUrl || '',
          category: f.category || 'PLACES',
          orientation: orient,
          aspectRatio: ratio,
          year: f.year || '2026',
          location: f.location || '',
          caption: f.caption || '',
          altText: f.altText || f.title || '',
        };
      });
    } else {
      formattedFrames = FRAMES_DATA;
    }

    // Format Articles
    let formattedArticles: LabArticle[] = [];
    if (Array.isArray(articles) && articles.length > 0) {
      formattedArticles = articles.map((a, idx) => ({
        id: a._id || `art-${idx}`,
        number: a.number || `#0${idx + 1}`,
        title: a.title || 'Articolo',
        slug: a.slug || `article-${idx}`,
        excerpt: a.summary || '',
        coverImage: a.coverImage || LAB_ARTICLES_DATA[idx % LAB_ARTICLES_DATA.length]?.coverImage || '',
        category: a.category || 'RESEARCH',
        date: a.date || '2026-01-01',
        readingTime: a.readTime || '4 min read',
        content: Array.isArray(a.content) ? a.content : [a.content || a.summary || ''],
      }));
    } else {
      formattedArticles = LAB_ARTICLES_DATA;
    }

    // Format Site Content & Settings
    const formattedSiteContent: SiteContent = {
      ...INITIAL_SITE_CONTENT,
      brand: {
        logoUrl: settings?.mainLogoUrl || settings?.logoDarkUrl || INITIAL_SITE_CONTENT.brand?.logoUrl,
        logoDarkUrl: settings?.logoDarkUrl || INITIAL_SITE_CONTENT.brand?.logoUrl,
        logoLightUrl: settings?.logoLightUrl || INITIAL_SITE_CONTENT.brand?.logoUrl,
        faviconUrl: settings?.faviconUrl || '',
        title: settings?.siteTitle || INITIAL_SITE_CONTENT.brand?.title,
        tagline: settings?.siteDescription || INITIAL_SITE_CONTENT.brand?.tagline,
      },
      hero: {
        ...INITIAL_SITE_CONTENT.hero,
        headline: home?.heroHeadline || INITIAL_SITE_CONTENT.hero.headline,
        subtitle: home?.heroSubtitle || INITIAL_SITE_CONTENT.hero.subtitle,
        subhead: home?.heroSubtitle || INITIAL_SITE_CONTENT.hero.subtitle,
        bgImage: home?.heroBgImageUrl || INITIAL_SITE_CONTENT.hero.bgImage,
        videoUrl: home?.heroVideoUrl || INITIAL_SITE_CONTENT.hero.bgImage,
      },
      manifesto: {
        ...INITIAL_SITE_CONTENT.manifesto,
        title: home?.manifestoTitle || INITIAL_SITE_CONTENT.manifesto.mainStatement,
        text: home?.manifestoText || INITIAL_SITE_CONTENT.manifesto.subParagraph,
      },
      contact: {
        email: settings?.email || contact?.email || INITIAL_SITE_CONTENT.about.email,
        phone: settings?.phone || contact?.phone || INITIAL_SITE_CONTENT.about.phone,
        whatsapp: settings?.whatsapp || contact?.whatsapp || '',
        location: settings?.location || contact?.locationText || INITIAL_SITE_CONTENT.about.location,
        social: settings?.socialLinks && settings.socialLinks.length > 0
          ? settings.socialLinks.map((s: any) => ({
              platform: s.platform || 'Social',
              url: s.url || '#',
              handle: s.handle || '@gullo',
            }))
          : [
              { platform: 'Instagram', url: INITIAL_SITE_CONTENT.about.instagramUrl, handle: '@vincenzogullo' },
              { platform: 'Vimeo', url: INITIAL_SITE_CONTENT.about.vimeoUrl, handle: 'vincenzogullo' },
              { platform: 'LinkedIn', url: INITIAL_SITE_CONTENT.about.linkedinUrl, handle: 'vincenzogullo' },
            ],
      },
      footer: {
        copyright: settings?.copyright || '© 2026 Vincenzo Gulluscio. Tutti i diritti riservati.',
      },
    };

    return {
      projects: formattedProjects,
      frames: formattedFrames,
      articles: formattedArticles,
      siteContent: formattedSiteContent,
    };
  } catch (error) {
    console.warn('Failed to fetch from Sanity CMS, using fallback local dataset:', error);
    return {
      projects: PROJECTS_DATA,
      frames: FRAMES_DATA,
      articles: LAB_ARTICLES_DATA,
      siteContent: INITIAL_SITE_CONTENT,
    };
  }
}
