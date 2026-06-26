import type { Country } from "@/types/country";
import CountryRow from "./CountryRow";

interface CountryTableProps {
  countries: Country[];
}

export default function CountryTable({
  countries,
}: CountryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Flag
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Country
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Capital
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Currency
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Dial Code
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
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