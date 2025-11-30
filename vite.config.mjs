import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,  // Change to your desired port
    host: '0.0.0.0',  // Listen on all interfaces (useful for Docker)
    allowedHosts: [
      'swamp.krupko.space',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    transformMode: {
      web: [/\.[jt]sx?$/]
    }
  }
})
