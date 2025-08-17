# Hooks Personalizados - Frontend FinBoost+

## Visão Geral

Os hooks personalizados do **FinBoost+** encapsulam lógicas reutilizáveis e complexas, promovendo separação de responsabilidades e reutilização de código. Cada hook segue as regras do React e fornece uma interface limpa para os componentes.

## Princípios dos Custom Hooks

- Nomenclatura: sempre começam com `use` (ex: `useAuth`, `useExpenses`)
- Responsabilidade única: cada hook tem uma função específica
- Estado isolado: cada instância mantém seu próprio estado
- API consistente: interface padronizada de retorno
- Tratamento de erros encapsulado

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

## useLocalStorage

Hook para persistência de dados no localStorage do navegador.

**Interface:**
```javascript
const [value, setValue] = useLocalStorage(key, initialValue);
```

**Exemplo de implementação:**
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

## useAuth

Gerencia autenticação do usuário, login, logout e estado do token.

**Retorno:**
- user, token, login, logout, loading, error

## useExpenses

Gerencia listagem, criação, edição e exclusão de despesas.

**Retorno:**
- expenses, loading, error, createExpense, updateExpense, deleteExpense, refetch

## useGroups

Gerencia dados de grupos, membros e convites.

**Retorno:**
- groups, loading, error, createGroup, updateGroup, inviteMember, refetch

## useTheme

Gerencia tema claro/escuro e preferências visuais do usuário.

**Retorno:**
- theme, setTheme, toggleTheme

---

Todos os hooks seguem boas práticas de React, são testados e documentados para facilitar a manutenção e a escalabilidade do frontend do FinBoost+.
