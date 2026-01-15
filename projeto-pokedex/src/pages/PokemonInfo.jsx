import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatBar from "../components/StatBar";
import { ArrowLeft } from "lucide-react";
import Loader from "../components/Loader";
import ThemeToggle from "../components/ThemeToggle.jsx";

function PokemonInfo() {
  const typeColors = {
    grass: "bg-grass-categorie",
    fire: "bg-fire-categorie",
    water: "bg-water-categorie",
    poison: "bg-poison-categorie",
    bug: "bg-bug-categorie",
    normal: "bg-normal-categorie",
    electric: "bg-electric-categorie",
    ground: "bg-ground-categorie",
    fairy: "bg-fairy-categorie",
    fighting: "bg-fighting-categorie",
    psychic: "bg-psychic-categorie",
    rock: "bg-rock-categorie",
    ghost: "bg-ghost-categorie",
    ice: "bg-ice-categorie",
    steel: "bg-steel-categorie",
    flying: "bg-flying-categorie",
    dragon: "bg-dragon-categorie",
  };

  const borderGradients = {
    grass: "bg-gradient-grass",
    fire: "bg-gradient-fire",
    water: "bg-gradient-water",
    poison: "bg-gradient-poison",
    bug: "bg-gradient-bug",
    normal: "bg-gradient-normal",
    electric: "bg-gradient-electric",
    ground: "bg-gradient-ground",
    fairy: "bg-gradient-fairy",
    fighting: "bg-gradient-fighting",
    psychic: "bg-gradient-psychic",
    rock: "bg-gradient-rock",
    ghost: "bg-gradient-ghost",
    ice: "bg-gradient-ice",
    steel: "bg-gradient-steel",
    flying: "bg-gradient-flying",
    dragon: "bg-gradient-dragon",
  };

  const cardBg = {
    grass: "bg-info-grass",
    fire: "bg-info-fire",
    water: "bg-info-water",
    poison: "bg-info-poison",
    bug: "bg-info-bug",
    normal: "bg-info-normal",
    electric: "bg-info-electric",
    ground: "bg-info-ground",
    fairy: "bg-info-fairy",
    fighting: "bg-info-fighting",
    psychic: "bg-info-psychic",
    rock: "bg-info-rock",
    ghost: "bg-info-ghost",
    ice: "bg-info-ice",
    steel: "bg-info-steel",
    flying: "bg-info-flying",
    dragon: "bg-info-dragon",
  };

  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${Number(id)}`
        );
        const data = await response.json();

        setPokemon(data);
      } catch (error) {
        console.log("Erro ao buscar pokémon:", error);
      }
    }
    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return (
      <div className="w-full min-h-screen bg-linear-to-r flex justify-center from-pokedex-yellow to-pokedex-blue dark:from-[#3F3618] dark:to-[#121D2F] pt-16">
        <Loader />
      </div>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const gradientClass =
    borderGradients[primaryType] ||
    "bg-gradient-to-b from-gray-300 to-gray-100";
  const bgClass =
    cardBg[primaryType] || "bg-gradient-to-b from-gray-300 to-gray-100";

  return (
    //fundo padrão
    <div className="w-full min-h-screen bg-linear-to-r from-pokedex-yellow to-pokedex-blue dark:from-[#3F3618] dark:to-[#121D2F] flex flex-col items-center p-4 pt-16 lg:pt-0 gap-y-4">
      <div className="w-full max-w-3xl flex flex-col gap-y-4 lg:gap-y-6">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="self-start mt-6 bg-linear-to-r from-pokedex-yellow to-pokedex-blue dark:from-[#3F3618] dark:to-[#121D2F] border-2 border-[#5D5D5D] text-[#373737] dark:text-slate-200 dark:border-white/20 cursor-pointer rounded-full flex p-3 gap-4"
          >
            <ArrowLeft /> Voltar para Galeria
          </button>
          <div className="self-end">
            <ThemeToggle />
          </div>
        </div>
        {/*borda gradiente */}
        <div
          className={`relative h-full w-full flex flex-col rounded-3xl ${gradientClass} p-1 shadow-2xl`}
        >
          {/*fundo branco do card */}
          <div className="w-full flex-1 flex flex-col rounded-[20px] overflow-hidden bg-white dark:bg-[#1E293B]/70">
            {/*bg gradiente*/}
            <div
              className={`w-full flex flex-col px-4 ${bgClass} dark:bg-none`}
            >
              {/*infos dentro do card */}
              <span className="absolute top-6 left-6 text-xl font-bold text-[#5D5D5D] dark:text-slate-200">
                #{id}
              </span>
              <span className="absolute top-12 left-6 font-bold text-[#373737] dark:text-slate-300 text-xl lowercase first-letter:uppercase">
                {/*capitalize não funcionou por algum motivo */}
                {pokemon.name}
              </span>
              <div className="absolute top-6 right-6 flex gap-1">
                {pokemon.types.map((item) => (
                  <span
                    key={item.type.name}
                    className={`px-3 py-0.5 lg:px-6 lg:py-2 rounded-full font-bold text-white ${typeColors[item.type.name]} capitalize`}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="w-54 object-contain drop-shadow-md"
                />
              </div>
            </div>
            {/*infos detalhadas*/}
            {/*info fisicas*/}
            <div className="flex flex-col lg:flex-row">
              <div className="px-4 py-6 flex flex-col gap-y-2 lg:flex-1">
                <span className="font-semibold capitalize mb-2 text-[#5D5D5D] dark:text-slate-200 text-xl">
                  Informações Físicas
                </span>
                <div className="w-full bg-[#E8E8E8] font-medium text-[#5D5D5D]  rounded-lg p-2 flex justify-between">
                  Altura
                  <span className="font-bold">{pokemon.height / 10} m</span>
                </div>
                <div className="w-full bg-[#E8E8E8] font-medium text-[#5D5D5D] rounded-lg p-2 flex justify-between">
                  Peso
                  <span className="font-bold">{pokemon.weight / 10} kg</span>
                </div>
              </div>
              {/*habilidades*/}
              <div className="px-4 flex flex-col gap-y-2 lg:flex-1 lg:py-6">
                <span className="font-semibold capitalize mb-2 text-[#5D5D5D] dark:text-slate-200 text-xl">
                  Habilidades
                </span>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="bg-[#E8E8E8] border border-[#9B9B9B] text-[#5D5D5D] rounded-lg py-2 px-4 text-lg capitalize font-medium"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/*estatisticas de batalha*/}
            <div className="px-4 pt-6 lg:pt-3 pb-4 flex flex-col gap-y-2">
              <span className="font-semibold capitalize mb-2 text-[#5D5D5D] dark:text-slate-200 text-xl">
                Estatísticas de Batalha
              </span>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>HP</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[0].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[0].base_stat}
                  color="#FB3B2D"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>Ataque</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[1].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[1].base_stat}
                  color="#FB3B2D"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>Defesa</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[2].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[2].base_stat}
                  color="#FB3B2D"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>Ataque Especial</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[3].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[3].base_stat}
                  color="#1C74DE"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>Defesa Especial</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[4].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[4].base_stat}
                  color="#1C74DE"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-[#5D5D5D] dark:text-slate-300">
                  <span>Velocidade</span> {/* nome */}
                  <span className="font-bold">
                    {pokemon.stats[5].base_stat}
                  </span>{" "}
                  {/* valor */}
                </div>
                <StatBar
                  baseStats={pokemon.stats[5].base_stat}
                  color="#FB3B2D"
                />
              </div>
            </div>
            {/* total */}
            <div className=" px-4 mb-8">
              <div className="bg-[#E8E8E8] rounded-lg flex justify-between items-center p-4">
                <span className="font-bold text-[#5D5D5D]">Total</span>
                <span className="font-bold text-[#373737] text-xl">
                  {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
