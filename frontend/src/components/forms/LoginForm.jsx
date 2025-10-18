import { Form, useActionData } from 'react-router';
import Button from '../ui/Button';
import InputUI from '../ui/Input';
import { Menu, MenuItem } from '@headlessui/react';
import { useEffect } from 'react';
import { customToast } from '../CustomToast';
import { useAuthStore } from '../../context/store/auth';

export default function LoginForm() {
  const isLoading = useAuthStore(state => state.isLoading);
  const actionData = useActionData();
  const values = actionData?.values || {};

  useEffect(() => {
    if (!actionData) return;

    if (actionData.errors) {
      /* Validação dos erros do formulário */
      Object.values(actionData.errors).forEach(err => {
        const title = err?.title ?? 'Erro';
        const message = err?.message ?? 'Ocorreu um erro inesperado.';
        customToast(title, message, 'error');
      });
      return;
    }
  }, [actionData]);

  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-surface p-6 rounded-2xl shadow-md border border-neutral transition-colors"
        aria-label="Formulário de login"
      >
        {/* Email */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <InputUI
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email || ''}
            placeholder="Digite seu email"
            required
            disabled={isLoading}
            className="w-full h-11 rounded-xl border border-muted px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition disabled:opacity-60"
          />
        </div>

        {/* Senha */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Senha
          </label>
          <InputUI
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue={values.password || ''}
            placeholder="Digite sua senha"
            required
            disabled={isLoading}
            className="w-full h-11 rounded-xl border border-muted px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition disabled:opacity-60"
          />
        </div>

        {/* Botão */}
        <Button
          title={isLoading ? 'Entrando...' : 'Entrar'}
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            isLoading
              ? 'bg-muted text-text cursor-not-allowed'
              : 'bg-primary text-white hover:bg-secondary'
          }`}
        />

        <input type="hidden" name="type" value="login" />

        <hr className="w-full border-t border-neutral mt-2" />
      </Form>

      <Menu as="div">
        <p className="mt-6 text-sm text-text text-center">
          Primeiro acesso?
          <MenuItem>
            <a
              href="/register"
              className="text-primary hover:underline font-semibold"
              aria-label="Ir para a tela de registro"
            >
              <strong className="ml-1">Crie sua conta</strong>
            </a>
          </MenuItem>
        </p>
      </Menu>
    </section>
  );
}
