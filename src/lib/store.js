// src/lib/store.js
import { create } from 'zustand';
import { appsConfig } from './apps.config'; // 1. IMPORTAR A CONFIGURAÇÃO DOS APPS

export const useStore = create((set) => ({
  bootState: 'booting',
  finishBoot: () => set({ bootState: 'finished' }),
  openWindows: [],
  zIndexCounter: 10,
  selectedIcon: null,

  // --- ESTADO DO BSOD (TELA AZUL) ---
  isBsodActive: false,
  triggerBsod: () => set({ isBsodActive: true }),
  resetBsod: () => set({ isBsodActive: false, bootState: 'booting' }),

  isStartMenuOpen: false,
  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  closeStartMenu: () => set({ isStartMenuOpen: false }),

  openWindow: (app) => set((state) => {
    // 2. LÓGICA ATUALIZADA E MAIS INTELIGENTE
    let appConfig = app;

    // Se o objeto 'app' passado tiver um 'appId', significa que é um atalho.
    // Vamos buscar a configuração completa do aplicativo em appsConfig.
    if (app.appId && appsConfig[app.appId]) {
      appConfig = { 
        ...appsConfig[app.appId], // Pega toda a config (width, height, content, etc.)
        id: app.id || app.appId, // Garante um ID único para a janela
      };
    }
    
    // O resto da lógica permanece a mesma, mas agora usando o appConfig completo
    const existingWindow = state.openWindows.find(win => win.id === appConfig.id);
    const newZIndex = state.zIndexCounter + 1;

    if (existingWindow) {
      // Se a janela já existe, apenas a trazemos para frente
      return {
        openWindows: state.openWindows.map(win =>
          win.id === appConfig.id ? { ...win, zIndex: newZIndex } : win
        ),
        zIndexCounter: newZIndex,
      };
    }
    
    // Se for uma nova janela, adicionamos à lista com todas as propriedades corretas
    const newWindow = { ...appConfig, zIndex: newZIndex };
    return {
      openWindows: [...state.openWindows, newWindow],
      zIndexCounter: newZIndex,
    };
  }),

  closeWindow: (appId) => set((state) => ({
    openWindows: state.openWindows.filter((win) => win.id !== appId),
  })),
  
  focusWindow: (appId) => set((state) => {
    const newZIndex = state.zIndexCounter + 1;
    return {
      openWindows: state.openWindows.map(win => 
        win.id === appId ? { ...win, zIndex: newZIndex } : win
      ),
      zIndexCounter: newZIndex,
    };
  }),

  setSelectedIcon: (iconId) => set({ selectedIcon: iconId }),
  clearSelectedIcon: () => set({ selectedIcon: null }),
}));