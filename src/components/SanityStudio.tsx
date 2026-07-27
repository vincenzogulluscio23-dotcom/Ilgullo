import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity/sanity.config';

export const SanityStudioPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#101112]">
      <Studio config={config} />
    </div>
  );
};

export default SanityStudioPage;
