# 🧩 Componentes - Frontend FinBoost+

## 📋 Visão Geral

O sistema de componentes do **FinBoost+** é baseado em uma arquitetura modular e reutilizável, organizada por responsabilidades específicas. Todos os componentes seguem padrões consistentes de design, acessibilidade e performance.

## 🎨 Sistema de Design

### Princípios Fundamentais
- **Consistência Visual**: Design system unificado com TailwindCSS
- **Acessibilidade**: Componentes baseados em HeadlessUI
- **Responsividade**: Abordagem mobile-first
- **Reutilização**: Props bem definidas e configuráveis
- **Performance**: Otimização com React.memo quando necessário

### Convenções de Nomenclatura
- **PascalCase**: Para nomes de componentes (`ButtonUI`, `LoginForm`)
- **camelCase**: Para props e funções (`onClick`, `ariaLabel`)
- **kebab-case**: Para classes CSS e IDs (`btn-primary`, `form-login`)

## 📦 Componentes UI Básicos (`src/components/ui/`)

### Button (`Button.jsx`)

Componente de botão flexível com suporte a ícones e diferentes variantes.

**Props:**
```javascript
{
  icon: ReactElement,        // Ícone opcional (React Icons)
  title: string,            // Texto do botão
  type: 'button' | 'submit' | 'reset', // Tipo HTML
  arialLabel: string,       // Label para acessibilidade
  className: string,        // Classes CSS personalizadas
  fnClick: function,        // Função de callback no click
  disabled: boolean         // Estado desabilitado
}
```

**Exemplo de Uso:**
```jsx
import Button from './components/ui/Button';
import { FaSave } from 'react-icons/fa';

<Button
  icon={<FaSave />}
  title="Salvar Despesa"
  type="submit"
  arialLabel="Salvar nova despesa"
  className="bg-primary text-white px-6 py-2 rounded-lg"
  fnClick={handleSave}
  disabled={isLoading}
/>
```

### Input (`Input.jsx`)

Campo de entrada com validação e suporte a diferentes tipos.

**Props:**
```javascript
{
  id: string,              // ID único do input
  name: string,            // Nome para formulários
  type: 'text' | 'email' | 'password' | 'number', // Tipo do input
  placeholder: string,     // Texto placeholder
  required: boolean,       // Campo obrigatório
  className: string,       // Classes CSS personalizadas
  value: string,          // Valor controlado
  onChange: function      // Callback de mudança
}
```

### Card (`Card.jsx`)

Container para agrupar informações relacionadas com estilo consistente.

**Características:**
- Background com `var(--color-surface)`
- Border radius de `rounded-2xl`
- Shadow e border consistentes
- Padding responsivo

### Modal (`Modal.jsx`)

Modal acessível com transições suaves baseado em HeadlessUI.

**Funcionalidades:**
- Overlay com blur
- Animações de entrada/saída
- Foco automático
- Tecla ESC para fechar
- Click fora para fechar

### Textarea (`Textarea.jsx`)

Campo de texto multilinha para descrições e comentários.

**Características:**
- Auto-resize baseado no conteúdo
- Validação de caracteres máximos
- Estilos consistentes com Input

## 📝 Componentes de Formulário (`src/components/forms/`)

### LoginForm (`LoginForm.jsx`)

Formulário de autenticação com validação client-side.

**Campos:**
- **Email**: Validação de formato de email
- **Senha**: Campo password com toggle de visualização
- **Lembrar-me**: Checkbox para persistência de sessão

**Funcionalidades:**
- Validação em tempo real
- Estados de loading
- Mensagens de erro
- Integração com `useAuth` hook
- Redirecionamento após login bem-sucedido

**Estrutura:**
```jsx
<Form method="post" className="login-form">
  <div className="email-field">
    <label htmlFor="email">Email</label>
    <InputUI type="email" name="email" required />
  </div>
  <div className="password-field">
    <label htmlFor="password">Senha</label>
    <InputUI type="password" name="password" required />
  </div>
  <Button type="submit" title="Entrar" />
</Form>
```

### RegisterForm (`RegisterForm.jsx`)

Formulário de cadastro de novos usuários.

**Campos:**
- Nome completo
- Email
- Senha
- Confirmação de senha
- Termos de uso (checkbox)

### ExpenseForm (`ExpenseForm.jsx`)

Formulário para criação e edição de despesas.

**Campos:**
- **Descrição**: Textarea para detalhes da despesa
- **Valor**: Input numérico com formatação de moeda
- **Categoria**: Select com categorias predefinidas
- **Data**: Date picker
- **Grupo**: Select de grupos do usuário
- **Comprovante**: Upload de arquivo (opcional)

**Validações:**
- Valor deve ser positivo
- Descrição obrigatória
- Data não pode ser futura
- Categoria deve ser selecionada

### GroupForm (`GroupForm.jsx`)

Formulário para criação de grupos de despesas.

**Campos:**
- **Nome do Grupo**: Input de texto
- **Descrição**: Textarea opcional
- **Membros**: Lista de emails para convites
- **Foto do Grupo**: Upload de imagem (opcional)

## 🏗️ Componentes de Layout (`src/components/layout/`)

### Header (`Header.jsx`)

Cabeçalho principal da aplicação com navegação e controles do usuário.

**Elementos:**
- **Logo**: Link para dashboard
- **Navegação**: Links principais (Desktop)
- **User Menu**: Dropdown com perfil e logout
- **Theme Toggle**: Alternador de tema claro/escuro
- **Mobile Menu**: Hamburger menu para mobile

**Responsividade:**
- Desktop: Navegação horizontal completa
- Tablet: Navegação condensada
- Mobile: Menu hamburger

### DropdownMenu (`DropdownMenu/`)

Sistema de menus suspensos baseado em HeadlessUI.

**Subcomponentes:**
- **DropdownMenuNav**: Navegação lateral mobile
- **SwitchTheme**: Alternador de tema integrado

**Funcionalidades:**
- Animações suaves
- Navegação por teclado
- Auto-fechamento
- Posicionamento inteligente

## 📊 Componentes de Gráficos (`src/components/ChartSwitcher/`)

### ChartSwitcher (`index.jsx`)

Container principal que alterna entre diferentes visualizações gráficas.

**Estado:**
```javascript
const [activeChart, setActiveChart] = useState('balance');
// 'balance' | 'expense'
```

**Funcionalidades:**
- Toggle entre gráficos
- Botão de alternância com ícones
- Transições suaves
- Estado persistente durante sessão

### BalanceChart (`BalanceChart.jsx`)

Gráfico de linha mostrando evolução do saldo ao longo do tempo.

**Tecnologia**: Recharts
**Tipo**: Line Chart
**Dados**: Saldo por período (diário/mensal)

**Características:**
- Eixo X: Timeline (datas)
- Eixo Y: Valores monetários
- Cores: Verde para positivo, vermelho para negativo
- Tooltips informativos
- Responsive design

### ExpenseChart (`ExpenseChart.jsx`)

Gráfico de pizza mostrando distribuição de gastos por categoria.

**Tecnologia**: Recharts
**Tipo**: Pie Chart
**Dados**: Gastos agrupados por categoria

**Características:**
- Legendas com percentuais
- Cores distintivas por categoria
- Hover effects
- Labels com valores

## 🎯 Componentes Especializados

### Loading (`Loading/index.jsx`)

Indicador de carregamento com animação suave.

**Variantes:**
- **Spinner**: Indicador circular rotativo
- **Skeleton**: Placeholder para conteúdo
- **Progress**: Barra de progresso com percentual

### Logo (`Logo/index.jsx`)

Componente da marca visual da aplicação.

**Características:**
- SVG otimizado
- Responsivo (tamanhos: sm, md, lg)
- Suporte a tema claro/escuro
- Link para página inicial

### SummaryCards (`SummaryCards/index.jsx`)

Grid de cartões com métricas financeiras principais.

**Cards Exibidos:**
- **Saldo Total**: Valor atual da conta
- **Gastos do Mês**: Total de despesas mensais
- **Receitas do Mês**: Total de receitas mensais
- **Economia**: Diferença entre receitas e gastos

**Layout:**
- Grid responsivo (1 coluna mobile, 2-4 desktop)
- Ícones contextuais
- Cores baseadas em valores (verde/vermelho)

### UserGreeting (`UserGreeting/index.jsx`)

Saudação personalizada baseada no horário e dados do usuário.

**Funcionalidades:**
- Saudação dinâmica (Bom dia/tarde/noite)
- Nome do usuário logado
- Avatar ou iniciais
- Status de conexão

### ModalButton (`ModalButton/index.jsx`)

Botão que abre modais com conteúdo dinâmico.

**Props:**
```javascript
{
  buttonText: string,      // Texto do botão
  modalTitle: string,      // Título do modal
  modalContent: ReactNode, // Conteúdo JSX do modal
  buttonVariant: string,   // Estilo do botão
  modalSize: 'sm' | 'md' | 'lg' // Tamanho do modal
}
```

## 🎨 Padrões de Estilização

### CSS Variables Utilizadas
```css
--color-primary: #3B82F6;     /* Azul principal */
--color-secondary: #10B981;   /* Verde secundário */
--color-surface: #FFFFFF;     /* Fundo de cards */
--color-text: #1F2937;        /* Texto principal */
--color-muted: #6B7280;       /* Texto secundário */
--color-border: #E5E7EB;      /* Bordas */
```

### Classes TailwindCSS Comuns
```css
/* Containers */
.container-card: bg-surface p-6 rounded-2xl shadow-md border

/* Inputs */
.input-base: w-full h-11 rounded-xl border px-4 text-sm

/* Buttons */
.btn-primary: bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90

/* Typography */
.text-heading: text-xl font-semibold text-text
.text-body: text-sm text-muted
```

## 🧪 Testabilidade

### Convenções para Testes
- **data-testid**: Para identificação em testes
- **aria-label**: Para acessibilidade e testes
- **role**: Papéis semânticos claros

## 📱 Responsividade

### Breakpoints Utilizados
- **Mobile**: até 640px (sm)
- **Tablet**: 641px - 1024px (md/lg)
- **Desktop**: 1025px+ (xl/2xl)

### Estratégias
- **Mobile-first**: Estilos base para mobile
- **Progressive Enhancement**: Melhorias para telas maiores
- **Flexible Grids**: CSS Grid e Flexbox
- **Fluid Typography**: Tamanhos escaláveis

---

**💡 Todos os componentes seguem as melhores práticas do React e são otimizados para performance, acessibilidade e reutilização em todo o sistema FinBoost+.**
