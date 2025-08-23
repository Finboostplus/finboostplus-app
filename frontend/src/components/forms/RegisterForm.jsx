import { Menu, MenuItem } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import CheckboxUI from '../ui/Checkbox';
import { customToast } from '../CustomToast';

export default function RegisterForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  // Estados para loading
  const isSubmitting = navigation.state === 'submitting';
  const [isLoading, setIsLoading] = useState(false);

  // Mostra os erros via toast APENAS se realmente houve erro na última tentativa
  useEffect(() => {
    // Só mostra erros se:
    // 1. Existem erros no actionData
    // 2. O actionData indica explicitamente que houve falha (success: false)
    // 3. Não estamos em processo de submissão (para evitar mostrar erros antigos)
    if (actionData?.errors && actionData?.success === false && !isSubmitting) {
      console.log('Erros recebidos:', errors);
      Object.values(actionData.errors).forEach(({ title, message }) => {
        customToast(title, message, 'error');
      });
    }
  }, [actionData, isSubmitting]);

  // Controla estado de loading
  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting]);

  const fields = [
    {
      id: 'fullName',
      name: 'fullName',
      label: 'Nome completo',
      type: 'text',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
    },
    {
      id: 'password',
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      label: 'Confirmar senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
    },
  ];

  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-surface p-6 rounded-2xl shadow-md border border-neutral transition-colors"
        aria-label="Formulário de cadastro"
      >
        {fields.map(({ id, label, type, placeholder }) => (
          <div key={id} className="w-full flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-text">
              {label}
            </label>
            <InputUI
              id={id}
              name={id}
              type={type}
              required
              disabled={isLoading}
              defaultValue={values[id] || ''}
              placeholder={placeholder}
              className={`w-full h-11 rounded-xl border px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${
                errors[id] ? 'border-error' : 'border-muted'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {/* Mostra erro específico do campo abaixo do input */}
            {errors[id] && (
              <span className="text-xs text-error mt-1">
                {errors[id].message}
              </span>
            )}
          </div>
        ))}

        <div className="w-full flex items-start gap-2">
          <CheckboxUI
            type="checkbox"
            id="terms"
            name="terms"
            disabled={isLoading}
            defaultChecked={values.terms || false}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="terms"
            className={`text-sm text-text ${isLoading ? 'opacity-50' : ''}`}
          >
            Aceitar os termos de uso e política de privacidade
          </label>
        </div>

        {/* Mostra erro geral se existir */}
        {errors.general && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">
              {errors.general.message}
            </p>
          </div>
        )}

        <ButtonUI
          title={isLoading ? 'Cadastrando...' : 'Cadastrar'}
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-xl text-white text-sm font-semibold transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-secondary'
          }`}
        />

        {/* Indicador visual de loading */}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Criando sua conta...
          </div>
        )}
      </Form>

      <Menu as="div">
        <p className="mt-6 text-sm text-text text-center">
          Já tem uma conta?{' '}
          <MenuItem>
            <a
              href="/login"
              className="text-primary hover:underline font-semibold"
              aria-label="Voltar para a tela de login"
            >
              Faça login
            </a>
          </MenuItem>
        </p>
      </Menu>
    </section>
  );
}