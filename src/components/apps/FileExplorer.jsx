// src/components/apps/FileExplorer.jsx
import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import NativeVideoPlayer from './NativeVideoPlayer';
import ImageViewer from './ImageViewer';
import TextViewer from './TextViewer';
import { appsConfig } from '../../lib/apps.config';
import { fileSystem } from '../../lib/fileSystem';
import whatsappIcon from '../../assets/icons/whatsapp.png';

// --- Ícones ---
import myComputerIcon from '../../assets/icons/meu-computador.png';
import downloadsIcon from '../../assets/icons/downloads.png';
import documentsIcon from '../../assets/icons/documentos.png';
import imagesIcon from '../../assets/icons/imagens.png';
import musicIcon from '../../assets/icons/musica.png';
import videosIcon from '../../assets/icons/videos.png';
import trashIcon from '../../assets/icons/lixeira-cheia.png';
import projectsIcon from '../../assets/icons/pastas.png';

// --- Ícones para a UI ---
import { ArrowLeft, ArrowRight, ArrowUp, Search, LayoutGrid, List } from 'lucide-react';

const FileExplorer = ({ initialView = 'root' }) => {
  const { openWindow } = useStore();
  const [currentView, setCurrentView] = useState(initialView);
  
  const desktopItems = [
    ...Object.values(appsConfig).filter(app => app.desktopIcon).map(app => ({ id: app.id, name: app.title, icon: React.cloneElement(app.desktopIcon, { className: 'w-12 h-12' }), action: () => openWindow(app), })),
    { id: 'whatsapp', name: 'Whatsapp', icon: <img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12" />, action: () => window.open('https://wa.me/5511968108594?text=Ol%C3%A1%20Naz%C3%A1rio%2C%20acabei%20de%20ver%20seu%20portfolio%2C%20podemos%20conversar%3F', '_blank'), }
  ];

  const handleOpenVideo = (video) => { openWindow({ id: `video-${video.path}`, title: video.name, content: <NativeVideoPlayer videoId={video.path} title={video.name} />, width: 800, height: 500, desktopIcon: true }); };
  const handleOpenImage = (image) => { openWindow({ id: `image-${image.path}`, title: image.name, content: <ImageViewer imageSrc={image.path} title={image.name} />, width: 700, height: 550, desktopIcon: true }); };
  const handleOpenNotepad = (doc) => { openWindow({ id: `doc-${doc.id}`, title: doc.name, content: <TextViewer textContent={doc.content} />, width: 600, height: 450, desktopIcon: true }); };
  
  const sidebarItems = [
    { name: 'Área de Trabalho', icon: <img src={myComputerIcon} alt="Desktop" className="w-5 h-5" />, view: 'root' },
    { name: 'Projetos', icon: <img src={projectsIcon} alt="Projetos" className="w-5 h-5" />, view: 'projects' },
    { name: 'Downloads', icon: <img src={downloadsIcon} alt="Downloads" className="w-5 h-5" />, view: 'downloads' },
    { name: 'Documentos', icon: <img src={documentsIcon} alt="Documentos" className="w-5 h-5" />, view: 'documents' },
    { name: 'Imagens', icon: <img src={imagesIcon} alt="Imagens" className="w-5 h-5" />, view: 'images' },
    { name: 'Vídeos', icon: <img src={videosIcon} alt="Vídeos" className="w-5 h-5" />, view: 'videos' },
    { name: 'Lixeira', icon: <img src={trashIcon} alt="Lixeira" className="w-5 h-5" />, view: 'trash' },
  ];

  const handleFileDoubleClick = (file) => {
    if (file.action) {
      file.action();
      return;
    }
    // A LÓGICA ATUALIZADA RECONHECE O NOVO 'actionType'
    switch (file.actionType) {
      case 'openApp':
        openWindow(appsConfig[file.appId]);
        break;
      case 'openLink':
        window.open(file.url, '_blank');
        break;
      case 'openTextViewer': // NOVO CASO
        handleOpenNotepad(file); // Reutilizamos a função que já existe
        break;
      default:
        const { onDoubleClick: defaultAction } = getCurrentViewData();
        if (defaultAction) {
          defaultAction(file);
        }
        break;
    }
  };
  
  const getCurrentViewData = () => {
    const viewMap = {
      root: { files: desktopItems, name: 'Área de Trabalho' },
      projects: { files: fileSystem.projects, name: 'Projetos' },
      videos: { files: fileSystem.videos, name: 'Vídeos', onDoubleClick: handleOpenVideo },
      downloads: { files: fileSystem.downloads, name: 'Downloads', onDoubleClick: handleOpenImage },
      images: { files: fileSystem.images, name: 'Imagens', onDoubleClick: handleOpenImage },
      trash: { files: fileSystem.trash, name: 'Lixeira', onDoubleClick: handleOpenImage },
      documents: { files: fileSystem.documents, name: 'Documentos', onDoubleClick: handleOpenNotepad },
    };
    return viewMap[currentView] || { files: [], name: 'Pasta Vazia', onDoubleClick: null };
  };

  const { files, name: currentFolderName } = getCurrentViewData();

  return (
    <div className="bg-[#1e1e1e] h-full w-full flex text-white font-sans text-sm">
      <aside className="w-48 bg-black/20 p-2 flex-shrink-0">
        <nav>
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button onClick={() => setCurrentView(item.view)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${currentView === item.view ? 'bg-blue-500/30 text-white' : 'hover:bg-white/10 text-gray-300'}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-grow flex flex-col border-l border-white/10">
        <header className="flex-shrink-0 flex items-center justify-between p-2 border-b border-white/10 bg-black/10">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-white/10 text-gray-400"><ArrowLeft size={18} /></button>
            <button className="p-1 rounded hover:bg-white/10 text-gray-400"><ArrowRight size={18} /></button>
            <button className="p-1 rounded hover:bg-white/10 text-gray-300"><ArrowUp size={18} /></button>
          </div>
          <div className="flex-grow mx-4">
            <div className="bg-black/20 rounded-md px-3 py-1 text-gray-300 border border-white/10">
              {'Este Computador > ' + currentFolderName}
            </div>
          </div>
          <div className="flex items-center bg-black/20 border border-white/10 rounded-md p-1">
            <Search size={14} className="text-gray-400 mx-1" />
            <input type="text" placeholder="Pesquisar" className="bg-transparent text-xs focus:outline-none w-24" />
          </div>
        </header>
        <div className="flex-grow p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 content-start">
          {files.map((file, index) => (
            <div 
              key={file.id ? `${file.id}-${index}` : `${file.path}-${index}`} 
              className="flex flex-col items-center justify-start text-center gap-1 cursor-pointer group w-24" 
              onDoubleClick={() => handleFileDoubleClick(file)}
            >
              <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-blue-500 rounded-lg p-1">
                {(() => {
                  if (React.isValidElement(file.icon)) return file.icon;
                  if (typeof file.icon === 'string') return <img src={file.icon} alt={file.name} className="w-full h-full object-contain" />;
                  return <img src={file.path} alt={file.name} className="w-full h-full object-contain" />;
                })()}
              </div>
              <p className="text-xs text-gray-300 truncate group-hover:text-white w-full">{file.name}</p>
            </div>
          ))}
        </div>
        <footer className="flex-shrink-0 flex items-center justify-between px-4 py-1 border-t border-white/10 bg-black/10 text-gray-400">
          <div>{files.length} itens</div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded bg-blue-500/30 text-white"><LayoutGrid size={16} /></button>
            <button className="p-1 rounded hover:bg-white/10"><List size={16} /></button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FileExplorer;