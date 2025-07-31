import ChartSwitcher from './components/ChartSwitcher';
import SummaryCards from './components/SummaryCards';
import LatestExpenses from './pages/Expenses/LatestExpenses';
import './styles/globals.css';

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
