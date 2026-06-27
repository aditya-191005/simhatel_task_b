import DashboardContainer from "@/components/DashboardContainer";
import { getCountries } from "@/lib/api";

export default async function Home() {
  const countries = await getCountries();

  return (
    <main className="min-h-screen bg-background text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <DashboardContainer countries={countries} />
      </div>
    </main>
  );
}