import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function SwitchTheme() {
  const [enabled, setEnabled] = useState(() => {
    // Preferência salva no localStorage ou sistema
    if (typeof window !== 'undefined') {
      return (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`group relative inline-flex h-8 w-16 items-center rounded-full bg-muted transition-colors duration-300 focus:outline-none`}
      aria-label="Alternar tema escuro/claro"
    >
      <span
        className={`absolute left-1 text-yellow-400 transition-opacity duration-200 ${
          enabled ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`absolute right-1 text-indigo-400 transition-opacity duration-200 ${
          enabled ? 'opacity-100' : 'opacity-0'
        }`}
      ></span>

      <span
        className={`size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 translate-x-1 ${
          enabled ? 'translate-x-8' : ''
        }`}
      />
    </Switch>
  );
}
