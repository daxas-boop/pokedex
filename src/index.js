import { traerPokemones } from './api.js';
import { mostrarCargandoPagina, esconderCargandoPagina, mostrarPokemones } from './ui.js';
import { actualizarPaginacion } from './paginacion.js';

function cambiarPagina(numeroPagina = 1) {
  const LIMITE = 36;
  const offset = (numeroPagina - 1) * LIMITE;
  mostrarCargandoPagina();
  document.querySelector('#cartas').innerHTML = '';
  traerPokemones(offset, LIMITE).then((pokemones) => {
    const cantidadPaginas = Math.ceil(pokemones.cantidad / LIMITE);
    actualizarPaginacion(cantidadPaginas, numeroPagina, cambiarPagina);
    mostrarPokemones(pokemones.resultados);
    esconderCargandoPagina();
  });
}

function inicializar() {
  const PAGINA_INICIAL = 1;
  cambiarPagina(PAGINA_INICIAL);
}

inicializar();
