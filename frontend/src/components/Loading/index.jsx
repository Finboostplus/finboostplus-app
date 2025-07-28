export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-neutral text-text">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mb-4"
        role="status"
        aria-label="Carregando"
      ></div>
      <p className="text-sm font-medium">Carregando...</p>
    </div>
  );
}
