import { mapearListadoPokemones, mapearPokemon } from '../mapeadores.js';

const URL_API = 'https://pokeapi.co/api/v2';

export async function traerPokemon(nombre) {
  const pokemon = await (await fetch(URL_API + '/pokemon/' + nombre)).json();
  return mapearPokemon(pokemon);
}

export async function traerListadoPokemones(offset, limite) {
  const listadoPokemones = await (await fetch(`${URL_API}/pokemon/?limit=${limite}&offset=${offset}`)).json();
  return mapearListadoPokemones(listadoPokemones);
}
