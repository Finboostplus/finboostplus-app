import { useEffect } from 'react';
import ChartSwitcher from './components/ChartSwitcher';
import LatestExpenses from './components/LatestExpenses';
import SummaryCards from './components/SummaryCards';
import { getMe } from './services/me';
import { useLoaderData, useNavigate } from 'react-router';
import { REACTQUERY_KEYS } from './libs/ReactQuery/keys';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from './context/stores/auth';

function App() {
  /*  const store = useAuthStore();

  const loaderData = useLoaderData(); */
  /*  const { data } = useQuery({
    queryKey: REACTQUERY_KEYS.USER.ME,
    enabled: !storeUser.user,

    initialData: () => {
      const { user } = storeUser;
      if (Object.entries(user).length > 0) {
        storeUser.setUser(user);
        return user;
      } else {
        logout();
      }
    },
    queryFn: getMe,
  }); */

  /* useEffect(() => {
    console.log(store);
  }, []); */

  return (
    <div>
      <SummaryCards />
      <ChartSwitcher />
      <LatestExpenses />
    </div>
  );
}

export default App;
