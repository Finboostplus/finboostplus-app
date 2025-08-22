# Visão da Arquitetura

O **FinBoost+** foi projetado seguindo uma arquitetura moderna e escalável, com separação clara entre frontend e backend, facilitando manutenção, testes e futuras expansões do sistema.

## Arquitetura Geral do Sistema

### Visão de Alto Nível

```mermaid
graph TB
    subgraph "Camada Cliente"
        Browser[Navegador Web]
        PWA[App PWA Instalado]        
    end
    
    subgraph "Camada Frontend"
        React[React 19 + Vite]
        Router[React Router v6]
        Context[Context API + Hooks]
        UI[TailwindCSS + Headless UI]
    end
    
    subgraph "Camada Backend"
        API[Spring Boot 3.5 API]
        Security[Spring Security + JWT]
        Business[Services + Business Logic]
        JPA[Spring Data JPA]
    end
    
    subgraph "Camada Dados"
        DB[(PostgreSQL 15+)]
    end
    
    subgraph "Infraestrutura"
        Docker[Docker Containers]
        CI[GitHub Actions CI/CD]
        Deploy[Render Deploy]
    end
    
    Browser --> React
    PWA --> React
    Mobile --> React
    React --> API
    API --> Security
    Security --> Business
    Business --> JPA
    JPA --> DB
    Business -.-> Cache
    
    Docker --> React
    Docker --> API
    CI --> Docker
    Deploy --> Docker
    
    style Cache fill:#f9f9f9,stroke:#999,stroke-dasharray: 5 5
    style PWA fill:#e1f5fe
    style Security fill:#fff3e0
```

*Cache Redis planejado para versões futuras

### Princípios Arquiteturais

**Separação de Responsabilidades**
- Frontend focado em UX e apresentação
- Backend concentrado em lógica de negócio e dados
- Banco de dados otimizado para performance e consistência

**Escalabilidade e Manutenibilidade**
- Arquitetura em camadas bem definidas
- Componentes desacoplados e testáveis
- APIs RESTful padronizadas

**Segurança por Design**
- Autenticação JWT com refresh tokens
- Validação rigorosa em múltiplas camadas
- Controle de acesso baseado em contexto de grupo

## Arquitetura Frontend - React

### Stack Tecnológico

```mermaid
graph LR
    subgraph "Core Frontend"
        React[React 19]
        Vite[Vite 7]
        TypeScript[JavaScript ES2024]
    end
    
    subgraph "Estado e Roteamento"
        Context[Context API]
        Hooks[Custom Hooks]
        Router[React Router v6]
    end
    
    subgraph "UI e Estilo"
        Tailwind[TailwindCSS 4]
        Headless[Headless UI]
        Recharts[Recharts]
    end
    
    subgraph "Qualidade"
        Vitest[Vitest + RTL]
        ESLint[ESLint + Prettier]
        PWA[Vite PWA Plugin]
    end
    
    React --> Context
    React --> Router
    Context --> Hooks
    Tailwind --> Headless
    Vite --> PWA
```

### Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes atômicos (Button, Input)
│   │   ├── layout/         # Layout e navegação
│   │   ├── forms/          # Formulários complexos
│   │   └── features/       # Componentes de funcionalidades
│   ├── pages/              # Páginas principais (rotas)
│   ├── hooks/              # Custom hooks reutilizáveis
│   ├── context/            # Providers globais
│   │   ├── AuthContext.jsx # Autenticação
│   │   ├── GroupContext.jsx# Estado de grupos
│   │   └── ThemeContext.jsx# Tema e preferências
│   ├── services/           # Integração com APIs
│   ├── routes/             # Configuração de rotas
│   └── utils/              # Funções utilitárias
└── public/                 # Assets estáticos + PWA
```

### Padrões de Componentes

**Atomic Design + Feature-First**
- **Atoms**: Componentes básicos (Button, Input, Icon)
- **Molecules**: Combinações simples (SearchBox, FormField)
- **Organisms**: Componentes complexos (ExpenseList, Dashboard)
- **Features**: Agrupamento por funcionalidade (Auth, Groups, Expenses)

### Gerenciamento de Estado

Utilizamos **Context API + Custom Hooks** para gerenciamento de estado global:

```jsx
// Exemplo de Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

**Principais Contexts:**
- `AuthContext` - Autenticação e dados do usuário
- `GroupContext` - Estado de grupos ativos
- `ThemeContext` - Preferências de tema e UI

## Arquitetura Backend - Spring Boot

### Stack Tecnológico

```mermaid
graph LR
    subgraph "Core Backend"
        Java[Java 21 LTS]
        Spring[Spring Boot 3.5]
        Maven[Maven 3.9+]
    end
    
    subgraph "Dados"
        JPA[Spring Data JPA]
        Hibernate[Hibernate 6]
        PostgreSQL[PostgreSQL 15]        
    end
    
    subgraph "Segurança"
        Security[Spring Security 6]
        JWT[JWT Tokens]
        BCrypt[BCrypt Hashing]
    end
    
    subgraph "Documentação"
        OpenAPI[SpringDoc OpenAPI]
        Scalar[Scalar UI]
    end
    
    Spring --> JPA
    Spring --> Security
    Security --> JWT
    JPA --> PostgreSQL
    OpenAPI --> Scalar
```

### Arquitetura em Camadas

```mermaid
graph TB
    subgraph "Presentation Layer"
        Controllers[REST Controllers]
        DTOs[Data Transfer Objects]
        Validators[Request Validators]
    end
    
    subgraph "Business Layer"
        Services[Business Services]
        Mappers[Entity ↔ DTO Mappers]
        Security[Security Context]
    end
    
    subgraph "Persistence Layer"
        Repositories[JPA Repositories]
        Entities[JPA Entities]
        Migrations[Flyway Scripts]
    end
    
    subgraph "Cross-Cutting"
        Exception[Exception Handling]
        Logging[Logging & Monitoring]
        Config[Configuration]
    end
    
    Controllers --> Services
    Controllers --> DTOs
    Services --> Repositories
    Services --> Mappers
    Repositories --> Entities
    Exception -.-> Controllers
    Security -.-> Services
```

### Estrutura de Arquivos

```
backend/
├── src/main/java/com/finboostplus/
│   ├── controller/         # REST Controllers
│   ├── service/            # Business Logic
│   ├── model/              # JPA Entities
│   ├── repository/         # Data Access
│   ├── dto/                # Data Transfer Objects
│   │   ├── request/        # Request DTOs
│   │   └── response/       # Response DTOs
│   ├── config/             # Configuration Classes
│   ├── security/           # Security Components
│   └── exception/          # Exception Handling
└── src/main/resources/
    ├── application.yml     # Main Configuration
    └── db/migration/       # Database Scripts
```

### Padrão de Implementação

**Controller → Service → Repository**
```java
@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    
    @GetMapping
    public ResponseEntity<PagedResponse<GroupDTO>> getUserGroups(
            @PageableDefault Pageable pageable,
            Authentication authentication) {
        return ResponseEntity.ok(groupService.getUserGroups(authentication.getName(), pageable));
    }
}
```

## Banco de Dados - Modelo Relacional

### Principais Relacionamentos

**Grupos e Membros**
- Um usuário pode ser dono de múltiplos grupos
- Um usuário pode participar de múltiplos grupos
- Cada grupo tem um dono e múltiplos membros

**Despesas e Divisões**
- Cada despesa pertence a um grupo
- Despesas são divididas entre membros selecionados
- Cálculo automático de valores individuais

## Segurança e Autenticação

### Fluxo de Autenticação JWT

```mermaid
sequenceDiagram
    participant Client as Frontend
    participant API as Spring Boot API
    participant Auth as Spring Security
    participant DB as PostgreSQL
    
    Client->>API: POST /api/auth/login
    API->>Auth: Validar credenciais
    Auth->>DB: Buscar usuário
    DB-->>Auth: Dados do usuário
    Auth->>Auth: Gerar JWT token
    Auth-->>API: Token + user data
    API-->>Client: Response com token
    
    Note over Client: Armazenar token
    
    Client->>API: GET /api/groups (Authorization: Bearer token)
    API->>Auth: Validar token JWT
    Auth->>Auth: Extrair claims
    Auth-->>API: User authenticated
    API->>DB: Buscar dados
    DB-->>API: Dados dos grupos
    API-->>Client: Response com dados
```

### Níveis de Proteção

**Rotas Públicas**
- Registro, login e recuperação de senha

**Rotas Protegidas (JWT Required)**
- Todas as operações de grupos e despesas
- Dashboard e relatórios

**Controle de Acesso por Contexto**
- Apenas membros do grupo podem ver dados do grupo
- Apenas dono do grupo pode gerenciar membros
- Usuários podem editar apenas suas próprias despesas

## Integração e Comunicação

### API RESTful

**Padrões de Endpoint**
```
GET    /api/groups              # Listar grupos
POST   /api/groups              # Criar grupo
GET    /api/groups/{id}         # Detalhes do grupo
PUT    /api/groups/{id}         # Atualizar grupo
DELETE /api/groups/{id}         # Deletar grupo

GET    /api/groups/{id}/expenses # Despesas do grupo
POST   /api/groups/{id}/expenses # Criar despesa
```

**Formato de Resposta Padrão**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { /* dados da resposta */ },
  "timestamp": "2024-01-01T10:00:00Z"
}
```

## Deployment e Infraestrutura

### Containerização com Docker

```mermaid
graph TB
    subgraph "Docker Compose"
        Frontend[Frontend Container<br/>Nginx + React Build]
        Backend[Backend Container<br/>Java + Spring Boot]
        Database[PostgreSQL Container]        
    end
    
    subgraph "External Services"        
        Vercel[Vercel Frontend]
        GitHub[GitHub Registry]
    end
    
    Frontend --> Backend
    Backend --> Database
    Backend -.-> Redis
    
    GitHub --> Render
    GitHub --> Vercel
    
    style Redis fill:#f9f9f9,stroke:#999,stroke-dasharray: 5 5
```

### Estratégia de Deploy

**Desenvolvimento**
- Docker Compose para ambiente local completo
- Hot reload habilitado em frontend e backend

**Produção**
- Frontend: Vercel 
- Backend: Render 
- Banco: PostgreSQL managed service
- CI/CD: GitHub Actions

## Monitoramento e Performance

### Otimizações Implementadas

**Frontend**
- Code splitting por rota
- Lazy loading de componentes
- Service Worker para cache de assets
- Otimização de bundle com Vite

**Backend**
- Connection pooling do PostgreSQL
- Queries JPA otimizadas
- Paginação em listagens
- Spring Boot Actuator para métricas

**Banco de Dados**
- Índices em colunas de busca frequente
- Constraints para integridade referencial

## Planos de Expansão

### Funcionalidades Futuras
- Notificações push em tempo real
- Relatórios avançados e exportação
- App mobile nativo (React Native)

---

!!! info "Documentação Viva"
    Esta arquitetura evolui junto com o projeto. Para detalhes de implementação específicos, consulte:

- [**Backend README**](https://github.com/Finboostplus/finboostplus-app/blob/main/backend/README.md) - Setup e execução
- [**Frontend README**](https://github.com/Finboostplus/finboostplus-app/blob/main/frontend/README.md) - Desenvolvimento local
- [**API Interativa**](api_interactive.md) - Documentação Scalar/Swagger
- [**GitHub Wiki**](https://github.com/Finboostplus/finboostplus-app/wiki) - Guias técnicos detalhados
