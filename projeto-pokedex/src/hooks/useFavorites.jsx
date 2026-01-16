import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("pokedex-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pokedex-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    const alreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    if (alreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== pokemon.id));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };
  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };
  return { favorites, toggleFavorite, isFavorite };
}

export default Favorites;
