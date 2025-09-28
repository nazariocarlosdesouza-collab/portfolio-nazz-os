// src/components/apps/MeetWindow.jsx - VERSÃO FINAL E REFINADA
import React from 'react';
import { MicOff, VideoOff, PhoneOff, UserSquare2 } from 'lucide-react';

// Adicionado '&showinfo=0' para uma aparência mais limpa, removendo o título do YouTube de dentro do vídeo.
const VIDEO_SRC = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&rel=0&showinfo=0";

const MeetWindow = () => {
  return (
    // Container principal com a cor de fundo correta e layout flexível.
    // O overflow-hidden previne barras de rolagem indesejadas.
    <div className="bg-[#202124] h-full w-full flex flex-col font-sans overflow-hidden">

      {/* Área Principal do Vídeo - 'flex-1' faz ocupar todo o espaço e bg-black garante que não haja flash de cor */}
      <main className="flex-1 flex items-center justify-center p-0 relative bg-black">
        {/* Iframe que roda o vídeo, preenchendo toda a área da 'main' */}
        <iframe
          src={VIDEO_SRC}
          className="w-full h-full border-none"
          title="Apresentação Pessoal"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Overlay com o nome, posicionado sobre o vídeo. Adicionado 'select-none' para não ser selecionável. */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm select-none">
          <UserSquare2 size={18} />
          <span>Carlos Nazario (Apresentando)</span>
        </div>
      </main>

      {/* Barra de Controles Inferior - Altura fixa e alinhamento perfeito */}
      <footer className="w-full h-[88px] bg-[#202124] flex items-center justify-center gap-4">
        {/* Botão de Microfone (Mudo) */}
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors" title="Microfone (desativado)">
          <MicOff className="text-white" size={24} />
        </button>

        {/* Botão de Câmera (Desligada) */}
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors" title="Câmera (desativada)">
          <VideoOff className="text-white" size={24} />
        </button>

        {/* Botão de Desligar (Vermelho) */}
        <button 
          className="bg-red-500 hover:bg-red-600 p-4 rounded-full transition-colors"
          title="Sair da chamada"
        >
          <PhoneOff className="text-white" size={24} />
        </button>
      </footer>
    </div>
  );
};

export default MeetWindow;