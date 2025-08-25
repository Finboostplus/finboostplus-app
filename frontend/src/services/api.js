// services/api.js
const API_BASE_URL = {
  development: 'http://localhost:8080',
  test: 'http://localhost:8080',
  production: 'https://your-render-app.onrender.com' // Substitua pela URL do seu Render
};

// Detecta o ambiente atual
const getCurrentEnvironment = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'development';
    }
    if (window.location.hostname.includes('vercel.app')) {
      return 'production';
    }
  }
  return import.meta.env.MODE || 'development';
};

const environment = getCurrentEnvironment();
const baseURL = API_BASE_URL[environment];

console.log(`API Environment: ${environment}, Base URL: ${baseURL}`);

// Configuração do cliente HTTP
class ApiClient {
  constructor() {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    // Adiciona token JWT se disponível
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`Making ${config.method || 'GET'} request to:`, url);

      const response = await fetch(url, config);

      // Log da resposta para debug
      console.log(`Response status: ${response.status}`);

      // Se a resposta não for ok, lança erro
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP Error: ${response.status}`);
      }

      // Verifica se há conteúdo para fazer parse
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      // Retorna texto simples se não for JSON
      return await response.text();

    } catch (error) {
      console.error(`API Error on ${url}:`, error);
      throw error;
    }
  }

  // Métodos de conveniência
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data = null, options = {}) {
        console.log('POST data:', data);
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Instância singleton
const apiClient = new ApiClient();

export default apiClient;
