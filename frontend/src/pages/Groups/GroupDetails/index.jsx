import { useParams } from 'react-router';
import { useState } from 'react';
import {
  FiSettings,
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiUserPlus,
} from 'react-icons/fi';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import ExpensesList from './ExpensesList';

import Expenses from '../../Expenses';

import { CategoryIcon } from '../../../mockData/groupIcons/icons';
import Modal, { ConfirmModal } from '../../../components/Modal';

import { usePermissions } from './usePermissions';
import { useGroupByIdQuery } from '../../../hooks/ReactQuery/Queries/useGroupsQuery';
import { useDeleteGroupMutation } from '../../../hooks/ReactQuery/Mutations/useDeleteGroupMutation';
import GroupFinancialStatus from '../GrupoFinancialStatus';
import ButtonUI from '../../../components/ui/Button';
import { NotFoundError } from '../../../utils/errors';
import { useDeleteMeGroupByIdMutation } from '../../../hooks/ReactQuery/Mutations/useDeleteMeGroupByIdMutation';
import AddMemberForm from './AddMember';
import { addMemberGroupMutation } from '../../../hooks/ReactQuery/Mutations/addMemberGroupMutation';

export default function GroupDetails() {
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const { group_id } = useParams();
  const { data: group, isError } = useGroupByIdQuery(group_id);
  const { mutateAsync: leaveGroupMutation } =
    useDeleteMeGroupByIdMutation(group_id);
  const { mutateAsync: addMemberMutation } = addMemberGroupMutation(group_id);
  // Estado genérico do ConfirmModal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    confirmLabel: 'Confirmar',
    onConfirm: () => {},
  });

  if (isError) {
    throw new NotFoundError(
      'O grupo que você tentou acessar não existe.',
      404,
      {
        label: 'Voltar para os grupos',
        path: '/groups',
      }
    );
  }

  const { authorization } = group;
  const {
    canEditGroupInfo,
    canAddMemberGroup,
    canDeleteGroup,
    canCreateExpenses,
  } = usePermissions(authorization);
  const deleteGroup = useDeleteGroupMutation(group_id);

  function openConfirmModal({ message, confirmLabel, onConfirm }) {
    setConfirmModal({ isOpen: true, message, confirmLabel, onConfirm });
  }

  async function handleLeaveGroup() {
    try {
      await leaveGroupMutation();
    } catch {}
  }

  return (
    <div
      key={group_id}
      className="flex flex-col min-h-screen bg-neutral font-principal transition-colors"
    >
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        {/* Modal genérico */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
          onConfirm={() => {
            confirmModal.onConfirm();
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
          }}
          confirmLabel={confirmModal.confirmLabel}
          message={confirmModal.message}
        />

        {/* Cabeçalho */}
        <header className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1
              className="text-2xl flex items-center gap-2 sm:text-3xl font-semibold text-text"
              role="heading"
              aria-level={1}
            >
              <CategoryIcon categoryKey={group?.icon} size={30} />
              {group?.name}
            </h1>
            <p className="text-sm text-muted mt-1">
              Visualize os saldos entre membros e acompanhe as despesas do
              grupo.
            </p>
          </div>

          {/* Menu de ações */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              className="flex items-center justify-center p-2 bg-primary/70 hover:bg-primary text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              aria-label="Abrir menu de ações do grupo"
            >
              <FiSettings className="text-xl" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-surface shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
              {canEditGroupInfo && (
                <MenuItem>
                  {({ active }) => (
                    <a
                      href={`/groups/${group?.id}/settings`}
                      className={`${
                        active ? 'bg-primary/10 text-primary' : 'text-text'
                      } flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                    >
                      <FiEdit2 />
                      Configurações
                    </a>
                  )}
                </MenuItem>
              )}

              {canAddMemberGroup && (
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-primary/10 text-primary' : 'text-text'
                      } flex items-center gap-2 w-full px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                      onClick={() => setShowMemberModal(true)}
                    >
                      <FiUserPlus />
                      Adicionar membro
                    </button>
                  )}
                </MenuItem>
              )}

              {canDeleteGroup && (
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-red-50 text-red-600' : 'text-red-500'
                      } flex items-center gap-2 w-full px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                      onClick={() =>
                        openConfirmModal({
                          message: `Tem certeza de que deseja excluir o grupo "${group?.name}"? Essa ação não pode ser desfeita.`,
                          confirmLabel: 'Excluir',
                          onConfirm: () => deleteGroup.mutate(),
                        })
                      }
                    >
                      <FiTrash2 />
                      Excluir grupo
                    </button>
                  )}
                </MenuItem>
              )}

              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-red-50 text-red-600' : 'text-red-500'
                    } flex items-center gap-2 w-full px-4 py-2 text-sm rounded-md transition-colors cursor-pointer`}
                    onClick={() =>
                      openConfirmModal({
                        message: `Tem certeza de que deseja sair do grupo "${group?.name}"?`,
                        confirmLabel: 'Sair',
                        onConfirm: handleLeaveGroup,
                      })
                    }
                  >
                    <FiLogOut />
                    Sair do grupo
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>

        <GroupFinancialStatus group={group} variant="detailed" />

        {/* Conteúdo principal */}
        <section className="animate-fadeIn">
          <ExpensesList groupID={group_id} authorization={authorization} />
        </section>
      </main>

      {/* Modal de adicionar despesa */}
      {canCreateExpenses && (
        <>
          <ButtonUI
            onClick={() => setGroupModalIsOpen(true)}
            className="fixed z-10 cursor-pointer bottom-5 right-6 bg-primary font-bold text-3xl text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition"
          >
            +
          </ButtonUI>

          <Modal
            fnClose={() => setGroupModalIsOpen(false)}
            isOpen={groupModalIsOpen}
            setIsOpen={setGroupModalIsOpen}
            children={<Expenses groupData={group} />}
          />
        </>
      )}

      {/* Modal genérico para adicionar membro (vazio por enquanto) */}
      <Modal
        isOpen={showMemberModal}
        fnClose={() => setShowMemberModal(false)}
        autoCloseOnSuccess={false}
        children={
          <AddMemberForm
            onSubmit={async ({ email, authorization }) => {
              // Aqui você chamaria sua mutation para adicionar membro
              try {
                await addMemberMutation({ email, authorization });
              } catch {}
              console.log({ email, authorization });
            }}
            onCancel={() => setShowMemberModal(false)}
          />
        }
      />
    </div>
  );
}
