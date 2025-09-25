import React, { useEffect } from 'react';
import { useStore } from '../../lib/store';

const BootScreen = () => {
  const { finishBoot } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      finishBoot();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // A MÁGICA ESTÁ AQUI: Adicionamos a classe "text-gray-300"
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-gray-300">
      
      {/* Adicionei um "tracking-widest" para dar um espaçamento de letra mais legal */}
      <h1 className="text-4xl font-mono animate-pulse tracking-widest">NAZZ OS</h1>
      
      <p className="mt-4 font-mono">Inicializando sistema...</p>
    
    </div>
  );
};

export default BootScreen;