import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vite 8 uses rolldown + oxc instead of rollup + esbuild
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    target: 'esnext',
    // 'oxc' is the Vite 8 native minifier (replaces esbuild in Vite 8)
    minify: 'oxc',
    emptyOutDir: true,
  },
})
