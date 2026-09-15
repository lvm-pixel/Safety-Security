/* --- Códigos QR gerados no próprio telemóvel, sem internet ---
   Modo byte (UTF-8), correção de erros M (15%), versões 1 a 40 e escolha da máscara com menos penalização (ISO/IEC 18004). */
const QR_ECC_M = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28];
const QR_BLOCOS_M = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49];
function qrModulosDados(ver) { let r = (16 * ver + 128) * ver + 64; if (ver >= 2) { const na = Math.floor(ver / 7) + 2; r -= (25 * na - 10) * na - 55; if (ver >= 7) r -= 36; } return r; }
function qrCodewordsDados(ver) { return Math.floor(qrModulosDados(ver) / 8) - QR_ECC_M[ver] * QR_BLOCOS_M[ver]; }
function qrMul(x, y) { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z; }
function qrDivisor(grau) { const r = []; for (let i = 0; i < grau - 1; i++) r.push(0); r.push(1); let raiz = 1; for (let i = 0; i < grau; i++) { for (let j = 0; j < r.length; j++) { r[j] = qrMul(r[j], raiz); if (j + 1 < r.length) r[j] ^= r[j + 1]; } raiz = qrMul(raiz, 2); } return r; }
function qrResto(dados, div) { const r = div.map(() => 0); for (const b of dados) { const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => { r[i] ^= qrMul(c, f); }); } return r; }
function qrAlinhamento(ver) { if (ver === 1) return []; const na = Math.floor(ver / 7) + 2, passo = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (na * 2 - 2)) * 2, r = [6]; for (let pos = ver * 4 + 10; r.length < na; pos -= passo) r.splice(1, 0, pos); return r; }
function qrPenalizacao(m) {
  const n = m.length; let p = 0, escuros = 0;
  const linha = get => { let corrida = 1; for (let i = 1; i <= n; i++) { if (i < n && get(i) === get(i - 1)) corrida++; else { if (corrida >= 5) p += 3 + corrida - 5; corrida = 1; } }
    const v = [0, 0, 0, 0]; for (let i = 0; i < n; i++) v.push(get(i) ? 1 : 0); v.push(0, 0, 0, 0);
    for (let i = 0; i + 11 <= v.length; i++) { const s = v.slice(i, i + 11).join(''); if (s === '10111010000' || s === '00001011101') p += 40; } };
  for (let y = 0; y < n; y++) linha(x => m[y][x]);
  for (let x = 0; x < n; x++) linha(y => m[y][x]);
  for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) { const c = m[y][x]; if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3; }
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y][x]) escuros++;
  return p + (Math.ceil(Math.abs(escuros * 20 - n * n * 10) / (n * n)) - 1) * 10;
}
// Devolve a matriz (true = módulo escuro) sem a margem branca.
function qrMatriz(texto) {
  const bytes = Array.from(new TextEncoder().encode(String(texto)));
  let ver = 1;
  for (; ver <= 40; ver++) if (4 + (ver < 10 ? 8 : 16) + bytes.length * 8 <= qrCodewordsDados(ver) * 8) break;
  if (ver > 40) throw new Error(L('texto grande demais para um código QR', 'text too long for a QR code'));
  const cap = qrCodewordsDados(ver) * 8, bits = [];
  const por = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); };
  por(4, 4); por(bytes.length, ver < 10 ? 8 : 16); bytes.forEach(b => por(b, 8));
  por(0, Math.min(4, cap - bits.length)); por(0, (8 - bits.length % 8) % 8);
  for (let pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) por(pad, 8);
  const cw = []; for (let i = 0; i < bits.length; i += 8) { let v = 0; for (let j = 0; j < 8; j++) v = (v << 1) | bits[i + j]; cw.push(v); }
  const nb = QR_BLOCOS_M[ver], ecc = QR_ECC_M[ver], total = Math.floor(qrModulosDados(ver) / 8), curtos = nb - total % nb, tamCurto = Math.floor(total / nb), div = qrDivisor(ecc);
  const blocos = [], restos = [];
  for (let i = 0, k = 0; i < nb; i++) { const len = tamCurto - ecc + (i < curtos ? 0 : 1); const b = cw.slice(k, k + len); k += len; blocos.push(b); restos.push(qrResto(b, div)); }
  const seq = [];
  for (let i = 0; i < blocos[nb - 1].length; i++) blocos.forEach(b => { if (i < b.length) seq.push(b[i]); });
  for (let i = 0; i < ecc; i++) restos.forEach(r => seq.push(r[i]));
  const n = ver * 4 + 17, m = [], fn = [];
  for (let y = 0; y < n; y++) { m.push(new Array(n).fill(false)); fn.push(new Array(n).fill(false)); }
  const pos = (x, y, v) => { m[y][x] = v; fn[y][x] = true; };
  for (let i = 0; i < n; i++) { pos(6, i, i % 2 === 0); pos(i, 6, i % 2 === 0); }
  const localizador = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dy)), x = cx + dx, y = cy + dy; if (x >= 0 && x < n && y >= 0 && y < n) pos(x, y, d !== 2 && d !== 4); } };
  localizador(3, 3); localizador(n - 4, 3); localizador(3, n - 4);
  const al = qrAlinhamento(ver), na = al.length;
  for (let i = 0; i < na; i++) for (let j = 0; j < na; j++) { if ((i === 0 && j === 0) || (i === 0 && j === na - 1) || (i === na - 1 && j === 0)) continue; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) pos(al[i] + dx, al[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }
  const formato = mascara => { let r = mascara; for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537); const b = ((mascara << 10) | r) ^ 0x5412, bit = i => ((b >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) pos(8, i, bit(i)); pos(8, 7, bit(6)); pos(8, 8, bit(7)); pos(7, 8, bit(8)); for (let i = 9; i < 15; i++) pos(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) pos(n - 1 - i, 8, bit(i)); for (let i = 8; i < 15; i++) pos(8, n - 15 + i, bit(i)); pos(8, n - 8, true); };
  formato(0);
  if (ver >= 7) { let r = ver; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1F25); const b = (ver << 12) | r; for (let i = 0; i < 18; i++) { const v = ((b >>> i) & 1) === 1, a = n - 11 + i % 3, c = Math.floor(i / 3); pos(a, c, v); pos(c, a, v); } }
  let k = 0;
  for (let dir = n - 1; dir >= 1; dir -= 2) { if (dir === 6) dir = 5; const sobe = ((dir + 1) & 2) === 0;
    for (let v = 0; v < n; v++) for (let j = 0; j < 2; j++) { const x = dir - j, y = sobe ? n - 1 - v : v; if (!fn[y][x] && k < seq.length * 8) { m[y][x] = ((seq[k >>> 3] >>> (7 - (k & 7))) & 1) === 1; k++; } } }
  const aplicar = q => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (fn[y][x]) continue; let inv;
    switch (q) { case 0: inv = (x + y) % 2 === 0; break; case 1: inv = y % 2 === 0; break; case 2: inv = x % 3 === 0; break; case 3: inv = (x + y) % 3 === 0; break; case 4: inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break; case 5: inv = x * y % 2 + x * y % 3 === 0; break; case 6: inv = (x * y % 2 + x * y % 3) % 2 === 0; break; default: inv = ((x + y) % 2 + x * y % 3) % 2 === 0; }
    if (inv) m[y][x] = !m[y][x]; } };
  let melhor = 0, menor = Infinity;
  for (let q = 0; q < 8; q++) { aplicar(q); formato(q); const p = qrPenalizacao(m); if (p < menor) { menor = p; melhor = q; } aplicar(q); }
  aplicar(melhor); formato(melhor);
  return m;
}
function qrSVG(texto, px) {
  const m = qrMatriz(texto), n = m.length, q = 4, t = n + 2 * q; let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y][x]) d += 'M' + (x + q) + ' ' + (y + q) + 'h1v1h-1z';
  return '<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + t + ' ' + t + '" shape-rendering="crispEdges"' + (px ? ' width="' + px + '" height="' + px + '"' : '') + ' role="img" aria-label="' + L('Código QR', 'QR code') + '"><rect width="' + t + '" height="' + t + '" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
}
