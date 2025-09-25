// src/components/apps/Pong.jsx - COMPLETO
import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÕES DO JOGO ---
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 500;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
const PADDLE_SPEED = 5; // Velocidade da raquete da CPU

const Pong = () => {
  // --- ESTADOS DO JOGO ---
  const [paddleLeft, setPaddleLeft] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [paddleRight, setPaddleRight] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ball, setBall] = useState({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 3 });
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'

  const gameBoardRef = useRef(null);
  const gameLoopRef = useRef();

  // --- LOOP PRINCIPAL DO JOGO ---
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Movimento da bola
      setBall(prevBall => ({
        x: prevBall.x + ballVelocity.x,
        y: prevBall.y + ballVelocity.y,
      }));

      // IA da Raquete Esquerda (CPU)
      setPaddleLeft(prevPaddleLeft => {
        const paddleCenter = prevPaddleLeft + PADDLE_HEIGHT / 2;
        if (paddleCenter < ball.y - 20) {
            return Math.min(prevPaddleLeft + PADDLE_SPEED, BOARD_HEIGHT - PADDLE_HEIGHT);
        } else if (paddleCenter > ball.y + 20) {
            return Math.max(prevPaddleLeft - PADDLE_SPEED, 0);
        }
        return prevPaddleLeft;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, ball.y, ballVelocity.x, ballVelocity.y]);


  // --- LÓGICA DE COLISÃO ---
  useEffect(() => {
    // Colisão com as paredes superior e inferior
    if (ball.y <= 0 || ball.y >= BOARD_HEIGHT - BALL_SIZE) {
      setBallVelocity(prev => ({ ...prev, y: -prev.y }));
    }

    // Colisão com as raquetes
    const hitRightPaddle = ball.x >= BOARD_WIDTH - PADDLE_WIDTH - BALL_SIZE && ball.y > paddleRight && ball.y < paddleRight + PADDLE_HEIGHT;
    const hitLeftPaddle = ball.x <= PADDLE_WIDTH && ball.y > paddleLeft && ball.y < paddleLeft + PADDLE_HEIGHT;

    if (hitRightPaddle || hitLeftPaddle) {
      setBallVelocity(prev => ({ ...prev, x: -prev.x * 1.05 })); // Aumenta a velocidade a cada rebatida
    }

    // Ponto para a CPU (bola passa pela direita)
    if (ball.x >= BOARD_WIDTH) {
      setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
      resetBall();
    }

    // Ponto para o Jogador (bola passa pela esquerda)
    if (ball.x <= 0) {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      resetBall();
    }
  }, [ball, paddleLeft, paddleRight]);
  
  // --- CONTROLE DO JOGADOR ---
  useEffect(() => {
    const handleMouseMove = (e) => {
        if (!gameBoardRef.current) return;
        const boardRect = gameBoardRef.current.getBoundingClientRect();
        const mouseY = e.clientY - boardRect.top;
        setPaddleRight(Math.max(0, Math.min(mouseY - PADDLE_HEIGHT / 2, BOARD_HEIGHT - PADDLE_HEIGHT)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const resetBall = () => {
    setBall({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 });
    // Direção aleatória após o ponto
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;
    setBallVelocity({ x: 5 * (ballVelocity.x > 0 ? -1 : 1) , y: 3 * randomDirectionY });
  };
  
  const startGame = () => {
    setScore({ player: 0, cpu: 0 });
    resetBall();
    setGameState('playing');
  };

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="flex justify-between w-full max-w-4xl mb-4 text-4xl font-mono">
        <span>CPU: {score.cpu}</span>
        <span>Player: {score.player}</span>
      </div>
      <div 
        ref={gameBoardRef} 
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
        className="bg-black relative border-2 border-white cursor-none"
      >
        {gameState === 'start' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                <h2 className="text-5xl mb-4">PONG</h2>
                <p className="mb-8">Mova o mouse para controlar a raquete da direita.</p>
                <button onClick={startGame} className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors">
                    Start Game
                </button>
            </div>
        )}
        <div 
          className="bg-white absolute" 
          style={{ left: 5, top: paddleLeft, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
        />
        <div 
          className="bg-white absolute" 
          style={{ right: 5, top: paddleRight, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
        />
        <div 
          className="bg-white absolute" 
          style={{ left: ball.x, top: ball.y, width: BALL_SIZE, height: BALL_SIZE }}
        />
      </div>
    </div>
  );
};

export default Pong;