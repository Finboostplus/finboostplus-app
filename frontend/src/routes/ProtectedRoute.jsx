// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router';

// Verifica se há token salvo (ajuste conforme sua lógica real)
const isAuthenticated = () => true; //Boolean(localStorage.getItem('token'));

const ProtectedRoute = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
