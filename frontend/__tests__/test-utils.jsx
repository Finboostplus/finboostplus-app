import { render, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

// Salva fetch original para restauração
const originalFetch = globalThis.fetch;

// Mock simples para contextos (caso sejam necessários nos testes)
const createMockContext = (value) => ({
  Provider: ({ children }) => children,
  Consumer: ({ children }) => children(value),
});

// Utilitários para mocks
export const createMockAuthContext = (user = null, isLoading = false) => ({
  user,
  isLoading,
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
});

export const createMockThemeContext = (theme = 'light', overrides = {}) => ({
  theme,
  toggleTheme: vi.fn(),
  setTheme: vi.fn(),
  ...overrides,
});

export const createMockGroupContext = (groups = [], currentGroup = null, overrides = {}) => ({
  groups,
  currentGroup,
  loading: false,
  error: null,
  createGroup: vi.fn(),
  updateGroup: vi.fn(),
  deleteGroup: vi.fn(),
  setCurrentGroup: vi.fn(),
  ...overrides,
});

// Função para renderizar com providers (simplificada)
export const renderWithProviders = (ui, options = {}) => {
  return render(ui, options);
};

// Mock para React Router
export const mockNavigate = vi.fn();
export const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
};

export const resetRouterMocks = () => {
  mockNavigate.mockClear();
};

// Custom matchers para testes
export const customMatchers = {
  toBeLoading(received) {
    const pass = received && received.getAttribute('data-testid') === 'loading';
    return {
      pass,
      message: () => pass
        ? `Expected element not to be loading`
        : `Expected element to be loading`
    };
  },
  toHaveErrorMessage(received, expected) {
    const errorElement = received.querySelector('[data-testid="error-message"]');
    const pass = errorElement && errorElement.textContent === expected;
    return {
      pass,
      message: () => pass
        ? `Expected element not to have error message "${expected}"`
        : `Expected element to have error message "${expected}"`
    };
  }
};

// Mock para React Router (somente se necessário)
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => ({}),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children }) => children,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
}));

// Mocks para APIs
export const mockApiResponse = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(JSON.stringify(data)),
});

export const mockFetch = response => {
  globalThis.fetch = vi.fn().mockResolvedValue(response);
};

export const restoreFetch = () => {
  globalThis.fetch = originalFetch;
};

// Utilitários para aguardar elementos assíncronos
export const waitForLoadingToFinish = async () => {
  const { waitForElementToBeRemoved } = await import('@testing-library/react');
  await waitForElementToBeRemoved(() => screen.queryByText(/carregando/i), {
    timeout: 3000,
  });
};

// Função para criar dados de teste
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  avatar: '/avatar/default.jpg',
  createdAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockGroup = (overrides = {}) => ({
  id: '1',
  name: 'Família Silva',
  description: 'Grupo da família',
  members: [createMockUser()],
  createdAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockExpense = (overrides = {}) => ({
  id: '1',
  title: 'Supermercado',
  amount: 150.0,
  category: 'Alimentação',
  date: '2023-01-01',
  userId: '1',
  groupId: '1',
  ...overrides,
});

// Helper para testar erros de console
export const suppressConsoleError = () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });
};

beforeEach(() => {
  resetRouterMocks();
});
