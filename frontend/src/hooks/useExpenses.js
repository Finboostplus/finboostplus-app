// useExpenses.js
import { useState, useEffect } from 'react';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // futura lógica de despesas
  }, []);

  return { expenses, setExpenses };
}
