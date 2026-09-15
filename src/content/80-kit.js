CONTENT.sections.push({
  id: 'kit', icon: '🎒', title: 'Kits e checklists',
  desc: 'Listas interativas: o que ter em casa, na mala de evacuação, no carro, no kit médico. As marcas ficam guardadas.',
  pages: [
    { id: 'kit-72h', icon: '🏠', title: 'Kit de 72 horas (casa)', desc: 'O mínimo recomendado pela União Europeia para aguentar 3 dias sem ajuda.', tools: ['inventario', 'reservas'], md: `
>i A Comissão Europeia recomenda desde 2025 que cada família consiga ser **autossuficiente durante 72 horas**. Esta lista está calculada para **{{fam}}**. Marca o que já tens; a app guarda. Regista as validades no [inventário](#/t/inventario).

## Água e comida

- [ ] Água: **{{water_3d}} L** no total ({{jugs_3d}} garrafões de 5 L), fechada
- [ ] Comprimidos ou gotas de purificação de água, ou filtro portátil
- [ ] Comida para 3 dias que não precise de frio nem de cozinhar: cerca de {{kcal_3d}} mil kcal (latas, bolachas, frutos secos, barras, fruta seca)
- [ ] Leite para as crianças: {{milk_3d}} L (UHT ou em pó)
- [ ] Comida própria {{de_c1}}: papas, purés em frasco, bolachas moles, iogurtes de longa duração
- [ ] Abre-latas manual
- [ ] Fogareiro de campismo e 3 cartuchos, ou botija de gás com carga
- [ ] Fósforos em saco estanque e 2 isqueiros, fora do alcance das crianças
- [ ] Comida para os animais (3 dias), se houver

## Para as crianças

- [ ] Fraldas ({{diapers_3d}}), toalhitas, creme barreira e sacos
- [ ] Paracetamol e ibuprofeno em xarope, seringas doseadoras, soro oral e termómetro ([doses](#/t/doses))
- [ ] Protetores auriculares de criança, um por criança
- [ ] Porta-bebé ou mochila de transporte para {{c1}}
- [ ] Cadeirinha e assento elevatório sempre montados no carro
- [ ] Chucha, copo habitual e o boneco de cada criança, em duplicado
- [ ] Muda de roupa completa de cada criança, em saco estanque
- [ ] Jogos sem eletricidade: cartas, livros, papel e lápis ([ideias](#/s/familia/ocupar-e-acalmar))
- [ ] Cartão de identificação no bolso de cada criança ([imprimir](#/t/cartoes))

## Luz, energia e informação

- [ ] Lanterna por pessoa (frontal de preferência) e pilhas de reserva
- [ ] Candeeiro de campismo a pilhas ou recarregável
- [ ] Luz de presença a pilhas para as noites das crianças (sem velas)
- [ ] Rádio a pilhas ou a dínamo (AM/FM)
- [ ] Powerbank de 10 000 mAh ou mais, carregada, e cabos
- [ ] Pilhas AA e AAA (20 de cada)
- [ ] Carregador de carro

## Saúde e higiene

- [ ] Kit de primeiros socorros ([lista](#/s/kit/kit-medico))
- [ ] Medicação crónica para 1 mês e lista de medicação de cada pessoa
- [ ] Máscaras FFP2 (de adulto e de criança), luvas descartáveis, gel de álcool
- [ ] Papel higiénico, toalhitas, sabão, escovas e pasta de dentes, pensos higiénicos
- [ ] Sacos de lixo resistentes e um balde com tampa (sanita de emergência)
- [ ] Lixívia simples, guardada fora do alcance das crianças

## Ferramentas e proteção

- [ ] Extintor e manta anti-fogo
- [ ] Detetor de fumo e detetor de monóxido de carbono
- [ ] Canivete multifunções, fita adesiva forte, corda ou cordel (10 m)
- [ ] Chave inglesa (para o gás e a água), alicate, chave de fendas
- [ ] Apito para cada adulto e para {{c2}}
- [ ] Luvas de trabalho, óculos de proteção
- [ ] Manta térmica por pessoa e cobertores
- [ ] Plástico e fita para tapar vidros partidos
- [ ] Sapatos fechados ao lado de cada cama

## Documentos e dinheiro

- [ ] Cópias dos documentos de todos, incluindo boletins de saúde e de vacinas das crianças, em saco estanque e no [cofre](#/t/cofre)
- [ ] Dinheiro em notas pequenas (mínimo 200 €), repartido
- [ ] Plano familiar impresso, contactos e mapa da região em papel
- [ ] Fotos recentes de cada criança, impressas
- [ ] Chaves de reserva de casa e do carro
- [ ] Este guia: ficheiro numa pen e páginas essenciais impressas

## Conforto

- [ ] Café, chá, chocolate e lanches de que as crianças gostem
- [ ] Tampões para os ouvidos dos adultos e máscara de dormir

## Manutenção

- [ ] Revisão de 6 em 6 meses: validades, pilhas, powerbanks, roupa e sapatos que já não servem às crianças e peso das crianças no [perfil](#/t/familia)
- [ ] Toda a gente em casa sabe onde está o kit, incluindo {{c2}}
` },

    { id: 'mala-evacuacao', icon: '🎒', title: 'Mala de evacuação', desc: 'Uma mochila por pessoa, pronta à porta, para sair em 2 minutos e aguentar 3 dias.', md: `
## Regras

- **Três mochilas para a família**: a **mochila grande** ({{a2}}), a **mochila pequena** ({{a1}}, que leva {{c1}} no porta-bebé) e a **mochila {{de_c2}}**.
- Prontas, fechadas, sempre no mesmo sítio, perto da porta. Revê-as de 6 em 6 meses: roupa, tamanhos, validades.
- Pesos: mochila grande até 12 a 15 kg; mochila pequena à frente até 5 kg; mochila {{de_c2}} 2 a 3 kg.
- Pensa em **3 dias a pé, com qualquer tempo**. Ver [quem faz o quê](#/s/familia/numeros).

## Ao corpo (cada adulto, numa bolsa interior)

- [ ] Documentos originais ou cópias autenticadas, cartão de saúde, lista de medicação
- [ ] Dinheiro em notas pequenas, repartido pelos dois adultos
- [ ] Telemóvel, cabo e powerbank carregada
- [ ] Chaves, contactos escritos, plano familiar impresso e fotos das crianças
- [ ] Pen com a [cópia de segurança](#/t/backup) da app e dos documentos

## Mochila pequena ({{a1}}, com {{c1}} ao colo)

- [ ] Porta-bebé ergonómico
- [ ] Água (1 L) e o copo {{de_c1}}
- [ ] Fraldas para um dia, toalhitas, creme e sacos
- [ ] Leite e lanches {{de_c1}}, chucha de reserva e o boneco
- [ ] Rádio pequeno, lanterna frontal e apito
- [ ] Documentos e dinheiro da família

## Mochila grande ({{a2}})

- [ ] Água (3 a 4 L) e meios de purificar (comprimidos ou filtro)
- [ ] Comida para 3 dias para todos, leve e sem cozinhar: barras, frutos secos, bolachas, latas pequenas de abertura fácil, fruta seca, chocolate
- [ ] Leite para as crianças ({{milk_3d}} L em pó ou UHT) e papas ou purés {{de_c1}}
- [ ] Fraldas para os restantes dias ({{diapers_3d}} no total) e toalhitas
- [ ] Kit de primeiros socorros com os medicamentos das crianças e seringas doseadoras
- [ ] Mudas de roupa de todos em sacos estanques, meias extra, gorros e casacos leves
- [ ] Mantas térmicas (uma por pessoa), poncho, 2 sacos de lixo grandes e 10 m de cordel
- [ ] Caneca ou panela de metal, isqueiro, fósforos estanques, canivete, fita adesiva forte
- [ ] Higiene: escovas e pasta, sabão, papel higiénico, gel, pensos higiénicos
- [ ] Protetor solar, repelente e máscaras FFP2

## Mochila {{de_c2}} (2 a 3 kg)

- [ ] Garrafa de água de 0,5 L e um lanche
- [ ] Lanterna pequena e apito ao pescoço
- [ ] Casaco leve, gorro, roupa interior e meias de reserva
- [ ] Brinquedo pequeno, livro, lápis e caderno
- [ ] Protetores auriculares
- [ ] Cartão de identificação ([imprimir](#/t/cartoes)) e foto da família

## Animais

- [ ] Trela, açaime, transportadora, comida para 3 dias, taça dobrável, boletim de vacinas e foto com o dono

## Truques

- Roupa e comida em sacos de fecho (organizam, impermeabilizam e servem depois).
- O que precisas depressa (lanterna, documentos, água, fraldas) nos bolsos de fora.
- As mochilas não se "esvaziam" para uma viagem: para viajar faz-se outra.
- Uma versão mínima (documentos, dinheiro, água, lanterna, medicação, fraldas) no carro e no trabalho.
` },

    { id: 'kit-carro', icon: '🚗', title: 'Kit do carro', desc: 'Para ficar preso, avariar, ou evacuar.', md: `
## Sempre

- [ ] Depósito **nunca abaixo de meio**
- [ ] Colete refletor (por ocupante), triângulo
- [ ] Martelo quebra-vidros com corta-cintos, ao alcance do condutor
- [ ] Extintor pequeno (1 kg)
- [ ] Kit de primeiros socorros
- [ ] Água 2 a 4 L (troca de 6 em 6 meses; no verão o plástico degrada: à sombra), barras ou frutos secos
- [ ] Cobertor ou manta térmica, casaco velho, luvas de trabalho, gorro
- [ ] Lanterna e pilhas, powerbank, carregador de isqueiro, cabos
- [ ] Cabos de bateria, corda de reboque, roda sobresselente ou kit de reparação, macaco e chave (verifica que sabes usar)
- [ ] Papel higiénico, sacos de lixo, toalhitas, saco para vómitos
- [ ] Mapa de papel da região, notas pequenas, moedas
- [ ] Papel e caneta, lista de contactos
- [ ] Pá pequena dobrável, fita americana, canivete
- [ ] Fluido de para-brisas, óleo, líquido de refrigeração (verificar níveis mensalmente)

## Inverno e montanha

- [ ] Correntes para a neve (treinar a pôr), raspador de gelo, sal ou areia (tração), pá
- [ ] Mantas e roupa quente extra, velas e isqueiro (uma vela aquece o habitáculo, com janela entreaberta)
- [ ] Comida com mais calorias, termo com bebida quente ao sair

## Verão e incêndios rurais

- [ ] Mais água (6 L), chapéus
- [ ] Manta de lã (não sintética) para proteção de radiação térmica
- [ ] Máscaras FFP2 (fumo), óculos
- [ ] Rádio ligado nas zonas de risco

## Evacuação

- [ ] Mala de evacuação de cada um vai para o carro
- [ ] Jerricã de combustível (20 L, homologado, fora do habitáculo, ou na mala bem preso)
- [ ] Documentos do carro, seguro, chave sobresselente em sítio combinado

## Com crianças

- [ ] Cadeirinha {{de_c1}} e assento elevatório {{de_c2}}, bem fixos
- [ ] Muda de roupa de cada criança, fraldas, toalhitas e sacos para vómito
- [ ] Água com bico, lanches e leite de longa duração
- [ ] Mantas, protetores de sol para os vidros, brinquedos e livros
- [ ] Porta-bebé enrolado debaixo de um banco

## Manutenção

Pneus (pressão mensal, piso), travões, bateria (mais de 4 anos: risco), escovas, luzes. Um carro que arranca à primeira é equipamento de emergência.
` },

    { id: 'kit-medico', icon: '🩺', title: 'Kit de primeiros socorros', desc: 'O que deve ter, e o que a maioria dos kits comprados não traz.', md: `
## Ferramentas

- [ ] Luvas de nitrilo (10 pares), máscara de bolso para RCP
- [ ] Tesoura de trauma (ponta romba, corta roupa e cintos), pinça fina, alfinetes de dama
- [ ] Termómetro, oxímetro de dedo (mede oxigénio; abaixo de 92% é urgente)
- [ ] Lanterna pequena, caneta e bloco (registar horas, doses, torniquetes)
- [ ] Manta térmica (2), saco de gelo instantâneo (2)
- [ ] Seringa de 10 a 20 ml sem agulha (irrigar feridas), soro fisiológico em ampolas

## Hemorragias e feridas

- [ ] Compressas esterilizadas 10×10 (20), compressas grandes de trauma (2 a 4)
- [ ] Ligaduras elásticas (2 de 6 cm, 2 de 10 cm), ligadura compressiva israelita ou similar (2)
- [ ] **Torniquete** comercial (CAT ou SOF-T, 1 a 2). Aprende a usar num braço antes de precisares
- [ ] Gaze hemostática (QuikClot, Celox) se puderes
- [ ] Pensos rápidos de vários tamanhos (30), pensos de bolhas (10), tiras de aproximação (strips)
- [ ] Adesivo de papel (2 rolos), fita americana pequena
- [ ] Desinfetante (clorexidina ou iodopovidona), toalhitas de álcool
- [ ] Película aderente (queimaduras), compressas não aderentes, pomada de queimaduras ou vaselina
- [ ] Lenço triangular (2) para suspensórios e imobilizações, tala moldável (SAM splint)
- [ ] Penso ocular, soro para lavar olhos

## Medicamentos (adultos; ver [doses](#/s/socorros/medicamentos))

- [ ] Paracetamol 1 g (20), ibuprofeno 400 mg (20), aspirina 100 mg (10, para enfarte)
- [ ] Anti-histamínico (cetirizina 10 mg, 10), creme de hidrocortisona 1%
- [ ] Soro de reidratação oral (10 saquetas), loperamida (10)
- [ ] Antiácido, omeprazol
- [ ] Anti-enjoo (dimenidrinato), se viajas
- [ ] Antifúngico (clotrimazol), pomada antibiótica se tiveres receita
- [ ] Gotas ou comprimidos de purificação de água
- [ ] Iodeto de potássio (se há central nuclear a menos de 300 km)
- [ ] Medicação pessoal de cada um para 1 semana
- [ ] Doses pediátricas (paracetamol e ibuprofeno em xarope) se há crianças
- [ ] Adrenalina auto-injetável se alguém tem alergia grave

## Outros

- [ ] Preservativos, pensos higiénicos, teste de gravidez
- [ ] Protetor solar, repelente, creme para picadas
- [ ] Este guia (páginas de primeiros socorros impressas)

## Para as crianças

- [ ] Paracetamol xarope 40 mg/ml e ibuprofeno xarope 20 mg/ml (2 frascos de cada), com seringas doseadoras
- [ ] Supositórios de paracetamol nas dosagens dos pesos das crianças
- [ ] Soro de reidratação oral (10 saquetas) e soro fisiológico em ampolas
- [ ] Aspirador nasal, termómetro digital e oxímetro de dedo pediátrico
- [ ] Cetirizina em gotas, creme barreira e pomada para picadas
- [ ] Pensos pequenos e com desenhos (ajudam mais do que parece)
- [ ] Doses de cada criança anotadas: [calculadora de doses](#/t/doses)

## Organização e manutenção

Bolsa com compartimentos, etiquetada, no mesmo sítio, toda a gente sabe. Um kit pequeno no carro e na mala de evacuação. Verifica validades de 6 em 6 meses (a maioria dos medicamentos sólidos aguenta anos além da validade; os líquidos não). Repõe o que usas no próprio dia.

## O melhor item

**Um curso de primeiros socorros** (Cruz Vermelha, INEM, bombeiros: 4 a 16 horas). O material sem saber usá-lo vale pouco.
` },

    { id: 'documentos', icon: '📄', title: 'Documentos e informação', desc: 'O que ter em papel, no cofre e na cabeça.', tools: ['cofre'], md: `
## Em papel, num saco estanque, na mala de evacuação

- [ ] Cartão de cidadão, passaporte (válidos), carta de condução
- [ ] Certidões de nascimento, casamento, óbito relevantes (cópias)
- [ ] Cartão do SNS, seguro de saúde, cartão europeu de seguro de doença, boletim de vacinas
- [ ] Lista de medicação, alergias, grupo sanguíneo, contactos médicos, diretivas antecipadas se existirem
- [ ] Apólices de seguro (casa, carro, vida) com números e telefones
- [ ] Escritura ou contrato de arrendamento, comprovativo de morada
- [ ] Documentos do carro, registo de animais e boletim de vacinas
- [ ] Números de contas bancárias, IBAN, contactos dos bancos
- [ ] Diplomas e certificados profissionais (cópias)
- [ ] Fotos recentes de cada membro da família e do agregado junto
- [ ] Boletins de saúde e de vacinas das crianças
- [ ] Autorização de saída de menores do país, se as crianças puderem ter de viajar só com um dos pais ou com outra pessoa
- [ ] Plano familiar impresso, contactos, mapa com pontos de encontro
- [ ] Inventário fotográfico da casa para o seguro (fotos de cada divisão)
- [ ] Testamento ou indicações, se aplicável

## No cofre digital

Fotos de tudo o de cima, no [cofre encriptado](#/t/cofre). Também numa pen escondida e, se tiveres confiança, numa conta cloud encriptada.

## Na cabeça

- [ ] O número de telefone de 2 pessoas de confiança e do contacto fora da zona (sem o telemóvel, sabes?)
- [ ] A morada completa e a de um familiar
- [ ] O IBAN principal
- [ ] Os pontos de encontro e a palavra-código
- [ ] A palavra-passe do cofre (e de uma pessoa de confiança: a mesma)
- [ ] As doses da medicação de cada um

## Cópias autenticadas

Uma cópia autenticada (junta de freguesia, notário, advogado) do CC e das certidões custa pouco e substitui o original perdido em muitas situações. Faz para todos.

## Cidadãos estrangeiros

Título de residência, passaporte válido com mais de 6 meses, registo no consulado, contactos da embaixada. Portugueses no estrangeiro: registo no Portal das Comunidades e Gabinete de Emergência Consular (+351 217 929 714 ou 961 706 472, 24 horas).
` },

    { id: 'casa-preparada', icon: '🔨', title: 'Preparar a casa', desc: 'Medidas de uma vez que reduzem a maior parte dos riscos.', md: `
## Segurança básica

- [ ] Detetor de fumo em cada piso e junto aos quartos; pilha anual
- [ ] Detetor de monóxido de carbono junto a aparelhos de combustão e quartos
- [ ] Extintor de pó (6 kg) à entrada e um pequeno na cozinha, manta anti-fogo na cozinha
- [ ] Todos sabem onde ficam e como fechar o [gás, a água e a eletricidade](#/s/casa/cortar)
- [ ] Chaves das portas e janelas de saída sempre no mesmo sítio; plano de fuga de incêndio treinado
- [ ] Lanterna e sapatos ao lado de cada cama

## Sismo

- [ ] Estantes, armários altos, televisão, esquentador, frigorífico fixados à parede
- [ ] Nada pesado por cima das camas e sofás (quadros, prateleiras)
- [ ] Objetos pesados nas prateleiras de baixo, trincos nos armários da cozinha
- [ ] Botija de gás presa, com tubo em boas condições e válvula acessível
- [ ] Sabe qual é o local mais seguro em cada divisão (mesa sólida, parede interior)

## Cheia (se a zona tem risco)

- [ ] Tomadas e quadro elétrico acima do nível provável da água
- [ ] Objetos de valor e documentos no piso superior
- [ ] Sacos de areia ou barreiras, válvula anti-retorno no esgoto
- [ ] Bomba de água manual ou a bateria

## Incêndio rural (casa em zona de mato)

- [ ] Faixa de 50 m limpa de mato à volta da casa (obrigatório por lei), árvores a mais de 5 m do telhado
- [ ] Sem lenha, gás, mobiliário de jardim ou lixo encostados às paredes
- [ ] Redes finas nas ventilações, caleiras limpas, telhado sem folhas
- [ ] Mangueira que chegue a toda a volta, depósito de água, bomba se possível
- [ ] Portas e janelas com vidro duplo, persianas exteriores

## Tempestade

- [ ] Telhado e antenas verificados anualmente, caleiras limpas
- [ ] Árvores grandes junto à casa podadas
- [ ] Persianas ou portadas em bom estado

## Explosões e conflito (se aplicável)

- [ ] Divisão-abrigo identificada e equipada ([ver](#/s/casa/abrigo-explosoes))
- [ ] Película de segurança ou fita nas janelas, cortinas grossas
- [ ] Abrigo público mais próximo identificado

## Autonomia

- [ ] Água armazenada (mínimo 12 L por pessoa), meios de purificar
- [ ] Despensa de 2 semanas com rotação
- [ ] Meios de cozinhar sem eletricidade e combustível
- [ ] Rádio a pilhas, lanternas, powerbanks, painel solar
- [ ] Aquecimento alternativo seguro (lareira, salamandra) ou plano de "divisão quente"
- [ ] Horta, mesmo pequena, e sementes; árvores de fruto se houver terreno
- [ ] Ferramentas básicas e materiais de reparação (fita, plástico, arame, madeira, pregos, cola)
- [ ] Bicicleta em condições

## Comunidade

- [ ] Conheces os vizinhos de porta e sabes quem precisa de ajuda
- [ ] Sabes quem tem competências úteis (saúde, eletricidade, mecânica, rádio)
- [ ] Grupo de mensagens ou lista de telefones da rua ou prédio
` },

    { id: 'revisao', icon: '🔄', title: 'Revisão semestral', desc: 'A rotina que mantém tudo pronto: 1 hora, duas vezes por ano.', md: `
>+ Faz coincidir com a mudança da hora (março e outubro). Põe um lembrete no telemóvel agora.

## Checklist de revisão

- [ ] Água: trocar a armazenada em garrafas reutilizadas; verificar validades das compradas
- [ ] Comida: consumir o que expira em 6 meses e repor; verificar latas (amolgadelas, ferrugem)
- [ ] Medicamentos: validades, repor os usados, medicação crónica para 1 mês
- [ ] Pilhas: testar lanternas e rádio, trocar pilhas antigas, carregar recarregáveis
- [ ] Powerbanks e estação de energia: carregar a 100%, testar
- [ ] Painel solar: testar num dia de sol
- [ ] Gerador: ligar 15 minutos, verificar óleo e combustível (rodar o combustível)
- [ ] Detetores de fumo e CO: testar o botão, trocar pilhas
- [ ] Extintor: pressão no verde, prazo de revisão
- [ ] Mala de evacuação: roupa da estação, tamanhos das crianças, validades, documentos atualizados
- [ ] Kit do carro: água, comida, roupa da estação, pneus, correntes no outono
- [ ] Documentos: validades (CC, passaporte, seguros), atualizar cópias e o cofre
- [ ] Plano familiar: contactos, pontos de encontro, escola e trabalho, ler com todos
- [ ] Contactos: confirmar números de família, vizinhos, médico
- [ ] Cópia de segurança da app: [exportar](#/t/backup) e guardar na pen e noutro telemóvel
- [ ] Treino: simulacro de 10 minutos de "sair de casa" e "ir para o abrigo" com as crianças
- [ ] Competências: uma coisa nova por semestre (curso de primeiros socorros, usar o rádio, fazer fogo, purificar água)
- [ ] Casa: caleiras, mato à volta, árvores, fixações de móveis
- [ ] Vizinhos: uma conversa; quem entrou, quem precisa de ajuda

- [ ] Crianças: pesar e atualizar o [perfil](#/t/familia), roupa e sapatos que já não servem, cartões de identificação e fotos novas
- [ ] Escola e creche: confirmar a lista de pessoas autorizadas e o plano de emergência

## Depois de qualquer emergência real

Escreve o que faltou, o que sobrou, o que falhou e o que funcionou. Corrige o kit e o plano na semana seguinte, enquanto está fresco.
` }
  ]
});
