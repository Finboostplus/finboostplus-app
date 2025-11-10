import { CategoryIcon } from '../../../mockData/groupIcons/icons';
import { Link } from 'react-router';
import { FiUsers } from 'react-icons/fi';
import { useGroupsQuery } from '../../../hooks/ReactQuery/Queries/useGroupsQuery';

export default function ActiveGroups() {
  const {
    data: { groups, groupsLength },
    isLoading,
  } = useGroupsQuery();

  const groupLimit = 4;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <FiUsers className="text-lg" />
        <span>Carregando grupos...</span>
      </div>
    );
  }

  const groupsToShow = groups.slice(0, groupLimit);
  const hasMoreGroups = groupsLength > groupLimit;

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-6 w-full border border-dashed border-border rounded-xl bg-muted/10">
        <FiUsers className="text-3xl text-muted-foreground" />
        <p className="text-sm text-muted-foreground font-medium">
          Você ainda não faz parte de nenhum grupo.
        </p>
        <Link
          to={'../groups?create'}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                     bg-primary text-white font-medium text-sm shadow-md 
                     hover:bg-primary/90 active:scale-[0.97] transition-all duration-200"
        >
          Criar grupo
        </Link>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="active-groups"
      className="flex flex-wrap gap-4 justify-start sm:justify-start"
    >
      {groupsToShow.map(group => (
        <Link
          key={group.groupId}
          to={`/groups/${group.groupId}`}
          className="flex items-center gap-3 px-4 py-3 rounded-xl
                     bg-linear-to-r from-white/60 to-white/10
                      text-sm font-medium text-foreground
                     shadow-sm hover:shadow-lg hover:scale-105
                     transition-all duration-200 group w-40"
        >
          {/* Círculo do ícone */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full  text-primary text-lg">
            <CategoryIcon categoryKey={group.icon} />
          </div>

          {/* Nome do grupo */}
          <span className="truncate font-semibold">{group.name}</span>
        </Link>
      ))}

      {hasMoreGroups && (
        <Link
          to="/groups"
          className="flex items-center justify-center gap-1 px-4 py-3 rounded-xl
                     bg-primary/10 text-primary border border-primary/30
                     font-medium text-sm shadow-sm hover:bg-primary/20
                     transition-all w-40"
          aria-label="Ver todos os grupos"
        >
          +{groupsLength - groupLimit} mais
        </Link>
      )}
    </section>
  );
}
