# 🎨 Frontend - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/React-19+-61dafb" alt="React">
  <img src="https://img.shields.io/badge/Vite-7+-646cff" alt="Vite">  
  <img src="https://img.shields.io/badge/TailwindCSS-4+-38bdf8" alt="Tailwind">
  <img src="https://img.shields.io/badge/Node-18+-339933" alt="Node.js">
  <img src="https://img.shields.io/badge/PWA-Enabled-brightgreen" alt="PWA">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
</div>

Interface web moderna do FinBoost+ em React. Foco em UX responsiva, acessibilidade, PWA e arquitetura escalável.

---

## 📚 Sumário

<details>
<summary><strong>Clique para expandir</strong></summary>

- [🎨 Frontend - FinBoost+](#-frontend---finboost)
  - [📚 Sumário](#-sumário)
  - [🚀 Visão Geral](#-visão-geral)
  - [✅ Funcionalidades Principais](#-funcionalidades-principais)
  - [🛠️ Tecnologias](#️-tecnologias)
  - [📁 Arquitetura & Estrutura](#-arquitetura--estrutura)
    - [Princípios](#princípios)
  - [📱 PWA (Progressive Web App)](#-pwa-progressive-web-app)
    - [Instalação](#instalação)
    - [Recursos Implementados](#recursos-implementados)
  - [⚡ Execução Rápida](#-execução-rápida)
  - [🔧 Configuração / Ambiente](#-configuração--ambiente)
  - [🧪 Testes](#-testes)
  - [🎨 Tema & Estilo](#-tema--estilo)
  - [🤝 Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
  - [🚀 Performance](#-performance)
  - [🔧 Troubleshooting](#-troubleshooting)
  - [📞 Suporte](#-suporte)
</details>

---

## 🚀 Visão Geral
Camada de interface que consome a API Spring Boot. Estrutura orientada a escalabilidade (Feature + Atomic Design) e experiência rica (dashboard, gráficos, tema dinâmico, offline básico via PWA).

## ✅ Funcionalidades Principais
- 🎨 UI Responsiva & Dark/Light Mode
- 🔐 Autenticação e proteção de rotas
- 👥 Gestão de grupos e despesas
- 📊 Dashboard com gráficos (Recharts)
- 📱 PWA instalável e uso offline básico
- ♻️ Hooks e Context para estado global

---

## 🛠️ Tecnologias

**Core:** React 19, Vite, TailwindCSS, JavaScript (ES202x)
**UI/Data:** React Router, Recharts, Headless UI, Axios
**Qualidade:** ESLint, Prettier, Vitest, React Testing Library
**PWA:** Vite Plugin PWA (Service Worker + Manifest)

---

## 📁 Arquitetura & Estrutura

```
frontend/
├── src/
│   ├── components/      # UI (atoms/ui, layout, forms, feature widgets)
│   ├── pages/           # Páginas (rotas)
│   ├── hooks/           # Hooks reutilizáveis
│   ├── context/         # Providers globais (Auth, Theme, Group)
│   ├── services/        # Acesso HTTP / integração API
│   ├── routes/          # Definição e proteção de rotas
│   ├── schemas/         # Validação (ex: Zod/Yup)
│   ├── utils/           # Helpers puros
│   ├── styles/          # Estilos globais / tokens
│   └── mockData/        # Dados mock para dev
├── __tests__/           # Testes (componentes, integração, setup)
└── public/              # Manifest, ícones, assets estáticos
```

### Princípios
- Separation of Concerns: cada pasta com responsabilidade clara
- Atomic + Feature-First: facilita evolução incremental
- Reutilização e composição de componentes
- Testabilidade (camadas desacopladas)

---

## 📱 PWA (Progressive Web App)
Aplicação instalável em desktop e mobile com cache e atualização automática.

### Instalação
- Desktop (Chrome/Edge): Ícone de instalar na barra ou menu do navegador
- Android: Menu → Adicionar à tela inicial
- iOS Safari: Share → Adicionar à Tela de Início

### Recursos Implementados
- 📄 Manifest configurado (nome, cores, display standalone)
- 🧩 Service Worker (cache estático + atualização automática)
- 🖼 Ícones multi-resolução (+ Apple Touch)
- 🌐 Estratégias: Cache-first (assets) / Network-first (dados dinâmicos)
- 🔄 Auto-update com prompt (reload após nova versão)

> Ver detalhes técnicos (estratégias, troubleshooting) antes em `PWA_README.md` agora consolidados aqui.

---

## ⚡ Execução Rápida

Pré-requisitos: Node 18+, npm.

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

Build & Preview:
```bash
npm run build
npm run preview
```

Bundle analyze:
```bash
npm run build -- --analyze
```

---

## 🔧 Configuração / Ambiente
Arquivo `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=FinBoost+
VITE_NODE_ENV=development
```
Uso:
```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
```

---

## 🧪 Testes
Scripts principais:
```bash
npm test                # todos
npm run test:watch      # modo watch
npm run test:coverage   # relatório cobertura
```
Cobertura alvo: ≥80% linhas principais (componentes críticos, hooks e serviços). 
Guia completo, exemplos e boas práticas em: `TESTING_GUIDE.md` (único guia oficial). 

Estrutura:
```
__tests__/
  components/   # testes unitários de UI
  integration/  # fluxos completos (ex: formulários)
  setup.js      # configuração global (jest-dom, mocks)
  test-utils.js # render helpers + providers
```

---

## 🎨 Tema & Estilo
Tailwind + classes utilitárias. Paleta central adaptável.
Exemplo (extensão):
```js
// tailwind.config.js
export default { theme: { extend: { colors: { primary: { 50:'#eff6ff',500:'#3b82f6',900:'#1e3a8a' }}}}}
```

---

## 🤝 Padrões de Desenvolvimento
- Componentes: PascalCase (`UserProfile.jsx`)
- Hooks: `useCamelCase`
- Funções/util: camelCase
- Constantes: UPPER_SNAKE_CASE
- Commits: `feat:`, `fix:`, `style:`, `refactor:`, `test:`, `docs:`
- Organização de imports: React/libs → internos → estilos

Exemplo componente:
```jsx
import { forwardRef } from 'react'

const Button = forwardRef(({ variant='primary', className='', ...props }, ref) => (
  <button ref={ref} className={`btn btn-${variant} ${className}`} {...props} />
))
export default Button
```

---

## 🚀 Performance
- Lighthouse alvo: PWA & Performance > 90
- Bundle inicial < 500KB (gzip) 
- Estratégias: Code splitting por rota, cache SW, imagens otimizadas

---

## 🔧 Troubleshooting

### Problemas Comuns
- **PWA não instala**: Verificar HTTPS em produção
- **Build falha**: Limpar cache com `rm -rf node_modules package-lock.json && npm install`
- **Testes quebram**: Verificar versão do Node (18+)

---

## 📞 Suporte
- Issues: https://github.com/Finboostplus/finboostplus-app/issues
- Docs completas: https://finboostplus.github.io/finboostplus-app/

---

<div align="center">
  <strong>🎨 Interface React - FinBoost+</strong><br/>
  <em>Desenvolvido pelo Grupo 7 - +Prati & Codifica</em>
</div>
