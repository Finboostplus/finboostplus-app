import GroupForm from '../../components/forms/GroupForm';
import ModalButton from '../../components/ModalButton';
import CardUI from '../../components/ui/Card';
import groupsData from '../../mockData/user/groups.data';
import userData from '../../mockData/user/user.data';
export default function Groups() {
  const current_user = userData;
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral p-6 transition-colors">
      <main className="flex-1 max-w-[1200px] mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-text text-center md:text-left">
            Meus grupos
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {current_user.groups.map(group => (
            <a
              key={group.id}
              href={`/groups/${group.id}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label={`Grupo ${group.name} com ${group.members.length} membros`}
            >
              <CardUI className="p-6 rounded-2xl shadow-sm bg-surface hover:shadow-md cursor-pointer border border-neutral h-full transition-colors">
                <div className="flex items-center gap-3 mb-3 text-lg text-primary font-semibold">
                  <span className="text-2xl">{group.icon}</span>
                  <h3>{group.name}</h3>
                </div>

                <p className="text-sm text-muted mb-4">
                  {group.members.length} membro
                  {group.members.length > 1 ? 's' : ''}
                </p>

                <div
                  className="relative mb-4 h-8"
                  style={{
                    width: `${group.members.length * 1.6}rem`,
                  }}
                >
                  {group.members.map(({ name, color }, idx) => (
                    <span
                      key={idx}
                      className="bg-primary text-white text-sm w-8 h-8 rounded-full flex items-center justify-center absolute border-2 border-surface shadow-md"
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

                <p
                  className={`text-sm font-semibold select-none ${group.statusColor}`}
                >
                  {group.status}
                </p>
              </CardUI>
            </a>
          ))}
        </div>
        <ModalButton modalChildren={<GroupForm />} />
      </main>
    </div>
  );
}
