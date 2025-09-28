// src/components/os/DesktopIcon.jsx - VERSÃO DEFINITIVA E PASSIVA
import React, { useRef } from 'react';

const DesktopIcon = ({ id, icon, label, onDoubleClick, onClick, isSelected, textColor = 'text-white', onDragStart }) => {
  const containerClasses = `flex flex-col items-center justify-center text-center w-24 h-24 p-2 m-2 rounded-lg cursor-pointer transition-colors duration-150 ${
    isSelected ? 'bg-white/20' : 'hover:bg-white/10'
  }`;
  const textClasses = `text-sm mt-1 ${isSelected ? 'font-semibold' : ''} ${textColor} pointer-events-none`;

  const clickTimeout = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (onDoubleClick) onDoubleClick();
    } else {
      clickTimeout.current = setTimeout(() => {
        if (onClick) onClick();
        clickTimeout.current = null;
      }, 250);
    }
  };

  // A única responsabilidade deste componente é chamar a função onDragStart que ele recebe do pai.
  const handleDragStart = (e) => {
    if (onDragStart) {
      onDragStart(e, id); // Informa ao pai o evento e o próprio ID.
    }
  };

  return (
    <div
      id={id}
      draggable
      onDragStart={handleDragStart}
      className={containerClasses}
      onClick={handleClick}
    >
      <div className="pointer-events-none">{icon}</div>
      <span className={textClasses}>{label}</span>
    </div>
  );
};

export default DesktopIcon;