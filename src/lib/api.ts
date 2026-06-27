import type { Country } from "@/types/country";

const BASE_URL = "https://countriesnow.space/api/v0.1";

const FETCH_OPTIONS = {
  next: {
    revalidate: 86400, // Cache for 24 hours
  },
};

interface CountriesResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    iso2: string;
    iso3: string;
  }[];
}

interface FlagsResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    flag: string;
  }[];
}

interface CapitalsResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    capital: string;
  }[];
}

interface CurrencyResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    currency: string;
  }[];
}

interface DialCodeResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    code: string;
    dial_code: string;
  }[];
}

interface PopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
}

interface StatesResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    states: {
      name: string;
      state_code: string;
    }[];
  };
}

interface CitiesResponse {
  error: boolean;
  msg: string;
  data: string[];
}


export async function getCountries(): Promise<Country[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const [
    countriesResponse,
    flagsResponse,
    capitalsResponse,
    currencyResponse,
    dialCodeResponse,
  ] = await Promise.all([
    fetch(`${BASE_URL}/countries`, FETCH_OPTIONS),
    fetch(`${BASE_URL}/countries/flag/images`, FETCH_OPTIONS),
    fetch(`${BASE_URL}/countries/capital`, FETCH_OPTIONS),
    fetch(`${BASE_URL}/countries/currency`, FETCH_OPTIONS),
    fetch(`${BASE_URL}/countries/codes`, FETCH_OPTIONS),
  ]);

  const countriesResult: CountriesResponse =
    await countriesResponse.json();

  const flagsResult: FlagsResponse =
    await flagsResponse.json();

  const capitalsResult: CapitalsResponse =
    await capitalsResponse.json();

  const currencyResult: CurrencyResponse =
    await currencyResponse.json();

  const dialCodeResult: DialCodeResponse =
    await dialCodeResponse.json();

  const flagMap = new Map<string, string>(
    flagsResult.data.map((flag) => [flag.iso3, flag.flag])
  );

  const capitalMap = new Map<string, string>(
    capitalsResult.data.map((capital) => [
      capital.iso3,
      capital.capital,
    ])
  );

  const currencyMap = new Map<string, string>(
    currencyResult.data.map((currency) => [
      currency.iso3,
      currency.currency,
    ])
  );

  const dialCodeMap = new Map<string, string>(
    dialCodeResult.data.map((dialCode) => [
      dialCode.name,
      dialCode.dial_code,
    ])
  );
  return countriesResult.data.map((country) => ({
    name: country.country,
    iso2: country.iso2,
    iso3: country.iso3,
    flag: flagMap.get(country.iso3),
    capital: capitalMap.get(country.iso3),
    currency: currencyMap.get(country.iso3),
    dialCode: dialCodeMap.get(country.country),
  }));
}

export async function getCountryByIso3(
  iso3: string
): Promise<Country | undefined> {
  const countries = await getCountries();

  return countries.find(
    (country) => country.iso3.toLowerCase() === iso3.toLowerCase()
  );
}

export async function getCountryPopulation(
  iso3: string
): Promise<{ year: number; value: number }[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/countries/population`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iso3 }),
        ...FETCH_OPTIONS,
      }
    );

    const result: PopulationResponse =
      await response.json();

    return result.data?.populationCounts ?? [];
  } catch (error) {
    console.error("Population Error:", error);
    return [];
  }
}

export async function getCountryStates(
  country: string
): Promise<string[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/countries/states`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
        ...FETCH_OPTIONS,
      }
    );

    const result: StatesResponse =
      await response.json();

    return result.data.states.map(
      (state) => state.name
    );
  } catch (error) {
    console.error("States Error:", error);
    return [];
  }
}

export async function getCountryCities(
  country: string
): Promise<string[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/countries/cities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
        ...FETCH_OPTIONS,
      }
    );

    const result: CitiesResponse =
      await response.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Cities Error:", error);
    return [];
  }
}

