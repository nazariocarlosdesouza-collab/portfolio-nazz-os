// src/App.jsx
import React, { useRef, useEffect } from 'react';
import { useStore } from './lib/store';
import { useIsMobile } from './lib/useIsMobile';
import BootScreen from './components/os/BootScreen';
import Desktop from './components/os/Desktop';
import MobileHomeScreen from './components/os/MobileHomeScreen';
import Window from './components/os/Window';
import MobileWindow from './components/os/MobileWindow';
import Bsod from './components/special/Bsod';

function App() {
  const { bootState, openWindows, isBsodActive, resetBsod, triggerBsod, finishBoot } = useStore();
  const isMobile = useIsMobile();
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (bootState === 'rebooting') {
      const timer = setTimeout(() => {
        finishBoot();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bootState, finishBoot]);
  
  const handleRestart = () => {
    resetBsod(); 
  };

  if (bootState === 'booting') { 
    return <BootScreen />;
  }

  if (isBsodActive) {
    return <Bsod onRestart={handleRestart} />;
  }

  if (bootState === 'rebooting') {
    return <div className="w-screen h-screen bg-black" />;
  }

  return (
    <div ref={constraintsRef} className="w-screen h-screen overflow-hidden bg-black">
      
      {isMobile ? <MobileHomeScreen /> : <Desktop onTriggerBsod={triggerBsod} />}

      {openWindows.map((win) => {
        // --- A CORREÇÃO ESTÁ AQUI ---
        // Se for mobile, a lógica antiga de filtro continua
        if (isMobile) {
          if (!win.mobileIcon) return null;
          return (
            <MobileWindow key={win.id} appId={win.id} title={win.title}>
              {win.content}
            </MobileWindow>
          );
        }

        // Se for desktop, renderiza a janela padrão
        // A lógica de filtro anterior foi removida, permitindo que todas as janelas abertas sejam renderizadas.
        return (
          <Window
            key={win.id}
            appId={win.id}
            title={win.title}
            zIndex={win.zIndex}
            width={win.width}
            height={win.height}
            constraintsRef={constraintsRef}
            theme={win.windowTheme}
            icon={win.windowIcon}
          >
            {win.content}
          </Window>
        );
      })}
    </div>
  );
}

export default App;