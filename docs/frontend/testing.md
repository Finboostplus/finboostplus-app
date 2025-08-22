# Testes - Frontend FinBoost+

## Visão Geral

Estratégia robusta de testes automatizados usando **Vitest** + **React Testing Library** para garantir qualidade e confiabilidade do código frontend.

### Stack de Testes

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| **Vitest** | `^1.0.0` | Framework principal |
| **React Testing Library** | `^14.0.0` | Testes de componentes |
| **@testing-library/jest-dom** | `^6.0.0` | Matchers customizados |
| **@testing-library/user-event** | `^14.0.0` | Simulação de interações |
| **jsdom** | `^23.0.0` | Ambiente DOM virtual |

## Estrutura do Projeto

```
__tests__/
├── components/           # Testes de componentes
│   ├── Header.test.jsx
│   ├── Button.test.jsx
│   └── Logo.test.jsx
├── integration/          # Testes de integração
│   └── LoginForm.test.jsx
├── setup.js             # Configuração global
└── test-utils.js        # Utilitários e helpers
```

## Comandos

=== "Básicos"
```bash
# Executar todos os testes
npm test

    # Com cobertura
    npm test -- --coverage

    # Modo watch
    npm test -- --watch
    ```

=== "Avançados"
```bash
# Interface gráfica
npm test -- --ui

    # Apenas alterados
    npm test -- --changed

    # Teste específico
    npm test -- Header.test.jsx
    ```

## Padrões de Teste

### 1. Teste Básico

```jsx
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

### 2. Interações do Usuário

```jsx
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

### 3. Context API

```jsx
import { renderWithProviders } from '../test-utils';

describe('Componente com Contexto', () => {
  it('deve usar dados do contexto', () => {
    const mockUser = { name: 'João', id: 1 };
    
    renderWithProviders(
      <ComponenteComContexto />,
      { authContext: { user: mockUser } }
    );
    
    expect(screen.getByText('Olá, João')).toBeInTheDocument();
  });
});
```

### 4. Hooks Customizados

```jsx
import { renderHook, act } from '@testing-library/react';
import useContador from '../../src/hooks/useContador';

describe('useContador', () => {
  it('deve incrementar contador', () => {
    const { result } = renderHook(() => useContador(0));
    
    act(() => { result.current.incrementar(); });
    
    expect(result.current.contador).toBe(1);
  });
});
```

## Queries e Matchers

### Estratégias de Busca (Por Prioridade)

=== "1. Por Papel (Mais Acessível)"
```jsx
screen.getByRole('button', { name: /enviar/i })
screen.getByRole('textbox', { name: /email/i })
screen.getByRole('heading', { level: 1 })
```

=== "2. Por Label/Texto"
```jsx
screen.getByLabelText('Email')
screen.getByPlaceholderText('Digite seu email')
screen.getByText('Clique aqui')
```

=== "3. Por Test ID (Último Recurso)"
```jsx
screen.getByTestId('custom-element')
// Use apenas quando outras opções não são viáveis
```

### Principais Matchers

| Categoria | Matcher | Exemplo |
|-----------|---------|---------|
| **Presença** | `toBeInTheDocument()` | `expect(element).toBeInTheDocument()` |
| | `toBeVisible()` | `expect(element).toBeVisible()` |
| **Conteúdo** | `toHaveTextContent()` | `expect(element).toHaveTextContent('Texto')` |
| | `toHaveValue()` | `expect(input).toHaveValue('valor')` |
| **Atributos** | `toHaveAttribute()` | `expect(link).toHaveAttribute('href', '/home')` |
| | `toHaveClass()` | `expect(button).toHaveClass('btn-primary')` |
| **Estado** | `toBeDisabled()` | `expect(input).toBeDisabled()` |
| | `toBeChecked()` | `expect(checkbox).toBeChecked()` |
| **Mocks** | `toHaveBeenCalled()` | `expect(mockFn).toHaveBeenCalled()` |
| | `toHaveBeenCalledWith()` | `expect(mockFn).toHaveBeenCalledWith(args)` |

## Mocks e Simulações

### Mock de Funções

=== "Básico"
```jsx
import { vi } from 'vitest';

    // Mock simples
    const mockFn = vi.fn();
    
    // Com retorno
    const mockWithReturn = vi.fn().mockReturnValue('valor');
    ```

=== "Assíncrono"
```jsx
// Mock assíncrono
const mockAsync = vi.fn().mockResolvedValue({ data: 'response' });

    // Mock com erro
    const mockError = vi.fn().mockRejectedValue(new Error('Erro simulado'));
    ```

=== "Condicional"
```jsx
const mockConditional = vi.fn()
  .mockReturnValueOnce('primeira chamada')
  .mockReturnValueOnce('segunda chamada')
  .mockReturnValue('demais chamadas');
```

### Mock de Módulos

```jsx
// Mock completo
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

## Testes de Integração

### Formulários Completos

!!! example "Exemplo: Login Form"
```jsx
describe('LoginForm - Integração', () => {
it('deve submeter formulário com dados válidos', async () => {
const user = userEvent.setup();
const mockSubmit = vi.fn().mockResolvedValue({
success: true, token: 'mock-token'
});

        render(<LoginForm onSubmit={mockSubmit} />);
        
        // Preencher
        await user.type(screen.getByLabelText(/email/i), 'user@test.com');
        await user.type(screen.getByLabelText(/senha/i), 'senha123');
        
        // Submeter
        await user.click(screen.getByRole('button', { name: /entrar/i }));
        
        // Verificar
        expect(mockSubmit).toHaveBeenCalledWith({
          email: 'user@test.com',
          password: 'senha123'
        });
      });
    });
    ```

### Estados Assíncronos

```jsx
describe('ComponenteAssincrono', () => {
  it('deve mostrar loading e depois conteúdo', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      data: { message: 'Dados carregados!' }
    });
    
    render(<ComponenteAssincrono fetchData={mockFetch} />);
    
    // Loading
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    
    // Aguardar
    await waitFor(() => {
      expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
    });
    
    // Conteúdo
    expect(screen.getByText('Dados carregados!')).toBeInTheDocument();
  });
});
```

## Boas Práticas

### Padrão AAA

!!! tip "Arrange, Act, Assert"
```jsx
it('deve calcular total corretamente', async () => {
// ✅ Arrange - Preparar cenário
const user = userEvent.setup();
const produtos = [
{ id: 1, nome: 'Produto A', preco: 10.00 },
{ id: 2, nome: 'Produto B', preco: 15.50 }
];

      // ✅ Act - Executar ação
      render(<CarrinhoCompras produtos={produtos} />);
      await user.click(screen.getByText('Calcular Total'));
      
      // ✅ Assert - Verificar resultado
      expect(screen.getByText('Total: R$ 25,50')).toBeInTheDocument();
    });
    ```

### Nomes Descritivos

```jsx
describe('ButtonUI', () => {
  // ❌ Ruim
  it('testa botão', () => {});
  
  // ❌ Testa implementação
  it('deve ter className btn-primary', () => {});
  
  // ✅ Bom - descreve comportamento
  it('deve chamar onSubmit quando formulário é submetido', () => {});
  
  // ✅ Específico e claro
  it('deve mostrar spinner quando loading é true', () => {});
});
```

### Comportamento vs Implementação

```jsx
// ❌ Evitar - testa implementação
expect(component.state.isLoading).toBe(true);

// ✅ Preferir - testa comportamento
expect(screen.getByRole('status', { name: /carregando/i }))
  .toBeInTheDocument();
```

## Solução de Problemas

!!! warning "Problemas Comuns"

    **ResizeObserver Error**
    ```jsx
    // Já configurado no setup.js
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    ```
    
    **Elemento não encontrado**
    ```jsx
    // Use queries flexíveis
    screen.getByText(/texto/i) // case insensitive
    
    // Aguarde elementos assíncronos
    await screen.findByText('Texto')
    
    // Debug do DOM
    screen.debug()
    ```

## Cobertura de Código

### Configuração

```javascript
// vite.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
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

### Metas

| Métrica | Meta Atual | Meta Ideal |
|---------|------------|------------|
| **Linhas** | 80% | 90% |
| **Funções** | 80% | 85% |
| **Branches** | 80% | 85% |
| **Statements** | 80% | 90% |

## CI/CD

```yaml
# .github/workflows/test.yml
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
```

## Recursos

!!! info "Links Úteis"
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

!!! tip "VS Code Extensions"
- Vitest Runner
- Testing Library Snippets
- Jest Snippets

---

!!! success "Lembre-se"
**Teste comportamentos, não implementação.** Seus testes devem ser resilientes a refatorações e mudanças internas, focando na experiência do usuário final.