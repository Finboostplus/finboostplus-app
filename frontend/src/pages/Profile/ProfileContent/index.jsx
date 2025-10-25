import { useState, useMemo, useEffect } from 'react';
import ButtonUI from '../../../components/ui/Button';
import InputUI from '../../../components/ui/Input';
import { BlockPicker } from 'react-color';
import { avatarBackgroundColors } from '../../../mockData/colorsPallete/colors';
import { Form } from 'react-router';
import { customToast } from '../../../components/CustomToast';
import { useLogout } from '../../../hooks/useLogout';
import useMeQuery from '../../../hooks/ReactQuery/useMeQuery';
import { useUpdateMeMutation } from '../../../hooks/ReactQuery/useUpdateMeMutation';
import { meDataSchema } from '../../../schemas/me/request';
import { FaLock, FaUnlock } from 'react-icons/fa';

export default function ProfileContent({ setIsModalOpen }) {
  const { data: user, isLoading } = useMeQuery();
  const updateMeMutation = useUpdateMeMutation();
  const logout = useLogout();

  const [userData, setUserData] = useState({
    name: '',
    email: { isLocked: true, value: '' },
    themeColor: '',
  });

  // Atualiza userData quando user chegar
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: { isLocked: true, value: user.email },
        themeColor: user.themeColor,
      });
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verifica se houve alterações
  const hasChanges = useMemo(() => {
    if (!user) return false;
    return (
      userData.name.trim() !== user.name.trim() ||
      userData.email.value.trim() !== user.email.trim() ||
      userData.themeColor !== user.themeColor
    );
  }, [userData, user]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!hasChanges) {
      customToast('', 'Nenhuma alteração detectada.', 'info');
      return;
    }

    const data = {
      name: userData.name.trim(),
      email: userData.email.value.trim(),
      themeColor: userData.themeColor,
    };

    const parsed = meDataSchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const title = meDataSchema.shape[fieldName]?.description || fieldName;
        customToast(title, issue.message, 'error');
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Usando mutateAsync para esperar o resultado
      await updateMeMutation.mutateAsync(data);
      customToast(
        'Perfil atualizado',
        'Perfil atualizado com sucesso!',
        'success'
      );

      // Se mudou o email, força logout
      if (userData.email.value !== user.email) {
        logout();
      }

      setIsModalOpen(false);
    } catch {
      customToast('Erro de atualização', 'Erro ao atualizar perfil', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Placeholder enquanto carrega user
  if (isLoading || !user) return <p>Carregando perfil...</p>;

  return (
    <div className="w-full max-w-md mx-auto">
      <Form
        onSubmit={handleSubmit}
        className="bg-transparent rounded-xl space-y-6"
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
            style={{ backgroundColor: userData.themeColor || '#999' }}
            className="w-24 h-24 rounded-full transition-[background] flex items-center justify-center font-bold text-white text-3xl shadow-md border select-none border-white/20 duration-300 hover:scale-105"
          >
            {userData.name[0]?.toUpperCase() || '?'}
          </div>

          <div className="w-full space-y-4">
            {/* Nome */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300">
                Nome de Usuário
              </label>
              <InputUI
                value={userData.name}
                placeholder="Seu nome"
                onChange={({ target: { value } }) =>
                  setUserData(old => ({ ...old, name: value }))
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300">
                E-mail
              </label>
              <div className="flex flex-1 gap-2">
                <InputUI
                  type="email"
                  className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  value={userData.email.value}
                  disabled={userData.email.isLocked}
                  placeholder="seuemail@exemplo.com"
                  onChange={({ target: { value } }) =>
                    setUserData(old => ({
                      ...old,
                      email: { ...old.email, value },
                    }))
                  }
                />
                <ButtonUI
                  type="button"
                  onClick={() =>
                    setUserData(old => ({
                      ...old,
                      email: { ...old.email, isLocked: !old.email.isLocked },
                    }))
                  }
                  title={
                    userData.email.isLocked
                      ? 'Desbloquear campo e-mail'
                      : 'Bloquear campo e-mail'
                  }
                  className="bg-primary text-white py-2 px-4 rounded-md cursor-pointer"
                >
                  {userData.email.isLocked ? <FaUnlock /> : <FaLock />}
                </ButtonUI>
              </div>
              {!userData.email.isLocked && (
                <span className="text-xs font-extrabold mt-1 flex justify-center text-red-400">
                  Por segurança, você precisará entrar novamente após atualizar
                  seu e-mail.
                </span>
              )}
            </div>

            {/* Cor do Avatar */}
            <div>
              <label className="text-sm font-medium text-text dark:text-gray-300 mb-2 block text-center">
                Cor do Avatar
              </label>
              <div className="w-full flex justify-center">
                <BlockPicker
                  triangle="hide"
                  width="100%"
                  colors={avatarBackgroundColors}
                  color={userData.themeColor}
                  onChangeComplete={({ hex }) =>
                    setUserData(old => ({ ...old, themeColor: hex }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-4 pt-6">
          <ButtonUI
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="py-2 px-5 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </ButtonUI>

          <ButtonUI
            type="submit"
            disabled={!hasChanges || isSubmitting}
            className={`py-2 px-5 rounded-md text-white transition-all duration-200 ${
              !hasChanges || isSubmitting
                ? 'bg-primary/60 cursor-not-allowed opacity-70'
                : 'bg-primary hover:bg-primary/90 cursor-pointer '
            }`}
          >
            {isSubmitting
              ? 'Salvando...'
              : !hasChanges
                ? 'Sem alterações'
                : 'Atualizar perfil'}
          </ButtonUI>
        </div>
      </Form>
    </div>
  );
}
