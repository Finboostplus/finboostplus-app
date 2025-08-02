import * as z from 'zod';

export const registerUserFormSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres' })
      .max(50, { message: 'O nome completo deve ter no máximo 50 caracteres' }),
    email: z.email({ message: 'E-mail inválido' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'], // Aponta o erro para o campo correto
  });
