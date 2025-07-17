// src/components/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router';

// Exemplo: verifica se há token salvo (ajuste conforme sua lógica real)
const isAuthenticated = () => true; //Boolean(localStorage.getItem('token'));

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
