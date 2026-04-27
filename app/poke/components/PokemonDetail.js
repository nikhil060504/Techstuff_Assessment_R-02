import { useState, useEffect } from "react";
import TypeTabs from "./TypeTabs";

export default function PokemonDetail({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setErr(null);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading)
    return <div className="text-gray-500 text-center py-10">Loading...</div>;
  if (err) return <div className="text-red-500 py-10">{err}</div>;
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded shadow h-full">
      <div className="flex items-center gap-6 mb-8 border-b pb-6">
        {data.sprites?.front_default ? (
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="w-32 h-32 bg-gray-100 rounded-full"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            —
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold capitalize mb-2">{data.name}</h2>
          <p className="text-gray-500">
            H: {data.height} | W: {data.weight}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Types</h3>
      <TypeTabs types={data.types} />
    </div>
  );
}
