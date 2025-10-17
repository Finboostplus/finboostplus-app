import { useState } from 'react';
import ButtonUI from '../../../components/ui/Button';
import InputUI from '../../../components/ui/Input';
import { BlockPicker } from 'react-color';
import { avatarBackgroundColors } from '../../../mockData/colorsPallete/colors';
import { Form } from 'react-router';
import { customToast } from '../../../components/CustomToast';

export default function ProfileContent({ current_user, setIsModalOpen }) {
  const [userData, setUserData] = useState({
    username: current_user.username,
    email: current_user.email,
    color: current_user.color,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (!userData.username.trim() || !userData.email.trim()) {
      customToast('', 'Por favor, preencha todos os campos.', 'warning');
      return;
    }

    setIsSubmitting(true);
    console.log('Dados enviados:', userData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="  w-full max-w-md mx-auto">
      <Form
        onSubmit={handleSubmit}
        className="bg-transparent  rounded-xl space-y-6"
      >
        {/* Título */}
        <div>
          <h2 className="text-2xl font-bold text-center md:text-left">
            Editar perfil
          </h2>
          <p className="text-sm text-muted dark:text-muted-dark mt-1">
            Atualize suas informações pessoais e personalize seu avatar.
          </p>
        </div>

        {/* Avatar + Inputs */}
        <div className="flex flex-col items-center gap-6">
          {/* Avatar Preview */}
          <div
            style={{ backgroundColor: userData.color }}
            className="w-24 h-24 rounded-full transition-[background] flex items-center justify-center font-bold text-white text-3xl shadow-lg border border-white/20  duration-300 hover:scale-105"
          >
            {userData.username[0]?.toUpperCase() || '?'}
          </div>

          <div className="w-full space-y-4">
            {/* Nome de Usuário */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300">
                Nome de Usuário
              </label>
              <InputUI
                defaultValue={userData.username}
                placeholder="Seu nome"
                onBlur={({ target: { value } }) =>
                  setUserData(old => ({
                    ...old,
                    username: value.trim() || current_user.username,
                  }))
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300">
                E-mail
              </label>
              <InputUI
                type="email"
                defaultValue={userData.email}
                placeholder="seuemail@exemplo.com"
                onBlur={({ target: { value } }) =>
                  setUserData(old => ({ ...old, email: value.trim() }))
                }
              />
            </div>

            {/* Seleção de cor */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300 mb-2 block text-center">
                Cor do Avatar
              </label>
              <div className="w-full flex justify-center">
                <BlockPicker
                  triangle="hide"
                  width="100%"
                  colors={avatarBackgroundColors}
                  color={userData.color}
                  onChangeComplete={({ hex }) =>
                    setUserData(old => ({ ...old, color: hex }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-4 pt-6">
          <ButtonUI
            type="button"
            fnClick={() => setIsModalOpen(false)}
            title="Cancelar"
            className="py-2 px-5 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-all duration-200 cursor-pointer"
          />
          <ButtonUI
            type="submit"
            title={isSubmitting ? 'Salvando...' : 'Atualizar perfil'}
            disabled={isSubmitting}
            className={`py-2 px-5 rounded-md text-white transition-all duration-200 cursor-pointer ${
              isSubmitting
                ? 'bg-primary/60 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          />
        </div>
      </Form>
    </div>
  );
}
