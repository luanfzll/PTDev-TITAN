import Pokedex from "../assets/logo-pokedex.png";
import Ash from "../assets/ash.png";
import Input from "./Input.jsx";

function Header({ searchPokemon, setSearchPokemon }) {
  return (
    <header className="w-full max-w-6xl mx-auto rounded-[50px] bg-[#F8F8F8]/50 shadow-md border border-white p-4 lg:px-12 flex flex-col">
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
