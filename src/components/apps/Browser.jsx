// src/components/apps/Browser.jsx
import React, { useState } from 'react';
import { Lock, RefreshCw, Home, ChevronsUpDown } from 'lucide-react';
import { useIsMobile } from '../../lib/useIsMobile';
import TechStackDisplay from './TechStackDisplay'; // Importa o novo componente
import { chromeSites } from '../../lib/fileSystem'; // Importa a lista de sites padrão

const themes = {
  default: {
    bg: 'bg-gray-700',
    tabActiveBg: 'bg-gray-200',
    tabInactiveBg: 'bg-gray-600',
    tabTextActive: 'text-black',
    tabTextInactive: 'text-white',
    tabBorderActive: 'border-gray-300',
    tabHover: 'hover:bg-gray-500',
    addressBarBg: 'bg-gray-200',
    addressBarIcons: 'text-gray-800',
    addressBarIconsHover: 'hover:bg-gray-300',
  },
  opera: {
    bg: 'bg-[#1e1e1e]',
    tabActiveBg: 'bg-[#282828]',
    tabInactiveBg: 'bg-[#121212]',
    tabTextActive: 'text-white',
    tabTextInactive: 'text-gray-400',
    tabBorderActive: 'border-red-500',
    tabHover: 'hover:bg-[#333]',
    addressBarBg: 'bg-[#282828]',
    addressBarIcons: 'text-red-500',
    addressBarIconsHover: 'hover:bg-white/10',
  }
};

const Browser = ({ sites = chromeSites, theme = 'default' }) => {
  const [currentSite, setCurrentSite] = useState(sites[0]);
  const isMobile = useIsMobile();
  const currentTheme = themes[theme] || themes.default;

  const handleSiteChange = (newUrl) => {
    const newSite = sites.find(site => site.url === newUrl);
    if (newSite) {
      setCurrentSite(newSite);
    }
  };

  return (
    <div className={`${currentTheme.bg} h-full w-full flex flex-col relative overflow-hidden`}>
      {!isMobile && <TechStackDisplay stack={currentSite.stack} />}
      
      {isMobile ? (
        <div className="flex-shrink-0 p-2 relative">
          <select value={currentSite.url} onChange={(e) => handleSiteChange(e.target.value)} className="w-full bg-gray-600 text-white p-3 border border-gray-500 rounded-md appearance-none">
            {sites.map((site) => (<option key={site.name} value={site.url}>{site.name}</option>))}
          </select>
          <ChevronsUpDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
        </div>
      ) : (
        <div className="flex-shrink-0 flex items-end pt-2 px-2 overflow-x-auto">
          {sites.map((site) => (
            <button
              key={site.name}
              onClick={() => handleSiteChange(site.url)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-t-md -mb-px border-x border-t ${
                currentSite.url === site.url 
                  ? `${currentTheme.tabActiveBg} ${currentTheme.tabTextActive} ${currentTheme.tabBorderActive}`
                  : `${currentTheme.tabInactiveBg} ${currentTheme.tabTextInactive} border-transparent ${currentTheme.tabHover}`
              }`}
            >
              <span>{site.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className={`flex-grow flex flex-col ${currentTheme.tabActiveBg} border-t ${currentTheme.tabBorderActive} rounded-b-md`}>
        <div className={`${currentTheme.addressBarBg} p-2 flex items-center gap-2 flex-shrink-0`}>
          <div className="flex gap-1">
            <button onClick={() => handleSiteChange(sites[0].url)} className={`p-1 rounded ${currentTheme.addressBarIconsHover}`}>
              <Home size={16} className={currentTheme.addressBarIcons} />
            </button>
            <button onClick={() => handleSiteChange(currentSite.url)} className={`p-1 rounded ${currentTheme.addressBarIconsHover}`}>
              <RefreshCw size={16} className={currentTheme.addressBarIcons} />
            </button>
          </div>
          <div className="bg-white flex-grow rounded-full flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300">
            <Lock size={14} className="mr-2 text-green-600" />
            <span className="truncate">{currentSite.url}</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <iframe 
            src={currentSite.url}
            title="Portfolio Site"
            className="w-full h-full border-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;