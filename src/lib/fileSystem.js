// REMOVEMOS O 'import React' DAQUI
import notepadIcon from '../assets/icons/bloco-de-notas.png';

// Este arquivo centraliza todos os dados de arquivos do sistema operacional.

const checklistText = `- Finalizar portfolio imersivo para enviar para as agencias
- Revisar portfolio OS
- Fazer checklist das agências
- Finalizar projetos em andamento

** Não esquecer de fazer a verão mobilie do portfolio

- Testar porfolio
- Inserir a Steam funcional kkkkkk
- Gerar Documentação hard para o portfolio`;

export const fileSystem = {
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
    // --- A CORREÇÃO ESTÁ AQUI ---
    // O ícone agora é apenas a string do caminho da imagem, e não mais um <img ... />
    { id: 'checklist-doc', name: 'Checklist.txt', icon: notepadIcon, content: checklistText },
  ],
};