import { Star } from "lucide-react";

function StarButton({ isFavorite, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full z-30 cursor-pointer transition-all duration-300 shadow-sm
      bg-black/10 backdrop-blur-sm border border-white/20 hover:bg-black/20
      dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/20"
    >
      <Star
        className={`w-6 h-6 transition-all drop-shadow-sm ${
          isFavorite
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300 dark:text-gray-400"
        }`}
      />
    </button>
  );
}

export default StarButton;
