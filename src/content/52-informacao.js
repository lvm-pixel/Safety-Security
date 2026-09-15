/* Página "Informação fiável e boatos", na secção Comunicações, a seguir a "Comunicar sem rede móvel". */
(function () {
  const sec = CONTENT.sections.find(s => s.id === 'comunicar'); if (!sec) return;
  const i = sec.pages.findIndex(p => p.id === 'sem-rede');
  sec.pages.splice(i < 0 ? sec.pages.length : i + 1, 0, {
    id: 'informacao', icon: '📰', title: 'Informação fiável e boatos', desc: 'Onde ouvir as autoridades, que fontes merecem confiança e como apanhar um boato antes de o partilhar.', tools: ['noticias'], md: `
## Primeiro, as fontes oficiais

- **SMS de alerta da Proteção Civil**: chega aos telemóveis na zona afetada, sem inscrição. Lê-o com atenção e cumpre.
- **Rádio**: a Antena 1 e as rádios locais transmitem as instruções da Proteção Civil, e funcionam sem internet nem rede móvel. Ver [rádio](#/s/comunicar/radio).
- **Proteção Civil** (prociv.gov.pt), **IPMA** (avisos meteorológicos), **DGS** e **SNS 24** (saúde), câmara municipal e junta de freguesia.
- **Portal Diplomático** e consulados, se estiveres fora de Portugal.
- A página [Notícias e alertas](#/t/noticias) junta, quando há internet, os avisos do IPMA, o risco de incêndio, os sismos e as notícias de fontes credíveis.

>! **O 112 é só para emergências.** Não liges para perguntar o que se passa: ocupas a linha de quem precisa de socorro.

## Fontes de notícias que merecem confiança

- Serviço público e agências: **RTP** e **Lusa**.
- Jornais e televisões com direção editorial identificada e que publicam correções, por exemplo **Público**, **Observador**, **Expresso**, **CNN Portugal** e **SIC Notícias**.
- Internacionais: **Reuters**, **AP**, **AFP**, **BBC**, **DW**, **Euronews** e **ONU News**.
- Verificação de factos: **Polígrafo** e **Observador Fact Check**.

Nenhuma fonte é perfeita, e todas se enganam nas primeiras horas de uma crise. Quanto mais grave a notícia, mais importa confirmá-la.

## Como apanhar um boato em 5 passos

1. **Para.** Se uma mensagem te dá medo, raiva ou pressa, é aí que tens de abrandar. É exatamente isso que os boatos procuram.
2. **Quem diz?** Um órgão de comunicação ou uma entidade oficial com nome? Ou "um amigo de um primo que trabalha no hospital"?
3. **Procura outra fonte.** Se é verdade e é grave, a rádio, a RTP ou a Proteção Civil também o dizem. Se só aparece num grupo de mensagens, desconfia.
4. **Data e local.** Fotos e vídeos antigos, ou de outro país, voltam a circular em cada crise. Procura pistas: matrículas, placas, língua, clima, estação do ano.
5. **Na dúvida, não reencaminhes.** Partilhar "só por precaução" é o que faz um boato chegar a milhares de pessoas numa hora.

## Boatos típicos numa crise

- "A água ou a luz vão faltar durante semanas: enche tudo já", sem nenhuma fonte oficial.
- "A barragem vai rebentar", "vem aí um tsunami", "vão fechar as fronteiras esta noite".
- "Estão a saquear o supermercado X", "há raptos de crianças na zona Y".
- Curas milagrosas e remédios caseiros para doenças graves.
- Mensagens falsas "da Proteção Civil", "do banco" ou "da polícia" com links, pedidos de dados ou de dinheiro.

>x **Nenhum alerta oficial pede dados pessoais, códigos ou pagamentos**, nem manda instalar aplicações por um link. Mensagens assim são burlas.

## Imagens e vídeos feitos com inteligência artificial

- Desconfia de imagens perfeitas demais, mãos e dedos estranhos, texto ilegível em cartazes, sombras incoerentes e vozes sem respiração.
- Com internet, uma pesquisa por imagem (Google Lens ou TinEye) mostra muitas vezes onde e quando a imagem apareceu pela primeira vez.
- Um vídeo chocante sem autor, sem data e sem local não é informação: é ruído.

## Em família

- Combinem em que fontes confiam e quem acompanha as notícias. Os outros descansam.
- Com crianças por perto, notícias só pela rádio ou em texto, longe dos vídeos. Ver [manter as crianças calmas](#/s/familia/ocupar-e-acalmar).
- Ver as notícias duas vezes por dia chega para decidir bem. Mais do que isso aumenta o medo e não melhora as decisões.
` });
})();
