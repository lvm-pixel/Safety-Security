// Validação do index.html gerado: sintaxe, ligações internas, figuras, tokens da família, SVG e guias do modo emergência.
// Uso: node tools/verificar.js (depois de node build.js)
const fs = require('fs'), vm = require('vm');
const root = require('path').join(__dirname, '..').split(require('path').sep).join('/') + '/';
const html = fs.readFileSync(root + 'index.html', 'utf8');
const ferrDir = root + 'src/ferramentas/';
const app = fs.readFileSync(root + 'src/app.js', 'utf8') + '\n' + (fs.existsSync(ferrDir) ? fs.readdirSync(ferrDir).filter(f => f.endsWith('.js')).sort().map(f => fs.readFileSync(ferrDir + f, 'utf8')).join('\n') : '');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
let errors = 0; const err = (...a) => { errors++; console.log('ERRO:', ...a); };
try { new vm.Script(scripts[0] + '\n' + scripts[1]); console.log('sintaxe OK'); } catch (e) { err('sintaxe', e.message); }
if (html.includes('/*__FERRAMENTAS__*/')) err('marcador de ferramentas por substituir no index.html');

const ctx = {}; vm.createContext(ctx);
vm.runInContext(scripts[0] + ';globalThis.__C = CONTENT; globalThis.__F = FIGS; globalThis.__G = typeof GUIAS === "undefined" ? [] : GUIAS;', ctx);
const C = ctx.__C, F = ctx.__F, G = ctx.__G;
const tools = [...app.matchAll(/TOOLS\.push\(\{ id: '([\w-]+)'/g)].map(m => m[1]);
const meus = new Set([...app.matchAll(/TOOLS\.push\(\{ id: '([\w-]+)', section: 'meus'/g)].map(m => m[1]));
const valid = new Set(['#/', '#/about', '#/settings', '#/boas-vindas', '#/s/ferramentas', '#/s/meus']);
tools.forEach(t => { valid.add('#/t/' + t); valid.add('#/s/' + (meus.has(t) ? 'meus' : 'ferramentas') + '/' + t); });
let pages = 0, tasks = 0;
for (const s of C.sections) { valid.add('#/s/' + s.id); for (const p of s.pages) { valid.add('#/s/' + s.id + '/' + p.id); pages++; tasks += (p.md.match(/^\s*- \[ \]/gm) || []).length; } }

const texts = [C.about, C.battery, C.vaultHelp];
for (const s of C.sections) { texts.push(s.title, s.desc); for (const p of s.pages) texts.push(p.title, p.desc || '', p.md); }
// guias: estrutura e textos
let passos = 0;
for (const g of G) {
  texts.push(g.t); if (!valid.has(g.pag)) err('guia com página inexistente', g.id, g.pag);
  const ids = new Set(g.passos.filter(p => p.id).map(p => p.id));
  g.passos.forEach((p, i) => {
    passos++; texts.push(p.t, p.d || '', p.ios || ''); if (p.p) texts.push(p.p.q);
    const alvo = [p.seg, p.p && p.p.sim, p.p && p.p.nao].filter(Boolean); alvo.forEach(a => { if (!ids.has(a)) err('guia', g.id, 'passo', i, 'aponta para id inexistente', a); });
    if (p.ferr && !tools.includes(p.ferr)) err('guia', g.id, 'ferramenta inexistente', p.ferr);
    (p.abrir || []).forEach(a => { if (!G.find(x => x.id === a)) err('guia', g.id, 'abrir guia inexistente', a); });
    if (!p.p && !p.fim && !p.seg && i === g.passos.length - 1) err('guia', g.id, 'último passo sem fim');
  });
}
const all = texts.join('\n') + '\n' + app;
const links = new Set([...all.matchAll(/\]\((#\/[^)\s]*)\)/g)].map(m => m[1]).concat([...all.matchAll(/href="(#\/[^"]*)"/g)].map(m => m[1])));
for (const l of links) if (!valid.has(l) && !/^#\/(search|t\/' \+|s\/' \+)/.test(l) && !l.includes("'")) err('ligação quebrada', l);
const figRefs = new Set([...all.matchAll(/\(fig:([\w-]+)\)/g)].map(m => m[1]));
for (const id of figRefs) if (!F[id]) err('figura inexistente', id);
const unused = Object.keys(F).filter(id => !figRefs.has(id));
const fam = ['fam', 'n', 'nA', 'nC', 'water_drink_day', 'water_drink_3d', 'water_drink_14d', 'water_day', 'water_3d', 'water_14d', 'jugs_3d', 'jugs_14d', 'water_detail', 'pets_water_line', 'kcal_day', 'kcal_3d', 'kcal_14d', 'pd_factor', 'kcal_detail', 'diapers_day', 'diapers_3d', 'diapers_14d', 'diapers_line', 'milk_day', 'milk_3d', 'milk_14d', 'milk_line', 'a1', 'a2', 'cpr_line', 'fam_nomes', 'kids_para', 'kids_de', 'kids_desc', 'radio_zona', 'familia_adr', 'familia_para', 'familia_ki', 'local', 'encontro1', 'encontro2'];
const planos = new Set([...app.matchAll(/^\s*\['(\w+)', .*?, '(?:input|textarea)'/gm)].map(m => 'plano_' + m[1]));
const kid = /^(C[12](_s)?|c[12](_(n|o|s|idade|titulo|age|kg|kg_est|water|kcal|para_mg|para_ml|para_tab|ibu_mg|ibu_ml|sro|sro4h|cet|ki|adr))?|(de|a|em|por)_c[12])$/;
const toks = new Set([...(texts.join('\n') + Object.values(F).join('\n') + app).matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]));
for (const t of toks) if (!fam.includes(t) && !kid.test(t) && !planos.has(t)) err('token desconhecido', t);
for (const [id, svg] of Object.entries(F)) {
  const st = []; for (const m of svg.matchAll(/<(\/?)([a-zA-Z]+)[^>]*?(\/?)>/g)) { if (m[3]) continue; if (m[1]) { if (st.pop() !== m[2]) { err('svg mal fechado', id, m[2]); break; } } else st.push(m[2]); }
  if (st.length) err('svg por fechar', id, st.join(','));
  if (!/viewBox="0 0 \d+ \d+"/.test(svg)) err('svg sem viewBox', id);
}
console.log('secções:', C.sections.length, '| páginas:', pages, '| itens de checklist:', tasks, '| figuras:', Object.keys(F).length, '(sem uso: ' + (unused.join(', ') || 'nenhuma') + ') | tokens usados:', toks.size, '| ferramentas:', tools.length, '| guias:', G.length, '(' + passos + ' passos)');
console.log('tamanho index.html:', Math.round(html.length / 1024), 'KB');
console.log(errors ? errors + ' erro(s)' : 'sem erros');
process.exit(errors ? 1 : 0);
