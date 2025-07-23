// src/data/mockGroups.js
export const mockGroups = [
  {
    id: 'grp-001', // Adicione um ID único para cada grupo
    name: 'Casal - Marina & João',
    members: ['Marina', 'João'], // Nomes completos para membros
    status: 'Você deve: R$ 47,50',
    statusColor: 'text-red-600',
    icon: '👫', // Usando um emoji mais genérico para casal
    // Dados específicos para a tela de detalhes:
    totalBalance: 'R$ 1.247,30',
    pendingDebts: [
      {
        id: 1,
        name: 'Marina',
        amount: 'R$ 47,50',
        type: 'owesYou',
        to: 'João',
      },
    ],
    youOwe: [
      { id: 1, name: 'João', amount: 'R$ 47,50', type: 'youOwe', to: 'Marina' },
    ],
    recentExpenses: [
      {
        id: 1,
        description: 'Jantar no Restaurante Italiano',
        amount: 'R$ 47,50',
      },
      { id: 2, description: 'Cinema com pipoca', amount: 'R$ 60,00' },
    ],
  },
  {
    id: 'grp-002',
    name: 'Família Silva',
    members: ['Pai', 'Mãe', 'Filho 1', 'Filha 1'],
    status: 'Você recebe: R$ 25,00',
    statusColor: 'text-green-600',
    icon: '🏡', // Usando um emoji mais genérico
    totalBalance: 'R$ 525,00',
    pendingDebts: [
      {
        id: 1,
        name: 'Filho 1',
        amount: 'R$ 25,00',
        type: 'owesYou',
        to: 'Você',
      },
    ],
    youOwe: [],
    recentExpenses: [
      { id: 1, description: 'Mercado Semanal', amount: 'R$ 320,00' },
      { id: 2, description: 'Passeio no Parque', amount: 'R$ 80,00' },
    ],
  },
  {
    id: 'grp-003',
    name: 'Apartamento Compartilhado',
    members: ['Lucas', 'Ana', 'Pedro', 'Julia', 'Carlos'],
    status: 'Sem pendências',
    statusColor: 'text-gray-500',
    icon: '🏠',
    totalBalance: 'R$ 0,00',
    pendingDebts: [],
    youOwe: [],
    recentExpenses: [
      { id: 1, description: 'Conta de Luz', amount: 'R$ 150,00' },
      { id: 2, description: 'Internet Mensal', amount: 'R$ 90,00' },
      { id: 3, description: 'Produtos de Limpeza', amount: 'R$ 45,00' },
    ],
  },
];
