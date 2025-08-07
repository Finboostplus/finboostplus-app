# 🧪 Testes - Frontend FinBoost+

Esta documentação detalha a estratégia, configuração e implementação de testes automatizados no frontend, utilizando **Vitest** e **React Testing Library**.

---

## 📋 **Estratégia de Testes**

### **Pirâmide de Testes**
```
                    E2E Tests (5%)
                   ⬆ Poucos, lentos, frágeis
                   
            Integration Tests (15%)
           ⬆ Moderados, média velocidade
           
        Unit Tests (80%)
       ⬆ Muitos, rápidos, confiáveis
```

### **Tipos de Teste Implementados**

1. **Testes Unitários (80%)**
   - Componentes isolados
   - Hooks customizados
   - Funções utilitárias
   - Serviços/APIs

2. **Testes de Integração (15%)**
   - Fluxos completos de componentes
   - Interação entre componentes
   - Contextos e providers

3. **Testes E2E (5%)**
   - Fluxos críticos do usuário
   - Jornadas completas
   - Testes de regressão

---

## ⚙️ **Configuração do Ambiente**

### **Arquivos de Configuração**

#### **vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '*.config.js',
        'src/main.jsx',
        'src/mockData/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
})
```

#### **__tests__/setup.js**
```javascript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'

// Cleanup após cada teste
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mocks globais
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock do fetch
global.fetch = vi.fn()

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

#### **__tests__/test-utils.js**
```javascript
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../src/context/AuthContext'
import { ThemeProvider } from '../src/context/ThemeContext'

// Provider customizado para testes
const AllTheProviders = ({ children, initialEntries = ['/'] }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

// Função de render customizada
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// Utilitários para mocks
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null,
  ...overrides,
})

export const createMockGroup = (overrides = {}) => ({
  id: '1',
  name: 'Test Group',
  description: 'Test Description',
  members: [createMockUser()],
  createdBy: '1',
  ...overrides,
})

export const createMockExpense = (overrides = {}) => ({
  id: '1',
  description: 'Test Expense',
  amount: 100.00,
  category: 'Food',
  date: '2024-01-01',
  createdBy: '1',
  splits: [],
  ...overrides,
})

// Re-export tudo
export * from '@testing-library/react'
export { customRender as render }
```

---

## 🧩 **Testes de Componentes**

### **Componente Básico - Button**

#### **Button.test.jsx**
```javascript
import { render, screen, fireEvent } from '../test-utils'
import { describe, it, expect, vi } from 'vitest'
import Button from '../../src/components/ui/Button'

describe('Button Component', () => {
  it('deve renderizar com texto correto', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('deve aplicar variante correta', () => {
    render(<Button variant="danger">Delete</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn-danger')
  })

  it('deve mostrar loading quando isLoading=true', () => {
    render(<Button isLoading>Loading</Button>)
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### **Componente Complexo - ExpenseForm**

#### **ExpenseForm.test.jsx**
```javascript
import { render, screen, fireEvent, waitFor } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ExpenseForm from '../../src/components/forms/ExpenseForm'
import { createMockGroup } from '../test-utils'

describe('ExpenseForm Component', () => {
  const mockGroup = createMockGroup()
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('deve renderizar formulário completo', () => {
    render(<ExpenseForm group={mockGroup} onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
  })

  it('deve submeter dados válidos', async () => {
    const user = userEvent.setup()
    render(<ExpenseForm group={mockGroup} onSubmit={mockOnSubmit} />)
    
    await user.type(screen.getByLabelText(/descrição/i), 'Jantar restaurante')
    await user.type(screen.getByLabelText(/valor/i), '150.00')
    await user.selectOptions(screen.getByLabelText(/categoria/i), 'food')
    await user.click(screen.getByRole('button', { name: /salvar/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        description: 'Jantar restaurante',
        amount: 150.00,
        category: 'food',
        date: expect.any(String),
        participants: expect.any(Array),
      })
    })
  })

  it('deve mostrar erros de validação', async () => {
    const user = userEvent.setup()
    render(<ExpenseForm group={mockGroup} onSubmit={mockOnSubmit} />)
    
    await user.click(screen.getByRole('button', { name: /salvar/i }))
    
    expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
    expect(screen.getByText(/valor deve ser maior que zero/i)).toBeInTheDocument()
  })

  it('deve permitir seleção de participantes', async () => {
    const user = userEvent.setup()
    const groupWithMembers = {
      ...mockGroup,
      members: [
        { id: '1', name: 'John' },
        { id: '2', name: 'Jane' },
        { id: '3', name: 'Bob' },
      ]
    }
    
    render(<ExpenseForm group={groupWithMembers} onSubmit={mockOnSubmit} />)
    
    // Por padrão, todos devem estar selecionados
    expect(screen.getByDisplayValue('John')).toBeChecked()
    expect(screen.getByDisplayValue('Jane')).toBeChecked()
    expect(screen.getByDisplayValue('Bob')).toBeChecked()
    
    // Desmarcar um participante
    await user.click(screen.getByDisplayValue('Bob'))
    expect(screen.getByDisplayValue('Bob')).not.toBeChecked()
  })
})
```

---

## 🎣 **Testes de Hooks**

### **useAuth Hook**

#### **useAuth.test.js**
```javascript
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth, AuthProvider } from '../../src/hooks/useAuth'
import * as authService from '../../src/services/auth'

// Mock do serviço de autenticação
vi.mock('../../src/services/auth')

describe('useAuth Hook', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('deve inicializar com estado não autenticado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it('deve fazer login com sucesso', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@test.com' }
    const mockToken = 'mock-jwt-token'
    
    authService.login.mockResolvedValue({ user: mockUser, token: mockToken })
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      await result.current.login({ email: 'john@test.com', password: 'password' })
    })
    
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(authService.login).toHaveBeenCalledWith({
      email: 'john@test.com',
      password: 'password'
    })
  })

  it('deve lidar com erro de login', async () => {
    authService.login.mockRejectedValue(new Error('Credenciais inválidas'))
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      try {
        await result.current.login({ email: 'wrong@test.com', password: 'wrong' })
      } catch (error) {
        expect(error.message).toBe('Credenciais inválidas')
      }
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('deve fazer logout corretamente', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // Simular usuário logado
    act(() => {
      result.current.login({ email: 'john@test.com', password: 'password' })
    })
    
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
```

### **useExpenses Hook**

#### **useExpenses.test.js**
```javascript
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useExpenses } from '../../src/hooks/useExpenses'
import * as expensesService from '../../src/services/expenses'
import { createMockExpense } from '../test-utils'

vi.mock('../../src/services/expenses')

describe('useExpenses Hook', () => {
  const mockGroupId = 'group-1'
  const mockExpenses = [
    createMockExpense({ id: '1', description: 'Expense 1' }),
    createMockExpense({ id: '2', description: 'Expense 2' }),
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve carregar despesas inicialmente', async () => {
    expensesService.getExpenses.mockResolvedValue({ 
      expenses: mockExpenses,
      total: 2 
    })
    
    const { result } = renderHook(() => useExpenses(mockGroupId))
    
    expect(result.current.loading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.expenses).toEqual(mockExpenses)
    expect(expensesService.getExpenses).toHaveBeenCalledWith(mockGroupId, {})
  })

  it('deve adicionar nova despesa', async () => {
    const newExpense = createMockExpense({ id: '3', description: 'New Expense' })
    
    expensesService.getExpenses.mockResolvedValue({ 
      expenses: mockExpenses,
      total: 2 
    })
    expensesService.createExpense.mockResolvedValue(newExpense)
    
    const { result } = renderHook(() => useExpenses(mockGroupId))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    await act(async () => {
      await result.current.addExpense({
        description: 'New Expense',
        amount: 50,
        category: 'food'
      })
    })
    
    expect(expensesService.createExpense).toHaveBeenCalled()
    expect(result.current.expenses).toContainEqual(newExpense)
  })

  it('deve filtrar despesas', async () => {
    expensesService.getExpenses.mockResolvedValue({ 
      expenses: mockExpenses,
      total: 2 
    })
    
    const { result } = renderHook(() => useExpenses(mockGroupId))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    act(() => {
      result.current.setFilters({ category: 'food' })
    })
    
    await waitFor(() => {
      expect(expensesService.getExpenses).toHaveBeenCalledWith(
        mockGroupId, 
        { category: 'food' }
      )
    })
  })
})
```

---

## 🔄 **Testes de Integração**

### **Login Flow**

#### **LoginFlow.test.jsx**
```javascript
import { render, screen, waitFor } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from '../../src/App'
import * as authService from '../../src/services/auth'

vi.mock('../../src/services/auth')

describe('Login Flow Integration', () => {
  it('deve completar fluxo de login com sucesso', async () => {
    const user = userEvent.setup()
    const mockUser = { id: '1', name: 'John', email: 'john@test.com' }
    
    authService.login.mockResolvedValue({
      user: mockUser,
      token: 'mock-token'
    })
    authService.isAuthenticated.mockReturnValue(false)
    
    render(<App />)
    
    // Usuário não autenticado deve ver tela de login
    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
    
    // Preencher formulário
    await user.type(screen.getByLabelText(/email/i), 'john@test.com')
    await user.type(screen.getByLabelText(/senha/i), 'password123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))
    
    // Deve redirecionar para dashboard
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })
    
    // Deve mostrar nome do usuário
    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
  })

  it('deve mostrar erro para credenciais inválidas', async () => {
    const user = userEvent.setup()
    
    authService.login.mockRejectedValue(new Error('Credenciais inválidas'))
    authService.isAuthenticated.mockReturnValue(false)
    
    render(<App />)
    
    await user.type(screen.getByLabelText(/email/i), 'wrong@test.com')
    await user.type(screen.getByLabelText(/senha/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /entrar/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument()
    })
  })
})
```

### **Expense Management Flow**

#### **ExpenseManagement.test.jsx**
```javascript
import { render, screen, waitFor } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import GroupPage from '../../src/pages/Groups/GroupPage'
import * as expensesService from '../../src/services/expenses'
import * as groupsService from '../../src/services/groups'
import { createMockGroup, createMockExpense } from '../test-utils'

vi.mock('../../src/services/expenses')
vi.mock('../../src/services/groups')

describe('Expense Management Flow', () => {
  const mockGroup = createMockGroup()
  const mockExpenses = [
    createMockExpense({ description: 'Jantar', amount: 100 }),
    createMockExpense({ description: 'Cinema', amount: 50 }),
  ]

  beforeEach(() => {
    groupsService.getGroup.mockResolvedValue(mockGroup)
    expensesService.getExpenses.mockResolvedValue({
      expenses: mockExpenses,
      total: 2
    })
  })

  it('deve listar despesas do grupo', async () => {
    render(<GroupPage groupId={mockGroup.id} />)
    
    await waitFor(() => {
      expect(screen.getByText('Jantar')).toBeInTheDocument()
      expect(screen.getByText('Cinema')).toBeInTheDocument()
    })
  })

  it('deve criar nova despesa', async () => {
    const user = userEvent.setup()
    const newExpense = createMockExpense({ 
      description: 'Uber', 
      amount: 25 
    })
    
    expensesService.createExpense.mockResolvedValue(newExpense)
    
    render(<GroupPage groupId={mockGroup.id} />)
    
    // Abrir modal de nova despesa
    await user.click(screen.getByRole('button', { name: /nova despesa/i }))
    
    // Preencher formulário
    await user.type(screen.getByLabelText(/descrição/i), 'Uber')
    await user.type(screen.getByLabelText(/valor/i), '25.00')
    await user.click(screen.getByRole('button', { name: /salvar/i }))
    
    await waitFor(() => {
      expect(expensesService.createExpense).toHaveBeenCalledWith(
        mockGroup.id,
        expect.objectContaining({
          description: 'Uber',
          amount: 25.00
        })
      )
    })
  })

  it('deve filtrar despesas por categoria', async () => {
    const user = userEvent.setup()
    
    render(<GroupPage groupId={mockGroup.id} />)
    
    await waitFor(() => {
      expect(screen.getByText('Jantar')).toBeInTheDocument()
    })
    
    // Aplicar filtro
    await user.selectOptions(
      screen.getByLabelText(/categoria/i), 
      'transport'
    )
    
    await waitFor(() => {
      expect(expensesService.getExpenses).toHaveBeenCalledWith(
        mockGroup.id,
        { category: 'transport' }
      )
    })
  })
})
```

---

## 📊 **Testes de Performance**

### **Performance de Componentes**

#### **PerformanceTests.test.jsx**
```javascript
import { render, screen } from '../test-utils'
import { describe, it, expect, vi } from 'vitest'
import ExpenseList from '../../src/components/expenses/ExpenseList'
import { createMockExpense } from '../test-utils'

describe('Performance Tests', () => {
  it('deve renderizar lista grande de despesas em tempo adequado', () => {
    const largeExpenseList = Array.from({ length: 1000 }, (_, i) => 
      createMockExpense({ 
        id: i.toString(), 
        description: `Expense ${i}` 
      })
    )
    
    const startTime = performance.now()
    
    render(<ExpenseList expenses={largeExpenseList} />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Deve renderizar em menos de 100ms
    expect(renderTime).toBeLessThan(100)
    
    // Deve mostrar primeira e última despesa
    expect(screen.getByText('Expense 0')).toBeInTheDocument()
    expect(screen.getByText('Expense 999')).toBeInTheDocument()
  })

  it('deve fazer debounce de busca corretamente', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()
    
    render(<SearchInput onSearch={mockOnSearch} debounceMs={300} />)
    
    const input = screen.getByRole('textbox')
    
    // Digitar rapidamente
    await user.type(input, 'test search')
    
    // Não deve chamar imediatamente
    expect(mockOnSearch).not.toHaveBeenCalled()
    
    // Esperar debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test search')
    }, { timeout: 400 })
    
    // Deve chamar apenas uma vez
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })
})
```

---

## 📈 **Relatórios e Coverage**

### **Scripts de Teste**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:silent": "vitest --run --reporter=silent",
    "test:performance": "vitest run --config vitest.performance.config.js"
  }
}
```

### **Metas de Coverage**
```javascript
// vitest.config.js
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Thresholds específicos por arquivo
        'src/components/': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        'src/hooks/': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
  },
})
```

### **Relatório de Coverage**
```bash
# Gerar relatório HTML
npm run test:coverage

# Ver relatório no navegador
npx vite preview --outDir coverage
```

---

## 🚀 **CI/CD Integration**

### **GitHub Actions**
```yaml
# .github/workflows/frontend-tests.yml
name: Frontend Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      working-directory: ./frontend
      run: npm ci
    
    - name: Run tests
      working-directory: ./frontend
      run: npm run test:run
    
    - name: Run coverage
      working-directory: ./frontend
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./frontend/coverage/lcov.info
        flags: frontend
```

---

## 🎯 **Boas Práticas**

### **✅ Fazer**
- Testar comportamento, não implementação
- Usar queries semânticas (getByRole, getByLabelText)
- Isolar componentes com mocks apropriados
- Manter testes simples e legíveis
- Seguir padrão AAA (Arrange, Act, Assert)

### **❌ Evitar**
- Testar detalhes de implementação
- Usar queries frágeis (getByTestId em excesso)
- Testes muito complexos ou longos
- Dependências entre testes
- Mocks desnecessários

### **🎯 Princípios**
- **F.I.R.S.T**: Fast, Independent, Repeatable, Self-validating, Timely
- **DRY**: Don't Repeat Yourself nos setups
- **KISS**: Keep It Simple and Stupid
- **AAA**: Arrange, Act, Assert

---

<div align="center">
  <strong>🧪 Testes abrangentes e confiáveis</strong><br/>
  <em>Garantindo qualidade e confiabilidade do código</em>
</div>
