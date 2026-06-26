import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          {country.flag ? (
            <img
              src={country.flag}
              alt={country.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl">
              🏳️
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {country.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {country.iso3}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Capital</p>

          <p className="mt-1 font-medium text-slate-900 dark:text-white">
            {country.capital || "—"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Currency</p>

          <p className="mt-1 font-medium text-slate-900 dark:text-white">
            {country.currency || "—"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Dial Code</p>

          <p className="mt-1 font-medium text-slate-900 dark:text-white">
            {country.dialCode || "—"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">ISO</p>

          <p className="mt-1 font-medium text-slate-900 dark:text-white">
            {country.iso2}
          </p>
        </div>
      </div>

      <Link
        href={`/country/${country.iso3}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
      >
        View Details

        <ArrowRight size={18} />
      </Link>
    </div>
  );
}