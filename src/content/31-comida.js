CONTENT.sections.push({
  id: 'comida', icon: '🥫', title: 'Alimentação',
  desc: 'Despensa de emergência, o que fazer com o frigorífico sem luz, cozinhar sem eletricidade, racionar.',
  pages: [
    { id: 'despensa', icon: '🛒', title: 'Despensa de emergência', desc: 'O que ter para 2 semanas, com rotação, sem desperdício.', tools: ['reservas'], md: `
>+ Para a nossa família: multiplica a lista de 1 adulto por **{{pd_factor}}**, ou usa a [calculadora de reservas](#/t/reservas), que já tem os nossos dados. Junta leite para as crianças ({{milk_14d}} L para 2 semanas) e a comida própria {{de_c1}} (ver [criança pequena](#/s/familia/crianca-pequena)).

## Princípios

- **Guarda o que comes, come o que guardas.** Compra um pouco a mais do que já usas, de cada vez que vais às compras, e vai rodando (o mais antigo à frente). Em 2 meses tens reservas sem esforço nem desperdício.
- Preferir comida que **não precisa de frio nem de cozinhar** ou que cozinha em poucos minutos (poupa combustível e água).
- Mais calorias e menos volume: azeite, frutos secos, manteiga de amendoim, chocolate, mel.
- Variedade e algum conforto (café, chocolate, especiarias): o moral conta.
- Abre-latas manual. Dois.

## Lista para 1 adulto, 2 semanas (aprox. 2100 kcal/dia)

Multiplica pelo número de pessoas. A [calculadora](#/t/reservas) faz as contas.

- [ ] Arroz, massa, cuscuz, flocos de aveia, farinha: **2 kg**
- [ ] Leguminosas em lata (grão, feijão, lentilhas) ou secas: **1,5 kg** (10 a 12 latas)
- [ ] Conservas de peixe e carne (atum, sardinha, cavala, frango, salsichas): **10 a 12 latas**
- [ ] Legumes em lata ou frasco (tomate, ervilhas, milho, cogumelos) e sopas: **8 a 10 latas**
- [ ] Fruta em lata ou seca (passas, tâmaras, figos, alperces): **1 kg**
- [ ] Frutos secos (amendoim, nozes, amêndoas) e manteiga de amendoim: **600 g**
- [ ] Bolachas, tostas, barras de cereais, cereais de pequeno-almoço: **1 kg**
- [ ] Azeite ou óleo: **400 ml**
- [ ] Açúcar, mel, compota, chocolate: **500 g**
- [ ] Leite UHT ou leite em pó (o em pó dura anos): **3 L equivalente**
- [ ] Sal, pimenta, caldos, alho seco, especiarias, vinagre
- [ ] Café solúvel, chá, cacau
- [ ] Batatas, cebolas, cenouras, maçãs (duram semanas em local fresco e escuro)
- [ ] Ovos (2 a 3 semanas sem frio se não forem lavados), queijo curado, chouriço, presunto embalado
- [ ] Bebidas isotónicas em pó, sumo em pó com vitamina C
- [ ] Comida de bebé, leite adaptado, comida para os animais (2 semanas)
- [ ] Suplemento multivitamínico (dieta de latas é pobre em vitaminas frescas)

## Validades reais

- Latas: rótulo diz 2 a 5 anos; na prática, intactas (sem amolgadela, ferrugem ou inchaço), duram muito mais. Ácidas (tomate, fruta) degradam mais depressa.
- Arroz branco, massa, leguminosas secas, açúcar, sal, mel: quase indefinido se secos e sem insetos. Farinha e arroz integral: meses (a gordura oxida).
- Óleos: 1 a 2 anos. Frutos secos: 6 a 12 meses (rançam).
- Guarda em local **fresco, seco, escuro**. Cada 10 °C a menos duplica a duração.
- Regista tudo no [inventário](#/t/inventario) com validade: a app avisa.

## Sinais para deitar fora

Lata inchada, a deitar líquido, com ferrugem profunda, ou que solta gás ao abrir (**botulismo: mortal, sem cheiro**; nunca provar). Cheiro estranho, bolor, insetos, massa ou arroz com teias. Na dúvida, fora.
` },

    { id: 'frigorifico', icon: '🧊', title: 'Frigorífico sem luz', desc: 'Quanto tempo aguenta a comida e como decidir o que comer primeiro.', md: `
## Regras de tempo (portas fechadas)

- **Frigorífico:** 4 horas. Depois disso, o que for perecível (carne, peixe, lácteos, ovos cozidos, restos cozinhados, comida com maionese) e esteve acima de 5 °C mais de 2 horas: **deita fora**. Manteiga, queijo curado, conservas abertas com muito sal ou açúcar, fruta, legumes, pão, bolos secos aguentam mais.
- **Congelador cheio:** 48 horas. **Meio cheio:** 24 horas. Um congelador de arca aguenta mais do que um vertical.
- Não abras as portas. Cada abertura custa horas. Põe um papel na porta a dizer "NÃO ABRIR" para as crianças.
- Junta os alimentos no congelador (mantêm-se frios uns aos outros). Garrafas de água congeladas ou gelo em sacos ajudam.
- Se souberes com antecedência (aviso de tempestade): congela garrafas de água, põe o frigorífico e o congelador no máximo.

## Ordem para comer

1. Primeiro o que está no frigorífico e estraga depressa (carne, peixe, leite aberto): cozinha tudo o que puderes nas primeiras horas.
2. Depois o congelador, à medida que descongela. Comida com **cristais de gelo ou abaixo de 5 °C** pode ser cozinhada ou recongelada (perde qualidade, não segurança). Se descongelou totalmente e está há mais de 2 h à temperatura ambiente: fora.
3. Só depois a despensa.

## Termómetro

Um termómetro de frigorífico (2 €) tira as dúvidas: **abaixo de 5 °C, seguro**. Sem termómetro e sem certeza: na dúvida, deita fora. Uma intoxicação alimentar sem hospital disponível é muito mais cara do que uma refeição.

## Sem frigorífico durante dias

- **Carne e peixe:** cozinha bem, come no dia. Com sal grosso em abundância (salga) aguentam dias; secar ao sol e vento em tiras finas, semanas.
- **Ovos:** duram semanas sem frio se não forem lavados e ficarem em local fresco. Teste: em água, os que flutuam estão estragados.
- **Leite UHT fechado:** meses. Aberto: horas. Leite em pó resolve.
- **Queijos curados, enchidos, manteiga:** dias a semanas em local fresco.
- **Cave, adega, poço, chão de terra, saco no ribeiro** (bem fechado e preso) mantêm 10 a 15 °C: prolongam tudo.
- **Frigorífico de evaporação (pot-in-pot):** vaso de barro dentro de outro maior, areia molhada entre eles, pano húmido por cima, à sombra e com vento. Baixa 10 a 15 °C.
- Cozinha em quantidade só o que se come; restos à temperatura ambiente mais de 2 h (1 h com calor) são risco.

![Frigorífico de evaporação: pote dentro de pote](fig:pote)
` },

    { id: 'cozinhar', icon: '🍳', title: 'Cozinhar sem eletricidade', desc: 'Fogareiros, gás, lenha, forno solar, e o perigo de cozinhar dentro de casa.', md: `
>x **Carvão, lenha, grelhadores, fogareiros a álcool ou petróleo e geradores NUNCA dentro de casa, garagem ou tenda.** O monóxido de carbono não se vê nem se cheira e mata a dormir. Fogareiro a gás: só com janela aberta e por pouco tempo. Detetor de CO no kit.

## Opções por ordem de praticidade

- **Fogão a gás de botija** (muitas casas têm): funciona sem luz. Acende com fósforo ou isqueiro. Uma botija de 13 kg dá 1 a 2 meses de uso normal.
- **Fogareiro de campismo a cartucho** (butano/propano, 230 g): cozinha 10 a 15 refeições simples por cartucho. Barato, compacto. Tem 5 a 10 cartuchos de reserva. Não usar abaixo de 5 °C (butano puro falha; mistura com propano é melhor).
- **Fogareiro de álcool** (Trangia) ou de pastilhas sólidas: lento mas simples e sem manutenção.
- **Lenha:** lareira, fogareiro tipo "rocket stove" (2 latas), fogueira no exterior. Precisa de prática e de lenha seca. Ver [fazer fogo](#/s/saber/fogo).
- **Grelhador a carvão**, no exterior. Não é eficiente para ferver água.
- **Forno solar** (caixa de cartão forrada a alumínio, com vidro ou plástico por cima, panela preta dentro): 80 a 120 °C em dia de sol. Cozinha arroz, legumes, aquece água. Lento, gratuito, seguro.
- **Motor do carro:** aquece latas embrulhadas em alumínio sobre o bloco em 20 a 30 min (não perto do escape). Recurso.

## Poupar combustível e água

- Cozinha uma vez por dia em quantidade. Tapa sempre as panelas. Corta em pedaços pequenos. Deixa demolhar leguminosas e arroz de um dia para o outro (cozem em metade do tempo).
- **Cozedura passiva ("haybox"):** ferve 5 minutos, tapa, embrulha a panela em cobertores ou mete-a numa caixa cheia de roupa ou esferovite, e deixa 1 a 2 horas. Arroz, massa, sopa, leguminosas demolhadas ficam prontos com uma fração do gás.
- Muita coisa come-se crua ou só com água quente: cuscuz, aveia, purés instantâneos, sopas de pacote, noodles.
- Panela de pressão: metade do tempo e combustível.
- Água de cozer legumes reaproveita-se para sopa.

## Higiene sem água corrente

- Limpa a loiça com papel ou pão antes de lavar. Lava numa bacia, enxagua noutra com água e umas gotas de lixívia. Deixa secar ao ar.
- Cozinha sobre uma toalha ou plástico para apanhar restos.
- Lixo orgânico fechado e longe da casa (ratos, moscas). Enterra se durar dias.
` },

    { id: 'racionar', icon: '⚖️', title: 'Racionar e priorizar', desc: 'Quantas calorias precisas, quem come primeiro, como esticar as reservas.', md: `
>i Quando a despensa acaba: [comida da natureza](#/s/natureza), com pesca, laços, plantas silvestres e horta rápida.

## Quanto precisas

- Adulto em repouso: 1500 a 2000 kcal. Com trabalho físico ou frio: 2500 a 3500. Grávidas e a amamentar: +300 a 500.
- Crianças: 1000 a 1800 conforme a idade. Não devem racionar como adultos: **primeiro as crianças, grávidas, doentes e idosos frágeis**, depois quem faz trabalho físico, depois os restantes.
- Uma pessoa saudável aguenta semanas com metade das calorias, mas com menos energia, mais frio, pior humor e pior imunidade. Planeia 1200 kcal mínimas por adulto em racionamento.

## Referências rápidas

| Alimento | kcal aproximadas |
|---|---|
| Azeite, 1 colher de sopa | 120 |
| Manteiga de amendoim, 1 colher de sopa | 95 |
| Arroz ou massa cozida, 1 chávena | 200 |
| Lata de atum em óleo (120 g) | 250 |
| Lata de sardinha | 300 |
| Lata de feijão/grão (400 g) | 350 |
| Amendoins, mão cheia (30 g) | 170 |
| Chocolate, 100 g | 550 |
| Bolachas Maria, 6 | 150 |
| Ovo | 75 |
| Pão, 1 papo-seco | 150 |
| Leite em pó, 3 colheres de sopa (em 250 ml) | 130 |

## Esticar reservas

- Sopa: tudo rende mais em sopa (água, sal, um pouco de gordura, o que houver). Aquece e sacia.
- Gordura é a caloria mais compacta: junta azeite a tudo.
- Uma refeição principal e dois lanches pequenos gerem melhor a fome do que três refeições pequenas.
- Comer devagar, sentados, juntos: sacia mais e mantém rotinas (importante para crianças).
- Evita esforço desnecessário se a comida é pouca. Dorme mais.
- Sem proteína suficiente durante semanas, o corpo perde músculo: leguminosas + cereal (arroz com feijão) dão proteína completa.

## Sinais de subnutrição a vigiar

Fraqueza, feridas que não saram, gengivas a sangrar (falta de vitamina C: fruta, legumes crus, batata, brotos de leguminosas germinadas em 3 dias com água), tonturas, apatia, perda rápida de peso. Prioridade a essas pessoas.

## Não comas

O que não conheces com certeza (cogumelos e plantas silvestres mata gente todos os anos), animais encontrados mortos, moluscos em zonas de maré vermelha, comida de latas inchadas, comida que esteve em água de cheia.
` },

    { id: 'conservar', icon: '🧂', title: 'Conservar sem frio', desc: 'Sal, secagem, fumo, vinagre, gordura. Métodos antigos que funcionam.', md: `
## Secagem

O método mais simples. Tira a água, os micróbios não crescem.

- **Carne e peixe:** tiras finas (5 mm), salgadas, penduradas ao sol e vento (ou perto de fogo sem chama) 2 a 4 dias, até ficarem rígidas e sem zonas moles. Tapa com rede contra moscas. Guarda em local seco; dura meses.
- **Fruta:** rodelas finas de maçã, pera, pêssego, figo, uva ao sol 3 a 5 dias, viradas todos os dias. Tomate cortado ao meio e salgado.
- **Legumes e ervas:** feijão-verde, cogumelos, pimentos, ervas aromáticas em fios à sombra e vento.
- Forno a 50 a 70 °C com porta entreaberta, ou desidratador, se houver eletricidade.

## Sal

- **Salga:** camadas de sal grosso e carne ou peixe num recipiente, 1 a 2 semanas em local fresco, depois secar. É o bacalhau, o presunto, a sardinha salgada. Demolha antes de cozinhar.
- **Salmoura:** 100 g de sal por litro de água, cobre completamente, conserva legumes e carne semanas em local fresco.

## Fumo

Fumeiro caseiro: caixa ou barril com fumo de lenha de árvores de fruto ou carvalho (nunca pinho ou madeira tratada), a frio (abaixo de 30 °C) durante dias, ou a quente (60 a 80 °C) durante horas. Combinado com salga. Sabe bem e conserva semanas.

## Vinagre e fermentação

- **Pickles:** legumes cobertos com vinagre (mínimo 5% de acidez) e sal, em frasco fechado: meses.
- **Fermentação láctica (chucrute):** couve cortada fina com 2% de sal (20 g por kg), amassada até largar água, comprimida em frasco de modo a ficar coberta pelo próprio líquido, 1 a 4 semanas a 18 a 22 °C. Rica em vitamina C, dura meses em local fresco.

## Gordura

Carne cozinhada e coberta totalmente de gordura ou azeite (confit, chouriço em banha) num recipiente fechado, local fresco: semanas. A gordura isola do ar.

## Açúcar

Compotas e fruta em calda (mínimo 50% de açúcar) em frascos fervidos e fechados a quente: meses a anos.

## Conservas caseiras em frasco (cuidado)

Legumes pouco ácidos (feijão-verde, ervilhas, cogumelos, carne) em frasco fechado sem esterilização a pressão (120 °C) podem desenvolver **botulismo**, sem cheiro nem sabor. Só faz conservas de coisas ácidas (tomate com limão, pickles, fruta) por fervura em banho-maria, e ferve o conteúdo 10 minutos antes de comer se tiveres dúvidas.

## Germinar

Lentilhas, grão, feijão-mungo, sementes de girassol: demolha 12 h, escorre, enxagua 2 vezes por dia num frasco tapado com pano. Em 3 a 5 dias tens brotos frescos com vitaminas. A forma mais fácil de ter "verdura" num apartamento sem luz.
` },

    { id: 'especiais', icon: '🍼', title: 'Bebés, idosos, alergias, animais', desc: 'Necessidades específicas que se esquecem até ser tarde.', md: `
>i Fraldas e leite para as nossas crianças, já calculados: [os nossos números](#/s/familia/numeros).

## Bebés

- **Amamentar** é a melhor preparação: não precisa de água, frio, fogo nem stock, e protege contra infeções. Em crise, o stress reduz o leite mas raramente o corta: continuar a dar mama, beber e comer, descansar. A mãe precisa de mais 500 kcal e 1 L de água.
- **Leite adaptado em pó:** reserva para 2 a 4 semanas. Precisa de água **fervida** (mesmo engarrafada) e biberões limpos (fervidos ou lavados com água tratada). Prepara só a quantidade da toma; deita fora restos ao fim de 1 h.
- **Leite líquido pronto** (em pacotes UHT para bebé): não precisa de água nem preparação, dura meses fechado. Mais caro mas muito mais seguro sem condições. Tem alguns.
- Sem leite adaptado e sem mama, com mais de 6 meses: leite UHT gordo diluído com água fervida (não ideal, mas seguro no curto prazo). Menos de 6 meses: é urgência médica; procura ajuda.
- **Papas e frascos:** 6 meses em diante. Puré de batata, cenoura, banana esmagada, arroz bem cozido servem.
- Fraldas (8 por dia para recém-nascidos, 5 depois), toalhitas, creme, sacos. Fraldas de pano e alfinetes como reserva.
- Bebés desidratam em horas: com diarreia ou vómitos, [soro oral](#/s/socorros/diarreia) à colher e procurar ajuda cedo.

## Idosos

- Comida mole e fácil de mastigar e digerir; sopa, purés, papas, leite, ovos.
- Beber é a maior falha: sentem menos sede. Oferece líquidos de hora a hora.
- Medicação: a maior prioridade do stock. Ver [medicação crónica](#/s/saude/medicacao-cronica).
- Diabéticos: comida regular, açúcar rápido à mão para hipoglicemias.

## Alergias e intolerâncias

Stock específico (sem glúten, sem lactose, sem frutos secos) porque a ajuda humanitária raramente o tem. Cartão de alergias no bolso e na app. Adrenalina se for alergia grave. Etiqueta bem as reservas para não haver enganos em stress.

## Animais

- Ração seca para 2 a 4 semanas em recipiente fechado; água (cão 1 L por dia, gato 0,3 L).
- Medicação, boletim de vacinas, chip registado, trela, açaime (obrigatório em muitos abrigos), transportadora para gatos e cães pequenos, areia.
- Foto com o dono (prova de posse se se perder).
- Em evacuação, **leva-os**: os que ficam raramente sobrevivem e as pessoas voltam para os buscar a arriscar a vida. Se for impossível, deixa-os soltos dentro de casa com muita água e comida, não presos.
- Animais de produção (galinhas, ovelhas): água e comida para vários dias, portas abertas para fugirem de incêndio ou cheia.
` }
  ]
});
