# Contrato de API - FinBoost+

> **Documentação de Desenvolvimento** - Este documento serve como registro do design da API durante o desenvolvimento. Para documentação interativa e testes, consulte a implementação no Scalar.

## Informações Gerais
- **Base URL**: `http://localhost:3000/api/v1`
- **Formato de Dados**: JSON
- **Autenticação**: Bearer Token (JWT)
- **Versão**: v1.0.0
- **Status**: Em Desenvolvimento

## Códigos de Status HTTP
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## Índice
- [Autenticação](#autenticação)
- [Usuários](#usuários)  
- [Grupos](#grupos)
- [Membros do Grupo](#membros-do-grupo)
- [Despesas](#despesas)
- [Dashboard](#dashboard)
- [Observações Importantes](#observações-importantes)

---

## Autenticação

### POST /auth/login
**Descrição**: Realizar login do usuário

**Body**:
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@email.com"
  }
}
```

### POST /auth/register
**Descrição**: Cadastrar novo usuário

**Body**:
```json
{
  "name": "João Silva",
  "email": "usuario@email.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Resposta (201)**:
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@email.com"
  }
}
```

### POST /auth/forgot-password
**Descrição**: Solicitar redefinição de senha

**Body**:
```json
{
  "email": "usuario@email.com"
}
```

**Resposta (200)**:
```json
{
  "message": "Email de recuperação enviado"
}
```

---

## Usuários

### GET /users/profile
**Descrição**: Obter perfil do usuário logado
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "usuario@email.com",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### PUT /users/profile
**Descrição**: Atualizar perfil do usuário
**Autenticação**: Requerida

**Body**:
```json
{
  "name": "João Silva Santos",
  "email": "novo@email.com"
}
```

**Resposta (200)**:
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva Santos",
    "email": "novo@email.com"
  }
}
```

---

## Grupos

### GET /groups
**Descrição**: Listar grupos do usuário
**Autenticação**: Requerida

**Query Parameters**:
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)

**Resposta (200)**:
```json
{
  "groups": [
    {
      "id": 1,
      "name": "Viagem para Praia",
      "description": "Despesas da viagem de férias",
      "ownerId": 1,
      "memberCount": 5,
      "totalExpenses": 1500.00,
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### POST /groups
**Descrição**: Criar novo grupo
**Autenticação**: Requerida

**Body**:
```json
{
  "name": "Viagem para Praia",
  "description": "Despesas da viagem de férias"
}
```

**Resposta (201)**:
```json
{
  "message": "Grupo criado com sucesso",
  "group": {
    "id": 1,
    "name": "Viagem para Praia",
    "description": "Despesas da viagem de férias",
    "ownerId": 1
  }
}
```

### GET /groups/:groupId
**Descrição**: Obter detalhes do grupo
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "id": 1,
  "name": "Viagem para Praia",
  "description": "Despesas da viagem de férias",
  "ownerId": 1,
  "owner": {
    "id": 1,
    "name": "João Silva"
  },
  "members": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "owner"
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "email": "maria@email.com",
      "role": "member"
    }
  ],
  "totalExpenses": 1500.00,
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### PUT /groups/:groupId
**Descrição**: Atualizar grupo (apenas owner)
**Autenticação**: Requerida

**Body**:
```json
{
  "name": "Viagem para Praia - 2024",
  "description": "Despesas da viagem de férias atualizada"
}
```

### DELETE /groups/:groupId
**Descrição**: Deletar grupo (apenas owner)
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "message": "Grupo deletado com sucesso"
}
```

---

## Membros do Grupo

### GET /groups/:groupId/members
**Descrição**: Listar membros do grupo
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "members": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "owner",
      "joinedAt": "2024-01-01T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "email": "maria@email.com",
      "role": "member",
      "joinedAt": "2024-01-02T10:00:00Z"
    }
  ]
}
```

### POST /groups/:groupId/members
**Descrição**: Adicionar membro ao grupo
**Autenticação**: Requerida

**Body**:
```json
{
  "email": "novomembro@email.com"
}
```

### GET /groups/:groupId/members/:userId
**Descrição**: Obter detalhes do membro
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "id": 2,
  "name": "Maria Santos",
  "email": "maria@email.com",
  "role": "member",
  "joinedAt": "2024-01-02T10:00:00Z",
  "totalPaid": 500.00,
  "totalOwed": 300.00
}
```

### PUT /groups/:groupId/members/:userId/transfer-ownership
**Descrição**: Transferir posse do grupo (apenas owner)
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "message": "Posse transferida com sucesso"
}
```

### DELETE /groups/:groupId/members/:userId
**Descrição**: Remover membro do grupo
**Autenticação**: Requerida

---

## Despesas

### GET /groups/:groupId/expenses
**Descrição**: Listar despesas do grupo
**Autenticação**: Requerida

**Query Parameters**:
- `page` (opcional): Número da página
- `limit` (opcional): Itens por página
- `category` (opcional): Filtrar por categoria

**Resposta (200)**:
```json
{
  "expenses": [
    {
      "id": 1,
      "title": "Combustível",
      "amount": 200.00,
      "category": "Transporte",
      "paidBy": {
        "id": 1,
        "name": "João Silva"
      },
      "splitBetween": [1, 2, 3],
      "date": "2024-01-01",
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### POST /groups/:groupId/expenses
**Descrição**: Criar nova despesa
**Autenticação**: Requerida

**Body**:
```json
{
  "title": "Combustível",
  "amount": 200.00,
  "category": "Transporte",
  "description": "Gasolina para a viagem",
  "paidById": 1,
  "splitBetween": [1, 2, 3],
  "date": "2024-01-01"
}
```

### GET /groups/:groupId/expenses/:expenseId
**Descrição**: Obter detalhes da despesa
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "id": 1,
  "title": "Combustível",
  "amount": 200.00,
  "category": "Transporte",
  "description": "Gasolina para a viagem",
  "paidBy": {
    "id": 1,
    "name": "João Silva"
  },
  "splitBetween": [
    {
      "id": 1,
      "name": "João Silva",
      "share": 66.67
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "share": 66.67
    },
    {
      "id": 3,
      "name": "Pedro Costa",
      "share": 66.66
    }
  ],
  "date": "2024-01-01",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### PUT /groups/:groupId/expenses/:expenseId
**Descrição**: Atualizar despesa
**Autenticação**: Requerida

**Body**:
```json
{
  "title": "Combustível - Atualizado",
  "amount": 250.00,
  "category": "Transporte",
  "description": "Gasolina + pedágio"
}
```

### DELETE /groups/:groupId/expenses/:expenseId
**Descrição**: Deletar despesa
**Autenticação**: Requerida

---

## Dashboard

### GET /dashboard/summary
**Descrição**: Obter resumo do dashboard
**Autenticação**: Requerida

**Resposta (200)**:
```json
{
  "totalGroups": 3,
  "totalExpenses": 1500.00,
  "amountOwed": 200.00,
  "amountLent": 300.00,
  "recentExpenses": [
    {
      "id": 1,
      "title": "Combustível",
      "amount": 200.00,
      "groupName": "Viagem para Praia",
      "date": "2024-01-01"
    }
  ]
}
```

---

## Observações Importantes

1. **Headers Obrigatórios**:
   - `Content-Type: application/json`
   - `Authorization: Bearer {token}` (para rotas protegidas)

2. **Tratamento de Erros**:
   - Todas as respostas de erro seguem o formato:
   ```json
   {
     "error": "Mensagem de erro",
     "details": "Detalhes específicos (opcional)"
   }
   ```

3. **Validações**:
   - Email deve ser válido
   - Senha deve ter no mínimo 6 caracteres
   - Campos obrigatórios não podem estar vazios
   - Valores monetários devem ser positivos

4. **Permissões**:
   - Apenas membros do grupo podem ver suas informações
   - Apenas owner pode editar/deletar grupo
   - Apenas owner pode gerenciar membros
   - Qualquer membro pode criar despesas

---

## Notas de Desenvolvimento

### Requisitos
- **Autenticação**: JWT
- **Banco de Dados**: PostgreSQL
- **Framework**: Spring Boot

### Considerações Futuras
- Rate limiting para endpoints públicos
- Websockets para notificações em tempo real
- Upload de comprovantes de despesas
- Relatórios em PDF
- Integração com sistemas de pagamento