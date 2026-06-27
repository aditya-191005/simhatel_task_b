import React from "react";

export function TableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Table Skeleton Body */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50 border-b border-slate-200 dark:bg-slate-900/60 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 w-28">
                  <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-800" />
                </th>
                <th className="px-6 py-4">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </th>
                <th className="px-6 py-4">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </th>
                <th className="px-6 py-4">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </th>
                <th className="px-6 py-4">
                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </th>
                <th className="px-6 py-4 w-28 text-center">
                  <div className="h-3 w-12 mx-auto rounded bg-slate-200 dark:bg-slate-800" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                  {/* Flag column */}
                  <td className="px-6 py-4">
                    <div className="h-10 w-14 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </td>
                  {/* Country Name & ISO */}
                  <td className="px-6 py-4 space-y-2">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  {/* Capital */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  {/* Currency Badge */}
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  </td>
                  {/* Dial Code */}
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
                  </td>
                  {/* Action Link button */}
                  <td className="px-6 py-4 flex justify-center">
                    <div className="h-8 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      {/* Back Button Skeleton */}
      <div>
        <div className="h-10 w-44 rounded-2xl bg-slate-200 dark:bg-slate-900" />
      </div>

      {/* Hero Banner Skeleton */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="h-28 w-28 rounded-2xl bg-slate-200 dark:bg-slate-800 sm:h-32 sm:w-32" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4.5 w-4.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800 sm:h-12" />
            
            {/* Badges list */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="h-7 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section Skeleton */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8 space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-60 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-9 w-44 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-96 w-full rounded-2xl bg-slate-100 dark:bg-slate-950/40" />
      </div>

      {/* States & Cities Skeleton */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-12 w-48 rounded-2xl bg-slate-100 dark:bg-slate-950 p-1.5" />
          <div className="h-12 w-full max-w-sm rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
              <div className="h-3 w-8 mx-auto rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4.5 w-16 mx-auto rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
