import { z } from 'zod';

export const loginUserFormSchema = z.object({
  email: z.email('E-mail inválido').describe('E-mail'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .describe('Senha'),
});
