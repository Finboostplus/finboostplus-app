import userData from '../../../mockData/user/user.data';

export default function ActiveGroups() {
  const current_user = userData;
  const groupLimit = 4;
  const groupsToShow = current_user.groups.slice(0, groupLimit);
  const hasMoreGroups = current_user.groups.length > groupLimit;

  return (
    <div className="flex flex-wrap gap-2">
      {groupsToShow.map(group => (
        <a
          key={group.id}
          href={`/groups/${group.id}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20 text-text text-sm font-principal border border-muted hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <span className="text-xl">{group.icon}</span>
          <span className="font-medium">{group.name}</span>
        </a>
      ))}

      {hasMoreGroups && (
        <a
          href="/groups"
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-principal border border-primary/30 hover:bg-primary/20 transition-colors"
          aria-label="Ver todos os grupos"
        >
          +{current_user.groups.length - groupLimit} mais
        </a>
      )}
    </div>
  );
}
