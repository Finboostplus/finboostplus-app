import { createContext, useContext, useEffect, useState } from 'react';

const KEY_THEME_CONTEXT = 'app_theme';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(KEY_THEME_CONTEXT) || 'light';
  });

  useEffect(() => {
    localStorage.setItem(KEY_THEME_CONTEXT, theme);
    document.documentElement.className = theme; // Aplica a classe no <html>
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
}
