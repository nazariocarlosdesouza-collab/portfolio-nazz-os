// src/components/apps/Game2048.jsx - AGORA RESPONSIVO E COM CONTROLES DE SWIPE
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- FUNÇÕES DE LÓGICA DO JOGO (sem alterações) ---

const addRandomTile = (board) => {
  const newBoard = board.map(row => [...row]);
  const emptyTiles = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (newBoard[r][c] === 0) {
        emptyTiles.push({ r, c });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  return newBoard;
};

const startNewGame = () => {
  let board = Array(4).fill(null).map(() => Array(4).fill(0));
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const slideAndCombine = (row) => {
  const filteredRow = row.filter(tile => tile !== 0);
  const newRow = [];
  let scoreIncrease = 0;
  
  for (let i = 0; i < filteredRow.length; i++) {
    if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1]) {
      const newValue = filteredRow[i] * 2;
      newRow.push(newValue);
      scoreIncrease += newValue;
      i++;
    } else {
      newRow.push(filteredRow[i]);
    }
  }

  while (newRow.length < 4) {
    newRow.push(0);
  }
  return { newRow, scoreIncrease };
};

const rotateBoard = (board) => {
  const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newBoard[c][3 - r] = board[r][c];
    }
  }
  return newBoard;
};

// Componente Tile (agora responsivo)
const Tile = ({ value }) => {
    const colors = { 0: 'bg-gray-700', 2: 'bg-gray-300 text-black', 4: 'bg-gray-200 text-black', 8: 'bg-orange-400 text-white', 16: 'bg-orange-500 text-white', 32: 'bg-red-500 text-white', 64: 'bg-red-600 text-white', 128: 'bg-yellow-400 text-white', 256: 'bg-yellow-500 text-white', 512: 'bg-yellow-600 text-white', 1024: 'bg-purple-500 text-white', 2048: 'bg-purple-700 text-white' };
    const color = colors[value] || 'bg-black text-white';
    const textSize = value > 1000 ? 'text-3xl' : 'text-4xl'; // Reduz a fonte para números maiores

    return (
        <div className={`w-full aspect-square rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${color} ${textSize}`}>
            {value > 0 ? value : ''}
        </div>
    );
};

// Componente Principal
const Game2048 = () => {
  const [board, setBoard] = useState(startNewGame());
  const [score, setScore] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const gameAreaRef = useRef(null);

  // Função de movimento centralizada
  const moveBoard = useCallback((direction) => {
    let currentBoard = board.map(row => [...row]);
    let boardChanged = false;
    let scoreIncrease = 0;

    // Rotaciona para que o movimento seja sempre para a esquerda
    for (let i = 0; i < direction; i++) {
      currentBoard = rotateBoard(currentBoard);
    }

    const movedBoard = [];
    currentBoard.forEach(row => {
      const { newRow, scoreIncrease: rowScore } = slideAndCombine(row);
      movedBoard.push(newRow);
      scoreIncrease += rowScore;
    });

    // Rotaciona de volta
    let newBoard = movedBoard;
    for (let i = 0; i < direction; i++) {
      newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
    }

    boardChanged = JSON.stringify(board) !== JSON.stringify(newBoard);

    if (boardChanged) {
      const finalBoard = addRandomTile(newBoard);
      setBoard(finalBoard);
      setScore(s => s + scoreIncrease);
    }
  }, [board]);

  // Controles de Teclado
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft': moveBoard(0); break;
      case 'ArrowUp': moveBoard(1); break;
      case 'ArrowRight': moveBoard(2); break;
      case 'ArrowDown': moveBoard(3); break;
      default: return;
    }
    e.preventDefault();
  }, [moveBoard]);

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (gameArea) {
        gameArea.focus(); // Foca na área do jogo para capturar teclas
    }
    gameArea?.addEventListener('keydown', handleKeyDown);
    return () => gameArea?.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Controles de Toque (Swipe)
  const handleTouchStart = (e) => setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 30) { // Limiar de swipe
      if (absDx > absDy) {
        dx > 0 ? moveBoard(2) : moveBoard(0); // Direita ou Esquerda
      } else {
        dy > 0 ? moveBoard(3) : moveBoard(1); // Baixo ou Cima
      }
    }
    setTouchStart(null);
  };

  const handleRestart = () => {
    setBoard(startNewGame());
    setScore(0);
    gameAreaRef.current?.focus();
  };

  return (
    <div 
        ref={gameAreaRef}
        tabIndex="0" // Permite que o div receba foco
        className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-4 text-white font-sans outline-none"
    >
      <div className="w-full max-w-sm flex justify-between items-center mb-4">
        <h2 className="text-5xl font-bold">2048</h2>
        <div className="bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400">SCORE</div>
            <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>
      
      <div 
        className="bg-gray-600 p-2 sm:p-4 rounded-lg w-full max-w-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {board.flat().map((value, index) => (
                <Tile key={index} value={value} />
            ))}
        </div>
      </div>

      <p className="mt-6 text-gray-400 text-center">Use as setas ou deslize na tela para jogar.</p>
      
      <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors">
        New Game
      </button>
    </div>
  );
};

export default Game2048;