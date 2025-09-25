// src/components/apps/FileExplorer.jsx - ATUALIZADO PARA USAR fileSystem.js
import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import NativeVideoPlayer from './NativeVideoPlayer';
import ImageViewer from './ImageViewer';
import TextViewer from './TextViewer';
import { appsConfig } from '../../lib/apps.config';
import { fileSystem } from '../../lib/fileSystem'; // 1. IMPORTAMOS O NOVO ARQUIVO
import whatsappIcon from '../../assets/icons/whatsapp.png';
import notepadIcon from '../../assets/icons/bloco-de-notas.png';

import myComputerIcon from '../../assets/icons/meu-computador.png';
import downloadsIcon from '../../assets/icons/downloads.png';
import documentsIcon from '../../assets/icons/documentos.png';
import imagesIcon from '../../assets/icons/imagens.png';
import musicIcon from '../../assets/icons/musica.png';
import videosIcon from '../../assets/icons/videos.png';
import trashIcon from '../../assets/icons/lixeira-cheia.png';

// 2. TODA A LISTA DE ARQUIVOS FOI REMOVIDA DAQUI

const FileExplorer = ({ initialView = 'root' }) => {
  const { openWindow } = useStore();
  const [currentView, setCurrentView] = useState(initialView);
  const desktopItems = [
    ...Object.values(appsConfig).filter(app => app.desktopIcon).map(app => ({ id: app.id, name: app.title, icon: React.cloneElement(app.desktopIcon, { className: 'w-12 h-12' }), action: () => openWindow(app), })),
    { id: 'whatsapp', name: 'Whatsapp', icon: <img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12" />, action: () => window.open('https://wa.me/5511968108594?text=Ol%C3%A1%20Naz%C3%A1rio%2C%20acabei%20de%20ver%20seu%20portfolio%2C%20podemos%20conversar%3F', '_blank'), }
  ];
  const handleOpenVideo = (video) => { openWindow({ id: `video-${video.path}`, title: video.name, content: <NativeVideoPlayer videoId={video.path} title={video.name} />, width: 800, height: 500, icon: <img src={videosIcon} alt="Vídeos" className="w-8 h-8" />, }); };
  const handleOpenImage = (image) => { openWindow({ id: `image-${image.path}`, title: image.name, content: <ImageViewer imageSrc={image.path} title={image.name} />, width: 700, height: 550, icon: <img src={imagesIcon} alt="Imagens" className="w-8 h-8" />, }); };
  const handleOpenNotepad = (doc) => { openWindow({ id: `doc-${doc.id}`, title: doc.name, content: <TextViewer textContent={doc.content} />, width: 600, height: 450, icon: <img src={notepadIcon} alt="Documento" className="w-8 h-8" />, }); };
  const sidebarItems = [
    { name: 'Área de Trabalho', icon: <img src={myComputerIcon} alt="Desktop" className="w-5 h-5" />, view: 'root' }, { name: 'Downloads', icon: <img src={downloadsIcon} alt="Downloads" className="w-5 h-5" />, view: 'downloads' }, { name: 'Documentos', icon: <img src={documentsIcon} alt="Documentos" className="w-5 h-5" />, view: 'documents' }, { name: 'Imagens', icon: <img src={imagesIcon} alt="Imagens" className="w-5 h-5" />, view: 'images' }, { name: 'Músicas', icon: <img src={musicIcon} alt="Músicas" className="w-5 h-5" />, view: 'music' }, { name: 'Vídeos', icon: <img src={videosIcon} alt="Vídeos" className="w-5 h-5" />, view: 'videos' }, { name: 'Lixeira', icon: <img src={trashIcon} alt="Lixeira" className="w-5 h-5" />, view: 'trash' },
  ];

  const renderContent = () => {
    const renderFileGrid = (files, onDoubleClickAction = null) => (
      <div className="flex-grow p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 content-start">
        {files.map((file, index) => (
          <div key={file.id ? `${file.id}-${index}` : `${file.path}-${index}`} className="flex flex-col items-center justify-start text-center gap-1 cursor-pointer group w-20" onDoubleClick={() => { if (file.action) { file.action(); } else if (onDoubleClickAction) { onDoubleClickAction(file); } else if (file.path !== '#') { window.open(file.path, '_blank'); } }}>
            <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-blue-500 rounded-lg p-1">
              {(() => {
                if (React.isValidElement(file.icon)) { return file.icon; }
                if (typeof file.icon === 'string') { return <img src={file.icon} alt={file.name} className="w-full h-full object-contain" />; }
                return <img src={file.path} alt={file.name} className="w-full h-full object-contain" />;
              })()}
            </div>
            <p className="text-xs text-gray-300 truncate group-hover:text-white w-full">{file.name}</p>
          </div>
        ))}
      </div>
    );
    // 3. AGORA USAMOS fileSystem.videos, fileSystem.downloads, etc.
    switch (currentView) {
      case 'root': return renderFileGrid(desktopItems);
      case 'videos': return renderFileGrid(fileSystem.videos, handleOpenVideo);
      case 'downloads': return renderFileGrid(fileSystem.downloads, handleOpenImage);
      case 'images': return renderFileGrid(fileSystem.images, handleOpenImage);
      case 'trash': return renderFileGrid(fileSystem.trash, handleOpenImage);
      case 'documents': return renderFileGrid(fileSystem.documents, handleOpenNotepad);
      default: return <div className="p-4"><p className="text-gray-400">Esta pasta está vazia.</p></div>;
    }
  };

  return (
    <div className="bg-[#1e1e1e] h-full w-full flex text-white font-sans text-sm">
      <aside className="w-48 bg-black/20 p-2 flex-shrink-0">
        <nav>
          <ul>
            {sidebarItems.map((item) => (<li key={item.name}><button onClick={() => setCurrentView(item.view)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${currentView === item.view ? 'bg-blue-500/30 text-white' : 'hover:bg-white/10 text-gray-300'}`}>{item.icon}<span>{item.name}</span></button></li>))}
          </ul>
        </nav>
      </aside>
      <main className="flex-grow flex flex-col border-l border-white/10">
        {renderContent()}
      </main>
    </div>
  );
};

export default FileExplorer;