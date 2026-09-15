/* --- Modo emergência: um passo de cada vez --- */
function guiaTokens() {
  const f = getFamily(), plan = LS.get('plan', {}), kids = kidsSorted(f), C = kids.length, t = Object.assign({}, famTokens(f));
  kids.forEach((k, i) => { k.forms = childForms(k, i === 0 ? 1 : 2, C); });
  PLAN_FIELDS.forEach(pf => { const v = String(plan[pf[0]] || '').trim(); t['plano_' + pf[0]] = v || L('ainda por preencher no plano familiar', 'not yet filled in the family plan'); });
  t.radio_zona = radioZonaTexto(minhaZona());
  t.familia_adr = (C ? kids.map(k => k.forms.label + ' (' + nf(childKg(k)) + ' kg): ' + adrDose(childKg(k))).join('; ') + '; ' : '') + L('adultos: 0,3 mg, só se receitada', 'adults: 0.3 mg, only if prescribed');
  t.familia_para = C ? kids.map(k => k.forms.label + ' ' + nf(doseCalc(childKg(k), 15, 40, 1000).ml) + L(' ml de xarope a 40 mg/ml', ' ml of 40 mg/ml syrup')).join('; ') : L('vê as doses pelo peso da criança', 'look up the doses for the child\'s weight');
  t.familia_ki = (C ? kids.map(k => k.forms.label + ' ' + kiDose(k.age)).join('; ') + '; ' : '') + L('adultos 130 mg', 'adults 130 mg');
  return t;
}
function guiaPosicao(box, onPos) {
  if (!navigator.geolocation) return toast(L('Este dispositivo não tem localização', 'Location is not available on this device'));
  box.innerHTML = '<div class="card small">' + L('📍 A obter a posição. O GPS funciona sem internet, melhor ao ar livre.', '📍 Getting your location. GPS works without internet, best outdoors.') + '</div>';
  navigator.geolocation.getCurrentPosition(p => {
    const la = p.coords.latitude, lo = p.coords.longitude, txt = la.toFixed(5) + ', ' + lo.toFixed(5);
    const dms = (v, pos, neg) => { const a = Math.abs(v), g = Math.floor(a), m = Math.floor((a - g) * 60), s = ((a - g) * 60 - m) * 60; return g + '°' + pad(m) + '\'' + s.toFixed(1) + '"' + (v >= 0 ? pos : neg); };
    box.innerHTML = '<div class="card gz-pos"><div class="small muted">' + L('Diz ao 112 a latitude e depois a longitude (precisão ±', 'Tell 112 the latitude and then the longitude (accuracy ±') + Math.round(p.coords.accuracy) + ' m)</div><div class="gz-coords mono">' + txt + '</div><div class="small mono">' + dms(la, 'N', 'S') + ' ' + dms(lo, 'E', L('O', 'W')) + '</div><div class="btnrow"><button class="btn sm" data-copiar="1">' + L('📋 Copiar', '📋 Copy') + '</button><a class="btn sm" href="#/t/mensagens">' + L('💬 Enviar por SMS', '💬 Send by SMS') + '</a></div></div>';
    $('[data-copiar]', box).onclick = () => copyText(txt);
    if (onPos) onPos(txt);
  }, e => { box.innerHTML = '<div class="card small">' + L('Não foi possível obter a posição', 'Could not get your location') + (e && e.code === 1 ? L(': a app não tem autorização para usar a localização.', ': the app is not allowed to use your location.') : L('. Tenta ao ar livre ou junto a uma janela.', '. Try outdoors or near a window.')) + '</div>'; }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 });
}
TOOLS.push({ id: 'guia', section: 'ferramentas', icon: '🚨', title: L('Modo emergência', 'Emergency mode'), desc: L('Escolhe o que está a acontecer e segue um passo de cada vez, com temporizadores, leitura em voz alta e os dados da família. Funciona sem rede.', 'Choose what is happening and follow one step at a time, with timers, reading aloud and your family\'s details. Works offline.'),
  render(el) {
    let st = LS.get('guiaAtual', null), timer = null, voz = !!LS.get('guiaVoz', false);
    const tk = guiaTokens();
    const guia = id => GUIAS.find(g => g.id === id);
    const hm = ts => new Date(ts).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
    const mmss = s => pad(Math.floor(s / 60)) + ':' + pad(Math.floor(s % 60));
    const save = () => { if (st) { st.ult = Date.now(); LS.set('guiaAtual', st); } };
    const reg = txt => { if (st) { st.reg.push([Date.now(), txt]); save(); } };
    const parar = () => { clearInterval(timer); timer = null; };
    const falar = txt => { if (!window.speechSynthesis) return toast(L('Leitura em voz alta não disponível neste dispositivo', 'Reading aloud is not available on this device')); speechSynthesis.cancel(); const v = speechVoice(); (String(txt).match(/[^.!?\n]+[.!?]?/g) || [String(txt)]).forEach(fr => { const u = new SpeechSynthesisUtterance(fr); u.lang = LOCALE; if (v) u.voice = v; u.rate = 0.95; speechSynthesis.speak(u); }); };
    const alarme = () => { tone(1200, 0.25, 'square', 0.7); setTimeout(() => tone(1200, 0.25, 'square', 0.7), 350); setTimeout(() => tone(1200, 0.5, 'square', 0.7), 700); if (navigator.vibrate) navigator.vibrate([400, 150, 400, 150, 600]); };
    const registo = () => '<details class="gz-reg"><summary>' + L('🕒 Registo com as horas (', '🕒 Time log (') + st.reg.length + ')</summary><ol class="small">' + st.reg.map(r => '<li><span class="mono">' + new Date(r[0]).toLocaleTimeString(LOCALE) + '</span> ' + esc(r[1]) + '</li>').join('') + '</ol><button class="btn sm" id="gcopia">' + L('📋 Copiar para o 112, o INEM ou o médico', '📋 Copy for 112, INEM or the doctor') + '</button></details>';
    const ligaRegisto = () => { const b = $('#gcopia', el); if (b) b.onclick = () => copyText(guia(st.id).t + '\n' + st.reg.map(r => new Date(r[0]).toLocaleTimeString(LOCALE) + ' ' + r[1]).join('\n')); };
    const iniciar = (id, manter) => { const g = guia(id); if (!g) return; const antes = manter && st ? st : null; st = { id, i: 0, hist: [], inicio: antes ? antes.inicio : Date.now(), reg: antes ? antes.reg : [], vistos: {} }; reg(L('Início: ', 'Start: ') + g.t); passo(); };
    const menu = () => {
      parar(); keepAwake(false);
      const g = st && !st.feito && guia(st.id), bot = x => '<button class="gz-sit" data-g="' + x.id + '"><span class="ic">' + x.icon + '</span><span>' + esc(fill(x.t, tk)) + '</span></button>';
      el.innerHTML = (g ? '<div class="callout warn"><strong>' + L('Guia a meio:', 'Guide in progress:') + '</strong> ' + g.icon + ' ' + esc(g.t) + L(', começado ' + esc(nwAgo(st.inicio)) + '.', ', started ' + esc(nwAgo(st.inicio)) + '.') + '<div class="btnrow"><button class="btn primary" id="gcont">' + L('▶ Continuar', '▶ Resume') + '</button><button class="btn" id="gfim">' + L('Terminar', 'End') + '</button></div></div>' : '') +
        '<a class="btn huge danger" href="tel:112">' + L('📞 Ligar 112', '📞 Call 112') + '</a>' +
        (smsIOS() ? '<p class="small">' + L('📱 No iPhone, carregar 5 vezes no botão lateral também liga ao 112 e, se estiver configurado, envia a tua localização aos contactos de emergência. <a href="#/t/iphone">Preparar o iPhone</a>', '📱 On iPhone, pressing the side button 5 times also calls 112 and, if set up, sends your location to your emergency contacts. <a href="#/t/iphone">Set up the iPhone</a>') + '</p>' : '') +
        '<div class="btnrow"><button class="btn big" id="gpos">' + L('📍 A minha posição', '📍 My location') + '</button><a class="btn big" href="#/t/sos">🆘 SOS</a><button class="btn big" id="gficha">' + L('🩺 Ficha médica', '🩺 Medical card') + '</button></div><div id="gposout"></div>' +
        '<h2>' + L('Pessoas', 'People') + '</h2><div class="gz-grid">' + GUIAS.filter(x => x.grupo === 'pessoas').map(bot).join('') + '</div>' +
        '<h2>' + L('Casa e zona', 'Home and area') + '</h2><div class="gz-grid">' + GUIAS.filter(x => x.grupo !== 'pessoas').map(bot).join('') + '</div>' +
        '<label class="field row"><input type="checkbox" id="gvoz" class="fixed"' + (voz ? ' checked' : '') + '><span style="flex:1">' + L('Ler cada passo em voz alta', 'Read each step aloud') + '</span></label>' +
        '<p class="small muted">' + L('Os passos resumem os guias de <a href="#/s/agora">Emergência agora</a> e <a href="#/s/socorros">Primeiros socorros</a>. Com perigo de vida, liga primeiro ao 112.', 'The steps summarise the guides in <a href="#/s/agora">Emergency now</a> and <a href="#/s/socorros">First aid</a>. If a life is in danger, call 112 first.') + '</p>';
      $$('[data-g]', el).forEach(b => b.onclick = () => iniciar(b.dataset.g));
      $('#gpos', el).onclick = () => guiaPosicao($('#gposout', el));
      $('#gficha', el).onclick = () => fichaMostrar();
      $('#gvoz', el).onchange = e => { voz = e.target.checked; LS.set('guiaVoz', voz); };
      if (g) { $('#gcont', el).onclick = passo; $('#gfim', el).onclick = () => { st = null; LS.del('guiaAtual'); menu(); }; }
    };
    const concluido = () => {
      parar(); keepAwake(false); const g = guia(st.id);
      if (!st.feito) { st.feito = true; reg(L('Fim: ', 'End: ') + g.t); }
      el.innerHTML = '<div class="card"><h2>✓ ' + g.icon + ' ' + esc(g.t) + '</h2><p>' + L('Se ainda houver perigo, liga 112. Quando estiveres em segurança, avisa a família.', 'If there is still danger, call 112. When you are safe, let the family know.') + '</p><div class="btnrow"><a class="btn big" href="#/t/mensagens">' + L('💬 Avisar a família', '💬 Tell the family') + '</a><a class="btn big" href="' + g.pag + '">' + L('📖 Guia completo', '📖 Full guide') + '</a></div></div>' + registo() +
        '<div class="btnrow"><button class="btn" id="gvolta">' + L('◀ Voltar ao último passo', '◀ Back to the last step') + '</button><button class="btn primary" id="gmenu">' + L('Outra situação', 'Another situation') + '</button></div>';
      ligaRegisto();
      $('#gvolta', el).onclick = () => { st.feito = false; save(); passo(); };
      $('#gmenu', el).onclick = () => { st = null; LS.del('guiaAtual'); menu(); };
    };
    function passo() {
      parar();
      const g = st && guia(st.id); if (!g) { st = null; LS.del('guiaAtual'); return menu(); }
      if (st.i < 0 || st.i >= g.passos.length) return concluido();
      const p = g.passos[st.i], pos = id => g.passos.findIndex(x => x.id === id);
      keepAwake(true); st.vistos = st.vistos || {};
      if (!st.vistos[st.i]) { st.vistos[st.i] = 1; reg(fill(p.t, tk)); } else save();
      let h = '<div class="gz-head"><span class="gz-title">' + g.icon + ' ' + esc(g.t) + '</span><span class="gz-count">' + L('Passo ', 'Step ') + (st.hist.length + 1) + '</span><button class="btn sm" id="gsair">' + L('✕ Sair', '✕ Exit') + '</button></div>' +
        '<div class="card gz-step' + (p.ligar ? ' gz-ligar' : '') + '"><h2 class="gz-t">' + esc(fill(p.t, tk)) + '</h2>' + (p.d ? '<div class="gz-d">' + fillHTML(md(p.d, 'guia'), tk) + '</div>' : '');
      if (p.ligar) h += '<a class="btn huge danger" href="tel:112">' + L('📞 Ligar 112', '📞 Call 112') + '</a>';
      if (smsIOS() && (p.ios || p.ligar)) h += '<div class="callout note small">📱 ' + [p.ios ? fill(p.ios, tk) : '', p.ligar ? L('Sem rede nem Wi-Fi, liga na mesma para o 112: num iPhone 14 ou mais recente, o telemóvel oferece pedir ajuda por satélite.', 'With no mobile network or Wi-Fi, call 112 anyway: on an iPhone 14 or later, the phone offers Emergency SOS via satellite.') : ''].filter(Boolean).map(esc).join(' ') + '</div>';
      if (p.tempo) h += '<div class="gz-timer"><div class="small muted">' + esc(p.tempoT || L('Temporizador', 'Timer')) + '</div><div class="bigdisplay" id="gtd">' + mmss(p.tempo) + '</div><div class="btnrow" style="justify-content:center"><button class="btn big" id="gts">' + L('▶ Iniciar', '▶ Start') + '</button><button class="btn big" id="gtr" title="' + L('Repor', 'Reset') + '">↺</button></div></div>';
      if (p.crono) h += '<div class="gz-timer"><div class="small muted">' + L('Tempo desde o início', 'Time since the start') + '</div><div class="bigdisplay" id="gcd">00:00</div><div id="gcn"></div></div>';
      if (p.hora) { const hr = st.horas && st.horas[st.i]; h += '<div class="gz-timer">' + (hr ? '<div class="small muted">' + esc(p.hora) + '</div><div class="bigdisplay">' + hm(hr) + '</div>' : '<button class="btn big" id="ghora">' + L('🕒 Registar a hora: ', '🕒 Log the time: ') + esc(p.hora) + '</button>') + '</div>'; }
      if (p.ferr && findTool(p.ferr)) { const t = findTool(p.ferr); h += '<div class="btnrow"><a class="btn big" href="#/t/' + p.ferr + '">' + t.icon + ' ' + esc(t.title) + '</a></div>'; }
      if (p.abrir) h += '<div class="btnrow">' + p.abrir.map(id => { const o = guia(id); return o ? '<button class="btn" data-abrir="' + id + '">' + o.icon + L(' Passo a passo: ', ' Step by step: ') + esc(o.t) + '</button>' : ''; }).join('') + '</div>';
      if (p.p) h += '<div class="gz-q"><div class="gz-qt">' + esc(fill(p.p.q, tk)) + '</div><div class="gz-qb"><button class="btn big ok" data-r="sim">' + esc(p.p.simT || L('Sim', 'Yes')) + '</button><button class="btn big primary" data-r="nao">' + esc(p.p.naoT || L('Não', 'No')) + '</button></div></div>';
      h += '</div><div class="gz-nav"><button class="btn big" id="gprev"' + (st.hist.length ? '' : ' disabled') + '>' + L('◀ Anterior', '◀ Previous') + '</button>' + (p.p ? '' : '<button class="btn big primary" id="gnext">' + (p.fim ? L('✓ Terminar', '✓ Finish') : L('Seguinte ▶', 'Next ▶')) + '</button>') + '</div>' +
        '<div class="btnrow"><button class="btn sm" id="gler">' + L('🔊 Ler', '🔊 Read aloud') + '</button><button class="btn sm" id="gpos">' + L('📍 Posição', '📍 Location') + '</button><button class="btn sm" id="gficha">' + L('🩺 Ficha médica', '🩺 Medical card') + '</button><a class="btn sm" href="' + g.pag + '">' + L('📖 Guia completo', '📖 Full guide') + '</a></div><div id="gposout"></div>' + registo();
      el.innerHTML = h;
      ligaRegisto();
      const avancar = alvo => { st.hist.push(st.i); st.i = alvo; save(); passo(); if (voz) lerPasso(); };
      $('#gsair', el).onclick = () => { parar(); menu(); };
      $('#gprev', el).onclick = () => { if (!st.hist.length) return; st.i = st.hist.pop(); save(); passo(); };
      if ($('#gnext', el)) $('#gnext', el).onclick = () => { if (p.fim) return concluido(); const a = p.seg ? pos(p.seg) : st.i + 1; avancar(a >= 0 ? a : st.i + 1); };
      $$('[data-r]', el).forEach(b => b.onclick = () => { const r = b.dataset.r, a = pos(p.p[r]); reg(fill(p.p.q, tk) + ' ' + (r === 'sim' ? (p.p.simT || L('Sim', 'Yes')) : (p.p.naoT || L('Não', 'No')))); avancar(a >= 0 ? a : st.i + 1); });
      $$('[data-abrir]', el).forEach(b => b.onclick = () => iniciar(b.dataset.abrir, true));
      $('#gler', el).onclick = lerPasso;
      $('#gpos', el).onclick = () => guiaPosicao($('#gposout', el), txt => reg(L('Posição: ', 'Location: ') + txt));
      $('#gficha', el).onclick = () => fichaMostrar();
      if ($('#ghora', el)) $('#ghora', el).onclick = () => { st.horas = st.horas || {}; st.horas[st.i] = Date.now(); reg(p.hora + ': ' + hm(st.horas[st.i])); passo(); };
      if (p.tempo) {
        let resta = p.tempo, fimEm = 0; const d = $('#gtd', el), b = $('#gts', el);
        b.onclick = () => {
          if (timer) { parar(); b.textContent = L('▶ Continuar', '▶ Resume'); return; }
          if (resta <= 0) resta = p.tempo;
          b.textContent = L('⏸ Pausa', '⏸ Pause'); fimEm = Date.now() + resta * 1000; reg((p.tempoT || L('Temporizador', 'Timer')) + L(': início', ': started'));
          timer = setInterval(() => { resta = Math.max(0, Math.round((fimEm - Date.now()) / 1000)); d.textContent = mmss(resta); if (!resta) { parar(); b.textContent = L('▶ Repetir', '▶ Repeat'); alarme(); toast((p.tempoT || L('Temporizador', 'Timer')) + L(': terminou', ': finished')); reg((p.tempoT || L('Temporizador', 'Timer')) + L(': terminou', ': finished')); } }, 250);
        };
        $('#gtr', el).onclick = () => { parar(); resta = p.tempo; d.textContent = mmss(resta); b.textContent = L('▶ Iniciar', '▶ Start'); };
      }
      if (p.crono) {
        const d = $('#gcd', el), n = $('#gcn', el);
        const upd = () => { const s = Math.floor((Date.now() - st.inicio) / 1000); d.textContent = mmss(s); if (s >= p.crono) { n.innerHTML = '<span class="badge danger">' + esc(p.cronoT) + '</span>'; st.avisos = st.avisos || {}; if (!st.avisos[st.i]) { st.avisos[st.i] = 1; alarme(); reg(p.cronoT); } } };
        upd(); timer = setInterval(upd, 500);
      }
    }
    function lerPasso() { const s = $('.gz-step', el); if (s) falar(s.innerText.replace(EN ? /📞 Call 112/g : /📞 Ligar 112/g, L('Liga 112.', 'Call 112.')).replace(/\s+/g, ' ')); }
    if (st && !st.feito && Date.now() - (st.ult || st.inicio) < 3 * 36e5) passo(); else menu();
    return () => { parar(); if (window.speechSynthesis) speechSynthesis.cancel(); };
  } });
