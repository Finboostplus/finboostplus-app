// services/userService.js
import apiClient from './api.js';

class UserService {
  
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @param {string} userData.name - Nome completo
   * @param {string} userData.email - Email
   * @param {string} userData.password - Senha
   * @param {string} [userData.colorTheme] - Tema de cor opcional
   * @returns {Promise<string>} Mensagem de sucesso
   */
  async registerUser(userData) {
    try {
      const response = await apiClient.post('/user', userData);
      return response;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      
      // Trata diferentes tipos de erro do backend
      if (error.message.includes('E-mail já cadastrado')) {
        throw new Error('Este email já está cadastrado no sistema');
      }
      
      if (error.message.includes('400')) {
        throw new Error('Dados inválidos. Verifique os campos obrigatórios');
      }
      
      if (error.message.includes('422')) {
        throw new Error('Erro de validação dos campos');
      }
      
      if (error.message.includes('500')) {
        throw new Error('Erro interno do servidor. Tente novamente mais tarde');
      }
      
      // Erro genérico
      throw new Error('Erro ao criar conta. Tente novamente');
    }
  }

  /**
   * Atualiza dados do usuário
   * @param {Object} userData - Dados para atualizar
   * @returns {Promise<string>} Mensagem de sucesso
   */
  async updateUser(userData) {
    try {
      const response = await apiClient.put('/user', userData);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar perfil. Tente novamente');
    }
  }

  /**
   * Verifica informações do usuário logado
   * @returns {Promise<string>} Informações do usuário
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/user/whoareyou');
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error);
      throw new Error('Erro ao verificar usuário logado');
    }
  }

  /**
   * Testa endpoint restrito (demo)
   * @returns {Promise<string>} Resposta do endpoint
   */
  async testRestrictedEndpoint() {
    try {
      const response = await apiClient.get('/user/no');
      return response;
    } catch (error) {
      console.error('Erro ao acessar endpoint restrito:', error);
      throw new Error('Acesso negado ou erro de autenticação');
    }
  }
}

// Instância singleton
const userService = new UserService();

export default userService;

// Exporta também a classe para testes se necessário
export { UserService };
