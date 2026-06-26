import { notFound } from "next/navigation";

import { getCountryByIso3 } from "@/lib/api";

interface CountryPageProps {
  params: Promise<{
    iso3: string;
  }>;
}

export default async function CountryPage({
  params,
}: CountryPageProps) {
  const { iso3 } = await params;

  const country = await getCountryByIso3(iso3);

  if (!country) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Back Button */}
        <a
          href="/"
          className="mb-8 inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          ← Back to Dashboard
        </a>

        {/* Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            {/* Flag */}
            <div className="h-32 w-32 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
              {country.flag ? (
                <img
                  src={country.flag}
                  alt={country.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">
                  🏳️
                </div>
              )}
            </div>

            {/* Country Info */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                {country.name}
              </h1>

              <p className="mt-2 text-slate-500">
                Country Information
              </p>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            title="Capital"
            value={country.capital || "N/A"}
          />

          <InfoCard
            title="Currency"
            value={country.currency || "N/A"}
          />

          <InfoCard
            title="Dial Code"
            value={country.dialCode || "N/A"}
          />

          <InfoCard
            title="ISO2"
            value={country.iso2}
          />

          <InfoCard
            title="ISO3"
            value={country.iso3}
          />
        </div>
      </div>
    </main>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}