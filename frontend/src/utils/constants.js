const ROLES = {
  user: 'USER',
  admin: 'ADMIN',
  owner: 'OWNER',
};

const PERMISSIONS = {
  // 🧾 Despesas
  VIEW_OWN_EXPENSES: [ROLES.user, ROLES.admin, ROLES.owner],
  VIEW_ALL_EXPENSES: [ROLES.admin, ROLES.owner],
  EDIT_EXPENSES: [ROLES.admin, ROLES.owner],
  EDIT_EXPENSE_VALUE: [ROLES.owner],
  DELETE_EXPENSES: [ROLES.admin, ROLES.owner],
  CREATE_EXPENSES: [ROLES.admin, ROLES.owner],

  // 👥 Membros
  MANAGE_MEMBERS: [ROLES.admin, ROLES.owner],

  // 🏠 Grupo
  EDIT_GROUP_INFO: [ROLES.owner],
  DELETE_GROUP: [ROLES.owner],

  // 📊 Extras
  GENERATE_REPORTS: [ROLES.owner],
};

export function hasPermission(role, action) {
  return PERMISSIONS[action].includes(role);
}
