import { getCountries } from "@/lib/api";

export default async function Home() {
  const countries = await getCountries();

  console.log(countries[0]);

  return (
    <main>
      ...
    </main>
  );
}