export default function UserGreeting() {
  return (
    <div className="flex items-center gap-2 mb-8 border-b-2">
      {/* <img
        src="/user-avatar.png"
        alt="Avatar"
        className="w-10 h-10 rounded-full"
      /> */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white bg-purple-700">
        J
      </div>
      <span className="text-lg font-semibold">Olá, Usuário!</span>
    </div>
  );
}
