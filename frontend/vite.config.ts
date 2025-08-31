import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5051,
    proxy: {
      '/products': {
        target: 'http://localhost:5050',
        changeOrigin: true
      }
    }
  }
})
