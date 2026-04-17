export const EXPENSE_STATUS = {
  PENDING: 'PENDENTE',
  UNPAID: 'NÃO PAGO',
  PAID: 'PAGO',
};

export const STATUS_COLORS = {
  PAID: {
    bg: 'bg-success text-green-900',
    text: 'text-green-500',
  },
  PENDING: {
    bg: 'bg-warning text-yellow-900',
    text: 'text-yellow-500',
  },
  UNPAID: {
    bg: 'bg-error text-red-900',
    text: 'text-red-500',
  },
  DEFAULT: {
    bg: 'text-text',
    text: 'text-text',
  },
};
