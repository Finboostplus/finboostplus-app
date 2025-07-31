import { useLocation } from 'react-router';

export function useCurrentPage() {
  const location = useLocation();

  const pathname = location.pathname;

  const parhSegments = pathname.split('/').filter(Boolean);

  const currentPage = parhSegments[0] || '';

  return currentPage;
}
