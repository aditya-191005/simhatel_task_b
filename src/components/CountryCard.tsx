import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      
      {/* Header Flag & Name */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700/60 dark:bg-slate-950">
          {country.flag ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xl">
              🏳️
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-250">
            {country.name}
          </h3>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {country.iso3}
          </p>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-slate-100 pt-4 text-xs dark:border-slate-800/80">
        <div>
          <p className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
            Capital
          </p>
          <p className="mt-0.5 truncate font-medium text-slate-800 dark:text-slate-350">
            {country.capital || "—"}
          </p>
        </div>

        <div>
          <p className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
            Currency
          </p>
          <p className="mt-0.5">
            {country.currency ? (
              <span className="inline-flex rounded-lg bg-indigo-50/70 px-2 py-0.5 font-bold text-indigo-700 dark:bg-indigo-950/45 dark:text-indigo-300">
                {country.currency}
              </span>
            ) : (
              <span className="font-medium text-slate-800 dark:text-slate-350">—</span>
            )}
          </p>
        </div>

        <div>
          <p className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
            Dial Code
          </p>
          <p className="mt-0.5 font-medium text-slate-800 dark:text-slate-350">
            {country.dialCode ? `+${country.dialCode.replace("+", "")}` : "—"}
          </p>
        </div>

        <div>
          <p className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
            ISO 2 Code
          </p>
          <p className="mt-0.5 font-medium text-slate-800 dark:text-slate-350">
            {country.iso2 || "—"}
          </p>
        </div>
      </div>

      {/* Action button */}
      <Link
        href={`/country/${country.iso3}`}
        className="group/btn mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-2.5 text-xs font-bold text-slate-600 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-indigo-900/40 dark:hover:bg-indigo-950/45 dark:hover:text-indigo-400"
      >
        View Details
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5 text-slate-400 group-hover/btn:text-indigo-600 dark:group-hover/btn:text-indigo-400"
        />
      </Link>
    </div>
  );
}