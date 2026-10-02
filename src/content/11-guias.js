/* Modo emergência: passos curtos por situação, lidos um de cada vez.
   Resumem os guias de «Emergência agora» e «Primeiros socorros» e têm de dizer o mesmo: ao mudar um, muda o outro.
   Passo: t título, d detalhe (Markdown simples), id, p pergunta { q, sim, nao, simT, naoT } com ids de passos, seg id do passo seguinte,
   fim termina o ramo, tempo contagem decrescente em segundos (tempoT legenda), crono aviso em segundos num cronómetro (cronoT texto),
   hora regista a hora de um acontecimento, ligar destaca o 112, ferr atalho para uma ferramenta, abrir ids de outros guias. */
const GUIAS = [
  { id: 'nao-respira', icon: '❤️', t: 'Não responde ou não respira', grupo: 'pessoas', pag: '#/s/socorros/rcp', passos: [
    { t: 'Vê se é seguro aproximares-te', d: 'Trânsito, fogo, eletricidade, gás, agressor, estrutura instável. Se houver perigo, afasta-te primeiro: um socorrista ferido é mais uma vítima.' },
    { t: 'Abana-lhe os ombros e pergunta alto', d: '«Está bem? Consegue ouvir-me?» Grita por ajuda para chamar quem estiver perto.', p: { q: 'Responde?', sim: 'responde', nao: 'via' } },
    { id: 'via', t: 'Abre a via aérea e vê se respira', d: 'Manda alguém ligar 112, ou liga tu em alta-voz enquanto avalias. Vira-a de costas. Uma mão na testa, inclina a cabeça para trás; dois dedos no queixo, levanta-o. **Vê, ouve e sente durante 10 segundos no máximo.** Respiração ofegante, com ruídos ou muito lenta não é normal.', tempo: 10, tempoT: 'Olhar, ouvir e sentir', p: { q: 'Respira normalmente?', sim: 'pls', nao: 'idade' } },
    { id: 'idade', t: 'Não respira: começa já', d: 'Não percas tempo a procurar pulso. Fazer RCP a quem afinal não precisava causa pouco dano; não fazer a quem precisava é fatal.', p: { q: 'É um adulto ou uma criança?', simT: 'Adulto', naoT: 'Criança ou bebé', sim: 'adulto', nao: 'crianca' } },
    { id: 'adulto', t: 'Liga 112 em alta-voz e pede um DAE', d: 'Diz «não respira». Manda alguém buscar um desfibrilhador (DAE): há em farmácias, centros comerciais, estações e ginásios.', ligar: true },
    { t: 'Compressões: 30', d: 'Base da mão no centro do peito, a outra por cima, braços esticados. Comprime **5 a 6 cm**, **100 a 120 por minuto**, e deixa o peito subir totalmente. O metrónomo dá o ritmo. **Afogamento:** 5 insuflações antes de começar.', ferr: 'rcp' },
    { t: '2 insuflações e repete 30:2 sem parar', d: 'Inclina a cabeça, levanta o queixo, aperta o nariz e sopra 1 segundo até o peito subir. Se não sabes ou não queres, faz **só compressões contínuas**. Se houver outra pessoa, troquem a cada 2 minutos.', tempo: 120, tempoT: 'Trocar de pessoa' },
    { id: 'dae', t: 'Quando chegar o DAE, liga-o e segue a voz', d: 'Descobre e seca o peito e cola os elétrodos como no desenho. Ninguém toca na vítima durante a análise e o choque. Retoma as compressões logo a seguir.' },
    { id: 'naopares', t: 'Não pares', d: 'Só quando chegar ajuda que assuma, a vítima se mexer ou respirar normalmente, ou não aguentares mais. Se recuperar: põe-na de lado (passo seguinte) e vigia.', seg: 'pls' },
    { id: 'crianca', t: '5 insuflações suaves', d: 'Na nossa família, {{cpr_line}}. **Bebé (menos de 1 ano):** cabeça em posição neutra (não a inclines muito para trás), a tua boca cobre a boca e o nariz, só o ar das bochechas. **Criança:** aperta o nariz. Vê o peito subir.' },
    { t: 'Compressões 30:2', d: '**Criança:** uma mão (duas se for grande), 5 cm. **Bebé:** os dois polegares no centro do peito, logo abaixo da linha dos mamilos, com as mãos a abraçar o tórax, 4 cm (sozinho, dois dedos). 100 a 120 por minuto, 30 compressões e 2 insuflações.', ferr: 'rcp' },
    { t: 'Se ainda ninguém ligou 112, liga agora e continua', d: 'Em alta-voz, sem parar a RCP. Sozinho e sem telemóvel: faz 1 minuto de RCP e só depois vais buscar ajuda. Se houver DAE, usa elétrodos pediátricos; se não houver, os de adulto, um à frente e outro nas costas.', ligar: true, seg: 'naopares' },
    { id: 'pls', t: 'Posição lateral de segurança', d: 'Braço mais perto de ti em ângulo reto, o outro sobre o peito com a mão encostada à bochecha. Dobra a perna mais afastada e roda a vítima para ti. Cabeça inclinada para trás, boca virada para o chão.' },
    { t: 'Liga 112 e vigia a respiração', d: 'Verifica a cada minuto. Se deixar de respirar normalmente, começa RCP.', ligar: true, fim: true },
    { id: 'responde', t: 'Deixa-a como está e pergunta o que aconteceu', d: 'O que dói, doenças, medicação, alergias. Procura hemorragias, deformações e queimaduras e trata o mais grave primeiro. Na dúvida liga 112. Mantém-na quente e acompanhada.', fim: true }
  ] },
  { id: 'hemorragia', icon: '🩸', t: 'Hemorragia grave', grupo: 'pessoas', pag: '#/s/socorros/hemorragia', passos: [
    { t: 'Pressiona a ferida com força, sem parar', d: 'Compressa, pano dobrado, roupa ou só as mãos (luvas se houver). Empurra com o peso do corpo, sem aliviar para ver. Se o pano ensopar, **não o tires**: põe mais por cima.' },
    { t: 'Deita a vítima e liga 112', d: 'Em alta-voz enquanto pressionas, ou pede a alguém. Não alivies a pressão para ver.', ligar: true },
    { t: 'Ferida funda na virilha, axila ou pescoço: enche-a', d: 'Enfia gaze ou pano limpo dentro da ferida, o máximo que couber, e pressiona por cima pelo menos 3 minutos. Depois faz uma ligadura apertada por cima.', tempo: 180, tempoT: 'Pressão sobre a ferida cheia' },
    { t: 'Decide se precisas de torniquete', d: 'Serve para braços e pernas.', p: { q: 'É num braço ou perna e continua a sangrar ao fim de 1 a 2 minutos de pressão, há amputação, ou tens várias vítimas e não podes ficar a pressionar?', sim: 'torniquete', nao: 'penso' } },
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
    { id: 'alternar', t: 'Alterna 5 e 5 até sair', d: 'Se houver outra pessoa, ela liga 112 já. Se ficar inconsciente: deita no chão, liga 112 e começa RCP. Antes de cada insuflação olha para a boca e tira o objeto só se o vires. Quando sair, passa ao passo seguinte.', ligar: true, ferr: 'rcp', abrir: ['nao-respira'], seg: 'medico' },
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
    { id: 'depois', t: 'Quando parar, põe de lado', d: 'De lado, cabeça inclinada para trás e boca virada para o chão, joelho de cima dobrado a travar o corpo: respira melhor e não aspira vómito. Fica ao lado até acordar bem: 10 a 30 minutos de confusão e sono são normais. Nada de comer ou beber até estar totalmente consciente.' },
    { t: 'Se for uma criança com febre', d: 'Tira roupa a mais e não a metas em água fria. Depois, paracetamol pelo peso: {{familia_para}}. Na primeira convulsão, SNS 24 (808 24 24 24) ou urgência.', ferr: 'doses', fim: true }
  ] },
  { id: 'alergia', icon: '🐝', t: 'Reação alérgica grave', grupo: 'pessoas', pag: '#/s/socorros/alergia', passos: [
    { t: 'Reconhece a anafilaxia', d: 'Minutos depois de comida, medicamento ou picada: inchaço da língua, lábios ou garganta, dificuldade em respirar ou engolir, urticária espalhada, tonturas, colapso.' },
    { t: 'Adrenalina na coxa, se houver', d: 'Retira a tampa de segurança, espeta na parte lateral externa da coxa (pode ser através da roupa) e mantém 10 segundos. Doses na família: {{familia_adr}}.', hora: 'Adrenalina dada' },
    { t: 'Liga 112 e diz «anafilaxia»', d: 'Mesmo que já tenha melhorado.', ligar: true },
    { t: 'Deita com as pernas elevadas', d: 'Se tiver dificuldade em respirar, sentada; grávida, de lado esquerdo. **Não a deixes levantar-se de repente.**' },
    { t: 'Sem melhoras ao fim de 5 minutos: segunda dose', d: 'Se houver outro autoinjetor. O anti-histamínico e o inalador ajudam, mas não substituem a adrenalina. Se parar de respirar, RCP.', tempo: 300, tempoT: 'Esperar pela segunda dose', ferr: 'rcp' },
    { t: 'Tem de ir ao hospital', d: 'Mesmo que melhore: a reação pode voltar horas depois.', fim: true }
  ] },
  { id: 'avc-enfarte', icon: '🧠', t: 'AVC ou dor no peito', grupo: 'pessoas', pag: '#/s/socorros/avc-enfarte', passos: [
    { t: 'O que se passa?', d: 'Cada minuto conta nos dois casos.', p: { q: 'É dor ou aperto no peito?', simT: 'Dor no peito', naoT: 'Cara, braço ou fala', sim: 'enfarte', nao: 'avc' } },
    { id: 'avc', t: 'Teste rápido: cara, braços, fala', d: 'Pede para sorrir: um lado da cara cai? Para levantar os dois braços: um cai? Para repetir uma frase: fala arrastada ou sem sentido? **Basta um sinal.**', hora: 'Início dos sinais (ou última vez que esteve bem)' },
    { t: 'Liga 112: «suspeita de AVC»', d: 'Diz a hora exata em que começou. Os tratamentos que salvam só funcionam nas primeiras horas.', ligar: true },
    { t: 'Enquanto esperas', d: 'Deita com cabeça e ombros um pouco elevados. Nada de comer ou beber, **não dês aspirina**, afrouxa a roupa e anota a medicação habitual.', fim: true },
    { id: 'enfarte', t: 'Liga 112 já', d: 'Não conduzas até ao hospital: se o coração parar no carro, ninguém ajuda.', ligar: true },
    { t: 'Senta e não a deixes andar', d: 'Costas apoiadas e joelhos dobrados. Repouso absoluto, roupa desapertada, ar fresco.' },
    { t: 'Aspirina mastigada, se puder', d: '150 a 300 mg mastigados (1 comprimido de 300 mg, ou 3 de 100 mg), se não for alérgica, não tiver úlcera ativa nem hemorragia e o 112 não desaconselhar.' },
    { t: 'Se desmaiar e não respirar: RCP', d: 'Liga o DAE se houver.', ferr: 'rcp', abrir: ['nao-respira'], fim: true }
  ] },
  { id: 'crianca-perdida', icon: '🧒', t: 'Criança desaparecida', grupo: 'pessoas', pag: '#/s/familia/escola-creche', passos: [
    { t: 'Procura já nos sítios de maior perigo', d: 'Água (piscinas, rios, tanques), estradas e varandas primeiro. Chama pelo nome em voz alta. Este ecrã conta o tempo desde que começaste.', crono: 600, cronoT: 'Já passaram 10 minutos: se ainda não ligaste 112, liga já', ios: 'Se a criança tiver um telemóvel ou um relógio com localização partilhada, vê onde está na app Encontrar.' },
    { t: 'Liga 112 sem esperar', d: 'Não há tempo mínimo para dar o alerta. Diz onde e a que horas foi vista pela última vez, a idade, a altura, a roupa e o calçado. Na família: {{kids_desc}}.', ligar: true },
    { t: 'Alguém fica no último sítio onde esteve', d: 'Muitas crianças voltam lá ou ficam paradas onde se perderam. Numa loja ou centro comercial, avisa logo a segurança para vigiarem as saídas.' },
    { t: 'Mostra uma fotografia recente', d: 'À polícia e à segurança. Antes de espalhar nas redes sociais, fala com a polícia.' },
    { t: 'Avisa e usa a linha de apoio', d: 'Linha SOS Criança Desaparecida: **116 000**. Avisa a família, a escola e os vizinhos: [mensagens rápidas](#/t/mensagens).', fim: true }
  ] },
  { id: 'queimadura', icon: '🩹', t: 'Queimadura', grupo: 'pessoas', pag: '#/s/socorros/queimaduras', passos: [
    { t: 'Afasta a causa', d: 'Chamas: «para, deita, rola» ou abafa com uma manta. Elétrica: corta a corrente **antes** de tocar. Química: tira a roupa contaminada. Afasta a pessoa do fumo.' },
    { t: 'Água corrente fresca durante 20 minutos', d: 'Fresca, não gelada; **nunca gelo**. Funciona até 3 horas depois. Só na zona queimada: mantém o resto do corpo quente, sobretudo em crianças.', tempo: 1200, tempoT: 'Arrefecer com água' },
    { t: 'Tira anéis, relógio, cinto e roupa solta', d: 'Antes de inchar. **Não** tires roupa colada à pele. Não rebentes bolhas.' },
    { t: 'É grave?', d: 'Maior do que a palma da mão da vítima; profunda (branca, acastanhada, sem dor, aspeto de couro); na face, mãos, pés, genitais, articulações, ou a toda a volta do pescoço ou de um membro; elétrica; química; com inalação de fumo (tosse, rouquidão, pelos do nariz queimados); em bebé, criança pequena ou idoso.', p: { q: 'Algum destes casos?', sim: 'ligar', nao: 'cobre' } },
    { id: 'ligar', t: 'Liga 112', d: 'Diz como foi, o tamanho e se há dificuldade em respirar. Elétrica: o coração pode alterar-se horas depois, vigia. Fumo: a via aérea pode fechar horas depois.', ligar: true },
    { id: 'cobre', t: 'Cobre sem apertar', d: 'Película aderente de cozinha, solta (não enrolar), ou compressa limpa e húmida. Sem algodão, pastas, manteiga nem pasta de dentes.' },
    { t: 'Dor e líquidos', d: 'Paracetamol ou ibuprofeno; doses das crianças pelo peso: {{familia_para}}. Dá de beber (uma queimadura grande perde muitos líquidos). Mantém a pessoa quente e as articulações queimadas a mexer.', ferr: 'doses' },
    { t: 'Nos dias seguintes', d: 'Queimadura pequena e superficial: lava 1 vez por dia com água e sabão suave e cobre com compressa não aderente ou película; vigia infeção (pus, cheiro, febre, vermelhidão a alastrar). Toda a queimadura elétrica, e qualquer queimadura num bebé ou numa criança pequena, é vista por um médico, mesmo pequena.', fim: true }
  ] },
  { id: 'asma', icon: '🫁', t: 'Crise de asma', grupo: 'pessoas', pag: '#/s/socorros/asma', passos: [
    { t: 'Senta e acalma', d: 'Pessoa sentada direita (não deitada), roupa solta, longe de fumo, pó e frio. Fala devagar e com calma: o pânico piora a falta de ar.' },
    { t: 'Há sinais de perigo?', d: 'Não consegue falar ou beber, lábios ou unhas azulados, fica sonolenta ou confusa. Numa criança: covas entre as costelas ou no pescoço a cada respiração, muito quieta ou muito agitada.', p: { q: 'Algum destes sinais, ou não há inalador?', sim: 'ligar', nao: 'puffs' } },
    { id: 'ligar', t: 'Liga 112 já', d: 'Diz «crise de asma grave». Sem inalador, nada o substitui: fica com a pessoa sentada e calma até chegar ajuda. Com inalador, continua no passo seguinte enquanto esperas.', ligar: true },
    { id: 'puffs', t: 'Inalador de alívio: 1 puff de cada vez', d: 'Salbutamol («bomba azul», ex.: Ventilan), com câmara expansora se houver (numa criança pequena, com a máscara). **1 puff, 4 respirações normais, outro puff: 4 a 10 puffs.** Sem câmara também serve.' },
    { t: 'Espera 4 minutos', d: 'Pessoa sentada e calma. Se o médico receitou corticoide oral (prednisolona) para as crises, dá-o agora.', tempo: 240, tempoT: 'Esperar antes de repetir', p: { q: 'Melhorou?', sim: 'depois', nao: 'repete' } },
    { id: 'repete', t: 'Repete os 4 a 10 puffs', d: 'Outra ronda, 1 puff de cada vez, com 4 respirações entre cada.', p: { q: 'Melhorou com a segunda ronda?', sim: 'depois', nao: 'ligar2' } },
    { id: 'ligar2', t: 'Liga 112 e continua os puffs', d: 'Duas rondas sem melhorar: liga. Até chegar ajuda, 4 a 10 puffs a cada 4 minutos, sentada, calma. Se deixar de responder e não respirar: RCP.', ligar: true, ferr: 'rcp', fim: true },
    { id: 'depois', t: 'Vigia e marca médico', d: 'Se foi a **primeira crise da vida**, liga 112 mesmo que tenha passado. Nas outras: uma crise que precisou de mais de 10 puffs, ou que voltou no mesmo dia, tem de ser vista nas 24 horas (SNS 24, 808 24 24 24, ou médico). Guarda um inalador e uma câmara no kit e na mala de evacuação.', fim: true }
  ] },
  { id: 'intoxicacao', icon: '☠️', t: 'Intoxicação ou monóxido de carbono', grupo: 'pessoas', pag: '#/s/socorros/intoxicacao', passos: [
    { t: 'Pode ser monóxido de carbono (CO)?', d: 'Sem cor nem cheiro. Suspeita se há esquentador a gás, braseira, lareira, gerador, grelhador ou motor em local fechado, e **várias pessoas (ou animais) com dor de cabeça, tonturas, náuseas ou confusão** ao mesmo tempo, melhores na rua.', p: { q: 'Suspeitas de CO?', sim: 'co', nao: 'estado' } },
    { id: 'co', t: 'Sai já para o ar livre com toda a gente', d: 'Abre portas e janelas só se for rápido. **Não voltes a entrar.** Ajuda quem não consegue andar.' },
    { t: 'Liga 112', d: 'Mesmo quem parece bem tem de ser avaliado: o CO fica no sangue. Não uses o aparelho outra vez até ser verificado. Se alguém não responde e não respira: RCP, ao ar livre.', ligar: true, ferr: 'rcp', fim: true },
    { id: 'estado', t: 'Como está a pessoa?', d: 'Guarda a embalagem, a planta, o cogumelo ou o vomitado para mostrar. Se respira mas não responde: deita de lado. Se não respira: RCP, só compressões se houver risco de te contaminares.', p: { q: 'Inconsciente, com dificuldade em respirar ou a convulsionar?', sim: 'ligar', nao: 'ciav' } },
    { id: 'ligar', t: 'Liga 112', d: 'Diz o que foi, quanto, a que horas, e a idade e o peso da pessoa. Tem a embalagem à mão.', ligar: true, ferr: 'rcp', fim: true },
    { id: 'ciav', t: 'Liga ao CIAV: 800 250 250', d: 'Centro de Informação Antivenenos, 24 horas, gratuito. Diz o produto, a quantidade, a hora, a idade e o peso. Faz o que te disserem. **Não provoques o vómito** e não dês leite nem «antídotos caseiros» por tua conta.' },
    { t: 'Se foi na pele, nos olhos ou inalado', d: 'Pele: tira a roupa contaminada e lava com muita água **pelo menos 20 minutos**. Olhos: água morna 15 a 20 minutos, do canto interior para o exterior, e urgência. Fumo ou gases: ar fresco, sentada, sem esforço; com tosse, pieira ou confusão, 112.', tempo: 1200, tempoT: 'Lavar a pele' },
    { t: 'Casos que vão sempre à urgência', d: 'Paracetamol em excesso (sem sintomas nas primeiras horas, mas destrói o fígado). Cáusticos como lixívia ou desentupidor (enxagua a boca, não vomitar). Petróleo, gasolina ou diluente. Pilha-botão engolida (queima o esófago em 2 horas; a caminho, mel 10 ml a cada 10 minutos, só com mais de 1 ano). Cogumelos (os sintomas podem surgir só 6 a 24 horas depois). Vigia a respiração e a consciência até ser vista.', fim: true }
  ] },
  { id: 'calor', icon: '🥵', t: 'Golpe de calor', grupo: 'pessoas', pag: '#/s/socorros/calor-corpo', passos: [
    { t: 'Tira a pessoa do calor', d: 'Sombra ou local fresco já. Deita-a com as pernas elevadas e tira roupa a mais.' },
    { t: 'É golpe de calor?', d: '**Confusão, agressividade, fala estranha, convulsões ou perda de consciência**, pele muito quente (seca ou ainda húmida), temperatura acima de 40 °C. Com suor abundante, pele fria e húmida, tonturas, náuseas e cãibras, mas a pensar bem, é esgotamento pelo calor.', p: { q: 'Confusa, a convulsionar ou inconsciente?', sim: 'golpe', nao: 'esgotamento' } },
    { id: 'golpe', t: 'Liga 112', d: 'Diz «golpe de calor». Mata ou deixa sequelas se não se arrefece em minutos: enquanto esperas, arrefecer é o que salva (passo seguinte).', ligar: true },
    { t: 'Arrefece o mais depressa possível', d: 'O melhor: imergir em água fria até ao pescoço (banheira, tanque, rio), com alguém a segurar a cabeça. Se não der: molha o corpo todo e abana sem parar, gelo ou sacos frios no pescoço, axilas e virilhas, ventoinha. Continua até a temperatura baixar para 39 °C ou até chegar ajuda.', hora: 'Início do arrefecimento' },
    { t: 'Beber só se estiver bem acordada', d: 'Consciente: água em goles pequenos. Sonolenta ou inconsciente: nada pela boca, deita de lado e vigia a respiração. Se parar de respirar: RCP.', ferr: 'rcp', fim: true },
    { id: 'esgotamento', t: 'Arrefece e dá de beber', d: 'Molha a pele com água fresca, panos húmidos no pescoço, axilas e virilhas, abana. Beber água ou soro de reidratação em pequenos goles, **com sal**: não só água pura em grande quantidade.' },
    { t: 'Reavalia ao fim de 30 minutos', d: 'Se piorar antes (confusão, pele quente, deixa de suar, desmaio), não esperes: é golpe de calor.', tempo: 1800, tempoT: 'Reavaliar', p: { q: 'Melhorou?', sim: 'bem', nao: 'golpe' } },
    { id: 'bem', t: 'Descanso o resto do dia', d: 'Local fresco, continuar a beber, sem esforço nem sol. Cãibras: alongar devagar, massajar, soro ou água com uma pitada de sal. Vigia sobretudo bebés, idosos e quem toma diuréticos.', fim: true }
  ] }
];
