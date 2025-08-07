# Guia de Testes com Vitest e React Testing Library

<div align="center">
  <img src="https://img.shields.io/badge/Framework-Vitest-yellow" alt="Vitest">
  <img src="https://img.shields.io/badge/Library-React_Testing_Library-red" alt="RTL">
</div>

## Configuração do Projeto

O projeto já está configurado com:
- ✅ **Vitest** como framework de testes
- ✅ **React Testing Library** para testar componentes React
- ✅ **@testing-library/jest-dom** para matchers customizados
- ✅ **@testing-library/user-event** para simulação de interações
- ✅ **jsdom** como ambiente de testes

### Arquivos de Configuração

1. **`vite.config.js`** - Configuração principal do Vitest
2. **`__tests__/setup.js`** - Configurações globais e mocks
3. **`__tests__/test-utils.js`** - Utilitários e helpers para testes

## Comandos Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (desenvolvimento)
npm test -- --watch

# Executar testes com coverage
npm test -- --coverage

# Executar um teste específico
npm test -- Header.test.jsx
```

## Estrutura de Testes

### 1. Teste Básico de Componente

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

### 2. Teste com Interações do Usuário

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

describe('Botão com Click', () => {
  it('deve chamar função ao clicar', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    
    render(<Botao onClick={mockClick} />);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Teste com Contexto

```jsx
import { renderWithProviders } from '../test-utils';

describe('Componente com Contexto', () => {
  it('deve usar dados do contexto', () => {
    const mockUser = { name: 'João' };
    
    renderWithProviders(
      <ComponenteComContexto />,
      { authContext: { user: mockUser } }
    );
    
    expect(screen.getByText('Olá, João')).toBeInTheDocument();
  });
});
```

### 4. Teste de Hook Customizado

```jsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useContador from '../../src/hooks/useContador';

describe('useContador', () => {
  it('deve incrementar contador', () => {
    const { result } = renderHook(() => useContador(0));
    
    act(() => {
      result.current.incrementar();
    });
    
    expect(result.current.contador).toBe(1);
  });
});
```

## Principais Matchers

### Verificação de Presença
- `toBeInTheDocument()` - Elemento está no DOM
- `toBeVisible()` - Elemento está visível
- `toBeNull()` - Valor é null

### Verificação de Texto
- `toHaveTextContent(text)` - Contém o texto
- `toHaveValue(value)` - Input tem o valor
- `toHaveDisplayValue(value)` - Input mostra o valor

### Verificação de Atributos
- `toHaveAttribute(attr, value)` - Tem atributo com valor
- `toHaveClass(className)` - Tem a classe CSS
- `toBeDisabled()` - Elemento está desabilitado
- `toBeChecked()` - Checkbox/radio está marcado

### Verificação de Funções
- `toHaveBeenCalled()` - Função foi chamada
- `toHaveBeenCalledTimes(number)` - Quantidade de chamadas
- `toHaveBeenCalledWith(args)` - Chamada com argumentos específicos

## Estratégias de Busca (Queries)

### Por Papel (Recomendado)
```jsx
screen.getByRole('button')
screen.getByRole('textbox')
screen.getByRole('heading')
```

### Por Label
```jsx
screen.getByLabelText('Email')
screen.getByPlaceholderText('Digite seu email')
```

### Por Texto
```jsx
screen.getByText('Clique aqui')
screen.getByText(/clique/i) // Case insensitive
```

### Por Test ID (Último recurso)
```jsx
screen.getByTestId('custom-element')
```

## Mocks Comuns

### Mock de Função
```jsx
const mockFn = vi.fn();
mockFn.mockReturnValue('valor');
mockFn.mockResolvedValue('promise resolvida');
mockFn.mockRejectedValue(new Error('erro'));
```

### Mock de Módulo
```jsx
vi.mock('../../src/api', () => ({
  fetchUser: vi.fn(),
}));
```

### Mock de localStorage
```jsx
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
```

## Dicas e Boas Práticas

### 1. AAA Pattern
```jsx
it('deve fazer algo', () => {
  // Arrange - Preparar
  const props = { name: 'João' };
  
  // Act - Agir
  render(<Componente {...props} />);
  
  // Assert - Verificar
  expect(screen.getByText('João')).toBeInTheDocument();
});
```

### 2. Nomes Descritivos
```jsx
// ❌ Ruim
it('testa botão', () => {});

// ✅ Bom
it('deve chamar onSubmit quando formulário é submetido', () => {});
```

### 3. Teste Comportamento, Não Implementação
```jsx
// ❌ Ruim - testa implementação
expect(component.state.count).toBe(1);

// ✅ Bom - testa comportamento
expect(screen.getByText('Contador: 1')).toBeInTheDocument();
```

### 4. Use async/await para Interações
```jsx
// ✅ Sempre use await com userEvent
await user.click(button);
await user.type(input, 'texto');
```

### 5. Limpe Mocks Entre Testes
```jsx
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
});
```

## Exemplos de Teste por Tipo

### Componente de Lista
```jsx
it('deve renderizar lista de itens', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  render(<Lista items={items} />);
  
  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});
```

### Formulário
```jsx
it('deve submeter dados válidos', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<Formulario onSubmit={onSubmit} />);
  
  await user.type(screen.getByLabelText(/nome/i), 'João');
  await user.click(screen.getByRole('button', { name: /enviar/i }));
  
  expect(onSubmit).toHaveBeenCalledWith({ nome: 'João' });
});
```

### Componente com Estado Loading
```jsx
it('deve mostrar loading durante carregamento', async () => {
  render(<ComponenteAssincrono />);
  
  expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
  });
});
```

## Solução de Problemas Comuns

### ResizeObserver Error
Já configurado no `setup.js` com mock.

### TypeError: Cannot read property 'xxx' of undefined
Verifique se todos os props necessários estão sendo passados ou use valores padrão.

### Warning: ReactDOM.render is deprecated
Use `@testing-library/react` v13+ que usa `createRoot` automaticamente.

### Testes lentos
- Use `screen.getBy*` em vez de `screen.findBy*` quando possível
- Evite `waitFor` desnecessários
- Use mocks para APIs externas

## Executando os Testes

Para executar os testes do projeto:

```bash
cd frontend
npm test

# Executar com coverage
npm test -- --coverage

# Executar em modo watch
npm test -- --watch

# Executar teste específico
npm test -- Logo.test.jsx
```

---

<div align="center">
  <strong>🧪 Testes automatizados - FinBoost+</strong><br/>
  <em>Qualidade e confiabilidade garantidas</em>
</div>
