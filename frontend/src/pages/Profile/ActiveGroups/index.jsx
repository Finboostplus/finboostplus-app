import { useGroupsQuery } from '../../../hooks/ReactQuery/useGroupsQuery';
import { CategoryIcon } from '../../../mockData/groupIcons/icons';

export default function ActiveGroups() {
  const { data: groups } = useGroupsQuery();
  const groupLimit = 4;
  const groupsToShow = groups?.content.slice(0, groupLimit);
  const hasMoreGroups = groups?.totalElements > groupLimit;

  return (
    <div className="flex flex-wrap gap-2">
      {groupsToShow?.map(group => (
        <a
          key={group.id}
          href={`/groups/${group.id}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20 text-text text-sm font-principal border border-muted hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <span className="text-xl">
            <CategoryIcon categoryKey={group.icon} />
          </span>
          <span className="font-medium">{group.name}</span>
        </a>
      ))}

      {hasMoreGroups && (
        <a
          href="/groups"
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-principal border border-primary/30 hover:bg-primary/20 transition-colors"
          aria-label="Ver todos os grupos"
        >
          +{groups.totalElements - groupLimit} mais
        </a>
      )}
    </div>
  );
}
