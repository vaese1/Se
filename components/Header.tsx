
import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <Icon name="logo" className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 py-2">
          Video Prompt Spark
        </h1>
      </div>
      <p className="mt-3 text-lg text-gray-400">
        Turn your simple ideas into stunning video prompts.
      </p>
    </header>
  );
};
