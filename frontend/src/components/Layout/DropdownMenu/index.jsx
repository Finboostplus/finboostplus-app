import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { navItems } from './navItems';
import SwitchTheme from './SwitchTheme';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLogout } from '../../../hooks/useLogout';
import useMeQuery from '../../../hooks/ReactQuery/useMeQuery';

export default function DropdownMenu() {
  const logout = useLogout();
  const { data: user, isLoading, error } = useMeQuery();
  const firstLetter = user?.name[0]?.toUpperCase() ?? '?';

  return (
    <Menu
      as="div"
      title={`Abrir menu de ${user?.name}`}
      className="relative inline-block text-left"
    >
      {/* Botão do avatar */}
      <MenuButton
        className="w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
        style={{ backgroundColor: user?.themeColor }}
        aria-label={`Abrir menu do usuário ${user?.name}`}
      >
        <span aria-hidden="true">{firstLetter}</span>
      </MenuButton>

      {/* Menu dropdown */}
      <MenuItems
        anchor="bottom end"
        className="absolute mt-2 w-56 origin-top-right rounded-xl bg-surface border border-muted shadow-lg ring-1 ring-black/5 z-50
          transition-opacity duration-150 ease-out
          data-[closed]:opacity-0 data-[enter]:opacity-100"
      >
        <div className="p-2 space-y-1">
          {navItems.map(({ icon, label, href, isDanger }, index) => (
            <MenuItem key={index}>
              {({ active }) => {
                const base =
                  'flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors';
                const baseText = isDanger ? 'text-error' : 'text-text';
                const activeBg = isDanger ? 'bg-error/10' : 'bg-primary/10';
                const activeText = isDanger ? 'text-error' : 'text-primary';

                // Se for o item de "Sair" (ou perigoso), vira um botão
                if (isDanger) {
                  return (
                    <button
                      onClick={() => logout()}
                      className={`${base} ${
                        active ? `${activeBg} ${activeText}` : baseText
                      } hover:opacity-90 focus:outline-none cursor-pointer`}
                    >
                      <span className="text-[16px]">{icon}</span>
                      {label}
                    </button>
                  );
                }

                // Caso contrário, continua sendo um link normal
                return (
                  <a
                    href={href}
                    className={`${base} ${
                      active ? `${activeBg} ${activeText}` : baseText
                    } hover:opacity-90 focus:outline-none`}
                  >
                    <span className="text-[16px]">{icon}</span>
                    {label}
                  </a>
                );
              }}
            </MenuItem>
          ))}
        </div>

        {/* Separador e controle de tema */}
        <div className="border-t border-muted mt-1 pt-3 px-4 pb-3">
          <div className="flex items-center justify-between">
            <FaSun size={16} className="text-text" aria-hidden="true" />
            <SwitchTheme />
            <FaMoon size={16} className="text-text" aria-hidden="true" />
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}
