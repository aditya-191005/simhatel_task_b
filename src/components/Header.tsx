import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mb-8">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-500 text-2xl shadow-lg">
                🌍
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Country Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Explore countries with fast search, responsive analytics and
                  detailed insights.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}