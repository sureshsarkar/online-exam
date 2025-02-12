import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
     'process.env.BACKEND_BASE_URL':JSON.stringify(process.env.BACKEND_BASE_URL)
  },
  // server: {
  //   port: 5000,
  //   proxy: {
  //     "/api": {
  //       target: "https://online-exam-huez.onrender.com",
  //       changeOrigin: true, // Important for CORS issues
  //       rewrite: (path) => path.replace(/^\/api/, "/api"), // Removes `/api` prefix
  //     },
  //   },
  // },
});
