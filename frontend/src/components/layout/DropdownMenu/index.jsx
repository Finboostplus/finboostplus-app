import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { navItems } from './DropdownMenuNav/navItems';

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
        className="absolute mt-2 w-52 origin-top-right rounded-xl bg-white border border-gray-200 shadow-xl ring-1 ring-black/5 focus:outline-none z-50"
      >
        <div className="p-2 space-y-1">
          {navItems.map(({ icon, label, href, isDanger }, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <a
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      active
                        ? isDanger
                          ? 'bg-error/10 text-error'
                          : 'bg-primary/10 text-primary'
                        : isDanger
                          ? 'text-error'
                          : 'text-gray-700'
                    }
                  `}
                >
                  <span className="text-[16px]">{icon}</span>
                  {label}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
