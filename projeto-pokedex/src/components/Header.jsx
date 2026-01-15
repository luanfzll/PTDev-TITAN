import Pokedex from "../assets/logo-pokedex.png";
import Ash from "../assets/ash.png";
import Input from "./Input.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Header({ searchPokemon, setSearchPokemon }) {
  return (
    <header className="relative w-full max-w-6xl mx-auto rounded-[50px] bg-[#F8F8F8]/50 dark:bg-black/30 backdrop-blur-md shadow-md dark:shadow-black/50 border border-white dark:border-white/10 p-4 lg:px-12 flex flex-col">
      <div className="absolute -top-13 right-0 lg:top-8 lg:right-12 z-20">
        <ThemeToggle />
      </div>
      <div className="flex justify-center px-4 lg:justify-between items-center">
        <div className="flex flex-col space-y-6">
          <img src={Pokedex} alt="Pokedex" className="lg:w-150" />
          <h2 className="w-fit mx-auto lg:mx-2 font-extrabold text-sm lg:text-lg bg-linear-to-r from-title-yellow to-title-blue bg-clip-text text-transparent mb-8">
            Descubra e explore seus pokémons favoritos!
          </h2>
        </div>
        <img src={Ash} alt="Pokedex" className="hidden lg:block max-w-80" />
      </div>
      <Input
        searchPokemon={searchPokemon}
        setSearchPokemon={setSearchPokemon}
      />
    </header>
  );
}

export default Header;
