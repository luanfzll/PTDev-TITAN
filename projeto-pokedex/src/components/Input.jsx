import { Search } from "lucide-react";

function Input({ searchPokemon, setSearchPokemon }) {
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
    </div>
  );
}

export default Input;
