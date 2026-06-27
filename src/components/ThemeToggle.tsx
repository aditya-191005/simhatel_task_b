"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-xl border border-slate-200 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100/60 text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200/40 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-amber-500 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}