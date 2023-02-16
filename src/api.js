export function traerPokemones(offset, limite) {
  const URL_API = 'https://pokeapi.co/api/v2';
  return fetch(`${URL_API}/pokemon/?limit=${limite}&offset=${offset}`)
    .then((r) => r.json())
    .then((r) => parsearPokemones(r));
}

function parsearPokemones(respuestaTraerPokemones) {
  const resultados = respuestaTraerPokemones.results.map((pokemon) => {
    const numeroPokemon = pokemon.url.slice(pokemon.url.indexOf('pokemon/') + 8, pokemon.url.length - 1);
    return {
      nombre: pokemon.name,
      url: pokemon.url,
      numero: numeroPokemon,
    };
  });

  const pokemones = {
    cantidad: respuestaTraerPokemones.count,
    resultados,
  };

  return pokemones;
}
