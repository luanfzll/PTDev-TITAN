import { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = await response.json();

      const detailedPromises = data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();

        return detailData;
      });

      const detailedPokemons = await Promise.all(detailedPromises);

      const formattedData = detailedPokemons.map((poke) => ({
        id: poke.id.toString().padStart(3, "0"), //transforma 1 em "001"
        name: poke.name,
        types: poke.types.map((t) => t.type.name),
        image: poke.sprites.other["official-artwork"].front_default,
      }));

      setPokemons(formattedData);
    }
    fetchPokemons();
  }, []);

  const [searchPokemon, setSearchPokemon] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) => {
    const searchLower = searchPokemon.toLowerCase();
    const matchesName = pokemon.name.toLowerCase().includes(searchLower);
    const matchesId = pokemon.id.includes(searchLower);
    return matchesName || matchesId;
  });

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-pokedex-yellow to-pokedex-blue dark:from-[#3F3618] dark:to-[#121D2F] flex flex-col items-center p-4 pt-16 lg:pt-0 gap-y-10">
      <Header
        searchPokemon={searchPokemon}
        setSearchPokemon={setSearchPokemon}
      />
      <main className="w-full max-w-6xl mx-auto">
        {pokemons.length === 0 ? (
          <Loader />
        ) : filteredPokemons.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                image={pokemon.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum Pokémon encontrado com "{searchPokemon}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
