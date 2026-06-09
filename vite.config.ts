import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',

      // เพิ่มอันนี้
      allowedHosts: true,

      // หรือ fix เฉพาะ ngrok host:
      // allowedHosts: [
      //   '84b2-2405-9800-b660-ad89-90bd-163a-16b1-eff5.ngrok-free.app'
      // ],
    },

    plugins: [
      react(),
      tailwindcss(),
    ],

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});