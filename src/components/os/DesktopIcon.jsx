// src/components/os/DesktopIcon.jsx
import React, { useRef } from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick, onClick, isSelected, textColor = 'text-white' }) => {
  const containerClasses = `flex flex-col items-center justify-center text-center w-24 h-24 p-2 m-2 rounded-lg cursor-pointer transition-colors duration-150 ${
    isSelected ? 'bg-white/20' : 'hover:bg-white/10'
  }`;
  const textClasses = `text-sm mt-1 ${isSelected ? 'font-semibold' : ''} ${textColor}`;

  // Usamos useRef para o timer para não causar re-renderizações.
  const clickTimeout = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation(); // Impede que o evento se propague.

    // Se um timer já existe, é um duplo clique.
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (onDoubleClick) {
        onDoubleClick(); // DISPARA UM ÚNICO SINAL DE DUPLO CLIQUE.
      }
    } else {
      // Se não há timer, é o primeiro clique. Inicia um.
      clickTimeout.current = setTimeout(() => {
        if (onClick) {
          onClick(); // Se o timer não for cancelado, dispara o clique simples.
        }
        clickTimeout.current = null;
      }, 250); // Janela de 250ms.
    }
  };

  return (
    <div 
      className={containerClasses}
      // Removemos onDoubleClick e usamos apenas nosso sistema de clique controlado.
      onClick={handleClick}
    >
      <div>{icon}</div>
      <span className={textClasses}>{label}</span>
    </div>
  );
};

export default DesktopIcon;