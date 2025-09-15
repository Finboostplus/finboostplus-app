import { z } from 'zod';

export const registerUserFormSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres' })
      .max(30, { message: 'O nome completo deve ter no máximo 30 caracteres' })
      .describe('Nome completo'),
    email: z.email({ message: 'E-mail inválido' }).describe('E-mail'),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .describe('Senha'),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirme sua senha' })
      .describe('Confirmar senha'),
    terms: z
      .literal('on', { error: 'Você deve aceitar os termos' })
      .transform(val => val === 'on')
      .describe('Termos de uso'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.custom,
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      });
    }
  });
