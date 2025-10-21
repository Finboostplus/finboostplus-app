import axios from 'axios';
import createAuthRefreshInterceptor from '@esmkit/axios-auth-refresh';
import { useAuthStore } from '../context/stores/auth';
import { refreshToken } from './auth';

export let BASEURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BASEURL_DEV
    : import.meta.env.VITE_BASEURL_PROD;

const CREDENTIALS = import.meta.env.VITE_CLIENT_CREDENTIALS_BASE64;

// Cria uma instância do Axios com a URL base da API para autenticação
export const apiAuthentication = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    Authorization: `Basic ${CREDENTIALS}`,
  },
});

/* ---------------------------------------------------------- */

//API para obter dados durante o uso do app

const refreshAuthLogic = async failedRequest => {
  /* Função para trocar access token */
  try {
    const refresh_token = useAuthStore.getState().refreshToken;
    const newCredentials = await refreshToken(refresh_token);
    useAuthStore.getState().setRefreshToken(newCredentials);
  } catch (error) {
    console.error('Erro ao fazer o refresh', error);
    useAuthStore.getState().logout();
  } finally {
    return failedRequest;
  }
};

export const apiApplication = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

apiApplication.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

createAuthRefreshInterceptor(apiApplication, refreshAuthLogic);
