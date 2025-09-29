// src/lib/fileSystem.js
import notepadIcon from '../assets/icons/bloco-de-notas.png';
import chromeIcon from '../assets/icons/chrome.png';
import curriculoIcon from '../assets/icons/curriculo.png';
import operaIcon from '../assets/icons/opera.png';

const projectScopeText = `Projeto Nazz OS

Escopo da minha ideia inicial

Criar um portfolio, imersivo, interativo que não apenas apresente o meu portfolio mas que demonstre a minha capacidade técnica e criativa de uma vez só, ter um portfolio que auto me venda de forma fluida rápida e divertida.

A base é criar um portfolio online que seja a simulação real de sistema operacional com carregamento Nazz Os... em destaque abaixo carregado sistema operacional de portifólo online, na tela de load. 

Ao carregar o usuário vai se deparar um com uma tela de um sistema operacional aonde logo de cara ele já vê uma tela com linhas coloridas em movimento, todas ligas por pontinhos e interagem com a movimentação do mouse, da uma ideia de conexão neural em um background preto.

ao lado esquerdo é possível ver os ícones do Meet, a pasta projetos, o ícone do meu computador, a lixeira, a pasta top secret o logo da steam e o logo do whatsapp, sendo que todos são interativos.

Pasta projetos: ao dar dois clique abre o explorado de arquivos com dois ícones o Navegador do Chrome que ao ser clicado é possível ver alguns sites que eu já desenvolvi em um simulador de navegador real já com as abas de uma ao lado da outra já com os respectivos sites, clicou abre o site e é possível navegar pelo site inteiro pois ele é um iframe que busca o site real, todas as janelas que se abrem tem os botões - Minimizar / Quadrado = Maximizar e o botão fechar.

Ainda na Pasta projetos temos um ícone de pdf que ao clicar ao clicar abre o meu currículo em pdf mesmo.

Temos o Ícone de Meu computador na área de trabalho ao clicar nele, abre uma pasta com a estrutura de arquivos do Windows ( Área de trabalho / Downloads / Documentos / Imagens / Musicas / Videos e Lixeira).

Em Área de trabalho, tem todos os ícones clicáveis funcionais que estão em Meu Computador.
Em downloads coloquei 4 imagens que ao serem clicadas elas abrem em um visualizador de imagens.
Na pasta Documentos temos o checklist de alguns processos que foram feitos e esse documento aqui, com o descritivo completo do projeto.
Na nossa pasta Imagens, inseri mais 4 imagens funcionais.
Já pasta Músicas estou definindo serão representadas as músicas, mas teremos.
Na pasta vídeos temos 4 vídeos que ao serem clicados abrem o player, e passa um vídeo do meu canal de gameplay do you tube.
Temos a Lixeira que contem 7 arquivos de imagens que deixei com a função clicável e elas abrem também.
Chegamos a pasta Top Secret.exe que o ser clicada abre uma nova janela com o joguinho Snake.
Agora vamos ao ícone da Steam, esse ao ser clicado simula a interface da biblioteca de jogos da steam com o joguinhos funcionais totalmente jogáveis, Jogo da velha, jogo da forca, Pong, Jogo da memoria, Breakout, Campo minado, 2048 e o clássico Space invaders todos os jogos tem o icone e a capa do jogo.

Ao final temos o logo do Whatsapp que ao ser clicado o usuário é direcionado ao WhatsApp para falar direto comigo.

Essa é a base do meu portfolio iniciado em 22/09/2025 e finalizada a primeira etapa em 28/09/2025 da ideia a concepção final.

A versão mobile simula os aplicativos de um smartphone, da mesma forma que na versão desktop eles também são todos interativos e funcionais.

Todo o projeto até aqui foi desenvolvido com: 

React
Vite
Typescript
Tsparticles
Tailwindcss
Bun
Vercel`;

const checklistText = `... (todo o seu texto do checklist aqui) ...`;

// LISTA DE SITES PARA O NAVEGADOR PADRÃO (CHROME) COM AS STACKS
export const chromeSites = [
  { 
    name: 'Studio Oral', 
    url: 'https://www.clinicastudiooral.com.br/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento e redimensionamento de imagens',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
      css3: 'Usado na realização de alguns ajustes específicos',
      hostinger: 'Hospedagem compartilhada e e-mails corporativos',
    }
  },
  { 
    name: 'Sublime Seduction', 
    url: 'https://sublimeseductionstore.com/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento e redimensionamento de imagens',
      woocommerce: 'Implantação da loja virtual',
      stripe: 'Implementação gateway de pagamento',
      'turbo-cloud': 'Hospedagem compartilhada',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
      'html-5': 'Para Ajustes especificos',
      css3: 'Usado na realização de alguns ajustes específicos',
      sora: 'Para a Criação dos banners e modelos',
    }
  },
  { 
    name: 'Red Cap', 
    url: 'https://www.redcapbrasil.com.br/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface a partir de html-5',
      photoshop: 'Criação dos pacs do curso',
      woocommerce: 'Reestruturação completa da loja virtual',
      asaas: 'Implementação novo gateway de pagamento',
      css3: 'Usado na realização de alguns ajustes específicos',
    }
  },
  { 
    name: 'Calvan', 
    url: 'https://calvanrodrigues.com',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento e redimensionamento de imagens',
      woocommerce: 'Implantação da loja virtual',
      'mercado-pago': 'Implementação gateway de pagamento',
      hostinger: 'Hospedagem compartilhada',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
    }
  },
  { 
    name: 'Snook Import', 
    url: 'https://snookimport.com.br/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento e redimensionamento de imagens',
      hostinger: 'Hospedagem compartilhada',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
      sora: 'Para a Criação dos banners e modelos',
      illustrator: 'Pacs para animação',
      'after-effects': 'Criação do vídeo animado',
      premiere: 'Edição e finalização do vídeo',
    }
  },
  { 
    name: 'Gustavo Angelieri', 
    url: 'https://gustavoangelieri.com.br/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento de imagens e redimensionamento',
      hostinger: 'Hospedagem compartilhada e email',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
    }
  },
  { 
    name: 'Vagisex', 
    url: 'https://sublimeseductionstore.com/vagisex/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento de imagens e redimensionamento',
      'turbo-cloud': 'Hospedagem compartilhada e email',
      'pixel-meta': 'Instalação e configuração pixel da meta',
      sora: 'Para a Criação dos banners e das modelos',
    }
  },
];

// LISTA DE SITES PARA O NAVEGADOR SECUNDÁRIO (OPERA) COM AS STACKS ATUALIZADAS
export const operaSites = [
  { 
    name: 'NC4 Design', 
    url: 'https://www.nc4design.com.br/',
    stack: {
      react: 'Base tecnológica para criar interfaces rápidas e modernas.',
      typescript: 'Garante um código mais robusto e livre de erros.',
      tailwindcss: 'Criação de um design totalmente personalizado e responsivo.',
      shadcn: 'Biblioteca de elementos visuais que assegura um design coeso.',
      vite: 'Tecnologia de otimização que faz o site carregar instantaneamente.',
      bun: 'Otimizador que torna a construção e manutenção mais eficiente.',
      vercel: 'Hospedagem de alta performance que garante velocidade e segurança.',
      emailjs: 'Responsável pela comunicação via formulários de forma segura.',
      photoshop: 'Tratamento profissional de imagens para máxima qualidade visual.',
      'google-tag-manager': 'Gerenciamento central de ferramentas de marketing.',
      'google-analytics': 'Monitoramento de tráfego e comportamento dos visitantes.',
      'google-search-console': 'Ferramenta para garantir que o site seja encontrado no Google.',
    }
  },
  { 
    name: 'Apollo LP', 
    url: 'https://www.nc4design.com.br/lp/apollo',
    stack: {
      react: 'Base tecnológica para criar interfaces rápidas e modernas.',
      typescript: 'Garante um código mais robusto e livre de erros.',
      tailwindcss: 'Criação de um design totalmente personalizado e responsivo.',
      shadcn: 'Biblioteca de elementos visuais que assegura um design coeso.',
      vite: 'Tecnologia de otimização que faz o site carregar instantaneamente.',
      bun: 'Otimizador que torna a construção e manutenção mais eficiente.',
      vercel: 'Hospedagem de alta performance que garante velocidade e segurança.',
      emailjs: 'Responsável pela comunicação via formulários de forma segura.',
      photoshop: 'Tratamento profissional de imagens para máxima qualidade visual.',
      'google-tag-manager': 'Gerenciamento central de ferramentas de marketing.',
      'google-analytics': 'Monitoramento de tráfego e comportamento dos visitantes.',
      'google-search-console': 'Ferramenta para garantir que o site seja encontrado no Google.',
    }
  },
  { 
    name: 'Bravionn', 
    url: 'https://www.bravionn.com.br/',
    stack: {
      react: 'Base tecnológica para criar interfaces rápidas e modernas.',
      typescript: 'Garante um código mais robusto e livre de erros.',
      tailwindcss: 'Criação de um design totalmente personalizado e responsivo.',
      shadcn: 'Biblioteca de elementos visuais que assegura um design coeso.',
      vite: 'Tecnologia de otimização que faz o site carregar instantaneamente.',
      bun: 'Otimizador que torna a construção e manutenção mais eficiente.',
      vercel: 'Hospedagem de alta performance que garante velocidade e segurança.',
      emailjs: 'Responsável pela comunicação via formulários de forma segura.',
      photoshop: 'Tratamento profissional de imagens para máxima qualidade visual.',
      'google-tag-manager': 'Gerenciamento central de ferramentas de marketing.',
      'google-analytics': 'Monitoramento de tráfego e comportamento dos visitantes.',
      'google-search-console': 'Ferramenta para garantir que o site seja encontrado no Google.',
    }
  },
  { 
    name: 'Água Help', 
    url: 'https://aguahelp.com.br/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      photoshop: 'Tratamento de imagens e redimensionamento',
      hostinger: 'Hospedagem compartilhada e email',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
    }
  },
  { 
    name: 'Comics Crossover', 
    url: 'https://comicscrossover.com/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      illustrator: 'Para criação do logo',
      n8n: 'Para automatizar a criação de artigos, imagens e postar',
      'chat-gpt': 'Para criação e elaboração dos Artigos',
      sora: 'Para a Criação das imagens',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
      hostinger: 'Hospedagem compartilhada e e-mails corporativos',
    }
  },
  { 
    name: 'Teen Pure Emo', 
    url: 'https://teenpureemo.com/',
    stack: {
      wordpress: 'Base do site',
      elementor: 'Construção da interface',
      illustrator: 'Para criação do logo',
      n8n: 'Para automatizar a criação de artigos, imagens e postar',
      'chat-gpt': 'Para criação e elaboração dos Artigos',
      sora: 'Para a Criação das imagens',
      'google-tag-manager': 'Integração para outras ferramentas Google',
      'google-analytics': 'Configuração e integração ao Google Tag Manager',
      'google-search-console': 'Indexação do site ao Google',
      hostinger: 'Hospedagem compartilhada e e-mails corporativos',
    }
  },
];

export const fileSystem = {
  desktop: [
    { 
      id: 'portfolio-link-desktop', 
      name: 'Portifolio Nazário (Chrome)', 
      icon: chromeIcon, 
      actionType: 'openApp',
      appId: 'chrome'
    },
    {
      id: 'escopo-doc-desktop',
      name: 'Escopo.txt',
      icon: notepadIcon,
      actionType: 'openTextViewer',
      content: projectScopeText
    }
  ],
  projects: [
    { 
      id: 'portfolio-link', 
      name: 'Portifolio Nazário (Chrome)', 
      icon: chromeIcon, 
      actionType: 'openApp',
      appId: 'chrome'
    },
    {
      id: 'portfolio-opera-link',
      name: 'Portifolio Nazário (Opera)',
      icon: operaIcon,
      actionType: 'openApp',
      appId: 'opera'
    },
    { 
      id: 'perfil-tecnico-link', 
      name: 'Perfil Técnico', 
      icon: curriculoIcon,
      actionType: 'openProfileViewer'
    },
    {
      id: 'escopo-doc',
      name: 'Escopo.txt',
      icon: notepadIcon,
      actionType: 'openTextViewer',
      content: projectScopeText
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
    { id: 'checklist-doc', name: 'Checklist.txt', icon: notepadIcon, content: checklistText, actionType: 'openTextViewer' },
  ],
};