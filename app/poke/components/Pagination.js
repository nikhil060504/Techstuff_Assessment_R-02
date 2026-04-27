function Pagination({ page, total, size, onNext, onPrev }) {
  const totalPages = Math.ceil(total / size);
  const atStart = page <= 0;
  const atEnd = (page + 1) * size >= total;

  return (
    <div className="flex items-center justify-between mt-4 bg-white p-4 rounded shadow">
      <button
        onClick={onPrev}
        disabled={atStart}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Prev
      </button>

      <span className="text-gray-600">
        {page + 1} / {totalPages || 1}
      </span>

      <button
        onClick={onNext}
        disabled={atEnd}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
