import { useAuthStore } from '../../context/stores/auth';
import LogoImage from '../Logo';
import DropdownMenu from './DropdownMenu';
import { Menu, MenuItem } from '@headlessui/react';

export default function Header() {
  const isAuthenticated = useAuthStore(state => !!state.token);

  return (
    <header className="bg-neutral p-4 text-text border-b-[1px] border-muted flex justify-between">
      <Menu>
        <MenuItem as="a" href="/">
          <LogoImage className="w-30 h-auto object-contain" />
        </MenuItem>
      </Menu>

      {isAuthenticated && <DropdownMenu />}
    </header>
  );
}
