import { useState } from 'react';
import LogoImage from '../Logo';
import DropdownMenu from './DropdownMenu';

export default function Header() {
  const [isLogged] = useState(true); //Apenas para testar
  return (
    <header className="bg-neutral p-4 text-text border-b-[1px] border-muted flex justify-between">
      <LogoImage className="w-30 h-auto object-contain" />
      {isLogged && <DropdownMenu />}
    </header>
  );
}
