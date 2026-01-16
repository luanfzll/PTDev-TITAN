import { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import Favorites from "./hooks/useFavorites";
import { Star } from "lucide-react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=386"
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

  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = Favorites();

  const sourceList = showFavorites ? favorites : pokemons;

  const filteredPokemons = sourceList.filter((pokemon) => {
    if (searchPokemon === "") return true;
    const searchLower = searchPokemon.toLowerCase();
    const matchesName = pokemon.name.toLowerCase().includes(searchLower);
    const matchesId = pokemon.id.includes(searchLower);
    return matchesName || matchesId;
  });

  let content;

  if (pokemons.length === 0) {
    // carregando
    content = <Loader />;
  } else if (showFavorites && favorites.length === 0) {
    // favoritos Vazio
    content = (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <Star className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-xl text-gray-500 dark:text-gray-300 font-medium">
          Você ainda não favoritou nenhum Pokémon.
        </p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          Clique na estrela nos cards para salvar seus preferidos!
        </p>
      </div>
    );
  } else if (filteredPokemons.length > 0) {
    // grid de pokemons
    content = (
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
    );
  } else {
    //nenhum resultado encontrado
    content = (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Nenhum Pokémon encontrado com "{searchPokemon}"
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-r from-pokedex-yellow to-pokedex-blue dark:from-[#3F3618] dark:to-[#121D2F] flex flex-col items-center p-4 pt-16 lg:pt-0 gap-y-10">
      <Header
        searchPokemon={searchPokemon}
        setSearchPokemon={setSearchPokemon}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <main className="w-full max-w-6xl mx-auto">{content}</main>
    </div>
  );
}

export default App;
