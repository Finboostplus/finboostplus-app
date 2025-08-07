# 🔧 Serviços - Frontend FinBoost+

Esta documentação descreve a camada de serviços do frontend, responsável por integração com APIs, gerenciamento de estado e operações de dados.

---

## 🏗️ **Arquitetura de Serviços**

```
src/services/
├── api.js           # Cliente HTTP configurado
├── auth.js          # Serviços de autenticação
├── groups.js        # Operações de grupos
├── expenses.js      # Gestão de despesas
├── users.js         # Operações de usuário
└── storage.js       # LocalStorage helpers
```

---

## 🌐 **Cliente HTTP Base**

### **api.js**
```javascript
import axios from 'axios'
import { getToken, removeToken } from './storage'

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para tratar respostas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

### **Configuração de Ambientes**
```javascript
// Variáveis de ambiente
const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api',
    TIMEOUT: 10000,
  },
  production: {
    API_BASE_URL: 'https://api.finboostplus.com/api',
    TIMEOUT: 5000,
  },
}

export default config[import.meta.env.MODE] || config.development
```

---

## 🔐 **Serviços de Autenticação**

### **auth.js**
```javascript
import apiClient from './api'
import { setToken, removeToken, getUser, setUser } from './storage'

export const authService = {
  /**
   * Login do usuário
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - Dados do usuário e token
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      const { token, user } = response.data
      
      setToken(token)
      setUser(user)
      
      return { token, user }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro no login')
    }
  },

  /**
   * Registro de novo usuário
   * @param {Object} userData - { name, email, password }
   * @returns {Promise<Object>} - Dados do usuário criado
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro no cadastro')
    }
  },

  /**
   * Logout do usuário
   */
  logout() {
    removeToken()
    setUser(null)
    window.location.href = '/login'
  },

  /**
   * Verifica se usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = getToken()
    const user = getUser()
    return !!(token && user)
  },

  /**
   * Recuperação de senha
   * @param {string} email
   * @returns {Promise<Object>}
   */
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao recuperar senha')
    }
  },

  /**
   * Validar token atual
   * @returns {Promise<Object>} - Dados atualizados do usuário
   */
  async validateToken() {
    try {
      const response = await apiClient.get('/auth/me')
      const user = response.data
      setUser(user)
      return user
    } catch (error) {
      this.logout()
      throw error
    }
  },
}
```

---

## 👥 **Serviços de Grupos**

### **groups.js**
```javascript
import apiClient from './api'

export const groupsService = {
  /**
   * Buscar todos os grupos do usuário
   * @returns {Promise<Array>} - Lista de grupos
   */
  async getGroups() {
    try {
      const response = await apiClient.get('/groups')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar grupos')
    }
  },

  /**
   * Buscar grupo por ID
   * @param {string} groupId
   * @returns {Promise<Object>} - Dados do grupo
   */
  async getGroup(groupId) {
    try {
      const response = await apiClient.get(`/groups/${groupId}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar grupo')
    }
  },

  /**
   * Criar novo grupo
   * @param {Object} groupData - { name, description }
   * @returns {Promise<Object>} - Grupo criado
   */
  async createGroup(groupData) {
    try {
      const response = await apiClient.post('/groups', groupData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar grupo')
    }
  },

  /**
   * Atualizar grupo
   * @param {string} groupId
   * @param {Object} groupData
   * @returns {Promise<Object>} - Grupo atualizado
   */
  async updateGroup(groupId, groupData) {
    try {
      const response = await apiClient.put(`/groups/${groupId}`, groupData)
      return response.data
    } catch (error) {
      throw new Error('Erro ao atualizar grupo')
    }
  },

  /**
   * Excluir grupo
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async deleteGroup(groupId) {
    try {
      await apiClient.delete(`/groups/${groupId}`)
    } catch (error) {
      throw new Error('Erro ao excluir grupo')
    }
  },

  /**
   * Convidar usuário para grupo
   * @param {string} groupId
   * @param {string} email
   * @returns {Promise<Object>} - Dados do convite
   */
  async inviteUser(groupId, email) {
    try {
      const response = await apiClient.post(`/groups/${groupId}/invite`, { email })
      return response.data
    } catch (error) {
      throw new Error('Erro ao enviar convite')
    }
  },

  /**
   * Aceitar convite para grupo
   * @param {string} inviteCode
   * @returns {Promise<Object>} - Dados do grupo
   */
  async acceptInvite(inviteCode) {
    try {
      const response = await apiClient.post(`/groups/accept-invite/${inviteCode}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao aceitar convite')
    }
  },

  /**
   * Sair do grupo
   * @param {string} groupId
   * @returns {Promise<void>}
   */
  async leaveGroup(groupId) {
    try {
      await apiClient.post(`/groups/${groupId}/leave`)
    } catch (error) {
      throw new Error('Erro ao sair do grupo')
    }
  },
}
```

---

## 💰 **Serviços de Despesas**

### **expenses.js**
```javascript
import apiClient from './api'

export const expensesService = {
  /**
   * Buscar despesas de um grupo
   * @param {string} groupId
   * @param {Object} filters - { category, dateFrom, dateTo, page }
   * @returns {Promise<Object>} - Lista paginada de despesas
   */
  async getExpenses(groupId, filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await apiClient.get(`/groups/${groupId}/expenses?${params}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar despesas')
    }
  },

  /**
   * Buscar despesa por ID
   * @param {string} expenseId
   * @returns {Promise<Object>} - Dados da despesa
   */
  async getExpense(expenseId) {
    try {
      const response = await apiClient.get(`/expenses/${expenseId}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar despesa')
    }
  },

  /**
   * Criar nova despesa
   * @param {string} groupId
   * @param {Object} expenseData
   * @returns {Promise<Object>} - Despesa criada
   */
  async createExpense(groupId, expenseData) {
    try {
      const response = await apiClient.post(`/groups/${groupId}/expenses`, expenseData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar despesa')
    }
  },

  /**
   * Atualizar despesa
   * @param {string} expenseId
   * @param {Object} expenseData
   * @returns {Promise<Object>} - Despesa atualizada
   */
  async updateExpense(expenseId, expenseData) {
    try {
      const response = await apiClient.put(`/expenses/${expenseId}`, expenseData)
      return response.data
    } catch (error) {
      throw new Error('Erro ao atualizar despesa')
    }
  },

  /**
   * Excluir despesa
   * @param {string} expenseId
   * @returns {Promise<void>}
   */
  async deleteExpense(expenseId) {
    try {
      await apiClient.delete(`/expenses/${expenseId}`)
    } catch (error) {
      throw new Error('Erro ao excluir despesa')
    }
  },

  /**
   * Buscar saldos do grupo
   * @param {string} groupId
   * @returns {Promise<Array>} - Lista de saldos
   */
  async getBalances(groupId) {
    try {
      const response = await apiClient.get(`/groups/${groupId}/balances`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar saldos')
    }
  },

  /**
   * Gerar relatório de gastos
   * @param {string} groupId
   * @param {Object} period - { startDate, endDate }
   * @returns {Promise<Object>} - Dados do relatório
   */
  async getReport(groupId, period) {
    try {
      const response = await apiClient.post(`/groups/${groupId}/report`, period)
      return response.data
    } catch (error) {
      throw new Error('Erro ao gerar relatório')
    }
  },
}
```

---

## 👤 **Serviços de Usuário**

### **users.js**
```javascript
import apiClient from './api'

export const usersService = {
  /**
   * Buscar perfil do usuário atual
   * @returns {Promise<Object>} - Dados do usuário
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile')
      return response.data
    } catch (error) {
      throw new Error('Erro ao carregar perfil')
    }
  },

  /**
   * Atualizar perfil do usuário
   * @param {Object} profileData - { name, email }
   * @returns {Promise<Object>} - Perfil atualizado
   */
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/users/profile', profileData)
      return response.data
    } catch (error) {
      throw new Error('Erro ao atualizar perfil')
    }
  },

  /**
   * Alterar senha do usuário
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @returns {Promise<void>}
   */
  async changePassword(passwordData) {
    try {
      await apiClient.put('/users/password', passwordData)
    } catch (error) {
      throw new Error('Erro ao alterar senha')
    }
  },

  /**
   * Upload de foto de perfil
   * @param {File} file
   * @returns {Promise<Object>} - URL da imagem
   */
  async uploadAvatar(file) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await apiClient.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error('Erro ao fazer upload da imagem')
    }
  },
}
```

---

## 💾 **Serviços de Armazenamento**

### **storage.js**
```javascript
const TOKEN_KEY = 'finboost_token'
const USER_KEY = 'finboost_user'
const THEME_KEY = 'finboost_theme'

export const storageService = {
  // Token JWT
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },

  // Dados do usuário
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  removeUser() {
    localStorage.removeItem(USER_KEY)
  },

  // Tema da aplicação
  setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme)
  },

  getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light'
  },

  // Limpar todos os dados
  clearAll() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(THEME_KEY)
  },
}

// Aliases para compatibilidade
export const { setToken, getToken, removeToken } = storageService
export const { setUser, getUser, removeUser } = storageService
```

---

## 🔄 **Gerenciamento de Estado**

### **Integration com Context API**
```javascript
// AuthContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/auth'
import { storageService } from '../services/storage'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    loading: true,
    error: null,
  })

  // Validar token ao carregar app
  useEffect(() => {
    const validateAuth = async () => {
      try {
        const token = storageService.getToken()
        if (token) {
          const user = await authService.validateToken()
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
        }
      } catch (error) {
        storageService.clearAll()
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    validateAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { user, token } = await authService.login(credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      isAuthenticated: authService.isAuthenticated(),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      }
    default:
      return state
  }
}
```

---

## 🛠️ **Utilitários de Serviço**

### **Tratamento de Erros**
```javascript
// utils/errorHandler.js
export const handleServiceError = (error, customMessage) => {
  console.error('Service Error:', error)
  
  if (error.response) {
    // Erro de resposta da API
    const message = error.response.data?.message || customMessage
    return new Error(message)
  } else if (error.request) {
    // Erro de rede
    return new Error('Erro de conexão. Verifique sua internet.')
  } else {
    // Erro genérico
    return new Error(customMessage || 'Erro inesperado')
  }
}
```

### **Cache de Dados**
```javascript
// utils/cache.js
class SimpleCache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutos
    this.cache = new Map()
    this.ttl = ttl
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  clear() {
    this.cache.clear()
  }
}

export const dataCache = new SimpleCache()
```

---

## 📊 **Monitoramento e Analytics**

### **Service Analytics**
```javascript
// utils/analytics.js
export const trackServiceCall = (service, method, success, duration) => {
  // Implementar analytics conforme necessário
  console.log('Service Call:', {
    service,
    method,
    success,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
  })
}

// Wrapper para serviços com analytics
export const withAnalytics = (service, serviceName) => {
  const wrappedService = {}
  
  Object.keys(service).forEach(method => {
    wrappedService[method] = async (...args) => {
      const startTime = Date.now()
      try {
        const result = await service[method](...args)
        trackServiceCall(serviceName, method, true, Date.now() - startTime)
        return result
      } catch (error) {
        trackServiceCall(serviceName, method, false, Date.now() - startTime)
        throw error
      }
    }
  })
  
  return wrappedService
}
```

---

<div align="center">
  <strong>🔧 Camada de serviços robusta e escalável</strong><br/>
  <em>Integração confiável com backend e gerenciamento de estado</em>
</div>
