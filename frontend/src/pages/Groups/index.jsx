import { useState, useMemo, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import GroupFilters from '../../components/Filters/Groups';
import { useFilteredGroups } from '../../components/Filters/Groups/useFilteredGroups';
import GroupForm from '../../components/forms/GroupForm';
import CardUI from '../../components/ui/Card';
import userData from '../../mockData/user/user.data';
import { formatBRL } from '../../utils/formatters';
import ModalButton from '../../components/Modal/ModalButton';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '../../services/groups';
import { ReactQuery_keys } from '../../libs/ReactQuery/keys';

export default function Groups() {
  const [currentUser, setCurrentUser] = useState(userData);
  const loaderData = useLoaderData();
  const { data: groups } = useQuery({
    queryKey: [ReactQuery_keys.groups.all],
    initialData: loaderData,
    queryFn: getGroups,
  });
  console.log(groups);
  useEffect(() => {
    const newCurrentUser = userData;
    userData.groups.forEach(g => {
      delete g.icon;
      delete g.status;
      delete g.statusColor;
    });
    newCurrentUser.groups = groups.content;
    setCurrentUser(newCurrentUser);
  }, []);

  const [filters, setFilters] = useState({
    search: '',
    onlyOwner: false,
    sortOrder: 'desc',
  });

  const filteredGroups = useFilteredGroups(
    currentUser.groups,
    currentUser.id,
    filters
  );

  // número total e filtrado de grupos (para UX)
  const totalGroups = currentUser.groups.length;
  const totalFiltered = filteredGroups.length;

  // título dinâmico (ex: "3 grupos encontrados de 5")
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
          {/* Modal para adicionar um novo grupo */}
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
                to={`/groups/${group.id}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg block"
                aria-label={`Grupo ${group.name} com ${group.members.length} membros`}
              >
                <CardUI
                  style={{ borderColor: currentUser.color }}
                  className={`relative  border-primary p-6 rounded-2xl shadow-sm bg-surface hover:shadow-md cursor-pointer border-l-4 h-full transition-colors duration-200 ease-in-out`}
                >
                  {/* Nome + Ícone */}
                  <div className="flex items-center gap-3 mb-3 text-lg text-primary font-semibold">
                    <span className="text-2xl">{group.icon}</span>
                    <h3 className="truncate">{group.name}</h3>
                  </div>

                  {/* Quantidade de membros */}
                  <p className="text-sm text-muted mb-4">
                    {group.members.length} membro
                    {group.members.length > 1 ? 's' : ''}
                  </p>

                  {/* Avatares dos membros */}
                  <div className="relative mb-4 h-8">
                    {group.members.map(({ name, color }, idx) => (
                      <span
                        key={idx}
                        className="text-white text-sm w-8 h-8 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md"
                        style={{
                          backgroundColor: color,
                          left: `${idx * 1.2}rem`,
                          zIndex: group.members.length - idx,
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
                      group.status >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Saldo: {formatBRL(group.status)}
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
