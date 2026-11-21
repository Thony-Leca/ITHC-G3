# LingoFlow

Prototipo académico estático para practicar inglés básico. Las cuentas de demostración están separadas en `data.json`; cada pantalla mantiene su propio HTML, CSS y JavaScript en línea.

Como los navegadores bloquean la lectura de archivos JSON desde `file://`, sirve la carpeta con un servidor local. En Visual Studio Code, abre la carpeta `t2`, instala o activa Live Server y usa **Open with Live Server** sobre `index.html`. También se necesita conexión a internet para cargar Bootstrap, Bootstrap Icons, Chart.js, Google Charts y D3.js desde CDN.

## Cuentas demo

| Usuario | Correo | Contraseña |
|---|---|---|
| Carlos Mendoza | `carlos@lingoflow.test` | `demo123` |
| Lucía Torres | `lucia@lingoflow.test` | `demo123` |
| Mateo Rojas | `mateo@lingoflow.test` | `demo123` |

El primer acceso carga `data.json` y guarda el estado de cuentas y progreso en `localStorage`, de forma independiente por perfil. El servidor local solo entrega los archivos del prototipo; no hay backend ni autenticación remota.

El catálogo incluye niveles A1, A2, B1 y B2. Cada módulo agrupa cinco lecciones y cada lección presenta cinco ejercicios de audio, completar texto, ordenar frases y emparejar. Los módulos se desbloquean con XP; el Módulo 03 requiere 500 XP, el reto bonus 600 XP y el Módulo 04 800 XP.

La cabecera pública muestra enlaces informativos e inicio de sesión. Tras iniciar sesión, la navegación queda en Mi progreso y Perfil; las lecciones se abren desde los módulos de Mi progreso. El logo también lleva a Mi progreso durante la sesión. El dashboard integra un análisis personal por vocabulario, pronunciación, comprensión auditiva y gramática. D3.js actualiza las barras por módulo y la evolución de las últimas cinco sesiones; cada lección guarda su precisión, minutos, tipo de ejercicio y repeticiones de audio en el perfil activo. Antes de tener historial real, se muestran tendencias demostrativas identificadas como tales.
