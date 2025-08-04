import ExpenseForm from '../../components/forms/ExpenseForm';

export default function Expenses() {
  return (
    <section className="p-6 max-w-4xl mx-auto font-[var(--font-principal)] text-[var(--color-text)]">
      <h1 className="text-2xl font-semibold mb-6">Nova Despesa</h1>
      <ExpenseForm />
    </section>
  );
}
