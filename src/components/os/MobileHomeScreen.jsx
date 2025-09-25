import React from 'react';
import ParticlesWallpaper from './ParticlesWallpaper';
import Clock from './Clock';
import MobileIcon from './MobileIcon';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config';
import googleMobileIcon from '../../assets/icons-mobile/google-mobile.png'; // 1. IMPORTAMOS O ÍCONE DO GOOGLE

const MobileHomeScreen = () => {
  const { openWindow } = useStore();
  const mobileApps = Object.values(appsConfig).filter(app => app.mobileIcon);

  const handleIconClick = (app) => {
    if (app.actionType === 'link') {
      window.open(app.url, '_blank');
    } else {
      openWindow(app);
    }
  };

  return (
    <ParticlesWallpaper>
      <main className="h-screen w-screen flex flex-col relative bg-transparent text-white font-sans">
        {/* Barra de Status Superior */}
        <div className="w-full h-8 px-4 flex justify-between items-center bg-black/20 backdrop-blur-sm z-10">
          <span className="font-semibold text-sm">
            <Clock />
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">LTE</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.556A11.111 11.111 0 014.444 4.444m9.112 12.112a11.111 11.111 0 00-3.667-12.112M12 20c.556 0 1.11-.044 1.667-.133m-3.334 0A13.333 13.333 0 014 8" />
            </svg>
            <span className="text-xs">95%</span>
          </div>
        </div>

        {/* --- 2. NOVA BARRA DE PESQUISA --- */}
        <div className="px-4 pt-6 pb-2">
          <div className="w-full h-12 bg-gray-200/90 rounded-full flex items-center px-4 shadow-md backdrop-blur-sm">
            <img src={googleMobileIcon} alt="Google" className="h-7 w-7" />
            <span className="text-gray-700 ml-4 text-lg">Pesquisar...</span>
            <div className="flex-grow" /> {/* Espaçador */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
          </div>
        </div>

        {/* Área Principal com a grade de ícones */}
        <div className="flex-grow p-4"> {/* 3. Padding superior da grade ajustado */}
          <div className="grid grid-cols-4 gap-y-4 justify-items-center">
            {mobileApps.map((app) => (
              <MobileIcon
                key={app.id}
                label={app.title}
                icon={app.mobileIcon}
                onClick={() => handleIconClick(app)}
              />
            ))}
          </div>
        </div>

        {/* Dock de Aplicativos (Barra Inferior) */}
        <div className="w-full h-20 px-4 flex justify-around items-center bg-black/20 backdrop-blur-sm z-10">
          {/* Ícones fixos aqui */}
        </div>
      </main>
    </ParticlesWallpaper>
  );
};

export default MobileHomeScreen;