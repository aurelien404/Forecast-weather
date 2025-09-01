import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';



export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    svgr()
  ],
  server: {
    host: '0.0.0.0',
    https: false,
    port: 5173,
  }
});
