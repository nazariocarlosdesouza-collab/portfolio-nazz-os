// src/App.jsx
import React, { useRef } from 'react';
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
  const constraintsRef = useRef(null);

  if (bootState === 'booting') { 
    return <BootScreen />;
  }

  return (
    <div ref={constraintsRef} className="w-screen h-screen overflow-hidden bg-black">
      
      {isMobile ? <MobileHomeScreen /> : <Desktop />}

      {openWindows.map((win) => {
        if (isMobile && !win.mobileIcon) return null;
        if (!isMobile && !win.desktopIcon && !win.isBrowser) return null;
        
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
              constraintsRef={constraintsRef}
              // AQUI ESTÁ A MUDANÇA: Passamos as novas props para a janela
              theme={win.windowTheme}
              icon={win.windowIcon}
            >
              {win.content}
            </Window>
      })}
    </div>
  );
}

export default App;