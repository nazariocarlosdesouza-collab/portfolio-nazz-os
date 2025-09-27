// src/lib/fileSystem.js
import notepadIcon from '../assets/icons/bloco-de-notas.png';
import chromeIcon from '../assets/icons/chrome.png';
import curriculoIcon from '../assets/icons/curriculo.png';
import operaIcon from '../assets/icons/opera.png';

const projectScopeText = `... (todo o seu texto do escopo aqui) ...`;
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

// LISTA DE SITES PARA O NAVEGADOR SECUNDÁRIO (OPERA)
export const operaSites = [
  { name: 'NC4 Design', url: 'https://www.nc4design.com.br/' },
  { name: 'Apollo LP', url: 'https://www.nc4design.com.br/lp/apollo' },
  { name: 'Bravionn', url: 'https://www.bravionn.com.br/' },
  { name: 'Água Help', url: 'https://aguahelp.com.br/' },
  { name: 'Comics Crossover', url: 'https://comicscrossover.com/' },
  { name: 'Teen Pure Emo', url: 'https://teenpureemo.com/' },
];

export const fileSystem = {
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
      id: 'curriculo-link', 
      name: 'Currículo', 
      icon: curriculoIcon,
      actionType: 'openLink',
      url: '/curriculo.pdf'
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
    { id: 'checklist-doc', name: 'Checklist.txt', icon: notepadIcon, content: checklistText },
  ],
};