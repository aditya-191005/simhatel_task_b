"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">

        <div className="mb-6 text-7xl">
          ⚠️
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h1>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          We couldn't load the requested information.
          Please try again.
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}