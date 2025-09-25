// src/components/os/DesktopIcon.jsx - CÓDIGO FINAL E CORRIGIDO
import React from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick, onClick, isSelected, textColor = 'text-white' }) => {
  const containerClasses = `flex flex-col items-center justify-center text-center w-24 h-24 p-2 m-2 rounded-lg cursor-pointer transition-colors duration-150 ${
    isSelected ? 'bg-white/20' : 'hover:bg-white/10'
  }`;

  const textClasses = `text-sm mt-1 ${
    isSelected ? 'font-semibold' : ''
  } ${textColor}`;

  return (
    <div 
      className={containerClasses}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      <div>{icon}</div>
      <span className={textClasses}>{label}</span>
    </div>
  );
};

export default DesktopIcon;