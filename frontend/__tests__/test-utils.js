import { render } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { AuthContext } from '../src/context/AuthContext';
import { ThemeContext } from '../src/context/ThemeContext';
import { GroupContext } from '../src/context/GroupContext';

// Utilitários para mocks
export const createMockAuthContext = (user = null, isLoading = false) => ({
  user,
  isLoading,
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
});

export const createMockThemeContext = (theme = 'light') => ({
  theme,
  toggleTheme: vi.fn(),
  setTheme: vi.fn(),
});

export const createMockGroupContext = (groups = [], currentGroup = null) => ({
  groups,
  currentGroup,
  loading: false,
  error: null,
  createGroup: vi.fn(),
  updateGroup: vi.fn(),
  deleteGroup: vi.fn(),
  setCurrentGroup: vi.fn(),
});

// Função para renderizar com contextos
export const renderWithProviders = (
  ui,
  {
    authContext = createMockAuthContext(),
    themeContext = createMockThemeContext(),
    groupContext = createMockGroupContext(),
  } = {}
) => {
  const AllProviders = ({ children }) => (
    <AuthContext.Provider value={authContext}>
      <ThemeContext.Provider value={themeContext}>
        <GroupContext.Provider value={groupContext}>
          {children}
        </GroupContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );

  return render(ui, { wrapper: AllProviders });
};

// Mock para React Router
export const mockNavigate = vi.fn();
export const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
};

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => ({}),
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

// Matchers customizados para testes
export const customMatchers = {
  toBeInTheRange: (received, min, max) => {
    const pass = received >= min && received <= max;
    return {
      message: () =>
        pass
          ? `Expected ${received} not to be within range ${min} - ${max}`
          : `Expected ${received} to be within range ${min} - ${max}`,
      pass,
    };
  },
};

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
