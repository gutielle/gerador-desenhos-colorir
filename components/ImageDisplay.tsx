
import React from 'react';
import { DownloadIcon } from './Icons';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}
  
const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, prompt }) => {
  const downloadImage = () => {
    if (!imageUrl) return;
  
    const link = document.createElement('a');
    const fileName = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'desenho_para_colorir';
    link.href = imageUrl;
    link.download = `${fileName}.jpeg`;
    document.body.appendChild(link);

      window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'baixar_desenho',
    categoria: 'interacao',
    acao: 'clique_botao_download',
    label: prompt
  });
  
    link.click();
    document.body.removeChild(link);

  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-500">
      {isLoading && (
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold">Criando sua obra de arte...</p>
          <p className="text-slate-500">Isso pode levar alguns segundos.</p>
        </div>
      )}
      
      {error && !isLoading && (
         <div className="text-red-600 bg-red-100 p-4 rounded-lg">
           <p className="font-bold">Ocorreu um erro</p>
           <p>{error}</p>
         </div>
      )}

      {!isLoading && !error && !imageUrl && (
        <div className="text-slate-500">
          <p className="text-xl font-medium">Seu desenho aparecerá aqui.</p>
          <p>Use a caixa de texto acima para começar.</p>
        </div>
      )}
      
      {imageUrl && !isLoading && (
        <div className="flex flex-col items-center gap-6 w-full animate-fade-in">
           <img 
             src={imageUrl} 
             alt={`Desenho para colorir de: ${prompt}`} 
             className="max-w-full max-h-[60vh] object-contain rounded-lg border-2 border-slate-200"
           />
           <button
            onClick={downloadImage}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all duration-300 disabled:bg-slate-400 transform hover:scale-105 active:scale-100"
           >
             <DownloadIcon className="w-6 h-6" />
             <span>Baixar Desenho</span>
           </button>
        </div>
      )}
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
       `}</style>
    </div>
  );
};

export default ImageDisplay;
