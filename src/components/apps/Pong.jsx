// src/components/apps/Pong.jsx - AGORA MOBILE-FRIENDLY
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- CONFIGURAÇÕES DO JOGO ---
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 500;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
const PADDLE_SPEED = 5;

const Pong = () => {
  // --- ESTADOS DO JOGO ---
  const [paddleLeft, setPaddleLeft] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [paddleRight, setPaddleRight] = useState(BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ball, setBall] = useState({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 3 });
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [gameState, setGameState] = useState('start'); // 'start', 'playing'
  const [scale, setScale] = useState(1);

  const gameBoardRef = useRef(null);
  const gameLoopRef = useRef();
  const wrapperRef = useRef(null);

  const resetBall = useCallback((direction = 1) => {
    setBall({ x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 });
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;
    setBallVelocity({ x: 5 * direction, y: 3 * randomDirectionY });
  }, []);

  const startGame = () => {
    setScore({ player: 0, cpu: 0 });
    setGameState('playing');
    resetBall();
  };
  
  // --- CONTROLE DO JOGADOR (MOUSE E TOQUE) ---
  const handlePlayerMove = useCallback((clientY) => {
    if (gameState !== 'playing' || !gameBoardRef.current) return;
    const boardRect = gameBoardRef.current.getBoundingClientRect();
    const mouseY = clientY - boardRect.top;
    const newPaddleY = (mouseY / boardRect.height) * BOARD_HEIGHT - PADDLE_HEIGHT / 2;
    setPaddleRight(Math.max(0, Math.min(newPaddleY, BOARD_HEIGHT - PADDLE_HEIGHT)));
  }, [gameState]);

  useEffect(() => {
    const handleMouseMove = (e) => handlePlayerMove(e.clientY);
    const handleTouchMove = (e) => {
        if (e.touches[0]) handlePlayerMove(e.touches[0].clientY);
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


  // --- LOOP PRINCIPAL DO JOGO ---
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Movimento da bola
      setBall(prevBall => {
        const newBall = {
          x: prevBall.x + ballVelocity.x,
          y: prevBall.y + ballVelocity.y,
        };

        // Colisão com as paredes superior e inferior
        if (newBall.y <= 0 || newBall.y >= BOARD_HEIGHT - BALL_SIZE) {
          setBallVelocity(prev => ({ ...prev, y: -prev.y }));
        }

        // Ponto para a CPU
        if (newBall.x >= BOARD_WIDTH) {
          setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
          resetBall(-1);
        }

        // Ponto para o Jogador
        if (newBall.x <= 0) {
          setScore(prev => ({ ...prev, player: prev.player + 1 }));
          resetBall(1);
        }

        return newBall;
      });

      // IA da Raquete Esquerda (CPU)
      setPaddleLeft(prevPaddleLeft => {
        const paddleCenter = prevPaddleLeft + PADDLE_HEIGHT / 2;
        const ballY = ball.y; // Usar uma cópia do estado da bola para a IA
        if (paddleCenter < ballY - 20) {
            return Math.min(prevPaddleLeft + PADDLE_SPEED, BOARD_HEIGHT - PADDLE_HEIGHT);
        } else if (paddleCenter > ballY + 20) {
            return Math.max(prevPaddleLeft - PADDLE_SPEED, 0);
        }
        return prevPaddleLeft;
      });
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, ballVelocity, resetBall, ball.y]);

  // Colisão com as raquetes (useEffect separado para clareza)
  useEffect(() => {
    const hitRightPaddle = ball.x >= BOARD_WIDTH - PADDLE_WIDTH - BALL_SIZE && ball.y > paddleRight && ball.y < paddleRight + PADDLE_HEIGHT;
    const hitLeftPaddle = ball.x <= PADDLE_WIDTH && ball.y > paddleLeft && ball.y < paddleLeft + PADDLE_HEIGHT;
    
    if (hitRightPaddle && ballVelocity.x > 0) {
        setBallVelocity(prev => ({ ...prev, x: -prev.x * 1.05 }));
    }
    if (hitLeftPaddle && ballVelocity.x < 0) {
        setBallVelocity(prev => ({ ...prev, x: -prev.x * 1.05 }));
    }
  }, [ball, paddleLeft, paddleRight, ballVelocity.x]);

  // Efeito para redimensionar o jogo
  useEffect(() => {
    const handleResize = () => {
        if (wrapperRef.current) {
            const { clientWidth, clientHeight } = wrapperRef.current;
            const availableHeight = clientHeight - 80; // Subtrai espaço para o score
            const scaleX = clientWidth / BOARD_WIDTH;
            const scaleY = availableHeight / BOARD_HEIGHT;
            setScale(Math.min(scaleX, scaleY, 1)); // Garante que não ultrapasse o tamanho máximo
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full bg-[#1b2838] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      <div className="flex justify-between w-full mb-2 text-2xl sm:text-4xl font-mono" style={{ maxWidth: BOARD_WIDTH * scale }}>
        <span>CPU: {score.cpu}</span>
        <span>Player: {score.player}</span>
      </div>
      <div 
        ref={gameBoardRef} 
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top center' }}
        className="bg-black relative border-2 border-white"
      >
        {gameState === 'start' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
                <h2 className="text-5xl mb-4">PONG</h2>
                <p className="mb-4 text-center px-4">Mova o mouse ou arraste o dedo na tela para jogar.</p>
                <button onClick={startGame} className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors">
                    Start Game
                </button>
            </div>
        )}
        <div className="bg-white absolute" style={{ left: 5, top: paddleLeft, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }} />
        <div className="bg-white absolute" style={{ right: 5, top: paddleRight, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }} />
        {gameState === 'playing' && <div className="bg-white absolute" style={{ left: ball.x, top: ball.y, width: BALL_SIZE, height: BALL_SIZE }} />}
      </div>
    </div>
  );
};

export default Pong;