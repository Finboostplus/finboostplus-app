# 🪝 Hooks Personalizados - Frontend FinBoost+

## 📋 Visão Geral

Os hooks personalizados do **FinBoost+** encapsulam lógicas reutilizáveis e complexas, promovendo a separação de responsabilidades e a reutilização de código. Cada hook segue as regras dos hooks do React e fornece uma interface limpa para componentes consumidores.

## 🎯 Princípios dos Custom Hooks

### Convenções Adotadas
- **Nomenclatura**: Sempre começam com `use` (ex: `useAuth`, `useExpenses`)
- **Single Responsibility**: Cada hook tem uma responsabilidade específica
- **Estado Isolado**: Cada instância do hook mantém seu próprio estado
- **API Consistente**: Interface padronizada de retorno
- **Error Handling**: Tratamento de erros encapsulado

### Padrões de Retorno
```javascript
// Padrão básico
const { data, loading, error, refetch } = useCustomHook();

// Padrão com ações
const { 
  data, 
  loading, 
  error, 
  create, 
  update, 
  delete: remove,
  refetch 
} = useCustomHook();
```

## 💾 useLocalStorage (`useLocalStorage.js`)

Hook para persistência de dados no localStorage do navegador.

### **Interface**
```javascript
const [value, setValue] = useLocalStorage(key, initialValue);
```

### **Implementação Completa**
```javascript
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Buscar valor existente no localStorage
      const item = localStorage.getItem(key);
      
      // Fazer parse do JSON ou retornar valor inicial
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage[${key}]:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = value => {
    try {
      // Permitir função de atualização como no useState
      const valueToStore = 
        value instanceof Function ? value(storedValue) : value;
      
      // Salvar no estado
      setStoredValue(valueToStore);
      
      // Salvar no localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar localStorage[${key}]:`, error);
    }
  };

  return [storedValue, setValue];
}
```

### **Exemplos de Uso**

#### Persistir Tema da Aplicação
```javascript
function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('app_theme', 'light');
  
  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### Persistir Preferências do Usuário
```javascript
function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('user_preferences', {
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    notifications: true
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return { preferences, updatePreference };
}
```

**💡 Os hooks personalizados do FinBoost+ fornecem uma camada de abstração poderosa que simplifica o gerenciamento de estado e lógica de negócio, mantendo os componentes limpos e focados na apresentação.**
