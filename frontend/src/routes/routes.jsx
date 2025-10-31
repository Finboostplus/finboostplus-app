import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { groupAction } from '../actions/groupAction';
import { loginAction } from '../actions/loginAction';
import { registerAction } from '../actions/registerAction';
import { groupSettingsLoader } from '../pages/Groups/GroupDetails/GroupSettings/groupSettingsLoader';
import { loginLoader } from '../loaders/loginLoader';
import { registerLoader } from '../loaders/registerLoader';
import { protectRoutersLoader } from '../loaders/protectRoutersLoader';
import { groupDetailsLoader } from '../pages/Groups/GroupDetails/groupDetailsLoader';

// Componentes lazy
const App = lazy(() => import('../App'));
const Layout = lazy(() => import('../components/Layout'));
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
    ],
  },
  {
    path: '/',
    errorElement: <NotFound />,
    loader: protectRoutersLoader,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <App /> },
          { path: 'dashboard', element: <Dashboard /> },
          {
            path: 'groups',
            children: [
              { index: true, element: <Groups />, action: groupAction },
              {
                path: ':group_id',
                element: <GroupDetails />,
                loader: groupDetailsLoader,
              },
              {
                path: ':group_id/settings',
                element: <GroupSettings />,
                loader: groupSettingsLoader,
              },
            ],
          },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
