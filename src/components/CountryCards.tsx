import type { Country } from "@/types/country";
import CountryCard from "./CountryCard";

interface CountryCardsProps {
  countries: Country[];
}

export default function CountryCards({
  countries,
}: CountryCardsProps) {
  return (
    <div className="grid gap-4">
      {countries.map((country) => (
        <CountryCard
          key={country.iso3}
          country={country}
        />
      ))}
    </div>
  );
}