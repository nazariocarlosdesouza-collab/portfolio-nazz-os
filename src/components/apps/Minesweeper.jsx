// src/components/apps/Minesweeper.jsx - AGORA TOTALMENTE RESPONSIVO
import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÕES DO JOGO ---
const ROWS = 12;
const COLS = 16;
const MINES = 30;
const CELL_SIZE_PX = 28; // w-7 em pixels
// ------------------------------

const createBoard = () => {
  const board = Array.from({ length: ROWS }, () => 
    Array.from({ length: COLS }, () => ({
      isMine: false, isRevealed: false, isFlagged: false, adjacentMines: 0,
    }))
  );
  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) count++;
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
  const [isFlagging, setIsFlagging] = useState(false); // Novo estado para o modo de jogo
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  // Efeito para redimensionar o tabuleiro
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        // Largura total = colunas * tamanho da célula + (colunas * 1px de gap)
        const boardPixelWidth = COLS * (CELL_SIZE_PX + 1);
        setScale(Math.min(1, wrapperWidth / boardPixelWidth));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Checa condição de vitória
  useEffect(() => {
    if (gameState !== 'playing') return;
    const nonMineCells = ROWS * COLS - MINES;
    const revealedCells = board.flat().filter(cell => cell.isRevealed && !cell.isMine).length;
    if (revealedCells === nonMineCells) {
      setGameState('won');
    }
  }, [board, gameState]);

  const revealEmptyCells = (r, c, b) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || b[r][c].isRevealed || b[r][c].isFlagged) return;
    b[r][c].isRevealed = true;
    if (b[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealEmptyCells(r + dr, c + dc, b);
        }
      }
    }
  };

  const toggleFlag = (r, c) => {
    if (gameState !== 'playing' || board[r][c].isRevealed) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (!cell.isFlagged && flags > 0) {
      cell.isFlagged = true;
      setFlags(f => f - 1);
    } else if (cell.isFlagged) {
      cell.isFlagged = false;
      setFlags(f => f + 1);
    }
    setBoard(newBoard);
  };

  const handleCellClick = (r, c) => {
    // Ação principal de clique (revela ou marca, dependendo do modo)
    if (isFlagging) {
      toggleFlag(r, c);
      return;
    }

    if (gameState !== 'playing' || board[r][c].isRevealed || board[r][c].isFlagged) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    if (newBoard[r][c].isMine) {
      setGameState('lost');
      newBoard.forEach(row => row.forEach(cell => { if (cell.isMine) cell.isRevealed = true; }));
    } else {
      revealEmptyCells(r, c, newBoard);
    }
    setBoard(newBoard);
  };
  
  const handleRestart = () => {
    setBoard(createBoard());
    setGameState('playing');
    setFlags(MINES);
    setIsFlagging(false);
  };

  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.adjacentMines > 0) return cell.adjacentMines;
    return '';
  };
  
  const getTextColor = (count) => ({1: 'text-blue-500', 2: 'text-green-500', 3: 'text-red-500', 4: 'text-blue-800', 5: 'text-red-800'}[count] || 'text-gray-900');

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-4 text-white font-sans" ref={wrapperRef}>
      <div className="w-full flex justify-center mb-2" style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
        <div className="w-auto bg-gray-900 p-3 rounded-lg flex justify-between items-center font-mono text-2xl gap-8">
          <span>🚩 {flags}</span>
          <button onClick={handleRestart} className="text-3xl">
            {gameState === 'playing' ? '🙂' : gameState === 'won' ? '😎' : '😵'}
          </button>
          <button onClick={() => setIsFlagging(!isFlagging)} className={`text-3xl p-1 rounded-md ${isFlagging ? 'bg-blue-600' : 'bg-gray-700'}`}>
            {isFlagging ? '🚩' : '⛏️'}
          </button>
        </div>
      </div>

      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }} onContextMenu={(e) => e.preventDefault()}>
        <div className={`grid gap-px bg-gray-800`} style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-7 h-7 flex items-center justify-center font-bold text-lg transition-colors
                  ${!cell.isRevealed ? 'bg-gray-500 hover:bg-gray-400' : 'bg-gray-400'}
                  ${getTextColor(cell.adjacentMines)}
                `}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => { e.preventDefault(); toggleFlag(r,c); }} // Mantém o clique direito para desktop
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>
      <p className="text-gray-400 mt-4 text-center text-sm" style={{ visibility: scale < 1 ? 'visible' : 'hidden' }}>
        Use ⛏️ para revelar e 🚩 para marcar bandeiras.
      </p>
    </div>
  );
};

export default Minesweeper;