import { FaGlassCheers, FaHeart, FaUsers, FaLaptopCode } from 'react-icons/fa';

export default [
  {
    id: 'grp-bffs',
    name: 'BFFs da Escola 💖',
    members: [
      { name: 'Luna Martins', color: '#ff69b4' },
      { name: 'Mel', color: '#9370DB' },
      { name: 'Bia', color: '#FFB6C1' },
    ],
    status: 'Saldo: R$ 45,00',
    statusColor: 'text-green-600',
    icon: <FaHeart className="text-pink-400" />,
    totalBalance: 45.0,
    pendingDebts: [
      { id: 1, name: 'Mel', amount: 15.0, type: 'owes', to: 'Luna Martins' },
    ],
    recentExpenses: [
      {
        id: 'grp-bffs-exp-1',
        description: 'Ingresso - Show da Taylor Swift',
        amount: 390.0,
        date: 'Hoje',
      },
    ],
  },
  {
    id: 'grp-creative',
    name: 'Estúdio Criativo 🎨',
    members: [
      { name: 'Luna Martins', color: '#ff69b4' },
      { name: 'Noah', color: '#4682B4' },
      { name: 'Jade', color: '#8A2BE2' },
    ],
    status: 'Saldo: R$ 100,00',
    statusColor: 'text-blue-600',
    icon: <FaLaptopCode className="text-indigo-500" />,
    totalBalance: 100.0,
    pendingDebts: [
      { id: 2, name: 'Noah', amount: 50.0, type: 'owes', to: 'Jade' },
    ],
    recentExpenses: [
      {
        id: 'grp-creative-exp-1',
        description: 'Assinatura anual do Canva Pro',
        amount: 289.99,
        date: 'Ontem',
      },
    ],
  },
  {
    id: 'grp-cafe',
    name: 'Mood Café ☕',
    members: [
      { name: 'Luna Martins', color: '#ff69b4' },
      { name: 'Tati', color: '#D2691E' },
    ],
    status: 'Sem pendências',
    statusColor: 'text-gray-500',
    icon: <FaGlassCheers className="text-yellow-600" />,
    totalBalance: 0.0,
    pendingDebts: [],
    recentExpenses: [
      {
        id: 'grp-cafe-exp-1',
        description: 'Café especial + croissant',
        amount: 28.5,
        date: 'Há 2 dias',
      },
    ],
  },
  {
    id: 'grp-fam',
    name: 'Família Carvalho 🏡',
    members: [
      { name: 'Luna Martins', color: '#ff69b4' },
      { name: 'Mãe', color: '#DA70D6' },
      { name: 'Papai', color: '#4169E1' },
      { name: 'Sofia', color: '#FFD700' },
    ],
    status: 'Saldo: R$ 0,00',
    statusColor: 'text-gray-500',
    icon: <FaUsers className="text-violet-600" />,
    totalBalance: 0.0,
    pendingDebts: [],
    recentExpenses: [
      {
        id: 'grp-fam-exp-1',
        description: 'Presente de aniversário - Sofia 🎁',
        amount: 150.0,
        date: 'Esta semana',
      },
    ],
  },
];
