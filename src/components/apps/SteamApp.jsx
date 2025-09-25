// src/components/apps/SteamApp.jsx - SINCRONIZADO COM OS NOMES FINAIS DAS IMAGENS
import React, { useState } from 'react';
import { Home, Search, ChevronDown, ChevronLeft, ChevronRight, Bell, MessageSquare, Users, PlayCircle } from 'lucide-react';

// 1. IMPORTAÇÃO DE TODOS OS NOSSOS JOGOS
import TicTacToe from './TicTacToe';
import Hangman from './Hangman';
import Pong from './Pong';
import MemoryGame from './MemoryGame';
import Breakout from './Breakout';
import Minesweeper from './Minesweeper';
import Game2084 from './Game2048'; // Mantive o nome do componente
import Tetris from './Tetris';

// 2. LISTA DE JOGOS ATUALIZADA COM OS NOMES CORRETOS DOS ARQUIVOS DE IMAGEM
const games = [
  { id: 'tictactoe', name: 'Jogo da Velha', component: <TicTacToe />, icon: '/images/banners/jogo-da-velha-icon.png', banner: '/images/banners/jogo-da-velha-banner.png', recent: true },
  { id: 'hangman', name: 'Jogo da Forca', component: <Hangman />, icon: '/images/banners/forca-icon.png', banner: '/images/banners/forca-banner.png', recent: true },
  { id: 'pong', name: 'Pong', component: <Pong />, icon: '/images/banners/pong-icon.png', banner: '/images/banners/pong-banner.png', recent: true },
  { id: 'memory', name: 'Jogo da Memória', component: <MemoryGame />, icon: '/images/banners/jogo-da-memoria-icon.png', banner: '/images/banners/jogo-da-memoria-banner.png', recent: false },
  { id: 'breakout', name: 'Breakout', component: <Breakout />, icon: '/images/banners/breakout-icon.png', banner: '/images/banners/breakout-banner.png', recent: true },
  { id: 'minesweeper', name: 'Campo Minado', component: <Minesweeper />, icon: '/images/banners/campo-minado-icon.png', banner: '/images/banners/campo-minado-banner.png', recent: false },
  { id: 'game2048', name: '2048', component: <Game2084 />, icon: '/images/banners/2048-icon.png', banner: '/images/banners/2048-banner.png', recent: false },
  { id: 'tetris', name: 'Tetris', component: <Tetris />, icon: '/images/banners/tetris-icon.png', banner: '/images/banners/tetris-banner.png', recent: false },
];


const SteamApp = () => {
  const [activeGame, setActiveGame] = useState(null);

  const handleLaunchGame = (gameComponent) => {
    if (gameComponent) {
      setActiveGame(gameComponent);
    }
  };

  const handleGoHome = () => {
    setActiveGame(null);
  };

  return (
    <div className="bg-[#1b2838] h-full w-full flex flex-col text-gray-300 font-sans select-none">
      
      {/* Cabeçalho Superior */}
      <header className="flex-shrink-0 bg-[#171d25] h-10 flex items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-6">
          <span className="font-bold text-white">Steam</span>
          <span>Exibir</span>
          <span>Amigos</span>
          <span>Jogos</span>
          <span>Ajuda</span>
        </div>
        <div className="flex items-center gap-3">
            <Users size={18} className="text-gray-400 hover:text-white cursor-pointer" />
            <MessageSquare size={18} className="text-gray-400 hover:text-white cursor-pointer" />
            <Bell size={18} className="text-gray-400 hover:text-white cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="/images/nazz.jpeg" alt="Avatar" className="w-6 h-6 rounded" />
                <span>NazzGameplay</span>
                <ChevronDown size={16} />
            </div>
        </div>
      </header>

      {/* Corpo Principal */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Barra Lateral Esquerda */}
        <aside className="w-64 bg-[#212b3a] flex-shrink-0 flex flex-col p-3">
          <div className="flex items-center justify-between text-lg mb-2">
            <div className="flex items-center gap-2"><ChevronLeft size={20} /><ChevronRight size={20} className="text-gray-600" /></div>
            <span className="font-bold uppercase tracking-wider text-white">Biblioteca</span>
          </div>
          <button onClick={handleGoHome} className={`w-full text-left px-3 py-2 rounded mb-3 ${!activeGame ? 'bg-blue-500/80 text-white' : 'hover:bg-white/10'}`}>Página inicial</button>
          <div className="relative mb-3"><Search size={18} className="absolute left-2.5 top-2.5 text-gray-400" /><input type="text" placeholder="Buscar" className="bg-[#18202b] w-full pl-9 pr-3 py-2 rounded" /></div>
          
          <nav className="flex-1 overflow-y-auto pr-1">
            <ul>
              {games.map(game => (
                <li key={game.id}>
                  <button onClick={() => handleLaunchGame(game.component)} className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left ${activeGame === game.component ? 'bg-blue-500/60' : 'hover:bg-white/10'}`}>
                    <div className="flex items-center gap-2 overflow-hidden"><img src={game.icon} alt={game.name} className="w-8 h-8 object-cover" /><span className="truncate">{game.name}</span></div>
                    {game.component && <PlayCircle size={16} className="text-green-400 flex-shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Renderização Condicional: Jogo ou Biblioteca */}
        <main className="flex-1 bg-[#1b2838] overflow-y-auto">
          {activeGame ? (
            <div className="w-full h-full">{activeGame}</div>
          ) : (
            <section className="p-6">
              <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-light text-white">JOGOS RECENTES</h2><div className="flex items-center gap-2"><ChevronLeft size={24} className="cursor-pointer p-1 rounded-full hover:bg-white/10" /><ChevronRight size={24} className="cursor-pointer p-1 rounded-full hover:bg-white/10" /></div></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {games.filter(g => g.recent).map(game => (
                  <div key={game.id} className="cursor-pointer group relative" onClick={() => handleLaunchGame(game.component)}>
                    <img src={game.banner} alt={game.name} className="w-full h-auto rounded-md shadow-lg transition-transform transform group-hover:scale-105" />
                    {game.component && <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><PlayCircle size={64} className="text-white" /></div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

      </div>
    </div>
  );
};

export default SteamApp;