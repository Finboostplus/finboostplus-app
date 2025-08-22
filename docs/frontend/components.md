# Componentes - Frontend

O sistema de componentes do FinBoost+ é modular e reutilizável, seguindo os princípios do **Atomic Design** e **Feature-First Architecture**. Todos os componentes seguem padrões consistentes de design, acessibilidade e performance.

## Princípios de Design

!!! info "Sistema de Design"
- **Consistência Visual**: TailwindCSS como base
- **Acessibilidade**: HeadlessUI e padrões WCAG
- **Responsividade**: Mobile-first approach
- **Reutilização**: Props bem definidas e composição
- **Performance**: React.memo quando necessário

### Convenções

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| **Componentes** | PascalCase | `ButtonUI`, `LoginForm` |
| **Props/Funções** | camelCase | `onClick`, `ariaLabel` |
| **Classes CSS** | kebab-case | `btn-primary`, `form-login` |

## Arquitetura

### Atomic Design Hierarchy

```
Atoms → Molecules → Organisms → Templates → Pages
  ↓         ↓          ↓           ↓         ↓
Button   Card     Header     Layout   Dashboard
Input    Modal    Forms      PWA      Groups
```

## Componentes UI Básicos

### Button

Componente de botão flexível com suporte a ícones, estados e variantes.

```jsx
<Button
  icon={<FaSave />}
  title="Salvar Despesa"
  type="submit"
  ariaLabel="Salvar nova despesa no grupo"
  className="w-full"
  onClick={handleSave}
  disabled={isLoading}
  variant="primary"
/>
```

### Input

Campo de entrada com validação e estados de erro.

=== "Básico"
```jsx
<Input
  id="email"
  type="email"
  placeholder="seu@email.com"
  required
  value={email}
  onChange={setEmail}
  error={emailError}
/>
```

=== "Props Principais"
```javascript
{
  id: string,
  type: 'text' | 'email' | 'password' | 'number',
  placeholder: string,
  required: boolean,
  value: string,
  onChange: (e) => void,
  error: string,
  disabled: boolean
}
```

### Card

Container para agrupar informações relacionadas.

**Variantes:**
- `default`: Card básico com sombra suave
- `hover`: Com efeitos de hover
- `interactive`: Para cards clicáveis

### Modal

Modal acessível baseado em HeadlessUI.

!!! success "Features"
- Trap de foco automático
- Fechamento com ESC
- Overlay clicável
- Animações de entrada/saída

### CurrencyInput

Campo especializado para valores monetários com formatação automática.

```jsx
<CurrencyInput
  prefix="R$ "
  decimalsLimit={2}
  decimalSeparator=","
  groupSeparator="."
  value={amount}
  onValueChange={setAmount}
/>
```

## Componentes de Formulário

### LoginForm

Formulário de autenticação com validação client-side e server-side.

!!! info "Features"
- Validação em tempo real
- Estados de loading
- Mensagens de erro contextuais
- "Lembre-me" (persistência local)

### ExpenseForm

Formulário complexo para criação e edição de despesas.

**Recursos principais:**
- Múltiplos tipos de divisão (igual, por valor, percentual)
- Upload de comprovantes
- Categorização automática
- Cálculos em tempo real

### GroupForm

Formulário para criação e gestão de grupos.

**Funcionalidades:**
- Convite por email
- Definição de permissões
- Configurações de notificação

## Componentes de Layout

### Header

Cabeçalho principal da aplicação.

=== "Elementos"
- Logo responsivo (claro/escuro)
- Menu de navegação
- Perfil do usuário
- Switch de tema
- Notificações

=== "Estrutura"
```jsx
<Header>
  <Logo />
  <Navigation />
  <UserMenu />
  <ThemeSwitch />
</Header>
```

### Layout

Container principal que envolve todas as páginas.

```jsx
<Layout>
  <Header />
  <main>
    <Outlet /> {/* React Router outlet */}
  </main>
  <Footer />
</Layout>
```

### DropdownMenu

Sistema de menus suspensos baseado em HeadlessUI.

!!! success "Features"
- Posicionamento automático
- Navegação por teclado
- Fechamento automático
- Animações fluidas

## Componentes de Visualização

### ChartSwitcher

Alternador inteligente entre diferentes visualizações gráficas.

**Tipos de gráfico:**
- **Linha**: Evolução temporal
- **Pizza**: Distribuição por categoria
- **Barra**: Comparação de valores

### BalanceChart

Gráfico de linha mostrando evolução do saldo ao longo do tempo.

```jsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={balanceData}>
    <XAxis dataKey="date" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip formatter={formatCurrency} />
    <Line 
      type="monotone" 
      dataKey="balance" 
      stroke="#3B82F6" 
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

### ExpenseChart

Gráfico de pizza mostrando distribuição de gastos por categoria.

!!! info "Features"
- Cores por categoria
- Labels percentuais
- Legendas interativas
- Drill-down para detalhes

## Componentes Especializados

### SummaryCards

Grid de cartões com métricas financeiras principais.

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <SummaryCard 
    title="Saldo Atual"
    value={currentBalance}
    change={balanceChange}
    trend="up"
    icon={<FaWallet />}
  />
  {/* Outros cards... */}
</div>
```

**Métricas exibidas:**
- Saldo atual
- Gastos do mês
- Receitas do mês
- Economia/Déficit

### Loading

Indicadores de carregamento com múltiplas variações.

=== "Spinner"
Loading circular animado

=== "Skeleton"
Placeholder que simula o conteúdo

=== "Progress"
Barra de progresso para uploads/downloads

### PWAInstaller

Componente que promove a instalação da PWA.

!!! tip "Features"
- Detecção automática de suporte
- Banner não intrusivo
- Instruções específicas por plataforma

## Sistema de Feedback

### CustomToast

Sistema de notificações personalizado baseado em react-toastify.

=== "Tipos"
- **Success**: Ações completadas
- **Error**: Erros e falhas
- **Warning**: Avisos importantes
- **Info**: Informações gerais

=== "Configuração"
```jsx
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light", // ou "dark"
};
```

## Padrões de Desenvolvimento

### Composição de Componentes

```jsx
// Componente base
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>
    {children}
  </div>
);

// Composições específicas
const ExpenseCard = ({ expense }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader expense={expense} />
    <CardBody expense={expense} />
    <CardActions expense={expense} />
  </Card>
);
```

### Otimização de Performance

```jsx
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  const handleUpdate = useCallback((id, changes) => {
    onUpdate(id, changes);
  }, [onUpdate]);

  return (
    // Renderização...
  );
});
```

### Testes

```jsx
describe('Button Component', () => {
  it('should call onClick when clicked', async () => {
    const mockClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button title="Click me" onClick={mockClick} />);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

## Acessibilidade

### Padrões WCAG Implementados

!!! success "Implementado"
- **Keyboard Navigation**: Todos os elementos interativos
- **Focus Management**: Ordem lógica e trap quando necessário
- **ARIA Labels**: Contexto claro para screen readers
- **Color Contrast**: Mínimo de 4.5:1 para texto normal
- **Semantic HTML**: Uso correto de elementos semânticos

### HeadlessUI Integration

```jsx
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose, children }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
```

---

!!! tip "Próximos Passos"
- [**Hooks Customizados**](hooks.md) - Lógica reutilizável
- [**Estrutura e Padrões**](structure.md) - Organização do código
- [**Testes Frontend**](testing.md) - Estratégias de teste