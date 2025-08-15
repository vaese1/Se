
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center mt-20">
    <div className="relative w-16 h-16">
        <div className="absolute border-4 border-t-4 border-gray-700 border-t-cyan-500 rounded-full w-full h-full animate-spin"></div>
    </div>
    <p className="mt-4 text-lg text-gray-400">Generating creative prompts...</p>
    <p className="text-sm text-gray-500">The AI is warming up its imagination.</p>
  </div>
);
