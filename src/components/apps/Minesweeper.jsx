// src/components/apps/Minesweeper.jsx - COMPLETO
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÕES DO JOGO ---
const ROWS = 12;
const COLS = 16;
const MINES = 30;
// ------------------------------

// Função para criar o tabuleiro
const createBoard = () => {
  // 1. Inicializa o tabuleiro com objetos vazios
  const board = Array.from({ length: ROWS }, () => 
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  // 2. Planta as minas aleatoriamente
  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // 3. Calcula o número de minas adjacentes para cada célula
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) {
            count++;
          }
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
};


const Minesweeper = () => {
  const [board, setBoard] = useState(createBoard());
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [flags, setFlags] = useState(MINES);

  // Checa condição de vitória
  useEffect(() => {
    const nonMineCells = ROWS * COLS - MINES;
    const revealedCells = board.flat().filter(cell => cell.isRevealed && !cell.isMine).length;
    if (revealedCells === nonMineCells) {
      setGameState('won');
    }
  }, [board]);

  const revealEmptyCells = (r, c, newBoard) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newBoard[r][c].isRevealed) {
      return;
    }

    newBoard[r][c].isRevealed = true;
    if (newBoard[r][c].isFlagged) {
        newBoard[r][c].isFlagged = false;
        setFlags(f => f + 1);
    }

    if (newBoard[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealEmptyCells(r + dr, c + dc, newBoard);
        }
      }
    }
  };

  const handleCellClick = (r, c) => {
    if (gameState !== 'playing' || board[r][c].isRevealed || board[r][c].isFlagged) {
      return;
    }
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (newBoard[r][c].isMine) {
      setGameState('lost');
      // Revela todas as minas
      newBoard.forEach(row => row.forEach(cell => { if(cell.isMine) cell.isRevealed = true; }));
    } else {
      revealEmptyCells(r, c, newBoard);
    }
    setBoard(newBoard);
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameState !== 'playing' || board[r][c].isRevealed) {
      return;
    }
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    if (!newBoard[r][c].isFlagged && flags > 0) {
        newBoard[r][c].isFlagged = true;
        setFlags(f => f - 1);
    } else if (newBoard[r][c].isFlagged) {
        newBoard[r][c].isFlagged = false;
        setFlags(f => f + 1);
    }
    setBoard(newBoard);
  };
  
  const handleRestart = () => {
    setBoard(createBoard());
    setGameState('playing');
    setFlags(MINES);
  };

  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.adjacentMines > 0) return cell.adjacentMines;
    return '';
  };
  
  const getTextColor = (count) => {
    switch (count) {
      case 1: return 'text-blue-500';
      case 2: return 'text-green-500';
      case 3: return 'text-red-500';
      case 4: return 'text-blue-800';
      case 5: return 'text-red-800';
      default: return 'text-gray-900';
    }
  }

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-fit bg-gray-900 p-3 rounded-t-lg flex justify-between items-center font-mono text-2xl">
        <span>🚩 {flags}</span>
        <button onClick={handleRestart} className="text-3xl">
          {gameState === 'playing' && '🙂'}
          {gameState === 'won' && '😎'}
          {gameState === 'lost' && '😵'}
        </button>
        <span>{/* Timer placeholder */}</span>
      </div>

      <div className="bg-gray-700 p-2 rounded-b-lg relative" onContextMenu={(e) => e.preventDefault()}>
        <div className={`grid gap-px`} style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-7 h-7 flex items-center justify-center font-bold text-lg
                  ${!cell.isRevealed ? 'bg-gray-500 hover:bg-gray-400' : 'bg-gray-400'}
                  ${getTextColor(cell.adjacentMines)}
                `}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;