import ExpenseForm from '../../components/forms/ExpenseForm';

export default function Expenses({ groupData }) {
  return (
    <section className="max-w-4xl mx-auto font-principal text-text">
      <ExpenseForm groupData={groupData} />
    </section>
  );
}
