import { DetailSkeleton } from "@/components/LoadingSkeleton";

export default function CountryLoading() {
  return (
    <main className="min-h-screen bg-background pb-16 text-slate-900 dark:text-slate-100">
      <DetailSkeleton />
    </main>
  );
}
