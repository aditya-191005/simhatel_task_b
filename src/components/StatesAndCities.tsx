"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ChevronLeft, ChevronRight, Map, Building2 } from "lucide-react";

interface StatesAndCitiesProps {
  states: string[];
  cities: string[];
}

const ITEMS_PER_PAGE = 24;

export default function StatesAndCities({ states, cities }: StatesAndCitiesProps) {
  const [activeTab, setActiveTab] = useState<"states" | "cities">("states");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const currentList = activeTab === "states" ? states : cities;

  // Filter list based on search query
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return currentList;
    const query = searchQuery.toLowerCase().trim();
    return currentList.filter((item) => item.toLowerCase().includes(query));
  }, [currentList, searchQuery]);

  // Paginated list
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / ITEMS_PER_PAGE));

  return (
    <div className="space-y-6">
      {/* Navigation Tabs and Search */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Tabs */}
        <div className="flex rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-950 sm:w-auto">
          <button
            onClick={() => {
              setActiveTab("states");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "states"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Map size={16} />
            States
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold transition-colors duration-200 ${
                activeTab === "states"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {states.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("cities");
              setSearchQuery("");
              setCurrentPage(1);
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "cities"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Building2 size={16} />
            Cities
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold transition-colors duration-200 ${
                activeTab === "cities"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {cities.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            placeholder={
              activeTab === "states" ? "Search states..." : "Search cities..."
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pr-10 pl-11 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Grid Content */}
      {filteredList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-600">
            <Search size={22} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
            No Results Found
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm">
            We couldn&apos;t find any {activeTab} matching &ldquo;{searchQuery}&rdquo;.
            Please check the spelling or try a different term.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {paginatedList.map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className="group flex flex-col justify-center rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200/60 pt-6 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredList.length)} of{" "}
                {filteredList.length} {activeTab}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-slate-100/50 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:disabled:bg-slate-900/30 dark:disabled:text-slate-700 dark:disabled:border-slate-900"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Generate pagination items dynamically surrounding current page
                    let pageNum = i + 1;
                    if (currentPage > 3 && totalPages > 5) {
                      if (currentPage + 2 > totalPages) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-9 min-w-9 rounded-xl px-2.5 text-xs font-semibold transition-all duration-200 ${
                          currentPage === pageNum
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15 border border-indigo-600 font-extrabold scale-105"
                            : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-slate-100/50 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:disabled:bg-slate-900/30 dark:disabled:text-slate-700 dark:disabled:border-slate-900"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
