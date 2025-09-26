// src/components/apps/ProjectsFolder.jsx
import React from 'react';
import DesktopIcon from '../os/DesktopIcon';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config';

import chromeIcon from '../../assets/icons/chrome.png';
import curriculoIcon from '../../assets/icons/curriculo.png';

import { ArrowLeft, ArrowRight, ArrowUp, Search, LayoutGrid, List } from 'lucide-react';

const ProjectsFolder = () => {
  const { openWindow } = useStore();

  const handleOpenBrowser = () => {
    openWindow(appsConfig.chrome); 
  };

  const handleOpenCurriculo = () => {
    window.open('/curriculo.pdf', '_blank');
  };

  const folderItems = [
    {
      id: 'portfolio',
      label: "Portifolio Nazário",
      icon: <img src={chromeIcon} alt="Navegador" className="w-12 h-12" />,
      onDoubleClick: handleOpenBrowser,
    },
    {
      id: 'curriculo',
      label: "Currículo",
      icon: <img src={curriculoIcon} alt="Currículo" className="w-12 h-12" />,
      onDoubleClick: handleOpenCurriculo,
    }
  ];

  return (
    <div className="bg-[#1e1e1e] h-full w-full flex flex-col text-white font-sans text-sm">
      
      <header className="flex-shrink-0 flex items-center justify-between p-2 border-b border-white/10 bg-black/10">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-white/10 text-gray-400"><ArrowLeft size={18} /></button>
          <button className="p-1 rounded hover:bg-white/10 text-gray-400"><ArrowRight size={18} /></button>
          <button className="p-1 rounded hover:bg-white/10 text-gray-300"><ArrowUp size={18} /></button>
        </div>
        <div className="flex-grow mx-4">
          {/* A CORREÇÃO ESTÁ AQUI: Envolvemos o texto em uma expressão JavaScript para que o '>' seja tratado como texto. */}
          <div className="bg-black/20 rounded-md px-3 py-1 text-gray-300 border border-white/10">
            {'Este Computador > Projetos'}
          </div>
        </div>
        <div className="flex items-center bg-black/20 border border-white/10 rounded-md p-1">
          <Search size={14} className="text-gray-400 mx-1" />
          <input type="text" placeholder="Pesquisar" className="bg-transparent text-xs focus:outline-none w-24" />
        </div>
      </header>

      <main className="flex-grow p-4 flex items-start justify-start overflow-y-auto">
        {folderItems.map(item => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            icon={item.icon}
            onDoubleClick={item.onDoubleClick}
          />
        ))}
      </main>

      <footer className="flex-shrink-0 flex items-center justify-between px-4 py-1 border-t border-white/10 bg-black/10 text-gray-400">
        <div>{folderItems.length} itens</div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded bg-blue-500/30 text-white"><LayoutGrid size={16} /></button>
          <button className="p-1 rounded hover:bg-white/10"><List size={16} /></button>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsFolder;