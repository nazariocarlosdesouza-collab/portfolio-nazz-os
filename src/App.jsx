// src/App.jsx
import React, { useRef } from 'react'; // 1. Reimportamos o 'useRef'
import { useStore } from './lib/store';
import { useIsMobile } from './lib/useIsMobile';
import BootScreen from './components/os/BootScreen';
import Desktop from './components/os/Desktop';
import MobileHomeScreen from './components/os/MobileHomeScreen';
import Window from './components/os/Window';
import MobileWindow from './components/os/MobileWindow';

function App() {
  const { bootState, openWindows } = useStore();
  const isMobile = useIsMobile();
  
  // 2. CRIAMOS AS "PAREDES" AQUI, no componente pai que contém tudo.
  const constraintsRef = useRef(null);

  if (bootState === 'booting') { 
    return <BootScreen />;
  }

  return (
    // 3. A referência é aplicada ao container principal.
    <div ref={constraintsRef} className="w-screen h-screen overflow-hidden bg-black">
      
      {/* Camada 1: O Sistema Operacional */}
      {isMobile ? <MobileHomeScreen /> : <Desktop />}

      {/* Camada 2: As Janelas */}
      {openWindows.map((win) => {
        if (isMobile && !win.mobileIcon) return null;
        if (!isMobile && !win.desktopIcon && win.id !== 'chrome') return null;
        
        return isMobile 
          ? <MobileWindow key={win.id} appId={win.id} title={win.title}>
              {win.content}
            </MobileWindow>
          : <Window
              key={win.id}
              appId={win.id}
              title={win.title}
              zIndex={win.zIndex}
              width={win.width}
              height={win.height}
              // 4. PASSAMOS AS "PAREDES" PARA CADA JANELA
              constraintsRef={constraintsRef} 
            >
              {win.content}
            </Window>
      })}
    </div>
  );
}

export default App;