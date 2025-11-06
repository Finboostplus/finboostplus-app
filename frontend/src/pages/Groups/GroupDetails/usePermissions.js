import { hasPermission } from '../../../utils/constants';

export function usePermissions(role) {
  if (!role) {
    return {
      canViewOwnExpenses: false,
      canViewAllExpenses: false,
      canCreateExpenses: false,
      canEditExpenses: false,
      canEditExpenseValue: false,
      canDeleteExpenses: false,
      canManageMembers: false,
      canEditGroupInfo: false,
      canDeleteGroup: false,
      canGenerateReports: false,
    };
  }

  return {
    canViewOwnExpenses: hasPermission(role, 'VIEW_OWN_EXPENSES'),
    canViewAllExpenses: hasPermission(role, 'VIEW_ALL_EXPENSES'),
    canCreateExpenses: hasPermission(role, 'CREATE_EXPENSES'),
    canEditExpenses: hasPermission(role, 'EDIT_EXPENSES'),
    canEditExpenseValue: hasPermission(role, 'EDIT_EXPENSE_VALUE'),
    canDeleteExpenses: hasPermission(role, 'DELETE_EXPENSES'),
    canManageMembers: hasPermission(role, 'MANAGE_MEMBERS'),
    canEditGroupInfo: hasPermission(role, 'EDIT_GROUP_INFO'),
    canDeleteGroup: hasPermission(role, 'DELETE_GROUP'),
    canGenerateReports: hasPermission(role, 'GENERATE_REPORTS'),
  };
}
