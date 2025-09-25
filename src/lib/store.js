// src/lib/store.js - COMPLETO E ATUALIZADO
import { create } from 'zustand';

export const useStore = create((set) => ({
  // --- Estados do Boot ---
  bootState: 'booting',
  finishBoot: () => set({ bootState: 'finished' }),

  // --- Estados das Janelas ---
  openWindows: [],
  zIndexCounter: 10,

  // --- NOVO ESTADO: Ícone Selecionado ---
  selectedIcon: null, // Armazena o ID do ícone atualmente selecionado

  // --- Funções das Janelas ---
  openWindow: (app) => set((state) => {
    const isAlreadyOpen = state.openWindows.some(win => win.id === app.id);
    if (isAlreadyOpen) {
      const newZIndex = state.zIndexCounter + 1;
      return {
        openWindows: state.openWindows.map(win => 
          win.id === app.id ? { ...win, zIndex: newZIndex } : win
        ),
        zIndexCounter: newZIndex,
      };
    }
    
    const newZIndex = state.zIndexCounter + 1;
    const newWindow = { ...app, zIndex: newZIndex };

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

  // --- NOVAS FUNÇÕES: Controle de Ícones ---
  setSelectedIcon: (iconId) => set({ selectedIcon: iconId }),
  clearSelectedIcon: () => set({ selectedIcon: null }),
}));