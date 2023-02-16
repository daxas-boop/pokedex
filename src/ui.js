function crearTituloPokemon(nombrePokemon, numeroPokemon) {
  const $titulo = document.createElement('div');
  const $nombre = document.createElement('p');
  const $numero = document.createElement('p');
  $titulo.className = 'titulo-carta';
  $numero.className = 'me-2';
  $nombre.className = 'text-capitalize';
  $nombre.innerText = nombrePokemon;
  $numero.innerText = '#' + numeroPokemon;
  $titulo.appendChild($numero);
  $titulo.appendChild($nombre);
  return $titulo;
}

function crearCartaPokemon(nombrePokemon, numeroPokemon) {
  const $carta = document.createElement('div');
  $carta.className = 'card carta';
  const $titulo = crearTituloPokemon(nombrePokemon, numeroPokemon);
  $carta.appendChild($titulo);
  $carta.dataset.nombre = nombrePokemon;
  return $carta;
}

export function mostrarPokemones(pokemones) {
  const $contenedorCartas = document.querySelector('#cartas');
  $contenedorCartas.innerHTML = '';
  pokemones.forEach((pokemon) => {
    $contenedorCartas.appendChild(crearCartaPokemon(pokemon.nombre, pokemon.numero));
  });
}
