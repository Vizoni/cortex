import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'ui': path.resolve(__dirname, './src/ui'),
      'components': path.resolve(__dirname, './src/components'),
      'routes': path.resolve(__dirname, './src/routes'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'contexts': path.resolve(__dirname, './src/contexts'),
      'types': path.resolve(__dirname, './src/types'),
    },
  },
})
