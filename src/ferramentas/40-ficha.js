/* --- Ficha médica de emergência --- */
const FICHA_CAMPOS = [['sangue', L('Grupo sanguíneo', 'Blood group'), 'sel'], ['alergias', L('Alergias (medicamentos, alimentos, picadas, látex)', 'Allergies (medicines, foods, stings, latex)'), 'txt'], ['doencas', L('Doenças e condições (asma, diabetes, epilepsia, gravidez, coração)', 'Illnesses and conditions (asthma, diabetes, epilepsy, pregnancy, heart problems)'), 'txt'], ['medicacao', L('Medicação habitual (nome, dose e horário)', 'Regular medication (name, dose and times)'), 'txt'], ['dispositivos', L('Dispositivos e próteses (pacemaker, bomba de insulina, aparelho auditivo)', 'Devices and prostheses (pacemaker, insulin pump, hearing aid)'), 'txt'], ['medico', L('Médico, centro de saúde e telefone', 'Doctor, health centre and phone number'), 'txt'], ['utente', L('Número de utente do SNS (opcional)', 'SNS user number (número de utente, optional)'), 'inp'], ['notas', L('Outras informações para os socorristas', 'Other information for rescuers'), 'txt']];
const GRUPOS_SANGUE = ['', 'A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−', 'não sei'];
function fichaSangue(v) { return v === 'não sei' ? L(v, 'unknown') : v; }
function fichaPessoas() {
  const f = getFamily(), fi = LS.get('ficha', {}) || {}, out = [];
  f.adults.forEach((a, i) => out.push({ k: 'a' + i, nome: String(a.name || '').trim() || (i === 0 ? L('Adulto A', 'Adult A') : i === 1 ? L('Adulto B', 'Adult B') : L('Adulto ', 'Adult ') + (i + 1)), idade: '', kg: '', perfil: String(a.health || '').trim(), d: fi['a' + i] || {} }));
  f.children.forEach((c, i) => out.push({ k: 'c' + i, nome: String(c.name || '').trim() || L('Criança ', 'Child ') + (i + 1), idade: (+c.age || 0) < 1 ? L('bebé', 'baby') : (+c.age) + L(' anos', +c.age === 1 ? ' year' : ' years'), kg: nf(childKg(c)) + ' kg' + (+c.kg > 0 ? '' : L(' (estimado)', ' (estimated)')), perfil: String(c.health || '').trim(), d: fi['c' + i] || {} }));
  return out;
}
function fichaContactos() {
  const f = getFamily(), plan = LS.get('plan', {}), l = f.adults.filter(a => String(a.phone || '').trim()).map(a => [String(a.name || '').trim() || L('Família', 'Family'), String(a.phone).trim()]);
  if (String(plan.contactoFora || '').trim()) l.push([L('Contacto fora da zona', 'Out-of-area contact'), String(plan.contactoFora).trim()]);
  return l.slice(0, 4);
}
function fichaPreenchida(p) { return FICHA_CAMPOS.some(c => String(p.d[c[0]] || '').trim()); }
function fichaMostrar() {
  const ps = fichaPessoas(), cs = fichaContactos(), div = document.createElement('div');
  div.className = 'fz-show';
  div.innerHTML = '<div class="fz-bar"><strong>🩺 ' + L('Ficha médica de emergência', 'Emergency medical card') + '</strong><button class="btn" data-fechar="1">✕ ' + L('Fechar', 'Close') + '</button></div>' +
    ps.map(p => '<section class="fz-p"><h2>' + esc(p.nome) + (p.idade ? ' <small>' + esc(p.idade) + (p.kg ? ', ' + esc(p.kg) : '') + '</small>' : '') + '</h2>' +
      FICHA_CAMPOS.filter(c => String(p.d[c[0]] || '').trim()).map(c => '<div class="fz-l"><span>' + esc(c[1].replace(/ \(.*\)$/, '')) + '</span><strong>' + esc(c[0] === 'sangue' ? fichaSangue(p.d[c[0]]) : p.d[c[0]]) + '</strong></div>').join('') +
      (p.perfil ? '<div class="fz-l"><span>' + L('Saúde (perfil)', 'Health (profile)') + '</span><strong>' + esc(p.perfil) + '</strong></div>' : '') +
      (!fichaPreenchida(p) && !p.perfil ? '<p class="fz-vazio">' + L('Sem informação registada.', 'No information recorded.') + '</p>' : '') + '</section>').join('') +
    (cs.length ? '<section class="fz-p"><h2>' + L('Contactos', 'Contacts') + '</h2>' + cs.map(c => '<div class="fz-l"><span>' + esc(c[0]) + '</span><strong><a href="tel:' + esc(c[1].replace(/[^\d+]/g, '')) + '">' + esc(c[1]) + '</a></strong></div>').join('') + '</section>' : '');
  document.body.appendChild(div);
  const fechar = () => { div.remove(); window.removeEventListener('hashchange', fechar); };
  $('[data-fechar]', div).onclick = fechar;
  window.addEventListener('hashchange', fechar);
}
function fichaImagem(op) {
  const W = 1170, H = 2532, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d'), X = 110, MAX = W - 220, FONTE = '-apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  const letra = (px, peso) => { g.font = (peso || 400) + ' ' + px + 'px ' + FONTE; };
  const partir = (txt, px, peso) => { letra(px, peso); const out = []; let cur = ''; String(txt).split(/\s+/).forEach(w => { const t = cur ? cur + ' ' + w : w; if (cur && g.measureText(t).width > MAX) { out.push(cur); cur = w; } else cur = t; }); if (cur) out.push(cur); return out; };
  const caixa = (x, y, w, h, r) => { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); g.fill(); };
  g.fillStyle = '#0b1220'; g.fillRect(0, 0, W, H);
  let y = Math.round(H * 0.4);
  g.fillStyle = 'rgba(255,255,255,0.07)'; caixa(70, y, W - 140, H - y - 90, 44);
  g.fillStyle = '#d63031'; caixa(70, y, W - 140, 170, 44);
  g.fillStyle = '#fff'; letra(66, 800); g.fillText(L('EM CASO DE EMERGÊNCIA', 'IN CASE OF EMERGENCY'), X, y + 88); letra(38, 500); g.fillText(L('In case of emergency · Ligar 112', 'Em caso de emergência · Call 112'), X, y + 140);
  y += 240;
  const escreve = (txt, px, peso, cor, espaco) => { for (const l of partir(txt, px, peso)) { if (y > H - 160) return false; g.fillStyle = cor; letra(px, peso); g.fillText(l, X, y); y += Math.round(px * 1.3); } y += espaco || 0; return true; };
  if (op.contactos) { const cs = fichaContactos(); if (cs.length) { escreve(L('Contactos', 'Contacts'), 38, 600, '#9fb3c8', 4); cs.forEach(c => { escreve(c[0], 40, 500, '#dfe7ef'); escreve(c[1], 58, 800, '#fff', 14); }); y += 16; } }
  fichaPessoas().forEach(p => {
    const partes = [];
    if (op.sangue && p.d.sangue) partes.push(L('Sangue ', 'Blood group ') + fichaSangue(p.d.sangue));
    if (op.alergias && String(p.d.alergias || '').trim()) partes.push(L('Alergias: ', 'Allergies: ') + p.d.alergias);
    if (op.doencas && String(p.d.doencas || '').trim()) partes.push(p.d.doencas);
    if (op.medicacao && String(p.d.medicacao || '').trim()) partes.push(L('Medicação: ', 'Medication: ') + p.d.medicacao);
    if (!partes.length) return;
    escreve(p.nome + (p.idade ? ' (' + p.idade + ')' : ''), 46, 700, '#fff');
    partes.forEach(t => escreve(t, 40, 400, '#dfe7ef'));
    y += 18;
  });
  return new Promise(res => cv.toBlob(res, 'image/png'));
}
TOOLS.push({ id: 'ficha', section: 'meus', icon: '🩺', title: L('Ficha médica de emergência', 'Emergency medical card'), desc: L('Alergias, doenças, medicação e grupo sanguíneo de cada pessoa, prontos a mostrar aos bombeiros ou ao INEM, e uma imagem para o ecrã de bloqueio do telemóvel.', 'Allergies, illnesses, medication and blood group for each person, ready to show to the bombeiros (fire brigade) or INEM (medical emergency service), and an image for the phone\'s lock screen.'),
  render(el) {
    const fi = LS.get('ficha', {}) || {}, op = Object.assign({ contactos: true, sangue: true, alergias: true, doencas: true, medicacao: false }, LS.get('fichaImgOp', {}));
    let timer = null, urlImg = '';
    const guardar = () => { timer = null; LS.set('ficha', fi); const s = $('#fsaved', el); if (s) s.textContent = L('Guardado às ', 'Saved at ') + new Date().toLocaleTimeString(LOCALE); };
    const OPS = [['contactos', L('Contactos da família', 'Family contacts')], ['sangue', L('Grupo sanguíneo', 'Blood group')], ['alergias', L('Alergias', 'Allergies')], ['doencas', L('Doenças e condições', 'Illnesses and conditions')], ['medicacao', L('Medicação', 'Medication')]];
    el.innerHTML = '<div class="btnrow"><button class="btn big primary" id="fmostrar">🚑 ' + L('Mostrar ao socorrista', 'Show to rescuers') + '</button><button class="btn big" id="fprint">🖨️ ' + L('Imprimir', 'Print') + '</button></div>' +
      '<p class="small muted">' + L('Nomes, idades e pesos vêm do <a href="#/t/familia">perfil da família</a>. Tudo fica só neste dispositivo e é guardado automaticamente.', 'Names, ages and weights come from the <a href="#/t/familia">family profile</a>. Everything stays on this device only and is saved automatically.') + '</p>' +
      fichaPessoas().map(p => '<div class="card"><h3>' + esc(p.nome) + (p.idade ? ' <span class="badge">' + esc(p.idade) + (p.kg ? ' · ' + esc(p.kg) : '') + '</span>' : '') + '</h3>' + (p.perfil ? '<p class="small muted">' + L('No perfil: ', 'In the profile: ') + esc(p.perfil) + '</p>' : '') +
        FICHA_CAMPOS.map(c => { const v = String((fi[p.k] || {})[c[0]] || ''), at = ' data-p="' + p.k + '" data-c="' + c[0] + '"'; return field(esc(c[1]), c[2] === 'sel' ? '<select' + at + '>' + GRUPOS_SANGUE.map(gs => '<option value="' + gs + '"' + (gs === v ? ' selected' : '') + '>' + (fichaSangue(gs) || '—') + '</option>').join('') + '</select>' : c[2] === 'inp' ? '<input' + at + ' value="' + esc(v) + '">' : '<textarea' + at + ' rows="2">' + esc(v) + '</textarea>'); }).join('') + '</div>').join('') +
      '<p class="small muted" id="fsaved"></p>' +
      '<div class="card"><h3>🖼️ ' + L('Imagem para o ecrã de bloqueio', 'Lock screen image') + '</h3><p class="small">' + L('Quem te socorrer vê-a sem desbloquear o telemóvel, mas fica à vista de qualquer pessoa: escolhe só o necessário.', 'Whoever helps you can see it without unlocking the phone, but so can anyone else: choose only what is necessary.') + '</p><div class="fambar">' + OPS.map(o => '<label class="btn sm' + (op[o[0]] ? ' primary' : '') + '"><input type="checkbox" data-op="' + o[0] + '"' + (op[o[0]] ? ' checked' : '') + ' style="display:none">' + o[1] + '</label>').join('') + '</div>' +
      '<div class="btnrow"><button class="btn primary" id="fgerar">' + L('Criar imagem', 'Create image') + '</button></div><div id="fimg"></div><p class="small muted">' + L('No iPhone: guarda a imagem nas Fotos, abre-a, toca em partilhar e em «Usar como papel de parede», e escolhe o ecrã bloqueado. No Android: mantém o dedo na imagem da galeria e escolhe definir como fundo do ecrã de bloqueio.', 'On iPhone: save the image to Photos, open it, tap Share and then “Use as Wallpaper”, and choose the Lock Screen. On Android: press and hold the image in the gallery and choose to set it as the lock screen wallpaper.') + '</p></div>' +
      md(L('## Ficha médica do próprio telemóvel\n\n- **iPhone:** app Saúde › a tua fotografia › Ficha médica › Editar, e ativa «Mostrar quando bloqueado». Os socorristas veem-na em «Emergência», no ecrã de bloqueio.\n- **Android:** Definições › Segurança e emergência › Informações médicas (o nome muda com a marca).\n\nPreenche as duas: a do telemóvel e esta, que também imprime e se mostra num toque.', '## Medical ID on the phone itself\n\n- **iPhone:** Health app › your profile picture › Medical ID › Edit, and turn on “Show When Locked”. Rescuers can see it under “Emergency” on the Lock Screen.\n- **Android:** Settings › Safety and emergency › Medical information (the name varies by brand).\n\nFill in both: the one on the phone and this one, which can also be printed and shown with one tap.'), 'fichaos');
    $$('[data-p]', el).forEach(i => { i.oninput = i.onchange = () => { const k = i.dataset.p; fi[k] = fi[k] || {}; fi[k][i.dataset.c] = i.value; clearTimeout(timer); timer = setTimeout(guardar, 400); }; });
    $$('[data-op]', el).forEach(c => c.onchange = () => { op[c.dataset.op] = c.checked; LS.set('fichaImgOp', op); c.parentNode.classList.toggle('primary', c.checked); });
    $('#fmostrar', el).onclick = () => { if (timer) { clearTimeout(timer); guardar(); } fichaMostrar(); };
    $('#fgerar', el).onclick = async () => {
      if (timer) { clearTimeout(timer); guardar(); }
      const blob = await fichaImagem(op); if (!blob) return toast(L('Este browser não conseguiu criar a imagem', 'This browser could not create the image'));
      if (urlImg) URL.revokeObjectURL(urlImg); urlImg = URL.createObjectURL(blob);
      const file = new File([blob], L('ficha-emergencia.png', 'emergency-card.png'), { type: 'image/png' }), podePartilhar = !!(navigator.canShare && navigator.canShare({ files: [file] }));
      $('#fimg', el).innerHTML = '<img class="fz-img" src="' + urlImg + '" alt="' + L('Imagem para o ecrã de bloqueio', 'Lock screen image') + '"><div class="btnrow">' + (podePartilhar ? '<button class="btn primary" id="fshare">📤 ' + L('Guardar ou partilhar', 'Save or share') + '</button>' : '') + '<button class="btn" id="fdown">⬇️ ' + L('Descarregar', 'Download') + '</button></div>';
      if (podePartilhar) $('#fshare', el).onclick = () => navigator.share({ files: [file], title: L('Ficha de emergência', 'Emergency card') }).catch(() => { });
      $('#fdown', el).onclick = () => download(blob, L('ficha-emergencia.png', 'emergency-card.png'));
    };
    $('#fprint', el).onclick = () => {
      if (timer) { clearTimeout(timer); guardar(); }
      const w = $('#main'), old = w.innerHTML, cs = fichaContactos();
      w.innerHTML = '<article><h1>' + L('Ficha médica de emergência', 'Emergency medical card') + '</h1>' + fichaPessoas().map(p => '<h2>' + esc(p.nome) + (p.idade ? ' (' + esc(p.idade) + (p.kg ? ', ' + esc(p.kg) : '') + ')' : '') + '</h2>' + FICHA_CAMPOS.filter(c => String(p.d[c[0]] || '').trim()).map(c => '<p><strong>' + esc(c[1].replace(/ \(.*\)$/, '')) + ':</strong> ' + esc(c[0] === 'sangue' ? fichaSangue(p.d[c[0]]) : p.d[c[0]]) + '</p>').join('') + (p.perfil ? '<p><strong>' + L('Saúde:', 'Health:') + '</strong> ' + esc(p.perfil) + '</p>' : '')).join('') + (cs.length ? '<h2>' + L('Contactos', 'Contacts') + '</h2>' + cs.map(c => '<p>' + esc(c[0]) + ': ' + esc(c[1]) + '</p>').join('') : '') + '<p class="small">' + L('Impresso em ', 'Printed on ') + new Date().toLocaleDateString(LOCALE) + L('. Emergência: 112.', '. Emergency: 112.') + '</p></article>';
      window.print(); setTimeout(() => { w.innerHTML = old; route(); }, 500);
    };
    return () => { if (timer) { clearTimeout(timer); guardar(); } if (urlImg) URL.revokeObjectURL(urlImg); };
  } });
