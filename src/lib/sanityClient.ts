import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'va4dfcn6';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for fast cached responses in production
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try {
    return builder.image(source).auto('format').url() || '';
  } catch {
    if (typeof source === 'object' && source?.asset?.url) {
      return source.asset.url;
    }
    return '';
  }
}
