/* Nomes em inglês dos países do mapa do mundo (MAPA_BASE.paises), pela chave do nome português.
   O comentário tem os nomes alternativos do Natural Earth, para ajudar. */
const MAPA_PAISES_EN = {
  'Fiji': 'Fiji', // fiji|republic of fiji
  'Tanzânia': 'Tanzania', // tanzania|united republic of tanzania
  'Sara Ocidental': 'Western Sahara', // sahrawi arab democratic republic|w. sahara|western sahara
  'Canadá': 'Canada', // canada
  'Estados Unidos': 'United States', // united states|united states of america
  'Cazaquistão': 'Kazakhstan', // kazakhstan|republic of kazakhstan
  'Uzbequistão': 'Uzbekistan', // republic of uzbekistan|uzbekistan
  'Papua-Nova Guiné': 'Papua New Guinea', // independent state of papua new guinea|papua new guinea
  'Indonésia': 'Indonesia', // indonesia|republic of indonesia
  'Argentina': 'Argentina', // argentina|argentine republic
  'Chile': 'Chile', // chile|republic of chile
  'República Democrática do Congo': 'DR Congo', // congo, dem. rep.|congo, democratic republic of the|dem. rep. congo|democratic republic of the congo
  'Somália': 'Somalia', // federal republic of somalia|somalia
  'Quénia': 'Kenya', // kenya|republic of kenya
  'Sudão': 'Sudan', // republic of the sudan|sudan
  'Chade': 'Chad', // chad|republic of chad
  'Haiti': 'Haiti', // haiti|republic of haiti
  'República Dominicana': 'Dominican Republic', // dominican rep.|dominican republic
  'Rússia': 'Russia', // russia|russian federation
  'Bahamas': 'Bahamas', // bahamas|bahamas, the|commonwealth of the bahamas|the bahamas
  'Ilhas Malvinas': 'Falkland Islands', // falkland is.|falkland islands|falkland islands (islas malvinas)|falkland islands / malvinas|islas malvinas
  'Noruega': 'Norway', // kingdom of norway|norway
  'Groenlândia': 'Greenland', // greenland
  'Terras Austrais e Antárticas Francesas': 'French Southern Territories', // fr. s. antarctic lands|french southern and antarctic lands|territory of the french southern and antarctic lands
  'Timor-Leste': 'East Timor', // democratic republic of timor-leste|east timor|timor-leste
  'África do Sul': 'South Africa', // republic of south africa|south africa
  'Lesoto': 'Lesotho', // kingdom of lesotho|lesotho
  'México': 'Mexico', // mexico|united mexican states
  'Uruguai': 'Uruguay', // oriental republic of uruguay|uruguay
  'Brasil': 'Brazil', // brazil|federative republic of brazil
  'Bolívia': 'Bolivia', // bolivia|plurinational state of bolivia
  'Peru': 'Peru', // peru|republic of peru
  'Colômbia': 'Colombia', // colombia|republic of colombia
  'Panamá': 'Panama', // panama|republic of panama
  'Costa Rica': 'Costa Rica', // costa rica|republic of costa rica
  'Nicarágua': 'Nicaragua', // nicaragua|republic of nicaragua
  'Honduras': 'Honduras', // honduras|republic of honduras
  'El Salvador': 'El Salvador', // el salvador|republic of el salvador
  'Guatemala': 'Guatemala', // guatemala|republic of guatemala
  'Belize': 'Belize', // belize
  'Venezuela': 'Venezuela', // bolivarian republic of venezuela|venezuela|venezuela, rb
  'Guiana': 'Guyana', // co-operative republic of guyana|guyana
  'Suriname': 'Suriname', // republic of suriname|suriname
  'França': 'France', // france|french republic
  'Equador': 'Ecuador', // ecuador|republic of ecuador
  'Porto Rico': 'Puerto Rico', // commonwealth of puerto rico|puerto rico
  'Jamaica': 'Jamaica', // jamaica
  'Cuba': 'Cuba', // cuba|republic of cuba
  'Zimbábue': 'Zimbabwe', // republic of zimbabwe|zimbabwe
  'Botsuana': 'Botswana', // botswana|republic of botswana
  'Namíbia': 'Namibia', // namibia|republic of namibia
  'Senegal': 'Senegal', // republic of senegal|senegal
  'Mali': 'Mali', // mali|republic of mali
  'Mauritânia': 'Mauritania', // islamic republic of mauritania|mauritania
  'Benim': 'Benin', // benin|republic of benin
  'Níger': 'Niger', // niger|republic of niger
  'Nigéria': 'Nigeria', // federal republic of nigeria|nigeria
  'Camarões': 'Cameroon', // cameroon|republic of cameroon
  'Togo': 'Togo', // togo|togolese republic
  'Gana': 'Ghana', // ghana|republic of ghana
  'Costa do Marfim': 'Côte d’Ivoire', // cote d'ivoire|côte d'ivoire|ivory coast|republic of ivory coast
  'Guiné': 'Guinea', // guinea|republic of guinea
  'Guiné-Bissau': 'Guinea-Bissau', // guinea-bissau|republic of guinea-bissau
  'Libéria': 'Liberia', // liberia|republic of liberia
  'Serra Leoa': 'Sierra Leone', // republic of sierra leone|sierra leone
  'Burkina Faso': 'Burkina Faso', // burkina faso
  'República Centro-Africana': 'Central African Republic', // central african rep.|central african republic
  'República do Congo': 'Congo', // congo|congo, rep.|congo, republic of the|republic of the congo
  'Gabão': 'Gabon', // gabon|gabonese republic
  'Guiné Equatorial': 'Equatorial Guinea', // eq. guinea|equatorial guinea|republic of equatorial guinea
  'Zâmbia': 'Zambia', // republic of zambia|zambia
  'Malawi': 'Malawi', // malawi|republic of malawi
  'Moçambique': 'Mozambique', // mozambique|republic of mozambique
  'Essuatíni': 'Eswatini', // eswatini|kingdom of eswatini|swaziland
  'Angola': 'Angola', // angola|people's republic of angola
  'Burundi': 'Burundi', // burundi|republic of burundi
  'Israel': 'Israel', // israel|state of israel
  'Líbano': 'Lebanon', // lebanese republic|lebanon
  'Madagáscar': 'Madagascar', // madagascar|republic of madagascar
  'Palestina': 'Palestine', // palestine|palestine (west bank and gaza)|west bank and gaza
  'Gâmbia': 'Gambia', // gambia|gambia, the|republic of the gambia|the gambia
  'Tunísia': 'Tunisia', // republic of tunisia|tunisia
  'Argélia': 'Algeria', // algeria|people's democratic republic of algeria
  'Jordânia': 'Jordan', // hashemite kingdom of jordan|jordan
  'Emirados Árabes Unidos': 'United Arab Emirates', // united arab emirates
  'Catar': 'Qatar', // qatar|state of qatar
  'Kuwait': 'Kuwait', // kuwait|state of kuwait
  'Iraque': 'Iraq', // iraq|republic of iraq
  'Omã': 'Oman', // oman|sultanate of oman
  'Vanuatu': 'Vanuatu', // republic of vanuatu|vanuatu
  'Camboja': 'Cambodia', // cambodia|kingdom of cambodia
  'Tailândia': 'Thailand', // kingdom of thailand|thailand
  'Laos': 'Laos', // lao pdr|lao people's democratic republic|laos
  'Myanmar': 'Myanmar', // burma|myanmar|republic of the union of myanmar
  'Vietname': 'Vietnam', // socialist republic of vietnam|vietnam
  'Coreia do Norte': 'North Korea', // dem. rep. korea|democratic people's republic of korea|korea, dem. rep.|korea, north|north korea
  'Coreia do Sul': 'South Korea', // korea, rep.|korea, south|republic of korea|south korea
  'Mongólia': 'Mongolia', // mongolia
  'Índia': 'India', // india|republic of india
  'Bangladesh': 'Bangladesh', // bangladesh|people's republic of bangladesh
  'Butão': 'Bhutan', // bhutan|kingdom of bhutan
  'Nepal': 'Nepal', // nepal
  'Paquistão': 'Pakistan', // islamic republic of pakistan|pakistan
  'Afeganistão': 'Afghanistan', // afghanistan|islamic state of afghanistan
  'Tajiquistão': 'Tajikistan', // republic of tajikistan|tajikistan
  'Quirguistão': 'Kyrgyzstan', // kyrgyz republic|kyrgyzstan
  'Turquemenistão': 'Turkmenistan', // turkmenistan
  'Irão': 'Iran', // iran|iran, islamic rep.|islamic republic of iran
  'Síria': 'Syria', // syria|syrian arab republic
  'Arménia': 'Armenia', // armenia|republic of armenia
  'Suécia': 'Sweden', // kingdom of sweden|sweden
  'Bielorrússia': 'Belarus', // belarus|republic of belarus
  'Ucrânia': 'Ukraine', // ukraine
  'Polónia': 'Poland', // poland|republic of poland
  'Áustria': 'Austria', // austria|republic of austria
  'Hungria': 'Hungary', // hungary|republic of hungary
  'Moldávia': 'Moldova', // moldova|republic of moldova
  'Roménia': 'Romania', // romania
  'Lituânia': 'Lithuania', // lithuania|republic of lithuania
  'Letónia': 'Latvia', // latvia|republic of latvia
  'Estónia': 'Estonia', // estonia|republic of estonia
  'Alemanha': 'Germany', // federal republic of germany|germany
  'Bulgária': 'Bulgaria', // bulgaria|republic of bulgaria
  'Grécia': 'Greece', // greece|hellenic republic
  'Turquia': 'Turkey', // republic of turkey|turkey
  'Albânia': 'Albania', // albania|republic of albania
  'Croácia': 'Croatia', // croatia|republic of croatia
  'Suíça': 'Switzerland', // swiss confederation|switzerland
  'Luxemburgo': 'Luxembourg', // grand duchy of luxembourg|luxembourg
  'Bélgica': 'Belgium', // belgium|kingdom of belgium
  'Países Baixos': 'Netherlands', // kingdom of the netherlands|netherlands
  'Portugal': 'Portugal', // portugal|portuguese republic
  'Espanha': 'Spain', // kingdom of spain|spain
  'República da Irlanda': 'Ireland', // ireland
  'Nova Caledónia': 'New Caledonia', // new caledonia
  'Ilhas Salomão': 'Solomon Islands', // solomon is.|solomon islands
  'Nova Zelândia': 'New Zealand', // new zealand
  'Austrália': 'Australia', // australia|commonwealth of australia
  'Sri Lanka': 'Sri Lanka', // democratic socialist republic of sri lanka|sri lanka
  'China': 'China', // china|people's republic of china
  'Taiwan': 'Taiwan', // taiwan
  'Itália': 'Italy', // italian republic|italy
  'Dinamarca': 'Denmark', // denmark|kingdom of denmark
  'Reino Unido': 'United Kingdom', // united kingdom|united kingdom of great britain and northern ireland
  'Islândia': 'Iceland', // iceland|republic of iceland
  'Azerbaijão': 'Azerbaijan', // azerbaijan|republic of azerbaijan
  'Geórgia': 'Georgia', // georgia
  'Filipinas': 'Philippines', // philippines|republic of the philippines
  'Malásia': 'Malaysia', // malaysia
  'Brunei': 'Brunei', // brunei|brunei darussalam|negara brunei darussalam
  'Eslovénia': 'Slovenia', // republic of slovenia|slovenia
  'Finlândia': 'Finland', // finland|republic of finland
  'Eslováquia': 'Slovakia', // slovak republic|slovakia
  'Chéquia': 'Czechia', // czech republic|czechia|česko
  'Eritreia': 'Eritrea', // eritrea|state of eritrea
  'Japão': 'Japan', // japan
  'Paraguai': 'Paraguay', // paraguay|republic of paraguay
  'Iémen': 'Yemen', // republic of yemen|yemen|yemen, rep.
  'Arábia Saudita': 'Saudi Arabia', // kingdom of saudi arabia|saudi arabia
  'República Turca do Chipre do Norte': 'Northern Cyprus', // cyprus, northern|n. cyprus|northern cyprus|turkish republic of northern cyprus
  'Chipre': 'Cyprus', // cyprus|republic of cyprus
  'Marrocos': 'Morocco', // kingdom of morocco|morocco
  'Egito': 'Egypt', // arab republic of egypt|egypt|egypt, arab rep.
  'Líbia': 'Libya', // libya
  'Etiópia': 'Ethiopia', // ethiopia|federal democratic republic of ethiopia
  'Djibouti': 'Djibouti', // djibouti|republic of djibouti
  'Somalilândia': 'Somaliland', // republic of somaliland|somaliland
  'Uganda': 'Uganda', // republic of uganda|uganda
  'Ruanda': 'Rwanda', // republic of rwanda|rwanda
  'Bósnia e Herzegovina': 'Bosnia and Herzegovina', // bosnia and herz.|bosnia and herzegovina
  'Macedónia do Norte': 'North Macedonia', // north macedonia|republic of north macedonia
  'Sérvia': 'Serbia', // republic of serbia|serbia
  'Montenegro': 'Montenegro', // montenegro
  'Kosovo': 'Kosovo', // kosovo|republic of kosovo
  'Trinidad e Tobago': 'Trinidad and Tobago', // republic of trinidad and tobago|trinidad and tobago
  'Sudão do Sul': 'South Sudan', // republic of south sudan|s. sudan|south sudan
};
