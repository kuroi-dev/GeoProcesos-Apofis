import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        resolve(__dirname, 'node_modules/@esri'),
        resolve(__dirname, 'node_modules/@arcgis'),
        resolve(__dirname, 'node_modules'),
        __dirname
      ]
    }
  },
})
