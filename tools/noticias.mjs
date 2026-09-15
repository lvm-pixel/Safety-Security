#!/usr/bin/env node
// Safety & Security: junta manchetes e vídeos de fontes credíveis num ficheiro JSON que a app lê na página «Notícias e alertas».
// Corre no GitHub Actions (ver .github/workflows/noticias.yml) ou em qualquer computador com Node 18 ou mais recente.
// Não precisa de dependências. Uso: node tools/noticias.mjs [ficheiro-de-saida.json]
import { writeFileSync } from 'node:fs';

const FONTES = [
  { id: 'rtp', nome: 'RTP Notícias', grupo: 'pt', lingua: 'pt', url: 'https://www.rtp.pt/noticias/rss', site: 'https://www.rtp.pt/noticias/' },
  { id: 'publico', nome: 'Público', grupo: 'pt', lingua: 'pt', url: 'https://feeds.feedburner.com/PublicoRSS', site: 'https://www.publico.pt/' },
  { id: 'observador', nome: 'Observador', grupo: 'pt', lingua: 'pt', url: 'https://observador.pt/feed/', site: 'https://observador.pt/' },
  { id: 'cnnpt', nome: 'CNN Portugal', grupo: 'pt', lingua: 'pt', url: 'https://cnnportugal.iol.pt/rss', site: 'https://cnnportugal.iol.pt/' },
  { id: 'eco', nome: 'ECO', grupo: 'pt', lingua: 'pt', url: 'https://eco.sapo.pt/feed/', site: 'https://eco.sapo.pt/' },
  { id: 'euronews', nome: 'Euronews', grupo: 'mundo-pt', lingua: 'pt', url: 'https://pt.euronews.com/rss', site: 'https://pt.euronews.com/' },
  { id: 'onu', nome: 'ONU News', grupo: 'mundo-pt', lingua: 'pt', url: 'https://news.un.org/feed/subscribe/pt/news/all/rss.xml', site: 'https://news.un.org/pt/' },
  { id: 'ecdc', nome: 'ECDC', grupo: 'saude', lingua: 'en', url: 'https://www.ecdc.europa.eu/en/taxonomy/term/1307/feed', site: 'https://www.ecdc.europa.eu/en' },
  { id: 'bbc', nome: 'BBC News', grupo: 'mundo-en', lingua: 'en', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', site: 'https://www.bbc.com/news/world' },
  { id: 'guardian', nome: 'The Guardian', grupo: 'mundo-en', lingua: 'en', url: 'https://www.theguardian.com/world/rss', site: 'https://www.theguardian.com/world' },
  { id: 'france24', nome: 'France 24', grupo: 'mundo-en', lingua: 'en', url: 'https://www.france24.com/en/rss', site: 'https://www.france24.com/en/' }
];
// Canais de vídeo no YouTube (feeds públicos). Os vídeos só se veem na app quando alguém toca neles.
const CANAIS = [
  { id: 'rtpv', nome: 'RTP Notícias', lingua: 'pt', canal: 'UCIM-wfyv9hg2oEiA81mQc2A' },
  { id: 'euronewspt', nome: 'Euronews em português', lingua: 'pt', canal: 'UCUmEPYxmnyQDeRUcFkslmQw' },
  { id: 'dwnews', nome: 'DW News', lingua: 'en', canal: 'UCknLrEdhRCp1aegoMqRaCZg' },
  { id: 'euronewsen', nome: 'euronews', lingua: 'en', canal: 'UCSrZ3UV4jOidv8ppoVuvW9Q' },
  { id: 'aljazeera', nome: 'Al Jazeera English', lingua: 'en', canal: 'UCNye-wNBqNL5ZzHSJj3l8Bg' },
  { id: 'france24v', nome: 'France 24 English', lingua: 'en', canal: 'UCQfwfsi5VrQ8yKZ-UWmAEFg' },
  { id: 'skynews', nome: 'Sky News', lingua: 'en', canal: 'UCoMdktPbSTixAyNGwb-UYkQ' }
];
const MAX_POR_FONTE = 20;
const IDADE_MAX_DIAS = { pt: 2, 'mundo-pt': 3, 'mundo-en': 2, saude: 21 };
const VIDEOS_POR_CANAL = 8;
const VIDEO_IDADE_DIAS = 3;
const TIMEOUT_MS = 25000;
const AGENTE = 'Mozilla/5.0 (compatible; SafetySecurityNoticias/1.0; leitor de RSS)';

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”' };
function decodificar(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
    if (e[0] === '#') {
      const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : '';
    }
    const v = ENTIDADES[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}
function limpar(s, max) {
  let t = String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  t = decodificar(t).replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]*>/g, ' ');
  t = decodificar(t).replace(/\s+/g, ' ').trim();
  if (max && t.length > max) t = t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
  return t;
}
function campo(bloco, nomes) {
  for (const nome of nomes) {
    const m = bloco.match(new RegExp('<' + nome + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + nome + '>', 'i'));
    if (m && m[1].trim()) return m[1];
  }
  return '';
}
function ligacao(bloco) {
  let u = limpar(campo(bloco, ['link']));
  if (!u) { const m = bloco.match(/<link\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/i); if (m) u = decodificar(m[1]); }
  if (!u) { const g = bloco.match(/<guid\b[^>]*isPermaLink\s*=\s*["']true["'][^>]*>([\s\S]*?)<\/guid>/i); if (g) u = limpar(g[1]); }
  try {
    const x = new URL(u.trim());
    if (!/^https?:$/.test(x.protocol)) return '';
    for (const k of [...x.searchParams.keys()]) if (/^(utm_|at_medium$|at_campaign$|maca$|ns_)/i.test(k)) x.searchParams.delete(k);
    return x.href;
  } catch {
    return '';
  }
}
function itensDoFeed(xml) {
  const blocos = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  return blocos.map(b => ({
    t: limpar(campo(b, ['title']), 200),
    u: ligacao(b),
    d: Date.parse(limpar(campo(b, ['pubDate', 'dc:date', 'updated', 'published']))) || 0,
    r: limpar(campo(b, ['description', 'summary', 'content:encoded', 'content']), 240)
  })).filter(x => x.t && x.u);
}
function videosDoFeed(xml) {
  return (xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || []).map(b => {
    const href = (b.match(/<link\b[^>]*?\bhref\s*=\s*"([^"]+)"/i) || [])[1] || '';
    return {
      v: limpar(campo(b, ['yt:videoId'])),
      t: limpar(campo(b, ['title']), 160),
      d: Date.parse(limpar(campo(b, ['published']))) || 0,
      s: /\/shorts\//.test(href) ? 1 : 0
    };
  }).filter(x => /^[\w-]{11}$/.test(x.v) && x.t);
}
async function obter(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': AGENTE, Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.9, */*;q=0.5' }, signal: ctrl.signal, redirect: 'follow' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}
const erroCurto = e => String(e && e.name === 'AbortError' ? 'sem resposta' : (e && e.message) || e).slice(0, 80);
const chaveTitulo = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '').slice(0, 80);

const agora = Date.now();
const [resultados, resultadosVideo] = await Promise.all([
  Promise.all(FONTES.map(async f => {
    try {
      const limite = agora - (IDADE_MAX_DIAS[f.grupo] || 3) * 864e5;
      const itens = itensDoFeed(await obter(f.url)).filter(x => !x.d || x.d >= limite).sort((a, b) => b.d - a.d).slice(0, MAX_POR_FONTE);
      return { f, itens, erro: null };
    } catch (e) {
      return { f, itens: [], erro: erroCurto(e) };
    }
  })),
  Promise.all(CANAIS.map(async c => {
    try {
      const limite = agora - VIDEO_IDADE_DIAS * 864e5;
      // Sem Shorts: são excertos verticais, muitas vezes repetidos do vídeo completo.
      const itens = videosDoFeed(await obter('https://www.youtube.com/feeds/videos.xml?channel_id=' + c.canal)).filter(x => x.d >= limite && !x.s).sort((a, b) => b.d - a.d).slice(0, VIDEOS_POR_CANAL);
      return { c, itens, erro: null };
    } catch (e) {
      return { c, itens: [], erro: erroCurto(e) };
    }
  }))
]);

const vistos = new Set();
const itens = [];
for (const { f, itens: lista } of resultados) {
  for (const x of lista) {
    const chave = chaveTitulo(x.t);
    if (vistos.has(chave) || vistos.has(x.u)) continue;
    vistos.add(chave); vistos.add(x.u);
    itens.push({ f: f.id, t: x.t, u: x.u, d: x.d ? new Date(x.d).toISOString() : null, r: x.r });
  }
}
itens.sort((a, b) => (b.d || '').localeCompare(a.d || ''));

const videos = [];
const vistosVideo = new Set();
for (const { c, itens: lista } of resultadosVideo) {
  for (const x of lista) {
    if (vistosVideo.has(x.v)) continue;
    vistosVideo.add(x.v);
    videos.push({ f: c.id, v: x.v, t: x.t, d: new Date(x.d).toISOString(), s: x.s });
  }
}
videos.sort((a, b) => b.d.localeCompare(a.d));

const saida = {
  versao: 2,
  gerado: new Date(agora).toISOString(),
  fontes: resultados.map(({ f, itens: lista, erro }) => ({ id: f.id, nome: f.nome, grupo: f.grupo, lingua: f.lingua, site: f.site, ok: !erro, erro, n: lista.length })),
  itens,
  fontesVideo: resultadosVideo.map(({ c, itens: lista, erro }) => ({ id: c.id, nome: c.nome, lingua: c.lingua, canal: c.canal, ok: !erro, erro, n: lista.length })),
  videos
};
for (const r of resultados) console.log((r.erro ? 'FALHOU ' : 'ok     ') + r.f.nome.padEnd(22) + ' ' + (r.erro || r.itens.length + ' notícias'));
for (const r of resultadosVideo) console.log((r.erro ? 'FALHOU ' : 'ok     ') + ('▶ ' + r.c.nome).padEnd(22) + ' ' + (r.erro || r.itens.length + ' vídeos'));
const boas = resultados.filter(r => !r.erro).length;
if (!boas) {
  console.error('Nenhuma fonte de notícias respondeu: o ficheiro não foi escrito.');
  process.exit(1);
}
const destino = process.argv[2] || 'noticias.json';
const texto = JSON.stringify(saida);
writeFileSync(destino, texto);
console.log('Escrito ' + destino + ': ' + itens.length + ' notícias de ' + boas + ' fontes e ' + videos.length + ' vídeos, ' + Math.round(Buffer.byteLength(texto) / 1024) + ' KB');
