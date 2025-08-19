import { Switch } from '@headlessui/react';
import { useStore } from 'zustand';
import { useThemeStore } from '../../../../../context/store/theme';

export default function SwitchTheme() {
  const { theme, toggleTheme } = useStore(useThemeStore);
  let enabled = theme === 'dark' ? true : false;
  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={`group relative inline-flex h-8 w-16 items-center rounded-full cursor-pointer ${
        enabled ? 'bg-zinc-600' : 'bg-zinc-200'
      } transition-colors duration-300 focus:outline-none`}
      aria-label="Alternar tema escuro/claro"
    >
      <span
        className={`size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? 'translate-x-9' : 'translate-x-1'
        }`}
      />
    </Switch>
  );
}
