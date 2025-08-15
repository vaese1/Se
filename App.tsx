
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { PromptCard } from './components/PromptCard';
import { Loader } from './components/Loader';
import { generateVideoPrompts } from './services/geminiService';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompts = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter a video idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrompts([]);

    try {
      const generatedPrompts = await generateVideoPrompts(idea);
      setPrompts(generatedPrompts);
    } catch (err) {
      setError('Failed to generate prompts. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [idea]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8">
          <PromptInput
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onSubmit={handleGeneratePrompts}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center">
              <Icon name="error" className="w-5 h-5 mr-3" />
              <span>{error}</span>
            </div>
          )}

          {isLoading && <Loader />}

          {!isLoading && prompts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center text-gray-300 mb-6">Generated Prompts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt, index) => (
                  <PromptCard key={index} promptText={prompt} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && prompts.length === 0 && !error && (
             <div className="text-center mt-20 text-gray-500">
                <Icon name="sparkles" className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Your generated prompts will appear here.</p>
                <p className="text-sm opacity-70">Describe your vision and let the AI do the heavy lifting.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
