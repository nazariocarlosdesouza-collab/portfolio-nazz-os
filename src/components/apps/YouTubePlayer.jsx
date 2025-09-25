// src/components/apps/YouTubePlayer.jsx - SINCRONIZADO COM A LISTA DE VÍDEOS FINAL
import React, { useState } from 'react';
import { PlaySquare, Youtube } from 'lucide-react';

// --- LISTA DE VÍDEOS FINAL E DEFINITIVA ---
const videos = [
  { id: 'eIiJEEwkNv4', title: 'Icarus Survival -Minério Infinito' },
  { id: '7AivkaAIjxU', title: 'Icarus Survival -Top 5 Cavernas' },
  { id: 'aqsSlUB42JU', title: 'Icarus Survival - Minerio Profundo' },
  { id: 'eIiJEEwkNv4', title: 'Icarus Survival - Minerios Infinitos' },
];
// ------------------------------------------

const YouTubePlayer = () => {
  const [activeVideoId, setActiveVideoId] = useState(videos[0].id);

  return (
    <div className="bg-gray-900 h-full w-full flex text-white overflow-hidden">
      
      <main className="flex-1 flex flex-col">
        <div className="w-full aspect-video bg-black">
          <iframe
            key={activeVideoId}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 bg-gray-800 border-t border-white/10">
          <h2 className="text-xl font-bold">
            {videos.find(v => v.id === activeVideoId)?.title || 'Vídeo Carregado'}
          </h2>
        </div>
      </main>

      <aside className="w-64 bg-gray-950/50 border-l border-white/10 flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
            <Youtube className="text-red-500" />
            <h3 className="font-bold text-lg">NazzGameplay</h3>
        </div>
        <ul>
          {videos.map((video, index) => (
            <li key={`${video.id}-${index}`}>
              <button 
                onClick={() => setActiveVideoId(video.id)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeVideoId === video.id ? 'bg-red-500/30' : 'hover:bg-white/10'
                }`}
              >
                <PlaySquare size={20} className={activeVideoId === video.id ? 'text-red-400' : 'text-gray-400'} />
                <span>{video.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default YouTubePlayer;