import axios from 'axios';
import createAuthRefreshInterceptor from '@esmkit/axios-auth-refresh';
export let BASEURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BASEURL_DEV
    : import.meta.env.VITE_BASEURL_PROD;

const CREDENTIALS = import.meta.env.VITE_CLIENT_CREDENTIALS_BASE64;

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    Authorization: `Basic ${CREDENTIALS}`,
  },
});

const refreshAuthLogic = failedRequest => {
  /* Função para trocar access token */
  console.log({ failedRequest });
  /* api
    .post('https://www.example.com/auth/token/refresh')
    .then(tokenRefreshResponse => {
      localStorage.setItem('token', tokenRefreshResponse.data.token);
      failedRequest.response.config.headers['Authorization'] =
        'Bearer ' + tokenRefreshResponse.data.token;
      return Promise.resolve();
    }); */
};

createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
