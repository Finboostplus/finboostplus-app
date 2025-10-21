import { useEffect } from 'react';
import { Form, useActionData } from 'react-router';
import InputUI from '../ui/Input';
import ButtonUI from '../ui/Button';
import CheckboxUI from '../ui/Checkbox';
import { customToast } from '../CustomToast';
import { useAuthStore } from '../../context/stores/auth';

export default function RegisterForm() {
  const isLoading = useAuthStore(state => state.isLoading);
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const values = actionData?.values || {};

  // Mostra os erros e sucessos via toast
  useEffect(() => {
    if (!actionData) return;

    if (actionData.errors) {
      Object.values(actionData.errors).forEach(err => {
        const title = err?.title ?? 'Erro';
        const message = err?.message ?? 'Ocorreu um erro inesperado.';
        customToast(title, message, 'error');
      });
      return;
    }
  }, [actionData]);

  const fields = [
    {
      id: 'name',
      label: 'Nome completo',
      type: 'text',
      placeholder: 'Digite seu nome completo',
      autoComplete: 'name',
      name: 'name',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Digite seu email',
      autoComplete: 'email',
      name: 'email',
    },
    {
      id: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha',
      autoComplete: 'new-password',
      name: 'password',
    },
    {
      id: 'confirmPassword',
      label: 'Confirmar senha',
      type: 'password',
      placeholder: 'Confirme sua senha',
      autoComplete: 'new-password',
      name: 'confirmPassword',
    },
  ];

  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-surface p-6 rounded-2xl shadow-md border border-neutral transition-colors"
        aria-label="Formulário de cadastro"
      >
        {/* Campos de input */}
        {fields.map(({ id, label, type, placeholder, autoComplete }) => (
          <div key={id} className="w-full flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-text">
              {label}
            </label>
            <InputUI
              id={id}
              name={id}
              type={type}
              required
              defaultValue={values[id] || ''}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={`w-full h-11 rounded-xl border px-4 text-sm text-text placeholder:text-muted 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition 
                ${errors[id] ? 'border-error' : 'border-muted'}`}
              disabled={isLoading}
            />
          </div>
        ))}

        {/* Checkbox */}
        <div className="w-full flex items-center justify-center">
          <CheckboxUI
            id="terms"
            name="terms"
            defaultChecked={values.terms || false}
            className="mt-1 h-4 w-8 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-text">
            Aceitar os termos de uso e política de privacidade
          </label>
        </div>

        {/* Botão submit */}
        <ButtonUI
          title={isLoading ? 'Cadastrando...' : 'Cadastrar'}
          type="submit"
          disabled={isLoading}
          className="w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </Form>

      {/* Link para login */}
      <p className="mt-6 text-sm text-text text-center">
        Já tem uma conta?{' '}
        <a
          href="/login"
          className="text-primary hover:underline font-semibold"
          aria-label="Voltar para a tela de login"
        >
          Faça login
        </a>
      </p>
    </section>
  );
}
