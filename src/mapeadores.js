function mapearPokemon(respuestaTraerPokemon) {
  const nuevoPokemon = {
    nombre: respuestaTraerPokemon.name,
    id: respuestaTraerPokemon.id,
    imagen: respuestaTraerPokemon.sprites.other['official-artwork']['front_default'],
    tipo: respuestaTraerPokemon.types[0].type.name,
    peso: respuestaTraerPokemon.weight,
    altura: respuestaTraerPokemon.height,
    experienciaBase: respuestaTraerPokemon['base_experience'],
  };
  return nuevoPokemon;
}

function mapearListadoPokemones(respuestaTraerListadoPokemones) {
  const resultados = respuestaTraerListadoPokemones.results.map((pokemon) => {
    const id = pokemon.url.slice(pokemon.url.indexOf('pokemon/') + 8, pokemon.url.length - 1);
    return {
      nombre: pokemon.name,
      id,
    };
  });

  const listadoPokemones = {
    cantidad: respuestaTraerListadoPokemones.count,
    resultados,
  };

  return listadoPokemones;
}

export { mapearPokemon, mapearListadoPokemones };
