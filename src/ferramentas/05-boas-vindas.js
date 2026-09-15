/* --- Primeira abertura: quem é a família --- */
// Enquanto o perfil da família não estiver confirmado, o início mostra estas perguntas em vez de assumir 2 adultos e 2 crianças.
// Os atalhos diretos (#/t/guia, SOS, 112, lanterna) nunca passam por aqui. «Agora não» vale só para esta sessão: a pergunta volta na abertura seguinte.
function boasVindasPendente() {
  if (!STORAGE_OK || getFamily().updated) return false;
  try { return sessionStorage.getItem('prep.boasVindasAdiada') !== '1'; } catch (e) { return true; }
}
function renderBoasVindas() {
  const guardada = LS.get('family', null), f0 = getFamily();
  const st = {
    adultos: guardada ? Math.max(1, f0.adults.length) : 1,
    criancas: guardada ? f0.children.map(c => ({ name: c.name || '', sex: c.sex || '', age: c.age === '' || c.age == null ? '' : Math.max(0, +c.age || 0), kg: c.kg || '' })) : [],
    caes: guardada ? +f0.dogs || 0 : 0,
    gatos: guardada ? +f0.cats || 0 : 0
  };
  let tentou = false;
  const idade = n => n === 0 ? L('menos de 1 ano', 'under 1 year') : n + (n === 1 ? L(' ano', ' year') : L(' anos', ' years'));
  const passo = (id, n, min, max) => '<div class="bv-passo"><button class="btn fixed" data-menos="' + id + '"' + (n <= min ? ' disabled' : '') + ' aria-label="' + L('Menos', 'Fewer') + '">−</button><span class="bv-n">' + n + '</span><button class="btn fixed" data-mais="' + id + '"' + (n >= max ? ' disabled' : '') + ' aria-label="' + L('Mais', 'More') + '">＋</button></div>';
  const irInicio = () => { if (location.hash === '' || location.hash === '#/' || location.hash === '#') route(); else location.hash = '#/'; };
  const draw = () => {
    const falta = st.criancas.some(c => c.age === '');
    setMain('<article class="bv"><h1>👋 ' + L('Bem-vindo', 'Welcome') + '</h1>' +
      '<p>' + L('A Safety &amp; Security adapta os guias à tua família: água e comida para cada pessoa, doses das crianças pelo peso, planos e cartões. Diz quem vive contigo; fica guardado só neste dispositivo.', 'Safety &amp; Security adapts its guides to your family: water and food for each person, children’s doses by weight, plans and ID cards. Tell it who lives with you; this is stored only on this device.') + '</p>' +
      '<a class="btn huge danger noprint" href="#/t/guia">🚨 ' + L('É uma emergência? Abrir já o modo emergência', 'Is this an emergency? Open Emergency mode now') + '</a>' +
      '<div class="card"><h3>🌐 Idioma · Language</h3><div class="btnrow"><button class="btn' + (EN ? '' : ' primary') + '" data-lang="pt" lang="pt-PT">🇵🇹 Português</button><button class="btn' + (EN ? ' primary' : '') + '" data-lang="en" lang="en">🇬🇧 English</button></div></div>' +
      '<div class="card"><h3>' + L('Adultos', 'Adults') + '</h3>' + passo('adultos', st.adultos, 1, 8) + '</div>' +
      '<div class="card"><h3>' + L('Crianças (até aos 17 anos)', 'Children (up to 17)') + '</h3>' + passo('criancas', st.criancas.length, 0, 8) +
      st.criancas.map((c, i) => '<div class="bv-crianca' + (tentou && c.age === '' ? ' bv-falta' : '') + '"><strong class="bv-num">' + L('Criança ', 'Child ') + (i + 1) + '</strong>' +
        '<label class="field"><span>' + L('Idade', 'Age') + '</span><select data-c="' + i + '" data-k="age"><option value="">' + L('Escolhe…', 'Choose…') + '</option>' + Array.from({ length: 18 }, (_, n) => '<option value="' + n + '"' + (c.age === n ? ' selected' : '') + '>' + idade(n) + '</option>').join('') + '</select></label>' +
        '<label class="field"><span>' + L('Menina ou menino', 'Girl or boy') + '</span><select data-c="' + i + '" data-k="sex"><option value="">—</option><option value="f"' + (c.sex === 'f' ? ' selected' : '') + '>' + L('menina', 'girl') + '</option><option value="m"' + (c.sex === 'm' ? ' selected' : '') + '>' + L('menino', 'boy') + '</option></select></label>' +
        '<label class="field"><span>' + L('Nome (opcional)', 'Name (optional)') + '</span><input data-c="' + i + '" data-k="name" value="' + esc(c.name) + '" autocomplete="off"></label>' +
        '<label class="field"><span>' + L('Peso em kg (opcional)', 'Weight in kg (optional)') + '</span><input type="number" min="2" max="100" step="0.5" data-c="' + i + '" data-k="kg" value="' + esc(c.kg) + '" placeholder="' + (c.age === '' ? '' : '≈ ' + estKg(c.age)) + '"></label></div>').join('') + '</div>' +
      '<div class="card"><h3>' + L('Animais', 'Pets') + '</h3><div class="row"><div class="fixed"><span class="small muted">' + L('Cães', 'Dogs') + '</span>' + passo('caes', st.caes, 0, 9) + '</div><div class="fixed"><span class="small muted">' + L('Gatos', 'Cats') + '</span>' + passo('gatos', st.gatos, 0, 9) + '</div></div></div>' +
      (tentou && falta ? '<div class="callout warn">' + L('Escolhe a idade de cada criança.', 'Choose each child’s age.') + '</div>' : '') +
      '<div class="btnrow"><button class="btn big primary" id="bvguardar">✅ ' + L('Guardar e começar', 'Save and start') + '</button><button class="btn" id="bvadiar">' + L('Agora não', 'Not now') + '</button></div>' +
      '<p class="small muted">' + L('Nomes dos adultos, telefones, alergias e o resto podem ficar para depois, em Os meus dados › Perfil da família. Sem peso, a app estima-o pela idade. Com «Agora não», os guias usam um exemplo (2 adultos e crianças de 2 e 7 anos) e esta pergunta volta na próxima abertura.', 'Adults’ names, phone numbers, allergies and the rest can wait: My data › Family profile. Without a weight, the app estimates it from the age. With “Not now”, the guides use an example (2 adults and children aged 2 and 7) and this question comes back the next time you open the app.') + '</p></article>');
    const main = $('#main');
    $$('[data-menos],[data-mais]', main).forEach(b => b.onclick = () => {
      const id = b.dataset.menos || b.dataset.mais, d = b.dataset.menos ? -1 : 1;
      if (id === 'criancas') { if (d > 0) st.criancas.push({ name: '', sex: '', age: '', kg: '' }); else st.criancas.pop(); }
      else st[id] = Math.max(id === 'adultos' ? 1 : 0, st[id] + d);
      draw();
    });
    $$('[data-c]', main).forEach(x => x.oninput = x.onchange = () => {
      const c = st.criancas[+x.dataset.c], k = x.dataset.k;
      c[k] = k === 'age' ? (x.value === '' ? '' : +x.value) : x.value;
      if (k === 'age') { const kg = main.querySelector('[data-c="' + x.dataset.c + '"][data-k="kg"]'); if (kg) kg.placeholder = c.age === '' ? '' : '≈ ' + estKg(c.age); x.closest('.bv-crianca').classList.remove('bv-falta'); }
    });
    $('#bvguardar', main).onclick = () => {
      tentou = true;
      if (st.criancas.some(c => c.age === '')) { draw(); const m = $('.bv-falta select', $('#main')); if (m) m.focus(); return; }
      const f = getFamily();
      f.adults = Array.from({ length: st.adultos }, (_, i) => (guardada && f.adults[i]) || { name: '', phone: '', health: '' });
      f.children = st.criancas.map((c, i) => ({ name: String(c.name || '').trim(), sex: c.sex, age: +c.age, kg: c.kg === '' ? '' : Math.max(0, +c.kg || 0), health: (guardada && f.children[i] && f.children[i].health) || '' }));
      f.dogs = st.caes; f.cats = st.gatos;
      saveFamily(f);
      toast(L('Família guardada: os guias já usam os vossos dados', 'Family saved: the guides now use your details'), 3200);
      irInicio();
    };
    $('#bvadiar', main).onclick = () => { try { sessionStorage.setItem('prep.boasVindasAdiada', '1'); } catch (e) { } irInicio(); };
  };
  draw();
}
