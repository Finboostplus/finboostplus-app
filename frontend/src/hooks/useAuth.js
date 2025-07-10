// useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // futura lógica de autenticação
  }, []);

  return { user, setUser };
}
