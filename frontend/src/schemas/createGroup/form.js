import { z } from 'zod';

export const createGroupFormSchema = z.object({
  name: z.string().min(3, 'O nome do grupo deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
});
