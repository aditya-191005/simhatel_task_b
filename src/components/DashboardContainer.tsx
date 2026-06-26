"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import type { Country } from "@/types/country";

import DashboardToolbar from "./DashboardToolbar";
import CountryCards from "./CountryCards";
import CountryTable from "./CountryTable";
import Pagination from "./Pagination";

interface DashboardContainerProps {
  countries: Country[];
}

const ITEMS_PER_PAGE = 10;

export default function DashboardContainer({
  countries,
}: DashboardContainerProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const pageParam = Number(searchParams.get("page"));

  const page =
    Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

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

  return (
    <section className="space-y-6">
      <DashboardToolbar
        totalCountries={filteredCountries.length}
        search={search}
      />

      {filteredCountries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-7xl">🌍</div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            No countries found
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            We couldn't find any country matching your search.
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Try another keyword with at least 3 characters.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block">
            <CountryTable countries={paginatedCountries} />
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <CountryCards countries={paginatedCountries} />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
}