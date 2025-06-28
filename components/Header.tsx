
import React from 'react';
import { PencilIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="inline-block bg-violet-600 text-white p-4 rounded-full mb-4">
        <PencilIcon className="w-8 h-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
        Gerador de Desenhos para Colorir
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Escreva o que você quer desenhar e deixe a mágica acontecer. Perfeito para soltar a imaginação!
      </p>
    </header>
  );
};

export default Header;
