import { navItems } from './navItems';

export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-4">
      {navItems.map(item => (
        <a
          className={`flex items-center gap-2 ${item.className ?? ''}`}
          key={item.label}
          href={item.href}
        >
          {item.icon} {item.label}
        </a>
      ))}
    </nav>
  );
}
