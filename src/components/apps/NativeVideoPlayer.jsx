// src/components/apps/NativeVideoPlayer.jsx - COMPLETO
import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

// Este componente recebe o ID do vídeo como uma propriedade (prop)
const NativeVideoPlayer = ({ videoId, title }) => {
  return (
    <div className="bg-black h-full w-full flex flex-col text-white font-sans">
      {/* Área principal para o vídeo */}
      <div className="flex-grow w-full h-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Barra de controle FAKE para dar a aparência de um player nativo */}
      <div className="flex-shrink-0 h-10 bg-[#1e1e1e] border-t border-white/10 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-3">
          <Play size={16} />
          <Pause size={16} className="text-gray-500" />
          <div className="w-48 h-1 bg-gray-600 rounded-full">
            <div className="w-1/4 h-full bg-white rounded-full"></div>
          </div>
          <span>00:03 / 00:20</span>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 size={16} />
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default NativeVideoPlayer;