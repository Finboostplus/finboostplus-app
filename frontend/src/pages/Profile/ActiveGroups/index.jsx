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
        <FiUsers className="size-4" />
        <span>Carregando grupos...</span>
      </div>
    );
  }

  const groupsToShow = groups.slice(0, groupLimit);
  const hasMoreGroups = groupsLength > groupLimit;

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-2 py-6 w-full border border-dashed border-border rounded-xl bg-muted/10">
        <FiUsers className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground font-principal">
          Você ainda não faz parte de nenhum grupo.
        </p>
        <Link
          to={'../groups?create'}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
             bg-primary text-white font-medium text-sm font-principal 
             shadow-sm hover:bg-primary/90 active:scale-[0.98] 
             transition-all duration-200 focus:outline-none 
             focus:ring-2 focus:ring-primary/50 cursor-pointer"
        >
          Criar grupo
        </Link>
      </div>
    );
  }

  return (
    <section aria-labelledby="active-groups" className="flex flex-wrap gap-2">
      {groupsToShow.map(group => (
        <Link
          key={group.id}
          to={`/groups/${group.id}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                     bg-muted/30 border border-border text-sm font-medium font-principal
                     text-foreground hover:bg-muted/50 hover:border-muted-foreground/30 
                     transition-all duration-200 group"
        >
          <span className="text-lg transition-transform duration-200 group-hover:scale-110">
            <CategoryIcon categoryKey={group.icon} />
          </span>
          <span className="truncate max-w-[120px]">{group.name}</span>
        </Link>
      ))}

      {hasMoreGroups && (
        <Link
          to="/groups"
          className="inline-flex items-center px-3 py-1.5 rounded-full 
                     bg-primary/10 text-primary border border-primary/20 
                     text-sm font-medium font-principal hover:bg-primary/20 
                     transition-colors"
          aria-label="Ver todos os grupos"
        >
          +{groupsLength - groupLimit} mais
        </Link>
      )}
    </section>
  );
}
