import { traerListadoPokemones, traerPokemon } from './api/pokemon.js';
import { mostrarPokemones, mostrarDatosPokemon } from './ui/carta-pokemon.js';
import { mostrarCargandoPagina, esconderCargandoPagina } from './ui/cargando.js';
import { actualizarPaginacion } from './ui/paginacion.js';

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
  traerListadoPokemones(offset, LIMITE).then((pokemones) => {
    const cantidadPaginas = Math.ceil(pokemones.cantidad / LIMITE);
    actualizarPaginacion(cantidadPaginas, numeroPagina, cambiarPagina);
    mostrarPokemones(pokemones.resultados);
    manejarClickCartaPokemon();
    esconderCargandoPagina();
  });
}

export default function inicializar() {
  const PAGINA_INICIAL = 1;
  cambiarPagina(PAGINA_INICIAL);
}
