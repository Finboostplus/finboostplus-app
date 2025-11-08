import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, register } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';
import { customToast } from '../../components/CustomToast';
import CookieStorage from 'zustand-persist-cookie-storage';
import { SecureLS } from '../../utils/localStorageEncryption';

export const CustomCookieStorage = () => {
  const base = CookieStorage({ expires: 7 }); // fallback padrão

  return {
    setItem: (name, value) => {
      const base64String = SecureLS.Base64.encode(value);
      try {
        const parsed = JSON.parse(value);
        const exp = parsed?.state?.user?.exp;

        const expires =
          typeof exp === 'number' && !isNaN(exp)
            ? new Date(Date.now() + exp * 1000)
            : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // fallback 7 dias
        // Encode em UTF-8 e depois em Base64

        return CookieStorage({ expires }).setItem(name, base64String);
      } catch (error) {
        console.warn('[CustomCookieStorage] Erro ao definir item:', error);
        return base.setItem(name, base64String);
      }
    },

    getItem: async name => {
      try {
        const store = await CookieStorage().getItem(name);
        return SecureLS.Base64.decode(store);
      } catch (error) {
        console.warn('[CustomCookieStorage] Erro ao obter item:', error);
        return null;
      }
    },

    removeItem: name => {
      try {
        return base.removeItem(name);
      } catch (error) {
        console.warn('[CustomCookieStorage] Erro ao remover item:', error);
      }
    },
  };
};

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
        const { sub, authorities: roles } = access_tokenDecoded;
        const newCredentials = {
          token: `${token_type} ${access_token}`,
          refreshToken: refresh_token,
        };
        set(newCredentials);

        const user = {
          sub,
          roles,
          exp: expires_in,
        };
        set({ user });
      },
      login: async data => {
        set({ isLoading: true });
        try {
          const loginData = {
            username: data.email,
            password: data.password,
          };

          const response = await login(loginData);
          const { value: jwtData } = response;
          set({
            token: `${jwtData.token_type || ''} ${jwtData.access_token}`,
            refreshToken: jwtData.refresh_token,
          });

          const access_tokenDecoded = jwtDecode(jwtData.access_token);
          const { sub, authorities: roles } = access_tokenDecoded;

          const user = {
            sub,
            roles,
            exp: jwtData.expires_in,
          };
          set({ user });
          customToast('Login realizado', 'Bem-vindo!', 'success');
          /*   await useGroupStore.getState().getAllGroupUser(); */
          return;
        } catch (e) {
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
      reset: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isLoading: false,
        });
      },
    }),
    {
      name: 'finboost-auth',
      storage: createJSONStorage(CustomCookieStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

export const useAuthorityStore = create((set, get) => ({
  // Objeto que guarda a authority por grupo
  authorities: {},

  // Define a authority de um grupo
  setAuthority: (groupId, authority) => {
    set({
      authorities: {
        ...get().authorities,
        [groupId]: authority,
      },
    });
  },

  // Pega a authority de um grupo
  getAuthority: groupId => get().authorities[groupId],
  resetAuthority: () => {
    set({ authorities: {} });
  },
}));
