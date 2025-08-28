import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    
    server: {
      port: 5173
    
    },
    
    build: {
      outDir: 'build'
    },
    
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      globals: true,
      css: true
    },
    
    
    define: {
      
      'import.meta.env.VITE_API_URL': JSON.stringify(
        process.env.VITE_API_URL || (mode === 'development' ? 'http://localhost:5000' : undefined)
      )
    }
  }
})
