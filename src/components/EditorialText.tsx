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
    {number && <span className="text-[#FF5A36]">{number} /</span>}
    <span>{label}</span>
  </div>
);
