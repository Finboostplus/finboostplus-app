import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { loginAction } from '../actions/loginAction';
import { registerAction } from '../actions/registerAction';
import { loginLoader } from '../loaders/loginLoader';
import { registerLoader } from '../loaders/registerLoader';
import { protectRoutersLoader } from '../loaders/protectRoutersLoader';

// Layout e App carregados normalmente
import Layout from '../components/Layout';
import App from '../App';
import ExpenseDetails from '../pages/Expenses/ExpenseDetails';
import { protectRouterGroupLoader } from './protectRouterGroupLoader';
import { groupDetailsLoader } from '../pages/Groups/GroupDetails/groupDetailsLoader';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Groups = lazy(() => import('../pages/Groups'));
const GroupDetails = lazy(() => import('../pages/Groups/GroupDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const GroupSettings = lazy(
  () => import('../pages/Groups/GroupDetails/GroupSettings')
);
const NotFound = lazy(() => import('../pages/Notfound'));

// Export router diretamente (não como função)
export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />, // <-- Captura qualquer erro de rota
    children: [
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
        loader: registerLoader,
      },
      {
        path: '/',
        loader: protectRoutersLoader,
        children: [
          { index: true, element: <App /> },
          { path: 'dashboard', element: <Dashboard /> },
          {
            path: 'groups',
            children: [
              { index: true, element: <Groups /> },
              {
                path: ':group_id',
                element: <GroupDetails />,
                loader: groupDetailsLoader,
              },
              {
                path: ':group_id/expenses/:expense_id',
                element: <ExpenseDetails />,
                loader: groupDetailsLoader,
              },
              {
                path: ':group_id/settings',
                element: <GroupSettings />,
                loader: async () => {
                  await protectRouterGroupLoader();
                  await groupDetailsLoader();
                },
              },
            ],
          },

          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
