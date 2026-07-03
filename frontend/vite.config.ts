import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

let version = 'dev';
try {
  version = fs.readFileSync('../VERSION', 'utf-8').trim();
} catch {}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    outDir: 'dist',
    sourcemap: 'hidden',
  },
  server: {
    port: 5173,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    css: true,
  },
})
