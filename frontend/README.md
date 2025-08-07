# 🎨 Frontend - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/React-19+-61dafb" alt="React">
  <img src="https://img.shields.io/badge/Vite-7+-646cff" alt="Vite">  
  <img src="https://img.shields.io/badge/TailwindCSS-4+-38bdf8" alt="Tailwind">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
</div>

**Interface web moderna** do FinBoost+ desenvolvida em **React**. Oferece experiência fluida para gerenciamento de finanças compartilhadas, com design responsivo e componentes acessíveis.

---

## 🚀 **Funcionalidades Principais**

- 🎨 **Interface Moderna** - Design responsivo e intuitivo
- 🔐 **Autenticação Segura** - Login e registro integrados
- 👥 **Gestão de Grupos** - Interface para grupos financeiros
- 📊 **Dashboard Interativo** - Gráficos e estatísticas em tempo real
- 🌙 **Dark/Light Mode** - Alternância de temas
- 📱 **Responsivo** - Funciona em todos os dispositivos

---

## 🛠️ **Tecnologias**

### **Core**
- **React 19+** - Biblioteca de interface
- **Vite 7+** - Build tool e dev server
- **TailwindCSS 4+** - Framework CSS utilitário
- **JavaScript** - Linguagem principal

### **Bibliotecas**
- **React Router** - Roteamento de páginas
- **Axios** - Requisições HTTP
- **Recharts** - Gráficos e visualizações
- **Headless UI** - Componentes acessíveis

### **Desenvolvimento**
- **Vitest** - Framework de testes
- **ESLint + Prettier** - Padronização de código
- **React Testing Library** - Testes de componentes

---

## 📁 **Estrutura Resumida**

```
frontend/
├── 📁 src/
│   ├── 🧩 components/       # Componentes reutilizáveis
│   │   ├── 📋 forms/        # Formulários (Login, Despesas, etc.)
│   │   ├── 📊 charts/       # Gráficos (Balance, Expenses)
│   │   ├── 🎛️ layout/       # Layout (Header, Sidebar, etc.)
│   │   └── 🔧 ui/          # Componentes básicos (Button, Input)
│   ├── 📄 pages/           # Páginas principais
│   │   ├── Dashboard/      # Página inicial
│   │   ├── Groups/         # Gestão de grupos
│   │   ├── Expenses/       # Controle de despesas
│   │   └── Profile/        # Perfil do usuário
│   ├── 🔗 services/        # Requisições API
│   ├── 🎣 hooks/           # Custom hooks
│   ├── 📡 context/         # Context API (Auth, Theme)
│   └── 🛣️ routes/          # Rotas e proteção
├── 📁 __tests__/           # Testes automatizados
└── 📁 public/             # Arquivos estáticos
```

> 📖 **Documentação completa:** Veja nossa [documentação técnica](https://finboostplus.github.io/finboostplus-app/) para leitura sobre desenvolvimento e arquitetura.

---

## ⚡ **Execução Rápida**

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn
- Git

### **Verificar Instalação**
```bash
node -v    # v18+
npm -v     # 8+  
git --version
```

### **1. Instalar e Executar**
```bash
# Se já clonou o repo, entre na pasta frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento  
npm run dev

# ✅ Aplicação rodando em: http://localhost:5173
```

### **2. Builds e Deploy**
```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Analisar bundle
npm run build -- --analyze
```

---

## 🧪 **Testes**

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch  

# Cobertura de testes
npm run test:coverage

# Ver relatório de cobertura
open coverage/index.html
```

---

## 🔧 **Configurações**

### **Variáveis de Ambiente**
Crie um arquivo `.env.local`:

```env
# URL da API Backend
VITE_API_BASE_URL=http://localhost:8080/api

# Nome da aplicação
VITE_APP_NAME=FinBoost+

# Ambiente
VITE_NODE_ENV=development
```

### **Integração com Backend**
```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Certifique-se que o backend esteja rodando em :8080
```

---

## 📱 **Páginas Principais**

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Dashboard | Visão geral e estatísticas |
| `/groups` | Groups | Gestão de grupos financeiros |
| `/expenses` | Expenses | Registro de despesas |
| `/profile` | Profile | Perfil e configurações |
| `/login` | Login | Autenticação |

---

## 🎨 **Customização de Tema**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

---

## 🤝 **Padrões de Desenvolvimento**

### **Nomenclatura**
- **Componentes:** PascalCase (`UserProfile.jsx`)
- **Funções:** camelCase (`getUserData`)
- **Constantes:** UPPER_SNAKE_CASE (`API_BASE_URL`)

### **Estrutura de Componente**
```jsx
// Exemplo: components/ui/Button.jsx
import { forwardRef } from 'react'

const Button = forwardRef(({ className, variant = 'primary', ...props }, ref) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      ref={ref}
      {...props}
    />
  )
})

export default Button
```

### **Commits**
- `feat:` Nova funcionalidade UI
- `fix:` Correção visual/funcional
- `style:` Ajustes de CSS/styling
- `refactor:` Refatoração de componentes

---

## 📞 **Suporte**

- 🐛 **Issues:** [GitHub Issues](../../issues)
- 📖 **Docs:** [Guia de Componentes](../docs/frontend)
- 💬 **Discord:** [Nosso servidor](link-discord)
- 🎨 **Figma:** [Design System](link-figma)

---

## 🚀 **Performance**

- **Lighthouse Score:** 90+ ⚡
- **Bundle Size:** < 500KB 📦
- **First Paint:** < 1.5s ⏱️

---

<div align="center">
  <strong>🎨 Interface React - FinBoost+</strong><br/>
  <em>Desenvolvido pelo Grupo 7 - +Prati & Codifica</em>
</div>
