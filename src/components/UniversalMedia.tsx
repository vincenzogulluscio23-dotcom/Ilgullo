import React from 'react';

export interface UniversalMediaProps {
  src: string;
  alt?: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

export const isVideoUrl = (url?: string): boolean => {
  if (!url) return false;
  if (url.startsWith('data:video/')) return true;
  return /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url) || url.includes('vimeo.com') || url.includes('youtube.com');
};

export const UniversalMedia: React.FC<UniversalMediaProps> = ({
  src,
  alt = '',
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  style,
  onClick,
  loading = 'lazy',
}) => {
  if (!src) return null;

  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        style={style}
        onClick={onClick}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      loading={loading}
      referrerPolicy="no-referrer"
    />
  );
};
