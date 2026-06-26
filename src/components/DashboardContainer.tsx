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

  const page = Number(searchParams.get("page") ?? "1");

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

  const currentPage = Math.min(
    Math.max(page, 1),
    totalPages
  );

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
    </section>
  );
}