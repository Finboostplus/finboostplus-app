# 🎨 Finboost+ Frontend — Controle Financeiro Compartilhado

Finboost+ é uma interface web moderna para gerenciar finanças em grupo, feita com React, Vite e Tailwind CSS. Oferece navegação fluida, componentes acessíveis e testes com Vitest, focando em performance e experiência do usuário.

---

## 📇 Indíces

1. [Estrutura do projeto](#estrutura-do-projeto)
2. [Instalação e Uso](#instalação-e-uso)
3. [Contribuição](#contribuição)
   - [Tecnologias Utilizadas](#tecnologias-utilizadas)
   - [Boas práticas](#boas-práticas)
---

## Estrutura do projeto

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
## Instalação e Uso

Para utilizar e instalar a aplicação, é necessário que você tenha os seguintes programas instalados em sua máquina:

- [Node.js](https://nodejs.org)
- NPM (já vem instalado com o Node.js)
- [Git](https://git-scm.com)

Você pode verificar se as instalações foram realizadas com sucesso utilizando os seguintes comandos:

**Para o Node.js:**
```bash
node -v
```
**Para o Git:**
```bash
git -v
```

Após instalar as tecnologias necessárias, siga os passos abaixo para visualizar o frontend da aplicação:

### 1. Clone o repositório:
```bash
git clone https://github.com/Finboostplus/finboostplus-app.git
```

### 2. Acesse a pasta do projeto:
```bash
cd frontend
```

### 3. Instale as dependências:
```bash
npm install
```

Aguarde a finalização da instalação. Em seguida, inicie o servidor local com o comando:

```bash
npm run dev
```

O terminal exibirá algo como:

```
Local: http://localhost:5173/
```

Abra esse endereço no navegador para visualizar a aplicação funcionando.

---

## Contribuição

### Tecnologias Utilizadas

🚀 Principais
- [ReactJS](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/)

📦 Dependências
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/)

🧪 Desenvolvimento & Testes
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Headless UI](https://headlessui.com/)

🔌 Requisições HTTP
- [Axios](https://axios-http.com/)

### Boas práticas

#### 🛠️ Padrões de Projeto

- **Modularização por componentes** (React)
- Separação clara entre lógica, apresentação e estado
- Componentes reutilizáveis e desacoplados
- Pastas organizadas por responsabilidade (ex: `components`, `pages`, `hooks`, `services`).

#### 🗂️ Organização de Código

- **camelCase** para variáveis e funções
- **PascalCase** para nomes de componentes React
- Arquivos com nomes descritivos e curtos, em inglês
- Uso de arquivos `.module.css` ou Tailwind para estilização (evitar estilos globais)
- Diretórios por domínio ou funcionalidade.

#### 📝Padrões de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação de código
- **refactor**: Refatoração
- **test**: Testes
- **chore**: Tarefas de manutenção

```
Template das branches:
<tipo>/<número-da-issue>-descricao-curta

Exemplo:
git checkout -b feat/21-criar-projeto-react
```
---
<p align="center">Finboost+ frontend!</p>
