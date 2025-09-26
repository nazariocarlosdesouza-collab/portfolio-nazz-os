// src/lib/store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  bootState: 'booting',
  finishBoot: () => set({ bootState: 'finished' }),
  openWindows: [],
  zIndexCounter: 10,
  selectedIcon: null,

  openWindow: (app) => set((state) => {
    const existingWindow = state.openWindows.find(win => win.id === app.id);
    const newZIndex = state.zIndexCounter + 1;
    if (existingWindow) {
      return {
        openWindows: state.openWindows.map(win =>
          win.id === app.id ? { ...win, zIndex: newZIndex } : win
        ),
        zIndexCounter: newZIndex,
      };
    }
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

  setSelectedIcon: (iconId) => set({ selectedIcon: iconId }),
  clearSelectedIcon: () => set({ selectedIcon: null }),
}));