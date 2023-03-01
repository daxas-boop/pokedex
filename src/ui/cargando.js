export function mostrarCargandoPagina() {
  document.querySelector('#cargando-pagina').classList.remove('escondido');
}

export function esconderCargandoPagina() {
  document.querySelector('#cargando-pagina').classList.add('escondido');
}
