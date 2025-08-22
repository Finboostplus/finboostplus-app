# Hooks Personalizados - Frontend FinBoost+

## Visão Geral

Os hooks personalizados encapsulam lógicas reutilizáveis, seguindo as regras do React e fornecendo APIs consistentes para os componentes.

## Princípios e Padrões

!!! info "Convenções"
- **Nomenclatura:** sempre começam com `use`
- **Responsabilidade única:** cada hook tem função específica
- **API consistente:** padrões de retorno padronizados
- **Error handling:** gestão encapsulada de loading/error states

### Padrões de Retorno

=== "Dados Simples"
```javascript
const { data, loading, error, refetch } = useCustomHook();
```

=== "CRUD Operations"
```javascript
const { 
  data, loading, error, 
  create, update, delete: remove, refetch 
} = useCustomHook();
```

=== "Estado Local"
```javascript
const [value, setValue] = useCustomHook(initialValue);
```

## Hooks Principais

### useLocalStorage

Persistência automática no localStorage com sincronização.

```javascript
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage[${key}]:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar localStorage[${key}]:`, error);
    }
  };

  return [storedValue, setValue];
}
```

!!! example "Exemplo de Uso"
```jsx
const UserSettings = () => {
const [theme, setTheme] = useLocalStorage('theme', 'light');
const [preferences, setPreferences] = useLocalStorage('userPrefs', {
notifications: true,
currency: 'BRL'
});

      return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Tema: {theme}
        </button>
      );
    };
```

### useOnlineStatus

Monitora conectividade para funcionalidades PWA.

```javascript
const { isOnline, isOffline, connectionType, lastOnline } = useOnlineStatus();
```

!!! example "Exemplo de Uso"

```jsx
const App = () => {
  const { isOnline, isOffline } = useOnlineStatus();

  return (
    <div>
      {isOffline && (
        <div className="offline-banner">
          🚫 Você está offline. Algumas funcionalidades podem estar limitadas.
        </div>
      )}
      <main className={isOffline ? 'offline-mode' : ''}>
        {/* Conteúdo da aplicação */}
      </main>
    </div>
  );
};
```

## Hooks de Formulário

### useForm

Hook especializado para formulários com validação e estados complexos.

```javascript
const {
  formData, errors, isValid, isSubmitting,
  handleChange, handleSubmit, reset, setFieldValue
} = useForm(initialData, validationSchema);
```

!!! example "Formulário de Despesas"
```jsx
const ExpenseForm = ({ onSubmit, initialData }) => {
const { formData, errors, isValid, isSubmitting, handleChange, handleSubmit } =
useForm(initialData, expenseValidationSchema);

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      );
    };
```

### useFilteredGroups

Filtros avançados com debounce e persistência.

```javascript
const {
  filteredGroups,
  filters,
  setFilter,
  clearFilters,
  appliedFiltersCount
} = useFilteredGroups(groups);
```

**Filtros disponíveis:** Status, Tipo, Data, Membros, Busca

## Estado Global

### Integração com Zustand

```javascript
// store/auth.js
export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  
  login: async (credentials) => {
    const response = await authService.login(credentials);
    set({ 
      user: response.user, 
      token: response.token, 
      isAuthenticated: true 
    });
    localStorage.setItem('token', response.token);
  },
  
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  }
}));

// hooks/useAuth.js
export const useAuth = () => {
  const store = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await store.login(credentials);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { ...store, loading, error, login };
};
```

## Padrões Avançados

### Tratamento de Erros

```javascript
const useApiData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError({
        message: err.message,
        code: err.code,
        details: err.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [endpoint]);
  return { data, loading, error, refetch: fetchData };
};
```

### Debounce para Pesquisas

```javascript
const useDebounceSearch = (searchTerm, delay = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), delay);
    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  return debouncedTerm;
};
```

### Cache com Expiração

```javascript
const useApiCache = (key, fetcher, options = {}) => {
  const { cacheTime = 5 * 60 * 1000 } = options; // 5 minutos
  const [cache, setCache] = useState(new Map());

  const getCachedData = (key) => {
    const cached = cache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cacheTime;
    return isExpired ? null : cached.data;
  };

  const setCachedData = (key, data) => {
    setCache(prev => new Map(prev).set(key, {
      data, timestamp: Date.now()
    }));
  };
  // Implementação completa...
};
```

## Testes

!!! tip "Teste de Hook"
```jsx
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

    describe('useLocalStorage', () => {
      beforeEach(() => localStorage.clear());

      it('deve inicializar com valor padrão', () => {
        const { result } = renderHook(() => 
          useLocalStorage('test-key', 'default-value')
        );
        expect(result.current[0]).toBe('default-value');
      });

      it('deve atualizar localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
        
        act(() => { result.current[1]('new-value'); });
        
        expect(result.current[0]).toBe('new-value');
        expect(localStorage.getItem('test-key')).toBe('"new-value"');
      });
    });
    ```

## Boas Práticas

!!! success "Performance"
- Use `useMemo` e `useCallback` apropriadamente
- Implemente debounce para operações custosas
- Cache resultados quando apropriado
- Evite criação de objetos em cada render

!!! warning "Reutilização"
- Mantenha responsabilidade única
- Use parâmetros para customização
- Forneça valores padrão sensatos
- Documente a API claramente

!!! danger "Estado"
- Sempre gerencie loading/error states
- Use cleanup functions para evitar vazamentos
- Implemente retry logic quando necessário
- Sincronize com localStorage apropriadamente

---

!!! abstract "Resumo"
Os hooks seguem as **regras do React**, são **otimizados para performance** e fornecem **APIs consistentes** para facilitar desenvolvimento e manutenção.