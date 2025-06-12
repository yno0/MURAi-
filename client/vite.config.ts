import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-content-script',
      writeBundle() {
        // Copy content script
        fs.copyFileSync(
          path.join(__dirname, 'public/content.js'),
          path.join(__dirname, 'dist/content.js')
        )
        
        // Copy manifest
        fs.copyFileSync(
          path.join(__dirname, 'public/manifest.json'),
          path.join(__dirname, 'dist/manifest.json')
        )
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.join(__dirname, 'index.html'),
      },
    },
  }
})
