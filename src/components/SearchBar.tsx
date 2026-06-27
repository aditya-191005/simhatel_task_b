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
    setPrevSearchProp(value);
    const trimmedLocal = localValue.trim();
    const effectiveLocal = trimmedLocal.length >= 3 ? trimmedLocal : "";
    if (value !== effectiveLocal) {
      setLocalValue(value);
    }
  }

  // Debounce the change propagation to the parent container
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedLocal = localValue.trim();
      const trimmedValue = value.trim();

      const effectiveLocal = trimmedLocal.length >= 3 ? trimmedLocal : "";
      const effectiveValue = trimmedValue;

      if (effectiveLocal !== effectiveValue) {
        onChange(effectiveLocal);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange]);

  const trimmedLength = localValue.trim().length;
  const isTooShort = trimmedLength > 0 && trimmedLength < 3;
  const isActive = trimmedLength >= 3;

  let borderStyles = "";
  if (isTooShort) {
    borderStyles = "border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 dark:border-amber-700/80 dark:focus:border-amber-500 dark:focus:ring-amber-500/25";
  } else if (isActive) {
    borderStyles = "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-emerald-700/80 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/25";
  } else {
    borderStyles = "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-800 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";
  }

  const remainingChars = 3 - trimmedLength;
  const helperText = remainingChars === 1
    ? "Enter 1 more character to search"
    : `Enter ${remainingChars} more characters to search`;

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
        className={`h-10 w-full rounded-xl border bg-slate-50/50 pl-9 pr-9 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:bg-white dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-950 ${borderStyles}`}
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

      {isTooShort && (
        <div className="absolute top-[calc(100%+8px)] left-4 z-50 flex items-center gap-2 rounded-xl border border-amber-200/80 bg-white/95 p-2 px-3 text-[11px] font-semibold text-slate-700 shadow-lg shadow-amber-500/5 backdrop-blur-md transition-all duration-300 dark:border-amber-900/50 dark:bg-slate-900/95 dark:text-slate-300 dark:shadow-black/40">
          {/* Tooltip arrow */}
          <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 border-l border-t border-amber-200/80 bg-white dark:border-amber-900/50 dark:bg-slate-900" />
          
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          
          <span className="whitespace-nowrap">{helperText}</span>
        </div>
      )}
    </div>
  );
}