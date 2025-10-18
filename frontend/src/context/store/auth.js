import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, register } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';
import { customToast } from '../../components/CustomToast';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      isAuthenticated: () => !!get().token,
      login: async data => {
        set({ isLoading: true });
        try {
          const loginData = {
            username: data.email,
            password: data.password,
          };

          const response = await login(loginData);
          const { value: jwtData } = response;
          const access_tokenDecoded = jwtDecode(jwtData.access_token);
          const {
            sub,
            username,
            authorities: roles,
            exp,
          } = access_tokenDecoded;
          const user = {
            sub,
            username,
            roles,
            exp,
          };

          set({
            token: jwtData.access_token,
            user,
          });
          delete response.value;
          customToast('Login realizado', 'Bem-vindo!', 'success');
          return response;
        } catch (e) {
          set({
            token: null,
            user: null,
          });

          const { title, error } = e;
          customToast(title, error, 'error');
          return;
        } finally {
          set({ isLoading: false });
        }
      },
      register: async data => {
        set({ isLoading: true });
        try {
          await register(data);
          customToast(
            'Tudo certo!',
            `Seu cadastro foi concluído com sucesso 😄
            Foi enviado no seu email um link para ativação da conta`,
            'success'
          );
          return;
        } catch (e) {
          const { title, error } = e;
          customToast(title, error, 'error');
          return;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
        });
        window.location.href = '/login';
      },
    }),
    {
      name: 'access_token',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
