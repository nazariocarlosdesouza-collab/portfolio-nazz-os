import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../lib/store';
import { Minus, Square, Copy, X } from 'lucide-react';

const Window = ({ appId, title, zIndex, width, height, children, constraintsRef }) => {
  const { closeWindow, focusWindow } = useStore();
  
  const [size, setSize] = useState({ width: width || 800, height: height || 600 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeSize, setPreMaximizeSize] = useState({ width: width || 800, height: height || 600 });

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(preMaximizeSize);
      setIsMaximized(false);
    } else {
      setPreMaximizeSize(size);
      setSize({
        width: 'calc(100vw - 2rem)', 
        height: 'calc(100vh - 3rem - 2rem)'
      });
      setIsMaximized(true);
    }
  };

  // 1. REMOVEMOS a constante 'windowPositionClasses'. A Framer Motion vai cuidar disso.
  const windowPositionClasses = isMaximized ? 'top-4 left-4' : '';

  return (
    <motion.div
      // --- AS MUDANÇAS PRINCIPAIS ESTÃO AQUI ---
      initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%', top: '50%', left: '50%' }} // 2. Posição inicial (invisível e centralizada)
      animate={{ opacity: 1, scale: 1 }} // 3. Animação de entrada suave
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragHandle=".drag-handle"
      dragMomentum={false}
      dragConstraints={constraintsRef}
      style={{ 
        zIndex,
        width: size.width,
        height: size.height,
      }} 
      onMouseDown={() => focusWindow(appId)}
      // 4. A classe 'top-1/4 left-1/4' foi removida daqui para evitar conflitos
      className={`absolute bg-gray-200 rounded-lg shadow-2xl flex flex-col overflow-hidden ${windowPositionClasses}`}
    >
      <div className="drag-handle bg-gray-700 text-white flex justify-between items-center px-2 py-1 rounded-t-lg cursor-move flex-shrink-0">
        <span className="font-bold text-sm pl-2">{title}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => alert('Minimizar em breve!')} className="p-2 hover:bg-white/20 rounded-md">
            <Minus size={16} />
          </button>
          <button onClick={handleMaximize} className="p-2 hover:bg-white/20 rounded-md">
            {isMaximized ? <Copy size={16} /> : <Square size={16} />}
          </button>
          <button onClick={() => closeWindow(appId)} className="p-2 hover:bg-red-500 rounded-md">
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-grow text-gray-900 relative flex flex-col overflow-hidden">
        {children}
      </div>

      {!isMaximized && (
        <motion.div
          drag="x,y"
          dragMomentum={false}
          onDrag={(event, info) => {
            setSize(prevSize => ({
              width: Math.max(400, prevSize.width + info.delta.x),
              height: Math.max(300, prevSize.height + info.delta.y),
            }));
          }}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
        />
      )}
    </motion.div>
  );
};

export default Window;