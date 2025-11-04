import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { formatBRL } from '../../../utils/formatters';
import InputUI from '../../../components/ui/Input';
import SelectUI from '../../../components/ui/Select';
import CheckboxUI from '../../../components/ui/Checkbox';
import { Link } from 'react-router';

export const expenses = [
  {
    id: 1,
    description: 'Pizza da sexta-feira',
    amount: 128.5,
    status: 'PENDING',
    payerName: 'LunaStar',
    createdAt: '2025-10-29T20:15:00Z',
  },
  {
    id: 2,
    description: 'Supermercado do mês',
    amount: 450.0,
    status: 'PAID',
    payerName: 'Clark Kent',
    createdAt: '2025-10-25T14:45:00Z',
  },
  {
    id: 3,
    description: 'Assinatura Netflix',
    amount: 55.9,
    status: 'PAID',
    payerName: 'LunaStar',
    createdAt: '2025-10-20T12:00:00Z',
  },
  {
    id: 4,
    description: 'Taxi para o evento',
    amount: 79.75,
    status: 'PENDING',
    payerName: 'Clark Kent',
    createdAt: '2025-10-30T08:30:00Z',
  },
  {
    id: 5,
    description: 'Jantar no restaurante',
    amount: 230.0,
    status: 'PENDING',
    payerName: 'LunaStar',
    createdAt: '2025-10-31T22:10:00Z',
  },
  {
    id: 6,
    description: 'Conta de energia',
    amount: 189.9,
    status: 'PAID',
    payerName: 'Clark Kent',
    createdAt: '2025-10-28T10:45:00Z',
  },
];

export default function ExpensesList({ group }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [allMembers, setAllMembers] = useState(false);
  const isLoading = false;

  // 💡 Filtro local (mock sem API)
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchSearch = expense.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = status === 'ALL' ? true : expense.status === status;
      const matchMember = allMembers ? true : expense.payerName === 'LunaStar';
      return matchSearch && matchStatus && matchMember;
    });
  }, [search, status, allMembers]);

  return (
    <section
      className="bg-surface p-6 rounded-md shadow-lg transition-all"
      aria-labelledby="expenses-heading"
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          id="expenses-heading"
          className="text-2xl font-semibold text-text font-principal"
        >
          Despesas do grupo
        </h2>
      </div>

      {/* 🔍 Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
        {/* 🔎 Busca + Status */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Campo de busca */}
          <div className="relative flex-1 min-w-[220px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <InputUI
              placeholder="Buscar despesa..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 w-full h-10 rounded-lg border border-border/50 bg-surface-light focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>

          {/* Select de status */}
          <div className="flex items-center">
            <SelectUI
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full sm:w-[160px] h-10 rounded-lg border border-border/50 bg-surface-light text-sm focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
            >
              {[
                { label: 'Todas', value: 'ALL' },
                { label: 'Pendentes', value: 'PENDING' },
                { label: 'Pagas', value: 'PAID' },
              ].map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectUI>
          </div>
        </div>

        {/* 🎚️ Filtro extra */}
        <div className="flex items-center gap-3">
          <CheckboxUI
            label="Mostrar de todos os membros"
            checked={allMembers}
            onChange={setAllMembers}
          />
        </div>
      </div>

      {/* 🧾 Lista */}
      {isLoading ? (
        <p className="text-muted text-sm italic">Carregando despesas...</p>
      ) : filteredExpenses.length > 0 ? (
        <ul className="space-y-3 font-principal">
          {filteredExpenses.map(expense => (
            <li key={expense.id}>
              <Link className="flex justify-between items-center px-4 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/20">
                <div className="flex flex-col">
                  <span className="text-text text-base sm:text-lg font-medium">
                    {expense.description}
                  </span>
                  <span className="text-xs sm:text-sm text-muted">
                    por {expense.payerName}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className={`block font-semibold text-base sm:text-lg ${
                      expense.status === 'PENDING'
                        ? 'text-warning'
                        : 'text-success'
                    }`}
                  >
                    - {formatBRL(expense.amount)}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(expense.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted text-sm italic text-center mt-4">
          Nenhuma despesa encontrada.
        </p>
      )}
    </section>
  );
}
