import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Ajuste o caminho se tiver um arquivo de setup para testes, ou remova essa linha se não usar
    // setupFiles: './src/__tests__/setup.js',
    include: ['**/*.{test,spec}.{js,jsx}'],
  },
});
