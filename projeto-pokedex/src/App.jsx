import { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import useFavorites from "./hooks/useFavorites";
import { Star } from "lucide-react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 12;
  const MAX_POKEMON = 1025; // Total de pokémons na API
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();
  const [allPokemonsList, setAllPokemonsList] = useState([]);

  // Busca a lista leve de todos os Pokémons uma única vez
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then((res) => res.json())
      .then((data) => setAllPokemonsList(data.results))
      .catch((err) => console.error("Erro ao carregar dicionário:", err));
  }, []);

  // Carrega pokémons paginados
  useEffect(() => {
    async function fetchPokemons() {
      if (offset >= MAX_POKEMON) {
        setHasMore(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
        );
        const data = await response.json();

        const detailedPromises = data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return detailData;
        });

        const detailedPokemons = await Promise.all(detailedPromises);

        const formattedData = detailedPokemons.map((poke) => ({
          id: poke.id.toString().padStart(3, "0"),
          name: poke.name,
          types: poke.types.map((t) => t.type.name),
          image: poke.sprites.other["official-artwork"].front_default,
        }));

        setPokemons((prev) => {
          // Filtra os novos pokémons garantindo que nenhum ja existe no estado atual
          const novosPokemons = formattedData.filter(
            (novoPoke) =>
              !prev.some((pokeExistente) => pokeExistente.id === novoPoke.id),
          );

          return [...prev, ...novosPokemons];
        });

        if (offset + LIMIT >= MAX_POKEMON) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Busca na lista global quando o usuario digita
  useEffect(() => {
    if (searchPokemon === "") {
      setSearchResults(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const searchLower = searchPokemon.toLowerCase();

        // Filtra a lista global (que tem apenas nome e url)
        const matches = allPokemonsList
          .filter((p) => {
            const idFromUrl = p.url.split("/").filter(Boolean).pop();
            return (
              p.name.includes(searchLower) || idFromUrl.includes(searchLower)
            );
          })
          .slice(0, 20); // Limite de 20 resultados para a API não bloquear por excesso de requisições

        if (matches.length === 0) {
          setSearchResults([]);
          setSearchLoading(false);
          return;
        }

        // Busca os detalhes pesados (imagem, tipo) apenas dos que deram match
        const detailedPromises = matches.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return response.json();
        });

        const detailedResults = await Promise.all(detailedPromises);

        // Formata os dados no mesmo padrão dos cards
        const formattedResults = detailedResults.map((data) => ({
          id: data.id.toString().padStart(3, "0"),
          name: data.name,
          types: data.types.map((t) => t.type.name),
          image: data.sprites.other["official-artwork"].front_default,
        }));

        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Erro na busca inteligente:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchPokemon, allPokemonsList]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      // Verifica se chegou perto do fim da página
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottom && !loading && hasMore && !searchPokemon && !showFavorites) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, searchPokemon, showFavorites]);

  // 1. DEFINIR QUAL LISTA MOSTRAR
  let displayList = [];

  if (showFavorites) {
    // Tela de favoritos
    displayList = favorites.filter((p) => {
      if (searchPokemon === "") return true;
      const searchLower = searchPokemon.toLowerCase();
      return (
        p.name.toLowerCase().includes(searchLower) || p.id.includes(searchLower)
      );
    });
  } else if (searchPokemon && searchResults) {
    // Tela de busca
    displayList = searchResults;
  } else {
    // Tela inicial
    displayList = pokemons;
  }

  // 2. DEFINIR O CONTEÚDO DA TELA (Renderização)
  let content;

  if (loading && pokemons.length === 0) {
    content = <Loader />;
  } else if (showFavorites && favorites.length === 0) {
    // Mensagem se a aba de favoritos estiver vazia
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
  } else if (searchLoading) {
    content = <Loader />;
  } else if (displayList.length > 0) {
    // Grid principal
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayList.map((pokemon) => (
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
    // Nenhum resultado encontrado na busca
    content = (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Nenhum Pokémon encontrado com "{searchPokemon}"
        </p>
      </div>
    );
  }

  console.log("A tela de favoritos está ativa?", showFavorites);
  console.log("Tamanho da lista de favoritos:", favorites.length);
  console.log("Tamanho da lista indo pra tela:", displayList.length);

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
