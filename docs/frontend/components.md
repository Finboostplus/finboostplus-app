# Componentes - Frontend FinBoost+

## Visão Geral

O sistema de componentes do FinBoost+ é modular e reutilizável, organizado por responsabilidades específicas. Todos os componentes seguem padrões consistentes de design, acessibilidade e performance.

## Sistema de Design

**Princípios:**
- Consistência visual (TailwindCSS)
- Acessibilidade (HeadlessUI)
- Responsividade (mobile-first)
- Reutilização (props bem definidas)
- Performance (React.memo quando necessário)

**Convenções:**
- PascalCase para componentes (ButtonUI, LoginForm)
- camelCase para props e funções (onClick, ariaLabel)
- kebab-case para classes CSS/IDs (btn-primary, form-login)

## Componentes UI Básicos (`src/components/ui/`)

### Button
Componente de botão flexível com suporte a ícones e variantes.

**Props principais:**
- icon, title, type, ariaLabel, className, fnClick, disabled

**Exemplo:**
```jsx
<Button
  icon={<FaSave />}
  title="Salvar Despesa"
  type="submit"
  ariaLabel="Salvar nova despesa"
  className="bg-primary text-white px-6 py-2 rounded-lg"
  fnClick={handleSave}
  disabled={isLoading}
/>
```

### Input
Campo de entrada com validação e suporte a diferentes tipos.

**Props principais:**
- id, name, type, placeholder, required, className, value, onChange

### Card
Container para agrupar informações relacionadas com estilo consistente.

### Modal
Modal acessível com transições suaves baseado em HeadlessUI.

### Textarea
Campo de texto multilinha para descrições e comentários.

## Componentes de Formulário (`src/components/forms/`)

### LoginForm
Formulário de autenticação com validação client-side.

### RegisterForm
Formulário de cadastro de novos usuários.

### ExpenseForm
Formulário para criação e edição de despesas.

### GroupForm
Formulário para criação de grupos de despesas.

## Componentes de Layout (`src/components/layout/`)

### Header
Cabeçalho principal da aplicação com navegação e controles do usuário.

### DropdownMenu
Sistema de menus suspensos baseado em HeadlessUI.

## Componentes de Gráficos (`src/components/ChartSwitcher/`)

### ChartSwitcher
Alterna entre diferentes visualizações gráficas.

### BalanceChart
Gráfico de linha mostrando evolução do saldo ao longo do tempo (Recharts).

### ExpenseChart
Gráfico de pizza mostrando distribuição de gastos por categoria (Recharts).

## Componentes Especializados

### Loading
Indicador de carregamento com animação suave (spinner, skeleton, progress).

### Logo
Componente da marca visual da aplicação (SVG, responsivo, tema claro/escuro).

### SummaryCards
Grid de cartões com métricas financeiras principais (saldo, gastos, receitas, economia).

### UserGreeting
Saudação personalizada baseada no horário e dados do usuário.

---

**Todos os componentes seguem as melhores práticas do React e são otimizados para performance, acessibilidade e reutilização em todo o sistema FinBoost+.**
