import React, { useEffect, useState } from "react";
import { fetchSearchPokemon } from "../../services/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CircularProgress from "../../components/CircullarProgress";

const PokemonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: pokemons, loading } = useSelector(
    (state: RootState) => state.pokemons
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [urlFilter, setUrlFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20); // Default limit

  useEffect(() => {
    dispatch(fetchSearchPokemon({ limit, offset }));
  }, [offset, limit, dispatch]);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesUrl = pokemon.url.includes(urlFilter);
    return matchesName && matchesUrl;
  });

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setOffset(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokemon Data Table</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Filter by URL"
          value={urlFilter}
          onChange={(e) => setUrlFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <select
          value={limit}
          onChange={handleLimitChange}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={30}>30 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">URL</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  <div className="flex my-52 justify-center">
                    <CircularProgress
                      pathColor="blue"
                      textColor="black"
                      trailColor="grey"
                    />
                  </div>
                </td>
              </tr>
            ) : filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{pokemon.name}</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={pokemon.url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pokemon.url}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No Pokemon found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
          disabled={offset === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={() => setOffset((prev) => prev + limit)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonTable;
