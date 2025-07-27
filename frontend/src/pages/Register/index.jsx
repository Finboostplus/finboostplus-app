import RegisterForm from '../../components/forms/RegisterForm';
import CardUI from '../../components/ui/Card';

export default function Register() {
  return (
    <CardUI className="min-h-screen">
      <div className="flex flex-col items-start w-full max-w-4xl px-4 mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl text-text mb-8">
          Cadastre a sua conta
        </h1>

        <section className="w-full md:w-1/2">
          <RegisterForm />
        </section>
      </div>
    </CardUI>
  );
}
