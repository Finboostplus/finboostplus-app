export default function ActiveGroups() {
  return (
    <section className="bg-white border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Grupos Ativos</h2>
      <div className="flex gap-2">
        <Groups label="👨‍❤️‍👩 Casal - Marina & João" />
        <Groups label="✈️ Férias - Marina & João" />
      </div>
    </section>
  );
}

function Groups({ label }) {
  return (
    <div className="inline-block px-2 py-1 border rounded text-sm bg-gray-100">
      {label}
    </div>
  );
}
