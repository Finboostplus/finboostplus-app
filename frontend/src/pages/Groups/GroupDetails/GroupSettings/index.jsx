import {
  FiArrowLeft,
  FiFileText,
  FiSave,
  FiSettings,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';
import { useLoaderData } from 'react-router';
import InputUI from '../../../../components/ui/Input';
import { Menu, MenuItem } from '@headlessui/react';
import TextareaUI from '../../../../components/ui/Textarea';
import ButtonUI from '../../../../components/ui/Button';

import { useDeferredValue, useMemo, useState } from 'react';
import Modal from '../../../../components/Modal';

export default function GroupSettings() {
  const group = useLoaderData();

  return (
    <div className="min-h-screen bg-neutral p-4 sm:p-6 lg:p-10 flex justify-center font-principal">
      <main className="w-full max-w-3xl space-y-8 sm:space-y-10 text-text">
        {/* Título */}
        <header className="flex  sm:items-center sm:justify-between gap-4 mb-6">
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
              placeholder="Digite uma nova descrição para o grupo."
              className="w-full resize-none rounded-lg border border-muted px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </section>

        <MembersInfo group={group} />

        {/* Botões finais */}
        <section className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-evenly w-full sm:max-w-xs mx-auto">
          <Menu>
            <MenuItem
              className="flex-1 p-2 flex items-center justify-center gap-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition disabled:opacity-50 cursor-pointer"
              as="a"
              title="Retornar"
              href={`/groups/${group.id}`}
            >
              <FiArrowLeft className="text-2xl text-white  cursor-pointer" />
              Retornar
            </MenuItem>
          </Menu>
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

  const filteredMembers = useMemo(() => {
    const query = deferredSearch.toLowerCase().trim();
    return group.members.filter(member =>
      member.name.toLowerCase().includes(query)
    );
  }, [deferredSearch, group.members]);

  return (
    <section
      aria-labelledby="group-members-heading"
      className="bg-surface p-4 sm:p-6 rounded-lg  transition-colors"
    >
      {/* Título e subtítulo */}
      <header className="mb-5">
        <h2
          id="group-members-heading"
          className="text-xl sm:text-2xl font-semibold text-text"
        >
          Membros do grupo ({group.members.length})
        </h2>
        <p className="text-sm text-muted dark:text-muted-dark mt-1">
          Visualize todos os membros e seus cargos no grupo.
        </p>
      </header>

      {/* Campo de busca */}
      <div className="mb-6">
        <InputUI
          placeholder="Buscar membro..."
          value={searchMember}
          onChange={({ target }) => setSearchMember(target.value)}
          aria-label="Buscar membro pelo nome"
        />
      </div>

      {/* Lista de membros */}
      {filteredMembers.length > 0 ? (
        <ul className="divide-y divide-neutral/40">
          {filteredMembers.map(member => (
            <li
              key={member.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors hover:bg-neutral/10 rounded-md px-2"
            >
              {/* Membro */}
              <div className="flex items-center gap-4 w-full">
                {/* Avatar */}
                <div
                  style={{ backgroundColor: member.color }}
                  className="w-10 h-10 flex justify-center items-center rounded-full text-white font-bold shadow-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {member.name[0]?.toUpperCase() || '?'}
                </div>

                {/* Nome + Cargo */}
                <div className="min-w-0">
                  <p className="font-medium text-text truncate">
                    {member.name}
                  </p>
                  <small
                    className={`font-semibold capitalize ${
                      member.isAdmin ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {member.isAdmin ? 'Administrador' : 'Membro'}
                  </small>
                </div>
              </div>

              {/* Ações futuras (opcional) */}
              {/* <ButtonUI size="sm" title="Ver perfil" /> */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted mt-6">Nenhum membro encontrado.</p>
      )}
    </section>
  );
}
