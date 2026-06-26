"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}