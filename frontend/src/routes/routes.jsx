import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { loginAction } from '../actions/loginAction';
import { registerAction } from '../actions/registerAction';
import { protectRoutersLoader } from '../loaders/protectRoutersLoader';

// Layout e App carregados normalmente
import Layout from '../components/Layout';
import App from '../App';
import ExpenseDetails from '../pages/Expenses/ExpenseDetails';
import { redirectIfAuthenticatedLoader } from '../loaders/redirectIfAuthenticatedLoader';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
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
    loader: redirectIfAuthenticatedLoader,
    children: [
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/',
        loader: protectRoutersLoader,
        children: [
          { index: true, element: <App /> },
          {
            path: 'groups',
            children: [
              { index: true, element: <Groups /> },
              {
                path: ':group_id',
                element: <GroupDetails />,
              },
              {
                path: ':group_id/expenses/:expense_id',
                element: <ExpenseDetails />,
              },
              {
                path: ':group_id/settings',
                element: <GroupSettings />,
              },
            ],
          },

          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
