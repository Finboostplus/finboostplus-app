import ChartSwitcher from './components/ChartSwitcher';
import EmptyGroupInvite from './components/EmptyGroupInvite';
import LatestExpenses from './components/LatestExpenses';
import SummaryCards from './components/SummaryCards';
import { useGroupsQuery } from './hooks/ReactQuery/Queries/useGroupsQuery';

function App() {
  const {
    data: { groupsLength },
  } = useGroupsQuery();
  return (
    <div className="flex flex-col gap-10">
      {groupsLength == 0 ? (
        <EmptyGroupInvite />
      ) : (
        <>
          <SummaryCards />
          <ChartSwitcher />
          <LatestExpenses />
        </>
      )}
    </div>
  );
}

export default App;
