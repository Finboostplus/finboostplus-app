import { createBrowserRouter } from 'react-router';
import App from '../App';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Groups from '../pages/Groups';
import Expenses from '../pages/Expenses';
import Profile from '../pages/Profile';
import NotFound from '../pages/Notfound';
import ProtectedRoute from './ProtectedRoute';

export const routes = createBrowserRouter([
  // Rotas públicas (login e registro)
  {
    children: [{ path: '/login', element: <Login /> }],
  },
  // Rotas privadas (todas as outras)
  {
    path: '/',
    //element: <ProtectedRoute />, // <== Aqui é onde protegemos tudo
    errorElement: <NotFound />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <App /> }, // Redirecionamento ou página inicial
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'groups', element: <Groups /> },
          { path: 'expenses', element: <Expenses /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
