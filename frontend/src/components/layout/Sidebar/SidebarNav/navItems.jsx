import { ImHome } from 'react-icons/im';
import { MdGroups } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
export const navItems = [
  { icon: <ImHome />, label: 'Início', href: '/' },
  { icon: <MdGroups />, label: 'Grupos', href: '/groups' },
  { icon: <FaUser />, label: 'Perfil', href: '/profile' },
  {
    icon: <TbLogout2 />,
    label: 'Sair',
    href: '/login',
    className: 'text-red-500 font-bold',
  },
];
