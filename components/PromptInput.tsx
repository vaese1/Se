
import React from 'react';
import { Icon } from './Icon';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-2 focus-within:ring-2 focus-within:ring-cyan-500 transition-shadow duration-300">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g., A cyberpunk cityscape at night with flying cars..."
          className="w-full h-28 bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none p-4"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center p-2">
            <p className="text-xs text-gray-500">
                Press <kbd className="font-sans border bg-gray-700 border-gray-600 rounded px-1.5 py-0.5">Ctrl</kbd> + <kbd className="font-sans border bg-gray-700 border-gray-600 rounded px-1.5 py-0.5">Enter</kbd> to submit
            </p>
            <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform duration-200"
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
                </>
            ) : (
                <>
                <Icon name="sparkles" className="w-5 h-5 mr-2" />
                Generate
                </>
            )}
            </button>
        </div>
      </div>
    </div>
  );
};
