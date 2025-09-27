// src/components/os/StartMenu.jsx
import React from 'react';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config';

const StartMenu = () => {
  const { openWindow, toggleStartMenu } = useStore();
  
  const menuApps = Object.values(appsConfig).filter(app => app.desktopIcon);

  const handleAppClick = (app) => {
    openWindow(app);
    toggleStartMenu();
  };

  return (
    // A CORREÇÃO ESTÁ AQUI:
    // Removemos 'left-1/2 -translate-x-1/2' para que o menu não se centralize horizontalmente.
    // Adicionamos 'left-4' para alinhá-lo com o início da barra de tarefas.
    <div 
      className="absolute bottom-14 left-4 w-[95vw] max-w-xl h-[70vh] max-h-[550px] bg-gray-800/70 backdrop-blur-2xl rounded-lg shadow-2xl p-6 flex flex-col z-40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Pesquisar aplicativos, configurações e documentos"
          className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-grow overflow-y-auto pr-2"> {/* Adicionado padding à direita para a barra de rolagem */}
        <h2 className="text-lg font-semibold text-white mb-4">Fixado</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
          {menuApps.map(app => (
            <div 
              key={app.id} 
              className="flex flex-col items-center justify-start text-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              onClick={() => handleAppClick(app)}
              title={app.title}
            >
              {React.cloneElement(app.desktopIcon, { className: 'w-10 h-10' })}
              <span className="text-white text-xs leading-tight">{app.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;