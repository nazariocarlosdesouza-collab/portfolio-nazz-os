// src/lib/fileSystem.js
import notepadIcon from '../assets/icons/bloco-de-notas.png';
import chromeIcon from '../assets/icons/chrome.png';
import curriculoIcon from '../assets/icons/curriculo.png';

// 1. O TEXTO DO ESCOPO AGORA VIVE AQUI, JUNTO COM OS OUTROS DADOS
const projectScopeText = `Projeto Nazz OS

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

const checklistText = `- Finalizar portfolio imersivo para enviar para as agencias
- Revisar portfolio OS
- Fazer checklist das agências
- Finalizar projetos em andamento

** Não esquecer de fazer a verão mobilie do portfolio

- Testar porfolio
- Inserir a Steam funcional kkkkkk
- Gerar Documentação hard para o portfolio`;

export const fileSystem = {
  projects: [
    { 
      id: 'portfolio-link', 
      name: 'Portifolio Nazário', 
      icon: chromeIcon, 
      actionType: 'openApp',
      appId: 'chrome'
    },
    { 
      id: 'curriculo-link', 
      name: 'Currículo', 
      icon: curriculoIcon,
      actionType: 'openLink',
      url: '/curriculo.pdf'
    },
    // 2. O NOVO ARQUIVO "ESCOPO.TXT" É ADICIONADO AQUI
    {
      id: 'escopo-doc',
      name: 'Escopo.txt',
      icon: notepadIcon, // Usando o ícone correto que importamos
      actionType: 'openTextViewer', // O novo tipo de ação
      content: projectScopeText // O conteúdo que será exibido
    }
  ],
  downloads: [
    { name: 'desk-redcap-brasil.webp', path: '/downloads/desk-redcap-brasil.webp' },
    { name: 'mb-calvan-rodrigues.webp', path: '/downloads/mb-calvan-rodrigues.webp' },
    { name: 'mb-clinica-studio-oral.webp', path: '/downloads/mb-clinica-studio-oral.webp' },
    { name: 'nazz-gameplay-c4d.png', path: '/downloads/nazz-gameplay-c4d.png' },
  ],
  images: [
    { name: 'nazz.jpeg', path: '/images/nazz.jpeg' },
    { name: 'programando-react.jpg', path: '/images/programando-react.jpg' },
    { name: 'wallpaper-react.png', path: '/images/wallpaper-react.png' },
    { name: 'wallpaper-tailwind-css.jpg', path: '/images/wallpaper-tailwind-css.jpg' },
  ],
  videos: [
    { name: 'Icarus Survival -Minério Infinito', path: 'eIiJEEwkNv4', icon: 'https://img.youtube.com/vi/eIiJEEwkNv4/mqdefault.jpg' },
    { name: 'Icarus Survival -Top 5 Cavernas', path: '7AivkaAIjxU', icon: 'https://img.youtube.com/vi/7AivkaAIjxU/mqdefault.jpg' },
    { name: 'Icarus Survival - Minerio Profundo', path: 'aqsSlUB42JU', icon: 'https://img.youtube.com/vi/aqsSlUB42JU/mqdefault.jpg' },
    { name: 'Icarus Survival - Minerios Infinitos', path: 'eIiJEEwkNv4', icon: 'https://img.youtube.com/vi/eIiJEEwkNv4/mqdefault.jpg' },
  ],
  trash: [
    { name: 'banner.webp', path: '/lixeira/banner.webp' },
    { name: 'banner_lp.webp', path: '/lixeira/banner_lp.webp' },
    { name: 'banner-docs-ambientais.png', path: '/lixeira/banner-docs-ambientais.png' },
    { name: 'bravionn.png', path: '/lixeira/bravionn.png' },
    { name: 'bravionn-02.png', path: '/lixeira/bravionn-02.png' },
    { name: 'bravionn-03.png', path: '/lixeira/bravionn-03.png' },
    { name: 'bravionn-04.png', path: '/lixeira/bravionn-04.png' },
  ],
  documents: [
    { id: 'checklist-doc', name: 'Checklist.txt', icon: notepadIcon, content: checklistText },
  ],
};