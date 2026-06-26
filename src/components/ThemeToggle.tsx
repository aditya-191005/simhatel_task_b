"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const themes = [
  {
    label: "Light",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    label: "System",
    value: "system",
    icon: Laptop,
  },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-36 rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" />
    );
  }

  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
      {themes.map(({ value, icon: Icon }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            <Icon size={16} />

            <span className="hidden lg:block">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
}