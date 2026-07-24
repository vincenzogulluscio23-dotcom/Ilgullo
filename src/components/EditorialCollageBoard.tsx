import React from 'react';
import { FrameItem } from '../types';
import { OverlappingTabletopCollage, CollagePhotoItem } from './OverlappingTabletopCollage';

interface EditorialCollageBoardProps {
  frames: FrameItem[];
  onSelectFrame: (index: number) => void;
  theme?: 'light' | 'dark';
}

export const EditorialCollageBoard: React.FC<EditorialCollageBoardProps> = ({
  frames,
  onSelectFrame,
  theme = 'light',
}) => {
  const collageItems: CollagePhotoItem[] = frames.map((f) => ({
    id: f.id,
    title: f.title || 'Frammento visivo',
    subtitle: `${f.location || ''} · ${f.date || ''}`,
    category: f.category,
    image: f.image,
    type: 'frame',
    number: f.number,
    location: f.location,
  }));

  const handleItemClick = (_item: CollagePhotoItem, index: number) => {
    onSelectFrame(index);
  };

  return (
    <OverlappingTabletopCollage
      items={collageItems}
      onItemClick={handleItemClick}
      theme={theme}
    />
  );
};
