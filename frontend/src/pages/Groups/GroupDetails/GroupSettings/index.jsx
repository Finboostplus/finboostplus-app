import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import {
  FiArrowLeft,
  FiEdit3,
  FiFileText,
  FiSave,
  FiSettings,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';

import InputUI from '../../../../components/ui/Input';
import TextareaUI from '../../../../components/ui/Textarea';
import ButtonUI from '../../../../components/ui/Button';
import Modal from '../../../../components/Modal';
import { MembersManager } from './MembersManager';
import { useGroupByIdQuery } from '../../../../hooks/ReactQuery/Queries/useGroupsQuery';
import { useUpdateGroupMutation } from '../../../../hooks/ReactQuery/Mutations/useUpdateGroupMutation';
import { CategoryIcon } from '../../../../mockData/groupIcons/icons';

export default function GroupSettings() {
  const { group_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const { data: group, isLoading } = useGroupByIdQuery(group_id);
  const { mutateAsync: updateGroup, isPending } = useUpdateGroupMutation();

  // Inicializa os campos com os valores do grupo
  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description);
      setIsChanged(false); // Inicialmente não há alterações
    }
  }, [group]);

  // Atualiza o estado de alteração
  useEffect(() => {
    if (!group) return;
    const changed =
      name.trim() !== group.name || description.trim() !== group.description;
    setIsChanged(changed && name.trim() !== '');
  }, [name, description, group]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isChanged) return; // Segurança extra

    try {
      await updateGroup({
        group_id,
        data: { name: name.trim(), description: description.trim() },
      });
      setIsChanged(false); // Reset após salvar
    } catch (error) {
      console.error('Erro ao atualizar grupo:', error);
    }
  };

  if (isLoading || !group) {
    return (
      <div className="flex justify-center items-center h-screen text-muted">
        Carregando informações do grupo...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-6 sm:p-10 font-principal">
      <main className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 space-y-10  transition-all duration-300">
        {/* Cabeçalho */}
        <header className="relative text-center pb-6 border-b border-white/20">
          <div className="absolute inset-0 blur-2xl rounded-3xl" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="p-5  text-primary rounded-full">
              <CategoryIcon categoryKey={group?.icon} className="w-15 h-15" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Configurações de{' '}
              <span className="text-primary">{group.name}</span>
            </h1>
            <p className="text-muted text-sm max-sm:text-base">
              Defina as permissões, ajuste as regras e tenha controle total
              sobre seu grupo.
            </p>
          </div>
        </header>

        {/* Formulário principal */}
        <form onSubmit={handleSubmit} className="space-y-10" autoComplete="off">
          {/* Informações básicas */}
          <section className="bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm  transition-all duration-300">
            <FieldSection
              id="groupName"
              label="Nome do grupo"
              icon={<FiEdit3 className="text-primary" />}
            >
              <InputUI
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite um novo nome"
                className="transition-all focus:ring-2 focus:ring-primary/40 rounded-xl  focus:shadow-md"
              />
            </FieldSection>

            <FieldSection
              id="groupDescription"
              label="Descrição do grupo"
              icon={<FiFileText className="text-primary" />}
            >
              <TextareaUI
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Adicione uma breve descrição..."
                className="w-full min-h-[100px] rounded-lg border border-border bg-background px-3 py-2 text-text  transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-muted resize-none focus:shadow-md"
              />
            </FieldSection>
          </section>

          {/* Gerenciamento de membros */}
          <section className="bg-linear-to-tr from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm  transition-all flex flex-col items-center gap-4">
            <FiUsers className="w-12 h-12 text-primary mb-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-text">
              Gerenciar membros
            </h2>
            <p className="text-muted text-sm max-w-md">
              Adicione, remova ou altere permissões dos membros do grupo.
            </p>
            <ButtonUI
              onClick={() => setIsOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 mt-4 px-5 py-3 rounded-xl bg-linear-to-tr from-primary/70 to-primary/50 text-white hover:from-primary/80 hover:to-primary/60 hover:scale-[1.03] transition-all "
            >
              <FiUserPlus className="w-5 h-5" />
              Abrir Gerenciador
            </ButtonUI>

            <Modal
              isOpen={isOpen}
              fnClose={() => setIsOpen(false)}
              setIsOpen={setIsOpen}
              autoCloseOnSuccess={false}
            >
              <MembersManager group={group} />
            </Modal>
          </section>

          {/* Botões */}
          <footer className="flex flex-col sm:flex-row gap-3 justify-evenly pt-6">
            <Link
              to={`/groups/${group_id}`}
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-500/80 text-white hover:bg-neutral-600 transition-all hover:scale-[1.02] "
            >
              <FiArrowLeft className="text-lg" />
              Voltar
            </Link>

            <ButtonUI
              type="submit"
              disabled={!isChanged || isPending}
              title={
                !isChanged
                  ? 'Sem alterações ou nome do grupo vazio'
                  : 'Salvar alterações'
              }
              className={`
                flex-1 disabled:hover:scale-none disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-primary/70 to-primary/50 text-white hover:from-primary/80 hover:to-primary/60 hover:scale-[1.03]  transition-all disabled:opacity-60
                ${!isChanged && 'disabled:from-muted/70 disabled:to-muted/70'}
                `}
            >
              <FiSave className="w-5 h-5 sm:w-6 sm:h-6" />
              {isPending ? 'Salvando...' : 'Salvar'}
            </ButtonUI>
          </footer>
        </form>
      </main>
    </div>
  );
}

/* ---------- SUBCOMPONENTES ---------- */
function FieldSection({ id, label, icon, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-semibold text-base text-text"
      >
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
