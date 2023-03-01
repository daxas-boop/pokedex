import { traerPokemon as traerPokemonApi, traerListadoPokemones as traerListadoPokemonesApi } from '../api/pokemon.js';
import { mapearListadoPokemones, mapearPokemon } from '../mapeadores.js';
import {
  guardarPokemon,
  guardarListadoPokemones,
  traerPokemon as traerPokemonStorage,
  traerListadoPokemones as traerListadoPokemonesStorage,
} from '../storage/pokemon.js';

export async function traerPokemon(nombre) {
  try {
    return traerPokemonStorage(nombre);
  } catch (e) {
    const pokemonApi = await traerPokemonApi(nombre);
    const pokemon = mapearPokemon(pokemonApi);
    guardarPokemon(pokemon);
    return pokemon;
  }
}

export async function traerListadoPokemones(offset, limite) {
  try {
    return traerListadoPokemonesStorage(offset, limite);
  } catch (e) {
    const listadoPokemonesApi = await traerListadoPokemonesApi(offset, limite);
    const listadoPokemones = mapearListadoPokemones(listadoPokemonesApi);
    guardarListadoPokemones(listadoPokemones, offset, limite);
    return listadoPokemones;
  }
}
