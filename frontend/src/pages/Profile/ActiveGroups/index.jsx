import groupsData from '../../../mockData/pages/Groups/groups.data';
export default function ActiveGroups() {
  const groupLimit = 4;
  const groupsToShow = groupsData.slice(0, groupLimit);
  const hasMoreGroups = groupsData.length > groupLimit;

  return (
    <section className="bg-surface border border-neutral rounded-xl p-4 mb-6 shadow-sm transition-colors">
      <h2 className="text-lg font-semibold mb-3 text-text font-principal">
        Grupos Ativos
      </h2>

      <div className="flex flex-wrap gap-2">
        {groupsToShow.map(group => (
          <a
            key={group.id}
            href={`/groups/${group.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral text-muted text-sm font-principal border border-neutral hover:bg-neutral/80 transition-colors"
          >
            <span>{group.icon}</span>
            <span className="font-medium text-text">{group.name}</span>
          </a>
        ))}

        {hasMoreGroups && (
          <a
            href="/groups"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium font-principal border border-primary/40 hover:bg-primary/30 transition-colors"
            aria-label="Ver todos os grupos"
          >
            +{groupsData.length - groupLimit} mais
          </a>
        )}
      </div>
    </section>
  );
}
