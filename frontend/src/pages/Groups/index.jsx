import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import GroupFilters from '../../components/Filters/Groups';
import { useFilteredGroups } from '../../components/Filters/Groups/useFilteredGroups';
import GroupForm from '../../components/forms/GroupForm';
import CardUI from '../../components/ui/Card';
import { CategoryIcon } from '../../mockData/groupIcons/icons';
import Pagination from '../../components/PaginationController';
import useMeQuery from '../../hooks/ReactQuery/Queries/useMeQuery';
import { useGroupsQuery } from '../../hooks/ReactQuery/Queries/useGroupsQuery';
import useGroupsWithMembers from './useGroupsWithMembers';
import ButtonUI from '../../components/ui/Button';
import Modal from '../../components/Modal';
import GroupFinancialStatus from './GrupoFinancialStatus';

export default function Groups() {
  const [searchParams] = useSearchParams();
  const createModal = searchParams.has('create');
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(
    createModal ?? false
  );
  const { data: user } = useMeQuery();
  const [page, setPage] = useState(0);
  const membersLengthToShow = 4;

  const {
    data: { groups, totalPages, groupsLength },
    isLoading,
    isFetching,
  } = useGroupsQuery(page);

  const membersMap = useGroupsWithMembers(groups);

  // filtros locais
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

  if (isLoading)
    return <div className="text-center mt-20">Carregando grupos...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral p-6 transition-colors">
      <main className="flex-1 max-w-[1200px] mx-auto">
        {/* Cabeçalho */}
        <header className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-extrabold text-text tracking-tight flex items-center gap-2">
            {title}
            {isFetching && (
              <span className="text-sm text-muted animate-pulse">
                (atualizando...)
              </span>
            )}
          </h1>

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
            children={<GroupForm page={page} />}
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
        <section
          className="min-h-[400px] transition-all duration-300 mt-6"
          aria-live="polite"
        >
          {filteredGroups.length > 0 ? (
            <>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
                  isFetching ? 'opacity-70' : 'opacity-100'
                }`}
              >
                {filteredGroups.map(group => {
                  const membersData = membersMap[group?.groupId]?.members ?? [];
                  const membersLength =
                    membersMap[group?.groupId]?.totalElements ?? 0;
                  const membersLoading = membersMap[group?.groupId]?.isLoading;

                  return (
                    <Link
                      key={group.groupId}
                      to={`/groups/${group.groupId}`}
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
                            : `${membersLength} membro${membersLength > 1 ? 's' : ''}`}
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
                                    className="text-white uppercase text-sm w-10 h-10 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md"
                                    style={{
                                      backgroundColor: themeColor,
                                      left: `${idx * 1.4}rem`,
                                      zIndex: 3 - idx,
                                    }}
                                    aria-label={`Membro: ${name}`}
                                    title={name}
                                  >
                                    {name[0]}
                                  </span>
                                ))}

                              {membersLength > membersLengthToShow && (
                                <span
                                  className="text-white text-sm w-10 h-10 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md bg-gray-400"
                                  style={{
                                    left: `${membersLengthToShow * 1.4}rem`,
                                  }}
                                  title={`${membersLength - membersLengthToShow} membros adicionais`}
                                >
                                  +{membersLength - membersLengthToShow}
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        <GroupFinancialStatus group={group} />
                      </CardUI>
                    </Link>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <>
                  {/* Paginação */}
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onNext={() =>
                      setPage(prev => Math.min(prev + 1, totalPages - 1))
                    }
                    onPrev={() => setPage(prev => Math.max(prev - 1, 0))}
                  />
                </>
              )}
            </>
          ) : (
            <div className="text-center mt-20 text-muted transition-opacity duration-300">
              {filters.search ? (
                <>
                  <p className="text-lg font-medium">Nenhum grupo encontrado</p>
                  <p className="text-sm mt-1">
                    Tente buscar por outro nome ou limpar o filtro.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">
                    Você ainda não tem grupos
                  </p>
                  <p className="text-sm mt-1">
                    Crie um novo grupo para começar.
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
