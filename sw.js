/* Service worker: guarda a app em cache para funcionar sem rede quando servida por HTTP(S).
   Os pedidos às fontes de notícias não passam por aqui.
   O resumo noticias.json, se estiver no mesmo site, vai primeiro à rede e só usa a cópia guardada sem ligação.
   As quadrículas do fundo do mapa ficam numa cache própria, que sobrevive às novas versões da app:
   as zonas já vistas voltam a aparecer sem rede. Guardam-se as últimas 2500 e renovam-se ao fim de 30 dias. */
const CACHE = 'preparado-202609151016';
const TILES = 'preparado-quadriculas';
const TILE_HOSTS = /^tile\.openstreetmap\.org$|(^|\.)tile\.openstreetmap\.fr$|(^|\.)tile\.opentopomap\.org$/;
const TILE_MAX = 2500;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];
let tilePuts = 0;

self.addEventListener('install', e => {
  // cache: 'reload' vai sempre à rede, para uma versão nova não guardar ficheiros antigos da cache HTTP do browser.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))).catch(() => c.add(new Request('./index.html', { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
async function trimTiles(c) {
  const keys = await c.keys();
  for (let i = 0; i < keys.length - TILE_MAX; i++) await c.delete(keys[i]);
}
async function tile(req) {
  const c = await caches.open(TILES), hit = await c.match(req);
  if (hit && Date.now() - (+hit.headers.get('x-guardado') || 0) < 30 * 864e5) return hit;
  try {
    const res = await fetch(req);
    if (!res.ok) return hit || res;
    const copy = new Response(await res.blob(), { headers: { 'Content-Type': res.headers.get('Content-Type') || 'image/png', 'x-guardado': String(Date.now()) } });
    c.put(req, copy.clone()).then(() => { if (++tilePuts % 200 === 0) return trimTiles(c); }).catch(() => {});
    return copy;
  } catch (err) {
    return hit || Response.error();
  }
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (TILE_HOSTS.test(url.hostname)) { e.respondWith(tile(req)); return; }
  if (url.origin !== location.origin) return;
  const key = url.origin + url.pathname;
  if (/\/noticias\.json$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
      return res;
    }).catch(() => caches.match(key).then(hit => hit || Response.error())));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))
  );
});
