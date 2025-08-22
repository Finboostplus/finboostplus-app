Este guia fornece uma visão rápida para começar a consumir a API do **FinBoost+**.

---

### URL Base

**Ambiente de Produção:**  
```
https://api.finboostplus.com
```

**Ambiente de Desenvolvimento:**  
```
http://localhost:8080
```

---

### Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação.

#### Fluxo de Autenticação

1. **Login** com email e senha → recebe um token JWT.
2. Inclua o token no header `Authorization` de cada requisição:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

### Endpoints Principais

| Método | Endpoint                | Descrição                              | Autenticação |
|--------|-------------------------|----------------------------------------|--------------|
| POST   | `/auth/register`        | Cadastro de usuário                    | ❌           |
| POST   | `/auth/login`           | Login e obtenção do token              | ❌           |
| GET    | `/expenses`             | Lista de despesas                      | ✅           |
| POST   | `/expenses`             | Cria nova despesa                       | ✅           |
| GET    | `/groups`               | Lista grupos financeiros               | ✅           |
| POST   | `/groups`               | Cria novo grupo                         | ✅           |

---

### Exemplo de Requisição

```bash
curl -X POST https://api.finboostplus.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
        "email": "usuario@teste.com",
        "password": "123456"
      }'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

**Relacionado:**  
[API - Documentação](./API‐Documentacao)