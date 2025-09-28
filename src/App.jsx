// src/App.jsx - AGORA COM O GATILHO E O COMPONENTE BSOD
import React, { useRef, useEffect } from 'react';
import { useStore } from './lib/store';
import { useIsMobile } from './lib/useIsMobile';
import BootScreen from './components/os/BootScreen';
import Desktop from './components/os/Desktop';
import MobileHomeScreen from './components/os/MobileHomeScreen';
import Window from './components/os/Window';
import MobileWindow from './components/os/MobileWindow';
import Bsod from './components/special/Bsod'; // 1. IMPORTAR O BSOD

function App() {
  // 2. OBTER OS NOVOS ESTADOS E FUNÇÕES DA STORE
  const { bootState, openWindows, isBsodActive, resetBsod, triggerBsod, finishBoot } = useStore();
  const isMobile = useIsMobile();
  const constraintsRef = useRef(null);

  // Lógica de "Reboot"
  useEffect(() => {
    if (bootState === 'rebooting') {
      // Pequeno delay para simular o reboot antes de voltar ao desktop
      const timer = setTimeout(() => {
        finishBoot();
      }, 1500); // 1.5 segundos de tela preta
      return () => clearTimeout(timer);
    }
  }, [bootState, finishBoot]);
  
  // Função que será chamada pelo Bsod para iniciar o reboot
  const handleRestart = () => {
    // A função na store agora reseta o bootState para 'booting'
    resetBsod(); 
  };

  // Se o estado for 'booting', mostra a tela de boot
  if (bootState === 'booting') { 
    return <BootScreen />;
  }

  // 3. RENDERIZAÇÃO CONDICIONAL DO BSOD
  // Se isBsodActive for true, mostra a tela azul e mais nada.
  if (isBsodActive) {
    return <Bsod onRestart={handleRestart} />;
  }

  // Se o estado for 'rebooting', mostra uma tela preta simples
  if (bootState === 'rebooting') {
    return <div className="w-screen h-screen bg-black" />;
  }

  return (
    <div ref={constraintsRef} className="w-screen h-screen overflow-hidden bg-black">
      
      {/* 4. PASSAR A FUNÇÃO 'triggerBsod' COMO PROP PARA O DESKTOP */}
      {isMobile ? <MobileHomeScreen /> : <Desktop onTriggerBsod={triggerBsod} />}

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