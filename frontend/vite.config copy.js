import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://online-exam-huez.onrender.com",
        changeOrigin: true, // Important for CORS issues
        secure: true, // Ensures HTTPS works properly
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes `/api` prefix
        ws: true, // Enable WebSocket support if needed
      },
    },
  },
});
