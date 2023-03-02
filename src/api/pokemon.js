const URL_API = 'https://pokeapi.co/api/v2';

export async function traerPokemon(nombre) {
  const pokemon = await fetch(URL_API + '/pokemon/' + nombre);
  return pokemon.json();
}

export async function traerListadoPokemones(offset, limite) {
  const listadoPokemones = await fetch(`${URL_API}/pokemon/?limit=${limite}&offset=${offset}`);
  return listadoPokemones.json();
}
