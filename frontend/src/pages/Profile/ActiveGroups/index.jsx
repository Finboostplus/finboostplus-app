import { mockGroups } from '../../Groups/mockGroups';

export default function ActiveGroups() {
  const groupLimit = 4;
  const groupsToShow = mockGroups.slice(0, groupLimit);
  const hasMoreGroups = mockGroups.length > groupLimit;

  return (
    <section className="bg-white border rounded-xl p-4 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Grupos Ativos
      </h2>

      <div className="flex flex-wrap gap-2">
        {groupsToShow.map(group => (
          <a
            key={group.id}
            href={`/groups/${group.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-300 hover:bg-gray-200 transition"
          >
            <span>{group.icon}</span>
            <span className="font-medium">{group.name}</span>
          </a>
        ))}

        {hasMoreGroups && (
          <a
            href="/groups"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium border border-blue-200 hover:bg-blue-200 transition"
            aria-label="Ver todos os grupos"
          >
            +{mockGroups.length - groupLimit} mais
          </a>
        )}
      </div>
    </section>
  );
}
