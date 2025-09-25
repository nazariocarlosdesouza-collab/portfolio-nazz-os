import React from 'react';

// --- Componentes dos Apps ---
import MeetWindow from '../components/apps/MeetWindow';
import ProjectsFolder from '../components/apps/ProjectsFolder';
import Browser from '../components/apps/Browser';
import FileExplorer from '../components/apps/FileExplorer';
import SnakeGame from '../components/apps/SnakeGame';
import SteamApp from '../components/apps/SteamApp';
import TextViewer from '../components/apps/TextViewer'; 
import ImageViewer from '../components/apps/ImageViewer';
import VideoViewer from '../components/apps/VideoViewer'; // 1. IMPORTAMOS O NOVO COMPONENTE

// --- Ícones do Desktop ---
import meetIcon from '../assets/icons/meet.png';
import projectsIcon from '../assets/icons/pastas.png';
import myComputerIcon from '../assets/icons/meu-computador.png';
import topSecretIcon from '../assets/icons/pasta2.png';
import chromeIcon from '../assets/icons/chrome.png';
import trashIcon from '../assets/icons/lixeira-cheia.png';
import steamIcon from '../assets/icons/steam.png';

// --- Ícones do Mobile ---
import meetMobileIcon from '../assets/icons-mobile/meet-mobile.png';
import steamMobileIcon from '../assets/icons-mobile/steam-mobile.png';
import notepadMobileIcon from '../assets/icons-mobile/bloco-de-notas-mobile.png';
import galleryMobileIcon from '../assets/icons-mobile/imagens-mobile.png';
import chromeMobileIcon from '../assets/icons-mobile/chrome-mobile.png';
import operaMobileIcon from '../assets/icons-mobile/opera-mobile.png';
import whatsappMobileIcon from '../assets/icons-mobile/whatsapp-mobile.png';
import videosMobileIcon from '../assets/icons-mobile/videos-mobile.png'; // 2. IMPORTAMOS O NOVO ÍCONE

export const appsConfig = {
  // --- APPS DO DESKTOP ORIGINAL ---
  meet: { id: 'meet', title: 'Apresentação', content: <MeetWindow />, width: 900, height: 650, desktopIcon: <img src={meetIcon} alt="Apresentação" className="w-12 h-12" />, mobileIcon: <img src={meetMobileIcon} alt="Meet" className="w-16 h-16" /> },
  projectsFolder: { id: 'projectsFolder', title: 'Projetos', desktopIcon: <img src={projectsIcon} alt="Projetos" className="w-12 h-12" />, content: <ProjectsFolder />, width: 500, height: 350 },
  myComputer: { id: 'myComputer', title: 'Meu Computador', desktopIcon: <img src={myComputerIcon} alt="Meu PC" className="w-12 h-12" />, content: <FileExplorer />, width: 800, height: 500 },
  trash: { id: 'trash', title: 'Lixeira', desktopIcon: <img src={trashIcon} alt="Lixeira" className="w-12 h-12" />, content: <FileExplorer initialView="trash" />, width: 800, height: 500 },
  topSecret: { id: 'topSecret', title: 'Top Secret.exe', desktopIcon: <img src={topSecretIcon} alt="Top Secret" className="w-12 h-12" />, content: <SnakeGame />, width: 700, height: 780 },
  steam: { id: 'steam', title: 'Steam', content: <SteamApp />, width: 1200, height: 750, desktopIcon: <img src={steamIcon} alt="Steam" className="w-12 h-12" />, mobileIcon: <img src={steamMobileIcon} alt="Steam" className="w-16 h-16" /> },

  // --- APPS E LINKS PARA O MOBILE ---
  chrome: { id: 'chrome', title: 'Projetos', icon: <img src={chromeIcon} alt="Navegador" className="w-8 h-8" />, content: <Browser />, width: 1024, height: 700, mobileIcon: <img src={chromeMobileIcon} alt="Chrome" className="w-16 h-16" /> },
  opera: { id: 'opera', title: 'Projetos', content: <Browser />, width: 1024, height: 700, mobileIcon: <img src={operaMobileIcon} alt="Opera" className="w-16 h-16" /> },
  notepad: { id: 'notepad', title: 'Escopo', content: <TextViewer />, width: 360, height: 600, mobileIcon: <img src={notepadMobileIcon} alt="Bloco de Notas" className="w-16 h-16" /> },
  gallery: { id: 'gallery', title: 'Galeria', content: <ImageViewer />, width: 360, height: 600, mobileIcon: <img src={galleryMobileIcon} alt="Galeria" className="w-16 h-16" /> },
  whatsapp: { id: 'whatsapp', title: 'WhatsApp', actionType: 'link', url: 'https://wa.me/5511968108594?text=Ol%C3%A1%20Naz%C3%A1rio%2C%20acabei%20de%20ver%20seu%20portfolio%2C%20podemos%20conversar%3F', mobileIcon: <img src={whatsappMobileIcon} alt="WhatsApp" className="w-16 h-16" /> },
  
  // 3. NOVA ENTRADA PARA O APP DE VÍDEOS
  videosApp: {
    id: 'videosApp',
    title: 'Vídeos',
    content: <VideoViewer />,
    width: 360,
    height: 600,
    mobileIcon: <img src={videosMobileIcon} alt="Vídeos" className="w-16 h-16" />,
  }
};