/* Secção adaptada à família. Valores entre chavetas duplas vêm do perfil (Os meus dados › Perfil da família).
   c1 = criança mais nova, c2 = mais velha. Formas: {{c1}} "a mais nova" / "o Tomás", {{C1}} com maiúscula,
   {{de_c1}} "da mais nova", {{a_c1}} "à mais nova", {{por_c1}} "pela mais nova", {{c1_n}} rótulo, {{c1_o}} terminação a/o.
   Os textos genéricos falam de "a criança" (feminino gramatical), por isso concordam sempre. */
CONTENT.sections.push({
  id: 'familia', icon: '👨‍👩‍👧‍👦', title: 'A nossa família',
  desc: 'Guias e números para {{fam_nomes}}: água, comida, doses, escola, evacuação, jogos e casa segura.',
  pages: [
    { id: 'numeros', icon: '🔢', title: 'Os nossos números', desc: 'Água, comida, fraldas, leite, doses e quem faz o quê, calculados para {{fam_nomes}}.', tools: ['familia', 'reservas', 'doses'], md: `
>i Calculado para **{{fam_nomes}}**. Se algo mudar (peso, idade, mais uma pessoa, um animal), atualiza o [perfil da família](#/t/familia): todos os números da app mudam sozinhos. Os guias desta secção foram escritos para uma criança de 2 anos e outra de 7; relê-os quando crescerem.

## Água

| | Por dia | 3 dias | 2 semanas |
|---|---|---|---|
| Só beber e cozinhar | {{water_drink_day}} L | {{water_drink_3d}} L | {{water_drink_14d}} L |
| Com higiene mínima (o que deves guardar) | **{{water_day}} L** | **{{water_3d}} L** | **{{water_14d}} L** |
| Em garrafões de 5 L | | **{{jugs_3d}}** | **{{jugs_14d}}** |

Para beber e cozinhar: {{water_detail}}. A isto juntam-se 2 L por pessoa para higiene (mãos, dentes, fraldas, feridas).{{pets_water_line}} As crianças pequenas desidratam em horas e não pedem água: oferece de hora a hora. Com calor, febre ou diarreia, conta com mais 50%.

## Comida

**{{kcal_day}} kcal por dia** para a família: {{kcal_detail}}. Para 3 dias, cerca de {{kcal_3d}} mil kcal; para 2 semanas, cerca de **{{kcal_14d}} mil kcal**.

- A [calculadora de reservas](#/t/reservas) já tem os nossos dados e dá a lista de compras.
- A lista de 1 adulto da [despensa](#/s/comida/despensa) multiplica-se por **{{pd_factor}}** para a família inteira.
- As crianças não se racionam como adultos: se a comida for pouca, os adultos cortam primeiro.

## Coisas de criança que não podem faltar

- **Fraldas**: {{diapers_line}}
- **Leite**: {{milk_line}}
- **Comida {{de_c1}}**: mole e em pedaços pequenos (papas de cereais, purés em frasco, bolachas moles, banana, iogurtes de longa duração). Nada de frutos secos inteiros, uvas inteiras, rebuçados ou salsichas em rodelas: engasgamento.
- **Conforto**: chucha, copo ou biberão habitual e o boneco de cada criança, **em duplicado** (um fica na mala de evacuação).
- **Identificação**: cartão no bolso de cada criança com nome, pais, dois telefones, morada, alergias e contacto fora da zona. [Imprimir cartões](#/t/cartoes). Foto recente de cada criança no telemóvel dos dois adultos e em papel na mala: as crianças mudam de cara em meses.
- **Ouvidos**: protetores auriculares de criança (tipo auscultadores) para sirenes, explosões e abrigos cheios.

## Medicamentos: doses das nossas crianças

| | {{c1_n}} ({{c1_idade}}, {{c1_kg}} kg{{c1_kg_est}}) | {{c2_n}} ({{c2_idade}}, {{c2_kg}} kg{{c2_kg_est}}) |
|---|---|---|
| Paracetamol, até 4 vezes por dia | **{{c1_para_mg}} mg** = {{c1_para_ml}} ml de xarope 40 mg/ml | **{{c2_para_mg}} mg** = {{c2_para_ml}} ml de xarope 40 mg/ml{{c2_para_tab}} |
| Ibuprofeno, até 3 vezes por dia, com comida | **{{c1_ibu_mg}} mg** = {{c1_ibu_ml}} ml de xarope 20 mg/ml | **{{c2_ibu_mg}} mg** = {{c2_ibu_ml}} ml de xarope 20 mg/ml |
| Soro oral, depois de cada dejeção líquida | {{c1_sro}} | {{c2_sro}} |
| Soro oral, se já está desidratada | {{c1_sro4h}} | {{c2_sro4h}} |
| Anti-histamínico (cetirizina) | {{c1_cet}} | {{c2_cet}} |
| Iodeto de potássio, só com ordem oficial | {{c1_ki}} | {{c2_ki}} |
| Adrenalina auto-injetável | {{c1_adr}} | {{c2_adr}} |

Se o peso aparece como estimado, vem da idade: para doses certas, **pesa as crianças** e escreve o peso no [perfil](#/t/familia). Registo das tomas e outras concentrações na [calculadora de doses](#/t/doses). **Nunca aspirina em crianças.**

## Quem faz o quê

![Quem leva quem numa saída a pé](fig:familia-carga)

- **{{a1}}** fica com {{c1}}: colo ou porta-bebé, fraldas, leite, chucha. Leva também os documentos, o dinheiro e o rádio, que são leves, porque já carrega uma criança.
- **{{a2}}** fica com {{c2}} pela mão e leva a mochila grande: água, comida, kit médico, roupa e, se houver, o animal.
- **Se só estiver um adulto**: {{c1}} ao colo ou no porta-bebé, {{c2}} agarrad{{c2_o}} à mochila ou a uma fita presa ao pulso do adulto. {{C2}} pode ajudar com tarefas simples (segurar a lanterna, dar a chucha), mas **nunca fica responsável {{por_c1}}**.
- Ponto de encontro, contacto fora da zona e palavra-código são iguais para todos. Estão no cartão de cada criança e no [plano familiar](#/t/plano).
- **Treinem** uma vez por mês: "quem pega em quem", com as mochilas, em 30 segundos. Torna-se automático.

## Transporte

- **Carro**: sistema de retenção adequado ao peso e à altura de cada criança, sempre montado. {{C1}} numa cadeirinha virada para trás o máximo de tempo possível; {{c2}} num assento elevatório com encosto (obrigatório até aos 12 anos ou 135 cm). Em evacuação não há exceções: numa colisão a 50 km/h, ninguém consegue segurar uma criança ao colo.
- **A pé**: {{c1}} vai ao colo, num porta-bebé ergonómico ou numa mochila de transporte de montanha (leva a criança e ainda alguma carga), ou num carrinho robusto, que leva carga mas não passa escadas, escombros, lama nem multidões. {{C2}} anda **5 a 8 km por dia**, com pausas de 10 minutos a cada 40. Distância realista para a família: **8 a 12 km por dia**.
- **Bicicleta**: cadeira traseira para {{c1}}; {{c2}} na sua bicicleta ou num atrelado. Vai 3 a 4 vezes mais longe do que a pé.
- Mais em [evacuar com crianças](#/s/familia/evacuar-com-criancas).
` },

    { id: 'crianca-pequena', need: 1, icon: '🧸', title: '{{c1_titulo}}: o que muda', desc: 'Pensado para {{c1}}: fraldas, leite, engasgamento, colo, febre, sono e perigos em casa.', tools: ['doses', 'rcp'], md: `
## O que muda nesta idade

- Não percebe o perigo, não fica quieta, não sabe dizer o nome dos pais nem a morada e não anda longe. **Tudo depende de vós.** Nunca fica sozinha, nem "só um minuto".
- Precisa de rotina, sono, comida a horas e colo. Chora, faz birras, regride (chucha, fraldas, acordar de noite): é a forma de lidar com o stress, não mau comportamento.
- Desidrata e arrefece em horas, porque tem pouco corpo para reservas. Oferece água de hora a hora; roupa em camadas, gorro, meias secas.
- Leva tudo à boca: medicamentos, lixívia diluída, pilhas de botão, comprimidos de purificação, sacos de sílica, plantas, moedas. Ver [casa segura](#/s/familia/seguranca-criancas).
- Afoga-se em **5 cm de água**, em silêncio: baldes e bacias com água ficam tapados ou fora de alcance.

## Comida e bebida

- Come a comida da família, **mole e em pedaços pequenos** (do tamanho da unha do dedo mindinho). Pouco sal, sem picante.
- **Leite**: 400 a 500 ml por dia, UHT gordo ou em pó. Iogurtes de longa duração e queijo também contam.
- **Água**: cerca de {{c1_water}} L por dia para beber e cozinhar, oferecida de hora a hora no copo habitual. Sumos açucarados não substituem a água e pioram as diarreias.
- **Engasgamento** é das principais causas de morte acidental nesta idade. Nada de frutos secos inteiros, uvas ou tomates-cereja inteiros, rebuçados, pipocas, cenoura ou maçã crua em pedaços grandes, salsichas em rodelas. Corta em tiras finas e ao comprido. Come sentada, com um adulto a olhar.
- Os frutos secos inteiros da despensa são para os adultos e para {{c2}}; para {{c1}}, manteiga de amendoim ou frutos secos moídos.
- Come pouco e muitas vezes: 3 refeições e 2 a 3 lanches. Em stress pode recusar comida: não forces, oferece líquidos e volta a tentar. Um ou dois dias a comer mal não fazem mal; não beber faz.
- Reserva própria para 2 semanas: papas de cereais, purés em frasco, bolachas moles, fruta em frasco.

## Fraldas e higiene

- Fraldas: {{diapers_line}}
- A deixar as fraldas? Em crise volta-se às fraldas sem drama, e retoma-se depois.
- Reserva final: fraldas de pano ou toalhas dobradas com cuecas de plástico.
- Mãos lavadas antes de comer: mãos no chão do abrigo e depois na boca é como começam as diarreias.
- Assaduras: ar, água, creme barreira. Sem toalhitas com álcool.

## Saúde

- **Febre**: paracetamol **{{c1_para_mg}} mg** ({{c1_para_ml}} ml de xarope 40 mg/ml) até 4 vezes por dia, ou ibuprofeno **{{c1_ibu_mg}} mg** ({{c1_ibu_ml}} ml de xarope 20 mg/ml) até 3 vezes por dia, com comida. Roupa leve, líquidos. Ver [febre e doença](#/s/familia/febre-doenca) e a [calculadora de doses](#/t/doses).
- **Convulsão com febre**: entre os 6 meses e os 5 anos é comum e quase sempre benigna. Deita de lado, protege a cabeça, cronometra, não metas nada na boca. Mais de 5 minutos, ou não recupera: 112. Ver [convulsões](#/s/socorros/convulsoes).
- **Diarreia e vómitos**: soro oral, {{c1_sro}} depois de cada dejeção, à colher ou com seringa, em goles pequenos. Se já está desidratada: {{c1_sro4h}}. Alarme: fralda seca 6 horas, sem lágrimas, muito sonolenta, olhos fundos: 112. Ver [diarreia](#/s/socorros/diarreia).
- **RCP e engasgamento**: técnica de **criança** (a partir de 1 ano), não de bebé. RCP: 5 insuflações iniciais, compressões com uma mão, 5 cm, 30:2. Engasgamento: 5 pancadas nas costas e 5 compressões abdominais suaves, com a criança inclinada para a frente. Ver [RCP](#/s/socorros/rcp), [engasgamento](#/s/socorros/engasgamento) e o [metrónomo](#/t/rcp).
- **Intoxicação**: CIAV 800 250 250. Não provoques o vómito. Guarda a embalagem. Ver [intoxicações](#/s/socorros/intoxicacao).
- **Frio e calor**: vigia mãos e pés frios, tremores, sonolência; ao calor, cara muito vermelha, moleza, fralda seca. Nesta idade não se queixa a tempo.
- Boletim de saúde e de vacinas no [cofre](#/t/cofre) e em papel na mala.

## Deslocação

- Porta-bebé ergonómico ou mochila de transporte: mãos livres, passa escadas e escombros, e a criança dorme lá. Treina antes: {{c1_kg}} kg às costas durante 2 horas cansam.
- Carrinho robusto para estrada e para levar carga.
- **Cadeirinha sempre montada no carro.** Sem cadeirinha não se viaja, mesmo em evacuação.
- Em multidões: ao colo ou no porta-bebé, nunca a andar. Nome e telefone escritos no braço com caneta permanente e no cartão.
- Roupa de cor viva. Muda completa em saco estanque na mala dos adultos.

## Abrigo, barulho e sono

- Sirenes, explosões e abrigos cheios assustam e magoam os ouvidos: **protetores auriculares de criança**, tipo auscultadores. Tampões não servem nesta idade.
- Sono: saco-cama próprio, o boneco, a chucha, a mesma canção e a mesma sequência todos os dias, mesmo no abrigo. Luz de presença fraca (a luz vermelha da [lanterna](#/t/lanterna) gasta pouco).
- Birras no abrigo: menos palavras, mais colo, mudar de sítio, esperar. Sono e fome causam a maioria. Ninguém vai gostar, e ninguém morre disso.
- Acordar de noite e chichi na cama são normais em crise. Sem castigos: muda e volta a deitar.
- Um adulto sempre com a criança. Turnos entre os dois para descansar.

## O que ensinar já

- O nome próprio de cada adulto da casa. Por volta dos 3 anos, o nome completo.
- "Quando eu digo **colo já**, vens já." Treina como um jogo.
- "Não se mexe" em pilhas, medicamentos e garrafas. Mas não confies: guarda tudo fora de alcance.
` },

    { id: 'crianca-escolar', need: 2, icon: '🎒', title: '{{c2_titulo}}: o que muda', desc: 'Pensado para {{c2}}: o que já consegue, o que ensinar, escola, medo e doses.', tools: ['doses'], md: `
## O que já consegue

- Perceber explicações simples e verdadeiras, seguir regras e ajudar a sério.
- Andar **5 a 8 km por dia** com pausas e levar uma mochila de **2 a 3 kg** (no máximo 10% do peso).
- Decorar: nome completo, morada, telefone dos pais, o 112, o ponto de encontro, a palavra-código e o nome do contacto fora da zona.
- Usar lanterna, apito e rádio, contar garrafas, cumprir tarefas concretas.
- **Não** consegue tomar conta {{de_c1}} sozinh{{c2_o}}: pode dar a mão, dar a chucha, cantar, mas o responsável é sempre um adulto.
- Ler e jogar: os [sinais de socorro](#/s/comunicar/sinais) e o [Morse](#/t/morse) são bons jogos para esta idade.

## Ensinar agora (10 minutos por semana, como jogo)

- Ligar 112 e dizer onde está e o que se passa. Treina a fingir, com o telemóvel desligado, e sem nunca carregar em chamar: mesmo em modo de voo ou sem cartão SIM, a chamada para o 112 pode seguir a sério. O 112 funciona em qualquer telemóvel, mesmo bloqueado.
- "Se te perderes: **ficas onde estás**, gritas o nosso nome e pedes ajuda a uma mãe com filhos, a um polícia ou a alguém que trabalhe na loja. Nunca vais com um desconhecido, mesmo que diga que fomos nós que o mandámos, a não ser que saiba a palavra-código."
- "Não tocamos em nada estranho no chão": pilhas, químicos, objetos militares, seringas. Marca-se com um pau e chama-se um adulto.
- **Baixar, proteger, aguardar** (sismo). **Sair baixo e não voltar** (fumo). **Ir para o abrigo e ficar** (sirene). Onde é o abrigo em casa e na escola.
- Apito: 3 sopros, pausa, repetir. Lanterna: SOS com 3 curtos, 3 longos, 3 curtos.
- Abrir a mala de evacuação e saber o que tem. Vestir camadas e trocar as meias molhadas.
- Lavar as mãos sem água corrente.

## Comida, água e saúde

- Cerca de {{c2_water}} L de água e {{c2_kcal}} kcal por dia. Come como um adulto pequeno, com lanches. Não se raciona uma criança desta idade como um adulto: fica fraca e doente mais depressa.
- **Febre e dor**: paracetamol **{{c2_para_mg}} mg** ({{c2_para_ml}} ml de xarope 40 mg/ml{{c2_para_tab}}) até 4 vezes por dia; ibuprofeno **{{c2_ibu_mg}} mg** ({{c2_ibu_ml}} ml de xarope 20 mg/ml) até 3 vezes por dia, com comida. Ver a [calculadora de doses](#/t/doses).
- **Diarreia**: soro oral, {{c2_sro}} depois de cada dejeção; se já está desidratada, {{c2_sro4h}}. Nesta idade já bebe sozinha: dá-lhe a garrafa e uma meta ("até à marca").
- Dentes de leite a cair: um dente de leite arrancado **não** se recoloca; um dente definitivo sim (guardado em leite, dentista em menos de 1 hora). Ver [dentes](#/s/socorros/olhos-ouvidos).
- RCP e engasgamento: técnica de criança (uma ou duas mãos, 5 cm). Ver [RCP](#/s/socorros/rcp).
- Vacinas: aos 5 anos há reforço (tétano, difteria, tosse convulsa, poliomielite); confirma no boletim.

## Escola

Plano de emergência da escola, quem vai buscar, lista de autorizados e o que fazer se acontecer em horário escolar: ver [escola, creche e separação](#/s/familia/escola-creche).

## Medo e comportamento

- Pergunta tudo e percebe mais do que parece. Responde com verdade simples, sem pormenores de terror: "Há um problema grande (um incêndio, um sismo, uma guerra). Os adultos estão a tratar. Nós temos um plano e estamos juntos." Repete as vezes que for preciso.
- **Notícias, vídeos e conversas assustadas de adultos: fora.** As crianças absorvem o pânico dos ecrãs e das nossas caras.
- Pesadelos, medo de dormir sozinha, chichi na cama, agarrar-se, irritabilidade, "portar-se como um bebé": normal. Sem castigos; mais rotina e mais colo.
- **Responsabilidades reais**: chefe da lanterna, responsável pelas pilhas, contar as garrafas de água, ler {{a_c1}}, escrever o diário da família. Sentir-se útil é o melhor remédio para o medo nesta idade.
- "Escola" 20 minutos por dia, mesmo no abrigo: ler, contas, desenhar, escrever o que aconteceu. Dá estrutura e normalidade.
- Brincar ao que aconteceu (bombeiros, abrigo, guerra) é como se processa. Deixa, e participa se te convidar.
- Procura ajuda se durar semanas: não dormir, não falar, agressividade nova, só brincar a coisas violentas, queixas físicas constantes. Ver [saúde mental](#/s/saude/mental).

## Equipamento próprio

- Mochila pequena própria (ver [mala de evacuação](#/s/kit/mala-evacuacao)): água, lanche, lanterna, apito, casaco, muda de roupa, brinquedo pequeno, livro, cartão de identificação.
- Sapatos fechados, já usados e confortáveis, e meias de reserva. Uma bolha acaba uma caminhada aos 2 km.
- Roupa de cor viva. Gorro e luvas mesmo no verão: as noites arrefecem e as crianças perdem calor depressa.
` },

    { id: 'escola-creche', need: 1, icon: '🏫', title: 'Escola, creche e separação', desc: 'O que combinar com a escola {{de_c2}} e a creche {{de_c1}}, o que fazer em horário escolar, e se nos separarmos.', md: `
## Antes (faz-se numa semana)

- [ ] Pedir o **plano de emergência** à escola {{de_c2}} e à creche ou ama {{de_c1}}: onde se juntam depois de evacuar, como avisam os pais, a quem entregam as crianças, onde se abrigam num sismo ou alerta.
- [ ] Atualizar a **lista de pessoas autorizadas** a ir buscar cada criança: os dois adultos, avós, um vizinho ou amigo de confiança que viva ou trabalhe perto. Se ninguém da lista puder ir, a escola não entrega a criança a mais ninguém, e é assim que deve ser.
- [ ] Combinar entre os dois adultos **quem vai buscar qual criança, por que ordem, e o que acontece se não conseguir chegar**. Escrever no [plano familiar](#/t/plano).
- [ ] Palavra-código da família: {{c2}} sabe que só vai com quem a souber.
- [ ] Cartão de identificação na mochila de cada criança e no bolso {{de_c1}}, com o contacto fora da zona. [Imprimir](#/t/cartoes).
- [ ] Um saco pequeno na escola e na creche, se aceitarem: muda de roupa, lanche que não se estrague, fralda, foto da família, bilhete com contactos.
- [ ] Ensinar {{a_c2}} onde é o ponto de encontro da escola e o da família, e que fica com a professora até chegar um adulto da lista.

## Durante uma emergência em horário escolar

- **Não corras para a escola durante um alerta aéreo, uma nuvem química, uma tempestade forte ou tiros nas imediações.** As escolas confinam as crianças em segurança; tu, na rua, estás em risco, entopes o acesso dos socorros e não chegas. Espera pelo fim do alerta e depois vai.
- **Sismo ou incêndio**: a escola evacua para um ponto de encontro exterior. Vai lá, não à sala. Leva documento: só entregam a quem está na lista.
- Os telefones da escola ficam saturados: usa a app ou o site da escola, SMS, o grupo de pais, ou vai. **Um adulto vai buscar, o outro fica a receber e a passar informação** (rádio, contacto fora da zona).
- A ordem: primeiro a criança em maior risco ou mais longe de ajuda, normalmente a mais nova. Combinem antes, não no momento.
- Entre ir buscar as crianças e outra coisa qualquer, vai-se buscar as crianças.
- Depois, todos para o ponto de encontro ou para casa, conforme o plano. Avisa o contacto fora da zona: "temos as crianças, estamos em X".

## Se ficarmos separados por horas ou dias

- {{C2}} deve saber de cor: nome completo dos pais, um telefone, a morada, o contacto fora da zona e o ponto de encontro. Treinem uma vez por mês.
- {{C1}} ainda não consegue dizer nada disto: **cartão no bolso e etiqueta na roupa** com nome, pais, telefones, alergias e "fala pouco". Em deslocações, nome e telefone escritos no braço com caneta permanente.
- Foto recente de cada criança no telemóvel de cada adulto e em papel na mala, para mostrar a quem procura.
- Combina com os avós, ou com a pessoa de confiança da lista: se não conseguirem falar convosco em X horas, vão buscar as crianças e levam-nas para casa deles. Escreve isso no plano e avisa a escola.
- Se alguém se perder numa evacuação ou abrigo: Cruz Vermelha (restabelecimento de laços familiares), Proteção Civil, polícia. Regista-te com fotos e descrição. Não saias do sítio onde a criança foi vista pela última vez sem deixar um bilhete.
- Reencontro: primeiro colo e calma, depois comer e dormir, e só depois perguntas. Nos dias seguintes vão querer estar sempre agarradas: deixa.
` },

    { id: 'febre-doenca', need: 1, icon: '🌡️', title: 'Febre e doença {{kids_de}}', desc: 'Febre, vómitos, diarreia, tosse e manchas: o que fazer em casa e quando é urgente.', tools: ['doses', 'temporizador'], md: `
## Febre

- Febre é a partir de **38 °C**. Não é uma doença: é o corpo a lutar. O medicamento serve para dar conforto, não para pôr a febre a zero.
- **Paracetamol**, até 4 vezes por dia, com pelo menos 4 a 6 horas entre tomas:
  - {{c1_n}}: **{{c1_para_mg}} mg** = {{c1_para_ml}} ml de xarope 40 mg/ml
  - {{c2_n}}: **{{c2_para_mg}} mg** = {{c2_para_ml}} ml de xarope 40 mg/ml{{c2_para_tab}}
- **Ibuprofeno**, se a febre não cede ou há dor, até 3 vezes por dia, com comida:
  - {{c1_n}}: **{{c1_ibu_mg}} mg** = {{c1_ibu_ml}} ml de xarope 20 mg/ml
  - {{c2_n}}: **{{c2_ibu_mg}} mg** = {{c2_ibu_ml}} ml de xarope 20 mg/ml
- Não dar ibuprofeno a uma criança desidratada, com varicela, ou com asma que piora com anti-inflamatórios. Em febre alta podem alternar-se os dois, sem passar o máximo diário de cada um.
- Usa a **seringa doseadora** e **regista cada toma** na [calculadora de doses](#/t/doses): às 3 da manhã, dois adultos cansados dão a mesma dose duas vezes. Confirma a concentração no rótulo: há xaropes com concentrações diferentes.
- Roupa leve, ambiente fresco, líquidos frequentes (água, soro, sopa, leite). Sem banhos frios nem álcool na pele. Pode dormir; acorda só para beber.
- Se vomita o xarope: supositório de paracetamol com a dosagem mais próxima da dose por peso, sem passar (confirma no folheto).

## Quando ligar para o SNS 24 (808 24 24 24) ou ir à urgência

- Febre acima de **40 °C**, ou que dura mais de **3 dias** (2 dias abaixo dos 3 anos).
- **Manchas roxas ou vermelhas que não desaparecem quando pressionas um copo de vidro sobre elas**: 112 (pode ser meningite).
- Pescoço rígido, dor de cabeça forte com vómitos, a luz incomoda muito.
- Dificuldade em respirar: respiração muito rápida, covas entre as costelas ou no pescoço a cada respiração, lábios azulados, ruído a respirar, não consegue dizer uma frase: **112**.
- Muito prostrada, não acorda bem, não sorri nem reage, geme sem parar, chora inconsolável durante horas.
- Convulsão: se durar mais de 5 minutos ou for a primeira, 112.
- Desidratação: sem urina há 6 a 8 horas, boca seca, sem lágrimas, olhos fundos.
- Dor de barriga forte e contínua (sobretudo do lado direito), vómitos verdes, sangue nas fezes.
- Qualquer coisa que vos deixe mesmo preocupados: os pais acertam mais do que pensam.

## Vómitos e diarreia

- O tratamento é **hidratar**: soro oral, goles pequenos e frequentes.
  - {{c1_n}}: {{c1_sro}} depois de cada dejeção ou vómito, à colher ou com seringa (uma colher de chá a cada 1 a 2 minutos se vomita).
  - {{c2_n}}: {{c2_sro}}, com uma garrafa marcada e uma meta.
- Espera 10 minutos depois de um vómito e recomeça devagar. Frio ajuda a tolerar.
- Come assim que conseguir: arroz, batata, pão, banana, maçã cozida, sopa, bolachas de água e sal. O leite habitual pode continuar. Sem sumos, refrigerantes ou fritos.
- **Sem antidiarreicos (loperamida) em crianças.** Sem antibióticos sem médico.
- Todos lavam as mãos a cada muda de fralda e ida à casa de banho: num abrigo, uma diarreia passa a toda a gente em 2 dias.
- Receita do soro caseiro em [diarreia](#/s/socorros/diarreia).

## Tosse, nariz entupido, ouvidos

- Líquidos, ar húmido (toalha molhada no quarto), cabeceira elevada, soro fisiológico no nariz: fundamental até aos 3 ou 4 anos, porque ainda não sabem assoar-se. Aspirador nasal.
- Mel para a tosse a partir de 1 ano (uma colher de chá). Xaropes para a tosse não se dão abaixo dos 6 anos: não funcionam e têm riscos.
- Dor de ouvidos: paracetamol ou ibuprofeno. Se durar mais de 2 dias, sair pus ou houver febre alta, precisa de médico.
- Pieira ou respiração rápida, sobretudo se já teve bronquiolite ou asma: inalador com câmara expansora, se tiver receita; se não melhorar, urgência.

## Pele

- **Varicela** (bolhas com comichão, em vagas): paracetamol, **nunca ibuprofeno**, unhas curtas, banhos mornos; contagiosa até todas as bolhas secarem.
- **Urticária** (manchas em relevo que mudam de sítio): cetirizina. {{c1_n}}: {{c1_cet}}. {{c2_n}}: {{c2_cet}}. Se incharem os lábios ou a língua, ou houver dificuldade em respirar: adrenalina se houver, e 112.
- **Impetigo** (crostas cor de mel à volta da boca e do nariz, comum em abrigos): lavar com água e sabão, cobrir, toalha só para quem o tem; precisa de antibiótico.
- **Piolhos e sarna** aparecem em abrigos: pente fino, roupa lavada a 60 °C ou fechada num saco uma semana; permetrina na farmácia.

## Reserva de medicamentos para as crianças

- [ ] Paracetamol xarope 40 mg/ml (2 frascos) e supositórios nas dosagens dos pesos das crianças
- [ ] Ibuprofeno xarope 20 mg/ml (2 frascos)
- [ ] Soro de reidratação oral em saquetas (10) e seringas doseadoras (3)
- [ ] Soro fisiológico em ampolas (nariz e olhos) e aspirador nasal
- [ ] Termómetro digital (2) e oxímetro de dedo pediátrico
- [ ] Cetirizina em gotas, creme de hidrocortisona a 1%
- [ ] Creme barreira, pomada para picadas, protetor solar infantil, repelente próprio para a idade
- [ ] Inaladores e medicação crónica das crianças, se existirem, para 1 a 2 meses
- [ ] Boletins de saúde e de vacinas no [cofre](#/t/cofre) e em papel
` },

    { id: 'evacuar-com-criancas', need: 1, icon: '🚶‍♀️', title: 'Evacuar com {{kids_para}}', desc: 'De carro, a pé, em transportes e em abrigos coletivos, com {{kids_desc}}.', md: `
## Decidir cedo

Com crianças pequenas, **saiam antes dos outros**. Uma fila de 6 horas ao calor sem fraldas nem água, ou uma caminhada de noite com as duas crianças, evita-se saindo ao primeiro aviso, quando as estradas e as bombas de gasolina ainda funcionam. Se a maioria decide ficar, vocês têm menos margem do que a maioria.

## De carro

- Cadeirinha e assento elevatório montados, sempre. Malas na bagageira; um adulto atrás com as crianças, se possível.
- Ao alcance da mão: água com bico, lanches, fraldas e toalhitas, saco para vómito, muda de roupa, brinquedos, mantas, protetores auriculares. Histórias e músicas descarregadas no telemóvel (com o ecrã desligado gastam pouca bateria).
- Paragens de 10 minutos a cada hora e meia. **Nunca** as deixes no carro, nem numa fila parada ao sol.
- Com crianças, o depósito nunca fica abaixo de meio. Fila longa sem ar condicionado: janelas, panos húmidos, água.
- Se tiverem de abandonar o carro: porta-bebé e mochilas; a cadeirinha fica.

## A pé

- {{C1}} vai no porta-bebé ergonómico ou na mochila de transporte de montanha (que ainda leva carga por baixo e tem capa de chuva). O carrinho todo-o-terreno serve em estrada e leva muita carga, mas não passa escadas, escombros, lama funda nem multidões apertadas. O ideal é levar os dois: carrinho para a carga, porta-bebé enrolado de reserva.
- {{C2}} vai pela mão em ruas com trânsito e em multidões, ou com uma fita presa ao pulso do adulto, e leva a sua mochila de 2 a 3 kg. Ritmo de criança: 2 a 3 km/h, pausas de 10 minutos a cada 40, metas curtas ("até àquela árvore"), lanches como prémio.
- **Distância realista da família: 8 a 12 km por dia.** Planeia paragens e abrigo a essa distância, não à distância de dois adultos.
- Carga: quem leva {{c1}} ({{c1_kg}} kg) leva só uma mochila pequena à frente (documentos, água, fraldas; até 5 kg). O outro adulto leva a mochila grande (até 15 kg). Ver [deslocação a pé](#/s/navegar/caminhar).
- Roupa em camadas para as duas crianças, gorro, muda seca em saco estanque. As crianças aquecem e arrefecem mais depressa do que os adultos: verifica mãos, pés e nuca de hora a hora.
- Verifica os pés {{de_c2}} a cada paragem: uma bolha aos 3 km acaba a caminhada.
- Roupa e mochilas de cor viva; uma fita colorida no braço de cada criança para as veres na multidão.

## Transportes e multidões

- Nomes e telefones no braço com caneta permanente, cartão no bolso. Foto de cada criança tirada nesse dia, com a roupa que leva vestida, no telemóvel dos dois adultos.
- Os comboios e autocarros de evacuação dão prioridade a famílias com crianças pequenas: pede.
- Na multidão: {{c1}} sempre ao colo ou no porta-bebé; {{c2}} à tua frente, entre os teus braços, ou às cavalitas se apertar. Se se separarem, o último sítio onde estiveram juntos é o ponto de encontro imediato: {{c2}} fica parad{{c2_o}} e chama.
- Não entrem num transporte se não couberem todos. Ninguém fica para trás "para ir no próximo".

## Abrigos coletivos e casas de outros

- Um canto vosso, longe da porta e do barulho: colchão, cobertores, um lençol pendurado a separar. Rotina de sono igual à de casa.
- Protetores auriculares, brinquedos silenciosos, livros, cartas, papel e lápis. Um "saco do tédio" preparado antes vale ouro.
- Um adulto sempre com as crianças, sem exceções. Turnos.
- Mãos lavadas com mais frequência (as diarreias correm nos abrigos), fraldas usadas em saco fechado e fora, lixo fechado.
- Apresentem-se às famílias à volta: outras crianças são o melhor entretenimento, e outros pais o melhor apoio.
- Em casa de familiares ou amigos: levem a vossa comida e as coisas das crianças, ajudem, e combinem regras de casa desde o primeiro dia (sono, barulho, cozinha). As estadias longas estragam-se por coisas pequenas.
` },

    { id: 'ocupar-e-acalmar', need: 1, icon: '🎲', title: 'Calma e brincadeiras para {{kids_para}}', desc: 'Jogos sem eletricidade para {{c1_age}} e {{c2_age}} anos, rotinas, sono, birras, medo e o que dizer.', md: `
## Regras de ouro

- **Adultos calmos, crianças calmas.** Elas leem as nossas caras antes das palavras. Respira antes de falar. Combinem que as discussões entre adultos acontecem longe delas.
- **Rotina**: horas fixas para comer, brincar, "escola" e dormir, mesmo no abrigo ou no carro. A rotina é a casa que se leva.
- **Verdade simples e repetida.** Para {{c2}}: "Há um problema grande lá fora (pode saber o nome: um incêndio, um sismo, uma guerra). Os adultos estão a tratar dele. Aqui estamos seguros e vamos ficar juntos." Para {{c1}}: menos palavras e mais colo, "está tudo bem, estou aqui".
- **Tarefas**: {{c2}} é chefe da lanterna, conta as garrafas, lê {{a_c1}}, escreve o diário. {{C1}} ajuda a arrumar, escolhe a canção, dá um brinquedo {{a_c2}}. Sentirem-se úteis acalma.
- **Ecrãs**: a bateria é para o essencial. Se os usarem, desenhos descarregados e nunca notícias ou vídeos de desastres.

## Jogos sem eletricidade

### Para {{c1}} ({{c1_idade}})

- Esconder objetos debaixo de copos; torres de copos e latas; encaixar tampas em frascos.
- Transvasar arroz ou feijão entre recipientes com uma colher, sempre com um adulto a olhar (vai à boca).
- Canções com gestos, "cabeça, ombros, joelhos e pés", palmas a ritmos.
- Sombras com a lanterna na parede; caça ao tesouro com a luz.
- "Cozinhar" com panelas e colheres de pau; bolas de meias para atirar a um balde.
- Livros de cartão e histórias inventadas com bonecos.
- Plasticina caseira: 2 chávenas de farinha, meia de sal, meia de água e uma colher de óleo.
- Passear ao colo pelo abrigo a "visitar" pessoas: gasta energia e faz amigos.

### Para {{c2}} ({{c2_idade}})

- Cartas: peixinho, burro, memória, solitário. Dominó e dados.
- Batalha naval, forca, jogo do galo, "quem sou eu" em papel.
- Adivinhas, "vejo, vejo", 20 perguntas, histórias em cadeia (cada um diz uma frase).
- Origami (barcos, aviões, sapos), desenhar o mapa do abrigo, diário desenhado do dia.
- Morse com a lanterna (a [tabela](#/t/morse) está na app), alfabeto fonético, nós com um cordel ([nós](#/s/saber/nos)).
- Ler em voz alta {{a_c1}}; teatro de sombras; inventar uma peça para a família.
- Tarefas de responsabilidade: inventário das pilhas, mapa dos pontos de encontro, verificar as lanternas à noite.

### Todos juntos

- Cabana de cobertores: é também um sítio seguro para o medo e para dormir.
- Mímica, "o rei manda", estátuas com música cantada, pista de carros com fita adesiva no chão.
- Canções da família, sempre as mesmas. Uma canção "de ir para o abrigo" transforma a ida num jogo.

## Sono

- A mesma sequência todos os dias: lavar, pijama, história, canção, luz de presença. O mesmo saco-cama e o mesmo boneco.
- Luz de presença fraca e vermelha: gasta pouco e não tira o sono. A [lanterna vermelha](#/t/lanterna) da app serve.
- Barulho: protetores auriculares, canção baixa, mão nas costas. Explosões e sirenes: "É barulho. Estamos seguros aqui. Vem para o colo."
- Pesadelos: acordar, colo, água, "foi um sonho, estou aqui", voltar a deitar. Falar do sonho, só de manhã e se quiser.
- Chichi na cama: normal em crise. Resguardo impermeável, muda rápida, sem comentários.
- Dormir todos na mesma divisão é normal e aconselhável em crise. Se {{c1}} só dorme agarrad{{c1_o}}, deixa.

## Birras, choro e medo

- Birra aos 2 anos: menos palavras, mais colo, mudar de sítio, esperar que passe, e depois água e lanche. Sono e fome causam a maioria. Num abrigo ninguém gosta, mas todos os pais percebem.
- Se {{c1}} chora sem parar, verifica por esta ordem: dor (ouvidos, dentes, barriga), fome, fralda, sono, frio ou calor, barulho, colo. Se nada resulta e está diferente do costume, pode estar doente: ver [febre e doença](#/s/familia/febre-doenca).
- Medo aos 7 anos: ouvir sem corrigir, dar nome ao que sente ("estás assustad{{c2_o}}; eu também um bocadinho, e estamos juntos"), respirar em conjunto (4 segundos a inspirar, 4 a segurar, 6 a expirar, 5 vezes) e dar uma tarefa. Não prometas o que não controlas ("não vai acontecer nada"); promete o que controlas ("eu fico contigo").
- Agressividade ou "voltar a ser bebé": normal durante semanas. Limites calmos e mais atenção, sem castigos.
- Sinais de alarme e quando procurar ajuda: [crianças em conflito](#/s/guerra/criancas) e [saúde mental](#/s/saude/mental).

## Os adultos

Ninguém cuida de duas crianças em crise sem dormir e sem comer. Turnos a sério: 4 horas de sono seguidas para cada um, à vez. Dez minutos a sós por dia. Pedir ajuda a vizinhos e a outros pais não é fraqueza: faz parte do plano.
` },

    { id: 'seguranca-criancas', need: 1, icon: '🔐', title: 'Casa segura para {{kids_para}}', desc: 'Os perigos novos que uma crise traz para dentro de casa e a checklist para os eliminar.', md: `
Numa crise a casa enche-se de perigos que não existiam: velas, fogareiros, lixívia diluída em garrafas, baldes com água, gerador, ferramentas, medicamentos à vista, vidros partidos, escadas às escuras. E há **menos vigilância**, porque os adultos estão ocupados e cansados. Com uma criança de 2 anos, isto pode matar mais do que a própria crise. Faz esta lista uma vez e repete-a sempre que mudarem de casa ou de abrigo.

## Água, químicos e objetos pequenos

- [ ] Água guardada em garrafões **fechados**, nunca em baldes, bacias ou banheira ao alcance {{de_c1}}: uma criança pequena afoga-se em 5 cm de água, em silêncio, num minuto. Banheira cheia: porta da casa de banho fechada com trinco alto.
- [ ] Lixívia (e água com lixívia), gel de álcool, combustíveis, comprimidos de purificação, iodo: em cima, fechados, **nunca em garrafas de água ou de sumo**.
- [ ] **Pilhas de botão** (relógios, luzes LED pequenas, termómetros, balanças): engolidas, queimam o esófago em 2 horas. Aparelhos com tampa aparafusada; pilhas soltas guardadas à chave.
- [ ] Medicamentos, incluindo os xaropes "que sabem bem", numa caixa fechada e em cima. Alguns medicamentos de adulto (para o coração, a tensão, a diabetes, antidepressivos, opioides) podem ser perigosos com um ou dois comprimidos.
- [ ] Sacos de sílica, moedas, ímanes pequenos, tampas, berlindes e brinquedos {{de_c2}} com peças pequenas: fora do alcance {{de_c1}}.
- [ ] Sacos de plástico e cordões guardados (asfixia).
- [ ] CIAV **800 250 250** escrito na parede da cozinha e guardado no telemóvel.

## Fogo, calor e luz

- [ ] Sem velas, com crianças. Lanternas LED e candeeiros de campismo sem peças soltas pequenas.
- [ ] Fogareiro em mesa alta, só com adulto, cabo da panela virado para dentro, crianças a mais de 1 metro. Desligar e deixar arrefecer fora do alcance.
- [ ] Gerador fora de casa; aquecedores com barreira; detetor de CO com pilha nova.
- [ ] Fósforos e isqueiros em cima e fechados. {{C2}} sabe que só os adultos acendem fogo.
- [ ] Água quente para banhos de bacia testada com o cotovelo; a chaleira nunca no chão.

## Casa e quedas

- [ ] Escadas: barreira em cima e em baixo; luz de presença nas escadas e no corredor (luzes solares ou LED a pilhas).
- [ ] Janelas e varandas: trincos ou bloqueadores, nada para trepar junto à janela, rede na varanda.
- [ ] Vidros partidos depois de um sismo ou explosão: zona interdita, calçado sempre, varrer logo.
- [ ] Móveis e estantes presos à parede (réplicas e crianças que trepam).
- [ ] Ferramentas, facas, tesouras, arame e pregos numa caixa fechada, em cima.
- [ ] Portas para a rua e para a garagem com trinco alto: aos 2 anos já se abrem portas.
- [ ] No abrigo ou na cave: verificar chão, escadas e objetos soltos, e decidir onde ficam as crianças enquanto se arruma.

## Comida

- [ ] {{C1}} come sempre sentad{{c1_o}}, com um adulto a olhar, comida cortada em pedaços pequenos, sem frutos secos inteiros, uvas inteiras, rebuçados nem salsichas em rodelas.
- [ ] Comida fora de validade ou de latas amolgadas: fora, mesmo que pareça boa. Uma intoxicação alimentar numa criança de {{c1_kg}} kg é urgente em horas.
- [ ] Mãos lavadas antes de comer, as das crianças e as dos adultos.

## Fora de casa

- [ ] {{C1}} sempre pela mão ou ao colo perto de água, estradas, escombros e animais soltos.
- [ ] {{C2}} não toca em objetos estranhos, não vai ver o rio, o fogo ou os estragos, não entra em casas danificadas.
- [ ] Cães soltos e assustados: as crianças não correm nem gritam; ficam de lado, quietas, atrás de um adulto.
- [ ] Cabos caídos, buracos e água de cheia: zona proibida, explicada e repetida.
` }
  ]
});
