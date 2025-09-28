// src/components/apps/Tetris.jsx - CORREÇÃO DEFINITIVA
import React, { useState, useEffect, useRef, useCallback } from 'react'; // 1. Importar useCallback

// --- CONFIGURAÇÕES E LÓGICA DO JOGO ---
const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;

const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

const TETROMINOS = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: { shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]], color: '80, 227, 230' },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: '36, 95, 223' },
  L: { shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']], color: '223, 173, 36' },
  O: { shape: [['O', 'O'], ['O', 'O']], color: '223, 217, 36' },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: '48, 211, 56' },
  T: { shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]], color: '132, 61, 198' },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: '227, 78, 78' },
};

const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

const Cell = ({ type }) => {
    const color = TETROMINOS[type] ? TETROMINOS[type].color : '0, 0, 0';
    return <div className="w-full aspect-square border-r border-b border-black/50" style={{ backgroundColor: `rgba(${color}, 0.8)` }} />;
};

const Tetris = () => {
  const [stage, setStage] = useState(createStage());
  const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, tetromino: TETROMINOS[0], collided: false });
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState(null);

  const gameAreaRef = useRef(null);

  const updatePlayerPos = useCallback(({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  }, []);
  
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetromino(),
      collided: false,
    });
  }, []);

  const checkCollision = (p, s, { x: moveX, y: moveY }) => {
    for (let y = 0; y < p.tetromino.shape.length; y += 1) {
      for (let x = 0; x < p.tetromino.shape[y].length; x += 1) {
        if (p.tetromino.shape[y][x] !== 0) {
          if (
            !s[y + p.pos.y + moveY] ||
            !s[y + p.pos.y + moveY][x + p.pos.x + moveX] ||
            s[y + p.pos.y + moveY][x + p.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  // 2. CORREÇÃO PRINCIPAL: Envolver a lógica do 'drop' em useCallback
  const drop = useCallback(() => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
        if (player.pos.y < 1) {
            setGameOver(true);
            setDropTime(null);
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [player, stage, updatePlayerPos]);


  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
        if (keyCode === 40) {
            setDropTime(1000 / (level + 1));
        }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const playerRotate = (currentStage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = clonedPlayer.tetromino.shape.map((_, index) =>
        clonedPlayer.tetromino.shape.map(col => col[index]),
    );
    if (dir > 0) clonedPlayer.tetromino.shape = clonedPlayer.tetromino.shape.map(row => row.reverse());
    else clonedPlayer.tetromino.shape.reverse();
    
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, currentStage, {x: 0, y: 0})) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > clonedPlayer.tetromino.shape[0].length) {
            clonedPlayer.pos.x = pos;
            return;
        }
    }
    setPlayer(clonedPlayer);
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
        if (keyCode === 37) movePlayer(-1);
        else if (keyCode === 39) movePlayer(1);
        else if (keyCode === 40) dropPlayer();
        else if (keyCode === 38) playerRotate(stage, 1);
    }
  };

  useEffect(() => {
    if (player.collided) {
      const newStage = stage.map(row => [...row]);
      player.tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, 'merged'];
          }
        });
      });

      const sweepRows = newStg => 
        newStg.reduce((ack, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            setRows(prev => prev + 10);
            setScore(prev => prev + 10);
            ack.unshift(new Array(newStg[0].length).fill([0, 'clear']));
            return ack;
          }
          ack.push(row);
          return ack;
        }, []);
      
      const sweptStage = sweepRows(newStage);
      setStage(sweptStage);
      resetPlayer();
    }
  }, [player, resetPlayer, stage]);
  
  useEffect(() => {
    if(rows > (level + 1) * 5) {
        setLevel(prev => prev + 1);
        setDropTime(1000 / (level + 2));
    }
  }, [rows, level]);

  // 3. Adicionar a função `drop` ao array de dependências
  useEffect(() => {
    if (!gameOver && dropTime) {
      const interval = setInterval(() => {
        drop();
      }, dropTime);
      return () => clearInterval(interval);
    }
  }, [dropTime, gameOver, drop]);

  return (
    <div 
        className="w-full h-full bg-[#1b2838] flex items-center justify-center p-4 outline-none"
        onKeyDown={e => move(e)} 
        onKeyUp={keyUp} 
        tabIndex="0"
        ref={gameAreaRef}
    >
      <div className="flex gap-8">
        <div className="bg-black/50 border-2 border-gray-600">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${STAGE_WIDTH}, 1fr)`}}>
            {stage.map((row, y) => row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />))}
            </div>
        </div>
        <aside className="w-48 flex flex-col gap-4">
            {gameOver && <div className="p-4 bg-red-600 text-white text-center rounded">GAME OVER</div>}
            <div className="p-4 bg-gray-900 rounded-lg text-lg">
                <h3 className="text-gray-400">Score</h3>
                <p className="text-2xl font-bold">{score}</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg text-lg">
                <h3 className="text-gray-400">Rows</h3>
                <p className="text-2xl font-bold">{rows}</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg text-lg">
                <h3 className="text-gray-400">Level</h3>
                <p className="text-2xl font-bold">{level}</p>
            </div>
            <button 
                onClick={startGame} 
                className="p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors"
            >
                Start Game
            </button>
        </aside>
      </div>
    </div>
  );
};

export default Tetris;