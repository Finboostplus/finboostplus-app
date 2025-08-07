# 📋 API Contract - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/API-v1.0.0-blue" alt="API Version">
  <img src="https://img.shields.io/badge/Status-Development-yellow" alt="Status">
  <img src="https://img.shields.io/badge/Format-JSON-green" alt="Format">
</div>

Este documento define o contrato da API REST do **FinBoost+**, estabelecendo endpoints, estruturas de dados e padrões de comunicação entre frontend e backend.

---

## 🔧 **Informações Gerais**

### **Base URLs**
- **Desenvolvimento**: `http://localhost:8080/api/v1`
- **Produção**: `https://api.finboostplus.com/api/v1`

### **Especificações Técnicas**
- **Formato**: JSON
- **Autenticação**: Bearer Token (JWT)
- **Versão**: v1.0.0
- **Charset**: UTF-8

### **Headers Padrão**
```http
Content-Type: application/json
Authorization: Bearer {jwt_token}
Accept: application/json
```

---

## 📊 **Códigos de Status HTTP**

| Código | Descrição | Uso |
|--------|-----------|-----|
| `200` | OK | Operação bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Erro de validação |
| `401` | Unauthorized | Token inválido/ausente |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `422` | Unprocessable Entity | Dados inválidos |
| `500` | Internal Server Error | Erro interno |

---

## 🔐 **Autenticação**

### **POST /auth/login**
Realizar login do usuário no sistema.

#### **Request**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

#### **Response (200)**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "usuario@email.com",
      "avatar": null,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### **POST /auth/register**
Cadastrar novo usuário no sistema.

#### **Request**
```json
{
  "name": "João Silva", 
  "email": "usuario@email.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

#### **Response (201)**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "usuario@email.com",
      "avatar": null,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### **POST /auth/refresh**
Renovar token JWT expirado.

#### **Request**
```json
{
  "refreshToken": "refresh_token_here"
}
```

#### **Response (200)**
```json
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

### **GET /groups**
Listar grupos do usuário autenticado.

#### **Query Parameters**
- `page` (opcional): Número da página (padrão: 0)
- `size` (opcional): Itens por página (padrão: 20)

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": 1,
        "name": "Apartamento 404",
        "description": "Contas da república",
        "inviteCode": "APT404XYZ",
        "memberCount": 4,
        "totalExpenses": 1250.00,
        "myBalance": -125.50,
        "isAdmin": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 3,
      "totalPages": 1
    }
  }
}
```

### **POST /groups**
Criar novo grupo.

#### **Request**
```json
{
  "name": "Viagem Rio",
  "description": "Gastos da viagem de carnaval"
}
```

#### **Response (201)**
```json
{
  "success": true,
  "message": "Grupo criado com sucesso",
  "data": {
    "group": {
      "id": 2,
      "name": "Viagem Rio",
      "description": "Gastos da viagem de carnaval",
      "inviteCode": "RIO2024ABC",
      "memberCount": 1,
      "totalExpenses": 0.00,
      "myBalance": 0.00,
      "isAdmin": true,
      "createdAt": "2024-02-01T14:20:00Z"
    }
  }
}
```

### **GET /groups/{groupId}**
Buscar detalhes de um grupo específico.

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "group": {
      "id": 1,
      "name": "Apartamento 404",
      "description": "Contas da república",
      "inviteCode": "APT404XYZ",
      "totalExpenses": 1250.00,
      "members": [
        {
          "id": 1,
          "name": "João Silva",
          "email": "joao@email.com",
          "avatar": null,
          "balance": -125.50,
          "isAdmin": true,
          "joinedAt": "2024-01-01T00:00:00Z"
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### **PUT /groups/{groupId}**
Atualizar informações do grupo.

#### **Request**
```json
{
  "name": "Apartamento 404 - Atualizado",
  "description": "Nova descrição"
}
```

### **DELETE /groups/{groupId}**
Remover grupo (apenas admin).

#### **Response (200)**
```json
{
  "success": true,
  "message": "Grupo removido com sucesso"
}
```

---

## 💰 **Despesas**

### **GET /groups/{groupId}/expenses**
Listar despesas de um grupo.

#### **Query Parameters**
- `page` (opcional): Página
- `size` (opcional): Itens por página
- `category` (opcional): Filtrar por categoria
- `dateFrom` (opcional): Data inicial (YYYY-MM-DD)
- `dateTo` (opcional): Data final (YYYY-MM-DD)

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "expenses": [
      {
        "id": 1,
        "description": "Mercado - Compras da semana",
        "amount": 158.75,
        "category": "Food",
        "date": "2024-01-15",
        "createdBy": {
          "id": 1,
          "name": "João Silva"
        },
        "splits": [
          {
            "userId": 1,
            "userName": "João Silva",
            "amount": 79.38,
            "percentage": 50.0
          }
        ],
        "createdAt": "2024-01-15T19:30:00Z"
      }
    ],
    "summary": {
      "totalAmount": 1250.00,
      "expenseCount": 15,
      "avgAmount": 83.33
    },
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 15
    }
  }
}
```

### **POST /groups/{groupId}/expenses**
Criar nova despesa no grupo.

#### **Request**
```json
{
  "description": "Jantar no restaurante",
  "amount": 125.00,
  "category": "Food",
  "date": "2024-01-16",
  "notes": "Pizza e refrigerantes",
  "splits": [
    {
      "userId": 1,
      "amount": 62.50
    },
    {
      "userId": 2,
      "amount": 62.50
    }
  ]
}
```

#### **Response (201)**
```json
{
  "success": true,
  "message": "Despesa criada com sucesso",
  "data": {
    "expense": {
      "id": 2,
      "description": "Jantar no restaurante",
      "amount": 125.00,
      "category": "Food",
      "date": "2024-01-16",
      "notes": "Pizza e refrigerantes",
      "createdBy": {
        "id": 1,
        "name": "João Silva"
      },
      "splits": [
        {
          "userId": 1,
          "userName": "João Silva",
          "amount": 62.50,
          "percentage": 50.0
        }
      ],
      "createdAt": "2024-01-16T20:15:00Z"
    }
  }
}
```

### **PUT /expenses/{expenseId}**
Atualizar despesa existente.

### **DELETE /expenses/{expenseId}**
Remover despesa (soft delete).

---

## 📊 **Saldos e Relatórios**

### **GET /groups/{groupId}/balances**
Calcular saldos entre membros do grupo.

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "balances": [
      {
        "userId": 1,
        "userName": "João Silva",
        "totalPaid": 500.00,
        "totalOwed": 375.50,
        "netBalance": 124.50,
        "status": "creditor"
      }
    ],
    "settlements": [
      {
        "from": 2,
        "fromName": "Maria Santos",
        "to": 1,
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

### **GET /groups/{groupId}/summary**
Resumo financeiro do grupo.

#### **Query Parameters**
- `period` (opcional): "week", "month", "year" (padrão: "month")

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "type": "month"
    },
    "summary": {
      "totalExpenses": 1250.00,
      "expenseCount": 15,
      "averagePerExpense": 83.33,
      "averagePerDay": 40.32
    },
    "byCategory": [
      {
        "category": "Food",
        "total": 650.00,
        "count": 8,
        "percentage": 52.0
      }
    ],
    "byUser": [
      {
        "userId": 1,
        "userName": "João Silva",
        "totalPaid": 750.00,
        "expenseCount": 9,
        "percentage": 60.0
      }
    ]
  }
}
```

---

## 👤 **Usuários**

### **GET /users/profile**
Buscar perfil do usuário atual.

#### **Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "avatar": null,
      "phone": "+55 11 99999-9999",
      "createdAt": "2024-01-01T00:00:00Z",
      "preferences": {
        "theme": "dark",
        "language": "pt-BR",
        "notifications": {
          "email": true,
          "push": false
        }
      },
      "statistics": {
        "groupsCount": 3,
        "totalExpenses": 2500.00,
        "currentBalance": -45.50
      }
    }
  }
}
```

### **PUT /users/profile**
Atualizar perfil do usuário.

#### **Request**
```json
{
  "name": "João Silva Santos",
  "phone": "+55 11 98888-8888",
  "preferences": {
    "theme": "dark",
    "language": "pt-BR",
    "notifications": {
      "email": true,
      "push": true
    }
  }
}
```

---

## 🔧 **Utilitários**

### **GET /categories**
Listar categorias disponíveis.

#### **Response (200)**
```json
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
      }
    ]
  }
}
```

### **GET /health**
Status da API.

#### **Response (200)**
```json
{
  "status": "UP",
  "timestamp": "2024-01-16T10:30:00Z",
  "version": "1.0.0",
  "environment": "production"
}
```

---

## ⚠️ **Tratamento de Erros**

### **Formato Padrão de Erro**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [
      {
        "field": "email",
        "message": "Email é obrigatório"
      }
    ]
  },
  "timestamp": "2024-01-16T10:30:00Z",
  "path": "/api/v1/expenses"
}
```

### **Códigos de Erro Comuns**
- `VALIDATION_ERROR` - Erro de validação de dados
- `AUTHENTICATION_ERROR` - Erro de autenticação
- `AUTHORIZATION_ERROR` - Erro de autorização
- `RESOURCE_NOT_FOUND` - Recurso não encontrado
- `DUPLICATE_RESOURCE` - Recurso duplicado
- `INTERNAL_ERROR` - Erro interno do servidor

---

## 🔒 **Segurança**

### **Autenticação JWT**
- **Algoritmo**: HS256
- **Expiração**: 24 horas
- **Refresh Token**: 7 dias

### **Rate Limiting**
- **Geral**: 1000 req/hora por IP
- **Login**: 5 tentativas/minuto
- **APIs**: 100 req/minuto por usuário

### **Validações**
- Sanitização de inputs
- Validação de tipos
- Prevenção de SQL Injection
- Validação de permissões

---

<div align="center">
  <strong>📋 API Contract bem definido</strong><br/>
  <em>Comunicação padronizada e confiável</em>
</div>
