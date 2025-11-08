import { FiTrash2, FiChevronDown, FiUser, FiStar } from 'react-icons/fi';
import { BiSolidCrown } from 'react-icons/bi';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useState, useDeferredValue } from 'react';
import InputUI from '../../../../components/ui/Input';
import ButtonUI from '../../../../components/ui/Button';
import Pagination from '../../../../components/PaginationController';
import { useMembersQuery } from '../../../../hooks/ReactQuery/Queries/useMembersQuery';
import { ConfirmModal } from '../../../../components/Modal';
import { useUpdateRoleGroupMemberMutation } from '../../../../hooks/ReactQuery/Mutations/useUpdateGroupMemberRoleMutation';
import { useDeleteGroupMemberMutation } from '../../../../hooks/ReactQuery/Mutations/useDeleteGroupMemberMutation';

export function MembersManager({ group }) {
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    memberId: null,
    newRole: null,
  });

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { mutateAsync } = useUpdateRoleGroupMemberMutation(
    group.id,
    page,
    search
  );
  const { mutateAsync: deleteMutateAsync } = useDeleteGroupMemberMutation();
  const deferredSearch = useDeferredValue(search);

  const { data, isLoading } = useMembersQuery(group?.id, page, deferredSearch);

  // Extrai dados da query
  const membersRaw = data?.members ?? [];
  const totalPages = data?.totalPages ?? 0;
  const size = data?.size ?? 0;

  // ✅ Coloca o dono do grupo no topo da lista
  const members = [...membersRaw].sort((a, b) => {
    if (a.authority === 'OWNER') return -1;
    if (b.authority === 'OWNER') return 1;
    return 0;
  });

  // Atualiza o cargo do membro no servidor
  const handleChangeRole = async (memberId, newRole) => {
    try {
      const payload = { group_id: group?.id, member_id: memberId, newRole };
      await mutateAsync(payload);
    } catch (err) {
      console.error(err);
    }
  };

  // Confirma a troca de cargo
  const handleConfirmChangeRole = async () => {
    if (confirmModal.memberId && confirmModal.newRole) {
      await handleChangeRole(confirmModal.memberId, confirmModal.newRole);
      setConfirmModal({
        isOpen: false,
        message: '',
        memberId: null,
        newRole: null,
      });
    }
  };

  // Remove membro
  const handleRemoveMember = async memberId => {
    try {
      const payload = { group_id: group.id, member_id: memberId };
      await deleteMutateAsync(payload);
    } catch (err) {
      console.error(err);
    }
  };

  // Paginação
  const handleNextPage = () => {
    if (page + 1 < totalPages) setPage(prev => prev + 1);
  };
  const handlePrevPage = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  if (isLoading) {
    return <div className="text-center py-6">Carregando...</div>;
  }

  return (
    <div className="bg-surface/90 backdrop-blur-xl rounded-2xl p-6">
      <header className="text-center mb-6">
        <h2 className="text-xl font-bold text-text">Gerenciar membros</h2>
        <p className="text-sm text-muted mt-1">
          Promova, rebaixe ou remova membros do grupo.
        </p>
      </header>

      <InputUI
        placeholder="Buscar membro..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 rounded-xl focus:ring-2 focus:ring-primary/40"
      />

      {members.length === 0 ? (
        <p className="text-center text-muted py-4">Nenhum membro encontrado.</p>
      ) : (
        <ul className="space-y-3 pr-2">
          {members.map(member => {
            const roleOptions = {
              OWNER: [
                { value: 'ADMIN', label: 'Administrador', icon: <FiStar /> },
                { value: 'USER', label: 'Membro', icon: <FiUser /> },
              ],
              ADMIN: [
                { value: 'OWNER', label: 'Dono', icon: <BiSolidCrown /> },
                { value: 'USER', label: 'Membro', icon: <FiUser /> },
              ],
              USER: [
                { value: 'OWNER', label: 'Dono', icon: <BiSolidCrown /> },
                { value: 'ADMIN', label: 'Administrador', icon: <FiStar /> },
              ],
            }[member.authority];

            return (
              <li
                key={member.id}
                className="flex items-center justify-between bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: member.themeColor }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white/30"
                  >
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold flex items-center gap-1">
                      {member.name}
                      {member.authority === 'OWNER' && (
                        <BiSolidCrown
                          className="text-yellow-400 ml-1"
                          title="Dono do grupo"
                        />
                      )}
                    </p>
                    <p className="text-xs text-muted capitalize">
                      {member.authority === 'OWNER'
                        ? 'Dono'
                        : member.authority === 'ADMIN'
                          ? 'Administrador'
                          : 'Membro'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Menu as="div" className="relative">
                    <MenuButton
                      className="p-2 rounded-full cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary transition flex items-center gap-1"
                      title="Alterar cargo"
                    >
                      <FiChevronDown />
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 bg-surface border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
                      {roleOptions.map(option => (
                        <ButtonUI
                          key={option.value}
                          onClick={() =>
                            setConfirmModal({
                              isOpen: true,
                              message: `Tem certeza que deseja definir ${member.name} como ${option.label}?`,
                              memberId: member.id,
                              newRole: option.value,
                            })
                          }
                          className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2"
                        >
                          {option.icon} {option.label}
                        </ButtonUI>
                      ))}
                    </MenuItems>
                  </Menu>

                  {member.authority !== 'OWNER' && (
                    <ButtonUI
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 cursor-pointer rounded-full bg-red-100/80 hover:bg-red-200 text-red-600 transition"
                      title="Remover membro"
                    >
                      <FiTrash2 />
                    </ButtonUI>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {members.length > size && (
        <div className="mt-6">
          <Pagination
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}

      {/* Modal de confirmação */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onCancel={() =>
          setConfirmModal({
            isOpen: false,
            message: '',
            memberId: null,
            newRole: null,
          })
        }
        onConfirm={handleConfirmChangeRole}
        cancelLabel="Não"
        confirmLabel="Sim"
        message={confirmModal.message}
      />
    </div>
  );
}
