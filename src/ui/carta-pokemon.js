function crearTituloPokemon(nombrePokemon, idPokemon) {
  const $titulo = document.createElement('div');
  const $nombre = document.createElement('p');
  const $numero = document.createElement('p');
  $titulo.className = 'titulo-carta';
  $numero.className = 'me-2';
  $nombre.className = 'text-capitalize';
  $nombre.innerText = nombrePokemon;
  $numero.innerText = '#' + idPokemon;
  $titulo.appendChild($numero);
  $titulo.appendChild($nombre);
  return $titulo;
}

function crearDatosPokemon(pokemon) {
  const $datos = document.createElement('div');
  const $tipo = document.createElement('p');
  const $peso = document.createElement('p');
  const $altura = document.createElement('p');
  const $exp = document.createElement('p');
  $peso.className = 'badge m-0 p-1';
  $tipo.className = 'badge m-0 p-1';
  $exp.className = 'badge m-0 p-1';
  $altura.className = 'badge m-0 p-1';
  $datos.className = 'd-flex flex-column align-items-start ms-4 mt-4 datos-carta';
  $tipo.innerText = 'Type: ' + pokemon.tipo[0].toUpperCase() + pokemon.tipo.slice(1);
  $peso.innerText = 'Weight: ' + pokemon.peso / 10 + 'Kg';
  $altura.innerText = 'Height: ' + pokemon.altura / 10 + 'm';
  $exp.innerText = 'Base Exp.: ' + pokemon.experienciaBase;
  $datos.appendChild($tipo);
  $datos.appendChild($peso);
  $datos.appendChild($altura);
  $datos.appendChild($exp);
  return $datos;
}

function crearImagenPokemon(src) {
  const $imagen = document.createElement('img');
  $imagen.className = 'card-img imagen-carta';
  $imagen.src = '';
  $imagen.classList.add('imagen-cargando');
  $imagen.onload = function () {
    $imagen.classList.remove('imagen-cargando');
  };
  if (src) {
    $imagen.src = src;
  } else {
    $imagen.src = './assets/imagenes/nodisponible.png';
  }
  return $imagen;
}

function crearCartaPokemon(nombrePokemon, idPokemon) {
  const $carta = document.createElement('div');
  $carta.className = 'card carta';
  const $titulo = crearTituloPokemon(nombrePokemon, idPokemon);
  $carta.appendChild($titulo);
  $carta.dataset.nombre = nombrePokemon;
  return $carta;
}

export function mostrarDatosPokemon($carta, pokemon) {
  $carta.innerHTML = '';
  const $titulo = crearTituloPokemon(pokemon.nombre, pokemon.id);
  const $datos = crearDatosPokemon(pokemon);
  const $imagen = crearImagenPokemon(pokemon.imagen);
  $carta.classList.add(pokemon.tipo);
  $carta.appendChild($titulo);
  $carta.appendChild($datos);
  $carta.appendChild($imagen);
}

export function mostrarPokemones(pokemones) {
  const $contenedorCartas = document.querySelector('#cartas');
  pokemones.forEach((pokemon) => {
    $contenedorCartas.appendChild(crearCartaPokemon(pokemon.nombre, pokemon.id));
  });
}
