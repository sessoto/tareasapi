const express = require('express');
const { resumen, mensaje } = require('./estadisticas');

// Datos de ejemplo (en memoria, sin base de datos)
const tareas = [
  { id: 1, titulo: 'Configurar Jenkins', hecha: true },
  { id: 2, titulo: 'Configurar SonarQube', hecha: true },
  { id: 3, titulo: 'Desplegar con Docker', hecha: false }
];

const app = express();
app.disable('x-powered-by');

// Permite que la web (otro contenedor, otro puerto) consulte la API
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.json(tarea);
});

app.get('/resumen', (req, res) => {
  const datos = resumen(tareas);
  res.json({ ...datos, mensaje: mensaje(datos) });
});

module.exports = app;
