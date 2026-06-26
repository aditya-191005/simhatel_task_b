interface CountryPageProps {
  params: Promise<{
    iso3: string;
  }>;
}

export default async function CountryPage({
  params,
}: CountryPageProps) {
  const { iso3 } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border p-8 shadow">
        <h1 className="text-3xl font-bold">
          {iso3}
        </h1>

        <p className="mt-4 text-slate-500">
          Country Details Coming Soon...
        </p>
      </div>
    </main>
  );
}