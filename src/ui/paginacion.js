function crearBotonConNumero(pagina, estaSeleccionado, callbackClick) {
  const $boton = document.createElement('li');
  $boton.className = 'page-item';
  const $numeroPagina = document.createElement('a');
  $numeroPagina.innerText = pagina;
  $numeroPagina.href = '#';
  $numeroPagina.className = 'page-link';
  if (estaSeleccionado) {
    $numeroPagina.classList.add('active');
    $numeroPagina.removeAttribute('href');
  } else {
    $numeroPagina.onclick = callbackClick;
  }
  $boton.appendChild($numeroPagina);
  return $boton;
}

function calcularNumeroHasta(ultimaPagina, paginaActual, paginasALosLados) {
  let numeroHasta = paginaActual + paginasALosLados;
  if (numeroHasta > ultimaPagina) {
    numeroHasta = ultimaPagina;
  }

  if (paginaActual - paginasALosLados < 1) {
    const paginasExtraHasta = Math.abs(paginaActual - paginasALosLados - 1);
    const sobrepasaLaUltimaPagina = numeroHasta + paginasExtraHasta > ultimaPagina;
    if (!sobrepasaLaUltimaPagina) {
      numeroHasta += paginasExtraHasta;
    }
  }

  return numeroHasta;
}

function calcularNumeroDesde(ultimaPagina, paginaActual, paginasALosLados) {
  let numeroDesde = paginaActual - paginasALosLados;

  if (numeroDesde < 1) {
    numeroDesde = 1;
  }

  if (paginaActual + paginasALosLados > ultimaPagina) {
    const numerosExtraDesde = paginaActual + paginasALosLados - ultimaPagina;
    numeroDesde -= numerosExtraDesde;
  }

  return numeroDesde;
}

function crearNumerosPaginacion(ultimaPagina, paginaActual, callbackClick) {
  const PAGINAS_A_LOS_LADOS = 2;
  const numeroDesde = calcularNumeroDesde(ultimaPagina, paginaActual, PAGINAS_A_LOS_LADOS);
  const numeroHasta = calcularNumeroHasta(ultimaPagina, paginaActual, PAGINAS_A_LOS_LADOS);

  const $numerosPaginacion = [];
  for (let i = numeroDesde; i <= numeroHasta; i++) {
    const estaSeleccionado = Number(paginaActual) === i;
    const $boton = crearBotonConNumero(i, estaSeleccionado, () => callbackClick(i));
    $numerosPaginacion.push($boton);
  }
  return $numerosPaginacion;
}

function adjuntarNumerosPaginacion(ultimaPagina, paginaActual, callbackClick) {
  const $contenedorBotones = document.querySelector('.botones-paginacion');
  $contenedorBotones.innerHTML = '';
  const $numerosPaginacion = crearNumerosPaginacion(ultimaPagina, paginaActual, callbackClick);
  $numerosPaginacion.forEach(($numero) => {
    $contenedorBotones.appendChild($numero);
  });
}

function desactivarBoton($boton) {
  $boton.classList.add('disabled');
  $boton.onclick = '';
}

function activarBoton($boton, callbackClick) {
  $boton.classList.remove('disabled');
  $boton.onclick = callbackClick;
}

function activarBotonesIrAdelante(ultimaPagina, paginaActual, callbackClick) {
  const $irPaginaSiguiente = document.querySelector('#boton-siguiente');
  const $irUltimaPagina = document.querySelector('#boton-final');
  activarBoton($irPaginaSiguiente, () => callbackClick(paginaActual + 1));
  activarBoton($irUltimaPagina, () => callbackClick(ultimaPagina));
}

function desactivarBotonesIrAdelante() {
  const $irPaginaSiguiente = document.querySelector('#boton-siguiente');
  const $irUltimaPagina = document.querySelector('#boton-final');
  desactivarBoton($irPaginaSiguiente);
  desactivarBoton($irUltimaPagina);
}

function activarBotonesIrAtras(paginaActual, callbackClick) {
  const $irPaginaPrevia = document.querySelector('#boton-previo');
  const $irPrimeraPagina = document.querySelector('#boton-inicio');
  activarBoton($irPaginaPrevia, () => callbackClick(paginaActual - 1));
  activarBoton($irPrimeraPagina, () => callbackClick(1));
}

function desactivarBotonesIrAtras() {
  const $irPaginaPrevia = document.querySelector('#boton-previo');
  const $irPrimeraPagina = document.querySelector('#boton-inicio');
  desactivarBoton($irPaginaPrevia);
  desactivarBoton($irPrimeraPagina);
}

export function actualizarPaginacion(ultimaPagina, paginaActual, callbackClick) {
  const PRIMERA_PAGINA = 1;

  if (paginaActual === PRIMERA_PAGINA) {
    desactivarBotonesIrAtras();
  } else {
    activarBotonesIrAtras(paginaActual, callbackClick);
  }

  if (paginaActual === ultimaPagina) {
    desactivarBotonesIrAdelante();
  } else {
    activarBotonesIrAdelante(ultimaPagina, paginaActual, callbackClick);
  }

  adjuntarNumerosPaginacion(ultimaPagina, paginaActual, callbackClick);
}
