import LoginForm from '../../components/forms/LoginForm';
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
