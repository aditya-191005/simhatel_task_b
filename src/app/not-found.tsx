import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-7xl">🌍</div>

        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-800 dark:text-slate-200">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          The page or country you are looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}