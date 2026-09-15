/* Figuras em SVG (sem ficheiros externos, funcionam offline e seguem o tema).
   Usar no texto com uma linha: ![legenda](fig:id)
   Classes (style.css): ln/lnt linhas, body corpo, limb/head socorrista, limbv/headv vítima,
   acc/accs vermelho, ok/oks verde, okf/bad/wrnf áreas, text.s pequeno, .b negrito, .ta/.to/.tw cores. */
const FIGS = {};
Object.assign(FIGS, {

'rcp-maos': `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<g><circle class="body" cx="100" cy="40" r="24"/><rect class="body" x="50" y="70" width="100" height="135" rx="36"/>
<path class="lnt" d="M100 78 V168"/><path class="dash" d="M60 110 H140"/>
<circle class="fl" cx="78" cy="110" r="3"/><circle class="fl" cx="122" cy="110" r="3"/>
<ellipse class="acc" cx="100" cy="137" rx="22" ry="15" opacity=".85"/><ellipse class="accs" cx="100" cy="131" rx="22" ry="15"/>
<text x="100" y="232" text-anchor="middle" class="b">Adulto</text><text x="100" y="251" text-anchor="middle" class="s">2 mãos · 5 a 6 cm</text></g>
<g transform="translate(200,20)"><circle class="body" cx="100" cy="38" r="20"/><rect class="body" x="62" y="62" width="76" height="105" rx="28"/>
<path class="lnt" d="M100 68 V140"/><path class="dash" d="M70 95 H130"/>
<circle class="fl" cx="84" cy="95" r="2.5"/><circle class="fl" cx="116" cy="95" r="2.5"/>
<ellipse class="acc" cx="100" cy="115" rx="16" ry="11" opacity=".85"/>
<text x="100" y="212" text-anchor="middle" class="b">Criança</text><text x="100" y="231" text-anchor="middle" class="s">1 mão · 5 cm</text></g>
<g transform="translate(400,45)"><circle class="body" cx="100" cy="34" r="17"/><rect class="body" x="72" y="54" width="56" height="75" rx="22"/>
<path class="dash" d="M76 78 H124"/><circle class="fl" cx="88" cy="78" r="2"/><circle class="fl" cx="112" cy="78" r="2"/>
<circle class="acc" cx="95" cy="89" r="5"/><circle class="acc" cx="105" cy="89" r="5"/>
<text x="100" y="187" text-anchor="middle" class="b">Bebé</text><text x="100" y="206" text-anchor="middle" class="s">2 dedos · 4 cm</text></g>
</svg>`,

'pls': `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M20 212 H580" opacity=".4"/>
<circle class="headv" cx="112" cy="122" r="20"/>
<path class="limbv" d="M133 126 L300 132"/>
<path class="limbv" d="M300 132 L490 136"/>
<path class="limbv" d="M300 132 L352 186 L446 190"/>
<path class="limbv" d="M152 124 L152 64 L200 52"/>
<path class="limbv" d="M166 128 L196 172 L128 148"/>
<path class="lnt" d="M206 50 L236 38"/><text x="240" y="36" class="s">1. braço de baixo em ângulo reto, palma para cima</text>
<path class="lnt" d="M122 152 L92 178"/><text x="20" y="196" class="s">2. mão de cima sob a face</text>
<path class="lnt" d="M356 190 L372 208"/><text x="330" y="230" class="s">3. joelho de cima dobrado, pé no chão</text>
<path class="lnt" d="M100 104 L86 76"/><text x="20" y="66" class="s">4. cabeça para trás, boca para baixo</text>
</svg>`,

'heimlich': `<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
<path class="dash" d="M300 20 V250" opacity=".5"/>
<g><circle class="head" cx="95" cy="60" r="17"/><path class="limb" d="M99 80 L106 175 M106 175 L94 242 M106 175 L124 242"/>
<path class="limb" d="M103 100 L160 120 L206 126"/><path class="limb" d="M101 95 L140 58 L196 92"/>
<circle class="headv" cx="240" cy="84" r="16"/><path class="limbv" d="M224 100 L176 168 M176 168 L166 242 M176 168 L194 242 M214 108 L228 156"/>
<path class="accs" d="M204 78 q8 -6 16 0 M200 70 q12 -10 24 0"/>
<text x="150" y="270" text-anchor="middle" class="b">5 pancadas nas costas</text></g>
<g><circle class="headv" cx="478" cy="58" r="16"/><path class="limbv" d="M476 76 L474 170 M474 170 L458 242 M474 170 L494 242 M476 96 L506 138"/>
<circle class="head" cx="424" cy="64" r="17"/><path class="limb" d="M428 84 L434 176 M434 176 L420 242 M434 176 L452 242"/>
<path class="limb" d="M430 102 Q468 104 482 128"/>
<circle class="acc" cx="486" cy="130" r="9"/>
<path class="accs" d="M516 150 Q506 120 490 112 M490 112 l3 10 M490 112 l10 2"/>
<text x="450" y="270" text-anchor="middle" class="b">5 compressões abdominais</text>
<text x="530" y="176" class="s ta">para dentro</text><text x="530" y="192" class="s ta">e para cima</text></g>
</svg>`,

'bebe-engasgado': `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<path class="dash" d="M300 20 V210" opacity=".5"/>
<g><path class="limb" d="M60 172 L236 128"/><circle class="head" cx="246" cy="126" r="6"/>
<circle class="headv" cx="74" cy="150" r="14"/><path class="limbv" style="stroke-width:8" d="M88 146 L156 128 M156 128 L176 152 M156 128 L182 118 M110 140 L104 160"/>
<circle class="acc" cx="126" cy="112" r="9"/><path class="accs" d="M116 98 q10 -8 20 0 M112 90 q14 -12 28 0"/>
<text x="150" y="204" text-anchor="middle" class="b">De barriga para baixo</text><text x="150" y="224" text-anchor="middle" class="s">cabeça mais baixa · 5 pancadas nas costas</text></g>
<g><path class="limb" d="M360 172 L536 128"/><circle class="head" cx="546" cy="126" r="6"/>
<circle class="headv" cx="374" cy="150" r="14"/><path class="limbv" style="stroke-width:8" d="M388 146 L456 128 M456 128 L476 152 M456 128 L482 118"/>
<path class="accs" style="stroke-width:6" d="M412 94 L416 134 M424 92 L428 132"/>
<text x="450" y="204" text-anchor="middle" class="b">De barriga para cima</text><text x="450" y="224" text-anchor="middle" class="s">5 compressões com 2 dedos no peito</text></g>
</svg>`,

'torniquete': `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<path class="body" d="M40 78 Q70 66 330 76 L380 84 Q430 80 565 96 L565 146 Q430 156 380 152 L330 158 Q70 170 40 156 Z"/>
<path class="dash" d="M362 60 V180"/><text x="362" y="54" text-anchor="middle" class="s">joelho</text>
<path class="bad" d="M348 190 l28 0" /><text x="362" y="206" text-anchor="middle" class="s ta">nunca sobre a articulação</text>
<circle class="acc" cx="268" cy="116" r="13"/><circle class="acc" cx="286" cy="138" r="4"/><circle class="acc" cx="258" cy="140" r="3"/>
<text x="268" y="192" text-anchor="middle" class="s">ferida</text>
<rect class="acc" x="184" y="62" width="22" height="104" rx="4"/>
<path class="ln" style="stroke-width:6" d="M168 50 L224 50"/><path class="lnt" d="M195 50 V62"/>
<text x="196" y="36" text-anchor="middle" class="b">torniquete</text>
<path class="accs" d="M208 118 H252 M208 110 V126 M252 110 V126"/><text x="230" y="104" text-anchor="middle" class="s">5 a 7 cm</text>
<rect class="soft" x="120" y="186" width="96" height="30" rx="6"/><text x="168" y="206" text-anchor="middle" class="b">T 14:35</text>
<text x="40" y="44" class="s">← lado do coração</text>
<text x="40" y="232" class="s">Aperta até o sangue parar. Escreve a hora. Não alivies.</text>
</svg>`,

'fast': `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
<g><circle class="ln" cx="75" cy="68" r="40"/><circle class="fl" cx="61" cy="58" r="4"/><circle class="fl" cx="89" cy="60" r="4"/>
<path class="ln" d="M56 86 Q68 90 76 88 Q88 94 96 104"/><text x="75" y="140" text-anchor="middle" class="l">Face</text><text x="75" y="160" text-anchor="middle" class="s">um lado da boca cai</text></g>
<g><circle class="head" cx="225" cy="40" r="12"/><path class="ln" style="stroke-width:6" d="M225 54 V108 M225 108 L212 130 M225 108 L238 130 M225 66 L270 64"/>
<path class="accs" style="stroke-width:6" d="M225 66 L190 94"/><text x="225" y="160" text-anchor="middle" class="l">Braço</text><text x="225" y="180" text-anchor="middle" class="s">um não sobe ou cai</text></g>
<g><path class="ln" d="M330 34 h90 a12 12 0 0 1 12 12 v36 a12 12 0 0 1 -12 12 h-54 l-18 16 v-16 h-18 a12 12 0 0 1 -12 -12 v-36 a12 12 0 0 1 12 -12 z"/>
<text x="375" y="70" text-anchor="middle" class="b">bla… ?</text><text x="375" y="140" text-anchor="middle" class="l">Fala</text><text x="375" y="160" text-anchor="middle" class="s">arrastada ou sem sentido</text></g>
<g><circle class="ln" cx="525" cy="66" r="36"/><path class="ln" d="M525 66 V42 M525 66 L542 76"/>
<text x="525" y="140" text-anchor="middle" class="l ta">Tempo</text><text x="525" y="160" text-anchor="middle" class="s">112 já · anota a hora</text></g>
</svg>`

});
