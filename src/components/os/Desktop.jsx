// src/components/os/Desktop.jsx - GATILHO FINAL E INFALÍVEL
import React, { useState, useEffect } from 'react';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config.jsx';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import ParticlesWallpaper from './ParticlesWallpaper';
import StartMenu from './StartMenu';
import whatsappIcon from '../../assets/icons/whatsapp.png';

const Desktop = ({ onTriggerBsod }) => {
  const { openWindow, selectedIcon, setSelectedIcon, clearSelectedIcon, isStartMenuOpen, closeStartMenu } = useStore();
  const WHATSAPP_URL = 'https://wa.me/5511968108594?text=Ol%C3%A1%20Naz%C3%A1rio%2C%20acabei%20de%20ver%20seu%20portfolio%2C%20podemos%20conversar%3F';
  const desktopApps = Object.values(appsConfig).filter(app => app.desktopIcon);
  const [showIntroText, setShowIntroText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroText(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDesktopClick = () => {
    clearSelectedIcon();
    closeStartMenu();
  };

  // --- LÓGICA DE CONTROLE CENTRALIZADA ---
  const handleIconDragStart = (e, iconId) => {
    // REGRA NÚMERO 1: O 'Meu Computador' é intocável.
    if (iconId === 'my-computer') {
      e.preventDefault(); // Impede a ação padrão de arrastar.
      onTriggerBsod();    // Aciona a consequência.
      return;             // Fim da operação.
    }

    // REGRA NÚMERO 2: Para todos os outros, permitir o arraste (funcionalidade futura).
    // Esta parte não faz nada visualmente por enquanto, mas prepara o terreno.
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', iconId);
  };

  return (
    <ParticlesWallpaper>
      <main
        className="h-screen w-screen p-4 pb-16 overflow-hidden relative bg-transparent z-10"
        onClick={handleDesktopClick}
      >
        {showIntroText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none animate-pulse">
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-white/80 tracking-widest text-center">PORTFÓLIO INTERATIVO</h1>
            <p className="text-xl md:text-2xl font-sans text-white/60 tracking-wider mt-2">IMERSIVO</p>
          </div>
        )}

        <div className="h-full w-full flex flex-col items-start flex-wrap content-start">
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.title}
              icon={app.desktopIcon}
              onDoubleClick={() => openWindow(app)}
              onClick={() => setSelectedIcon(app.id)}
              isSelected={selectedIcon === app.id}
              textColor="text-white"
              onDragStart={handleIconDragStart} // A função de controle é passada para TODOS os ícones.
            />
          ))}

          <DesktopIcon
            id="whatsapp"
            label="Whatsapp"
            icon={<img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12 pointer-events-none" />}
            onDoubleClick={() => window.open(WHATSAPP_URL, '_blank')}
            onClick={() => setSelectedIcon('whatsapp')}
            isSelected={selectedIcon === 'whatsapp'}
            textColor="text-white"
            onDragStart={handleIconDragStart} // A função de controle também se aplica aqui.
          />
        </div>

        {isStartMenuOpen && <StartMenu />}
      </main>
      <Taskbar />
    </ParticlesWallpaper>
  );
};

export default Desktop;