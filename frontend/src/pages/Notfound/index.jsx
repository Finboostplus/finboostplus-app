export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-surface-dark text-text dark:text-text-dark p-4 transition-colors duration-300">
      <h1 className="text-5xl font-bold mb-4 text-primary dark:text-primary-dark">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
      <p className="text-center max-w-md text-muted dark:text-muted-dark">
        A página que você está tentando acessar não existe ou foi movida.
      </p>
    </div>
  );
}
