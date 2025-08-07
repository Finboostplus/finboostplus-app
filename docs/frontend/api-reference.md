# 📡 API Reference - Frontend FinBoost+

Esta documentação descreve a integração entre o frontend e o backend, incluindo todas as APIs utilizadas, formatos de dados e exemplos de uso.

---

## 🔗 **Base URL e Configuração**

### **Configuração de Ambiente**
```javascript
// src/config/api.js
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
  },
  staging: {
    baseURL: 'https://api-staging.finboostplus.com/api',
    timeout: 8000,
  },
  production: {
    baseURL: 'https://api.finboostplus.com/api',
    timeout: 5000,
  },
}

export const config = API_CONFIG[import.meta.env.MODE] || API_CONFIG.development
```

### **Headers Padrão**
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {jwt_token}",
  "Accept": "application/json",
  "X-Client-Version": "1.0.0"
}
```

---

## 🔐 **Autenticação**

### **POST /api/auth/login**
Realiza login do usuário e retorna token JWT.

#### **Request**
```javascript
// POST /api/auth/login
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

#### **Response Success (200)**
```javascript
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 86400,
    "user": {
      "id": "user123",
      "name": "João Silva",
      "email": "usuario@exemplo.com",
      "avatar": "https://exemplo.com/avatar.jpg",
      "createdAt": "2024-01-01T00:00:00Z",
      "preferences": {
        "theme": "light",
        "language": "pt-BR"
      }
    }
  }
}
```

#### **Response Error (401)**
```javascript
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email ou senha incorretos",
    "details": null
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### **Uso no Frontend**
```javascript
// src/services/auth.js
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials)
    const { token, user } = response.data.data
    
    // Armazenar token
    localStorage.setItem('auth_token', token)
    
    return { token, user }
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Erro no login')
  }
}
```

### **POST /api/auth/register**
Cadastra novo usuário no sistema.

#### **Request**
```javascript
// POST /api/auth/register
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

#### **Response Success (201)**
```javascript
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "user": {
      "id": "user124",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "avatar": null,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### **POST /api/auth/refresh**
Renova token JWT expirado.

#### **Request**
```javascript
// POST /api/auth/refresh
{
  "refreshToken": "refresh_token_here"
}
```

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here",
    "expiresIn": 86400
  }
}
```

---

## 👥 **Grupos**

### **GET /api/groups**
Lista todos os grupos do usuário autenticado.

#### **Query Parameters**
- `page` (opcional): Número da página (padrão: 0)
- `size` (opcional): Itens por página (padrão: 20)
- `sort` (opcional): Campo de ordenação (padrão: createdAt)
- `order` (opcional): Direção da ordenação (asc/desc, padrão: desc)

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": "group1",
        "name": "Apartamento 404",
        "description": "Contas da república",
        "inviteCode": "APT404XYZ",
        "memberCount": 4,
        "totalExpenses": 1250.00,
        "myBalance": -125.50,
        "createdBy": {
          "id": "user1",
          "name": "João Silva"
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "isAdmin": true
      }
    ],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 3,
      "totalPages": 1,
      "first": true,
      "last": true
    }
  }
}
```

#### **Uso no Frontend**
```javascript
// src/hooks/useGroups.js
export const useGroups = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})

  const fetchGroups = async (page = 0) => {
    try {
      setLoading(true)
      const response = await groupsService.getGroups({ page })
      setGroups(response.data.groups)
      setPagination(response.data.pagination)
    } catch (error) {
      console.error('Erro ao carregar grupos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return { groups, loading, pagination, refetch: fetchGroups }
}
```

### **POST /api/groups**
Cria um novo grupo.

#### **Request**
```javascript
// POST /api/groups
{
  "name": "Viagem para o Rio",
  "description": "Gastos da viagem de carnaval"
}
```

#### **Response Success (201)**
```javascript
{
  "success": true,
  "message": "Grupo criado com sucesso",
  "data": {
    "group": {
      "id": "group2",
      "name": "Viagem para o Rio",
      "description": "Gastos da viagem de carnaval",
      "inviteCode": "RIO2024ABC",
      "memberCount": 1,
      "totalExpenses": 0.00,
      "myBalance": 0.00,
      "createdBy": {
        "id": "user1",
        "name": "João Silva"
      },
      "createdAt": "2024-02-01T14:20:00Z",
      "isAdmin": true
    }
  }
}
```

### **GET /api/groups/{groupId}**
Busca detalhes de um grupo específico.

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "group": {
      "id": "group1",
      "name": "Apartamento 404",
      "description": "Contas da república",
      "inviteCode": "APT404XYZ",
      "totalExpenses": 1250.00,
      "createdBy": {
        "id": "user1",
        "name": "João Silva",
        "email": "joao@exemplo.com"
      },
      "members": [
        {
          "id": "user1",
          "name": "João Silva",
          "email": "joao@exemplo.com",
          "avatar": "https://exemplo.com/avatar1.jpg",
          "balance": -125.50,
          "joinedAt": "2024-01-01T00:00:00Z",
          "isAdmin": true
        },
        {
          "id": "user2", 
          "name": "Maria Santos",
          "email": "maria@exemplo.com",
          "avatar": null,
          "balance": 75.25,
          "joinedAt": "2024-01-02T08:15:00Z",
          "isAdmin": false
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### **POST /api/groups/{groupId}/invite**
Gera convite para o grupo.

#### **Request**
```javascript
// POST /api/groups/group1/invite
{
  "email": "novo@exemplo.com",
  "message": "Venha participar do nosso grupo!"
}
```

#### **Response Success (200)**
```javascript
{
  "success": true,
  "message": "Convite enviado com sucesso",
  "data": {
    "inviteLink": "https://finboostplus.com/invite/APT404XYZ",
    "inviteCode": "APT404XYZ",
    "expiresAt": "2024-02-01T00:00:00Z"
  }
}
```

---

## 💰 **Despesas**

### **GET /api/groups/{groupId}/expenses**
Lista despesas de um grupo.

#### **Query Parameters**
- `page` (opcional): Número da página
- `size` (opcional): Itens por página  
- `category` (opcional): Filtrar por categoria
- `dateFrom` (opcional): Data inicial (YYYY-MM-DD)
- `dateTo` (opcional): Data final (YYYY-MM-DD)
- `search` (opcional): Busca na descrição

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "expenses": [
      {
        "id": "expense1",
        "description": "Mercado - Compras da semana",
        "amount": 158.75,
        "category": {
          "id": "food",
          "name": "Alimentação",
          "icon": "🍕",
          "color": "#FF6B6B"
        },
        "date": "2024-01-15",
        "createdBy": {
          "id": "user1",
          "name": "João Silva",
          "avatar": "https://exemplo.com/avatar1.jpg"
        },
        "splits": [
          {
            "userId": "user1",
            "userName": "João Silva",
            "amount": 79.38,
            "percentage": 50.0
          },
          {
            "userId": "user2", 
            "userName": "Maria Santos",
            "amount": 79.37,
            "percentage": 50.0
          }
        ],
        "receipt": {
          "url": "https://storage.exemplo.com/receipts/receipt1.jpg",
          "filename": "comprovante_mercado.jpg"
        },
        "createdAt": "2024-01-15T19:30:00Z",
        "updatedAt": "2024-01-15T19:30:00Z"
      }
    ],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 15,
      "totalPages": 1
    },
    "summary": {
      "totalAmount": 1250.00,
      "avgAmount": 83.33,
      "expenseCount": 15,
      "categorySummary": [
        {
          "category": "food",
          "name": "Alimentação", 
          "total": 650.00,
          "count": 8
        },
        {
          "category": "transport",
          "name": "Transporte",
          "total": 300.00,
          "count": 4
        }
      ]
    }
  }
}
```

#### **Uso no Frontend**
```javascript
// src/hooks/useExpenses.js
export const useExpenses = (groupId, filters = {}) => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({})

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await expensesService.getExpenses(groupId, filters)
      setExpenses(response.data.expenses)
      setSummary(response.data.summary)
    } catch (error) {
      console.error('Erro ao carregar despesas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (groupId) {
      fetchExpenses()
    }
  }, [groupId, filters])

  return { expenses, summary, loading, refetch: fetchExpenses }
}
```

### **POST /api/groups/{groupId}/expenses**
Cria nova despesa no grupo.

#### **Request**
```javascript
// POST /api/groups/group1/expenses
{
  "description": "Jantar no restaurante",
  "amount": 125.00,
  "category": "food",
  "date": "2024-01-16",
  "notes": "Pizza e refrigerantes",
  "splits": [
    {
      "userId": "user1",
      "amount": 62.50
    },
    {
      "userId": "user2", 
      "amount": 62.50
    }
  ]
}
```

#### **Response Success (201)**
```javascript
{
  "success": true,
  "message": "Despesa criada com sucesso",
  "data": {
    "expense": {
      "id": "expense2",
      "description": "Jantar no restaurante",
      "amount": 125.00,
      "category": {
        "id": "food",
        "name": "Alimentação",
        "icon": "🍕",
        "color": "#FF6B6B"
      },
      "date": "2024-01-16",
      "notes": "Pizza e refrigerantes",
      "createdBy": {
        "id": "user1",
        "name": "João Silva"
      },
      "splits": [
        {
          "userId": "user1",
          "userName": "João Silva",
          "amount": 62.50,
          "percentage": 50.0
        },
        {
          "userId": "user2",
          "userName": "Maria Santos", 
          "amount": 62.50,
          "percentage": 50.0
        }
      ],
      "createdAt": "2024-01-16T20:15:00Z"
    }
  }
}
```

### **PUT /api/expenses/{expenseId}**
Atualiza uma despesa existente.

#### **Request**
```javascript
// PUT /api/expenses/expense1
{
  "description": "Mercado - Compras da semana (atualizado)",
  "amount": 175.00,
  "category": "food",
  "date": "2024-01-15",
  "notes": "Incluindo produtos de limpeza",
  "splits": [
    {
      "userId": "user1",
      "amount": 87.50
    },
    {
      "userId": "user2",
      "amount": 87.50
    }
  ]
}
```

### **DELETE /api/expenses/{expenseId}**
Remove uma despesa (soft delete).

#### **Response Success (200)**
```javascript
{
  "success": true,
  "message": "Despesa removida com sucesso"
}
```

---

## 📊 **Saldos e Relatórios**

### **GET /api/groups/{groupId}/balances**
Calcula saldos entre membros do grupo.

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "balances": [
      {
        "userId": "user1",
        "userName": "João Silva",
        "totalPaid": 500.00,
        "totalOwed": 375.50,
        "netBalance": 124.50,
        "status": "creditor"
      },
      {
        "userId": "user2",
        "userName": "Maria Santos",
        "totalPaid": 250.00,
        "totalOwed": 374.50,
        "netBalance": -124.50,
        "status": "debtor"
      }
    ],
    "settlements": [
      {
        "from": "user2",
        "fromName": "Maria Santos",
        "to": "user1", 
        "toName": "João Silva",
        "amount": 124.50
      }
    ],
    "groupTotal": {
      "totalExpenses": 750.00,
      "averagePerPerson": 375.00,
      "totalSettled": 0.00,
      "totalPending": 124.50
    }
  }
}
```

### **POST /api/groups/{groupId}/report**
Gera relatório detalhado por período.

#### **Request**
```javascript
// POST /api/groups/group1/report
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "groupBy": "category", // "category", "user", "date"
  "includeCharts": true
}
```

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "days": 31
    },
    "summary": {
      "totalExpenses": 1250.00,
      "expenseCount": 15,
      "averagePerExpense": 83.33,
      "averagePerDay": 40.32
    },
    "byCategory": [
      {
        "category": "food",
        "name": "Alimentação",
        "total": 650.00,
        "count": 8,
        "percentage": 52.0,
        "average": 81.25
      },
      {
        "category": "transport",
        "name": "Transporte", 
        "total": 300.00,
        "count": 4,
        "percentage": 24.0,
        "average": 75.00
      }
    ],
    "byUser": [
      {
        "userId": "user1",
        "userName": "João Silva",
        "totalPaid": 750.00,
        "expenseCount": 9,
        "percentage": 60.0
      },
      {
        "userId": "user2",
        "userName": "Maria Santos",
        "totalPaid": 500.00,
        "expenseCount": 6,
        "percentage": 40.0
      }
    ],
    "chartData": {
      "dailyExpenses": [
        {
          "date": "2024-01-01",
          "amount": 50.00,
          "count": 1
        }
      ],
      "categoryPieChart": [
        {
          "name": "Alimentação",
          "value": 650.00,
          "color": "#FF6B6B"
        }
      ]
    }
  }
}
```

---

## 👤 **Usuário**

### **GET /api/users/profile**
Busca perfil do usuário atual.

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "user": {
      "id": "user1",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "avatar": "https://exemplo.com/avatar1.jpg",
      "phone": "+55 11 99999-9999",
      "createdAt": "2024-01-01T00:00:00Z",
      "preferences": {
        "theme": "dark",
        "language": "pt-BR",
        "notifications": {
          "email": true,
          "push": false,
          "newExpense": true,
          "weeklyReport": true
        }
      },
      "statistics": {
        "groupsCount": 3,
        "totalExpenses": 2500.00,
        "currentBalance": -45.50,
        "joinDate": "2024-01-01T00:00:00Z"
      }
    }
  }
}
```

### **PUT /api/users/profile**
Atualiza perfil do usuário.

#### **Request**
```javascript
// PUT /api/users/profile
{
  "name": "João Silva Santos",
  "phone": "+55 11 98888-8888",
  "preferences": {
    "theme": "dark",
    "language": "pt-BR",
    "notifications": {
      "email": true,
      "push": true,
      "newExpense": true,
      "weeklyReport": false
    }
  }
}
```

---

## 🔧 **Utilitários**

### **GET /api/categories**
Lista categorias disponíveis.

#### **Response Success (200)**
```javascript
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "food",
        "name": "Alimentação",
        "icon": "🍕",
        "color": "#FF6B6B"
      },
      {
        "id": "transport",
        "name": "Transporte",
        "icon": "🚗", 
        "color": "#4ECDC4"
      },
      {
        "id": "entertainment",
        "name": "Entretenimento",
        "icon": "🎬",
        "color": "#45B7D1"
      }
    ]
  }
}
```

### **GET /api/health**
Status da aplicação.

#### **Response Success (200)**
```javascript
{
  "status": "UP",
  "timestamp": "2024-01-16T10:30:00Z",
  "version": "1.0.0",
  "environment": "production",
  "database": "UP",
  "cache": "UP"
}
```

---

## ⚠️ **Tratamento de Erros**

### **Códigos de Status HTTP**
- `200` - OK
- `201` - Created  
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

### **Formato de Erro Padrão**
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [
      {
        "field": "email",
        "message": "Email é obrigatório"
      },
      {
        "field": "amount",
        "message": "Valor deve ser maior que zero"
      }
    ]
  },
  "timestamp": "2024-01-16T10:30:00Z",
  "path": "/api/expenses"
}
```

### **Interceptor de Erros**
```javascript
// src/services/api.js
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    
    if (response?.status === 401) {
      // Token inválido - redirecionar para login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    
    if (response?.status === 422) {
      // Erro de validação - extrair detalhes
      const validationErrors = response.data.error.details || []
      throw new ValidationError(validationErrors)
    }
    
    // Erro genérico
    const message = response?.data?.error?.message || 'Erro inesperado'
    throw new Error(message)
  }
)
```

---

## 🔐 **Autenticação e Segurança**

### **JWT Token Structure**
```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "user123",
  "email": "joao@exemplo.com",
  "name": "João Silva",
  "iat": 1642032000,
  "exp": 1642118400
}
```

### **Rate Limiting**
- Limite geral: 1000 requisições/hora
- Login: 5 tentativas/minuto
- Criação de despesas: 30/minuto
- Upload de arquivos: 10/minuto

### **CORS Configuration**
```javascript
// Headers permitidos
Access-Control-Allow-Origin: https://finboostplus.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Client-Version
```

---

<div align="center">
  <strong>📡 API integrada e documentada</strong><br/>
  <em>Comunicação confiável entre frontend e backend</em>
</div>
