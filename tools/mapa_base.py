#!/usr/bin/env python3
"""Gera src/content/09-mapa-base.js: o mapa de Portugal e do mundo que a app mostra sem internet.

Dados de entrada
  Natural Earth (domínio público), pasta geojson de
  https://github.com/nvkelso/natural-earth-vector/tree/master/geojson :
    ne_10m_admin_1_states_provinces.geojson   distritos, Açores e Madeira
    ne_10m_admin_0_countries.geojson          Espanha (contexto do continente)
    ne_10m_rivers_lake_centerlines.geojson    rios principais
    ne_10m_rivers_europe.geojson              rios europeus de apoio
    ne_110m_admin_0_countries.geojson         países do mundo e o ponto central de cada um
  OpenStreetMap (© colaboradores do OpenStreetMap, licença ODbL), pela Overpass API
  (https://overpass-api.de/api/interpreter, campo "data"):
    estradas:    [out:json][timeout:240];area["ISO3166-1"="PT"][admin_level=2]->.pt;way["highway"~"^(motorway|trunk)$"](area.pt);out geom qt;
    localidades: [out:json][timeout:120];area["ISO3166-1"="PT"][admin_level=2]->.pt;node["place"~"^(city|town)$"](area.pt);out qt;

Uso
  python tools/mapa_base.py --ne PASTA_NE --estradas estradas.json --localidades localidades.json --saida src/content/09-mapa-base.js
"""
import argparse
import json
import math
import os
from collections import defaultdict

VISTAS = {
    'continente': [-9.65, 36.85, -6.1, 42.2],
    'acores': [-31.35, 36.85, -24.95, 39.8],
    'madeira': [-17.35, 32.35, -16.2, 33.15],
    'mundo': [-180.0, -58.0, 180.0, 84.0],
}
CAPITAIS = {'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa',
            'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
            'Funchal', 'Ponta Delgada', 'Angra do Heroísmo', 'Horta'}
RIOS_ESPANHOLES = {'Guadalquivir', 'Tormes', 'Esla', 'Alagón'}


def carregar(caminho):
    with open(caminho, encoding='utf-8') as f:
        return json.load(f)


def simplificar(pts, tol, kx):
    """Douglas-Peucker com a longitude corrigida pelo cosseno da latitude."""
    n = len(pts)
    if n < 3:
        return list(pts)
    manter = [False] * n
    manter[0] = manter[-1] = True
    pilha = [(0, n - 1)]
    tol2 = tol * tol
    while pilha:
        a, b = pilha.pop()
        if b <= a + 1:
            continue
        ax, ay = pts[a][0] * kx, pts[a][1]
        bx, by = pts[b][0] * kx, pts[b][1]
        dx, dy = bx - ax, by - ay
        L = dx * dx + dy * dy
        imax, dmax = -1, -1.0
        for i in range(a + 1, b):
            px, py = pts[i][0] * kx, pts[i][1]
            if L == 0:
                d = (px - ax) ** 2 + (py - ay) ** 2
            else:
                t = ((px - ax) * dx + (py - ay) * dy) / L
                t = 0.0 if t < 0 else 1.0 if t > 1 else t
                d = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2
            if d > dmax:
                imax, dmax = i, d
        if dmax > tol2:
            manter[imax] = True
            pilha.append((a, imax))
            pilha.append((imax, b))
    return [p for p, k in zip(pts, manter) if k]


def codificar(pts, mult=1000):
    """Inteiros (graus x mult): o primeiro ponto absoluto, os seguintes em diferença."""
    out, px, py = [], None, None
    for lon, lat in pts:
        x, y = round(lon * mult), round(lat * mult)
        if px is None:
            out += [x, y]
        elif x != px or y != py:
            out += [x - px, y - py]
        else:
            continue
        px, py = x, y
    return out


def recortar(anel, caixa):
    """Sutherland-Hodgman: recorta um polígono por um retângulo."""
    w, s, e, n = caixa

    def lado(pts, dentro, cruzar):
        out = []
        if not pts:
            return out
        ant = pts[-1]
        for cur in pts:
            if dentro(cur):
                if not dentro(ant):
                    out.append(cruzar(ant, cur))
                out.append(cur)
            elif dentro(ant):
                out.append(cruzar(ant, cur))
            ant = cur
        return out

    def em_x(p, q, x):
        t = (x - p[0]) / (q[0] - p[0])
        return (x, p[1] + t * (q[1] - p[1]))

    def em_y(p, q, y):
        t = (y - p[1]) / (q[1] - p[1])
        return (p[0] + t * (q[0] - p[0]), y)

    pts = [tuple(p) for p in (anel[:-1] if anel[0] == anel[-1] else anel)]
    pts = lado(pts, lambda p: p[0] >= w, lambda p, q: em_x(p, q, w))
    pts = lado(pts, lambda p: p[0] <= e, lambda p, q: em_x(p, q, e))
    pts = lado(pts, lambda p: p[1] >= s, lambda p, q: em_y(p, q, s))
    pts = lado(pts, lambda p: p[1] <= n, lambda p, q: em_y(p, q, n))
    return pts


def poligonos(geom):
    if not geom:
        return []
    return geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]


def linhas(geom):
    if not geom:
        return []
    return geom['coordinates'] if geom['type'] == 'MultiLineString' else [geom['coordinates']]


def distritos_e_ilhas(ne):
    a1 = carregar(os.path.join(ne, 'ne_10m_admin_1_states_provinces.geojson'))
    out = []
    for f in a1['features']:
        p = f['properties']
        if p.get('adm0_a3') != 'PRT':
            continue
        cod = (p.get('iso_3166_2') or '').split('-')[-1]
        for poly in poligonos(f['geometry']):
            anel = poly[0]
            cx = sum(q[0] for q in anel) / len(anel)
            cy = sum(q[1] for q in anel) / len(anel)
            if cod == '20':
                area = 'AOC' if cx < -30 else 'ACE' if cx < -26.5 else 'AOR'
                s = simplificar(anel, 0.0012, math.cos(math.radians(cy)))
                if len(s) >= 4:
                    out.append({'d': cod, 'a': area, 'r': [codificar(s)]})
            elif cod == '30':
                if cy < 31.5:
                    continue
                area = 'MPS' if (cx > -16.5 and cy > 32.95) else 'MAD'
                s = simplificar(anel, 0.0012, math.cos(math.radians(cy)))
                if len(s) >= 4:
                    out.append({'d': cod, 'a': area, 'r': [codificar(s)]})
            else:
                s = simplificar(anel, 0.0025, math.cos(math.radians(cy)))
                if len(s) >= 4:
                    existente = next((x for x in out if x['d'] == cod and 'a' not in x), None)
                    if existente:
                        existente['r'].append(codificar(s))
                    else:
                        out.append({'d': cod, 'r': [codificar(s)]})
    return out


def espanha(ne):
    a0 = carregar(os.path.join(ne, 'ne_10m_admin_0_countries.geojson'))
    caixa = [-10.5, 35.6, -5.0, 44.2]
    out = []
    for f in a0['features']:
        p = f['properties']
        if (p.get('ADM0_A3') or p.get('adm0_a3')) != 'ESP':
            continue
        for poly in poligonos(f['geometry']):
            anel = poly[0]
            xs = [q[0] for q in anel]
            ys = [q[1] for q in anel]
            if max(xs) < caixa[0] or min(xs) > caixa[2] or max(ys) < caixa[1] or min(ys) > caixa[3]:
                continue
            c = recortar(anel, caixa)
            if len(c) < 3:
                continue
            c.append(c[0])
            s = simplificar(c, 0.004, math.cos(math.radians(40)))
            if len(s) >= 4:
                out.append(codificar(s))
    return out


def mundo(ne):
    """Contornos dos países (1:110m) e o ponto central de cada país, com os nomes para reconhecer países em textos."""
    d = carregar(os.path.join(ne, 'ne_110m_admin_0_countries.geojson'))
    aneis, paises = [], []
    for f in d['features']:
        p = f['properties']
        if p.get('ADMIN') == 'Antarctica':
            continue
        inicio = len(aneis)
        for poly in poligonos(f['geometry']):
            anel = poly[0]
            cy = sum(q[1] for q in anel) / len(anel)
            s = simplificar(anel, 0.12, max(0.25, math.cos(math.radians(cy))))
            if len(s) >= 4:
                aneis.append(codificar(s, 100))
        if p.get('LABEL_X') is not None and p.get('LABEL_Y') is not None:
            nomes = sorted({str(n).lower() for n in (p.get('ADMIN'), p.get('NAME'), p.get('NAME_LONG'), p.get('NAME_EN'), p.get('NAME_SORT'), p.get('NAME_CIAWF'), p.get('NAME_ALT'), p.get('FORMAL_EN')) if n})
            # Os dois últimos campos dizem que anéis de "mundo" são deste país, para o pintar inteiro (ex.: zonas de conflito).
            paises.append([p.get('NAME_PT') or p.get('NAME'), round(p['LABEL_X'] * 100), round(p['LABEL_Y'] * 100), '|'.join(nomes), inicio, len(aneis) - inicio])
    return aneis, paises


def estradas(caminho):
    """Autoestradas (1) e vias rápidas (2) do OpenStreetMap, com as duas faixas fundidas numa linha."""
    dados = carregar(caminho)
    G = 0.004
    classes = {'motorway': 1, 'trunk': 2}
    grafos = {1: {}, 2: {}}
    somas = {1: defaultdict(lambda: [0.0, 0.0, 0]), 2: defaultdict(lambda: [0.0, 0.0, 0])}
    for w in dados.get('elements', []):
        if w.get('type') != 'way':
            continue
        t = classes.get((w.get('tags') or {}).get('highway'))
        geom = w.get('geometry') or []
        if not t or len(geom) < 2:
            continue
        arestas, soma = grafos[t], somas[t]
        ant = None
        for pt in geom:
            lon, lat = pt['lon'], pt['lat']
            c = (round(lon / G), round(lat / G))
            acc = soma[c]
            acc[0] += lon
            acc[1] += lat
            acc[2] += 1
            if ant is not None and c != ant:
                passos = max(abs(c[0] - ant[0]), abs(c[1] - ant[1]))
                ultimo = ant
                for k in range(1, passos + 1):
                    ci = (round(ant[0] + (c[0] - ant[0]) * k / passos), round(ant[1] + (c[1] - ant[1]) * k / passos))
                    if ci != ultimo:
                        chave = (ultimo, ci) if ultimo < ci else (ci, ultimo)
                        arestas[chave] = 1
                        ultimo = ci
            ant = c
    out = []
    for t in (1, 2):
        arestas, soma = grafos[t], somas[t]
        viz = defaultdict(set)
        for a, b in arestas:
            viz[a].add(b)
            viz[b].add(a)
        usadas = set()

        def chave(a, b):
            return (a, b) if a < b else (b, a)

        def andar(ini, seg):
            linha = [ini, seg]
            usadas.add(chave(ini, seg))
            ant, cur = ini, seg
            while len(viz[cur]) == 2:
                prox = [x for x in viz[cur] if x != ant][0]
                k = chave(cur, prox)
                if k in usadas:
                    break
                usadas.add(k)
                linha.append(prox)
                ant, cur = cur, prox
            return linha

        cadeias = []
        for no in list(viz):
            if len(viz[no]) != 2:
                for v in viz[no]:
                    if chave(no, v) not in usadas:
                        cadeias.append(andar(no, v))
        for a, b in arestas:
            if (a, b) not in usadas:
                cadeias.append(andar(a, b))

        def centro(c):
            acc = soma.get(c)
            if acc and acc[2]:
                return (acc[0] / acc[2], acc[1] / acc[2])
            return (c[0] * G, c[1] * G)

        for cad in cadeias:
            pts = [centro(c) for c in cad]
            cy = sum(p[1] for p in pts) / len(pts)
            s = simplificar(pts, 0.0012, math.cos(math.radians(cy)))
            enc = codificar(s)
            if len(enc) >= 4:
                out.append({'t': t, 'p': enc})
    return out


def rios(ne):
    out = []
    caixa = [-9.9, 36.8, -6.0, 42.2]
    for nome in ('ne_10m_rivers_lake_centerlines.geojson', 'ne_10m_rivers_europe.geojson'):
        caminho = os.path.join(ne, nome)
        if not os.path.exists(caminho):
            continue
        for f in carregar(caminho)['features']:
            if (f['properties'].get('name') or '') in RIOS_ESPANHOLES:
                continue
            for l in linhas(f['geometry']):
                if not any(caixa[0] <= x <= caixa[2] and caixa[1] <= y <= caixa[3] for x, y in l):
                    continue
                if not any(x < -6.9 for x, y in l):
                    continue
                s = simplificar([tuple(p) for p in l], 0.002, math.cos(math.radians(40)))
                enc = codificar(s)
                if len(enc) >= 4:
                    out.append({'p': enc})
    return out


def localidades(caminho):
    dados = carregar(caminho)
    melhores = {}
    for e in dados.get('elements', []):
        if e.get('type') != 'node':
            continue
        t = e.get('tags') or {}
        nome = (t.get('name') or '').strip()
        if not nome:
            continue
        pop = int(''.join(ch for ch in t.get('population', '') if ch.isdigit()) or 0)
        rank = 1 if nome in CAPITAIS else 2 if t.get('place') == 'city' else 3
        ant = melhores.get(nome)
        if ant is None or (rank, -pop) < (ant[3], -ant[4]):
            melhores[nome] = (nome, round(e['lon'] * 1000), round(e['lat'] * 1000), rank, pop)
    lista = sorted(melhores.values(), key=lambda x: (x[3], -x[4]))
    return [[n, x, y, r] for n, x, y, r, _ in lista]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--ne', required=True)
    ap.add_argument('--estradas', required=True)
    ap.add_argument('--localidades', required=True)
    ap.add_argument('--saida', required=True)
    a = ap.parse_args()
    aneis_mundo, paises = mundo(a.ne)
    base = {
        'fonte': 'Natural Earth (domínio público) e © colaboradores do OpenStreetMap (ODbL)',
        'vistas': VISTAS,
        'distritos': distritos_e_ilhas(a.ne),
        'vizinhos': espanha(a.ne),
        'estradas': estradas(a.estradas),
        'rios': rios(a.ne),
        'cidades': localidades(a.localidades),
        'mundo': aneis_mundo,
        'paises': paises,
    }
    texto = json.dumps(base, ensure_ascii=False, separators=(',', ':'))
    js = ('/* Mapa-base de Portugal e do mundo, gerado por tools/mapa_base.py a partir do Natural Earth (domínio público)\n'
          '   e do OpenStreetMap (© colaboradores do OpenStreetMap, licença ODbL). Não editar à mão. */\n'
          'const MAPA_BASE = ' + texto + ';\n')
    with open(a.saida, 'w', encoding='utf-8', newline='\n') as f:
        f.write(js)
    pts = lambda arr: sum(len(x) // 2 for x in arr)
    print('distritos e ilhas:', len(base['distritos']), 'pontos', sum(pts(d['r']) for d in base['distritos']))
    print('Espanha:', len(base['vizinhos']), 'pontos', pts(base['vizinhos']))
    print('estradas:', len(base['estradas']), 'pontos', sum(len(x['p']) // 2 for x in base['estradas']))
    print('rios:', len(base['rios']), 'pontos', sum(len(x['p']) // 2 for x in base['rios']))
    print('localidades:', len(base['cidades']), 'capitais', sum(1 for c in base['cidades'] if c[3] == 1))
    print('mundo:', len(base['mundo']), 'anéis, pontos', pts(base['mundo']), '| países com ponto central:', len(paises))
    print('ficheiro:', a.saida, round(len(js.encode('utf-8')) / 1024), 'KB')


if __name__ == '__main__':
    main()
