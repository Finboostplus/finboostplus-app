# API Contract - FinBoost+

Este documento define o contrato da API REST do FinBoost+, estabelecendo endpoints, estruturas de dados e padrões de comunicação entre frontend e backend.

---

## Informações Gerais

### Base URLs
- Desenvolvimento: `http://localhost:8080/api/v1`
- Produção: `https://api.finboostplus.com/api/v1`

### Especificações Técnicas
- Formato: JSON
- Autenticação: Bearer Token (JWT)
- Versão: v1.0.0
- Charset: UTF-8

### Headers Padrão
```http
Content-Type: application/json
Authorization: Bearer {jwt_token}
Accept: application/json
```

---

## Códigos de Status HTTP

| Código | Descrição                | Uso                        |
|--------|--------------------------|----------------------------|
| 200    | OK                       | Operação bem-sucedida      |
| 201    | Created                  | Recurso criado com sucesso |
| 400    | Bad Request              | Erro de validação          |
| 401    | Unauthorized             | Token inválido/ausente     |
| 403    | Forbidden                | Sem permissão              |
| 404    | Not Found                | Recurso não encontrado     |
| 422    | Unprocessable Entity     | Dados inválidos            |
| 500    | Internal Server Error    | Erro interno               |

---

## Autenticação

A autenticação é realizada via Bearer Token (JWT) enviado no header Authorization. O token é obtido após login bem-sucedido e deve ser incluído em todas as requisições autenticadas.

---

## Padrão de Resposta

Todas as respostas seguem o padrão abaixo:

```json
{
  "success": true,
  "message": "Mensagem descritiva",
  "data": { /* objeto ou lista de dados */ },
  "errors": [ /* lista de erros, se houver */ ]
}
```

---

## Endpoints Principais

### Autenticação

- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Cadastro de novo usuário
- `POST /auth/refresh` - Renovação de token
- `POST /auth/forgot-password` - Recuperação de senha

### Usuários

- `GET /users/me` - Dados do usuário autenticado
- `PUT /users/me` - Atualizar perfil
- `GET /users/{id}` - Buscar usuário por ID

### Grupos

- `GET /groups` - Listar grupos do usuário
- `POST /groups` - Criar novo grupo
- `GET /groups/{id}` - Detalhes de um grupo
- `PUT /groups/{id}` - Atualizar grupo
- `DELETE /groups/{id}` - Excluir grupo
- `POST /groups/{id}/invite` - Convidar membro
- `POST /groups/{id}/join` - Entrar em grupo via convite

### Despesas

- `GET /expenses` - Listar despesas do usuário/grupo
- `POST /expenses` - Registrar nova despesa
- `GET /expenses/{id}` - Detalhes de uma despesa
- `PUT /expenses/{id}` - Atualizar despesa
- `DELETE /expenses/{id}` - Excluir despesa

### Saldos e Relatórios

- `GET /groups/{id}/balances` - Saldos do grupo
- `GET /groups/{id}/dashboard` - Dashboard financeiro do grupo

---

## Exemplo de Requisição e Resposta

### Exemplo: Criar Grupo

**Requisição:**
```http
POST /groups
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "name": "Viagem 2025",
  "description": "Grupo para organizar despesas da viagem."
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Grupo criado com sucesso",
  "data": {
    "id": 1,
    "name": "Viagem 2025",
    "description": "Grupo para organizar despesas da viagem.",
    "createdAt": "2025-08-17T10:00:00Z"
  }
}
```

---

## Observações

- Todos os endpoints exigem autenticação, exceto login, cadastro e recuperação de senha.
- Os exemplos de payloads e respostas podem variar conforme evolução da API.
- Para detalhes completos, consulte a documentação Swagger/OpenAPI gerada automaticamente pelo backend.
