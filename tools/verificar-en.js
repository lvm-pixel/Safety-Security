// Verifica a versão inglesa dos guias (src/content-en) contra a portuguesa (src/content).
// Erros de estrutura fazem sair com código 1; restos de português e textos por traduzir são avisos.
// Uso: node tools/verificar-en.js [--detalhe]
const fs = require('fs'), vm = require('vm');
const root = require('path').join(__dirname, '..').split(require('path').sep).join('/') + '/';
const DET = process.argv.includes('--detalhe');
const readDir = d => fs.readdirSync(root + d).filter(f => f.endsWith('.js')).sort().map(f => ({ f: d + f, s: fs.readFileSync(root + d + f, 'utf8') }));
const pt = readDir('src/content/'), en = readDir('src/content-en/');
let errors = 0, warns = 0; const err = (...a) => { errors++; console.log('ERRO:', ...a); }; const warn = (...a) => { warns++; if (DET) console.log('aviso:', ...a); };
// O português carrega-se de uma vez; cada ficheiro inglês à parte, para um erro num ficheiro não impedir a verificação dos outros.
const ctx = {}; vm.createContext(ctx);
try { vm.runInContext(pt.map(x => '/* ' + x.f + ' */\n' + x.s).join('\n;\n'), ctx, { filename: 'conteudos-pt' }); }
catch (e) { console.log('ERRO de sintaxe nos conteúdos portugueses:', e.message); process.exit(1); }
const falhados = [];
for (const x of en) {
  try { vm.runInContext(x.s, ctx, { filename: x.f }); }
  catch (e) { const m = /:(\d+)/.exec(String(e.stack).split('\n')[0]); falhados.push(x.f); errors++; console.log('ERRO de sintaxe em ' + x.f + (m ? ' (linha ' + m[1] + ')' : '') + ':', e.message); }
}
vm.runInContext('globalThis.__X = { C: CONTENT, F: FIGS, G: GUIAS, M: MAPA_BASE, CE: typeof CONTENT_EN === "undefined" ? null : CONTENT_EN, FE: typeof FIGS_EN === "undefined" ? null : FIGS_EN, GE: typeof GUIAS_EN === "undefined" ? null : GUIAS_EN, ME: typeof MAPA_PAISES_EN === "undefined" ? null : MAPA_PAISES_EN };', ctx);
const { C, F, G, M, CE, FE, GE, ME } = ctx.__X;
if (!CE || !FE || !GE) { console.log('ERRO: faltam CONTENT_EN, FIGS_EN ou GUIAS_EN (erro em src/content-en/00-base.js?)'); process.exit(1); }
if (falhados.length) console.log('Ficheiros com erro de sintaxe (as secções deles aparecem como sem tradução): ' + falhados.join(', '));

// app e ferramentas: ids de ferramentas para validar ligações
const ferrDir = root + 'src/ferramentas/';
const app = fs.readFileSync(root + 'src/app.js', 'utf8') + '\n' + fs.readdirSync(ferrDir).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(ferrDir + f, 'utf8')).join('\n');
const tools = [...app.matchAll(/TOOLS\.push\(\{ id: '([\w-]+)'/g)].map(m => m[1]);
const valid = new Set(['#/', '#/about', '#/settings', '#/s/ferramentas', '#/s/meus']);
tools.forEach(t => { valid.add('#/t/' + t); valid.add('#/s/ferramentas/' + t); valid.add('#/s/meus/' + t); });
for (const s of C.sections) { valid.add('#/s/' + s.id); for (const p of s.pages) valid.add('#/s/' + s.id + '/' + p.id); }

// restos de português (palavras frequentes que não existem em inglês)
const PT_WORDS = /\b(não|nao|são|está|estão|também|quando|então|porque|isto|isso|aqui|água|criança|crianças|uma|umas|uns|dos|das|pelo|pela|pelos|pelas|para|com|sem|até|mais|menos|muito|muita|depois|antes|sempre|nunca|cada|entre|sobre|onde|como|deve|devem|pode|podem|tem|têm|ser|estar|fazer|faz|liga|ligar|ajuda|casa|fogo|luz|rua|porta|dia|dias|horas|minutos|segundos|ou|mas|que|os|as|ao|aos|à|às|no|na|nos|nas|um|se|já|só|lhe|lhes|ele|ela|eles|elas|seu|sua|teu|tua|tens|podes|deves|vais|estás)\b/giu;
const ALLOW = /São Miguel|São Jorge|Santa Maria|Proteção Civil|Portal Diplomático|Antena|Junta de Freguesia|junta de freguesia|bombeiros|Bombeiros|SNS|Cruz Vermelha|Linha|Saúde|Guarda Nacional|Polícia|Segurança|Pública|Instituto|Emergência Médica|Nacional|Autoridade|Direção|Geral|Lisboa|Porto|Évora|Setúbal|Santarém|Bragança|Viseu|Guarda|Leiria|Aveiro|Coimbra|Faro|Beja|Portalegre|Castelo Branco|Viana do Castelo|Vila Real|Braga|Madeira|Açores|Multibanco|MB WAY|Via Verde|Cartão de Cidadão|ponto de encontro/g;
function ptLeft(txt) {
  const t = String(txt || '').replace(ALLOW, ' ').replace(/\{\{\w+\}\}/g, ' ').replace(/\]\([^)]*\)/g, ']').replace(/https?:\/\/\S+/g, ' ');
  const hits = (t.match(PT_WORDS) || []).map(w => w.toLowerCase());
  const strong = hits.filter(w => !['as', 'no', 'se', 'um', 'os', 'ou', 'que', 'com', 'para', 'dia', 'luz', 'casa', 'porta', 'rua'].includes(w)); // palavras que também aparecem em inglês ou em nomes
  const dia = (t.match(/[ãõçâêô]/g) || []).length;
  return { n: strong.length + Math.floor(dia / 2), sample: [...new Set(strong)].slice(0, 8).join(', ') };
}
const taskCount = s => (String(s || '').match(/^\s*[-*+]\s+\[[ xX]\]\s+/gm) || []).length;
const linksOf = s => [...String(s || '').matchAll(/\]\((#\/[^)\s]*)\)/g)].map(m => m[1]).sort();
const figsOf = s => [...String(s || '').matchAll(/\(fig:([\w-]+)\)/g)].map(m => m[1]).sort();
const tokensOf = s => [...String(s || '').matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]);
const OLD_TOK = /^((de|a|em|por)_c[12]|c[12]_o)$/;
const TOK_OK = /^(C[12](_s)?|c[12](_(n|o|s|idade|titulo|age|kg|kg_est|water|kcal|para_mg|para_ml|para_tab|ibu_mg|ibu_ml|sro|sro4h|cet|ki|adr))?|(de|a|em|por)_c[12]|fam|n|nA|nC|water_drink_day|water_drink_3d|water_drink_14d|water_day|water_3d|water_14d|jugs_3d|jugs_14d|water_detail|pets_water_line|kcal_day|kcal_3d|kcal_14d|pd_factor|kcal_detail|diapers_day|diapers_3d|diapers_14d|diapers_line|milk_day|milk_3d|milk_14d|milk_line|a1|a2|cpr_line|fam_nomes|kids_para|kids_de|kids_desc|radio_zona|familia_adr|familia_para|familia_ki|local|encontro1|encontro2|plano_\w+)$/;

const stats = { pages: 0, translated: 0, untranslated: [], ptLeft: [] };
function checkText(where, ptTxt, enTxt, isMd) {
  if (enTxt == null) return;
  if (ptTxt && enTxt === ptTxt && /\p{L}{4,}/u.test(ptTxt) && !/^[A-Z0-9 &.:/()+-]+$/.test(ptTxt)) { stats.untranslated.push(where); return; }
  for (const t of tokensOf(enTxt)) { if (!TOK_OK.test(t)) err(where, 'token desconhecido {{' + t + '}}'); else if (OLD_TOK.test(t)) warn(where, 'token português {{' + t + '}} (usar c1 / c1_s)'); }
  const ptT = new Set(tokensOf(ptTxt).filter(t => !OLD_TOK.test(t))), enT = new Set(tokensOf(enTxt));
  for (const t of ptT) if (!enT.has(t) && !/^[cC][12]$/.test(t) && !/^c[12]_(s|idade)$/.test(t)) warn(where, 'token {{' + t + '}} desapareceu');
  const l = ptLeft(enTxt); if (l.n >= (isMd ? 4 : 2)) stats.ptLeft.push(where + ' (' + l.n + ': ' + l.sample + ')');
}

// secções e páginas
for (const id of Object.keys(CE.sections)) if (!C.sections.find(s => s.id === id)) err('secção inglesa sem equivalente português:', id);
for (const s of C.sections) {
  const es = CE.sections[s.id];
  if (!es) { err('secção sem tradução:', s.id); continue; }
  checkText(s.id + ' (título)', s.title, es.title); checkText(s.id + ' (descrição)', s.desc, es.desc);
  for (const id of Object.keys(es.pages || {})) if (!s.pages.find(p => p.id === id)) err('página inglesa sem equivalente português:', s.id + '/' + id);
  for (const p of s.pages) {
    stats.pages++; const ep = (es.pages || {})[p.id], key = s.id + '/' + p.id;
    if (!ep) { err('página sem tradução:', key); continue; }
    if (ep.md === p.md) { stats.untranslated.push(key); continue; }
    stats.translated++;
    checkText(key + ' (título)', p.title, ep.title); if (p.desc != null) checkText(key + ' (descrição)', p.desc, ep.desc);
    checkText(key, p.md, ep.md, true);
    const a = taskCount(p.md), b = taskCount(ep.md); if (a !== b) err(key, 'checklist com ' + b + ' itens em inglês e ' + a + ' em português');
    const la = linksOf(p.md), lb = linksOf(ep.md);
    for (const l of lb) if (!valid.has(l)) err(key, 'ligação quebrada', l);
    if (la.join() !== lb.join()) warn(key, 'ligações diferentes do português', JSON.stringify(la.filter(x => !lb.includes(x))), '→', JSON.stringify(lb.filter(x => !la.includes(x))));
    const fa = figsOf(p.md), fb = figsOf(ep.md); if (fa.join() !== fb.join()) err(key, 'figuras diferentes', fa.join(','), '→', fb.join(','));
    if (/`/.test(ep.md)) err(key, 'acento grave no texto');
  }
}
for (const k of ['about', 'battery', 'vaultHelp']) { if (!CE[k]) err('falta CONTENT_EN.' + k); else if (CE[k] === C[k]) stats.untranslated.push(k); else checkText(k, C[k], CE[k], true); }

// guias do modo emergência
let gSteps = 0, gUntr = 0;
for (const id of Object.keys(GE)) if (!G.find(g => g.id === id)) err('guia inglês sem equivalente:', id);
for (const g of G) {
  const e = GE[g.id]; if (!e) { err('guia sem tradução:', g.id); continue; }
  checkText('guia ' + g.id, g.t, e.t);
  if (!Array.isArray(e.passos) || e.passos.length !== g.passos.length) { err('guia', g.id, 'tem', e.passos && e.passos.length, 'passos em inglês e', g.passos.length, 'em português'); continue; }
  g.passos.forEach((p, i) => {
    gSteps++; const ep = e.passos[i], w = 'guia ' + g.id + ' passo ' + i + (p.id ? ' ' + p.id : '');
    for (const k of Object.keys(ep)) { if (k === 'p') continue; if (typeof p[k] !== 'string') err(w, 'campo inglês sem equivalente:', k); }
    for (const k of Object.keys(p)) if (typeof p[k] === 'string' && !['id', 'seg', 'ferr'].includes(k) && ep[k] == null) err(w, 'falta o campo', k);
    if (!!p.p !== !!ep.p) err(w, 'pergunta a mais ou a menos');
    if (p.p && ep.p) for (const k of ['q', 'simT', 'naoT']) { if ((p.p[k] == null) !== (ep.p[k] == null)) err(w, 'pergunta: campo', k); else if (p.p[k] != null) checkText(w + ' ' + k, p.p[k], ep.p[k]); }
    let same = 0; for (const k of ['t', 'd', 'tempoT', 'cronoT', 'hora', 'ios']) if (p[k] != null) { if (ep[k] === p[k] && /\p{L}{4,}/u.test(p[k])) same++; else checkText(w + ' ' + k, p[k], ep[k]); }
    if (same) gUntr++;
  });
}

// figuras
let fSeg = 0, fUntr = 0;
for (const [id, pairs] of Object.entries(FE)) {
  if (!F[id]) { err('figura inglesa inexistente:', id); continue; }
  let svg = F[id];
  for (const pr of pairs) {
    fSeg++;
    if (!Array.isArray(pr) || pr.length !== 2 || typeof pr[0] !== 'string' || typeof pr[1] !== 'string') { err('figura', id, 'par inválido', JSON.stringify(pr)); continue; }
    if (!svg.includes('>' + pr[0] + '<')) err('figura', id, 'texto português não encontrado no SVG:', JSON.stringify(pr[0]));
    if (pr[0] === pr[1] && /\p{L}{3,}/u.test(pr[0])) fUntr++;
    if (/[<>]|&(?!amp;|lt;|gt;|quot;|#\d+;)/.test(pr[1])) err('figura', id, 'carácter por escapar em', JSON.stringify(pr[1]));
    svg = svg.split('>' + pr[0] + '<').join('>' + pr[1] + '<');
  }
  const st = []; for (const m of svg.matchAll(/<(\/?)([a-zA-Z]+)[^>]*?(\/?)>/g)) { if (m[3]) continue; if (m[1]) { if (st.pop() !== m[2]) { err('svg mal fechado depois da tradução', id, m[2]); break; } } else st.push(m[2]); }
}

// países
let pUntr = 0; const pNames = new Set((M.paises || []).map(p => p[0]));
if (ME) { for (const [k, v] of Object.entries(ME)) { if (!pNames.has(k)) err('país inexistente:', k); if (k === v) pUntr++; } for (const n of pNames) if (!(n in ME)) err('país sem entrada:', n); }
else err('falta MAPA_PAISES_EN');

console.log('páginas traduzidas:', stats.translated + '/' + stats.pages, '| guias:', G.length, '(' + gSteps + ' passos, ' + gUntr + ' com texto por traduzir) | figuras:', Object.keys(FE).length, '(' + fSeg + ' textos, ' + fUntr + ' iguais ao português) | países iguais ao português:', pUntr);
if (stats.untranslated.length) console.log('POR TRADUZIR (' + stats.untranslated.length + '):', stats.untranslated.slice(0, DET ? 999 : 25).join(' · ') + (stats.untranslated.length > 25 && !DET ? ' …' : ''));
if (stats.ptLeft.length) console.log('POSSÍVEIS RESTOS DE PORTUGUÊS (' + stats.ptLeft.length + '):\n  ' + stats.ptLeft.slice(0, DET ? 999 : 30).join('\n  '));
console.log(errors ? errors + ' erro(s)' : 'sem erros de estrutura', warns ? '| ' + warns + ' aviso(s)' + (DET ? '' : ' (--detalhe para ver)') : '');
process.exit(errors ? 1 : 0);
