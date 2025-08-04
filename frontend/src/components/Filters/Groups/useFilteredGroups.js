import { useMemo } from 'react';

export function useFilteredGroups(groups, currentUserId, filters) {
  const { search, onlyOwner, sortOrder } = filters;

  return useMemo(() => {
    return groups
      .filter(
        group =>
          (!onlyOwner || group.ownerId === currentUserId) &&
          group.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      });
  }, [groups, currentUserId, filters]);
}
