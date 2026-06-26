export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-60 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="mt-3 h-4 w-80 rounded bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="h-10 w-10 rounded-lg bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </main>
  );
}