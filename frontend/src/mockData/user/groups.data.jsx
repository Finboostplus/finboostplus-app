import { FaGlassCheers, FaHeart, FaUsers, FaLaptopCode } from 'react-icons/fa';

export function createMockGroups(userId) {
  const groups = [
    {
      id: 'grp-bffs',
      name: 'BFFs da Escola 💖',
      ownerId: userId,
      createdAt: '2025-07-01T10:15:00',
      members: [
        { name: 'Luna Martins', color: '#ff69b4' },
        { name: 'Mel', color: '#9370DB' },
        { name: 'Bia', color: '#FFB6C1' },
      ],
      status: 45.0,
      totalBalance: 45.0,
      icon: <FaHeart className="text-pink-400" />,
      pendingDebts: [
        { id: 1, name: 'Mel', amount: 15.0, type: 'owes', to: 'Luna Martins' },
      ],
      recentExpenses: [
        {
          id: 'grp-bffs-exp-1',
          description: 'Ingresso - Show da Taylor Swift',
          amount: 390.0,
          date: 'Hoje',
          category: 'Entretenimento',
        },
      ],
    },
    {
      id: 'grp-creative',
      name: 'Estúdio Criativo 🎨',
      ownerId: 'user-jade',
      createdAt: '2025-06-20T14:30:00',
      members: [
        { name: 'Luna Martins', color: '#ff69b4' },
        { name: 'Noah', color: '#4682B4' },
        { name: 'Jade', color: '#8A2BE2' },
      ],
      status: 100.0,
      totalBalance: 100.0,
      icon: <FaLaptopCode className="text-indigo-500" />,
      pendingDebts: [
        { id: 2, name: 'Noah', amount: 50.0, type: 'owes', to: 'Jade' },
      ],
      recentExpenses: [
        {
          id: 'grp-creative-exp-1',
          description: 'Assinatura anual do Canva Pro',
          amount: 289.99,
          date: 'Ontem',
          category: 'Assinaturas',
        },
      ],
    },
    {
      id: 'grp-cafe',
      name: 'Mood Café ☕',
      ownerId: userId,
      createdAt: '2025-07-15T09:00:00',
      members: [
        { name: 'Luna Martins', color: '#ff69b4' },
        { name: 'Tati', color: '#D2691E' },
      ],
      status: 0.0,
      totalBalance: 0.0,
      icon: <FaGlassCheers className="text-yellow-600" />,
      pendingDebts: [],
      recentExpenses: [
        {
          id: 'grp-cafe-exp-1',
          description: 'Café especial + croissant',
          amount: 28.5,
          date: 'Há 2 dias',
          category: 'Alimentação',
        },
      ],
    },
    {
      id: 'grp-fam',
      name: 'Família Carvalho 🏡',
      ownerId: 'user-mae',
      createdAt: '2025-05-10T16:45:00',
      members: [
        { name: 'Luna Martins', color: '#ff69b4' },
        { name: 'Mãe', color: '#DA70D6' },
        { name: 'Papai', color: '#4169E1' },
        { name: 'Sofia', color: '#FFD700' },
      ],
      status: 0.0,
      totalBalance: 0.0,
      icon: <FaUsers className="text-violet-600" />,
      pendingDebts: [],
      recentExpenses: [
        {
          id: 'grp-fam-exp-1',
          description: 'Presente de aniversário - Sofia 🎁',
          amount: 150.0,
          date: 'Esta semana',
          category: 'Presentes',
        },
      ],
    },
  ];

  return groups.map(group => ({
    ...group,
    recentExpenses: group.recentExpenses.map(expense => ({
      ...expense,
      groupId: group.id,
    })),
    statusColor:
      group.status < 0
        ? 'text-error'
        : group.status === 0
          ? 'text-muted'
          : 'text-success',
  }));
}
