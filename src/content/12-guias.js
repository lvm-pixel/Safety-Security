/* Modo emergência: situações em casa e na zona (continua 11-guias.js). */
GUIAS.push(
  { id: 'incendio-casa', icon: '🔥', t: 'Incêndio em casa', grupo: 'casa', pag: '#/s/agora/incendio-casa', passos: [
    { t: 'Qual é o tamanho do fogo?', d: 'Decide depressa: o fumo enche uma casa em poucos minutos.', p: { q: 'É pequeno (menos do que um caixote do lixo) e tens a saída atrás de ti?', sim: 'pequeno', nao: 'sair' } },
    { id: 'pequeno', t: 'Apaga só se for seguro', d: 'Tacho com óleo: tapa com uma tampa ou pano molhado e desliga o fogão, **nunca água**. Aparelho elétrico: desliga da tomada ou no quadro. Extintor: puxa a cavilha, aponta à base das chamas, aperta e varre de lado a lado.', tempo: 30, tempoT: 'Sem controlo em 30 segundos, sai', p: { q: 'Ficou apagado?', sim: 'apagado', nao: 'sair' } },
    { id: 'apagado', t: 'Confirma e areja', d: 'Vê se não ficaram brasas nem fumo a sair de aparelhos ou paredes. Na dúvida, liga 112 na mesma.', fim: true },
    { id: 'sair', t: 'Grita «FOGO» e sai já', d: 'Acorda toda a gente. Não percas tempo a vestir ou a levar objetos. **Nunca uses o elevador.**' },
    { t: 'Sai baixo e fecha as portas', d: 'O fumo mata mais do que o fogo: a gatinhar, pano húmido no nariz e na boca. Toca nas portas com as costas da mão antes de abrir: se estiver quente, não abras. Fecha as portas atrás de ti.', p: { q: 'Já estás na rua?', sim: 'fora', nao: 'preso' } },
    { id: 'fora', t: 'Liga 112 e conta as pessoas', d: 'Vai para o ponto de encontro: {{plano_encontro1}}. **Nunca voltes a entrar.**', ligar: true, fim: true },
    { id: 'preso', t: 'Fecha-te numa divisão com janela', d: 'De preferência virada para a rua. Sela a porta com toalhas ou roupa molhada nas frestas e tapa as ventilações. Abre a janela, sinaliza com um pano ou luz e liga 112 a dizer exatamente onde estás.', ligar: true, ferr: 'sos', fim: true }
  ] },
  { id: 'sismo', icon: '🌍', t: 'Sismo', grupo: 'casa', pag: '#/s/agora/sismo', passos: [
    { t: 'Baixar, proteger, aguardar', d: 'Debaixo de uma mesa sólida, a segurar-lhe as pernas. Sem mesa: parede interior, longe de janelas e estantes, braços a proteger a cabeça e o pescoço. **Não corras para a rua.** Na cama, fica e protege a cabeça com a almofada.' },
    { t: 'Quando parar, conta com réplicas', d: 'Calça sapatos fechados (há vidros partidos), pega na lanterna e no kit.' },
    { t: 'Verifica o gás', d: 'O cheiro a gás é o perigo mais urgente depois do abalo.', p: { q: 'Cheira a gás?', sim: 'gas', nao: 'feridos' } },
    { id: 'gas', t: 'Não acendas nada e sai', d: 'Não uses interruptores nem isqueiros. Abre as janelas, fecha a válvula do gás e sai.' },
    { id: 'feridos', t: 'Há feridos?', d: 'Trata primeiro quem não respira e depois quem sangra muito.', abrir: ['nao-respira', 'hemorragia'] },
    { t: 'Vê o edifício', d: 'Fendas grandes, pilares estalados ou portas que deixaram de fechar são danos graves.', p: { q: 'O edifício tem danos visíveis?', sim: 'danos', nao: 'mar' } },
    { id: 'danos', t: 'Sai com calma pelas escadas', d: 'Não voltes a entrar. Na rua, afasta-te de fachadas, varandas e chaminés.' },
    { id: 'mar', t: 'Risco de tsunami?', d: 'Portugal tem risco de tsunami.', p: { q: 'Estás perto do mar e o sismo foi forte ou longo (custava estar de pé ou durou mais de 20 segundos)?', sim: 'tsunami', nao: 'encontro' } },
    { id: 'tsunami', t: 'Vai já para terreno alto', d: '**Não esperes por aviso oficial.** Mais de 30 m de altitude ou 2 km para dentro, a pé se der. Sem hipótese: 3.º andar ou mais de um edifício sólido de betão. Fica várias horas: a primeira onda pode não ser a maior.', fim: true },
    { id: 'encontro', t: 'Ponto de encontro e rádio', d: 'Vai para {{plano_encontro1}}. Liga {{radio_zona}}. Telefone só para SMS: [mensagens rápidas](#/t/mensagens).', fim: true }
  ] },
  { id: 'incendio-rural', icon: '🌲', t: 'Incêndio rural a aproximar-se', grupo: 'casa', pag: '#/s/agora/incendio-rural', passos: [
    { t: 'Qual é a situação?', d: 'Ouve {{radio_zona}} e lê os SMS da Proteção Civil.', p: { q: 'Há ordem de evacuação, fumo intenso ou chamas à vista?', sim: 'sair', nao: 'preparar' } },
    { id: 'sair', t: 'Sai cedo', d: 'Sair tarde, com fumo e estradas fechadas, é a situação mais mortal. Leva pessoas, animais, a mala de evacuação, documentos e medicação.', abrir: ['evacuar'] },
    { t: 'Na estrada com fumo ou chamas', d: '**Fica no carro** numa zona sem vegetação, faróis e piscas ligados, janelas e ventilação fechadas, motor ligado. Deita-te abaixo das janelas e cobre-te com roupa ou manta de lã. Sai quando a frente de chamas passar.' },
    { t: 'Cercado a pé', d: '**Nunca fujas encosta acima** nem à frente do fogo. Vai para o lado ou para baixo, para terreno já queimado, estrada larga, água ou rocha. Sem saída: deita-te numa zona sem vegetação, cara para baixo, pés para o fogo, e cobre-te com terra ou uma manta de lã.', fim: true },
    { id: 'preparar', t: 'Prepara a casa', d: 'Fecha portas, janelas, persianas e ventilações, e tira as cortinas. Enche baldes e a banheira e liga a mangueira. Afasta da casa o gás, a lenha e a mobília de jardim.' },
    { t: 'Prepara o carro e a roupa', d: 'Carro virado para a saída, com a chave e as janelas fechadas. Roupa de algodão comprida, botas, luvas, óculos e um pano húmido para a cara. Mala de evacuação à porta.' },
    { t: 'Se a ordem chegar, sai', d: 'Só se fica com a casa limpa de vegetação à volta, com água e sem fumo intenso. Quando a frente passar (10 a 20 minutos), fica dentro; depois apaga pequenos focos no telhado e à volta.', fim: true }
  ] },
  { id: 'cheia', icon: '🌊', t: 'Cheia ou inundação', grupo: 'casa', pag: '#/s/agora/cheia', passos: [
    { t: 'Nunca atravesses água a correr', d: '15 cm de água em movimento deitam uma pessoa ao chão e 30 cm arrastam um carro. Nem a pé, nem de carro: o pavimento pode ter desaparecido.' },
    { t: 'Desliga a luz e fecha o gás', d: 'No quadro, **antes** de a água chegar às tomadas. Nunca toques em aparelhos elétricos com os pés molhados.' },
    { t: 'Sobe com o essencial', d: 'Andares de cima, o telhado se for preciso. Leva o kit, água, telemóvel, rádio e roupa quente. Evita caves, garagens, túneis e passagens inferiores.', p: { q: 'Estás num carro com a água a subir?', sim: 'carro', nao: 'sinal' } },
    { id: 'carro', t: 'Sai já para terreno alto', d: 'Não esperes. Se o carro cair à água: desaperta o cinto, abre ou parte a janela (as pontas metálicas do encosto de cabeça partem o vidro no canto) e sai pela janela **antes** de o carro encher.' },
    { id: 'sinal', t: 'Sinaliza e pede ajuda', d: 'Pano na janela, luz à noite. Liga 112 se estiveres em risco.', ligar: true, ferr: 'sos', fim: true }
  ] },
  { id: 'apagao', icon: '💡', t: 'Apagão', grupo: 'casa', pag: '#/s/agora/apagao', passos: [
    { t: 'É só em casa ou é geral?', d: 'Vê o quadro elétrico, os vizinhos e a rua. Liga o rádio a pilhas ou o do carro: {{radio_zona}}.' },
    { t: 'Desliga os aparelhos sensíveis', d: 'Computador, televisão e o que tiver eletrónica, por causa dos picos quando a luz voltar. Deixa uma luz ligada para saberes quando voltou.' },
    { t: 'Enche água agora', d: 'Garrafas e a banheira, enquanto há pressão: as bombas dos prédios podem parar.' },
    { t: 'Avisa a família e poupa a bateria', d: 'O SMS passa melhor do que as chamadas: [mensagens rápidas](#/t/mensagens). Depois, modo de voo, e liga a rede 5 minutos de hora a hora.', ios: 'Modo de poupança de energia no Centro de Controlo. Num iPhone 15 ou mais recente, dá bateria a outro telemóvel pelo cabo USB-C.' },
    { t: 'Frigorífico e congelador fechados', d: 'O frigorífico aguenta 4 horas; o congelador cheio 48 horas e meio cheio 24. O modo apagão conta o tempo por ti.', ferr: 'apagao' },
    { t: 'Segurança nas horas seguintes', d: 'Lanternas em vez de velas. Gerador, carvão e grelhadores **nunca dentro de casa**. Semáforos apagados: cruzamentos como STOP. Vai ver dos vizinhos idosos, doentes ou com bebés.', fim: true }
  ] },
  { id: 'ataque', icon: '💥', t: 'Explosão, ataque aéreo ou tiros', grupo: 'casa', pag: '#/s/agora/ataque', passos: [
    { t: 'O que está a acontecer?', d: 'As duas situações pedem reações diferentes.', p: { q: 'Explosão ou alerta aéreo, ou tiros e agressor armado?', simT: 'Explosão ou alerta aéreo', naoT: 'Tiros ou agressor', sim: 'chao', nao: 'fugir' } },
    { id: 'chao', t: 'Deita-te no chão já', d: 'Barriga para baixo, cabeça longe das janelas, mãos a proteger a cabeça e a nuca, boca ligeiramente aberta. Atrás de algo sólido, se der.' },
    { t: 'Espera 1 a 2 minutos', d: 'Pode haver uma segunda explosão ou queda de destroços.', tempo: 90, tempoT: 'Esperar no chão' },
    { t: 'Vai para o abrigo mais próximo', d: 'Cave, parque subterrâneo, metro, ou a divisão interior mais baixa, com **duas paredes** entre ti e o exterior. Em casa: {{plano_abrigo}}. Com alerta aéreo, vai para o abrigo e não para casa, e fica até ao sinal de fim.' },
    { t: 'Não te aproximes nem fotografes', d: 'Pode haver novo ataque. Não toques em objetos estranhos. Nos feridos, a hemorragia grave é a prioridade.', abrir: ['hemorragia'], fim: true },
    { id: 'fugir', t: 'Foge, se houver saída segura', d: 'Deixa tudo, mãos visíveis e vazias. Leva quem conseguires, mas não esperes por quem não quer ir. Afasta-te várias ruas.', p: { q: 'Conseguiste fugir?', sim: 'policia', nao: 'esconder' } },
    { id: 'esconder', t: 'Esconde-te em silêncio', d: 'Sala com porta que tranque ou que consigas bloquear com móveis. Luzes apagadas, telemóvel sem som nem vibração, longe da porta e das janelas, atrás de betão. Liga 112 em silêncio e deixa a linha aberta.', ligar: true, ios: 'Com a chamada silenciosa ativa no SOS de emergência, carregar 5 vezes no botão lateral liga ao 112 sem som de aviso.' },
    { t: 'Enfrentar só em último recurso', d: 'Só se a vida estiver em perigo imediato: em grupo, com o que houver, com decisão total.' },
    { id: 'policia', t: 'Quando a polícia chegar', d: 'Mãos vazias, abertas e levantadas, sem gritar nem correr para eles, e obedece às ordens. Depois avisa a família por SMS.', fim: true }
  ] },
  { id: 'nuclear-quimico', icon: '☢️', t: 'Nuclear, radiológico ou químico', grupo: 'casa', pag: '#/s/agora/nuclear-quimico', passos: [
    { t: 'Que tipo de perigo?', d: 'Segue as ordens das autoridades assim que as ouvires.', p: { q: 'Radiação (acidente nuclear, explosão) ou nuvem química e fugas de gás?', simT: 'Radiação', naoT: 'Químico ou gás', sim: 'entra', nao: 'onde' } },
    { id: 'entra', t: 'Entra no edifício sólido mais próximo', d: 'Betão ou tijolo, ao centro ou na cave. **Não vás buscar familiares** a outro lado: eles também devem abrigar-se onde estão. Tens 10 a 15 minutos antes de a poeira radioativa começar a cair.', tempo: 600, tempoT: 'Tempo para te abrigares' },
    { t: 'Fecha tudo e fica pelo menos 24 horas', d: 'Janelas, portas e ventilações fechadas, ar condicionado desligado. As primeiras 24 horas são as mais perigosas.' },
    { t: 'Se estiveste na rua, tira a roupa de fora', d: 'Põe-na num saco fechado longe das pessoas. Duche com sabão ou pano húmido, sem amaciador. Assoa o nariz.' },
    { t: 'Ouve o rádio', d: 'Liga {{radio_zona}} e espera instruções: quando sair, para onde ir, se há distribuição de iodo.' },
    { t: 'Iodo só quando as autoridades disserem', d: 'Só protege a tiroide de iodo radioativo. Doses: {{familia_ki}}. Não tomes tintura de iodo nem desinfetantes.', ferr: 'doses', fim: true },
    { id: 'onde', t: 'De onde vem?', d: 'Uma fuga dentro de casa e uma nuvem lá fora tratam-se ao contrário.', p: { q: 'A nuvem vem de fora ou há cheiro a gás dentro de casa?', simT: 'Vem de fora', naoT: 'Gás em casa', sim: 'nuvem', nao: 'gas' } },
    { id: 'nuvem', t: 'Entra, fecha tudo e sobe', d: 'Muitos gases são mais pesados do que o ar. Sela a divisão com toalhas molhadas e fita e desliga as ventilações. Na rua: afasta-te com o vento a bater-te na cara, para terreno alto, com um pano húmido no nariz e na boca.' },
    { t: 'Contaminação na pele: lava 15 minutos', d: 'Corta a roupa em vez de a puxar pela cabeça. Muita água e sabão; olhos com água corrente. Tosse, olhos a arder, falta de ar ou confusão: 112.', tempo: 900, tempoT: 'Lavar', ligar: true, fim: true },
    { id: 'gas', t: 'Não acendas nada, abre as janelas e sai', d: 'Não mexas em interruptores. Fecha a válvula, sai e liga do exterior ao 112 e à empresa do gás.', ligar: true, fim: true }
  ] },
  { id: 'evacuar', icon: '🚪', t: 'Ordem de evacuação', grupo: 'casa', pag: '#/s/agora/evacuar', passos: [
    { t: 'Quanto tempo tens?', d: 'Com crianças pequenas, sai cedo.', p: { q: 'Tens de sair em menos de 10 minutos?', simT: 'Sair já', naoT: 'Tenho 1 a 2 horas', sim: 'ja', nao: 'tempo' } },
    { id: 'ja', t: 'Pessoas e animais primeiro', d: 'Quem leva quem: {{plano_levar}}.' },
    { t: 'Pega na mala e no essencial', d: 'Mala de evacuação, documentos, dinheiro, medicação, telemóvel e carregador, chaves, roupa e calçado para o tempo que faz.' },
    { id: 'rota', t: 'Fecha a porta e vai pela rota combinada', d: 'Rotas: {{plano_rotas}}. Não voltes atrás. A pé, se as estradas pararem.' },
    { t: 'Avisa a família', d: 'Ponto de encontro: {{plano_encontro2}}. Contacto fora da zona: {{plano_contactoFora}}. [Mensagens rápidas](#/t/mensagens).', ios: 'Nas Mensagens, usa o Check In: a família recebe um aviso quando chegares.', fim: true },
    { id: 'tempo', t: 'Ouve o rádio e confirma o caminho', d: 'Para onde e por onde é seguro ir: {{radio_zona}}.' },
    { t: 'Junta o essencial', d: 'Documentos, dinheiro, medicação, óculos, carregadores e powerbank, água (2 L por pessoa) e comida para 1 a 2 dias, roupa para 3 dias e o que as crianças e os animais precisam.' },
    { t: 'Fecha a casa', d: 'Gás e água; a luz no quadro se houver risco de cheia ou incêndio. Desliga os eletrodomésticos e fecha janelas e persianas.' },
    { t: 'Deixa uma mensagem na porta', d: 'Quem saiu, quando, para onde e um telefone. Avisa o contacto fora da zona e os vizinhos, e oferece boleia a quem não tem.' },
    { t: 'Combustível e caminho', d: 'Abaixo de meio depósito, abastece à saída da zona. Evita zonas baixas, pontes fragilizadas e estradas junto ao mato em incêndio.', seg: 'rota' }
  ] }
);
