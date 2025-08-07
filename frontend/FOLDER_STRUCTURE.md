# 📁 Estrutura de Pastas - Frontend FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/Padrão-Feature_First-blue" alt="Feature First">
  <img src="https://img.shields.io/badge/Design-Atomic_Design-green" alt="Atomic Design">
  <img src="https://img.shields.io/badge/Organização-Separation_of_Concerns-orange" alt="SoC">
</div>  

**Estrutura baseada em padrões da indústria** usados por Meta, Airbnb e Netflix para projetos React escaláveis.

---

## 📁 Estrutura Atual

```
frontend/
├── public/                 # Assets estáticos
├── src/
│   ├── App.jsx            # Componente raiz
│   ├── main.jsx           # Entry point
│   ├── index.css          # Estilos globais
│   │
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/           # Componentes básicos (Button, Input)
│   │   ├── Layout/       # Componentes de layout
│   │   ├── forms/        # Componentes de formulário
│   │   └── [Feature]/    # Componentes por funcionalidade
│   │
│   ├── pages/            # Componentes de página/rotas
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   └── Profile/
│   │
│   ├── hooks/            # Custom hooks reutilizáveis
│   │   ├── useAuth.js
│   │   ├── useLocalStorage.js
│   │   └── useExpenses.js
│   │
│   ├── context/          # Context API para estado global
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── GroupContext.jsx
│   │
│   ├── services/         # APIs e integrações externas
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── expenses.js
│   │
│   ├── utils/            # Funções utilitárias
│   │   └── helpers.js
│   │
│   ├── routes/           # Configuração de rotas
│   │   ├── routes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── schemas/          # Validação de dados (Zod/Yup)
│   │   ├── loginUser/
│   │   ├── registerUser/
│   │   └── createGroup/
│   │
│   ├── styles/           # Estilos e temas
│   │   └── globals.css
│   │
│   └── mockData/         # Dados de teste/desenvolvimento
│       └── user/
│
├── __tests__/            # Testes organizados
│   ├── components/       # Testes de componentes
│   ├── integration/      # Testes de integração
│   ├── setup.js         # Configuração global
│   ├── test-utils.js    # Utilitários de teste
│   └── README.md        # Documentação dos testes
│
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── eslint.config.js     # Configuração do ESLint
└── TESTING_GUIDE.md     # Guia de testes
```

---

## 📊 **Comparação com Padrões**

| Aspecto | FinBoostPlus | Meta/Facebook | Airbnb | Netflix |
|---------|--------------|---------------|---------|---------|
| Atomic Design | ✅ | ✅ | ✅ | ✅ |
| Feature Folders | ✅ | ✅ | ✅ | ✅ |
| Custom Hooks | ✅ | ✅ | ✅ | ✅ |
| Context API | ✅ | ✅ | ✅ | ✅ |
| Testes Co-located | ✅ | ✅ | Parcial | ✅ |
| Services Layer | ✅ | ✅ | ✅ | ✅ |

- **Foco:** Simplicidade, produtividade, escalabilidade e manutenibilidade
- **Características:** Separação clara, fácil de navegar e modularização de componentes 

---

## 🎯 Princípios Aplicados

### 1. **Separation of Concerns**
- Cada pasta tem responsabilidade específica
- UI separada da lógica de negócio
- Configuração isolada do código

### 2. **Atomic Design**
```
ui/ (Atoms) → Layout/ (Molecules) → pages/ (Organisms)
```

### 3. **Feature-First Organization**
- Componentes agrupados por funcionalidade
- Facilita manutenção e desenvolvimento em equipe

### 4. **Scalability**
- Estrutura que cresce com o projeto
- Fácil de adicionar novas features
- Padrões consistentes

## 📈 Benefícios da Estrutura Atual

### ✅ **Para Desenvolvedor**
- **Fácil navegação:** Estrutura intuitiva
- **Reutilização:** Componentes bem organizados
- **Manutenção:** Fácil localizar e modificar código

### ✅ **Para Equipe**
- **Colaboração:** Padrões consistentes
- **Code Review:** Estrutura previsível
- **Testes:** Organização clara dos testes
- **CI/CD:** Build e deploy eficientes

---

## 🎨 **Exemplos de Uso**

### **Adicionando Nova Feature**
```bash
# 1. Criar componente específico
src/components/reports/
├── ReportChart.jsx
├── ReportFilters.jsx
└── index.js

# 2. Criar página
src/pages/Reports/
├── index.jsx
└── ReportsActions.jsx

# 3. Adicionar serviço
src/services/reports.js

# 4. Criar hook customizado
src/hooks/useReports.js

# 5. Adicionar testes
__tests__/components/reports/
__tests__/pages/Reports/
```

### **Importações Organizadas**
```jsx
// ✅ Padrão seguido no projeto
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { expensesApi } from '../services/expenses'

// Components ficam próximos da funcionalidade
import ExpenseForm from './ExpenseForm'
import ExpensesList from './ExpensesList'
```

---

## 📋 Checklist de Qualidade

### ✅ **Estrutura**
- [x] Separação clara de responsabilidades
- [x] Componentes organizados por tipo
- [x] Hooks customizados isolados
- [x] Serviços de API separados
- [x] Testes bem organizados

### ✅ **Padrões**
- [x] Nomeação consistente
- [x] Estrutura de pastas previsível
- [x] Imports organizados
- [x] Exports padronizados

### ✅ **Manutenibilidade**
- [x] Fácil de navegar
- [x] Componentes reutilizáveis
- [x] Configuração centralizada
- [x] Documentação presente

## 🎉 Conclusão

✅ **Segue padrões da indústria**
✅ **Usado por empresas de grande porte**
✅ **Escalável e manutenível**
✅ **Facilita desenvolvimento em equipe**

---

<div align="center">
  <strong>📁 Estrutura moderna e profissional - FinBoost+</strong><br/>
  <em>Baseada nas melhores práticas da indústria tech</em>
</div>
