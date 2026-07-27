import { ImageOrientation } from '../types';
import { detectImageOrientation } from './cmsStorage';

export interface UploadResult {
  url: string;
  orientation: ImageOrientation;
  width: number;
  height: number;
  filename: string;
}

/**
 * Optimizes an image file via HTML5 Canvas (resizing to max maxDimension & compressing)
 * Returns a compressed base64 data string and metadata.
 */
export const compressImageFile = (
  file: File,
  maxDimension: number = 2560,
  quality: number = 0.85
): Promise<{ dataUrl: string; width: number; height: number; orientation: ImageOrientation }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        reject(new Error('Empty image file result'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image element'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale if exceeds max dimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not initialize 2D canvas context'));
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP if supported, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const orientation = detectImageOrientation(width, height);
        resolve({ dataUrl, width, height, orientation });
      };

      img.src = src;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Main upload engine:
 * 1. Compresses image client-side to max 2560px for high clarity + fast transfer
 * 2. Uploads payload to server /api/upload endpoint
 * 3. Returns server static URL (/uploads/...) or safe lightweight fallback
 */
export const processAndUploadMedia = async (
  file: File,
  onProgress?: (percentage: number) => void
): Promise<UploadResult> => {
  if (onProgress) onProgress(15);

  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);

  if (isVideo) {
    if (onProgress) onProgress(30);
    // Read raw data URL for video
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

    if (onProgress) onProgress(60);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout for video

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: rawDataUrl,
          fileName: file.name,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.url) {
          if (onProgress) onProgress(100);
          return {
            url: result.url,
            orientation: 'horizontal',
            width: 1920,
            height: 1080,
            filename: result.filename || file.name,
          };
        }
      }
    } catch (err) {
      console.warn('Server upload for video timed out or fell back:', err);
    }

    if (onProgress) onProgress(100);
    return {
      url: rawDataUrl,
      orientation: 'horizontal',
      width: 1920,
      height: 1080,
      filename: file.name,
    };
  }

  // Step 1: Client-side image compression
  let compressed;
  try {
    compressed = await compressImageFile(file, 2560, 0.85);
  } catch (e) {
    console.warn('Canvas compression failed, falling back to raw file reading:', e);
    // Fallback: raw image reader with auto-detection
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

    const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
      const i = new Image();
      i.onload = () => resolve({ width: i.width, height: i.height });
      i.onerror = () => resolve({ width: 1200, height: 800 });
      i.src = rawDataUrl;
    });

    compressed = {
      dataUrl: rawDataUrl,
      width: dimensions.width,
      height: dimensions.height,
      orientation: detectImageOrientation(dimensions.width, dimensions.height),
    };
  }

  if (onProgress) onProgress(50);

  // Step 2: Server API upload
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileData: compressed.dataUrl,
        fileName: file.name,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.url) {
        if (onProgress) onProgress(100);
        return {
          url: result.url,
          orientation: compressed.orientation,
          width: compressed.width,
          height: compressed.height,
          filename: result.filename || file.name,
        };
      }
    }
  } catch (err) {
    console.warn('Server endpoint /api/upload unavailable or timed out, using compressed client URL:', err);
  }

  // Step 3: Local Storage / Standalone mode fallback - compress to ultra-light thumbnail (< 150KB)
  if (onProgress) onProgress(80);
  let fallbackDataUrl = compressed.dataUrl;
  
  if (compressed.dataUrl.length > 300000) {
    try {
      const lightweight = await compressImageFile(file, 1400, 0.70);
      fallbackDataUrl = lightweight.dataUrl;
    } catch {
      // Keep compressed dataUrl
    }
  }

  if (onProgress) onProgress(100);

  return {
    url: fallbackDataUrl,
    orientation: compressed.orientation,
    width: compressed.width,
    height: compressed.height,
    filename: file.name,
  };
};
