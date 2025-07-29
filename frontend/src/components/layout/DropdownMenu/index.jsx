import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { navItems } from './DropdownMenuNav/navItems';
import SwitchTheme from './DropdownMenuNav/SwitchTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        as="button"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold shadow-md hover:opacity-90 transition cursor-pointer"
        aria-label="Abrir menu do usuário"
      >
        J
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="absolute mt-2 w-52 origin-top-right rounded-xl bg-surface border border-neutral shadow-xl ring-1 ring-black/5 focus:outline-none z-50 transition-colors"
      >
        <div className="p-2 space-y-1">
          {navItems.map(({ icon, label, href, isDanger }, index) => (
            <MenuItem key={index}>
              {({ active }) => {
                const baseTextColor = isDanger ? 'text-error' : 'text-text';
                const activeBgColor = isDanger
                  ? 'bg-error/10'
                  : 'bg-primary/10';
                const activeTextColor = isDanger
                  ? 'text-error'
                  : 'text-primary';

                return (
                  <a
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        active
                          ? `${activeBgColor} ${activeTextColor}`
                          : `${baseTextColor}`
                      }
                    `}
                  >
                    <span className="text-[16px]">{icon}</span>
                    {label}
                  </a>
                );
              }}
            </MenuItem>
          ))}
        </div>
        <div className="border-t border-muted mt-1 pt-2 px-4 pb-3">
          <div className="flex items-center justify-between">
            <FaSun size={16} className="text-text" />
            <SwitchTheme />
            <FaMoon size={16} className="text-text" />
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}
