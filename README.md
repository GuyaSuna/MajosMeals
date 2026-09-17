# Majo’s Meals

Web estática en HTML, CSS y JavaScript, lista para GitHub Pages. Incluye menú con filtros, elección de packs de scones, carrito y resumen copiable para consultar pedidos por Instagram.

## Publicar en GitHub Pages

1. Subí `index.html`, `styles.css`, `app.js`, `.nojekyll` y la carpeta `assets` a la raíz de tu repositorio de GitHub.
2. Entrá en **Settings → Pages**.
3. En **Build and deployment**, elegí **Deploy from a branch**.
4. Seleccioná la rama donde subiste los archivos (normalmente `main`) y **/ (root)**. Guardá.
5. GitHub mostrará el enlace cuando termine de publicar: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

No requiere instalación, servidor, compilación ni claves. Las rutas relativas funcionan en repositorios de GitHub Pages.

## Personalizar

- Productos, precios e imágenes: listado `products` en `app.js`.
- Colores y diseño: `styles.css`.
- Instagram: enlaces y textos de `index.html` y `app.js`. Se usó `@majosmealss`, según el menú de referencia; verificá que sea la cuenta correcta antes de publicar.
- Las imágenes están guardadas en `assets`. La foto de rolls de canela proviene de Unsplash; las otras cuatro imágenes ilustrativas se generaron digitalmente para representar los productos e ingredientes del menú. Los prompts y archivos se documentan en `assets/README.md`. Podés reemplazarlas por fotos propias y actualizar sus rutas en el código.
- Las fuentes se cargan desde Google Fonts, con fuentes del sistema como alternativa.

Los importes se muestran con `$`, según el menú proporcionado. El carrito funciona en la sesión actual y no procesa pagos ni envía pedidos automáticamente. Disponibilidad, entrega y total final se coordinan por Instagram.
