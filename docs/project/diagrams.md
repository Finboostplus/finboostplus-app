# 📊 Diagramas do Sistema - FinBoost+

Esta seção apresenta os diagramas oficiais que documentam a arquitetura e funcionamento do sistema FinBoost+, baseados nos documentos originais do projeto.

---

## 🏗️ **Diagrama de Arquitetura do Sistema**

```mermaid
graph TB
    subgraph "Camada de Apresentação"
        UI[Interface Web - React]
        Mobile[Interface Mobile-First]
        Router[React Router]
    end
    
    subgraph "Camada de Aplicação"
        API[API REST - Spring Boot]
        Auth[Spring Security + JWT]
        Controllers[Controllers]
    end
    
    subgraph "Camada de Negócio"
        Services[Services]
        Business[Regras de Negócio]
        Calculations[Cálculos de Saldos]
    end
    
    subgraph "Camada de Dados"
        JPA[JPA/Hibernate]
        PostgreSQL[(PostgreSQL)]
        Cache[Cache - Redis*]
    end
    
    subgraph "Infraestrutura"
        Docker[Docker Containers]
        CI[GitHub Actions]
        Docs[MkDocs + Swagger]
    end
    
    UI --> API
    Mobile --> API
    Router --> Controllers
    API --> Auth
    Auth --> Services
    Services --> Business
    Business --> Calculations
    Services --> JPA
    JPA --> PostgreSQL
    
    Docker --> UI
    Docker --> API
    CI --> Docker
    Docs --> CI
    
    Cache -.-> Services
    
    style Cache fill:#f9f9f9,stroke:#999,stroke-dasharray: 5 5
```

*Cache Redis previsto para versões futuras

---

## 👤 **Diagrama de Casos de Uso**

> **📋 Nota:** Este diagrama está baseado no arquivo oficial `Diagrama de Casos de Uso.png` localizado em `project_docs/diagramas/`

```mermaid
graph LR
    User[👤 Usuário]
    Admin[👤 Administrador do Grupo]
    System[🖥️ Sistema FinBoost+]
    
    subgraph "Autenticação"
        UC1[Fazer Login]
        UC2[Cadastrar-se]
        UC3[Recuperar Senha]
        UC4[Gerenciar Perfil]
    end
    
    subgraph "Gestão de Grupos"
        UC5[Criar Grupo]
        UC6[Convidar Membros]
        UC7[Participar de Grupo]
        UC8[Visualizar Membros]
        UC9[Sair do Grupo]
    end
    
    subgraph "Controle de Despesas"
        UC10[Registrar Despesa]
        UC11[Visualizar Despesas]
        UC12[Editar Despesa Própria]
        UC13[Excluir Despesa Própria]
        UC14[Dividir Despesa]
    end
    
    subgraph "Relatórios e Saldos"
        UC15[Ver Dashboard]
        UC16[Visualizar Saldos]
        UC17[Calcular Débitos/Créditos]
        UC18[Ver Histórico]
    end
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC14
    User --> UC15
    User --> UC16
    User --> UC18
    
    Admin --> UC5
    Admin --> UC6
    
    System --> UC17
```

---

## 🗄️ **Diagrama Entidade-Relacionamento (ER)**

> **📋 Nota:** Este diagrama está baseado no arquivo oficial `diagrama_ER.png` localizado em `project_docs/diagramas/`

```mermaid
erDiagram
    USER {
        bigint id PK
        varchar name
        varchar email UK
        varchar password_hash
        varchar profile_picture
        timestamp created_at
        timestamp updated_at
        boolean active
    }
    
    GROUP {
        bigint id PK
        varchar name
        text description
        varchar invite_code UK
        bigint created_by FK
        timestamp created_at
        timestamp updated_at
        boolean active
    }
    
    GROUP_MEMBER {
        bigint id PK
        bigint group_id FK
        bigint user_id FK
        varchar role
        timestamp joined_at
        boolean active
    }
    
    EXPENSE {
        bigint id PK
        bigint group_id FK
        bigint created_by FK
        varchar description
        decimal amount
        varchar category
        date expense_date
        text notes
        timestamp created_at
        timestamp updated_at
        boolean active
    }
    
    EXPENSE_SPLIT {
        bigint id PK
        bigint expense_id FK
        bigint user_id FK
        decimal amount
        varchar split_type
        decimal percentage
        timestamp created_at
    }
    
    BALANCE {
        bigint id PK
        bigint group_id FK
        bigint user_id FK
        decimal total_paid
        decimal total_owed
        decimal net_balance
        timestamp calculated_at
    }
    
    USER ||--o{ GROUP : creates
    USER ||--o{ GROUP_MEMBER : belongs_to
    GROUP ||--o{ GROUP_MEMBER : has
    GROUP ||--o{ EXPENSE : contains
    USER ||--o{ EXPENSE : creates
    EXPENSE ||--o{ EXPENSE_SPLIT : has
    USER ||--o{ EXPENSE_SPLIT : participates
    GROUP ||--o{ BALANCE : tracks
    USER ||--o{ BALANCE : has
```

---

## 📱 **Diagrama de Classes - Estrutura Principal**

> **📋 Nota:** Este diagrama está baseado no arquivo oficial `diagrama_classes.png` localizado em `project_docs/diagramas/`

```mermaid
classDiagram
    class User {
        +Long id
        +String name
        +String email
        +String passwordHash
        +String profilePicture
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +Boolean active
        
        +createGroup()
        +joinGroup()
        +createExpense()
        +updateProfile()
    }
    
    class Group {
        +Long id
        +String name
        +String description
        +String inviteCode
        +Long createdBy
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +Boolean active
        
        +addMember()
        +removeMember()
        +generateInviteCode()
        +calculateGroupBalance()
    }
    
    class GroupMember {
        +Long id
        +Long groupId
        +Long userId
        +String role
        +LocalDateTime joinedAt
        +Boolean active
        
        +changeRole()
        +leave()
    }
    
    class Expense {
        +Long id
        +Long groupId
        +Long createdBy
        +String description
        +BigDecimal amount
        +String category
        +LocalDate expenseDate
        +String notes
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +Boolean active
        
        +splitExpense()
        +updateSplits()
        +calculateIndividualAmounts()
    }
    
    class ExpenseSplit {
        +Long id
        +Long expenseId
        +Long userId
        +BigDecimal amount
        +String splitType
        +BigDecimal percentage
        +LocalDateTime createdAt
        
        +calculateAmount()
    }
    
    class Balance {
        +Long id
        +Long groupId
        +Long userId
        +BigDecimal totalPaid
        +BigDecimal totalOwed
        +BigDecimal netBalance
        +LocalDateTime calculatedAt
        
        +recalculate()
        +getDebtsAndCredits()
    }
    
    User ||--o{ Group : creates
    User ||--o{ GroupMember : participates
    Group ||--o{ GroupMember : contains
    Group ||--o{ Expense : has
    User ||--o{ Expense : creates
    Expense ||--o{ ExpenseSplit : divided_into
    User ||--o{ ExpenseSplit : owes
    Group ||--o{ Balance : tracks
    User ||--o{ Balance : has
```

---

## 🔄 **Fluxograma: Processo de Registro de Despesa**

```mermaid
flowchart TD
    Start([Usuário acessa grupo]) --> Auth{Usuário autenticado?}
    Auth -->|Não| Login[Redirecionar para login]
    Auth -->|Sim| Member{É membro do grupo?}
    Member -->|Não| Error[Erro: Acesso negado]
    Member -->|Sim| Form[Formulário de despesa]
    
    Form --> Fill[Preencher dados obrigatórios]
    Fill --> Validate{Dados válidos?}
    Validate -->|Não| FormError[Mostrar erros de validação]
    FormError --> Form
    
    Validate -->|Sim| Select[Selecionar participantes]
    Select --> Split[Definir tipo de divisão]
    Split --> Confirm[Confirmar despesa]
    
    Confirm --> Save[Salvar no banco de dados]
    Save --> CalcBalance[Recalcular saldos do grupo]
    CalcBalance --> Success[✅ Despesa registrada]
    
    Login --> Start
    Error --> End([Fim])
    Success --> End
```

---

## 🔄 **Fluxograma: Processo de Convite para Grupo**

```mermaid
flowchart TD
    Start([Admin convida usuário]) --> Generate[Gerar código único]
    Generate --> Send[Compartilhar código/link]
    Send --> Receive[Usuário recebe convite]
    
    Receive --> UserExists{Usuário já cadastrado?}
    UserExists -->|Não| Register[Cadastro obrigatório]
    Register --> Login[Login necessário]
    UserExists -->|Sim| AlreadyMember{Já é membro?}
    
    AlreadyMember -->|Sim| Error[Erro: Já é membro]
    AlreadyMember -->|Não| Accept[Aceitar convite]
    Login --> Accept
    
    Accept --> Join[Adicionar ao grupo]
    Join --> Welcome[Exibir dashboard do grupo]
    
    Error --> End([Fim])
    Welcome --> End
```

---

## 🎯 **Diagrama de Componentes - Frontend React**

```mermaid
graph TB
    subgraph "App Principal"
        App[App.jsx]
        Router[React Router]
        AuthContext[AuthContext]
        ThemeContext[ThemeContext]
    end
    
    subgraph "Páginas"
        Login[Login]
        Dashboard[Dashboard]
        Groups[Groups]
        Profile[Profile]
    end
    
    subgraph "Componentes Principais"
        Header[Header]
        ExpenseForm[ExpenseForm]
        ExpenseList[ExpenseList]
        GroupCard[GroupCard]
        BalanceCard[BalanceCard]
    end
    
    subgraph "Componentes UI"
        Button[Button]
        Input[Input]
        Modal[Modal]
        Loading[Loading]
    end
    
    subgraph "Hooks Customizados"
        useAuth[useAuth]
        useGroups[useGroups]
        useExpenses[useExpenses]
    end
    
    subgraph "Serviços"
        AuthService[AuthService]
        APIService[APIService]
        LocalStorage[LocalStorage]
    end
    
    App --> Router
    App --> AuthContext
    App --> ThemeContext
    Router --> Páginas
    
    Páginas --> "Componentes Principais"
    "Componentes Principais" --> "Componentes UI"
    "Componentes Principais" --> "Hooks Customizados"
    "Hooks Customizados" --> Serviços
```

---

## � **Fluxo de Autenticação e Segurança**

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant Frontend as 🎨 React App
    participant API as 🔧 Spring Boot API
    participant Auth as 🔐 Spring Security
    participant DB as 🗄️ PostgreSQL
    
    User->>Frontend: 1. Acessa aplicação
    Frontend->>API: 2. Verificar sessão
    API->>Auth: 3. Validar token JWT
    
    alt Token inválido/expirado
        Auth-->>Frontend: 4. Unauthorized
        Frontend-->>User: 5. Tela de login
        User->>Frontend: 6. Credenciais
        Frontend->>API: 7. POST /auth/login
        API->>Auth: 8. Validar credenciais
        Auth->>DB: 9. Buscar usuário
        DB-->>Auth: 10. Dados do usuário
        Auth->>Auth: 11. Gerar JWT
        Auth-->>API: 12. Token + dados
        API-->>Frontend: 13. Resposta com token
        Frontend->>Frontend: 14. Armazenar token
    else Token válido
        Auth-->>API: 4. Autorizado
        API-->>Frontend: 5. Dados do usuário
    end
    
    Frontend-->>User: 15. Interface autenticada
    
    Note over User,DB: Requisições subsequentes incluem JWT no header
```

---

## 📊 **Referências dos Diagramas Oficiais**

Os diagramas apresentados nesta documentação são baseados nos seguintes arquivos oficiais do projeto:

- **📁 `project_docs/diagramas/Diagrama de Casos de Uso.png`** - Casos de uso detalhados do sistema
- **📁 `project_docs/diagramas/diagrama_ER.png`** - Modelo de dados e relacionamentos
- **📁 `project_docs/diagramas/diagrama_classes.png`** - Estrutura de classes do domínio

### **Observações Importantes:**

1. **Escopo do MVP:** Os diagramas refletem apenas as funcionalidades implementadas no MVP
2. **Versões Futuras:** Funcionalidades como cache Redis, notificações e IA estão marcadas como futuras
3. **Simplificação:** Alguns detalhes de implementação foram simplificados para clareza
4. **Atualização:** Esta documentação será atualizada conforme a evolução do projeto

---

<div align="center">
  <strong>📊 Diagramas baseados na documentação oficial</strong><br/>
  <em>Representação visual da arquitetura implementada</em>
</div>
