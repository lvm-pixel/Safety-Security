/* --- Dados partilhados: zonas, rádio, centrais nucleares e o resumo «Situação agora» --- */

// Ponto de referência de cada zona de aviso do IPMA (capital de distrito ou ilha principal), para medir distâncias sem pedir a localização.
const ZONA_POS = { AVR: [40.64, -8.654], BJA: [38.015, -7.865], BRG: [41.551, -8.428], BGC: [41.807, -6.759], CBO: [39.827, -7.492], CBR: [40.211, -8.429], EVR: [38.571, -7.909], FAR: [37.016, -7.935], GDA: [40.538, -7.266], LRA: [39.744, -8.807], LSB: [38.708, -9.137], PTG: [39.291, -7.433], PTO: [41.15, -8.61], STM: [39.236, -8.687], STB: [38.524, -8.893], VCT: [41.694, -8.828], VRL: [41.298, -7.746], VIS: [40.657, -7.914], MCN: [32.8, -16.88], MCS: [32.65, -16.909], MRM: [32.74, -16.96], MPS: [33.059, -16.334], AOC: [39.454, -31.129], ACE: [38.659, -27.22], AOR: [37.739, -25.669] };

// Antena 1 por zona: [frequência, banda, emissor, ilhas servidas]. Fonte: RTP, antena1.rtp.pt/frequencias e media.rtp.pt (setembro de 2026).
const RADIO_A1 = {
  AVR: [['87,9', 'FM', 'Lousã'], ['106,7', 'FM', 'Arestal']],
  BJA: [['87,7', 'FM', 'Mendro'], ['90,9', 'FM', 'Mértola'], ['88,9', 'FM', 'Monchique'], ['720', 'AM', 'Elvas']],
  BRG: [['91,3', 'FM', 'Braga'], ['88,3', 'FM', 'Muro'], ['94,9', 'FM', 'Minhéu']],
  BGC: [['96,4', 'FM', 'Bragança'], ['92,8', 'FM', 'Bornes'], ['90,3', 'FM', 'Miranda do Douro'], ['97,2', 'FM', 'Marofa'], ['666', 'AM', 'Bragança'], ['720', 'AM', 'Mirandela'], ['630', 'AM', 'Miranda do Douro']],
  CBO: [['96,4', 'FM', 'Gardunha'], ['89,9', 'FM', 'Castelo Branco'], ['87,9', 'FM', 'Lousã'], ['720', 'AM', 'Castelo Branco'], ['666', 'AM', 'Covilhã']],
  CBR: [['94,9', 'FM', 'Coimbra'], ['87,9', 'FM', 'Lousã'], ['630', 'AM', 'Coimbra (Santa Isabel)']],
  EVR: [['103,8', 'FM', 'Elvas'], ['87,7', 'FM', 'Mendro'], ['88,4', 'FM', 'Serra de Ossa'], ['720', 'AM', 'Elvas']],
  FAR: [['97,6', 'FM', 'Faro'], ['88,9', 'FM', 'Monchique'], ['88,9', 'FM', 'Alcoutim']],
  GDA: [['94,7', 'FM', 'Guarda'], ['97,2', 'FM', 'Marofa'], ['104,8', 'FM', 'Manteigas'], ['720', 'AM', 'Guarda']],
  LRA: [['98,7', 'FM', 'Leiria'], ['87,9', 'FM', 'Lousã'], ['98,3', 'FM', 'Montejunto'], ['630', 'AM', 'Coimbra (Santa Isabel)']],
  LSB: [['95,7', 'FM', 'Monsanto'], ['99,4', 'FM', 'Banática'], ['98,3', 'FM', 'Montejunto'], ['96,9', 'FM', 'Janas'], ['666', 'AM', 'CEN']],
  PTG: [['97,9', 'FM', 'Portalegre'], ['103,8', 'FM', 'Elvas'], ['93,6', 'FM', 'Montargil'], ['1287', 'AM', 'Portalegre'], ['720', 'AM', 'Elvas']],
  PTO: [['96,7', 'FM', 'Monte da Virgem'], ['88,3', 'FM', 'Muro'], ['95,2', 'FM', 'Marão']],
  STM: [['98,8', 'FM', 'Santarém'], ['98,3', 'FM', 'Montejunto'], ['666', 'AM', 'CEN']],
  STB: [['95,7', 'FM', 'Monsanto'], ['106,7', 'FM', 'Tróia'], ['99,2', 'FM', 'Grândola'], ['666', 'AM', 'CEN']],
  VCT: [['88,3', 'FM', 'Muro'], ['102,9', 'FM', 'Moledo'], ['98,2', 'FM', 'Valença'], ['102,9', 'FM', 'Paredes de Coura'], ['89,2', 'FM', 'Rendufe']],
  VRL: [['95,2', 'FM', 'Marão'], ['94,9', 'FM', 'Minhéu'], ['87,9', 'FM', 'S. Domingos'], ['666', 'AM', 'Vila Real']],
  VIS: [['87,9', 'FM', 'Lousã'], ['104,5', 'FM', 'Gravia'], ['88,2', 'FM', 'Viseu'], ['87,9', 'FM', 'S. Domingos'], ['95,2', 'FM', 'Marão'], ['666', 'AM', 'Viseu'], ['756', 'AM', 'Lamego']],
  MCS: [['104,6', 'FM', 'Funchal (Monte)'], ['96,7', 'FM', 'Cabo Girão'], ['95,5', 'FM', 'Pico do Areeiro'], ['101,6', 'FM', 'Caniço'], ['105,6', 'FM', 'Ribeira Brava']],
  MCN: [['100,5', 'FM', L('Porto Santo (costa norte)', 'Porto Santo (north coast)')], ['93,1', 'FM', 'Encumeada (São Vicente)'], ['95,5', 'FM', 'Pico do Areeiro']],
  MRM: [['95,5', 'FM', 'Pico do Areeiro'], ['101,9', 'FM', 'Paul da Serra'], ['93,1', 'FM', 'Encumeada']],
  MPS: [['100,5', 'FM', 'Porto Santo']],
  AOC: [['99,8', 'FM', 'Monte das Cruzes', 'Flores e Corvo'], ['93,5', 'FM', 'Morro Alto', 'Flores e Corvo'], ['100,4', 'FM', 'Fajãzinha', 'Flores'], ['102,6', 'FM', 'Lajes das Flores', 'Flores'], ['828', 'AM', 'Monte das Cruzes', 'Flores e Corvo']],
  ACE: [['90,5', 'FM', 'Santa Bárbara', 'Terceira, Graciosa, São Jorge e Pico'], ['99,7', 'FM', 'Serra do Cume', 'Terceira'], ['88,9', 'FM', 'Cabeço Gordo', 'Faial, Pico, São Jorge e Graciosa'], ['93,8', 'FM', 'Espalamaca', 'Faial'], ['87,6', 'FM', 'Macela', 'Faial, Pico e São Jorge'], ['94,5', 'FM', 'Arrife', 'Pico'], ['96,5', 'FM', 'Lajes do Pico', 'Pico'], ['97,0', 'FM', 'Pico do Jardim', 'Graciosa']],
  AOR: [['94,1', 'FM', 'Ponta Delgada', 'São Miguel'], ['93,6', 'FM', 'Furnas', 'São Miguel'], ['89,5', 'FM', 'Pico das Éguas', 'São Miguel'], ['104,6', 'FM', 'Nordeste', 'São Miguel'], ['96,7', 'FM', 'Pico Alto', 'Santa Maria e São Miguel'], ['97,9', 'FM', 'Pico da Barrosa', 'Santa Maria e São Miguel']]
};

// Centrais nucleares em funcionamento na Europa e à volta: [nome, latitude, longitude, país]. Fonte: Wikidata (CC0), setembro de 2026.
const NUCLEARES = [['Almaraz', 39.808, -5.697, 'Espanha'], ['Trillo', 40.701, -2.622, 'Espanha'], ['Cofrentes', 39.217, -1.05, 'Espanha'], ['Ascó', 41.2, 0.569, 'Espanha'], ['Vandellòs', 40.951, 0.867, 'Espanha'],
  ['Golfech', 44.111, 0.84, 'França'], ['Blayais', 45.256, -0.692, 'França'], ['Civaux', 46.456, 0.654, 'França'], ['Chinon', 47.231, 0.171, 'França'], ['Saint-Laurent', 47.721, 1.579, 'França'], ['Dampierre', 47.734, 2.518, 'França'], ['Belleville', 47.51, 2.875, 'França'], ['Nogent', 48.516, 3.518, 'França'], ['Flamanville', 49.537, -1.883, 'França'], ['Paluel', 49.858, 0.636, 'França'], ['Penly', 49.977, 1.212, 'França'], ['Gravelines', 51.014, 2.136, 'França'], ['Chooz', 50.09, 4.791, 'França'], ['Cattenom', 49.416, 6.218, 'França'], ['Tricastin', 44.331, 4.731, 'França'], ['Cruas', 44.634, 4.754, 'França'], ['Saint-Alban', 45.405, 4.756, 'França'], ['Bugey', 45.797, 5.27, 'França'],
  ['Heysham', 54.03, -2.917, 'Reino Unido'], ['Hartlepool', 54.635, -1.181, 'Reino Unido'], ['Torness', 55.968, -2.409, 'Reino Unido'], ['Sizewell B', 52.215, 1.62, 'Reino Unido'], ['Borssele', 51.432, 3.717, 'Países Baixos'], ['Doel', 51.325, 4.261, 'Bélgica'], ['Tihange', 50.533, 5.276, 'Bélgica'], ['Gösgen', 47.366, 7.969, 'Suíça'], ['Leibstadt', 47.601, 8.184, 'Suíça'], ['Beznau', 47.552, 8.228, 'Suíça'],
  ['Ringhals', 57.261, 12.108, 'Suécia'], ['Oskarshamn', 57.416, 16.671, 'Suécia'], ['Forsmark', 60.403, 18.167, 'Suécia'], ['Olkiluoto', 61.237, 21.442, 'Finlândia'], ['Loviisa', 60.372, 26.347, 'Finlândia'], ['Temelín', 49.182, 14.381, 'Chéquia'], ['Dukovany', 49.085, 16.149, 'Chéquia'], ['Krško', 45.938, 15.515, 'Eslovénia'], ['Bohunice', 48.494, 17.681, 'Eslováquia'], ['Mochovce', 48.264, 18.457, 'Eslováquia'], ['Paks', 46.572, 18.854, 'Hungria'], ['Kozloduy', 43.746, 23.771, 'Bulgária'], ['Cernavodă', 44.322, 28.057, 'Roménia'],
  ['Rivne', 51.328, 25.892, 'Ucrânia'], ['Khmelnytskyi', 50.305, 26.645, 'Ucrânia'], [L('Sul da Ucrânia', 'South Ukraine'), 47.817, 31.217, 'Ucrânia'], [L('Zaporíjia', 'Zaporizhzhia'), 47.508, 34.592, 'Ucrânia'], ['Astravets', 54.761, 26.093, 'Bielorrússia'], [L('Leningrado', 'Leningrad'), 59.852, 29.051, 'Rússia'], ['Kola', 67.465, 32.483, 'Rússia'], ['Smolensk', 54.167, 33.233, 'Rússia'], ['Kalinin', 57.907, 35.063, 'Rússia'], ['Kursk', 51.675, 35.606, 'Rússia'], ['Novovoronezh', 51.27, 39.198, 'Rússia'], ['Rostov', 47.599, 42.364, 'Rússia'], ['Balakovo', 52.094, 47.958, 'Rússia'], ['Medzamor', 40.182, 44.142, 'Arménia'], ['Bushehr', 28.829, 50.887, 'Irão']];
const NUCLEARES_PAISES_EN = { 'Espanha': 'Spain', 'França': 'France', 'Reino Unido': 'United Kingdom', 'Países Baixos': 'Netherlands', 'Bélgica': 'Belgium', 'Suíça': 'Switzerland', 'Suécia': 'Sweden', 'Finlândia': 'Finland', 'Chéquia': 'Czechia', 'Eslovénia': 'Slovenia', 'Eslováquia': 'Slovakia', 'Hungria': 'Hungary', 'Bulgária': 'Bulgaria', 'Roménia': 'Romania', 'Ucrânia': 'Ukraine', 'Bielorrússia': 'Belarus', 'Rússia': 'Russia', 'Arménia': 'Armenia', 'Irão': 'Iran' };

function distKm(a, b) { return haversine(a, b) / 1000; }
function fmtKm(km) { return km < 10 ? nf(km, 1) + ' km' : nf(Math.round(km), 0) + ' km'; }
function rumoTexto(a, b) { const r = MAP_DIRS[Math.round(bearing(a, b) / 45) % 8]; return L(r, { SO: 'SW', O: 'W', NO: 'NW' }[r] || r); }
function minhaZona() { const z = LS.get('newsArea', ''); if (ZONA_POS[z]) return z; const cfg = LS.get('alertasCfg', {}) || {}; return (cfg.zonas || []).find(k => ZONA_POS[k]) || ''; }
function zonaRef(z) { const p = ZONA_POS[z]; return p ? { lat: p[0], lon: p[1], nome: NEWS_AREAS[z] || z, zona: z } : null; }
function zonaMaisPerto(pos) { let best = '', bd = Infinity; Object.keys(ZONA_POS).forEach(z => { const d = distKm(pos, { lat: ZONA_POS[z][0], lon: ZONA_POS[z][1] }); if (d < bd) { bd = d; best = z; } }); return best; }
function radioZonaTexto(z) {
  const l = RADIO_A1[z]; if (!l) return L('a Antena 1 na frequência da tua zona', 'Antena 1 on the frequency for your area');
  const p = l.filter(x => x[1] === 'FM').slice(0, 2).map(x => L(x[0], x[0].replace(',', '.')) + ' FM').concat(l.filter(x => x[1] === 'AM').slice(0, 1).map(x => x[0] + ' kHz AM'));
  return L('a Antena 1 em ', 'Antena 1 on ') + (p.length > 1 ? p.slice(0, -1).join(', ') + L(' ou ', ' or ') + p[p.length - 1] : p[0]) + ' (' + (NEWS_AREAS[z] || z) + ')';
}
function nuclearesPerto(ref, n) { return NUCLEARES.map(c => ({ n: c[0], pais: L(c[3], typeof MAPA_PAISES_EN !== 'undefined' && MAPA_PAISES_EN[c[3]] && MAPA_PAISES_EN[c[3]] !== c[3] ? MAPA_PAISES_EN[c[3]] : NUCLEARES_PAISES_EN[c[3]] || c[3]), lat: c[1], lon: c[2], km: distKm(ref, { lat: c[1], lon: c[2] }) })).sort((a, b) => a.km - b.km).slice(0, n || 3); }
async function atualizarFontes(ids) {
  const nc = LS.get('newsCache', {}) || {};
  await Promise.allSettled(NW_SRC.filter(s => ids.indexOf(s.id) >= 0).map(async s => {
    try { nc[s.id] = { ts: Date.now(), data: await s.load() }; }
    catch (e) { const o = nc[s.id] || {}; nc[s.id] = { ts: o.ts || 0, data: o.data, err: String((e && e.message) || e).slice(0, 80), off: !!(e && e.off) }; }
  }));
  LS.set('newsCache', nc);
  return nc;
}
// O que interessa a uma zona: avisos do IPMA, risco de incêndio, sismos a menos de 300 km e alertas graves no mundo.
function situacaoDados(ref, zona) {
  const nc = LS.get('newsCache', {}) || {}, now = Date.now(), lvl = x => (IPMA_LV[x.lv] || [0, 0, 0])[2];
  const out = { ts: 0, avisos: null, rcm: null, sismos: null, mundo: null };
  const ts = ['ipma', 'rcm', 'emsc', 'gdacs', 'usgs'].map(k => nc[k] && nc[k].ts).filter(Boolean); out.ts = ts.length ? Math.min.apply(null, ts) : 0;
  if (nc.ipma && nc.ipma.data) { const act = nc.ipma.data.filter(x => lvl(x) && (!x.fim || x.fim > now) && (!zona || x.a === zona)).sort((a, b) => lvl(b) - lvl(a) || a.ini - b.ini); out.avisos = { lista: act, max: act.length ? lvl(act[0]) : 0 }; }
  if (zona && AREA_DICO[zona] && nc.rcm && nc.rcm.data && nc.rcm.data.by) out.rcm = nc.rcm.data.by[AREA_DICO[zona]] || null;
  if (ref && nc.emsc && nc.emsc.data) out.sismos = nc.emsc.data.map(x => Object.assign({}, x, { dist: distKm(ref, { lat: x.la, lon: x.lo }) })).filter(x => isFinite(x.dist) && x.dist <= 300).sort((a, b) => b.t - a.t);
  if (nc.gdacs || nc.usgs) out.mundo = { vermelhos: ((nc.gdacs && nc.gdacs.data) || []).filter(x => x.lv === 'Red'), fortes: ((nc.usgs && nc.usgs.data) || []).filter(x => x.m >= 6 && now - x.t < 48 * 36e5).sort((a, b) => b.m - a.m) };
  return out;
}
function situacaoHTML() {
  const z = minhaZona(), ref = zonaRef(z), s = situacaoDados(ref, z), now = Date.now(), LN = [], zn = z ? NEWS_AREAS[z] : 'Portugal';
  if (s.avisos) {
    const lv = s.avisos.max, n = s.avisos.lista.length, nz = new Set(s.avisos.lista.map(x => x.a)).size, tipos = esc(joinE(Array.from(new Set(s.avisos.lista.map(x => ipmaTipo(x.tipo)))).slice(0, 3)));
    LN.push(!lv ? L('✅ Sem avisos meteorológicos em ', '✅ No weather warnings in ') + esc(zn) : '<span class="badge ' + ['', 'warn', 'orange', 'danger'][lv] + '">' + L(['', 'Amarelo', 'Laranja', 'Vermelho'][lv], ['', 'Yellow', 'Orange', 'Red'][lv]) + '</span> ' + (z ? n + (n === 1 ? L(' aviso meteorológico', ' weather warning') : L(' avisos meteorológicos', ' weather warnings')) + L(' em ', ' in ') + esc(zn) : L('Avisos meteorológicos em ', 'Weather warnings in ') + nz + (nz === 1 ? L(' zona', ' area') : L(' zonas', ' areas')) + L(' do país', ' of the country')) + ': ' + tipos);
  }
  if (s.rcm && s.rcm.max >= 4) LN.push('<span class="rcm rcm' + s.rcm.max + '">' + s.rcm.max + '</span> ' + L('Risco de incêndio ' + RCM_LV[s.rcm.max] + ' hoje em ', cap(RCM_LV[s.rcm.max]) + ' fire danger today in ') + esc(zn));
  if (s.sismos) { const r = s.sismos.filter(x => now - x.t < 24 * 36e5 && x.m >= 3); LN.push(r.length ? L('🌍 Sismo de magnitude ' + nf(r[0].m) + ' a ' + fmtKm(r[0].dist), '🌍 Magnitude ' + nf(r[0].m) + ' earthquake ' + fmtKm(r[0].dist) + ' away') + ' (' + esc(nwWhen(r[0].t)) + ')' : L('🌍 Sem sismos de magnitude 3 ou mais perto nas últimas 24 horas', '🌍 No earthquakes of magnitude 3 or more nearby in the last 24 hours')); }
  if (s.mundo) { const v = s.mundo.vermelhos.length, f = s.mundo.fortes[0]; LN.push('🌐 ' + (v ? v + (v === 1 ? L(' catástrofe', ' disaster') : L(' catástrofes', ' disasters')) + L(' com alerta vermelho no mundo', ' with a red alert worldwide') : L('Sem catástrofes com alerta vermelho no mundo', 'No disasters with a red alert worldwide')) + (f ? L('; sismo de magnitude ' + nf(f.m) + ': ', '; magnitude ' + nf(f.m) + ' earthquake: ') + esc(f.lugar) : '')); }
  return '<div class="tile situ"><div class="situ-h"><span class="t">' + L('📡 Situação agora', '📡 Situation now') + (z ? ' · ' + esc(zn) : '') + '</span><span class="small muted">' + (s.ts ? L('dados de ' + esc(nwAgo(s.ts)), 'updated ' + esc(nwAgo(s.ts))) : L('sem dados guardados', 'no saved data')) + '</span></div>' +
    (LN.length ? '<ul class="situ-l">' + LN.map(x => '<li>' + x + '</li>').join('') + '</ul>' : '<p class="small muted">' + L('Com internet, carrega em Atualizar para ver os avisos da tua zona, os sismos perto e os alertas graves no mundo.', 'With internet, tap Refresh to see the warnings for your area, nearby earthquakes and serious alerts worldwide.') + '</p>') +
    '<div class="btnrow"><button class="btn sm" id="situup">' + L('🔄 Atualizar', '🔄 Refresh') + '</button><a class="btn sm" href="#/t/perto">' + L('📍 Perto de mim', '📍 Near me') + '</a><a class="btn sm" href="#/t/noticias">' + L('📰 Notícias', '📰 News') + '</a></div></div>';
}
function situacaoLigar() {
  const b = $('#situup'); if (!b) return;
  b.onclick = async () => {
    if (!navigator.onLine) return toast(L('Sem ligação à internet', 'No internet connection'));
    b.disabled = true; b.textContent = L('🔄 A atualizar…', '🔄 Refreshing…');
    await atualizarFontes(['ipma', 'rcm', 'emsc', 'gdacs', 'usgs']);
    if (!location.hash || location.hash === '#/') route();
  };
}
