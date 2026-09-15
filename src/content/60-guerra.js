CONTENT.sections.push({
  id: 'guerra', icon: '🪖', title: 'Conflito armado',
  desc: 'Preparação e comportamento de civis em guerra: alertas, abrigos, explosivos, checkpoints, evacuação, nuclear, químico.',
  pages: [
    { id: 'antes', icon: '📋', title: 'Antes: preparar-se para conflito', desc: 'O que fazer nas semanas em que a tensão sobe e ainda há tempo.', md: `
## Quando as notícias pioram

Não esperes pelo primeiro ataque. Os que se preparam nas semanas anteriores saem com tempo, com dinheiro e com documentos. Os outros ficam presos em filas.

- [ ] **Documentos**: CC/passaporte válidos para todos (renova os que expiram em menos de 1 ano), certidões de nascimento e casamento, cartões de saúde, escrituras, diplomas. Originais num saco estanque, cópias no [cofre](#/t/cofre) e numa pen, fotos no telemóvel.
- [ ] **Dinheiro**: notas pequenas em euros (algumas centenas, mais se puderes), e algo em dólares ou moeda estável se houver risco de fuga para fora. Os bancos e multibancos podem fechar por dias.
- [ ] **Combustível**: depósito sempre cheio, jerricã de 20 L guardado em segurança no exterior.
- [ ] **Água e comida** para 2 semanas mínimo, ideal 1 mês. [Despensa](#/s/comida/despensa).
- [ ] **Medicação** para 2 a 3 meses, incluindo iodeto de potássio se há centrais nucleares a menos de 300 km (Almaraz está a 100 km da fronteira).
- [ ] **Rádio a pilhas**, powerbanks, painel solar, pilhas, lanternas.
- [ ] **Mala de evacuação** por pessoa, à porta. [Checklist](#/s/kit/mala-evacuacao).
- [ ] **Abrigo**: identifica o melhor sítio em casa ([abrigo em casa](#/s/casa/abrigo-explosoes)) e os abrigos públicos ou parques subterrâneos a menos de 5 minutos de casa, do trabalho e da escola. Metro, garagens, caves de edifícios grandes.
- [ ] **Plano familiar** completo, impresso, com dois pontos de encontro e um contacto no estrangeiro. [Plano](#/t/plano).
- [ ] **Rotas de evacuação**: para o interior, para Espanha, para outra região, com alternativas fora das autoestradas. Mapas de papel.
- [ ] Sabe **para onde irias** (família, amigos, aldeia) e combina com eles.
- [ ] **Extintor, kit de primeiros socorros grande** (com torniquetes e pensos hemostáticos), curso de primeiros socorros.
- [ ] Reduz dependências: dívidas, subscrições, coisas que precisam de internet.
- [ ] Fala com as crianças, com calma e verdade adequada à idade. Treinem o "vamos para o abrigo" como um jogo.
- [ ] Informa-te por fontes oficiais e sérias (rádio pública, Governo, embaixadas se és estrangeiro). Regista-te no consulado do teu país se vives no estrangeiro.

## Cidadãos estrangeiros

Regista-te na embaixada. Os países evacuam os seus cidadãos, mas só os que sabem que existem. Passaporte válido e à mão.

## Sinais de que é tempo de sair

Encerramento de escolas e aeroportos, evacuação de embaixadas, mobilização militar, cortes de comunicações, combates a menos de 100 km. Quem sai cedo sai bem.
` },

    { id: 'alerta-aereo', icon: '🚨', title: 'Alerta aéreo e sirenes', desc: 'O que fazer ao ouvir sirenes, ao ver drones, ao ouvir explosões.', md: `
## Ao ouvir a sirene ou receber alerta

**Vai para o abrigo. Já. Não para casa, não para buscar coisas.**

- Tens tipicamente **1 a 5 minutos** para mísseis, mais para aviões, quase nada para artilharia. Cada segundo que hesitas é um segundo a menos.
- Se estás em casa: a divisão-abrigo ([regra das duas paredes](#/s/casa/abrigo-explosoes)) ou a cave. Leva a mala de emergência se está à mão, senão não.
- Na rua: o edifício sólido mais próximo (cave, garagem subterrânea, metro, passagem subterrânea). Se não há nada em 1 minuto: deita-te numa vala, num buraco, atrás de um muro baixo, longe de carros e vidros.
- No carro: para (não debaixo de pontes nem junto a postos de combustível ou instalações militares), sai, afasta-te do carro e deita-te ou entra num edifício.
- No transporte público: os condutores param e os passageiros vão para o abrigo mais próximo.
- Não uses elevadores.
- Fica no abrigo até ao **sinal de fim de alerta** (sirene contínua longa, ou anúncio na rádio/app), e não saias só porque "já não se ouve nada".

## Tipos de sinal (variam por país; em Portugal não há sistema instituído, mas o padrão é semelhante em toda a Europa)

- **Alerta**: sirene ascendente e descendente (a "uivar"), 1 minuto ou mais. Ir para o abrigo.
- **Fim de alerta**: som contínuo, 1 minuto.
- Alertas por app (a Ucrânia usa "Air Alert"; muitos países têm apps e SMS de alerta), rádio, TV, altifalantes em veículos.

## Explosões sem sirene

1. **Deita-te** imediatamente, de barriga, cabeça longe de janelas, mãos na nuca, boca aberta.
2. Espera 30 a 60 segundos (ataques em série).
3. Move-te para o abrigo entre explosões, a correr agachado, por dentro de edifícios se possível.
4. Não te aproximes do local do impacto ("double tap": um segundo míssil ou drone atinge o mesmo sítio para apanhar socorristas).

## Drones

- Zumbido de motor de moto pequena, ou de "cortador de relva", à noite. Alguns são silenciosos.
- Não os filmes, não apontes luzes (marcas a tua posição). Entra num edifício, afasta-te de janelas.
- Drones pequenos (FPV) atacam pessoas e veículos: se estás ao ar livre e vês um a vir na tua direção, corre em ziguezague para cobertura sólida (árvores, edifícios). Não tentes abatê-lo.
- Nunca toques em drones caídos.

## Depois de um ataque

- Sai só depois do fim de alerta. Cobre nariz e boca (poeira, amianto).
- Feridos: [hemorragia grave](#/s/socorros/hemorragia) é a prioridade, torniquetes, depois via aérea e respiração.
- Cabos elétricos, fugas de gás, estruturas instáveis: afasta-te.
- Não toques em nada metálico ou estranho (submunições, engenhos por explodir). [Ver engenhos](#/s/guerra/engenhos).
- Informa o 112 do que viste (localização, feridos, tipo de dano). Não bloqueies as estradas.
` },

    { id: 'abrigo', icon: '🏚️', title: 'Abrigos: escolher e viver neles', desc: 'Abrigo público, cave, metro, o que levar, como passar dias.', md: `
## Classificação (do melhor para o pior)

1. **Abrigo construído** (bunker, abrigo antiaéreo com ventilação e portas blindadas). Raro em Portugal.
2. **Metro, túneis, parques subterrâneos de 2 ou mais pisos, caves de edifícios de betão** de vários andares. Muito bons contra explosões e estilhaços.
3. **Cave ou piso térreo interior** de edifício de betão ou pedra, sem janelas.
4. **Passagens subterrâneas, valas, trincheiras**: protegem de estilhaços, não de impacto direto.
5. Rés-do-chão de edifício de tijolo: fraco. Casas de madeira, pré-fabricados, últimos andares, tendas: nenhum.

Evita: perto de alvos militares, centrais elétricas, depósitos de combustível, pontes, estações de rádio/TV, quartéis, edifícios governamentais. Evita edifícios já danificados.

## O que ter no abrigo (ou levar)

- [ ] Água (3 L por pessoa por dia, para 3 dias) e comida que não precisa de fogo.
- [ ] Rádio a pilhas, lanternas, powerbank, pilhas.
- [ ] Documentos, dinheiro, telemóvel, carregador.
- [ ] Medicação, kit de primeiros socorros com torniquete.
- [ ] Roupa quente, cobertores, colchão ou esteira (o chão de betão é gelado).
- [ ] Balde com tampa, sacos, papel higiénico, toalhitas, gel, sacos para lixo.
- [ ] Máscaras de pó (FFP2), óculos, apito, luvas de trabalho.
- [ ] Ferramentas para sair (martelo, pé de cabra, serra), extintor.
- [ ] Jogos, livros, brinquedos, tampões de ouvidos, algo para as crianças.
- [ ] Um bilhete na porta de casa a dizer onde estás.

## Dentro do abrigo

- Longe da porta e das paredes exteriores; ao centro, encostado a pilares.
- Senta-te ou deita-te contra a parede; durante as explosões, deita-te, cabeça protegida, boca aberta.
- Poupa luz e bateria. Turnos de rádio.
- Regras de convivência: silêncio à noite, higiene, lixo, crianças com tarefas. Um responsável.
- Ventilação: um abrigo fechado com muita gente esgota o ar. Abre a porta entre alertas.
- Ajuda os outros: idosos, pessoas com deficiência, mães com bebés.

## Se ficares preso

Não grites; **bate com ritmo** em canos ou paredes (3 pancadas, pausa), usa o [apito](#/t/apito). Tapa a boca contra a poeira. Mexe-te o mínimo. Poupa bateria: só acendes o telemóvel para tentar ligar. Um SMS ao 112 ou a familiares com a tua localização exata é a melhor hipótese.

## Dias e semanas em abrigo

Rotina fixa (levantar, refeições, higiene, deitar), exercício leve, tarefas para todos, momentos de conversa, sem álcool. Os que aguentam melhor são os que cuidam de alguém. Ver [saúde mental](#/s/guerra/mental).
` },

    { id: 'engenhos', icon: '💣', title: 'Minas, engenhos por explodir', desc: 'Nunca tocar. Como reconhecer, marcar, sair de uma zona minada.', md: `
>x **Nunca toques, pontapeies, movas ou aproximes-te de qualquer objeto militar, estranho, metálico, ou "brinquedo" novo em zona de conflito.** Granadas, munições, submunições (bombas de fragmentação, pequenas, coloridas, com fitas), minas, drones caídos, restos de mísseis. Muitos são desenhados para explodir ao serem mexidos, dias ou anos depois.

## Se vires um objeto suspeito

1. **Para.** Não te aproximes para "ver melhor".
2. Afasta-te **pelo mesmo caminho por onde vieste** (pisa nas tuas pegadas).
3. Marca a zona (pano, ramos cruzados, pedras em linha, fita) a uma distância segura, para avisar os outros.
4. Avisa: 112, forças de segurança, vizinhos, escola.
5. Mantém crianças e animais afastados.

## Zonas de risco

- Onde houve combates, posições militares, veículos destruídos, crateras.
- Bermas de estradas e trilhos (é onde se plantam minas contra veículos e pessoas), pontes, portas de casas abandonadas, poços, pomares, cemitérios.
- Edifícios abandonados por forças militares (armadilhas em portas, gavetas, frigoríficos, brinquedos, cadáveres).
- Zonas com sinais: crânio e ossos, "MINES", "МІНИ", pedras pintadas de vermelho, ramos cruzados, fitas, latas em varas, pedaços de pano em arame.

## Se percebes que estás numa zona minada

1. **Não te mexas.** Não corras.
2. Olha para o chão à volta: fios, arame, objetos, terra remexida, vegetação diferente.
3. Se conseguires ver as tuas pegadas, **recua pisando exatamente nelas**, devagar.
4. Se não, fica quieto e chama por ajuda (grito, apito, telemóvel). Espera por quem saiba (militares, sapadores). Pode demorar horas: senta-te no mesmo sítio.
5. Se alguém pisou uma mina: **não corras para ele** (há mais). Fala com ele, diz-lhe para não se mexer, chama ajuda especializada. Só quem sabe desminar se aproxima, e só pelo caminho verificado.

## Regras para viver em zona de conflito

- Anda só por estradas e caminhos **muito usados**, no meio, pisando onde outros pisaram. Nada de atalhos, bermas, campos, casas abandonadas.
- Não apanhes lenha, fruta, sucata ou "recordações" em zonas de combate.
- Ensina as crianças: **não tocar, não mexer, marcar, avisar**. Os brinquedos-armadilha existem.
- Água: não bebas de poços em zona abandonada sem verificar.

## Munições não detonadas em casa ou no quintal

Sai de casa, fecha portas, afasta toda a gente 100 m (300 m se for grande), liga 112. Não fotografes de perto. Não tentes cobrir nem mover.
` },

    { id: 'checkpoints', icon: '🪖', title: 'Checkpoints e forças armadas', desc: 'Como passar por controlos militares e lidar com soldados de qualquer lado.', md: `
## Princípios

Quem está no checkpoint tem medo, está cansado e tem uma arma. O teu objetivo é ser **previsível, calmo e aborrecido**.

## Ao aproximar-te

- Abranda muito antes. Faróis ligados de dia; de noite, médios e luz interior acesa. Janelas abertas. Música desligada.
- Óculos de sol tirados, chapéu tirado. Mãos visíveis: no volante, ou levantadas e abertas a pé.
- Documentos preparados mas **não os tires do bolso de repente**: diz "vou tirar os documentos" e faz devagar.
- Sem telemóvel na mão. **Nunca filmes ou fotografes** um checkpoint ou soldados: é o motivo mais comum de detenção e agressão.
- Cumpre ordens de imediato. Sem discussão, sem ironia, sem "conheço os meus direitos".
- Responde só ao que perguntam, curto, com a verdade simples: quem és, de onde vens, para onde vais, porquê. Histórias consistentes entre todos os ocupantes.
- Sem contacto visual prolongado, sem gestos bruscos, sem sair do carro sem ordem.
- Se te mandam sair e revistar: obedece, mãos visíveis, diz o que tens ("tenho uma faca de cozinha na mochila, no bolso da frente").

## O que não levar ao passar controlos

- Armas, mesmo legais, munições, coisas que pareçam militares (roupa camuflada, binóculos, drones, rádios, mapas com marcas), uniformes, insígnias.
- Fotos ou vídeos de militares, equipamentos, danos, no telemóvel: **apaga antes** (e do lixo/nuvem também). Apps de mensagens com conversas comprometedoras.
- Grandes quantidades de dinheiro à vista (esconde repartido).
- Mais do que o necessário: cada coisa é uma pergunta.

## Se te detiverem

- Calma. Pede para avisar alguém (família, embaixada, Cruz Vermelha). Diz o teu nome e nacionalidade, e pouco mais.
- Não assines o que não percebes. Não confesses o que não fizeste.
- Memoriza: quem, onde, quando, insígnias, viaturas.
- O CICV (Comité Internacional da Cruz Vermelha) tem direito de visitar detidos em conflito armado.

## Soldados em tua casa

Não resistas fisicamente. Mostra que és civil (sem armas, família, crianças). Sê educado, não sirvas álcool. Se requisitarem coisas, deixa levar. Regista. Sai se for possível quando saírem.

## Menores, mulheres, grupos vulneráveis

Nunca viajar sozinhos em zona de conflito. Em grupo, com um adulto de confiança, de dia, por estradas principais. Em caso de abordagem sexual ou abusiva: exigir presença de outra pessoa, fazer barulho, não aceitar isolamento. Denunciar mais tarde a organizações internacionais (ACNUR, CICV, ONU).
` },

    { id: 'evacuar-conflito', icon: '🚙', title: 'Evacuar de zona de conflito', desc: 'Quando, como, por onde, com o quê. Corredores humanitários.', md: `
## Quando sair

- **Antes dos combates chegarem** à tua cidade, se possível: quando as estradas ainda estão abertas e há combustível. Depois, é uma questão de sorte.
- Quando as autoridades ordenam. Quando falta água, comida, medicação e não há reposição à vista. Quando as forças armadas ocupam a tua zona.
- Se não puderes sair (doença, idosos, sem meios), prepara-te para ficar semanas: [abrigo](#/s/guerra/abrigo), água, comida, contacto com vizinhos.

## Por onde

- Corredores humanitários anunciados oficialmente (rádio, Proteção Civil, Cruz Vermelha). Só nos horários e trajetos anunciados; sair do trajeto é perigoso.
- Fora deles: estradas principais de dia, com um bilhete visível "CIVIS" ou "CRIANÇAS" (em vários idiomas) no carro e panos brancos.
- Evita zonas de combate ativo, instalações militares, pontes estratégicas, colunas militares (são alvos). Se uma coluna militar passa, para e afasta-te.
- Confirma que a rota continua aberta: rádio, quem vem em sentido contrário, grupos de mensagens de confiança.

## Como

- Carro cheio de combustível, jerricã, água, comida, mantas, documentos, dinheiro, medicação. Não sobrecarregues (avarias).
- Em comboio de vários carros: 50 a 100 m entre carros, o mais lento à frente, combinado onde parar se se separarem.
- A pé ou de bicicleta: por estradas principais, em grupo, de dia. Ver [deslocação a pé](#/s/navegar/caminhar).
- Sem meios: comboios, autocarros de evacuação (regista-te junto da junta/câmara/Cruz Vermelha), boleias organizadas.
- Deixa um bilhete em casa e avisa o contacto fora da zona: quem, quando, para onde, por onde.

## O que levar (ordem de prioridade)

1. Pessoas e animais.
2. Documentos (originais e cópias), dinheiro, telemóveis, carregadores.
3. Medicação, óculos, kit de primeiros socorros.
4. Água e comida para 3 dias.
5. Roupa quente e impermeável, sapatos fechados, cobertores.
6. Bebé e animais: leite, fraldas, ração, transportadora.
7. Rádio, lanterna, powerbank, ferramentas básicas.
8. Objetos de valor pequenos, fotos, disco com dados.

Deixa o resto. Vidas primeiro.

## Ao chegar

- Regista-te (Cruz Vermelha, autoridades locais, ACNUR se atravessaste fronteira): é assim que a família te encontra e tens acesso a ajuda.
- Portugueses no estrangeiro: consulado e Gabinete de Emergência Consular (+351 217 929 714 ou 961 706 472, 24 horas).
- Estrangeiros em Portugal: AIMA e a embaixada do teu país.
- Documentos e dinheiro sempre contigo, mesmo a dormir.
` },

    { id: 'direito', icon: '⚖️', title: 'Direito humanitário: o que protege civis', desc: 'As regras da guerra que existem para ti, e como não perder a proteção.', md: `
## O essencial (Convenções de Genebra, 1949, e Protocolos)

- **Civis não podem ser atacados.** Ataques só a combatentes e objetivos militares. Ataques indiscriminados e "castigos coletivos" são crimes de guerra.
- Hospitais, pessoal médico, ambulâncias, escolas, locais de culto, património, instalações com forças perigosas (barragens, centrais nucleares) têm proteção especial.
- Feridos, doentes e prisioneiros devem ser tratados com humanidade, seja qual for o lado.
- Fome, sede e cortes de água como arma contra civis são proibidos; a ajuda humanitária deve poder passar.
- Tortura, violência sexual, execuções sem julgamento, deslocamento forçado sem necessidade militar imperiosa: proibidos sempre.
- Uma potência ocupante não pode obrigar civis a servir nas forças armadas dela, nem obrigar prisioneiros de guerra a combater contra o próprio país.

## Emblemas protegidos

**Cruz Vermelha, Crescente Vermelho, Cristal Vermelho** (em fundo branco): não podem ser atacados e não podem ser usados por quem não tem direito. Bandeira branca: pedido de trégua ou rendição, deve ser respeitada. Capacete azul: forças da ONU. "UN" ou "OSCE" em veículos brancos: observadores.

## Como manter a proteção de civil

- **Não pegues em armas** nem participes diretamente nas hostilidades. Um civil armado pode ser tratado como combatente.
- Não uses roupa camuflada ou de aspeto militar. Não transportes material militar.
- Não te aproximes de posições, colunas ou instalações militares; não te abrigues junto delas.
- Não espies nem transmitas posições militares (é participação direta e é muito perigoso).
- Se és pessoal de saúde ou humanitário, usa os emblemas apropriados e só eles.

## O que fazer se fores vítima ou testemunha de crimes

- Primeiro a segurança: afasta-te, não confrontes.
- Regista, se for seguro: data, hora, local, o que aconteceu, quem (unidades, uniformes, insígnias, viaturas, matrículas), testemunhas, feridos. Fotos só se não te puserem em risco.
- Guarda provas médicas (relatórios, fotos de lesões com data).
- Reporta ao CICV, ao ACNUR, a ONG de direitos humanos, ao teu consulado, a jornalistas de confiança, ou mais tarde a tribunais nacionais ou ao Tribunal Penal Internacional.

## Prisioneiros e desaparecidos

O **Comité Internacional da Cruz Vermelha** (CICV) tem mandato para visitar prisioneiros, transmitir mensagens familiares e procurar desaparecidos, de qualquer lado. Contacta a Cruz Vermelha Portuguesa ou a delegação do CICV no país.

## Refugiados e deslocados

Quem atravessa uma fronteira a fugir de conflito tem direito a pedir proteção (asilo ou proteção temporária) e não pode ser devolvido para o perigo. Na UE, a diretiva de proteção temporária dá residência, trabalho e saúde de forma rápida em situações de afluxo em massa.
` },

    { id: 'nuclear', icon: '☢️', title: 'Nuclear e radiação', desc: 'Explosão nuclear, acidente em central, "bomba suja": abrigo, tempo, distância, iodo.', md: `
## Os três princípios

**Tempo, distância, blindagem.** Quanto menos tempo exposto, mais longe da fonte e mais material (betão, terra, tijolo, água) entre ti e a radiação, menor a dose.

![Quanto tempo abrigar e onde é mais seguro](fig:fallout)

## Explosão nuclear (a mais grave)

Um clarão de luz muito intenso, mesmo a dezenas de km.

1. **Não olhes** para o clarão (cegueira temporária ou permanente). Vira as costas.
2. **Deita-te no chão** de barriga, atrás de qualquer cobertura, cara para baixo, mãos sob o corpo, olhos fechados, boca aberta. A onda de choque chega segundos a minutos depois (a 10 km, cerca de 30 segundos) e parte vidros e derruba paredes. Espera **2 minutos** deitado.
3. **Entra no edifício mais sólido próximo** (betão, tijolo, cave, centro de edifício grande) nos **10 a 15 minutos** seguintes, antes de a poeira radioativa (fallout) começar a cair. A poeira é o que mata a maioria das pessoas fora da zona de explosão. Se a explosão foi longe e não vês nuvem em tua direção, tens mais tempo, mas entra na mesma.
4. **Fica dentro pelo menos 24 h, idealmente 48 a 72 h.** A radioatividade do fallout cai muito depressa: **7 horas depois, 10% do inicial; 2 dias depois, 1%; 2 semanas, 0,1%** (regra do 7-10). Sai só quando a rádio disser ou se o edifício for perigoso.
5. **Descontamina**: se estavas fora, tira a roupa exterior (remove até 90% da contaminação), saco fechado, longe das pessoas. Duche com água morna e sabão (sem esfregar com força), ou pano húmido em toda a pele exposta. Cabelo lavado, sem amaciador (fixa partículas). Assoa o nariz, limpa ouvidos e pálpebras. Roupa limpa.
6. Não uses o carro para fugir nas primeiras 24 h (o carro não protege; as estradas param; os carros ficam contaminados).
7. Come e bebe só o que estava dentro de casa ou embalado. Água da torneira em depósitos fechados e canos é segura; poços abertos e água de chuva, não.
8. Animais: mantém-nos dentro, limpa-lhes as patas e o pelo com pano húmido.

## Acidente em central nuclear (Almaraz, Espanha, a 100 km da fronteira; outras em Espanha e França)

- A libertação é mais lenta e prolongada; as autoridades avisam. **Entra, fecha tudo, desliga ventilações, ouve o rádio.**
- **Iodeto de potássio (KI)**: satura a tiroide com iodo normal para não absorver o iodo radioativo (que causa cancro da tiroide, sobretudo em crianças). **Só tomar quando as autoridades disserem** (tomado cedo ou tarde demais não serve, e tem riscos), de preferência 1 a 2 h antes da nuvem passar, e uma vez só (raramente duas). Doses:

| Idade | Dose de KI |
|---|---|
| Adultos até 40 anos, grávidas, a amamentar | 130 mg (2 comprimidos de 65 mg) |
| 3 a 12 anos | 65 mg (1 comprimido) |
| 1 mês a 3 anos | 32 mg (meio) |
| Recém-nascido até 1 mês | 16 mg (um quarto) |
| Mais de 40 anos | Normalmente não indicado (risco baixo) |

  Não substitui o abrigo. Não protege de outros isótopos (césio, estrôncio) nem de radiação externa. Não tomes tintura de iodo, Betadine ou algas: são tóxicos em dose alta e não servem.

- Zonas de evacuação em acidentes de central: normalmente 10 a 30 km. A mais de 100 km o risco é sobretudo alimentar (leite, vegetais de folha, cogumelos, caça): segue as restrições oficiais.

## "Bomba suja" (explosivo com material radioativo)

Mais pânico do que radiação. Afasta-te da explosão como de outra qualquer, contra o vento, entra, descontamina como acima, ouve as autoridades.

## Sintomas de exposição elevada

Náuseas e vómitos nas primeiras horas (quanto mais cedo, maior a dose), depois pele vermelha, queda de cabelo, hemorragias, infeções (dias a semanas). Sem tratamento hospitalar não há muito a fazer além de higiene, hidratação e evitar feridas. A maior parte das pessoas abrigadas não recebe dose que cause isto.

## Abrigo: o que conta

Estar **no centro** de um edifício grande, ou numa cave, com o máximo de paredes e chão entre ti e o exterior e o telhado (onde a poeira pousa). Uma cave de betão reduz a dose 10 a 50 vezes; o centro de um prédio de 5 andares, 10 vezes; uma casa de madeira, 2 vezes. Fecha janelas, portas, chaminés, ventilações; desliga ar condicionado. Sela com fita e toalhas molhadas. Ventila brevemente só depois de 24 h ou se o ar ficar irrespirável.
` },

    { id: 'quimico-bio', icon: '🧪', title: 'Ataque químico ou biológico', desc: 'Reconhecer, proteger-se, descontaminar. Máscaras, selagem, sintomas.', md: `
## Sinais de ataque químico

Muitas pessoas com os mesmos sintomas ao mesmo tempo (tosse, olhos a arder, dificuldade em respirar, convulsões, saliva e vómitos), animais e pássaros mortos, cheiro estranho (alho, feno cortado, amêndoa, fruta, lixívia), nuvem ou névoa baixa, gotas oleosas em superfícies, explosão pequena sem grandes danos.

## O que fazer (primeiros minutos)

1. **Sai da nuvem**: contra o vento (o vento na cara) e para **cima** (a maioria dos gases é mais pesada do que o ar e acumula-se em caves, valas, pisos baixos). Não uses caves como abrigo de químicos.
2. **Tapa nariz e boca** com pano húmido (água, ou até urina em último recurso; carvão ativado ou bicarbonato molhado no pano ajudam contra alguns gases). Máscara FFP2/FFP3 protege de partículas e aerossóis, pouco de gases. Uma máscara de gás com filtro é a única proteção real: filtro ABEK-P3 contra gases industriais, filtro certificado CBRN (NBQ) contra agentes de guerra. Se vives em zona de risco, considera uma por pessoa.
3. **Entra num edifício**, sobe, fecha janelas e portas, desliga ventilações e ar condicionado, **sela** uma divisão alta com fita adesiva e toalhas molhadas nas frestas. Fica lá até o rádio dizer que passou (normalmente horas).
4. **Descontamina**: tira a roupa (corta-a; não a puxes pela cabeça), saco fechado fora da divisão. Lava tudo com **muita água e sabão** durante 15 minutos, olhos com água 15 minutos. Não esfregues com força (abre a pele). Roupa limpa. Se não há água: pó absorvente (farinha, talco, terra seca) sobre a pele e remover com pano; depois água quando houver.
5. Não comas nem bebas nada exposto. Não fumes.
6. Sintomas: ar fresco, repouso, 112. Contra agentes nervosos existem antídotos (atropina) só em serviços de emergência: diz o que suspeitas.

## Agentes mais comuns

- **Cloro** (industrial, fácil): cheiro a lixívia, nuvem amarelo-esverdeada, tosse, olhos e garganta a arder. Sobe, ar fresco, lava.
- **Agentes nervosos** (sarin, novichok): sem cheiro ou cheiro a fruta; pupilas muito pequenas, saliva, lágrimas, urinar, convulsões. Descontaminar já; 112.
- **Mostarda**: cheiro a alho ou mostarda; bolhas na pele e olhos horas depois. Lavar muito, cobrir as bolhas.
- **Amoníaco, ácido**: cheiro forte, queimaduras. Ar, água.
- **Fumo de incêndio industrial**: cianeto e outros; afasta-te contra o vento.

## Biológico (agentes infecciosos)

Não se vê no momento; os sintomas aparecem dias depois em muita gente. Faz o mesmo que para uma [pandemia](#/s/agora/pandemia): distância, máscaras, mãos, água tratada, comida cozinhada, isolar doentes, seguir as autoridades de saúde (vacinas ou antibióticos em massa se for o caso). Não entres em pânico com boatos: a maioria das "armas biológicas" é muito menos eficaz do que parece.

## Preparação

- [ ] Fita adesiva larga e plástico para selar uma divisão.
- [ ] Máscaras FFP2/FFP3, óculos de proteção, luvas.
- [ ] Máscara de gás (opcional) se a zona tiver indústria química (filtro ABEK-P3, 50 a 150 € por pessoa) ou risco militar (filtro certificado CBRN, mais caro).
- [ ] Água engarrafada e comida embalada na divisão-abrigo.
- [ ] Rádio, lanterna, powerbank.
- [ ] Sabão, toalhas, roupa de reserva em saco fechado.
` },

    { id: 'criancas', icon: '🧒', title: 'Crianças em conflito', desc: 'Como falar, o que treinar, como as proteger e as manter estáveis.', md: `
>+ Guias para as nossas crianças: [{{c1_titulo}}](#/s/familia/crianca-pequena), [{{c2_titulo}}](#/s/familia/crianca-escolar), [calmas e ocupadas](#/s/familia/ocupar-e-acalmar) e [proteger as crianças](#/s/protecao/criancas).

## Falar com elas

- Verdade adequada à idade, sem detalhes assustadores, sem mentir ("não vai acontecer nada" quebra a confiança quando acontece).
- Pequenos: "há pessoas a lutar longe daqui; nós temos um sítio seguro e sabemos o que fazer". Mais velhos: mais contexto, respostas honestas, e o que podem fazer para ajudar.
- Repete que **não é culpa deles**, que os adultos tratam do resto, e que estão a ser cuidados.
- Limita notícias e vídeos. As crianças absorvem o pânico dos ecrãs e dos adultos.
- Deixa-as fazer perguntas, repetidamente. Desenhar e brincar "ao abrigo" é como processam.

## Treinar

- "Quando ouvirmos a sirene, vamos para o [abrigo] e levamos a mochila." Como um jogo, com tempo cronometrado e elogios.
- Cada criança tem uma **mochila pequena** com água, lanche, lanterna, brinquedo pequeno, cartão com nome, morada, telefones dos pais e tipo sanguíneo.
- Nome e telefone dos pais escritos no braço com caneta permanente em deslocações e evacuações. Pulseira de identificação.
- Regra: "se te perderes, ficas onde estás e pedes ajuda a uma mãe com filhos ou a um polícia".
- "Não tocamos em nada que encontramos no chão", com exemplos (brinquedos, telemóveis, latas). [Engenhos](#/s/guerra/engenhos).
- A palavra-código da família: só vão com quem a souber.

## Estabilidade

- **Rotinas** mesmo no abrigo: horas de comer, de dormir, de brincar, de "escola" (15 minutos de contas ou leitura).
- Tarefas com responsabilidade: contar as garrafas de água, tomar conta do irmão, ser o "chefe da lanterna".
- Contacto físico, colo, calma na voz. Se os adultos estão calmos, as crianças estão calmas (mesmo que os adultos finjam).
- Sono: sacos-cama, boneco de sempre, história. Tampões ou música baixa contra explosões.
- Regressões (chichi na cama, chuchar no dedo, medo do escuro) são normais e passam. Sem castigos.

## Sinais de que precisam de ajuda especializada

Pesadelos constantes, não falar, agressividade nova, brincadeiras repetitivas só sobre guerra, não comer, queixas físicas constantes sem causa, durante mais de algumas semanas. Procura psicólogo (Cruz Vermelha, UNICEF, SNS 24 têm apoio) quando for possível.

## Adolescentes

Envolve-os no plano com responsabilidades reais (rádio, primeiros socorros, cuidar dos mais novos). Deixa-os falar com amigos. Cuidado com o recrutamento por grupos armados ou com "ir ver" os combates: é a fase de maior risco.

## Separação

Se tiveres de separar-te dos filhos (evacuação de crianças, hospital), foto recente juntos, documentos e contactos com a criança, registo na Cruz Vermelha. Nunca os entregues a desconhecidos sem verificação, por muito oficial que pareça.
` },

    { id: 'mental', icon: '🧠', title: 'Saúde mental em conflito', desc: 'Medo, stress, choque, luto: o que é normal, o que ajuda, quando pedir ajuda.', md: `
## O que é normal

Nos dias e semanas de perigo: medo constante, sobressalto com qualquer ruído, insónia, pesadelos, irritabilidade, choro, dificuldade em concentrar, sensação de irrealidade, culpa por ter sobrevivido ou por não ter feito mais. **Isto é uma reação normal a uma situação anormal**, não fraqueza nem doença. A maioria das pessoas recupera quando a segurança volta.

## O que ajuda (para ti e para os outros)

- **Respirar**: 4 segundos a inspirar pelo nariz, 4 a segurar, 6 a expirar pela boca. 10 vezes. Baixa o pânico em 2 minutos. Ensina às crianças.
- **Corpo**: comer, beber, dormir sempre que possível, mover-se. O stress vive no corpo.
- **Rotina e tarefas**: fazer algo concreto (organizar a água, ajudar um vizinho, cozinhar) tira o cérebro do medo.
- **Ligação**: falar com pessoas, tocar, estar junto. Isolamento piora tudo.
- **Informação com limites**: notícias 2 vezes por dia, por rádio ou fonte fiável; sem "scroll" infinito de vídeos.
- **Ajudar alguém**: quem cuida aguenta mais.
- **Sem álcool e drogas** para "aguentar": pioram o sono, o julgamento e a violência doméstica.
- **Pequenos prazeres**: café, música, um jogo, uma anedota. Não é frivolidade; é sobrevivência.

## Primeiros socorros psicológicos (ajudar alguém em choque)

1. **Olhar**: segurança, necessidades básicas, quem está pior.
2. **Ouvir**: aproxima-te com calma, apresenta-te, pergunta o que precisa, ouve sem forçar a falar, sem julgar, sem "eu sei como te sentes".
3. **Ligar**: ajuda com necessidades básicas (água, manta, informação, contactar família), dá informação concreta e verdadeira, liga a outras pessoas e serviços.
- Não digas "acalma-te", "podia ter sido pior", "tens de ser forte". Diz "estou aqui", "estás em segurança agora", "vamos tratar disto passo a passo".
- Pessoa a hiperventilar ou em pânico: senta-a, fala devagar, respira com ela, dá-lhe uma tarefa simples ("segura isto").
- Pessoa "congelada" (não reage): fala calmamente, toca no ombro, dá instruções simples e concretas, uma de cada vez.

## Luto

Em conflito, a morte é muitas vezes súbita, violenta, sem corpo ou sem funeral. Ritual improvisado (uma vela, uma oração, dizer o nome, escrever) ajuda. Chorar ajuda. Falar do morto ajuda. Não há prazo. Ver [lidar com mortos](#/s/saude/dificeis).

## Quando pedir ajuda

- Pensamentos de morte ou de fazer mal a si próprio ou a outros. **Fala com alguém já** (SNS 24: 808 24 24 24; SOS Voz Amiga; Cruz Vermelha).
- Semanas depois de a segurança voltar, continua: não dormir, reviver constante, evitar tudo, entorpecimento, álcool. Pode ser stress pós-traumático, que tem tratamento eficaz.
- Crianças: ver [crianças](#/s/guerra/criancas).

## Para quem cuida dos outros (socorristas, voluntários, pais)

Turnos, pausas, comer, dormir. Falar do que viste com alguém. Aceitar que não se salva toda a gente. O cansaço extremo e a irritabilidade são sinais de que precisas de parar 24 h.
` },

    { id: 'dinheiro', icon: '💶', title: 'Dinheiro e documentos em crise', desc: 'Bancos fechados, cartões sem funcionar, troca, inflação, provas de identidade.', md: `
## Dinheiro

- **Dinheiro vivo**: em apagões, ciberataques e conflito, os cartões e multibancos param. Tem **1 a 2 meses de despesas** em notas pequenas (5, 10, 20 €), repartidas por vários sítios (casa, carro, mala de evacuação, contigo). Notas grandes não se trocam quando ninguém tem troco.
- **Moeda estrangeira**: dólares ou francos suíços em notas de 20 e 50 são aceites em quase todo o lado numa crise regional. Se vives perto de Espanha, euros chegam.
- **Ouro e prata** (moedas pequenas, 1/10 de onça): só se tens capacidade; difícil de trocar em pequenas quantidades e atrai atenção.
- **Bens de troca**: pilhas, isqueiros, tabaco, café, álcool, medicamentos comuns, higiene feminina, fraldas, sementes, ferramentas. Valem mais do que dinheiro quando o dinheiro deixa de comprar.
- **Competências**: primeiros socorros, reparações, cozinhar, cuidar de crianças: sempre trocáveis.

## Bancos e contas

- Conta em mais do que um banco; alguma poupança fora do país se tens risco elevado (conta na UE noutro estado, ou corretora internacional).
- Cópias dos extratos e números de conta, apólices, dívidas, no [cofre](#/t/cofre).
- Sabe o IBAN de cor ou impresso. Códigos de acesso e telefone da linha de apoio.
- Em fuga, os bancos podem bloquear cartões por "atividade suspeita": avisa-os antes de viajar.

## Inflação e escassez

- Compra reservas cedo (o preço sobe depois). Bens essenciais são a melhor "poupança" a curto prazo.
- Evita dívidas em moeda que não controlas.
- Não vendas bens ou casas em pânico: os preços de pânico são péssimos; a maior parte das crises acaba.

## Documentos: o que provar quem és

- Originais de identificação sempre contigo, num saco estanque, no corpo (bolsa interior).
- Cópias autenticadas (notário ou junta) de CC, certidão de nascimento, casamento, títulos de propriedade, diplomas: podem substituir originais perdidos.
- Fotos e PDF no cofre encriptado, numa pen escondida, e no e-mail (para aceder de qualquer lado com internet).
- Registo criminal limpo, cartão de vacinas, boletim dos animais: pedidos em fronteiras.
- Se perdes tudo: consulado (nacionais), junta de freguesia e conservatória (Portugal), Cruz Vermelha para restabelecer contactos. Testemunhas que confirmem quem és.

## Trabalho e rendimento

Diversifica: nada de depender de um só cliente ou empregador. Competências que se levam para qualquer lado. Uma pequena atividade que funcione sem internet.
` }
  ]
});
