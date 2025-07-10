import { createBrowserRouter } from 'react-router';
import App from '../App';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Groups from '../pages/Groups';
import Expenses from '../pages/Expenses';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'groups', element: <Groups /> },
      { path: 'expenses', element: <Expenses /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);
