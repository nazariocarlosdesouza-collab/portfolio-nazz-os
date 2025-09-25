// src/components/apps/ProjectsFolder.jsx - COMPLETO E ATUALIZADO
import React from 'react';
import DesktopIcon from '../os/DesktopIcon';
import { useStore } from '../../lib/store';
import { appsConfig } from '../../lib/apps.config';

// 1. Importamos os dois ícones que vamos usar
import chromeIcon from '../../assets/icons/chrome.png';
import curriculoIcon from '../../assets/icons/curriculo.png';

const ProjectsFolder = () => {
  const { openWindow } = useStore();

  const handleOpenBrowser = () => {
    openWindow(appsConfig.projects); 
  };

  // 2. Nova função para abrir o PDF em uma nova aba
  const handleOpenCurriculo = () => {
    // O caminho '/curriculo.pdf' funciona porque o arquivo está na pasta 'public'
    window.open('/curriculo.pdf', '_blank');
  };

  return (
    // O fundo escuro que definimos anteriormente
    <div className="bg-[#1e1e1e] h-full w-full p-4 flex items-start justify-start">
      {/* Ícone do Portfólio (sem alteração) */}
      <DesktopIcon
        label="Portifolio Nazário"
        icon={<img src={chromeIcon} alt="Navegador" className="w-12 h-12" />}
        onDoubleClick={handleOpenBrowser}
      />
      {/* 3. Adicionamos o novo ícone do Currículo aqui */}
      <DesktopIcon
        label="Currículo"
        icon={<img src={curriculoIcon} alt="Currículo" className="w-12 h-12" />}
        onDoubleClick={handleOpenCurriculo}
      />
    </div>
  );
};

export default ProjectsFolder;