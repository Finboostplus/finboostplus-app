import { createMockGroups } from './groups.data';
import { createDashboardData } from './dashboard.data';

const userId = 'user-luna';
const groups = createMockGroups(userId);

const userData = {
  id: userId,
  username: 'Luna Martins',
  email: 'luna.martins@galaxykids.com',
  color: '#ff69b4',
  groups,
};

userData.dashboard = createDashboardData(userData, groups);
userData.topCategory = getMostUsedCategory(groups);

export default userData;

// função auxiliar
function getMostUsedCategory(groups) {
  const categoryCount = {};
  groups.forEach(group => {
    group.recentExpenses.forEach(expense => {
      const category = expense.category || 'Sem Categoria';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
  });
  return Object.entries(categoryCount).reduce(
    (a, b) => (a[1] > b[1] ? a : b),
    []
  )[0];
}
