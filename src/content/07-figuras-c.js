/* Figuras: orientação, sinais, família, proteção. (Podem usar os valores da família entre chavetas duplas.) */
Object.assign(FIGS, {

'norte-estrelas': `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M20 272 H580" opacity=".5"/>
<path class="lnt" d="M240 200 L195 188 L180 222 L220 232 Z M195 188 L150 180 L110 182 L70 200"/>
<path class="dash" style="stroke:var(--warn)" d="M220 232 L340 52"/>
<circle class="fl" cx="240" cy="200" r="4.5"/><circle class="fl" cx="220" cy="232" r="4.5"/><circle class="fl" cx="195" cy="188" r="4"/><circle class="fl" cx="180" cy="222" r="4"/><circle class="fl" cx="150" cy="180" r="4"/><circle class="fl" cx="110" cy="182" r="4"/><circle class="fl" cx="70" cy="200" r="4"/>
<circle class="wrn" cx="340" cy="50" r="8"/>
<path class="lnt" d="M440 92 L470 56 L500 86 L530 50 L560 80"/><circle class="fl" cx="440" cy="92" r="4"/><circle class="fl" cx="470" cy="56" r="4"/><circle class="fl" cx="500" cy="86" r="4"/><circle class="fl" cx="530" cy="50" r="4"/><circle class="fl" cx="560" cy="80" r="4"/>
<path class="oks" d="M340 66 V262 M340 262 l-8 -12 M340 262 l8 -12"/>
<text x="352" y="44" class="b">Estrela Polar = Norte</text>
<text x="60" y="160" class="s">Ursa Maior (caçarola)</text>
<text x="264" y="150" class="s tw">prolonga 5 vezes</text>
<text x="450" y="118" class="s">Cassiopeia (W)</text>
<text x="340" y="292" text-anchor="middle" class="l to">NORTE</text>
</svg>`,

'norte-relogio': `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<circle class="ln" cx="200" cy="150" r="90"/>
<text x="200" y="80" text-anchor="middle" class="b">12</text><text x="276" y="156" text-anchor="middle" class="s">3</text><text x="200" y="232" text-anchor="middle" class="s">6</text><text x="124" y="156" text-anchor="middle" class="s">9</text>
<path class="ln" style="stroke-width:6" d="M200 150 L252 180"/><path class="lnt" d="M200 150 L200 88"/>
<circle class="wrn" cx="324" cy="222" r="20"/><path class="dash" style="stroke:var(--warn)" d="M252 180 L306 212"/>
<path class="accs" d="M200 150 L330 75"/><text x="338" y="70" class="l ta">SUL</text>
<path class="oks" d="M200 150 L90 214"/><text x="40" y="236" class="l to">NORTE</text>
<text x="352" y="228" class="s">o ponteiro das horas aponta para o sol</text>
<text x="352" y="116" class="s">o Sul fica a meio entre esse</text><text x="352" y="132" class="s">ponteiro e as 12 horas</text>
<text x="20" y="286" class="s">Hora de verão: usa as 13 horas em vez das 12. Relógio sempre na horizontal. Só no hemisfério norte.</text>
</svg>`,

'sombra': `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<rect class="soft" x="40" y="30" width="520" height="220" rx="10" style="stroke:none"/>
<circle class="fl" cx="280" cy="220" r="7"/><text x="294" y="236" class="s">pau espetado na vertical</text>
<path class="dash" d="M280 220 L190 112 M280 220 L360 106"/>
<circle class="ln" cx="190" cy="110" r="9"/><circle class="ln" cx="360" cy="104" r="9"/>
<path class="accs" d="M204 109 L344 104 M344 104 l-12 -6 M344 104 l-12 6"/>
<text x="120" y="100" class="s b">1.ª marca</text><text x="120" y="84" class="s">Oeste</text>
<text x="372" y="96" class="s b">2.ª marca</text><text x="372" y="80" class="s">Este (15 a 30 min depois)</text>
<path class="oks" d="M276 106 V44 M276 44 l-8 12 M276 44 l8 12"/><text x="290" y="54" class="l to">Norte</text>
<text x="300" y="276" text-anchor="middle" class="s">Visto de cima. A linha da 1.ª para a 2.ª marca vai de Oeste para Este.</text>
</svg>`,

'espelho': `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<circle class="wrn" cx="70" cy="40" r="22"/><path class="dash" style="stroke:var(--warn)" d="M88 54 L118 116"/>
<circle class="head" cx="108" cy="140" r="22"/><circle style="fill:var(--bg2)" cx="118" cy="134" r="4"/>
<rect class="inf" x="128" y="112" width="10" height="40" rx="2" transform="rotate(-20 133 132)"/>
<path class="limb" d="M110 162 L150 200 M140 150 L300 128"/>
<path class="accs" style="stroke-width:5" d="M300 128 L312 106 M300 128 L322 114"/>
<path class="dash" style="stroke:var(--warn)" d="M138 126 L316 108 L520 70"/>
<path class="fl" d="M500 70 l40 -6 l6 -8 l4 0 l-2 8 l20 -2 l4 4 l-24 4 l-6 14 l-4 0 l2 -14 l-38 4 z"/>
<text x="340" y="150" class="s">1. braço esticado, dedos em V,</text>
<text x="340" y="166" class="s">    alvo entre os dedos</text>
<text x="340" y="184" class="s">2. o reflexo bate nos dedos</text>
<text x="340" y="202" class="s">3. o brilho que passa no V chega ao alvo</text>
<text x="20" y="228" class="s">Serve um espelho, um CD, uma lata polida ou o ecrã desligado do telemóvel. Vê-se a dezenas de km.</text>
</svg>`,

'sinais-solo': `<svg viewBox="0 0 600 310" xmlns="http://www.w3.org/2000/svg">
<g style="stroke-width:10" class="ln"><path class="ln" style="stroke-width:10" d="M40 40 L65 110 L90 40"/><path class="ln" style="stroke-width:10" d="M150 40 L200 110 M200 40 L150 110"/><path class="ln" style="stroke-width:10" d="M260 110 V40 L305 110 V40"/><path class="ln" style="stroke-width:10" d="M365 40 L390 75 L415 40 M390 75 V110"/><path class="ln" style="stroke-width:10" d="M475 75 H560 M535 50 L560 75 L535 100"/></g>
<text x="65" y="138" text-anchor="middle" class="s b">V</text><text x="65" y="156" text-anchor="middle" class="s">preciso de ajuda</text>
<text x="175" y="138" text-anchor="middle" class="s b">X</text><text x="175" y="156" text-anchor="middle" class="s">ajuda médica</text>
<text x="283" y="138" text-anchor="middle" class="s b">N</text><text x="283" y="156" text-anchor="middle" class="s">não</text>
<text x="390" y="138" text-anchor="middle" class="s b">Y</text><text x="390" y="156" text-anchor="middle" class="s">sim</text>
<text x="517" y="138" text-anchor="middle" class="s b">seta</text><text x="517" y="156" text-anchor="middle" class="s">fomos por aqui</text>
<path class="lnt" d="M20 176 H580" opacity=".4"/>
<g><circle class="head" cx="150" cy="210" r="12"/><path class="limb" d="M150 224 V262 M150 262 L138 296 M150 262 L162 296 M150 230 L124 194 M150 230 L176 194"/>
<text x="200" y="236" class="s b to">Braços em V:</text><text x="200" y="254" class="s">precisamos de ajuda</text></g>
<g><circle class="head" cx="410" cy="210" r="12"/><path class="limb" d="M410 224 V262 M410 262 L398 296 M410 262 L422 296 M410 230 L436 194 M410 230 L384 262"/>
<text x="452" y="228" class="s b">Um braço em cima,</text><text x="452" y="246" class="s">outro em baixo:</text><text x="452" y="264" class="s">está tudo bem</text></g>
</svg>`,

'morse-sos': `<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg">
<g class="acc"><rect class="acc" x="30" y="40" width="20" height="20" rx="10"/><rect class="acc" x="70" y="40" width="20" height="20" rx="10"/><rect class="acc" x="110" y="40" width="20" height="20" rx="10"/>
<rect class="acc" x="170" y="40" width="60" height="20" rx="10"/><rect class="acc" x="250" y="40" width="60" height="20" rx="10"/><rect class="acc" x="330" y="40" width="60" height="20" rx="10"/>
<rect class="acc" x="430" y="40" width="20" height="20" rx="10"/><rect class="acc" x="470" y="40" width="20" height="20" rx="10"/><rect class="acc" x="510" y="40" width="20" height="20" rx="10"/></g>
<text x="80" y="28" text-anchor="middle" class="l">S</text><text x="280" y="28" text-anchor="middle" class="l">O</text><text x="480" y="28" text-anchor="middle" class="l">S</text>
<text x="300" y="92" text-anchor="middle" class="s">3 curtos · 3 longos · 3 curtos, sem pausa entre as letras. Pausa longa e repete.</text>
<text x="300" y="112" text-anchor="middle" class="s">Serve com luz, apito, buzina ou pancadas num cano.</text>
</svg>`,

'familia-carga': `<svg viewBox="0 0 600 310" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M20 248 H580" opacity=".4"/>
<g><rect class="body" x="70" y="96" width="18" height="44" rx="5"/><circle class="head" cx="100" cy="58" r="18"/><path class="limb" d="M100 78 V168 M100 168 L86 244 M100 168 L118 244"/>
<rect class="soft" x="102" y="94" width="36" height="58" rx="12"/><circle class="headv" cx="122" cy="104" r="11"/><path class="limbv" style="stroke-width:7" d="M122 118 V146"/>
<path class="limb" d="M100 98 L136 132 L120 150"/>
<text x="100" y="274" text-anchor="middle" class="b">{{a1}}</text><text x="100" y="294" text-anchor="middle" class="s">porta-bebé + mochila pequena</text></g>
<g><rect class="body" x="252" y="86" width="34" height="86" rx="7"/><circle class="head" cx="300" cy="58" r="18"/><path class="limb" d="M300 78 V168 M300 168 L286 244 M300 168 L318 244 M300 100 L338 142 L360 156"/>
<text x="290" y="274" text-anchor="middle" class="b">{{a2}}</text><text x="290" y="294" text-anchor="middle" class="s">mochila grande + dá a mão</text></g>
<g><rect class="body" x="386" y="150" width="14" height="28" rx="4"/><circle class="headv" cx="380" cy="132" r="13"/><path class="limbv" style="stroke-width:8" d="M380 146 V200 M380 200 L370 246 M380 200 L392 246 M380 162 L362 158"/>
<text x="420" y="176" class="b">{{c2_n}}</text><text x="420" y="194" class="s">a sua mochila, 2 a 3 kg</text></g>
<text x="150" y="30" class="s">{{c1_n}} vai no porta-bebé</text>
</svg>`,

'quarto-seguro': `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
<rect class="okf" x="300" y="40" width="140" height="120"/>
<rect class="ln" style="stroke-width:7" x="40" y="40" width="520" height="240"/>
<path class="ln" style="stroke-width:4" d="M300 40 V160 H440 V40 M40 160 H240 M440 160 H560"/>
<path class="ln" style="stroke-width:6" d="M300 122 V160"/><path class="accs" d="M306 128 h10"/>
<path class="infs" style="stroke-width:6" d="M470 40 H540 M40 200 V250 M560 200 V250"/>
<rect class="soft" x="262" y="270" width="56" height="20"/><text x="290" y="306" text-anchor="middle" class="s">porta da rua</text>
<text x="370" y="84" text-anchor="middle" class="b to">quarto seguro</text>
<text x="370" y="104" text-anchor="middle" class="s">porta maciça, tranca,</text><text x="370" y="120" text-anchor="middle" class="s">telemóvel, água, luz</text>
<path class="oks" d="M540 210 L592 210 M592 210 l-10 -7 M592 210 l-10 7"/><text x="480" y="236" class="s">saída alternativa</text>
<path class="accs" d="M290 268 V190 L316 170"/><text x="120" y="226" class="s">rota rápida da sala e dos</text><text x="120" y="242" class="s">quartos para o quarto seguro</text>
</svg>`,

'porta-reforco': `<svg viewBox="0 0 600 310" xmlns="http://www.w3.org/2000/svg">
<rect class="ln" style="stroke-width:8" x="140" y="24" width="200" height="262"/>
<rect class="soft" x="148" y="32" width="184" height="252"/>
<rect class="fl" x="148" y="64" width="10" height="26"/><rect class="fl" x="148" y="220" width="10" height="26"/>
<circle class="ln" cx="312" cy="160" r="8"/><rect class="acc" x="336" y="138" width="10" height="44"/>
<path class="accs" style="stroke-dasharray:4 3" d="M346 146 H392 M346 174 H392"/>
<path class="ln" style="stroke-width:12" d="M120 118 H360"/><rect class="fl" x="112" y="106" width="16" height="24"/><rect class="fl" x="352" y="106" width="16" height="24"/>
<path class="acc" d="M210 284 L270 284 L270 268 Z"/>
<circle class="ln" cx="240" cy="92" r="5"/>
<text x="404" y="150" class="s">parafusos de 8 cm na chapa</text><text x="404" y="166" class="s">da fechadura e nas dobradiças</text>
<text x="380" y="112" class="s">barra em suportes</text><text x="380" y="128" class="s">(só por dentro)</text>
<text x="284" y="304" class="s">calço de porta no chão</text>
<path class="lnt" d="M234 88 L126 70"/><text x="16" y="56" class="s">óculo e corrente:</text><text x="16" y="72" class="s">ver antes de abrir</text>
</svg>`,

'carro-distancia': `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M10 170 H590" opacity=".5"/>
<path class="body" d="M40 150 L50 118 Q60 96 90 94 L150 92 Q176 70 208 72 L236 74 Q258 84 262 112 L270 150 Z"/>
<circle class="ln" style="fill:var(--bg2)" cx="86" cy="152" r="17"/><circle class="ln" style="fill:var(--bg2)" cx="230" cy="152" r="17"/>
<circle class="head" cx="200" cy="96" r="6"/>
<path class="body" d="M400 150 L408 116 Q418 94 448 92 L500 90 Q526 70 556 74 L578 80 L586 150 Z"/>
<circle class="ln" style="fill:var(--bg2)" cx="440" cy="152" r="17"/><circle class="ln" style="fill:var(--bg2)" cx="556" cy="152" r="17"/>
<path class="dash" style="stroke:var(--ok)" d="M204 98 L428 166"/>
<path class="oks" d="M276 196 H392 M276 188 V204 M392 188 V204"/>
<text x="334" y="190" text-anchor="middle" class="s b">espaço para sair</text>
<text x="300" y="40" text-anchor="middle" class="s">Em fila, trava onde ainda vês os pneus de trás do carro da frente a tocar no chão.</text>
<text x="300" y="58" text-anchor="middle" class="s">Portas trancadas, vidros fechados, marcha engrenada se o ambiente estiver tenso.</text>
</svg>`

});
