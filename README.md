# Silver Wolf Services — versión 1

Propuesta web estática, responsive y lista para subir a GitHub y desplegar en Vercel.

## Cómo abrirla

Opción rápida: abrir `index.html` con el navegador.

Opción recomendada para revisar localmente:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Luego visitar `http://127.0.0.1:4173/`.

## Archivos principales

- `index.html`: contenido, estructura semántica y metadatos.
- `styles.css`: identidad visual, responsive y animaciones.
- `script.js`: menú móvil, acordeón, animaciones y formulario a WhatsApp.
- `vercel.json`: configuración de URL y cabeceras básicas de seguridad.
- `robots.txt`: rastreo habilitado; falta agregar el sitemap cuando exista dominio.
- `brief-marca.md`: investigación, decisiones y limitaciones de esta versión.
- `assets/`: todos los recursos visuales finales usados por la web.

## Publicación en GitHub

1. Crear un repositorio nuevo, por ejemplo `silver-wolf-services`.
2. Subir el contenido de esta carpeta respetando la raíz: `index.html` debe quedar en el nivel principal.
3. Confirmar que `assets/` también fue incluida.
4. Hacer el primer commit y publicar la rama `main`.

## Despliegue en Vercel

1. En Vercel, elegir **Add New → Project**.
2. Importar el repositorio de GitHub.
3. Seleccionar **Framework Preset: Other**.
4. No configurar Build Command.
5. Dejar Output Directory vacío o usar `.` si el formulario lo exige.
6. Desplegar.

La web no requiere Node.js, paquetes ni compilación. Vercel servirá directamente los archivos estáticos.

## Antes de conectar el dominio definitivo

- Confirmar el listado real de servicios con el propietario.
- Confirmar si la atención se comunica como nacional, regional o local.
- Confirmar el teléfono `+56 9 6456 0874` y el texto de WhatsApp.
- Añadir correo, ciudad, dirección, horarios y redes sociales si existen.
- Convertir `og:image` y `twitter:image` a URL absoluta con el dominio final.
- Añadir `canonical`, `og:url` y un `sitemap.xml` con la URL definitiva.
- Vincular el dominio en Vercel y revisar HTTPS y redirección `www`/dominio raíz.

## Notas funcionales

- El formulario no almacena datos: construye el mensaje y abre WhatsApp para que el visitante lo envíe.
- No se incluyeron precios, certificaciones, clientes, reseñas ni cifras porque no fueron entregados ni verificados.
- La web usa Google Fonts. Si se desea eliminar toda dependencia externa, se pueden reemplazar por tipografías del sistema.

## Recursos visuales

- `logo-silver-wolf-services.png`: logo real entregado por el usuario, sin modificación.
- `og-silver-wolf-services.png`: tarjeta social generada con IA a partir de la identidad real, con el texto revisado.

