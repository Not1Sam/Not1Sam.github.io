import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const version = fs.readFileSync('../VERSION', 'utf-8').trim()

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
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: true,
  },
})
