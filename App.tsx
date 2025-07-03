import React, { useState } from 'react';

export default function ColoringApp() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    'Gato astronauta no espaço',
    'Robô em uma floresta mágica',
    'Unicórnio tomando sorvete',
    'Dinossauro andando de skate'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);

     // 🔴 TAG PERSONALIZADA PARA O GTM// 
     window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'gerar_desenho',
  categoria: 'interacao',
  acao: 'clique_botao',
  label: prompt  // isso envia o texto que o usuário digitou
});

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setImage(`data:image/jpeg;base64,${data.image}`);
    } catch (err) {
      alert('Erro ao gerar imagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">🎨 Desenhe+</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Crie desenhos para colorir com ajuda de inteligência artificial. Inspire a criatividade!
      </p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: Um dinossauro de patins"
        className="w-full max-w-md rounded-xl border px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring focus:ring-yellow-300"
      />

      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        {suggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => setPrompt(sug)}
            className="bg-yellow-100 hover:bg-yellow-200 text-sm px-3 py-1 rounded-full shadow"
          >
            {sug}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full text-lg font-semibold"
      >
        {loading ? 'Gerando...' : 'Gerar desenho'}
      </button>

      {image && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <img src={image} alt="Desenho gerado" className="w-full max-w-md border rounded-xl" />
          <a
            href={image}
            download="desenho-para-colorir.jpg"
            className="bg-gray-800 text-white px-4 py-2 rounded-full"
          >
            Baixar desenho
          </a>
        </div>
      )}

      <footer className="mt-auto pt-12 text-sm text-gray-400">
        Feito com 💛 usando IA • Desenhe+ 2025
      </footer>
    </div>
  );
}
