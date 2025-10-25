import { useAuthStore } from '../../context/stores/auth';
import { useLogout } from '../../hooks/useLogout';
import LogoImage from '../Logo';
import DropdownMenu from './DropdownMenu';
import { Menu, MenuItem } from '@headlessui/react';

export default function Header() {
  const logout = useLogout();
  const isAuthenticated = useAuthStore(state => !!state.token);

  return (
    <header className="bg-neutral p-4 text-text border-b-[1px] border-muted flex justify-between">
      <Menu>
        <MenuItem as="a" href="/">
          <LogoImage className="w-30 h-auto object-contain" />
        </MenuItem>
      </Menu>
      <button onClick={() => logout()}>Sair</button>
      {isAuthenticated && <DropdownMenu />}
    </header>
  );
}
