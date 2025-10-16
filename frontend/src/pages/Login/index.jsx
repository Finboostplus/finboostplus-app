import { useCookies } from 'react-cookie';
import LoginForm from '../../components/forms/LoginForm';
import CardUI from '../../components/ui/Card';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);

  useEffect(() => {
    if (typeof cookies.access_token !== 'undefined') {
      navigate('/', { replace: true });
    }
  }, [cookies.access_token, navigate]);
  return (
    <CardUI className="bg-neutral min-h-screen">
      <div className="flex flex-col items-start w-full max-w-4xl px-4 mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl text-text mb-8">
          Acesse sua conta
        </h1>

        <section className="w-full md:w-1/2">
          <LoginForm />
        </section>
      </div>
    </CardUI>
  );
}
