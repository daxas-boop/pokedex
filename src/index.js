import { traerPokemones } from './api.js';
import { mostrarPokemones } from './ui.js';

function cambiarPagina(numeroPagina = 1) {
  const LIMITE = 36;
  const offset = (numeroPagina - 1) * LIMITE;
  traerPokemones(offset, LIMITE).then((pokemones) => {
    mostrarPokemones(pokemones.resultados);
  });
}

function inicializar() {
  const PAGINA_INICIAL = 1;
  cambiarPagina(PAGINA_INICIAL);
}

inicializar();
