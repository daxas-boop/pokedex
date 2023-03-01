import ListadoPokemones from './entidades/listadoPokemones.js';
import Pokemon from './entidades/pokemon.js';

function mapearPokemon(respuestaTraerPokemon) {
  return new Pokemon(
    respuestaTraerPokemon.name,
    respuestaTraerPokemon.id,
    respuestaTraerPokemon.sprites.other['official-artwork']['front_default'],
    respuestaTraerPokemon.types[0].type.name,
    respuestaTraerPokemon.weight,
    respuestaTraerPokemon.height,
    respuestaTraerPokemon['base_experience']
  );
}

function mapearListadoPokemones(respuestaTraerListadoPokemones) {
  const listaPokemones = respuestaTraerListadoPokemones.results.map((pokemon) => {
    const id = pokemon.url.slice(pokemon.url.indexOf('pokemon/') + 8, pokemon.url.length - 1);
    return {
      nombre: pokemon.name,
      id,
    };
  });

  return new ListadoPokemones(respuestaTraerListadoPokemones.count, listaPokemones);
}

export { mapearPokemon, mapearListadoPokemones };
