import ButtonUI from '../ui/Button';

export default function Pagination({ page, totalPages, onNext, onPrev }) {
  return (
    <div className="flex w-full justify-center gap-4 mt-6">
      <ButtonUI
        onClick={onPrev}
        disabled={page === 0}
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
      >
        {'<'}
      </ButtonUI>

      <span className="px-2 py-2 text-text font-medium">
        {page + 1} / {totalPages}
      </span>

      <ButtonUI
        onClick={onNext}
        disabled={page === totalPages - 1}
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
      >
        {'>'}
      </ButtonUI>
    </div>
  );
}
