const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let servidor;
let base;

// Levanta la API en un puerto libre antes de las pruebas
test.before(() => new Promise((resolve) => {
  servidor = app.listen(0, () => {
    base = `http://localhost:${servidor.address().port}`;
    resolve();
  });
}));

test.after(() => servidor.close());

test('GET /tareas devuelve las 3 tareas', async () => {
  const respuesta = await fetch(`${base}/tareas`);
  assert.strictEqual(respuesta.status, 200);
  const tareas = await respuesta.json();
  assert.strictEqual(tareas.length, 3);
});

test('GET /tareas/1 devuelve una tarea', async () => {
  const respuesta = await fetch(`${base}/tareas/1`);
  assert.strictEqual(respuesta.status, 200);
  const tarea = await respuesta.json();
  assert.strictEqual(tarea.titulo, 'Configurar Jenkins');
});

test('GET /tareas/99 devuelve 404', async () => {
  const respuesta = await fetch(`${base}/tareas/99`);
  assert.strictEqual(respuesta.status, 404);
});

test('la API permite consultas desde otra web (CORS)', async () => {
  const respuesta = await fetch(`${base}/tareas`);
  assert.strictEqual(respuesta.headers.get('access-control-allow-origin'), '*');
});
