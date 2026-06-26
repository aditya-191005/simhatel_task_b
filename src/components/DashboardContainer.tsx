"use client";

import { useMemo, useState } from "react";

import type { Country } from "@/types/country";

import DashboardToolbar from "./DashboardToolbar";
import CountryTable from "./CountryTable";
import CountryCards from "./CountryCards";
import Pagination from "./Pagination";

interface DashboardContainerProps {
  countries: Country[];
}

const ITEMS_PER_PAGE = 10;

export default function DashboardContainer({
  countries,
}: DashboardContainerProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredCountries = useMemo(() => {
    if (search.trim().length < 3) {
      return countries;
    }

    const query = search.toLowerCase();

    return countries.filter((country) =>
      country.name.toLowerCase().includes(query)
    );
  }, [countries, search]);

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);

  const paginatedCountries = filteredCountries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className="space-y-6">
      <DashboardToolbar
        totalCountries={countries.length}
        search={search}
        setSearch={setSearch}
      />

      {/* Desktop */}
      <div className="hidden lg:block">
        <CountryTable countries={paginatedCountries} />
      </div>

      {/* Mobile */}
      <div className="grid gap-4 lg:hidden">
        <CountryCards countries={paginatedCountries} />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}