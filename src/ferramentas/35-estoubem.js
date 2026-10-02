/* --- «Estou bem»: estado da família por notificação (ntfy), com a posição GPS, e SMS quando não há internet --- */
// Tópico privado da família no ntfy, passado por QR (abre a app já com o tópico) ou colado. Cada telemóvel envia «estou bem»,
// «preciso de ajuda» ou uma mensagem; todos os telemóveis subscritos recebem a notificação, mesmo com a app fechada.
// O ntfy.sh guarda as mensagens 12 horas; a app lê-as por polling (sem ligação permanente) e guarda no telemóvel as que já viu (48 horas).
function estouBemCfg() { return Object.assign({ topico: '', eu: '', teste: 0, lido: 0, pos: null }, LS.get('estouBem', {}) || {}); }
function estouBemTopico() { const a = new Uint8Array(12); crypto.getRandomValues(a); return 'safety-fam-' + Array.from(a, b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join(''); }
function estouBemLink(topico) { return /^https?:\/\//.test(location.href) && !/^(localhost|127\.)/.test(location.hostname) ? location.origin + location.pathname + '?fam=' + encodeURIComponent(topico) + '#/t/estoubem' : ''; }
/* mensagem do ntfy → { id, ts, tipo (ok, sos, msg), nome, texto, lat, lon }: o tipo e o nome vêm do título, a posição da ligação do mapa */
function estouBemParse(m) {
  const t = String(m.title || '').trim(), r = t.match(/^(✅|🆘|💬)\s*(.+?)(?:\s+(está bem|is OK|precisa de ajuda|needs help))?$/u);
  const c = String(m.click || '').match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  return { id: m.id, ts: (+m.time || 0) * 1000, tipo: !r ? 'msg' : r[1] === '✅' ? 'ok' : r[1] === '🆘' ? 'sos' : 'msg', nome: r ? r[2] : (t || L('Alguém', 'Someone')), texto: String(m.message || ''), lat: c ? +c[1] : null, lon: c ? +c[2] : null };
}
TOOLS.push({ id: 'estoubem', section: 'ferramentas', icon: '✅', title: L('Estou bem (família)', 'I’m OK (family)'), desc: L('Um toque avisa toda a família de que estás bem, ou de que precisas de ajuda, com a tua posição: chega como notificação a cada telemóvel, mesmo com a app fechada, por qualquer internet. Sem internet, sai por SMS. Vês também o último estado de cada pessoa.', 'One tap tells the whole family that you are OK, or that you need help, with your location: it arrives as a notification on every phone, even with the app closed, over any internet connection. Without internet, it goes out by SMS. You also see each person’s latest status.'),
  render(el) {
    let cfg = estouBemCfg(), timer = null, ocupado = false;
    const guarda = () => LS.set('estouBem', cfg);
    const hm = ts => new Date(ts).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
    const q = s => $(s, el);
    // tópico vindo do QR de outro telemóvel (?fam=…)
    try { const f = new URLSearchParams(location.search).get('fam'); if (f) { if (/^[\w-]{8,64}$/.test(f) && f !== cfg.topico && (!cfg.topico || confirm(L('Este telemóvel já tem um tópico da família. Substituir pelo do QR que leste?', 'This phone already has a family topic. Replace it with the one from the QR you scanned?')))) { cfg.topico = f; LS.del('estouBemRecebidas'); guarda(); toast(L('Tópico da família recebido', 'Family topic received'), 3500); } const u = new URL(location.href); u.searchParams.delete('fam'); history.replaceState(null, '', u.href); } } catch (e) { }
    if (!cfg.eu) { const a = getFamily().adults[0]; cfg.eu = String((a && a.name) || '').trim(); }
    const pronto = () => !!(cfg.topico && String(cfg.eu || '').trim());
    const estado = m => { const s = q('#ebst'); if (s) s.textContent = m; };
    const posicao = ms => new Promise(res => { if (!navigator.geolocation) return res(null); let fim = false; const dar = v => { if (!fim) { fim = true; res(v); } }; const t = setTimeout(() => dar(null), ms); navigator.geolocation.getCurrentPosition(p => { clearTimeout(t); dar({ lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy, ts: Date.now() }); }, () => { clearTimeout(t); dar(null); }, { enableHighAccuracy: true, timeout: ms, maximumAge: 120000 }); });
    const numerosSMS = () => { const ps = smsPessoas(), sel = LS.get('smsPara', null), nums = sel ? ps.filter(p => sel.indexOf(p.tel) >= 0).map(p => p.tel) : []; return nums.length ? nums : ps.slice(0, 3).map(p => p.tel); };
    const cache = () => LS.get('estouBemRecebidas', {}) || {};
    const enviar = async (tipo, nota) => {
      if (ocupado) return;
      if (!cfg.topico) return toast(L('Cria ou recebe primeiro o tópico da família (em baixo)', 'Create or receive the family topic first (below)'));
      const eu = String(cfg.eu || '').trim(); if (!eu) { toast(L('Escreve o teu nome em «Quem sou eu»', 'Write your name under “Who am I”')); const i = q('#ebeu'); if (i) i.focus(); return; }
      ocupado = true; estado(L('A obter a posição…', 'Getting your location…'));
      const p = await posicao(8000); if (p) { cfg.pos = p; guarda(); }
      const link = p ? 'https://maps.google.com/?q=' + p.lat.toFixed(5) + ',' + p.lon.toFixed(5) : '';
      const st = tipo === 'ok' ? L('está bem', 'is OK') : tipo === 'sos' ? L('precisa de ajuda', 'needs help') : '';
      const title = (tipo === 'ok' ? '✅ ' : tipo === 'sos' ? '🆘 ' : '💬 ') + eu + (st ? ' ' + st : '');
      const linhas = [eu + (st ? ' ' + st : '') + ' · ' + hm(Date.now())]; if (nota) linhas.push(nota);
      linhas.push(p ? '📍 ' + L('Posição', 'Location') + ' (±' + Math.round(p.acc) + ' m): ' + link : '📍 ' + L('Sem posição GPS', 'No GPS position'));
      const corpo = { topic: cfg.topico, title, message: linhas.join('\n'), priority: tipo === 'sos' ? 5 : 4 }; if (link) corpo.click = link;
      estado(L('A enviar…', 'Sending…'));
      try {
        if (!navigator.onLine) throw new Error('offline');
        const r = await fetch(NTFY_SERVIDOR, { method: 'POST', body: JSON.stringify(corpo), credentials: 'omit', referrerPolicy: 'no-referrer', signal: AbortSignal.timeout(10000) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        cfg.teste = Date.now(); guarda(); ocupado = false; q('#ebsms').innerHTML = '';
        const c = cache(); c['local-' + cfg.teste] = { id: 'local-' + cfg.teste, ts: cfg.teste, tipo, nome: eu, texto: linhas.join('\n'), lat: p ? p.lat : null, lon: p ? p.lon : null, local: true }; LS.set('estouBemRecebidas', c); drawLista('');
        estado('✅ ' + L('Enviado à família às ', 'Sent to the family at ') + hm(Date.now()) + (p ? '' : L(' (sem posição GPS)', ' (without GPS position)')) + '.');
        toast(L('Enviado à família', 'Sent to the family'));
        setTimeout(carregar, 2000);
      } catch (e) {
        ocupado = false;
        const texto = title + '\n' + linhas.join('\n'), nums = numerosSMS();
        estado(L('Sem internet, ou o ntfy não respondeu.', 'No internet, or ntfy did not answer.'));
        q('#ebsms').innerHTML = nums.length ? '<div class="callout warn"><strong>' + L('Envia por SMS:', 'Send by SMS:') + '</strong> ' + L('a mensagem fica pronta na app Mensagens, para ' + nums.length + ' número(s).', 'the message is ready in the Messages app, for ' + nums.length + ' number(s).') + '<div class="btnrow"><a class="btn primary" href="' + esc(smsHref(nums, texto)) + '">💬 ' + L('Abrir SMS', 'Open SMS') + '</a><a class="btn" href="#/t/mensagens">' + L('Escolher números', 'Choose numbers') + '</a></div></div>' : '<div class="callout warn">' + L('Sem internet e sem números para SMS: põe os telefones dos adultos no <a href="#/t/familia">perfil da família</a>.', 'No internet and no numbers for SMS: add the adults’ phone numbers to the <a href="#/t/familia">family profile</a>.') + '</div>';
      }
    };
    const carregar = async () => {
      if (!cfg.topico) return;
      if (!navigator.onLine) { drawLista(L('Sem internet: a mostrar o que já tinha sido recebido.', 'No internet: showing what was already received.')); return; }
      try {
        const r = await fetch(NTFY_SERVIDOR + encodeURIComponent(cfg.topico) + '/json?poll=1&since=12h', { credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: AbortSignal.timeout(15000) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const c = cache(); (await r.text()).split('\n').forEach(l => { if (!l.trim()) return; try { const m = JSON.parse(l); if (m.event === 'message' && m.id) { const x = estouBemParse(m); c[m.id] = x; Object.keys(c).forEach(k => { if (c[k].local && c[k].nome === x.nome && Math.abs(c[k].ts - x.ts) < 120000) delete c[k]; }); } } catch (e) { } });
        const lim = Date.now() - 48 * 36e5; Object.keys(c).forEach(k => { if (!c[k].ts || c[k].ts < lim) delete c[k]; });
        LS.set('estouBemRecebidas', c); cfg.lido = Date.now(); guarda(); drawLista('');
      } catch (e) { drawLista(L('Não foi possível ler o ntfy (', 'Could not read ntfy (') + ((e && e.message) || e) + ').'); }
    };
    const drawLista = aviso => {
      const box = q('#eblista'); if (!box) return;
      const todas = Object.values(cache()).sort((a, b) => b.ts - a.ts), ult = new Map(); todas.forEach(m => { if (!ult.has(m.nome)) ult.set(m.nome, m); });
      const ref = cfg.pos && Date.now() - cfg.pos.ts < 6 * 36e5 ? cfg.pos : null;
      const linha = m => {
        const d = ref && m.lat != null ? distKm(ref, m) : null, nota = m.texto.split('\n').filter(l => l.trim() && !/^📍/.test(l) && !/ · \d{1,2}:\d{2}$/.test(l)).join(' ');
        return '<li class="eb-p eb-' + m.tipo + '"><span class="eb-ic">' + (m.tipo === 'ok' ? '✅' : m.tipo === 'sos' ? '🆘' : '💬') + '</span><div class="eb-txt"><strong>' + esc(m.nome) + '</strong> ' + esc(m.tipo === 'ok' ? L('está bem', 'is OK') : m.tipo === 'sos' ? L('precisa de ajuda', 'needs help') : '') +
          ' <span class="muted small">· ' + esc(nwAgo(m.ts)) + ' (' + hm(m.ts) + ')' + (d != null ? ' · ' + esc(L('a ' + fmtKm(d) + ' a ' + rumoTexto(ref, m) + ' de ti', fmtKm(d) + ' ' + rumoTexto(ref, m) + ' of you')) : '') + '</span>' + (nota ? '<div class="small">' + esc(nota) + '</div>' : '') + '</div>' +
          (m.lat != null ? '<a class="btn sm" target="_blank" rel="noopener noreferrer" href="https://maps.google.com/?q=' + m.lat + ',' + m.lon + '" title="' + L('Ver no mapa', 'See on the map') + '">🗺️</a>' : '') + '</li>';
      };
      box.innerHTML = (aviso ? '<p class="small muted">' + esc(aviso) + '</p>' : '') + (ult.size ? '<ul class="eb-l">' + [...ult.values()].map(linha).join('') + '</ul>' : '<p class="muted small">' + L('Ainda não há mensagens da família nas últimas horas.', 'No messages from the family in the last few hours yet.') + '</p>') +
        (todas.length > ult.size ? '<details><summary class="small">' + L('Histórico (' + todas.length + ' mensagens)', 'History (' + todas.length + ' messages)') + '</summary><ul class="eb-l">' + todas.map(linha).join('') + '</ul></details>' : '') +
        '<p class="small muted">' + (cfg.lido ? L('Lido ', 'Read ') + esc(nwAgo(cfg.lido)) + '. ' : '') + L('O ntfy.sh guarda as mensagens 12 horas; a app guarda as que já viu durante 48 horas.', 'ntfy.sh keeps messages for 12 hours; the app keeps the ones it has seen for 48 hours.') + '</p>';
    };
    const draw = () => {
      const ok = pronto(), link = cfg.topico ? estouBemLink(cfg.topico) : '';
      const adultos = getFamily().adults.map(a => String(a.name || '').trim()).filter(Boolean);
      const acao = '<div class="card"><div class="btnrow"><button class="btn huge ok" id="ebok">✅ ' + L('Estou bem', 'I’m OK') + '</button></div><div class="btnrow"><button class="btn huge danger" id="ebsos">🆘 ' + L('Preciso de ajuda', 'I need help') + '</button></div>' +
        '<div class="row"><input id="ebnota" placeholder="' + L('Mensagem (opcional): ex. estou na escola com as crianças', 'Message (optional): e.g. at the school with the kids') + '" maxlength="200"><button class="btn fixed" id="ebmsg">💬 ' + L('Enviar', 'Send') + '</button></div>' +
        '<p class="small" id="ebst">' + (cfg.teste ? L('Último envio ', 'Last sent ') + esc(nwAgo(cfg.teste)) + '.' : L('Vai com a tua posição GPS, se a obtiver em 8 segundos, e chega como notificação a todos os telemóveis da família.', 'Goes out with your GPS position, if it can get it within 8 seconds, and arrives as a notification on every family phone.')) + '</p><div id="ebsms"></div></div>';
      const estadoFam = '<div class="card"><div class="situ-h"><h3>' + L('Estado da família', 'Family status') + '</h3><button class="btn sm" id="ebler">🔄 ' + L('Atualizar', 'Refresh') + '</button></div><div id="eblista"></div></div>';
      const topico = '<div class="card"><h3>' + L('1. Tópico da família', '1. Family topic') + '</h3>' + (cfg.topico ?
        '<p class="small">' + L('É a «palavra-passe» do grupo: quem o tiver envia e recebe as mensagens da família. Nos outros telemóveis, lê o QR com a câmara (abre a app já com o tópico) ou cola o tópico em «Já tenho um tópico».', 'It is the group’s “password”: whoever has it sends and receives the family’s messages. On the other phones, scan the QR with the camera (it opens the app with the topic filled in) or paste the topic under “I already have a topic”.') + '</p><div class="al-topico mono">' + esc(cfg.topico) + '</div>' +
        '<div class="qrbox">' + qrSVG(link || cfg.topico, 220) + '</div>' +
        '<div class="btnrow"><button class="btn" id="ebcopt">📋 ' + L('Copiar o tópico', 'Copy the topic') + '</button>' + (link ? '<button class="btn" id="ebcopl">🔗 ' + L('Copiar a ligação', 'Copy the link') + '</button>' : '') + '<button class="btn sm" id="ebnovo">' + L('Trocar de tópico', 'Change topic') + '</button></div>' :
        '<p class="small">' + L('Um telemóvel cria o tópico e passa-o aos outros por QR. Se já te passaram um, cola-o em baixo.', 'One phone creates the topic and passes it to the others by QR. If you were given one, paste it below.') + '</p><div class="btnrow"><button class="btn primary" id="ebcriar">' + L('Criar o tópico da família', 'Create the family topic') + '</button></div>') +
        '<label class="field"><span>' + L('Já tenho um tópico (colar)', 'I already have a topic (paste)') + '</span><div class="row"><input id="ebcolar" placeholder="safety-fam-…" autocapitalize="off" autocomplete="off"><button class="btn fixed" id="ebusar">' + L('Usar', 'Use') + '</button></div></label></div>';
      const ntfy = '<div class="card"><h3>' + L('2. A app ntfy em cada telemóvel', '2. The ntfy app on each phone') + '</h3><ol class="small"><li>' + L('Instala a app <strong>ntfy</strong> (App Store ou Google Play; gratuita, sem conta).', 'Install the <strong>ntfy</strong> app (App Store or Google Play; free, no account).') + '</li><li>' + L('Toca em <strong>+</strong>, escreve o tópico de cima e subscreve. É um tópico diferente do dos alertas: subscreve os dois.', 'Tap <strong>+</strong>, type the topic above and subscribe. It is a different topic from the alerts one: subscribe to both.') + '</li><li>' + L('Nas definições do telemóvel, deixa a ntfy mostrar notificações com som. O «Preciso de ajuda» sai com prioridade máxima: no iPhone passa o «Não incomodar» e os modos de concentração (notificação sensível ao tempo) e, se a app ntfy te pedir autorização para <strong>alertas críticos</strong>, aceita: passa a tocar mesmo com o interruptor em silêncio. Sem essa autorização, em silêncio só vibra: por isso um pedido de ajuda urgente vai também por chamada ou SMS, com a opção de emergência (Emergency Bypass) ligada nos contactos da família.', 'In the phone settings, allow ntfy to show notifications with sound. “I need help” is sent with the highest priority: on an iPhone it gets past Do Not Disturb and Focus modes (time-sensitive notification) and, if the ntfy app asks you to allow <strong>critical alerts</strong>, accept: it will then ring even with the silent switch on. Without that permission it only vibrates on silent, so an urgent call for help also goes by phone call or SMS, with Emergency Bypass turned on for the family\'s contacts.') + '</li></ol></div>';
      const eu = '<div class="card"><h3>' + L('3. Quem sou eu neste telemóvel', '3. Who am I on this phone') + '</h3><div class="row"><input id="ebeu" list="ebnomes" value="' + esc(cfg.eu) + '" placeholder="' + L('O teu nome', 'Your name') + '" maxlength="30"><datalist id="ebnomes">' + adultos.map(n => '<option value="' + esc(n) + '">').join('') + '</datalist></div><p class="small muted">' + L('Aparece nas mensagens que envias. Cada telemóvel tem o seu.', 'Shown in the messages you send. Each phone has its own.') + '</p></div>';
      const priv = '<div class="card small">' + L('<strong>Privacidade.</strong> As mensagens (nome, estado, posição) passam pelo ntfy.sh, que as guarda 12 horas. Dá o tópico só à família; se sair do vosso controlo, troca-o.', '<strong>Privacy.</strong> The messages (name, status, location) go through ntfy.sh, which keeps them for 12 hours. Only give the topic to your family; if it gets out of your control, change it.') + '</div>';
      el.innerHTML = (ok ? acao + estadoFam + topico + ntfy + eu : '<div class="callout info">' + L('Para começar: cria o tópico da família (ou cola o que te passaram), subscreve-o na app ntfy e escreve o teu nome.', 'To start: create the family topic (or paste the one you were given), subscribe to it in the ntfy app and write your name.') + '</div>' + topico + ntfy + eu + acao + estadoFam) + priv;
      q('#ebok').onclick = () => enviar('ok', q('#ebnota').value.trim());
      q('#ebsos').onclick = () => enviar('sos', q('#ebnota').value.trim());
      q('#ebmsg').onclick = () => { const n = q('#ebnota').value.trim(); if (!n) return toast(L('Escreve a mensagem', 'Write your message')); enviar('msg', n); };
      q('#ebler').onclick = () => carregar();
      if (q('#ebcriar')) q('#ebcriar').onclick = () => { cfg.topico = estouBemTopico(); guarda(); draw(); };
      q('#ebusar').onclick = () => { let t = q('#ebcolar').value.trim().replace(/^.*[?&]fam=/, '').replace(/[#&].*$/, ''); try { t = decodeURIComponent(t); } catch (e) { } if (!/^[\w-]{8,64}$/.test(t)) return toast(L('Tópico inválido', 'Invalid topic')); cfg.topico = t; LS.del('estouBemRecebidas'); guarda(); draw(); };
      if (q('#ebcopt')) q('#ebcopt').onclick = () => copyText(cfg.topico);
      if (q('#ebcopl')) q('#ebcopl').onclick = () => copyText(link);
      if (q('#ebnovo')) q('#ebnovo').onclick = () => { if (!confirm(L('Trocar de tópico? Todos os telemóveis da família têm de ler o QR novo e subscrevê-lo na app ntfy.', 'Change the topic? Every family phone must scan the new QR and subscribe to it in the ntfy app.'))) return; cfg.topico = estouBemTopico(); LS.del('estouBemRecebidas'); guarda(); draw(); };
      q('#ebeu').oninput = () => { cfg.eu = q('#ebeu').value.trim(); guarda(); };
      drawLista(''); if (cfg.topico) carregar();
    };
    draw();
    timer = setInterval(() => { if (document.visibilityState === 'visible' && cfg.topico && navigator.onLine) carregar(); }, 60000);
    return () => clearInterval(timer);
  } });
