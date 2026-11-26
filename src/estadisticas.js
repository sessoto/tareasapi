// Resumen del avance de las tareas
function resumen(tareas) {
  const total = tareas.length;
  const hechas = tareas.filter((t) => t.hecha).length;
  const pendientes = total - hechas;
  const avance = total === 0 ? 0 : Math.round((hechas / total) * 100);
  return { total, hechas, pendientes, avance };
}

function mensaje(r) {
  if (r.total === 0) {
    return 'No hay tareas';
  }
  if (r.pendientes === 0) {
    return 'Todas las tareas están hechas';
  }
  return `Quedan ${r.pendientes} tareas pendientes (${r.avance} % de avance)`;
}

function pendientesPrimero(tareas) {
  const pendientes = tareas.filter((t) => !t.hecha);
  const hechas = tareas.filter((t) => t.hecha);
  return [...pendientes, ...hechas];
}

function buscar(tareas, texto) {
  const buscado = texto.trim().toLowerCase();
  if (buscado === '') {
    return tareas;
  }
  return tareas.filter((t) => t.titulo.toLowerCase().includes(buscado));
}

module.exports = { resumen, mensaje, pendientesPrimero, buscar };
