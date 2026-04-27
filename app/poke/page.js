"use client";

import { useState, useEffect } from "react";
import PokemonTable from "./components/PokemonTable";
import PokemonDetail from "./components/PokemonDetail";
import Pagination from "./components/Pagination";

export default function PokePage() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [selected, setSelected] = useState(null);

  const PAGE_SIZE = 20;

  useEffect(() => {
    loadData();
  }, [page]);

  async function loadData() {
    setIsLoading(true);
    setErr(null);

    try {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`,
      );

      if (!resp.ok) throw new Error("API error");

      const json = await resp.json();
      setList(json.results || []);
      setCount(json.count || 0);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  function nextPage() {
    if ((page + 1) * PAGE_SIZE < count) {
      setPage((p) => p + 1);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="w-1/2 pr-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Pokémon Explorer</h1>

        {err && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{err}</div>
        )}

        {isLoading ? (
          <div className="text-gray-500 py-10 text-center">Loading...</div>
        ) : (
          <>
            <PokemonTable
              data={list}
              startNum={page * PAGE_SIZE + 1}
              onSelect={setSelected}
              selectedUrl={selected}
            />
            <Pagination
              page={page}
              total={count}
              size={PAGE_SIZE}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </>
        )}
      </div>

      <div className="w-1/2 pl-4 border-l border-gray-200">
        {selected ? (
          <PokemonDetail url={selected} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Pick one from the list
          </div>
        )}
      </div>
    </div>
  );
}
