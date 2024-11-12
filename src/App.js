import React from "react";
import { fetchPokemon } from "./fetchPokemon";

function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [totalPokemonCount, setTotalPokemonCount] = React.useState(0);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    fetchPokemon({
      limit: 20,
      offset: page * 20,
    }).then((res) => {
      setTotalPokemonCount(res.count);
      setPokemons(res);
    });
  }, [page]);

  const pageCount = React.useMemo(() => {
    return Math.ceil(totalPokemonCount / 20);
  }, [totalPokemonCount]);

  return (
    <div className="App">
      total: {totalPokemonCount}, pages: {pageCount}
      <p />
      <button
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        Page Down
      </button>
      {[...new Array(pageCount)].map((_, i) => {
        return (
          <button
            onClick={() => {
              setPage(i);
            }}
            style={{
              backgroundColor: i === page ? "red" : "blue",
            }}
          >
            {i + 1}
          </button>
        );
      })}
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        Page Up
      </button>
      <p />
      <pre>{JSON.stringify(pokemons, null, 2)}</pre>
    </div>
  );
}

export default App;
