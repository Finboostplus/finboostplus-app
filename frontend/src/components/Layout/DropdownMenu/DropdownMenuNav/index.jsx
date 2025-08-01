import { Menu, MenuItem } from '@headlessui/react';
import { navItems } from './navItems';
import { useCurrentPage } from './useSidebarNav';

export default function DropdownMenuNav() {
  const currentPage = useCurrentPage();
  return (
    <Menu as="nav" className="flex flex-col gap-4">
      {navItems.map((item, index) => (
        <MenuItem key={index}>
          <a
            className={`flex ${currentPage === item.href.replace('/', '') ? 'text-black' : 'text-gray-400'} items-center gap-2 ${item.className ?? ''}`}
            key={item.label}
            href={item.href}
          >
            {item.icon} {item.label}
          </a>
        </MenuItem>
      ))}
    </Menu>
  );
}
