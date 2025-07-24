import { mockGroups } from '../../Groups/mockGroups';
import { Menu, MenuItem } from '@headlessui/react';

export default function ActiveGroups() {
  const groupLimit = 4;
  const groupsToShow = mockGroups.slice(0, groupLimit);
  const hasMoreGroups = mockGroups.length > groupLimit;

  return (
    <section className="bg-white border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Grupos Ativos</h2>
      <div className="flex gap-2 items-center ">
        <Menu as="div" className="flex gap-2 flex-wrap">
          {groupsToShow.map(group => (
            <MenuItem key={group.id}>
              <a href={`/groups/${group.id}`}>
                <Groups label={`${group.icon} ${group.name}`} />
              </a>
            </MenuItem>
          ))}

          {hasMoreGroups && (
            <MenuItem>
              <a
                href="/groups"
                className="inline-block p-2 border rounded text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                aria-label="Ver todos os grupos"
              >
                +{mockGroups.length - 4} mais
              </a>
            </MenuItem>
          )}
        </Menu>
      </div>
    </section>
  );
}

function Groups({ label }) {
  return (
    <div className="inline-block p-2  border rounded text-sm bg-gray-100">
      {label}
    </div>
  );
}
