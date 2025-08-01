# 🎨 Frontend FinBoost+

## 📝 Visão Geral

O frontend do **FinBoost+** é uma aplicação web moderna desenvolvida em React que oferece uma interface intuitiva e responsiva para **controle financeiro compartilhado**. A aplicação permite que usuários gerenciem suas finanças pessoais e em grupo de forma colaborativa e eficiente.

### 🎯 Principais Funcionalidades

- **👥 Gestão de Grupos**: Criação e gerenciamento de grupos de despesas compartilhadas
- **💰 Controle de Despesas**: Adição, edição e categorização de transações
- **📊 Visualização de Dados**: Gráficos interativos de saldos e gastos por categoria
- **👤 Autenticação**: Sistema completo de login, registro e perfil de usuário
- **🌓 Temas**: Suporte a modo claro e escuro
- **📱 Responsivo**: Interface adaptada para desktop, tablet e mobile

## 🛠️ Stack Tecnológico

### Core
- **[React 19.1.0](https://react.dev/)** - Biblioteca principal para interfaces reativas
- **[Vite 7.0.3](https://vitejs.dev/)** - Build tool moderna e rápida
- **[JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Linguagem de programação

### UI/UX
- **[TailwindCSS 4.1.11](https://tailwindcss.com/)** - Framework CSS utilitário
- **[HeadlessUI 2.2.4](https://headlessui.com/)** - Componentes acessíveis sem estilo
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones

### Roteamento e Estado
- **[React Router 7.6.3](https://reactrouter.com/)** - Navegação SPA
- **[Context API](https://react.dev/reference/react/createContext)** - Gerenciamento de estado global

### Gráficos e Visualização
- **[Recharts 3.1.0](https://recharts.org/)** - Biblioteca de gráficos para React

### Desenvolvimento e Testes
- **[Vitest 3.2.4](https://vitest.dev/)** - Framework de testes unitários
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código
- **[Prettier 3.6.2](https://prettier.io/)** - Formatação automática de código
- **[Testing Library](https://testing-library.com/)** - Utilitários para testes de componentes

## 📁 Estrutura do Projeto

```
frontend/src/
├── 📄 App.jsx                 # Componente raiz da aplicação
├── 📄 main.jsx               # Ponto de entrada React
├── 📄 index.css              # Estilos globais
├── 🧩 components/            # Componentes reutilizáveis
│   ├── 📊 ChartSwitcher/     # Gráficos e visualizações
│   ├── 📝 forms/             # Formulários da aplicação
│   ├── 🏗️ layout/            # Componentes de layout
│   ├── ⏳ Loading/           # Indicadores de carregamento
│   ├── 🏷️ Logo/              # Marca da aplicação
│   ├── 🎯 ModalButton/       # Modais dinâmicos
│   ├── 📋 SummaryCards/      # Cartões de resumo
│   ├── 🎨 ui/                # Componentes UI básicos
│   └── 👋 UserGreeting/      # Saudação do usuário
├── 🧠 context/               # Contextos globais (Estado)
│   ├── AuthContext.jsx      # Autenticação
│   ├── GroupContext.jsx     # Grupos financeiros
│   └── ThemeContext.jsx     # Temas da aplicação
├── 🪝 hooks/                 # Hooks personalizados
│   ├── useAuth.js           # Lógica de autenticação
│   ├── useExpenses.js       # Gestão de despesas
│   ├── useGroups.js         # Gestão de grupos
│   └── useLocalStorage.js   # Persistência local
├── 🧪 mockData/             # Dados fictícios para desenvolvimento
├── 📄 pages/                # Páginas da aplicação
│   ├── Dashboard/           # Painel principal
│   ├── Expenses/            # Gestão de despesas
│   ├── Groups/              # Gestão de grupos
│   ├── Login/               # Autenticação
│   ├── Notfound/           # Página 404
│   ├── Profile/            # Perfil do usuário
│   └── Register/           # Cadastro
├── 🌐 routes/               # Configuração de rotas
│   ├── routes.jsx          # Definições de rotas
│   └── ProtectedRoute.jsx  # Rotas protegidas
├── 🔌 services/             # Comunicação com API
│   ├── api.js              # Configuração Axios
│   ├── auth.js             # Serviços de autenticação
│   ├── expenses.js         # API de despesas
│   ├── groups.js           # API de grupos
│   └── users.js            # API de usuários
├── 🎨 styles/               # Estilos da aplicação
│   ├── globals.css         # Estilos globais
│   └── components.css      # Estilos de componentes
└── ⚙️ utils/                # Funções utilitárias
    ├── constants.js        # Constantes da aplicação
    ├── formatters.js       # Formatação de dados
    ├── helpers.js          # Funções auxiliares
    └── validators.js       # Validações
```

## 🏗️ Arquitetura e Padrões

### 🧩 Componentização
- **Componentes Funcionais**: Utilizamos apenas componentes funcionais com hooks
- **Composição**: Preferência por composição sobre herança
- **Reutilização**: Componentes modulares e reutilizáveis
- **Responsabilidade Única**: Cada componente tem uma responsabilidade específica

### 🧠 Gerenciamento de Estado
- **Context API**: Estado global para autenticação, temas e grupos
- **Local State**: useState para estado local dos componentes
- **Custom Hooks**: Lógica reutilizável encapsulada em hooks personalizados

### 🎨 Estilização
- **Utility-First**: Abordagem utilitária com TailwindCSS
- **Design System**: Componentes UI consistentes e reutilizáveis
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Componentes acessíveis com HeadlessUI

### 🧪 Qualidade de Código
- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **Testes**: Cobertura com Vitest e Testing Library
- **TypeScript**: Tipagem gradual (em consideração para futuras versões)

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run preview      # Preview do build de produção

# Qualidade
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação

# Testes
npm run test         # Executa testes unitários
```

## 📊 Métricas do Projeto

- **Componentes**: ~25 componentes reutilizáveis
- **Páginas**: 7 páginas principais
- **Hooks Personalizados**: 4 hooks especializados
- **Contextos**: 3 contextos globais
- **Serviços API**: 5 módulos de comunicação
- **Cobertura de Testes**: Meta de 80%+

## 🔗 Links Úteis

- **📚 [Getting Started](getting-started.md)** - Como configurar e executar o projeto
- **🏗️ [Arquitetura](architecture.md)** - Detalhes da arquitetura e decisões técnicas
- **🧩 [Componentes](components.md)** - Documentação completa dos componentes
- **📄 [Páginas](pages.md)** - Visão geral das páginas da aplicação
- **🪝 [Hooks](hooks.md)** - Documentação dos hooks personalizados
- **🔌 [Serviços](services.md)** - APIs e comunicação com backend
- **🎨 [Styling](styling.md)** - Guia de estilização e temas
- **🧪 [Testes](testing.md)** - Estratégia e configuração de testes
- **🚀 [Deploy](deployment.md)** - Processo de build e deploy
