import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Country } from "@/types/country";

interface CountryRowProps {
  country: Country;
}

export default function CountryRow({
  country,
}: CountryRowProps) {
  return (
    <tr className="group border-t border-slate-200 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
      {/* Flag */}
      <td className="px-6 py-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          {country.flag ? (
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl">🏳️</span>
          )}
        </div>
      </td>

      {/* Country */}
      <td className="px-6 py-4">
        <div className="font-semibold text-slate-900 dark:text-white">
          {country.name}
        </div>

        <div className="mt-1 text-sm text-slate-500">
          {country.iso3}
        </div>
      </td>

      {/* Capital */}
      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
        {country.capital || "—"}
      </td>

      {/* Currency */}
      <td className="px-6 py-4">
        <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {country.currency || "—"}
        </span>
      </td>

      {/* Dial Code */}
      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
        {country.dialCode || "—"}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <Link
          href={`/country/${country.iso3}`}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg"
        >
          View

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </td>
    </tr>
  );
}