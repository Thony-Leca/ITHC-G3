# LingoFlow

Prototipo académico estático para practicar inglés básico. Las cuentas de demostración están separadas en `data.json`; cada pantalla mantiene su propio HTML, CSS y JavaScript en línea.

Como los navegadores bloquean la lectura de archivos JSON desde `file://`, sirve la carpeta con un servidor local. En Visual Studio Code, abre la carpeta `t2`, instala o activa Live Server y usa **Open with Live Server** sobre `index.html`. También se necesita conexión a internet para cargar Bootstrap, Bootstrap Icons y Chart.js desde CDN.

## Cuentas demo

| Usuario | Correo | Contraseña |
|---|---|---|
| Carlos Mendoza | `carlos@lingoflow.test` | `demo123` |
| Lucía Torres | `lucia@lingoflow.test` | `demo123` |
| Mateo Rojas | `mateo@lingoflow.test` | `demo123` |

El primer acceso carga `data.json` y guarda el estado de cuentas y progreso en `localStorage`, de forma independiente por perfil. El servidor local solo entrega los archivos del prototipo; no hay backend ni autenticación remota.
