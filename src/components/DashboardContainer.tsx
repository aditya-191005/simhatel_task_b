"use client";

import { useCallback, useMemo, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import type { Country } from "@/types/country";

import Header from "./Header";
import CountryCards from "./CountryCards";
import CountryTable from "./CountryTable";
import Pagination from "./Pagination";
import { TableSkeleton } from "./LoadingSkeleton";

interface DashboardContainerProps {
  countries: Country[];
}

const ITEMS_PER_PAGE = 10;

export default function DashboardContainer({
  countries,
}: DashboardContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Filter countries list
  const filteredCountries = useMemo(() => {
    if (search.trim().length < 3) {
      return countries;
    }

    return countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [countries, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Transition wrappers for router navigation (shows TableSkeleton immediately while loading)
  const handleSearchChange = useCallback((searchValue: string) => {
    const trimmed = searchValue.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed.length >= 3) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      startTransition(() => {
        router.replace(`${pathname}?${newQuery}`, {
          scroll: false,
        });
      });
    }
  }, [searchParams, pathname, router]);

  const handlePageChange = useCallback((pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      startTransition(() => {
        router.push(`${pathname}?${newQuery}`, {
          scroll: false,
        });
      });
    }
  }, [searchParams, pathname, router]);

  return (
    <section className="space-y-6">
      {/* Unifiedcontrolled Header (replaces stacked Header + DashboardToolbar) */}
      <Header
        totalCountries={filteredCountries.length}
        search={search}
        onSearchChange={handleSearchChange}
        isPending={isPending}
      />

      {isPending ? (
        /* Instant load feedback during route transitions */
        <TableSkeleton />
      ) : filteredCountries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-7xl">🌍</div>

          <h2 className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">
            No countries found
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            We couldn&apos;t find any country matching your search.
          </p>

          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Try another keyword with at least 3 characters.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <CountryTable countries={paginatedCountries} />
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isPending={isPending}
              className="pt-2 pb-4 border-b border-slate-100 dark:border-slate-800/80"
            />
            <CountryCards countries={paginatedCountries} />
          </div>

          {/* Controlled Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isPending={isPending}
          />
        </>
      )}
    </section>
  );
}