import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import {
  Building2,
  Coins,
  Phone,
  BadgeInfo,
  Globe,
} from "lucide-react";

import {
  getCountryByIso3,
  getCountryPopulation,
  getCountryStates,
  getCountryCities,
} from "@/lib/api";

import PopulationChart from "@/components/PopulationChart";
import StatesAndCities from "@/components/StatesAndCities";
import FlagImage from "@/components/FlagImage";

interface CountryPageProps {
  params: Promise<{
    iso3: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { iso3 } = await params;

  const country = await getCountryByIso3(iso3);

  if (!country) {
    notFound();
  }

  // Fetch population, states, and cities in parallel
  const [population, states, cities] = await Promise.all([
    getCountryPopulation(country.iso3),
    getCountryStates(country.name),
    getCountryCities(country.name),
  ]);

  const latestPopulation =
    population.length > 0
      ? population[population.length - 1].value.toLocaleString()
      : "N/A";

  return (
    <main className="min-h-screen bg-background pb-16 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <BackButton />
        </div>

        {/* Hero Banner Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Flag image */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-32 sm:w-32">
              <FlagImage
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="h-full w-full object-cover"
                size="lg"
              />
            </div>

            {/* Title and Badge Metadata */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Country Profile
                </span>
              </div>
              
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                {country.name}
              </h1>

              {/* Counts Badge List */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center rounded-xl bg-indigo-50 border border-indigo-100/50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-900/30 dark:bg-indigo-950/40 dark:text-indigo-300">
                  ISO Code: {country.iso3}
                </span>

                <span className="inline-flex items-center rounded-xl bg-emerald-50 border border-emerald-100/50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {latestPopulation} People
                </span>

                <span className="inline-flex items-center rounded-xl bg-amber-50 border border-amber-100/50 px-3.5 py-1.5 text-xs font-bold text-amber-700 dark:border-amber-900/30 dark:bg-amber-950/40 dark:text-amber-300">
                  {states.length} States
                </span>

                <span className="inline-flex items-center rounded-xl bg-pink-50 border border-pink-100/50 px-3.5 py-1.5 text-xs font-bold text-pink-700 dark:border-pink-900/30 dark:bg-pink-950/40 dark:text-pink-300">
                  {cities.length} Cities
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Indicators Stats Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Capital */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-200 group-hover:scale-105 dark:bg-blue-950/40 dark:text-blue-400">
              <Building2 size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Capital City
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-100 line-clamp-1">
              {country.capital || "N/A"}
            </h2>
          </div>

          {/* Currency */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition duration-200 group-hover:scale-105 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Coins size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Currency
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-100 line-clamp-1">
              {country.currency || "N/A"}
            </h2>
          </div>

          {/* Dial Code */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition duration-200 group-hover:scale-105 dark:bg-rose-950/40 dark:text-rose-400">
              <Phone size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Dial Code
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-100 line-clamp-1">
              {country.dialCode || "N/A"}
            </h2>
          </div>

          {/* ISO Codes */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition duration-200 group-hover:scale-105 dark:bg-amber-950/40 dark:text-amber-400">
              <BadgeInfo size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              ISO 2 / 3 Codes
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-100 line-clamp-1">
              {country.iso2} / {country.iso3}
            </h2>
          </div>

        </section>

        {/* Recharts Timeline Chart */}
        <section>
          <PopulationChart data={population} />
        </section>

        {/* States and Cities Interactive Panel */}
        <section>
          <StatesAndCities states={states} cities={cities} />
        </section>

      </div>
    </main>
  );
}