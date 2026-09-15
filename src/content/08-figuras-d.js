/* Figuras: comida da natureza e alarmes. */
Object.assign(FIGS, {

'pesca-improvisada': `<svg viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg">
<g><circle class="ln" cx="90" cy="46" r="7"/><path class="ln" style="stroke-width:4" d="M90 53 V160 Q90 200 124 200 Q154 200 154 168 M154 168 L146 178"/>
<text x="110" y="236" text-anchor="middle" class="s b">alfinete dobrado</text><text x="110" y="254" text-anchor="middle" class="s">ponta afiada</text></g>
<g><ellipse class="ln" cx="240" cy="72" rx="26" ry="16"/><path class="ln" style="stroke-width:4" d="M240 88 V168 Q240 196 264 190 M264 190 L256 178"/>
<text x="240" y="236" text-anchor="middle" class="s b">argola de lata</text><text x="240" y="254" text-anchor="middle" class="s">corta com alicate</text></g>
<g><path class="ln" style="stroke-width:5" d="M328 124 L412 102"/><path class="lnt" d="M370 113 V36"/><circle class="fl" cx="370" cy="113" r="3"/>
<text x="370" y="236" text-anchor="middle" class="s b">agulha de pau</text><text x="370" y="254" text-anchor="middle" class="s">fica atravessada</text></g>
<g><path class="infs" style="stroke-width:2" d="M450 120 q12 -6 24 0 t24 0 t24 0 t24 0 t24 0"/><path class="lnt" d="M515 20 V214"/>
<ellipse class="acc" cx="515" cy="116" rx="8" ry="14"/><circle class="fl" cx="515" cy="186" r="6"/>
<path class="ln" style="stroke-width:3" d="M515 214 V232 Q515 244 526 240"/><path class="accs" style="stroke-width:2" d="M510 222 q7 4 0 8 q-7 4 0 8"/>
<text x="530" y="108" class="s">boia</text><text x="528" y="190" class="s">chumbo</text><text x="534" y="236" class="s">isco</text></g>
<text x="300" y="18" text-anchor="middle" class="s">Linha: fios de dentro do paracord, fio dental ou linha de costura dobrada.</text>
</svg>`,

'nassa-garrafa': `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg">
<path class="infs" style="stroke-width:2" d="M20 40 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
<path class="lnt" d="M20 176 H580" opacity=".6"/>
<path class="ln" d="M130 72 H400 Q440 72 440 112 Q440 152 400 152 H130 Z" style="fill:var(--bg3)"/>
<path class="ln" d="M130 72 L206 102 L206 122 L130 152"/>
<circle class="wrn" cx="330" cy="120" r="6"/><circle class="wrn" cx="346" cy="128" r="5"/><circle class="wrn" cx="318" cy="132" r="5"/>
<ellipse class="soft" cx="300" cy="58" rx="36" ry="14"/>
<path class="fl" d="M60 112 q18 -12 36 0 q-18 12 -36 0 z M60 112 l-12 -8 v16 z"/>
<path class="accs" d="M104 112 H124 M124 112 l-8 -5 M124 112 l-8 5"/>
<path class="infs" style="stroke-width:2" d="M520 100 H470 M470 100 l8 -5 M470 100 l8 5"/><text x="480" y="90" class="s ti">corrente</text>
<text x="300" y="36" text-anchor="middle" class="s">pedra por cima para afundar</text>
<text x="206" y="194" text-anchor="middle" class="s">terço de cima ao contrário (funil)</text>
<text x="340" y="164" class="s">isco</text>
<text x="40" y="160" class="s">entrada virada para jusante</text>
</svg>`,

'laco': `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M20 200 H580" opacity=".6"/>
<path class="dash" d="M200 206 H560"/><text x="420" y="226" class="s">carreiro dos coelhos</text>
<path class="ln" style="stroke-width:7" d="M140 108 V222"/><text x="60" y="96" class="s">estaca bem enterrada</text>
<path class="ln" style="stroke-width:2" d="M140 116 Q240 104 318 128"/>
<circle class="accs" cx="330" cy="150" r="22"/>
<path class="lnt" d="M290 150 V200 M372 150 V200 M282 164 V200 M380 164 V200"/>
<path class="oks" d="M396 172 V200 M390 172 H402 M390 200 H402"/><text x="408" y="190" class="s to">1 palmo</text>
<text x="300" y="104" class="s">laço corredio de arame fino,</text><text x="300" y="120" class="s">abertura de um punho (~10 cm)</text>
<text x="200" y="244" class="s">paus dos lados a afunilar o caminho até ao laço</text>
<g class="body"><ellipse class="body" cx="494" cy="176" rx="30" ry="18"/><circle class="body" cx="462" cy="166" r="11"/><path class="body" d="M458 156 l-6 -22 l8 2 z M466 155 l2 -22 l6 4 z"/></g>
</svg>`,

'alarme-latas': `<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
<g><rect class="ln" style="stroke-width:6" x="60" y="20" width="150" height="190"/><rect class="soft" x="66" y="26" width="138" height="184"/>
<circle class="ln" cx="186" cy="118" r="6"/><path class="lnt" d="M186 124 V140"/>
<rect class="ln" x="178" y="140" width="16" height="22" rx="2"/><rect class="ln" x="196" y="146" width="14" height="20" rx="2"/>
<rect class="ln" x="214" y="186" width="18" height="24" rx="2"/><rect class="ln" x="234" y="186" width="18" height="24" rx="2"/><rect class="ln" x="254" y="186" width="18" height="24" rx="2"/><rect class="ln" x="224" y="162" width="18" height="24" rx="2"/><rect class="ln" x="244" y="162" width="18" height="24" rx="2"/><rect class="ln" x="234" y="138" width="18" height="24" rx="2"/>
<text x="135" y="232" text-anchor="middle" class="s">latas com pedrinhas na maçaneta</text><text x="262" y="126" class="s">pirâmide de latas</text><text x="262" y="112" class="s">encostada por dentro</text></g>
<g><rect class="ln" style="stroke-width:6" x="370" y="30" width="190" height="130"/><path class="ln" d="M465 30 V160"/><rect class="infs" style="stroke-width:2" x="376" y="36" width="84" height="118"/><rect class="infs" style="stroke-width:2" x="470" y="36" width="84" height="118"/>
<path class="ln" style="stroke-width:6" d="M350 166 H580"/>
<path class="ln" d="M428 162 V118 Q428 108 434 104 V96 H442 V104 Q448 108 448 118 V162 Z"/>
<text x="470" y="192" text-anchor="middle" class="s">garrafa de vidro em pé no parapeito,</text><text x="470" y="208" text-anchor="middle" class="s">encostada ao vidro: cai quando abrem</text></g>
<text x="300" y="232" class="s ta">Nunca fios esticados em corredores ou escadas.</text>
</svg>`

});
