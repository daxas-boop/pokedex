function bloquearBotonPaginacion($boton) {
  $boton.classList.add('disabled');
  $boton.onclick = '';
}

function desbloquearBotonPaginacion($boton, callbackClick) {
  $boton.classList.remove('disabled');
  $boton.onclick = callbackClick;
}

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

function crearBotonesConNumeroDePagina(ultimaPagina, paginaActual, callbackClick) {
  const CANTIDAD_PAGINAS_A_LOS_LADOS = 2;
  let paginaDesde = paginaActual - CANTIDAD_PAGINAS_A_LOS_LADOS;
  let paginaHasta = paginaActual + CANTIDAD_PAGINAS_A_LOS_LADOS;

  if (paginaHasta > ultimaPagina) {
    const paginasExtraDesde = paginaHasta - ultimaPagina;
    paginaDesde -= paginasExtraDesde;
    paginaHasta = ultimaPagina;
  }

  if (paginaDesde < 1) {
    const paginasExtraHasta = Math.abs(paginaDesde - 1);
    const sobrepasaLaUltimaPagina = paginaHasta + paginasExtraHasta > ultimaPagina;
    if (!sobrepasaLaUltimaPagina) {
      paginaHasta += paginasExtraHasta;
    }
    paginaDesde = 1;
  }

  const $botonesConNumerosDePagina = [];
  for (let i = paginaDesde; i <= paginaHasta; i++) {
    const estaSeleccionado = Number(paginaActual) === i;
    const $boton = crearBotonConNumero(i, estaSeleccionado, () => callbackClick(i));
    $botonesConNumerosDePagina.push($boton);
  }
  return $botonesConNumerosDePagina;
}

export function actualizarPaginacion(ultimaPagina, paginaActual, callbackClick) {
  const $irPaginaPrevia = document.querySelector('#boton-previo');
  const $irPaginaSiguiente = document.querySelector('#boton-siguiente');
  const $irPrimeraPagina = document.querySelector('#boton-inicio');
  const $irUltimaPagina = document.querySelector('#boton-final');

  if (paginaActual === 1) {
    bloquearBotonPaginacion($irPaginaPrevia);
    bloquearBotonPaginacion($irPrimeraPagina);
  } else {
    desbloquearBotonPaginacion($irPaginaPrevia, () => callbackClick(paginaActual - 1));
    desbloquearBotonPaginacion($irPrimeraPagina, () => callbackClick(1));
  }

  if (paginaActual === ultimaPagina) {
    bloquearBotonPaginacion($irPaginaSiguiente);
    bloquearBotonPaginacion($irUltimaPagina);
  } else {
    desbloquearBotonPaginacion($irPaginaSiguiente, () => callbackClick(paginaActual + 1));
    desbloquearBotonPaginacion($irUltimaPagina, () => callbackClick(ultimaPagina));
  }

  document.querySelector('.botones-paginacion').innerHTML = '';

  const $botonesConNumeroDePagina = crearBotonesConNumeroDePagina(ultimaPagina, paginaActual, callbackClick);
  $botonesConNumeroDePagina.forEach(($boton) => {
    document.querySelector('.botones-paginacion').appendChild($boton);
  });
}
