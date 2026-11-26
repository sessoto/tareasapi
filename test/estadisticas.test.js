const test = require('node:test');
const assert = require('node:assert');
const { resumen, mensaje, pendientesPrimero, buscar } = require('../src/estadisticas');

const tareas = [
  { id: 1, titulo: 'Configurar Jenkins', hecha: true },
  { id: 2, titulo: 'Desplegar con Docker', hecha: false }
];

test('resumen cuenta tareas hechas y pendientes', () => {
  assert.deepStrictEqual(resumen(tareas), { total: 2, hechas: 1, pendientes: 1, avance: 50 });
  assert.strictEqual(resumen([]).avance, 0);
});

test('mensaje cubre los tres casos', () => {
  assert.strictEqual(mensaje(resumen([])), 'No hay tareas');
  assert.strictEqual(mensaje(resumen([{ hecha: true }])), 'Todas las tareas están hechas');
  assert.strictEqual(mensaje(resumen(tareas)), 'Quedan 1 tareas pendientes (50 % de avance)');
});

test('pendientesPrimero deja las pendientes arriba', () => {
  assert.strictEqual(pendientesPrimero(tareas)[0].hecha, false);
});

test('buscar filtra por texto y sin texto devuelve todo', () => {
  assert.strictEqual(buscar(tareas, ' docker ').length, 1);
  assert.strictEqual(buscar(tareas, '').length, 2);
});
