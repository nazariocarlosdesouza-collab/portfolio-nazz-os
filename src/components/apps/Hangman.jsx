// src/components/apps/Hangman.jsx - COMPLETO
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const WORDS = [
  'REACT', 'JAVASCRIPT', 'TAILWIND', 'VITE', 'COMPONENT', 
  'ZUSTAND', 'NODEJS', 'DEVELOPER', 'PORTFOLIO', 'ICARUS'
];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// --------------------

// Função para selecionar uma nova palavra
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

// Componente para desenhar a forca
const HangmanDrawing = ({ numberOfGuesses }) => {
  const Head = <div style={{ width: '50px', height: '50px', borderRadius: '100%', border: '10px solid white', position: 'absolute', top: '50px', right: '-30px' }} />;
  const Body = <div style={{ height: '100px', width: '10px', background: 'white', position: 'absolute', top: '100px', right: 0 }} />;
  const RightArm = <div style={{ width: '100px', height: '10px', background: 'white', position: 'absolute', top: '130px', right: '-100px', rotate: '-30deg', transformOrigin: 'left bottom' }} />;
  const LeftArm = <div style={{ width: '100px', height: '10px', background: 'white', position: 'absolute', top: '130px', right: '10px', rotate: '30deg', transformOrigin: 'right bottom' }} />;
  const RightLeg = <div style={{ width: '100px', height: '10px', background: 'white', position: 'absolute', top: '190px', right: '-90px', rotate: '60deg', transformOrigin: 'left bottom' }} />;
  const LeftLeg = <div style={{ width: '100px', height: '10px', background: 'white', position: 'absolute', top: '190px', right: 0, rotate: '-60deg', transformOrigin: 'right bottom' }} />;
  
  const BODY_PARTS = [Head, Body, RightArm, LeftArm, RightLeg, LeftLeg];

  return (
    <div style={{ position: 'relative' }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div style={{ height: '50px', width: '10px', background: 'white', position: 'absolute', top: 0, right: 0 }} />
      <div style={{ height: '10px', width: '200px', background: 'white', marginLeft: '120px' }} />
      <div style={{ height: '300px', width: '10px', background: 'white', marginLeft: '120px' }} />
      <div style={{ height: '10px', width: '250px', background: 'white' }} />
    </div>
  );
};

// Componente Principal do Jogo
const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = (letter) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  };
  
  const handleRestart = () => {
    setWordToGuess(getRandomWord());
    setGuessedLetters([]);
  };

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-around p-6 text-white font-sans">
      <div className="text-2xl font-bold">
        {isWinner && "You Win! - Press Restart to play again"}
        {isLoser && "Nice Try! - Press Restart to play again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      
      {/* Palavra a ser adivinhada */}
      <div className="flex gap-4 text-4xl lg:text-6xl font-mono uppercase">
        {wordToGuess.split('').map((letter, index) => (
          <span key={index} className="border-b-4 border-white">
            <span style={{ visibility: guessedLetters.includes(letter) || isLoser ? 'visible' : 'hidden' }}>
              {letter}
            </span>
          </span>
        ))}
      </div>

      {/* Teclado */}
      <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
        {ALPHABET.map(letter => {
          const isGuessed = guessedLetters.includes(letter);
          const isIncorrect = isGuessed && !wordToGuess.includes(letter);
          return (
            <button
              onClick={() => addGuessedLetter(letter)}
              key={letter}
              disabled={isGuessed || isLoser || isWinner}
              className={`
                w-12 h-12 text-xl font-bold uppercase rounded
                bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:opacity-50
                ${isGuessed && wordToGuess.includes(letter) ? 'bg-green-600' : ''}
                ${isIncorrect ? 'bg-red-600' : ''}
              `}
            >
              {letter}
            </button>
          )
        })}
      </div>
      
      <button onClick={handleRestart} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors">
        Restart
      </button>

    </div>
  );
};

export default Hangman;