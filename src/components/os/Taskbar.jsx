// src/components/os/Taskbar.jsx
import React from 'react';
import Clock from './Clock';
import { useStore } from '../../lib/store';

import startMenuIcon from '../../assets/icons/menu-iniciar.png';
import searchIcon from '../../assets/icons/lupa-pesquisar-barra-de-tarefas.png';

const Taskbar = () => {
  // 1. Pegamos a nova função 'toggleStartMenu'
  const { openWindows, focusWindow, zIndexCounter, toggleStartMenu } = useStore();

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-gray-800 bg-opacity-70 backdrop-blur-lg flex items-center justify-between px-4 z-50 border-t border-white/20">
      <div className="flex items-center gap-2">
        {/* 2. Adicionamos o 'onClick' que dispara a função */}
        <button 
          onClick={toggleStartMenu}
          className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-md transition-all duration-200"
          title="Menu Iniciar"
        >
          <img src={startMenuIcon} alt="Start Menu" className="w-6 h-6" />
        </button>

        <button
          className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-md transition-all duration-200"
          title="Pesquisar"
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </button>

        <div id="open-apps-tray" className="flex items-center gap-2">
          {openWindows.map((win) => (
            <button
              key={win.id}
              onClick={() => focusWindow(win.id)}
              className={`h-9 px-2 flex items-center gap-2 rounded-md transition-colors ${
                win.zIndex === zIndexCounter ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              title={win.title}
            >
              {/* Usamos o 'windowIcon' se existir, senão o 'icon', para consistência */}
              {win.windowIcon || win.icon}
              <span className="text-white text-sm hidden sm:block">{win.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center pr-2">
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;