import ChartSwitcher from './components/ChartSwitcher';
import LatestExpenses from './components/LatestExpenses';
import SummaryCards from './components/SummaryCards';

function App() {
  return (
    <div className="">
      <SummaryCards />
      <ChartSwitcher />
      <LatestExpenses />
    </div>
  );
}

export default App;
