# API - Documentação e Guia de Uso

A API do FinBoost+ oferece uma interface RESTful moderna com documentação interativa via **Scalar**, proporcionando uma experiência superior para explorar, testar e integrar com todos os endpoints disponíveis.

## Acesso Rápido

### URLs Principais

```bash
# Backend Local
http://localhost:8080/api

# Documentação Interativa (Scalar)
http://localhost:8080/docs/scalar

# Swagger UI Alternativo
http://localhost:8080/swagger-ui.html

# OpenAPI Spec
http://localhost:8080/v3/api-docs
```

### Autenticação

Todas as rotas protegidas requerem **JWT Token** no header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Quick Start - 3 Passos

### 1. Obter Token de Acesso

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@finboost.com",
    "password": "admin123"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "id": 1, "name": "Admin User" }
  }
}
```

### 2. Testar na Interface Scalar

1. Acesse: [http://localhost:8080/docs/scalar](http://localhost:8080/docs/scalar)
2. Clique em **"Authorize"** no topo
3. Cole: `Bearer SEU_TOKEN_AQUI`
4. Teste qualquer endpoint com **"Try it out"**

### 3. Fluxo Básico de Teste

```bash
# 1. Listar grupos
GET /api/groups

# 2. Criar grupo
POST /api/groups
{
  "name": "Viagem de Férias",
  "description": "Despesas da praia"
}

# 3. Adicionar despesa
POST /api/groups/{id}/expenses
{
  "title": "Combustível",
  "amount": 200.50,
  "category": "Transporte",
  "splitBetween": [1, 2, 3]
}
```

## Principais Endpoints

### Autenticação
```bash
POST   /auth/register      # Registrar usuário
POST   /auth/login         # Fazer login  
POST   /auth/refresh       # Renovar token
```

### Grupos e Despesas
```bash
GET    /groups             # Listar grupos
POST   /groups             # Criar grupo
GET    /groups/{id}        # Detalhes do grupo
GET    /groups/{id}/expenses    # Despesas do grupo
POST   /groups/{id}/expenses    # Criar despesa
```

### Dashboard
```bash
GET    /dashboard/summary      # Resumo geral
GET    /dashboard/balances     # Saldos por grupo
```

## Documentação Interativa - Scalar

### Por que Scalar?

```mermaid
graph LR
    subgraph "Vantagens do Scalar"
        A[Design Moderno]
        B[Busca Global Ctrl+K]
        C[Dark Mode Nativo]
        D[Mobile Friendly]
        E[Performance Superior]
    end
    
    subgraph "Developer Experience"
        F[Exemplos Interativos]
        G[Auto-sync com Código]
        H[Copy/Paste Fácil]
        I[Teste Inline]
    end
    
    A --> F
    B --> G
    C --> H
    D --> I
    E --> I
```

### Recursos Principais

**Busca Global** - `Ctrl+K`

- Encontrar endpoints por nome ou método
- Buscar parâmetros específicos
- Filtrar por tags

**Try It Out**

- Testar requisições diretamente na interface
- Editar parâmetros em tempo real
- Copiar comandos cURL automaticamente

**Code Generation**

- JavaScript/TypeScript
- Python
- cURL
- Múltiplas linguagens

## Estruturas de Dados Principais

### UserDTO
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "createdAt": "2024-08-20T10:00:00Z"
}
```

### GroupDTO
```json
{
  "id": 1,
  "name": "string",
  "description": "string",
  "ownerId": 1,
  "memberCount": 3,
  "totalExpenses": 1250.75,
  "createdAt": "2024-08-20T10:00:00Z"
}
```

### ExpenseDTO
```json
{
  "id": 1,
  "title": "string",
  "amount": 150.50,
  "category": "Transporte",
  "paidBy": { "id": 1, "name": "João" },
  "splitBetween": [1, 2, 3],
  "date": "2024-08-20",
  "createdAt": "2024-08-20T10:00:00Z"
}
```

## Validações e Regras

### Campos Obrigatórios

**Usuário**

- `name`: 2-100 caracteres
- `email`: formato válido e único
- `password`: mínimo 6 caracteres

**Grupo**

- `name`: 2-100 caracteres
- `description`: máximo 500 caracteres (opcional)

**Despesa**

- `title`: 2-200 caracteres
- `amount`: valor positivo
- `category`: uma das categorias válidas
- `splitBetween`: array com IDs de membros válidos

### Categorias Válidas
```json
["Alimentação", "Transporte", "Hospedagem", "Entretenimento", "Saúde", "Compras", "Outros"]
```

## Formato de Respostas

### Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { /* dados da resposta */ },
  "timestamp": "2024-08-20T10:00:00Z"
}
```

### Erro
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "field": "email",
    "message": "Email inválido"
  },
  "timestamp": "2024-08-20T10:00:00Z"
}
```

### Paginação
```json
{
  "success": true,
  "data": {
    "content": [/* array de itens */],
    "pagination": {
      "page": 1,
      "size": 10,
      "totalElements": 25,
      "totalPages": 3
    }
  }
}
```

## Códigos de Status

| Código | Significado | Uso |
|--------|-------------|-----|
| `200` | OK | Operação bem-sucedida |
| `201` | Created | Recurso criado |
| `400` | Bad Request | Dados inválidos |
| `401` | Unauthorized | Token ausente/inválido |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `422` | Validation Error | Erro de validação |
| `500` | Server Error | Erro interno |

## Integração Frontend

### JavaScript/React

```javascript
const API_BASE_URL = 'http://localhost:8080/api'

const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken')
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  })
  
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

// Hook personalizado para React
export const useApi = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    apiCall(endpoint)
      .then(result => setData(result.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, dependencies)
  
  return { data, loading, error }
}
```

### Geração de Cliente TypeScript

```bash
# Instalar gerador
npm install @openapitools/openapi-generator-cli

# Gerar cliente
npx openapi-generator-cli generate \
  -i http://localhost:8080/v3/api-docs \
  -g typescript-fetch \
  -o src/generated-api
```

## Configuração Técnica

### Dependências Maven

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.7.0</version>
</dependency>
```

### Configuração Spring

```java
@OpenAPIDefinition(
    info = @Info(
        title = "FinBoost+ API",
        version = "1.0.0",
        description = "API para controle financeiro compartilhado"
    )
)
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .components(new Components()
                .addSecuritySchemes("bearer-jwt", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
    }
}
```

## Troubleshooting

### Problemas Comuns

**"Failed to fetch" no Try it out**
```bash
# Verificar se backend está rodando
curl http://localhost:8080/actuator/health
```

**Token Expirado (401)**
```bash
# Renovar token
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Authorization: Bearer SEU_REFRESH_TOKEN"
```

**Erro de validação (422)**

- Verificar campos obrigatórios
- Confirmar formatos (email, datas, etc.)

### Health Check

```bash
curl http://localhost:8080/actuator/health
```

## Rate Limiting

- **Endpoints públicos**: 100 req/hora por IP
- **Endpoints autenticados**: 1000 req/hora por usuário
- **Headers de resposta**: `X-RateLimit-*`

## Links Relacionados

- **[Arquitetura](architecture.md)** - Visão geral do sistema
- **[Backend README](https://github.com/Finboostplus/finboostplus-app/blob/main/backend/README.md)** - Setup local
- **[Frontend README](https://github.com/Finboostplus/finboostplus-app/blob/main/frontend/README.md)** - Integração

---

!!! tip "Documentação Sempre Atualizada"
    A documentação Scalar é gerada automaticamente do código fonte. Sempre que a API é atualizada, a documentação reflete as mudanças imediatamente.
