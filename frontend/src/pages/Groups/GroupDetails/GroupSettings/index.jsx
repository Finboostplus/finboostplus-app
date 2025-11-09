import { useState } from 'react';
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

export default function GroupSettings() {
  const { group_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // Query que busca o grupo pelo ID
  const { data: group, isLoading } = useGroupByIdQuery(group_id);

  // Mutation para atualizar o grupo
  const { mutateAsync: updateGroup, isPending } = useUpdateGroupMutation();

  // Handler de envio do formulário
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    try {
      await updateGroup({ group_id, data: payload });
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
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-background to-surface flex justify-center items-start p-6 sm:p-10 font-principal">
      <main className="w-full max-w-3xl bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-10 text-text transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)]">
        {/* Cabeçalho */}
        <header className="relative text-center pb-6 border-b border-white/10">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent blur-2xl rounded-3xl" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="p-4 bg-primary/20 text-primary rounded-full ring-2 ring-primary/50 shadow-md">
              <FiSettings className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Configurações de{' '}
              <span className="text-primary">{group.name}</span>
            </h1>
            <p className="text-muted text-sm sm:text-base">
              Gerencie o grupo e seus membros com estilo 😎
            </p>
          </div>
        </header>

        {/* Formulário principal */}
        <form onSubmit={handleSubmit} className="space-y-10" autoComplete="off">
          {/* Informações básicas */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm hover:bg-white/10 transition-all">
            <FieldSection
              id="groupName"
              label="Nome do grupo"
              icon={<FiEdit3 className="text-primary" />}
            >
              <InputUI
                name="name"
                defaultValue={group.name}
                placeholder="Digite um novo nome para o grupo"
                className="transition-all focus:ring-2 focus:ring-primary/40 rounded-xl"
              />
            </FieldSection>

            <FieldSection
              id="groupDescription"
              label="Descrição do grupo"
              icon={<FiFileText className="text-primary" />}
            >
              <TextareaUI
                name="description"
                defaultValue={group.description}
                rows={4}
                placeholder="Adicione uma breve descrição..."
                className="w-full min-h-[100px] rounded-lg border border-border bg-background px-3 py-2 text-text shadow-sm transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-muted resize-none"
              />
            </FieldSection>
          </section>

          {/* Acesso ao Gerenciamento de Membros */}
          <section className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-all flex flex-col items-center gap-4">
            <FiUsers className="w-12 h-12 text-primary mb-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-text">
              Gerenciar membros do grupo
            </h2>
            <p className="text-muted text-sm max-w-md">
              Adicione, remova ou altere as permissões dos membros do seu grupo.
            </p>
            <ButtonUI
              onClick={() => setIsOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 mt-4 px-5 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 hover:scale-[1.03] transition-all shadow-md"
            >
              <FiUserPlus className="w-5 h-5" />
              Abrir Gerenciador de Membros
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
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-500/80 text-white hover:bg-neutral-600 transition-all hover:scale-[1.02]"
            >
              <FiArrowLeft className="text-lg" />
              Voltar
            </Link>

            <ButtonUI
              type="submit"
              disabled={isPending}
              title="Salvar alterações"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] shadow-md transition-all disabled:opacity-60"
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
