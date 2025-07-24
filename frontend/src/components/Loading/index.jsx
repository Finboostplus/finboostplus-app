export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
        role="status"
        aria-label="Carregando"
      ></div>
    </div>
  );
}
