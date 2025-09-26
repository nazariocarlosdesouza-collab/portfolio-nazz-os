// src/components/os/Window.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../lib/store';
import { Minus, Square, Copy, X } from 'lucide-react';

const Window = ({ appId, title, zIndex, width, height, children, constraintsRef }) => {
  const { closeWindow, focusWindow } = useStore();
  const [isMaximized, setIsMaximized] = useState(false);
  
  const initialWidth = width || 800;
  const initialHeight = height || 600;

  // 1. ADICIONAMOS UM ESTADO PARA CONTROLAR O TAMANHO ATUAL DA JANELA
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const handleMaximize = () => setIsMaximized(!isMaximized);

  // Se a janela estiver maximizada, o comportamento é o mesmo de antes.
  if (isMaximized) {
    return (
      <div style={{ zIndex }} className="absolute top-0 left-0 w-full h-full bg-gray-800 border border-gray-600/50 flex flex-col" onMouseDown={() => focusWindow(appId)}>
        <div className="bg-gray-900 text-white flex justify-between items-center px-2 py-1 flex-shrink-0">
          <span className="font-bold text-sm pl-2">{title}</span>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/20 rounded-sm"><Minus size={16} /></button>
            <button onClick={handleMaximize} className="p-2 hover:bg-white/20 rounded-sm"><Copy size={16} /></button>
            <button onClick={() => closeWindow(appId)} className="p-2 hover:bg-red-500 rounded-sm"><X size={16} /></button>
          </div>
        </div>
        <div className="bg-gray-700 text-white flex-grow relative flex flex-col overflow-auto min-h-0">{children}</div>
      </div>
    );
  }

  // Se a janela estiver no estado normal...
  return (
    <motion.div
      style={{
        zIndex,
        // 2. O TAMANHO DA JANELA AGORA VEM DO NOSSO NOVO ESTADO 'size'
        width: size.width,
        height: size.height,
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
      <div className="drag-handle bg-gray-900 text-white flex justify-between items-center px-2 py-1 cursor-move flex-shrink-0">
        <span className="font-bold text-sm pl-2">{title}</span>
        <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/20 rounded-sm"><Minus size={16} /></button>
            <button onClick={handleMaximize} className="p-2 hover:bg-white/20 rounded-sm"><Square size={16} /></button>
            <button onClick={() => closeWindow(appId)} className="p-2 hover:bg-red-500 rounded-sm"><X size={16} /></button>
        </div>
      </div>
      
      <div className="bg-gray-700 text-white flex-grow relative flex flex-col overflow-auto min-h-0">
        {children}
      </div>

      {/* 3. ADICIONAMOS O "PUXADOR" DE REDIMENSIONAMENTO NO CANTO */}
      <motion.div
        drag="x,y"
        dragMomentum={false}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
        onDrag={(event, info) => {
          // 4. A CADA MOVIMENTO DO MOUSE, ATUALIZAMOS O ESTADO 'size'
          setSize(prevSize => ({
            width: Math.max(400, prevSize.width + info.delta.x), // Define uma largura mínima de 400px
            height: Math.max(300, prevSize.height + info.delta.y), // Define uma altura mínima de 300px
          }));
        }}
      />
    </motion.div>
  );
};

export default Window;