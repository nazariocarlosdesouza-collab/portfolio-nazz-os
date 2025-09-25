// src/components/apps/MeetWindow.jsx - COMPLETO
import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, UserSquare2 } from 'lucide-react';

// --- CONFIGURAÇÃO ---
// Coloque aqui o link do seu vídeo de apresentação.
// Pode ser um link do YouTube Embed ou um arquivo de vídeo (.mp4, .webm) que você hospedará.
// Para este exemplo, usaremos um vídeo placeholder do YouTube.
const VIDEO_SRC = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&rel=0";
// --------------------

const MeetWindow = () => {
  return (
    // Container principal com fundo escuro característico
    <div className="bg-[#202124] h-full w-full flex flex-col font-sans">

      {/* Área Principal do Vídeo */}
      <main className="flex-1 flex items-center justify-center p-4 relative">
        {/* Iframe que vai rodar o vídeo */}
        <iframe
          src={VIDEO_SRC}
          className="w-full h-full border-none"
          title="Apresentação Pessoal"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Overlay com o seu nome, como no Meet */}
        <div className="absolute bottom-6 left-6 bg-black/50 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm">
          <UserSquare2 size={18} />
          <span>Carlos Nazario (Apresentando)</span>
        </div>
      </main>

      {/* Barra de Controles Inferior (Fake) */}
      <footer className="flex-shrink-0 h-20 bg-[#202124] flex items-center justify-center gap-4 border-t border-white/10">
        {/* Botão de Microfone (desativado) */}
        <button className="bg-gray-600/70 p-4 rounded-full cursor-not-allowed">
          <MicOff className="text-white" />
        </button>

        {/* Botão de Câmera (desativado) */}
        <button className="bg-gray-600/70 p-4 rounded-full cursor-not-allowed">
          <VideoOff className="text-white" />
        </button>

        {/* Botão de Desligar (funciona para fechar a janela) */}
        <button 
          className="bg-red-500 p-4 rounded-full hover:bg-red-600 transition-colors"
          title="Sair da chamada (Fechar)"
          // Este onClick será tratado pelo botão de fechar da janela principal,
          // mas o deixamos aqui para simular a funcionalidade.
        >
          <PhoneOff className="text-white" />
        </button>
      </footer>
    </div>
  );
};

export default MeetWindow;