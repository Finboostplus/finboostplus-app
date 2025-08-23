// src/routes/registerAction.js
import { redirect } from 'react-router';
import { registerUserFormSchema } from '../schemas/registerUser/form';
import userService from '../services/userService.js';
import { z } from 'zod';

export const registerAction = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const { success, error, data } = registerUserFormSchema.safeParse(formData);
  if (!success) {
    const errors = {};
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const title =
          registerUserFormSchema.shape[fieldName]?.description || fieldName;

        return (errors[fieldName] = {
          title,
          message: issue.message,
        });
      });
    } else {
      errors.global = 'Ocorreu um erro inesperado.';
    }

    return { success: false, errors, values: formData }; // Corrigido: adicionado success: false
  }
  /* Se não ocorreu nenhum erro */
  console.log(data);

  /* Integração com backend */
  try {
    console.log('Dados validados:', { ...data, password: '[HIDDEN]' });

    // Prepara dados para o backend (ajusta nomes dos campos)
    const backendData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      colorTheme: 'blue' // Valor padrão, pode ser configurável depois
    };

    // Chama o serviço para registrar usuário
    const response = await userService.registerUser(backendData);

    console.log('Usuário registrado com sucesso:', response);

    // Redireciona para login em caso de sucesso
    return redirect('/login?registered=true');

  } catch (apiError) {
    console.error('Erro na API de registro:', apiError);

    // Trata erros específicos do backend
    let errorMessage = apiError.message || 'Erro ao criar conta. Tente novamente';
    let errorField = 'global';

    if (errorMessage.includes('email já está cadastrado') ||
      errorMessage.includes('E-mail já cadastrado')) {
      errorField = 'email';
      errorMessage = 'Este email já está cadastrado no sistema';
    }

    return {
      success: false,
      errors: {
        [errorField]: {
          title: 'Erro no Cadastro',
          message: errorMessage
        }
      },
      values: formData
    };
  }
};
