import type { Country } from "@/types/country";
import CountryRow from "./CountryRow";

interface CountryTableProps {
  countries: Country[];
}

export default function CountryTable({
  countries,
}: CountryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-slate-50/75 border-b border-slate-200/80 backdrop-blur-md dark:bg-slate-900/75 dark:border-slate-800">
            <tr>
              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Flag
              </th>

              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Country
              </th>

              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Capital
              </th>

              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Currency
              </th>

              <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Dial Code
              </th>

              <th className="px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {countries.map((country) => (
              <CountryRow
                key={country.iso3}
                country={country}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}