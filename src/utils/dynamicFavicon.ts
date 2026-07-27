/**
 * Dynamically updates favicon link tags in DOM when changed in Sanity CMS
 */
export function updateDynamicFavicon(faviconUrl?: string) {
  if (!faviconUrl) return;

  const rels = ['icon', 'shortcut icon', 'apple-touch-icon'];

  rels.forEach((rel) => {
    let link = document.querySelector(`link[rel~="${rel}"]`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconUrl;
  });
}
