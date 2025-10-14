import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Método específico para obter token
api.getToken = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('grant_type', 'password');

  return axios
    .post('http://localhost:8080/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: 'myclientid',
        password: 'myclientsecret',
      },
    })
    .then(response => {
      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return response;
    })
    .catch(error => {
      console.error('Erro ao obter token:', error);
      throw error;
    });
};

api.getRefreshToken = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', localStorage.getItem('refresh_token'));

  return axios
    .post('http://localhost:8080/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: 'myclientid',
        password: 'myclientsecret',
      },
    })
    .then(response => {
      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return response;
    })
    .catch(error => {
      console.error('Erro ao obter token:', error);
      throw error;
    });
};

export default api;
