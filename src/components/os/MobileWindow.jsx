import React from 'react';
import { useStore } from '../../lib/store';

const MobileWindow = ({ appId, title, children }) => {
  const { closeWindow } = useStore();

  return (
    // Container principal em tela cheia com animação de fade-in
    <div className="absolute inset-0 bg-gray-800 z-50 flex flex-col animate-fade-in">
      {/* Cabeçalho do App */}
      <header className="w-full h-12 bg-gray-900 flex-shrink-0 flex items-center justify-between px-4">
        <h2 className="text-white font-semibold truncate">{title}</h2>
        <button 
          onClick={() => closeWindow(appId)}
          className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full text-white font-bold transform transition-transform active:scale-90"
        >
          X
        </button>
      </header>

      {/* Conteúdo do App */}
      <div className="w-full flex-grow overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default MobileWindow;