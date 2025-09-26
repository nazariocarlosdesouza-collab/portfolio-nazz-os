// src/components/os/Desktop.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config.jsx';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import ParticlesWallpaper from './ParticlesWallpaper';
// A importação do Window não é mais necessária aqui
import whatsappIcon from '../../assets/icons/whatsapp.png';

const Desktop = () => {
  // Não precisamos mais do openWindows aqui
  const { openWindow, selectedIcon, setSelectedIcon, clearSelectedIcon } = useStore();
  const WHATSAPP_URL = 'https://wa.me/5511968108594?text=Ol%C3%A1%20Naz%C3%A1rio%2C%20acabei%20de%20ver%20seu%20portfolio%2C%20podemos%20conversar%3F';
  const desktopApps = Object.values(appsConfig).filter(app => app.desktopIcon);
  const [showIntroText, setShowIntroText] = useState(true);
  
  // A ref das constraints é movida para o App.jsx, que é o container real.
  // Mas podemos manter a 'main' para o layout dos ícones.

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroText(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParticlesWallpaper>
      <main 
        className="h-screen w-screen p-4 pb-16 overflow-hidden relative bg-transparent z-10"
        onClick={clearSelectedIcon}
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
              label={app.title} 
              icon={app.desktopIcon}
              onDoubleClick={() => openWindow(app)}
              onClick={() => setSelectedIcon(app.id)}
              isSelected={selectedIcon === app.id}
              textColor="text-white"
            />
          ))}
          <DesktopIcon
            label="Whatsapp"
            icon={<img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12 pointer-events-none" />}
            onDoubleClick={() => window.open(WHATSAPP_URL, '_blank')}
            onClick={() => setSelectedIcon('whatsapp')}
            isSelected={selectedIcon === 'whatsapp'}
            textColor="text-white"
          />
        </div>
        
        {/* A RENDERIZAÇÃO DAS JANELAS FOI REMOVIDA DAQUI. */}
      </main>
      <Taskbar />
    </ParticlesWallpaper>
  );
};

export default Desktop;