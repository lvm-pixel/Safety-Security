CONTENT.sections.push({
  id: 'navegar', icon: '🧭', title: 'Orientação',
  desc: 'Encontrar o norte, ler mapas, usar o GPS sem rede, deslocar-se em segurança.',
  pages: [
    { id: 'bussola', icon: '🧭', title: 'Encontrar o norte', desc: 'Bússola, relógio e sol, sombras, estrelas. Sempre dois métodos.', tools: ['bussola'], md: `
## Bússola

- A agulha vermelha aponta para o **norte magnético** (em Portugal, a diferença para o norte verdadeiro é pequena: cerca de 1 a 2° para oeste; ignora para caminhar).
- Afasta-a de metais, ímanes, telemóveis, carros (dão erros de dezenas de graus).
- Horizontal, à altura do peito. Roda o corpo até a agulha coincidir com o N. Escolhe um ponto de referência na direção que queres e caminha até ele; repete.
- A [bússola do telemóvel](#/t/bussola) funciona se o aparelho tiver sensor; calibra desenhando um 8 no ar.

## Relógio de ponteiros e sol (hemisfério norte)

![Método do relógio](fig:norte-relogio)

1. Relógio na horizontal. Aponta o **ponteiro das horas para o sol**.
2. O **Sul** está a meio do ângulo entre o ponteiro das horas e as 12 h. O Norte é o oposto.
3. Com a **hora de verão** (últimos domingos de março a outubro), usa as 13 h em vez das 12 h.
4. Num relógio digital, desenha um mostrador num papel com a hora atual.

Aproximado (10 a 20° de erro), mas suficiente.

## Sombra de um pau (30 minutos)

![Método da sombra, visto de cima](fig:sombra)

1. Espeta um pau de 1 m na vertical em chão plano ao sol. Marca a ponta da sombra com uma pedra.
2. Espera 15 a 30 minutos. Marca a nova ponta.
3. A linha da primeira pedra para a segunda aponta aproximadamente para **Este** (a sombra move-se de oeste para este). Com o pé esquerdo na primeira marca e o direito na segunda, tens o Norte à tua frente.

## Sol, sem instrumentos

- Nasce a **Este** (nordeste no verão, sudeste no inverno), põe-se a **Oeste**. Ao meio-dia solar (cerca das 12 h 30 no inverno e 13 h 30 no verão em Portugal continental) está a **Sul** e as sombras apontam para Norte.
- A Lua cheia está a Sul à meia-noite. Lua crescente: a linha dos "cornos" prolongada até ao horizonte aponta aproximadamente para Sul.

## Estrelas (noite limpa)

![Encontrar a Estrela Polar](fig:norte-estrelas)

- **Estrela Polar** = Norte, com menos de 1° de erro. Encontra a **Ursa Maior** (7 estrelas em forma de caçarola). As duas estrelas da ponta da "caçarola" (opostas ao cabo) apontam para a Polar: prolonga 5 vezes a distância entre elas. A Polar não é muito brilhante; está sozinha e é a ponta do cabo da Ursa Menor.
- **Cassiopeia** (um W ou M) está do outro lado da Polar, à mesma distância. Serve quando a Ursa Maior está baixa.
- A altura da Polar sobre o horizonte é a tua latitude (Portugal: 37 a 42°).
- **Orion** (três estrelas em linha, o "cinturão") nasce a Este e põe-se a Oeste; a ponta da espada aponta para Sul.

## Natureza (indícios, não certezas)

Musgo cresce mais do lado sombrio e húmido (**norte** em Portugal, mas depende da humidade local). Árvores isoladas têm ramos mais longos a sul. Neve derrete primeiro nas encostas viradas a sul. Antenas parabólicas de TV apontam para sul (sudoeste em Portugal continental, para o satélite Hispasat). Igrejas antigas têm o altar virado a este.

## Regra

Confirma sempre com dois métodos. Decide a direção e mantém-na com referências visuais; no nevoeiro ou na noite, sem referências, as pessoas andam em círculos.
` },

    { id: 'mapa-gps', icon: '🗺️', title: 'Mapas, coordenadas e GPS', desc: 'O GPS funciona sem rede. Mapas offline, coordenadas, dar a tua posição.', tools: ['gps'], md: `
>+ O [mapa da app](#/t/mapa) mostra ruas e nomes com detalhe quando há internet, abre qualquer ponto no Google Maps ou no Apple Maps e continua a funcionar sem rede com o mapa de Portugal e as zonas guardadas. Para navegar sem rede com a qualidade do Google Maps, descarrega já a tua zona numa das apps abaixo.

## O GPS não precisa de internet

O chip GPS do telemóvel recebe os satélites diretamente e dá a posição sem rede nem SIM. O que precisa de internet são os **mapas**: descarrega-os **agora**.

- **Google Maps** (iPhone e Android, com sessão iniciada na conta Google): toca na tua foto, **Mapas offline**, **Selecionar o seu mapa**, ajusta o retângulo e toca em **Transferir**. Sem rede dá para pesquisar e para navegar de carro. Com Wi-Fi, os mapas atualizam-se sozinhos; se ficarem muito tempo sem atualizar, caducam.
- **Apple Maps** (iPhone com iOS 17 ou mais recente): na app Mapas, toca na tua foto ou nas iniciais, **Mapas offline**, **Descarregar novo mapa**, ajusta a área e toca em **Descarregar**. Sem rede dá para pesquisar e para navegar.
- **Organic Maps** ou **OsmAnd** (gratuitos, sem conta): o país inteiro sem rede, com trilhos e caminhos rurais que o Google e a Apple muitas vezes não têm.
- Descarrega o distrito onde vives, onde trabalhas e para onde evacuarias, com Wi-Fi e bateria cheia. Confirma em modo de avião que funciona. Revê de 6 em 6 meses.
- Um **mapa de papel** (Michelin da região, cartas militares 1:25 000 do CIGeoE para a zona) no kit e no carro. Não tem bateria.

A [ferramenta GPS](#/t/gps) mostra a tua posição e guarda pontos (o carro, o abrigo, a casa) com distância e rumo.

## Coordenadas

- **Decimais**: 38.72345, -9.13934 (latitude, longitude). Norte positivo, oeste (Portugal) negativo. 5 casas decimais = precisão de 1 m. É o formato mais fácil de ditar por telefone e de meter no Google Maps.
- **Graus, minutos, segundos**: 38°43'24"N 9°08'22"O. Usado em cartas de papel.
- Ao dar a posição ao 112, diz também o que vês (estrada, rio, aldeia, marco).
- Portugal continental fica entre 37 e 42° N e 6 e 9,5° O. Se o teu GPS diz outra coisa, está errado.

## Ler um mapa

- **Orienta o mapa**: roda-o até o norte do mapa coincidir com o norte da bússola. Assim o que está à tua direita no mapa está à tua direita no terreno.
- **Escala**: 1:25 000 significa que 1 cm no mapa são 250 m no terreno; 1:50 000, 500 m.
- **Curvas de nível**: linhas juntas = íngreme; afastadas = plano. Os números dizem a altitude. Um "V" nas curvas a apontar para cima é um vale (com ribeira); a apontar para baixo é uma crista.
- Estima o tempo: 4 km por hora em plano, mais **1 hora por cada 300 m de subida**, e reduz 30 a 50% com mau tempo, carga ou crianças.
- Identifica **3 pontos de referência** (torre, cume, cruzamento, linha de alta tensão) e liga-os no mapa: sabes onde estás.

## Deslocar-se

- Escolhe **linhas condutoras**: estradas, linhas de comboio, rios, cristas, linhas de alta tensão. Difícil de perder.
- **Ponto de paragem**: um obstáculo depois do destino (rio, estrada) que te avisa que passaste.
- Marca a hora e o rumo de cada troço. Se te enganares, volta atrás até ao último ponto certo (não improvises atalhos).
- Conta passos: 100 m são cerca de 65 passos duplos (conta só o pé direito). Serve na neve, nevoeiro, noite.
` },

    { id: 'caminhar', icon: '🥾', title: 'Deslocação a pé', desc: 'Evacuar a pé, quanto andas por dia, ritmo, pés, carga, obstáculos.', md: `
## Quanto se anda

- Adulto em forma com mochila leve: **20 a 30 km por dia** em estrada; 10 a 15 km em montanha. Com crianças, idosos ou carga: metade.
- Ritmo: 4 km/h em plano. **Faz pausas de 10 minutos por hora**, sentado, pés levantados, come e bebe algo.
- Começa cedo, evita as horas de calor (12 h às 16 h no verão), chega ao abrigo 2 h antes de anoitecer.

## Pés

São o teu veículo. Uma bolha infetada pode parar tudo.

- Calçado **já usado**, fechado, com meias de lã ou sintéticas (não algodão). Meias de reserva; troca-as ao meio do dia e seca as outras na mochila.
- Ao primeiro ponto quente na pele, **para** e cobre com adesivo ou penso de bolhas. Não esperes que a bolha se forme.
- Corta as unhas antes. Talco ou vaselina em zonas de fricção.
- À noite, pés descalços e secos. Verifica-os.

## Carga

- Máximo **20 a 25% do peso do corpo** (15 kg para 70 kg). Menos com crianças.
- Peso pesado junto às costas e ao meio; leve em baixo e em cima. Cintas apertadas: o peso vai para as ancas, não para os ombros.
- Um carrinho de compras, de bebé ou de mão leva muito mais peso em estrada.
- Se tens de largar coisas: água, comida e abrigo ficam; o resto vai.

## Água e comida em marcha

- Bebe 200 a 250 ml de 20 em 20 minutos ao calor. 3 a 5 L por dia. Sabe onde vais reabastecer (fontes, ribeiras, aldeias) e leva meios de [purificar](#/s/agua/purificar).
- Come pouco e muitas vezes: frutos secos, bolachas, barras. Sal se transpirares muito.

## Perigos

- **Trânsito**: caminha do lado esquerdo (de frente para os carros), fora da faixa, com roupa clara ou refletor. À noite, lanterna acesa.
- **Cabos elétricos, pontes e edifícios danificados**: contorna.
- **Rios**: não atravesses água acima do joelho ou com corrente forte. Desaperta a mochila, cara para montante, um pau como terceiro apoio, atravessa em diagonal para jusante. Em grupo, de braços dados.
- **Multidões e filas**: mantém as crianças pela mão, não pelo pulso solto. Ponto de encontro.
- **Cães soltos**: não corras, não olhes nos olhos, de lado, fala calmo, recua devagar.
- **Calor e frio**: ver [extremos](#/s/agora/extremos).

## Com crianças

Ritmo delas. Metas curtas ("até àquela árvore"). Uma tarefa (ser o "guia", contar os postes). Água e lanches à mão. Nome e telefone escritos num cartão no bolso e no braço.

## Com bicicleta

Leva 3 a 4 vezes mais longe do que a pé com o mesmo esforço, passa por onde carros não passam, e transporta carga em alforges ou atrelado. Kit de remendos, bomba, luzes. É o melhor veículo de evacuação urbana quando as estradas param.
` }
  ]
});
