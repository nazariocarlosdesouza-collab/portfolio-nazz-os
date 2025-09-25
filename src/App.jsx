import React, { useRef } from 'react'; // Adicionado 'useRef'
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
  const constraintsRef = useRef(null); // LINHA ADICIONADA

  if (bootState === 'booting') { 
    return <BootScreen />;
  }

  // O <Fragment> foi trocado por um <div> para servir de limite
  return (
    <div ref={constraintsRef} className="w-screen h-screen overflow-hidden">
      {isMobile ? <MobileHomeScreen /> : <Desktop />}

      {openWindows.map((win) => (
        isMobile 
          ? <MobileWindow
              key={win.id}
              appId={win.id}
              title={win.title}
            >
              {win.content}
            </MobileWindow>
          : <Window
              key={win.id}
              appId={win.id}
              title={win.title}
              zIndex={win.zIndex}
              width={win.width}
              height={win.height}
              constraintsRef={constraintsRef} // Prop adicionada aqui
            >
              {win.content}
            </Window>
      ))}
    </div>
  );
}

export default App;