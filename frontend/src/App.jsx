import SummaryCards from './components/SummaryCards';
import LatestExpenses from './pages/Expenses/LatestExpenses';
import './styles/globals.css';

function App() {
  return (
    <div className="px-20">
      <SummaryCards saldo={'1.000,00'} />
      <LatestExpenses />
    </div>
  );
}

export default App;
