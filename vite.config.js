import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'charts':        ['recharts'],
          'd3':            ['d3'],
          'maps':          ['leaflet', 'react-leaflet', '@react-leaflet/core'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
