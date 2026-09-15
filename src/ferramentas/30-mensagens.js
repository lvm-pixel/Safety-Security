/* --- Mensagens sem internet: SMS prontos, rádio, códigos QR e bilhete para a porta --- */
const SMS_MODELOS = EN ? [
  ['✅ We are OK', 'We are OK. {{local}}'],
  ['🆘 We need help', 'We need help. Call me or call 112. {{local}}'],
  ['📍 Going to the meeting point', 'We are going to the meeting point: {{encontro1}}. {{local}}'],
  ['🏫 We can\'t stay at home', 'We cannot stay at home. We are going to: {{encontro2}}. {{local}}'],
  ['🧒 I\'ll pick up the children', 'I will pick up {{kids_para}}. {{local}}'],
  ['🔋 Low battery', 'I am OK but my battery is low. I will switch my phone on for 5 minutes every hour, on the hour. {{local}}']
] : [
  ['✅ Estamos bem', 'Estamos bem. {{local}}'],
  ['🆘 Precisamos de ajuda', 'Precisamos de ajuda. Liga-me ou chama o 112. {{local}}'],
  ['📍 Vamos para o ponto de encontro', 'Vamos para o ponto de encontro: {{encontro1}}. {{local}}'],
  ['🏫 Não dá para ficar em casa', 'Não conseguimos ficar em casa. Vamos para: {{encontro2}}. {{local}}'],
  ['🧒 Eu vou buscar as crianças', 'Eu vou buscar {{kids_para}}. {{local}}'],
  ['🔋 Pouca bateria', 'Estou bem mas com pouca bateria. Ligo o telemóvel 5 minutos às horas certas. {{local}}']
];
function smsIOS() { return /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
function smsHref(nums, texto) {
  const n = nums.map(x => String(x).replace(/[^\d+]/g, '')).filter(Boolean), b = encodeURIComponent(texto);
  if (smsIOS()) return n.length > 1 ? 'sms:/open?addresses=' + n.join(',') + '&body=' + b : 'sms:' + (n[0] || '') + '&body=' + b;
  return 'sms:' + n.join(',') + '?body=' + b;
}
function smsPessoas() {
  const f = getFamily(), out = [], vistos = new Set();
  const junta = (nome, tel, rel) => { const t = String(tel || '').replace(/[^\d+]/g, ''); if (t.length < 6 || vistos.has(t)) return; vistos.add(t); out.push({ nome: String(nome || '').trim() || t, tel: t, rel: rel || '' }); };
  f.adults.forEach((a, i) => junta(a.name || (i === 0 ? L('Adulto A', 'Adult A') : L('Adulto B', 'Adult B')), a.phone, L('família', 'family')));
  LS.get('contacts', []).forEach(c => junta(c.name, c.phone, c.rel));
  return out;
}
TOOLS.push({ id: 'mensagens', section: 'ferramentas', icon: '💬', title: L('Mensagens sem internet', 'Messages without internet'), desc: L('SMS prontos com a tua localização, a frequência da Antena 1 na tua zona, códigos QR para passar contactos e pontos de encontro entre telemóveis, e bilhete para deixar à família.', 'Ready-made SMS with your location, the Antena 1 (public radio) frequency for your area, QR codes to pass contacts and meeting points between phones, and a note to leave for the family.'),
  render(el) {
    let aba = LS.get('msgAba', 'sms'), local = '';
    const plan = LS.get('plan', {}), T = famTokens();
    const ABAS = [['sms', L('✉️ SMS rápidos', '✉️ Quick SMS')], ['radio', L('📻 Rádio', '📻 Radio')], ['qr', L('🔳 Códigos QR', '🔳 QR codes')], ['bilhete', L('📝 Bilhete', '📝 Note')]];
    document.body.classList.add('print-only-tool');
    const draw = () => {
      el.innerHTML = '<div class="fambar noprint">' + ABAS.map(a => '<button class="btn sm' + (a[0] === aba ? ' primary' : '') + '" data-aba="' + a[0] + '">' + a[1] + '</button>').join('') + '</div><div id="mbody"></div>';
      $$('[data-aba]', el).forEach(b => b.onclick = () => { aba = b.dataset.aba; LS.set('msgAba', aba); draw(); });
      ({ sms: abaSMS, radio: abaRadio, qr: abaQR, bilhete: abaBilhete }[aba] || abaSMS)($('#mbody', el));
    };
    const abaSMS = box => {
      const pessoas = smsPessoas(), sel = new Set(LS.get('smsPara', pessoas.slice(0, 3).map(p => p.tel)));
      const para = () => pessoas.filter(p => sel.has(p.tel)).map(p => p.tel);
      const texto = m => m.replace('{{local}}', local).replace('{{encontro1}}', String(plan.encontro1 || '').trim() || L('o ponto de encontro combinado', 'the agreed meeting point')).replace('{{encontro2}}', String(plan.encontro2 || '').trim() || L('o segundo ponto de encontro', 'the second meeting point')).replace('{{kids_para}}', T.kids_para).replace(/\s+/g, ' ').trim();
      box.innerHTML = md(L('>i O SMS passa quando as chamadas e a internet falham, porque usa muito pouca rede. Escreve curto e envia uma vez: repetir satura a rede.', '>i SMS messages get through when calls and the internet fail, because they use very little network capacity. Keep it short and send it once: resending overloads the network.'), 'smsinfo') +
        '<div class="card"><h3>' + L('Para quem', 'Send to') + '</h3>' + (pessoas.length ? '<div class="fambar">' + pessoas.map(p => '<label class="btn sm' + (sel.has(p.tel) ? ' primary' : '') + '"><input type="checkbox" data-tel="' + esc(p.tel) + '"' + (sel.has(p.tel) ? ' checked' : '') + ' style="display:none">' + esc(p.nome) + '</label>').join('') + '</div>' : '<p class="small">' + L('Ainda não há telefones: junta-os no <a href="#/t/familia">perfil da família</a> e nos <a href="#/t/contactos">contactos</a>.', 'No phone numbers yet: add them in the <a href="#/t/familia">family profile</a> and in <a href="#/t/contactos">contacts</a>.') + '</p>') +
        '<div class="btnrow"><button class="btn" id="sloc">' + (local ? L('📍 Localização incluída', '📍 Location included') : L('📍 Incluir a minha localização', '📍 Include my location')) + '</button></div><p class="small muted" id="slocst">' + (local ? esc(local) : L('O GPS funciona sem internet. A mensagem leva as coordenadas e um link de mapa.', 'GPS works without internet. The message includes the coordinates and a map link.')) + '</p></div>' +
        SMS_MODELOS.map((m, i) => { const tt = texto(m[1]); return '<div class="card"><div class="t"><strong>' + esc(m[0]) + '</strong></div><p>' + esc(tt) + '</p><div class="btnrow"><a class="btn primary" href="' + esc(smsHref(para(), tt)) + '">' + L('💬 Enviar SMS', '💬 Send SMS') + '</a>' + (navigator.share ? '<button class="btn" data-share="' + i + '">' + L('📤 Partilhar', '📤 Share') + '</button>' : '') + '<button class="btn" data-copy="' + i + '">' + L('📋 Copiar', '📋 Copy') + '</button></div></div>'; }).join('') +
        '<div class="card"><h3>' + L('Mensagem livre', 'Your own message') + '</h3><textarea id="slivre" maxlength="300" placeholder="' + L('Ex.: Estamos em casa da avó. Todos bem.', 'E.g. We are at Grandma\'s. All well.') + '"></textarea><div class="btnrow"><a class="btn primary" id="slivresend" href="sms:">' + L('💬 Enviar SMS', '💬 Send SMS') + '</a></div></div>' +
        '<p class="small muted">' + L('Com vários destinatários, alguns telemóveis só abrem a mensagem para o primeiro: nesse caso usa Partilhar ou envia a cada pessoa.', 'With several recipients, some phones only open the message for the first one: in that case use Share or send it to each person.') + '</p>';
      $$('[data-tel]', box).forEach(c => c.onchange = () => { if (c.checked) sel.add(c.dataset.tel); else sel.delete(c.dataset.tel); LS.set('smsPara', Array.from(sel)); abaSMS(box); });
      $$('[data-copy]', box).forEach(b => b.onclick = () => copyText(texto(SMS_MODELOS[+b.dataset.copy][1])));
      $$('[data-share]', box).forEach(b => b.onclick = () => navigator.share({ text: texto(SMS_MODELOS[+b.dataset.share][1]) }).catch(() => { }));
      $('#slivresend', box).onclick = e => { const t = ($('#slivre', box).value.trim() + (local ? ' ' + local : '')).trim(); if (!t) { e.preventDefault(); return toast(L('Escreve a mensagem', 'Write your message')); } e.currentTarget.href = smsHref(para(), t); };
      $('#sloc', box).onclick = () => {
        if (!navigator.geolocation) return toast(L('Este dispositivo não tem localização', 'Location is not available on this device'));
        $('#slocst', box).textContent = L('A obter a posição…', 'Getting your location…');
        navigator.geolocation.getCurrentPosition(p => { const c = p.coords.latitude.toFixed(5) + ',' + p.coords.longitude.toFixed(5); local = '📍 ' + c.replace(',', ', ') + ' (±' + Math.round(p.coords.accuracy) + ' m) https://maps.google.com/?q=' + c; abaSMS(box); },
          e => { $('#slocst', box).textContent = e && e.code === 1 ? L('Sem autorização para usar a localização.', 'No permission to use your location.') : L('Sem sinal de GPS: tenta junto a uma janela ou ao ar livre.', 'No GPS signal: try near a window or outdoors.'); }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 });
      };
    };
    const abaRadio = box => {
      const z = LS.get('radioZona', '') || minhaZona() || 'LSB', l = RADIO_A1[z] || [], ilhas = l.some(x => x[3]);
      const opt = (n, v, sel) => '<option value="' + v + '"' + (sel ? ' selected' : '') + '>' + n + '</option>';
      box.innerHTML = '<div class="card"><label class="field"><span>' + L('Zona', 'Area') + '</span><select id="rz">' + Object.keys(NEWS_AREAS).map(k => opt(esc(NEWS_AREAS[k]), k, k === z)).join('') + '</select></label>' +
        '<h3>' + L('📻 Antena 1', '📻 Antena 1 (public radio)') + '</h3><div class="tablewrap"><table><thead><tr><th>' + L('Frequência', 'Frequency') + '</th><th>' + L('Emissor', 'Transmitter') + '</th>' + (ilhas ? '<th>' + L('Ilhas', 'Islands') + '</th>' : '') + '</tr></thead><tbody>' + l.map(x => '<tr><td><strong>' + esc(L(x[0], x[0].replace(',', '.'))) + (x[1] === 'FM' ? ' FM' : ' kHz AM') + '</strong></td><td>' + esc(x[2]) + '</td>' + (ilhas ? '<td>' + esc(L(x[3] || '', (x[3] || '').replace(/ e /g, ' and '))) + '</td>' : '') + '</tr>').join('') + '</tbody></table></div>' +
        '<p class="small muted">' + L('Experimenta por ordem: apanha-se melhor a do emissor mais perto. Em onda média (AM) o som é pior, mas à noite chega mais longe. No apagão de 28 de abril de 2025 os emissores da Antena 1 não falharam. Fonte: RTP, setembro de 2026.', 'Try them in order: the nearest transmitter comes in best. On medium wave (AM) the sound is worse, but at night it reaches further. In the blackout of 28 April 2025, the Antena 1 transmitters did not fail. Source: RTP, September 2026.') + '</p></div>' +
        '<div class="card"><h3>' + L('📟 Walkie-talkies PMR446 da família', '📟 Family PMR446 walkie-talkies') + '</h3><div class="row"><label class="field"><span>' + L('Canal', 'Channel') + '</span><select id="pc">' + Array.from({ length: 16 }, (_, i) => opt(i + 1, i + 1, i === 0)).join('') + '</select></label><label class="field"><span>' + L('Código (CTCSS)', 'Code (CTCSS)') + '</span><select id="pk">' + opt(L('Sem código', 'No code'), 0, true) + Array.from({ length: 38 }, (_, i) => opt(i + 1, i + 1)).join('') + '</select></label><label class="field"><span>' + L('Quando ouvir', 'When to listen') + '</span><select id="ph">' + L(['às horas certas, 5 minutos', 'de 3 em 3 horas, 5 minutos', 'às 9 h, às 13 h e às 19 h'], ['every hour on the hour, 5 minutes', 'every 3 hours, 5 minutes', 'at 09:00, 13:00 and 19:00']).map(x => opt(x, x)).join('') + '</select></label></div>' +
        '<div class="btnrow"><button class="btn primary" id="psave">' + L('💾 Guardar no plano familiar', '💾 Save to the family plan') + '</button></div><p class="small muted">' + L('No plano: ', 'In the plan: ') + esc(plan.radio || L('ainda nada guardado', 'nothing saved yet')) + '</p></div><p class="small"><a href="#/s/comunicar/radio">' + L('Guia completo de rádio e walkie-talkies', 'Full guide to radio and walkie-talkies') + '</a></p>';
      $('#rz', box).onchange = e => { LS.set('radioZona', e.target.value); abaRadio(box); };
      $('#psave', box).onclick = () => { const p = LS.get('plan', {}), f1 = l.find(x => x[1] === 'FM'), k = +$('#pk', box).value; p.radio = 'Antena 1: ' + (f1 ? L(f1[0], f1[0].replace(',', '.')) + ' FM' : L('ver a zona', 'see the area')) + ' (' + NEWS_AREAS[z] + L('). PMR446: canal ', '). PMR446: channel ') + $('#pc', box).value + (k ? L(', código ', ', code ') + k : L(', sem código', ', no code')) + ', ' + $('#ph', box).value + '.'; LS.set('plan', p); plan.radio = p.radio; toast(L('Guardado no plano familiar', 'Saved to the family plan')); abaRadio(box); };
    };
    const abaQR = box => {
      const pessoas = smsPessoas(), pins = LS.get('waypoints', []), sub = LS.get('qrTipo', 'contacto'), esc1 = LS.get('qrEscolha', 0), ios = LS.get('qrMapa', 'apple') === 'apple';
      const vc = s => String(s).replace(/([,;\\])/g, '\\$1');
      const TIPOS = [['contacto', L('📇 Contacto', '📇 Contact')], ['ponto', L('📍 Ponto guardado', '📍 Saved point')], ['plano', L('📄 Plano em texto', '📄 Plan as text')], ['app', L('📲 Esta app', '📲 This app')]];
      let h = '<div class="fambar noprint">' + TIPOS.map(t => '<button class="btn sm' + (t[0] === sub ? ' primary' : '') + '" data-qt="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>', txt = '', nota = '';
      const escolher = (lista, nome) => '<label class="field noprint"><span>' + L('Escolhe', 'Choose') + '</span><select id="qsel">' + lista.map((x, i) => '<option value="' + i + '"' + (i === Math.min(esc1, lista.length - 1) ? ' selected' : '') + '>' + esc(nome(x)) + '</option>').join('') + '</select></label>';
      if (sub === 'contacto') {
        if (!pessoas.length) nota = L('Junta telefones no perfil da família ou nos contactos.', 'Add phone numbers in the family profile or in contacts.');
        else { const p = pessoas[Math.min(esc1, pessoas.length - 1)]; h += escolher(pessoas, x => x.nome + ' · ' + x.tel); txt = 'BEGIN:VCARD\r\nVERSION:3.0\r\nN:;' + vc(p.nome) + ';;;\r\nFN:' + vc(p.nome) + '\r\nTEL;TYPE=CELL:' + p.tel + '\r\n' + (p.rel ? 'NOTE:' + vc(p.rel) + '\r\n' : '') + 'END:VCARD'; nota = L('Aponta a câmara do outro telemóvel ao código: aparece a opção de guardar o contacto. Não precisa de internet.', 'Point the other phone\'s camera at the code: an option to save the contact appears. No internet needed.'); }
      } else if (sub === 'ponto') {
        if (!pins.length) nota = L('Ainda não há pontos guardados: guarda-os no mapa ou na ferramenta GPS.', 'No saved points yet: save them on the map or in the GPS tool.');
        else { const w = pins[Math.min(esc1, pins.length - 1)], ll = w.lat.toFixed(5) + ',' + w.lon.toFixed(5); h += escolher(pins, x => x.name) + '<div class="fambar noprint"><button class="btn sm' + (ios ? ' primary' : '') + '" data-mapa="apple">' + L('Para iPhone', 'For iPhone') + '</button><button class="btn sm' + (ios ? '' : ' primary') + '" data-mapa="google">' + L('Para Android', 'For Android') + '</button></div>'; txt = ios ? 'https://maps.apple.com/?ll=' + ll + '&q=' + encodeURIComponent(w.name) : 'https://www.google.com/maps/search/?api=1&query=' + ll; nota = L('Abre o ponto no mapa do outro telemóvel. Sem internet, só aparece com detalhe se esse telemóvel tiver a zona descarregada no mapa.', 'Opens the point on the other phone\'s map. Without internet, it only shows in detail if that phone has the area downloaded in its map app.'); }
      } else if (sub === 'plano') {
        const pal = !!LS.get('qrPalavra', false);
        txt = [L('PLANO DA FAMÍLIA', 'FAMILY PLAN'), L('Ponto de encontro 1: ', 'Meeting point 1: ') + (plan.encontro1 || '—'), L('Ponto de encontro 2: ', 'Meeting point 2: ') + (plan.encontro2 || '—'), L('Contacto fora da zona: ', 'Out-of-area contact: ') + (plan.contactoFora || '—'), L('Rádio: ', 'Radio: ') + (plan.radio || '—'), pal ? L('Palavra-código: ', 'Code word: ') + (plan.palavra || '—') : '', pessoas.length ? L('Telefones: ', 'Phones: ') + pessoas.slice(0, 4).map(p => p.nome + ' ' + p.tel).join('; ') : '', L('Emergência: 112', 'Emergency: 112')].filter(Boolean).join('\n').slice(0, 900);
        h += '<label class="field row noprint"><input type="checkbox" id="qpal" class="fixed"' + (pal ? ' checked' : '') + '><span style="flex:1">' + L('Incluir a palavra-código (mostra o código só à família)', 'Include the code word (show the code only to family)') + '</span></label>';
        nota = L('Qualquer leitor de códigos QR mostra o texto, sem internet. Revê-o antes de o mostrar a alguém.', 'Any QR code reader shows the text, without internet. Check it before showing it to anyone.');
      } else {
        txt = /^https?:$/.test(location.protocol) ? location.origin + location.pathname : '';
        nota = txt ? L('O outro telemóvel abre a app (com internet) e pode instalá-la no ecrã principal.', 'The other phone opens the app (with internet) and can add it to the Home Screen.') : L('A app está aberta como ficheiro e não tem endereço: publica-a no GitHub Pages para a passares por código QR.', 'The app is open as a file and has no web address: publish it on GitHub Pages to share it by QR code.');
      }
      let q = ''; if (txt) { try { q = qrSVG(txt); } catch (e) { q = '<div class="callout warn">' + esc((e && e.message) || e) + '</div>'; } }
      box.innerHTML = h + (q ? '<div class="qrbox">' + q + '</div>' : '') + (nota ? '<p class="small">' + esc(nota) + '</p>' : '') + (txt ? '<details class="noprint"><summary>' + L('Ver o conteúdo do código', 'Show what the code contains') + '</summary><pre class="small mono qrtxt">' + esc(txt) + '</pre></details><div class="btnrow noprint"><button class="btn" id="qprint">' + L('🖨️ Imprimir', '🖨️ Print') + '</button></div>' : '');
      $$('[data-qt]', box).forEach(b => b.onclick = () => { LS.set('qrTipo', b.dataset.qt); LS.set('qrEscolha', 0); abaQR(box); });
      $$('[data-mapa]', box).forEach(b => b.onclick = () => { LS.set('qrMapa', b.dataset.mapa); abaQR(box); });
      if ($('#qsel', box)) $('#qsel', box).onchange = e => { LS.set('qrEscolha', +e.target.value); abaQR(box); };
      if ($('#qpal', box)) $('#qpal', box).onchange = e => { LS.set('qrPalavra', e.target.checked); abaQR(box); };
      if ($('#qprint', box)) $('#qprint', box).onclick = () => window.print();
    };
    const abaBilhete = box => {
      const f = getFamily(), quem = joinE(f.adults.map(a => String(a.name || '').trim()).filter(Boolean));
      box.innerHTML = '<div class="card noprint"><div class="row"><label class="field"><span>' + L('Quem escreve', 'Written by') + '</span><input id="bq" value="' + esc(quem ? quem + (f.children.length ? L(' e as crianças', ' and the children') : '') : '') + '"></label><label class="field"><span>' + L('Estado', 'Status') + '</span><select id="be">' + L('<option>Todos bem</option><option>Há feridos ligeiros</option><option>Precisamos de ajuda</option>', '<option>Everyone is fine</option><option>Some minor injuries</option><option>We need help</option>') + '</select></label></div>' +
        field(L('Para onde vamos', 'Where we are going'), '<input id="bd" value="' + esc(plan.encontro2 || '') + '">') + field(L('Até quando, ou onde ficamos depois', 'Until when, or where we will stay afterwards'), '<input id="bu" placeholder="' + L('Ex.: ficamos lá até às 18 h; depois casa da tia Rosa', 'E.g. we will stay there until 18:00; then at Aunt Rosa\'s') + '">') + field(L('Como nos contactar', 'How to contact us'), '<input id="bc" value="' + esc(f.adults.map(a => a.phone).filter(Boolean).join(' / ')) + '">') + '</div>' +
        '<div class="bilhete" id="bprev"></div><div class="btnrow noprint"><button class="btn primary" id="bprint">' + L('🖨️ Imprimir', '🖨️ Print') + '</button><button class="btn" id="bcopy">' + L('📋 Copiar', '📋 Copy') + '</button></div>' +
        '<p class="small muted noprint">' + L('Sem impressora, copia à mão com caneta permanente e deixa-o num saco de plástico. Onde houver risco de pilhagens, deixa-o num sítio combinado só com a família em vez de na porta.', 'Without a printer, copy it by hand with a permanent marker and put it in a plastic bag. Where there is a risk of looting, leave it in a place agreed only with the family instead of on the door.') + '</p>';
      const txt = () => [$('#bq', box).value.trim(), new Date().toLocaleString(LOCALE, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }), $('#be', box).value, $('#bd', box).value.trim() ? L('Fomos para: ', 'We have gone to: ') + $('#bd', box).value.trim() : '', $('#bu', box).value.trim(), $('#bc', box).value.trim() ? L('Contacto: ', 'Contact: ') + $('#bc', box).value.trim() : ''].filter(Boolean).join('\n');
      const upd = () => { $('#bprev', box).textContent = txt(); };
      $$('input, select', box).forEach(i => { i.oninput = upd; i.onchange = upd; }); upd();
      $('#bprint', box).onclick = () => window.print();
      $('#bcopy', box).onclick = () => copyText(txt());
    };
    draw();
  } });
