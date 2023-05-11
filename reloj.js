function actualizarReloj() {
  const fechaActual = new Date();

  const hora = fechaActual.getHours().toString().padStart(2, '0');
  const minuto = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundo = fechaActual.getSeconds().toString().padStart(2, '0');

  document.getElementById('hora').textContent = hora;
  document.getElementById('minuto').textContent = minuto;
  document.getElementById('segundo').textContent = segundo;
}

actualizarReloj(); // Actualizar el reloj al cargar la página
setInterval(actualizarReloj, 1000); // Actualizar el reloj cada segundo
