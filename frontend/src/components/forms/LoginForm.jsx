import { Form } from 'react-router';
import Button from '../ui/Button';
import InputUI from '../ui/Input';
import { Menu, MenuItem } from '@headlessui/react';
export default function LoginForm() {
  return (
    <section className="w-full max-w-md mx-auto">
      <Form
        method="post"
        className="w-full flex flex-col items-center gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
        aria-label="Formulário de login"
      >
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <InputUI
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Senha
          </label>
          <InputUI
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            required
            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <Button
          title="Entrar"
          type="submit"
          className="w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors"
        />

        <input type="hidden" name="type" value="login" />

        <hr className="w-full border-t border-gray-200 mt-2" />
        <Menu as={'div'}>
          <MenuItem>
            <a
              href="/register"
              className="text-sm text-primary hover:underline"
            >
              Já possui uma conta?
            </a>
          </MenuItem>
        </Menu>
      </Form>
    </section>
  );
}
