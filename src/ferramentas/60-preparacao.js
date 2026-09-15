/* --- Nível de preparação da família e simulacros --- */
const SIMULACROS = EN ? [
  ['sismo', '🌍 Earthquake', 'Someone shouts “earthquake!”. Everyone: drop, cover and hold on for 1 minute. Then leave with shoes on and go to the meeting point. Time it and see who hesitated.'],
  ['incendio', '🔥 House fire', 'Press the test button on the smoke alarm. Everyone leaves by the second exit, crawling along the hallway, to the meeting point. Goal: under 2 minutes.'],
  ['evacuacao', '🚪 Evacuation', 'In 10 minutes: grab bag, documents, medication, pets and everyone in the car. At the end, write down what was missing or took too long.'],
  ['apagao', '💡 Blackout', 'Switch off the power at the fuse box for an hour one evening: torches, battery radio, fridge kept closed and dinner with no electricity. See what you are missing.']
] : [
  ['sismo', '🌍 Sismo', 'Alguém grita «sismo!». Todos: baixar, proteger e aguardar 1 minuto. Depois saem calçados até ao ponto de encontro. Contem o tempo e vejam quem hesitou.'],
  ['incendio', '🔥 Incêndio em casa', 'Carreguem no botão de teste do detetor de fumo. Todos saem pela segunda saída, a gatinhar no corredor, até ao ponto de encontro. Objetivo: menos de 2 minutos.'],
  ['evacuacao', '🚪 Evacuação', 'Em 10 minutos: mala de evacuação, documentos, medicação, animais e todos no carro. No fim, anotem o que faltou ou demorou.'],
  ['apagao', '💡 Apagão', 'Desliguem o quadro elétrico uma hora à noite: lanternas, rádio a pilhas, frigorífico fechado e jantar sem luz. Vejam o que faz falta.']
];
function prepEstado() {
  const f = getFamily(), plan = LS.get('plan', {}), now = Date.now(), decl = LS.get('prepDecl', {}) || {}, it = [];
  const dias = ts => ts ? (now - ts) / 864e5 : Infinity;
  const prog = (sec, pg) => { const s = CONTENT.sections.find(x => x.id === sec), p = s && s.pages.find(x => x.id === pg); if (!p) return 0; const ks = taskKeys(sec + '/' + pg, p.md); return ks.length ? ks.filter(k => CHECKS[k]).length / ks.length : 0; };
  const add = (id, t, max, frac, dica, href, declarar) => it.push({ id, t, max, pts: Math.round(max * Math.max(0, Math.min(1, frac)) * 10) / 10, dica, href, declarar });
  add('perfil', L('Perfil da família confirmado', 'Family profile confirmed'), 8, f.updated ? 1 : 0, L('Confirma idades, pesos e telefones.', 'Confirm ages, weights and phone numbers.'), '#/t/familia');
  add('pesos', L('Crianças pesadas, para as doses certas', 'Children weighed, for the right doses'), 4, !f.children.length ? 1 : f.children.filter(c => +c.kg > 0).length / f.children.length, L('Pesa as crianças e escreve o peso no perfil.', 'Weigh the children and enter their weight in the profile.'), '#/t/familia');
  add('kit72', L('Kit de 72 horas em casa', '72-hour kit at home'), 14, prog('kit', 'kit-72h'), L('Marca na lista o que já tens.', 'Tick off on the list what you already have.'), '#/s/kit/kit-72h');
  add('mala', L('Mala de evacuação pronta', 'Grab bag ready'), 10, prog('kit', 'mala-evacuacao'), L('Marca na lista o que já está na mala.', 'Tick off on the list what is already in the bag.'), '#/s/kit/mala-evacuacao');
  const campos = ['morada', 'encontro1', 'encontro2', 'contactoFora', 'palavra', 'buscar', 'levar', 'radio'];
  add('plano', L('Plano familiar preenchido', 'Family plan filled in'), 14, campos.filter(k => String(plan[k] || '').trim()).length / campos.length, L('Pontos de encontro, contacto fora da zona, palavra-código, quem vai buscar quem e rádio.', 'Meeting points, out-of-area contact, code word, who picks up whom and radio.'), '#/t/plano');
  add('contactos', L('Pelo menos 3 contactos de emergência', 'At least 3 emergency contacts'), 5, LS.get('contacts', []).length / 3, L('Vizinhos de confiança, médico, escola, contacto fora da zona.', 'Trusted neighbours, doctor, school, out-of-area contact.'), '#/t/contactos');
  const ps = fichaPessoas();
  add('ficha', L('Ficha médica de cada pessoa', 'Medical card for each person'), 8, ps.length ? ps.filter(fichaPreenchida).length / ps.length : 0, L('Alergias, doenças, medicação e grupo sanguíneo.', 'Allergies, illnesses, medication and blood group.'), '#/t/ficha');
  const inv = LS.get('inventory', []), exp = inv.filter(x => x.expiry && +new Date(x.expiry) < now).length;
  add('validades', L('Reservas registadas e dentro da validade', 'Supplies recorded and in date'), 5, !inv.length ? 0 : exp ? 0.4 : 1, exp ? L(exp + ' artigo(s) fora de validade: consome ou substitui.', exp + ' item(s) past their expiry date: use them up or replace them.') : L('Regista a água, a comida e os medicamentos com a validade.', 'Record the water, food and medicines with their expiry dates.'), '#/t/inventario');
  const bk = dias(LS.get('lastBackup', 0));
  add('backup', L('Cópia de segurança recente', 'Recent backup'), 6, bk <= 90 ? 1 : bk <= 180 ? 0.5 : 0, L('Exporta uma cópia e guarda-a noutro telemóvel ou numa pen.', 'Export a backup and keep it on another phone or on a USB stick.'), '#/t/backup');
  add('alertas', L('Alertas no telemóvel a funcionar', 'Phone alerts working'), 8, dias(LS.get('alertasTeste', 0)) <= 180 ? 1 : 0, L('Configura os alertas e envia uma notificação de teste.', 'Set up the alerts and send a test notification.'), '#/t/alertas');
  add('mapas', L('Mapas da zona descarregados no telemóvel', 'Maps of your area downloaded to the phone'), 6, dias(decl.mapas) <= 365 ? 1 : 0, L('No Google Maps ou no Apple Maps, descarrega a zona onde vives, trabalhas e para onde evacuarias.', 'In Google Maps or Apple Maps, download the area where you live, where you work and where you would evacuate to.'), '#/s/navegar/mapa-gps', 'mapas');
  add('radio', L('Rádio a pilhas e frequência sabida', 'Battery radio and known frequency'), 6, (dias(decl.radio) <= 365 ? 0.5 : 0) + (String(plan.radio || '').trim() ? 0.5 : 0), L('Um rádio a pilhas ou de manivela, e a frequência da Antena 1 guardada no plano.', 'A battery or wind-up radio, and the frequency of Antena 1 (public radio) saved in the plan.'), '#/t/mensagens', 'radio');
  const ip = LS.get('iphone', {}) || {}, nucleo = ['sos', 'contactos-sos', 'ficha', 'alertas-gov', 'familia-toca', 'roubo'];
  add('telemovel', L('Funções de emergência do telemóvel ligadas', 'Phone emergency features turned on'), 8, nucleo.filter(k => ip[k]).length / nucleo.length, L('SOS de emergência, contactos de emergência, ficha médica no ecrã bloqueado, alertas do governo, chamadas da família e proteção contra roubo.', 'Emergency SOS, emergency contacts, Medical ID on the Lock Screen, government alerts, Emergency Bypass for family calls and Stolen Device Protection.'), '#/t/iphone');
  const sim = LS.get('simulacros', []), ds = dias(sim.length ? Math.max.apply(null, sim.map(x => x.ts)) : 0);
  add('simulacro', L('Simulacro nos últimos 6 meses', 'Drill in the last 6 months'), 6, ds <= 183 ? 1 : ds <= 365 ? 0.5 : 0, L('Treinem uma situação em família: 10 minutos chegam.', 'Practise a scenario as a family: 10 minutes is enough.'), '#/t/preparacao');
  const total = it.reduce((a, x) => a + x.max, 0), pct = Math.round(it.reduce((a, x) => a + x.pts, 0) / total * 100);
  return { pct, itens: it, rotulo: pct >= 85 ? L('Muito bem preparados', 'Very well prepared') : pct >= 60 ? L('Bom caminho', 'On the right track') : pct >= 35 ? L('Começaram', 'Made a start') : L('Ainda no início', 'Just getting started') };
}
function prepAnel(pct, px) {
  const r = 42, c = 2 * Math.PI * r, cor = pct >= 60 ? 'var(--ok)' : pct >= 35 ? 'var(--warn)' : 'var(--danger)';
  return '<svg class="prep-anel" viewBox="0 0 100 100" width="' + px + '" height="' + px + '" role="img" aria-label="' + pct + L('% preparados', '% prepared') + '"><circle cx="50" cy="50" r="' + r + '" fill="none" stroke="var(--bg3)" stroke-width="10"/><circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + cor + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + (c * pct / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 50 50)"/><text x="50" y="58" text-anchor="middle" font-size="24" font-weight="800" fill="currentColor">' + pct + '%</text></svg>';
}
function prepHTML() {
  const e = prepEstado(), falta = e.itens.filter(x => x.pts < x.max).sort((a, b) => (b.max - b.pts) - (a.max - a.pts));
  return '<a class="tile prep-tile" href="#/t/preparacao">' + prepAnel(e.pct, 64) + '<span><span class="t">' + L('Nível de preparação', 'Preparedness level') + '</span><br><span class="d">' + esc(e.rotulo) + (falta.length ? L('. A seguir: ', '. Next: ') + esc(falta[0].dica) : '') + '</span></span></a>';
}
TOOLS.push({ id: 'preparacao', section: 'meus', icon: '📊', title: L('Nível de preparação', 'Preparedness level'), desc: L('Uma percentagem com o que já está feito e o que falta, por ordem de importância, e simulacros para treinar em família.', 'A percentage showing what is already done and what is still missing, in order of importance, and drills to practise as a family.'),
  render(el) {
    const draw = () => {
      const e = prepEstado(), falta = e.itens.filter(x => x.pts < x.max).sort((a, b) => (b.max - b.pts) - (a.max - a.pts)), feitos = e.itens.filter(x => x.pts >= x.max), sim = LS.get('simulacros', []).slice().sort((a, b) => b.ts - a.ts);
      const item = x => '<li><div class="main"><div class="t">' + (x.pts >= x.max ? '✅ ' : '') + esc(x.t) + '</div><div class="s">' + esc(x.dica) + '</div><div class="progress"><div style="width:' + Math.round(x.pts / x.max * 100) + '%"></div></div></div><div class="acts">' + (x.declarar && x.pts < x.max ? '<button class="btn sm" data-decl="' + x.declarar + '">✓ ' + L('Já fiz', 'Done') + '</button>' : '') + '<a class="btn sm" href="' + x.href + '">' + (x.pts >= x.max ? L('Ver', 'View') : L('Fazer', 'Do it')) + '</a></div></li>';
      el.innerHTML = '<div class="card prep-top">' + prepAnel(e.pct, 132) + '<div><h2 style="margin:0">' + esc(e.rotulo) + '</h2><p class="small muted">' + L('Conta o que está registado nesta app. Revejam tudo de 6 em 6 meses.', 'Counts what is recorded in this app. Review everything every 6 months.') + '</p></div></div>' +
        (falta.length ? '<h2>' + L('O que falta, por ordem de importância', 'Still to do, in order of importance') + '</h2><ul class="list">' + falta.map(item).join('') + '</ul>' : '<div class="callout ok">' + L('Está tudo feito. Revejam de 6 em 6 meses e façam um simulacro.', 'Everything is done. Review it every 6 months and do a drill.') + '</div>') +
        (feitos.length ? '<details><summary>' + L('Já feito (', 'Already done (') + feitos.length + ')</summary><ul class="list">' + feitos.map(item).join('') + '</ul></details>' : '') +
        '<h2>' + L('Simulacros em família', 'Family drills') + '</h2><p class="small">' + L('Treinar uma vez faz com que, no dia a sério, o corpo saiba o que fazer. As crianças aprendem a brincar.', 'Practising once means that, when it happens for real, your body knows what to do. Children learn through play.') + '</p>' +
        SIMULACROS.map(s => '<div class="card"><strong>' + s[1] + '</strong><p class="small">' + esc(s[2]) + '</p><button class="btn sm primary" data-sim="' + s[0] + '">✓ ' + L('Fizemos hoje', 'We did it today') + '</button></div>').join('') +
        (sim.length ? '<h3>' + L('Registo dos simulacros', 'Drill log') + '</h3><ul class="list">' + sim.slice(0, 12).map(x => { const s = SIMULACROS.find(y => y[0] === x.tipo) || ['', x.tipo]; return '<li><div class="main"><div class="t">' + s[1] + '</div><div class="s">' + esc(fmtDate(x.ts)) + '</div></div><div class="acts"><button class="btn sm danger" data-simdel="' + x.ts + '" title="' + L('Apagar', 'Delete') + '">🗑</button></div></li>'; }).join('') + '</ul><p class="small muted">' + L('Próximo simulacro sugerido: ', 'Next suggested drill: ') + new Date(sim[0].ts + 183 * 864e5).toLocaleDateString(LOCALE) + '.</p>' : '');
      $$('[data-decl]', el).forEach(b => b.onclick = () => { const d = LS.get('prepDecl', {}) || {}; d[b.dataset.decl] = Date.now(); LS.set('prepDecl', d); toast(L('Registado', 'Recorded')); draw(); });
      $$('[data-sim]', el).forEach(b => b.onclick = () => { const l = LS.get('simulacros', []); l.push({ ts: Date.now(), tipo: b.dataset.sim }); LS.set('simulacros', l); toast(L('Simulacro registado', 'Drill recorded')); draw(); });
      $$('[data-simdel]', el).forEach(b => b.onclick = () => { if (!confirm(L('Apagar este registo?', 'Delete this record?'))) return; LS.set('simulacros', LS.get('simulacros', []).filter(x => String(x.ts) !== b.dataset.simdel)); draw(); });
    };
    draw();
  } });
