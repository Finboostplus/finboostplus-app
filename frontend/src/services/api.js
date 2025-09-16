import axios from "axios";

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: "https://api.finboostplus.com",
  headers: {
    "Content-Type": "application/json",
    
  },

});

export default api;
