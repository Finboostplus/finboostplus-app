import ChartSwitcher from './components/ChartSwitcher';
import EmptyGroupInvite from './components/EmptyGroupInvite';
import LatestExpenses from './components/LatestExpenses';
import SummaryCards from './components/SummaryCards';
import { useGroupsQuery } from './hooks/ReactQuery/Queries/useGroupsQuery';

function App() {
  const { data } = useGroupsQuery();

  const hasGroups = (data?.groupsLength ?? 0) > 0;

  return (
    <div className="flex flex-col gap-10">
      {hasGroups ? (
        <>
          <SummaryCards />
          <ChartSwitcher />
          <LatestExpenses />
        </>
      ) : (
        <EmptyGroupInvite />
      )}
    </div>
  );
}

export default App;
