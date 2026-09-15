/* Modo emergência: passos curtos por situação, lidos um de cada vez.
   Resumem os guias de «Emergência agora» e «Primeiros socorros» e têm de dizer o mesmo: ao mudar um, muda o outro.
   Passo: t título, d detalhe (Markdown simples), id, p pergunta { q, sim, nao, simT, naoT } com ids de passos, seg id do passo seguinte,
   fim termina o ramo, tempo contagem decrescente em segundos (tempoT legenda), crono aviso em segundos num cronómetro (cronoT texto),
   hora regista a hora de um acontecimento, ligar destaca o 112, ferr atalho para uma ferramenta, abrir ids de outros guias. */
const GUIAS = [
  { id: 'nao-respira', icon: '❤️', t: 'Não responde ou não respira', grupo: 'pessoas', pag: '#/s/socorros/rcp', passos: [
    { t: 'Vê se é seguro aproximares-te', d: 'Trânsito, fogo, eletricidade, gás, agressor, estrutura instável. Se houver perigo, afasta-te primeiro: um socorrista ferido é mais uma vítima.' },
    { t: 'Abana-lhe os ombros e pergunta alto', d: '«Está bem? Consegue ouvir-me?» Grita por ajuda para chamar quem estiver perto.', p: { q: 'Responde?', sim: 'responde', nao: 'via' } },
    { id: 'via', t: 'Abre a via aérea e vê se respira', d: 'Vira-a de costas. Uma mão na testa, inclina a cabeça para trás; dois dedos no queixo, levanta-o. **Vê, ouve e sente durante 10 segundos no máximo.** Respiração ofegante, com ruídos ou muito lenta não é normal.', tempo: 10, tempoT: 'Olhar, ouvir e sentir', p: { q: 'Respira normalmente?', sim: 'pls', nao: 'idade' } },
    { id: 'idade', t: 'Não respira: começa já', d: 'Não percas tempo a procurar pulso. Fazer RCP a quem afinal não precisava causa pouco dano; não fazer a quem precisava é fatal.', p: { q: 'É um adulto ou uma criança?', simT: 'Adulto', naoT: 'Criança ou bebé', sim: 'adulto', nao: 'crianca' } },
    { id: 'adulto', t: 'Liga 112 em alta-voz e pede um DAE', d: 'Diz «não respira». Manda alguém buscar um desfibrilhador (DAE): há em farmácias, centros comerciais, estações e ginásios.', ligar: true },
    { t: 'Compressões: 30', d: 'Base da mão no centro do peito, a outra por cima, braços esticados. Comprime **5 a 6 cm**, **100 a 120 por minuto**, e deixa o peito subir totalmente. O metrónomo dá o ritmo.', ferr: 'rcp' },
    { t: '2 insuflações e repete 30:2 sem parar', d: 'Inclina a cabeça, levanta o queixo, aperta o nariz e sopra 1 segundo até o peito subir. Se não sabes ou não queres, faz **só compressões contínuas**. Se houver outra pessoa, troquem a cada 2 minutos.', tempo: 120, tempoT: 'Trocar de pessoa' },
    { id: 'dae', t: 'Quando chegar o DAE, liga-o e segue a voz', d: 'Descobre e seca o peito e cola os elétrodos como no desenho. Ninguém toca na vítima durante a análise e o choque. Retoma as compressões logo a seguir.' },
    { id: 'naopares', t: 'Não pares', d: 'Só quando chegar ajuda que assuma, a vítima se mexer ou respirar normalmente, ou não aguentares mais. Se recuperar: posição lateral de segurança e vigia.', fim: true },
    { id: 'crianca', t: '5 insuflações suaves', d: 'Na nossa família, {{cpr_line}}. **Bebé (menos de 1 ano):** a tua boca cobre a boca e o nariz, só o ar das bochechas. **Criança:** aperta o nariz. Vê o peito subir.' },
    { t: 'Compressões 30:2', d: '**Criança:** uma mão (duas se for grande), 5 cm. **Bebé:** dois dedos no centro do peito, logo abaixo da linha dos mamilos, 4 cm. 100 a 120 por minuto, 30 compressões e 2 insuflações.', ferr: 'rcp' },
    { t: 'Sozinho: ao fim de 1 minuto liga 112', d: 'Põe em alta-voz e continua. Se houver DAE, usa elétrodos pediátricos; se não houver, os de adulto, um à frente e outro nas costas.', tempo: 60, tempoT: '1 minuto de RCP', ligar: true, seg: 'naopares' },
    { id: 'pls', t: 'Posição lateral de segurança', d: 'Braço mais perto de ti em ângulo reto, o outro sobre o peito com a mão encostada à bochecha. Dobra a perna mais afastada e roda a vítima para ti. Cabeça inclinada para trás, boca virada para o chão.' },
    { t: 'Liga 112 e vigia a respiração', d: 'Verifica a cada minuto. Se deixar de respirar normalmente, começa RCP.', ligar: true, fim: true },
    { id: 'responde', t: 'Deixa-a como está e pergunta o que aconteceu', d: 'O que dói, doenças, medicação, alergias. Procura hemorragias, deformações e queimaduras e trata o mais grave primeiro. Na dúvida liga 112. Mantém-na quente e acompanhada.', fim: true }
  ] },
  { id: 'hemorragia', icon: '🩸', t: 'Hemorragia grave', grupo: 'pessoas', pag: '#/s/socorros/hemorragia', passos: [
    { t: 'Pressiona a ferida com força, sem parar', d: 'Compressa, pano dobrado, roupa ou só as mãos (luvas se houver). Empurra com o peso do corpo, sem aliviar para ver. Se o pano ensopar, **não o tires**: põe mais por cima.' },
    { t: 'Deita a vítima e liga 112', d: 'Em alta-voz enquanto pressionas, ou pede a alguém. Se der, levanta o membro acima do coração.', ligar: true },
    { t: 'Ferida funda na virilha, axila ou pescoço: enche-a', d: 'Enfia gaze ou pano limpo dentro da ferida, o máximo que couber, e pressiona por cima pelo menos 3 minutos. Depois liga com força.', tempo: 180, tempoT: 'Pressão sobre a ferida cheia' },
    { t: 'Decide se precisas de torniquete', d: 'Serve para braços e pernas.', p: { q: 'Continua a sangrar ao fim de 1 a 2 minutos de pressão, há amputação, ou tens várias vítimas e não podes ficar a pressionar?', sim: 'torniquete', nao: 'penso' } },
    { id: 'torniquete', t: 'Torniquete: aperta até parar', d: '5 a 7 cm acima da ferida, nunca sobre uma articulação. Faixa larga (lenço, gravata, tira de camisa; **nunca** arame ou cordel), nó, um pau por cima, roda até o sangue parar e prende o pau. Vai doer muito: não alivies.', hora: 'Torniquete apertado' },
    { t: 'Escreve a hora e não o tires', d: 'Escreve T e a hora na testa da vítima ou no torniquete. Não o tires nem alivies, mesmo depois de horas: só profissionais o tiram. Se um não chegar, põe outro logo acima.', seg: 'vigiar' },
    { id: 'penso', t: 'Penso compressivo', d: 'Liga com ligadura, lenço, fita ou cinto por cima das compressas, bem apertado.' },
    { id: 'vigiar', t: 'Mantém quente e deitada, e vigia', d: 'Cobertor por baixo e por cima, nada de beber. Pele pálida e fria, pulso rápido ou confusão são sinais de choque: pernas elevadas se não houver fraturas, e avisa o 112. **Objetos espetados não se tiram.**', fim: true }
  ] },
  { id: 'engasgamento', icon: '😮', t: 'Engasgamento', grupo: 'pessoas', pag: '#/s/socorros/engasgamento', passos: [
    { t: 'Vê se ainda consegue tossir', d: 'Estava a comer ou a brincar com objetos pequenos e de repente não fala, leva as mãos ao pescoço, fica vermelho ou azulado.', p: { q: 'Tosse com força ou consegue falar?', sim: 'tosse', nao: 'quem' } },
    { id: 'tosse', t: 'Encoraja a tossir e vigia', d: 'Não batas nas costas nem dês nada a beber. Se deixar de conseguir tossir, volta atrás.', fim: true },
    { id: 'quem', t: 'Quem está engasgado?', d: 'A técnica muda nos bebés.', p: { q: 'Tem menos de 1 ano?', simT: 'Bebé', naoT: 'Criança ou adulto', sim: 'bebe', nao: 'costas' } },
    { id: 'costas', t: '5 pancadas nas costas', d: 'Inclina a pessoa para a frente, apoia-lhe o peito com uma mão e dá 5 pancadas fortes entre as omoplatas com a base da outra. Vê se saiu entre cada uma.' },
    { t: '5 compressões abdominais', d: 'Por trás, braços à volta da cintura, punho fechado logo acima do umbigo (polegar para dentro), a outra mão por cima. Puxa **para dentro e para cima** com força. Grávidas ou pessoas muito obesas: compressões no peito.', p: { q: 'Saiu?', sim: 'medico', nao: 'alternar' } },
    { id: 'alternar', t: 'Alterna 5 e 5 até sair', d: 'Se ficar inconsciente: deita no chão, liga 112 e começa RCP. Antes de cada insuflação olha para a boca e tira o objeto só se o vires.', ligar: true, ferr: 'rcp', abrir: ['nao-respira'], fim: true },
    { id: 'medico', t: 'Tem de ser vista por um médico', d: 'Depois de compressões abdominais podem ficar lesões internas, mesmo que tenha corrido bem.', fim: true },
    { id: 'bebe', t: '5 pancadas nas costas do bebé', d: 'Barriga para baixo sobre o teu antebraço, cabeça mais baixa do que o corpo, a segurar o queixo sem apertar a garganta. 5 pancadas entre as omoplatas com a base da mão.' },
    { t: '5 compressões no peito', d: 'Vira-o de barriga para cima sobre o outro antebraço, cabeça baixa. Dois dedos no centro do peito, logo abaixo da linha dos mamilos, mais lentas e fortes do que na RCP. **Nunca compressões abdominais em bebés.**' },
    { t: 'Olha na boca e repete', d: 'Retira só o que vires. Repete 5 e 5 até desobstruir. Se ficar inconsciente: RCP de bebé e 112.', ligar: true, ferr: 'rcp', fim: true }
  ] },
  { id: 'convulsao', icon: '⚡', t: 'Convulsão', grupo: 'pessoas', pag: '#/s/socorros/convulsoes', passos: [
    { t: 'O cronómetro já começou', d: 'A duração é o dado mais importante. Deixa este ecrã a contar.', crono: 300, cronoT: 'Mais de 5 minutos: liga 112' },
    { t: 'Protege sem segurar', d: 'Afasta objetos perigosos e põe algo macio debaixo da cabeça. **Não segures a pessoa e não metas nada na boca.** Afrouxa a roupa ao pescoço e tira os óculos.' },
    { t: 'Vê se precisa de 112', d: 'Liga se dura **mais de 5 minutos** ou se repete sem recuperar, se é a primeira crise, se não recupera a consciência em 10 a 15 minutos, se se feriu, está grávida, é diabética ou aconteceu na água.', p: { q: 'Algum destes casos?', sim: 'ligar', nao: 'depois' } },
    { id: 'ligar', t: 'Liga 112', d: 'Diz há quanto tempo dura: vê o cronómetro no registo.', ligar: true },
    { id: 'depois', t: 'Quando parar, põe de lado', d: 'Posição lateral de segurança, para respirar melhor. Fica ao lado até acordar bem: 10 a 30 minutos de confusão e sono são normais. Nada de comer ou beber até estar totalmente consciente.' },
    { t: 'Se for uma criança com febre', d: 'Tira roupa a mais e não a metas em água fria. Depois, paracetamol pelo peso: {{familia_para}}. Na primeira convulsão, SNS 24 (808 24 24 24) ou urgência.', ferr: 'doses', fim: true }
  ] },
  { id: 'alergia', icon: '🐝', t: 'Reação alérgica grave', grupo: 'pessoas', pag: '#/s/socorros/alergia', passos: [
    { t: 'Reconhece a anafilaxia', d: 'Minutos depois de comida, medicamento ou picada: inchaço da língua, lábios ou garganta, dificuldade em respirar ou engolir, urticária espalhada, tonturas, colapso.' },
    { t: 'Adrenalina na coxa, se houver', d: 'Retira a tampa de segurança, espeta na parte lateral externa da coxa (pode ser através da roupa) e mantém 10 segundos. Doses na família: {{familia_adr}}.', hora: 'Adrenalina dada' },
    { t: 'Liga 112 e diz «anafilaxia»', d: 'Mesmo que já tenha melhorado.', ligar: true },
    { t: 'Deita com as pernas elevadas', d: 'Se tiver dificuldade em respirar, sentada; grávida, de lado esquerdo. **Não a deixes levantar-se de repente.**' },
    { t: 'Sem melhoras em 5 a 15 minutos: segunda dose', d: 'Se houver outro auto-injetor. O anti-histamínico e o inalador ajudam, mas não substituem a adrenalina. Se parar de respirar, RCP.', tempo: 300, tempoT: 'Esperar pela segunda dose', ferr: 'rcp' },
    { t: 'Tem de ir ao hospital', d: 'Mesmo que melhore: a reação pode voltar horas depois.', fim: true }
  ] },
  { id: 'avc-enfarte', icon: '🧠', t: 'AVC ou dor no peito', grupo: 'pessoas', pag: '#/s/socorros/avc-enfarte', passos: [
    { t: 'O que se passa?', d: 'Cada minuto conta nos dois casos.', p: { q: 'É dor ou aperto no peito?', simT: 'Dor no peito', naoT: 'Cara, braço ou fala', sim: 'enfarte', nao: 'avc' } },
    { id: 'avc', t: 'Teste rápido: cara, braços, fala', d: 'Pede para sorrir: um lado da cara cai? Para levantar os dois braços: um cai? Para repetir uma frase: fala arrastada ou sem sentido? **Basta um sinal.**', hora: 'Início dos sinais (ou última vez que esteve bem)' },
    { t: 'Liga 112: «suspeita de AVC»', d: 'Diz a hora exata em que começou. Os tratamentos que salvam só funcionam nas primeiras horas.', ligar: true },
    { t: 'Enquanto esperas', d: 'Deita com cabeça e ombros um pouco elevados. Nada de comer ou beber, **não dês aspirina**, afrouxa a roupa e anota a medicação habitual.', fim: true },
    { id: 'enfarte', t: 'Liga 112 já', d: 'Não conduzas até ao hospital: se o coração parar no carro, ninguém ajuda.', ligar: true },
    { t: 'Senta e não a deixes andar', d: 'Costas apoiadas e joelhos dobrados. Repouso absoluto, roupa desapertada, ar fresco.' },
    { t: 'Aspirina mastigada, se puder', d: '1 comprimido de 150 a 300 mg mastigado, se não for alérgica, não tiver úlcera ativa nem hemorragia e o 112 não desaconselhar.' },
    { t: 'Se desmaiar e não respirar: RCP', d: 'Liga o DAE se houver.', ferr: 'rcp', abrir: ['nao-respira'], fim: true }
  ] },
  { id: 'crianca-perdida', icon: '🧒', t: 'Criança desaparecida', grupo: 'pessoas', pag: '#/s/comunicar/mensagens', passos: [
    { t: 'Procura já nos sítios de maior perigo', d: 'Água (piscinas, rios, tanques), estradas e varandas primeiro. Chama pelo nome em voz alta. Este ecrã conta o tempo desde que começaste.', crono: 600, cronoT: '10 minutos: se ainda não ligaste, liga 112 já', ios: 'Se a criança tiver um telemóvel ou um relógio com localização partilhada, vê onde está na app Encontrar.' },
    { t: 'Liga 112 sem esperar', d: 'Não há tempo mínimo para dar o alerta. Diz onde e a que horas foi vista pela última vez, a idade, a altura, a roupa e o calçado. Na família: {{kids_desc}}.', ligar: true },
    { t: 'Alguém fica no último sítio onde esteve', d: 'Muitas crianças voltam lá ou ficam paradas onde se perderam. Numa loja ou centro comercial, avisa logo a segurança para vigiarem as saídas.' },
    { t: 'Mostra uma fotografia recente', d: 'À polícia e à segurança. Antes de espalhar nas redes sociais, fala com a polícia.' },
    { t: 'Avisa e usa a linha de apoio', d: 'Linha SOS Criança Desaparecida: **116 000**. Avisa a família, a escola e os vizinhos: [mensagens rápidas](#/t/mensagens).', fim: true }
  ] }
];
