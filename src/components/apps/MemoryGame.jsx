// src/components/apps/MemoryGame.jsx - COMPLETO
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO DO JOGO ---
const SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Função para embaralhar o deck
const shuffleArray = (array) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Função para gerar o deck inicial
const generateDeck = () => {
  const pairedSymbols = [...SYMBOLS, ...SYMBOLS];
  return shuffleArray(pairedSymbols).map((symbol, index) => ({
    id: index,
    symbol: symbol,
    isFlipped: false,
    isMatched: false,
  }));
};


// Componente Principal do Jogo
const MemoryGame = () => {
  const [cards, setCards] = useState(generateDeck());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  // Efeito para checar combinações
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      // Se combinaram
      if (firstCard.symbol === secondCard.symbol) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.symbol === firstCard.symbol ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        // Se não combinaram, vira de volta após um tempo
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, index) =>
              index === firstCardIndex || index === secondCardIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);
  
  // Efeito para checar vitória
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (clickedIndex) => {
    if (cards[clickedIndex].isFlipped || cards[clickedIndex].isMatched || flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map((card, index) =>
      index === clickedIndex ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedIndex];
    setFlippedCards(newFlippedCards);
    
    if(newFlippedCards.length === 2) {
        setMoves(moves + 1);
    }
  };

  const handleRestart = () => {
    setCards(generateDeck());
    setFlippedCards([]);
    setMoves(0);
    setIsGameWon(false);
  };
  
  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Memory Game</h2>
        <span className="text-xl font-mono">Moves: {moves}</span>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="w-20 h-20 md:w-24 md:h-24 cursor-pointer [perspective:1000px]"
              onClick={() => handleCardClick(index)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 rounded-lg shadow-lg ${card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Face Traseira */}
                <div className="absolute w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-3xl font-bold [backface-visibility:hidden]">
                  ?
                </div>
                {/* Face Frontal */}
                <div className="absolute w-full h-full bg-gray-700 rounded-lg flex items-center justify-center text-4xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  {card.symbol}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isGameWon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg backdrop-blur-sm">
                <h3 className="text-4xl text-green-400 font-bold mb-4">You Win!</h3>
                <p>Completed in {moves} moves.</p>
            </div>
        )}
      </div>

      <button onClick={handleRestart} className="mt-8 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors">
        Restart Game
      </button>

    </div>
  );
};

export default MemoryGame;