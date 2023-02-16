const URL_API = 'https://pokeapi.co/api/v2';

export function traerPokemon(nombre) {
  return fetch(URL_API + '/pokemon/' + nombre)
    .then((r) => r.json())
    .then((r) => parsearPokemon(r));
}

export function traerPokemones(offset, limite) {
  return fetch(`${URL_API}/pokemon/?limit=${limite}&offset=${offset}`)
    .then((r) => r.json())
    .then((r) => parsearPokemones(r));
}

function parsearPokemon(respuestaPokemon) {
  const nuevoPokemon = {
    nombre: respuestaPokemon.name,
    numero: respuestaPokemon.id,
    imagen: respuestaPokemon.sprites.other['official-artwork']['front_default'],
    tipo: respuestaPokemon.types[0].type.name,
    peso: respuestaPokemon.weight,
    altura: respuestaPokemon.height,
    experienciaBase: respuestaPokemon['base_experience'],
  };
  return nuevoPokemon;
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
