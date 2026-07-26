import React from 'react';

interface EditorialTextProps {
  text: string;
  className?: string;
  accentWords?: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const EditorialText: React.FC<EditorialTextProps> = ({
  text,
  className = '',
  accentWords = [],
  as = 'div'
}) => {
  const Component = as;

  if (!accentWords || accentWords.length === 0) {
    return <Component className={className}>{text}</Component>;
  }

  // Create regex pattern to match accent words (case insensitive)
  const pattern = new RegExp(`(${accentWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <Component className={className}>
      {parts.map((part, index) => {
        const isAccent = accentWords.some(
          w => w.toLowerCase() === part.toLowerCase()
        );

        if (isAccent) {
          return (
            <span
              key={index}
              className="font-serif italic font-normal text-[#F1F0EB] transition-colors duration-300"
            >
              {part}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </Component>
  );
};

export const SectionLabel: React.FC<{ label: string; number?: string; className?: string }> = ({
  label,
  number,
  className = ''
}) => (
  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#8D8D89] ${className}`}>
    {number && <span className="text-[#FF5A36] font-bold">{number} /</span>}
    <span>{label}</span>
  </div>
);

export const IssueBadge: React.FC<{ issue?: string; volume?: string; className?: string }> = ({
  issue = 'N° 04',
  volume = 'VOL. 2026',
  className = '',
}) => (
  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121214] border border-[#28282D] font-mono text-[10px] tracking-widest uppercase text-[#C9C7C1] ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-pulse"></span>
    <span className="text-[#8D8D89]">{volume}</span>
    <span className="text-[#28282D]">•</span>
    <span className="text-[#FF5A36] font-semibold">{issue}</span>
  </div>
);

export const CoordinatesTag: React.FC<{ location?: string; coords?: string; className?: string }> = ({
  location = 'BRESCIA, IT',
  coords = "45°32'N 10°02'E",
  className = '',
}) => (
  <div className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8D8D89] ${className}`}>
    <span className="text-[#FF5A36]">{coords}</span>
    <span className="text-[#28282D]">//</span>
    <span>{location}</span>
  </div>
);

export const EditorialSideNote: React.FC<{ noteNumber?: string; title?: string; children: React.ReactNode; className?: string }> = ({
  noteNumber = 'NOTE N° 01',
  title,
  children,
  className = '',
}) => (
  <div className={`p-4 rounded-xl bg-[#121214]/90 border border-[#28282D] backdrop-blur-sm relative space-y-2 ${className}`}>
    <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#FF5A36]">
      <span>[ {noteNumber} ]</span>
      <span className="text-[#8D8D89]">EDITORIAL OBSERVATION</span>
    </div>
    {title && <h4 className="font-serif italic text-sm text-[#F1F0EB]">{title}</h4>}
    <div className="font-sans text-xs text-[#C9C7C1] leading-relaxed text-pretty">{children}</div>
  </div>
);

export const EditorialPullQuote: React.FC<{ quote: string; author?: string; role?: string; className?: string }> = ({
  quote,
  author,
  role,
  className = '',
}) => (
  <div className={`my-8 py-6 px-6 sm:px-8 border-l-2 border-[#FF5A36] bg-[#121214]/60 rounded-r-2xl relative ${className}`}>
    <span className="font-serif text-5xl text-[#FF5A36]/20 leading-none absolute -top-2 left-4 select-none">“</span>
    <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F1F0EB] leading-snug relative z-10 mb-3">
      {quote}
    </blockquote>
    {(author || role) && (
      <div className="font-mono text-xs text-[#8D8D89] uppercase tracking-wider flex items-center gap-2">
        {author && <span className="text-[#FF5A36] font-semibold">{author}</span>}
        {author && role && <span>—</span>}
        {role && <span>{role}</span>}
      </div>
    )}
  </div>
);

export const EditorialMetadataBar: React.FC<{
  items: { label: string; value: string }[];
  className?: string;
}> = ({ items, className = '' }) => (
  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-6 rounded-2xl bg-[#121214]/80 border border-[#28282D] font-mono text-xs ${className}`}>
    {items.map((item, idx) => (
      <div key={idx} className="space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-[#8D8D89]">{item.label}</div>
        <div className="text-[#F1F0EB] font-sans font-medium text-xs sm:text-sm">{item.value}</div>
      </div>
    ))}
  </div>
);

