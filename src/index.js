import { traerPokemones, traerPokemon } from './api.js';
import { mostrarCargandoPagina, esconderCargandoPagina, mostrarPokemones, mostrarDatosPokemon } from './ui.js';
import { actualizarPaginacion } from './paginacion.js';

function esCartaSinVoltear($elemento) {
  return $elemento.classList.contains('carta') && !$elemento.classList.contains('carta-volteada');
}

function manejarClickCartaPokemon() {
  document.querySelector('#cartas').onclick = async (e) => {
    if (esCartaSinVoltear(e.target)) {
      const $carta = e.target;
      $carta.classList.add('carta-volteada', 'carta-cargando');
      const nombrePokemon = $carta.dataset.nombre;
      traerPokemon(nombrePokemon).then((pokemon) => {
        mostrarDatosPokemon($carta, pokemon);
        $carta.classList.remove('carta-cargando');
      });
    }
  };
}

function cambiarPagina(numeroPagina = 1) {
  const LIMITE = 24;
  const offset = (numeroPagina - 1) * LIMITE;
  mostrarCargandoPagina();
  document.querySelector('#cartas').innerHTML = '';
  traerPokemones(offset, LIMITE).then((pokemones) => {
    const cantidadPaginas = Math.ceil(pokemones.cantidad / LIMITE);
    actualizarPaginacion(cantidadPaginas, numeroPagina, cambiarPagina);
    mostrarPokemones(pokemones.resultados);
    manejarClickCartaPokemon();
    esconderCargandoPagina();
  });
}

function inicializar() {
  const PAGINA_INICIAL = 1;
  cambiarPagina(PAGINA_INICIAL);
}

inicializar();
