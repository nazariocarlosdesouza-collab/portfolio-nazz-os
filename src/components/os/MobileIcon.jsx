import React from 'react';

const MobileIcon = ({ icon, label, onClick }) => {
  return (
    <div 
      className="w-20 h-24 flex flex-col items-center justify-start cursor-pointer"
      onClick={onClick}
    >
      {/* Container do ícone com efeito de "apertar" */}
      <div className="transform transition-transform active:scale-90">
        {icon}
      </div>
      <span className="mt-1 text-xs text-white text-center break-words">
        {label}
      </span>
    </div>
  );
};

export default MobileIcon;