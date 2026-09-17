# Majo’s Meals

Web estática en HTML, CSS y JavaScript, lista para GitHub Pages. Incluye menú con filtros, elección de packs de scones, carrito y resumen copiable para consultar pedidos por Instagram.

## Publicar en GitHub Pages

1. Subí `index.html`, `styles.css` y `app.js` a la raíz de tu repositorio de GitHub.
2. Entrá en **Settings → Pages**.
3. En **Build and deployment**, elegí **Deploy from a branch**.
4. Seleccioná la rama donde subiste los archivos (normalmente `main`) y **/ (root)**. Guardá.
5. GitHub mostrará el enlace cuando termine de publicar: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

No requiere instalación, servidor, compilación ni claves. Las rutas relativas funcionan en repositorios de GitHub Pages.

## Personalizar

- Productos, precios e imágenes: listado `products` en `app.js`.
- Colores y diseño: `styles.css`.
- Instagram: enlaces y textos de `index.html` y `app.js`. Se usó `@majosmealss`, según el menú de referencia; verificá que sea la cuenta correcta antes de publicar.
- Las imágenes de Unsplash son ilustrativas y las fuentes se cargan desde Google Fonts. Podés reemplazar las imágenes por fotos propias en una carpeta `assets` y actualizar sus rutas en el código.

Los importes se muestran con `$`, según el menú proporcionado. El carrito funciona en la sesión actual y no procesa pagos ni envía pedidos automáticamente. Disponibilidad, entrega y total final se coordinan por Instagram.
