/* --- Preparar o iPhone: as funções de emergência que o telemóvel já tem, e atalhos de um toque ---
   Função: [id, título, para que serve, como fazer (Markdown simples), requisito]. Os nomes dos menus mudam um pouco entre versões do iOS. */
const IPHONE_GRUPOS = EN ? [
  ['Get help', [
    ['sos', 'Emergency SOS', 'Calls 112 and sends your location to your emergency contacts, even with the phone locked.', 'In **Settings**, search for “SOS” and open **Emergency SOS**. Turn on **Call with 5 Button Presses** and **Call Quietly**, which turns off the warning sound: useful if you have to hide.\n\nTo use it: press the side button 5 times in a row, or press and hold the side button and one of the volume buttons.', ''],
    ['contactos-sos', 'Emergency contacts', 'When you use Emergency SOS, they get a message with your location.', 'In the **Health** app, tap your picture, then **Medical ID**, then **Edit**. Under **Emergency Contacts**, add the adults in the family and the out-of-area contact.', ''],
    ['ficha', 'Medical ID on the Lock Screen', 'First responders can see allergies, medical conditions and medication without unlocking the phone.', 'In the same **Medical ID**, turn on **Show When Locked** and copy what is in [this app’s medical card](#/t/ficha). The iPhone Medical ID is only for the owner of the phone: for the children, use the Lock Screen image.', ''],
    ['satelite', 'Emergency SOS via satellite: try the demo', 'With no mobile signal or Wi-Fi, the iPhone guides you to point it at the satellite and lets you exchange messages with 112.', 'In **Settings**, search for “satellite”, open **Emergency SOS via satellite** and tap **Try Demo**, which does not call 112. It needs a clear view of the sky. In a real emergency, call 112: with no signal, the iPhone offers to get help via satellite.', 'iPhone 14 or later'],
    ['acidentes', 'Crash Detection', 'In a serious car crash, if you do not respond, the iPhone calls 112 by itself.', 'In **Settings › Emergency SOS**, check that **Call After Severe Crash** is on. It is on by default.', 'iPhone 14 or later'],
    ['criancas-112', 'The children know how to call 112', 'With the phone locked, anyone can call 112.', 'From age 5 or 6, show them the passcode screen: tap **Emergency**, dial 112 and say where they are. Practise by pretending, without calling.', 'Children old enough']
  ]],
  ['Get warnings', [
    ['alertas-gov', 'Government Alerts turned on', 'This is the official way to warn people about a danger in the area.', 'In **Settings › Notifications**, at the bottom of the page, under **Government Alerts**, turn on the emergency and public safety alerts and, if it is there, the option to always deliver them, even on silent.', ''],
    ['sons', 'Sound Recognition', 'The iPhone alerts you when it hears a smoke alarm, a fire alarm or a siren: useful when sleeping with headphones on or for people who are hard of hearing.', 'In **Settings › Accessibility › Sound Recognition**, turn it on and choose the alarms in **Sounds**. It does not replace smoke alarms.', ''],
    ['familia-toca', 'Family calls always ring', 'With the phone on silent or in Do Not Disturb, the family can still reach you.', 'In **Contacts**, open each adult in the family, tap **Edit**, then **Ringtone**, and turn on **Emergency Bypass**. Do the same for **Text Tone**.', ''],
    ['alertas-app', 'Alerts for your area on your phone', 'IPMA (weather institute) warnings, nearby earthquakes and maximum fire danger, even with the app closed.', 'Follow the steps in [Phone alerts](#/t/alertas). It is marked as done when you send the test notification.', '']
  ]],
  ['Keep the family connected', [
    ['localizacao', 'Location shared with the family', 'Everyone knows where the others are without having to call, and calls are what overload the network in a crisis.', 'In the **Find My** app, under **People**, share your location with the adults in the family, or turn on **Location Sharing** in **Family Sharing**.', ''],
    ['checkin', 'Check In in Messages', 'When someone goes to pick up the children or evacuates, the family gets a notification when they arrive. If they do not arrive, the family gets their location and battery level.', 'In a **Messages** conversation, tap **+**, then **More**, then **Check In**. Both phones need iOS 17 or later and a network connection.', 'iOS 17 or later'],
    ['wifi', 'Wi-Fi Calling', 'If the mobile network goes down but your home internet still works, calls go over Wi-Fi.', 'In **Settings › Mobile Data**, open **Wi-Fi Calling** and turn it on, if your operator allows it.', ''],
    ['esim', 'A second mobile operator (eSIM)', 'When one operator’s network fails, another’s may keep working.', 'A cheap pay-as-you-go plan from another operator, installed as an eSIM in **Settings › Mobile Data**. Check how often you have to top it up so that it is not deactivated.', 'iPhone XS or later'],
    ['mapas', 'Offline maps of your area', 'Streets, addresses and navigation without internet.', 'In Apple’s **Maps** app, tap your picture, then **Offline Maps**, then **Download New Map**. Step by step in [maps, coordinates and GPS](#/s/navegar/mapa-gps).', 'iOS 17 or later']
  ]],
  ['Battery and power', [
    ['poupanca', 'Low Power Mode within reach', 'In a blackout, the battery lasts much longer.', 'Add the **Low Power Mode** button to **Control Centre** and use it with **Aeroplane Mode**, turning the network on for 5 minutes every hour.', ''],
    ['cabo', 'Charge another phone by cable', 'The iPhone can also act as a power bank for someone whose phone has run out.', 'Connect the other phone to the iPhone with a USB-C cable, or USB-C to Lightning. Charging is slow: keep it for essentials.', 'iPhone 15 or later']
  ]],
  ['Phone security', [
    ['roubo', 'Stolen Device Protection', 'Away from familiar places, someone who steals your iPhone after seeing your passcode cannot see your passwords without your Face ID, and has to wait an hour to change your Apple Account password.', 'In **Settings › Face ID & Passcode**, turn on **Stolen Device Protection**.', 'iOS 17.3 or later'],
    ['documentos', 'Documents available without internet', 'In an evacuation you may leave without your wallet and without signal.', 'Keep photos of your Cartão de Cidadão (Portuguese ID card), driving licence, insurance policies and prescriptions in [this app’s vault](#/t/cofre), or as PDFs in the **Files** app, with the option to keep a copy on the iPhone (**Keep Downloaded**).', '']
  ]]
] : [
  ['Pedir ajuda', [
    ['sos', 'SOS de emergência', 'Liga ao 112 e envia a tua localização aos contactos de emergência, mesmo com o telemóvel bloqueado.', 'Nas **Definições**, pesquisa «SOS» e abre **SOS de emergência**. Ativa a chamada com **5 pressões** no botão lateral e a **chamada silenciosa**, que tira o som de aviso: útil se tiveres de te esconder.\n\nPara usar: carrega 5 vezes seguidas no botão lateral, ou mantém premidos o botão lateral e um dos botões de volume.', ''],
    ['contactos-sos', 'Contactos de emergência', 'Quando usas o SOS, recebem uma mensagem com a tua localização.', 'Na app **Saúde**, toca na tua fotografia, em **Ficha médica** e em **Editar**. Em **Contactos de emergência**, junta os adultos da família e o contacto fora da zona.', ''],
    ['ficha', 'Ficha médica no ecrã bloqueado', 'Os socorristas veem as alergias, as doenças e a medicação sem desbloquear o telemóvel.', 'Na mesma **Ficha médica**, ativa a opção de a mostrar com o telemóvel bloqueado e copia o que está na [ficha médica desta app](#/t/ficha). A ficha do iPhone é só do dono do telemóvel: para as crianças, usa a imagem para o ecrã de bloqueio.', ''],
    ['satelite', 'SOS via satélite: faz a demonstração', 'Sem rede móvel nem Wi-Fi, o iPhone guia-te a apontar para o satélite e troca mensagens com o 112.', 'Nas **Definições**, pesquisa «satélite», abre o **SOS de emergência via satélite** e faz a **demonstração**, que não liga ao 112. Precisa de céu aberto. Numa emergência a sério, liga para o 112: sem rede, o iPhone oferece pedir ajuda por satélite.', 'iPhone 14 ou mais recente'],
    ['acidentes', 'Deteção de acidentes', 'Num acidente de carro grave, se não responderes, o iPhone liga sozinho ao 112.', 'Em **Definições › SOS de emergência**, confirma que a **deteção de acidentes** está ativa. Vem ativa de origem.', 'iPhone 14 ou mais recente'],
    ['criancas-112', 'As crianças sabem ligar ao 112', 'Com o telemóvel bloqueado, qualquer pessoa consegue ligar ao 112.', 'A partir dos 5 ou 6 anos, mostra-lhes o ecrã do código: toca em **Emergência**, marca 112 e diz onde está. Treinem a fingir, sem ligar.', 'Crianças com idade para isso']
  ]],
  ['Receber avisos', [
    ['alertas-gov', 'Alertas do governo ligados', 'É a forma oficial de avisar a população de um perigo na zona.', 'Em **Definições › Notificações**, no fim da página, em **Alertas do governo**, ativa os alertas de emergência e de segurança pública e, se existir, a opção de os entregar sempre, mesmo em silêncio.', ''],
    ['sons', 'Reconhecimento de sons', 'O iPhone avisa quando ouve um alarme de fumo, um alarme de incêndio ou uma sirene: útil a dormir com auscultadores ou para quem ouve mal.', 'Em **Definições › Acessibilidade › Reconhecimento de sons**, ativa a função e escolhe os alarmes. Não substitui os detetores de fumo.', ''],
    ['familia-toca', 'As chamadas da família tocam sempre', 'Com o telemóvel em silêncio ou em Não incomodar, a família continua a conseguir chegar a ti.', 'Em **Contactos**, abre cada adulto da família, toca em **Editar** e em **Toque**, e ativa a opção de emergência (em inglês, Emergency Bypass). Faz o mesmo no toque de mensagem.', ''],
    ['alertas-app', 'Alertas da tua zona no telemóvel', 'Avisos do IPMA, sismos perto e risco máximo de incêndio, mesmo com a app fechada.', 'Segue os passos em [Alertas no telemóvel](#/t/alertas). Fica feito quando enviares a notificação de teste.', '']
  ]],
  ['Manter a família ligada', [
    ['localizacao', 'Localização partilhada com a família', 'Sabem onde cada um está sem terem de ligar, que é o que satura a rede numa crise.', 'Na app **Encontrar**, em **Pessoas**, partilha a tua localização com os adultos da família, ou ativa a partilha de localização na Partilha com a família.', ''],
    ['checkin', 'Check In nas Mensagens', 'Quando alguém vai buscar as crianças ou evacua, a família recebe um aviso quando chega. Se não chegar, recebe a localização e o nível da bateria.', 'Numa conversa das **Mensagens**, toca em **+**, em **Mais** e em **Check In**. Os dois telemóveis precisam de iOS 17 ou mais recente e de rede.', 'iOS 17 ou mais recente'],
    ['wifi', 'Chamadas por Wi-Fi', 'Se a rede móvel cair mas a internet de casa funcionar, as chamadas passam pelo Wi-Fi.', 'Em **Definições › Dados móveis**, abre **Chamadas por Wi-Fi** e ativa, se a tua operadora o permitir.', ''],
    ['esim', 'Uma segunda operadora (eSIM)', 'Quando a rede de uma operadora falha, a de outra pode continuar a funcionar.', 'Um tarifário pré-pago barato de outra operadora, instalado como eSIM em **Definições › Dados móveis**. Confirma de quanto em quanto tempo tens de o carregar para não ser desativado.', 'iPhone XS ou mais recente'],
    ['mapas', 'Mapas da zona sem rede', 'Ruas, moradas e navegação sem internet.', 'No **Mapas** da Apple, toca na tua fotografia, em **Mapas offline** e em **Descarregar novo mapa**. Passo a passo em [mapas, coordenadas e GPS](#/s/navegar/mapa-gps).', 'iOS 17 ou mais recente']
  ]],
  ['Bateria e energia', [
    ['poupanca', 'Modo de poupança à mão', 'Num apagão, a bateria dura muito mais.', 'Junta o botão do modo de poupança de energia ao **Centro de Controlo** e usa-o com o modo de voo, ligando a rede 5 minutos de hora a hora.', ''],
    ['cabo', 'Carregar outro telemóvel pelo cabo', 'O iPhone também serve de bateria externa para quem ficou sem.', 'Liga o outro telemóvel ao iPhone com um cabo USB-C, ou USB-C para Lightning. A carga é lenta: guarda-a para o essencial.', 'iPhone 15 ou mais recente']
  ]],
  ['Segurança do telemóvel', [
    ['roubo', 'Proteção de dispositivo roubado', 'Longe dos sítios habituais, quem te roubar o iPhone depois de ver o código não consegue ver as tuas palavras-passe sem o teu Face ID e tem de esperar uma hora para mudar a palavra-passe da conta Apple.', 'Em **Definições › Face ID e código**, ativa a **Proteção de dispositivo roubado**.', 'iOS 17.3 ou mais recente'],
    ['documentos', 'Documentos disponíveis sem internet', 'Numa evacuação podes sair sem carteira e sem rede.', 'Guarda fotografias do cartão de cidadão, da carta de condução, dos seguros e das receitas no [cofre desta app](#/t/cofre), ou em PDF na app **Ficheiros**, com a opção de manter uma cópia no iPhone.', '']
  ]]
];
function iphoneEstado() {
  const e = Object.assign({}, LS.get('iphone', {}) || {}), now = Date.now(), teste = LS.get('alertasTeste', 0), mapas = (LS.get('prepDecl', {}) || {}).mapas;
  if (teste && now - teste <= 180 * 864e5) e['alertas-app'] = { ts: teste, auto: true };
  if (mapas && now - mapas <= 365 * 864e5) e.mapas = { ts: mapas, auto: true };
  return e;
}
TOOLS.push({ id: 'iphone', section: 'meus', icon: '📱', title: L('Preparar o iPhone', 'Set up the iPhone'), desc: L('As funções de emergência que o iPhone já tem, ligadas passo a passo: SOS e satélite, ficha médica no ecrã bloqueado, alertas, chamadas da família, bateria, e atalhos de um toque que enviam a tua localização por SMS.', 'The emergency features the iPhone already has, turned on step by step: Emergency SOS and satellite, Medical ID on the Lock Screen, alerts, family calls, battery, and one-tap shortcuts that send your location by SMS.'),
  render(el) {
    let aba = LS.get('iphoneAba', 'funcoes');
    const T = famTokens(), plan = LS.get('plan', {}), android = /Android/i.test(navigator.userAgent), ios = smsIOS();
    const marca = (id, v) => { if (id === 'mapas') { const d = LS.get('prepDecl', {}) || {}; if (v) d.mapas = Date.now(); else delete d.mapas; LS.set('prepDecl', d); return; } const s = LS.get('iphone', {}) || {}; if (v) s[id] = v; else delete s[id]; LS.set('iphone', s); };
    const draw = () => {
      const st = iphoneEstado(), todos = IPHONE_GRUPOS.reduce((a, g) => a.concat(g[1]), []), feitos = todos.filter(x => st[x[0]]).length;
      let h = (android ? md(L('>i Estás num Android. Quase todas estas funções existem com outros nomes, normalmente em **Definições › Segurança e emergência**.', '>i You are on Android. Almost all of these features exist under other names, usually in **Settings › Safety & emergency**.'), 'ipand') : !ios ? md(L('>i Abre esta página no iPhone para seguires os passos lá.', '>i Open this page on the iPhone to follow the steps there.'), 'ippc') : '') +
        '<div class="card"><div class="row"><strong style="flex:1">' + L(feitos + ' de ' + todos.length + ' prontas', feitos + ' of ' + todos.length + ' ready') + '</strong><a class="btn sm" href="#/t/preparacao">' + L('📊 Nível de preparação', '📊 Preparedness level') + '</a></div><div class="progress"><div style="width:' + Math.round(feitos / todos.length * 100) + '%"></div></div><p class="small muted">' + L('Os nomes dos menus mudam um pouco entre versões do iOS. Se não encontrares uma opção, usa a pesquisa no topo das Definições.', 'Menu names change a little between iOS versions. If you cannot find an option, use the search at the top of Settings.') + '</p></div>' +
        '<div class="fambar">' + [['funcoes', L('✅ Funções do iPhone', '✅ iPhone features')], ['atalhos', L('⚡ Atalhos de um toque', '⚡ One-tap shortcuts')]].map(a => '<button class="btn sm' + (a[0] === aba ? ' primary' : '') + '" data-aba="' + a[0] + '">' + a[1] + '</button>').join('') + '</div>';
      if (aba === 'funcoes') {
        h += IPHONE_GRUPOS.map(g => '<h2>' + esc(g[0]) + '</h2>' + g[1].map(x => {
          const s = st[x[0]], acoes = x[0] === 'alertas-app' ? (s ? '' : '<a class="btn sm primary" href="#/t/alertas">' + L('Configurar', 'Set up') + '</a>') : s ? '<button class="btn sm" data-desfazer="' + x[0] + '">' + L('Desfazer', 'Undo') + '</button>' : '<button class="btn sm ok" data-feito="' + x[0] + '">' + L('✓ Feito', '✓ Done') + '</button>' + (x[4] ? '<button class="btn sm" data-na="' + x[0] + '">' + L('Não se aplica', 'Not applicable') + '</button>' : '');
          return '<div class="card ip-item' + (s ? ' ip-feito' : '') + '"><div class="row"><strong style="flex:1">' + (s ? (s.na ? '➖ ' : '✅ ') : '') + esc(x[1]) + '</strong>' + (x[4] ? '<span class="badge">' + esc(x[4]) + '</span>' : '') + '</div><p class="small">' + esc(x[2]) + '</p><details' + (s ? '' : ' open') + '><summary>' + L('Como fazer', 'How to do it') + '</summary>' + fillHTML(md(x[3], 'ip-' + x[0]), T) + '</details>' + (acoes ? '<div class="btnrow">' + acoes + '</div>' : '') + '</div>';
        }).join('')).join('');
      } else {
        const pessoas = smsPessoas().slice(0, 4), ponto = String(plan.encontro1 || '').trim();
        const msgs = EN ? [['Family help', 'We need help. I am at LATITUDE, LONGITUDE. Map: https://maps.google.com/?q=LATITUDE,LONGITUDE'], ['We are OK', 'We are OK. I am at LATITUDE, LONGITUDE.'], ['Meeting point', 'We are going to the meeting point: ' + (ponto || 'the one agreed in the plan') + '. I am at LATITUDE, LONGITUDE.']] : [['Ajuda família', 'Precisamos de ajuda. Estou em LATITUDE, LONGITUDE. Mapa: https://maps.google.com/?q=LATITUDE,LONGITUDE'], ['Estamos bem', 'Estamos bem. Estou em LATITUDE, LONGITUDE.'], ['Ponto de encontro', 'Vamos para o ponto de encontro: ' + (ponto || 'o combinado no plano') + '. Estou em LATITUDE, LONGITUDE.']];
        h += md(L('>i Estes atalhos enviam **SMS**: precisam de rede móvel, mesmo fraca, mas não de internet. A localização vem do GPS, que funciona sem rede. Os nomes das ações podem variar um pouco com a versão do iOS.', '>i These shortcuts send an **SMS**: they need a mobile signal, even a weak one, but not internet. The location comes from GPS, which works without signal. Action names may vary a little with the iOS version.'), 'ipat') +
          '<div class="card"><h3>' + L('📍 Mensagem de ajuda com a tua localização', '📍 Help message with your location') + '</h3><ol>' + (EN ? [
            'Open the **Shortcuts** app, tap **+** and name the shortcut “Family help”. This is the phrase you will say to Siri.',
            'Add the **Get Current Location** action.',
            'Add the **Text** action and paste the message below. Delete the word LATITUDE, insert the **Current Location** variable, tap it and choose **Latitude**. Do the same for LONGITUDE.',
            'Add **Send Message**: put the **Text** in the message, choose the family as recipients and turn off **Show When Run**, so that it sends without asking for confirmation.',
            'Test it once with only your own number. Then duplicate the shortcut for “We are OK” and “Meeting point”, changing the text.'
          ] : [
            'Abre a app **Atalhos**, toca em **+** e chama ao atalho «Ajuda família». É a frase que vais dizer à Siri.',
            'Junta a ação **Obter localização atual**.',
            'Junta a ação **Texto** e cola a mensagem de baixo. Apaga a palavra LATITUDE, insere a variável **Localização atual**, toca nela e escolhe **Latitude**. Faz o mesmo para LONGITUDE.',
            'Junta **Enviar mensagem**: na mensagem põe o **Texto**, nos destinatários escolhe a família e desliga **Mostrar ao executar**, para enviar sem pedir confirmação.',
            'Testa uma vez só com o teu número. Depois duplica o atalho para «Estamos bem» e «Ponto de encontro», mudando o texto.'
          ]).map(x => '<li>' + inline(x) + '</li>').join('') + '</ol>' +
          msgs.map((m, i) => '<div class="row ip-msg"><div style="flex:1"><div class="small muted">' + esc(m[0]) + '</div><div class="mono small">' + esc(m[1]) + '</div></div><button class="btn sm fixed" data-copiar="' + i + '">' + L('📋 Copiar', '📋 Copy') + '</button></div>').join('') +
          '<p class="small">' + (pessoas.length ? L('Destinatários da família: ', 'Family recipients: ') + esc(pessoas.map(p => p.nome + ' ' + p.tel).join(' · ')) : L('Ainda sem telefones: junta-os no <a href="#/t/familia">perfil da família</a> e nos <a href="#/t/contactos">contactos</a>.', 'No phone numbers yet: add them in the <a href="#/t/familia">family profile</a> and in <a href="#/t/contactos">contacts</a>.')) + '</p></div>' +
          '<div class="card"><h3>' + L('👆 Disparar sem abrir nada', '👆 Run it without opening anything') + '</h3><ul>' + (EN ? [
            '**Back Tap:** in **Settings › Accessibility › Touch**, open **Back Tap**, choose **Double Tap** and the shortcut.',
            '**Siri:** “Hey Siri, family help”.',
            '**Action button** (iPhone 15 Pro or later): in **Settings › Action Button**, choose **Shortcut**.',
            '**Control Centre** (iOS 18 or later): touch and hold in Control Centre, tap **Add a Control** and choose the shortcut.'
          ] : [
            '**Toque nas costas:** em **Definições › Acessibilidade › Toque**, abre o toque atrás (Back Tap), escolhe **Toque duplo** e o atalho.',
            '**Siri:** «Ei Siri, ajuda família».',
            '**Botão de ação** (iPhone 15 Pro ou mais recente): em **Definições › Botão de ação**, escolhe **Atalho**.',
            '**Centro de Controlo** (iOS 18 ou mais recente): mantém o dedo no Centro de Controlo, junta um controlo e escolhe o atalho.'
          ]).map(x => '<li>' + inline(x) + '</li>').join('') + '</ul></div>' +
          '<div class="card"><h3>' + L('🔋 Modo apagão do iPhone', '🔋 iPhone blackout mode') + '</h3><ol>' + (EN ? [
            'A new shortcut called “Blackout”.',
            'Add **Set Low Power Mode**, turned on.',
            'Add **Set Brightness** and set it to 20%.',
            'If you like, add **Set Bluetooth**, turned off.',
            'When the power goes out: “Hey Siri, blackout”. Then open this app’s [blackout mode](#/t/apagao).'
          ] : [
            'Novo atalho chamado «Apagão».',
            'Junta **Definir modo de poupança de energia**, ligado.',
            'Junta **Definir brilho** e põe 20%.',
            'Se quiseres, junta **Definir Bluetooth**, desligado.',
            'Quando faltar a luz: «Ei Siri, apagão». Depois abre o [modo apagão](#/t/apagao) desta app.'
          ]).map(x => '<li>' + inline(x) + '</li>').join('') + '</ol></div>' +
          '<div class="card"><h3>' + L('📞 Ligar ao 112 sem tocar no ecrã', '📞 Call 112 without touching the screen') + '</h3><p>' + L('Diz «Ei Siri, liga para o 112». Também funciona com o iPhone bloqueado.', 'Say “Hey Siri, call 112”. It also works with the iPhone locked.') + '</p></div>';
        el.innerHTML = h;
        $$('[data-copiar]', el).forEach(b => b.onclick = () => copyText(msgs[+b.dataset.copiar][1]));
      }
      if (aba === 'funcoes') el.innerHTML = h;
      $$('[data-aba]', el).forEach(b => b.onclick = () => { aba = b.dataset.aba; LS.set('iphoneAba', aba); draw(); });
      $$('[data-feito]', el).forEach(b => b.onclick = () => { marca(b.dataset.feito, { ts: Date.now() }); draw(); });
      $$('[data-na]', el).forEach(b => b.onclick = () => { marca(b.dataset.na, { ts: Date.now(), na: true }); draw(); });
      $$('[data-desfazer]', el).forEach(b => b.onclick = () => { marca(b.dataset.desfazer, null); draw(); });
    };
    draw();
  } });
