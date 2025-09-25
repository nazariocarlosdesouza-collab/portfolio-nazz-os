import React, { useState } from 'react';
import { Lock, RefreshCw, Home, ChevronsUpDown } from 'lucide-react'; // 1. ChevronsUpDown importado para o menu mobile
import { useIsMobile } from '../../lib/useIsMobile'; // 2. Importamos nosso hook de detecção

const sites = [
  { name: 'Studio Oral', url: 'https://www.clinicastudiooral.com.br/' },
  { name: 'Sublime Seduction', url: 'https://sublimeseductionstore.com/' },
  { name: 'Red Cap', url: 'https://www.redcapbrasil.com.br/' },
  { name: 'Calvan', url: 'https://calvanrodrigues.com' },
  { name: 'Snook Import', url: 'https://snookimport.com.br/' },
  { name: 'Gustavo Angelieri', url: 'https://gustavoangelieri.com.br/' },
  { name: 'Vagisex', url: 'https://sublimeseductionstore.com/vagisex/' },
];

const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState(sites[0].url);
  const [displayUrl, setDisplayUrl] = useState(sites[0].url);
  const isMobile = useIsMobile(); // 3. Usamos o hook para saber se a tela é de celular

  const handleSiteChange = (newUrl) => {
    setCurrentUrl(newUrl);
    setDisplayUrl(newUrl);
  };

  return (
    <div className="bg-gray-700 h-full w-full flex flex-col">
      
      {/* 4. RENDERIZAÇÃO CONDICIONAL: OU ABAS, OU MENU DROPDOWN */}
      {isMobile ? (
        // --- VISUAL PARA MOBILE ---
        <div className="flex-shrink-0 p-2 relative">
          <select
            value={currentUrl}
            onChange={(e) => handleSiteChange(e.target.value)}
            className="w-full bg-gray-600 text-white p-3 border border-gray-500 rounded-md appearance-none"
          >
            {sites.map((site) => (
              <option key={site.name} value={site.url}>
                {site.name}
              </option>
            ))}
          </select>
          <ChevronsUpDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
        </div>
      ) : (
        // --- VISUAL PARA DESKTOP (O CÓDIGO ORIGINAL DAS ABAS) ---
        <div className="flex-shrink-0 flex items-end pt-2 px-2 overflow-x-auto">
          {sites.map((site) => (
            <button
              key={site.name}
              onClick={() => handleSiteChange(site.url)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-t-md -mb-px border-x border-t ${
                currentUrl === site.url 
                  ? 'bg-gray-200 text-black border-gray-300'
                  : 'bg-gray-600 text-white border-transparent hover:bg-gray-500'
              }`}
            >
              <span>{site.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* O restante do componente permanece igual */}
      <div className="flex-grow flex flex-col bg-gray-200 border-t border-gray-300 rounded-b-md">
        <div className="bg-gray-200 p-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1">
            <button onClick={() => handleSiteChange(sites[0].url)} className="p-1 hover:bg-gray-300 rounded"><Home size={16} /></button>
            <button onClick={() => handleSiteChange(currentUrl)} className="p-1 hover:bg-gray-300 rounded"><RefreshCw size={16} /></button>
          </div>
          <div className="bg-white flex-grow rounded-full flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300">
            <Lock size={14} className="mr-2 text-green-600" />
            <span className="truncate">{displayUrl}</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <iframe 
            src={currentUrl}
            title="Portfolio Site"
            className="w-full h-full border-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;