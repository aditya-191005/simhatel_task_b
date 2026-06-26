import Header from "@/components/Header";
import { getCountries } from "@/lib/api";

export default async function Home() {
  const countries = await getCountries();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 text-slate-900 transition-colors duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />

      </div>
    </main>
  );
}