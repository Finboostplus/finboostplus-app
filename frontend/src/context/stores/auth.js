import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, register } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';
import { customToast } from '../../components/CustomToast';
import { SecureLS } from '../../utils/localStorageEncryption';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      isLoading: false,
      setRefreshToken: ({
        access_token,
        refresh_token,
        token_type,
        expires_in,
      }) => {
        const access_tokenDecoded = jwtDecode(access_token);
        const { sub, username, authorities: roles } = access_tokenDecoded;
        const newCredentials = {
          token: `${token_type} ${access_token}`,
          refreshToken: refresh_token,
          user: {
            sub,
            username,
            roles,
            exp: expires_in,
          },
        };
        set(newCredentials);
      },
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
          const { sub, username, authorities: roles } = access_tokenDecoded;
          const user = {
            sub,
            username,
            roles,
            exp: jwtData.expires_in,
          };

          set({
            token: `${jwtData.token_type || ''} ${jwtData.access_token}`,
            refreshToken: jwtData.refresh_token,
            user,
          });
          delete response.value;
          customToast('Login realizado', 'Bem-vindo!', 'success');
          return response;
        } catch (e) {
          set({
            token: null,
            refreshToken: null,
            user: null,
            isLoading: false,
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
          refreshToken: null,
          user: null,
          isLoading: false,
        });
      },
    }),
    {
      name: 'access_token',
      storage: createJSONStorage(() => ({
        getItem: key => SecureLS.get(key), // já descriptografa
        setItem: (key, value) => SecureLS.set(key, value), // já criptografa
        removeItem: key => SecureLS.remove(key),
      })),
      partialize: state => ({
        token: state.token,
        user: state.user,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
