// src/components/apps/SpaceInvaders.jsx - AGORA COM CONTROLES MOBILE
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, Crosshair } from 'lucide-react';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 20;
const PLAYER_SPEED = 10;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 15;
const BULLET_SPEED = 10;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 10;
const ALIEN_WIDTH = 40;
const ALIEN_HEIGHT = 30;
const ALIEN_GAP = 15;
const ALIEN_SPEED_X = 2;
const ALIEN_SPEED_Y = 20;

const SpaceInvaders = () => {
    const [player, setPlayer] = useState({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - PLAYER_HEIGHT - 10 });
    const [bullets, setBullets] = useState([]);
    const [aliens, setAliens] = useState([]);
    const [alienDirection, setAlienDirection] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [scale, setScale] = useState(1);

    const keysPressed = useRef({});
    const gameAreaRef = useRef(null);
    const wrapperRef = useRef(null);

    const createAliens = useCallback(() => {
        const newAliens = [];
        for (let row = 0; row < ALIEN_ROWS; row++) {
            for (let col = 0; col < ALIEN_COLS; col++) {
                newAliens.push({
                    x: col * (ALIEN_WIDTH + ALIEN_GAP) + ALIEN_GAP,
                    y: row * (ALIEN_HEIGHT + ALIEN_GAP) + ALIEN_GAP + 30,
                    width: ALIEN_WIDTH,
                    height: ALIEN_HEIGHT,
                    alive: true,
                });
            }
        }
        setAliens(newAliens);
    }, []);

    const shoot = useCallback(() => {
        if (gameStarted && !gameOver) {
            setBullets(prev => [...prev, { x: player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2, y: player.y }]);
        }
    }, [gameStarted, gameOver, player.x, player.y]);

    const startGame = () => {
        setPlayer({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - PLAYER_HEIGHT - 10 });
        setBullets([]);
        createAliens();
        setAlienDirection(1);
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        if (gameAreaRef.current) {
            gameAreaRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        keysPressed.current[e.key] = true;
        if (e.key === ' ') {
            e.preventDefault();
            shoot();
        }
    };

    const handleKeyUp = (e) => {
        keysPressed.current[e.key] = false;
    };

    const handleTouchMove = (direction, isMoving) => {
        keysPressed.current[direction] = isMoving;
    };

    useEffect(() => {
        const handleResize = () => {
            if (wrapperRef.current) {
                const { clientWidth, clientHeight } = wrapperRef.current;
                const scaleX = clientWidth / GAME_WIDTH;
                const scaleY = clientHeight / GAME_HEIGHT;
                setScale(Math.min(scaleX, scaleY));
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gameLoop = useCallback(() => {
        if (!gameStarted || gameOver) return;

        if (keysPressed.current['ArrowLeft'] && player.x > 0) {
            setPlayer(p => ({ ...p, x: p.x - PLAYER_SPEED }));
        }
        if (keysPressed.current['ArrowRight'] && player.x < GAME_WIDTH - PLAYER_WIDTH) {
            setPlayer(p => ({ ...p, x: p.x + PLAYER_SPEED }));
        }

        let newBullets = bullets.map(b => ({ ...b, y: b.y - BULLET_SPEED })).filter(b => b.y > 0);
        let newAliens = [...aliens];
        let scoreToAdd = 0;

        newBullets.forEach((bullet, bulletIndex) => {
            let bulletRemoved = false;
            newAliens.forEach((alien, alienIndex) => {
                if (!bulletRemoved && alien.alive &&
                    bullet.x < alien.x + alien.width &&
                    bullet.x + BULLET_WIDTH > alien.x &&
                    bullet.y < alien.y + alien.height &&
                    bullet.y + BULLET_HEIGHT > alien.y
                ) {
                    newAliens[alienIndex].alive = false;
                    newBullets.splice(bulletIndex, 1);
                    bulletRemoved = true;
                    scoreToAdd += 10;
                }
            });
        });

        if (scoreToAdd > 0) setScore(s => s + scoreToAdd);

        let edgeReached = false;
        newAliens = newAliens.map(alien => {
            if (alien.alive) {
                const newX = alien.x + ALIEN_SPEED_X * alienDirection;
                if (newX <= 0 || newX >= GAME_WIDTH - ALIEN_WIDTH) edgeReached = true;
                return { ...alien, x: newX };
            }
            return alien;
        });

        if (edgeReached) {
            setAlienDirection(dir => -dir);
            newAliens = newAliens.map(alien => ({ ...alien, y: alien.y + ALIEN_SPEED_Y }));
        }
        
        const isGameOver = newAliens.some(alien => alien.alive && alien.y + ALIEN_HEIGHT >= player.y);
        const allAliensDead = newAliens.every(alien => !alien.alive);

        if (isGameOver) {
            setGameOver(true);
            setGameStarted(false);
        } else if (allAliensDead && newAliens.length > 0) {
            createAliens();
        } else {
            setAliens(newAliens);
        }
        setBullets(newBullets);

    }, [player, bullets, aliens, alienDirection, gameOver, gameStarted, createAliens]);

    useEffect(() => {
        const interval = setInterval(gameLoop, 16);
        return () => clearInterval(interval);
    }, [gameLoop]);

    return (
        <div 
            className="w-full h-full bg-black flex flex-col items-center justify-center outline-none"
            ref={wrapperRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        >
            <div ref={gameAreaRef} style={{ width: GAME_WIDTH, height: GAME_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'center center' }} className="relative bg-gray-900">
                {!gameStarted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                         {gameOver && <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>}
                        <h2 className="text-3xl mb-2">Space Invaders</h2>
                        <p className="text-xl mb-6">Score: {score}</p>
                        <button onClick={startGame} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors">
                            {gameOver ? 'Play Again' : 'Start Game'}
                        </button>
                        <div className="mt-8 text-gray-400 hidden md:block">
                            <p>Use Arrow Keys to move & Spacebar to shoot</p>
                        </div>
                    </div>
                )}

                {gameStarted && (
                    <>
                        <div style={{ left: player.x, top: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }} className="absolute bg-green-500" />
                        {bullets.map((b, i) => <div key={i} style={{ left: b.x, top: b.y, width: BULLET_WIDTH, height: BULLET_HEIGHT }} className="absolute bg-yellow-400" />)}
                        {aliens.map((a, i) => a.alive && <div key={i} style={{ left: a.x, top: a.y, width: a.width, height: a.height }} className="absolute bg-red-500" />)}
                        <div className="absolute top-2 left-2 text-white font-bold text-xl">Score: {score}</div>
                    </>
                )}
            </div>
            
            {/* CONTROLES MOBILE */}
            <div className="w-full flex md:hidden items-center justify-around p-4 absolute bottom-0 left-0 z-20">
                <div className="flex gap-4">
                    <button 
                        onTouchStart={() => handleTouchMove('ArrowLeft', true)} 
                        onTouchEnd={() => handleTouchMove('ArrowLeft', false)}
                        className="p-5 bg-gray-500/50 text-white rounded-full active:bg-gray-400"
                    >
                        <ArrowLeft size={40} />
                    </button>
                    <button 
                        onTouchStart={() => handleTouchMove('ArrowRight', true)}
                        onTouchEnd={() => handleTouchMove('ArrowRight', false)}
                        className="p-5 bg-gray-500/50 text-white rounded-full active:bg-gray-400"
                    >
                        <ArrowRight size={40} />
                    </button>
                </div>
                <button 
                    onClick={shoot}
                    className="p-5 bg-red-600/70 text-white rounded-full active:bg-red-500"
                >
                    <Crosshair size={40} />
                </button>
            </div>
        </div>
    );
};

export default SpaceInvaders;