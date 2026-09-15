# Safety & Security — guia de emergência offline

Uma app num único ficheiro (`index.html`) com tudo o que pode ser útil numa falha de serviços, catástrofe ou conflito: guias de ação imediata, primeiros socorros, água, comida, abrigo, comunicações, orientação, conflito armado, saúde, checklists interativas, ferramentas (notícias e alertas com internet, mapas, lanterna, SOS, apito, Morse, metrónomo de RCP, bússola, GPS, temporizador, calculadoras) e um cofre encriptado para documentos.

Funciona **sem internet, sem instalação e sem conta**. Todos os dados ficam no dispositivo. Só usam a internet, e só quando as usas, a página «Notícias e alertas» e o mapa (fundo detalhado, alertas, zonas para guardar e Google Maps).

### Português e inglês

A app está em português e em inglês. A língua escolhe-se em Definições › «Idioma · Language» ou no menu lateral («🌐 English» / «🌐 Português»); a app recarrega na língua escolhida e os dados guardados ficam iguais, incluindo as checklists já marcadas. Um endereço com `?lang=en` no fim abre logo em inglês, o que dá jeito para partilhar com quem não fala português. A versão inglesa é o mesmo guia para quem vive em Portugal: o 112, o SNS 24, o IPMA e a Proteção Civil continuam lá, com uma explicação curta em inglês.

### Adaptada à família

Na primeira abertura, a app pergunta quem é a família: quantos adultos, as crianças (idade e, se quiseres, nome, menina ou menino e peso) e os animais. Tem um botão para abrir logo o modo emergência, e os atalhos diretos (SOS, lanterna, 112) nunca passam por essa pergunta. Com «Agora não», os guias usam um exemplo (2 adultos e crianças de 2 e 7 anos) e a pergunta volta na abertura seguinte.

A partir daí tudo sai do **perfil da família** (Os meus dados › Perfil da família), que se pode alterar a qualquer momento: nomes, menina ou menino, idades, pesos, alergias, telefones e animais. Os guias da família foram escritos para uma criança pequena (até aos 4 anos) e outra em idade escolar (5 anos ou mais): o que fala de uma criança ou de um segundo adulto que a família não tem não aparece (a linha, a secção, a coluna da tabela ou a página). A partir do perfil a app calcula:

- água, comida, fraldas e leite para 3 dias e 2 semanas, nos guias, nos kits e na calculadora de reservas;
- as doses de paracetamol (ex.: Ben-u-ron, em xarope, supositório ou comprimido), ibuprofeno (ex.: Brufen), soro oral, cetirizina, desloratadina, iodeto de potássio e adrenalina, de cada criança do perfil ou de qualquer peso e idade, com o máximo por dia e o registo das tomas (ferramenta «Doses para crianças»);
- a secção «A nossa família», com guias escritos para a criança de 2 anos e para a de 7 (febre, escola e creche, evacuar, manter calmas, casa segura);
- cartões de identificação das crianças para imprimir, e o plano familiar com os campos de escola, pessoas autorizadas e «quem leva quem».

Os textos usam o nome das crianças quando o perfil tem o nome e o sexo; sem isso falam de «a mais nova» e «a mais velha».

### Imagens e proteção

- Mais de 25 diagramas em SVG dentro do próprio ficheiro (RCP, posição lateral, engasgamento, torniquete, AVC, sismo, extintor, gás, abrigo, radiação, filtros de água, orientação, sinais de socorro, proteção da casa). Seguem o tema escuro, claro ou vermelho e imprimem bem.
- Secção «Proteção e defesa»: não ser alvo, reforçar a casa, pilhagens, intrusões, estrada e saqueadores, organizar a rua, esconder reservas, objetos, barreiras e alarmes que se podem construir e usar legalmente, a lei da legítima defesa, proteger as crianças, obter recursos sem pilhar e o que fazer depois de uma agressão. Não inclui instruções para fabricar armas ou armadilhas: são armas proibidas em Portugal e perigosas para a família.
- Secção «Comida da natureza»: lei e prioridades, pesca de sobrevivência com material improvisado, laços e nassas (só em emergência real), o caminho legal para caçar e a segurança com armas, preparar e conservar a caça, plantas silvestres de Portugal e os sósias venenosos, horta rápida e pequenos animais.

### Para agir numa emergência

- **Modo emergência**: escolhes a situação (não respira, hemorragia, engasgamento, convulsão, alergia grave, AVC ou dor no peito, criança desaparecida, incêndio, sismo, incêndio rural, cheia, apagão, ataque, nuclear ou químico, evacuação) e a app mostra um passo de cada vez, com perguntas, temporizadores, leitura em voz alta, a posição GPS para dizer ao 112, os dados da família (doses, plano, rádio da zona) e um registo com as horas para o INEM. Os passos resumem os guias e estão em `src/content/11-guias.js` e `12-guias.js`.
- **Mensagens sem internet**: SMS prontos com a localização, as frequências da Antena 1 por zona (fonte: RTP), o canal PMR446 da família, códigos QR feitos no telemóvel (contacto, ponto guardado, plano, endereço da app) e um bilhete para deixar à família.
- **Ficha médica de emergência** de cada pessoa, para mostrar num toque, imprimir ou transformar numa imagem para o ecrã de bloqueio.
- **Modo apagão**: conta o tempo sem luz e diz até quando o frigorífico (4 horas) e o congelador (24 ou 48 horas) são seguros.
- **Nível de preparação**: percentagem com o que falta (kit, mala, plano, ficha médica, validades, cópia de segurança, alertas, mapas, rádio, simulacros) e simulacros para treinar em família.
- **Perto de mim** e o cartão **Situação agora** no início: avisos do IPMA da zona, risco de incêndio, sismos a menos de 300 km, centrais nucleares mais próximas e catástrofes à volta.

### Alertas no telemóvel (GitHub e ntfy)

`tools/alertas.mjs` corre no GitHub Actions de 10 em 10 minutos (`.github/workflows/alertas.yml`), verifica o IPMA (avisos e risco de incêndio), o EMSC, o GDACS e o USGS, e envia notificações para a app gratuita [ntfy](https://ntfy.sh) quando há algo novo nas zonas escolhidas. Para ativar:

1. Na app, abre «Alertas no telemóvel», escolhe as zonas, subscreve o tópico na app ntfy e envia a notificação de teste.
2. Carrega `tools/alertas.mjs` e `.github/workflows/alertas.yml` para o repositório (com o GitHub Desktop vão juntos com o resto: ver «Publicar no GitHub com o GitHub Desktop»).
3. Em Settings › Secrets and variables › Actions, separador Secrets, cria os segredos `NTFY_TOPICO` e `ALERTAS_CONFIG` (a app mostra os dois valores). Como segredos, não aparecem nos registos das execuções, que num repositório público qualquer pessoa pode ver.
4. Em Actions › Alertas, carrega em «Run workflow».

As notificações saem na língua da app no momento em que copiaste a `ALERTAS_CONFIG`: em inglês, a configuração leva `"idioma":"en"`. Se mudares a língua da app, atualiza o segredo no GitHub.

O estado com os alertas já enviados fica no ramo `alertas`, só com resumos (hash). Os registos do GitHub não mostram o tópico nem as zonas. Para ver as notificações sem as enviar: `ALERTAS_CONFIG='{"zonas":["LSB"]}' node tools/alertas.mjs --seco`.

### Preparar o iPhone

A ferramenta «Preparar o iPhone» liga, passo a passo, as funções de emergência que o telemóvel já tem: SOS de emergência com chamada silenciosa, contactos de emergência, ficha médica no ecrã bloqueado, demonstração do SOS via satélite e deteção de acidentes (iPhone 14 ou mais recente), alertas do governo, reconhecimento de sons (alarmes de fumo e sirenes), exceção de emergência para as chamadas da família, localização partilhada, Check In, chamadas por Wi-Fi, segunda operadora por eSIM, carregar outro telemóvel pelo cabo e proteção de dispositivo roubado. Traz também receitas para a app Atalhos: um SMS de ajuda com as coordenadas GPS, que funciona sem internet e se dispara com a Siri, com um toque duplo nas costas ou com o botão de ação. As funções essenciais contam para o nível de preparação, e o modo emergência mostra dicas próprias quando é aberto num iPhone.

### Notícias e alertas (com internet)

A página «Notícias e alertas» tem seis separadores e guarda a última versão para ler sem rede:

- **Portugal**: avisos meteorológicos do IPMA (com a tua zona em destaque), risco de incêndio rural por distrito e sismos do golfo de Cádis aos Açores (EMSC).
- **Alertas no mundo**: catástrofes com alerta laranja ou vermelho (GDACS, Comissão Europeia e ONU), sismos de magnitude 6 ou mais (USGS) e surtos de doenças (OMS).
- **Notícias**: manchetes da RTP, Público, Observador, CNN Portugal, ECO, Euronews, ONU News, ECDC, BBC, The Guardian, France 24 e DW, com filtro por tema.
- **Vídeo**: canais de notícias em direto (Euronews em português, DW News, France 24, euronews, Al Jazeera e Sky News, pelo YouTube sem cookies), ligações para os diretos da RTP3 e da CNN Portugal, e os vídeos das últimas 72 horas desses canais, que vêm do resumo.
- **Resumo do dia**: o portal de acontecimentos da Wikipédia, com a fonte de cada frase.
- **Fontes**: critérios, estado de cada fonte e privacidade.

O IPMA, o EMSC, a USGS, o GDACS, a OMS, a DW e a Wikipédia deixam a app ler os dados diretamente. Os sites portugueses não deixam, por isso as manchetes portuguesas vêm de um **resumo** gerado por `tools/noticias.mjs`. Para o ativar no GitHub:

1. Carrega `tools/noticias.mjs` e `.github/workflows/noticias.yml` para o repositório da app (com o GitHub Desktop vão juntos com o resto).
2. No separador «Actions», abre o fluxo «Notícias» e carrega em «Run workflow».
3. O fluxo corre a cada 30 minutos e publica `noticias.json` no ramo `noticias`. A app aberta em `https://<conta>.github.io/<repositório>/` encontra-o sozinha; noutros sites, o endereço escreve-se no separador Fontes.

Num repositório público, o GitHub desliga os fluxos agendados ao fim de 60 dias sem atividade; a app avisa quando o resumo está desatualizado. Também se pode gerar o ficheiro à mão:

```
node tools/noticias.mjs noticias.json
```

### Mapas

A ferramenta «Mapas» junta:

- **Fundo detalhado (com internet)**: ruas, nomes e edifícios como nos mapas da web, em três estilos: OpenStreetMap, humanitário (HOT, alojado pela OpenStreetMap France) e OpenTopoMap (relevo e trilhos). Por cima ficam a posição GPS, os pontos guardados, as cores dos avisos e os eventos. Com a app instalada, as zonas já vistas ficam guardadas para ver sem rede (até 2500 quadrículas, renovadas ao fim de 30 dias).
- **Google Maps e Apple Maps**: o botão «Google Maps» mostra o Google Maps (mapa ou satélite) no mesmo sítio, dentro da app. Cada ponto tem «Abrir no Google Maps», «Abrir no Apple Maps» e «Como chegar», que abrem as apps do telemóvel; essas funcionam sem rede nas zonas descarregadas lá.
- **Sem internet**: o mapa de Portugal (continente, Açores e Madeira) está dentro do próprio ficheiro, com distritos, autoestradas e vias rápidas, rios e cidades. As zonas guardadas do OpenStreetMap (Overpass API), de 2 × 2 km a 10 × 10 km, trazem as ruas e os pontos úteis numa emergência e ficam no dispositivo (IndexedDB).
- **Mapa do mundo com eventos**: catástrofes com alerta laranja ou vermelho (GDACS), sismos de magnitude 4,5 ou mais (USGS), sismos perto de Portugal (EMSC) e surtos de doenças (OMS, marcados no país). O botão «Atualizar alertas» vai buscar os dados mais recentes; sem rede, o mapa mostra os últimos guardados.

O Google não deixa guardar os mapas dele dentro de outras apps nem usá-los sem rede, e as regras do OpenStreetMap, da OpenStreetMap France e do OpenTopoMap não permitem descarregar quadrículas em bloco. Para mapas completos sem internet, a página «Orientação › Mapas, coordenadas e GPS» explica como descarregar zonas no Google Maps, no Apple Maps e no Organic Maps. Estes servidores vivem de voluntários e doações: servem para uso pessoal e com pouco tráfego, não para uma app distribuída a milhares de pessoas. O mapa-base é gerado por `tools/mapa_base.py` a partir do Natural Earth (domínio público) e do OpenStreetMap (© colaboradores, licença ODbL).

## Usar

### No PC ou numa pen USB
Abre `index.html` com qualquer browser (Chrome, Edge, Firefox, Safari). Não precisa de servidor. Copia a pasta inteira (ou só o `index.html`) para uma pen: abre em qualquer computador.

### No telemóvel
Há três formas, da mais simples à melhor:

1. **Abrir o ficheiro diretamente.** Envia o `index.html` para o telemóvel (email, WhatsApp, Bluetooth, cabo) e abre-o com o Chrome (Android) ou com o Safari/Ficheiros (iOS). Funciona, mas o browser pode não guardar os teus dados entre sessões em iOS.
2. **Servir na rede local e instalar.** No PC, dentro desta pasta:
   ```
   python -m http.server 8080
   ```
   ou
   ```
   npx serve .
   ```
   No telemóvel, na mesma rede Wi-Fi, abre `http://<IP-do-PC>:8080`. Em Android/Chrome aparece a opção «Instalar app» (ou menu › «Adicionar ao ecrã principal»). Nota: em `http://` que não seja localhost o cofre encriptado fica desativado pelo browser (Web Crypto exige contexto seguro).
3. **Publicar por HTTPS (recomendado).** Coloca a pasta no GitHub Pages (passo a passo em «Publicar no GitHub com o GitHub Desktop», mais abaixo), Netlify, Cloudflare Pages ou num servidor com HTTPS. Abre no telemóvel, instala como app (PWA). O service worker guarda tudo em cache e a app continua a funcionar sem rede, com cofre, GPS e todas as ferramentas.

### Cópia de segurança
Em «Os meus dados › Cópia de segurança» exporta um ficheiro `.json` com checklists, plano, contactos, inventário, notas, pontos GPS e o cofre (que vai encriptado). Guarda-o numa pen e noutro telemóvel. Importa no mesmo sítio.

## Publicar no GitHub com o GitHub Desktop

O GitHub Pages aloja a app de graça e com HTTPS, e o GitHub Actions corre o resumo de notícias e os alertas. A app GitHub do iPhone não carrega ficheiros: publica-se uma vez a partir do PC com a app **GitHub Desktop**, e depois o iPhone só precisa do endereço.

**Primeira vez**

1. Cria uma conta em [github.com](https://github.com), se ainda não tens. Instala o GitHub Desktop a partir de [desktop.github.com](https://desktop.github.com), abre-o e entra com a conta (File › Options › Accounts › Sign in).
2. Em **File › Add local repository… › Choose…**, escolhe esta pasta (a que tem o `index.html`). O GitHub Desktop avisa que ainda não é um repositório: carrega em **create a repository**, desmarca «Initialize this repository with a README» (já existe um) e carrega em **Create repository**.
3. Se o separador **Changes** mostrar ficheiros, escreve um resumo em baixo à esquerda (por exemplo «Primeira versão») e carrega em **Commit to main**.
4. Carrega em **Publish repository**. Muda o nome para `safety-security`, **desmarca «Keep this code private»** e confirma. O GitHub Pages grátis e os minutos ilimitados do Actions precisam de um repositório público; nenhum dado da família está nestes ficheiros, porque tudo o que escreves na app fica só no telemóvel.
5. No browser, abre o repositório em github.com › **Settings › Pages**. Em «Build and deployment» escolhe **Deploy from a branch**, o ramo **main** e a pasta **/ (root)**, e carrega em **Save**. Ao fim de um ou dois minutos a app fica em `https://<conta>.github.io/safety-security/`.
6. Alertas no telemóvel (opcional): em **Settings › Secrets and variables › Actions**, carrega em **New repository secret** e cria os segredos `NTFY_TOPICO` e `ALERTAS_CONFIG`, com os valores que a ferramenta «Alertas no telemóvel» mostra.
7. No separador **Actions**, abre «Notícias» e carrega em **Run workflow**; faz o mesmo em «Alertas». Daí em diante correm sozinhos.
8. No iPhone, abre o endereço no **Safari** › botão Partilhar › **Adicionar ao ecrã principal**. Abre a app pelo ícone uma vez com rede, para ficar guardada para usar sem internet.

**Atualizar a app**

1. Depois de mudar os guias ou o código, corre `node build.js`.
2. No GitHub Desktop, os ficheiros alterados aparecem em **Changes**: escreve um resumo, carrega em **Commit to main** e depois em **Push origin**.
3. O GitHub Pages publica a nova versão em um ou dois minutos. No iPhone, a app atualiza-se na próxima vez que abrir com rede: mostra o aviso «Nova versão instalada» com o botão «Atualizar agora».

Os fluxos guardam os resultados nos ramos `noticias` e `alertas`: não os apagues. Se o GitHub desligar os fluxos agendados por falta de atividade, volta a ligá-los no separador Actions.

## Editar o conteúdo

O conteúdo está em `src/content/*.js`, um ficheiro por secção, em Markdown simplificado dentro de template strings. Depois de editar:

```
node build.js
```

gera de novo o `index.html` (e o `sw.js` com nova versão). Regras do Markdown usado:

- `## Título`, `### Subtítulo`
- listas com `-` ou `1.`; checklists com `- [ ] item` (o estado fica guardado)
- avisos: `>! aviso`, `>x perigo`, `>i informação`, `>+ dica`, `> nota`
- tabelas com `| a | b |` e linha `|---|---|`
- `**negrito**`, `[ligação](#/s/seccao/pagina)`, `[ferramenta](#/t/id)`
- não usar o carácter de acento grave nem `${` dentro do texto

Cada página pode ter `tools: ['id']` para mostrar atalhos para ferramentas.

A versão inglesa está em `src/content-en/*.js`, com os mesmos ids de secções e páginas; ícones, ordem, figuras e ferramentas vêm da versão portuguesa, e uma página sem tradução aparece em português. Ao mudar uma página, muda as duas línguas, e mantém em cada checklist os mesmos itens pela mesma ordem (as marcações ficam guardadas nos itens portugueses). Os passos do modo emergência em inglês estão em `src/content-en/11-guias.js` e `12-guias.js`, alinhados passo a passo; os textos das figuras, em `05-figuras.js`. Nas ferramentas, cada texto está no código como `L('português', 'English')`.

Antes de publicar, depois de `node build.js`, corre os verificadores: `node tools/verificar.js` (sintaxe, ligações, figuras, tokens da família e passos do modo emergência) e `node tools/verificar-en.js` (versão inglesa: estrutura, checklists, ligações, tokens e restos de português; `--detalhe` mostra os avisos).

A app chamava-se Preparado. Os nomes internos (o prefixo `prep.` no localStorage, a base IndexedDB `preparado`, as caches do service worker e a verificação do cofre) ficaram com o nome antigo para não se perderem os dados de quem já a usa, e as cópias de segurança antigas continuam a importar.

## Estrutura

```
safety-security/
  index.html            ← a app inteira, gerada (é o único ficheiro obrigatório)
  sw.js                 ← service worker (só usado quando servido por HTTP/HTTPS)
  manifest.webmanifest  ← instalação como app
  icon.svg, icon-192.png, icon-512.png
  build.js              ← gera index.html a partir de src/
  tools/noticias.mjs    ← junta as manchetes e os vídeos em noticias.json (GitHub Actions ou à mão)
  tools/mapa_base.py    ← gera o mapa-base de Portugal e do mundo (src/content/09-mapa-base.js)
  tools/alertas.mjs     ← alertas no telemóvel (GitHub Actions e ntfy)
  tools/verificar.js, tools/verificar-en.js ← verificações antes de publicar
  .github/workflows/noticias.yml ← atualiza o resumo de notícias a cada 30 minutos
  .github/workflows/alertas.yml  ← verifica os alertas de 10 em 10 minutos
  src/
    shell.html          ← estrutura HTML
    style.css           ← estilos (temas escuro, claro e vermelho noturno)
    app.js              ← lógica: router, markdown, checklists, ferramentas, cofre, backup, língua
    ferramentas/        ← ferramentas em ficheiros próprios, inseridas em app.js pelo build (modo emergência, mensagens, ficha médica, apagão, preparação, alertas, iPhone)
    sw.js               ← fonte do service worker
    content/            ← guias, um ficheiro por secção
    content-en/         ← versão inglesa dos guias, dos passos do modo emergência, das figuras e dos nomes dos países
```

## Privacidade e segurança

- Nenhum dado pessoal sai do dispositivo. Não há analytics nem contas.
- Só usam a internet, e só quando as usas: a página «Notícias e alertas» (IPMA, EMSC, USGS, GDACS, OMS, DW, Wikipédia, o resumo de notícias e, no separador Vídeo, o YouTube pelo endereço youtube-nocookie.com) e o mapa: o fundo detalhado (OpenStreetMap, OpenStreetMap France ou OpenTopoMap, que recebem o pedido das quadrículas da zona que estás a ver), o botão «Atualizar alertas» (as mesmas fontes oficiais), as zonas para guardar (Overpass API do OpenStreetMap, que recebe só as coordenadas do retângulo pedido) e o Google Maps. Essas fontes veem o endereço IP como em qualquer site.
- Os botões «Google Maps», «Abrir no Google Maps», «Abrir no Apple Maps» e «Como chegar» enviam à Google ou à Apple as coordenadas do ponto. Só acontece quando tocas neles.
- Os alertas no telemóvel passam pelo GitHub e pelo ntfy.sh, que recebem as zonas e o tópico escolhidos e mais nada. O tópico e a configuração ficam como segredos do GitHub e não aparecem nos registos.
- Num repositório público, qualquer pessoa pode ver o código e os guias (como em qualquer site: o código de uma app web vai para o browser de quem a abre), mas só o dono e quem ele convidar podem alterar o repositório. Ninguém consegue mudar a app sem a tua autorização; ativa a autenticação de dois fatores na conta do GitHub.
- O cofre usa AES-256-GCM com chave derivada da palavra-passe por PBKDF2-SHA256 (250 000 iterações), via Web Crypto do browser. A palavra-passe nunca é guardada. Sem ela, os dados são irrecuperáveis.
- A leitura em voz alta usa o motor de voz do próprio dispositivo (pode não estar disponível offline em todos os telemóveis).

## Aviso

Este guia não substitui os serviços de emergência, os médicos nem as autoridades. Em perigo de vida liga **112**. A informação é um resumo de recomendações públicas (INEM, ERC, Proteção Civil, OMS, Comissão Europeia, entre outras); confirma sempre com fontes oficiais quando possível e faz um curso de primeiros socorros.
