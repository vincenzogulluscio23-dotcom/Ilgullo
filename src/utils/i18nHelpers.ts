import { Project, LabArticle, FrameItem, Language, SiteContent } from '../types';

export function getLocalizedProject(project: Project, lang: Language): Project {
  if (lang === 'en' && project.en) {
    return {
      ...project,
      title: project.en.title || project.title,
      excerpt: project.en.excerpt || project.excerpt,
      context: project.en.context || project.context,
      pointOfView: project.en.pointOfView || project.pointOfView,
      process: project.en.process || project.process,
      outcome: project.en.outcome || project.outcome,
      role: project.en.role || project.role,
      location: project.en.location || project.location,
      category: project.en.category || project.category,
      blocks: project.en.blocks || project.blocks,
      credits: project.en.credits || project.credits,
    };
  }
  return project;
}

export function getLocalizedLabArticle(article: LabArticle, lang: Language): LabArticle {
  if (lang === 'en' && article.en) {
    return {
      ...article,
      title: article.en.title || article.title,
      excerpt: article.en.excerpt || article.excerpt,
      content: article.en.content || article.content,
      readingTime: article.en.readingTime || article.readingTime,
      category: article.en.category || article.category,
    };
  }
  return article;
}

export function getLocalizedFrame(frame: FrameItem, lang: Language): FrameItem {
  if (lang === 'en' && frame.en) {
    return {
      ...frame,
      title: frame.en.title || frame.title,
      location: frame.en.location || frame.location,
      category: frame.en.category || frame.category,
    };
  }
  return frame;
}
