/* Página extra da secção Proteção e defesa, inserida antes de "O que diz a lei". */
(function () {
  const sec = CONTENT.sections.find(s => s.id === 'protecao'); if (!sec) return;
  const i = sec.pages.findIndex(p => p.id === 'lei');
  sec.pages.splice(i < 0 ? sec.pages.length : i, 0, {
    id: 'objetos', icon: '🧱', title: 'Objetos, barreiras e alarmes', desc: 'O que podes construir e usar para te defenderes dentro da lei: barreiras, alarmes, bordão, spray de pimenta, objetos do dia a dia, soltar-se e fugir.', md: `
>! A lei das armas trata como **arma proibida** um objeto feito só para servir de arma de agressão: fabricá-lo e tê-lo em casa já é crime, mesmo sem o usar. Por isso aqui não há lanças, facas, soqueiras nem armadilhas. Há o que é legal, o que funciona e o que não se volta contra a tua família.

## Barreiras que se constroem numa tarde

- **Barra de porta**: dois suportes metálicos em U aparafusados à parede, um de cada lado da porta, com parafusos de 8 cm em buchas, e uma tábua de pinho de 5 × 10 cm que encaixa nos dois. Aguenta os pontapés e empurrões que rebentam uma fechadura. Ver o [desenho da porta](#/s/protecao/casa).
- **Calço de porta**: uma cunha de madeira dura ou de borracha, empurrada com o pé para baixo da porta, pelo lado de dentro. Custa pouco e trava muito.
- **Cadeira**: o topo das costas encaixado por baixo do puxador, as pernas de trás bem assentes. Funciona melhor em chão que não escorrega.
- **Móveis**: uma cómoda ou uma estante cheia arrastada para a frente de uma porta que abre para dentro.
- **Janelas do rés-do-chão**: contraplacado de 15 mm aparafusado ao aro **por dentro**, com uma parte que se tira à mão para haver saída num incêndio.
- **Película de segurança** nos vidros: segura os estilhaços e atrasa quem quer partir.

>x **Nunca bloqueies todas as saídas.** Cada divisão onde se dorme precisa de uma saída que se abra em segundos, por dentro e às escuras, e que {{c2}} saiba abrir. O fogo e o fumo matam muito mais do que os intrusos.

## Alarmes improvisados

![Alarmes com latas e garrafas](fig:alarme-latas)

- Latas com pedrinhas atadas à maçaneta, ou uma pirâmide de latas encostada à porta por dentro.
- Uma garrafa de vidro em pé encostada à janela ou à porta de vidro: cai e parte-se quando abrem.
- Sinos ou um molho de chaves pendurados na porta das traseiras.
- Calço de porta com sirene (a pilhas, barato) e luzes solares com sensor de movimento.
- Gravilha no chão junto às janelas e às portas de fora.
- **Nada de fios esticados** em corredores e escadas: quem tropeça à noite é a tua família.

## Bordão

Um pau de caminhada é legal, útil todos os dias e fácil de fazer:

1. Um pau direito de madeira dura (castanheiro, freixo, carvalho, aveleira), da altura do ombro e com 3 a 4 cm de grossura.
2. Tira a casca, deixa secar à sombra durante algumas semanas e lixa os nós.
3. Põe uma ponteira de borracha em baixo, fita ou cordão onde se pega, e uma alça.

Serve para caminhar com carga, testar a lama e o fundo da água, afastar cães, e **manter distância** entre ti e alguém enquanto recuas para uma saída.

## Objetos do dia a dia que dão tempo para fugir

A ideia é sempre **criar distância e sair**, nunca ganhar uma luta.

- **Extintor**: um jato de pó para a cara de quem ataca faz uma nuvem que cega durante segundos. Serve também de barreira.
- **Lanterna forte** (1000 lúmenes ou mais): de noite encandeia e deixa a outra pessoa sem ver.
- **Cadeira ou banco**: segura-o à frente do corpo, com as pernas viradas para a pessoa, e recua para a saída.
- **Mochila ou casaco**: à frente do peito e dos braços, como escudo, enquanto te afastas.
- **Apito ou alarme pessoal**: o barulho chama pessoas, e quem ataca não quer testemunhas.
- **Comando do carro**: o botão de pânico faz disparar o alarme.

## Spray de pimenta

- Legal para maiores de 18 anos, dentro dos limites da lei das armas (compra em armeiro). Confirma as regras atuais na PSP.
- **Como usar**: braço esticado, jatos curtos de 1 segundo para a cara, a 1 a 3 metros, e **sair logo**, de lado, sem ficar a ver.
- Vê o vento. Num espaço fechado também te atinge a ti. Nunca perto das crianças, a não ser como último recurso.
- Tem prazo de 2 a 4 anos: uma vez por ano, testa um jato curto ao ar livre, e troca-o quando expirar.
- Guarda-o fora do alcance das crianças: nos olhos de uma criança é uma urgência.

## Soltar-se e fugir

Um curso de autodefesa ensina isto em poucas horas, e é o que mais vale a pena. O essencial:

- **Grita "Afasta-te!"** com voz forte e as mãos abertas à frente do corpo: pareces defensivo a quem estiver a ver, e ganhas espaço.
- Se te agarrarem pelo pulso, **roda o braço para o lado do polegar** da outra pessoa, onde a mão é mais fraca, e puxa com força.
- Sem outra saída: olhos, nariz, garganta, joelhos e virilha são os pontos que fazem largar. **Só para te soltares**, e foge logo.
- Depois: 112, [primeiros socorros](#/s/socorros) a quem precisar, e [o que diz a lei](#/s/protecao/lei).

## O que fica de fora, e porquê

- **Armas de fogo caseiras, explosivos e bombas incendiárias**: crime grave, e matam sobretudo quem os faz e quem está perto, incluindo crianças.
- **Armadilhas** com pregos, vidros, fios ou choques: crime, e apanham bombeiros, vizinhos e a tua família.
- **Facas e lanças "para defesa"**: são armas proibidas, e numa luta acabam muitas vezes nas mãos de quem ataca.
` });
})();
