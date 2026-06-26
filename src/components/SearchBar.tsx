"use client";

import { Dispatch, SetStateAction } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="relative w-full lg:w-96">
      {/* Search Icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries..."
        className="
          h-12
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          pl-11
          pr-11
          text-sm
          text-slate-900
          placeholder:text-slate-400
          shadow-sm
          outline-none
          transition-all
          duration-300
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-500/20
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:placeholder:text-slate-500
        "
      />

      {/* Clear Button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}