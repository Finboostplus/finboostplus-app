import { z } from 'zod';

export const loginUserFormSchema = z.object({
  email: z.email('O formato do e-mail é inválido.').describe('E-mail'),
  password: z
    .string({
      required_error: 'A senha é obrigatória.',
    })
    .describe('Senha'),
});
