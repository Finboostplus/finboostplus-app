import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const KEY = 'app_theme';

export const useThemeStore = create(
  persist(
    set => ({
      theme: 'light', // usado apenas se não houver nada no localStorage
      logo_image: '/light_mode_logo.png',
      toggleTheme: () =>
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          const logo = {
            dark: '/dark_mode_logo.png',
            light: '/light_mode_logo.png',
          };

          // Atualiza a classe do HTML para refletir o novo tema
          document.documentElement.className = newTheme;

          return { theme: newTheme, logo_image: logo[newTheme] };
        }),
    }),
    {
      name: KEY,
      // Hook chamado ao hidratar do storage
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Falha ao reidratar o tema', error);
          return;
        }
        if (state) {
          // aplica classe e garante que logo corresponda
          document.documentElement.className = state.theme;
        }
      },
    }
  )
);
