
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import { generateColoringPage } from './services/geminiService';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Por favor, digite uma descrição para o desenho.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateColoringPage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (e) {
      console.error(e);
      setError('Não foi possível gerar a imagem. Tente novamente mais tarde ou com uma descrição diferente.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
        <Header />
        <main>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ImageDisplay
            imageUrl={generatedImage}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
