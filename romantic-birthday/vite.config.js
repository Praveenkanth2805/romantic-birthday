import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/romantic-birthday/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group three.js related modules into a separate chunk
          if (id.includes('node_modules/three') || 
              id.includes('@react-three/fiber') || 
              id.includes('@react-three/drei')) {
            return 'three';
          }
          // Everything else goes to vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})