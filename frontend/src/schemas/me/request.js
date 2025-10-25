import { z } from 'zod';

export const meDataSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome de usuário deve ter no máximo 30 caracteres' })
    .describe('Nome de usuário'),
  email: z.email('O formato do e-mail é inválido.').describe('E-mail'),
  themeColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
    message: 'Cor hexadecimal inválida',
  }),
});
