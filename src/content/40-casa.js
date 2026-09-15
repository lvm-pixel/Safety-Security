CONTENT.sections.push({
  id: 'casa', icon: '🏠', title: 'Abrigo, energia e casa',
  desc: 'Manter a casa segura e habitável sem luz, sem água, com frio ou calor, e proteger-se de explosões.',
  pages: [
    { id: 'apagao-casa', icon: '🔌', title: 'Casa sem eletricidade', desc: 'Luz, energia, o que desligar, geradores, baterias e velas.', tools: ['bateria'], md: `
## Iluminação (por ordem de segurança e eficiência)

1. **Lanternas LED frontais**: mãos livres, 20 a 100 horas com um par de pilhas. Uma por pessoa.
2. **Candeeiros LED de campismo** a pilhas ou recarregáveis: iluminam uma divisão dias inteiros.
3. **Luzes solares de jardim**: carregam de dia na janela, iluminam de noite. Baratas e esquecidas.
4. **Velas**: última opção. Só sob vigilância, em prato ou frasco de vidro, longe de cortinas e crianças, nunca a dormir. Uma vela numa lata com a parte de cima cortada faz um candeeiro com refletor.
5. Garrafão de água com uma lanterna frontal virada para dentro faz um candeeiro difuso.

## Pilhas

Padroniza: **AA e AAA** para tudo. Pilhas alcalinas duram 5 a 10 anos guardadas; recarregáveis (NiMH de baixa autodescarga, tipo Eneloop) 70% após um ano. 20 AA e 20 AAA por casa. Não guardes pilhas dentro dos aparelhos durante meses (vertem).

## Energia

- **Powerbanks**: 10 000 a 20 000 mAh, carregadas mensalmente. Com saída USB-C PD carregam portáteis pequenos.
- **Estação de energia portátil** (300 a 1000 Wh): telemóveis durante semanas, rádio, luzes, CPAP, router, um frigorífico pequeno por algumas horas. Carrega por painel solar de 100 W em 5 a 10 h de sol.
- **Painel solar dobrável** (20 a 100 W): telemóveis e powerbanks. Verifica que funciona **antes** de precisares.
- **Carro**: carrega telemóveis (10 min de motor por hora). Inversor 12 V (150 a 300 W) para portátil e luzes. Nunca em garagem fechada.
- **Gerador a gasolina/gasóleo**: 2 kW alimentam frigorífico, luzes, router, telemóveis. **Sempre no exterior**, a 6 m de janelas, tubo de escape virado para longe. Nunca o ligues ao quadro da casa sem interruptor de transferência (eletrocutas quem repara a rede). Combustível: 5 a 10 L por dia; guarda com estabilizador, roda de 6 em 6 meses. Faz um teste mensal de 15 min.

## O que fazer no quadro

- Desliga ou tira da tomada equipamentos eletrónicos (TV, computadores, micro-ondas com painel): quando a energia volta, há picos.
- Deixa o frigorífico ligado (não gasta enquanto não há luz e não te esqueces dele).
- Se houver cheia: **desliga o geral antes** de a água chegar.
- Fichas múltiplas com proteção de sobretensão são baratas e evitam perder aparelhos.

## Comunicações e informação

Rádio a pilhas ou dínamo (AM/FM) é o único meio garantido. Ver [rádio](#/s/comunicar/radio).

## Manter o moral

Rotinas (refeições, horas de dormir), jogos de cartas e de tabuleiro, livros, dar tarefas às crianças. O escuro e o tédio pesam mais do que se pensa.
` },

    { id: 'frio-casa', icon: '🧣', title: 'Casa sem aquecimento', desc: 'Manter calor num apartamento ou casa fria durante dias.', md: `
## Escolhe uma divisão

- Pequena, interior ou virada a sul, com poucas janelas, no piso mais baixo que não seja cave húmida. Um quarto pequeno para toda a família é ideal.
- Fecha as portas das outras divisões. Tapa frestas das portas com toalhas.
- Janelas: cortinas fechadas de noite, abertas de dia se houver sol direto. Plástico de bolhas, cartão ou mantas nas janelas isolam muito. Persianas fechadas.
- Tenda montada dentro do quarto, ou "cabana" de cobertores sobre a cama: o ar pequeno aquece com o corpo. Crianças adoram, e funciona.

## Aquece o corpo, não a casa

- **Camadas**: interior (lã ou sintético, não algodão), camisola, casaco. Gorro (mesmo a dormir), meias de lã, cachecol. Tirar camadas antes de suar.
- Dormir juntos, sacos-cama, cobertores por baixo e por cima (o chão rouba mais calor do que o ar).
- Sacos de água quente ou garrafas com água quente enroladas em toalha, nos pés e na barriga. Aquecem uma cama toda a noite. Pedras aquecidas junto ao fogo, embrulhadas.
- Comer e beber quente com regularidade: sopa, chá com açúcar. Calorias = calor. Sem álcool.
- Mexer-se: exercícios de 5 min por hora.
- Manta térmica (folha prateada) por cima dos cobertores reflete o calor. Barulhenta mas eficaz.

## Fontes de calor seguras

- Lareira ou salamandra a lenha com chaminé: ótimas. Lenha seca (menos fumo, mais calor). Nunca fechar totalmente a entrada de ar.
- Aquecedor a gás de botija (catalítico ou infravermelhos) ou a petróleo: **só com ventilação** (janela entreaberta) e **nunca a dormir**. Detetor de CO ao lado. Ver [monóxido](#/s/casa/co).
- Velas grandes (não aquecem, mas sob um vaso de barro invertido criam um ponto de calor radiante local; cuidado, incêndios).
- Cozinhar aquece a cozinha: junta a família aí.

## Nunca

- Braseiras a carvão, grelhadores, fogareiros, geradores **dentro de casa**. Matam todos os invernos em Portugal.
- Aquecedores a gás em quartos onde se dorme.
- Forno a gás aberto como aquecimento.

## Canos e casa

- Torneira a pingar em noites de gelo. Se congelar: desliga a torneira geral, aquece o cano devagar (secador, panos quentes), nunca com chama.
- Sabe onde é a [torneira geral](#/s/casa/cortar): um cano rebentado inunda a casa em minutos.

## Sinais de hipotermia

Tremores, mãos desajeitadas, confusão, sonolência. Idosos e bebés não tremem tanto. Ver [hipotermia](#/s/socorros/hipotermia).
` },

    { id: 'calor-casa', icon: '🌞', title: 'Casa em onda de calor sem energia', desc: 'Manter a casa fresca sem ar condicionado nem ventoinha.', md: `
## De dia

- **Persianas e cortinas fechadas** nas janelas ao sol (leste de manhã, sul e oeste à tarde). Papel de alumínio ou cartão do lado de fora do vidro, se possível.
- Janelas **fechadas** enquanto o ar de fora estiver mais quente do que o de dentro (normalmente das 10 h às 20 h).
- Fica no piso mais baixo, nas divisões viradas a norte, ou na cave.
- Não uses fogão, forno ou luzes que aqueçam.
- Lençóis húmidos pendurados nas janelas com corrente de ar: arrefecem por evaporação (funciona melhor com ar seco).

## De noite

- Abre tudo assim que a temperatura de fora baixa (depois das 21 ou 22 h e até às 8 h). Cria corrente de ar entre lados opostos da casa.
- Dorme no piso mais baixo, no chão (mais fresco), ou na varanda ou terraço se for seguro.
- Lençol de algodão húmido por cima do corpo.

## O corpo

- Água **antes** da sede, com um pouco de sal na comida. 2 a 3 L por dia. Evita álcool e bebidas muito açucaradas.
- Molha pulsos, nuca, pescoço, pés em água fresca. Duche ou pano húmido várias vezes ao dia.
- Roupa larga, clara, de algodão ou linho. Descalço se possível.
- Esforço físico só de manhã cedo.
- Vigia bebés, idosos, doentes crónicos, grávidas: são os que morrem em ondas de calor, muitas vezes sozinhos em casa. Telefona ou visita duas vezes por dia.
- Sinais de alarme: confusão, pele muito quente, deixa de suar, desmaio: [golpe de calor](#/s/socorros/calor-corpo), 112.

## Comida

Refeições leves e frias: saladas, fruta, conservas, pão. O frigorífico sem luz aguenta 4 h: come primeiro o que estraga. Ver [frigorífico](#/s/comida/frigorifico).
` },

    { id: 'co', icon: '☠️', title: 'Monóxido de carbono', desc: 'O gás que mata famílias inteiras a dormir. Como o evitar.', md: `
## O que é

Gás **sem cor, sem cheiro, sem sabor**, produzido por qualquer coisa que arde com pouco oxigénio: lareiras, braseiras, esquentadores a gás, aquecedores a gás ou petróleo, geradores, motores, grelhadores a carvão, fogareiros de campismo, velas em grande número. Substitui o oxigénio no sangue. Em concentrações altas mata em minutos; em baixas, adormece e mata durante a noite.

## Sinais

Dor de cabeça, tonturas, náuseas, cansaço, confusão, sonolência, dor no peito. **Várias pessoas (e animais) na mesma casa com os mesmos sintomas ao mesmo tempo.** Melhoram ao sair de casa. Parece gripe mas sem febre.

## O que fazer

1. **Sai já para o ar livre**, com toda a gente e os animais. Abre portas e janelas se for rápido.
2. **112.** Mesmo quem parece bem: a intoxicação continua horas depois e pode causar lesões cerebrais.
3. Não voltes a entrar até os bombeiros medirem ou o aparelho estar desligado e a casa arejada.
4. Se alguém estiver inconsciente: tira-o para o ar (só se conseguires sem te expor muito), [PLS](#/s/socorros/abordagem) ou [RCP](#/s/socorros/rcp).

## Prevenção

- **Detetor de CO** com alarme (15 a 30 €) junto aos quartos e perto de aparelhos de combustão. Pilha anual. É o item de segurança mais barato e mais ignorado do kit.
- Geradores, grelhadores, braseiras, fogareiros a carvão ou lenha: **sempre no exterior**, longe de janelas e portas.
- Esquentadores a gás: com ventilação (grelha na janela ou porta), revisão anual, chama azul (amarela é sinal de má combustão).
- Aquecedores a gás e petróleo: nunca em quartos fechados nem a dormir; janela entreaberta.
- Motor do carro: nunca ligado em garagem, mesmo com a porta aberta. Neve a tapar o escape num carro parado.
- Lareiras: chaminé limpa, entrada de ar aberta, brasas não abafadas.
- Velas: mais de 5 ou 6 num quarto fechado durante horas produzem CO e consomem oxigénio.
` },

    { id: 'cortar', icon: '🔧', title: 'Cortar água, gás e luz', desc: 'Onde estão as válvulas e quando as fechar. Regista no plano familiar.', md: `
>+ Vai agora ver onde ficam e escreve no [plano familiar](#/t/plano). Mostra a toda a família. Em emergência, no escuro, não vais ter tempo de procurar.

## Gás

![Válvula do gás: aberta e fechada](fig:valvula)

- **Botija:** válvula em cima da botija; roda no sentido dos ponteiros do relógio até fechar. Ou fecha o redutor. Botija vazia ou fechada: guardar de pé, no exterior ou local ventilado, longe de calor.
- **Gás canalizado:** válvula geral junto ao contador (normalmente no exterior ou na entrada do prédio) e válvula na cozinha. Alavanca **perpendicular** ao tubo = fechada.
- **Quando fechar:** cheiro a gás, sismo, incêndio, cheia, evacuação, fuga suspeita. Se cheirar a gás: **sem chamas, sem interruptores, sem telemóvel dentro de casa**; abre janelas, fecha a válvula, sai, liga do exterior ao 112 e ao fornecedor.
- Depois de fechado o gás canalizado, só um técnico o deve reabrir (verifica fugas e purga o ar). Não tentes tu.

## Eletricidade

- **Quadro elétrico** (normalmente à entrada da casa): o disjuntor geral (o maior, ou o diferencial) desliga tudo. Os pequenos desligam circuitos.
- **Quando desligar:** cheia (antes de a água chegar às tomadas), incêndio elétrico, fugas de água sobre instalações, evacuação longa, trabalhos.
- Nunca toques em nada elétrico com mãos ou pés molhados ou em água. Cabos caídos na rua: afasta-te 10 m e avisa.
- Depois de cheia, a instalação deve ser verificada por um eletricista antes de ligar.

## Água

- **Torneira geral da casa**: junto ao contador (na entrada, na cozinha, na casa de banho, ou na caixa do contador na rua ou no patamar). Roda no sentido dos ponteiros para fechar. Verifica hoje se roda (muitas ficam presas com os anos; uma gota de óleo resolve).
- **Torneiras de corte** por baixo de lavatórios, sanitas, máquinas.
- **Quando fechar:** cano rebentado, fuga, gelo, evacuação longa, aviso de contaminação da rede (para não entrar água contaminada no esquentador e nos depósitos).
- Se a rede parar, fecha a torneira geral para reter a água limpa que está nos canos e no termoacumulador. Ver [água escondida](#/s/agua/fontes-casa).

## Ferramentas úteis à mão

Chave inglesa ou de válvulas para a torneira de rua, lanterna no quadro elétrico, fita isoladora, fita de vedação, braçadeiras, uma bacia.
` },

    { id: 'saneamento', icon: '🚽', title: 'Sanita sem água e lixo', desc: 'Como evitar doenças quando não há água nem recolha de lixo.', md: `
## Sanita sem água na rede

- Se o esgoto funciona (normalmente sim): **descarrega deitando um balde de água** (5 a 8 L) de uma vez na sanita (água de chuva, piscina, rio, mar, banheira). Não uses água potável.
- Regra "se é amarelo, fica; se é castanho, vai": descarrega só sólidos.
- Se o esgoto **não funciona** (cheia, sismo, corte) ou a água é muito escassa: **não uses a sanita** (entope e transborda). Fecha a tampa e usa a "sanita de balde".

## Sanita de balde (2 baldes)

![Sanita de dois baldes](fig:balde)

- Balde 1 para urina (despeja longe de casa e de fontes de água, ou dilui e rega; a urina é quase estéril).
- Balde 2 para fezes, forrado com **saco de lixo resistente**, e depois de cada uso cobre com uma mão cheia de serradura, terra, cinza, cal, areia de gato ou papel picado (tira o cheiro, seca, reduz moscas). Tampa sempre fechada.
- Quando o saco estiver a meio, fecha-o bem com nó e um segundo saco. Guarda num contentor fechado longe da casa e de água, à sombra, até haver recolha. Ou enterra (ver abaixo).
- Separar urina de fezes reduz muito o cheiro e o volume.
- Uma tampa de sanita de campismo que encaixa em baldes de 20 L custa 15 €; tem uma.

## Latrina no exterior (dias a semanas, se tens quintal)

- Vala de 30 cm de largura, 60 a 100 cm de profundidade, a **pelo menos 30 m de poços, ribeiros e casas**, e a jusante. Cobre cada uso com terra. Quando estiver a 30 cm do topo, tapa e faz outra.
- Nunca perto de onde se recolhe água ou se cultiva.

## Mãos

**Lava as mãos com sabão depois da casa de banho e antes de comer ou cozinhar, sempre.** É a medida que mais evita diarreia, hepatite A e cólera. Sem água: gel de álcool. Um garrafão com torneira ou uma garrafa furada pendurada faz um lavatório com pouca água.

## Lixo

- Separa: orgânico (enterra, ou composta, ou fecha bem longe da casa), plástico e papel (podem ficar semanas; queima só em último recurso e ao ar livre, nunca plásticos dentro de casa).
- Latas e vidro lavados não atraem animais.
- Sacos bem fechados, num contentor com tampa, longe da porta. Ratos, moscas e cães vêm em 2 dias.
- Fraldas e pensos: como fezes: saco duplo, contentor fechado.

## Limpeza e desinfeção

- Lixívia diluída: **1 parte para 10 de água** para superfícies com fezes, vómito ou sangue; **1 para 50** para limpeza geral. Faz novo todos os dias (perde efeito). Não mistures com amoníaco ou outros produtos (gás tóxico).
- Cal viva ou cal hidratada em latrinas e sobre resíduos.

## Cadáveres de animais

Luvas, saco, enterra a 1 m de profundidade longe de água, ou coloca fora da casa para recolha. Lava as mãos. Cadáveres em regra não causam epidemias, mas atraem pragas e cheiram.
` },

    { id: 'abrigo-explosoes', icon: '🧱', title: 'Abrigo em casa contra explosões', desc: 'Onde ficar durante bombardeamentos ou explosões quando não há abrigo público.', md: `
## O melhor lugar da casa

![Regra das duas paredes numa casa](fig:duas-paredes)

Por ordem de preferência:

1. **Cave, garagem subterrânea, arrecadação no subsolo** (sem tubagens de gás, sem janelas, com duas saídas se possível).
2. **Piso térreo ou o mais baixo**, numa divisão interior sem janelas: casa de banho interior, corredor, arrecadação, debaixo das escadas.
3. Regra das **duas paredes**: pelo menos duas paredes entre ti e o exterior (a primeira absorve os estilhaços, a segunda protege-te). Corredor central de um apartamento cumpre isto. Nunca junto a janelas, varandas, fachadas, portas de vidro.
4. **Nunca** no último andar (drones e foguetes atingem primeiro os pisos altos) nem em edifícios pré-fabricados leves.
5. Se estás em prédio alto e há tempo: desce pelas **escadas** para o piso mais baixo ou para a garagem. Não uses elevador.

## Preparar o espaço (faz-se antes)

- Água (3 L por pessoa por dia, para 3 dias), comida que não precisa de cozinhar, rádio a pilhas, lanternas, powerbank, kit de primeiros socorros, medicação, documentos, cobertores, colchões, roupa quente, brinquedos silenciosos, balde com tampa e sacos para sanita, papel higiénico, extintor, ferramentas (martelo, pé de cabra, serra, para sair se ficares preso), apito.
- Colchões e cobertores encostados à parede do lado da rua absorvem estilhaços. Armários cheios de livros ou roupa contra as paredes exteriores.
- Fita adesiva em X ou película nas janelas reduz os estilhaços de vidro (não impede a quebra). Melhor: persianas fechadas e cortinas grossas.
- Deixa os sapatos ao lado da cama.

## Durante

- Deita-te no chão, de barriga para baixo, pés virados para a explosão se souberes de onde vem, mãos sobre a nuca, cotovelos a proteger a cabeça, boca ligeiramente aberta (iguala a pressão e protege tímpanos e pulmões).
- Afasta-te de garrafas de gás, aquários, espelhos, candeeiros, prateleiras.
- Fica no abrigo até ao fim do alarme, e mais 10 a 15 minutos (segundas vagas, destroços). Ouve o rádio.

## Se o edifício for atingido

- Sai só quando a poeira assentar e se não houver risco de colapso. Cobre nariz e boca.
- Não uses isqueiros nem interruptores (gás). Fecha o gás se for possível.
- Preso nos escombros: **não grites** (gasta ar e inspira poeira); bate em canos ou paredes com ritmo, usa o [apito](#/t/apito) ou o telemóvel. Tapa a boca com pano. Move-te o mínimo.

Guia completo em [Conflito armado](#/s/guerra).
` },

    { id: 'seguranca-casa', icon: '🔒', title: 'Segurança da casa e da rua', desc: 'Proteger pessoas e bens quando a ordem pública falha, sem virar paranoia.', md: `
>i Guia completo em [Proteção e defesa](#/s/protecao): casa, pilhagens, intrusões, estrada, vizinhos e crianças.

## Realismo primeiro

Na maioria das crises, as pessoas cooperam; a criminalidade sobe sobretudo quando a escassez dura semanas. A melhor proteção é **vizinhos que se conhecem e ajudam**. Antes de comprar fechaduras, conhece quem vive à tua volta.

## Casa

- Portas e janelas fechadas à chave, mesmo de dia, mesmo em casa. Trinco na porta.
- Persianas descidas nos pisos baixos à noite. Luz interior discreta (não anuncies que tens energia quando os outros não têm).
- Não mostres reservas: leva sacos discretos, não fales de quanto tens, não cozinhes cheiros fortes com janela aberta em zona com fome.
- Cão ladra. Gravilha à volta faz barulho. Uma luz solar com sensor de movimento assusta.
- Objetos de valor e documentos: espalhados, não todos no mesmo sítio. Cópias no [cofre](#/t/cofre).
- Extintor e detetores de fumo (incêndios aumentam com velas e fogareiros).

## Rua

- Sai em grupo, de dia, com pouco à vista. Não mostres telemóvel, dinheiro ou joias.
- Conhece pelo menos duas rotas para cada destino. Evita becos, sítios com multidões agitadas, filas tensas.
- Se te abordarem: dá o que pedem (nada material vale uma vida), não discutas, não persigas.
- Multidão a empurrar: braços à frente do peito como um pugilista, avança na diagonal para as bordas, nunca contra o fluxo; se caíres, encolhe-te de lado a proteger a cabeça e levanta-te logo que possível.

## Comunidade

- Grupo de vizinhos: quem tem competências (médico, enfermeira, eletricista, canalizador, rádio-amador), quem precisa de ajuda (idosos, doentes, bebés), quem tem gerador, água, ferramentas.
- Turnos de vigilância só se for mesmo necessário, em pares, com apito e lanterna, **sem armas** (em Portugal é crime e vira facilmente tragédia).
- Ponto de informação do bairro (quadro na entrada, um café): notícias, pedidos, ofertas.
- Partilha. Quem partilha comida no primeiro dia tem aliados no décimo.

## Armas

Em Portugal, ter arma de fogo sem licença é crime, e com licença há regras estritas. Um extintor, um spray de pimenta (legal com mais de 18 anos, para defesa pessoal) e uma lanterna forte resolvem quase tudo o que um civil comum enfrenta, sem os riscos. Uma arma numa casa com stress, crianças e álcool é mais perigosa para a família do que para intrusos.
` },

    { id: 'abrigo-improvisado', icon: '⛺', title: 'Abrigo improvisado no exterior', desc: 'Passar a noite fora com o que há. Proteger do vento, chuva, frio e chão.', md: `
## Prioridades

1. **Isolar do chão** (perde-se mais calor por condução do que pelo ar): ramos, folhas secas, cartão, mochila, tapetes do carro, ervas, tudo com 20 cm de espessura.
2. **Cortar o vento**: encosta a uma rocha, tronco, muro, talude, carro. A entrada virada para o lado oposto ao vento.
3. **Proteger da chuva**: lona, plástico, manta térmica, ramos com folhas sobrepostas de baixo para cima como telhas.
4. Pequeno: menos ar para aquecer. Um espaço onde te deites e mais nada.
5. Longe de: leitos secos de rios e ribeiras (cheias súbitas), fundo de vales (frio e humidade), árvores mortas ou ramos soltos, topos expostos, formigueiros, colmeias.

## Abrigos rápidos

- **Carro**: já é um abrigo. Isola janelas com cartões e roupa, dorme com o motor desligado.
- **Lona ou plástico** esticado entre duas árvores ou de uma corda ao chão, em ângulo de 45° contra o vento (abrigo "em A" ou "lean-to"). Prende com pedras.
- **Manta térmica** como teto refletor: reflete o calor de uma fogueira pequena para ti.
- **Abrigo de detritos**: um tronco apoiado numa forquilha (ou pedra) a 1 m de altura, ramos encostados dos dois lados, e 50 cm de folhas, ervas e ramos por cima e por dentro. 2 a 3 horas de trabalho, aguenta chuva e frio sem fogo.
- **Saco de lixo grande** (os de 200 L): furo para a cabeça e é um impermeável e saco-cama de emergência. Dois no kit pesam 100 g.
- **Buraco na neve** com teto de blocos ou ramos, mais quente do que o exterior.
- Edifícios abandonados: cuidado com telhados instáveis, chão podre, amianto, animais. Fica junto à saída.

## Dormir com frio

Roupa seca, gorro, meias secas (leva um par só para dormir), garrafa com água quente, comer antes de dormir, urinar antes (o corpo gasta calor a manter urina quente), não dormir diretamente no chão, fechar o saco à volta da cara.

## Fogo

Pequeno, entre ti e um refletor (rocha, muro de troncos), afastado do abrigo o suficiente para não pegar fogo. Ver [fazer fogo](#/s/saber/fogo). Uma fogueira num buraco alongado (trincheira) gasta menos lenha e aquece mais.
` }
  ]
});
