// src/components/apps/Breakout.jsx - COMPLETO
import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURAÇÕES DO JOGO ---
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 550;
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 10;

// Configurações dos Tijolos
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 5;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 20;

// Função para criar a matriz de tijolos
const createBricks = () => {
  const bricks = [];
  for (let c = 0; c < BRICK_COLS; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 }; // 1 = visível, 0 = quebrado
    }
  }
  return bricks;
};


const Breakout = () => {
  const [paddleX, setPaddleX] = useState(BOARD_WIDTH / 2 - PADDLE_WIDTH / 2);
  const [ball, setBall] = useState({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 50 });
  const [ballVelocity, setBallVelocity] = useState({ x: 4, y: -4 });
  const [bricks, setBricks] = useState(createBricks());
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver', 'win'

  const gameBoardRef = useRef(null);
  const gameLoopRef = useRef();

  // Loop principal do jogo
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      let newBall = { ...ball };
      let newVelocity = { ...ballVelocity };
      let newBricks = [...bricks];
      let currentScore = score;
      
      // Movimento da Bola
      newBall.x += newVelocity.x;
      newBall.y += newVelocity.y;

      // Colisão com as paredes
      if (newBall.x - BALL_RADIUS < 0 || newBall.x + BALL_RADIUS > BOARD_WIDTH) {
        newVelocity.x = -newVelocity.x;
      }
      if (newBall.y - BALL_RADIUS < 0) {
        newVelocity.y = -newVelocity.y;
      }
      
      // Colisão com a raquete
      if (
        newBall.y + BALL_RADIUS > BOARD_HEIGHT - PADDLE_HEIGHT &&
        newBall.x > paddleX &&
        newBall.x < paddleX + PADDLE_WIDTH
      ) {
        newVelocity.y = -newVelocity.y;
      }
      
      // Colisão com os tijolos
      for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
          const b = newBricks[c][r];
          if (b.status === 1) {
            const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            b.x = brickX;
            b.y = brickY;
            if (
              newBall.x > brickX &&
              newBall.x < brickX + BRICK_WIDTH &&
              newBall.y > brickY &&
              newBall.y < brickY + BRICK_HEIGHT
            ) {
              newVelocity.y = -newVelocity.y;
              b.status = 0;
              currentScore += 10;
            }
          }
        }
      }
      
      // Condição de Game Over
      if (newBall.y + BALL_RADIUS > BOARD_HEIGHT) {
        setGameState('gameOver');
        return;
      }
      
      // Condição de Vitória
      if(currentScore === BRICK_ROWS * BRICK_COLS * 10) {
        setGameState('win');
        return;
      }

      setBall(newBall);
      setBallVelocity(newVelocity);
      setBricks(newBricks);
      setScore(currentScore);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, ball, ballVelocity, paddleX, bricks, score]);

  // Controle da raquete
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameBoardRef.current) return;
      const boardRect = gameBoardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - boardRect.left;
      if (relativeX > 0 && relativeX < BOARD_WIDTH) {
        setPaddleX(Math.max(0, Math.min(relativeX - PADDLE_WIDTH / 2, BOARD_WIDTH - PADDLE_WIDTH)));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartGame = () => {
    setScore(0);
    setBricks(createBricks());
    setBall({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 50 });
    setBallVelocity({ x: 4, y: -4 });
    setPaddleX(BOARD_WIDTH / 2 - PADDLE_WIDTH / 2);
    setGameState('playing');
  };

  const renderBricks = () => {
    return bricks.map((column, c) => 
      column.map((brick, r) => {
        if (brick.status === 1) {
          const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
          const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
          return (
            <div
              key={`${c}-${r}`}
              className="absolute bg-indigo-500 rounded"
              style={{ left: brickX, top: brickY, width: BRICK_WIDTH, height: BRICK_HEIGHT }}
            />
          );
        }
        return null;
      })
    );
  };

  const renderOverlay = () => {
    if (gameState === 'playing') return null;
    const message = {
        start: { title: "BREAKOUT", sub: "Mova o mouse para jogar." },
        gameOver: { title: "GAME OVER", sub: `Seu score: ${score}` },
        win: { title: "YOU WIN!", sub: `Score final: ${score}` },
    }[gameState];

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            <h2 className="text-5xl font-bold mb-4">{message.title}</h2>
            <p className="text-xl mb-8">{message.sub}</p>
            <button onClick={handleStartGame} className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors">
                {gameState === 'start' ? 'Start Game' : 'Play Again'}
            </button>
        </div>
    )
  }

  return (
    <div className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-4xl text-2xl font-mono mb-2">Score: {score}</div>
      <div 
        ref={gameBoardRef}
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
        className="relative bg-black border-2 border-white cursor-none"
      >
        {renderOverlay()}
        {renderBricks()}
        <div 
            className="absolute bg-blue-500 rounded-sm"
            style={{ left: paddleX, bottom: 0, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
        />
        <div
            className="absolute bg-white rounded-full"
            style={{ left: ball.x - BALL_RADIUS, top: ball.y - BALL_RADIUS, width: BALL_RADIUS * 2, height: BALL_RADIUS * 2 }}
        />
      </div>
    </div>
  );
};

export default Breakout;