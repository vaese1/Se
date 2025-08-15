
import React, { useState, useCallback } from 'react';
import { Icon } from './Icon';

interface PromptCardProps {
  promptText: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [promptText]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:border-cyan-500/50 transition-colors duration-300 transform hover:-translate-y-1">
      <p className="text-gray-300 text-base leading-relaxed">{promptText}</p>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCopy}
          className="flex items-center text-sm font-medium px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
        >
          {copied ? (
            <>
              <Icon name="check" className="w-4 h-4 mr-2 text-green-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Icon name="copy" className="w-4 h-4 mr-2" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
