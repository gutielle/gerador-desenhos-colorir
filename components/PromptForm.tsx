
import React from 'react';
import { SparklesIcon } from './Icons';

interface PromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: um gato fofo andando de skate"
          className="w-full p-4 pr-32 text-lg border-2 border-slate-300 rounded-full focus:ring-4 focus:ring-violet-300 focus:border-violet-500 outline-none transition-shadow duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-violet-600 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-violet-700 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Gerar</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
