import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FlagImage from "./FlagImage";

import type { Country } from "@/types/country";

interface CountryRowProps {
  country: Country;
}

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr className="group border-b border-slate-100/70 last:border-0 transition-colors duration-200 hover:bg-slate-50/50 dark:border-slate-800/50 dark:hover:bg-slate-800/40">
      
      {/* Flag */}
      <td className="px-6 py-3.5">
        <div className="flex h-10 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <FlagImage
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="h-full w-full object-cover"
          />
        </div>
      </td>

      {/* Country Name and ISO Code */}
      <td className="px-6 py-3.5">
        <div className="font-semibold text-sm text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {country.name}
        </div>
        <div className="mt-0.5 text-xs text-slate-400 font-medium">
          {country.iso3}
        </div>
      </td>

      {/* Capital */}
      <td className="px-6 py-3.5 text-sm font-medium text-slate-500 dark:text-slate-450">
        {country.capital || "—"}
      </td>

      {/* Currency Badge */}
      <td className="px-6 py-3.5">
        {country.currency ? (
          <span className="inline-flex items-center rounded-xl border border-indigo-150/40 bg-indigo-50/60 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-950/40 dark:text-indigo-300">
            {country.currency}
          </span>
        ) : (
          <span className="text-slate-400 dark:text-slate-650">—</span>
        )}
      </td>

      {/* Dial Code */}
      <td className="px-6 py-3.5 text-sm font-semibold text-slate-500 dark:text-slate-450">
        {country.dialCode ? `+${country.dialCode.replace("+", "")}` : "—"}
      </td>

      {/* View Action Link */}
      <td className="px-6 py-3.5 text-center">
        <Link
          href={`/country/${country.iso3}`}
          className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-indigo-900/40 dark:hover:bg-indigo-950/45 dark:hover:text-indigo-400"
        >
          View
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5 text-slate-400 group-hover/btn:text-indigo-600 dark:group-hover/btn:text-indigo-400"
          />
        </Link>
      </td>
    </tr>
  );
}