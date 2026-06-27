"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isPending = false,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    if (isPending || page < 1 || page > totalPages) return;
    onPageChange(page);
  }

  function createPagination(): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
      return pages;
    }

    if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
      return pages;
    }

    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );

    return pages;
  }

  const pages = createPagination();

  return (
    <nav className={cn("flex items-center justify-center gap-1.5 pt-8", className)}>
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={isPending || currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-slate-100/50 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:disabled:bg-slate-900/30 dark:disabled:text-slate-700 dark:disabled:border-slate-900"
        aria-label="Previous page"
        type="button"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-xs font-semibold text-slate-400 dark:text-slate-600"
            >
              ...
            </span>
          );
        }

        const isActive = item === currentPage;

        return (
          <button
            key={`page-${item}`}
            onClick={() => goToPage(item)}
            disabled={isPending}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15 border border-indigo-600 font-extrabold scale-105"
                : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
            type="button"
          >
            {item}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={isPending || currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-slate-100/50 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:disabled:bg-slate-900/30 dark:disabled:text-slate-700 dark:disabled:border-slate-900"
        aria-label="Next page"
        type="button"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}