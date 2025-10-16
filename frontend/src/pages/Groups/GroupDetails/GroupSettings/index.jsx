import {
  FiArrowLeft,
  FiFileText,
  FiSave,
  FiSettings,
  FiTrash2,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';
import { useLoaderData } from 'react-router';
import InputUI from '../../../../components/ui/Input';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import TextareaUI from '../../../../components/ui/Textarea';
import ButtonUI from '../../../../components/ui/Button';
import SelectUI from '../../../../components/ui/Select';
import Modal from '../../../../components/ModalButton/Modal';
import { useDeferredValue, useMemo, useState } from 'react';

export default function GroupSettings() {
  const group = useLoaderData();

  return (
    <div className="min-h-screen bg-neutral p-4 sm:p-6 lg:p-10 flex justify-center font-principal">
      <main className="w-full max-w-3xl space-y-8 sm:space-y-10 text-text">
        {/* Título */}
        <header className="flex flex-row-reverse sm:items-center sm:justify-between gap-4 mb-6">
          <Menu>
            <MenuItem
              className={
                ' cursor-pointer flex p-2 rounded-md items-center bg-primary/70 hover:bg-primary text-white max-sm:justify-center gap-2'
              }
              as="a"
              title="Retornar"
              href={`/groups/${group.id}`}
            >
              <FiArrowLeft className="text-2xl text-white  cursor-pointer" />
            </MenuItem>
          </Menu>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <FiSettings className="text-primary w-7 h-7 sm:w-8 sm:h-8" />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold">
                Configurações de{' '}
                <span className="text-primary">{group.name}</span>
              </h1>
              <p className="text-sm text-muted dark:text-muted-dark mt-1">
                Gerencie o nome, descrição e membros deste grupo.
              </p>
            </div>
          </div>
        </header>

        {/* Nome e descrição */}
        <section className="bg-surface flex flex-col gap-5 rounded-xl shadow p-4 sm:p-6">
          <div>
            <label
              htmlFor="groupName"
              className="flex items-center gap-2 mb-2 sm:mb-4 font-semibold text-lg text-text"
            >
              <FiSettings />
              Nome do grupo
            </label>
            <InputUI
              defaultValue={group.name}
              id="groupName"
              type="text"
              name="groupName"
              placeholder="Digite um novo nome para o grupo."
              className="w-full rounded-lg border border-muted px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <div>
            <label
              htmlFor="groupDescription"
              className="flex items-center gap-2 mb-2 sm:mb-4 font-semibold text-lg text-text"
            >
              <FiFileText />
              Descrição do grupo
            </label>
            <TextareaUI
              defaultValue={group.description}
              rows={6}
              id="groupDescription"
              name="groupDescription"
              placeholder="Digite a descrição do grupo."
              className="w-full rounded-lg border border-muted px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </section>

        <MembersInfo group={group} />

        {/* Botões finais */}
        <section className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-evenly w-full sm:max-w-xs mx-auto">
          <ButtonUI
            icon={<FiTrash2 className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Excluir"
            ariaLabel="Excluir grupo"
            className="flex-1 p-2 flex items-center justify-center gap-2 rounded-lg border border-error text-white bg-error/70 hover:bg-error transition disabled:opacity-50 cursor-pointer"
          />
          <ButtonUI
            icon={<FiSave className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Salvar"
            ariaLabel="Salvar alterações"
            className="flex-1 p-2 flex items-center justify-center gap-2 rounded-lg bg-primary/70 text-white hover:bg-primary transition disabled:opacity-50 cursor-pointer"
          />
        </section>
      </main>
    </div>
  );
}

function MembersInfo({ group }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex items-center p-6  bg-surface rounded-xl shadow w-full">
      <div className="flex flex-row justify-between flex-1  sm:items-center sm:justify-between gap-3">
        <h2 className="flex items-center gap-2 text-text font-semibold text-lg sm:text-xl">
          <FiUsers className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Visualizar membros ({group.members.length})
        </h2>
        <ButtonUI
          fnClick={() => setIsOpen(true)}
          icon={<FiUserPlus className="w-6 h-6 sm:w-7 sm:h-7 rounded-2xl" />}
          className="flex cursor-pointer items-center gap-1 text-white bg-primary w-10 h-10 justify-center rounded-full font-semibold hover:text-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        />
      </div>

      <Modal
        fnClose={() => setIsOpen(false)}
        isOpen={isOpen}
        children={<ListMembers group={group} />}
      />
    </section>
  );
}

function ListMembers({ group }) {
  const [searchMember, setSearchMember] = useState('');
  const deferredSearch = useDeferredValue(searchMember);

  const filteredMember = useMemo(() => {
    return group.members.filter(member =>
      member.name.toLowerCase().includes(deferredSearch.toLowerCase())
    );
  }, [deferredSearch, group.members]);

  return (
    <div>
      {/* Título e subtítulo */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-text">
          Membros do grupo ({group.members.length})
        </h2>
        <p className="text-sm  text-muted dark:text-muted-dark mt-1">
          Aqui você pode visualizar todos os membros e seus cargos no grupo.
        </p>
      </div>

      {/* Busca */}
      <div className="mb-4">
        <InputUI
          placeholder="Buscar por..."
          onInput={({ target: { value } }) => setSearchMember(value)}
        />
      </div>

      {/* Lista de membros */}
      <ul className="divide-y divide-neutral">
        {filteredMember.map(m => (
          <li
            key={m.id + m.name}
            className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap"
          >
            <button className="flex items-center gap-4 w-full text-left">
              {/* Avatar */}
              <div
                style={{ backgroundColor: m.color }}
                className="w-10 h-10 flex justify-center items-center rounded-full text-white font-bold flex-shrink-0"
              >
                {m.name[0]?.toUpperCase() || '?'}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p className="font-medium text-text truncate">{m.name}</p>
                <small className="font-semibold capitalize text-primary">
                  {m.isAdmin ? 'Administrador' : 'Membro'}
                </small>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
