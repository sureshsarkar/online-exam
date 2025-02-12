import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "https://online-exam-huez.onrender.com",
        changeOrigin: true, // Important for CORS issues
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Removes `/api` prefix
      },
    },
  },
});
