import chartsData from './charts/charts.data';

function getAllRecentExpenses(groups) {
  return groups.flatMap(group => group.recentExpenses || []);
}

export function createDashboardData(userData) {
  const groups = userData.groups;

  return {
    totalBalance: 312.4, // você pode calcular com base nos grupos se quiser
    totalMonthlySpent: 428.9, // idem
    recentExpenses: getAllRecentExpenses(groups),
    chartsData,
  };
}

/* 

[
    {
      description: 'Ingresso - Show da Taylor Swift',
      amount: 390.0,
      date: 'Hoje',
      group: 'BFFs da Escola',
      groupId: 'grp-bffs',
    },
    {
      description: 'Assinatura anual do Canva Pro',
      amount: 289.99,
      date: 'Ontem',
      group: 'Estúdio Criativo',
      groupId: 'grp-creative',
    },
    {
      description: 'Café especial + croissant',
      amount: 28.5,
      date: 'Há 2 dias',
      group: 'Mood Café',
      groupId: 'grp-cafe',
    },
    {
      description: 'Presente de aniversário - Sofia',
      amount: 150.0,
      date: 'Esta semana',
      group: 'Família Carvalho',
      groupId: 'grp-fam',
    },
  ]

*/
