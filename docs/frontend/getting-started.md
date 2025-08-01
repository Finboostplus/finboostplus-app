# 🚀 Getting Started - Frontend FinBoost+

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

### Obrigatórios
- **[Node.js](https://nodejs.org/)** (versão 18.0.0 ou superior)
- **[npm](https://www.npmjs.com/)** (versão 8.0.0 ou superior) ou **[yarn](https://yarnpkg.com/)**
- **[Git](https://git-scm.com/)** para controle de versão

### Recomendados
- **[VS Code](https://code.visualstudio.com/)** como editor de código

### Verificação das Versões

```bash
# Verificar versão do Node.js
node --version
# Deve retornar v18.0.0 ou superior

# Verificar versão do npm
npm --version
# Deve retornar 8.0.0 ou superior

# Verificar versão do Git
git --version
```

## 📥 Instalação

### 1. Clone do Repositório

```bash
# Clone o repositório do projeto
git clone https://github.com/seu-usuario/finboostplus-app-develop.git

# Navegue para o diretório do projeto
cd finboostplus-app-develop

# Entre na pasta do frontend
cd frontend
```

### 2. Instalação das Dependências

```bash
# Instale as dependências usando npm
npm install

# OU usando yarn (se preferir)
yarn install
```

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz da pasta `frontend/` com as seguintes variáveis:

```bash
# URL da API do backend
VITE_API_URL=http://localhost:8080/api

# Outras configurações opcionais
VITE_APP_NAME="FinBoost+"
VITE_APP_VERSION="1.0.0"
```

## 🏃‍♂️ Executando o Projeto

### Modo Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# OU usando yarn
yarn dev
```

O servidor será iniciado em `http://localhost:5173/` e abrirá automaticamente no seu navegador padrão.

### Características do Modo Desenvolvimento
- **Hot Module Replacement (HMR)**: Atualizações automáticas sem recarregar a página
- **Source Maps**: Facilita o debugging
- **Erro Overlay**: Exibe erros diretamente na tela
- **Fast Refresh**: Preserva o estado dos componentes durante atualizações

## 📦 Scripts Disponíveis

```bash
# 🔧 Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento (porta 5173)
npm run preview      # Preview do build de produção

# 🏗️ Build e Produção
npm run build        # Gera build otimizado para produção
npm run build:stats  # Build com análise de bundle size

# 🧹 Qualidade de Código
npm run lint         # Executa ESLint para análise de código
npm run lint:fix     # Corrige automaticamente problemas do ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica se o código está formatado corretamente

# 🧪 Testes
npm run test         # Executa testes unitários com Vitest
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura de testes
```

## 🌐 Estrutura de URLs

Quando a aplicação estiver rodando, você terá acesso às seguintes rotas:

### Rotas Públicas
- `http://localhost:5173/` - Página inicial (redirecionamento)
- `http://localhost:5173/login` - Página de login
- `http://localhost:5173/register` - Página de cadastro

### Rotas Protegidas (requer autenticação)
- `http://localhost:5173/dashboard` - Dashboard principal
- `http://localhost:5173/expenses` - Gestão de despesas
- `http://localhost:5173/groups` - Gestão de grupos
- `http://localhost:5173/profile` - Perfil do usuário

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de Porta em Uso

```bash
# Se a porta 5173 estiver em uso, você pode especificar uma porta diferente
npm run dev -- --port 3000
```

#### 2. Erro de Dependências

```bash
# Limpe o cache do npm e reinstale as dependências
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 3. Erro de Permissões (Windows)

```bash
# Execute o PowerShell como administrador e execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 4. Problemas com ESLint/Prettier

```bash
# Reinstale as dependências de desenvolvimento
npm install --save-dev eslint prettier @eslint/js
```

## 🔗 Integração com Backend

Para conectar com o backend, certifique-se de que:

1. **Backend está executando** na porta configurada (geralmente 8080)
2. **CORS está habilitado** no backend para a origem do frontend
3. **Variável VITE_API_URL** está configurada corretamente no `.env.local`

## 🎯 Próximos Passos

Agora que você tem o ambiente configurado:

1. **📖 Leia a [Arquitetura](architecture.md)** - Entenda como o projeto está estruturado
2. **🧩 Explore os [Componentes](components.md)** - Conheça os componentes disponíveis
3. **📄 Veja as [Páginas](pages.md)** - Understand as páginas da aplicação
4. **🪝 Aprenda sobre [Hooks](hooks.md)** - Hooks personalizados disponíveis
