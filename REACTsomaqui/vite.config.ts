import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['leaflet']
  },
  build: {
    commonjsOptions: {
      include: [/leaflet/, /node_modules/]
    }
  }
})
