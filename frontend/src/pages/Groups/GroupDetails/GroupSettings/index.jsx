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
import { Menu, MenuItem } from '@headlessui/react';
import TextareaUI from '../../../../components/ui/Textarea';
import ButtonUI from '../../../../components/ui/Button';
import SelectUI from '../../../../components/ui/Select';

export default function GroupSettings() {
  const group = useLoaderData();

  return (
    <div className="min-h-screen bg-neutral p-4 sm:p-6 lg:p-10 flex justify-center font-principal">
      <main className="w-full max-w-3xl space-y-8 sm:space-y-10 text-text">
        {/* Título */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FiSettings className="text-primary w-7 h-7 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl font-bold">
              Configurações de{' '}
              <span className="text-primary">{group.name}</span>
            </h1>
          </div>
          <Menu>
            <MenuItem
              className={
                ' cursor-pointer flex p-2 rounded-md items-center bg-primary/70 hover:bg-primary text-white max-sm:justify-center gap-2'
              }
              as="a"
              href={`/groups/${group.id}`}
            >
              <FiArrowLeft className="text-2xl text-white  cursor-pointer" />
              Retornar
            </MenuItem>
          </Menu>
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

        {/* Membros */}
        <section className="bg-surface rounded-xl shadow p-4 sm:p-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="flex items-center gap-2 text-text font-semibold text-lg sm:text-xl">
              <FiUsers className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Membros ({group.members.length})
            </h2>
            <ButtonUI
              icon={<FiUserPlus className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="Adicionar membro"
              className="flex cursor-pointer items-center gap-1 text-primary font-semibold hover:text-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            />
          </div>

          <ul className="divide-y divide-neutral">
            {group.members.map(m => (
              <li
                key={m.id + m.name}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap"
              >
                {/* Info do membro */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    style={{ backgroundColor: m.color }}
                    className="w-10 h-10 flex justify-center items-center rounded-full text-white font-bold flex-shrink-0"
                  >
                    {m.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-text truncate">{m.name}</p>
                    <small className="font-semibold capitalize text-primary">
                      {m.isAdmin ? 'Administrador' : 'Membro'}
                    </small>
                  </div>
                </div>

                {/* Controles */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <SelectUI
                    defaultValue={m.isAdmin ? 'admin' : 'member'}
                    aria-label={`Cargo de ${m.name}`}
                    className="rounded-md border border-muted bg-surface px-3 py-2 text-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                  >
                    <option value={'member'}>Membro</option>
                    <option value={'admin'}>Administrador</option>
                  </SelectUI>

                  <ButtonUI
                    className="bg-error/70 hover:bg-error transition-opacity text-white p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    aria-label={`Remover ${m.name}`}
                    title="Remover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

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
