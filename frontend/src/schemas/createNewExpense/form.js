import { z } from 'zod';

export const createNewExpenseFormSchema = z.object({
  title:z.string().min(3),
  ExpenseValue:,
  category:,
  WhoPaid:
});
