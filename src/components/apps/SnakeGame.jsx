// src/components/apps/SnakeGame.jsx - COMPLETO
import React, { useState, useEffect, useRef } from 'react';

// --- Configurações do Jogo (ATUALIZADAS) ---
const GRID_SIZE = 25;    // Aumentado de 20 para 25
const TILE_SIZE = 24;    // Aumentado de 20 para 24
const GAME_SPEED = 120; // Diminuído para deixar o jogo um pouco mais rápido

const SnakeGame = () => {
  // --- Estados do Jogo ---
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // --- Refs para controle ---
  const gameLoopRef = useRef();

  // --- Função para gerar nova comida ---
  const generateFood = () => {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    setFood(newFoodPosition);
  };
  
  // --- Função para resetar o jogo ---
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setIsGameOver(false);
    setScore(0);
    generateFood();
  };

  // --- Lógica de Controle (Teclado) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Impede a página de rolar com as setas
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // --- Loop Principal do Jogo ---
  useEffect(() => {
    if (isGameOver) {
      clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 || head.x >= GRID_SIZE ||
          head.y < 0 || head.y >= GRID_SIZE ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoopRef.current);
  }, [snake, direction, isGameOver, food]);
  
  return (
    <div className="bg-gray-800 h-full w-full flex flex-col items-center justify-center text-white p-4">
      <div className="flex justify-between w-full" style={{ maxWidth: `${GRID_SIZE * TILE_SIZE}px` }}>
        <h3 className="font-mono">Pontos: {score}</h3>
        <button onClick={resetGame} className="font-mono px-2 py-1 bg-green-500 text-black rounded hover:bg-green-400">
          Reiniciar
        </button>
      </div>
      
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
          width: `${GRID_SIZE * TILE_SIZE}px`,
          height: `${GRID_SIZE * TILE_SIZE}px`,
        }}
        className="bg-black border-2 border-green-500 relative mt-4"
      >
        {snake.map((segment, index) => (
          <div 
            key={index}
            style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
            className={`bg-green-500 ${index === 0 ? 'opacity-100' : 'opacity-80'}`}
          />
        ))}

        <div 
          style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
          className="bg-red-500 rounded-full"
        />
        
        {isGameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl text-red-500 font-mono">GAME OVER</h2>
            <p>Pressione "Reiniciar" para jogar de novo.</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm font-mono text-gray-400">Use as setas do teclado para mover.</p>
    </div>
  );
};

export default SnakeGame;