import { useNavigate } from "react-router-dom";

function PokemonCard({ id, name, types, image }) {
  const navigate = useNavigate();

  function onSeeInfoClick(id) {
    navigate(`/pokemon/${id}`);
  }

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
    grass: "bg-radial-grass",
    fire: "bg-radial-fire",
    water: "bg-radial-water",
    poison: "bg-radial-poison",
    bug: "bg-radial-bug",
    normal: "bg-radial-normal",
    electric: "bg-radial-electric",
    ground: "bg-radial-ground",
    fairy: "bg-radial-fairy",
    fighting: "bg-radial-fighting",
    psychic: "bg-radial-psychic",
    rock: "bg-radial-rock",
    ghost: "bg-radial-ghost",
    ice: "bg-radial-ice",
    steel: "bg-radial-steel",
    flying: "bg-radial-flying",
    dragon: "bg-radial-dragon",
  };

  const primaryType = types[0];
  const gradientClass =
    borderGradients[primaryType] ||
    "bg-gradient-to-b from-gray-300 to-gray-100";

  const bgClass =
    cardBg[primaryType] || "bg-gradient-to-b from-gray-300 to-gray-100";

  return (
    <div
      className={`relative h-full w-full flex flex-col rounded-3xl ${gradientClass} p-1`}
    >
      <div className="w-full flex-1 flex flex-col rounded-[20px] overflow-hidden bg-white dark:bg-[#1E293B]/70">
        <div
          className={`w-full flex-1 flex flex-col rounded-[20px] overflow-hidden px-4 py-4 ${bgClass} dark:bg-none`}
        >
          <span className="absolute top-6 left-3 text-md font-bold text-slate-400 dark:text-slate-300">
            #{id}
          </span>
          <div className="absolute top-6 right-3 flex gap-1">
            {types.map((type) => (
              <span
                key={type}
                className={`px-2 py-1 rounded-full text-xs font-bold text-white ${typeColors[type.toLowerCase()]} capitalize`}
              >
                {type}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSeeInfoClick(id)}
            className="flex justify-center mt-14 cursor-pointer"
          >
            <img
              src={image}
              alt={name}
              className="w-32 h-32 object-contain drop-shadow-md lg:w-40 lg:h-40 transition duration-300 ease-in-out hover:scale-[1.1]"
            />
          </button>
        </div>
        <div className="bg-transparent px-4 pb-5">
          <h3 className="text-center font-semibold text-[#5d5d5d] dark:text-slate-200 text-lg capitalize">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
