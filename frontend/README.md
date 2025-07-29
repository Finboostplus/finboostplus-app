# 🎨 Finboost+ Frontend — Controle Financeiro Compartilhado

Finboost+ é uma interface web moderna para gerenciar finanças em grupo, feita com React, Vite e Tailwind CSS. Oferece navegação fluida, componentes acessíveis e testes com Vitest, focando em performance e experiência do usuário.

---

## 📋 Índice

- [🤝 Contribuição](#-contribuição)
- [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
- [📚 Recursos Adicionais](#-recursos-adicionais)
- [🛠️ Tecnologias](#-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Configuração](#-configuração)
- [🚀 Execução](#-execução)
- [🎯 Funcionalidades](#-funcionalidades)
- [🧪 Testes](#-testes)
- [📦 Build & Deploy](#-build--deploy)


---
  
## 🎯 Boas Práticas
  
### Código

- **Componentes funcionais** com hooks
- **TypeScript** para tipagem
- **Custom hooks** para lógica reutilizável
- **Memoização** com React.memo, useMemo, useCallback

### Estrutura

- **Atomic Design** para componentes
- **Barrel exports** para imports limpos
- **Absolute imports** com alias
- **Consistent naming** em inglês

### Performance

- **Code splitting** por rotas
- **Lazy loading** de componentes
- **Otimização de imagens**
- **Service Worker** para cache

### Acessibilidade

- **Semantic HTML** adequado
- **ARIA labels** quando necessário
- **Focus management** em modais
- **Keyboard navigation** completa
  
---

## 🤝 Contribuição

### Padrões de Código

- Use **TypeScript** para todos os arquivos
- Siga as convenções do **ESLint** e **Prettier**
- Escreva **testes** para componentes principais
- Use **commits semânticos**

### Fluxo de Trabalho

1. Crie uma **branch** para sua feature
2. Implemente a funcionalidade
3. Escreva/atualize testes
4. Verifique linting e tipos
5. Abra um **Pull Request**

### Checklist

- [ ] Código tipado com TypeScript
- [ ] Componentes testados
- [ ] Acessibilidade verificada
- [ ] Performance otimizada
- [ ] Documentação atualizada


---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173

---

## 🛠️ Tecnologias

### Core

- **⚛️ [React 18+](https://react.dev/)** – Biblioteca de interface
- **⚡ [Vite 5+](https://vitejs.dev/)** – Build tool e dev server
- **📘 [TypeScript 5+](https://www.typescriptlang.org/)** – Tipagem estática
- **🎨 [TailwindCSS 3+](https://tailwindcss.com/)** – Framework CSS utilitário

### Dependências Principais

- **🔄 [React Router DOM v7](https://reactrouter.com/)** – Roteamento SPA
- **📡 [Axios](https://axios-http.com/)** – Cliente HTTP
- **🎯 [React Hook Form](https://react-hook-form.com/)** – Manipulação de formulários
- **✅ [Yup](https://github.com/jquense/yup)** – Validação de schemas
- **📊 [Recharts](https://recharts.org/)** – Gráficos reativos
- **🎭 [Framer Motion](https://www.framer.com/motion/)** – Animações declarativas
- **🔔 [React Hot Toast](https://react-hot-toast.com/)** – Notificações

### Desenvolvimento & Testes

- **🧪 [Vitest](https://vitest.dev/)** – Testes rápidos com compatibilidade Jest
- **🧪 [Jest](https://jestjs.io/)** – Testes unitários
- **🎭 [React Testing Library](https://testing-library.com/)** – Testes de componentes React
- **📱 [MSW](https://mswjs.io/)** – Mock de requisições HTTP
- **🔧 [ESLint](https://eslint.org/)** – Linter de código
- **💅 [Prettier](https://prettier.io/)** – Formatação automática
- **🎛️ [Headless UI](https://headlessui.com/)** – Componentes acessíveis sem estilos

---

## 📚 Recursos Adicionais

### Documentação

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### Ferramentas

- [React DevTools - Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [React DevTools - FireFox](https://addons.mozilla.org/pt-BR/firefox/addon/react-devtools/)
- [Redux DevTools - Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Redux DevTools - FireFox](https://addons.mozilla.org/pt-BR/firefox/addon/reduxdevtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
---


## 📁 Estrutura do Projeto

```plaintext
frontend/
├── 📁 __tests__/                   # Testes automatizados
│   ├── 📁 components/              # Testes de componentes
│   │   └── Header.test.jsx
│   └── setup.js                    
├── 📁 public/                      # Arquivos públicos acessíveis diretamente
│   └── logo.png                    # Imagem usada como logotipo
├── 📁 src/                         # Código-fonte principal
│   ├── 📁 components/              # Componentes reutilizáveis
│   │   ├── 📁 Loading/             # Componente de loading
│   │   │   └── index.jsx
│   │   ├── 📁 Logo/                # Componente de logotipo
│   │   │   └── index.jsx
│   │   ├── 📁 Modal/               # Componente de modal
│   │   │   └── index.jsx
│   │   ├── 📁 SummaryCards/        # Cartões de resumo
│   │   │   └── index.jsx
│   │   ├── 📁 UserGreeting/        # Saudação ao usuário
│   │   │   └── index.jsx
│   │   ├── 📁 charts/              # Componentes de gráficos
│   │   │   ├── BalanceChart.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── 📁 forms/               # Componentes de formulários
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── 📁 layout/              # Componentes de layout (Header, Sidebar, etc)
│   │   │   ├── 📁 DropdownMenu/    # Menu dropdown no layout
│   │   │   │   ├── 📁 DropdownMenuNav/
│   │   │   │   │   ├── 📁 SwitchTheme/ # Componente de troca de tema
│   │   │   │   │   │   └── index.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── navItems.jsx
│   │   │   │   │   └── useSidebarNav.js
│   │   │   │   └── index.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   └── 📁 ui/                  # Componentes de UI básicos (botões, inputs, etc)
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       └── Modal.jsx
│   ├── 📁 context/                 # Context API para estado global
│   │   ├── AuthContext.jsx         # Contexto de autenticação
│   │   ├── GroupContext.jsx        # Contexto de grupos
│   │   └── ThemeContext.jsx        # Contexto de tema (dark/light)
│   ├── 📁 hooks/                   # Hooks customizados
│   │   ├── useAuth.js              # Hook para acessar o AuthContext
│   │   ├── useExpenses.js          # Hook para acessar dados de despesas
│   │   ├── useGroups.js            # Hook para acessar dados de grupos
│   │   └── useLocalStorage.js      # Hook para gerenciar localStorage
│   ├── 📁 pages/                   # Páginas principais da aplicação
│   │   ├── 📁 Dashboard/           # Página do dashboard
│   │   │   └── index.jsx
│   │   ├── 📁 Expenses/            # Página de despesas
│   │   │   ├── 📁 CustomSplitAmount/
│   │   │   │   └── index.jsx
│   │   │   ├── 📁 FormFieldsExpenses/
│   │   │   │   └── index.jsx
│   │   │   ├── LatestExpenses.jsx
│   │   │   └── index.jsx
│   │   ├── 📁 Groups/              # Página de grupos
│   │   │   ├── 📁 GroupDetails/    # Detalhes de um grupo
│   │   │   │   ├── 📁 ModalButton/
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── BalancesList.jsx
│   │   │   │   ├── ExpensesList.jsx
│   │   │   │   ├── groupDetailsLoader.js
│   │   │   │   └── index.jsx
│   │   │   ├── index.jsx
│   │   │   └── mockGroups.jsx
│   │   ├── 📁 Login/               # Página de login
│   │   │   ├── index.jsx
│   │   │   └── loginAction.js
│   │   ├── 📁 Notfound/            # Página 404
│   │   │   └── index.jsx
│   │   ├── 📁 Profile/             # Página de perfil
│   │   │   ├── 📁 ActiveGroups/
│   │   │   │   └── index.jsx
│   │   │   ├── 📁 Stats/
│   │   │   │   └── index.jsx
│   │   │   └── index.jsx
│   │   └── 📁 Register/            # Página de cadastro
│   │       └── index.jsx
│   ├── 📁 routes/                  # Rotas protegidas e principais
│   │   ├── ProtectedRoute.jsx
│   │   └── routes.jsx
│   ├── 📁 services/                # Serviços para API e chamadas HTTP
│   │   ├── api.js                  # Configuração base do Axios
│   │   ├── auth.js                 # Requisições de autenticação
│   │   ├── expenses.js             # Requisições de despesas
│   │   ├── groups.js               # Requisições de grupos
│   │   └── users.js                # Requisições de usuários
│   ├── App.jsx                    # Componente raiz da aplicação
│   ├── index.css                  # Estilos globais da aplicação
│   └── main.jsx                   # Ponto de entrada da aplicação (ReactDOM)
├── tailwind.config.js             # Configuração do TailwindCSS
├── .gitignore                     # Arquivos e pastas ignoradas pelo Git
├── README.md                      # Documentação do projeto
├── eslint.config.js               # Configuração do ESLint (linter)
├── index.html                     # HTML principal da aplicação (usado pelo Vite)
├── package.json                   # Dependências e scripts do projeto
└── vite.config.js                 # Configuração do Vite
```

---

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
# API
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# Autenticação
VITE_JWT_STORAGE_KEY=controle_financeiro_token

# Recursos externos
VITE_ENABLE_ANALYTICS=false
VITE_SENTRY_DSN=your_sentry_dsn_here

# Desenvolvimento
VITE_ENABLE_MOCK=false
VITE_LOG_LEVEL=info
```

### 2. Configuração do Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

### 3. Configuração do Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

---

## 🚀 Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Executar com proxy para API
npm run dev -- --host

# Executar Storybook (se configurado)
npm run storybook

# Verificar tipos TypeScript
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatação
npm run format
npm run format:check
```

### Verificação da Aplicação

```bash
# Aplicação rodando em
# http://localhost:5173

# Verificar se API está conectada
curl http://localhost:5173/api/health
```

---

## 🎯 Funcionalidades

### Autenticação

- Login/logout seguro
- Registro de novos usuários
- Recuperação de senha
- Proteção de rotas

### Gerenciamento de Grupos

- Criação e edição de grupos
- Adição/remoção de membros
- Visualização de saldos

### Controle de Despesas

- Cadastro de despesas
- Divisão automática entre membros
- Categorização de gastos
- Histórico de transações

### Dashboard

- Resumo financeiro
- Gráficos interativos
- Estatísticas personalizadas
- Relatórios exportáveis

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Testes de um arquivo específico
npm test -- LoginForm.test.tsx

# Testes de integração
npm run test:integration
```

### Tipos de Testes

- **Unit Tests**: Componentes isolados
- **Integration Tests**: Interação entre componentes
- **E2E Tests**: Fluxos completos (Cypress)

### Estrutura de Testes

```javascript
// Exemplo de teste de componente
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '@components/forms/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

---

## 📦 Build & Deploy

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Prévia do build
npm run preview

# Analisar bundle
npm run analyze
```

### Deploy

```bash
# Netlify
npm run build
# Upload da pasta dist/

# Vercel
vercel --prod

# Docker
docker build -t controle-financeiro-frontend .
docker run -p 3000:3000 controle-financeiro-frontend
```

### Otimizações

- **Code Splitting**: Divisão automática de código
- **Lazy Loading**: Carregamento sob demanda
- **Tree Shaking**: Eliminação de código não utilizado
- **Minificação**: Compressão de arquivos
- **Caching**: Cache de recursos estáticos

---

## 🐳 Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - '3000:80'
    environment:
      - VITE_API_URL=http://localhost:8080/api
    depends_on:
      - backend
```

---

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**

   ```bash
   # Configurar proxy no vite.config.ts
   server: {
     proxy: {
       '/api': 'http://localhost:8080'
     }
   }
   ```

2. **Erro de tipos TypeScript**

   ```bash
   # Verificar tipos
   npm run type-check

   # Instalar tipos faltantes
   npm install --save-dev @types/node
   ```

3. **Problemas de performance**

   ```bash
   # Analisar bundle
   npm run analyze

   # Verificar re-renders
   # Usar React DevTools Profiler
   ```

---

## 📊 Análise de Performance

### Métricas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Ferramentas

- **Lighthouse**: Auditoria de performance
- **Web Vitals**: Métricas essenciais de UX
- **Bundle Analyzer**: Análise do tamanho do bundle
- **React DevTools**: Debug e profiling

### Monitoramento

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Web Vitals
npm install web-vitals
```

---


## 🔍 Debugging

### Debug Console

```javascript
// Logs condicionais
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Performance profiling
console.time('ComponentRender');
// ... component logic
console.timeEnd('ComponentRender');
```

### Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react'

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Algo deu errado</h2>
          <p>Tente recarregar a página</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## 🚀 Scripts Úteis

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "analyze": "npm run build && npx vite-bundle-analyzer dist/stats.html",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Hooks Úteis

```typescript
// useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// useApi.ts
import { useEffect, useState } from 'react';
import { api } from '@services/api';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T>(url);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

---

## 📱 PWA (Progressive Web App)

### Configuração

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Controle Financeiro',
        short_name: 'FinanceApp',
        description: 'Controle de finanças compartilhadas',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

---

## 🌐 Internacionalização (i18n)

### Configuração

```bash
# Instalar dependências
npm install react-i18next i18next i18next-browser-languagedetector
```

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pt from './locales/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

---

## 📈 Monitoramento em Produção

### Sentry (Error Tracking)

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});

```

### Analytics

```typescript
// src/utils/analytics.ts
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Google Analytics, Mixpanel, etc.
    gtag('event', eventName, properties);
  }
};
```

---

<div align="center">
  <strong>🎨 Frontend desenvolvido com React e TypeScript</strong>
</div>