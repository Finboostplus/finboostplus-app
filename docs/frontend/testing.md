# Testes Automatizados

O FinBoost+ utiliza uma estratégia robusta de testes automatizados para garantir a qualidade e confiabilidade do código frontend. Nossa stack de testes combina **Vitest** como framework principal e **React Testing Library** para testes de componentes React.

## Visão Geral

### Tecnologias Utilizadas

| Ferramenta | Versão | Propósito |
|-----------|---------|-----------|
| **Vitest** | `^1.0.0` | Framework de testes principal |
| **React Testing Library** | `^14.0.0` | Testes de componentes React |
| **@testing-library/jest-dom** | `^6.0.0` | Matchers customizados |
| **@testing-library/user-event** | `^14.0.0` | Simulação de interações |
| **jsdom** | `^23.0.0` | Ambiente de DOM virtual |

### Status Atual

!!! success "Cobertura de Testes"
    **✅ 19 testes passando** em 4 arquivos de teste com cobertura superior a 80%

```
 ✓ components/Header.test.jsx (1 teste)
 ✓ components/Logo.test.jsx (4 testes)  
 ✓ components/Button.test.jsx (9 testes)
 ✓ integration/LoginForm.test.jsx (5 testes)
```

## Estrutura do Projeto

A organização dos testes segue uma estrutura clara e escalável:

```
__tests__/
├── components/           # Testes de componentes individuais
│   ├── Header.test.jsx   # Componente Header
│   ├── Logo.test.jsx     # Componente LogoImage
│   └── Button.test.jsx   # Componente ButtonUI
├── integration/          # Testes de integração
│   └── LoginForm.test.jsx # Formulário de login completo
├── setup.js             # Configuração global
└── test-utils.js        # Utilitários e helpers
```

### Arquivos de Configuração

**`vite.config.js`**
: Configuração principal do Vitest, incluindo ambiente jsdom e configurações de cobertura

**`__tests__/setup.js`**
: Configurações globais, mocks de APIs do browser e setup de matchers customizados

**`__tests__/test-utils.js`**
: Funções auxiliares, wrappers customizados e utilities para testes

## Comandos Disponíveis

### Execução Básica

```bash
# Executar todos os testes
npm test

# Testes com relatório de cobertura
npm test -- --coverage

# Modo watch para desenvolvimento
npm test -- --watch

# Teste específico
npm test -- Header.test.jsx
```

### Opções Avançadas

```bash
# Testes com interface gráfica
npm test -- --ui

# Executar apenas testes alterados
npm test -- --changed

# Gerar relatório detalhado
npm test -- --reporter=verbose
```

## Padrões de Teste

### 1. Teste Básico de Renderização

```jsx title="Exemplo: Teste simples de componente"
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MeuComponente from '../../src/components/MeuComponente';

describe('MeuComponente', () => {
  it('deve renderizar corretamente', () => {
    render(<MeuComponente />);
    
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });
});
```

### 2. Testes com Interações do Usuário

```jsx title="Exemplo: Teste com user-event"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Botao from '../../src/components/Botao';

describe('Botão com Click', () => {
  it('deve chamar função ao clicar', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    
    render(<Botao onClick={mockClick}>Clique aqui</Botao>);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Testes com Context API

```jsx title="Exemplo: Componente com contexto"
import { renderWithProviders } from '../test-utils';

describe('Componente com Contexto', () => {
  it('deve usar dados do contexto', () => {
    const mockUser = { name: 'João', id: 1 };
    
    renderWithProviders(
      <ComponenteComContexto />,
      { 
        authContext: { user: mockUser },
        themeContext: { theme: 'dark' }
      }
    );
    
    expect(screen.getByText('Olá, João')).toBeInTheDocument();
  });
});
```

### 4. Testes de Hooks Customizados

```jsx title="Exemplo: Teste de hook"
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useContador from '../../src/hooks/useContador';

describe('useContador', () => {
  it('deve incrementar contador corretamente', () => {
    const { result } = renderHook(() => useContador(0));
    
    act(() => {
      result.current.incrementar();
    });
    
    expect(result.current.contador).toBe(1);
  });

  it('deve decrementar contador corretamente', () => {
    const { result } = renderHook(() => useContador(5));
    
    act(() => {
      result.current.decrementar();
    });
    
    expect(result.current.contador).toBe(4);
  });
});
```

## Queries e Matchers

### Estratégias de Busca (Queries)

A prioridade das queries segue as recomendações do Testing Library:

1. **Por Papel** (Mais acessível)
```jsx
screen.getByRole('button', { name: /enviar/i })
screen.getByRole('textbox', { name: /email/i })
screen.getByRole('heading', { level: 1 })
```

2. **Por Label/Texto**
```jsx
screen.getByLabelText('Email')
screen.getByPlaceholderText('Digite seu email')
screen.getByText('Clique aqui')
```

3. **Por Test ID** (Último recurso)
```jsx
screen.getByTestId('custom-element')
// Use apenas quando outras opções não são viáveis
```

### Principais Matchers

#### Verificação de Presença
| Matcher | Descrição |
|---------|-----------|
| `toBeInTheDocument()` | Elemento está presente no DOM |
| `toBeVisible()` | Elemento está visível ao usuário |
| `toBeNull()` | Valor é null |
| `toBeTruthy()` | Valor é verdadeiro |

#### Verificação de Conteúdo
| Matcher | Exemplo |
|---------|---------|
| `toHaveTextContent()` | `expect(element).toHaveTextContent('Texto')` |
| `toHaveValue()` | `expect(input).toHaveValue('valor')` |
| `toHaveDisplayValue()` | `expect(select).toHaveDisplayValue('Opção 1')` |

#### Verificação de Atributos
| Matcher | Exemplo |
|---------|---------|
| `toHaveAttribute()` | `expect(link).toHaveAttribute('href', '/home')` |
| `toHaveClass()` | `expect(button).toHaveClass('btn-primary')` |
| `toBeDisabled()` | `expect(input).toBeDisabled()` |
| `toBeChecked()` | `expect(checkbox).toBeChecked()` |

#### Verificação de Funções Mock
| Matcher | Descrição |
|---------|-----------|
| `toHaveBeenCalled()` | Função foi chamada |
| `toHaveBeenCalledTimes(n)` | Quantidade específica de chamadas |
| `toHaveBeenCalledWith(args)` | Chamada com argumentos específicos |

## Mocks e Simulações

### Mock de Funções

```jsx title="Diferentes tipos de mock"
import { vi } from 'vitest';

// Mock básico
const mockFn = vi.fn();

// Mock com retorno
const mockWithReturn = vi.fn().mockReturnValue('valor');

// Mock assíncrono
const mockAsync = vi.fn().mockResolvedValue({ data: 'response' });

// Mock com erro
const mockError = vi.fn().mockRejectedValue(new Error('Erro simulado'));

// Mock condicional
const mockConditional = vi.fn()
  .mockReturnValueOnce('primeira chamada')
  .mockReturnValueOnce('segunda chamada')
  .mockReturnValue('demais chamadas');
```

### Mock de Módulos

```jsx title="Mock de módulo externo"
// Mock completo do módulo
vi.mock('../../src/api', () => ({
  default: {
    fetchUser: vi.fn(),
    createUser: vi.fn(),
  }
}));

// Mock parcial
vi.mock('../../src/utils', async () => {
  const actual = await vi.importActual('../../src/utils');
  return {
    ...actual,
    formatDate: vi.fn().mockReturnValue('01/01/2024'),
  };
});
```

### Mock de APIs do Browser

```jsx title="Mock de localStorage e outras APIs"
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do ResizeObserver (já configurado no setup.js)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

## Testes de Integração

### Formulários Completos

```jsx title="Exemplo: Teste de formulário de login"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LoginForm from '../../src/components/LoginForm';

describe('LoginForm - Integração', () => {
  it('deve submeter formulário com dados válidos', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockResolvedValue({ 
      success: true,
      token: 'mock-token' 
    });
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Preencher formulário
    await user.type(
      screen.getByLabelText(/email/i), 
      'usuario@exemplo.com'
    );
    await user.type(
      screen.getByLabelText(/senha/i), 
      'senha123'
    );
    
    // Submeter
    await user.click(
      screen.getByRole('button', { name: /entrar/i })
    );
    
    // Verificar chamada
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'usuario@exemplo.com',
      password: 'senha123'
    });
  });

  it('deve mostrar erro para dados inválidos', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockRejectedValue(
      new Error('Credenciais inválidas')
    );
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'email-inválido');
    await user.click(screen.getByRole('button', { name: /entrar/i }));
    
    expect(await screen.findByText(/credenciais inválidas/i))
      .toBeInTheDocument();
  });
});
```

### Estados de Loading

```jsx title="Exemplo: Teste de componente assíncrono"
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ComponenteAssincrono from '../../src/components/ComponenteAssincrono';

describe('ComponenteAssincrono', () => {
  it('deve mostrar loading e depois o conteúdo', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      data: { message: 'Dados carregados!' }
    });
    
    render(<ComponenteAssincrono fetchData={mockFetch} />);
    
    // Verificar estado de loading
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    
    // Aguardar carregamento
    await waitFor(() => {
      expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
    });
    
    // Verificar conteúdo carregado
    expect(screen.getByText('Dados carregados!')).toBeInTheDocument();
  });
});
```

## Boas Práticas

### Padrão AAA (Arrange, Act, Assert)

```jsx
it('deve calcular o total corretamente', async () => {
  // ✅ Arrange - Preparar o cenário
  const user = userEvent.setup();
  const produtos = [
    { id: 1, nome: 'Produto A', preco: 10.00 },
    { id: 2, nome: 'Produto B', preco: 15.50 }
  ];
  
  // ✅ Act - Executar a ação
  render(<CarrinhoCompras produtos={produtos} />);
  await user.click(screen.getByText('Calcular Total'));
  
  // ✅ Assert - Verificar o resultado
  expect(screen.getByText('Total: R$ 25,50')).toBeInTheDocument();
});
```

### Nomes Descritivos

```jsx
describe('ButtonUI', () => {
  // ❌ Ruim - muito genérico
  it('testa botão', () => {});
  
  // ❌ Ruim - testa implementação
  it('deve ter className btn-primary', () => {});
  
  // ✅ Bom - descreve comportamento
  it('deve chamar onSubmit quando formulário é submetido', () => {});
  
  // ✅ Bom - específico e claro
  it('deve mostrar spinner quando loading é true', () => {});
});
```

### Teste de Comportamento vs Implementação

```jsx
// ❌ Evitar - testa detalhes de implementação
expect(component.state.isLoading).toBe(true);
expect(wrapper.find('.loading-spinner')).toHaveLength(1);

// ✅ Preferir - testa comportamento do usuário
expect(screen.getByRole('status', { name: /carregando/i }))
  .toBeInTheDocument();
expect(screen.getByText('Aguarde...')).toBeInTheDocument();
```

### Limpeza Entre Testes

```jsx title="Configuração de limpeza automática"
import { beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpeza automática do DOM
afterEach(() => {
  cleanup();
});

// Limpeza de mocks
beforeEach(() => {
  vi.clearAllMocks();
});

// Limpeza de timers
afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});
```

## Solução de Problemas

### Problemas Comuns

!!! warning "ResizeObserver Error"
    **Erro:** `ResizeObserver loop limit exceeded`
    
    **Solução:** Já configurado no `setup.js` com mock apropriado.

!!! warning "Elemento não encontrado"
    **Erro:** `Unable to find element with text: "Texto"`
    
    **Soluções:**
    ```jsx
    // Use queries mais flexíveis
    screen.getByText(/texto/i) // case insensitive
    screen.getByText((content) => content.includes('Texto'))
    
    // Aguarde elementos assíncronos
    await screen.findByText('Texto')
    
    // Debug do DOM atual
    screen.debug()
    ```

!!! warning "Warning: ReactDOM.render is deprecated"
    **Solução:** Atualize para `@testing-library/react` v13+ que usa `createRoot` automaticamente.

### Performance

**Testes Lentos**
```jsx
// ✅ Use queries síncronas quando possível
screen.getByText('texto') // ao invés de findByText

// ✅ Evite waitFor desnecessários
// ❌ Desnecessário se o elemento já está no DOM
await waitFor(() => expect(screen.getByText('texto')).toBeInTheDocument())

// ✅ Melhor
expect(screen.getByText('texto')).toBeInTheDocument()

// ✅ Mock APIs externas
vi.mock('axios')
```

## Cobertura de Código

### Configuração

A cobertura é configurada no `vite.config.js`:

```javascript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      exclude: [
        'node_modules/',
        'src/setupTests.js',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

### Relatórios

```bash
# Gerar relatório de cobertura
npm test -- --coverage

# Abrir relatório HTML
open coverage/index.html
```

### Metas de Cobertura

| Métrica | Meta Atual | Meta Ideal |
|---------|------------|------------|
| **Linhas** | 80% | 90% |
| **Funções** | 80% | 85% |
| **Branches** | 80% | 85% |
| **Statements** | 80% | 90% |

## Continuous Integration

### GitHub Actions

```yaml title=".github/workflows/test.yml"
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - run: npm ci
      - run: npm test -- --coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

## Recursos Adicionais

### Documentação Oficial

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Ferramentas Recomendadas

- **VS Code Extensions:**
  - Vitest Runner
  - Testing Library Snippets
  - Jest Snippets

### Exemplos Avançados

Para exemplos mais complexos e casos específicos, consulte os arquivos de teste existentes:

- `__tests__/components/Button.test.jsx` - Testes completos de componente
- `__tests__/integration/LoginForm.test.jsx` - Teste de integração
- `__tests__/test-utils.js` - Utilities e helpers personalizados

---

!!! tip "Dica Final"
    Lembre-se: **teste comportamentos, não implementação**. Seus testes devem ser resilientes a refatorações e mudanças internas, focando na experiência do usuário final.