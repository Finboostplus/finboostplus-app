import { useEffect } from 'react';
import ChartSwitcher from './components/ChartSwitcher';
import LatestExpenses from './components/LatestExpenses';
import SummaryCards from './components/SummaryCards';
import { useAuthStore } from './context/stores/auth';

function App() {
  const user = useAuthStore(store => store.user);
  useEffect(() => {
    console.log({ user });
  }, []);
  return (
    <div>
      <SummaryCards />
      <ChartSwitcher />
      <LatestExpenses />
    </div>
  );
}

export default App;
