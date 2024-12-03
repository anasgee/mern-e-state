import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target: 'https://mern-e-state-5000.vercel.app' || 'http://localhost:5000',
        // target:  'http://localhost:5000',
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' from the path
      },
    },
    
  },

  plugins: [react()],
})
