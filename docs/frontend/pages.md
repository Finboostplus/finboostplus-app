# Páginas - Frontend FinBoost+

## Visão Geral

O FinBoost+ é organizado em páginas que cobrem todo o fluxo de uso da aplicação, desde autenticação até o gerenciamento financeiro. Cada página é um componente container que integra múltiplos componentes menores e gerencia o estado local necessário.

## Mapa de Navegação

```
Aplicação FinBoost+
├── Autenticação
│   ├── /login - Login
│   └── /register - Cadastro
├── Área Logada
│   ├── /dashboard - Dashboard Principal
│   ├── /expenses - Gestão de Despesas
│   ├── /groups - Gestão de Grupos
│   └── /profile - Perfil do Usuário
└── Páginas de Erro
    └── /404 - Página Não Encontrada
```

## Páginas de Autenticação

### Login (`/login`)

**Localização:** `src/pages/Login/index.jsx`

**Objetivo:** Autenticar usuários existentes no sistema.

**Componentes Utilizados:**
- LoginForm
- Logo
- Button
- Input

**Funcionalidades:**
- Validação em tempo real (email e senha)
- Estados de loading
- Mensagens de erro
- Lembrar-me
- Redirecionamento automático após login

**Fluxo:**
1. Input de credenciais
2. Validação client-side
3. Envio para API
4. Tratamento de resposta (token JWT ou erro)
5. Redirecionamento para dashboard

### Register (`/register`)

**Localização:** `src/pages/Register/index.jsx`

**Objetivo:** Permitir cadastro de novos usuários.

**Campos:**
- Nome completo
- Email
- Senha
- Confirmar senha
- Termos de uso

**Validações:**
- Nome: obrigatório, mínimo 2 caracteres
- Email: formato válido
- Senha: mínimo 8 caracteres, maiúscula, número, caractere especial
- Confirmação de senha

**Fluxo:**
1. Preenchimento dos dados
2. Validação client-side
3. Verificação de email existente
4. Criação de conta via API
5. Confirmação (opcional)
6. Login automático

## Páginas da Área Logada

### Dashboard (`/dashboard`)

**Localização:** `src/pages/Dashboard/index.jsx`

**Objetivo:** Visão geral financeira e navegação principal.

**Seções Principais:**
- SummaryCards: métricas financeiras principais
- Gráficos: evolução de saldo, distribuição de gastos
- UserGreeting: saudação personalizada
- Acesso rápido para grupos, despesas e perfil

### Expenses (`/expenses`)

**Objetivo:** Gestão de despesas do usuário e dos grupos.

**Funcionalidades:**
- Listagem de despesas
- Filtros por data, categoria e grupo
- Criação, edição e exclusão de despesas
- Visualização detalhada

### Groups (`/groups`)

**Objetivo:** Gestão de grupos de despesas.

**Funcionalidades:**
- Listagem de grupos
- Criação e edição de grupos
- Convite de membros
- Visualização de membros e despesas do grupo

### Profile (`/profile`)

**Objetivo:** Gerenciamento do perfil do usuário.

**Funcionalidades:**
- Visualização e edição de dados pessoais
- Alteração de senha
- Preferências de tema
- Logout

## Páginas de Erro

### Página Não Encontrada (`/404`)

Exibe mensagem de erro e opção de retornar à página inicial.

---

Todas as páginas seguem o padrão de responsividade, acessibilidade e integração com o backend, garantindo uma experiência consistente em todo o sistema.
