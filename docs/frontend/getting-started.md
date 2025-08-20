# Getting Started - Frontend FinBoost+

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior (ou yarn)
- Git
- (Opcional) VS Code como editor

Verifique as versões:
```bash
node --version
npm --version
git --version
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/finboostplus-app-develop.git
cd finboostplus-app-develop/frontend
```
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```
3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na pasta `frontend/`:
```bash
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME="FinBoost+"
VITE_APP_VERSION="1.0.0"
```

## Execução

Para rodar em modo desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```
Acesse: http://localhost:5173/

## Scripts Disponíveis

```bash
npm run dev           # Servidor de desenvolvimento
npm run preview       # Preview do build de produção
npm run build         # Build otimizado para produção
npm run build:stats   # Build com análise de bundle
npm run lint          # Análise de código (ESLint)
npm run lint:fix      # Corrige problemas do ESLint
npm run format        # Formata código (Prettier)
npm run format:check  # Verifica formatação
npm run test          # Testes unitários (Vitest)
npm run test:watch    # Testes em modo watch
npm run test:coverage # Relatório de cobertura
```

## Estrutura de URLs

Rotas públicas:
- `/` Página inicial
- `/login` Login
- `/register` Cadastro
- `/forgotPassword` Redefinição de senha

Rotas protegidas (autenticado):
- `/` Dashboard
- `/profile` Perfil
- `/profile/edit` Editar perfil
- `/groups` Listar grupos
- `/groups/{groupId}` Detalhes do grupo
- `/groups/{groupId}/edit` Editar grupo
- `/groups/{groupId}/members` Gestão de membros
- `/groups/{groupId}/members/{userId}` Detalhes do membro
- `/groups/{groupId}/expenses` Gestão de despesas
- `/groups/{groupId}/expenses/{expenseId}` Detalhes da despesa
- `/groups/{groupId}/expenses/{expenseId}/edit` Editar despesa

## Troubleshooting

- **Porta em uso:**
  ```bash
  npm run dev -- --port 3000
  ```
- **Erro de dependências:**
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```
- **Erro de permissões (Windows):**
  Execute o PowerShell como administrador:
  ```bash
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- **Problemas com ESLint/Prettier:**
  ```bash
  npm install --save-dev eslint prettier @eslint/js
  ```

## Integração com Backend

- Certifique-se de que o backend está rodando na porta correta (8080)
- CORS habilitado no backend
- Variável VITE_API_URL configurada corretamente

## Próximos Passos

- Leia a [Arquitetura](architecture.md)
- Explore os [Componentes](components.md)
- Veja as [Páginas](pages.md)
- Aprenda sobre [Hooks](hooks.md)
