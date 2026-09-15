CONTENT.sections.push({
  id: 'agua', icon: '💧', title: 'Água',
  desc: 'Quanta precisas, onde a encontrar em casa, como a tornar segura e como a guardar.',
  pages: [
    { id: 'quanto', icon: '🥤', title: 'Quanta água preciso', desc: 'Mínimos por pessoa e por dia, e como racionar.', tools: ['reservas'], md: `
>+ Para a nossa família ({{fam}}): **{{water_day}} L por dia**, **{{water_3d}} L para 3 dias** ({{jugs_3d}} garrafões de 5 L) e **{{water_14d}} L para 2 semanas**. [Todos os números](#/s/familia/numeros).

## Regra simples

**3 litros por pessoa por dia** para beber e cozinhar. Mais **2 litros** para higiene mínima (mãos, dentes, lavar feridas). Total: **4 a 5 L por pessoa por dia**. Uma família de 4 para 3 dias: **50 a 60 L**. Para 2 semanas: 250 L (ou 100 L se racionares e tiveres fonte para purificar).

Aumenta 50% com calor, esforço, doença (febre, diarreia), gravidez, amamentação. Crianças bebem menos em volume mas desidratam mais depressa.

Usa a [calculadora de reservas](#/t/reservas).

## Prioridades quando há pouca

1. Beber (adultos 1,5 L mínimo por dia, mesmo racionando; abaixo disso, a capacidade de decisão cai).
2. Preparar comida e medicação.
3. Lavar mãos antes de comer e depois da casa de banho (usa gel de álcool para poupar).
4. Lavar feridas.
5. Higiene corporal (toalhitas, pano húmido; não é preciso duche).
6. Loiça (limpa com papel, lava com pouca água, ferve-a depois).
7. Roupa (última prioridade; ar e sol matam a maioria dos micróbios).

## Racionar sem adoecer

- Não "poupes" água deixando de beber: come menos se for preciso (a digestão consome água), evita esforço ao calor, fica à sombra, respira pelo nariz.
- Bebe em goles regulares, não de uma vez.
- Sem álcool, pouco café, comida com pouco sal e proteína (aumentam a sede).
- Urina escura = a beber pouco. Urina clara = bem hidratado.

## Sinais de que precisas de mais

Dor de cabeça, cansaço, irritabilidade, urina escura e pouca, tonturas ao levantar. Ver [desidratação](#/s/socorros/calor-corpo).
` },

    { id: 'fontes-casa', icon: '🏠', title: 'Água escondida em casa', desc: 'Onde há dezenas de litros que não sabias que tinhas.', md: `
## Assim que a água falha ou o aviso chega

**Enche tudo já**: banheira, lavatórios, panelas, garrafas, baldes, sacos de congelação. Enquanto houver pressão nos canos. A banheira dá 100 a 150 L (para higiene e autoclismo; para beber, purifica antes).

## Fontes dentro de casa (normalmente potáveis)

- **Termoacumulador / cilindro de água quente:** 50 a 200 L. Desliga a eletricidade ou o gás, fecha a entrada de água fria, abre uma torneira de água quente na casa para entrar ar, e retira a água pela válvula de purga em baixo (podes precisar de uma mangueira). Deixa arrefecer. Os primeiros litros podem ter sedimento: filtra por um pano.
- **Tubagens:** abre a torneira mais alta da casa (entra ar) e recolhe na mais baixa. Podem sair vários litros.
- **Cubos de gelo e gelo do congelador.**
- **Depósito do autoclismo (o tanque de cima, não a sanita):** 6 a 10 L, potável se não usares pastilhas de limpeza azuis. Purifica na mesma.
- **Água de conservas e legumes em lata**, sumos, leite UHT, bebidas: contam como líquidos.
- **Máquina de lavar** e **desumidificador**: não potáveis para beber (só autoclismo e limpeza).

## Fora de casa

- Piscinas e jacúzis: para higiene e autoclismo. Beber só em último recurso, depois de filtrar e ferver (o cloro de piscina não é o problema; são os químicos acumulados).
- Depósitos de rega, cisternas, água da chuva: purificar sempre.
- Fontes, ribeiros, poços: purificar sempre. Ver [recolher água](#/s/agua/chuva-natureza).
- Estabelece um turno de recolha e um sítio de armazenamento fresco e escuro.

## O que NÃO beber

- Água de radiadores e aquecimento central (anticongelante, tóxico).
- Água de aquários, colchões de água.
- Água de cheia ou de rios em zona urbana sem purificar.
- Água salgada (desidrata mais). Só destilada.
- Urina (não, mesmo em filme).
` },

    { id: 'purificar', icon: '🔥', title: 'Purificar água', desc: 'Fervura, lixívia, comprimidos, filtros, sol. O que cada método mata e o que não mata.', tools: ['conversor', 'temporizador'], md: `
## Primeiro: clarificar

Água turva tem menos hipóteses de ficar segura. **Deixa assentar** 30 minutos ou mais, decanta com cuidado, e **filtra por um pano** dobrado várias vezes, um filtro de café, ou um filtro improvisado (garrafa cortada com camadas de gravilha, areia e carvão). Isto tira partículas, não micróbios.

![Filtro improvisado: clarifica, não desinfeta](fig:filtro)

## Método 1: Fervura (o mais fiável)

**Fervura em cachão durante 1 minuto** (3 minutos acima de 2000 m de altitude). Mata bactérias, vírus e parasitas. Não remove químicos nem sal. Deixa arrefecer tapada. Passa entre dois recipientes para arejar e melhorar o sabor.

Gasta combustível: cerca de 1 cartucho de gás de campismo (230 g) para 20 a 30 L.

## Método 2: Lixívia (hipoclorito de sódio)

Só **lixívia simples, sem perfume, sem detergente, sem espessante**. Vê a concentração no rótulo. Mata bactérias e vírus; é **fraca contra parasitas** (Giardia, Cryptosporidium): por isso filtra bem primeiro.

| Concentração da lixívia | Água límpida (por litro) | Água turva ou fria (por litro) |
|---|---|---|
| 1% | 10 gotas | 20 gotas |
| 2 a 3% | 4 gotas | 8 gotas |
| 4 a 6% (mais comum) | **2 gotas** | **4 gotas** |
| 7 a 10% | 1 gota | 2 gotas |

20 gotas = 1 ml. Para 10 L de água límpida com lixívia a 5%: 20 gotas = 1 ml (uma tampa de caneta). Para 50 L: 5 ml = 1 colher de chá.

Mistura, **espera 30 minutos** (60 se estiver muito fria). Deve cheirar ligeiramente a cloro; se não cheirar, repete a dose e espera mais 15 min. Cheira demasiado? Deixa ao ar aberto umas horas ou passa entre recipientes.

Usa a [calculadora de dose](#/t/conversor).

## Método 3: Comprimidos ou gotas de purificação

Cloro (NaDCC) ou dióxido de cloro (mais eficaz, mata também Cryptosporidium em 4 h). Segue a embalagem. Leves e baratos: tem-nos no kit. Iodo (tintura a 2%: 5 gotas por litro, 10 se turva, 30 min): não para grávidas, tiroide ou uso prolongado.

## Método 4: Filtros

- **Filtros de campismo** (Sawyer, LifeStraw, Katadyn, 0,1 a 0,2 mícron): removem bactérias e parasitas, **não removem vírus** (que em Portugal e Europa são o menor risco em água de rio, mas existem em água de esgoto). Combina com cloro ou fervura em água suspeita.
- **Filtros de cerâmica e carvão** (jarros de casa, Brita): melhoram o sabor e tiram alguns químicos; **não desinfetam**.
- Filtro improvisado (areia, carvão, gravilha): clarifica e tira algum cheiro; não desinfeta.

## Método 5: Sol (SODIS)

Garrafas PET transparentes até 2 L, cheias com água **límpida**, deitadas ao sol direto sobre superfície refletora (chapa, alumínio) durante **6 horas** (2 dias se nublado). A radiação UV e o calor matam a maioria dos micróbios. Grátis, lento, sem sabor. Bom para complementar.

![Desinfeção solar (SODIS)](fig:sodis)

## Método 6: Destilação

Única forma de tirar **sal, metais pesados, químicos e radioatividade** da água. Ferve num recipiente tapado com um tubo ou uma tampa invertida que faça o vapor condensar e pingar para outro recipiente limpo. Lento e gasta muito combustível. Destilador solar: buraco no chão com recipiente ao centro, coberto por plástico com uma pedra no meio; rende pouco (0,5 a 1 L por dia).

## O que nenhum destes métodos resolve

Água com químicos industriais, pesticidas, combustíveis ou radioatividade só a destilação (parcialmente) e filtros específicos. Se cheira a químico, tem cor estranha ou brilho de óleo: não a bebas, procura outra fonte.

## Resumo rápido

| Método | Bactérias | Vírus | Parasitas | Químicos | Tempo |
|---|---|---|---|---|---|
| Ferver 1 min | Sim | Sim | Sim | Não | 10 min |
| Lixívia | Sim | Sim | Parcial | Não | 30 min |
| Dióxido de cloro | Sim | Sim | Sim (4 h) | Não | 30 min a 4 h |
| Filtro 0,1 µm | Sim | Não | Sim | Não | Imediato |
| SODIS | Sim | Maioria | Sim | Não | 6 h |
| Destilar | Sim | Sim | Sim | Sim | Horas |
` },

    { id: 'armazenar', icon: '🛢️', title: 'Armazenar água', desc: 'Recipientes, rotação, quantidade e onde guardar.', md: `
## Recipientes

- **Garrafões de água de 5 a 8 L** do supermercado: o mais simples. Duram 1 a 2 anos fechados. Baratos, fáceis de transportar (5 kg cada).
- **Jerricãs e bidões alimentares** (PEAD azul ou branco, com símbolo de copo e garfo): 10 a 25 L. Não uses bidões que tiveram químicos ou combustível.
- **Garrafas PET reutilizadas:** lava com água e sabão, enxagua com 1 colher de chá de lixívia em 1 L de água, enche com água da torneira, fecha bem. Não uses garrafas de leite ou sumo (resíduos de proteína e açúcar).
- Bolsas de água para banheira (100 L, "WaterBOB") enchem-se em minutos com aviso prévio.
- Não uses vidro em grande quantidade (parte-se em sismos).

## Como guardar

- Local **fresco, escuro** (a luz favorece algas), longe de combustíveis, pesticidas e químicos (o plástico absorve vapores).
- Não diretamente sobre betão (usa tábuas ou paletes).
- Rotula com a data. Usa e repõe (rotação) de 6 em 6 meses (água da torneira) ou pela validade (comercial). Se a água ficar com sabor mas estiver fechada, está boa: areja-a passando entre dois recipientes.
- Água da torneira portuguesa já tem cloro: **não precisa de mais lixívia** ao armazenar, desde que o recipiente esteja limpo e fechado. Se tiveres dúvidas, 2 gotas de lixívia por litro.

## Quanto

- Mínimo: 3 dias para todos (**15 L por pessoa**).
- Recomendado: 2 semanas (**60 L por pessoa**), mais meios de purificar (comprimidos, filtro) para o que vier a seguir.
- Reparte por vários locais: cozinha, arrecadação, carro (2 a 4 L, à sombra), trabalho (1 garrafa).

## Para os animais

Cão médio: 1 L por dia. Gato: 0,3 L. Conta com eles.

## Depois de abrir

Bebe pelo gargalo o menos possível (contamina). Serve para copos. Água aberta e à temperatura ambiente: consumir em 2 a 3 dias, ou purificar de novo.
` },

    { id: 'chuva-natureza', icon: '🌧️', title: 'Chuva, rios, fontes', desc: 'Recolher água na natureza com o mínimo de risco.', md: `
## Chuva

A mais fácil de tornar segura. Recolhe de telhados limpos (deixa passar os primeiros 10 minutos de chuva que lavam o telhado), toldos, lonas esticadas com uma pedra ao centro a pingar para um balde, ou garrafas abertas. Filtra por pano e trata com [lixívia ou fervura](#/s/agua/purificar) (pássaros, poeira e telhado contaminam). Nunca de telhados com amianto ou depois de incêndio ou acidente químico ou nuclear na zona.

## Rios, ribeiras, lagos

- Escolhe **água corrente, límpida, a montante** de povoações, campos agrícolas, animais e estradas. Evita água parada, com espuma, algas verdes ou cheiro.
- Recolhe **na superfície, longe das margens** e do fundo (menos sedimento e micróbios).
- Afasta-te de zonas com animais mortos, esgotos, indústrias, minas.
- **Trata sempre.** Em Portugal, o principal risco em água de rio limpa são parasitas (Giardia) e bactérias: filtro + cloro, ou fervura.

## Fontes e nascentes

Muitas fontes de aldeia têm placa "água não controlada". Uma nascente que sai diretamente da rocha em zona alta é das melhores fontes, mas trata na mesma (gado a montante).

## Poços e furos

Depois de cheias, sismos ou secas prolongadas, podem estar contaminados por esgotos ou sal. Trata sempre. Um poço abandonado pode ter água com metais ou gases: cuidado ao descer (nunca sozinho).

## Água do mar

**Não se bebe.** Só destilada. Serve para lavar loiça e feridas (limpa, aliás bem), autoclismo, cozinhar em mistura (1 parte de mar para 3 de água doce dá o sal certo para massa).

## Neve e gelo

Derreter antes de beber (gastas calor do corpo e desidrata-te ao comer neve). Gelo de água doce é mais rico em água do que neve. Trata na mesma se vier de zona com animais.

## Orvalho e plantas

Ao amanhecer, arrasta um pano pela erva alta e espreme. Saco de plástico transparente atado a um ramo com folhas ao sol recolhe alguns decilitros por dia (transpiração). Recursos de emergência, não fontes.

## Sinais de água insegura

Cheiro (esgoto, químico, ovos podres), cor, espuma persistente, óleo à superfície, peixes mortos, vegetação morta à volta, formigueiro na boca ao provar. Se em dúvida, procura outra fonte ou destila.
` }
  ]
});
