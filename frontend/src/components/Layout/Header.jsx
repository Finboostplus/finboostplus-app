import { useState } from 'react';
import LogoImage from '../Logo';
import DropdownMenu from './DropdownMenu';
import { Menu, MenuItem } from '@headlessui/react';
import { useCookies } from 'react-cookie';

export default function Header() {
  const [cookies] = useCookies(['access_token']); //Apenas para testar

  return (
    <header className="bg-neutral p-4 text-text border-b-[1px] border-muted flex justify-between">
      <Menu>
        <MenuItem as="a" href="/">
          <LogoImage className="w-30 h-auto object-contain" />
        </MenuItem>
      </Menu>
      {cookies?.access_token && <DropdownMenu />}
    </header>
  );
}
