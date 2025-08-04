import { Switch } from '@headlessui/react';
import { useTheme } from '../../../../../context/ThemeContext';

export default function SwitchTheme() {
  const { theme, toggleTheme } = useTheme();
  const enabled = theme === 'dark';

  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={`group cursor-pointer relative inline-flex h-8 w-16 items-center rounded-full ${
        enabled ? 'bg-zinc-600' : 'bg-zinc-200'
      } transition-colors duration-300 focus:outline-none`}
      aria-label="Alternar tema escuro/claro"
    >
      <span
        className={`size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 translate-x-1 ${
          enabled ? 'translate-x-9' : ''
        }`}
      />
    </Switch>
  );
}
