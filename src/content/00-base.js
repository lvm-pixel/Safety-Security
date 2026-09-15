/* Conteúdo base. Cada ficheiro em src/content/ acrescenta secções a CONTENT.sections.
   Formato do texto: Markdown simplificado.
   - "## Título", "### Subtítulo"
   - listas com "-" ou "1.", checklists com "- [ ] item" (ficam guardadas)
   - ">! aviso", ">x perigo", ">i informação", ">+ dica", "> nota"
   - tabelas com | colunas |
   - **negrito**, *itálico*, [ligação](#/s/seccao/pagina)
   Não usar o carácter de acento grave (`) nem "${" dentro do texto. */
const CONTENT = {
  sections: [],
  about: `
## O que é isto

**Safety & Security** é um guia de emergência e sobrevivência que funciona totalmente offline, num único ficheiro, sem instalação, sem conta e sem enviar dados para lado nenhum. Foi feito para estar num telemóvel, num PC ou numa pen USB quando a rede, a eletricidade ou os serviços falham.

Tudo o que escreves (checklists, plano, inventário, notas, cofre) fica **apenas neste dispositivo e neste browser**. Faz [cópias de segurança](#/t/backup).

A app está adaptada à família descrita no [perfil da família](#/t/familia): as quantidades de água e comida, as doses das crianças, os cartões de identificação e os guias da secção «A nossa família» são calculados a partir dele.

## Avisos importantes

>x **Em perigo de vida, liga 112.** Este guia não substitui os serviços de emergência, os médicos, a Proteção Civil nem as autoridades. Segue sempre as instruções oficiais quando existirem.

- A informação de primeiros socorros segue as recomendações gerais europeias (ERC/INEM) mas é um resumo. Faz um curso presencial: é o melhor investimento que podes fazer.
- Doses de medicamentos e de lixívia são indicativas para adultos saudáveis. Confirma no rótulo e com um profissional sempre que possível.
- A app não sabe onde estás nem o que está a acontecer. Usa bom senso e adapta.
- Os autores não assumem responsabilidade pelo uso desta informação. Usa-a por tua conta e risco.

## Como manter útil

- Revê o conteúdo e o plano familiar de **6 em 6 meses** (dica: quando mudas a hora).
- Imprime as páginas críticas (primeiros socorros, números, plano) e guarda-as no kit. O papel não precisa de bateria.
- Partilha o ficheiro com a família e os vizinhos.

## Privacidade e segurança

- Sem rastreio e sem contas. O código está no próprio ficheiro e pode ser lido por qualquer pessoa.
- Só usam a internet, e só quando as usas, a página [Notícias e alertas](#/t/noticias), o [mapa](#/t/mapa) e o botão Atualizar de «Situação agora» e de [Perto de mim](#/t/perto). O fundo detalhado do mapa vem do OpenStreetMap, da OpenStreetMap France ou do OpenTopoMap, que recebem o pedido das quadrículas da zona que estás a ver. «Atualizar alertas» liga-se às fontes oficiais e «Descarregar zona» envia ao OpenStreetMap só as coordenadas do retângulo pedido. Todos veem o endereço IP, como em qualquer site, e nunca recebem nomes nem dados da família.
- Os botões «Google Maps», «Abrir no Google Maps», «Abrir no Apple Maps» e «Como chegar» enviam à Google ou à Apple as coordenadas do ponto. Só acontece quando tocas neles.
- Os [alertas no telemóvel](#/t/alertas) passam pelo GitHub e pelo ntfy.sh, que recebem as zonas e o tópico escolhidos e mais nada. A notificação de teste sai daqui diretamente para o ntfy.sh.
- Os SMS, a ficha médica, a imagem para o ecrã de bloqueio e os códigos QR fazem-se no próprio telemóvel, sem internet.
- O separador Vídeo mostra miniaturas e vídeos do YouTube. As miniaturas carregam quando abres o separador e os vídeos só quando tocas neles, pelo endereço youtube-nocookie.com.
- O cofre usa AES-256-GCM com chave derivada por PBKDF2 (250 000 iterações) via Web Crypto do browser. A palavra-passe nunca é guardada. Se a perderes, o conteúdo é irrecuperável.
- Se o dispositivo for partilhado ou puder ser apreendido, bloqueia o cofre e pondera não guardar nele dados que te ponham em risco.

## Fontes e referências gerais

Proteção Civil (ANEPC), INEM, SNS 24, IPMA, Cruz Vermelha, Organização Mundial da Saúde, Comissão Europeia (estratégia de preparação, kit de 72 horas), guias de defesa civil de vários países, FEMA/ready.gov, CDC. Consulta as páginas oficiais destas entidades quando tiveres internet.
`,
  battery: `
## Fazer a bateria durar dias

- **Modo de poupança de energia** ligado (ou modo ultra, se existir).
- **Modo de voo** quando não precisas de rede; liga só de hora a hora para ver mensagens. Sem rede, o telemóvel gasta muito à procura de sinal.
- Brilho no mínimo útil. Ecrã escuro (esta app tem tema escuro e vermelho).
- Desliga Wi-Fi, Bluetooth, GPS, dados móveis, sincronizações e apps em segundo plano.
- Não uses o telemóvel como lanterna durante muito tempo: usa uma lanterna a pilhas.
- Frio extremo esgota a bateria: mantém o telemóvel junto ao corpo.
- Não deixes descarregar totalmente; carrega quando houver oportunidade, mesmo que pouco.
- Powerbank: carrega-a todos os meses; 10 000 mAh dão 2 a 3 cargas completas.
- No carro, carrega com o motor ligado (10 min a cada hora chegam). Nunca em garagem fechada.
- SMS gasta menos do que chamadas e passa em redes congestionadas.

## Fontes de energia alternativas

- Painel solar dobrável de 10 a 20 W: carrega um telemóvel em 2 a 4 horas de sol direto.
- Carregador de dínamo (manivela): 1 minuto de manivela dá cerca de 1 minuto de conversa. Cansativo mas fiável.
- Bateria de carro 12 V com inversor ou adaptador USB de isqueiro.
- Rádio a pilhas ou dínamo para receber informação: consome muito menos do que um telemóvel.
`,
  vaultHelp: `
## O que guardar no cofre

- Cartão de cidadão ou passaporte (frente e verso), carta de condução, cartão de saúde europeu.
- Apólices de seguro, contrato de arrendamento ou escritura, comprovativos de morada.
- Receitas, relatórios médicos, lista de medicação, cartão de vacinas, grupo sanguíneo.
- Contactos importantes, senhas essenciais, códigos de acesso.
- Foto recente de cada membro da família (ajuda na identificação e na procura).
- Fotos dos bens da casa (para seguros).

## Boas práticas

- Palavra-passe longa (uma frase com 4 ou 5 palavras) que só tu e uma pessoa de confiança saibam.
- Guarda também cópias em papel num saco estanque, e uma cópia encriptada (a exportação) numa pen ou noutro telemóvel.
- Bloqueia o cofre quando acabas. Bloqueia sozinho após 5 minutos.
`
};
