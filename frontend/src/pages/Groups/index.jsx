import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router';
import GroupFilters from '../../components/Filters/Groups';
import { useFilteredGroups } from '../../components/Filters/Groups/useFilteredGroups';
import GroupForm from '../../components/forms/GroupForm';
import CardUI from '../../components/ui/Card';
import userData from '../../mockData/user/user.data';
import { formatBRL } from '../../utils/formatters';
import ModalButton from '../../components/Modal/ModalButton';
import { useGroupsQuery } from '../../hooks/ReactQuery/useGroupsQuery';
import useMeQuery from '../../hooks/ReactQuery/useMeQuery';

export default function Groups() {
  const { data: user } = useMeQuery();
  const { data: groups, isLoading } = useGroupsQuery();

  // Atualiza currentUser quando a query de user carregar
  useEffect(() => {
    console.log(user, groups);
  }, [user, groups]);

  // Estado de filtros
  const [filters, setFilters] = useState({
    search: '',
    onlyOwner: false,
    sortOrder: 'desc',
  });

  if (isLoading) return <div>Carregando...</div>;
  /*  if (!groups?.content?.length)
    return (
      <div className="text-center mt-12 text-muted">
        <p className="text-lg font-medium">Nenhum grupo encontrado</p>
        <p className="text-sm mt-1">Crie um novo grupo para começar a usar.</p>
      </div>
    ); */

  // Grupos filtrados
  const filteredGroups = useFilteredGroups(groups.content, user.name, filters);

  // Número total e filtrado de grupos
  const totalGroups = groups.content.length;
  const totalFiltered = filteredGroups.length;

  // Título dinâmico
  const title = useMemo(() => {
    if (filters.search || filters.onlyOwner)
      return `Grupos (${totalFiltered}/${totalGroups})`;
    return `Meus grupos (${totalGroups})`;
  }, [filters, totalFiltered, totalGroups]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral p-6 transition-colors">
      <main className="flex-1 max-w-[1200px] mx-auto">
        {/* Cabeçalho */}
        <header className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-text">{title}</h1>
          <ModalButton modalChildren={<GroupForm />} />
        </header>

        {/* Filtros */}
        <GroupFilters
          search={filters.search}
          onlyOwner={filters.onlyOwner}
          sortOrder={filters.sortOrder}
          onFilterChange={setFilters}
        />

        {/* Lista de grupos */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {filteredGroups.map(group => (
              <Link
                key={group.id}
                to={`/groups/${group?.id}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg block"
                aria-label={`Grupo ${group?.name} com ${group?.members?.length} membros`}
              >
                <CardUI
                  style={{ borderColor: user?.themeColor }}
                  className="relative border-primary p-6 rounded-2xl shadow-sm bg-surface hover:shadow-md cursor-pointer border-l-4 h-full transition-colors duration-200 ease-in-out"
                >
                  {/* Nome + Ícone */}
                  <div className="flex items-center gap-3 mb-3 text-lg text-primary font-semibold">
                    <span className="text-2xl">{group?.icon}</span>
                    <h3 className="truncate">{group?.name}</h3>
                  </div>

                  {/* Quantidade de membros */}
                  <p className="text-sm text-muted mb-4">
                    {group?.members?.length} membro
                    {group?.members?.length > 1 ? 's' : ''}
                  </p>

                  {/* Avatares dos membros */}
                  <div className="relative mb-4 h-8">
                    {group?.members?.map(({ name, themeColor }, idx) => (
                      <span
                        key={idx}
                        className="text-white text-sm w-8 h-8 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md"
                        style={{
                          backgroundColor: themeColor,
                          left: `${idx * 1.2}rem`,
                          zIndex: group?.members.length - idx,
                        }}
                        aria-label={`Membro: ${name}`}
                        title={name}
                      >
                        {name[0].toUpperCase()}
                      </span>
                    ))}
                  </div>

                  {/* Status financeiro */}
                  <p
                    className={`text-sm font-semibold select-none ${
                      group?.totalExpenses <= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Despesas: {formatBRL(group.totalExpenses)}
                  </p>
                </CardUI>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12 text-muted">
            <p className="text-lg font-medium">Nenhum grupo encontrado</p>
            <p className="text-sm mt-1">
              Tente ajustar os filtros ou criar um novo grupo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
