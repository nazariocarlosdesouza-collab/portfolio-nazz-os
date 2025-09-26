// src/components/os/ParticlesWallpaper.jsx
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesWallpaper = ({ children }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    // AQUI ESTÁ A CORREÇÃO DEFINITIVA:
    // Nós adicionamos esta propriedade ao seu objeto de opções já existente.
    // Ela força a biblioteca a renderizar o canvas no fundo.
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    background: {
      color: { value: 'transparent' },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: false, mode: 'grab' },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 1 } },
      },
    },
    particles: {
      color: {
        value: ['#3998db', '#39d0db', '#55db39', '#dbd039', '#db3939'],
      },
      links: {
        color: 'random',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
        shadow: {
          enable: false,
        },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 40, 
      },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    // Sua estrutura de div estava correta, vamos mantê-la.
    <div className="relative w-screen h-screen bg-[#000000]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        // A classe z-0 aqui é uma boa prática, mas a configuração 'fullScreen' é o que realmente resolve.
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      {/* O conteúdo fica na sua própria camada superior */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ParticlesWallpaper;