import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import GroupFilters from '../../components/Filters/Groups';
import { useFilteredGroups } from '../../components/Filters/Groups/useFilteredGroups';
import GroupForm from '../../components/forms/GroupForm';
import CardUI from '../../components/ui/Card';
import { formatBRL } from '../../utils/formatters';
import ModalButton from '../../components/Modal/ModalButton';
import { useGroupsQuery } from '../../hooks/ReactQuery/useGroupsQuery';
import useMeQuery from '../../hooks/ReactQuery/useMeQuery';
import { CategoryIcon } from '../../mockData/groupIcons/icons';
import { useQueries } from '@tanstack/react-query';
import { REACTQUERY_KEYS } from '../../libs/ReactQuery/keys';
import { getGroupMembers } from '../../services/groups';
import Pagination from '../../components/PaginationController';

export default function Groups() {
  const { data: user } = useMeQuery();
  const [page, setPage] = useState(0);
  const membersLengthToShow = 4;
  const { data, isLoading } = useGroupsQuery(page);
  const groups = data?.groups;
  const totalPages = data?.totalPages;
  const groupsLength = data?.groupsLength;
  console.log({ data });
  // Cria queries dinâmicas de membros (cacheadas)
  const membersQueries = useQueries({
    queries: groups?.map(group => ({
      queryKey: [REACTQUERY_KEYS.GROUPS.MEMBERS, group.id],
      queryFn: () => getGroupMembers(group.id),
      enabled: !!group.id,
      staleTime: Infinity, // mantém o cache fresco indefinidamente
    })),
  });

  // Cria um map: { [groupId]: members }
  const membersMap = {};
  membersQueries.forEach((q, i) => {
    if (q.data)
      membersMap[groups[i].id] = {
        totalElements: q.data.totalElements,
        members: q.data.members,
      };
  });

  console.log({ membersMap });

  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    onlyOwner: false,
    sortOrder: 'desc',
  });

  const filteredGroups = useFilteredGroups(groups, 'OWNER', filters);
  const totalGroups = groupsLength;
  const totalFiltered = filteredGroups.length;

  const title = useMemo(() => {
    if (filters.search || filters.onlyOwner)
      return `Grupos (${totalFiltered}/${totalGroups})`;
    return `Meus grupos (${totalGroups})`;
  }, [filters, totalFiltered, totalGroups]);

  if (isLoading) return <div>Carregando grupos...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral p-6 transition-colors">
      <main className="flex-1 max-w-[1200px] mx-auto">
        {/* Cabeçalho */}
        <header className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-extrabold text-text tracking-tight">
            {title}
          </h1>
          <ModalButton
            modalChildren={<GroupForm />}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition"
          />
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredGroups.map((group, index) => {
                const membersData = membersMap[group?.id]?.members ?? [];
                const membersLength =
                  membersMap[group?.id]?.totalElements ?? [];
                const membersLoading = membersMap[group?.id]?.isLoading;
                return (
                  <Link
                    key={group.id}
                    to={`/groups/${group.id}`}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg block"
                    aria-label={`Grupo ${group.name} com ${membersData.length} membros`}
                  >
                    <CardUI
                      style={{ borderColor: user?.themeColor }}
                      className="relative border-l-4 p-6 rounded-2xl shadow-md bg-surface hover:shadow-xl cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1"
                    >
                      {/* Nome + Ícone */}
                      <div className="flex items-center gap-3 mb-3 text-lg font-semibold text-primary">
                        <span className="text-3xl">
                          <CategoryIcon categoryKey={group.icon} size={30} />
                        </span>
                        <h3 className="truncate text-xl">{group.name}</h3>
                      </div>

                      {/* Quantidade de membros */}
                      <p className="text-sm text-muted mb-4">
                        {membersLoading
                          ? 'Carregando membros...'
                          : `${membersLength} membro${
                              membersLength > 1 ? 's' : ''
                            }`}
                      </p>

                      {/* Avatares */}
                      <div className="relative mb-4 h-10">
                        {!membersLoading && membersData.length > 0 && (
                          <>
                            {membersData
                              .slice(0, membersLengthToShow)
                              .map(({ name, themeColor }, idx) => (
                                <span
                                  key={idx}
                                  className="text-white  text-sm w-10 h-10 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md"
                                  style={{
                                    backgroundColor: themeColor,
                                    left: `${idx * 1.4}rem`,
                                    zIndex: 3 - idx,
                                  }}
                                  aria-label={`Membro: ${name}`}
                                  title={name}
                                >
                                  {name[0]?.toUpperCase()}
                                </span>
                              ))}

                            {membersLength > membersLengthToShow && (
                              <span
                                className={`text-white ${membersLengthToShow > 0 && 'ml-2'} text-sm w-10 h-10 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md bg-gray-400`}
                                style={{
                                  left: `${membersLengthToShow * 1.4}rem`, // posição logo após os avatares visíveis
                                  zIndex: 0,
                                }}
                                title={`${membersData.length - membersLengthToShow} membros adicionais`}
                              >
                                +{membersData.length - membersLengthToShow}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Status financeiro */}
                      <p
                        className={`text-sm font-semibold select-none ${
                          group.totalExpenses <= 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        Despesas: {formatBRL(group.totalExpenses)}
                      </p>
                    </CardUI>
                  </Link>
                );
              })}
            </div>

            {/* Paginação */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onNext={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
              onPrev={() => setPage(prev => Math.max(prev - 1, 0))}
            />
          </>
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
