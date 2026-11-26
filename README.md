# tareasapi

API REST de tareas hecha con Node.js y Express, para el taller de Prácticas DevOps e Integración Continua (USM).

| Ruta | Qué devuelve |
| --- | --- |
| `GET /tareas` | Lista de tareas |
| `GET /tareas/:id` | Una tarea, o 404 si no existe |

- Puerto del contenedor: **3000**.
- Pruebas con cobertura: `npm test` (genera `lcov.info` para SonarQube).
- La consume la web [tareasweb](https://github.com/sessoto/tareasweb).

Ramas: `main`, `dev`, `feature/**` (ambiente de desarrollo en Jenkins) y `release/**` (ambiente de producción en Jenkins).
