import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches where this game lives on the deployed site:
// https://winnyvinny.com/games/vinny-golf/
export default defineConfig({
  plugins: [react()],
  base: '/games/vinny-golf/',
  build: {
    outDir: '../vinny-golf',
    emptyOutDir: true,
  },
})
