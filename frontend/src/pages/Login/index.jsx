import { Switch } from '@headlessui/react';
import LoginForm from '../../components/forms/LoginForm';
import ButtonUI from '../../components/ui/Button';
import LogoImage from '../../components/Logo';
import RegisterForm from '../../components/forms/RegisterForm';
import CardUI from '../../components/ui/Card';

export default function Login() {
  return (
    <CardUI className="bg-neutral min-h-screen">
      <div className="flex flex-col items-start w-full max-w-4xl px-4 mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl text-text mb-8">
          Crie a sua conta
        </h1>

        <section className="w-full md:w-1/2">
          <LoginForm />
        </section>
      </div>
    </CardUI>
  );
}

const login = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral">
      <section
        className="bg-white border shadow-md rounded-lg p-6 w-full max-w-md 
                 max-md:rounded-none max-md:border-0 max-md:shadow-none max-md:min-h-screen max-md:p-4 max-md:w-full"
        aria-labelledby="auth-title"
      >
        <header className="text-center" role="banner">
          <figure className="flex flex-col items-center">
            <LogoImage className="h-16 w-auto" />
            <figcaption className="sr-only">Finboostplus</figcaption>
          </figure>
          <p className="text-sm text-gray-500" aria-label="Slogan">
            Gerencie suas finanças com inteligência
          </p>
        </header>

        {/* Toggle entre Login e Cadastro */}
        <fieldset className="flex items-center justify-center gap-2 my-4">
          <legend className="sr-only">Alternar entre login e cadastro</legend>

          <span
            className={`${!enabled ? 'text-gray-700' : 'text-gray-300'} text-sm`}
            id="auth-label-login"
          >
            Login
          </span>

          <Switch
            id="toggle-auth"
            checked={enabled}
            onChange={setEnabled}
            role="switch"
            aria-checked={enabled}
            aria-labelledby="auth-label-login auth-label-register"
            className={`group inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer
            ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
              ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </Switch>

          <span
            className={`${enabled ? 'text-gray-700' : 'text-gray-300'} text-sm`}
            id="auth-label-register"
          >
            Cadastro
          </span>
        </fieldset>

        {/* Formulário */}
        <div className="mb-6">{enabled ? <RegisterForm /> : <LoginForm />}</div>

        {/* Divider */}
        <hr className="my-4" aria-hidden="true" />

        <p className="text-center text-sm text-gray-500 mb-3">
          Ou continue com
        </p>

        {/* Botões sociais */}
        <div className="flex justify-center gap-4">
          <ButtonUI
            title={'Google'}
            aria-label="Entrar com Google"
            className="rounded cursor-pointer bg-sky-600 w-[100px] px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 transition"
          />
          <ButtonUI
            title={'Apple'}
            aria-label="Entrar com Apple"
            className="rounded cursor-pointer bg-sky-600 w-[100px] px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 transition"
          />
        </div>
      </section>
    </main>
  );
};
