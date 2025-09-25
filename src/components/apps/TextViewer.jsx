import React from 'react';

// 1. O texto padrão do escopo do projeto é definido aqui dentro.
const defaultProjectScope = `Projeto Nazz OS

Portfolio interativo e imersivo para fechar parcerias com agencias de marketing e publicidade:

Escopo da minha ideia inicial

Criar um portfolio, imersivo, interativo que não apenas apresente o meu portfolio mas que demonstre a minha capacidade técnica e criativa de uma vez só, ter um portfolio que auto me venda de forma fluida rápida e divertida.

A base é criar um portfolio online que seja a simulação real de sistema operacional com carregamento Nazz Os... em destaque abaixo carregado sistema operacional de portifólo online, na tela de load. 

Preciso decidir se o carregamento deve ser Nazz OS ou Portfolio online Nazário.

Ao carregar o usuário vai se deparar um com uma tela de um sistema operacional aonde logo de cara ele já vê uma tela com linhas coloridas em movimento, todas ligas por pontinhos e interagem com a movimentação do mouse, da uma ideia de conexão neural em um background preto.

ao lado esquerdo é possível ver os ícones do Meet, a pasta projetos, o ícone do meu computador, a lixeira, a pasta top secret o logo da steam e o logo do whatsapp.

Meet: Abre um vídeo curto aonde eu me apresento e falo um pouco de mim.

Pasta projetos: ao dar dois clique abre o explorado de arquivos com dois ícones o Navegador do Chrome que ao ser clicado é possível ver alguns sites que eu já desenvolvi em um simulador de navegador real já com as abas de uma ao lado da outra já com os respectivos sites, clicou abre o site e é possível navegar pelo site inteiro pois ele é um iframe que busca o site real, todas as janelas que se abrem tem os botões - Minimizar / Quadrado = Maximizar e o botão fechar.

Ainda na Pasta projetos temos um ícone de pedf que ao clicar ao clicar abre o meu currículo em pdf mesmo.

Temos o Ícone de Meu computador na área de trabalho ao clicar nele, abre uma pasta com a estrutura de arquivos do Windows ( Área de trabalho / Downloads / Documentos / Imagens / Musicas / Vídeos e Lixeira.

Em Área de trabalho, tem todos os ícones clicáveis funcionais que estão na área de trabalho.
Em downloads coloquei 4 imagens que ao serem clicadas elas abrem em um visualizador de imagens.
Na pasta Documentos temos o checklist de alguns processos que foram feitos e esse documento aqui, com o descritivo completo do projeto.
Na nossa pasta Imagens, inseri mais 4 imagens funcionais.
Já pasta Músicas estou definindo serão representadas as músicas, mas teremos.
Na pasta vídeos temos 4 vídeos que ao serem clicados abrem o player, e passa um vídeo do meu canal de gameplay do you tube.
Temos a Lixeira que contem 7 arquivos de imagens que deixei com a função clicável e elas abrem também.
Chegamos a pasta Top Secret.exe que o ser clicada abre uma nova janela com o joguinho Snake.
Agora vamos ao ícone da Steam, esse ao ser clicado simula a interface da biblioteca de jogos da steam com o joguinhos funcionais totalmente jogáveis, Jogo da velha, jogo da forca, Pong, Jogo da memoria, Breakout, Campo minado, 2048 e o clássico tetris, ( Tetris está com um bug, preciso corrigir ) todos os jogos tem o icone e a capa do jogo.

Ao final temos o logo do Whatsapp que ao ser clicado o usuario é direcionado ao WhatsApp para falar direto comigo.

Essa é a base do meu portfolio iniciado em 22/09/2025 e finalizada a primeira etapa em 24/09/2025 da ideia a concepção final.
Hoje 25/05/2025 darei inicio a versão mobile.


Todo o projeto até aqui foi desenvolvido com: 

React
Vite
Tsparticles
Tailwindcss`;

// 2. A lógica para usar o texto padrão se 'textContent' não for fornecido é adicionada aqui.
const TextViewer = ({ textContent = defaultProjectScope }) => {
  return (
    <div className="bg-[#1e1e1e] h-full w-full flex flex-col text-gray-300 font-sans">
      
      <header className="flex-shrink-0 bg-[#333333] border-b border-black/30 px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <button className="px-2 py-0.5 rounded hover:bg-white/10">Arquivo</button>
          <button className="px-2 py-0.5 rounded hover:bg-white/10">Editar</button>
          <button className="px-2 py-0.5 rounded hover:bg-white/10">Exibir</button>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded hover:bg-white/10"></div>
            <div className="w-6 h-6 rounded hover:bg-white/10"></div>
        </div>
      </header>

      <main className="flex-grow bg-[#282828] font-mono p-4 overflow-y-auto">
        {/* 3. O componente renderiza o 'textContent' que pode ser o padrão ou o recebido via props */}
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {textContent}
        </pre>
      </main>

      <footer className="flex-shrink-0 bg-[#333333] border-t border-black/30 px-4 py-0.5 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
            <span>Ln 1, Col 1</span>
            <span>0 caractere</span>
        </div>
        <div className="flex items-center gap-4">
            <span>100%</span>
            <span>Windows (CRLF)</span>
            <span>UTF-8</span>
        </div>
      </footer>
    </div>
  );
};

export default TextViewer;