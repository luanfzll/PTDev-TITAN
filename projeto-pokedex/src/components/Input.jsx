import { Search, Star } from "lucide-react";

function Input({
  searchPokemon,
  setSearchPokemon,
  showFavorites,
  setShowFavorites,
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Pesquise seu Pokémon aqui..."
        value={searchPokemon}
        onChange={(e) => setSearchPokemon(e.target.value)}
        className="
          border border-gray-300 
          rounded-full 
          px-4 py-4 pl-12
          w-full
          outline-none                  
          transition-all                
        focus:border-blue-400
        focus:ring-blue-100
        dark:border-white/20
        dark:text-white

      "
      />
      <Search
        size={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors cursor-pointer ${
          showFavorites
            ? "bg-yellow-100/30 text-yellow-500"
            : "text-gray-400 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/10"
        }`}
        title="Ver Favoritos"
      >
        <Star size={20} className={showFavorites ? "fill-yellow-500" : ""} />
      </button>
    </div>
  );
}

export default Input;
