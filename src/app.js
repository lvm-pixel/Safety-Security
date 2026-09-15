/* ===== Safety & Security — lógica da app ===== */
(function () {
'use strict';
const VERSION = '__VERSION__';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
function fmtDate(ts) { if (!ts) return '—'; const d = new Date(ts); return d.toLocaleDateString(LOCALE) + ' ' + d.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' }); }
function fmtDay(s) { if (!s) return '—'; const d = new Date(s); return isNaN(d) ? s : d.toLocaleDateString(LOCALE); }
function pad(n) { return String(n).padStart(2, '0'); }

/* ---------- armazenamento ---------- */
const LS = {
  get(k, d) { try { const v = localStorage.getItem('prep.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('prep.' + k, JSON.stringify(v)); } catch (e) { toast(L('Não foi possível guardar: este browser está a bloquear o armazenamento ou está cheio', 'Could not save: this browser is blocking storage or it is full')); } },
  del(k) { try { localStorage.removeItem('prep.' + k); } catch (e) { } },
  keys() { const out = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('prep.')) out.push(k.slice(5)); } return out; }
};
const STORAGE_OK = (() => { try { const k = 'prep.__teste'; localStorage.setItem(k, '1'); const ok = localStorage.getItem(k) === '1'; localStorage.removeItem(k); return ok; } catch (e) { return false; } })();
let CHECKS = LS.get('checks', {});
const SETTINGS = Object.assign({ theme: 'dark', font: 'normal', awake: false }, LS.get('settings', {}));

/* ---------- língua ---------- */
// Português por omissão; inglês nas Definições, no menu lateral ou com ?lang=en no endereço. Mudar de língua recarrega a app.
// L('texto em português', 'English text') devolve o texto da língua ativa. Os guias em inglês estão em src/content-en/, com os mesmos ids.
try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'pt' || q === 'en') { if (SETTINGS.lang !== q) { SETTINGS.lang = q; LS.set('settings', SETTINGS); } const u = new URL(location.href); u.searchParams.delete('lang'); history.replaceState(null, '', u.href); } } catch (e) { }
const LANG = SETTINGS.lang === 'en' ? 'en' : 'pt';
const EN = LANG === 'en';
const LOCALE = EN ? 'en-GB' : 'pt-PT';
function L(pt, en) { return EN && en != null ? en : pt; }
function speechVoice() { const vs = window.speechSynthesis ? speechSynthesis.getVoices() : []; return EN ? vs.find(x => /en[-_]GB/i.test(x.lang)) || vs.find(x => /^en/i.test(x.lang)) : vs.find(x => /pt[-_]PT/i.test(x.lang)) || vs.find(x => /^pt/i.test(x.lang)); }
function setLang(l) { if (l !== 'pt' && l !== 'en') return; SETTINGS.lang = l; LS.set('settings', SETTINGS); location.reload(); }
/* Guias em inglês: o texto de src/content-en/ substitui o português com os mesmos ids; ícones, ordem, figuras e ferramentas vêm da versão portuguesa.
   Os visitos das checklists inglesas ficam nas chaves portuguesas do item na mesma posição (TASK_ALIAS). */
const TASK_ALIAS = {};
if (EN) {
  const txt = (dst, src) => { for (const k in src) { const v = src[k]; if (v == null || !dst || !(k in dst)) continue; if (typeof v === 'string') { if (typeof dst[k] === 'string') dst[k] = v; } else if (typeof v === 'object' && dst[k] && typeof dst[k] === 'object') txt(dst[k], v); } };
  if (typeof CONTENT_EN !== 'undefined') {
    ['about', 'battery', 'vaultHelp'].forEach(k => { if (CONTENT_EN[k]) CONTENT[k] = CONTENT_EN[k]; });
    for (const s of CONTENT.sections) {
      const es = CONTENT_EN.sections[s.id]; if (!es) continue;
      if (es.title) s.title = es.title; if (es.desc) s.desc = es.desc;
      for (const p of s.pages) {
        const ep = es.pages && es.pages[p.id]; if (!ep) continue;
        if (ep.title) p.title = ep.title; if (ep.desc && p.desc != null) p.desc = ep.desc;
        if (ep.md && ep.md !== p.md) { const pk = s.id + '/' + p.id, a = rawTaskKeys(pk, ep.md), b = rawTaskKeys(pk, p.md); if (a.length === b.length) a.forEach((k, i) => { if (k !== b[i]) TASK_ALIAS[k] = b[i]; }); p.md = ep.md; }
      }
    }
  }
  if (typeof FIGS_EN !== 'undefined') for (const id in FIGS_EN) { if (!FIGS[id] || !Array.isArray(FIGS_EN[id])) continue; let svg = FIGS[id]; for (const pr of FIGS_EN[id]) if (pr && pr[1] != null && pr[1] !== pr[0]) svg = svg.split('>' + pr[0] + '<').join('>' + pr[1] + '<'); FIGS[id] = svg; }
  if (typeof GUIAS_EN !== 'undefined' && typeof GUIAS !== 'undefined') for (const g of GUIAS) { const e = GUIAS_EN[g.id]; if (!e) continue; if (e.t) g.t = e.t; if (Array.isArray(e.passos) && e.passos.length === g.passos.length) g.passos.forEach((p, i) => txt(p, e.passos[i])); }
}
function saveSettings() { LS.set('settings', SETTINGS); applySettings(); }
function applySettings() {
  document.documentElement.dataset.theme = SETTINGS.theme;
  document.documentElement.dataset.font = SETTINGS.font;
  const tc = $('meta[name=theme-color]'); if (tc) tc.content = SETTINGS.theme === 'light' ? '#ffffff' : '#0f1115';
  keepAwake(SETTINGS.awake, 'global');
}

/* ---------- perfil da família e números calculados ---------- */
const FAMILY_DEFAULT = {
  adults: [{ name: '', phone: '', health: '' }, { name: '', phone: '', health: '' }],
  children: [{ name: '', sex: '', age: 2, kg: '', health: '' }, { name: '', sex: '', age: 7, kg: '', health: '' }],
  dogs: 0, cats: 0, updated: 0
};
function getFamily() { const f = LS.get('family', null); const d = JSON.parse(JSON.stringify(FAMILY_DEFAULT)); if (!f) return d; return Object.assign(d, f); }
function saveFamily(f) { f.updated = Date.now(); LS.set('family', f); }
function kidsSorted(f) { return (f || getFamily()).children.map((c, i) => Object.assign({ idx: i }, c, { age: Math.max(0, +c.age || 0) })).sort((a, b) => a.age - b.age); }
function estKg(age) { age = +age || 0; if (age < 1) return 7; if (age <= 10) return (age + 4) * 2; if (age <= 14) return Math.min(50, 3 * age + 7); return 60; }
function childKg(c) { return +c.kg > 0 ? +c.kg : estKg(c.age); }
function childWater(age) { return age < 1 ? 1 : age < 4 ? 1.5 : age < 9 ? 2 : age < 14 ? 2.5 : 3; }
function childKcal(age) { return age < 1 ? 800 : age < 4 ? 1100 : age < 9 ? 1600 : age < 14 ? 2000 : 2300; }
function childDiapers(age) { return age < 1 ? 8 : age < 3 ? 6 : 0; }
function childMilk(age) { return age < 1 ? 0.8 : age <= 8 ? 0.4 : 0; }
function nf(x, d = 1) { return (+x).toLocaleString(LOCALE, { maximumFractionDigits: d }); }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function joinE(arr) { return arr.length < 2 ? arr.join('') : arr.slice(0, -1).join(', ') + L(' e ', ' and ') + arr[arr.length - 1]; }
/* doses pediátricas (mg por kg, arredondadas para baixo a 0,5 ml) */
function doseCalc(kg, mgPerKg, conc, maxDose) { const exact = Math.min(kg * mgPerKg, maxDose); const ml = Math.floor(exact / conc * 2) / 2; return { mg: Math.round(ml * conc), ml, exact }; }
function paraTab(kg) { const opts = [[1000, L('1 comprimido de 1 g', '1 tablet of 1 g')], [500, L('1 comprimido de 500 mg', '1 tablet of 500 mg')], [250, L('meio comprimido de 500 mg', 'half a 500 mg tablet')]]; for (const o of opts) { const r = o[0] / kg; if (r <= 15 && r >= 10) return o[1]; } return ''; }
function sroAfter(age) { return age < 2 ? L('50 a 100 ml', '50 to 100 ml') : age < 10 ? L('100 a 200 ml', '100 to 200 ml') : L('o que quiser beber (200 a 400 ml)', 'as much as they want to drink (200 to 400 ml)'); }
function sro4h(kg) { const v = nf(Math.round(kg * 75 / 50) * 50, 0); return L('cerca de ' + v + ' ml nas primeiras 4 horas (75 ml por kg)', 'about ' + v + ' ml in the first 4 hours (75 ml per kg)'); }
function kiDose(age) { return age < 1 ? L('16 mg (um quarto de comprimido de 65 mg) até 1 mês; 32 mg (meio) de 1 mês a 1 ano, dissolvido em leite ou água', '16 mg (a quarter of a 65 mg tablet) up to 1 month; 32 mg (half) from 1 month to 1 year, dissolved in milk or water') : age < 3 ? L('32 mg (meio comprimido de 65 mg), dissolvido em leite, sumo ou água', '32 mg (half a 65 mg tablet), dissolved in milk, juice or water') : age < 12 ? L('65 mg (1 comprimido de 65 mg)', '65 mg (1 tablet of 65 mg)') : L('130 mg (2 comprimidos de 65 mg)', '130 mg (2 tablets of 65 mg)'); }
function adrDose(kg) { return kg < 7.5 ? L('não há auto-injetor para este peso: 112', 'no auto-injector for this weight: call 112') : kg < 25 ? L('0,15 mg (dose júnior), só se receitada', '0.15 mg (junior dose), only if prescribed') : L('0,3 mg (dose de adulto), só se receitada', '0.3 mg (adult dose), only if prescribed'); }
function cetDose(age) { return age < 2 ? L('abaixo dos 2 anos, só com indicação médica', 'under 2 years, only on medical advice') : age < 6 ? L('2,5 mg (5 gotas) 2 vezes por dia', '2.5 mg (5 drops) twice a day') : age < 12 ? L('5 mg (10 gotas ou meio comprimido) 2 vezes por dia', '5 mg (10 drops or half a tablet) twice a day') : L('10 mg (1 comprimido) 1 vez por dia', '10 mg (1 tablet) once a day'); }
function cprType(age) { return age < 1 ? L('bebé', 'baby') : age < 12 ? L('criança', 'child') : L('adulto', 'adult'); }
/* formas gramaticais: com nome e sexo usa o nome; sem nome usa "a mais nova" / "o mais velho" */
function childForms(c, k, total) {
  const m = c.sex === 'm'; const o = m ? 'o' : 'a'; const name = String(c.name || '').trim();
  if (EN) { const b = name || (total === 1 ? 'the child' : k === 1 ? 'the youngest' : 'the oldest'); return { base: b, de: b, a: b, em: b, por: b, s: b + "'s", label: name || (total === 1 ? 'Child' : k === 1 ? 'Youngest' : 'Oldest'), o: '' }; }
  if (name) {
    if (c.sex === 'm') return { base: 'o ' + name, de: 'do ' + name, a: 'ao ' + name, em: 'no ' + name, por: 'pelo ' + name, label: name, o };
    if (c.sex === 'f') return { base: 'a ' + name, de: 'da ' + name, a: 'à ' + name, em: 'na ' + name, por: 'pela ' + name, label: name, o };
    return { base: name, de: 'de ' + name, a: 'a ' + name, em: 'em ' + name, por: 'por ' + name, label: name, o };
  }
  if (total === 1) return { base: 'a criança', de: 'da criança', a: 'à criança', em: 'na criança', por: 'pela criança', label: 'Criança', o: 'a' };
  const adj = k === 1 ? (m ? 'mais novo' : 'mais nova') : (m ? 'mais velho' : 'mais velha');
  return { base: o + ' ' + adj, de: (m ? 'do ' : 'da ') + adj, a: (m ? 'ao ' : 'à ') + adj, em: (m ? 'no ' : 'na ') + adj, por: (m ? 'pelo ' : 'pela ') + adj, label: cap(adj), o };
}
function kidAge(k) { return k.age < 1 ? L('bebé', 'baby') : k.age + (k.age === 1 ? L(' ano', ' year') : L(' anos', ' years')); }
function famTokens(f) {
  f = f || getFamily(); const A = f.adults.length; const kids = kidsSorted(f); const C = kids.length; const t = {};
  const ages = kids.map(k => k.age < 1 ? L('bebé', 'baby') : String(k.age));
  const dogs = +f.dogs || 0, cats = +f.cats || 0; const pets = [];
  if (dogs) pets.push(dogs + (dogs > 1 ? L(' cães', ' dogs') : L(' cão', ' dog'))); if (cats) pets.push(cats + (cats > 1 ? L(' gatos', ' cats') : L(' gato', ' cat')));
  const partsF = [A + (A === 1 ? L(' adulto', ' adult') : L(' adultos', ' adults'))];
  if (C) partsF.push(C + (C === 1 ? L(' criança', ' child') : L(' crianças', ' children')) + ' (' + joinE(ages) + (kids[kids.length - 1].age < 1 && C === 1 ? '' : L(' anos', ' years')) + ')');
  t.fam = joinE(partsF.concat(pets)); t.n = String(A + C); t.nA = String(A); t.nC = String(C);
  kids.forEach((k, i) => { k.kgv = childKg(k); k.forms = childForms(k, i === 0 ? 1 : 2, C); });
  const named = kids.filter(k => String(k.name || '').trim()), adultNames = f.adults.map(a => String(a.name || '').trim()).filter(Boolean);
  t.kids_para = named.length ? joinE(kids.map(k => k.forms.base)) : (C === 1 ? L('a criança', 'the child') : L('as crianças', 'the children'));
  t.kids_de = named.length ? joinE(kids.map(k => EN ? k.forms.s : k.forms.de)) : (C === 1 ? L('da criança', "the child's") : L('das crianças', "the children's"));
  t.kids_desc = EN ? (!C ? 'children' : named.length ? joinE(kids.map(k => k.forms.base + ' (' + kidAge(k) + ')')) : C === 1 ? (kids[0].age < 1 ? 'a baby' : 'a child aged ' + kids[0].age) : C === 2 ? 'a child aged ' + (kids[0].age < 1 ? 'under 1' : kids[0].age) + ' and another aged ' + (kids[1].age < 1 ? 'under 1' : kids[1].age) : 'children aged ' + joinE(kids.map(k => k.age < 1 ? 'under 1' : String(k.age)))) : !C ? 'crianças' : named.length ? joinE(kids.map(k => k.forms.base + ' (' + kidAge(k) + ')')) : C === 1 ? 'uma criança de ' + kidAge(kids[0]) : C === 2 ? 'uma criança de ' + (kids[0].age < 1 ? 'menos de 1 ano' : kids[0].age) + ' e outra de ' + kidAge(kids[1]) : 'crianças de ' + joinE(kids.map(k => k.age < 1 ? 'menos de 1' : String(k.age))) + ' anos';
  t.fam_nomes = (adultNames.length || named.length) ? joinE((adultNames.length === A ? adultNames : [A + (A === 1 ? L(' adulto', ' adult') : L(' adultos', ' adults'))]).concat(kids.map(k => (String(k.name || '').trim() || L('criança', 'child')) + ' (' + kidAge(k) + ')')).concat(pets)) : t.fam;
  const drink = 3 * A + kids.reduce((s, k) => s + childWater(k.age), 0); const hyg = 2 * (A + C); const day = drink + hyg;
  t.water_drink_day = nf(drink); t.water_drink_3d = nf(drink * 3); t.water_drink_14d = nf(drink * 14);
  t.water_day = nf(day); t.water_3d = nf(Math.ceil(day * 3)); t.water_14d = nf(Math.ceil(day * 14));
  t.jugs_3d = String(Math.ceil(day * 3 / 5)); t.jugs_14d = String(Math.ceil(day * 14 / 5));
  t.water_detail = (A ? (A === 1 ? L('o adulto 3 L', 'the adult 3 L') : L('cada adulto 3 L', 'each adult 3 L')) : '') + kids.map(k => '; ' + k.forms.base + ' ' + nf(childWater(k.age)) + ' L').join('');
  const petW = dogs * 1 + cats * 0.3; t.pets_water_line = petW ? L(' Os animais precisam de mais ' + nf(petW) + ' L por dia.', ' The pets need another ' + nf(petW) + ' L per day.') : '';
  const kcal = 2100 * A + kids.reduce((s, k) => s + childKcal(k.age), 0);
  t.kcal_day = nf(kcal, 0); t.kcal_3d = nf(kcal * 3 / 1000); t.kcal_14d = nf(Math.round(kcal * 14 / 1000), 0); t.pd_factor = nf(kcal / 2100);
  t.kcal_detail = (A ? L('2100 por adulto', '2,100 per adult') : '') + kids.map(k => '; ' + nf(childKcal(k.age), 0) + L(' para ', ' for ') + k.forms.base).join('');
  const dia = kids.reduce((s, k) => s + childDiapers(k.age), 0); t.diapers_day = String(dia); t.diapers_3d = String(dia * 3); t.diapers_14d = String(dia * 14);
  t.diapers_line = dia ? L('cerca de ' + dia * 3 + ' para 3 dias e ' + dia * 14 + ' para 2 semanas (' + dia + ' por dia), mais toalhitas, creme barreira e sacos para as usadas, bem fechados e longe (cheiram e atraem moscas).', 'about ' + dia * 3 + ' for 3 days and ' + dia * 14 + ' for 2 weeks (' + dia + ' a day), plus wipes, barrier cream and bags for used ones, tightly closed and kept away (they smell and attract flies).') : L('ninguém na família usa fraldas. Guarda na mesma cuecas de reserva e um resguardo para a cama: em crise há regressões.', 'nobody in the family uses nappies. Still keep spare underwear and a mattress protector: children can regress in a crisis.');
  const milk = kids.reduce((s, k) => s + childMilk(k.age), 0); t.milk_day = nf(milk); t.milk_3d = nf(milk * 3); t.milk_14d = nf(milk * 14);
  t.milk_line = milk ? L('cerca de ' + nf(milk * 3) + ' L para 3 dias e ' + nf(milk * 14) + ' L para 2 semanas (400 ml por dia por criança até aos 8 anos), UHT gordo ou em pó. A partir de 1 ano já não é preciso leite adaptado, salvo indicação médica.', 'about ' + nf(milk * 3) + ' L for 3 days and ' + nf(milk * 14) + ' L for 2 weeks (400 ml a day per child up to age 8), full-fat UHT or powdered. From 1 year old, formula milk is no longer needed unless a doctor advises it.') : L('as crianças já comem de tudo; leite UHT ou em pó ajuda a completar a dieta.', 'the children already eat everything; UHT or powdered milk helps to complete their diet.');
  t.a1 = (f.adults[0] && f.adults[0].name) || L('Adulto A', 'Adult A'); t.a2 = (f.adults[1] && f.adults[1].name) || L('Adulto B', 'Adult B');
  const groups = {}; kids.forEach(k => { const ty = cprType(k.age); (groups[ty] = groups[ty] || []).push(k.forms.base); });
  const gl = Object.keys(groups).map(ty => { const names = groups[ty]; return (names.length === C && C > 1 ? (C === 2 ? L('as duas crianças usam', 'both children use') : L('todas as crianças usam', 'all the children use')) : joinE(names) + (names.length > 1 ? L(' usam', ' use') : L(' usa', ' uses'))) + L(' a técnica de ' + ty, ' the ' + ty + ' technique'); });
  t.cpr_line = C ? joinE(gl) : L('não há crianças no perfil', 'there are no children in the profile');
  const slot = (k, kid) => {
    const p = 'c' + k, P = 'C' + k;
    if (!kid) { ['', '_n', '_o', '_s', '_idade', '_titulo', '_age', '_kg', '_kg_est', '_water', '_kcal', '_para_mg', '_para_ml', '_para_tab', '_ibu_mg', '_ibu_ml', '_sro', '_sro4h', '_cet', '_ki', '_adr'].forEach(s => { t[p + s] = '—'; }); t[P] = '—'; t[P + '_s'] = '—'; ['de_', 'a_', 'em_', 'por_'].forEach(s => { t[s + p] = '—'; }); return; }
    const fm = kid.forms, kg = kid.kgv; t[p] = fm.base; t[P] = cap(fm.base); t['de_' + p] = fm.de; t['a_' + p] = fm.a; t['em_' + p] = fm.em; t['por_' + p] = fm.por; t[p + '_s'] = fm.s != null ? fm.s : fm.de; t[P + '_s'] = cap(t[p + '_s']);
    t[p + '_n'] = fm.label; t[p + '_o'] = fm.o; t[p + '_titulo'] = String(kid.name || '').trim() ? String(kid.name).trim() + ', ' + kidAge(kid) : kid.age < 1 ? L('Bebé', 'Baby') : L('Criança de ', 'Child, ') + kidAge(kid); t[p + '_idade'] = kidAge(kid); t[p + '_age'] = kid.age < 1 ? L('menos de 1', 'under 1') : String(kid.age); t[p + '_kg'] = nf(kg); t[p + '_kg_est'] = +kid.kg > 0 ? '' : L(' estimados', ' estimated');
    t[p + '_water'] = nf(childWater(kid.age)); t[p + '_kcal'] = nf(childKcal(kid.age), 0);
    const pa = doseCalc(kg, 15, 40, 1000), ib = doseCalc(kg, 10, 20, 400);
    t[p + '_para_mg'] = String(pa.mg); t[p + '_para_ml'] = nf(pa.ml); const tb = paraTab(kg); t[p + '_para_tab'] = tb ? L(' (ou ', ' (or ') + tb + ')' : '';
    t[p + '_ibu_mg'] = String(ib.mg); t[p + '_ibu_ml'] = nf(ib.ml);
    t[p + '_sro'] = sroAfter(kid.age); t[p + '_sro4h'] = sro4h(kg); t[p + '_cet'] = cetDose(kid.age); t[p + '_ki'] = kiDose(kid.age); t[p + '_adr'] = adrDose(kg);
  };
  // papéis: {{c1}} é a criança pequena (a mais nova, se tiver até 4 anos) e {{c2}} a criança em idade escolar (a mais velha, se tiver 5 ou mais)
  const pequenas = kids.filter(k => k.age <= 4), escolares = kids.filter(k => k.age >= 5);
  slot(1, pequenas[0] || null); slot(2, escolares.length ? escolares[escolares.length - 1] : null);
  return t;
}
/* Os guias da família foram escritos para uma criança pequena ({{c1}}) e outra em idade escolar ({{c2}}). O que fala de quem a família não tem esconde-se:
   a linha sai; um título leva a secção até ao título seguinte do mesmo nível; numa tabela sai a coluna. O mesmo com {{a2}} quando há um só adulto. */
function famFaltas(f) {
  f = f || getFamily(); const kids = kidsSorted(f), falta = [];
  if (!kids.some(k => k.age <= 4)) falta.push('[cC]1', '(?:de|a|em|por)_c1');
  if (!kids.some(k => k.age >= 5)) falta.push('[cC]2', '(?:de|a|em|por)_c2');
  if (f.adults.length < 2) falta.push('a2');
  return falta.length ? new RegExp('\\{\\{(?:' + falta.join('|') + ')(?:_\\w+)?\\}\\}') : null;
}
function famSemFaltas(s, re) { if (re === undefined) re = famFaltas(); return re && re.test(s || '') ? '' : (s || ''); }
function famFilter(src, re) {
  if (!src || String(src).indexOf('{{') < 0) return src;
  if (re === undefined) re = famFaltas();
  if (!re) return src;
  const lines = String(src).split('\n'), out = []; let skip = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i], h = l.match(/^(#{1,4})\s/);
    if (skip) { if (h && h[1].length <= skip) skip = 0; else continue; }
    if (/^\|/.test(l.trim())) {
      let j = i; const rows = []; while (j < lines.length && /^\|/.test(lines[j].trim())) rows.push(lines[j++]); i = j - 1;
      const cells = rows.map(r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|')), drop = new Set();
      const n = Math.max.apply(null, cells.map(c => c.length));
      for (let c = 1; c < n; c++) if (cells.some(r => r[c] != null && re.test(r[c]))) drop.add(c);
      const kept = cells.map(r => r.filter((x, c) => !drop.has(c))).filter(r => !r.some(x => re.test(x)));
      if (kept.length > 1 && kept[0].length > 1) kept.forEach(r => out.push('|' + r.join('|') + '|'));
      continue;
    }
    if (re.test(l)) { if (h) skip = h[1].length; continue; }
    out.push(l);
  }
  return out.join('\n');
}
function fill(s, t) { t = t || famTokens(); return String(s == null ? '' : s).replace(/\{\{(\w+)\}\}/g, (m, k) => t[k] != null ? t[k] : m); }
function fillHTML(h, t) { t = t || famTokens(); return String(h).replace(/\{\{(\w+)\}\}/g, (m, k) => t[k] != null ? esc(t[k]) : m); }
function visiblePages(sec) { const f = getFamily(), n = f.children.length, re = famFaltas(f); return sec.pages.filter(p => /\{\{(?:[cC][12]|(?:de|a|em|por)_c[12])/.test(p.title || '') ? !(re && re.test(p.title)) : (!p.need || n >= p.need)); }

/* ---------- utilidades UI ---------- */
let toastTimer = null;
function toast(msg, ms = 2400) { const t = $('#toast'); t.textContent = msg; t.classList.remove('act'); t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms); }
/* nova versão instalada pelo service worker: na app instalada não há botão de recarregar, por isso o aviso traz um */
function novaVersao() { const t = $('#toast'); t.innerHTML = esc(L('Nova versão instalada.', 'New version installed.')) + '<button class="btn sm primary" id="tupd">' + L('Atualizar agora', 'Update now') + '</button>'; t.classList.add('show', 'act'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show', 'act'), 30000); $('#tupd').onclick = () => location.reload(); }
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast(L('Copiado', 'Copied')); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(L('Copiado', 'Copied')); } catch (e2) { toast(L('Não foi possível copiar', 'Could not copy')); } ta.remove(); }
}
function download(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
}
/* wake lock: "tool" (ferramenta ativa) ou "global" (definição) */
const wake = { tool: null, global: null };
async function keepAwake(on, who = 'tool') {
  try {
    if (!('wakeLock' in navigator)) return;
    if (on) { if (!wake[who]) wake[who] = await navigator.wakeLock.request('screen'); }
    else if (wake[who]) { await wake[who].release(); wake[who] = null; }
  } catch (e) { }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { if (SETTINGS.awake) { wake.global = null; keepAwake(true, 'global'); } } });

/* ---------- áudio ---------- */
let AC = null;
function ac() { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; }
function tone(freq = 800, dur = 0.12, type = 'sine', vol = 0.6) {
  try { const c = ac(); const o = c.createOscillator(); const g = c.createGain(); o.type = type; o.frequency.value = freq; o.connect(g); g.connect(c.destination);
    const t = c.currentTime; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.setValueAtTime(vol, t + Math.max(0.02, dur - 0.02)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.start(t); o.stop(t + dur + 0.05); } catch (e) { }
}
function startTone(kind) {
  const c = ac(); const g = c.createGain(); g.gain.value = 0.0001; g.connect(c.destination); const nodes = [];
  if (kind === 'apito') {
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = 2650; const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = 2950;
    const lfo = c.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 14; const lg = c.createGain(); lg.gain.value = 120; lfo.connect(lg); lg.connect(o.frequency);
    o.connect(g); o2.connect(g); o.start(); o2.start(); lfo.start(); nodes.push(o, o2, lfo);
  } else if (kind === 'sirene') {
    const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 900; const lfo = c.createOscillator(); lfo.type = 'triangle'; lfo.frequency.value = 0.6; const lg = c.createGain(); lg.gain.value = 420; lfo.connect(lg); lg.connect(o.frequency);
    o.connect(g); o.start(); lfo.start(); nodes.push(o, lfo);
  } else if (kind === 'alarme') {
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = 1400; const lfo = c.createOscillator(); lfo.type = 'square'; lfo.frequency.value = 4; const lg = c.createGain(); lg.gain.value = 0.5; const off = c.createConstantSource ? c.createConstantSource() : null;
    lfo.connect(lg); lg.connect(g.gain); if (off) { off.offset.value = 0.5; off.connect(g.gain); off.start(); nodes.push(off); }
    o.connect(g); o.start(); lfo.start(); nodes.push(o, lfo);
  }
  g.gain.exponentialRampToValueAtTime(kind === 'alarme' ? 0.5 : 0.7, c.currentTime + 0.05);
  return () => { try { g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.08); setTimeout(() => nodes.forEach(n => { try { n.stop(); } catch (e) { } }), 150); } catch (e) { } };
}

/* ---------- Morse ---------- */
const MORSE = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..', 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '@': '.--.-.' };
function morseSeq(text, unit) {
  const seq = []; const words = norm(text).toUpperCase().split(/\s+/).filter(Boolean);
  words.forEach((w, wi) => { if (wi) seq.push([0, 7 * unit]); let first = true;
    for (const ch of w) { const code = MORSE[ch]; if (!code) continue; if (!first) seq.push([0, 3 * unit]); first = false;
      code.split('').forEach((s, si) => { if (si) seq.push([0, unit]); seq.push([1, s === '.' ? unit : 3 * unit]); }); } });
  return seq;
}
const player = { timer: null, active: false };
function stopPlayer() { player.active = false; clearTimeout(player.timer); player.timer = null; }
function playSeq(seq, opt) {
  stopPlayer(); player.active = true; let idx = 0; const OV = $('#overlay');
  if (opt.vibrate && navigator.vibrate) { try { navigator.vibrate(seq.map(s => s[1])); } catch (e) { } }
  const step = () => {
    if (!player.active) return;
    if (idx >= seq.length) { if (opt.loop) { idx = 0; if (opt.light) OV.style.background = '#000'; player.timer = setTimeout(step, opt.unit * 7); return; } stopPlayer(); if (opt.light) OV.style.background = '#000'; opt.onDone && opt.onDone(); return; }
    const [on, dur] = seq[idx++];
    if (opt.light) OV.style.background = on ? '#fff' : '#000';
    if (opt.sound && on) tone(opt.freq || 750, dur / 1000, 'sine', 0.7);
    player.timer = setTimeout(step, dur);
  };
  step();
}

/* ---------- overlay ---------- */
function overlayShow(bg, html, onClose, fg) {
  const OV = $('#overlay'); OV.style.background = bg; OV.style.color = fg || (bg === '#fff' || bg === 'white' ? '#000' : '#fff'); OV.innerHTML = html; OV.classList.add('show');
  OV.onclick = () => { overlayHide(); onClose && onClose(); }; keepAwake(true);
}
function overlayHide() { const OV = $('#overlay'); OV.classList.remove('show'); OV.onclick = null; OV.innerHTML = ''; keepAwake(false); stopPlayer(); }

/* ---------- Markdown ---------- */
function inline(s) {
  s = esc(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(>])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => '<a href="' + u + '"' + (/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>');
  return s;
}
function mdTable(rows) {
  const isSep = r => /^\|?[\s:\-|]+\|?$/.test(r);
  const cells = r => r.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  let head = null, start = 0;
  if (rows.length > 1 && isSep(rows[1])) { head = cells(rows[0]); start = 2; }
  let h = '<div class="tablewrap"><table>';
  if (head) h += '<thead><tr>' + head.map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead>';
  h += '<tbody>';
  for (let r = start; r < rows.length; r++) { if (isSep(rows[r])) continue; h += '<tr>' + cells(rows[r]).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>'; }
  return h + '</tbody></table></div>';
}
function md(src, key) {
  key = key || 'x';
  if (src && String(src).indexOf('{{') >= 0) src = famFilter(src);
  const LN = String(src || '').replace(/\r/g, '').split('\n');
  let i = 0, out = '', para = [];
  const flush = () => { if (para.length) { out += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
  const isList = l => /^\s*([-*+]|\d+[.)])\s+/.test(l);
  const indentOf = l => l.match(/^\s*/)[0].length;
  function parseList(base) {
    const m0 = LN[i].match(/^\s*([-*+]|\d+[.)])\s+/); const ordered = /\d/.test(m0[1]);
    let h = ordered ? '<ol>' : '<ul>';
    while (i < LN.length) {
      const l = LN[i];
      if (!l.trim()) { let j = i + 1; while (j < LN.length && !LN[j].trim()) j++; if (j < LN.length && isList(LN[j]) && indentOf(LN[j]) >= base) { i = j; continue; } break; }
      const ind = indentOf(l);
      if (ind < base) break;
      if (!isList(l)) { if (ind > base) { h = h.replace(/<\/li>$/, () => ' ' + inline(l.trim()) + '</li>'); i++; continue; } break; }
      if (ind > base) { const nested = parseList(ind); h = h.replace(/<\/li>$/, () => nested + '</li>'); continue; }
      const text = l.replace(/^\s*([-*+]|\d+[.)])\s+/, ''); i++;
      const tm = text.match(/^\[([ xX])\]\s+(.*)/);
      if (tm) { const k0 = key + ':' + hash(tm[2]), k = TASK_ALIAS[k0] || TASK_ALIAS[key + ':' + hash(tm[2].trim())] || k0; h += '<li class="task"><label><input type="checkbox" data-key="' + k + '"' + (CHECKS[k] ? ' checked' : '') + '><span>' + inline(tm[2]) + '</span></label></li>'; }
      else h += '<li>' + inline(text) + '</li>';
    }
    return h + (ordered ? '</ol>' : '</ul>');
  }
  while (i < LN.length) {
    const l = LN[i]; let m;
    if (!l.trim()) { flush(); i++; continue; }
    if ((m = l.match(/^!\[([^\]]*)\]\(fig:([\w-]+)\)\s*$/))) { flush(); out += figure(m[2], m[1]); i++; continue; }
    if ((m = l.match(/^(#{1,4})\s+(.*)/))) { flush(); const lv = Math.min(m[1].length + 1, 5); out += '<h' + lv + '>' + inline(m[2]) + '</h' + lv + '>'; i++; continue; }
    if (/^---+\s*$/.test(l)) { flush(); out += '<hr>'; i++; continue; }
    if (/^\|/.test(l.trim())) { flush(); const rows = []; while (i < LN.length && /^\|/.test(LN[i].trim())) { rows.push(LN[i].trim()); i++; } out += mdTable(rows); continue; }
    if ((m = l.match(/^>([!i+?x])?(?:\s(.*))?$/))) { flush(); const type = { '!': 'warn', 'i': 'info', '+': 'ok', '?': 'note', 'x': 'danger' }[m[1]] || 'note'; const buf = [m[2] || '']; i++;
      while (i < LN.length && /^>/.test(LN[i])) { buf.push(LN[i].replace(/^>([!i+?x])?(?:\s|$)/, '')); i++; }
      out += '<div class="callout ' + type + '">' + md(buf.join('\n'), key) + '</div>'; continue; }
    if (isList(l)) { flush(); out += parseList(indentOf(l)); continue; }
    para.push(l.trim()); i++;
  }
  flush(); return out;
}
function mdText(src) { return String(src || '').replace(/[#*`>|\[\]]/g, ' ').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim(); }
function figure(id, capt) {
  let svg = (typeof FIGS !== 'undefined' && FIGS[id]) || '';
  if (!svg) return '<p class="muted small">' + L('[figura em falta: ', '[missing figure: ') + esc(id) + ']</p>';
  if (svg.indexOf('{{') >= 0) { const re = famFaltas(); if (re) svg = svg.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, x => re.test(x) ? '' : x); }
  return '<figure class="fig">' + svg.replace('<svg ', '<svg role="img" aria-label="' + esc(capt || id) + '" ') + (capt ? '<figcaption>' + inline(capt) + '</figcaption>' : '') + '</figure>';
}
function rawTaskKeys(pageKey, src) { const keys = []; const re = /^\s*[-*+]\s+\[[ xX]\]\s+(.*)$/gm; let m; while ((m = re.exec(src))) keys.push(pageKey + ':' + hash(m[1].trim())); return keys; }
function taskKeys(pageKey, src) { return rawTaskKeys(pageKey, famFilter(src)).map(k => TASK_ALIAS[k] || k); }

/* ---------- modelo de conteúdo ---------- */
const VSECTIONS = [
  { id: 'ferramentas', icon: '🧰', title: L('Ferramentas', 'Tools'), desc: L('Modo emergência, alertas no telemóvel, perto de mim, notícias, mapas, mensagens sem internet, modo apagão, lanterna, SOS, metrónomo de RCP, doses para crianças, bússola, GPS e calculadoras.', "Emergency mode, phone alerts, near me, news, maps, messages without internet, blackout mode, torch, SOS, CPR metronome, children's doses, compass, GPS and calculators.") },
  { id: 'meus', icon: '📋', title: L('Os meus dados', 'My data'), desc: L('Nível de preparação, preparar o iPhone, perfil da família, ficha médica, cartões das crianças, plano familiar, contactos, inventário com validades, notas, cofre encriptado e cópia de segurança.', "Preparedness level, iPhone setup, family profile, medical card, children's ID cards, family plan, contacts, inventory with expiry dates, notes, encrypted vault and backup.") }
];
const TOOLS = [];
function allSections() { return CONTENT.sections.concat(VSECTIONS.map(v => Object.assign({}, v, { pages: TOOLS.filter(t => t.section === v.id).map(t => ({ id: t.id, title: t.title, icon: t.icon, desc: t.desc, tool: true })) }))); }
function findSection(id) { return allSections().find(s => s.id === id); }
function findTool(id) { return TOOLS.find(t => t.id === id); }

/* ---------- navegação ---------- */
let cleanupFn = null;
function cleanup() { if (cleanupFn) { try { cleanupFn(); } catch (e) { } cleanupFn = null; } stopSpeech(); overlayHide(); keepAwake(false); document.body.classList.remove('print-only-tool'); }
function navLink(href, ic, t) { return '<a class="nav" href="' + href + '" data-href="' + href + '"><span class="ic">' + ic + '</span><span>' + esc(t) + '</span></a>'; }
function buildSidebar() {
  let h = navLink('#/t/guia', '🚨', L('Modo emergência', 'Emergency mode')) + navLink('#/t/perto', '📍', L('Perto de mim', 'Near me')) + navLink('#/t/noticias', '📰', L('Notícias e alertas', 'News and alerts')) + navLink('#/t/mapa', '🗺️', L('Mapas', 'Maps')) + '<div class="navsep">' + L('Guias', 'Guides') + '</div>';
  for (const s of CONTENT.sections) h += navLink('#/s/' + s.id, s.icon, s.title);
  h += '<div class="navsep">' + L('Ferramentas', 'Tools') + '</div>';
  for (const v of VSECTIONS) h += navLink('#/s/' + v.id, v.icon, v.title);
  h += '<div class="navsep">App</div>' + navLink('#/settings', '⚙️', L('Definições', 'Settings')) + navLink('#/about', 'ℹ️', L('Sobre e avisos', 'About and disclaimers')) + '<a class="nav" href="#" data-href="lang" data-lang="' + (EN ? 'pt' : 'en') + '" lang="' + (EN ? 'pt-PT' : 'en') + '"><span class="ic">🌐</span><span>' + (EN ? 'Português' : 'English') + '</span></a>';
  h += '<p class="small muted" style="padding:.6em .7em">' + L('Versão ', 'Version ') + VERSION + '<br>' + L('Funciona sem internet.', 'Works without internet.') + '</p>';
  $('#sidebar').innerHTML = h;
}
function setActive() {
  const h = location.hash || '#/'; $$('#sidebar a.nav').forEach(a => { const d = a.dataset.href; a.classList.toggle('active', d === h || (d !== '#/' && h.startsWith(d + '/')) || (d.startsWith('#/s/') && h.startsWith(d))); });
}
function route() {
  cleanup(); document.body.classList.remove('nav-open'); window.scrollTo(0, 0);
  const h = location.hash.replace(/^#\/?/, ''); const parts = h.split('/').map(p => { try { return decodeURIComponent(p); } catch (e) { return p; } });
  setActive();
  if (!h) return renderHome();
  if (parts[0] === 's') { const sec = findSection(parts[1]); if (!sec) return notFound(); if (parts[2]) { const pg = sec.pages.find(p => p.id === parts[2]); if (!pg) return notFound(); if (pg.tool) return renderTool(pg.id); if (!visiblePages(sec).includes(pg)) return naoSeAplica(sec); return renderPage(sec, pg); } return renderSection(sec); }
  if (parts[0] === 't') return renderTool(parts[1]);
  if (parts[0] === 'search') return renderSearch(parts.slice(1).join('/'));
  if (parts[0] === 'boas-vindas') return renderBoasVindas();
  if (parts[0] === 'settings') return renderSettings();
  if (parts[0] === 'about') return renderAbout();
  notFound();
}
function setMain(html) { $('#main').innerHTML = (STORAGE_OK ? '' : '<div class="callout danger noprint">' + L('<strong>Este browser não está a guardar dados.</strong> O perfil da família, as listas, o plano e o cofre perdem-se ao fechar a página. Costuma acontecer em modo privado e em algumas pré-visualizações de ficheiros. Abre a app no Chrome ou no Safari, ou instala-a no ecrã principal.', '<strong>This browser is not saving data.</strong> The family profile, lists, plan and vault are lost when the page is closed. This usually happens in private browsing and in some file previews. Open the app in Chrome or Safari, or install it on the home screen.') + '</div>') + html; }
function naoSeAplica(sec) { setMain('<article><div class="crumbs"><a href="#/">' + L('Início', 'Home') + '</a> › <a href="#/s/' + sec.id + '">' + esc(fill(sec.title)) + '</a></div><h1>' + L('Esta página não se aplica à vossa família', 'This page does not apply to your family') + '</h1><p>' + L('Fala de uma criança ou de um adulto que não está no perfil da família.', 'It is about a child or an adult who is not in the family profile.') + '</p><div class="btnrow"><a class="btn primary" href="#/s/' + sec.id + '">' + L('Ver a secção', 'Open the section') + '</a><a class="btn" href="#/t/familia">' + L('Perfil da família', 'Family profile') + '</a></div></article>'); }
function notFound() { setMain('<article><h1>' + L('Página não encontrada', 'Page not found') + '</h1><p><a href="#/">' + L('Voltar ao início', 'Back to home') + '</a></p></article>'); }
function tile(href, ic, t, d, small) { return '<a class="tile' + (small ? ' small' : '') + '" href="' + href + '"><span class="ic">' + ic + '</span><span><span class="t">' + esc(t) + '</span>' + (d ? '<br><span class="d">' + esc(d) + '</span>' : '') + '</span></a>'; }

/* ---------- início ---------- */
function renderHome() {
  if (boasVindasPendente()) return renderBoasVindas();
  const kitSec = CONTENT.sections.find(s => s.id === 'kit'); let kitDone = 0, kitTotal = 0;
  if (kitSec) { const pg = kitSec.pages.find(p => p.id === 'kit-72h'); if (pg) { const ks = taskKeys('kit/kit-72h', pg.md); kitTotal = ks.length; kitDone = ks.filter(k => CHECKS[k]).length; } }
  const inv = LS.get('inventory', []); const now = Date.now(); let expired = 0, soon = 0;
  inv.forEach(it => { if (!it.expiry) return; const d = (new Date(it.expiry) - now) / 864e5; if (d < 0) expired++; else if (d <= 30) soon++; });
  const plan = LS.get('plan', {}); const planFilled = Object.values(plan).filter(v => v && String(v).trim()).length;
  const lastBackup = LS.get('lastBackup', 0);
  const fam = getFamily(); const T = famTokens(fam); const famAge = fam.updated ? (Date.now() - fam.updated) / 864e5 : null;
  let h = '<article><h1>Safety &amp; Security</h1><p class="muted">' + L('Guia de emergência e sobrevivência. Funciona sem internet, sem instalação e sem conta. Procura em cima, ou escolhe uma secção.', 'Emergency and survival guide. Works without internet, installation or an account. Search above, or choose a section.') + '</p>' + (fam.updated ? '' : '<div class="callout warn noprint">' + L('Os guias estão a usar um exemplo (2 adultos e crianças de 2 e 7 anos).', 'The guides are using an example (2 adults and children aged 2 and 7).') + ' <a href="#/boas-vindas">' + L('Dizer quem é a família', 'Tell the app who your family is') + '</a></div>') + apagaoAviso() + '<a class="btn huge danger noprint home-sos" href="#/t/guia">🚨 ' + L('Modo emergência: o que fazer agora', 'Emergency mode: what to do now') + '</a>';
  h += '<div class="quickgrid noprint">' +
    '<a class="btn primary" href="tel:112"><span class="ic">📞</span>' + L('Ligar 112', 'Call 112') + '</a>' +
    '<a class="btn" href="#/t/sos"><span class="ic">🆘</span>' + L('SOS luminoso', 'SOS light') + '</a>' +
    '<a class="btn" href="#/t/lanterna"><span class="ic">🔦</span>' + L('Lanterna', 'Torch') + '</a>' +
    '<a class="btn" href="#/t/mensagens"><span class="ic">💬</span>' + L('SMS à família', 'SMS to family') + '</a>' +
    '<a class="btn" href="#/t/rcp"><span class="ic">❤️</span>' + L('Metrónomo RCP', 'CPR metronome') + '</a>' +
    '<a class="btn" href="#/s/agora"><span class="ic">🚨</span>' + L('Emergência agora', 'Emergency now') + '</a>' +
    '<a class="btn" href="#/s/socorros"><span class="ic">🩹</span>' + L('Primeiros socorros', 'First aid') + '</a>' +
    '<a class="btn" href="#/t/doses"><span class="ic">💊</span>' + L('Doses crianças', 'Children’s doses') + '</a>' +
    '<a class="btn" href="#/s/familia"><span class="ic">👨‍👩‍👧‍👦</span>' + L('A nossa família', 'Our family') + '</a>' +
    '<a class="btn" href="#/t/noticias"><span class="ic">📰</span>' + L('Notícias e alertas', 'News and alerts') + '</a>' +
    '<a class="btn" href="#/t/mapa"><span class="ic">🗺️</span>' + L('Mapas', 'Maps') + '</a></div>';
  h += '<div class="grid">' + situacaoHTML() + prepHTML();
  h += '<a class="tile" href="#/t/familia"><span class="t">' + L('Família', 'Family') + '</span><span class="d">' + esc(T.fam_nomes) + '<br>' + L('Água para 3 dias', 'Water for 3 days') + ': <strong>' + esc(T.water_3d) + ' L</strong>' + (+T.diapers_day ? L(' · fraldas: ', ' · nappies: ') + esc(T.diapers_3d) : '') + '</span>' + (famAge == null ? '<span class="badge warn">' + L('Confirma idades e pesos', 'Check ages and weights') + '</span>' : famAge > 180 ? '<span class="badge warn">' + L('Perfil com mais de 6 meses: pesa as crianças', 'Profile over 6 months old: weigh the children') + '</span>' : '') + '</a>';
  h += '<a class="tile" href="#/s/kit/kit-72h"><span class="t">' + L('Kit de 72 horas', '72-hour kit') + '</span><div class="progress"><div style="width:' + (kitTotal ? Math.round(kitDone / kitTotal * 100) : 0) + '%"></div></div><span class="d">' + L(kitDone + ' de ' + kitTotal + ' itens prontos', kitDone + ' of ' + kitTotal + ' items ready') + '</span></a>';
  h += '<a class="tile" href="#/t/inventario"><span class="t">' + L('Inventário', 'Inventory') + '</span><span class="d">' + inv.length + L(' itens · ', ' items · ') + (expired ? '<span class="badge danger">' + expired + L(' fora de validade', ' past expiry date') + '</span> ' : '') + (soon ? '<span class="badge warn">' + soon + L(' a expirar em 30 dias', ' expiring within 30 days') + '</span>' : (!expired ? L('sem alertas', 'no alerts') : '')) + '</span></a>';
  h += '<a class="tile" href="#/t/plano"><span class="t">' + L('Plano familiar', 'Family plan') + '</span><span class="d">' + (planFilled ? L(planFilled + ' campos preenchidos', planFilled + ' fields filled in') : L('Ainda por preencher', 'Not filled in yet')) + '</span></a>';
  h += '<a class="tile" href="#/t/backup"><span class="t">' + L('Cópia de segurança', 'Backup') + '</span><span class="d">' + (lastBackup ? L('Última: ', 'Last: ') + fmtDate(lastBackup) : L('Nunca exportada', 'Never exported')) + '</span></a>';
  h += '</div><h2>' + L('Guias', 'Guides') + '</h2><div class="grid">';
  for (const s of CONTENT.sections) h += tile('#/s/' + s.id, s.icon, fill(s.title, T), fill(s.desc, T));
  h += '</div><h2>' + L('Ferramentas e dados', 'Tools and data') + '</h2><div class="grid">';
  for (const v of VSECTIONS) h += tile('#/s/' + v.id, v.icon, v.title, v.desc);
  h += '</div><p class="small muted">' + L('Este guia não substitui os serviços de emergência nem aconselhamento médico. Em perigo de vida liga 112. <a href="#/about">Ler avisos</a>.', 'This guide does not replace the emergency services or medical advice. If a life is in danger, call 112. <a href="#/about">Read the disclaimers</a>.') + '</p></article>';
  setMain(h);
  situacaoLigar();
}
function famHeader(T) {
  const fam = getFamily(), ks = kidsSorted(fam), unnamed = ks.filter(k => !String(k.name || '').trim()).length, est = ks.filter(k => !(+k.kg > 0)).length;
  let h = '<div class="card"><div class="stat"><div><strong>' + esc(T.fam_nomes) + '</strong><div class="small muted">' + ks.map(k => esc((String(k.name || '').trim() || L('Criança', 'Child')) + ': ' + kidAge(k) + ', ' + nf(childKg(k)) + ' kg' + (+k.kg > 0 ? '' : L(' (estimado)', ' (estimated)')))).join(' · ') + '</div></div><a class="btn fixed" href="#/t/familia">✏️ ' + L('Editar perfil', 'Edit profile') + '</a></div>';
  if (!fam.updated) h += '<div class="callout warn">' + L('Estes guias estão a usar os <strong>valores de exemplo</strong>: 2 adultos e crianças de 2 e 7 anos, sem nomes nem pesos. Preenche o perfil e carrega em «Confirmar perfil»: os títulos, os textos, as quantidades e as doses passam a usar os vossos dados.', 'These guides are using the <strong>example values</strong>: 2 adults and children aged 2 and 7, with no names or weights. Fill in the profile and tap “Confirm profile”: the titles, texts, quantities and doses will then use your own details.') + '</div>';
  else { if (unnamed) h += '<p class="small">' + L((unnamed === ks.length ? 'As crianças não têm nome no perfil' : 'Há crianças sem nome no perfil') + ', por isso os guias dizem «a mais nova» e «a mais velha». Com o nome e menina ou menino, passam a usar o nome.', (unnamed === ks.length ? 'The children have no names in the profile' : 'Some children have no name in the profile') + ', so the guides say “the youngest” and “the oldest”. Add their names and the guides will use them.') + '</p>'; if (est) h += '<p class="small">' + L('Pesos estimados pela idade: pesa as crianças para as doses ficarem certas.', 'Weights estimated from age: weigh the children so the doses are right.') + '</p>'; }
  return h + '</div>';
}
function renderSection(sec) {
  const T = famTokens();
  let h = '<article><div class="crumbs"><a href="#/">' + L('Início', 'Home') + '</a> › ' + esc(sec.title) + '</div><h1>' + sec.icon + ' ' + esc(fill(sec.title, T)) + '</h1><p class="muted">' + esc(fill(sec.desc || '', T)) + '</p>' + (sec.id === 'familia' ? famHeader(T) : '') + '<div class="grid">';
  for (const p of visiblePages(sec)) h += tile('#/s/' + sec.id + '/' + p.id, p.icon || '📄', fill(p.title, T), fill(famSemFaltas(p.desc || ''), T), true);
  h += '</div></article>'; setMain(h);
}
function renderPage(sec, pg) {
  const T = famTokens(); const vp = visiblePages(sec); const idx = vp.indexOf(pg); const prev = idx > 0 ? vp[idx - 1] : null, next = idx >= 0 ? vp[idx + 1] : null;
  let h = '<article><div class="crumbs"><a href="#/">' + L('Início', 'Home') + '</a> › <a href="#/s/' + sec.id + '">' + esc(sec.title) + '</a></div><h1>' + (pg.icon ? pg.icon + ' ' : '') + esc(fill(pg.title, T)) + '</h1>';
  h += '<div class="pagetools"><button class="btn sm" id="speakbtn">🔊 ' + L('Ler em voz alta', 'Read aloud') + '</button><button class="btn sm" onclick="window.print()">🖨️ ' + L('Imprimir', 'Print') + '</button>' + (pg.tools ? pg.tools.map(t => '<a class="btn sm" href="#/t/' + t + '">🧰 ' + esc((findTool(t) || {}).title || t) + '</a>').join('') : '') + '</div>';
  h += '<div class="content">' + fillHTML(md(pg.md, sec.id + '/' + pg.id), T) + '</div>';
  h += '<div class="pagenav">' + (prev ? '<a class="btn" href="#/s/' + sec.id + '/' + prev.id + '">← ' + esc(fill(prev.title, T)) + '</a>' : '<span></span>') + (next ? '<a class="btn" href="#/s/' + sec.id + '/' + next.id + '">' + esc(fill(next.title, T)) + ' →</a>' : '<span></span>') + '</div></article>';
  setMain(h);
  $('#speakbtn').onclick = () => toggleSpeech($('#main .content'));
}
function renderTool(id) {
  const t = findTool(id); if (!t) return notFound();
  const sec = VSECTIONS.find(v => v.id === t.section);
  setMain('<article><div class="crumbs"><a href="#/">' + L('Início', 'Home') + '</a> › <a href="#/s/' + sec.id + '">' + esc(sec.title) + '</a></div><h1>' + t.icon + ' ' + esc(t.title) + '</h1><p class="muted">' + esc(t.desc) + '</p><div id="tool"></div></article>');
  const r = t.render($('#tool')); if (typeof r === 'function') cleanupFn = r;
}

/* ---------- pesquisa ---------- */
function renderSearch(q) {
  q = (q || '').trim(); $('#searchbox').value = q;
  let h = '<article><h1>' + L('Pesquisa', 'Search') + '</h1>';
  if (q.length < 2) { setMain(h + '<p class="muted">' + L('Escreve pelo menos 2 letras.', 'Type at least 2 letters.') + '</p></article>'); return; }
  const nq = norm(q); const words = nq.split(/\s+/).filter(Boolean); const res = []; const T = famTokens();
  for (const sec of allSections()) for (const pg0 of visiblePages(sec)) {
    const pg = Object.assign({}, pg0, { title: fill(pg0.title, T), desc: fill(famSemFaltas(pg0.desc || ''), T), md: pg0.md ? fill(famFilter(pg0.md), T) : pg0.md });
    const title = norm(pg.title); const body = norm(pg.tool ? (pg.desc || '') : mdText(pg.md)); let score = 0;
    for (const w of words) { if (title.includes(w)) score += 10; const c = body.split(w).length - 1; score += Math.min(c, 5); }
    if (words.every(w => title.includes(w) || body.includes(w))) score += 5;
    if (score > 0) { const raw = pg.tool ? (pg.desc || '') : mdText(pg.md); const pos = norm(raw).indexOf(words[0]); const snip = pos >= 0 ? raw.slice(Math.max(0, pos - 70), pos + 110) : raw.slice(0, 160);
      res.push({ score, sec, pg, snip }); }
  }
  res.sort((a, b) => b.score - a.score);
  h += '<p class="muted">' + L(res.length + ' resultado(s) para «' + esc(q) + '»', res.length + ' result(s) for “' + esc(q) + '”') + '</p>';
  const hl = s => { let e = esc(s); for (const w of words) { const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'); e = e.replace(re, '<mark>$1</mark>'); } return e; };
  for (const r of res.slice(0, 60)) h += '<a class="result" href="#/s/' + r.sec.id + '/' + r.pg.id + '"><div class="path">' + r.sec.icon + ' ' + esc(r.sec.title) + '</div><div><strong>' + hl(r.pg.title) + '</strong></div><div class="small muted">…' + hl(r.snip) + '…</div></a>';
  setMain(h + '</article>');
}

/* ---------- voz ---------- */
let speaking = false;
function stopSpeech() { if (window.speechSynthesis) { speechSynthesis.cancel(); } speaking = false; const b = $('#speakbtn'); if (b) b.textContent = '🔊 ' + L('Ler em voz alta', 'Read aloud'); }
function toggleSpeech(el) {
  if (!window.speechSynthesis) return toast(L('Leitura em voz alta não disponível neste dispositivo', 'Reading aloud is not available on this device'));
  if (speaking) return stopSpeech();
  const text = el.innerText.replace(/\s+/g, ' ').trim(); const chunks = text.match(/[^.!?\n]+[.!?]?/g) || [text];
  const v = speechVoice();
  speaking = true; $('#speakbtn').textContent = '⏹ ' + L('Parar leitura', 'Stop reading');
  let i = 0; const next = () => { if (!speaking || i >= chunks.length) { stopSpeech(); return; } const u = new SpeechSynthesisUtterance(chunks[i++]); u.lang = LOCALE; if (v) u.voice = v; u.rate = 0.95; u.onend = next; u.onerror = next; speechSynthesis.speak(u); };
  next();
}

/* ---------- definições / sobre ---------- */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
function renderSettings() {
  const opt = (name, val, label) => '<label class="btn' + (SETTINGS[name] === val ? ' primary' : '') + '"><input type="radio" name="' + name + '" value="' + val + '" style="display:none"' + (SETTINGS[name] === val ? ' checked' : '') + '>' + label + '</label>';
  let h = '<article><h1>⚙️ ' + L('Definições', 'Settings') + '</h1>';
  h += '<div class="card"><h3>🌐 Idioma · Language</h3><div class="btnrow"><button class="btn' + (EN ? '' : ' primary') + '" data-lang="pt" lang="pt-PT">🇵🇹 Português</button><button class="btn' + (EN ? ' primary' : '') + '" data-lang="en" lang="en">🇬🇧 English</button></div><p class="small muted">' + L('A app recarrega na língua escolhida. Os dados guardados ficam iguais.', 'The app reloads in the chosen language. Your saved data stays the same.') + '</p></div>';
  h += '<div class="card"><h3>' + L('Aspeto', 'Appearance') + '</h3><p class="small muted">' + L('O modo vermelho preserva a visão noturna e gasta menos bateria em ecrãs OLED.', 'Night red mode preserves night vision and uses less battery on OLED screens.') + '</p><div class="btnrow" id="themeopts">' + opt('theme', 'dark', '🌙 ' + L('Escuro', 'Dark')) + opt('theme', 'light', '☀️ ' + L('Claro', 'Light')) + opt('theme', 'red', '🔴 ' + L('Vermelho noturno', 'Night red')) + '</div>';
  h += '<p class="small muted">' + L('Tamanho do texto', 'Text size') + '</p><div class="btnrow" id="fontopts">' + opt('font', 'normal', 'Normal') + opt('font', 'large', L('Grande', 'Large')) + opt('font', 'xl', L('Muito grande', 'Extra large')) + '</div></div>';
  h += '<div class="card"><h3>' + L('Ecrã', 'Screen') + '</h3><label class="field row"><input type="checkbox" id="awake" class="fixed" style="width:1.4em;height:1.4em"' + (SETTINGS.awake ? ' checked' : '') + '><span style="flex:1">' + L('Manter o ecrã ligado enquanto a app está aberta', 'Keep the screen on while the app is open') + ('wakeLock' in navigator ? '' : L(' (não suportado neste browser)', ' (not supported in this browser)')) + '</span></label></div>';
  h += '<div class="card"><h3>' + L('Instalar no dispositivo', 'Install on this device') + '</h3><p class="small">' + L('Instalada, a app abre como qualquer outra e continua a funcionar sem rede.', 'Once installed, the app opens like any other and keeps working without a network.') + '</p><div class="btnrow">' + (deferredPrompt ? '<button class="btn primary" id="installbtn">📲 ' + L('Instalar app', 'Install app') + '</button>' : '') + '<button class="btn" id="updatebtn">🔄 ' + L('Procurar atualização', 'Check for updates') + '</button></div><p class="small muted" id="installinfo">' + (location.protocol === 'file:' ? L('Estás a abrir o ficheiro diretamente (file://). Assim funciona em qualquer PC ou pen USB. Para instalar no telemóvel como app, serve a pasta por HTTPS ou por um servidor local — ver README.', 'You are opening the file directly (file://). This way it works on any computer or USB stick. To install it on a phone as an app, serve the folder over HTTPS or from a local server (see the README).') : (deferredPrompt ? '' : L('Se já está instalada, ou o browser não mostra o botão, usa o menu do browser: «Adicionar ao ecrã principal» / «Instalar».', 'If it is already installed, or the browser does not show the button, use the browser menu: “Add to Home Screen” / “Install”.'))) + '</p></div>';
  h += '<div class="card"><h3>' + L('Dados', 'Data') + '</h3><p class="small">' + L('Tudo fica guardado apenas neste dispositivo e neste browser. <a href="#/t/backup">Faz cópias de segurança</a> regularmente.', 'Everything is stored only on this device and in this browser. <a href="#/t/backup">Make backups</a> regularly.') + '</p><p class="small muted" id="storageinfo"></p><div class="btnrow"><a class="btn" href="#/t/backup">💾 ' + L('Cópia de segurança', 'Backup') + '</a><button class="btn danger" id="wipebtn">🗑️ ' + L('Apagar todos os dados', 'Delete all data') + '</button></div></div>';
  h += '<p class="small muted">' + L('Versão ', 'Version ') + VERSION + '</p></article>';
  setMain(h);
  $$('#themeopts input').forEach(r => r.onchange = () => { SETTINGS.theme = r.value; saveSettings(); renderSettings(); });
  $$('#fontopts input').forEach(r => r.onchange = () => { SETTINGS.font = r.value; saveSettings(); renderSettings(); });
  $('#awake').onchange = e => { SETTINGS.awake = e.target.checked; saveSettings(); };
  if ($('#installbtn')) $('#installbtn').onclick = async () => { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; if (r.outcome === 'accepted') toast(L('App instalada', 'App installed')); deferredPrompt = null; renderSettings(); };
  $('#updatebtn').onclick = async () => { if (!('serviceWorker' in navigator) || location.protocol === 'file:') return toast(L('Copia o novo index.html por cima do antigo para atualizar.', 'Copy the new index.html over the old one to update.')); const reg = await navigator.serviceWorker.getRegistration(); if (!reg) return toast(L('Sem service worker registado', 'No service worker registered')); await reg.update(); toast(L('Verificação feita. Se houver versão nova, recarrega a página.', 'Check done. If there is a new version, reload the page.')); };
  $('#wipebtn').onclick = async () => { if (!confirm(L('Apagar TODOS os dados desta app neste dispositivo (checklists, plano, inventário, notas, cofre)? Esta ação não tem volta.', 'Delete ALL of this app’s data on this device (checklists, plan, inventory, notes, vault)? This cannot be undone.'))) return; if (!confirm(L('Tens a certeza? Última confirmação.', 'Are you sure? Last confirmation.'))) return; LS.keys().forEach(k => LS.del(k)); try { await idbClear(); } catch (e) { } try { const db = await idb(); await new Promise(r => { const t = db.transaction('mapas', 'readwrite'); t.objectStore('mapas').clear(); t.oncomplete = r; t.onerror = r; }); } catch (e) { } toast(L('Dados apagados', 'Data deleted')); setTimeout(() => location.reload(), 600); };
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then(e => { const el = $('#storageinfo'); if (el) el.textContent = L('Espaço usado: ' + (e.usage / 1048576).toFixed(1) + ' MB de ' + (e.quota / 1048576).toFixed(0) + ' MB disponíveis.', 'Space used: ' + (e.usage / 1048576).toFixed(1) + ' MB of ' + (e.quota / 1048576).toFixed(0) + ' MB available.'); });
}
function renderAbout() { setMain('<article><h1>ℹ️ ' + L('Sobre e avisos', 'About and disclaimers') + '</h1>' + md(CONTENT.about, 'about') + '<p class="small muted">' + L('Versão ', 'Version ') + VERSION + '</p></article>'); }

/* ---------- IndexedDB (cofre) ---------- */
// A app chamava-se Preparado: os nomes internos (IndexedDB «preparado», localStorage «prep.», verificação do cofre, caches) ficam assim para não se perderem dados.
function idb() { return new Promise((res, rej) => { const r = indexedDB.open('preparado', 2); r.onupgradeneeded = () => { const db = r.result; if (!db.objectStoreNames.contains('vault')) db.createObjectStore('vault', { keyPath: 'id' }); if (!db.objectStoreNames.contains('mapas')) db.createObjectStore('mapas', { keyPath: 'id' }); }; r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
async function idbAll() { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('vault', 'readonly').objectStore('vault').getAll(); t.onsuccess = () => res(t.result || []); t.onerror = () => rej(t.error); }); }
async function idbPut(item) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('vault', 'readwrite'); t.objectStore('vault').put(item); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
async function idbPutAll(items) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('vault', 'readwrite'), s = t.objectStore('vault'); items.forEach(it => s.put(it)); t.oncomplete = res; t.onerror = t.onabort = () => rej(t.error); }); }
async function idbDel(id) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('vault', 'readwrite'); t.objectStore('vault').delete(id); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
async function idbClear() { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction('vault', 'readwrite'); t.objectStore('vault').clear(); t.oncomplete = res; t.onerror = () => rej(t.error); }); }

/* ---------- criptografia ---------- */
function b64enc(buf) { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); }
function b64dec(s) { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }
const cryptoOK = !!(window.crypto && crypto.subtle);
async function deriveKey(pw, saltBuf) { const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']); return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: saltBuf, iterations: 250000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); }
async function encBuf(key, buf) { const iv = crypto.getRandomValues(new Uint8Array(12)); const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, buf); return { iv: b64enc(iv), data: b64enc(ct) }; }
async function decBuf(key, iv, data) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(b64dec(iv)) }, key, b64dec(data)); }
let vaultKey = null, vaultTimer = null;
function vaultTouch() { clearTimeout(vaultTimer); vaultTimer = setTimeout(() => { vaultKey = null; if (location.hash === '#/t/cofre') { toast(L('Cofre bloqueado por inatividade', 'Vault locked after inactivity')); route(); } }, 5 * 60 * 1000); }

/* Abre o cofre com a palavra-passe. Se uma mudança de palavra-passe ficou a meio (registo vaultNovo), confirma com um documento
   qual das chaves está certa: com a antiga, apaga o registo; com a nova, passa-a a chave do cofre. */
async function vaultAbrir(pw, meta) {
  const chave = async m => { const k = await deriveKey(pw, new Uint8Array(b64dec(m.salt))); if (new TextDecoder().decode(await decBuf(k, m.check.iv, m.check.data)) !== 'preparado-ok') throw 0; return k; };
  const abreDocumento = async k => { const its = await idbAll(); if (its.length) await decBuf(k, its[0].iv, its[0].data); };
  const novo = LS.get('vaultNovo', null);
  try { const k = await chave(meta); if (novo) { await abreDocumento(k); LS.del('vaultNovo'); } return k; }
  catch (e) {
    if (!novo) throw e;
    const k = await chave(novo); await abreDocumento(k);
    LS.set('vault', novo); LS.del('vaultNovo'); Object.assign(meta, novo); return k;
  }
}

/* ---------- cópia de segurança ---------- */
async function exportAll() {
  const data = { app: 'safety', version: VERSION, ts: Date.now(), ls: {}, vault: [] };
  for (const k of LS.keys()) data.ls[k] = LS.get(k);
  try { data.vault = await idbAll(); } catch (e) { }
  const name = 'safety-security-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  LS.set('lastBackup', Date.now());
  return { blob, name };
}
async function importAll(file) {
  const d = JSON.parse(await file.text());
  if (d.app !== 'safety' && d.app !== 'preparado') throw new Error(L('Ficheiro inválido', 'Invalid file'));
  const n = Object.keys(d.ls || {}).length + (d.vault || []).length;
  if (!confirm(L('Importar cópia de ' + fmtDate(d.ts) + ' (' + n + ' registos)? Os dados atuais com o mesmo nome serão substituídos.', 'Import the backup from ' + fmtDate(d.ts) + ' (' + n + ' records)? Current data with the same names will be replaced.'))) return false;
  for (const k in d.ls) LS.set(k, d.ls[k]);
  if (d.vault && d.vault.length) { await idbClear(); for (const it of d.vault) await idbPut(it); }
  CHECKS = LS.get('checks', {}); Object.assign(SETTINGS, LS.get('settings', {})); applySettings();
  return true;
}

/* ======================================================================
   FERRAMENTAS
   ====================================================================== */
function field(label, inner) { return '<label class="field"><span>' + label + '</span>' + inner + '</label>'; }
/* --- Notícias e alertas (precisa de internet) --- */
const NEWS_AREAS = { AVR: 'Aveiro', BJA: 'Beja', BRG: 'Braga', BGC: 'Bragança', CBO: 'Castelo Branco', CBR: 'Coimbra', EVR: 'Évora', FAR: 'Faro', GDA: 'Guarda', LRA: 'Leiria', LSB: 'Lisboa', PTG: 'Portalegre', PTO: 'Porto', STM: 'Santarém', STB: 'Setúbal', VCT: 'Viana do Castelo', VRL: 'Vila Real', VIS: 'Viseu', MCN: 'Madeira, costa norte', MCS: 'Madeira, costa sul', MRM: 'Madeira, zonas montanhosas', MPS: 'Porto Santo', AOC: 'Açores, grupo ocidental', ACE: 'Açores, grupo central', AOR: 'Açores, grupo oriental' };
const AREA_DICO = { AVR: '01', BJA: '02', BRG: '03', BGC: '04', CBO: '05', CBR: '06', EVR: '07', FAR: '08', GDA: '09', LRA: '10', LSB: '11', PTG: '12', PTO: '13', STM: '14', STB: '15', VCT: '16', VRL: '17', VIS: '18' };
const DISTRITOS = {}; Object.keys(AREA_DICO).forEach(k => { DISTRITOS[AREA_DICO[k]] = NEWS_AREAS[k]; });
const IPMA_LV = { yellow: [L('Amarelo', 'Yellow'), 'warn', 1], orange: [L('Laranja', 'Orange'), 'orange', 2], red: [L('Vermelho', 'Red'), 'danger', 3] };
const IPMA_TIPO_EN = { 'agitação marítima': 'Rough seas', 'nevoeiro': 'Fog', 'tempo quente': 'Hot weather', 'tempo frio': 'Cold weather', 'precipitação': 'Rain', 'neve': 'Snow', 'trovoada': 'Thunderstorms', 'vento': 'Wind' };
function ipmaTipo(t) { return L(t, IPMA_TIPO_EN[String(t).toLowerCase()] || t); }
const RCM_LV = EN ? ['', 'low', 'moderate', 'high', 'very high', 'maximum'] : ['', 'reduzido', 'moderado', 'elevado', 'muito elevado', 'máximo'];
const GDACS_T = { EQ: [L('Sismo', 'Earthquake'), '🌍'], TC: [L('Ciclone tropical', 'Tropical cyclone'), '🌀'], FL: [L('Cheia', 'Flood'), '🌊'], VO: [L('Vulcão', 'Volcano'), '🌋'], DR: [L('Seca', 'Drought'), '🏜️'], WF: [L('Incêndio florestal', 'Wildfire'), '🔥'] };
const WIKI_CAT = { 'armed conflicts and attacks': 'Conflitos armados e ataques', 'attacks and armed conflicts': 'Conflitos armados e ataques', 'disasters and accidents': 'Catástrofes e acidentes', 'international relations': 'Relações internacionais', 'politics and elections': 'Política e eleições', 'law and crime': 'Justiça e crime', 'health and environment': 'Saúde e ambiente', 'business and economy': 'Economia', 'science and technology': 'Ciência e tecnologia', 'arts and culture': '', 'sports': '' };
const WIKI_CAT_EN = { 'Conflitos armados e ataques': 'Armed conflicts and attacks', 'Catástrofes e acidentes': 'Disasters and accidents', 'Relações internacionais': 'International relations', 'Política e eleições': 'Politics and elections', 'Justiça e crime': 'Law and crime', 'Saúde e ambiente': 'Health and environment', 'Economia': 'Business and economy', 'Ciência e tecnologia': 'Science and technology' };
const NEWS_GROUPS = [['', L('Todas', 'All')], ['pt', 'Portugal'], ['mundo-pt', L('Mundo em português', 'World in Portuguese')], ['mundo-en', L('Internacional (inglês)', 'International (English)')], ['saude', L('Saúde pública', 'Public health')]];
const NEWS_LINKS = [[L('Proteção Civil (ANEPC)', 'Proteção Civil (ANEPC, Civil Protection)'), 'https://prociv.gov.pt/'], [L('IPMA: avisos e previsões', 'IPMA (weather institute): warnings and forecasts'), 'https://www.ipma.pt/'], [L('SNS 24', 'SNS 24 (national health helpline)'), 'https://www.sns24.gov.pt/'], [L('DGS', 'DGS (Directorate-General of Health)'), 'https://www.dgs.pt/'], [L('RTP Notícias', 'RTP Notícias (public broadcaster news)'), 'https://www.rtp.pt/noticias/'], [L('Antena 1 em direto', 'Antena 1 (public radio) live'), 'https://www.rtp.pt/play/direto/antena1'], [L('Lusa', 'Lusa (news agency)'), 'https://www.lusa.pt/'], [L('Portal Diplomático', 'Portal Diplomático (Foreign Ministry)'), 'https://portaldiplomatico.mne.gov.pt/']];
const NEWS_LIVE = [
  { nome: L('Euronews em português', 'Euronews in Portuguese'), lingua: 'pt', canal: 'UCUmEPYxmnyQDeRUcFkslmQw', site: 'https://pt.euronews.com/live' },
  { nome: 'RTP3', lingua: 'pt', site: 'https://www.rtp.pt/play/direto/rtp3' },
  { nome: 'CNN Portugal', lingua: 'pt', site: 'https://cnnportugal.iol.pt/direto' },
  { nome: 'DW News', lingua: 'en', canal: 'UCknLrEdhRCp1aegoMqRaCZg', site: 'https://www.dw.com/en/live-tv/channel-english' },
  { nome: 'France 24 English', lingua: 'en', canal: 'UCQfwfsi5VrQ8yKZ-UWmAEFg' },
  { nome: 'euronews', lingua: 'en', canal: 'UCSrZ3UV4jOidv8ppoVuvW9Q' },
  { nome: 'Al Jazeera English', lingua: 'en', canal: 'UCNye-wNBqNL5ZzHSJj3l8Bg' },
  { nome: 'Sky News', lingua: 'en', canal: 'UCoMdktPbSTixAyNGwb-UYkQ' }
];
const NEWS_MESES = EN ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const NEWS_SETUP_MD = (EN ? ['Portuguese news sites do not let an app read their headlines directly. The solution is a small program that runs free of charge on GitHub every 30 minutes: it gathers the headlines into a file, and the app reads that file.', '', '1. In the repository where you published the app, also upload the file **tools/noticias.mjs**.', '2. Click **Add file** and then **Create new file**. For the name, type **.github/workflows/noticias.yml**, paste the contents of that file and confirm.', '3. Open the **Actions** tab, enable the workflows if GitHub asks, choose **Notícias** (the news workflow) and click **Run workflow**.', '4. When the green tick appears, come back to this page and tap Refresh. The app finds the digest by itself.', '', '>! In a public repository, GitHub disables scheduled workflows after 60 days without activity. If the digest looks out of date, enable the workflow again in the Actions tab.'] : ['Os sites de notícias portugueses não deixam uma app ler as manchetes diretamente. A solução é um pequeno programa que corre de graça no GitHub a cada 30 minutos: junta as manchetes num ficheiro, e a app lê esse ficheiro.', '', '1. No repositório onde publicaste a app, carrega também o ficheiro **tools/noticias.mjs**.', '2. Carrega em **Add file** e depois em **Create new file**. No nome escreve **.github/workflows/noticias.yml**, cola o conteúdo desse ficheiro e confirma.', '3. Abre o separador **Actions**, autoriza os fluxos se o GitHub pedir, escolhe **Notícias** e carrega em **Run workflow**.', '4. Quando aparecer o visto verde, volta a esta página e carrega em Atualizar. A app encontra o resumo sozinha.', '', '>! Num repositório público, o GitHub desliga os fluxos agendados ao fim de 60 dias sem atividade. Se o resumo aparecer desatualizado, volta a ativar o fluxo no separador Actions.']).join('\n');
function nwFetch(url, ms) {
  ms = ms || 20000; const c = new AbortController(); const t = setTimeout(() => c.abort(), ms);
  return fetch(url, { signal: c.signal, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r; }, e => { throw new Error(e && e.name === 'AbortError' ? 'sem resposta em ' + Math.round(ms / 1000) + ' s' : 'sem ligação à fonte'); })
    .finally(() => clearTimeout(t));
}
const nwJSON = (u, ms) => nwFetch(u, ms).then(r => r.json());
const nwGet = (u, ms) => nwFetch(u, ms).then(r => r.text());
function nwErr(s) { s = String(s || ''); return L(s, { 'sem ligação à fonte': 'could not connect to the source', 'feed inválido': 'invalid feed', 'formato inesperado': 'unexpected format', 'não configurado': 'not set up', 'resumo não encontrado': 'digest not found', 'erro': 'error', 'sem dados': 'no data' }[s] || s.replace(/^sem resposta em (\d+) s$/, 'no response in $1 s')); }
function nwText(s, max) { if (s == null) return ''; let t = String(s); if (/[<&]/.test(t)) { try { t = new DOMParser().parseFromString('<!doctype html><body>' + t, 'text/html').body.textContent || ''; } catch (e) { t = t.replace(/<[^>]*>/g, ' '); } } t = t.replace(/\s+/g, ' ').trim(); if (max && t.length > max) t = t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'; return t; }
function nwUrl(u, base) { try { const x = new URL(String(u || ''), base); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (e) { return ''; } }
function nwAgo(ts) { if (!ts) return L('nunca', 'never'); const s = (Date.now() - ts) / 1000; if (s < 90) return L('agora mesmo', 'just now'); if (s < 3600) return L('há ' + Math.round(s / 60) + ' min', Math.round(s / 60) + ' min ago'); if (s < 129600) return L('há ' + Math.round(s / 3600) + ' h', Math.round(s / 3600) + ' h ago'); return L('há ' + Math.round(s / 86400) + ' dias', Math.round(s / 86400) + ' days ago'); }
function nwWhen(ts) { if (!ts) return ''; const d = new Date(ts); const hm = pad(d.getHours()) + ':' + pad(d.getMinutes()); return d.toDateString() === new Date().toDateString() ? L('hoje, ', 'today, ') + hm : pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ', ' + hm; }
function nwDay(off) { return new Date(Date.now() + off * 864e5).toISOString().slice(0, 10); }
function nwShortDay(s) { s = String(s || ''); return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(8, 10) + '/' + s.slice(5, 7) : s; }
function nwLongDay(s) { s = String(s || ''); return /^\d{4}-\d{2}-\d{2}/.test(s) ? L((+s.slice(8, 10)) + ' de ' + NEWS_MESES[+s.slice(5, 7) - 1] + ' de ' + s.slice(0, 4), (+s.slice(8, 10)) + ' ' + NEWS_MESES[+s.slice(5, 7) - 1] + ' ' + s.slice(0, 4)) : s; }
function nwWikiDay(off) { const d = new Date(Date.now() + off * 864e5); return d.getUTCFullYear() + '_' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getUTCMonth()] + '_' + d.getUTCDate(); }
function nwRegion(s) {
  let t = ' ' + String(s || '').toUpperCase() + ' ';
  (EN ? [[' REGION ', ' (region) '], ['AZORES-CAPE ST. VINCENT RIDGE', 'Azores-Cape St. Vincent Ridge'], ['AZORES ISLANDS', 'Azores'], ['MADEIRA ISLANDS', 'Madeira'], ['CANARY ISLANDS', 'Canary Islands'], ['STRAIT OF GIBRALTAR', 'Strait of Gibraltar'], ['GULF OF CADIZ', 'Gulf of Cádiz'], ['NORTH ATLANTIC OCEAN', 'North Atlantic Ocean'], ['PORTUGAL', 'Portugal'], ['SPAIN', 'Spain'], ['MOROCCO', 'Morocco'], ['ALGERIA', 'Algeria'], [' NORTHERN ', ' northern '], [' SOUTHERN ', ' southern '], [' WESTERN ', ' western '], [' EASTERN ', ' eastern '], [' CENTRAL ', ' central '], [' OFFSHORE ', ' offshore ']] : [[' REGION ', ' (região) '], ['AZORES-CAPE ST. VINCENT RIDGE', 'dorsal Açores-São Vicente'], ['AZORES ISLANDS', 'Açores'], ['MADEIRA ISLANDS', 'Madeira'], ['CANARY ISLANDS', 'Canárias'], ['STRAIT OF GIBRALTAR', 'estreito de Gibraltar'], ['GULF OF CADIZ', 'golfo de Cádis'], ['NORTH ATLANTIC OCEAN', 'Atlântico Norte'], ['PORTUGAL', 'Portugal'], ['SPAIN', 'Espanha'], ['MOROCCO', 'Marrocos'], ['ALGERIA', 'Argélia'], [' NORTHERN ', ' norte de '], [' SOUTHERN ', ' sul de '], [' WESTERN ', ' oeste de '], [' EASTERN ', ' leste de '], [' CENTRAL ', ' centro de '], [' OFFSHORE ', ' ao largo de ']]).forEach(p => { t = t.split(p[0]).join(p[1]); });
  t = t.replace(/\b[A-Z][A-Z'.-]+\b/g, w => w.charAt(0) + w.slice(1).toLowerCase()).replace(/\s+/g, ' ').trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function nwFeed(xml, max) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length) throw new Error('feed inválido');
  let els = Array.from(doc.getElementsByTagName('item')); if (!els.length) els = Array.from(doc.getElementsByTagName('entry'));
  const pick = (el, names) => { for (const n of names) { const x = el.getElementsByTagName(n)[0]; if (x && x.textContent.trim()) return x.textContent.trim(); } return ''; };
  return els.slice(0, max || 30).map(el => { let u = pick(el, ['link']); if (!u) { const l = el.getElementsByTagName('link')[0]; u = l ? (l.getAttribute('href') || '') : ''; } return { t: nwText(pick(el, ['title']), 220), u: nwUrl(u), d: Date.parse(pick(el, ['pubDate', 'dc:date', 'updated', 'published'])) || 0, r: nwText(pick(el, ['description', 'summary']), 260) }; }).filter(x => x.t && x.u);
}
function nwWiki(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const box = doc.querySelector('.current-events-content'); if (!box) return [];
  const out = []; let cat = '';
  const isExt = a => /external/.test(a.className) || a.getAttribute('rel') === 'mw:ExtLink';
  Array.from(box.children).forEach(el => {
    if (el.tagName === 'P') { const k = nwText(el.textContent, 80); cat = Object.prototype.hasOwnProperty.call(WIKI_CAT, k.toLowerCase()) ? WIKI_CAT[k.toLowerCase()] : k; return; }
    if (el.tagName !== 'UL' || !cat) return;
    el.querySelectorAll('li').forEach(li => {
      if (li.querySelector('ul')) return;
      const ext = Array.from(li.querySelectorAll('a')).filter(isExt);
      const c = li.cloneNode(true); Array.from(c.querySelectorAll('a')).filter(isExt).forEach(a => a.remove());
      const t = nwText(c.textContent, 420); if (t.length < 25) return;
      const par = li.parentElement && li.parentElement.closest('li'), pa = par && par.querySelector('a');
      out.push({ cat, tema: pa ? nwText(pa.textContent, 80) : '', t, u: ext[0] ? nwUrl(ext[0].getAttribute('href')) : '', fonte: ext[0] ? nwText(ext[0].textContent, 40).replace(/^\(|\)$/g, '') : '' });
    });
  });
  return out;
}
function nwAggCandidates(auto) {
  const custom = auto ? '' : String(LS.get('newsFeedUrl', '') || '').trim();
  if (custom) return [nwUrl(custom, location.href)].filter(Boolean);
  const out = [], m = location.hostname.match(/^([a-z0-9-]+)\.github\.io$/i);
  if (m) { const seg = location.pathname.split('/').filter(Boolean)[0]; const repo = seg && !/\.html?$/i.test(seg) ? seg : m[1] + '.github.io'; out.push('https://raw.githubusercontent.com/' + m[1] + '/' + repo + '/noticias/noticias.json'); }
  if (/^https?:$/.test(location.protocol)) out.push(new URL('noticias.json', location.href).href);
  return out;
}
async function nwLoadAgg() {
  const cands = nwAggCandidates(); let last = null;
  for (const u of cands) {
    try {
      const d = await nwJSON(u + (u.indexOf('?') < 0 ? '?' : '&') + 'v=' + Math.floor(Date.now() / 6e4), 20000);
      if (!d || !Array.isArray(d.itens)) throw new Error('formato inesperado');
      const fontes = {}; (Array.isArray(d.fontes) ? d.fontes : []).forEach(f => { if (f && f.id) fontes[String(f.id)] = { nome: nwText(f.nome, 40), grupo: String(f.grupo || ''), site: nwUrl(f.site), ok: !!f.ok, n: +f.n || 0 }; });
      return { url: u, gerado: Date.parse(d.gerado) || 0, fontes, videos: (Array.isArray(d.videos) ? d.videos : []).slice(0, 80).map(x => ({ f: String((x && x.f) || ''), v: String((x && x.v) || ''), t: nwText(x && x.t, 160), d: Date.parse(x && x.d) || 0 })).filter(x => /^[\w-]{11}$/.test(x.v) && x.t), fontesVideo: (Array.isArray(d.fontesVideo) ? d.fontesVideo : []).map(fv => ({ id: String((fv && fv.id) || ''), nome: nwText(fv && fv.nome, 40), ok: !!(fv && fv.ok), n: +(fv && fv.n) || 0 })), itens: d.itens.slice(0, 500).map(x => ({ f: String((x && x.f) || ''), t: nwText(x && x.t, 220), u: nwUrl(x && x.u), d: Date.parse(x && x.d) || 0, r: nwText(x && x.r, 280) })).filter(x => x.t && x.u) };
    } catch (e) { last = e; }
  }
  const err = new Error(!cands.length ? 'não configurado' : last && /HTTP 404/.test(last.message) ? 'resumo não encontrado' : (last ? last.message : 'erro'));
  err.off = !cands.length || !!(last && /HTTP 404|formato inesperado/.test(last.message));
  throw err;
}
const NW_SRC = [
  { id: 'ipma', nome: 'IPMA', oque: L('avisos meteorológicos oficiais', 'official weather warnings'), site: 'https://www.ipma.pt/', load: async () => { const w = await nwJSON('https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json'); if (!Array.isArray(w)) throw new Error('formato inesperado'); return w.filter(x => x && IPMA_LV[x.awarenessLevelID]).map(x => ({ a: String(x.idAreaAviso || ''), tipo: nwText(x.awarenessTypeName, 40), lv: x.awarenessLevelID, ini: Date.parse(x.startTime) || 0, fim: Date.parse(x.endTime) || 0, txt: nwText(x.text, 300) })); } },
  { id: 'rcm', nome: 'IPMA', oque: L('risco de incêndio rural por concelho, para hoje', 'wildfire danger by municipality, for today'), site: 'https://www.ipma.pt/', load: async () => { const d = await nwJSON('https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d0.json'); const by = {}; Object.values((d && d.local) || {}).forEach(v => { const k = String((v && v.dico) || '').slice(0, 2), r = +(((v && v.data) || {}).rcm) || 0; if (!DISTRITOS[k] || r < 1 || r > 5) return; const o = by[k] || (by[k] = { max: 0, n: [0, 0, 0, 0, 0, 0] }); o.max = Math.max(o.max, r); o.n[r]++; }); if (!Object.keys(by).length) throw new Error('sem dados'); return { dia: nwText(d.dataPrev, 12), by }; } },
  { id: 'emsc', nome: 'EMSC', oque: L('sismos perto de Portugal nos últimos 7 dias', 'earthquakes near Portugal in the last 7 days'), site: 'https://www.emsc-csem.org/', load: async () => { const t = await nwGet('https://www.seismicportal.eu/fdsnws/event/1/query?format=json&minmag=2.5&minlat=27&maxlat=45&minlon=-35&maxlon=-5&orderby=time&limit=40&starttime=' + nwDay(-7)); const d = t.trim() ? JSON.parse(t) : { features: [] }; return ((d && d.features) || []).map(f => { const p = f.properties || {}; return { t: Date.parse(p.time) || 0, m: +p.mag || 0, la: +p.lat, lo: +p.lon, reg: nwRegion(nwText(p.flynn_region, 80)), km: Math.round(+p.depth || 0), u: p.unid ? 'https://www.seismicportal.eu/eventdetails.html?unid=' + encodeURIComponent(p.unid) : '' }; }); } },
  { id: 'gdacs', nome: 'GDACS', oque: L('catástrofes com alerta laranja ou vermelho (Comissão Europeia e ONU)', 'disasters with an orange or red alert (European Commission and UN)'), site: 'https://www.gdacs.org/', load: async () => { const d = await nwJSON('https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?eventlist=EQ;TC;FL;VO;DR;WF&alertlevel=Orange;Red&fromDate=' + nwDay(-14) + '&toDate=' + nwDay(1), 25000).catch(e => { if (/HTTP 404/.test(e.message)) return { features: [] }; throw e; }); return ((d && d.features) || []).map(f => { const p = f.properties || {}; const gc = (f.geometry && f.geometry.coordinates) || []; return { tipo: String(p.eventtype || ''), lv: String(p.alertlevel || ''), lo: +gc[0], la: +gc[1], pais: nwText(p.country, 160), de: String(p.fromdate || '').slice(0, 10), ate: String(p.todate || '').slice(0, 10), sev: nwText((p.severitydata || {}).severitytext, 140).replace(/^Magnitude 0(\.0+)?$/i, ''), u: nwUrl((p.url || {}).report || '') }; }).filter(x => x.lv === 'Red' || x.lv === 'Orange').sort((a, b) => ((b.lv === 'Red') - (a.lv === 'Red')) || (b.ate > a.ate ? 1 : b.ate < a.ate ? -1 : 0)); } },
  { id: 'usgs', nome: 'USGS', oque: L('sismos de magnitude 4,5 ou mais no mundo nos últimos 7 dias', 'earthquakes of magnitude 4.5 or more worldwide in the last 7 days'), site: 'https://earthquake.usgs.gov/', load: async () => { const d = await nwJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'); return ((d && d.features) || []).map(f => { const p = f.properties || {}; const gc = (f.geometry && f.geometry.coordinates) || []; return { t: +p.time || 0, m: +p.mag || 0, lo: +gc[0], la: +gc[1], sig: +p.sig || 0, lugar: nwText(p.place, 120), tsu: +p.tsunami === 1, u: nwUrl(p.url) }; }).sort((a, b) => b.t - a.t); } },
  { id: 'oms', nome: L('OMS', 'WHO'), oque: L('surtos de doenças no mundo', 'disease outbreaks worldwide'), site: 'https://www.who.int/emergencies/disease-outbreak-news', load: async () => { const d = await nwJSON('https://www.who.int/api/news/diseaseoutbreaknews?sf_culture=en&$orderby=PublicationDateAndTime%20desc&$top=8&$select=Title,PublicationDateAndTime,UrlName'); return ((d && d.value) || []).map(x => ({ t: nwText(x.Title, 200), d: Date.parse(x.PublicationDateAndTime) || 0, u: x.UrlName ? 'https://www.who.int/emergencies/disease-outbreak-news/item/' + encodeURIComponent(x.UrlName) : '' })).filter(x => x.t); } },
  { id: 'agg', nome: L('Resumo de notícias', 'News digest'), oque: L('RTP, Público, Observador, CNN Portugal, ECO, Euronews, ONU News, ECDC, BBC, The Guardian e France 24', 'RTP, Público, Observador, CNN Portugal, ECO, Euronews, ONU News, ECDC, BBC, The Guardian and France 24'), site: '', load: nwLoadAgg },
  { id: 'dw', nome: 'DW', oque: L('notícias do mundo, em inglês', 'world news, in English'), site: 'https://www.dw.com/en/', load: async () => nwFeed(await nwGet('https://rss.dw.com/rdf/rss-en-world'), 20) },
  { id: 'wiki', nome: L('Wikipédia', 'Wikipedia'), oque: L('resumo diário com as fontes citadas, em inglês', 'daily summary with the sources cited, in English'), site: 'https://en.wikipedia.org/wiki/Portal:Current_events', load: async () => { const offs = [0, -1]; const rs = await Promise.allSettled(offs.map(o => nwGet('https://en.wikipedia.org/api/rest_v1/page/html/Portal%3ACurrent_events%2F' + nwWikiDay(o)))); const out = []; rs.forEach((r, i) => { if (r.status === 'fulfilled') out.push({ dia: nwDay(offs[i]), itens: nwWiki(r.value) }); }); if (!out.length) throw rs[1].reason || rs[0].reason || new Error('sem dados'); return out; } }
];
TOOLS.push({ id: 'noticias', section: 'ferramentas', icon: '📰', title: L('Notícias e alertas', 'News and alerts'), desc: L('Com internet: avisos do IPMA, risco de incêndio, sismos, catástrofes e surtos no mundo, manchetes de fontes credíveis e notícias em vídeo. Sem rede, mostra a última versão guardada.', 'With internet: IPMA (weather institute) warnings, fire danger, earthquakes, disasters and outbreaks around the world, headlines from credible sources and video news. Offline, it shows the last saved version.'),
  render(el) {
    let cache = LS.get('newsCache', {}) || {}, tab = LS.get('newsTab', 'pt'), busy = false, alive = true, shown = 60, q = '', playing = '';
    const TABS = [['pt', '📍 Portugal'], ['mundo', L('🌍 Alertas no mundo', '🌍 World alerts')], ['noticias', L('📰 Notícias', '📰 News')], ['video', L('🎥 Vídeo', '🎥 Video')], ['resumo', L('🗓️ Resumo do dia', '🗓️ Daily summary')], ['fontes', L('✅ Fontes', '✅ Sources')]];
    el.innerHTML = '<div class="card" style="margin-top:0"><div id="nst" class="small"></div><div class="btnrow" style="margin:.5em 0 0"><button class="btn primary" id="nrf">' + L('🔄 Atualizar', '🔄 Refresh') + '</button><label class="btn sm"><input type="checkbox" id="nau" style="width:1.1em;height:1.1em"> ' + L('Atualizar sozinho a cada 15 min', 'Refresh automatically every 15 min') + '</label></div><p class="small muted" style="margin-bottom:0">' + L('Só usa a internet enquanto esta página está aberta. Em perigo, as ordens oficiais vêm primeiro: 112, SMS de alerta da Proteção Civil e rádio.', 'It only uses the internet while this page is open. When there is danger, official orders come first: 112, Proteção Civil (Civil Protection) alert SMS and radio.') + '</p></div>' +
      '<div class="fambar" id="ntabs">' + TABS.map(t => '<button class="btn sm" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div><div id="nbody"></div>';
    const body = $('#nbody', el), st = $('#nst', el), au = $('#nau', el);
    const lastTs = () => NW_SRC.reduce((m, s) => Math.max(m, (cache[s.id] && cache[s.id].ts) || 0), 0);
    const drawStatus = () => { const t = lastTs(); st.innerHTML = (navigator.onLine ? L('🟢 Com ligação', '🟢 Online') : L('🔴 Sem ligação', '🔴 Offline')) + ' · ' + (t ? L('dados de ', 'data updated ') + esc(nwAgo(t)) + ' (' + esc(nwWhen(t)) + ')' : L('ainda sem dados guardados', 'no saved data yet')) + (busy ? ' · <strong>' + L('a atualizar…', 'refreshing…') + '</strong>' : ''); $('#nrf', el).disabled = busy; };
    const lnk = (u, html, cls) => u ? '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + html + '</a>' : html;
    const srcLine = id => { const s = NW_SRC.find(x => x.id === id), c = cache[id]; let h = '<div class="nsrc">' + L('Fonte: ', 'Source: ') + lnk(s.site, esc(s.nome)); if (c && c.ts) h += ' · ' + esc(nwAgo(c.ts)); if (c && c.err && !c.off) h += ' · <span class="badge warn">' + L('a última tentativa falhou', 'last attempt failed') + ' (' + esc(nwErr(c.err)) + ')</span>'; else if (c && c.ts && Date.now() - c.ts > 6 * 36e5) h += ' · <span class="badge warn">' + L('desatualizado', 'out of date') + '</span>'; return h + '</div>'; };
    const noData = '<p class="muted">' + L('Ainda sem dados. Com internet, carrega em Atualizar.', 'No data yet. With internet, tap Refresh.') + '</p>';
    const tabPT = () => {
      const a = LS.get('newsArea', ''), now = Date.now();
      let h = '<label class="field"><span>' + L('A minha zona (destaca os avisos e o risco de incêndio)', 'My area (highlights warnings and fire danger)') + '</span><select id="narea"><option value="">' + L('Todo o país', 'Whole country') + '</option>' + Object.keys(NEWS_AREAS).map(k => '<option value="' + k + '"' + (k === a ? ' selected' : '') + '>' + esc(NEWS_AREAS[k]) + '</option>').join('') + '</select></label>';
      h += '<div class="card"><h3>' + L('⚠️ Avisos meteorológicos', '⚠️ Weather warnings') + '</h3>' + srcLine('ipma');
      const c = cache.ipma;
      if (!c || !c.data) h += noData;
      else {
        const groups = {};
        c.data.filter(x => !x.fim || x.fim > now).forEach(x => { const k = [x.lv, x.tipo, x.ini, x.fim, x.txt].join('|'); if (!groups[k]) groups[k] = Object.assign({ areas: [] }, x); groups[k].areas.push(x.a); });
        const gl = Object.values(groups).sort((x, y) => IPMA_LV[y.lv][2] - IPMA_LV[x.lv][2] || x.ini - y.ini);
        const line = g => '<li><span class="badge ' + IPMA_LV[g.lv][1] + '">' + IPMA_LV[g.lv][0] + '</span> <strong>' + esc(ipmaTipo(g.tipo)) + '</strong> · ' + esc(g.areas.map(k => NEWS_AREAS[k] || k).join(', ')) + '<div class="nmeta">' + (g.ini > now ? L('a partir de ', 'from ') + esc(nwWhen(g.ini)) + ', ' : '') + L('até ', 'until ') + esc(nwWhen(g.fim)) + '</div>' + (g.txt ? '<div class="nsum">' + esc(g.txt) + '</div>' : '') + '</li>';
        if (a) {
          const mine = gl.filter(g => g.areas.indexOf(a) >= 0), rest = gl.filter(g => g.areas.indexOf(a) < 0);
          h += '<p><strong>' + esc(NEWS_AREAS[a]) + '</strong>: ' + (mine.length ? mine.length + L(' aviso(s)', ' warning(s)') : L('sem avisos neste momento', 'no warnings at the moment')) + '.</p>' + (mine.length ? '<ul class="nlist">' + mine.map(line).join('') + '</ul>' : '');
          if (rest.length) h += '<details><summary>' + L('Resto do país: ', 'Rest of the country: ') + rest.length + L(' aviso(s)', ' warning(s)') + '</summary><ul class="nlist">' + rest.map(line).join('') + '</ul></details>';
        } else h += gl.length ? '<ul class="nlist">' + gl.map(line).join('') + '</ul>' : '<p>' + L('Sem avisos amarelos, laranja ou vermelhos neste momento.', 'No yellow, orange or red warnings at the moment.') + '</p>';
      }
      h += '</div><div class="card"><h3>' + L('🔥 Risco de incêndio rural hoje', '🔥 Wildfire danger today') + '</h3>' + srcLine('rcm');
      const r = cache.rcm;
      if (!r || !r.data) h += noData;
      else {
        const by = r.data.by || {}, dk = AREA_DICO[a], chip = n => '<span class="rcm rcm' + n + '">' + n + '</span>';
        if (a && dk && by[dk]) { const o = by[dk]; h += '<p><strong>' + esc(DISTRITOS[dk]) + '</strong>: ' + L('o concelho com mais risco está em ', 'the municipality with the highest danger is at ') + chip(o.max) + ' ' + RCM_LV[o.max] + L('. Concelhos do distrito: ', '. Municipalities in the district: ') + [5, 4, 3, 2, 1].filter(n => o.n[n]).map(n => o.n[n] + L(' em ', ' ') + RCM_LV[n]).join(', ') + '.</p>'; }
        else if (a && !dk) h += '<p class="muted small">' + L('O IPMA publica este índice só para o continente.', 'IPMA only publishes this index for mainland Portugal.') + '</p>';
        const tot = [0, 0, 0, 0, 0, 0]; Object.keys(by).forEach(k => by[k].n.forEach((v, i) => { tot[i] += v; }));
        const maxD = Object.keys(by).filter(k => by[k].max === 5).map(k => DISTRITOS[k]);
        h += '<p class="small">' + L('Continente (', 'Mainland (') + esc(nwShortDay(r.data.dia) || L('hoje', 'today')) + '): ' + chip(5) + L(' máximo em ', ' maximum in ') + tot[5] + L(' concelhos, ', ' municipalities, ') + chip(4) + L(' muito elevado em ', ' very high in ') + tot[4] + '.' + (maxD.length ? L(' Distritos com concelhos em risco máximo: ', ' Districts with municipalities at maximum danger: ') + esc(maxD.join(', ')) + '.' : '') + '</p><p class="small muted">' + L('Com risco muito elevado ou máximo, as queimas, as queimadas e o fogo no mato são proibidos e há limites ao uso de máquinas agrícolas e florestais. Ver <a href="#/s/agora/incendio-rural">incêndio rural</a>.', 'With very high or maximum danger, burning piles of plant waste (queimas), burning vegetation over an area (queimadas) and fires in scrubland are banned, and there are limits on using farm and forestry machinery. See <a href="#/s/agora/incendio-rural">wildfire</a>.') + '</p>';
      }
      h += '</div><div class="card"><h3>' + L('🌍 Sismos perto de Portugal', '🌍 Earthquakes near Portugal') + '</h3>' + srcLine('emsc');
      const e = cache.emsc;
      if (!e || !e.data) h += noData;
      else if (!e.data.length) h += '<p>' + L('Nenhum sismo de magnitude 2,5 ou mais nos últimos 7 dias, do golfo de Cádis aos Açores.', 'No earthquakes of magnitude 2.5 or more in the last 7 days, from the Gulf of Cádiz to the Azores.') + '</p>';
      else h += '<p class="small muted">' + L('Magnitude 2,5 ou mais nos últimos 7 dias, do golfo de Cádis aos Açores e à Madeira. A maioria não se sente.', 'Magnitude 2.5 or more in the last 7 days, from the Gulf of Cádiz to the Azores and Madeira. Most are not felt.') + '</p><ul class="nlist">' + e.data.slice(0, 15).map(x => '<li><span class="badge' + (x.m >= 5 ? ' danger' : x.m >= 4 ? ' warn' : '') + '">M ' + esc(nf(x.m)) + '</span> ' + lnk(x.u, esc(x.reg), 'nt') + '<div class="nmeta">' + esc(nwWhen(x.t)) + ' · ' + x.km + L(' km de profundidade', ' km deep') + '</div></li>').join('') + '</ul>';
      h += '</div><div class="card"><h3>' + L('🔗 Sites oficiais e de confiança', '🔗 Official and trusted websites') + '</h3><ul class="nlist">' + NEWS_LINKS.map(l => '<li>' + lnk(l[1], esc(l[0]), 'nt') + '</li>').join('') + '</ul><p class="small muted">' + L('Abrem no browser e precisam de internet. Ver também <a href="#/s/comunicar/informacao">informação fiável e boatos</a>.', 'They open in the browser and need internet. See also <a href="#/s/comunicar/informacao">reliable information and rumours</a>.') + '</p></div>';
      body.innerHTML = h;
      $('#narea', body).onchange = ev => { LS.set('newsArea', ev.target.value); tabPT(); };
    };
    const tabMundo = () => {
      let h = '<div class="btnrow"><a class="btn sm" href="#/t/mapa" data-mundo="1">' + L('🗺️ Ver os eventos no mapa', '🗺️ See the events on the map') + '</a></div><div class="card"><h3>' + L('🚨 Catástrofes com alerta laranja ou vermelho', '🚨 Disasters with an orange or red alert') + '</h3>' + srcLine('gdacs');
      const g = cache.gdacs;
      if (!g || !g.data) h += noData;
      else if (!g.data.length) h += '<p>' + L('Sem alertas laranja ou vermelhos nos últimos 14 dias.', 'No orange or red alerts in the last 14 days.') + '</p>';
      else h += '<p class="small muted">' + L('Sistema de alerta da Comissão Europeia e da ONU. Laranja e vermelho querem dizer impacto provável nas pessoas. Os pormenores estão em inglês.', 'Alert system of the European Commission and the UN. Orange and red mean a likely impact on people. The details are in English.') + '</p><ul class="nlist">' + g.data.slice(0, 30).map(x => { const ty = GDACS_T[x.tipo] || [x.tipo, '⚠️']; return '<li><span class="badge ' + (x.lv === 'Red' ? 'danger' : 'orange') + '">' + (x.lv === 'Red' ? L('Vermelho', 'Red') : L('Laranja', 'Orange')) + '</span> ' + ty[1] + ' ' + lnk(x.u, '<strong>' + esc(ty[0]) + '</strong>' + (x.pais ? ' · ' + esc(x.pais) : ''), 'nt') + '<div class="nmeta">' + esc(nwShortDay(x.de)) + (x.ate && x.ate !== x.de ? L(' a ', ' to ') + esc(nwShortDay(x.ate)) : '') + '</div>' + (x.sev ? '<div class="nsum">' + esc(x.sev) + '</div>' : '') + '</li>'; }).join('') + '</ul>';
      h += '</div><div class="card"><h3>' + L('🌐 Sismos fortes no mundo', '🌐 Strong earthquakes worldwide') + '</h3>' + srcLine('usgs');
      const u = cache.usgs;
      if (!u || !u.data) h += noData;
      else if (!u.data.filter(x => x.m >= 6 || x.sig >= 600).length) h += '<p>' + L('Nenhum sismo de magnitude 6 ou mais nos últimos 7 dias.', 'No earthquakes of magnitude 6 or more in the last 7 days.') + '</p>';
      else h += '<ul class="nlist">' + u.data.filter(x => x.m >= 6 || x.sig >= 600).map(x => '<li><span class="badge ' + (x.m >= 7 ? 'danger' : x.m >= 6 ? 'orange' : 'warn') + '">M ' + esc(nf(x.m)) + '</span> ' + lnk(x.u, esc(x.lugar), 'nt') + '<div class="nmeta">' + esc(nwWhen(x.t)) + (x.tsu ? L(' · no mar: confirma se há avisos de tsunami', ' · at sea: check for tsunami warnings') : '') + '</div></li>').join('') + '</ul>';
      h += '</div><div class="card"><h3>' + L('🦠 Surtos de doenças', '🦠 Disease outbreaks') + '</h3>' + srcLine('oms');
      const o = cache.oms;
      if (!o || !o.data) h += noData;
      else h += '<p class="small muted">' + L('Comunicados oficiais da Organização Mundial da Saúde, em inglês.', 'Official statements from the World Health Organization (WHO), in English.') + '</p><ul class="nlist">' + o.data.map(x => '<li>' + lnk(x.u, esc(x.t), 'nt') + '<div class="nmeta">' + esc(nwWhen(x.d)) + '</div></li>').join('') + '</ul>';
      body.innerHTML = h + '</div>'; $$('[data-mundo]', body).forEach(a => a.onclick = () => LS.set('mapaVista', 'mundo'));
    };
    const tabNews = () => {
      const agg = cache.agg, dw = cache.dw, grp = LS.get('newsGroup', ''), fontes = (agg && agg.data && agg.data.fontes) || {};
      let items = (agg && agg.data ? agg.data.itens : []).map(x => Object.assign({ nome: (fontes[x.f] || {}).nome || x.f, grupo: (fontes[x.f] || {}).grupo || '' }, x));
      if (dw && dw.data) items = items.concat(dw.data.map(x => Object.assign({ nome: 'DW', grupo: 'mundo-en' }, x)));
      const seen = {}; items = items.filter(x => { const k = norm(x.t).replace(/[^a-z0-9]/g, '').slice(0, 80); if (seen[k] || seen[x.u]) return false; seen[k] = seen[x.u] = 1; return true; }).sort((x, y) => (y.d || 0) - (x.d || 0));
      let h = '';
      if (!agg || !agg.data) h += '<div class="card"><h3>' + L('📰 Notícias portuguesas', '📰 Portuguese news') + '</h3><p>' + (agg && agg.err && !agg.off ? L('O resumo de notícias não respondeu', 'The news digest did not respond') + ' (' + esc(nwErr(agg.err)) + '). ' : L('Os sites de notícias portugueses não deixam uma app ler as manchetes diretamente, por isso a app precisa do <strong>resumo de notícias</strong>, que um serviço gratuito do GitHub atualiza a cada 30 minutos. ', 'Portuguese news sites do not let an app read their headlines directly, so the app needs the <strong>news digest</strong>, which a free GitHub service updates every 30 minutes. ')) + '<button class="btn sm" data-goto="fontes">' + L('Como ativar', 'How to enable') + '</button></p><p class="small">' + L('Entretanto, abre diretamente: ', 'Meanwhile, open them directly: ') + [['RTP Notícias', 'https://www.rtp.pt/noticias/'], ['Público', 'https://www.publico.pt/'], ['Observador', 'https://observador.pt/'], ['CNN Portugal', 'https://cnnportugal.iol.pt/'], ['Euronews', 'https://pt.euronews.com/']].map(l => lnk(l[1], esc(l[0]))).join(' · ') + '</p></div>';
      else h += srcLine('agg') + (agg.data.gerado && Date.now() - agg.data.gerado > 6 * 36e5 ? '<div class="nsrc"><span class="badge warn">' + L('O resumo não é atualizado desde ', 'The digest has not been updated since ') + esc(nwWhen(agg.data.gerado)) + '</span></div>' : '');
      if (dw && dw.data) h += srcLine('dw');
      h += '<input id="nq" type="search" placeholder="' + L('Filtrar (ex.: incêndio, greve, Ucrânia)', 'Filter (e.g. fire, strike, Ukraine)') + '" value="' + esc(q) + '"><div class="fambar">' + NEWS_GROUPS.map(g => '<button class="btn sm' + (g[0] === grp ? ' primary' : '') + '" data-grp="' + g[0] + '">' + esc(g[1]) + '</button>').join('') + '</div>';
      const words = norm(q).split(/\s+/).filter(Boolean);
      const vis = items.filter(x => (!grp || x.grupo === grp) && words.every(w => norm(x.t + ' ' + (x.r || '') + ' ' + x.nome).indexOf(w) >= 0));
      if (vis.length) h += '<ul class="nlist">' + vis.slice(0, shown).map(x => '<li><div class="nmeta"><span class="badge">' + esc(x.nome) + '</span> ' + esc(x.d ? nwAgo(x.d) : '') + '</div>' + lnk(x.u, esc(x.t), 'nt') + (x.r ? '<div class="nsum">' + esc(x.r) + '</div>' : '') + '</li>').join('') + '</ul>' + (vis.length > shown ? '<div class="btnrow"><button class="btn" id="nmore">' + L('Mostrar mais ' + Math.min(60, vis.length - shown), 'Show ' + Math.min(60, vis.length - shown) + ' more') + '</button></div>' : '');
      else h += items.length ? '<p class="muted">' + L('Nenhuma notícia com este filtro.', 'No news matches this filter.') + '</p>' : noData;
      body.innerHTML = h;
      const qi = $('#nq', body); qi.oninput = () => { q = qi.value; shown = 60; tabNews(); const n = $('#nq', body); n.focus(); try { n.setSelectionRange(n.value.length, n.value.length); } catch (e2) { } };
      $$('[data-grp]', body).forEach(b => b.onclick = () => { LS.set('newsGroup', b.dataset.grp); shown = 60; tabNews(); });
      $$('[data-goto]', body).forEach(b => b.onclick = () => setTab(b.dataset.goto));
      const more = $('#nmore', body); if (more) more.onclick = () => { shown += 60; tabNews(); };
    };
    const tabResumo = () => {
      const w = cache.wiki;
      let h = '<div class="card"><h3>' + L('🗓️ O que aconteceu no mundo', '🗓️ What happened in the world') + '</h3>' + srcLine('wiki') + '<p class="small muted">' + L('Resumo diário do portal de acontecimentos da Wikipédia, em inglês, escrito e revisto por voluntários. Cada frase leva à notícia original, entre parênteses. O browser pode traduzir a página.', 'Daily summary from the Wikipedia Current events portal, in English, written and reviewed by volunteers. Each sentence links to the original news story, in brackets. Your browser can translate the page.') + '</p></div>';
      if (!w || !w.data) h += noData;
      else w.data.forEach(day => {
        h += '<h2>' + esc(nwLongDay(day.dia)) + '</h2>';
        if (!day.itens.length) { h += '<p class="muted">' + L('Ainda sem entradas para este dia.', 'No entries for this day yet.') + '</p>'; return; }
        const cats = {}; day.itens.forEach(x => { (cats[x.cat] = cats[x.cat] || []).push(x); });
        Object.keys(cats).forEach(k => { h += '<h3>' + esc(L(k, WIKI_CAT_EN[k] || k)) + '</h3><ul class="nlist">' + cats[k].map(x => '<li>' + (x.tema ? '<div class="nmeta">' + esc(x.tema) + '</div>' : '') + esc(x.t) + (x.u ? ' ' + lnk(x.u, '(' + esc(x.fonte || L('fonte', 'source')) + ')') : '') + '</li>').join('') + '</ul>'; });
      });
      body.innerHTML = h;
    };
    const tabFontes = () => {
      const agg = cache.agg && cache.agg.data, custom = LS.get('newsFeedUrl', '');
      let h = '<div class="card"><h3>' + L('✅ Como são escolhidas as fontes', '✅ How the sources are chosen') + '</h3>' + md(L('- **Oficiais**: IPMA (avisos e risco de incêndio), EMSC e USGS (sismos), GDACS da Comissão Europeia e da ONU (catástrofes), OMS e ECDC (saúde).\n- **Jornalismo com regras editoriais públicas**: RTP, Público, Observador, CNN Portugal, ECO, Euronews, ONU News, BBC, The Guardian, France 24 e DW.\n- **Resumo com fontes citadas**: portal de acontecimentos da Wikipédia.\n- **Não entram** redes sociais, grupos de mensagens, sites anónimos nem vídeos virais.\n\nMesmo assim, uma notícia importante confirma-se em duas fontes. Ver [informação fiável e boatos](#/s/comunicar/informacao).', '- **Official**: IPMA (weather warnings and fire danger), EMSC and USGS (earthquakes), GDACS from the European Commission and the UN (disasters), WHO and ECDC (health).\n- **Journalism with public editorial standards**: RTP, Público, Observador, CNN Portugal, ECO, Euronews, ONU News, BBC, The Guardian, France 24 and DW.\n- **Summary with cited sources**: the Wikipedia Current events portal.\n- **Not included**: social media, messaging groups, anonymous websites or viral videos.\n\nEven so, confirm important news in two sources. See [reliable information and rumours](#/s/comunicar/informacao).'), 'nwf') + '</div>';
      h += '<div class="card"><h3>' + L('Estado das fontes', 'Source status') + '</h3><ul class="nlist">' + NW_SRC.map(s => { const c = cache[s.id]; const b = !c ? '<span class="badge">' + L('sem dados', 'no data') + '</span>' : c.err && c.off ? '<span class="badge">' + L('não ativado', 'not enabled') + '</span>' : c.err ? '<span class="badge warn">' + L('falhou: ', 'failed: ') + esc(nwErr(c.err)) + '</span>' : '<span class="badge ok">ok</span>'; return '<li><strong>' + lnk(s.site, esc(s.nome)) + '</strong>: ' + esc(s.oque) + '<div class="nmeta">' + b + (c && c.ts ? L(' · dados de ', ' · data updated ') + esc(nwAgo(c.ts)) : '') + '</div></li>'; }).join('') + '</ul></div>';
      if (agg) h += '<div class="card"><h3>' + L('Resumo de notícias', 'News digest') + '</h3><p class="small">' + L('Lido de ', 'Read from ') + '<code>' + esc(agg.url) + '</code>' + L(', gerado ', ', generated ') + esc(nwAgo(agg.gerado)) + '.</p><ul class="nlist">' + Object.keys(agg.fontes).map(k => { const f = agg.fontes[k]; return '<li>' + lnk(f.site, esc(f.nome), 'nt') + ' <span class="badge ' + (f.ok ? 'ok' : 'warn') + '">' + (f.ok ? f.n + L(' notícias', ' stories') : L('falhou', 'failed')) + '</span></li>'; }).join('') + '</ul></div>';
      h += '<div class="card"><h3>' + L('Ativar as notícias portuguesas', 'Enable Portuguese news') + '</h3>' + md(NEWS_SETUP_MD, 'nws') + '<label class="field"><span>' + L('Endereço do resumo (opcional: em branco, a app descobre-o sozinha no GitHub)', 'Digest address (optional: if left blank, the app finds it on GitHub by itself)') + '</span><input id="nurl" type="url" placeholder="' + L('https://raw.githubusercontent.com/conta/repositorio/noticias/noticias.json', 'https://raw.githubusercontent.com/account/repository/noticias/noticias.json') + '" value="' + esc(custom) + '"></label><div class="btnrow"><button class="btn" id="nsave">' + L('Guardar endereço', 'Save address') + '</button><button class="btn danger" id="nclear">' + L('Apagar notícias guardadas', 'Delete saved news') + '</button></div><p class="small muted">' + L('Endereço automático: ', 'Automatic address: ') + esc(nwAggCandidates(true).join(L(' ou ', ' or ')) || L('nenhum, porque a app não está a ser aberta a partir de um site', 'none, because the app is not being opened from a website')) + '.</p></div>';
      h += '<div class="card"><h3>' + L('Privacidade', 'Privacy') + '</h3><p class="small">' + L('Ao atualizar, o telemóvel liga-se diretamente a cada fonte, como o browser faz ao abrir esses sites: elas veem o endereço IP e mais nada. A app não envia nomes, localização nem dados da família, e não tem servidores próprios.', 'When refreshing, the phone connects directly to each source, as the browser does when opening those sites: they see the IP address and nothing else. The app does not send names, location or family data, and has no servers of its own.') + '</p></div>';
      body.innerHTML = h;
      $('#nsave', body).onclick = () => { const v = $('#nurl', body).value.trim(); if (v && !nwUrl(v, location.href)) return toast(L('Endereço inválido', 'Invalid address')); LS.set('newsFeedUrl', v); toast(v ? L('Endereço guardado', 'Address saved') : L('A usar o endereço automático', 'Using the automatic address')); refresh(); };
      $('#nclear', body).onclick = () => { if (!confirm(L('Apagar as notícias guardadas neste dispositivo?', 'Delete the news saved on this device?'))) return; cache = {}; LS.del('newsCache'); LS.del('newsLast'); drawStatus(); tabFontes(); };
    };
    const tabVideo = () => {
      const agg = cache.agg && cache.agg.data, vids = (agg && agg.videos) || [], nomes = {};
      ((agg && agg.fontesVideo) || []).forEach(x => { if (x.id) nomes[x.id] = x.nome; });
      const mCh = /channel=([\w-]+)/.exec(playing), mV = /\/embed\/([\w-]{11})\?/.exec(playing), ext = mCh ? 'https://www.youtube.com/channel/' + mCh[1] + '/live' : mV ? 'https://www.youtube.com/watch?v=' + mV[1] : '';
      const player = playing ? '<div class="vwrap"><iframe src="' + esc(playing) + '" title="' + L('Vídeo', 'Video') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="btnrow"><button class="btn sm" id="vstop">' + L('■ Fechar o vídeo', '■ Close the video') + '</button>' + (ext ? lnk(ext, L('Abrir no YouTube', 'Open in YouTube'), 'btn sm') : '') + '</div>' : '';
      let h = '<div class="card"><h3>' + L('🔴 Em direto', '🔴 Live') + '</h3>' + player + '<p class="small muted">' + (navigator.onLine ? L('Os vídeos só carregam quando tocas e gastam dados: com rede móvel, uma hora de vídeo pode gastar entre 300 MB e 1 GB. ', 'Videos only load when you tap them and they use data: on mobile data, an hour of video can use between 300 MB and 1 GB. ') : L('Sem ligação: os vídeos precisam de internet. ', 'Offline: videos need internet. ')) + L('Se um canal não estiver em direto, o YouTube mostra um aviso.', 'If a channel is not live, YouTube shows a notice.') + (location.protocol === 'file:' ? L(' Com a app aberta como ficheiro, o YouTube pode recusar os vídeos aqui: usa «Abrir no YouTube».', ' With the app opened as a file, YouTube may refuse the videos here: use “Open in YouTube”.') : '') + '</p><ul class="nlist">' +
        NEWS_LIVE.map((c, i) => '<li><strong>' + esc(c.nome) + '</strong> <span class="badge">' + (c.lingua === 'pt' ? L('português', 'Portuguese') : L('inglês', 'English')) + '</span><div class="btnrow" style="margin:.35em 0 0">' + (c.canal ? '<button class="btn sm primary" data-live="' + i + '">' + L('▶ Ver aqui', '▶ Watch here') + '</button>' : '') + (c.site ? lnk(c.site, L('Direto no site', 'Live on the website'), 'btn sm') : '') + (c.canal ? lnk('https://www.youtube.com/channel/' + c.canal + '/live', L('Abrir no YouTube', 'Open in YouTube'), 'btn sm') : '') + '</div></li>').join('') + '</ul></div>';
      h += '<div class="card"><h3>' + L('🎬 Vídeos recentes', '🎬 Recent videos') + '</h3>';
      if (!vids.length) h += '<p class="muted">' + (agg ? L('O resumo de notícias ainda não tem vídeos: atualiza o ficheiro tools/noticias.mjs no GitHub. ', 'The news digest has no videos yet: update the file tools/noticias.mjs on GitHub. ') : L('Os vídeos recentes vêm do resumo de notícias. ', 'Recent videos come from the news digest. ')) + '<button class="btn sm" data-goto="fontes">' + L('Como ativar', 'How to enable') + '</button></p>';
      else h += '<p class="small muted">' + L('Das últimas 72 horas. As miniaturas vêm do YouTube.', 'From the last 72 hours. The thumbnails come from YouTube.') + '</p><div class="vgrid">' + vids.slice(0, 40).map((x, i) => '<button class="vcard" data-vid="' + i + '"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + esc(x.v) + '/mqdefault.jpg"><span class="vt">' + esc(x.t) + '</span><span class="nmeta">' + esc(nomes[x.f] || x.f) + ' · ' + esc(nwAgo(x.d)) + '</span></button>').join('') + '</div>';
      body.innerHTML = h + '</div>';
      const play = url => { if (!navigator.onLine) return toast(L('Sem ligação à internet', 'No internet connection')); playing = url; tabVideo(); const v = $('.vwrap', body); if (v) v.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
      $$('[data-live]', body).forEach(b => b.onclick = () => play('https://www.youtube-nocookie.com/embed/live_stream?channel=' + NEWS_LIVE[+b.dataset.live].canal + '&autoplay=1'));
      $$('[data-vid]', body).forEach(b => b.onclick = () => play('https://www.youtube-nocookie.com/embed/' + vids[+b.dataset.vid].v + '?autoplay=1&rel=0'));
      const vs = $('#vstop', body); if (vs) vs.onclick = () => { playing = ''; tabVideo(); };
      $$('[data-goto]', body).forEach(b => b.onclick = () => setTab(b.dataset.goto));
    };
    const drawTab = () => { $$('[data-tab]', $('#ntabs', el)).forEach(b => b.classList.toggle('primary', b.dataset.tab === tab)); ({ pt: tabPT, mundo: tabMundo, noticias: tabNews, video: tabVideo, resumo: tabResumo, fontes: tabFontes }[tab] || tabPT)(); };
    const setTab = t => { tab = t; LS.set('newsTab', t); shown = 60; playing = ''; drawTab(); };
    const refresh = async () => {
      if (busy || !alive) return;
      if (!navigator.onLine) { drawStatus(); toast(L('Sem ligação: a mostrar a última versão guardada', 'Offline: showing the last saved version')); return; }
      busy = true; drawStatus();
      await Promise.allSettled(NW_SRC.map(async s => {
        try { const data = await s.load(); cache[s.id] = { ts: Date.now(), data }; }
        catch (err) { const old = cache[s.id] || {}; cache[s.id] = { ts: old.ts || 0, data: old.data, err: String((err && err.message) || err).slice(0, 80), off: !!(err && err.off) }; }
      }));
      busy = false; LS.set('newsCache', cache); LS.set('newsLast', Date.now());
      if (alive) { drawStatus(); if (!(tab === 'video' && playing)) drawTab(); }
    };
    au.checked = LS.get('newsAuto', true) !== false; au.onchange = () => LS.set('newsAuto', au.checked);
    $('#nrf', el).onclick = refresh;
    $$('[data-tab]', $('#ntabs', el)).forEach(b => b.onclick = () => setTab(b.dataset.tab));
    const onNet = () => { drawStatus(); if (navigator.onLine && Date.now() - LS.get('newsLast', 0) > 5 * 6e4) refresh(); };
    window.addEventListener('online', onNet); window.addEventListener('offline', onNet);
    const timer = setInterval(() => { if (!alive) return; drawStatus(); if (au.checked && navigator.onLine && document.visibilityState === 'visible' && Date.now() - LS.get('newsLast', 0) > 15 * 6e4) refresh(); }, 60000);
    drawStatus(); drawTab();
    if (navigator.onLine && Date.now() - LS.get('newsLast', 0) > 5 * 6e4) refresh();
    return () => { alive = false; clearInterval(timer); window.removeEventListener('online', onNet); window.removeEventListener('offline', onNet); };
  } });
/* --- Mapas --- */
const MAP_ROAD_CLS = { motorway: 1, motorway_link: 1, trunk: 1, trunk_link: 1, primary: 2, primary_link: 2, secondary: 2, secondary_link: 2, tertiary: 3, tertiary_link: 3, unclassified: 3, residential: 4, living_street: 4, service: 4, pedestrian: 4, track: 5, path: 5, footway: 5, steps: 5, cycleway: 5 };
const MAP_POI = { hospital: ['🏥', 'Hospital'], clinic: ['🩺', L('Centro de saúde ou clínica', 'Health centre or clinic')], doctors: ['🩺', L('Médico', 'Doctor')], pharmacy: ['💊', L('Farmácia', 'Pharmacy')], defibrillator: ['❤️', L('Desfibrilhador (DAE)', 'Defibrillator (AED)')], fire_station: ['🚒', L('Bombeiros', 'Fire station (bombeiros)')], police: ['👮', L('Polícia', 'Police')], townhall: ['🏛️', L('Câmara ou junta', 'Town hall or parish council')], drinking_water: ['🚰', L('Água potável', 'Drinking water')], water_point: ['🚰', L('Ponto de água', 'Water point')], shelter: ['⛺', L('Abrigo', 'Shelter')], assembly_point: ['🟩', L('Ponto de encontro', 'Meeting point')], supermarket: ['🛒', L('Supermercado', 'Supermarket')], fuel: ['⛽', L('Combustível', 'Fuel')] };
const MAP_POI_GROUPS = [['saude', L('🏥 Saúde', '🏥 Health'), ['hospital', 'clinic', 'doctors', 'pharmacy', 'defibrillator']], ['socorro', L('🚒 Socorro', '🚒 Emergency services'), ['fire_station', 'police', 'townhall']], ['agua', L('🚰 Água e abrigo', '🚰 Water and shelter'), ['drinking_water', 'water_point', 'shelter', 'assembly_point']], ['bens', L('🛒 Abastecimento', '🛒 Supplies'), ['supermarket', 'fuel']]];
const MAP_ISLANDS = [['Flores', -31.2, 39.44], ['Corvo', -31.1, 39.71], ['Faial', -28.7, 38.58], ['Pico', -28.33, 38.47], ['São Jorge', -28.05, 38.65], ['Graciosa', -28.0, 39.06], ['Terceira', -27.22, 38.73], ['São Miguel', -25.5, 37.79], ['Santa Maria', -25.1, 36.97], ['Madeira', -16.95, 32.76], ['Porto Santo', -16.34, 33.07], ['Desertas', -16.52, 32.52]];
const MAP_AREA_NAME = { MAD: 'Madeira', MPS: 'Porto Santo', AOC: L('Açores, grupo ocidental', 'Azores, western group'), ACE: L('Açores, grupo central', 'Azores, central group'), AOR: L('Açores, grupo oriental', 'Azores, eastern group') };
const MAP_OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const MAP_OSM_A = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>';
// Fundos com quadrículas: precisam de internet e não se descarregam em bloco, porque as regras destes serviços não o permitem.
const MAP_TILES = {
  osm: { nome: L('mapa detalhado (OpenStreetMap)', 'detailed map (OpenStreetMap)'), url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', max: 19, ref: true, attr: MAP_OSM_A },
  hot: { nome: L('mapa humanitário', 'humanitarian map'), url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', sub: 'abc', max: 19, attr: MAP_OSM_A + L(' · estilo <a href="https://www.hotosm.org/" target="_blank" rel="noopener noreferrer">HOT</a>, alojado pela <a href="https://www.openstreetmap.fr/" target="_blank" rel="noopener noreferrer">OpenStreetMap France</a>', ' · style <a href="https://www.hotosm.org/" target="_blank" rel="noopener noreferrer">HOT</a>, hosted by <a href="https://www.openstreetmap.fr/" target="_blank" rel="noopener noreferrer">OpenStreetMap France</a>') },
  topo: { nome: L('relevo e trilhos', 'terrain and trails'), url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', sub: 'abc', max: 17, attr: MAP_OSM_A + ' · SRTM · © <a href="https://opentopomap.org/about" target="_blank" rel="noopener noreferrer">OpenTopoMap</a> (CC-BY-SA)' }
};
function mapLinks(lat, lon) { const ll = lat.toFixed(5) + ',' + lon.toFixed(5), a = (u, t) => '<a class="btn sm" href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>'; return a('https://www.google.com/maps/search/?api=1&amp;query=' + ll, L('🌐 Abrir no Google Maps', '🌐 Open in Google Maps')) + a('https://maps.apple.com/?ll=' + ll + '&amp;q=' + ll, L('🗺️ Abrir no Apple Maps', '🗺️ Open in Apple Maps')) + a('https://www.google.com/maps/dir/?api=1&amp;destination=' + ll, L('🧭 Como chegar', '🧭 Directions')); }
const MAP_DIRS = EN ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] : ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
let MAP_DEC = null;
function mapDecodeFlat(f, div) { const out = new Float64Array(f.length - (f.length % 2)); let x = 0, y = 0; for (let i = 0; i + 1 < f.length; i += 2) { x += f[i]; y += f[i + 1]; out[i] = x / div; out[i + 1] = y / div; } return out; }
function mapBBox(arrs) { let w = 999, s = 999, e = -999, n = -999; arrs.forEach(a => { for (let i = 0; i + 1 < a.length; i += 2) { if (a[i] < w) w = a[i]; if (a[i] > e) e = a[i]; if (a[i + 1] < s) s = a[i + 1]; if (a[i + 1] > n) n = a[i + 1]; } }); return [w, s, e, n]; }
function mapBase() {
  if (MAP_DEC) return MAP_DEC;
  if (typeof MAPA_BASE === 'undefined') return null;
  const B = MAPA_BASE;
  MAP_DEC = {
    vistas: B.vistas,
    land: B.distritos.map(d => { const r = d.r.map(x => mapDecodeFlat(x, 1000)); return { d: d.d, a: d.a || '', r, bb: mapBBox(r) }; }),
    viz: (B.vizinhos || []).map(x => mapDecodeFlat(x, 1000)),
    roads: B.estradas.map(x => { const p = mapDecodeFlat(x.p, 1000); return { t: x.t, p, bb: mapBBox([p]) }; }),
    rios: B.rios.map(x => { const p = mapDecodeFlat(x.p, 1000); return { p, bb: mapBBox([p]) }; }),
    cidades: B.cidades.map(c => ({ n: c[0], lon: c[1] / 1000, lat: c[2] / 1000, r: c[3] })),
    mundo: (B.mundo || []).map(x => mapDecodeFlat(x, 100)),
    paises: (B.paises || []).map(p => ({ n: (EN && typeof MAPA_PAISES_EN !== 'undefined' && MAPA_PAISES_EN[p[0]]) || p[0], lon: p[1] / 100, lat: p[2] / 100, k: String(p[3] || '').split('|') }))
  };
  return MAP_DEC;
}
// Projeção de Mercator, a mesma dos mapas da web, para os desenhos coincidirem com as quadrículas do fundo.
function mercY(lat) { const l = Math.max(-85.05, Math.min(85.05, lat)) * Math.PI / 180; return Math.log(Math.tan(Math.PI / 4 + l / 2)); }
function mapProj(bb) { const R = Math.PI / 180, X0 = bb[0] * R, Y0 = mercY(bb[3]), W = 1000, S = W / ((bb[2] - bb[0]) * R), H = (Y0 - mercY(bb[1])) * S; return { bb, W, H, S, X0, Y0, x: lon => (lon * R - X0) * S, y: lat => (Y0 - mercY(lat)) * S, lon: x => (x / S + X0) / R, lat: y => (2 * Math.atan(Math.exp(Y0 - y / S)) - Math.PI / 2) / R, m: lat => S / (6378137 * Math.cos(lat * R)) }; }
function mapPath(a, P, close) { if (!a || a.length < 4) return ''; let d = 'M' + P.x(a[0]).toFixed(1) + ' ' + P.y(a[1]).toFixed(1); for (let i = 2; i + 1 < a.length; i += 2) d += 'L' + P.x(a[i]).toFixed(1) + ' ' + P.y(a[i + 1]).toFixed(1); return d + (close ? 'Z' : ''); }
function mapHit(bb, vb) { return !(bb[2] < vb[0] || bb[0] > vb[2] || bb[3] < vb[1] || bb[1] > vb[3]); }
const mapsGet = id => idb().then(db => new Promise((res, rej) => { const q = db.transaction('mapas', 'readonly').objectStore('mapas').get(id); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }));
const mapsPut = rec => idb().then(db => new Promise((res, rej) => { const t = db.transaction('mapas', 'readwrite'); t.objectStore('mapas').put(rec); t.oncomplete = res; t.onerror = () => rej(t.error); t.onabort = () => rej(t.error || new Error(L('sem espaço', 'not enough storage space'))); }));
const mapsDel = id => idb().then(db => new Promise((res, rej) => { const t = db.transaction('mapas', 'readwrite'); t.objectStore('mapas').delete(id); t.oncomplete = res; t.onerror = () => rej(t.error); }));
async function mapDownload(lat, lon, km, pedonal, onStatus) {
  const dLat = km / 111.32, dLon = km / (111.32 * Math.cos(lat * Math.PI / 180));
  const bb = [lon - dLon, lat - dLat, lon + dLon, lat + dLat], B = [bb[1], bb[0], bb[3], bb[2]].map(v => v.toFixed(5)).join(',');
  const hw = 'motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|service|pedestrian|track|path' + (pedonal ? '|footway|steps|cycleway' : '');
  const q = '[out:json][timeout:90];(way["highway"~"^(' + hw + ')$"](' + B + ');way["railway"~"^(rail|light_rail|subway|tram)$"](' + B + ');way["waterway"~"^(river|canal)$"](' + B + '););out geom qt;(nwr["amenity"~"^(hospital|clinic|doctors|pharmacy|fire_station|police|drinking_water|water_point|shelter|fuel|townhall)$"](' + B + ');nwr["emergency"~"^(assembly_point|defibrillator)$"](' + B + ');nwr["shop"="supermarket"](' + B + '););out center tags qt;';
  let lastErr = null;
  for (const ep of MAP_OVERPASS) {
    const c = new AbortController(), tm = setTimeout(() => c.abort(), 150000);
    try {
      if (onStatus) onStatus(L('A pedir os dados ao OpenStreetMap (' + new URL(ep).hostname + '). Pode demorar até um minuto…', 'Requesting the data from OpenStreetMap (' + new URL(ep).hostname + '). This can take up to a minute…'));
      const r = await fetch(ep, { method: 'POST', body: new URLSearchParams({ data: q }), signal: c.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (r.status === 429 || r.status === 504) throw new Error(L('servidor ocupado (HTTP ' + r.status + ')', 'server busy (HTTP ' + r.status + ')'));
      if (!r.ok) throw new Error('HTTP ' + r.status);
      if (onStatus) onStatus(L('A preparar o mapa…', 'Preparing the map…'));
      const d = await r.json();
      if (d && d.remark && /runtime error|timed out|out of memory/i.test(d.remark)) throw new Error(L('zona grande demais para o servidor', 'area too large for the server'));
      return mapParse(d, bb, km);
    } catch (e) {
      const err = e && e.name === 'AbortError' ? new Error(L('o servidor não respondeu', 'the server did not respond')) : e instanceof TypeError ? new Error(L('servidor indisponível ou ocupado', 'server unavailable or busy')) : e; if (!lastErr || !/HTTP|grande|too large/.test(lastErr.message)) lastErr = err;
    } finally { clearTimeout(tm); }
  }
  throw lastErr || new Error(L('erro desconhecido', 'unknown error'));
}
function mapParse(d, bb, km) {
  const ruas = [], pois = [];
  ((d && d.elements) || []).forEach(e => {
    const t = e.tags || {};
    if (e.type === 'way' && Array.isArray(e.geometry) && (t.highway || t.railway || t.waterway)) {
      const cls = t.railway ? 6 : t.waterway ? 7 : MAP_ROAD_CLS[t.highway]; if (!cls) return;
      const g = e.geometry.filter(p => p && isFinite(p.lat) && isFinite(p.lon)); if (g.length < 2) return;
      let px = Math.round(g[0].lon * 1e5), py = Math.round(g[0].lat * 1e5); const flat = [px, py];
      for (let i = 1; i < g.length; i++) { const x = Math.round(g[i].lon * 1e5), y = Math.round(g[i].lat * 1e5); if (x === px && y === py) continue; flat.push(x - px, y - py); px = x; py = y; }
      if (flat.length >= 4) ruas.push([cls, cls <= 4 ? String(t.name || '').slice(0, 60) : '', flat]);
      return;
    }
    const k = t.emergency === 'assembly_point' ? 'assembly_point' : t.emergency === 'defibrillator' ? 'defibrillator' : t.shop === 'supermarket' ? 'supermarket' : (MAP_POI[t.amenity] ? t.amenity : '');
    if (!k || (k === 'shelter' && /public_transport|picnic/.test(t.shelter_type || ''))) return;
    const la = e.lat != null ? e.lat : (e.center && e.center.lat), lo = e.lon != null ? e.lon : (e.center && e.center.lon);
    if (!isFinite(la) || !isFinite(lo)) return;
    pois.push([k, String(t.name || t.operator || '').slice(0, 80), Math.round(la * 1e5), Math.round(lo * 1e5), [t['addr:street'], t['addr:housenumber']].filter(Boolean).join(' ').slice(0, 80), String(t.phone || t['contact:phone'] || '').slice(0, 40), String(t.opening_hours || '').slice(0, 80)]);
  });
  if (!ruas.length && !pois.length) throw new Error(L('o OpenStreetMap não devolveu dados para esta zona', 'OpenStreetMap returned no data for this area'));
  return { bb, km, ruas, pois, osm: (d.osm3s && d.osm3s.timestamp_osm_base) || '' };
}
TOOLS.push({ id: 'mapa', section: 'ferramentas', icon: '🗺️', title: L('Mapas', 'Maps'), desc: L('Com internet, mapa detalhado com ruas e nomes, e o Google Maps no mesmo sítio. Por cima ficam a tua posição, os pontos guardados, as cores dos avisos e os eventos no mundo. Sem rede, o mapa de Portugal e as zonas guardadas continuam a funcionar.', 'With internet, a detailed map with streets and names, and Google Maps in the same place. On top of it are your position, saved points, warning colours and events around the world. Offline, the map of Portugal and saved areas keep working.'),
  render(el) {
    const base = mapBase();
    if (!base) { el.innerHTML = '<p class="muted">' + L('Esta versão da app não tem o mapa-base.', 'This version of the app does not have the base map.') + '</p>'; return; }
    let vista = String(LS.get('mapaVista', 'continente')), camada = LS.get('mapaCamada', 'avisos'), filtro = LS.get('mapaFiltro', ''), pins = LS.get('waypoints', []), fundo = String(LS.get('mapaFundo', location.protocol === 'file:' ? 'hot' : 'osm'));
    // O servidor do OpenStreetMap exige saber de que site vem o pedido, o que não acontece com a app aberta como ficheiro.
    if (fundo !== 'nenhum' && (!MAP_TILES[fundo] || (MAP_TILES[fundo].ref && location.protocol === 'file:'))) fundo = location.protocol === 'file:' ? 'hot' : 'osm';
    let evOn = LS.get('mapaEventos', true) !== false, evs = [], evInv = [];
    let area = null, P = mapProj(base.vistas.continente), cw = 0, ch = 0, s0 = 1, view = { s: 1, tx: 0, ty: 0 }, gps = null, watch = null, seguir = false, sel = null, raf = 0, alive = true, lastW = 0, lastNear = 0;
    el.innerHTML = '<div class="fambar" id="mviews"></div><div class="mapbox" id="mbox"><div class="mtiles" id="mtiles"></div><svg id="msvg" xmlns="http://www.w3.org/2000/svg"><g id="mg"></g><g id="ml"></g></svg><div class="mctl"><button class="btn sm" id="mzi" title="' + L('Aproximar', 'Zoom in') + '">＋</button><button class="btn sm" id="mzo" title="' + L('Afastar', 'Zoom out') + '">－</button><button class="btn sm" id="mfit" title="' + L('Ver o mapa todo', 'Show the whole map') + '">⤢</button></div><div class="mattr" id="mattr"></div><div class="mgoogle hidden" id="mgoogle"></div></div>' +
      '<div class="btnrow"><button class="btn" id="mgps">' + L('📍 Onde estou', '📍 Where am I') + '</button><button class="btn hidden" id="mctr">' + L('🎯 Centrar em mim', '🎯 Centre on me') + '</button><button class="btn" id="mgm">🌐 Google Maps</button><select id="mfundo" style="width:auto">' + Object.keys(MAP_TILES).filter(k => !MAP_TILES[k].ref || location.protocol !== 'file:').map(k => '<option value="' + k + '">' + L('Fundo: ', 'Background: ') + MAP_TILES[k].nome + '</option>').join('') + '<option value="nenhum">' + L('Fundo: só o mapa da app', 'Background: app map only') + '</option></select><select id="mlayer" style="width:auto"><option value="avisos">' + L('Cores: avisos do IPMA', 'Colours: IPMA weather warnings') + '</option><option value="incendio">' + L('Cores: risco de incêndio', 'Colours: fire danger') + '</option><option value="nenhuma">' + L('Sem cores', 'No colours') + '</option></select><label class="btn sm"><input type="checkbox" id="mev" style="width:1.1em;height:1.1em"> ' + L('🚨 Eventos', '🚨 Events') + '</label><button class="btn sm" id="mevup">' + L('🔄 Atualizar alertas', '🔄 Update alerts') + '</button></div><div id="minfo"></div><div id="mdl"></div><div id="mextra"></div>';
    const svg = $('#msvg', el), gEl = $('#mg', el), lEl = $('#ml', el), box = $('#mbox', el), tl = $('#mtiles', el), gm = $('#mgoogle', el);
    $('#mlayer', el).value = camada; $('#mfundo', el).value = fundo;
    const f1 = v => v.toFixed(1);
    // Fundo detalhado: quadrículas de 256 px por baixo dos desenhos da app. Onde não carregam (sem rede), fica o mapa guardado na app.
    const tiles = new Map(); let tilesOk = false, baseAttr = '';
    const tileSrc = () => MAP_TILES[fundo] || null;
    const setAttr = () => { const src = tileSrc(); $('#mattr', el).innerHTML = src ? src.attr : baseAttr; };
    const drawTiles = () => {
      const src = tileSrc();
      if (!src || !cw) { if (tiles.size) { tl.textContent = ''; tiles.clear(); } if (tilesOk) { tilesOk = false; box.classList.remove('tiles-ok'); } return; }
      const k0 = P.S * view.s, Wpx = 2 * Math.PI * k0, ox = view.tx - (Math.PI + P.X0) * k0, oy = view.ty + (P.Y0 - Math.PI) * k0;
      const z = Math.max(0, Math.min(src.max, Math.round(Math.log2(Wpx / 256)))), n = 2 ** z, T = Wpx / n;
      box.classList.toggle('perto', z >= 12);
      const x0 = Math.max(0, Math.floor(-ox / T)), x1 = Math.min(n - 1, Math.floor((cw - ox) / T)), y0 = Math.max(0, Math.floor(-oy / T)), y1 = Math.min(n - 1, Math.floor((ch - oy) / T));
      const need = new Set(); let total = 0, ready = 0;
      if (x1 >= x0 && y1 >= y0 && (x1 - x0 + 1) * (y1 - y0 + 1) <= 300) for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) {
        const k = fundo + '/' + z + '/' + x + '/' + y; let t = tiles.get(k);
        if (t && t.err && navigator.onLine && Date.now() - t.err > 15000) { t.im.remove(); tiles.delete(k); t = null; }
        if (!t) {
          const im = new Image(), rec = { z, x, y, im, ok: false, err: 0 };
          im.alt = ''; im.draggable = false; im.decoding = 'async'; im.crossOrigin = 'anonymous'; im.style.visibility = 'hidden';
          im.onload = () => { rec.ok = true; rec.err = 0; im.style.visibility = ''; sched(); };
          im.onerror = () => { rec.err = Date.now(); sched(); };
          im.src = src.url.replace('{s}', src.sub ? src.sub[(x + y) % src.sub.length] : '').replace('{z}', z).replace('{x}', x).replace('{y}', y);
          tl.appendChild(im); tiles.set(k, rec); t = rec;
        }
        need.add(k); total++; if (t.ok) ready++;
      }
      tiles.forEach((t, k) => {
        const Tz = Wpx / 2 ** t.z, L = ox + t.x * Tz, Tp = oy + t.y * Tz, cur = need.has(k);
        if (!cur && (ready === total || !t.ok || k.indexOf(fundo + '/') !== 0 || Math.abs(t.z - z) > 4 || L > cw || Tp > ch || L + Tz < 0 || Tp + Tz < 0)) { t.im.remove(); tiles.delete(k); return; }
        const st = t.im.style; st.transform = 'translate(' + L.toFixed(1) + 'px,' + Tp.toFixed(1) + 'px)'; st.width = st.height = (Tz + 0.5).toFixed(1) + 'px'; st.zIndex = cur ? '2' : '1';
      });
      const okNow = total > 0 && ready >= total * 0.75;
      if (okNow !== tilesOk) { tilesOk = okNow; box.classList.toggle('tiles-ok', okNow); }
    };
    const grpOf = k => (MAP_POI_GROUPS.find(g => g[0] === k) || ['', '', []])[2];
    const toScr = (lon, lat) => [P.x(lon) * view.s + view.tx, P.y(lat) * view.s + view.ty];
    const inView = (lon, lat) => lon >= P.bb[0] && lon <= P.bb[2] && lat >= P.bb[1] && lat <= P.bb[3];
    const sched = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (!alive) return; gEl.setAttribute('transform', 'translate(' + f1(view.tx) + ' ' + f1(view.ty) + ') scale(' + view.s.toFixed(5) + ')'); drawTiles(); drawLabels(); }); };
    const apply = () => sched();
    const fit = () => { cw = box.clientWidth || 360; ch = box.clientHeight || 480; lastW = cw; svg.setAttribute('viewBox', '0 0 ' + cw + ' ' + ch); s0 = Math.min(cw / P.W, ch / P.H) * 0.94; view = { s: s0, tx: (cw - P.W * s0) / 2, ty: (ch - P.H * s0) / 2 }; apply(); };
    const maxS = () => Math.max(s0 * (area ? 30 : 80), tileSrc() ? 256 * 2 ** 19.5 / (2 * Math.PI * P.S) : 0);
    const zoomAt = (x, y, f) => { const ns = Math.max(s0 * 0.5, Math.min(maxS(), view.s * f)); view.tx = x - (x - view.tx) * (ns / view.s); view.ty = y - (y - view.ty) * (ns / view.s); view.s = ns; apply(); };
    const centerOn = (lon, lat, s) => { if (s) view.s = Math.min(maxS(), s); view.tx = cw / 2 - P.x(lon) * view.s; view.ty = ch / 2 - P.y(lat) * view.s; apply(); };
    const fills = () => {
      const out = {}, nc = LS.get('newsCache', {}) || {};
      if (camada === 'avisos' && nc.ipma && nc.ipma.data) {
        const now = Date.now(), lv = {};
        nc.ipma.data.forEach(x => { if (x.fim && x.fim < now) return; const l = (IPMA_LV[x.lv] || [0, 0, 0])[2]; if (l > (lv[x.a] || 0)) lv[x.a] = l; });
        Object.keys(AREA_DICO).forEach(k => { if (lv[k]) out[AREA_DICO[k]] = 'm-lv' + lv[k]; });
        ['AOC', 'ACE', 'AOR', 'MPS'].forEach(k => { if (lv[k]) out[k] = 'm-lv' + lv[k]; });
        const m = Math.max(lv.MCN || 0, lv.MCS || 0, lv.MRM || 0); if (m) out.MAD = 'm-lv' + m;
      } else if (camada === 'incendio' && nc.rcm && nc.rcm.data) { const by = nc.rcm.data.by || {}; Object.keys(by).forEach(k => { out[k] = 'm-r' + by[k].max; }); }
      return out;
    };
    const whoPlaces = title => {
      const part = String(title || '').split(/\s[-–—]\s/).slice(1).join(' '); if (!part) return [];
      const out = [];
      part.split(/\s*(?:,|&|\band\b)\s*/i).map(x => x.trim().toLowerCase().replace(/^the /, '')).filter(Boolean).forEach(nm => {
        const alt = nm.replace(/\s*\(.*\)\s*$/, '').replace(/^(kingdom|republic|state|federal republic|islamic republic|people's republic|united republic|plurinational state|bolivarian republic) of (the )?/, '');
        const c = base.paises.find(p => p.k.indexOf(nm) >= 0) || base.paises.find(p => p.k.indexOf(alt) >= 0);
        if (c && out.indexOf(c) < 0) out.push(c);
      });
      return out;
    };
    const events = () => {
      const nc = LS.get('newsCache', {}) || {}, out = [];
      ((nc.gdacs && nc.gdacs.data) || []).forEach(x => { if (!isFinite(x.la) || !isFinite(x.lo)) return; const ty = GDACS_T[x.tipo] || [x.tipo, '⚠️']; out.push({ k: 'g', lo: x.lo, la: x.la, red: x.lv === 'Red', ic: ty[1], t: ty[0] + (x.pais ? ' · ' + x.pais : ''), sub: L((x.lv === 'Red' ? 'Alerta vermelho' : 'Alerta laranja') + ' do GDACS · ', 'GDACS ' + (x.lv === 'Red' ? 'red' : 'orange') + ' alert · ') + nwShortDay(x.de) + (x.ate && x.ate !== x.de ? L(' a ', ' to ') + nwShortDay(x.ate) : '') + (x.sev ? ' · ' + x.sev : ''), u: x.u }); });
      ((nc.usgs && nc.usgs.data) || []).forEach(x => { if (!isFinite(x.la) || !isFinite(x.lo)) return; out.push({ k: 'q', lo: x.lo, la: x.la, m: x.m, t: L('Sismo de magnitude ' + nf(x.m), 'Magnitude ' + nf(x.m) + ' earthquake'), sub: x.lugar + ' · ' + nwWhen(x.t) + ' · USGS', u: x.u }); });
      ((nc.emsc && nc.emsc.data) || []).forEach(x => { if (!isFinite(x.la) || !isFinite(x.lo)) return; out.push({ k: 'e', lo: x.lo, la: x.la, m: x.m, t: L('Sismo de magnitude ' + nf(x.m), 'Magnitude ' + nf(x.m) + ' earthquake'), sub: x.reg + ' · ' + nwWhen(x.t) + ' · ' + x.km + L(' km de profundidade · EMSC', ' km deep · EMSC'), u: x.u }); });
      ((nc.oms && nc.oms.data) || []).slice(0, 8).forEach(x => { whoPlaces(x.t).forEach(c => out.push({ k: 'o', lo: c.lon, la: c.lat, m: 0, t: x.t, sub: L('Surto de doença · ' + c.n + ' · OMS, ' + nwWhen(x.d), 'Disease outbreak · ' + c.n + ' · WHO, ' + nwWhen(x.d)), u: x.u })); });
      return out;
    };
    const drawBase = () => {
      const vb = base.vistas[vista]; P = mapProj(vb); const fl = fills(); let g = '';
      if (vista === 'mundo') { gEl.innerHTML = '<path class="m-land m-world" d="' + base.mundo.map(r => mapPath(r, P, true)).join('') + '"/>'; baseAttr = 'Natural Earth'; setAttr(); return; }
      if (vista === 'continente' && base.viz.length) g += '<path class="m-es" d="' + base.viz.map(r => mapPath(r, P, true)).join('') + '"/>';
      base.land.forEach(f => { if (mapHit(f.bb, vb)) g += '<path class="m-land ' + (fl[f.a || f.d] || '') + '" data-f="' + (f.a || f.d) + '" d="' + f.r.map(r => mapPath(r, P, true)).join('') + '"/>'; });
      g += '<path class="m-rio" d="' + base.rios.filter(x => mapHit(x.bb, vb)).map(x => mapPath(x.p, P)).join('') + '"/>';
      [2, 1].forEach(t => { g += '<path class="m-e' + t + '" d="' + base.roads.filter(x => x.t === t && mapHit(x.bb, vb)).map(x => mapPath(x.p, P)).join('') + '"/>'; });
      gEl.innerHTML = g;
      baseAttr = 'Natural Earth · © OpenStreetMap'; setAttr();
    };
    const drawArea = () => {
      P = mapProj(area.bb); const d = ['', '', '', '', '', '', '', ''];
      area.dec.forEach(r => { d[r.c] += mapPath(r.p, P); });
      gEl.innerHTML = '<path class="r7" d="' + d[7] + '"/><path class="rc" d="' + d[3] + d[4] + '"/><path class="r5" d="' + d[5] + '"/><path class="r4" d="' + d[4] + '"/><path class="r3" d="' + d[3] + '"/><path class="r2" d="' + d[2] + '"/><path class="r1" d="' + d[1] + '"/><path class="r6" d="' + d[6] + '"/><rect class="m-zone" x="0" y="0" width="' + f1(P.W) + '" height="' + f1(P.H) + '"/>';
      baseAttr = MAP_OSM_A; setAttr();
    };
    const drawLabels = () => {
      let h = ''; const z = view.s / s0, ok = (x, y) => x > -80 && y > -40 && x < cw + 80 && y < ch + 40;
      const boxes = [], place = (x, y, w, hh) => { for (const b of boxes) if (Math.abs(b[0] - x) < (b[2] + w) / 2 && Math.abs(b[1] - y) < (b[3] + hh) / 2) return false; boxes.push([x, y, w, hh]); return true; };
      if (!area && vista === 'mundo') {
        if (z > 1.8 && !tilesOk) base.paises.forEach(c => { const p = toScr(c.lon, c.lat); if (ok(p[0], p[1]) && place(p[0], p[1], c.n.length * 6.5, 14)) h += '<text class="m-lbl s" x="' + f1(p[0]) + '" y="' + f1(p[1]) + '" text-anchor="middle">' + esc(c.n) + '</text>'; });
      } else if (!area) {
        const maxR = z > 5 ? 3 : z > 2 ? 2 : 1;
        if (!tilesOk) base.cidades.forEach(c => { if (c.r > maxR) return; const p = toScr(c.lon, c.lat); if (!ok(p[0], p[1])) return; const lw = c.n.length * (c.r === 1 ? 7.5 : 6.8); if (!place(p[0] + 6 + lw / 2, p[1], lw + 8, 16)) return; h += '<circle class="m-dot" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + (c.r === 1 ? 3.5 : 2.5) + '"/><text class="m-lbl' + (c.r === 1 ? ' b' : '') + '" x="' + f1(p[0] + 6) + '" y="' + f1(p[1] + 4) + '">' + esc(c.n) + '</text>'; });
        if (vista !== 'continente' && !tilesOk) MAP_ISLANDS.forEach(i => { const p = toScr(i[1], i[2]); if (ok(p[0], p[1])) h += '<text class="m-lbl i" x="' + f1(p[0]) + '" y="' + f1(p[1] - 12) + '" text-anchor="middle">' + esc(i[0]) + '</text>'; });
      } else {
        const allow = filtro ? grpOf(filtro) : null, vis = area.pois.filter(p => !allow || allow.indexOf(p[0]) >= 0), big = z > 1.6 || vis.length < 150;
        vis.forEach(p => { const q = toScr(p[3] / 1e5, p[2] / 1e5); if (!ok(q[0], q[1])) return; h += big ? '<text class="m-poi" x="' + f1(q[0]) + '" y="' + f1(q[1] + 6) + '" text-anchor="middle">' + MAP_POI[p[0]][0] + '</text>' : '<circle class="m-pdot" cx="' + f1(q[0]) + '" cy="' + f1(q[1]) + '" r="3"/>'; });
      }
      if (evOn) evs.forEach(e => { const p = toScr(e.lo, e.la); if (!ok(p[0], p[1])) return; const X = f1(p[0]), Y = f1(p[1]); if (e.k === 'g') h += '<circle class="ev-g' + (e.red ? ' red' : '') + '" cx="' + X + '" cy="' + Y + '" r="12"/><text class="ev-ic" x="' + X + '" y="' + f1(p[1] + 4.5) + '" text-anchor="middle">' + e.ic + '</text>'; else if (e.k === 'o') h += '<text class="ev-ic o" x="' + X + '" y="' + f1(p[1] + 6) + '" text-anchor="middle">🦠</text>'; else h += '<circle class="ev-' + e.k + '" cx="' + X + '" cy="' + Y + '" r="' + f1(e.k === 'q' ? 3 + Math.max(0, e.m - 4.5) * 3 : 2.5 + Math.max(0, e.m - 2.5) * 2) + '"/>'; });
      pins.forEach(w => { const p = toScr(w.lon, w.lat); if (!ok(p[0], p[1])) return; h += '<text class="m-pin" x="' + f1(p[0]) + '" y="' + f1(p[1]) + '" text-anchor="middle">📌</text><text class="m-lbl s" x="' + f1(p[0]) + '" y="' + f1(p[1] + 14) + '" text-anchor="middle">' + esc(w.name) + '</text>'; });
      if (sel) { const p = toScr(sel.lon, sel.lat); h += '<circle class="m-sel" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="13"/>'; }
      if (gps) { const p = toScr(gps.lon, gps.lat), rr = gps.acc * P.m(gps.lat) * view.s; if (rr > 8 && rr < 5000) h += '<circle class="m-acc" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(rr) + '"/>'; h += '<circle class="m-me" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="7"/>'; }
      lEl.innerHTML = h;
    };
    const areaLabel = f => DISTRITOS[f] || MAP_AREA_NAME[f] || f;
    const areaStatus = f => {
      const nc = LS.get('newsCache', {}) || {}, now = Date.now(); let h = '';
      const codes = Object.keys(AREA_DICO).filter(k => AREA_DICO[k] === f); if (f === 'MAD') codes.push('MCN', 'MCS', 'MRM'); else if (!codes.length) codes.push(f);
      if (nc.ipma && nc.ipma.data) { const ws = nc.ipma.data.filter(x => codes.indexOf(x.a) >= 0 && (!x.fim || x.fim > now)); h += '<p class="small">' + (ws.length ? ws.map(x => '<span class="badge ' + IPMA_LV[x.lv][1] + '">' + IPMA_LV[x.lv][0] + '</span> ' + esc(ipmaTipo(x.tipo)) + L(' até ', ' until ') + esc(nwWhen(x.fim))).join('<br>') : L('Sem avisos do IPMA.', 'No IPMA warnings.')) + ' <span class="muted">' + L('Dados de ', 'Data from ') + esc(nwAgo(nc.ipma.ts)) + '.</span></p>'; }
      if (nc.rcm && nc.rcm.data && nc.rcm.data.by && nc.rcm.data.by[f]) { const o = nc.rcm.data.by[f]; h += '<p class="small">' + L('Risco de incêndio: ', 'Fire danger: ') + '<span class="rcm rcm' + o.max + '">' + o.max + '</span> ' + RCM_LV[o.max] + L(' no concelho mais exposto.', ' in the most exposed municipality.') + '</p>'; }
      return h;
    };
    const drawInfo = () => {
      const ib = $('#minfo', el); if (!sel) { ib.innerHTML = ''; return; }
      let h = '<div class="card">';
      if (sel.ev) { const e = sel.ev; h += '<h3>' + (e.k === 'g' ? e.ic + ' ' : e.k === 'o' ? '🦠 ' : '🌍 ') + esc(e.t) + '</h3><p class="small">' + esc(e.sub) + '</p>' + (e.u ? '<p><a class="btn sm" href="' + esc(e.u) + '" target="_blank" rel="noopener noreferrer">' + L('Ver na fonte', 'See the source') + '</a></p>' : ''); }
      else if (sel.poi) { const p = sel.poi, t = MAP_POI[p[0]]; h += '<h3>' + t[0] + ' ' + esc(p[1] || t[1]) + '</h3><p class="small muted">' + esc(t[1]) + (p[4] ? ' · ' + esc(p[4]) : '') + '</p>' + (p[5] ? '<p><a class="btn sm ok" href="tel:' + esc(p[5].replace(/[^+\d]/g, '')) + '">📞 ' + esc(p[5]) + '</a></p>' : '') + (p[6] ? '<p class="small">' + L('Horário: ', 'Opening hours: ') + esc(p[6]) + '</p>' : ''); }
      else if (sel.pin) h += '<h3>📌 ' + esc(sel.pin.name) + '</h3>';
      else if (sel.rua) h += '<h3>' + esc(sel.rua) + '</h3>';
      else if (sel.f) h += '<h3>' + esc(areaLabel(sel.f)) + '</h3>' + areaStatus(sel.f);
      else h += '<h3>' + L('Ponto no mapa', 'Point on the map') + '</h3>';
      h += '<p class="small mono">' + sel.lat.toFixed(5) + ', ' + sel.lon.toFixed(5) + '</p>';
      if (gps) { const dd = haversine(gps, sel), br = bearing(gps, sel); h += '<p class="small">' + L('A ' + fmtDist(dd) + ' de ti, na direção ', fmtDist(dd) + ' from you, bearing ') + Math.round(br) + '° (' + MAP_DIRS[Math.round(br / 45) % 8] + ').</p>'; }
      const inside = area ? [] : LS.get('mapAreas', []).filter(a => Math.abs(a.lat - sel.lat) < a.km / 111.32 && Math.abs(a.lon - sel.lon) < a.km / (111.32 * Math.cos(a.lat * Math.PI / 180)));
      h += '<div class="btnrow">' + (sel.pin ? '<button class="btn sm danger" id="mpindel">' + L('🗑️ Apagar ponto', '🗑️ Delete point') + '</button>' : '<button class="btn sm" id="mpin">' + L('📌 Guardar ponto', '📌 Save point') + '</button>') + '<button class="btn sm" id="mcopy">' + L('📋 Coordenadas', '📋 Coordinates') + '</button>' + inside.map(a => '<button class="btn sm primary" data-open="' + esc(a.id) + '">' + L('🗺️ Abrir ', '🗺️ Open ') + esc(a.nome) + '</button>').join('') + (!area ? '<button class="btn sm" id="mdlhere">' + L('⬇️ Descarregar esta zona', '⬇️ Download this area') + '</button>' : '') + '<button class="btn sm ghost" id="mclose">' + L('Fechar', 'Close') + '</button></div><div class="btnrow">' + mapLinks(sel.lat, sel.lon) + '</div></div>';
      ib.innerHTML = h;
      const q = id => $('#' + id, ib);
      if (q('mpin')) q('mpin').onclick = () => { const nome = prompt(L('Nome do ponto (ex.: ponto de encontro, casa da avó)', 'Point name (e.g. meeting point, grandma\'s house)'), sel.poi ? (sel.poi[1] || MAP_POI[sel.poi[0]][1]) : (sel.rua || '')); if (nome === null) return; pins = LS.get('waypoints', []); const w = { id: uid(), name: nome.trim().slice(0, 40) || L('Ponto', 'Point'), lat: sel.lat, lon: sel.lon, ts: Date.now() }; pins.unshift(w); LS.set('waypoints', pins); sel = { lat: w.lat, lon: w.lon, pin: w }; toast(L('Ponto guardado', 'Point saved')); sched(); drawInfo(); };
      if (q('mpindel')) q('mpindel').onclick = () => { if (!confirm(L('Apagar este ponto?', 'Delete this point?'))) return; pins = LS.get('waypoints', []).filter(w => w.id !== sel.pin.id); LS.set('waypoints', pins); sel = null; sched(); drawInfo(); };
      q('mcopy').onclick = () => copyText(sel.lat.toFixed(5) + ', ' + sel.lon.toFixed(5));
      if (q('mdlhere')) q('mdlhere').onclick = () => dlForm(sel.lat, sel.lon);
      q('mclose').onclick = () => { sel = null; sched(); drawInfo(); };
      $$('[data-open]', ib).forEach(b => b.onclick = () => openArea(b.dataset.open));
    };
    const guide = EN ? '<div class="card small"><strong>Full maps offline.</strong> The detailed background needs internet' + (location.protocol === 'file:' ? '' : ' and keeps the areas you have already viewed') + '. For streets, addresses and navigation offline, download your area now over Wi-Fi in <strong>Google Maps</strong> or <strong>Apple Maps</strong>, or the whole country in <a href="https://organicmaps.app/" target="_blank" rel="noopener noreferrer">Organic Maps</a>. The “Open in Google Maps” and “Open in Apple Maps” buttons on each point take it there. Step by step in <a href="#/s/navegar/mapa-gps">maps, coordinates and GPS</a>.</div>' : '<div class="card small"><strong>Mapas completos sem rede.</strong> O fundo detalhado precisa de internet' + (location.protocol === 'file:' ? '' : ' e guarda as zonas que já viste') + '. Para teres ruas, moradas e navegação sem rede, descarrega já com Wi-Fi a tua zona no <strong>Google Maps</strong> ou no <strong>Apple Maps</strong>, ou o país inteiro no <a href="https://organicmaps.app/" target="_blank" rel="noopener noreferrer">Organic Maps</a>. Os botões «Abrir no Google Maps» e «Abrir no Apple Maps» de cada ponto levam-no para lá. Passo a passo em <a href="#/s/navegar/mapa-gps">mapas, coordenadas e GPS</a>.</div>';
    const evCard = () => {
      if (!evOn) return '';
      const nc = LS.get('newsCache', {}) || {}, vb = base.vistas[vista] || base.vistas.mundo;
      const ages = ['gdacs', 'usgs', 'emsc', 'oms'].map(k => nc[k] && nc[k].ts).filter(Boolean);
      const rank = e => (e.k === 'g' ? (e.red ? 3000 : 2000) : 0) + (e.k === 'o' ? 1500 : 0) + (e.m || 0) * 100;
      evInv = evs.filter(e => e.lo >= vb[0] && e.lo <= vb[2] && e.la >= vb[1] && e.la <= vb[3]).sort((a, b) => rank(b) - rank(a)).slice(0, 20);
      return '<div class="card small"><strong>' + L('🚨 Eventos no mapa', '🚨 Events on the map') + '</strong> <span class="muted">' + (ages.length ? L('dados de ', 'data from ') + esc(nwAgo(Math.min.apply(null, ages))) : L('ainda sem dados: com internet, carrega em «Atualizar alertas»', 'no data yet: when you have internet, tap “Update alerts”')) + '</span>' +
        '<div class="evleg"><span class="evdot g"></span> ' + L('catástrofe com alerta laranja ou vermelho', 'disaster with an orange or red alert') + ' &nbsp; <span class="evdot q"></span> ' + L('sismo de magnitude 4,5 ou mais', 'earthquake of magnitude 4.5 or more') + ' &nbsp; <span class="evdot e"></span> ' + L('sismo perto de Portugal', 'earthquake near Portugal') + ' &nbsp; 🦠 ' + L('surto de doença', 'disease outbreak') + '</div>' +
        (evInv.length ? '<ul class="list">' + evInv.map((e, i) => '<li><div class="main"><div class="t">' + (e.k === 'g' ? e.ic + ' ' : e.k === 'o' ? '🦠 ' : '🌍 ') + esc(e.t) + '</div><div class="s">' + esc(e.sub) + '</div></div><div class="acts"><button class="btn sm" data-ev="' + i + '">' + L('Ver', 'View') + '</button></div></li>').join('') + '</ul>' : '<p class="muted">' + L('Sem eventos nesta vista.', 'No events in this view.') + (vista !== 'mundo' ? L(' Vê o mapa do mundo.', ' See the world map.') : '') + '</p>') + '</div>';
    };
    const bindEv = ex => $$('[data-ev]', ex).forEach(b => b.onclick = () => { const e = evInv[+b.dataset.ev]; if (!e) return; sel = { lat: e.la, lon: e.lo, ev: e }; seguir = false; centerOn(e.lo, e.la, Math.max(view.s, s0 * (vista === 'mundo' ? 4 : 3))); drawInfo(); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    const drawExtra = () => {
      const ex = $('#mextra', el);
      if (!area) {
        const nc = LS.get('newsCache', {}) || {}, src = camada === 'avisos' ? nc.ipma : camada === 'incendio' ? nc.rcm : null;
        const leg = camada === 'avisos' ? (EN ? '<span class="mleg m-lv1"></span> yellow &nbsp; <span class="mleg m-lv2"></span> orange &nbsp; <span class="mleg m-lv3"></span> red' : '<span class="mleg m-lv1"></span> amarelo &nbsp; <span class="mleg m-lv2"></span> laranja &nbsp; <span class="mleg m-lv3"></span> vermelho') :camada === 'incendio' ? [1, 2, 3, 4, 5].map(n => '<span class="mleg m-r' + n + '"></span> ' + RCM_LV[n]).join(' &nbsp; ') : '';
        ex.innerHTML = '<div class="card small">' + (leg ? '<div>' + leg + '</div><div class="muted">' + (src && src.ts ? L('Dados de ', 'Data from ') + esc(nwAgo(src.ts)) + '. ' : L('Ainda sem dados guardados. ', 'No saved data yet. ')) + L('Atualiza em <a href="#/t/noticias">Notícias e alertas</a> quando houver internet.', 'Update in <a href="#/t/noticias">News and alerts</a> when you have internet.') + '</div>' : '') + '<div class="muted">' + (vista === 'mundo' ? L('Toca num evento para ver os pormenores e a fonte.', 'Tap an event to see the details and the source.') : tileSrc() ? L('Toca no mapa para ver um distrito, guardar um ponto, abri-lo no Google Maps ou guardar essa zona para usar sem rede.', 'Tap the map to see a district, save a point, open it in Google Maps or save that area to use offline.') : L('Toca no mapa para ver um distrito, guardar um ponto ou guardar essa zona para usar sem rede. Vermelho: autoestradas e vias rápidas. Azul: rios.', 'Tap the map to see a district, save a point or save that area to use offline. Red: motorways and expressways. Blue: rivers.')) + (tileSrc() && !navigator.onLine ? L(' Sem internet, o fundo detalhado só aparece nas zonas que já viste.', ' Without internet, the detailed background only appears in areas you have already viewed.') : '') + '</div></div>' + evCard() + guide;
        bindEv(ex);
        return;
      }
      lastNear = Date.now();
      const a = area, allow = filtro ? grpOf(filtro) : null, ref = gps && inView(gps.lon, gps.lat) ? gps : { lat: (a.bb[1] + a.bb[3]) / 2, lon: (a.bb[0] + a.bb[2]) / 2 };
      const list = a.pois.filter(p => !allow || allow.indexOf(p[0]) >= 0).map(p => ({ p, d: haversine(ref, { lat: p[2] / 1e5, lon: p[3] / 1e5 }) })).sort((x, y) => x.d - y.d).slice(0, 30);
      const dir = p => MAP_DIRS[Math.round(bearing(ref, { lat: p[2] / 1e5, lon: p[3] / 1e5 }) / 45) % 8];
      ex.innerHTML = '<div class="card"><strong>' + esc(a.nome) + '</strong><div class="small muted">' + (a.km * 2) + ' × ' + (a.km * 2) + ' km · ' + a.nr + L(' ruas e caminhos · ', ' streets and paths · ') + a.np + L(' pontos úteis · ', ' useful points · ') + a.kb + L(' KB · descarregado ', ' KB · downloaded ') + esc(fmtDate(a.ts)) + '</div><div class="btnrow"><button class="btn sm" id="aupd">' + L('🔄 Atualizar', '🔄 Update') + '</button><button class="btn sm danger" id="adel">' + L('🗑️ Apagar', '🗑️ Delete') + '</button></div></div>' +
        '<div class="fambar">' + [['', L('Todos', 'All')]].concat(MAP_POI_GROUPS.map(g => [g[0], g[1]])).map(g => '<button class="btn sm' + (filtro === g[0] ? ' primary' : '') + '" data-flt="' + g[0] + '">' + g[1] + '</button>').join('') + '</div>' +
        '<h3>' + L('Mais perto ' + (ref === gps ? 'de ti' : 'do centro da zona'), 'Nearest to ' + (ref === gps ? 'you' : 'the centre of the area')) + '</h3>' + (list.length ? '<ul class="list">' + list.map((x, i) => '<li><div class="main"><div class="t">' + MAP_POI[x.p[0]][0] + ' ' + esc(x.p[1] || MAP_POI[x.p[0]][1]) + '</div><div class="s">' + esc(MAP_POI[x.p[0]][1]) + ' · ' + fmtDist(x.d) + L(' para ', ' to the ') + dir(x.p) + (x.p[5] ? ' · ' + esc(x.p[5]) : '') + '</div></div><div class="acts"><button class="btn sm" data-near="' + i + '">' + L('Ver', 'View') + '</button></div></li>').join('') + '</ul>' : '<p class="muted">' + L('Nenhum ponto deste tipo nesta zona.', 'No points of this type in this area.') + '</p>') +
        '<p class="small muted">' + L('Dados © colaboradores do OpenStreetMap (licença ODbL)', 'Data © OpenStreetMap contributors (ODbL licence)') + (a.osm ? L(', de ', ', as of ') + esc(fmtDay(a.osm)) : '') + L('. São feitos por voluntários: podem faltar coisas ou estar desatualizadas.', '. Made by volunteers: things may be missing or out of date.') + '</p>' + guide;
      $('#aupd', ex).onclick = () => dlForm(a.lat, a.lon, a);
      $('#adel', ex).onclick = async () => { if (!confirm(L('Apagar o mapa «' + a.nome + '» deste dispositivo?', 'Delete the map “' + a.nome + '” from this device?'))) return; try { await mapsDel(a.id); } catch (e) { } LS.set('mapAreas', LS.get('mapAreas', []).filter(z => z.id !== a.id)); toast(L('Mapa apagado', 'Map deleted')); openBase('continente'); };
      $$('[data-flt]', ex).forEach(b => b.onclick = () => { filtro = b.dataset.flt; LS.set('mapaFiltro', filtro); sched(); drawExtra(); });
      $$('[data-near]', ex).forEach(b => b.onclick = () => { const p = list[+b.dataset.near].p; sel = { lat: p[2] / 1e5, lon: p[3] / 1e5, poi: p }; seguir = false; centerOn(sel.lon, sel.lat, Math.max(view.s, s0 * 3)); drawInfo(); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    };
    const dlForm = (lat, lon, redo) => {
      const dl = $('#mdl', el);
      dl.innerHTML = '<div class="card"><h3>⬇️ ' + (redo ? L('Atualizar «' + esc(redo.nome) + '»', 'Update “' + esc(redo.nome) + '”') : L('Guardar uma zona para usar sem rede', 'Save an area to use offline')) + '</h3><p class="small">' + L('Ruas e caminhos, linhas de comboio e rios, e os pontos úteis numa emergência: hospitais, centros de saúde, farmácias, desfibrilhadores, bombeiros, polícia, água potável, abrigos, pontos de encontro, supermercados e combustível. Os dados vêm do OpenStreetMap, feito por voluntários, e podem ter falhas.', 'Streets and paths, railway lines and rivers, and the points that are useful in an emergency: hospitals, health centres, pharmacies, defibrillators, fire stations, police, drinking water, shelters, meeting points, supermarkets and fuel. The data comes from OpenStreetMap, made by volunteers, and may have gaps.') + '</p>' +
        '<label class="field"><span>' + L('Nome', 'Name') + '</span><input id="dnome" maxlength="30"></label>' +
        '<div class="row"><label class="field"><span>' + L('Latitude do centro', 'Centre latitude') + '</span><input id="dlat" type="number" step="any"></label><label class="field"><span>' + L('Longitude do centro', 'Centre longitude') + '</span><input id="dlon" type="number" step="any"></label></div>' +
        '<div class="btnrow"><button class="btn sm" id="dme">' + L('📍 Usar a minha posição', '📍 Use my position') + '</button>' + pins.slice(0, 6).map((w, i) => '<button class="btn sm" data-pin="' + i + '">📌 ' + esc(w.name) + '</button>').join('') + '</div>' +
        '<label class="field"><span>' + L('Tamanho', 'Size') + '</span><select id="dkm"><option value="1">' + L('2 × 2 km: um bairro', '2 × 2 km: a neighbourhood') + '</option><option value="2">' + L('4 × 4 km: uma vila ou parte de uma cidade', '4 × 4 km: a town or part of a city') + '</option><option value="3">6 × 6 km</option><option value="5">' + L('10 × 10 km: só em zonas rurais', '10 × 10 km: rural areas only') + '</option></select></label>' +
        '<label class="field row"><input type="checkbox" id="dped" class="fixed" style="width:1.2em;height:1.2em"><span style="flex:1">' + L('Incluir passeios, escadas e ciclovias (o mapa fica maior)', 'Include pavements, steps and cycle paths (the map gets bigger)') + '</span></label>' +
        '<div class="btnrow"><button class="btn primary" id="dgo">' + L('⬇️ Descarregar', '⬇️ Download') + '</button><button class="btn" id="dno">' + L('Cancelar', 'Cancel') + '</button></div><p class="small muted" id="dst">' + (navigator.onLine ? L('Só precisa de internet agora. Depois funciona sem rede.', 'It only needs internet now. After that it works offline.') : L('Sem ligação à internet neste momento.', 'No internet connection right now.')) + '</p></div>';
      $('#dnome', dl).value = redo ? redo.nome : L('Zona ', 'Area ') + (LS.get('mapAreas', []).length + 1);
      $('#dlat', dl).value = lat.toFixed(5); $('#dlon', dl).value = lon.toFixed(5);
      $('#dkm', dl).value = String(redo ? redo.km : 2); $('#dped', dl).checked = !!(redo && redo.ped);
      dl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      $('#dno', dl).onclick = () => { dl.innerHTML = ''; };
      $('#dme', dl).onclick = () => {
        if (gps) { $('#dlat', dl).value = gps.lat.toFixed(5); $('#dlon', dl).value = gps.lon.toFixed(5); return; }
        if (!navigator.geolocation) return toast(L('Sem localização neste dispositivo', 'No location on this device'));
        $('#dst', dl).textContent = L('A obter a posição…', 'Getting your position…');
        navigator.geolocation.getCurrentPosition(p => { $('#dlat', dl).value = p.coords.latitude.toFixed(5); $('#dlon', dl).value = p.coords.longitude.toFixed(5); $('#dst', dl).textContent = L('Posição obtida (±', 'Position found (±') + Math.round(p.coords.accuracy) + ' m).'; }, () => { $('#dst', dl).textContent = L('Não foi possível obter a posição.', 'Could not get your position.'); }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 });
      };
      $$('[data-pin]', dl).forEach(b => b.onclick = () => { const w = pins[+b.dataset.pin]; $('#dlat', dl).value = w.lat.toFixed(5); $('#dlon', dl).value = w.lon.toFixed(5); if (!redo) $('#dnome', dl).value = w.name.slice(0, 30); });
      $('#dgo', dl).onclick = async () => {
        const la = parseFloat($('#dlat', dl).value), lo = parseFloat($('#dlon', dl).value), km = +$('#dkm', dl).value || 2, ped = $('#dped', dl).checked, nome = $('#dnome', dl).value.trim() || L('Zona', 'Area');
        if (!isFinite(la) || !isFinite(lo) || Math.abs(la) > 85 || Math.abs(lo) > 180) return toast(L('Coordenadas inválidas', 'Invalid coordinates'));
        if (!navigator.onLine) return toast(L('Sem ligação à internet', 'No internet connection'));
        const btn = $('#dgo', dl), st = $('#dst', dl); btn.disabled = true;
        try {
          const data = await mapDownload(la, lo, km, ped, t => { if (alive) st.textContent = t; });
          const id = redo ? redo.id : uid(), rec = { id, bb: data.bb, ruas: data.ruas, pois: data.pois, osm: data.osm };
          if (alive) st.textContent = L('A guardar no dispositivo…', 'Saving to the device…');
          await mapsPut(rec);
          const kb = Math.round(JSON.stringify(rec).length / 1024), areas = LS.get('mapAreas', []).filter(z => z.id !== id);
          areas.push({ id, nome, ts: Date.now(), lat: la, lon: lo, km, ped, nr: data.ruas.length, np: data.pois.length, kb }); LS.set('mapAreas', areas);
          try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e2) { }
          if (!alive) return;
          dl.innerHTML = ''; toast(L('Mapa guardado: já funciona sem internet', 'Map saved: it now works without internet')); openArea(id);
        } catch (e) { if (!alive) return; st.textContent = L('Não foi possível descarregar: ', 'Could not download: ') + ((e && e.message) || e) + L('. Tenta mais tarde ou escolhe uma zona mais pequena.', '. Try again later or choose a smaller area.'); btn.disabled = false; }
      };
    };
    const gmHide = () => { if (gm.classList.contains('hidden')) return; gm.classList.add('hidden'); gm.textContent = ''; $('#mgm', el).classList.remove('primary'); };
    const gmShow = t => {
      if (!navigator.onLine) return toast(L('O Google Maps precisa de internet', 'Google Maps needs internet'));
      const c = sel || { lon: P.lon((cw / 2 - view.tx) / view.s), lat: P.lat((ch / 2 - view.ty) / view.s) };
      const z = Math.max(2, Math.min(20, Math.round(Math.log2(2 * Math.PI * P.S * view.s / 256)))), ll = c.lat.toFixed(5) + ',' + c.lon.toFixed(5);
      gm.innerHTML = '<iframe title="Google Maps" allowfullscreen src="https://maps.google.com/maps?' + (sel ? 'q=' : 'll=') + ll + '&amp;z=' + z + '&amp;t=' + t + '&amp;hl=' + LOCALE + '&amp;output=embed"></iframe><div class="mgbar"><button class="btn sm' + (t === 'm' ? ' primary' : '') + '" data-gt="m">' + L('Mapa', 'Map') + '</button><button class="btn sm' + (t === 'k' ? ' primary' : '') + '" data-gt="k">' + L('Satélite', 'Satellite') + '</button><button class="btn sm" id="mgx">' + L('✕ Voltar ao mapa da app', '✕ Back to the app map') + '</button></div>';
      gm.classList.remove('hidden'); $('#mgm', el).classList.add('primary');
      $$('[data-gt]', gm).forEach(b => b.onclick = () => gmShow(b.dataset.gt));
      $('#mgx', gm).onclick = gmHide;
    };
    const drawViews = () => {
      const areas = LS.get('mapAreas', []), bar = $('#mviews', el);
      bar.innerHTML = [['continente', L('🗺️ Continente', '🗺️ Mainland')], ['acores', L('🏝️ Açores', '🏝️ Azores')], ['madeira', '🏝️ Madeira'], ['mundo', L('🌍 Mundo', '🌍 World')]].map(v => '<button class="btn sm' + (!area && vista === v[0] ? ' primary' : '') + '" data-v="' + v[0] + '">' + v[1] + '</button>').join('') + areas.map(a => '<button class="btn sm' + (area && area.id === a.id ? ' primary' : '') + '" data-z="' + esc(a.id) + '">📍 ' + esc(a.nome) + '</button>').join('') + '<button class="btn sm" id="mnew">' + L('＋ Descarregar zona', '＋ Download area') + '</button>';
      $$('[data-v]', bar).forEach(b => b.onclick = () => openBase(b.dataset.v));
      $$('[data-z]', bar).forEach(b => b.onclick = () => openArea(b.dataset.z));
      $('#mnew', bar).onclick = () => { const c = gps || sel || (area ? { lat: (area.bb[1] + area.bb[3]) / 2, lon: (area.bb[0] + area.bb[2]) / 2 } : null) || (pins[0]) || { lat: 38.7223, lon: -9.1393 }; dlForm(c.lat, c.lon); };
    };
    const openBase = v => { gmHide(); area = null; vista = base.vistas[v] ? v : 'continente'; sel = null; evs = events(); LS.set('mapaVista', vista); box.classList.remove('area'); drawViews(); drawBase(); fit(); drawInfo(); drawExtra(); };
    const openArea = async id => {
      const meta = LS.get('mapAreas', []).find(a => a.id === id);
      if (!meta) return openBase('continente');
      let rec = null; try { rec = await mapsGet(id); } catch (e) { toast(L('Não foi possível abrir o mapa: ', 'Could not open the map: ') + ((e && e.message) || e)); }
      if (!alive) return;
      if (!rec) { toast(L('Os dados desta zona já não estão neste dispositivo. Descarrega-a outra vez.', 'The data for this area is no longer on this device. Download it again.')); return openBase('continente'); }
      area = Object.assign({}, meta, { bb: rec.bb, pois: rec.pois || [], osm: rec.osm || '', dec: (rec.ruas || []).map(r => ({ c: r[0], n: r[1], p: mapDecodeFlat(r[2], 1e5) })) });
      gmHide(); sel = null; evs = events(); LS.set('mapaVista', 'zona:' + id); box.classList.add('area'); drawViews(); drawArea(); fit(); drawInfo(); drawExtra();
    };
    const nearestRoad = (x, y) => { let best = '', bd = 14 * 14; area.dec.forEach(r => { if (!r.n) return; const p = r.p; for (let i = 0; i + 3 < p.length; i += 2) { const a = toScr(p[i], p[i + 1]), b = toScr(p[i + 2], p[i + 3]); const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy; let t = L ? ((x - a[0]) * dx + (y - a[1]) * dy) / L : 0; t = Math.max(0, Math.min(1, t)); const qx = a[0] + t * dx - x, qy = a[1] + t * dy - y, dd = qx * qx + qy * qy; if (dd < bd) { bd = dd; best = r.n; } } }); return best; };
    const onTap = (x, y, cx, cy) => {
      const lon = P.lon((x - view.tx) / view.s), lat = P.lat((y - view.ty) / view.s);
      const near = (lo, la, r) => { const p = toScr(lo, la); return (p[0] - x) * (p[0] - x) + (p[1] - y) * (p[1] - y) < r * r; };
      if (evOn) { let be = null, bd = 18 * 18; evs.forEach(e => { const q = toScr(e.lo, e.la), dd = (q[0] - x) * (q[0] - x) + (q[1] - y) * (q[1] - y); if (dd < bd) { bd = dd; be = e; } }); if (be) { sel = { lat: be.la, lon: be.lo, ev: be }; sched(); drawInfo(); return; } }
      const pin = pins.find(w => near(w.lon, w.lat, 20));
      if (pin) sel = { lat: pin.lat, lon: pin.lon, pin };
      else if (area) {
        const allow = filtro ? grpOf(filtro) : null; let best = null, bd = 26 * 26;
        area.pois.forEach(p => { if (allow && allow.indexOf(p[0]) < 0) return; const q = toScr(p[3] / 1e5, p[2] / 1e5), dd = (q[0] - x) * (q[0] - x) + (q[1] - y) * (q[1] - y); if (dd < bd) { bd = dd; best = p; } });
        sel = best ? { lat: best[2] / 1e5, lon: best[3] / 1e5, poi: best } : { lat, lon, rua: nearestRoad(x, y) };
      } else {
        const hit = document.elementFromPoint(cx, cy), f = hit && hit.getAttribute ? hit.getAttribute('data-f') : '';
        sel = { lat, lon, f: f || '' };
      }
      sched(); drawInfo();
    };
    const pts = new Map(); let pan = null, pinch = null, moved = false;
    const loc = ev => { const r = svg.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top }; };
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y), mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    svg.addEventListener('pointerdown', ev => { try { svg.setPointerCapture(ev.pointerId); } catch (e) { } pts.set(ev.pointerId, loc(ev)); if (pts.size === 1) { moved = false; pan = { p: loc(ev), tx: view.tx, ty: view.ty }; } else if (pts.size === 2) { const v = [...pts.values()]; pinch = { d: dist(v[0], v[1]) || 1, s: view.s, c: mid(v[0], v[1]), tx: view.tx, ty: view.ty }; moved = true; } });
    svg.addEventListener('pointermove', ev => {
      if (!pts.has(ev.pointerId)) return; pts.set(ev.pointerId, loc(ev));
      if (pts.size >= 2 && pinch) { const v = [...pts.values()], c = mid(v[0], v[1]), ns = Math.max(s0 * 0.5, Math.min(maxS(), pinch.s * dist(v[0], v[1]) / pinch.d)); view.tx = c.x - (pinch.c.x - pinch.tx) * (ns / pinch.s); view.ty = c.y - (pinch.c.y - pinch.ty) * (ns / pinch.s); view.s = ns; seguir = false; apply(); }
      else if (pan) { const p = loc(ev), dx = p.x - pan.p.x, dy = p.y - pan.p.y; if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return; moved = true; seguir = false; view.tx = pan.tx + dx; view.ty = pan.ty + dy; apply(); }
    });
    const up = ev => { if (!pts.has(ev.pointerId)) return; const was = pts.size; pts.delete(ev.pointerId); if (pts.size < 2) pinch = null; if (pts.size === 1) { const p = [...pts.values()][0]; pan = { p, tx: view.tx, ty: view.ty }; } else if (!pts.size) { pan = null; if (was === 1 && !moved && ev.type === 'pointerup') { const p = loc(ev); onTap(p.x, p.y, ev.clientX, ev.clientY); } } };
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    svg.addEventListener('wheel', ev => { ev.preventDefault(); const p = loc(ev); zoomAt(p.x, p.y, ev.deltaY < 0 ? 1.3 : 1 / 1.3); }, { passive: false });
    $('#mzi', el).onclick = () => zoomAt(cw / 2, ch / 2, 1.6);
    $('#mzo', el).onclick = () => zoomAt(cw / 2, ch / 2, 1 / 1.6);
    $('#mfit', el).onclick = () => { seguir = false; fit(); };
    $('#mlayer', el).onchange = ev => { camada = ev.target.value; LS.set('mapaCamada', camada); if (!area) { const keep = Object.assign({}, view); drawBase(); view = keep; apply(); } drawExtra(); };
    $('#mfundo', el).onchange = ev => { fundo = ev.target.value; LS.set('mapaFundo', fundo); tl.textContent = ''; tiles.clear(); tilesOk = false; box.classList.remove('tiles-ok'); setAttr(); if (view.s > maxS()) zoomAt(cw / 2, ch / 2, maxS() / view.s); sched(); drawExtra(); };
    $('#mgm', el).onclick = () => gm.classList.contains('hidden') ? gmShow('m') : gmHide();
    const onOnline = () => { if (alive) sched(); };
    window.addEventListener('online', onOnline);
    const evCb = $('#mev', el); evCb.checked = evOn;
    evCb.onchange = () => { evOn = evCb.checked; LS.set('mapaEventos', evOn); sched(); drawExtra(); };
    $('#mevup', el).onclick = async () => {
      if (!navigator.onLine) return toast(L('Sem ligação à internet', 'No internet connection'));
      const b = $('#mevup', el); b.disabled = true; b.textContent = L('🔄 A atualizar…', '🔄 Updating…');
      const nc = LS.get('newsCache', {}) || {};
      await Promise.allSettled(NW_SRC.filter(x => ['ipma', 'rcm', 'emsc', 'gdacs', 'usgs', 'oms'].indexOf(x.id) >= 0).map(async x => { try { nc[x.id] = { ts: Date.now(), data: await x.load() }; } catch (e) { const o = nc[x.id] || {}; nc[x.id] = { ts: o.ts || 0, data: o.data, err: String((e && e.message) || e).slice(0, 80) }; } }));
      LS.set('newsCache', nc);
      if (!alive) return;
      b.disabled = false; b.textContent = L('🔄 Atualizar alertas', '🔄 Update alerts'); evs = events();
      if (!area) { const keep = Object.assign({}, view); drawBase(); view = keep; apply(); }
      sched(); drawExtra(); toast(L('Alertas atualizados', 'Alerts updated'));
    };
    const gb = $('#mgps', el), cb = $('#mctr', el);
    const stopGps = () => { if (watch != null && navigator.geolocation) navigator.geolocation.clearWatch(watch); watch = null; gps = null; seguir = false; gb.classList.remove('primary'); gb.textContent = L('📍 Onde estou', '📍 Where am I'); cb.classList.add('hidden'); sched(); drawInfo(); if (area) drawExtra(); };
    gb.onclick = () => {
      if (watch != null) return stopGps();
      if (!navigator.geolocation) return toast(L('Este dispositivo não tem localização', 'This device has no location'));
      gb.textContent = L('📍 A procurar sinal…', '📍 Looking for a signal…'); seguir = true;
      watch = navigator.geolocation.watchPosition(p => {
        if (!alive) return;
        const first = !gps; gps = { lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy || 0 };
        gb.classList.add('primary'); gb.textContent = '📍 ±' + Math.round(gps.acc) + L(' m · desligar', ' m · turn off'); cb.classList.remove('hidden');
        if (first) {
          if (!area && vista !== 'mundo') { const v = gps.lon < -24 ? 'acores' : (gps.lon < -15 && gps.lat < 34) ? 'madeira' : 'continente'; if (v !== vista) openBase(v); }
          if (inView(gps.lon, gps.lat)) centerOn(gps.lon, gps.lat, Math.max(view.s, s0 * (area ? 2 : 6))); else toast(area ? L('Estás fora desta zona descarregada', 'You are outside this downloaded area') : L('A tua posição está fora deste mapa', 'Your position is outside this map'));
        } else if (seguir && inView(gps.lon, gps.lat)) centerOn(gps.lon, gps.lat);
        else sched();
        if (sel) drawInfo();
        if (area && Date.now() - lastNear > 15000) drawExtra();
      }, err => { toast(err && err.code === 1 ? L('Sem autorização para usar a localização', 'No permission to use location') : L('Sem sinal de GPS: tenta ao ar livre', 'No GPS signal: try outdoors')); stopGps(); }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });
    };
    cb.onclick = () => { if (!gps) return; seguir = true; if (inView(gps.lon, gps.lat)) centerOn(gps.lon, gps.lat, Math.max(view.s, s0 * (area ? 2 : 6))); else toast(L('A tua posição está fora deste mapa', 'Your position is outside this map')); };
    const onResize = () => { if (alive && box.clientWidth && box.clientWidth !== lastW) fit(); };
    window.addEventListener('resize', onResize);
    if (vista.indexOf('zona:') === 0) openArea(vista.slice(5)); else openBase(vista);
    return () => { alive = false; if (watch != null && navigator.geolocation) navigator.geolocation.clearWatch(watch); if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); window.removeEventListener('online', onOnline); };
  } });
/* --- Lanterna --- */
TOOLS.push({ id: 'lanterna', section: 'ferramentas', icon: '🔦', title: L('Lanterna', 'Torch'), desc: L('Usa o ecrã como fonte de luz. Põe o brilho do ecrã no máximo. Toca no ecrã para desligar.', 'Uses the screen as a light source. Turn the screen brightness up to maximum. Tap the screen to switch off.'),
  render(el) {
    let stream = null;
    el.innerHTML = '<div class="btnrow"><button class="btn huge" id="white">' + L('🔦 Luz branca (ecrã)', '🔦 White light (screen)') + '</button></div><div class="btnrow"><button class="btn big" id="red">' + L('🔴 Luz vermelha (noite)', '🔴 Red light (night)') + '</button><button class="btn big" id="strobe">' + L('⚡ Estroboscópio', '⚡ Strobe') + '</button><button class="btn big" id="torch">' + L('📸 Flash da câmara', '📸 Camera flash') + '</button></div>' +
      '<div class="callout info">' + L('O flash da câmara só funciona em alguns telemóveis Android (Chrome) e pede permissão de câmara. Nos restantes, usa a luz do ecrã. A luz vermelha preserva a visão noturna e é mais discreta.', 'The camera flash only works on some Android phones (Chrome) and asks for camera permission. On other phones, use the screen light. Red light preserves your night vision and is more discreet.') + '</div><p class="small muted">' + L('Poupar bateria: reduz o brilho quando não precisas de luz forte, desliga Wi-Fi/Bluetooth, ativa o modo de poupança de energia.', 'Save battery: lower the brightness when you do not need strong light, turn off Wi-Fi/Bluetooth, turn on Low Power Mode.') + '</p>';
    $('#white', el).onclick = () => overlayShow('#fff', '<div class="hint">' + L('Toca para desligar', 'Tap to switch off') + '</div>');
    $('#red', el).onclick = () => overlayShow('#ff0000', '<div class="hint" style="color:#400">' + L('Toca para desligar', 'Tap to switch off') + '</div>', null, '#400');
    $('#strobe', el).onclick = () => { overlayShow('#000', '<div class="hint">' + L('Toca para parar', 'Tap to stop') + '</div>'); const seq = []; for (let i = 0; i < 100000; i++) seq.push([1, 60], [0, 60]); playSeq(seq, { light: true, loop: true, unit: 60 }); };
    $('#torch', el).onclick = async () => {
      if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; $('#torch', el).textContent = L('📸 Flash da câmara', '📸 Camera flash'); return; }
      try { if (!navigator.mediaDevices) throw 0; stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); const track = stream.getVideoTracks()[0]; const caps = track.getCapabilities ? track.getCapabilities() : {}; if (!caps.torch) { stream.getTracks().forEach(t => t.stop()); stream = null; throw 0; } await track.applyConstraints({ advanced: [{ torch: true }] }); $('#torch', el).textContent = L('📸 Desligar flash', '📸 Turn off flash'); }
      catch (e) { toast(L('Flash não disponível neste dispositivo. Usa a luz do ecrã.', 'Flash not available on this device. Use the screen light.')); }
    };
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  } });

/* --- SOS --- */
TOOLS.push({ id: 'sos', section: 'ferramentas', icon: '🆘', title: L('SOS luminoso e sonoro', 'SOS light and sound'), desc: L('Pisca SOS em código Morse (· · · — — — · · ·) com o ecrã e/ou som. Visível a grande distância à noite.', 'Flashes SOS in Morse code (· · · — — — · · ·) with the screen and/or sound. Visible from far away at night.'),
  render(el) {
    let stopSound = null;
    el.innerHTML = '<div class="btnrow"><button class="btn huge primary" id="light">' + L('🆘 SOS com luz (ecrã)', '🆘 SOS with light (screen)') + '</button></div><div class="btnrow"><button class="btn big" id="both">' + L('🔊 SOS luz + som', '🔊 SOS light + sound') + '</button><button class="btn big" id="sirene">' + L('🚨 Sirene contínua', '🚨 Continuous siren') + '</button></div>' +
      md(L('>! Se tens rede, liga primeiro ao **112**. O SOS luminoso serve para te encontrarem: aponta o ecrã na direção de onde pode vir ajuda (estrada, helicóptero, barco) e mantém o telemóvel estável.\n\nOutras formas de pedir ajuda: **3 apitos** ou 3 gritos seguidos, pausa, repetir. **3 fogueiras** em triângulo. Espelho a refletir o sol para o alvo. Ver [Sinais de socorro](#/s/comunicar/sinais).', '>! If you have a signal, call **112** first. The SOS light helps people find you: point the screen towards where help may come from (road, helicopter, boat) and hold the phone steady.\n\nOther ways to call for help: **3 whistle blasts** or 3 shouts in a row, pause, repeat. **3 fires** in a triangle. A mirror reflecting the sun towards the target. See [Distress signals](#/s/comunicar/sinais).'), 'sos');
    const go = (sound) => { overlayShow('#000', '<div class="big">SOS</div><div class="hint">' + L('Toca para parar', 'Tap to stop') + '</div>', () => { if (stopSound) { stopSound(); stopSound = null; } }); playSeq(morseSeq('SOS', 250), { light: true, sound, loop: true, unit: 250, freq: 900, vibrate: true }); };
    $('#light', el).onclick = () => go(false);
    $('#both', el).onclick = () => go(true);
    $('#sirene', el).onclick = () => { stopSound = startTone('sirene'); overlayShow('#000', '<div class="big">🚨</div><div class="hint">' + L('Toca para parar', 'Tap to stop') + '</div>', () => { if (stopSound) { stopSound(); stopSound = null; } }); };
    return () => { if (stopSound) stopSound(); };
  } });

/* --- Apito --- */
TOOLS.push({ id: 'apito', section: 'ferramentas', icon: '📣', title: L('Apito e alarme', 'Whistle and alarm'), desc: L('Sons agudos para chamar a atenção. Põe o volume no máximo. Um apito físico é sempre melhor: leva um no kit.', 'High-pitched sounds to attract attention. Turn the volume up to maximum. A real whistle is always better: keep one in your kit.'),
  render(el) {
    let stop = null; let burstTimer = null;
    el.innerHTML = '<div class="btnrow"><button class="btn huge" id="w">' + L('📣 Apito contínuo', '📣 Continuous whistle') + '</button></div><div class="btnrow"><button class="btn big" id="w3">' + L('3 apitos (pedido de socorro)', '3 whistle blasts (distress call)') + '</button><button class="btn big" id="al">' + L('🔔 Alarme intermitente', '🔔 Intermittent alarm') + '</button></div><p class="small muted">' + inline(L('Código internacional: **3 sinais** = preciso de ajuda. **1 sinal** = onde estás? **2 sinais** = vem cá.', 'International code: **3 signals** = I need help. **1 signal** = where are you? **2 signals** = come here.')) + '</p>';
    const off = () => { if (stop) { stop(); stop = null; } clearTimeout(burstTimer); $$('button', el).forEach(b => b.classList.remove('primary')); };
    $('#w', el).onclick = e => { if (stop) return off(); stop = startTone('apito'); e.target.classList.add('primary'); };
    $('#al', el).onclick = e => { if (stop) return off(); stop = startTone('alarme'); e.target.classList.add('primary'); };
    $('#w3', el).onclick = () => { off(); let n = 0; const one = () => { const s = startTone('apito'); burstTimer = setTimeout(() => { s(); n++; if (n < 3) burstTimer = setTimeout(one, 400); }, 1000); }; one(); };
    return off;
  } });

/* --- Morse --- */
TOOLS.push({ id: 'morse', section: 'ferramentas', icon: '📡', title: L('Transmissor Morse', 'Morse transmitter'), desc: L('Escreve uma mensagem e transmite-a por luz (ecrã) ou som. Inclui a tabela do código.', 'Type a message and transmit it by light (screen) or sound. Includes the code table.'),
  render(el) {
    let h = '<label class="field"><span>' + L('Mensagem', 'Message') + '</span><input id="msg" value="SOS" maxlength="120"></label><div class="row"><label class="field" style="flex:1"><span>' + L('Velocidade (ms por ponto)', 'Speed (ms per dot)') + '</span><input type="number" id="unit" value="250" min="60" max="600"></label></div>' +
      '<div class="btnrow"><button class="btn big" id="light">' + L('💡 Luz', '💡 Light') + '</button><button class="btn big" id="sound">' + L('🔊 Som', '🔊 Sound') + '</button><button class="btn big" id="both">' + L('💡🔊 Ambos', '💡🔊 Both') + '</button><label class="btn"><input type="checkbox" id="loop" checked style="width:1.2em;height:1.2em"> ' + L('Repetir', 'Repeat') + '</label></div><div id="preview" class="mono" style="word-break:break-all;font-size:1.2em;margin:.6em 0"></div>' +
      '<h3>' + L('Tabela', 'Table') + '</h3><div class="tablewrap"><table><tbody>';
    const keys = Object.keys(MORSE); for (let i = 0; i < keys.length; i += 4) { h += '<tr>' + keys.slice(i, i + 4).map(k => '<td><strong>' + k + '</strong> <span class="mono">' + MORSE[k].replace(/\./g, '·').replace(/-/g, '—') + '</span></td>').join('') + '</tr>'; }
    h += '</tbody></table></div><p class="small muted">' + L('Ponto = 1 unidade; traço = 3; entre sinais 1; entre letras 3; entre palavras 7. SOS = · · · — — — · · ·', 'Dot = 1 unit; dash = 3; between signals 1; between letters 3; between words 7. SOS = · · · — — — · · ·') + '</p>';
    el.innerHTML = h;
    const prev = () => { const t = norm($('#msg', el).value).toUpperCase(); $('#preview', el).textContent = t.split(/\s+/).map(w => w.split('').map(c => (MORSE[c] || '?').replace(/\./g, '·').replace(/-/g, '—')).join('   ')).join('   /   '); };
    $('#msg', el).oninput = prev; prev();
    const go = (light, sound) => { const unit = Math.max(60, +$('#unit', el).value || 250); const seq = morseSeq($('#msg', el).value, unit); if (!seq.length) return toast(L('Mensagem vazia', 'Empty message')); const loop = $('#loop', el).checked;
      if (light) overlayShow('#000', '<div class="big">' + esc($('#msg', el).value.toUpperCase()) + '</div><div class="hint">' + L('Toca para parar', 'Tap to stop') + '</div>');
      playSeq(seq, { light, sound, loop, unit, freq: 750, onDone: () => { if (light) overlayHide(); } }); };
    $('#light', el).onclick = () => go(true, false); $('#sound', el).onclick = () => go(false, true); $('#both', el).onclick = () => go(true, true);
    return () => stopPlayer();
  } });

/* --- Metrónomo RCP --- */
TOOLS.push({ id: 'rcp', section: 'ferramentas', icon: '❤️', title: L('Metrónomo de RCP', 'CPR metronome'), desc: L('Marca o ritmo das compressões torácicas (110 por minuto) e conta ciclos de 30 compressões e 2 insuflações.', 'Sets the pace for chest compressions (110 per minute) and counts cycles of 30 compressions and 2 rescue breaths.'),
  render(el) {
    el.innerHTML = md(L('>x **Liga 112 (alta-voz) antes de começar.** Vítima não responde e não respira normalmente: mãos sobrepostas no centro do peito, braços esticados, comprime **5 a 6 cm** e deixa subir totalmente. Não pares até chegar ajuda ou a vítima reagir.', '>x **Call 112 (on speaker) before you start.** If the person is not responding and not breathing normally: one hand on top of the other in the centre of the chest, arms straight, press down **5 to 6 cm** and let the chest come all the way back up. Do not stop until help arrives or the person responds.'), 'rcp') +
      '<div class="pulse" id="pulse"></div><div class="hugecount" id="count">—</div><div class="center" id="phase" style="font-size:1.3em;font-weight:600;min-height:1.6em"></div>' +
      '<div class="btnrow" style="justify-content:center"><button class="btn huge primary" id="start">' + L('▶ Adulto 30:2', '▶ Adult 30:2') + '</button></div><div class="btnrow" style="justify-content:center"><button class="btn big" id="kid">' + L('👶 Criança ou bebé (5 + 30:2)', '👶 Child or baby (5 + 30:2)') + '</button><button class="btn big" id="cont">' + L('Só compressões', 'Chest compressions only') + '</button><button class="btn big" id="stop">' + L('■ Parar', '■ Stop') + '</button></div>' +
      md(L('| | Mãos | Profundidade | Começar com |\n|---|---|---|---|\n| Adulto | 2 mãos, centro do peito | 5 a 6 cm | 30 compressões |\n| Criança (1 ano à puberdade) | 1 mão (2 se for grande) | 5 cm | 5 insuflações |\n| Bebé (menos de 1 ano) | 2 dedos, abaixo da linha dos mamilos | 4 cm | 5 insuflações (boca sobre boca e nariz) |\n\n![Onde pôr as mãos: adulto, criança e bebé](fig:rcp-maos)', '| | Hands | Depth | Start with |\n|---|---|---|---|\n| Adult | 2 hands, centre of the chest | 5 to 6 cm | 30 chest compressions |\n| Child (1 year to puberty) | 1 hand (2 if the child is big) | 5 cm | 5 rescue breaths |\n| Baby (under 1 year) | 2 fingers, below the nipple line | 4 cm | 5 rescue breaths (mouth over mouth and nose) |\n\n![Where to put your hands: adult, child and baby](fig:rcp-maos)'), 'rcpt') +
      '<p class="small">' + inline(L('Se não sabes ou não queres fazer insuflações, faz só compressões contínuas. Bebés: 2 dedos, 4 cm. Crianças: uma mão, 5 cm. Troca de pessoa a cada 2 minutos se possível. Se houver um DAE (desfibrilhador), liga-o e segue as instruções de voz. Ver [guia completo](#/s/socorros/rcp).', 'If you do not know how or do not want to give rescue breaths, give continuous chest compressions only. Babies: 2 fingers, 4 cm. Children: one hand, 5 cm. Swap with someone else every 2 minutes if possible. If there is an AED (defibrillator), switch it on and follow the voice instructions. See [full guide](#/s/socorros/rcp).')) + '</p>';
    let timer = null, count = 0, mode = null; const bpm = 110, iv = 60000 / bpm;
    const pulse = $('#pulse', el), cnt = $('#count', el), phase = $('#phase', el);
    function stop() { clearTimeout(timer); timer = null; mode = null; phase.textContent = ''; cnt.textContent = '—'; keepAwake(false); }
    function run(m) { stop(); mode = m; count = 0; keepAwake(true); const tick = () => { if (!mode) return; count++; cnt.textContent = count; pulse.classList.add('on'); setTimeout(() => pulse.classList.remove('on'), 90);
        if ((mode === '30-2' || mode === 'kid') && count === 30) { tone(1400, 0.1, 'square', 0.6); timer = setTimeout(() => { phase.textContent = L('2 INSUFLAÇÕES', '2 RESCUE BREATHS'); cnt.textContent = '💨'; tone(600, 0.6); timer = setTimeout(() => { tone(600, 0.6); timer = setTimeout(() => { count = 0; phase.textContent = L('COMPRESSÕES', 'CHEST COMPRESSIONS'); timer = setTimeout(tick, iv); }, 1800); }, 1600); }, iv); return; }
        tone(1000, 0.08, 'square', 0.5); timer = setTimeout(tick, iv); };
      if (m === 'kid') { let b = 0; phase.textContent = L('5 INSUFLAÇÕES INICIAIS', '5 INITIAL RESCUE BREATHS'); const breath = () => { if (!mode) return; if (b >= 5) { count = 0; phase.textContent = L('COMPRESSÕES', 'CHEST COMPRESSIONS'); timer = setTimeout(tick, 400); return; } b++; cnt.textContent = '💨 ' + b; tone(600, 0.5); timer = setTimeout(breath, 1500); }; breath(); }
      else { phase.textContent = L('COMPRESSÕES', 'CHEST COMPRESSIONS'); tick(); } }
    $('#start', el).onclick = () => run('30-2'); $('#kid', el).onclick = () => run('kid'); $('#cont', el).onclick = () => run('cont'); $('#stop', el).onclick = stop;
    return stop;
  } });

/* --- Doses para crianças --- */
TOOLS.push({ id: 'doses', section: 'ferramentas', icon: '💊', title: L('Doses para crianças', 'Children\'s doses'), desc: L('Paracetamol (ex.: Ben-u-ron) em xarope, supositório ou comprimido, ibuprofeno (ex.: Brufen), soro oral, anti-histamínicos e iodo pelo peso e idade de cada criança ou de qualquer criança, com o máximo por dia e registo das tomas para não repetir doses por engano.', 'Paracetamol (e.g. Ben-u-ron) as syrup, suppository or tablet, ibuprofen (e.g. Brufen), oral rehydration solution, antihistamines and iodine tablets by the weight and age of each child or any child, with the daily maximum and a dose log so you do not repeat a dose by mistake.'),
  render(el) {
    const fam = getFamily(); const kids = kidsSorted(fam); const C = kids.length;
    kids.forEach((k, i) => { k.forms = childForms(k, i === 0 ? 1 : 2, C); });
    let sel = Math.min(+LS.get('doseSel', 0) || 0, C);
    const log = () => LS.get('doselog', []).filter(e => Date.now() - e.ts < 48 * 36e5);
    const hm = ts => new Date(ts).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
    const DOSE_LABEL_EN = { 'Outra criança': 'Other child', 'Criança': 'Child', 'Mais nova': 'Youngest', 'Mais novo': 'Youngest', 'Mais velha': 'Oldest', 'Mais velho': 'Oldest' };
    const draw = () => {
      const manual = sel >= C, kid = manual ? null : kids[sel];
      const kg0 = manual ? LS.get('doseManKg', 16) : childKg(kid), age0 = manual ? LS.get('doseManAge', 4) : kid.age, mes0 = LS.get('doseMeses', {})[manual ? 'manual' : 'k' + kid.idx];
      el.innerHTML = '<div class="fambar">' + kids.map((k, i) => '<button class="btn sm' + (i === sel ? ' primary' : '') + '" data-sel="' + i + '">' + esc(k.forms.label) + ' · ' + kidAge(k) + ' · ' + nf(childKg(k)) + ' kg' + (+k.kg > 0 ? '' : ' (est.)') + '</button>').join('') + '<button class="btn sm' + (manual ? ' primary' : '') + '" data-sel="' + C + '">' + L('Outra criança', 'Other child') + '</button></div>' +
        '<div class="row"><label class="field"><span>' + L('Peso (kg)', 'Weight (kg)') + '</span><input type="number" id="kg" step="0.5" min="3" max="100" value="' + kg0 + '"></label><label class="field"><span>' + L('Idade (anos)', 'Age (years)') + '</span><input type="number" id="age" min="0" max="17" value="' + age0 + '"></label><label class="field" id="mesesw"' + (age0 > 0 ? ' style="display:none"' : '') + '><span>' + L('Meses (se tem menos de 1 ano)', 'Months (if under 1 year)') + '</span><select id="meses"><option value="">' + L('Escolhe…', 'Choose…') + '</option>' + Array.from({ length: 12 }, (_, m) => '<option value="' + m + '"' + (mes0 === m ? ' selected' : '') + '>' + m + (m === 1 ? L(' mês', ' month') : L(' meses', ' months')) + '</option>').join('') + '</select></label>' +
        '<label class="field"><span>' + L('Paracetamol que tens', 'Paracetamol you have') + '</span><select id="pc"><option value="40">' + L('Xarope 40 mg/ml (ex.: Ben-u-ron; o mais comum)', 'Syrup 40 mg/ml (e.g. Ben-u-ron; the most common)') + '</option><option value="32">' + L('Xarope 32 mg/ml (160 mg/5 ml)', 'Syrup 32 mg/ml (160 mg/5 ml)') + '</option><option value="24">' + L('Xarope 24 mg/ml (120 mg/5 ml)', 'Syrup 24 mg/ml (120 mg/5 ml)') + '</option></select></label>' +
        '<label class="field"><span>' + L('Ibuprofeno que tens', 'Ibuprofen you have') + '</span><select id="ic"><option value="20">' + L('Xarope 20 mg/ml (ex.: Brufen; 100 mg/5 ml)', 'Syrup 20 mg/ml (e.g. Brufen; 100 mg/5 ml)') + '</option><option value="40">' + L('Xarope 40 mg/ml (200 mg/5 ml)', 'Syrup 40 mg/ml (200 mg/5 ml)') + '</option></select></label></div>' +
        (manual ? '' : '<p class="small muted">' + L('Peso e idade do <a href="#/t/familia">perfil da família</a>', 'Weight and age from the <a href="#/t/familia">family profile</a>') + (+kid.kg > 0 ? '.' : L('. O peso é estimado pela idade: pesa a criança e atualiza o perfil.', '. The weight is estimated from the age: weigh the child and update the profile.')) + L(' Alterar aqui serve só para calcular.', ' Changes made here are only used for the calculation.') + '</p>') +
        '<div class="doseres" id="res"></div><h2>' + L('Registo de tomas', 'Dose log') + '</h2><div id="log"></div>' +
        md(L('>! Confirma **sempre** a concentração no rótulo e mede com a seringa da embalagem. Doses habituais por peso: paracetamol 15 mg/kg, ibuprofeno 10 mg/kg. Os nomes comerciais são só exemplos: o que conta é a substância e a concentração no rótulo. Não substituem o médico: na dúvida, SNS 24 (808 24 24 24). **Nunca aspirina em crianças.**', '>! **Always** check the concentration on the label and measure with the syringe that comes in the pack. Usual doses by weight: paracetamol 15 mg/kg, ibuprofen 10 mg/kg. Brand names are only examples: what matters is the active ingredient and the concentration on the label. They do not replace a doctor: if in doubt, SNS 24 (national health helpline, 808 24 24 24). **Never give aspirin to children.**'), 'dosesw');
      $$('[data-sel]', el).forEach(b => b.onclick = () => { sel = +b.dataset.sel; LS.set('doseSel', sel); draw(); });
      const who = manual ? 'manual' : 'k' + kid.idx, label = manual ? 'Outra criança' : kid.forms.label;
      const calc = () => {
        const kg = Math.max(1, +$('#kg', el).value || 0), age = Math.max(0, +$('#age', el).value || 0), pc = +$('#pc', el).value, ic = +$('#ic', el).value;
        const mesesV = $('#meses', el).value; $('#mesesw', el).style.display = age > 0 ? 'none' : '';
        const ageY = age > 0 ? age : (mesesV === '' ? null : +mesesV / 12);
        if (manual) { LS.set('doseManKg', kg); LS.set('doseManAge', age); }
        if (age === 0 && mesesV !== '') { const mm = LS.get('doseMeses', {}); mm[who] = +mesesV; LS.set('doseMeses', mm); }
        const pa = doseCalc(kg, 15, pc, 1000), ib = doseCalc(kg, 10, ic, 400), tb = paraTab(kg);
        const semMeses = ageY === null, bebeNovo = !semMeses && ageY < 0.25, noIbu = semMeses || ageY < 0.25 || kg < 5;
        const sup = [125, 250, 500, 1000].filter(x => x <= kg * 20).pop(), ibTab = kg >= 40 ? 400 : kg >= 20 ? 200 : 0;
        const desl = a => a < 1 ? L('abaixo de 1 ano, só com indicação médica', 'under 1 year, only on medical advice') : a < 6 ? L('1,25 mg = 2,5 ml, 1 vez por dia', '1.25 mg = 2.5 ml, once a day') : a < 12 ? L('2,5 mg = 5 ml, 1 vez por dia', '2.5 mg = 5 ml, once a day') : L('5 mg = 10 ml, 1 vez por dia', '5 mg = 10 ml, once a day');
        const pedeMeses = L('Escolhe os meses do bebé para ver a dose.', 'Choose the baby’s age in months to see the dose.');
        const card = (t, big, rest) => '<div class="card"><h3>' + t + '</h3>' + (big ? '<div class="big">' + big + '</div>' : '') + rest + '</div>';
        $('#res', el).innerHTML =
          card(L('Paracetamol (ex.: Ben-u-ron)', 'Paracetamol (e.g. Ben-u-ron)'), semMeses ? L('Falta a idade', 'Age needed') : bebeNovo ? L('Só com indicação médica', 'Only on medical advice') : pa.mg + ' mg = ' + nf(pa.ml) + ' ml',
            semMeses ? '<p class="small">' + pedeMeses + '</p>' : bebeNovo ? '<p class="small">' + L('Com menos de 3 meses, qualquer febre precisa de avaliação médica antes de dar medicamentos: SNS 24 (808 24 24 24) ou 112.', 'Under 3 months, any fever needs a medical assessment before giving any medicine: SNS 24 (808 24 24 24) or 112.') + '</p>' :
            '<p class="small">' + L('De 6 em 6 horas (mínimo 4), até <strong>4 tomas</strong> em 24 horas (no máximo ' + pa.mg * 4 + ' mg por dia).', 'Every 6 hours (at least 4 hours apart), up to <strong>4 doses</strong> in 24 hours (at most ' + pa.mg * 4 + ' mg a day).') + (tb ? L(' Em comprimido: ', ' In tablet form: ') + tb + '.' : '') + '</p><p class="small">' +
            (sup ? L('Supositório, se vomita: <strong>' + sup + ' mg</strong> (ex.: Ben-u-ron ' + sup + ' mg), um de cada vez, com os mesmos intervalos; confirma a faixa de peso no folheto.', 'Suppository, if vomiting: <strong>' + sup + ' mg</strong> (e.g. Ben-u-ron ' + sup + ' mg), one at a time, with the same intervals; check the weight range in the leaflet.') : L('Supositório: com este peso nem o de 125 mg serve; pergunta ao SNS 24.', 'Suppository: at this weight even the 125 mg one is too strong; ask SNS 24.')) + '</p>') +
          card(L('Ibuprofeno (ex.: Brufen)', 'Ibuprofen (e.g. Brufen)'), semMeses ? L('Falta a idade', 'Age needed') : noIbu ? L('Não dar', 'Do not give') : ib.mg + ' mg = ' + nf(ib.ml) + ' ml',
            '<p class="small">' + (semMeses ? pedeMeses : noIbu ? L('Só a partir dos 3 meses e 5 kg.', 'Only from 3 months of age and 5 kg.') : L('De 8 em 8 horas (mínimo 6), até <strong>3 tomas</strong> em 24 horas, com comida (no máximo ' + ib.mg * 3 + ' mg por dia).', 'Every 8 hours (at least 6 hours apart), up to <strong>3 doses</strong> in 24 hours, with food (at most ' + ib.mg * 3 + ' mg a day).') + (ibTab ? L(' Em comprimido, se já engole: 1 de ' + ibTab + ' mg.', ' In tablet form, if the child can swallow tablets: 1 x ' + ibTab + ' mg.') : '')) + L(' Não dar se estiver desidratada, com varicela, ou com asma que piora com anti-inflamatórios.', ' Do not give if the child is dehydrated, has chickenpox, or has asthma that gets worse with anti-inflammatories.') + '</p>') +
          card(L('Soro oral', 'Oral rehydration solution'), sroAfter(age), '<p class="small">' + L('depois de cada dejeção líquida ou vómito, em goles pequenos. Se já está desidratada: ', 'after each watery stool or vomit, in small sips. If already dehydrated: ') + sro4h(kg) + '.</p>') +
          card(L('Anti-histamínico: cetirizina (ex.: Zyrtec gotas 10 mg/ml)', 'Antihistamine: cetirizine (e.g. Zyrtec drops 10 mg/ml)'), '', '<p>' + cetDose(age) + '</p><p class="small">' + L('Comichão, urticária, picadas. Não trata a anafilaxia.', 'Itching, hives, insect bites and stings. Does not treat anaphylaxis.') + '</p>') +
          card(L('Anti-histamínico: desloratadina (ex.: Aerius xarope 0,5 mg/ml)', 'Antihistamine: desloratadine (e.g. Aerius syrup 0.5 mg/ml)'), '', '<p>' + desl(semMeses ? 0 : ageY) + '</p><p class="small">' + L('É uma alternativa à cetirizina: não dês os dois.', 'It is an alternative to cetirizine: do not give both.') + '</p>') +
          card(L('Iodeto de potássio', 'Potassium iodide'), '', '<p>' + kiDose(age) + '</p><p class="small">' + L('<strong>Só quando as autoridades mandarem</strong>, e uma vez. Ver <a href="#/s/guerra/nuclear">nuclear</a>.', '<strong>Only when the authorities tell you to</strong>, and only once. See <a href="#/s/guerra/nuclear">nuclear</a>.') + '</p>') +
          card(L('Adrenalina auto-injetável', 'Adrenaline auto-injector'), '', '<p>' + adrDose(kg) + '</p><p class="small">' + L('Anafilaxia: na parte de fora da coxa, mesmo por cima da roupa, e 112.', 'Anaphylaxis: into the outer thigh, even through clothing, and call 112.') + '</p>');
        drawLog(pa, ib, !(semMeses || bebeNovo), !noIbu);
      };
      const drawLog = (pa, ib, podePara, podeIbu) => {
        const now = Date.now(), L = log().filter(e => e.who === who && now - e.ts < 24 * 36e5).sort((x, y) => y.ts - x.ts);
        const info = (med, name, minH, max) => { const es = L.filter(e => e.med === med); const last = es[0]; const next = last ? last.ts + minH * 36e5 : 0; const full = es.length >= max;
          return '<p><strong>' + name + '</strong>: ' + es.length + (EN ? ' of ' : ' de ') + max + (EN ? ' doses in the last 24 hours' : ' tomas nas últimas 24 horas') + (last ? (EN ? ', the last at ' : ', a última às ') + hm(last.ts) : '') + '. ' + (full ? '<span class="badge danger">' + (EN ? '24-hour maximum reached' : 'Máximo de 24 horas atingido') + '</span>' : next > now ? '<span class="badge warn">' + (EN ? 'Next dose from ' : 'Próxima a partir das ') + hm(next) + '</span>' : '<span class="badge ok">' + (EN ? 'Can be given' : 'Pode tomar') + '</span>') + '</p>'; };
        $('#log', el).innerHTML = info('para', 'Paracetamol', 4, 4) + info('ibu', EN ? 'Ibuprofen' : 'Ibuprofeno', 6, 3) +
          '<div class="btnrow">' + (podePara ? '<button class="btn" id="lp">' + (EN ? '＋ Log paracetamol now (' : '＋ Registar paracetamol agora (') + pa.mg + ' mg)</button>' : '') + (podeIbu ? '<button class="btn" id="li">' + (EN ? '＋ Log ibuprofen now (' : '＋ Registar ibuprofeno agora (') + ib.mg + ' mg)</button>' : '') + '</div>' +
          '<ul class="list">' + (L.length ? L.map(e => '<li><div class="main"><div class="t">' + (e.med === 'para' ? 'Paracetamol' : (EN ? 'Ibuprofen' : 'Ibuprofeno')) + ' ' + e.mg + ' mg</div><div class="s">' + fmtDate(e.ts) + ' · ' + esc(EN ? DOSE_LABEL_EN[e.label] || e.label : e.label) + '</div></div><div class="acts"><button class="btn sm danger" data-del="' + e.id + '">🗑</button></div></li>').join('') : '<li class="muted small">' + (EN ? 'No doses logged in the last 24 hours.' : 'Sem tomas registadas nas últimas 24 horas.') + '</li>') + '</ul>';
        const add = (med, mg) => { const all = log(); all.push({ id: uid(), ts: Date.now(), who, label, med, mg }); LS.set('doselog', all); toast((EN ? 'Dose logged at ' : 'Toma registada às ') + hm(Date.now())); calc(); };
        if ($('#lp', el)) $('#lp', el).onclick = () => add('para', pa.mg); if ($('#li', el)) $('#li', el).onclick = () => add('ibu', ib.mg);
        $$('[data-del]', el).forEach(b => b.onclick = () => { LS.set('doselog', log().filter(e => e.id !== b.dataset.del)); calc(); });
      };
      ['kg', 'age', 'pc', 'ic', 'meses'].forEach(id => { const x = $('#' + id, el); x.oninput = x.onchange = calc; }); calc();
    };
    draw();
    const tmr = setInterval(() => { const i = $('#kg', el); if (i) i.dispatchEvent(new Event('input')); }, 60000);
    return () => clearInterval(tmr);
  } });

/* --- Bússola --- */
TOOLS.push({ id: 'bussola', section: 'ferramentas', icon: '🧭', title: L('Bússola', 'Compass'), desc: L('Usa o sensor magnético do telemóvel. Afasta-o de ímanes e metal, e calibra-o desenhando um 8 no ar. Precisão limitada: confirma com o sol.', 'Uses the phone\'s magnetic sensor. Keep it away from magnets and metal, and calibrate it by drawing a figure of 8 in the air. Limited accuracy: check against the sun.'),
  render(el) {
    let ticks = ''; for (let a = 0; a < 360; a += 10) ticks += '<line x1="100" y1="6" x2="100" y2="' + (a % 90 === 0 ? 20 : (a % 30 === 0 ? 14 : 10)) + '" stroke="currentColor" stroke-width="' + (a % 90 === 0 ? 3 : 1) + '" transform="rotate(' + a + ' 100 100)"/>';
    el.innerHTML = '<svg class="compass" viewBox="0 0 200 200"><g id="dial" style="transform-origin:100px 100px"><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="2"/>' + ticks +
      '<text x="100" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="#e5484d">N</text><text x="164" y="107" text-anchor="middle" font-size="18">E</text><text x="100" y="172" text-anchor="middle" font-size="18">S</text><text x="36" y="107" text-anchor="middle" font-size="18">' + L('O', 'W') + '</text></g>' +
      '<polygon points="100,22 92,44 108,44" fill="#e5484d"/><circle cx="100" cy="100" r="4" fill="currentColor"/></svg>' +
      '<div class="bigdisplay" id="deg">—</div><p class="center muted" id="info">' + L('Toca em «Ativar» e mantém o telemóvel na horizontal.', 'Tap “Turn on” and hold the phone flat.') + '</p><div class="btnrow" style="justify-content:center"><button class="btn big primary" id="on">' + L('🧭 Ativar bússola', '🧭 Turn on compass') + '</button></div>' +
      md(L('>i Sem sensor? Método do relógio (hemisfério norte): aponta o ponteiro das horas para o sol; o **Sul** está a meio caminho entre o ponteiro das horas e as 12. Com a hora de verão, usa as 13 em vez das 12. Ver [Orientação](#/s/navegar/bussola).', '>i No sensor? Watch method (northern hemisphere): point the hour hand at the sun; **South** is halfway between the hour hand and 12. In summer time, use 1 o\'clock (13:00) instead of 12. See [Finding your way](#/s/navegar/bussola).'), 'bussola');
    const dial = $('#dial', el), deg = $('#deg', el), info = $('#info', el); let handler = null, evName = null;
    const card = h => (EN ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] : ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'])[Math.round(h / 45) % 8];
    handler = e => { let h = null; if (e.webkitCompassHeading != null) h = e.webkitCompassHeading; else if (e.alpha != null) h = (360 - e.alpha) % 360; if (h == null) { info.textContent = L('Este dispositivo não tem sensor de orientação.', 'This device has no orientation sensor.'); return; }
      dial.style.transform = 'rotate(' + (-h) + 'deg)'; deg.textContent = Math.round(h) + '° ' + card(h); info.textContent = (e.absolute || e.webkitCompassHeading != null) ? L('Orientação absoluta (norte magnético).', 'Absolute heading (magnetic north).') : L('Orientação relativa: pode não apontar para o norte real. Calibra e confirma com o sol.', 'Relative heading: it may not point to true north. Calibrate and check against the sun.'); };
    $('#on', el).onclick = async () => {
      try { if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') { const r = await DeviceOrientationEvent.requestPermission(); if (r !== 'granted') return toast(L('Permissão negada', 'Permission denied')); } } catch (e) { return toast(L('Permissão negada', 'Permission denied')); }
      evName = ('ondeviceorientationabsolute' in window) ? 'deviceorientationabsolute' : 'deviceorientation'; window.addEventListener(evName, handler); info.textContent = L('À espera do sensor…', 'Waiting for the sensor…'); $('#on', el).disabled = true;
      setTimeout(() => { if (deg.textContent === '—') info.textContent = L('Sem leituras do sensor. Em PC não há bússola; no telemóvel, verifica permissões de sensores.', 'No sensor readings. A computer has no compass; on a phone, check the sensor permissions.'); }, 3000);
    };
    return () => { if (evName) window.removeEventListener(evName, handler); };
  } });

/* --- GPS --- */
function dms(v, isLat) { const d = Math.abs(v); const deg = Math.floor(d); const mf = (d - deg) * 60; const m = Math.floor(mf); const s = ((mf - m) * 60).toFixed(1); return deg + '°' + pad(m) + "'" + s + '"' + (isLat ? (v >= 0 ? 'N' : 'S') : (v >= 0 ? 'E' : L('O', 'W'))); }
function haversine(a, b) { const R = 6371000, r = x => x * Math.PI / 180; const dLat = r(b.lat - a.lat), dLon = r(b.lon - a.lon); const s = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); }
function bearing(a, b) { const r = x => x * Math.PI / 180; const y = Math.sin(r(b.lon - a.lon)) * Math.cos(r(b.lat)); const x = Math.cos(r(a.lat)) * Math.sin(r(b.lat)) - Math.sin(r(a.lat)) * Math.cos(r(b.lat)) * Math.cos(r(b.lon - a.lon)); return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360; }
function fmtDist(m) { return m < 1000 ? Math.round(m) + ' m' : (m / 1000).toFixed(2) + ' km'; }
TOOLS.push({ id: 'gps', section: 'ferramentas', icon: '📍', title: L('Posição GPS e pontos', 'GPS position and points'), desc: L('Mostra as tuas coordenadas (o GPS do telemóvel funciona sem rede) e guarda pontos: o carro, o abrigo, o ponto de encontro. Calcula distância e rumo até eles.', 'Shows your coordinates (the phone\'s GPS works without mobile signal) and saves points: the car, the shelter, the meeting point. Works out the distance and bearing to them.'),
  render(el) {
    let wid = null, cur = null;
    el.innerHTML = '<div class="card"><div class="bigdisplay" id="pos" style="font-size:1.5rem">—</div><div class="center muted small" id="acc">' + L('Toca em «Localizar». Ao ar livre e com céu aberto obténs melhor precisão.', 'Tap “Locate”. Outdoors under open sky you get better accuracy.') + '</div><div class="btnrow" style="justify-content:center"><button class="btn big primary" id="loc">' + L('📍 Localizar', '📍 Locate') + '</button><button class="btn" id="copy">' + L('📋 Copiar', '📋 Copy') + '</button><button class="btn" id="share">' + L('📤 Partilhar', '📤 Share') + '</button><a class="btn" href="#/t/mapa">🗺️ ' + L('Mapa offline', 'Offline map') + '</a><a class="btn hidden" id="map" target="_blank" rel="noopener">🌐 Google Maps</a></div></div>' +
      '<div class="card"><h3>' + L('Pontos guardados', 'Saved points') + '</h3><div class="row"><input id="wname" placeholder="' + L('Nome (ex.: carro, abrigo, casa)', 'Name (e.g. car, shelter, home)') + '"><button class="btn fixed" id="wadd">' + L('＋ Guardar posição atual', '＋ Save current position') + '</button></div><ul class="list" id="wlist"></ul><p class="small muted">' + L('Distância e rumo calculados em linha reta a partir da tua posição atual.', 'Distance and bearing calculated in a straight line from your current position.') + '</p></div>' +
      '<div class="callout info">' + L('Para dar a tua posição pelo telefone diz as coordenadas decimais com 5 casas (ex.: 38.72345, -9.13934). Para o 112 basta descrever o local, mas as coordenadas ajudam em zonas rurais.', 'To give your position over the phone, read out the decimal coordinates to 5 decimal places (e.g. 38.72345, -9.13934). For 112 it is enough to describe the place, but coordinates help in rural areas.') + '</div>';
    const pos = $('#pos', el), acc = $('#acc', el);
    function renderList() { const ws = LS.get('waypoints', []); $('#wlist', el).innerHTML = ws.length ? ws.map(w => { let extra = ''; if (cur) { const d = haversine(cur, w), b = bearing(cur, w); extra = ' · ' + fmtDist(d) + L(' a ', ' at ') + Math.round(b) + '°'; }
      return '<li><div class="main"><div class="t">' + esc(w.name) + '</div><div class="s mono">' + w.lat.toFixed(5) + ', ' + w.lon.toFixed(5) + ' · ' + fmtDay(w.ts) + extra + '</div></div><div class="acts"><button class="btn sm" data-copy="' + w.lat.toFixed(5) + ', ' + w.lon.toFixed(5) + '">📋</button><button class="btn sm danger" data-del="' + w.id + '">🗑</button></div></li>'; }).join('') : '<li class="muted small">' + L('Ainda sem pontos.', 'No points yet.') + '</li>';
      $$('[data-del]', el).forEach(b => b.onclick = () => { if (!confirm(L('Apagar ponto?', 'Delete point?'))) return; LS.set('waypoints', LS.get('waypoints', []).filter(w => w.id !== b.dataset.del)); renderList(); });
      $$('[data-copy]', el).forEach(b => b.onclick = () => copyText(b.dataset.copy)); }
    renderList();
    const txt = () => cur ? cur.lat.toFixed(5) + ', ' + cur.lon.toFixed(5) : '';
    $('#loc', el).onclick = () => { if (!navigator.geolocation) return toast(L('Sem GPS neste dispositivo', 'No GPS on this device')); acc.textContent = L('A localizar…', 'Locating…'); if (wid != null) navigator.geolocation.clearWatch(wid);
      wid = navigator.geolocation.watchPosition(p => { const c = p.coords; cur = { lat: c.latitude, lon: c.longitude }; pos.innerHTML = '<span class="mono">' + cur.lat.toFixed(5) + ', ' + cur.lon.toFixed(5) + '</span><br><span style="font-size:.7em">' + dms(cur.lat, true) + ' ' + dms(cur.lon, false) + '</span>';
        acc.textContent = L('Precisão ±', 'Accuracy ±') + Math.round(c.accuracy) + ' m' + (c.altitude != null ? ' · altitude ' + Math.round(c.altitude) + ' m' : '') + (c.speed ? ' · ' + (c.speed * 3.6).toFixed(0) + ' km/h' : '') + ' · ' + new Date(p.timestamp).toLocaleTimeString(LOCALE);
        const map = $('#map', el); map.classList.remove('hidden'); map.href = 'https://www.google.com/maps?q=' + cur.lat + ',' + cur.lon; renderList(); },
        err => { acc.textContent = L('Erro: ', 'Error: ') + (err.code === 1 ? L('permissão negada. Autoriza a localização nas definições do browser.', 'permission denied. Allow location access in the browser settings.') : err.code === 2 ? L('posição indisponível (sem sinal GPS).', 'position unavailable (no GPS signal).') : L('tempo esgotado. Tenta ao ar livre.', 'timed out. Try outdoors.')); }, { enableHighAccuracy: true, maximumAge: 3000, timeout: 25000 }); };
    $('#copy', el).onclick = () => cur ? copyText(txt()) : toast(L('Ainda sem posição', 'No position yet'));
    $('#share', el).onclick = async () => { if (!cur) return toast(L('Ainda sem posição', 'No position yet')); const t = L('A minha posição: ', 'My position: ') + txt() + ' (' + dms(cur.lat, true) + ' ' + dms(cur.lon, false) + ') https://maps.google.com/?q=' + txt().replace(' ', ''); if (navigator.share) { try { await navigator.share({ text: t }); } catch (e) { } } else copyText(t); };
    $('#wadd', el).onclick = () => { if (!cur) return toast(L('Localiza primeiro', 'Locate first')); const name = $('#wname', el).value.trim() || L('Ponto ', 'Point ') + (LS.get('waypoints', []).length + 1); const ws = LS.get('waypoints', []); ws.unshift({ id: uid(), name, lat: cur.lat, lon: cur.lon, ts: Date.now() }); LS.set('waypoints', ws); $('#wname', el).value = ''; renderList(); toast(L('Ponto guardado', 'Point saved')); };
    return () => { if (wid != null) navigator.geolocation.clearWatch(wid); };
  } });

/* --- Temporizador --- */
TOOLS.push({ id: 'temporizador', section: 'ferramentas', icon: '⏱️', title: L('Temporizador', 'Timer'), desc: L('Contagem decrescente com alarme: ferver água (1 min), desinfetar com lixívia (30 min), tomar medicação, render turnos de vigia.', 'Countdown with alarm: boiling water (1 min), disinfecting with bleach (30 min), taking medication, changing watch shifts.'),
  render(el) {
    el.innerHTML = '<div class="bigdisplay" id="disp">00:00</div><div class="btnrow" style="justify-content:center">' + [1, 3, 5, 10, 15, 30, 60].map(m => '<button class="btn" data-m="' + m + '">' + m + ' min</button>').join('') + '</div><div class="row"><input type="number" id="custom" placeholder="' + L('minutos', 'minutes') + '" min="1" max="720"><button class="btn fixed" id="setc">' + L('Definir', 'Set') + '</button></div><div class="btnrow" style="justify-content:center"><button class="btn big primary" id="startstop">' + L('▶ Iniciar', '▶ Start') + '</button><button class="btn big" id="reset">' + L('↺ Repor', '↺ Reset') + '</button></div><p class="small muted center" id="note"></p>';
    let total = 0, left = 0, timer = null, alarm = null; const disp = $('#disp', el);
    const show = () => { disp.textContent = pad(Math.floor(left / 60)) + ':' + pad(left % 60); };
    const setT = s => { stopAlarm(); clearInterval(timer); timer = null; total = left = s; show(); $('#startstop', el).textContent = L('▶ Iniciar', '▶ Start'); };
    const stopAlarm = () => { if (alarm) { alarm(); alarm = null; } $('#note', el).textContent = ''; };
    const finish = () => { clearInterval(timer); timer = null; keepAwake(false); $('#startstop', el).textContent = L('▶ Iniciar', '▶ Start'); alarm = startTone('alarme'); $('#note', el).textContent = L('Tempo terminado! Toca em Repor para silenciar.', 'Time is up! Tap Reset to silence the alarm.'); if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 500]); };
    $$('[data-m]', el).forEach(b => b.onclick = () => setT(+b.dataset.m * 60));
    $('#setc', el).onclick = () => { const m = +$('#custom', el).value; if (m > 0) setT(Math.round(m * 60)); };
    $('#startstop', el).onclick = () => { stopAlarm(); if (timer) { clearInterval(timer); timer = null; keepAwake(false); $('#startstop', el).textContent = L('▶ Continuar', '▶ Resume'); return; } if (left <= 0) return toast(L('Escolhe um tempo', 'Choose a time')); keepAwake(true); $('#startstop', el).textContent = '⏸ ' + L('Pausa', 'Pause'); timer = setInterval(() => { left--; show(); if (left <= 0) finish(); }, 1000); };
    $('#reset', el).onclick = () => setT(total);
    setT(60);
    return () => { clearInterval(timer); stopAlarm(); };
  } });

/* --- Calculadora de reservas --- */
TOOLS.push({ id: 'reservas', section: 'ferramentas', icon: '🧮', title: L('Calculadora de reservas', 'Supplies calculator'), desc: L('Quanta água e comida precisa a família durante X dias, com lista de compras. Vem preenchida com o perfil da família.', 'How much water and food the family needs for X days, with a shopping list. Comes filled in from the family profile.'),
  render(el) {
    const fam = getFamily(); const ages = kidsSorted(fam).map(k => k.age);
    el.innerHTML = '<p class="small muted">' + L('Preenchida com o <a href="#/t/familia">perfil da família</a>. Alterar aqui serve só para simular.', 'Filled in from the <a href="#/t/familia">family profile</a>. Changes made here are only a simulation.') + '</p><div class="row"><label class="field"><span>' + L('Adultos', 'Adults') + '</span><input type="number" id="a" value="' + fam.adults.length + '" min="0"></label><label class="field"><span>' + L('Idades das crianças (separadas por vírgulas)', 'Children\'s ages (separated by commas)') + '</span><input id="c" value="' + ages.join(', ') + '"></label><label class="field"><span>' + L('Dias', 'Days') + '</span><input type="number" id="d" value="14" min="1"></label><label class="field"><span>' + L('Cães', 'Dogs') + '</span><input type="number" id="dg" value="' + (+fam.dogs || 0) + '" min="0"></label><label class="field"><span>' + L('Gatos', 'Cats') + '</span><input type="number" id="ct" value="' + (+fam.cats || 0) + '" min="0"></label></div><div id="out"></div>';
    const fmt = (n, u) => (u === 'g' || u === 'ml') ? (n >= 1000 ? nf(n / 1000) + ' ' + (u === 'g' ? 'kg' : 'L') : Math.round(n) + ' ' + u) : Math.ceil(n) + ' ' + u;
    const calc = () => {
      const a = +$('#a', el).value || 0, d = +$('#d', el).value || 1, dg = +$('#dg', el).value || 0, ct = +$('#ct', el).value || 0;
      const ks = $('#c', el).value.split(/[,;\s]+/).map(x => parseFloat(x.replace(',', '.'))).filter(x => !isNaN(x) && x >= 0);
      const drink = 3 * a + ks.reduce((t, x) => t + childWater(x), 0), hyg = 2 * (a + ks.length), pets = dg * 1 + ct * 0.3;
      const kcal = 2100 * a + ks.reduce((t, x) => t + childKcal(x), 0); const pd = kcal * d / 2100;
      const dia = ks.reduce((t, x) => t + childDiapers(x), 0) * d, milk = ks.reduce((t, x) => t + childMilk(x), 0) * d, tod = ks.filter(x => x >= 1 && x < 4).length;
      const items = [[L('Arroz, massa, cuscuz ou aveia', 'Rice, pasta, couscous or oats'), 120 * pd, 'g'], [L('Leguminosas (lata ou secas)', 'Pulses (tinned or dried)'), 100 * pd, 'g'], [L('Conservas de peixe e carne (latas de ~120 g)', 'Tinned fish and meat (~120 g tins)'), 0.7 * pd, L('latas', 'tins')], [L('Legumes e fruta em lata ou secos', 'Tinned or dried vegetables and fruit'), 120 * pd, 'g'], [L('Bolachas, tostas, cereais, barras', 'Biscuits, crackers, cereal, snack bars'), 80 * pd, 'g'], [L('Azeite ou óleo', 'Olive oil or cooking oil'), 25 * pd, 'ml'], [L('Açúcar, mel, compotas', 'Sugar, honey, jam'), 30 * pd, 'g'], [L('Frutos secos e manteiga de amendoim', 'Nuts and peanut butter'), 40 * pd, 'g'], [L('Leite UHT ou em pó (para cozinhar e adultos)', 'UHT or powdered milk (for cooking and for adults)'), 150 * pd, 'ml'], [L('Sal', 'Salt'), 5 * pd, 'g'], [L('Café, chá, cacau (moral!)', 'Coffee, tea, cocoa (for morale!)'), 8 * pd, 'g']];
      if (milk) items.push([L('Leite para as crianças (UHT gordo ou em pó, equivalente)', 'Milk for the children (full-fat UHT or powdered equivalent)'), milk * 1000, 'ml']);
      if (tod) items.push([L('Papas de cereais, purés em frasco, bolachas moles (1 a 3 anos)', 'Baby cereal, jars of purée, soft biscuits (1 to 3 years)'), 150 * tod * d, 'g']);
      if (dia) items.push([L('Fraldas', 'Nappies'), dia, L('un', 'units')], [L('Toalhitas (pacotes de 80)', 'Wipes (packs of 80)'), dia * 3 / 80, L('pacotes', 'packs')]);
      if (dg) items.push([L('Ração de cão (médio, cerca de 300 g por dia)', 'Dog food (medium dog, about 300 g a day)'), 300 * dg * d, 'g']);
      if (ct) items.push([L('Ração de gato (cerca de 60 g por dia)', 'Cat food (about 60 g a day)'), 60 * ct * d, 'g'], [L('Areia de gato (sacos de 5 kg)', 'Cat litter (5 kg bags)'), ct * d / 10, L('sacos', 'bags')]);
      const tot = (drink + hyg + pets) * d;
      $('#out', el).innerHTML = '<div class="card"><h3>' + L('Água para ' + d + ' dias', 'Water for ' + d + (d === 1 ? ' day' : ' days')) + '</h3><div class="bigdisplay" style="font-size:2rem">' + nf(Math.ceil(tot), 0) + ' L</div><p class="center">= ' + L(Math.ceil(tot / 5) + ' garrafões de 5 L', Math.ceil(tot / 5) + ' 5-litre water jugs') + '</p><p class="small">' + L('Beber e cozinhar: ', 'Drinking and cooking: ') + nf(drink) + L(' L por dia (3 L por adulto', ' L a day (3 L per adult') + (ks.length ? L('; crianças: ', '; children: ') + ks.map(x => nf(childWater(x)) + L(' L aos ' + x + ' anos', ' L at age ' + x)).join(', ') : '') + L('). Higiene mínima: ', '). Minimum hygiene: ') + hyg + L(' L por dia (2 L por pessoa).', ' L a day (2 L per person).') + (pets ? L(' Animais: ', ' Pets: ') + nf(pets) + L(' L por dia.', ' L a day.') : '') + '</p><p class="small muted">' + L('Com calor, esforço, febre, diarreia, gravidez ou amamentação, conta com mais 50%.', 'In hot weather, or with physical effort, fever, diarrhoea, pregnancy or breastfeeding, allow 50% more.') + '</p></div>' +
        '<div class="card"><h3>' + L('Comida para ' + d + ' dias', 'Food for ' + d + (d === 1 ? ' day' : ' days')) + '</h3><p><strong>' + nf(kcal * d / 1000, 0) + L(' mil kcal</strong> no total (', ' thousand kcal</strong> in total (') + nf(kcal, 0) + L(' por dia: 2100 por adulto', ' a day: 2,100 per adult') + (ks.length ? '; ' + ks.map(x => nf(childKcal(x), 0) + L(' aos ' + x + ' anos', ' at age ' + x)).join('; ') : '') + L('). Lista aproximada e variada:</p>', '). Approximate, varied list:</p>') + '<div class="tablewrap"><table><tbody>' + items.map(i => '<tr><td>' + esc(i[0]) + '</td><td><strong>' + fmt(i[1], i[2]) + '</strong></td></tr>').join('') + '</tbody></table></div><p class="small muted">' + L('Compra o que a família já come e vai rodando. Junta abre-latas manual, fogareiro e combustível. Ver <a href="#/s/comida/despensa">despensa de emergência</a>.', 'Buy what the family already eats and keep rotating it. Add a manual tin opener, a camping stove and fuel. See <a href="#/s/comida/despensa">emergency pantry</a>.') + '</p></div>';
    };
    $$('input', el).forEach(i => i.oninput = calc); calc();
  } });

/* --- Conversor e lixívia --- */
TOOLS.push({ id: 'conversor', section: 'ferramentas', icon: '🔁', title: L('Conversor e dose de lixívia', 'Converter and bleach dose'), desc: L('Converte unidades e calcula quantas gotas de lixívia usar para desinfetar água.', 'Converts units and works out how many drops of bleach to use to disinfect water.'),
  render(el) {
    const UNITS = EN ? { Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mile: 1609.344, foot: 0.3048, inch: 0.0254, 'nautical mile': 1852 }, Weight: { kg: 1, g: 0.001, pound: 0.45359237, ounce: 0.028349523 }, Volume: { L: 1, ml: 0.001, 'gallon (US)': 3.785411784, 'gallon (UK)': 4.54609, 'cup (250 ml)': 0.25, tablespoon: 0.015, teaspoon: 0.005, drop: 0.00005 }, Temperature: { '°C': 1, '°F': 1 }, Speed: { 'km/h': 1, 'm/s': 3.6, 'mph': 1.609344, knot: 1.852 } } : { Comprimento: { m: 1, km: 1000, cm: 0.01, mm: 0.001, milha: 1609.344, pé: 0.3048, polegada: 0.0254, 'milha náutica': 1852 }, Peso: { kg: 1, g: 0.001, libra: 0.45359237, onça: 0.028349523 }, Volume: { L: 1, ml: 0.001, 'galão (EUA)': 3.785411784, 'galão (UK)': 4.54609, 'chávena (250 ml)': 0.25, 'colher de sopa': 0.015, 'colher de chá': 0.005, gota: 0.00005 }, Temperatura: { '°C': 1, '°F': 1 }, Velocidade: { 'km/h': 1, 'm/s': 3.6, 'mph': 1.609344, 'nó': 1.852 } };
    const cats = Object.keys(UNITS);
    el.innerHTML = '<div class="card"><h3>' + L('Lixívia para desinfetar água', 'Bleach to disinfect water') + '</h3><div class="row"><label class="field"><span>' + L('Litros de água', 'Litres of water') + '</span><input type="number" id="lit" value="10" min="0.5" step="0.5"></label><label class="field"><span>' + L('Concentração da lixívia (rótulo)', 'Bleach concentration (label)') + '</span><select id="conc"><option value="1">1%</option><option value="2.5">' + L('2 a 3%', '2 to 3%') + '</option><option value="5" selected>' + L('4 a 6% (comum)', '4 to 6% (common)') + '</option><option value="8">' + L('7 a 10%', '7 to 10%') + '</option></select></label><label class="field"><span>' + L('Água', 'Water') + '</span><select id="turb"><option value="1">' + L('Límpida', 'Clear') + '</option><option value="2">' + L('Turva ou muito fria', 'Cloudy or very cold') + '</option></select></label></div><div id="bleach"></div><p class="small muted">' + inline(L('Só lixívia simples, sem perfume, sem detergente, sem espessante. Mistura, espera **30 minutos**. Deve cheirar ligeiramente a cloro; se não cheirar, repete a dose e espera mais 15 min. Se possível, filtra primeiro por um pano. Ver [Purificar água](#/s/agua/purificar).', 'Plain bleach only: unscented, with no detergent and no thickener. Mix and wait **30 minutes**. It should smell slightly of chlorine; if it does not, repeat the dose and wait another 15 min. If possible, filter the water through a cloth first. See [Purifying water](#/s/agua/purificar).')) + '</p></div>' +
      '<div class="card"><h3>' + L('Unidades', 'Units') + '</h3><div class="row"><label class="field"><span>' + L('Categoria', 'Category') + '</span><select id="cat">' + cats.map(c => '<option>' + c + '</option>').join('') + '</select></label><label class="field"><span>' + L('Valor', 'Value') + '</span><input type="number" id="val" value="1"></label></div><div class="row"><label class="field"><span>' + L('De', 'From') + '</span><select id="from"></select></label><label class="field"><span>' + L('Para', 'To') + '</span><select id="to"></select></label></div><div class="bigdisplay" id="res" style="font-size:1.6rem">—</div></div>';
    const bl = () => { const L = +$('#lit', el).value || 0, c = +$('#conc', el).value, t = +$('#turb', el).value; const dropsPerL = { 1: 10, 2.5: 4, 5: 2, 8: 1 }[c] * t; const drops = Math.round(dropsPerL * L); const ml = drops * 0.05;
      $('#bleach', el).innerHTML = '<div class="bigdisplay" style="font-size:1.6rem">' + drops + (EN ? (drops === 1 ? ' drop ≈ ' : ' drops ≈ ') : ' gotas ≈ ') + (ml < 1 ? ml.toFixed(2) : ml.toFixed(1)) + ' ml' + (ml >= 5 ? ' ≈ ' + (ml / 5).toFixed(1) + (EN ? ' teaspoon(s)' : ' colher(es) de chá') : '') + '</div><p class="center small">' + (EN ? 'for ' + L + ' L of ' + (t === 2 ? 'cloudy' : 'clear') + ' water with bleach at ' : 'para ' + L + ' L de água ' + (t === 2 ? 'turva' : 'límpida') + ' com lixívia a ') + $('#conc', el).options[$('#conc', el).selectedIndex].text + '</p>'; };
    ['lit', 'conc', 'turb'].forEach(id => $('#' + id, el).oninput = bl); bl();
    const fillUnits = () => { const u = Object.keys(UNITS[$('#cat', el).value]); $('#from', el).innerHTML = u.map(x => '<option>' + x + '</option>').join(''); $('#to', el).innerHTML = u.map((x, i) => '<option' + (i === 1 ? ' selected' : '') + '>' + x + '</option>').join(''); conv(); };
    const conv = () => { const cat = $('#cat', el).value, v = +$('#val', el).value, f = $('#from', el).value, t = $('#to', el).value; let r; if (cat === L('Temperatura', 'Temperature')) { r = f === t ? v : (f === '°C' ? v * 9 / 5 + 32 : (v - 32) * 5 / 9); } else r = v * UNITS[cat][f] / UNITS[cat][t]; $('#res', el).textContent = (isFinite(r) ? +r.toFixed(4) : '—') + ' ' + t; };
    $('#cat', el).onchange = fillUnits; ['val', 'from', 'to'].forEach(id => $('#' + id, el).oninput = conv); fillUnits();
  } });

/* --- Bateria --- */
TOOLS.push({ id: 'bateria', section: 'ferramentas', icon: '🔋', title: L('Bateria e poupança', 'Battery and power saving'), desc: L('Estado da bateria e como fazer o telemóvel durar dias em vez de horas.', 'Battery status and how to make your phone last days instead of hours.'),
  render(el) {
    el.innerHTML = '<div class="bigdisplay" id="lvl">—</div><p class="center muted" id="st"></p>' + md(CONTENT.battery, 'bat');
    if (navigator.getBattery) navigator.getBattery().then(b => { const upd = () => { $('#lvl', el).textContent = Math.round(b.level * 100) + '%'; $('#st', el).textContent = b.charging ? L('A carregar', 'Charging') : (b.dischargingTime && isFinite(b.dischargingTime) ? L('Estimativa: ', 'Estimate: ') + Math.floor(b.dischargingTime / 3600) + ' h ' + Math.floor(b.dischargingTime % 3600 / 60) + L(' min restantes ao ritmo atual', ' min left at the current rate') : L('Sem carregar', 'Not charging')); }; upd(); b.onlevelchange = b.onchargingchange = b.ondischargingtimechange = upd; });
    else { $('#lvl', el).textContent = '?'; $('#st', el).textContent = L('Este browser não expõe o nível da bateria. Vê na barra de estado do dispositivo.', 'This browser does not show the battery level. Check the device\'s status bar.'); }
  } });

/* ======================================================================
   OS MEUS DADOS
   ====================================================================== */
/* --- Perfil da família --- */
TOOLS.push({ id: 'familia', section: 'meus', icon: '👨‍👩‍👧‍👦', title: L('Perfil da família', 'Family profile'), desc: L('Quem somos: idades, pesos, alergias e telefones. As quantidades, as doses, os guias da família e os cartões das crianças são calculados a partir daqui.', 'Who we are: ages, weights, allergies and phone numbers. The quantities, the doses, the family guides and the children\'s ID cards are all calculated from here.'),
  render(el) {
    const f = getFamily(); let timer = null;
    const save = () => { timer = null; saveFamily(f); const s = $('#fsaved', el); if (s) s.textContent = L('Guardado às ', 'Saved at ') + new Date().toLocaleTimeString(LOCALE); drawSummary(); };
    const drawSummary = () => { const T = famTokens(f); const box = $('#fsum', el); if (!box) return; box.innerHTML = '<div class="tablewrap"><table><tbody>' + [[L('Família', 'Family'), T.fam], [L('Água por dia (beber, cozinhar, higiene)', 'Water per day (drinking, cooking, hygiene)'), T.water_day + ' L'], [L('Água para 3 dias', 'Water for 3 days'), T.water_3d + ' L (' + T.jugs_3d + L(' garrafões de 5 L)', ' water jugs of 5 L)')], [L('Água para 2 semanas', 'Water for 2 weeks'), T.water_14d + ' L (' + T.jugs_14d + L(' garrafões)', ' jugs)')], [L('Comida por dia', 'Food per day'), T.kcal_day + ' kcal'], [L('Fraldas por dia', 'Nappies per day'), T.diapers_day], [L('Leite das crianças por dia', 'Children\'s milk per day'), T.milk_day + ' L']].map(r => '<tr><td>' + esc(r[0]) + '</td><td><strong>' + esc(r[1]) + '</strong></td></tr>').join('') + '</tbody></table></div>'; };
    const inp = (g, i, k, v, extra) => '<input data-g="' + g + '" data-i="' + i + '" data-f="' + k + '" value="' + esc(v == null ? '' : v) + '"' + (extra || '') + '>';
    const draw = () => {
      el.innerHTML = '<div class="btnrow"><a class="btn primary" href="#/s/familia">👨‍👩‍👧‍👦 ' + L('Guias da família', 'Family guides') + '</a><a class="btn" href="#/s/familia/numeros">🔢 ' + L('Os nossos números', 'Our numbers') + '</a><a class="btn" href="#/t/cartoes">🪪 ' + L('Cartões das crianças', 'Children\'s ID cards') + '</a><a class="btn" href="#/t/doses">💊 Doses</a><a class="btn" href="#/t/plano">👨‍👩‍👧 ' + L('Plano familiar', 'Family plan') + '</a></div>' +
        '<div class="card"><h3>' + L('Adultos', 'Adults') + '</h3><div class="tablewrap"><table class="ptable"><thead><tr><th>' + L('Nome', 'Name') + '</th><th>' + L('Telefone', 'Phone') + '</th><th>' + L('Saúde, alergias, medicação, grupo sanguíneo', 'Health, allergies, medication, blood group') + '</th><th></th></tr></thead><tbody>' +
        f.adults.map((a, i) => '<tr><td>' + inp('adults', i, 'name', a.name, ' placeholder="' + (i === 0 ? L('Adulto A', 'Adult A') : i === 1 ? L('Adulto B', 'Adult B') : L('Adulto', 'Adult')) + '"') + '</td><td>' + inp('adults', i, 'phone', a.phone, ' type="tel"') + '</td><td>' + inp('adults', i, 'health', a.health) + '</td><td><button class="btn sm danger" data-rm="adults" data-i="' + i + '" title="' + L('Remover', 'Remove') + '">✕</button></td></tr>').join('') +
        '</tbody></table></div><button class="btn sm" data-add="adults">＋ ' + L('Adulto', 'Adult') + '</button></div>' +
        '<div class="card"><h3>' + L('Crianças', 'Children') + '</h3><div class="tablewrap"><table class="ptable"><thead><tr><th>' + L('Nome', 'Name') + '</th><th>' + L('Menina ou menino', 'Girl or boy') + '</th><th>' + L('Idade', 'Age') + '</th><th>' + L('Peso (kg)', 'Weight (kg)') + '</th><th>' + L('Saúde, alergias', 'Health, allergies') + '</th><th></th></tr></thead><tbody>' +
        f.children.map((c, i) => '<tr><td>' + inp('children', i, 'name', c.name, ' placeholder="' + L('(opcional)', '(optional)') + '"') + '</td><td><select data-g="children" data-i="' + i + '" data-f="sex"><option value="">—</option><option value="f"' + (c.sex === 'f' ? ' selected' : '') + '>' + L('menina', 'girl') + '</option><option value="m"' + (c.sex === 'm' ? ' selected' : '') + '>' + L('menino', 'boy') + '</option></select></td><td>' + inp('children', i, 'age', c.age, ' type="number" min="0" max="17" style="width:5em"') + '</td><td>' + inp('children', i, 'kg', c.kg, ' type="number" min="2" max="100" step="0.5" style="width:6.5em" placeholder="≈ ' + estKg(c.age) + '"') + '</td><td>' + inp('children', i, 'health', c.health) + '</td><td><button class="btn sm danger" data-rm="children" data-i="' + i + '" title="' + L('Remover', 'Remove') + '">✕</button></td></tr>').join('') +
        '</tbody></table></div><button class="btn sm" data-add="children">＋ ' + L('Criança', 'Child') + '</button><p class="small muted">' + L('Idade 0 = bebé com menos de 1 ano. Sem peso, a app estima-o pela idade: <strong>pesa as crianças</strong> para as doses ficarem certas e atualiza de 6 em 6 meses. Com nome e menina ou menino, os guias passam a usar o nome.', 'Age 0 = a baby under 1 year old. With no weight entered, the app estimates it from the age: <strong>weigh the children</strong> so the doses are right, and update the weights every 6 months. When a child has a name, the guides use it.') + '</p></div>' +
        '<div class="card"><h3>' + L('Animais', 'Pets') + '</h3><div class="row"><label class="field"><span>' + L('Cães', 'Dogs') + '</span><input type="number" min="0" data-g="pets" data-f="dogs" value="' + (+f.dogs || 0) + '"></label><label class="field"><span>' + L('Gatos', 'Cats') + '</span><input type="number" min="0" data-g="pets" data-f="cats" value="' + (+f.cats || 0) + '"></label></div></div>' +
        '<div class="card"><h3>' + L('Números calculados', 'Calculated numbers') + '</h3><div id="fsum"></div><div class="btnrow"><button class="btn ok" id="fconfirm">✓ ' + L('Confirmar perfil', 'Confirm profile') + '</button></div><p class="small muted" id="fsaved">' + (f.updated ? L('Última atualização: ', 'Last updated: ') + fmtDate(f.updated) : L('Valores iniciais: 2 adultos e crianças de 2 e 7 anos. Confirma ou altera.', 'Starting values: 2 adults and children aged 2 and 7. Confirm or change them.')) + '</p></div>';
      drawSummary();
      $$('[data-g]', el).forEach(x => x.oninput = x.onchange = () => { const g = x.dataset.g, k = x.dataset.f; let v = x.value; if (['age', 'kg', 'dogs', 'cats'].includes(k)) v = v === '' ? '' : Math.max(0, +v);
        if (g === 'pets') f[k] = v || 0; else f[g][+x.dataset.i][k] = v;
        if (k === 'age') { const kgI = el.querySelector('[data-g="children"][data-i="' + x.dataset.i + '"][data-f="kg"]'); if (kgI) kgI.placeholder = '≈ ' + estKg(v); }
        clearTimeout(timer); timer = setTimeout(save, 350); });
      $$('[data-add]', el).forEach(b => b.onclick = () => { const g = b.dataset.add; f[g].push(g === 'adults' ? { name: '', phone: '', health: '' } : { name: '', sex: '', age: 5, kg: '', health: '' }); save(); draw(); });
      $$('[data-rm]', el).forEach(b => b.onclick = () => { if (!confirm(L('Remover esta pessoa do perfil?', 'Remove this person from the profile?'))) return; f[b.dataset.rm].splice(+b.dataset.i, 1); save(); draw(); });
      $('#fconfirm', el).onclick = () => { save(); toast(L('Perfil confirmado', 'Profile confirmed')); };
    };
    draw();
    return () => { if (timer) { clearTimeout(timer); save(); } };
  } });

/* --- Cartões de identificação das crianças --- */
TOOLS.push({ id: 'cartoes', section: 'meus', icon: '🪪', title: L('Cartões das crianças', 'Children\'s ID cards'), desc: L('Cartões de identificação para o bolso e a mochila de cada criança, com os telefones dos adultos, a morada e o ponto de encontro. Imprime, recorta e plastifica.', 'ID cards for each child\'s pocket and backpack, with the adults\' phone numbers, the address and the meeting point. Print, cut out and laminate.'),
  render(el) {
    const f = getFamily(), plan = LS.get('plan', {}), kids = kidsSorted(f);
    const blank = v => v && String(v).trim() ? esc(v) : '<span class="blank">&nbsp;</span>';
    const adults = f.adults.map(a => ((a.name || '') + (a.phone ? ' ' + a.phone : '')).trim()).filter(Boolean);
    const card = k => '<div class="idcard"><div class="idh">' + L('SE ME ENCONTRAR, LIGUE POR FAVOR<small>If found, please call · Si me encuentra, llame por favor</small>', 'IF FOUND, PLEASE CALL<small>Se me encontrar, ligue por favor · Si me encuentra, llame por favor</small>') + '</div>' +
      '<div class="idn">' + blank(k.name) + ' <span style="font-weight:500;font-size:9pt">(' + kidAge(k) + ')</span></div>' +
      '<div class="idf"><b>' + L('Pais / Parents:', 'Parents / Pais:') + '</b> ' + (adults.length ? esc(adults.join(' · ')) : '<span class="blank">&nbsp;</span>') + '</div>' +
      '<div class="idf"><b>' + L('Contacto fora da zona:', 'Out-of-area contact:') + '</b> ' + blank(plan.contactoFora) + '</div>' +
      '<div class="idf"><b>' + L('Morada:', 'Address:') + '</b> ' + blank(plan.morada) + '</div>' +
      '<div class="idf"><b>' + L('Ponto de encontro:', 'Meeting point:') + '</b> ' + blank(plan.encontro1) + '</div>' +
      '<div class="idf"><b>' + L('Saúde / alergias:', 'Health / allergies:') + '</b> ' + blank(k.health) + '</div>' +
      '<div class="idfoot">' + L('Emergência / Emergency: 112', 'Emergency / Emergência: 112') + '</div></div>';
    const missing = []; if (!adults.length) missing.push(L('nomes e telefones dos adultos (no perfil)', 'adults\' names and phone numbers (in the profile)')); if (kids.some(k => !String(k.name || '').trim())) missing.push(L('nomes das crianças (no perfil)', 'children\'s names (in the profile)')); if (!plan.contactoFora) missing.push(L('contacto fora da zona (no plano)', 'out-of-area contact (in the plan)')); if (!plan.morada) missing.push(L('morada (no plano)', 'address (in the plan)')); if (!plan.encontro1) missing.push(L('ponto de encontro (no plano)', 'meeting point (in the plan)'));
    el.innerHTML = '<div class="noprint"><div class="btnrow"><button class="btn primary" id="pr">🖨️ ' + L('Imprimir cartões', 'Print cards') + '</button><a class="btn" href="#/t/familia">✏️ ' + L('Perfil', 'Profile') + '</a><a class="btn" href="#/t/plano">✏️ ' + L('Plano', 'Plan') + '</a></div>' +
      (missing.length ? md(L('>! Falta preencher: ' + missing.join('; ') + '. Os campos vazios saem em branco para escreveres à mão.', '>! Still to fill in: ' + missing.join('; ') + '. Empty fields are printed blank for you to write in by hand.'), 'cards') : '') +
      '<p class="small muted">' + L('Dois cartões por criança: um para o bolso ou para coser por dentro do casaco, outro para a mochila. Recorta pela linha e plastifica ou cobre com fita-cola larga. Revê-os quando mudar um telefone ou a morada.', 'Two cards per child: one for a pocket or to sew inside the coat, the other for the backpack. Cut along the line and laminate, or cover with wide sticky tape. Check them again whenever a phone number or the address changes.') + '</p></div>' +
      '<div class="idcards">' + (kids.length ? kids.map(k => card(k) + card(k)).join('') : '<p class="muted">' + L('Sem crianças no perfil.', 'No children in the profile.') + '</p>') + '</div>';
    document.body.classList.add('print-only-tool');
    $('#pr', el).onclick = () => window.print();
  } });

/* --- Plano familiar --- */
const PLAN_FIELDS = [
  ['morada', L('Morada de casa e ponto de referência', 'Home address and a nearby landmark'), 'input', ''],
  ['agregado', L('Outras pessoas no plano (avós, ama, vizinhos) e necessidades especiais', 'Other people in the plan (grandparents, childminder, neighbours) and special needs'), 'textarea', L('A família (idades, pesos, alergias, telefones) está no perfil da família.', 'The family (ages, weights, allergies, phone numbers) is in the family profile.')],
  ['encontro1', L('Ponto de encontro perto de casa (ex.: portão do vizinho, café da esquina)', 'Meeting point near home (e.g. the neighbour\'s gate, the café on the corner)'), 'input', ''],
  ['encontro2', L('Ponto de encontro fora do bairro, se não der para voltar a casa', 'Meeting point outside the neighbourhood, if you cannot get back home'), 'input', ''],
  ['contactoFora', L('Contacto fora da zona (nome e telefone) a quem todos ligam ou enviam SMS', 'Out-of-area contact (name and phone number) that everyone calls or sends an SMS to'), 'input', ''],
  ['palavra', L('Palavra-código da família (as crianças só vão com quem a souber)', 'Family code word (the children only go with someone who knows it)'), 'input', ''],
  ['escola', L('Escola e creche: nomes, moradas, telefones e ponto de encontro de evacuação de cada uma', 'School and nursery: names, addresses, phone numbers and the evacuation meeting point of each one'), 'textarea', L('Ex.: escola {{de_c2}}: …; creche ou ama {{de_c1}}: …', 'E.g. {{c2_s}} school: …; {{c1_s}} nursery or childminder: …')],
  ['autorizados', L('Pessoas autorizadas a ir buscar as crianças (nome e telefone; confirmar que estão na lista da escola e da creche)', 'People authorised to collect the children (name and phone number; check that they are on the school and nursery lists)'), 'textarea', ''],
  ['buscar', L('Quem vai buscar qual criança, por que ordem, e o que acontece se não conseguir chegar', 'Who collects which child, in what order, and what happens if they cannot get there'), 'textarea', L('Ex.: {{a1}} vai buscar {{c1}}, {{a2}} vai buscar {{c2}}. Sem contacto ao fim de 2 horas, os avós vão buscar as crianças.', 'E.g. {{a1}} collects {{c1}}, {{a2}} collects {{c2}}. If there is no contact after 2 hours, the grandparents collect the children.')],
  ['levar', L('Numa evacuação: quem leva quem e o quê', 'In an evacuation: who takes whom, and what'), 'textarea', L('Ex.: {{a1}} leva {{c1}} no porta-bebé, os documentos e o rádio; {{a2}} leva {{c2}} pela mão e a mochila grande.', 'E.g. {{a1}} carries {{c1}} in the baby carrier, plus the documents and the radio; {{a2}} leads {{c2}} by the hand and takes the big backpack.')],
  ['medicacao', L('Medicação, alergias e condições de saúde de cada pessoa', 'Each person\'s medication, allergies and health conditions'), 'textarea', ''],
  ['locais', L('Trabalho e outros locais habituais: plano de cada um para lá chegar ou sair', 'Work and other usual places: a plan for each one, to get there or to leave'), 'textarea', ''],
  ['valvulas', L('Onde ficam o quadro elétrico, a válvula do gás e a torneira geral da água', 'Where the fuse box, the gas valve and the main water stopcock are'), 'textarea', ''],
  ['abrigo', L('Divisão mais segura em casa (interior, sem janelas, piso baixo) e abrigo público mais próximo', 'Safest room at home (inner room, no windows, low floor) and the nearest public shelter'), 'textarea', ''],
  ['rotas', L('Rotas de evacuação (duas alternativas) e para onde ir (família, amigos, alojamento)', 'Evacuation routes (two alternatives) and where to go (family, friends, accommodation)'), 'textarea', ''],
  ['veiculo', L('Veículo: matrícula, chave sobresselente, quem conduz, cadeirinhas montadas', 'Vehicle: number plate, spare key, who drives, child car seats fitted'), 'input', ''],
  ['radio', L('Frequência de rádio local (Antena 1 na tua zona) e canal PMR446 combinado', 'Local radio frequency (Antena 1, the public radio, in your area) and the agreed PMR446 channel'), 'input', ''],
  ['animais', L('Animais: quem os leva, transportadora, comida, veterinário', 'Pets: who takes them, pet carrier, food, vet'), 'textarea', ''],
  ['medico', L('Centro de saúde, pediatra, médico de família, farmácia e hospital mais próximos', 'Nearest health centre, paediatrician, family doctor, pharmacy and hospital'), 'textarea', ''],
  ['seguros', L('Seguros e apólices (seguradora, número, telefone)', 'Insurance and policies (insurer, number, phone)'), 'textarea', ''],
  ['outros', L('Outras notas e acordos', 'Other notes and agreements'), 'textarea', '']
];
TOOLS.push({ id: 'plano', section: 'meus', icon: '👨‍👩‍👧', title: L('Plano familiar', 'Family plan'), desc: L('Preenche uma vez com calma, imprime uma cópia para cada pessoa e revê de 6 em 6 meses. Guarda-se automaticamente.', 'Fill it in once, calmly, print a copy for each person and review it every 6 months. It saves automatically.'),
  render(el) {
    const plan = LS.get('plan', {});
    const T = famTokens(), fam = getFamily();
    const famLines = () => fam.adults.map((a, i) => (a.name || (i === 0 ? L('Adulto A', 'Adult A') : i === 1 ? L('Adulto B', 'Adult B') : L('Adulto', 'Adult'))) + (a.phone ? ', ' + a.phone : '') + (a.health ? ' (' + a.health + ')' : '')).concat(kidsSorted(fam).map(k => (k.name || L('Criança', 'Child')) + ', ' + kidAge(k) + ', ' + nf(childKg(k)) + ' kg' + (+k.kg > 0 ? '' : L(' (estimado)', ' (estimated)')) + (k.health ? ' (' + k.health + ')' : '')));
    el.innerHTML = '<div class="pagetools"><button class="btn sm" id="print">🖨️ ' + L('Imprimir', 'Print') + '</button><button class="btn sm" id="copy">📋 ' + L('Copiar texto', 'Copy text') + '</button><a class="btn sm" href="#/t/contactos">📇 ' + L('Contactos', 'Contacts') + '</a><a class="btn sm" href="#/t/cartoes">🪪 ' + L('Cartões das crianças', 'Children\'s ID cards') + '</a></div>' +
      '<div class="card small">' + L('Família', 'Family') + ': <strong>' + esc(T.fam) + '</strong> · <a href="#/t/familia">' + L('editar perfil', 'edit profile') + '</a></div>' +
      PLAN_FIELDS.map(f => { const ph = f[3] ? ' placeholder="' + esc(fill(f[3], T)) + '"' : ''; return field(f[1], f[2] === 'textarea' ? '<textarea data-k="' + f[0] + '"' + ph + '>' + esc(plan[f[0]] || '') + '</textarea>' : '<input data-k="' + f[0] + '" value="' + esc(plan[f[0]] || '') + '"' + ph + '>'); }).join('') + '<p class="small muted" id="saved">' + L('Guardado automaticamente neste dispositivo.', 'Saved automatically on this device.') + '</p>';
    $$('[data-k]', el).forEach(i => i.oninput = () => { plan[i.dataset.k] = i.value; LS.set('plan', plan); $('#saved', el).textContent = L('Guardado ', 'Saved at ') + new Date().toLocaleTimeString(LOCALE); });
    const text = () => L('PLANO FAMILIAR DE EMERGÊNCIA\n\nFAMÍLIA\n', 'FAMILY EMERGENCY PLAN\n\nFAMILY\n') + famLines().join('\n') + '\n\n' + PLAN_FIELDS.map(f => f[1].toUpperCase() + '\n' + (plan[f[0]] || '—')).join('\n\n') + L('\n\nCONTACTOS\n', '\n\nCONTACTS\n') + LS.get('contacts', []).map(c => c.name + ': ' + c.phone + (c.rel ? ' (' + c.rel + ')' : '')).join('\n');
    $('#copy', el).onclick = () => copyText(text());
    $('#print', el).onclick = () => { const w = $('#main'); const old = w.innerHTML; w.innerHTML = '<article><h1>' + L('Plano familiar de emergência', 'Family emergency plan') + '</h1><h3>' + L('Família', 'Family') + '</h3><p>' + famLines().map(esc).join('<br>') + '</p>' + PLAN_FIELDS.map(f => '<h3>' + esc(f[1]) + '</h3><p>' + esc(plan[f[0]] || '—').replace(/\n/g, '<br>') + '</p>').join('') + '<h3>' + L('Contactos', 'Contacts') + '</h3><p>' + LS.get('contacts', []).map(c => esc(c.name + ': ' + c.phone + (c.rel ? ' (' + c.rel + ')' : ''))).join('<br>') + '</p><p class="small">' + L('Impresso em ', 'Printed on ') + new Date().toLocaleDateString(LOCALE) + '</p></article>'; window.print(); setTimeout(() => { w.innerHTML = old; route(); }, 500); };
  } });

/* --- Contactos --- */
TOOLS.push({ id: 'contactos', section: 'meus', icon: '📇', title: L('Contactos de emergência', 'Emergency contacts'), desc: L('Família, vizinhos, médico, seguros, escola. Fica disponível mesmo sem SIM ou sem conta. Os números oficiais estão em Comunicações.', 'Family, neighbours, doctor, insurance, school. Available even without a SIM card or an account. The official numbers are in Communications.'),
  render(el) {
    let editing = null;
    const draw = () => { const cs = LS.get('contacts', []);
      el.innerHTML = '<div class="card"><h3 id="ftitle">' + (editing ? L('Editar contacto', 'Edit contact') : L('Novo contacto', 'New contact')) + '</h3><div class="row"><input id="cn" placeholder="' + L('Nome', 'Name') + '" value="' + esc(editing ? editing.name : '') + '"><input id="cp" placeholder="' + L('Telefone', 'Phone') + '" type="tel" value="' + esc(editing ? editing.phone : '') + '"></div><div class="row"><input id="cr" placeholder="' + L('Relação / função (mãe, vizinho, médico…)', 'Relationship / role (mother, neighbour, doctor…)') + '" value="' + esc(editing ? editing.rel : '') + '"><input id="cnote" placeholder="' + L('Notas (morada, horário…)', 'Notes (address, hours…)') + '" value="' + esc(editing ? editing.note : '') + '"></div><div class="btnrow"><button class="btn primary" id="save">💾 ' + L('Guardar', 'Save') + '</button>' + (editing ? '<button class="btn" id="cancel">' + L('Cancelar', 'Cancel') + '</button>' : '') + '</div></div>' +
        '<ul class="list">' + (cs.length ? cs.map(c => '<li><div class="main"><div class="t">' + esc(c.name) + ' <span class="badge">' + esc(c.rel || '') + '</span></div><div class="s">' + esc(c.phone) + (c.note ? ' · ' + esc(c.note) : '') + '</div></div><div class="acts"><a class="btn sm ok" href="tel:' + esc(c.phone.replace(/\s/g, '')) + '">📞</a><a class="btn sm" href="sms:' + esc(c.phone.replace(/\s/g, '')) + '">💬</a><button class="btn sm" data-edit="' + c.id + '">✏️</button><button class="btn sm danger" data-del="' + c.id + '">🗑</button></div></li>').join('') : '<li class="muted small">' + L('Ainda sem contactos. Sugestão: contacto fora da zona, vizinhos de confiança, médico, escola, seguradora, senhorio.', 'No contacts yet. Suggestions: out-of-area contact, trusted neighbours, doctor, school, insurer, landlord.') + '</li>') + '</ul><p class="small muted"><a href="#/s/comunicar/numeros">' + L('Números oficiais de emergência', 'Official emergency numbers') + '</a></p>';
      $('#save', el).onclick = () => { const name = $('#cn', el).value.trim(), phone = $('#cp', el).value.trim(); if (!name || !phone) return toast(L('Nome e telefone são obrigatórios', 'Name and phone are required')); const list = LS.get('contacts', []); const obj = { id: editing ? editing.id : uid(), name, phone, rel: $('#cr', el).value.trim(), note: $('#cnote', el).value.trim() }; const i = list.findIndex(x => x.id === obj.id); if (i >= 0) list[i] = obj; else list.push(obj); list.sort((a, b) => a.name.localeCompare(b.name)); LS.set('contacts', list); editing = null; draw(); toast(L('Guardado', 'Saved')); };
      if ($('#cancel', el)) $('#cancel', el).onclick = () => { editing = null; draw(); };
      $$('[data-edit]', el).forEach(b => b.onclick = () => { editing = LS.get('contacts', []).find(x => x.id === b.dataset.edit); draw(); window.scrollTo(0, 0); });
      $$('[data-del]', el).forEach(b => b.onclick = () => { if (!confirm(L('Apagar contacto?', 'Delete contact?'))) return; LS.set('contacts', LS.get('contacts', []).filter(x => x.id !== b.dataset.del)); draw(); }); };
    draw();
  } });

/* --- Inventário --- */
const INV_CATS = ['Água', 'Comida', 'Medicamentos', 'Higiene', 'Energia e luz', 'Ferramentas', 'Documentos', 'Roupa e abrigo', 'Bebé e animais', 'Outro'];
const INV_CATS_EN = { 'Água': 'Water', 'Comida': 'Food', 'Medicamentos': 'Medicines', 'Higiene': 'Hygiene', 'Energia e luz': 'Power and light', 'Ferramentas': 'Tools', 'Documentos': 'Documents', 'Roupa e abrigo': 'Clothing and shelter', 'Bebé e animais': 'Baby and pets', 'Outro': 'Other' };
TOOLS.push({ id: 'inventario', section: 'meus', icon: '📦', title: L('Inventário e validades', 'Inventory and expiry dates'), desc: L('Regista o que tens, onde está e quando expira. A app avisa o que está a chegar ao fim da validade para consumires e repores.', 'Record what you have, where it is and when it expires. The app warns you about what is nearing its expiry date so you can use it up and replace it.'),
  render(el) {
    let editing = null, filter = '';
    const draw = () => { let inv = LS.get('inventory', []); const now = Date.now();
      inv.forEach(it => { it._d = it.expiry ? (new Date(it.expiry) - now) / 864e5 : null; });
      inv.sort((a, b) => (a._d == null ? 1e9 : a._d) - (b._d == null ? 1e9 : b._d));
      const shown = filter ? inv.filter(i => i.cat === filter) : inv;
      const badge = it => it._d == null ? '' : it._d < 0 ? '<span class="badge danger">' + L('expirado', 'expired') + '</span>' : it._d <= 30 ? '<span class="badge warn">' + Math.ceil(it._d) + L(' dias', Math.ceil(it._d) === 1 ? ' day' : ' days') + '</span>' : it._d <= 90 ? '<span class="badge">' + Math.ceil(it._d) + L(' dias', ' days') + '</span>' : '';
      el.innerHTML = '<div class="card"><h3>' + (editing ? L('Editar item', 'Edit item') : L('Adicionar item', 'Add item')) + '</h3><div class="row"><input id="in" placeholder="' + L('Nome (ex.: Água 5 L, Atum lata, Paracetamol)', 'Name (e.g. Water 5 L, Tinned tuna, Paracetamol)') + '" value="' + esc(editing ? editing.name : '') + '"><select id="ic" class="fixed">' + INV_CATS.map(c => '<option' + L('', ' value="' + c + '"') + (editing && editing.cat === c ? ' selected' : '') + '>' + L(c, INV_CATS_EN[c]) + '</option>').join('') + '</select></div><div class="row"><input type="number" id="iq" placeholder="' + L('Qtd', 'Qty') + '" value="' + (editing ? editing.qty : 1) + '" min="0" step="any"><input id="iu" placeholder="' + L('Unidade (un, L, kg…)', 'Unit (pcs, L, kg…)') + '" value="' + esc(editing ? editing.unit : L('un', 'pcs')) + '"><input type="date" id="ie" value="' + esc(editing ? editing.expiry || '' : '') + '"><input id="il" placeholder="' + L('Onde está', 'Where it is') + '" value="' + esc(editing ? editing.loc || '' : '') + '"></div><div class="btnrow"><button class="btn primary" id="save">💾 ' + L('Guardar', 'Save') + '</button>' + (editing ? '<button class="btn" id="cancel">' + L('Cancelar', 'Cancel') + '</button>' : '') + '</div></div>' +
        '<div class="row"><select id="filt"><option value="">' + L('Todas as categorias', 'All categories') + '</option>' + INV_CATS.map(c => '<option' + L('', ' value="' + c + '"') + (filter === c ? ' selected' : '') + '>' + L(c, INV_CATS_EN[c]) + '</option>').join('') + '</select><span class="muted small fixed">' + inv.length + L(' itens · ', inv.length === 1 ? ' item · ' : ' items · ') + inv.filter(i => i._d != null && i._d < 0).length + L(' expirados · ', ' expired · ') + inv.filter(i => i._d != null && i._d >= 0 && i._d <= 30).length + L(' a expirar em 30 dias', ' expiring within 30 days') + '</span></div>' +
        '<ul class="list">' + (shown.length ? shown.map(it => '<li><div class="main"><div class="t">' + esc(it.name) + ' ' + badge(it) + '</div><div class="s">' + it.qty + ' ' + esc(it.unit || '') + ' · ' + esc(L(it.cat, INV_CATS_EN[it.cat] || it.cat)) + (it.expiry ? L(' · validade ', ' · expiry date ') + fmtDay(it.expiry) : '') + (it.loc ? ' · ' + esc(it.loc) : '') + '</div></div><div class="acts"><button class="btn sm" data-edit="' + it.id + '">✏️</button><button class="btn sm danger" data-del="' + it.id + '">🗑</button></div></li>').join('') : '<li class="muted small">' + L('Sem itens' + (filter ? ' nesta categoria' : '') + '. Começa pela água, comida e medicamentos.', 'No items' + (filter ? ' in this category' : '') + '. Start with water, food and medicines.') + '</li>') + '</ul>' +
        '<div class="btnrow"><button class="btn sm" id="csv">⬇️ ' + L('Exportar CSV', 'Export CSV') + '</button></div>';
      $('#save', el).onclick = () => { const name = $('#in', el).value.trim(); if (!name) return toast(L('Falta o nome', 'The name is missing')); const list = LS.get('inventory', []); const obj = { id: editing ? editing.id : uid(), name, cat: $('#ic', el).value, qty: +$('#iq', el).value || 0, unit: $('#iu', el).value.trim(), expiry: $('#ie', el).value, loc: $('#il', el).value.trim() }; const i = list.findIndex(x => x.id === obj.id); if (i >= 0) list[i] = obj; else list.push(obj); list.forEach(x => delete x._d); LS.set('inventory', list); editing = null; draw(); toast(L('Guardado', 'Saved')); };
      if ($('#cancel', el)) $('#cancel', el).onclick = () => { editing = null; draw(); };
      $('#filt', el).onchange = e => { filter = e.target.value; draw(); };
      $$('[data-edit]', el).forEach(b => b.onclick = () => { editing = LS.get('inventory', []).find(x => x.id === b.dataset.edit); draw(); window.scrollTo(0, 0); });
      $$('[data-del]', el).forEach(b => b.onclick = () => { if (!confirm(L('Apagar item?', 'Delete item?'))) return; LS.set('inventory', LS.get('inventory', []).filter(x => x.id !== b.dataset.del)); draw(); });
      $('#csv', el).onclick = () => { const rows = [L(['nome', 'categoria', 'quantidade', 'unidade', 'validade', 'local'], ['name', 'category', 'quantity', 'unit', 'expiry date', 'location'])].concat(LS.get('inventory', []).map(i => [i.name, L(i.cat, INV_CATS_EN[i.cat] || i.cat), i.qty, i.unit, i.expiry, i.loc])); download(new Blob(['\ufeff' + rows.map(r => r.map(c => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(';')).join('\n')], { type: 'text/csv' }), L('inventario.csv', 'inventory.csv')); }; };
    draw();
  } });

/* --- Notas --- */
TOOLS.push({ id: 'notas', section: 'meus', icon: '📝', title: L('Notas', 'Notes'), desc: L('Apontamentos rápidos: números de apólice, o que aconteceu e quando, medicação tomada, turnos de vigia.', 'Quick notes: policy numbers, what happened and when, medication taken, watch shifts.'),
  render(el) {
    let cur = null;
    const draw = () => { const ns = LS.get('notes', []);
      el.innerHTML = '<div class="card"><input id="nt" placeholder="' + L('Título', 'Title') + '" value="' + esc(cur ? cur.title : '') + '"><textarea id="nb" placeholder="' + L('Texto…', 'Text…') + '" style="min-height:8em">' + esc(cur ? cur.body : '') + '</textarea><div class="btnrow"><button class="btn primary" id="save">💾 ' + L('Guardar', 'Save') + '</button>' + (cur ? '<button class="btn" id="new">＋ ' + L('Nova', 'New') + '</button><button class="btn" id="copy">📋 ' + L('Copiar', 'Copy') + '</button>' : '') + '</div></div><ul class="list">' + (ns.length ? ns.map(n => '<li><div class="main"><div class="t">' + esc(n.title || L('(sem título)', '(untitled)')) + '</div><div class="s">' + fmtDate(n.ts) + ' · ' + esc((n.body || '').slice(0, 80)) + '</div></div><div class="acts"><button class="btn sm" data-open="' + n.id + '">✏️</button><button class="btn sm danger" data-del="' + n.id + '">🗑</button></div></li>').join('') : '<li class="muted small">' + L('Sem notas.', 'No notes.') + '</li>') + '</ul>';
      $('#save', el).onclick = () => { const title = $('#nt', el).value.trim(), body = $('#nb', el).value; if (!title && !body.trim()) return; const list = LS.get('notes', []); const obj = { id: cur ? cur.id : uid(), title, body, ts: Date.now() }; const i = list.findIndex(x => x.id === obj.id); if (i >= 0) list[i] = obj; else list.unshift(obj); LS.set('notes', list); cur = obj; draw(); toast(L('Guardado', 'Saved')); };
      if ($('#new', el)) $('#new', el).onclick = () => { cur = null; draw(); };
      if ($('#copy', el)) $('#copy', el).onclick = () => copyText(cur.title + '\n\n' + cur.body);
      $$('[data-open]', el).forEach(b => b.onclick = () => { cur = LS.get('notes', []).find(x => x.id === b.dataset.open); draw(); window.scrollTo(0, 0); });
      $$('[data-del]', el).forEach(b => b.onclick = () => { if (!confirm(L('Apagar nota?', 'Delete note?'))) return; LS.set('notes', LS.get('notes', []).filter(x => x.id !== b.dataset.del)); if (cur && cur.id === b.dataset.del) cur = null; draw(); }); };
    draw();
  } });

/* --- Cofre --- */
TOOLS.push({ id: 'cofre', section: 'meus', icon: '🔐', title: L('Cofre de documentos', 'Document vault'), desc: L('Guarda fotos do cartão de cidadão, passaporte, apólices, receitas médicas e notas sensíveis, encriptados com AES-256 e uma palavra-passe que só tu sabes.', 'Store photos of your Cartão de Cidadão (Portuguese ID card), passport, insurance policies, prescriptions and sensitive notes, encrypted with AES-256 and a password that only you know.'),
  render(el) {
    if (!cryptoOK) { el.innerHTML = '<div class="callout danger">' + L('A encriptação não está disponível neste contexto. Abre a app diretamente do ficheiro (file://), por HTTPS ou por http://localhost. Em http:// simples numa rede, o browser bloqueia a criptografia.', 'Encryption is not available in this context. Open the app directly from the file (file://), over HTTPS or at http://localhost. Over plain http:// on a network, the browser blocks cryptography.') + '</div>'; return; }
    const meta = LS.get('vault', null);
    const draw = async () => {
      vaultTouch();
      if (!meta) {
        el.innerHTML = '<div class="card"><h3>' + L('Criar cofre', 'Create vault') + '</h3><p class="small">' + L('Escolhe uma palavra-passe forte que consigas lembrar. <strong>Não há recuperação: se a perderes, o conteúdo fica inacessível para sempre.</strong>', 'Choose a strong password that you can remember. <strong>There is no recovery: if you lose it, the contents become inaccessible forever.</strong>') + '</p><label class="field"><span>' + L('Palavra-passe', 'Password') + '</span><input type="password" id="p1" autocomplete="new-password"></label><label class="field"><span>' + L('Repetir', 'Repeat') + '</span><input type="password" id="p2" autocomplete="new-password"></label><div class="btnrow"><button class="btn primary" id="create">🔐 ' + L('Criar cofre', 'Create vault') + '</button></div></div>' + md(CONTENT.vaultHelp, 'vault');
        $('#create', el).onclick = async () => { const a = $('#p1', el).value, b = $('#p2', el).value; if (a.length < 8) return toast(L('Mínimo 8 caracteres', 'Minimum 8 characters')); if (a !== b) return toast(L('As palavras-passe não coincidem', 'The passwords do not match')); const salt = crypto.getRandomValues(new Uint8Array(16)); const key = await deriveKey(a, salt); const check = await encBuf(key, new TextEncoder().encode('preparado-ok')); LS.set('vault', { salt: b64enc(salt), check, created: Date.now() }); vaultKey = key; toast(L('Cofre criado', 'Vault created')); route(); };
        return;
      }
      if (!vaultKey) {
        el.innerHTML = '<div class="card"><h3>' + L('Abrir cofre', 'Open vault') + '</h3><label class="field"><span>' + L('Palavra-passe', 'Password') + '</span><input type="password" id="pw" autocomplete="current-password"></label><div class="btnrow"><button class="btn primary" id="open">🔓 ' + L('Abrir', 'Open') + '</button></div><p class="small muted">' + L('Criado em ' + fmtDate(meta.created) + '. Bloqueia automaticamente após 5 minutos sem uso.', 'Created on ' + fmtDate(meta.created) + '. Locks automatically after 5 minutes of inactivity.') + '</p></div><details class="card"><summary>' + L('Perdi a palavra-passe / quero apagar o cofre', 'I lost the password / I want to delete the vault') + '</summary><p class="small">' + L('Sem a palavra-passe os dados não podem ser recuperados. Podes apagar o cofre e criar um novo.', 'Without the password the data cannot be recovered. You can delete the vault and create a new one.') + '</p><button class="btn danger" id="destroy">🗑️ ' + L('Apagar cofre e todo o conteúdo', 'Delete the vault and all its contents') + '</button></details>';
        const open = async () => { const pw = $('#pw', el).value; if (!pw) return; $('#open', el).disabled = true; $('#open', el).textContent = L('A verificar…', 'Checking…'); try { vaultKey = await vaultAbrir(pw, meta); draw(); } catch (e) { toast(L('Palavra-passe errada', 'Wrong password')); $('#open', el).disabled = false; $('#open', el).textContent = '🔓 ' + L('Abrir', 'Open'); } };
        $('#open', el).onclick = open; $('#pw', el).onkeydown = e => { if (e.key === 'Enter') open(); }; $('#pw', el).focus();
        $('#destroy', el).onclick = async () => { if (!confirm(L('Apagar o cofre e TODOS os documentos nele? Não há volta.', 'Delete the vault and ALL the documents in it? There is no going back.'))) return; if (!confirm(L('Última confirmação: apagar mesmo?', 'Final confirmation: really delete?'))) return; await idbClear(); LS.del('vault'); vaultKey = null; toast(L('Cofre apagado', 'Vault deleted')); route(); };
        return;
      }
      const items = (await idbAll()).sort((a, b) => b.ts - a.ts);
      el.innerHTML = '<div class="btnrow"><button class="btn" id="lock">🔒 ' + L('Bloquear', 'Lock') + '</button><button class="btn" id="chpw">🔑 ' + L('Mudar palavra-passe', 'Change password') + '</button><a class="btn" href="#/t/backup">💾 ' + L('Cópia de segurança', 'Backup') + '</a></div>' +
        '<div class="card"><h3>' + L('Adicionar', 'Add') + '</h3><div class="row"><input id="fname" placeholder="' + L('Nome (ex.: Cartão de Cidadão frente)', 'Name (e.g. Cartão de Cidadão, front)') + '"></div><textarea id="ftext" placeholder="' + L('Texto a guardar (opcional: senhas, números de apólice, contactos, instruções…)', 'Text to store (optional: passwords, policy numbers, contacts, instructions…)') + '"></textarea><div class="row"><input type="file" id="ffile" multiple accept="image/*,application/pdf,text/plain,.txt,.md,.json"><button class="btn primary fixed" id="add">🔐 ' + L('Guardar encriptado', 'Save encrypted') + '</button></div><p class="small muted">' + L('Fotos: tira-as com boa luz e guarda em resolução média para poupar espaço. Cada ficheiro até ~15 MB.', 'Photos: take them in good light and save them at medium resolution to save space. Each file up to ~15 MB.') + '</p></div>' +
        '<ul class="list" id="vlist">' + (items.length ? items.map(it => '<li><div class="main"><div class="t">' + esc(it.name) + '</div><div class="s">' + esc(it.mime || '') + ' · ' + (it.size / 1024).toFixed(0) + ' KB · ' + fmtDate(it.ts) + '</div></div><div class="acts"><button class="btn sm ok" data-view="' + it.id + '">👁️</button><button class="btn sm danger" data-del="' + it.id + '">🗑</button></div></li>').join('') : '<li class="muted small">' + L('Cofre vazio. Sugestões: CC/passaporte (frente e verso), carta de condução, cartão SNS e seguros, apólices, escritura/contrato de arrendamento, receitas e relatórios médicos, contactos, foto de família recente (para identificação).', 'The vault is empty. Suggestions: Cartão de Cidadão/passport (front and back), driving licence, SNS (national health service) card and insurance cards, insurance policies, property deed/tenancy agreement, prescriptions and medical reports, contacts, a recent family photo (for identification).') + '</li>') + '</ul><div id="viewer"></div>';
      $('#lock', el).onclick = () => { vaultKey = null; draw(); };
      $('#chpw', el).onclick = async () => { const a = prompt(L('Nova palavra-passe (mín. 8 caracteres):', 'New password (min. 8 characters):')); if (!a || a.length < 8) return toast(L('Cancelado', 'Cancelled')); const b = prompt(L('Repete a nova palavra-passe:', 'Repeat the new password:')); if (a !== b) return toast(L('Não coincidem', 'They do not match')); toast(L('A re-encriptar…', 'Re-encrypting…')); try { const salt = crypto.getRandomValues(new Uint8Array(16)); const nk = await deriveKey(a, salt); const itens = []; for (const it of await idbAll()) itens.push(Object.assign({}, it, await encBuf(nk, await decBuf(vaultKey, it.iv, it.data)))); const novo = Object.assign({}, meta, { salt: b64enc(salt), check: await encBuf(nk, new TextEncoder().encode('preparado-ok')) }); LS.set('vaultNovo', novo); if (!LS.get('vaultNovo', null)) throw new Error('armazenamento'); await idbPutAll(itens); LS.set('vault', novo); LS.del('vaultNovo'); Object.assign(meta, novo); vaultKey = nk; toast(L('Palavra-passe alterada', 'Password changed')); draw(); } catch (e) { LS.del('vaultNovo'); toast(L('Não foi possível mudar a palavra-passe. O cofre ficou como estava.', 'Could not change the password. The vault is unchanged.'), 5000); } };
      $('#add', el).onclick = async () => { const name = $('#fname', el).value.trim(); const text = $('#ftext', el).value; const files = Array.from($('#ffile', el).files || []); if (!files.length && !text.trim()) return toast(L('Escreve um texto ou escolhe ficheiros', 'Write some text or choose files')); if (!files.length && !name) return toast(L('Dá um nome', 'Give it a name'));
        try { if (text.trim()) { const e = await encBuf(vaultKey, new TextEncoder().encode(text)); await idbPut({ id: uid(), name: name || L('Nota', 'Note'), mime: 'text/plain', size: text.length, ts: Date.now(), iv: e.iv, data: e.data }); }
          for (const f of files) { if (f.size > 15 * 1048576) { toast(L(f.name + ' é demasiado grande', f.name + ' is too large')); continue; } const e = await encBuf(vaultKey, await f.arrayBuffer()); await idbPut({ id: uid(), name: (name && files.length === 1) ? name : (name ? name + ' — ' : '') + f.name, mime: f.type || 'application/octet-stream', size: f.size, ts: Date.now(), iv: e.iv, data: e.data }); }
          toast(L('Guardado no cofre', 'Saved in the vault')); draw(); } catch (e) { toast(L('Erro ao guardar: ', 'Error while saving: ') + e.message); } };
      $$('[data-del]', el).forEach(b => b.onclick = async () => { if (!confirm(L('Apagar este item do cofre?', 'Delete this item from the vault?'))) return; await idbDel(b.dataset.del); draw(); });
      $$('[data-view]', el).forEach(b => b.onclick = async () => { vaultTouch(); const it = items.find(x => x.id === b.dataset.view); try { const buf = await decBuf(vaultKey, it.iv, it.data); const v = $('#viewer', el); let h = '<div class="card"><h3>' + esc(it.name) + '</h3>';
          if (it.mime.startsWith('image/')) { const url = URL.createObjectURL(new Blob([buf], { type: it.mime })); h += '<img src="' + url + '" style="max-height:70vh;display:block;margin:auto;border-radius:8px">'; }
          else if (it.mime.startsWith('text/') || it.mime === 'application/json') { const t = new TextDecoder().decode(buf); h += '<textarea readonly style="min-height:12em">' + esc(t) + '</textarea><div class="btnrow"><button class="btn sm" id="vcopy">📋 ' + L('Copiar', 'Copy') + '</button></div>'; v._t = t; }
          else { const url = URL.createObjectURL(new Blob([buf], { type: it.mime })); h += '<p>' + L('Ficheiro ', 'File ') + esc(it.mime) + '.</p><div class="btnrow"><a class="btn" href="' + url + '" target="_blank" rel="noopener">' + L('Abrir', 'Open') + '</a><a class="btn" href="' + url + '" download="' + esc(it.name) + '">' + L('Descarregar (desencriptado!)', 'Download (decrypted!)') + '</a></div>'; }
          h += '<div class="btnrow"><button class="btn sm" id="vclose">' + L('Fechar', 'Close') + '</button></div></div>'; v.innerHTML = h; v.scrollIntoView({ behavior: 'smooth' });
          $('#vclose', v).onclick = () => { v.innerHTML = ''; }; if ($('#vcopy', v)) $('#vcopy', v).onclick = () => copyText(v._t); } catch (e) { toast(L('Não foi possível desencriptar', 'Could not decrypt')); } });
    };
    draw();
    return () => { const v = $('#viewer', el); if (v) v.innerHTML = ''; };
  } });

/* --- Cópia de segurança --- */
TOOLS.push({ id: 'backup', section: 'meus', icon: '💾', title: L('Cópia de segurança', 'Backup'), desc: L('Exporta tudo (checklists, plano, contactos, inventário, notas, pontos GPS e o cofre, que continua encriptado) para um ficheiro. Guarda-o numa pen e noutro telemóvel.', 'Export everything (checklists, plan, contacts, inventory, notes, GPS points and the vault, which stays encrypted) to a file. Keep it on a USB stick and on another phone.'),
  render(el) {
    const last = LS.get('lastBackup', 0);
    el.innerHTML = '<div class="card"><h3>' + L('Exportar', 'Export') + '</h3><p class="small">' + L('Última exportação: ', 'Last export: ') + fmtDate(last) + '</p><div class="btnrow"><button class="btn primary big" id="exp">⬇️ ' + L('Descarregar ficheiro de cópia', 'Download backup file') + '</button>' + (navigator.share ? '<button class="btn big" id="shr">📤 ' + L('Partilhar (ex.: para outro telemóvel)', 'Share (e.g. to another phone)') + '</button>' : '') + '</div><p class="small muted">' + L('O ficheiro chama-se safety-security-backup-AAAA-MM-DD.json. O cofre vai encriptado; sem a palavra-passe ninguém o abre.', 'The file is called safety-security-backup-YYYY-MM-DD.json. The vault stays encrypted; without the password nobody can open it.') + '</p></div>' +
      '<div class="card"><h3>' + L('Importar', 'Import') + '</h3><p class="small">' + L('Repõe uma cópia noutro dispositivo ou depois de reinstalar. Substitui os dados atuais com o mesmo nome.', 'Restore a backup on another device or after reinstalling. It replaces current data with the same names.') + '</p><input type="file" id="imp" accept="application/json,.json"></div>' +
      '<div class="callout warn">' + L('Se limpares os dados do browser, mudares de telemóvel ou o dispositivo se perder, os dados desaparecem. Faz uma cópia depois de cada alteração importante e guarda-a em dois sítios.', 'If you clear the browser data, change phones or the device gets lost, the data is gone. Make a backup after every important change and keep it in two places.') + '</div>' +
      '<div class="card"><h3>' + L('Copiar a app', 'Copy the app') + '</h3><p class="small">' + L('A app é o ficheiro <code>index.html</code>. Copia-o para uma pen, envia-o por email/WhatsApp/Bluetooth para a família, ou guarda-o no telemóvel e abre-o com o browser. Não precisa de internet nem de instalação.', 'The app is the file <code>index.html</code>. Copy it to a USB stick, send it to the family by email/WhatsApp/Bluetooth, or save it on the phone and open it in the browser. It needs no internet and no installation.') + '</p></div>';
    $('#exp', el).onclick = async () => { const { blob, name } = await exportAll(); download(blob, name); toast(L('Cópia exportada', 'Backup exported')); };
    if ($('#shr', el)) $('#shr', el).onclick = async () => { const { blob, name } = await exportAll(); const file = new File([blob], name, { type: 'application/json' }); try { if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title: L('Cópia Safety & Security', 'Safety & Security backup') }); else { download(blob, name); } } catch (e) { } };
    $('#imp', el).onchange = async e => { const f = e.target.files[0]; if (!f) return; try { if (await importAll(f)) { toast(L('Importado com sucesso', 'Imported successfully')); setTimeout(() => location.reload(), 800); } } catch (err) { toast(L('Erro: ', 'Error: ') + err.message); } };
  } });
/*__FERRAMENTAS__*/

/* ---------- arranque ---------- */
/* textos fixos do shell.html na língua ativa */
function applyLang() {
  document.documentElement.lang = LOCALE;
  if (!EN) return;
  document.title = 'Safety & Security — Offline emergency guide';
  const d = $('meta[name=description]'); if (d) d.content = 'Fully offline emergency and survival guide: first aid, water, food, shelter, communications, armed conflict, checklists, tools and a document vault.';
  $('#searchbox').placeholder = 'Search… (e.g. bleeding, bleach, earthquake)';
  $('#themebtn').title = 'Switch theme (dark / light / night red)'; $('#themebtn').setAttribute('aria-label', 'Theme');
  $('#sidebar').setAttribute('aria-label', 'Sections'); $('#quick').setAttribute('aria-label', 'Quick actions');
  $$('#quick a').forEach(a => { const t = { '#/t/lanterna': 'Torch', '#/t/rcp': 'CPR', '#/t/guia': 'Emergency' }[a.getAttribute('href')]; if (t && a.lastChild && a.lastChild.nodeType === 3) a.lastChild.textContent = t; });
}
function init() {
  applyLang(); applySettings(); buildSidebar();
  $('#menubtn').onclick = () => document.body.classList.toggle('nav-open');
  $('#backdrop').onclick = () => document.body.classList.remove('nav-open');
  $('#sidebar').addEventListener('click', e => { if (e.target.closest('a')) document.body.classList.remove('nav-open'); });
  document.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) { e.preventDefault(); setLang(b.dataset.lang); } });
  $('#themebtn').onclick = () => { SETTINGS.theme = { dark: 'light', light: 'red', red: 'dark' }[SETTINGS.theme] || 'dark'; saveSettings(); toast((EN ? { dark: 'Dark theme', light: 'Light theme', red: 'Night red mode' } : { dark: 'Tema escuro', light: 'Tema claro', red: 'Modo vermelho noturno' })[SETTINGS.theme]); };
  $('#searchform').onsubmit = e => { e.preventDefault(); const q = $('#searchbox').value.trim(); if (q) location.hash = '#/search/' + encodeURIComponent(q); };
  document.addEventListener('keydown', e => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); $('#searchbox').focus(); } if (e.key === 'Escape') { overlayHide(); document.body.classList.remove('nav-open'); } });
  $('#main').addEventListener('change', e => { const t = e.target; if (t.matches('input[type=checkbox][data-key]')) { if (t.checked) CHECKS[t.dataset.key] = 1; else delete CHECKS[t.dataset.key]; LS.set('checks', CHECKS); } });
  $('#main').addEventListener('click', e => { const a = e.target.closest('a[href^="#/"]'); if (a && location.hash === a.getAttribute('href')) { e.preventDefault(); route(); } });
  ['click', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, () => { if (vaultKey) vaultTouch(); }, { passive: true }));
  window.addEventListener('hashchange', route);
  if (window.speechSynthesis) speechSynthesis.getVoices();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(() => { });
    let hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) novaVersao(); hadController = true; });
  }
  route();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
