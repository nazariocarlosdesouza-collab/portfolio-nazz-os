import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesWallpaper = ({ children }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = { /* ... seu objeto de opções continua o mesmo ... */ 
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: { events: { onHover: { enable: true, mode: 'grab' } }, modes: { grab: { distance: 150, links: { opacity: 1 } } } },
    particles: {
      color: { value: ['#3998db', '#39d0db', '#55db39', '#dbd039', '#db3939'] },
      links: {
        color: 'random', distance: 150, enable: true, opacity: 0.8, width: 1.5,
        shadow: { enable: true, color: '#ffffff', blur: 10 },
      },
      move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: true, speed: 1, straight: false },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    // O container principal não precisa de z-index
    <div className="relative w-screen h-screen bg-[#000000]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        // 1. O z-index das partículas agora é 0. Elas ficam na camada de fundo padrão.
        className="absolute top-0 left-0 w-full h-full z-0" 
      />
      {/* 
        2. O container dos filhos (children) AGORA tem z-10.
        Isso garante que o Desktop com seus ícones fique ACIMA do wallpaper,
        e deixa espaço para as janelas (com z-index > 10) aparecerem na frente.
      */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ParticlesWallpaper;