import { TableSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background pb-16 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Sticky Header Skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2">
                <div className="h-6 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-80 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-800 hidden sm:block" />
              <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Dashboard table body placeholder */}
        <TableSkeleton />
      </div>
    </main>
  );
}