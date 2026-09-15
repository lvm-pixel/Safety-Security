// Gera o ficheiro único index.html a partir de src/.
// Uso: node build.js
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'src');
const read = f => fs.readFileSync(path.join(src, f), 'utf8');

// Conteúdo: todos os ficheiros src/content/*.js por ordem de nome, seguidos da versão inglesa em src/content-en/*.js.
const contentDir = path.join(src, 'content'), contentEnDir = path.join(src, 'content-en');
const readJs = (dir, label) => fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()
  .map(f => '/* ---- ' + label + f + ' ---- */\n' + fs.readFileSync(path.join(dir, f), 'utf8'));
const content = readJs(contentDir, '').concat(fs.existsSync(contentEnDir) ? readJs(contentEnDir, 'content-en/') : []).join('\n');

// Ferramentas em ficheiros próprios: src/ferramentas/*.js por ordem de nome, inseridas dentro de app.js no marcador.
const ferrDir = path.join(src, 'ferramentas');
const ferramentas = fs.existsSync(ferrDir) ? fs.readdirSync(ferrDir).filter(f => f.endsWith('.js')).sort()
  .map(f => '/* ---- ferramentas/' + f + ' ---- */\n' + fs.readFileSync(path.join(ferrDir, f), 'utf8')).join('\n') : '';
const app = read('app.js');
if (ferramentas && !app.includes('/*__FERRAMENTAS__*/')) throw new Error('Falta o marcador /*__FERRAMENTAS__*/ em src/app.js');

let html = read('shell.html');
html = html.replace('/*__CSS__*/', () => read('style.css'));
html = html.replace('/*__CONTENT__*/', () => content);
html = html.replace('/*__APP__*/', () => app.replace('/*__FERRAMENTAS__*/', () => ferramentas));

// Versão = data de build, usada pelo service worker para invalidar a cache.
const version = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
html = html.replace(/__VERSION__/g, version);

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
const sw = read('sw.js').replace(/__VERSION__/g, version);
fs.writeFileSync(path.join(__dirname, 'sw.js'), sw, 'utf8');

const kb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
console.log('index.html gerado (' + kb + ' KB), versão ' + version);
