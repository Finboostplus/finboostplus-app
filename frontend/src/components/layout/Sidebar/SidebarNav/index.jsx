import { navItems } from './navItems';
import { useCurrentPage } from './useSidebarNav';

export default function SidebarNav() {
  const currentPage = useCurrentPage();
  return (
    <nav className="flex flex-col gap-4">
      {navItems.map(item => (
        <a
          className={`flex ${currentPage === item.href.replace('/', '') ? 'text-black' : 'text-gray-400'} items-center gap-2 ${item.className ?? ''}`}
          key={item.label}
          href={item.href}
        >
          {item.icon} {item.label}
        </a>
      ))}
    </nav>
  );
}
