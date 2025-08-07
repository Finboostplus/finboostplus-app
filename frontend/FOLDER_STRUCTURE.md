# Estrutura de Pastas - Frontend FinBoostPlus

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

## 🏢 Motivos de Uso

- **Foco:** Simplicidade, produtividade, escalabilidade e manutenibilidade
- **Características:** Separação clara, fácil de navegar e modularização de componentes 

### 📊 **Comparação com Padrões**

| Aspecto | FinBoostPlus | Meta/Facebook | Airbnb | Netflix |
|---------|--------------|---------------|---------|---------|
| Atomic Design | ✅ | ✅ | ✅ | ✅ |
| Feature Folders | ✅ | ✅ | ✅ | ✅ |
| Custom Hooks | ✅ | ✅ | ✅ | ✅ |
| Context API | ✅ | ✅ | ✅ | ✅ |
| Testes Co-located | ✅ | ✅ | Parcial | ✅ |
| Services Layer | ✅ | ✅ | ✅ | ✅ |

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
