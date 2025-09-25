// src/components/apps/TicTacToe.jsx - COMPLETO
import React, { useState } from 'react';

// Função auxiliar para determinar o vencedor
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6],           // Diagonais
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Se todos os quadrados estiverem preenchidos e não houver vencedor, é um empate
  if (squares.every(square => square !== null)) {
    return 'Draw';
  }
  return null;
};

// Componente do Quadrado (Botão)
const Square = ({ value, onSquareClick }) => {
  const colorClass = value === 'X' ? 'text-green-400' : 'text-yellow-400';
  return (
    <button 
      className={`w-24 h-24 bg-gray-700 border border-gray-600 flex items-center justify-center text-5xl font-bold transition-colors hover:bg-gray-600 disabled:cursor-not-allowed ${colorClass}`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

// Componente Principal do Jogo
const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    // Se o quadrado já foi preenchido ou se há um vencedor, não faz nada
    if (squares[i] || winner) {
      return;
    }
    
    const nextSquares = squares.slice(); // Cria uma cópia do array
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winner === 'Draw') {
    status = "It's a Draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="mb-6 text-2xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
      <button 
        onClick={handleRestart}
        className="mt-8 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;