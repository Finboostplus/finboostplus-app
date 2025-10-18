// src/routes/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../context/stores/auth';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
