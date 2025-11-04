import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import ButtonUI from '../../../ui/Button';

import useMeQuery from '../../../../hooks/ReactQuery/useMeQuery';
import { useMembersQuery } from '../../../../hooks/ReactQuery/useMembersQuery';
import InputUI from '../../../ui/Input';
import Pagination from '../../../PaginationController';

export default function ListMembers({ groupID, onClose, onConfirm }) {
  const [search, setSearch] = useState(''); // termo final para API
  const [inputValue, setInputValue] = useState(''); // valor do input enquanto digita
  const [page, setPage] = useState(0);

  const { data: user } = useMeQuery();
  const {
    data: { members, totalPages } = { members: [], totalPages: 0 },
    isLoading,
  } = useMembersQuery(groupID, page, search);

  const [checkedMembers, setCheckedMembers] = useState([]);

  const excludeSelf = false; // se excluir da lista de membros

  const filteredMembers = useMemo(() => {
    if (!members) return [];
    return excludeSelf ? members.filter(m => m.id !== user?.id) : members;
  }, [members, user, excludeSelf]);

  // Alterna seleção de membros
  const toggleMember = id => {
    setCheckedMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Debounce para busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue.trim());
      setPage(0);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]); // 👈 apenas inputValue aqui

  // Reseta seleção ao mudar de página ou busca
  useEffect(() => {
    setCheckedMembers([]);
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Campo de busca */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <InputUI
          type="text"
          placeholder="Buscar membro pelo nome..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Lista de membros */}
      <div className="max-h-64 overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
        {isLoading ? (
          <p className="text-sm text-muted text-center py-4 animate-pulse">
            Carregando membros...
          </p>
        ) : filteredMembers.length > 0 ? (
          filteredMembers.map(member => {
            const isSelected = checkedMembers.includes(member.id);

            return (
              <div
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className={`
            group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer
            transition-all duration-200 border
            ${
              isSelected
                ? 'bg-primary/10 border-primary/40 shadow-sm'
                : 'border-transparent hover:bg-primary/5 hover:border-primary/20'
            }
          `}
              >
                {/* Avatar + nome */}
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm shadow-sm group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: member.themeColor || '#888' }}
                  >
                    {member.name[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-text font-medium leading-tight truncate">
                      {member.name}
                    </span>
                    {member.role && (
                      <span className="text-xs text-muted capitalize">
                        {member.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rótulo de seleção */}
                {isSelected && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full animate-fade-in">
                    Selecionado
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted text-center py-4">
            Nenhum membro encontrado
          </p>
        )}
      </div>

      {/* Paginação simples */}
      {totalPages > 1 && (
        <Pagination
          onNext={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          onPrev={() => setPage(prev => Math.max(prev - 1, 0))}
          page={page}
          totalPages={totalPages}
        />
      )}

      {/* Botões de ação */}
      <div className="flex justify-end gap-3 mt-4">
        <ButtonUI
          type="button"
          disabled={checkedMembers.length === 0}
          aria-disabled={checkedMembers.length === 0}
          onClick={() =>
            onConfirm(
              filteredMembers.filter(m => checkedMembers.includes(m.id))
            )
          }
          className={`px-6 py-2 rounded-lg font-semibold shadow-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-surface-dark bg-primary hover:bg-primary/90 active:bg-primary-dark cursor-pointer ${
            checkedMembers.length === 0
              ? 'opacity-50 bg-gray-400! cursor-not-allowed!'
              : ''
          }`}
        >
          Confirmar
        </ButtonUI>
      </div>
    </div>
  );
}
