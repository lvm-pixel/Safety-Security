/* Figuras: casa, sismo, abrigo, radiação, água, fogo. */
Object.assign(FIGS, {

'sismo': `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M10 190 H590" opacity=".5"/>
<g><circle class="head" cx="70" cy="128" r="14"/><path class="limb" d="M84 134 L140 142 M140 142 L150 188 M140 142 L176 176 L178 188 M92 138 L92 186"/>
<text x="100" y="214" text-anchor="middle" class="l">Baixar</text></g>
<g><path class="ln" style="stroke-width:7" d="M232 96 H378 M246 96 V188 M364 96 V188"/>
<circle class="head" cx="276" cy="140" r="14"/><path class="limb" d="M288 146 L330 156 M330 156 L340 186 M330 156 L352 184"/>
<path class="accs" style="stroke-width:6" d="M262 128 Q276 112 292 128"/>
<text x="305" y="214" text-anchor="middle" class="l">Proteger</text></g>
<g><path class="ln" style="stroke-width:7" d="M432 96 H578 M446 96 V188 M564 96 V188"/>
<circle class="head" cx="478" cy="140" r="14"/><path class="limb" d="M490 146 L530 156 M530 156 L540 186 M530 156 L552 184 M494 150 L560 136"/>
<circle class="acc" cx="563" cy="136" r="6"/>
<text x="505" y="214" text-anchor="middle" class="l">Aguardar</text></g>
<text x="300" y="28" text-anchor="middle" class="s">Sem mesa: baixa-te junto a uma parede interior e protege a cabeça e o pescoço com os braços.</text>
</svg>`,

'duas-paredes': `<svg viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg">
<rect class="bad" x="40" y="40" width="200" height="120" style="stroke:none"/>
<rect class="bad" x="360" y="40" width="200" height="120" style="stroke:none"/>
<rect class="bad" x="40" y="200" width="160" height="90" style="stroke:none"/>
<rect class="okf" x="240" y="40" width="120" height="120"/>
<rect class="okf" x="200" y="160" width="200" height="40"/>
<rect class="ln" style="stroke-width:7" x="40" y="40" width="520" height="250"/>
<path class="ln" style="stroke-width:4" d="M240 40 V160 M360 40 V160 M40 160 H200 M400 160 H560 M40 200 H200 M200 200 V290 M400 200 H560"/>
<path class="infs" style="stroke-width:6" d="M80 40 H190 M410 40 H520 M40 220 V270 M560 220 V270 M300 290 H360"/>
<text x="140" y="104" text-anchor="middle" class="b ta">evitar</text><text x="140" y="124" text-anchor="middle" class="s">janelas</text>
<text x="460" y="104" text-anchor="middle" class="b ta">evitar</text>
<text x="300" y="96" text-anchor="middle" class="b to">melhor</text><text x="300" y="116" text-anchor="middle" class="s">casa de banho</text><text x="300" y="132" text-anchor="middle" class="s">interior</text>
<text x="300" y="186" text-anchor="middle" class="b to">corredor</text>
<text x="120" y="250" text-anchor="middle" class="b ta">evitar</text>
<text x="300" y="316" text-anchor="middle" class="s">Azul: janelas e vidros. Verde: pelo menos 2 paredes entre ti e o exterior.</text>
</svg>`,

'fallout': `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="28" class="b">Radiação da poeira radioativa (regra do 7-10)</text>
<rect class="acc" x="130" y="46" width="160" height="22" rx="3"/><text x="20" y="62" class="s">1 hora depois</text><text x="298" y="62" class="s">100%</text>
<rect class="acc" x="130" y="80" width="16" height="22" rx="3" opacity=".8"/><text x="20" y="96" class="s">7 horas</text><text x="154" y="96" class="s">10%</text>
<rect class="acc" x="130" y="114" width="3" height="22" opacity=".7"/><text x="20" y="130" class="s">2 dias</text><text x="141" y="130" class="s">1%</text>
<rect class="acc" x="130" y="148" width="1.5" height="22" opacity=".6"/><text x="20" y="164" class="s">2 semanas</text><text x="139" y="164" class="s">0,1%</text>
<text x="20" y="200" class="s">Fica abrigado pelo menos 24 horas,</text><text x="20" y="216" class="s">idealmente 48 a 72, até ouvires</text><text x="20" y="232" class="s">na rádio que podes sair.</text>
<g transform="translate(360,30)">
<rect class="bad" x="20" y="10" width="180" height="46" style="stroke:none"/>
<rect class="wrnf" x="20" y="56" width="180" height="46" style="stroke:none"/>
<rect class="okf" x="60" y="102" width="100" height="46" style="stroke:none"/>
<rect class="wrnf" x="20" y="148" width="180" height="46" style="stroke:none"/>
<rect class="okf" x="20" y="200" width="180" height="50" style="stroke:none"/>
<rect class="ln" x="20" y="10" width="180" height="184"/><path class="ln" d="M20 56 H200 M20 102 H200 M20 148 H200 M0 194 H220"/>
<rect class="ln" x="20" y="194" width="180" height="56" style="stroke-dasharray:6 4"/>
<circle class="fl" cx="40" cy="4" r="2.5"/><circle class="fl" cx="90" cy="2" r="2.5"/><circle class="fl" cx="150" cy="5" r="2.5"/><circle class="fl" cx="190" cy="1" r="2.5"/><circle class="fl" cx="-6" cy="188" r="2.5"/><circle class="fl" cx="210" cy="188" r="2.5"/>
<text x="110" y="38" text-anchor="middle" class="s">último piso: mau</text>
<text x="110" y="130" text-anchor="middle" class="s b">centro: bom</text>
<text x="110" y="228" text-anchor="middle" class="s b">cave: o melhor</text>
</g>
</svg>`,

'filtro': `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
<path class="ln" d="M200 30 H320 V190 L280 236 H240 L200 190 Z"/>
<rect class="soft" x="202" y="40" width="116" height="26"/><text x="336" y="58" class="s">pano (retém o grosso)</text>
<rect class="fl" x="202" y="66" width="116" height="40" opacity=".75"/><text x="336" y="90" class="s">carvão de lenha esmagado</text>
<rect class="wrnf" x="202" y="106" width="116" height="46" style="stroke:none"/><text x="336" y="132" class="s">areia fina lavada</text>
<rect class="soft" x="202" y="152" width="116" height="38"/><text x="336" y="176" class="s">gravilha</text>
<path class="soft" d="M202 190 H318 L280 234 H240 Z"/><text x="336" y="214" class="s">algodão ou pano no gargalo</text>
<path class="infs" d="M260 240 V256"/><circle class="inf" cx="260" cy="262" r="4"/>
<path class="ln" d="M220 270 H300 V296 H220 Z"/>
<text x="20" y="46" class="s">garrafa cortada,</text><text x="20" y="62" class="s">de pernas para o ar</text>
<text x="20" y="260" class="b ta">Só clarifica.</text><text x="20" y="278" class="s">Depois ferve ou</text><text x="20" y="294" class="s">usa lixívia.</text>
</svg>`,

'sodis': `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg">
<circle class="wrn" cx="90" cy="60" r="30"/><path class="ln" style="stroke:var(--warn)" d="M90 14 V4 M90 116 V106 M44 60 H34 M146 60 H136 M58 28 L50 20 M130 100 L122 92 M58 92 L50 100 M130 28 L122 20"/>
<path class="lnt" d="M140 110 L220 150 M160 90 L300 150 M170 70 L400 150" style="stroke:var(--warn)"/>
<path class="soft" d="M190 172 L560 172 L540 196 L170 196 Z"/>
<rect class="infs" x="220" y="146" width="90" height="24" rx="10" style="stroke-width:2"/><rect class="infs" x="330" y="146" width="90" height="24" rx="10" style="stroke-width:2"/><rect class="infs" x="440" y="146" width="90" height="24" rx="10" style="stroke-width:2"/>
<path class="infs" style="stroke-width:2" d="M310 152 h8 v12 h-8 M420 152 h8 v12 h-8 M530 152 h8 v12 h-8"/>
<text x="360" y="218" text-anchor="middle" class="s">chapa metálica ou alumínio por baixo</text>
<text x="220" y="40" class="b">6 horas de sol direto</text><text x="220" y="60" class="s">2 dias se estiver nublado · garrafas PET transparentes</text><text x="220" y="78" class="s">até 2 L · só água límpida · deitadas</text>
</svg>`,

'fogo': `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
<path class="lnt" d="M60 220 H540" opacity=".5"/>
<ellipse class="wrnf" cx="300" cy="206" rx="30" ry="14"/>
<path class="ln" style="stroke-width:3" d="M252 218 L300 110 M348 218 L300 110 M272 218 L302 112 M330 218 L298 112 M290 220 L300 110 M312 220 L300 110"/>
<path class="ln" style="stroke-width:10" d="M150 214 L230 170 M450 214 L370 170"/>
<path class="accs" d="M210 206 Q224 190 236 206"/><path class="accs" d="M200 236 L226 214 M226 214 l-10 2 M226 214 l-2 10"/>
<text x="300" y="248" text-anchor="middle" class="s">1. isca seca e solta (mão cheia)</text>
<text x="360" y="92" class="s">2. acendalhas: da grossura</text><text x="360" y="108" class="s">de um fósforo à de um lápis</text>
<text x="420" y="196" class="s">3. lenha: só depois</text>
<text x="40" y="190" class="s ta">acende por baixo,</text><text x="40" y="206" class="s ta">do lado do vento</text>
</svg>`,

'pass': `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
<g><rect class="body" x="50" y="60" width="40" height="90" rx="12"/><path class="ln" d="M60 60 V46 H84 M84 46 L100 38"/><circle class="accs" cx="102" cy="52" r="8"/><path class="accs" d="M110 52 L126 44"/>
<text x="80" y="176" text-anchor="middle" class="l">P</text><text x="80" y="194" text-anchor="middle" class="s">puxa a cavilha</text></g>
<g><rect class="body" x="190" y="60" width="40" height="90" rx="12"/><path class="ln" d="M222 70 Q260 80 262 130"/>
<path class="wrnf" d="M270 148 q6 -24 14 -10 q6 -26 16 -6 q8 -20 12 6 Z"/><path class="accs" d="M262 132 L282 146"/>
<text x="240" y="176" text-anchor="middle" class="l">A</text><text x="240" y="194" text-anchor="middle" class="s">aponta à base</text></g>
<g><rect class="body" x="360" y="60" width="40" height="90" rx="12"/><path class="ln" d="M370 60 V46 H394"/><path class="accs" style="stroke-width:5" d="M372 34 L398 40"/>
<text x="380" y="176" text-anchor="middle" class="l">S</text><text x="380" y="194" text-anchor="middle" class="s">aperta o manípulo</text></g>
<g><path class="wrnf" d="M490 148 q6 -24 14 -10 q6 -26 16 -6 q8 -20 12 6 Z"/><path class="accs" d="M478 120 Q512 100 546 120 M546 120 l-10 -2 M546 120 l-4 -9 M478 120 l10 -2 M478 120 l4 -9"/>
<text x="512" y="176" text-anchor="middle" class="l">S</text><text x="512" y="194" text-anchor="middle" class="s">varre de lado a lado</text></g>
</svg>`,

'valvula': `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg">
<g><rect class="soft" x="30" y="92" width="240" height="22" rx="4"/><circle class="soft" cx="150" cy="103" r="14"/>
<rect class="ok" x="92" y="96" width="116" height="14" rx="7"/>
<text x="150" y="150" text-anchor="middle" class="l to">Aberta</text><text x="150" y="170" text-anchor="middle" class="s">alavanca paralela ao tubo</text></g>
<g><rect class="soft" x="330" y="92" width="240" height="22" rx="4"/><circle class="soft" cx="450" cy="103" r="14"/>
<rect class="acc" x="443" y="44" width="14" height="118" rx="7"/>
<text x="450" y="30" text-anchor="middle" class="l ta">Fechada</text><text x="450" y="182" text-anchor="middle" class="s">alavanca atravessada (em cruz)</text></g>
</svg>`,

'balde': `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg">
<g><path class="ln" d="M70 70 L90 200 H190 L210 70 Z"/><path class="ln" style="stroke-width:6" d="M62 62 H218"/><path class="lnt" d="M100 56 Q140 20 180 56"/>
<rect class="wrnf" x="84" y="110" width="112" height="86" style="stroke:none"/>
<text x="140" y="222" text-anchor="middle" class="b">Balde 1: urina</text></g>
<g><path class="ln" d="M250 70 L270 200 H370 L390 70 Z"/><path class="ln" style="stroke-width:6" d="M242 62 H398"/><path class="lnt" d="M280 56 Q320 20 360 56"/>
<path class="lnt" d="M258 76 L276 196 M382 76 L364 196" style="stroke-dasharray:4 4"/><rect class="soft" x="272" y="150" width="96" height="46"/>
<text x="320" y="178" text-anchor="middle" class="s">serradura</text>
<text x="320" y="222" text-anchor="middle" class="b">Balde 2: fezes</text></g>
<g><path class="soft" d="M440 100 h110 v96 h-110 z"/><text x="495" y="146" text-anchor="middle" class="s">serradura,</text><text x="495" y="162" text-anchor="middle" class="s">terra ou cinza</text>
<text x="495" y="222" text-anchor="middle" class="s">1 mão cheia por cima, sempre</text></g>
<text x="300" y="24" text-anchor="middle" class="s">Balde 2 forrado com saco de lixo resistente (tracejado). Tampa sempre fechada.</text>
</svg>`,

'pote': `<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
<path class="ln" d="M160 60 Q150 200 200 222 H400 Q450 200 440 60 Z"/>
<path class="wrnf" d="M168 70 Q160 196 206 214 H394 Q440 196 432 70 Z"/>
<path class="ln" d="M220 70 Q214 180 244 196 H356 Q386 180 380 70 Z" style="fill:var(--bg2)"/>
<text x="300" y="140" text-anchor="middle" class="s">comida</text><text x="300" y="158" text-anchor="middle" class="s">(vaso interior)</text>
<path class="infs" d="M150 52 H450"/><text x="300" y="42" text-anchor="middle" class="s">pano molhado por cima</text>
<text x="470" y="150" class="s">areia molhada</text><path class="lnt" d="M466 146 L424 146"/>
<path class="lnt" d="M110 90 q-10 -14 0 -28 M90 100 q-10 -14 0 -28 M490 90 q10 -14 0 -28 M510 100 q10 -14 0 -28"/>
<text x="20" y="120" class="s">evaporação</text><text x="20" y="136" class="s">arrefece</text>
<text x="300" y="244" text-anchor="middle" class="s">À sombra e ao vento. Molhar a areia 2 vezes por dia. Baixa 10 a 15 °C.</text>
</svg>`

});
