# Finboost+ (Frontend)

Projeto frontend do sistema **Finboost+**, criado com Vite, React e TailwindCSS.

## 📦 Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app/frontend
```

## Instale as dependências:

```bash
npm install
```

## Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173

---

---

# 🎨 Frontend - Controle Financeiro Compartilhado

<div align="center">
  <img src="https://img.shields.io/badge/React-18+-blue" alt="React">
  <img src="https://img.shields.io/badge/Vite-5+-purple" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3+-teal" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/TypeScript-5+-blue" alt="TypeScript">
</div>

Interface web moderna desenvolvida em **React** para gerenciamento de finanças compartilhadas. Oferece uma experiência intuitiva e responsiva para controle de despesas em grupo.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Componentes](#-componentes-principais)
- [Testes](#-testes)
- [Build & Deploy](#-build--deploy)

---

## 🛠️ Tecnologias

### Core

- **⚛️ React 18+** - Biblioteca de interface
- **⚡ Vite 5+** - Build tool e dev server
- **📘 TypeScript 5+** - Tipagem estática
- **🎨 TailwindCSS 3+** - Framework CSS

### Dependências Principais

- **🔄 React Router DOM** - Roteamento
- **📡 Axios** - Cliente HTTP
- **🎯 React Hook Form** - Formulários
- **✅ Yup** - Validação de schemas
- **📊 Recharts** - Gráficos e visualizações
- **🎭 Framer Motion** - Animações
- **🔔 React Hot Toast** - Notificações

### Desenvolvimento & Testes

- **🧪 Jest** - Framework de testes
- **🎭 React Testing Library** - Testes de componentes
- **📱 MSW** - Mock Service Worker
- **🔧 ESLint** - Linting
- **💅 Prettier** - Formatação de código

---

## 📁 Estrutura do Projeto

```plaintext
frontend/
├── 📁 public/                       # Arquivos públicos
│   ├── favicon.ico
│   └── index.html
├── 📁 src/
│   ├── 📁 components/               # Componentes reutilizáveis
│   │   ├── 📁 ui/                   # Componentes básicos
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Card.tsx
│   │   ├── 📁 forms/                # Formulários
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ExpenseForm.tsx
│   │   ├── 📁 charts/               # Gráficos
│   │   │   ├── ExpenseChart.tsx
│   │   │   └── BalanceChart.tsx
│   │   └── 📁 layout/               # Layout
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Layout.tsx
│   ├── 📁 pages/                    # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Groups.tsx
│   │   ├── Expenses.tsx
│   │   └── Profile.tsx
│   ├── 📁 services/                 # Serviços HTTP
│   │   ├── api.ts                   # Configuração do Axios
│   │   ├── auth.ts                  # Serviços de autenticação
│   │   ├── groups.ts                # Serviços de grupos
│   │   ├── expenses.ts              # Serviços de despesas
│   │   └── users.ts                 # Serviços de usuários
│   ├── 📁 hooks/                    # Hooks customizados
│   │   ├── useAuth.ts               # Hook de autenticação
│   │   ├── useGroups.ts             # Hook de grupos
│   │   ├── useExpenses.ts           # Hook de despesas
│   │   └── useLocalStorage.ts       # Hook de localStorage
│   ├── 📁 context/                  # Context API
│   │   ├── AuthContext.tsx          # Contexto de autenticação
│   │   ├── GroupContext.tsx         # Contexto de grupos
│   │   └── ThemeContext.tsx         # Contexto de tema
│   ├── 📁 types/                    # Tipos TypeScript
│   │   ├── auth.ts
│   │   ├── groups.ts
│   │   ├── expenses.ts
│   │   └── index.ts
│   ├── 📁 utils/                    # Utilitários
│   │   ├── formatters.ts            # Formatação de dados
│   │   ├── validators.ts            # Validações
│   │   ├── constants.ts             # Constantes
│   │   └── helpers.ts               # Funções auxiliares
│   ├── 📁 assets/                   # Recursos estáticos
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── 📁 fonts/
│   ├── 📁 styles/                   # Estilos globais
│   │   ├── globals.css
│   │   └── components.css
│   ├── App.tsx                      # Componente principal
│   ├── main.tsx                     # Ponto de entrada
│   └── vite-env.d.ts               # Tipos do Vite
├── 📁 __tests__/                    # Testes
│   ├── 📁 components/
│   ├── 📁 pages/
│   ├── 📁 hooks/
│   └── 📁 utils/
├── 📁 .storybook/                   # Storybook (opcional)
├── package.json                     # Dependências
├── vite.config.ts                   # Configuração do Vite
├── tailwind.config.js               # Configuração do Tailwind
├── tsconfig.json                    # Configuração do TypeScript
├── eslint.config.js                 # Configuração do ESLint
├── prettier.config.js               # Configuração do Prettier
├── Dockerfile                       # Container Docker
└── README.md                        # Este arquivo
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

## 🧩 Componentes Principais

### Layout

- **Header**: Navegação principal e perfil do usuário
- **Sidebar**: Menu lateral com navegação
- **Layout**: Wrapper principal da aplicação

### Formulários

- **LoginForm**: Formulário de login
- **RegisterForm**: Formulário de cadastro
- **ExpenseForm**: Formulário de despesas
- **GroupForm**: Formulário de grupos

### Visualizações

- **ExpenseChart**: Gráfico de despesas
- **BalanceChart**: Gráfico de saldos
- **Dashboard**: Visão geral dos dados

### UI Components

- **Button**: Botões customizados
- **Input**: Campos de entrada
- **Modal**: Modais reutilizáveis
- **Card**: Cartões de conteúdo

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

## 🎨 Customização

### Temas

```typescript
// src/context/ThemeContext.tsx
export const themes = {
  light: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    text: '#1f2937',
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#1f2937',
    text: '#f9fafb',
  },
};
```

### Responsividade

```css
/* Breakpoints Tailwind */
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop muito grande */
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

## 🔍 Debugging

### React DevTools

```bash
# Instalar extensão do navegador
# Chrome: React Developer Tools
# Firefox: React Developer Tools
```

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

## 📚 Recursos Adicionais

### Documentação

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### Ferramentas

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

<div align="center">
  <strong>🎨 Frontend desenvolvido com React e TypeScript</strong>
</div>
