import { redirect } from 'react-router';
import { useAuthStore } from '../context/stores/auth';

export async function protectRoutersLoader() {
  await useAuthStore.persist.rehydrate();
  const isAuthenticated = !!useAuthStore.getState().token;
  if (isAuthenticated) return null;
  return redirect('/login');
}
