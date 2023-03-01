function crearKeyListadoPokemones(offset, limite) {
  return `offset=${offset}&limite=${limite}`;
}

function guardarListadoPokemones(listadoPokemones, offset, limite) {
  localStorage.setItem(crearKeyListadoPokemones(offset, limite), JSON.stringify(listadoPokemones));
}

function guardarPokemon(pokemon) {
  localStorage.setItem(pokemon.nombre, JSON.stringify(pokemon));
}

function traerPokemon(nombre) {
  const pokemon = localStorage.getItem(nombre);
  if (!pokemon) {
    throw new Error('No se encontro el pokemon');
  }
  return JSON.parse(pokemon);
}

function traerListadoPokemones(offset, limite) {
  const listadoPokemones = localStorage.getItem(crearKeyListadoPokemones(offset, limite));
  if (!listadoPokemones) {
    throw new Error('No se encontro el listado de pokemones');
  }
  return JSON.parse(listadoPokemones);
}

export { guardarPokemon, guardarListadoPokemones, traerPokemon, traerListadoPokemones };
