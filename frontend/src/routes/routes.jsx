import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import { lazy } from 'react';
import { groupDetailsLoader } from '../pages/Groups/GroupDetails/groupDetailsLoader';
import { loginOrRegisterAction } from '../pages/Login/loginAction';
import Register from '../pages/Register';
const App = lazy(() => import('../App'));
const Layout = lazy(() => import('../components/Layout/Layout'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Groups = lazy(() => import('../pages/Groups'));
const GroupDetails = lazy(() => import('../pages/Groups/GroupDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/Notfound'));
export const routes = createBrowserRouter([
  // Rotas públicas (login e registro)
  {
    element: <Layout />,
    children: [
      { path: '/login', element: <Login />, action: loginOrRegisterAction },
      { path: '/register', element: <Register /> },
    ],
  },
  // Rotas privadas (todas as outras)
  {
    path: '/',
    element: <ProtectedRoute />, // <== Aqui é onde protegemos tudo
    errorElement: <NotFound />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <App /> }, // Redirecionamento ou página inicial
          { path: 'dashboard', element: <Dashboard /> },
          {
            path: 'groups',
            children: [
              { index: true, element: <Groups /> },
              {
                path: ':group-id',
                element: <GroupDetails />,
                loader: groupDetailsLoader,
              },
            ],
          },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
