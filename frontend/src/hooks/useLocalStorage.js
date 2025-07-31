// hooks/useLocalStorage.js
import { useState } from 'react';

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

  const setValue = value => {
    try {
      // Suporta funções de atualização como no useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar localStorage[${key}]:`, error);
    }
  };

  return [storedValue, setValue];
}
