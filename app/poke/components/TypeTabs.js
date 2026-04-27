import { useState, useEffect } from "react";

export default function TypeTabs({ types }) {
  const [tab, setTab] = useState(0);
  const [info, setInfo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const typeUrl = types?.[tab]?.type?.url;

  useEffect(() => {
    if (!typeUrl) return;

    setBusy(true);
    setMsg(null);

    fetch(typeUrl)
      .then((r) => {
        if (!r.ok) throw new Error("type fetch failed");
        return r.json();
      })
      .then((d) => setInfo(d))
      .catch((e) => setMsg(e.message))
      .finally(() => setBusy(false));
  }, [typeUrl]);

  if (!types?.length) return <p className="text-gray-500">No types</p>;

  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        {types.map((t, i) => (
          <button
            key={t.type.name}
            onClick={() => setTab(i)}
            className={`px-4 py-2 capitalize font-medium ${
              tab === i
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.type.name}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {busy && <div className="text-gray-500">Loading...</div>}
        {msg && <div className="text-red-500">{msg}</div>}

        {!busy && !msg && info && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded border">
              <span className="block text-sm text-gray-500 mb-1">Games</span>
              <span className="text-2xl font-bold">
                {info.game_indices?.length || 0}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <span className="block text-sm text-gray-500 mb-1">Moves</span>
              <span className="text-2xl font-bold">
                {info.moves?.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
