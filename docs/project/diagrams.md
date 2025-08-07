# 📊 Diagramas do Sistema - FinBoost+

Esta seção apresenta os diagramas técnicos e de processo que documentam a arquitetura e funcionamento do sistema FinBoost+.

---

## 🏗️ **Diagrama de Arquitetura**

```mermaid
graph TB
    subgraph "Frontend (React)"
        UI[Interface do Usuário]
        Components[Componentes React]
        State[Gerenciamento de Estado]
        Router[React Router]
    end
    
    subgraph "Backend (Spring Boot)"
        API[REST API]
        Security[Spring Security]
        Service[Camada de Serviço]
        Repository[Repositórios JPA]
    end
    
    subgraph "Database"
        PostgreSQL[(PostgreSQL)]
    end
    
    subgraph "Infraestrutura"
        Docker[Docker Containers]
        CI[GitHub Actions]
        Docs[MkDocs]
    end
    
    UI --> API
    Components --> State
    State --> Router
    API --> Security
    Security --> Service
    Service --> Repository
    Repository --> PostgreSQL
    
    Docker --> Frontend
    Docker --> Backend
    CI --> Docker
    Docs --> CI
```

---

## 👤 **Diagrama de Casos de Uso**

```mermaid
graph TD
    User[👤 Usuário]
    Admin[👤 Administrador]
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
        UC7[Listar Grupos]
        UC8[Configurar Grupo]
        UC9[Sair do Grupo]
    end
    
    subgraph "Controle de Despesas"
        UC10[Registrar Despesa]
        UC11[Visualizar Despesas]
        UC12[Editar Despesa]
        UC13[Excluir Despesa]
        UC14[Calcular Saldos]
    end
    
    subgraph "Relatórios"
        UC15[Gerar Dashboard]
        UC16[Visualizar Saldos]
        UC17[Relatório por Período]
        UC18[Gráficos de Gastos]
    end
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC7
    User --> UC9
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC15
    User --> UC16
    User --> UC17
    User --> UC18
    
    Admin --> UC6
    Admin --> UC8
    
    System --> UC14
```

---

## 🗄️ **Diagrama Entidade-Relacionamento (ER)**

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
        varchar receipt_url
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
    
    SETTLEMENT {
        bigint id PK
        bigint group_id FK
        bigint from_user FK
        bigint to_user FK
        decimal amount
        varchar status
        text description
        timestamp created_at
        timestamp confirmed_at
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
    GROUP ||--o{ SETTLEMENT : records
    USER ||--o{ SETTLEMENT : pays
    USER ||--o{ SETTLEMENT : receives
```

---

## 🔄 **Fluxograma de Processos Principais**

### **Processo: Registro de Nova Despesa**

```mermaid
flowchart TD
    Start([Usuário acessa grupo]) --> Auth{Usuário autenticado?}
    Auth -->|Não| Login[Redirecionar para login]
    Auth -->|Sim| Member{É membro do grupo?}
    Member -->|Não| Error[Erro: Acesso negado]
    Member -->|Sim| Form[Formulário de despesa]
    
    Form --> Fill[Preencher dados]
    Fill --> Validate{Dados válidos?}
    Validate -->|Não| FormError[Mostrar erros]
    FormError --> Form
    
    Validate -->|Sim| Select[Selecionar participantes]
    Select --> Split[Definir divisão]
    Split --> Confirm[Confirmar despesa]
    
    Confirm --> Save[Salvar no banco]
    Save --> CalcBalance[Calcular saldos]
    CalcBalance --> Notify[Notificar participantes]
    Notify --> Success[Sucesso: Despesa criada]
    
    Login --> Start
    Error --> End([Fim])
    Success --> End
```

### **Processo: Convite para Grupo**

```mermaid
flowchart TD
    Start([Admin convida usuário]) --> Generate[Gerar código/link]
    Generate --> Send[Enviar convite]
    Send --> Receive[Usuário recebe convite]
    
    Receive --> Exists{Usuário existe?}
    Exists -->|Não| Register[Registro obrigatório]
    Register --> Login[Login necessário]
    Exists -->|Sim| Already{Já é membro?}
    
    Already -->|Sim| Error[Erro: Já é membro]
    Already -->|Não| Accept[Aceitar convite]
    Login --> Accept
    
    Accept --> Join[Adicionar ao grupo]
    Join --> Welcome[Mensagem de boas-vindas]
    Welcome --> Dashboard[Redirecionar para grupo]
    
    Error --> End([Fim])
    Dashboard --> End
```

---

## 🔐 **Diagrama de Segurança**

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant Frontend as 🎨 Frontend
    participant Gateway as 🚪 API Gateway
    participant Auth as 🔐 Auth Service
    participant API as 🔧 Backend API
    participant DB as 🗄️ Database
    
    User->>Frontend: 1. Login (email/senha)
    Frontend->>Gateway: 2. POST /auth/login
    Gateway->>Auth: 3. Validar credenciais
    Auth->>DB: 4. Consultar usuário
    DB-->>Auth: 5. Dados do usuário
    Auth->>Auth: 6. Gerar JWT
    Auth-->>Gateway: 7. Token JWT
    Gateway-->>Frontend: 8. Response + Token
    Frontend->>Frontend: 9. Armazenar token
    
    Note over User,DB: Requisições subsequentes
    
    User->>Frontend: 10. Ação (ex: criar despesa)
    Frontend->>Gateway: 11. Request + JWT Header
    Gateway->>Auth: 12. Validar token
    Auth-->>Gateway: 13. Token válido
    Gateway->>API: 14. Request autorizada
    API->>DB: 15. Operação no banco
    DB-->>API: 16. Resultado
    API-->>Gateway: 17. Response
    Gateway-->>Frontend: 18. Dados
    Frontend-->>User: 19. Interface atualizada
```

---

## 🏃‍♂️ **Diagrama de Atividades - Dashboard**

```mermaid
graph TD
    Start([Usuário acessa dashboard]) --> Load{Carregando dados}
    Load --> Groups[Buscar grupos do usuário]
    Groups --> Expenses[Buscar últimas despesas]
    Expenses --> Balances[Calcular saldos]
    
    Balances --> Render{Renderizar interface}
    Render --> ShowGroups[Exibir lista de grupos]
    ShowGroups --> ShowExpenses[Exibir despesas recentes]
    ShowExpenses --> ShowBalance[Exibir saldo total]
    ShowBalance --> ShowCharts[Exibir gráficos]
    
    ShowCharts --> Interactive[Interface interativa]
    Interactive --> Action{Ação do usuário}
    
    Action -->|Ver grupo| GroupDetail[Página do grupo]
    Action -->|Nova despesa| ExpenseForm[Formulário de despesa]
    Action -->|Ver relatório| Reports[Página de relatórios]
    Action -->|Atualizar| Refresh[Recarregar dados]
    
    GroupDetail --> End([Fim])
    ExpenseForm --> End
    Reports --> End
    Refresh --> Load
```

---

## 📱 **Diagrama de Componentes - Frontend**

```mermaid
graph TB
    subgraph "App"
        Router[React Router]
        AuthContext[Context de Autenticação]
        ThemeContext[Context de Tema]
    end
    
    subgraph "Pages"
        Login[LoginPage]
        Dashboard[DashboardPage]
        Group[GroupPage]
        Profile[ProfilePage]
    end
    
    subgraph "Components"
        Header[Header]
        Sidebar[Sidebar]
        ExpenseForm[ExpenseForm]
        ExpenseList[ExpenseList]
        BalanceCard[BalanceCard]
        Chart[Chart]
    end
    
    subgraph "UI Components"
        Button[Button]
        Input[Input]
        Modal[Modal]
        Card[Card]
        Loading[Loading]
    end
    
    subgraph "Services"
        API[API Service]
        AuthService[Auth Service]
        Storage[Local Storage]
    end
    
    subgraph "Hooks"
        useAuth[useAuth]
        useGroups[useGroups]
        useExpenses[useExpenses]
    end
    
    Router --> Pages
    AuthContext --> Pages
    ThemeContext --> Pages
    
    Pages --> Components
    Components --> UI
    
    Components --> Services
    Components --> Hooks
    
    Hooks --> Services
```

---

## 🔄 **Diagrama de Estados - Despesa**

```mermaid
stateDiagram-v2
    [*] --> Draft : Criar despesa
    Draft --> Validating : Submeter formulário
    Validating --> Invalid : Dados inválidos
    Invalid --> Draft : Corrigir erros
    Validating --> Created : Dados válidos
    Created --> Active : Salvar no banco
    Active --> Editing : Editar despesa
    Editing --> Validating : Submeter alterações
    Active --> Confirming : Solicitar exclusão
    Confirming --> Active : Cancelar exclusão
    Confirming --> Deleted : Confirmar exclusão
    Deleted --> [*]
    
    note right of Draft
        Usuário preenchendo
        formulário de despesa
    end note
    
    note right of Active
        Despesa ativa no sistema,
        afetando saldos do grupo
    end note
    
    note right of Deleted
        Soft delete - mantém
        histórico para auditoria
    end note
```

---

## 📊 **Métricas e Monitoramento**

```mermaid
graph LR
    subgraph "Coleta de Dados"
        Frontend[Frontend Metrics]
        Backend[Backend Metrics]
        Database[Database Metrics]
        Infrastructure[Infrastructure Metrics]
    end
    
    subgraph "Processamento"
        Aggregation[Agregação]
        Analysis[Análise]
    end
    
    subgraph "Visualização"
        Dashboard[Dashboard de Métricas]
        Alerts[Alertas]
        Reports[Relatórios]
    end
    
    Frontend --> Aggregation
    Backend --> Aggregation
    Database --> Aggregation
    Infrastructure --> Aggregation
    
    Aggregation --> Analysis
    Analysis --> Dashboard
    Analysis --> Alerts
    Analysis --> Reports
```

### **Métricas Chave**
- **Performance:** Response time, FCP, LCP
- **Uso:** DAU, MAU, Session duration
- **Business:** Grupos criados, Despesas registradas
- **Técnicas:** Error rate, Uptime, Memory usage

---

<div align="center">
  <strong>📊 Diagramas técnicos e de processo</strong><br/>
  <em>Documentação visual da arquitetura do sistema</em>
</div>
