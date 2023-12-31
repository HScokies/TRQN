import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'icons': path.resolve(__dirname, './src/assets/icons'),
      'images': path.resolve(__dirname, './src/assets/images'),
      'styles': path.resolve(__dirname, './src/assets/styles'),
      'pages': path.resolve(__dirname, './src/pages')
    },
  },
})
