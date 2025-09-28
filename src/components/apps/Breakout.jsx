// src/components/apps/Breakout.jsx - AGORA COM CONTROLES MOBILE E LAYOUT RESPONSIVO
import React, { useState, useEffect, useRef, useCallback } from 'react';

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

const createBricks = () => {
  const bricks = [];
  for (let c = 0; c < BRICK_COLS; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
      const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
      bricks[c][r] = { x: brickX, y: brickY, status: 1 };
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
  const [scale, setScale] = useState(1);

  const gameBoardRef = useRef(null);
  const wrapperRef = useRef(null);
  const gameLoopRef = useRef();

  // Controle da raquete (unificado para mouse e toque)
  const handlePlayerMove = useCallback((clientX) => {
    if (!gameBoardRef.current) return;
    const boardRect = gameBoardRef.current.getBoundingClientRect();
    const relativeX = (clientX - boardRect.left) / scale; // Ajusta a posição baseada na escala
    setPaddleX(Math.max(0, Math.min(relativeX - PADDLE_WIDTH / 2, BOARD_WIDTH - PADDLE_WIDTH)));
  }, [scale]);

  useEffect(() => {
    const handleMouseMove = (e) => handlePlayerMove(e.clientX);
    const handleTouchMove = (e) => {
      if (e.touches[0]) handlePlayerMove(e.touches[0].clientX);
    };

    const currentWrapper = wrapperRef.current;
    if (currentWrapper) {
      currentWrapper.addEventListener('mousemove', handleMouseMove);
      currentWrapper.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (currentWrapper) {
        currentWrapper.removeEventListener('mousemove', handleMouseMove);
        currentWrapper.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [handlePlayerMove]);

  // Efeito para redimensionar o jogo
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const { clientWidth, clientHeight } = wrapperRef.current;
        const availableHeight = clientHeight - 50; // Subtrai espaço para o score
        const scaleX = clientWidth / BOARD_WIDTH;
        const scaleY = availableHeight / BOARD_HEIGHT;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loop principal do jogo
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      let newBall = { x: ball.x + ballVelocity.x, y: ball.y + ballVelocity.y };
      let newVelocity = { ...ballVelocity };
      let newBricks = bricks.map(col => col.map(brick => ({ ...brick })));
      let currentScore = score;
      
      // Colisões
      if (newBall.x <= BALL_RADIUS || newBall.x >= BOARD_WIDTH - BALL_RADIUS) newVelocity.x = -newVelocity.x;
      if (newBall.y <= BALL_RADIUS) newVelocity.y = -newVelocity.y;
      
      if (newBall.y >= BOARD_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS && newBall.x > paddleX && newBall.x < paddleX + PADDLE_WIDTH) newVelocity.y = -newVelocity.y;
      
      let bricksLeft = 0;
      for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
          const b = newBricks[c][r];
          if (b.status === 1) {
            bricksLeft++;
            if (newBall.x > b.x && newBall.x < b.x + BRICK_WIDTH && newBall.y > b.y && newBall.y < b.y + BRICK_HEIGHT) {
              newVelocity.y = -newVelocity.y;
              b.status = 0;
              currentScore += 10;
            }
          }
        }
      }
      
      // Condições de Fim de Jogo
      if (newBall.y >= BOARD_HEIGHT - BALL_RADIUS) { setGameState('gameOver'); return; }
      if (bricksLeft === 1) { setGameState('win'); return; } // Checa se só sobrou o tijolo que acabou de ser quebrado

      setBall(newBall);
      setBallVelocity(newVelocity);
      setBricks(newBricks);
      setScore(currentScore);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, ball, ballVelocity, paddleX, bricks, score]);

  const handleStartGame = () => {
    setScore(0);
    setBricks(createBricks());
    setBall({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT - 50 });
    setBallVelocity({ x: 4, y: -4 });
    setPaddleX(BOARD_WIDTH / 2 - PADDLE_WIDTH / 2);
    setGameState('playing');
  };

  const renderBricks = () => bricks.map((column, c) => 
    column.map((brick, r) => brick.status === 1 ? (
      <div key={`${c}-${r}`} className="absolute bg-indigo-500 rounded" style={{ left: brick.x, top: brick.y, width: BRICK_WIDTH, height: BRICK_HEIGHT }} />
    ) : null)
  );

  const renderOverlay = () => {
    if (gameState === 'playing') return null;
    const message = {
        start: { title: "BREAKOUT", sub: "Mova o mouse ou arraste o dedo para jogar." },
        gameOver: { title: "GAME OVER", sub: `Seu score: ${score}` },
        win: { title: "YOU WIN!", sub: `Score final: ${score}` },
    }[gameState];

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
            <h2 className="text-5xl font-bold mb-4">{message.title}</h2>
            <p className="text-xl mb-8">{message.sub}</p>
            <button onClick={handleStartGame} className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors">
                {gameState === 'start' ? 'Start Game' : 'Play Again'}
            </button>
        </div>
    );
  };

  return (
    <div ref={wrapperRef} className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      <div className="w-full text-2xl font-mono mb-2" style={{ maxWidth: BOARD_WIDTH * scale }}>Score: {score}</div>
      <div 
        ref={gameBoardRef}
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top center' }}
        className="relative bg-black border-2 border-white"
      >
        {renderOverlay()}
        {renderBricks()}
        <div className="absolute bg-blue-500 rounded-sm" style={{ left: paddleX, bottom: 0, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }} />
        {gameState === 'playing' && <div className="absolute bg-white rounded-full" style={{ left: ball.x - BALL_RADIUS, top: ball.y - BALL_RADIUS, width: BALL_RADIUS * 2, height: BALL_RADIUS * 2 }} />}
      </div>
    </div>
  );
};

export default Breakout;