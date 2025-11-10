import { redirect } from 'react-router';
import { useAuthStore } from '../context/stores/auth';

export async function redirectIfAuthenticatedLoader({ request }) {
  await useAuthStore.persist.rehydrate();

  const { token } = useAuthStore.getState();
  const isAuthenticated = !!token;

  const url = new URL(request.url);
  const path = url.pathname;
  const publicRoutes = ['/login', '/register'];

  const isPublicRoute = publicRoutes.includes(path);

  if (isAuthenticated && isPublicRoute) {
    return redirect('/');
  }

  return null;
}
