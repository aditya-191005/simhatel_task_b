"use client";

import { useEffect, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isPending?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  isPending = false,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [prevSearchProp, setPrevSearchProp] = useState(value);

  // Sync local input value with parent prop during render (e.g. back/forward browser navigation)
  if (value !== prevSearchProp) {
    setLocalValue(value);
    setPrevSearchProp(value);
  }

  // Debounce the change propagation to the parent container
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange]);

  return (
    <div className="relative w-full flex-1 lg:w-96 lg:flex-initial">
      {/* Dynamic search / spinner icon feedback */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
        {isPending ? (
          <Loader2 size={16} className="animate-spin text-indigo-500 dark:text-indigo-400" />
        ) : (
          <Search size={16} />
        )}
      </div>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search countries..."
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-9 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-950 dark:focus:ring-indigo-500/20"
      />

      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          type="button"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}