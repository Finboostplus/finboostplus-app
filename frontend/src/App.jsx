import SummaryCards from './components/SummaryCards';
import LatestExpenses from './pages/Expenses/LatestExpenses';
import './styles/globals.css';

function App() {
  return (
    <div className="">
      <SummaryCards saldo={1000.0} />
      <LatestExpenses />
    </div>
  );
}

export default App;
