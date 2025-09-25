// src/components/apps/Game2048.jsx - COMPLETO
import React, { useState, useEffect } from 'react';

// --- FUNÇÕES DE LÓGICA DO JOGO ---

// Função para gerar um novo tile (2 ou 4) em uma posição vazia
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

// Função para iniciar um novo jogo
const startNewGame = () => {
  let board = Array(4).fill(null).map(() => Array(4).fill(0));
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

// Função para deslizar e combinar os tiles
const slideAndCombine = (row) => {
  // 1. Remove os zeros
  const filteredRow = row.filter(tile => tile !== 0);
  const newRow = [];
  let scoreIncrease = 0;
  
  // 2. Combina os tiles
  for (let i = 0; i < filteredRow.length; i++) {
    if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1]) {
      const newValue = filteredRow[i] * 2;
      newRow.push(newValue);
      scoreIncrease += newValue;
      i++; // Pula o próximo tile, pois já foi combinado
    } else {
      newRow.push(filteredRow[i]);
    }
  }

  // 3. Adiciona os zeros de volta
  while (newRow.length < 4) {
    newRow.push(0);
  }

  return { newRow, scoreIncrease };
};

// Função para rotacionar o tabuleiro (para reutilizar a lógica de slide para todas as direções)
const rotateBoard = (board) => {
  const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newBoard[c][3 - r] = board[r][c];
    }
  }
  return newBoard;
};


// Componente Tile
const Tile = ({ value }) => {
    const colors = {
        0: 'bg-gray-700',
        2: 'bg-gray-300 text-black',
        4: 'bg-gray-200 text-black',
        8: 'bg-orange-400 text-white',
        16: 'bg-orange-500 text-white',
        32: 'bg-red-500 text-white',
        64: 'bg-red-600 text-white',
        128: 'bg-yellow-400 text-white',
        256: 'bg-yellow-500 text-white',
        512: 'bg-yellow-600 text-white',
        1024: 'bg-purple-500 text-white',
        2048: 'bg-purple-700 text-white',
    };
    const color = colors[value] || 'bg-black text-white';

    return (
        <div className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold transition-all duration-300 ${color}`}>
            {value > 0 ? value : ''}
        </div>
    );
};

// Componente Principal
const Game2048 = () => {
  const [board, setBoard] = useState(startNewGame());
  const [score, setScore] = useState(0);

  const handleKeyDown = (e) => {
    let currentBoard = board.map(row => [...row]);
    let newBoard = currentBoard.map(row => [...row]);
    let boardChanged = false;
    let scoreIncrease = 0;

    // Função para mover
    const move = (direction) => {
      // Rotaciona o tabuleiro para que o movimento seja sempre para a "esquerda"
      for (let i = 0; i < direction; i++) {
        currentBoard = rotateBoard(currentBoard);
      }

      const movedBoard = [];
      currentBoard.forEach(row => {
        const { newRow, scoreIncrease: rowScore } = slideAndCombine(row);
        movedBoard.push(newRow);
        scoreIncrease += rowScore;
      });

      // Rotaciona de volta para a posição original
      newBoard = movedBoard;
      for (let i = 0; i < direction; i++) {
        newBoard = rotateBoard(rotateBoard(rotateBoard(newBoard)));
      }

      // Verifica se o tabuleiro mudou
      boardChanged = JSON.stringify(board) !== JSON.stringify(newBoard);
    };

    switch (e.key) {
      case 'ArrowLeft': move(0); break;
      case 'ArrowUp': move(1); break;
      case 'ArrowRight': move(2); break;
      case 'ArrowDown': move(3); break;
      default: return;
    }
    
    e.preventDefault(); // Impede a página de rolar

    if (boardChanged) {
      const finalBoard = addRandomTile(newBoard);
      setBoard(finalBoard);
      setScore(s => s + scoreIncrease);
    }
  };
  
  const handleRestart = () => {
    setBoard(startNewGame());
    setScore(0);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h2 className="text-5xl font-bold">2048</h2>
        <div className="bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-400">SCORE</div>
            <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>
      
      <div className="bg-gray-600 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
            {board.flat().map((value, index) => (
                <Tile key={index} value={value} />
            ))}
        </div>
      </div>

      <p className="mt-6 text-gray-400">Use as setas do teclado para jogar.</p>
      
      <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors">
        New Game
      </button>
    </div>
  );
};

export default Game2048;