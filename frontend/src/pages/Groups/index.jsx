import CardUI from '../../components/ui/Card';

const mockGroups = [
  {
    name: 'Casal - Marina & João',
    members: ['A', 'B'],
    status: 'Você deve: R$ 47,50',
    statusColor: 'text-red-600',
    icon: '🚴‍♂️',
  },
  {
    name: 'Família Silva',
    members: ['A', 'B', 'C', 'D'],
    status: 'Você recebe: R$ 25,00',
    statusColor: 'text-green-600',
    icon: '👪',
  },
  {
    name: 'Apartamento Compartilhado',
    members: ['A', 'B', 'C', 'D', '+3'],
    status: 'Sem pendências',
    statusColor: 'text-gray-500',
    icon: '🏢',
  },
];

export default function Groups() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-center md:hidden">
            Meus grupos
          </h1>
        </div>
        <h2 className="text-2xl font-bold mb-4 hidden md:block">Meus grupos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockGroups.map((group, idx) => (
            <CardUI
              className={'border rounded-lg p-4 shadow-sm bg-white'}
              key={idx}
            >
              <div className="flex items-center gap-2 mb-2 text-lg">
                <span>{group.icon}</span>
                <h3 className="font-semibold">{group.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {group.members.length} Membros
              </p>

              <div className="relative h-6 w-[calc(1.5rem+0.5rem*number_of_members)]">
                {group.members.map((m, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center absolute border border-black shadow-sm shadow-gray-600"
                    style={{
                      left: `${idx * 1.2}rem`, // desloca para a direita
                      zIndex: group.members.length - idx, // mais à esquerda, mais acima
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className={`text-sm font-semibold ${group.statusColor}`}>
                {group.status}
              </p>
            </CardUI>
          ))}
        </div>
      </main>
    </div>
  );
}
