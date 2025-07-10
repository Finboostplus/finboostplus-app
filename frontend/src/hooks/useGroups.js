// useGroups.js
import { useState, useEffect } from 'react';

export function useGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // futura lógica de grupos
  }, []);

  return { groups, setGroups };
}
