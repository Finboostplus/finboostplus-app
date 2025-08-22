# Estrutura e Padrões - Frontend

O frontend do FinBoost+ é construído com React 19 usando Vite, seguindo uma arquitetura modular e escalável baseada em **Feature-First** combinada com **Atomic Design**. A aplicação é uma PWA (Progressive Web App) com suporte offline.

## Arquitetura

### Princípios

!!! info "Padrões Adotados"
- **Separation of Concerns**: Cada pasta tem responsabilidade específica
- **Component-First**: Componentes reutilizáveis e composáveis  
- **Performance**: Lazy loading, code splitting e otimizações PWA
- **Accessibility**: HeadlessUI e padrões WCAG

### Stack Principal

=== "Core"
- **React 19**: Framework principal com hooks
- **Vite 7**: Bundler e dev server
- **React Router**: Roteamento SPA
- **TypeScript**: Tipos via JSDoc e Zod

=== "UI/Estado"
- **TailwindCSS 4**: Framework CSS utility-first
- **HeadlessUI**: Componentes acessíveis
- **Zustand**: Estado global simples
- **React Hook Form**: Formulários performáticos

=== "PWA/Performance"
- **Vite PWA Plugin**: Service Worker automático
- **React.lazy**: Code splitting por rotas
- **React.memo**: Otimização de re-renders

=== "Testes"
- **Vitest**: Framework de testes
- **React Testing Library**: Testes centrados no usuário
- **ESLint + Prettier**: Qualidade de código

## Estrutura de Pastas

```
src/
├── main.jsx                 # Ponto de entrada
├── App.jsx                  # Componente raiz
├── index.css                # Estilos globais e Tailwind
│
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Básicos (Button, Input, Modal)
│   ├── forms/               # Formulários específicos
│   ├── Layout/              # Estrutura de layout
│   └── [Feature]/           # Por funcionalidade
│
├── pages/                   # Páginas/Views da aplicação
│   ├── Dashboard/           # Dashboard principal
│   ├── Groups/              # Gestão de grupos
│   ├── Expenses/            # Gestão de despesas
│   ├── Profile/             # Perfil do usuário
│   └── Auth/                # Login e registro
│
├── hooks/                   # Hooks customizados
│   ├── useAuth.js           # Autenticação
│   ├── useGroups.js         # Gestão de grupos
│   └── useLocalStorage.js   # Persistência local
│
├── context/                 # Contexts e stores
│   ├── stores/              # Zustand stores
│   └── atoms/               # Estados atômicos
│
├── routes/                  # Configuração de rotas
│   ├── routes.jsx           # Definição das rotas
│   └── ProtectedRoute.jsx   # Rotas protegidas
│
├── services/                # Integrações externas
│   ├── api.js               # Cliente HTTP base
│   ├── auth.js              # Serviços de autenticação
│   └── groups.js            # Serviços de grupos
│
├── schemas/                 # Validação e tipos
│   ├── loginUser/           # Schema de login
│   └── registerUser/        # Schema de registro
│
└── utils/                   # Utilitários
    ├── constants.js         # Constantes
    ├── formatters.js        # Formatadores (moeda, data)
    └── helpers.js           # Funções auxiliares
```

## Padrões de Código

### Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| **Componentes** | PascalCase | `UserProfile.jsx` |
| **Hooks** | camelCase + 'use' | `useAuth.js` |
| **Funções/Variáveis** | camelCase | `getUserData` |
| **Constantes** | UPPER_SNAKE_CASE | `API_BASE_URL` |

### Estrutura de Componentes

```jsx
import React from 'react';
import { useState } from 'react';

const ComponentName = ({ prop1, prop2, ...props }) => {
  // Hooks no topo
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {
    // lógica
  };
  
  // Render
  return (
    <div className="component-name" {...props}>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

## Estado Global

### Zustand Store

```javascript
// store/auth.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
```

### Context para Temas

```jsx
// context/ThemeContext.jsx
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Roteamento

### Configuração Principal

```jsx
// routes/routes.jsx
export const routes = createBrowserRouter([
  // Rotas públicas
  {
    element: <Layout />,
    children: [
      { path: '/login', element: <Login />, action: loginAction },
      { path: '/register', element: <Register />, action: registerAction },
    ],
  },
  // Rotas protegidas
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'groups', element: <Groups /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);
```

### Proteção de Rotas

```jsx
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

## Integração com Backend

### Cliente HTTP Base

```javascript
// services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para autenticação
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Tratamento de Erros

!!! warning "Error Handling"
- Interceptors globais para erros HTTP
- Toast notifications para feedback do usuário
- Estados de loading e error em todos os hooks
- Fallbacks para componentes com erro

## Performance

### Otimizações Implementadas

=== "Code Splitting"
- Lazy loading de páginas com `React.lazy()`
- Suspense boundaries para loading states
- Chunking automático pelo Vite

=== "PWA Features"
- Service Worker para cache offline
- Manifest para instalação nativa
- Network-first para dados, Cache-first para assets

=== "React Optimizations"
- `React.memo` para componentes pesados
- `useMemo` e `useCallback` quando necessário
- Evitar re-renders desnecessários

## Acessibilidade

### Padrões WCAG

!!! success "Implementado"
- Semantic HTML5 elements
- ARIA labels e roles apropriados
- Focus management e keyboard navigation
- Color contrast compliance
- HeadlessUI para componentes acessíveis

### Ferramentas

- **HeadlessUI**: Componentes com acessibilidade nativa
- **ESLint jsx-a11y**: Validação automática
- **React Testing Library**: Testes focados em acessibilidade

## Build e Deploy

### Comandos Principais

=== "Desenvolvimento"
```bash
npm run dev         # Servidor de desenvolvimento
npm run preview     # Preview local do build
```

=== "Produção"
```bash
npm run build       # Build otimizado
npm run test        # Executar testes
```

### Otimizações de Build

!!! info "Automáticas"
- Tree shaking para remoção de código morto
- Minificação de CSS/JS
- Compressão de assets estáticos
- Service Worker gerado automaticamente

---

!!! tip "Próximos Passos"
- [**Componentes Principais**](components.md) - Detalhes dos componentes UI
- [**Hooks Customizados**](hooks.md) - Lógica reutilizável
- [**Testes Frontend**](testing.md) - Estratégias de teste