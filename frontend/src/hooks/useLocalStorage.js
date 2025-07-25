// useLocalStorage.js
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // erro ignorado
    }
  };

  return [storedValue, setValue];
}
