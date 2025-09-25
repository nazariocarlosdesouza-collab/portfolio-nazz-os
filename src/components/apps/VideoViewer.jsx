import React, { useState } from 'react';
import { fileSystem } from '../../lib/fileSystem';
import NativeVideoPlayer from './NativeVideoPlayer';

const VideoViewer = () => {
  const allVideos = fileSystem.videos;
  // Inicia o estado com o primeiro vídeo da lista
  const [selectedVideo, setSelectedVideo] = useState(allVideos[0]);

  return (
    <div className="bg-gray-900 h-full w-full flex flex-col text-white">
      {/* Player Principal */}
      <div className="w-full aspect-video bg-black flex-shrink-0">
        {/* Usamos o NativeVideoPlayer que já tínhamos, passando o ID do vídeo selecionado */}
        <NativeVideoPlayer videoId={selectedVideo.path} title={selectedVideo.name} />
      </div>

      {/* Lista de Vídeos para Seleção */}
      <div className="flex-grow w-full bg-gray-800 p-2 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {allVideos.map((video, index) => (
            <li
              key={`${video.path}-${index}`}
              onClick={() => setSelectedVideo(video)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                selectedVideo.path === video.path && selectedVideo.name === video.name
                  ? 'bg-blue-500/50' // Estilo para o vídeo selecionado
                  : 'hover:bg-white/10'
              }`}
            >
              <img src={video.icon} alt={video.name} className="w-24 h-14 object-cover rounded-md flex-shrink-0" />
              <p className="text-sm font-semibold">{video.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoViewer;