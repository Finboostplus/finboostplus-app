export default function StatBox({ number, label, color }) {
  return (
    <div className={`${color} p-4 rounded shadow text-center`}>
      <p className="text-xs uppercase text-gray-600">{label}</p>
      <p className="font-bold text-xl text-gray-800">{number}</p>
    </div>
  );
}

export function FavoriteCategory() {
  return (
    <div className="bg-purple-200 p-4 rounded shadow text-center">
      <p className="text-xs uppercase text-gray-600">Categoria Favorita</p>
      <p className="font-bold text-lg text-purple-800">Alimentação</p>
    </div>
  );
}
