"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#FE6B35]"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          className={`h-10 w-10 rounded-md transition ${
            currentPage === page
              ? "bg-[#FE6B35] text-white"
              : "border border-gray-300 hover:border-[#FE6B35]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#FE6B35]"
      >
        Next
      </button>

    </nav>
  );
}