// src/store/useLoveStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'romantic-birthday';

export const useLoveStore = create(
  persist(
    (set, get) => ({
      // State
      hearts: 0,
      collectedHearts: [], // Store IDs of collected hearts
      secretUnlocked: false,
      musicMuted: false,
      
      // Actions
      collectHeart: (heartId) => {
        const { collectedHearts, hearts, secretUnlocked } = get();
        
        // Prevent duplicate collection
        if (collectedHearts.includes(heartId)) return false;
        
        const newCollected = [...collectedHearts, heartId];
        const newHeartCount = hearts + 1;
        const shouldUnlockSecret = newHeartCount >= 5 && !secretUnlocked;
        
        set({
          collectedHearts: newCollected,
          hearts: newHeartCount,
          secretUnlocked: shouldUnlockSecret || secretUnlocked,
        });
        
        // Play heart sound effect (optional)
        return true;
      },
      
      resetHearts: () => {
        set({ hearts: 0, collectedHearts: [], secretUnlocked: false });
      },
      
      toggleMusicMute: () => set((state) => ({ musicMuted: !state.musicMuted })),
      
      loadFromStorage: () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            set({
              hearts: data.state.hearts || 0,
              collectedHearts: data.state.collectedHearts || [],
              secretUnlocked: data.state.secretUnlocked || false,
              musicMuted: data.state.musicMuted || false,
            });
          } catch (e) {
            console.error('Failed to load saved data', e);
          }
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        hearts: state.hearts,
        collectedHearts: state.collectedHearts,
        secretUnlocked: state.secretUnlocked,
        musicMuted: state.musicMuted,
      }),
    }
  )
);