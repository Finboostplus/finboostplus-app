import { ImHome } from 'react-icons/im';
import { MdGroups } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
export const navItems = [
  {
    icon: <ImHome className="text-base" />,
    label: 'Início',
    href: '/',
  },
  {
    icon: <MdGroups className="text-base" />,
    label: 'Grupos',
    href: '/groups',
  },
  {
    icon: <FaUser className="text-base" />,
    label: 'Perfil',
    href: '/profile',
  },
  {
    icon: <TbLogout2 className="text-base" />,
    label: 'Sair',
    href: '/login',
    isDanger: true, // <-- facilita aplicar estilo de "erro" no menu
  },
];
