import React from 'react';
import CheckboxUI from '../../ui/Checkbox';
import InputUI from '../../ui/Input';
import SelectUI from '../../ui/Select';

export default function GroupFilters({
  search,
  onlyOwner,
  sortOrder,
  onFilterChange,
}) {
  const handleSearchChange = e => {
    onFilterChange({ search: e.target.value, onlyOwner, sortOrder });
  };

  const handleSortChange = e => {
    onFilterChange({ search, onlyOwner, sortOrder: e.target.value });
  };

  const handleOwnerToggle = value => {
    onFilterChange({ search, onlyOwner: value, sortOrder });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Campo de busca */}
      <div className="w-full md:flex-1">
        <InputUI
          type="text"
          placeholder="Buscar grupo..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-lg border bg-surface text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-muted)',
          }}
        />
      </div>

      {/* Checkbox de "Apenas meus grupos" */}
      <div className="flex items-center">
        <CheckboxUI
          checked={onlyOwner}
          onChange={handleOwnerToggle}
          label="Apenas meus grupos"
        />
      </div>

      {/* Ordenação */}
      <div className="w-full md:w-auto">
        <SelectUI
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full md:w-auto px-4 py-2 rounded-lg border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer"
          options={[
            { value: 'asc', label: 'Mais antigos' },
            { value: 'desc', label: 'Mais recentes' },
          ]}
        />
      </div>
    </div>
  );
}
