import Button from '../ui/Button';
import InputUI from '../ui/Input';
export default function LoginForm() {
  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={e => {
        e.preventDefault();
      }}
      aria-label="Formulário de login"
    >
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <InputUI
          id={'email'}
          name={'email'}
          placeholder={'Digite seu email'}
          required={true}
          className={'w-full h-10 rounded-[10px] border-2 border-gray-400 px-3'}
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </label>
        <InputUI
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          className="w-full h-10 rounded-[10px] border-2 border-gray-400 px-3"
          required
        />
      </div>

      {/* Botão de envio, opcionalmente com aria-label se o texto não for claro */}

      <Button
        title={'Entrar'}
        className={
          'mt-2 w-full cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
        }
      />
    </form>
  );
}
