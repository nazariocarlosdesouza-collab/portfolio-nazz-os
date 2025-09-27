// src/components/os/Window.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../lib/store';
import { Minus, Square, Copy, X } from 'lucide-react';

const themes = {
  default: {
    headerBg: 'bg-gray-900',
    headerText: 'text-white',
    buttonHover: 'hover:bg-white/20',
    closeButtonHover: 'hover:bg-red-500',
  },
  opera: {
    headerBg: 'bg-[#121212]',
    headerText: 'text-red-500',
    buttonHover: 'hover:bg-white/10',
    closeButtonHover: 'hover:bg-red-600',
  }
};

const Window = ({ appId, title, zIndex, width, height, children, constraintsRef, theme = 'default', icon = null }) => {
  const { closeWindow, focusWindow } = useStore();
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: width || 800, height: height || 600 });
  const currentTheme = themes[theme] || themes.default;

  const initialWidth = width || 800;
  const initialHeight = height || 600;

  const handleMaximize = () => setIsMaximized(!isMaximized);

  const renderHeader = (isMaximizedView = false) => (
    <div className={`drag-handle ${currentTheme.headerBg} ${currentTheme.headerText} flex justify-between items-center px-2 py-1 flex-shrink-0 ${!isMaximizedView && 'cursor-move'}`}>
      <div className="flex items-center">
        {icon}
        <span className="font-bold text-sm pl-2">{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <button className={`p-2 rounded-sm ${currentTheme.buttonHover}`}><Minus size={16} /></button>
        <button onClick={handleMaximize} className={`p-2 rounded-sm ${currentTheme.buttonHover}`}>
          {isMaximizedView ? <Copy size={16} /> : <Square size={16} />}
        </button>
        <button onClick={() => closeWindow(appId)} className={`p-2 rounded-sm ${currentTheme.closeButtonHover}`}>
          <X size={16} />
        </button>
      </div>
    </div>
  );

  if (isMaximized) {
    return (
      <div style={{ zIndex }} className="absolute top-0 left-0 w-full h-full bg-gray-800 border border-gray-600/50 flex flex-col" onMouseDown={() => focusWindow(appId)}>
        {renderHeader(true)}
        <div className="bg-gray-700 text-white flex-grow relative flex flex-col overflow-auto min-h-0">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        zIndex,
        width: size.width,
        height: size.height,
        // A CORREÇÃO ESTÁ AQUI: Corrigi a fórmula matemática para a centralização.
        top: `calc(50% - ${initialHeight / 2}px)`,
        left: `calc(50% - ${initialWidth / 2}px)`,
      }}
      className="absolute bg-gray-800 border border-gray-600/50 shadow-2xl flex flex-col rounded-lg overflow-hidden"
      drag
      dragHandle=".drag-handle"
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onMouseDown={() => focusWindow(appId)}
    >
      {renderHeader(false)}
      <div className="bg-gray-700 text-white flex-grow relative flex flex-col overflow-auto min-h-0">
        {children}
      </div>
      <motion.div
        drag="x,y"
        dragMomentum={false}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
        onDrag={(event, info) => {
          setSize(prevSize => ({
            width: Math.max(400, prevSize.width + info.delta.x),
            height: Math.max(300, prevSize.height + info.delta.y),
          }));
        }}
      />
    </motion.div>
  );
};

export default Window;