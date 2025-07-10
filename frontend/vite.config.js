import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.js', // <- descomente e ajuste o caminho
    include: ['**/*.{test,spec}.{js,jsx}'],
  },
});
