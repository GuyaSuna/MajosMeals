const products = [
  { id: 'mousse', name: 'Mousse de durazno', category: 'dulce', detail: 'Un postre suave para darle un toque dulce a tu día.', size: 'Tarrito · 500 ml', price: 160, badge: 'Un gustito fresco', image: './assets/mousse-durazno.webp' },
  { id: 'roll', name: 'Roll de canela', category: 'dulce', detail: 'Ese aroma a canela que invita a poner la pava.', size: 'Por unidad', price: 60, badge: 'La merienda perfecta', image: './assets/roll-canela.jpg' },
  { id: 'scones', name: 'Scones de queso', category: 'salado', detail: 'Un bocado salado para compartir entre mate y mate.', size: 'Pack de 6 unidades', price: 55, badge: 'Para compartir', image: './assets/scones-queso.webp', variants: [{ id: 'scones6', size: '6 unidades', price: 55 }, { id: 'scones12', size: '12 unidades', price: 110 }] },
  { id: 'chaja', name: 'Chajá en tarrito', category: 'dulce', detail: 'Un clásico que siempre encuentra su lugar en la mesa.', size: 'Tarrito · 500 ml', price: 160, badge: 'Un clásico querido', image: './assets/chaja-tarrito.webp' },
  { id: 'brownie', name: 'Brownie con nueces', category: 'dulce', detail: 'Chocolate y nueces: una combinación para disfrutar.', size: 'Tarrito · 500 ml', price: 160, badge: 'Para fans del chocolate', image: './assets/brownie-nueces.webp' }
];
const cart = new Map();
const dialog = document.querySelector('#cart-dialog');
const money = value => '$' + value.toLocaleString('es-UY');
let toastTimer;
function toast(message) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('visible'), 2800);
}
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); } });
}, { threshold: 0.08 }) : null;
function reveal() { document.querySelectorAll('.reveal:not(.shown)').forEach(el => observer ? observer.observe(el) : el.classList.add('shown')); }
function renderProducts(filter = 'all') {
  document.querySelector('#products').innerHTML = products.filter(p => filter === 'all' || p.category === filter).map(p => `
    <article class="product-card reveal" data-product="${p.id}">
      <div class="product-image"><img src="${p.image}" alt="Imagen ilustrativa de ${p.name.toLowerCase()}" loading="lazy"><span class="product-badge">${p.badge}</span></div>
      <div class="product-content"><p class="product-category">${p.category === 'dulce' ? 'Algo dulce' : 'Algo salado'} · ${p.variants ? 'Para compartir' : p.size}</p><h3>${p.name}</h3><p class="product-description">${p.detail}</p>
      <div class="product-options">${p.variants ? `<select class="variant-select" aria-label="Cantidad de scones">${p.variants.map(v => `<option value="${v.id}">${v.size} · ${money(v.price)}</option>`).join('')}</select>` : ''}</div>
      <div class="product-bottom"><span class="price">${money(p.price)} <small>${p.id === 'roll' ? 'c/u' : p.variants ? '/ pack' : '/ tarrito'}</small></span><button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name} al pedido">Agregar <span>+</span></button></div></div>
    </article>`).join('');
  reveal();
}
document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderProducts(button.dataset.filter);
});
document.querySelector('#products').addEventListener('change', event => {
  if (!event.target.matches('.variant-select')) return;
  const card = event.target.closest('[data-product]');
  const variant = products.find(p => p.id === card.dataset.product).variants.find(v => v.id === event.target.value);
  card.querySelector('.price').innerHTML = `${money(variant.price)} <small>/ pack</small>`;
});
document.querySelector('#products').addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = products.find(p => p.id === button.dataset.add);
  const variant = product.variants?.find(v => v.id === button.closest('article').querySelector('select').value);
  const id = variant?.id || product.id;
  const existing = cart.get(id);
  cart.set(id, { id, name: product.name, size: variant?.size || product.size, price: variant?.price || product.price, quantity: (existing?.quantity || 0) + 1 });
  renderCart();
  toast(`${product.name} agregado a tu pedido ♡`);
});
function renderCart() {
  const items = [...cart.values()];
  document.querySelector('#cart-count').textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('#cart-items').innerHTML = items.length ? items.map(item => `<div class="cart-item"><div><h3>${item.name}</h3><p>${item.size} · ${money(item.price * item.quantity)}</p></div><div class="quantity"><button data-adjust="-1" data-id="${item.id}" aria-label="Quitar una unidad de ${item.name}, ${item.size}">−</button><span>${item.quantity}</span><button data-adjust="1" data-id="${item.id}" aria-label="Agregar una unidad de ${item.name}, ${item.size}">+</button></div></div>`).join('') : '<div class="empty-cart"><span>♡</span>Tu pedido está esperando algo rico.<br>Elegí tus favoritos en el menú.</div>';
  document.querySelector('#cart-summary').hidden = !items.length;
  document.querySelector('#cart-total').textContent = money(items.reduce((sum, item) => sum + item.quantity * item.price, 0));
}
document.querySelector('#cart-items').addEventListener('click', event => {
  const button = event.target.closest('[data-adjust]');
  if (!button) return;
  const item = cart.get(button.dataset.id);
  item.quantity += Number(button.dataset.adjust);
  if (item.quantity <= 0) cart.delete(item.id);
  renderCart();
});
document.querySelector('.cart-toggle').addEventListener('click', () => { renderCart(); dialog.showModal(); document.body.classList.add('modal-open'); });
document.querySelector('#close-cart').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close(); });
document.querySelector('#copy-order').addEventListener('click', async () => {
  const items = [...cart.values()];
  if (!items.length) return;
  const notes = document.querySelector('#order-notes').value.trim();
  const order = `¡Hola Majo! Quisiera consultar por este pedido:\n\n${items.map(i => `${i.quantity} × ${i.name} (${i.size}) — ${money(i.quantity * i.price)}`).join('\n')}\n\nTotal estimado: ${money(items.reduce((sum, i) => sum + i.quantity * i.price, 0))}${notes ? '\nAclaración: ' + notes : ''}\n\n¿Me confirmás disponibilidad y cómo coordinamos la entrega?`;
  try { await navigator.clipboard.writeText(order); toast('Pedido copiado. Pegalo en Instagram ♡'); }
  catch { const field = document.createElement('textarea'); field.value = order; field.setAttribute('aria-label', 'Resumen del pedido para copiar'); document.querySelector('#cart-summary').append(field); field.focus(); field.select(); toast('Seleccioná el resumen y copialo manualmente.'); }
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts();
renderCart();
reveal();
