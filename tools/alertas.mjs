#!/usr/bin/env node
// Safety & Security: verifica as fontes oficiais e envia alertas para a app ntfy (https://ntfy.sh).
// Corre no GitHub Actions (.github/workflows/alertas.yml) de 10 em 10 minutos. Sem dependências; Node 18 ou mais recente.
// Uso: node tools/alertas.mjs --estado estado.json [--seco]
//   NTFY_TOPICO     tópico ntfy (segredo do GitHub). Obrigatório, exceto com --seco (mostra as notificações sem as enviar).
//   ALERTAS_CONFIG  JSON criado na ferramenta «Alertas no telemóvel» da app (segredo do GitHub, para as zonas não aparecerem nos registos), por exemplo
//                   {"zonas":["LSB"],"ipma":"laranja","sismosPerto":true,"sismosPortugal":true,"rcm":true,"mundo":true,"link":"https://conta.github.io/safety-security/"}
//                   "idioma" é opcional: "pt" (por omissão) ou "en". Com "en", as notificações e as mensagens do registo saem em inglês
//                   (os nomes das localidades e o texto dos avisos do IPMA ficam como vêm). A app em inglês junta "idioma":"en".
//   NTFY_SERVIDOR   opcional, por omissão https://ntfy.sh/ ; NTFY_TOKEN opcional, para servidores com autenticação.
//   TESTE=1         envia também uma notificação de teste.
// O estado guarda só resumos (hash) dos alertas já enviados, para não repetir e para não revelar as zonas.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ZONAS = { AVR: ['Aveiro', 40.64, -8.654, '01'], BJA: ['Beja', 38.015, -7.865, '02'], BRG: ['Braga', 41.551, -8.428, '03'], BGC: ['Bragança', 41.807, -6.759, '04'], CBO: ['Castelo Branco', 39.827, -7.492, '05'], CBR: ['Coimbra', 40.211, -8.429, '06'], EVR: ['Évora', 38.571, -7.909, '07'], FAR: ['Faro', 37.016, -7.935, '08'], GDA: ['Guarda', 40.538, -7.266, '09'], LRA: ['Leiria', 39.744, -8.807, '10'], LSB: ['Lisboa', 38.708, -9.137, '11'], PTG: ['Portalegre', 39.291, -7.433, '12'], PTO: ['Porto', 41.15, -8.61, '13'], STM: ['Santarém', 39.236, -8.687, '14'], STB: ['Setúbal', 38.524, -8.893, '15'], VCT: ['Viana do Castelo', 41.694, -8.828, '16'], VRL: ['Vila Real', 41.298, -7.746, '17'], VIS: ['Viseu', 40.657, -7.914, '18'],
  MCN: ['Madeira (costa norte)', 32.8, -16.88], MCS: ['Madeira (costa sul)', 32.65, -16.909], MRM: ['Madeira (zonas montanhosas)', 32.74, -16.96], MPS: ['Porto Santo', 33.059, -16.334], AOC: ['Açores (grupo ocidental)', 39.454, -31.129], ACE: ['Açores (grupo central)', 38.659, -27.22], AOR: ['Açores (grupo oriental)', 37.739, -25.669] };
const ZONAS_EN = { MCN: 'Madeira (north coast)', MCS: 'Madeira (south coast)', MRM: 'Madeira (mountain areas)', AOC: 'Açores (western group)', ACE: 'Açores (central group)', AOR: 'Açores (eastern group)' };
const NIVEIS = { yellow: [1, 'amarelo', 'Yellow'], orange: [2, 'laranja', 'Orange'], red: [3, 'vermelho', 'Red'] };
const MINIMO = { amarelo: 1, laranja: 2, vermelho: 3, nao: 9 };
const GDACS_TIPO = { EQ: ['sismo', '🌍', 'earthquake'], TC: ['ciclone tropical', '🌀', 'tropical cyclone'], FL: ['cheia', '🌊', 'flood'], VO: ['vulcão', '🌋', 'volcano'], WF: ['incêndio florestal', '🔥', 'wildfire'] };
const TIPOS_EN = { 'agitação marítima': 'Rough seas', 'nevoeiro': 'Fog', 'tempo quente': 'Hot weather', 'tempo frio': 'Cold weather', 'precipitação': 'Rain', 'neve': 'Snow', 'trovoada': 'Thunderstorms', 'vento': 'Wind' };
const AGENTE = 'SafetySecurityAlertas/1.0 (+https://github.com)';

const args = process.argv.slice(2);
const opcao = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const SECO = args.includes('--seco');
const ESTADO = opcao('--estado');
const TOPICO = (process.env.NTFY_TOPICO || '').trim();
const SERVIDOR = (process.env.NTFY_SERVIDOR || 'https://ntfy.sh/').trim();
const TOKEN = (process.env.NTFY_TOKEN || '').trim();
const TESTE = process.env.TESTE === '1';
// Língua das notificações e do registo: campo "idioma" de ALERTAS_CONFIG, "pt" por omissão ou "en".
const EN = (() => { const t = process.env.ALERTAS_CONFIG || ''; try { return String((JSON.parse(t || '{}') || {}).idioma || '').trim().toLowerCase() === 'en'; } catch { return /"idioma"\s*:\s*"en"/i.test(t); } })();
const L = (pt, en) => EN ? en : pt;
const LOCALE = EN ? 'en-GB' : 'pt-PT';

const chave = s => createHash('sha256').update(s).digest('hex').slice(0, 16);
const limpa = s => String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const num = x => (+x).toLocaleString(LOCALE, { maximumFractionDigits: 1 });
const quando = ts => ts ? new Date(ts).toLocaleString(LOCALE, { timeZone: 'Europe/Lisbon', weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : L('sem hora', 'no time');
const dia = d => d.toISOString().slice(0, 10);
const horaLisboa = () => +new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', hourCycle: 'h23' }).format(new Date());
const curto = e => String(e && e.name === 'TimeoutError' ? L('sem resposta', 'no response') : (e && e.message) || e).slice(0, 80);
const nomeZona = k => (EN && ZONAS_EN[k]) || ZONAS[k][0];
const tipoAviso = t => (EN && TIPOS_EN[limpa(t).toLowerCase()]) || limpa(t);
function distancia(la1, lo1, la2, lo2) { const r = x => x * Math.PI / 180, a = Math.sin(r(la2 - la1) / 2) ** 2 + Math.cos(r(la1)) * Math.cos(r(la2)) * Math.sin(r(lo2 - lo1) / 2) ** 2; return 12742 * Math.asin(Math.sqrt(a)); }
async function obter(url) { const r = await fetch(url, { headers: { 'User-Agent': AGENTE, Accept: 'application/json' }, signal: AbortSignal.timeout(25000) }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }
const json = async url => JSON.parse(await obter(url));

function lerConfig() {
  let c;
  try { c = JSON.parse(process.env.ALERTAS_CONFIG || '{}'); } catch { console.error(L('O segredo ALERTAS_CONFIG não é JSON válido: copia-o outra vez da app.', 'The ALERTAS_CONFIG secret is not valid JSON: copy it again from the app.')); process.exit(1); }
  const zonas = (Array.isArray(c.zonas) ? c.zonas : []).filter(z => ZONAS[z]);
  if (!zonas.length) { console.error(L('O segredo ALERTAS_CONFIG não tem zonas válidas.', 'The ALERTAS_CONFIG secret has no valid areas.')); process.exit(1); }
  return { zonas, ipma: MINIMO[c.ipma] ? c.ipma : 'laranja', sismosPerto: c.sismosPerto !== false, sismosPortugal: c.sismosPortugal !== false, rcm: c.rcm !== false, mundo: c.mundo !== false, link: /^https:\/\//.test(c.link || '') ? c.link : '', idioma: L('pt', 'en') };
}

async function ipma(cfg, out) {
  const min = MINIMO[cfg.ipma]; if (min > 3) return;
  const agora = Date.now(), grupos = new Map();
  for (const x of await json('https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json')) {
    const nv = NIVEIS[x.awarenessLevelID];
    if (!nv || nv[0] < min || !ZONAS[x.idAreaAviso] || !cfg.zonas.includes(x.idAreaAviso)) continue;
    const fim = Date.parse(x.endTime) || 0;
    if (fim && fim < agora) continue;
    // O mesmo aviso para várias zonas escolhidas vai numa só notificação.
    const id = [x.awarenessTypeName, x.awarenessLevelID, x.startTime, x.endTime, limpa(x.text)].join('|');
    if (!grupos.has(id)) grupos.set(id, { x, nv, ini: Date.parse(x.startTime) || 0, fim, zonas: [] });
    grupos.get(id).zonas.push(x.idAreaAviso);
  }
  for (const g of grupos.values()) {
    const nomes = g.zonas.map(k => nomeZona(k)), lista = nomes.length > 1 ? nomes.slice(0, -1).join(', ') + L(' e ', ' and ') + nomes[nomes.length - 1] : nomes[0];
    out.push({ k: ['ipma', g.zonas.slice().sort().join(','), g.x.awarenessTypeName, g.x.awarenessLevelID, g.x.startTime].join('|'), tipo: 'ipma', titulo: L('⚠️ Aviso ' + g.nv[1] + ': ' + limpa(g.x.awarenessTypeName) + ' em ' + lista, '⚠️ ' + g.nv[2] + ' warning: ' + tipoAviso(g.x.awarenessTypeName) + ' in ' + lista), msg: (g.ini > agora ? L('A partir de ', 'From ') + quando(g.ini) : L('Em vigor', 'In force')) + L(' até ', ' until ') + quando(g.fim) + '.' + (g.x.text ? ' ' + limpa(g.x.text) : ''), prio: g.nv[0] === 3 ? 5 : g.nv[0] === 2 ? 4 : 3, tags: [g.nv[0] === 3 ? 'rotating_light' : 'warning'] });
  }
}
async function rcm(cfg, out) {
  const h = horaLisboa(); if (!cfg.rcm || h < 8 || h >= 21) return;
  const d = await json('https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d0.json'), por = {};
  for (const v of Object.values((d && d.local) || {})) { const k = String((v && v.dico) || '').slice(0, 2), r = +(((v && v.data) || {}).rcm) || 0; if (r) (por[k] = por[k] || []).push(r); }
  for (const zn of cfg.zonas) {
    const z = ZONAS[zn]; if (!z[3] || !por[z[3]]) continue;
    const n = por[z[3]].filter(r => r === 5).length; if (!n) continue;
    out.push({ k: 'rcm|' + limpa(d.dataPrev).slice(0, 10) + '|' + z[3], tipo: 'rcm', titulo: L('🔥 Risco máximo de incêndio hoje: ', '🔥 Maximum fire danger today: ') + z[0], msg: n + (n === 1 ? L(' concelho do distrito está', ' municipality in the district is') : L(' concelhos do distrito estão', ' municipalities in the district are')) + L(' em risco máximo. Queimas, queimadas e fogo no mato são proibidos. Se vires fumo ou chamas, liga 112.', ' at maximum fire danger. Burning debris piles, stubble burning and any fire in woods or scrubland are banned. If you see smoke or flames, call 112.'), prio: 4, tags: ['fire'] });
  }
}
async function sismos(cfg, out) {
  if (!cfg.sismosPerto && !cfg.sismosPortugal) return;
  const t = await obter('https://www.seismicportal.eu/fdsnws/event/1/query?format=json&minmag=3&minlat=27&maxlat=45&minlon=-35&maxlon=-5&orderby=time&limit=50&starttime=' + new Date(Date.now() - 6 * 36e5).toISOString().slice(0, 19));
  const d = t.trim() ? JSON.parse(t) : { features: [] };
  for (const f of d.features || []) {
    const p = f.properties || {}, m = +p.mag || 0, la = +p.lat, lo = +p.lon, tm = Date.parse(p.time) || 0;
    if (!isFinite(la) || !isFinite(lo) || Date.now() - tm > 3 * 36e5) continue;
    let perto = null;
    for (const zn of cfg.zonas) { const z = ZONAS[zn], km = distancia(la, lo, z[1], z[2]); if (!perto || km < perto.km) perto = { nome: nomeZona(zn), km }; }
    if (!((cfg.sismosPerto && perto && perto.km <= 150 && m >= 3.5) || (cfg.sismosPortugal && m >= 5))) continue;
    out.push({ k: 'emsc|' + (p.unid || p.source_id || tm), tipo: 'sismo', titulo: L('🌍 Sismo de magnitude ' + num(m), '🌍 Magnitude ' + num(m) + ' earthquake') + (perto && perto.km <= 500 ? L(' a ' + Math.round(perto.km) + ' km de ', ' ' + Math.round(perto.km) + ' km from ') + perto.nome : ''), msg: limpa(p.flynn_region) + ', ' + quando(tm) + ', ' + Math.round(+p.depth || 0) + L(' km de profundidade (EMSC). Se sentiste: baixar, proteger, aguardar e contar com réplicas. Perto do mar e foi forte ou longo: vai para terreno alto.', ' km deep (EMSC). If you felt it: drop, cover, hold on and expect aftershocks. If you are near the sea and it was strong or long: go to high ground.'), prio: m >= 5 ? 5 : 4, tags: ['earth_africa'] });
  }
}
async function mundo(cfg, out) {
  if (!cfg.mundo) return;
  let g;
  try { const t = await obter('https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?eventlist=EQ;TC;FL;VO;WF&alertlevel=Red&fromDate=' + dia(new Date(Date.now() - 3 * 864e5)) + '&toDate=' + dia(new Date(Date.now() + 864e5))); g = t.trim() ? JSON.parse(t) : { features: [] }; }
  catch (e) { if (!/HTTP 404/.test(e.message)) throw e; g = { features: [] }; }
  for (const f of g.features || []) {
    const p = f.properties || {}, ty = GDACS_TIPO[p.eventtype]; if (p.alertlevel !== 'Red' || !ty) continue;
    const sev = limpa((p.severitydata || {}).severitytext);
    out.push({ k: 'gdacs|' + p.eventtype + '|' + p.eventid, tipo: 'mundo', titulo: ty[1] + L(' Alerta vermelho: ' + ty[0] + (p.country ? ' em ' + limpa(p.country) : ''), ' Red alert: ' + ty[2] + (p.country ? ' in ' + limpa(p.country) : '')), msg: (sev && !/^magnitude 0(\.0+)?$/i.test(sev) ? sev + '. ' : '') + L('Fonte: GDACS (Comissão Europeia e ONU).', 'Source: GDACS (European Commission and UN).'), prio: 3, tags: ['globe_with_meridians'], clique: (p.url || {}).report || '' });
  }
  const u = await json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
  for (const f of u.features || []) {
    const p = f.properties || {}; if ((+p.mag || 0) < 7 || Date.now() - (+p.time || 0) > 6 * 36e5) continue;
    out.push({ k: 'usgs|' + f.id, tipo: 'mundo', titulo: L('🌍 Sismo de magnitude ' + num(p.mag) + ' no mundo', '🌍 Magnitude ' + num(p.mag) + ' earthquake somewhere in the world'), msg: limpa(p.place) + ', ' + quando(+p.time) + '.' + (+p.tsunami === 1 ? L(' Foi no mar: confirma se há avisos de tsunami.', ' It was at sea: check for tsunami warnings.') : '') + L(' Fonte: USGS.', ' Source: USGS.'), prio: 3, tags: ['earth_americas'], clique: p.url || '' });
  }
}

async function enviar(a, cfg) {
  const corpo = { topic: TOPICO, title: a.titulo, message: a.msg.slice(0, 3500), priority: a.prio, tags: a.tags };
  const clique = /^https:\/\//.test(a.clique || '') ? a.clique : cfg.link ? cfg.link.replace(/#.*$/, '') + '#/t/perto' : '';
  if (clique) corpo.click = clique;
  if (SECO) { console.log(L('[seco] prioridade ', '[dry run] priority ') + a.prio + ' | ' + a.titulo + ' | ' + a.msg); return; }
  const r = await fetch(SERVIDOR, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json', 'User-Agent': AGENTE }, TOKEN ? { Authorization: 'Bearer ' + TOKEN } : {}), body: JSON.stringify(corpo), signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(L('ntfy respondeu HTTP ', 'ntfy replied HTTP ') + r.status);
}

if (!TOPICO && !SECO) { console.log(L('Falta o segredo NTFY_TOPICO: ver a ferramenta «Alertas no telemóvel» da app.', 'The NTFY_TOPICO secret is missing: see the “Phone alerts” tool in the app.')); process.exit(0); }
const cfg = lerConfig();
let estado = null;
if (ESTADO && existsSync(ESTADO)) { try { estado = JSON.parse(readFileSync(ESTADO, 'utf8')); } catch { estado = null; } }
const primeira = !estado || !estado.enviados;
const st = primeira ? { versao: 1, enviados: {} } : estado;
const alertas = [], falhas = [];
for (const [nome, fn] of [['IPMA', ipma], [L('risco de incêndio', 'fire danger'), rcm], [L('sismos', 'earthquakes'), sismos], [L('mundo', 'world'), mundo]]) {
  try { await fn(cfg, alertas); } catch (e) { falhas.push(nome + ': ' + curto(e)); }
}
const zonasTexto = cfg.zonas.map(z => nomeZona(z)).join(', ');
let enviados = 0, erros = 0;
const tenta = async a => { try { await enviar(a, cfg); enviados++; return true; } catch (e) { erros++; console.log(L('Falhou um envio: ', 'A send failed: ') + curto(e)); return false; } };
if (TESTE) await tenta({ titulo: L('✅ Safety & Security: teste do GitHub', '✅ Safety & Security: GitHub test'), msg: L('O fluxo de alertas está a funcionar para ', 'The alerts workflow is working for ') + zonasTexto + '.', prio: 4, tags: ['white_check_mark'] });
const novos = alertas.filter(a => !st.enviados[chave(a.k)]).sort((a, b) => b.prio - a.prio);
if (primeira) {
  const vigor = alertas.filter(a => a.tipo === 'ipma');
  if (await tenta({ titulo: L('✅ Safety & Security: alertas ativos', '✅ Safety & Security: alerts active'), msg: L('Zonas: ', 'Areas: ') + zonasTexto + '. ' + (vigor.length ? L('Em vigor: ', 'In force: ') + vigor.map(a => a.titulo.replace(/^⚠️ /, '')).join('; ') + '.' : L('Sem avisos do IPMA em vigor.', 'No IPMA warnings in force.')) + L(' As fontes são verificadas de 10 em 10 minutos.', ' The sources are checked every 10 minutes.'), prio: 3, tags: ['white_check_mark'] })) novos.forEach(a => { st.enviados[chave(a.k)] = Date.now(); });
} else if (novos.length > 5) {
  if (await tenta({ titulo: '⚠️ ' + novos.length + L(' alertas novos', ' new alerts'), msg: novos.map(a => a.titulo).join('\n'), prio: novos[0].prio, tags: ['warning'] })) novos.forEach(a => { st.enviados[chave(a.k)] = Date.now(); });
} else {
  for (const a of novos) if (await tenta(a)) st.enviados[chave(a.k)] = Date.now();
}
for (const k of Object.keys(st.enviados)) if (Date.now() - st.enviados[k] > 10 * 864e5) delete st.enviados[k];
st.ultima = new Date().toISOString(); st.fontesComFalha = falhas.length;
if (ESTADO && !SECO) writeFileSync(ESTADO, JSON.stringify(st));
console.log(L('Verificação concluída: ', 'Check complete: ') + alertas.length + (alertas.length === 1 ? L(' alerta em vigor, ', ' alert in force, ') : L(' alertas em vigor, ', ' alerts in force, ')) + enviados + (enviados === 1 ? L(' notificação enviada', ' notification sent') : L(' notificações enviadas', ' notifications sent')) + (erros ? ', ' + erros + L(' envios falhados', ' failed sends') : '') + (falhas.length ? L('. Fontes com falha: ', '. Sources that failed: ') + falhas.join('; ') : '') + '.');
if (falhas.length === 4 || (erros && !enviados)) process.exit(1);
