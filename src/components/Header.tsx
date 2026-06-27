"use client";

import { Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

interface HeaderProps {
  totalCountries: number;
  search: string;
  onSearchChange: (value: string) => void;
  isPending?: boolean;
}

export default function Header({
  totalCountries,
  search,
  onSearchChange,
  isPending = false,
}: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
        <div className="flex flex-col gap-4 p-3.5 lg:p-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Side: Brand, Description, and Counter Badge */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20 dark:from-indigo-600 dark:to-blue-700 dark:shadow-none">
              <Globe className="h-5 w-5 stroke-[2] animate-[spin_120s_linear_infinite]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                  Countries
                </h1>
                <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {totalCountries} total
                </span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Demographics and municipal profiles
              </p>
            </div>
          </div>

          {/* Right Side: Search and Theme Toggle side-by-side */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <SearchBar
              value={search}
              onChange={onSearchChange}
              isPending={isPending}
            />
            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}