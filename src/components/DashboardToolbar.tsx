"use client";

import { Dispatch, SetStateAction } from "react";
import { Globe2 } from "lucide-react";

import SearchBar from "./SearchBar";

interface DashboardToolbarProps {
  totalCountries: number;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function DashboardToolbar({
  totalCountries,
  search,
  setSearch,
}: DashboardToolbarProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-950">
              <Globe2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Countries
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Browse countries, capitals, currencies and dial codes.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            🌍 {totalCountries} Countries Loaded
          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
    </section>
  );
}