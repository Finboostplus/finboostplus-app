// src/routes/ProtectedRoute.jsx
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedRoute() {
  const [cookies] = useCookies(['access_token']);
  const location = useLocation();

  const isAuthenticated = Boolean(cookies.access_token);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
