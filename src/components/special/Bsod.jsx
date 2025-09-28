// src/components/special/Bsod.jsx

import React, { useEffect } from 'react';

const Bsod = ({ onRestart }) => {
  useEffect(() => {
    // Função para lidar com o pressionamento de tecla
    const handleKeyPress = (e) => {
      // Impede que a tecla faça sua ação padrão (como rolar a página)
      e.preventDefault();
      // Chama a função de restart passada via props
      onRestart();
    };

    // Adiciona o event listener quando o componente monta
    window.addEventListener('keydown', handleKeyPress);

    // Função de limpeza: remove o event listener quando o componente desmonta
    // Isso é crucial para evitar memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onRestart]); // O useEffect depende da função onRestart

  return (
    <div 
      className="fixed inset-0 bg-[#0000AA] text-white font-mono flex items-center justify-center p-8 z-[9999]"
      // A font-mono dará a aparência de terminal
      // O z-index altíssimo garante que ele fique na frente de tudo
    >
      <div className="w-full max-w-4xl">
        <p className="text-center text-2xl bg-white text-[#0000AA] px-4 py-1 mb-8 w-fit mx-auto">NAZZ OS</p>
        
        <p className="mb-4">A fatal exception has occurred at 0x0C4R10S in module NAZZ_OS.EXE.</p>
        <p className="mb-8">The current application will be terminated.</p>
        
        <ul className="list-disc list-inside mb-8 space-y-2">
          <li>Press any key to restart your browsing experience.</li>
          <li>You tried to delete 'Meu Computador'. This is highly illogical.</li>
          <li>The system kernel has entered a state of existential crisis.</li>
          <li>All your files are safe. Probably.</li>
          <li>Maybe next time, just click on the projects, okay?</li>
        </ul>
        
        <p>Press any key to continue<span className="animate-pulse">_</span></p>
      </div>
    </div>
  );
};

export default Bsod;