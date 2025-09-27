// src/components/apps/TechStackDisplay.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techDetails } from '../../lib/techStack';

const TechStackDisplay = ({ stack }) => {
  // Se 'stack' não for um objeto, criamos um array vazio para evitar erros
  const stackKeys = stack ? Object.keys(stack) : [];

  return (
    <AnimatePresence>
      {stackKeys.length > 0 && (
        <motion.div
          key={stackKeys.join('-')} // Chave única para forçar a re-animação
          initial={{ x: '110%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '110%', opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className="absolute top-20 right-0 bg-black/50 backdrop-blur-md p-2 rounded-l-lg shadow-lg z-20"
        >
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-1 border-b border-white/20 pb-1 px-2">Tech Stack</h3>
            {stackKeys.map(key => {
              const tech = techDetails[key];
              if (!tech) return null;

              return (
                <div key={key} className="relative group">
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 rounded-full bg-white/10 p-1 transition-transform group-hover:scale-110" />
                  
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-max max-w-xs bg-gray-800 text-white text-sm rounded-md shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                    <p className="font-bold border-b border-gray-600 pb-1 mb-1">{tech.name}</p>
                    <p className="text-xs text-gray-300">{stack[key]}</p>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full w-2 h-2 bg-gray-800 transform rotate-45 -ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechStackDisplay;