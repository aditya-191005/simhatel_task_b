"use client";

import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface SearchBarProps {
  search: string;
}

export default function SearchBar({
  search,
}: SearchBarProps) {
  const [value, setValue] = useState(search);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Keep input synced with URL (Back/Forward navigation)
  useEffect(() => {
    setValue(search);
  }, [search]);

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim().length >= 3) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      // Whenever search changes, go back to page 1
      params.set("page", "1");

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-full lg:w-96">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search countries..."
        className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-11 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      />

      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}