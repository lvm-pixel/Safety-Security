CONTENT_EN.sections['familia'] = {
  title: 'Our family',
  desc: 'Guides and numbers for {{fam_nomes}}: water, food, doses, school, evacuation, games and a safe home.',
  pages: {
    numeros: { title: 'Our numbers', desc: 'Water, food, nappies, milk, doses and who does what, calculated for {{fam_nomes}}.', md: `
>i Calculated for **{{fam_nomes}}**. If anything changes (weight, age, one more person, a pet), update the [family profile](#/t/familia): every number in the app changes by itself. The guides in this section were written for a child aged 2 and another aged 7; reread them as they grow.

## Water

| | Per day | 3 days | 2 weeks |
|---|---|---|---|
| Drinking and cooking only | {{water_drink_day}} L | {{water_drink_3d}} L | {{water_drink_14d}} L |
| With minimal hygiene (what you should store) | **{{water_day}} L** | **{{water_3d}} L** | **{{water_14d}} L** |
| In 5-litre water jugs | | **{{jugs_3d}}** | **{{jugs_14d}}** |

For drinking and cooking: {{water_detail}}. On top of that, add 2 L per person for hygiene (hands, teeth, nappies, wounds).{{pets_water_line}} Small children dehydrate within hours and do not ask for water: offer it every hour. In hot weather, or with fever or diarrhoea, allow 50% more.

## Food

**{{kcal_day}} kcal a day** for the family: {{kcal_detail}}. For 3 days, about {{kcal_3d}} thousand kcal; for 2 weeks, about **{{kcal_14d}} thousand kcal**.

- The [supplies calculator](#/t/reservas) already has our details and gives you the shopping list.
- Multiply the 1-adult list in the [pantry](#/s/comida/despensa) by **{{pd_factor}}** for the whole family.
- Children are not rationed like adults: if food runs short, the adults cut back first.

## Children's things you cannot do without

- **Nappies**: {{diapers_line}}
- **Milk**: {{milk_line}}
- **Food for {{c1}}**: soft and in small pieces (cereal porridge, purées in jars, soft biscuits, banana, long-life yoghurts). No whole nuts, whole grapes, boiled sweets or sausages cut into rounds: choking hazard.
- **Comfort**: dummy, usual cup or bottle and each child's cuddly toy, **in duplicate** (one stays in the grab bag).
- **Identification**: a card in each child's pocket with name, parents, two phone numbers, address, allergies and out-of-area contact. [Print cards](#/t/cartoes). A recent photo of each child on both adults' phones and on paper in the grab bag: children's faces change within months.
- **Ears**: children's ear defenders (headphone style) for sirens, explosions and crowded shelters.

## Medicines: our children's doses

| | {{c1_n}} (aged {{c1_age}}, {{c1_kg}} kg{{c1_kg_est}}) | {{c2_n}} (aged {{c2_age}}, {{c2_kg}} kg{{c2_kg_est}}) |
|---|---|---|
| Paracetamol, up to 4 times a day | **{{c1_para_mg}} mg** = {{c1_para_ml}} ml of 40 mg/ml syrup | **{{c2_para_mg}} mg** = {{c2_para_ml}} ml of 40 mg/ml syrup{{c2_para_tab}} |
| Ibuprofen, up to 3 times a day, with food | **{{c1_ibu_mg}} mg** = {{c1_ibu_ml}} ml of 20 mg/ml syrup | **{{c2_ibu_mg}} mg** = {{c2_ibu_ml}} ml of 20 mg/ml syrup |
| Oral rehydration solution (ORS), after each watery stool | {{c1_sro}} | {{c2_sro}} |
| ORS, if already dehydrated | {{c1_sro4h}} | {{c2_sro4h}} |
| Antihistamine (cetirizine) | {{c1_cet}} | {{c2_cet}} |
| Potassium iodide (iodine tablets), only on official orders | {{c1_ki}} | {{c2_ki}} |
| Adrenaline auto-injector | {{c1_adr}} | {{c2_adr}} |

If the weight shows as estimated, it comes from the age: for accurate doses, **weigh the children** and enter the weight in the [profile](#/t/familia). Log the doses given, and find other concentrations, in the [dose calculator](#/t/doses). **Never give aspirin to children.**

## Who does what

![Who carries whom when leaving on foot](fig:familia-carga)

- **{{a1}}** takes {{c1}}: in arms or in a baby carrier, with nappies, milk and dummy. Also carries the documents, the cash and the radio, which are light, because they are already carrying a child.
- **{{a2}}** takes {{c2}} by the hand and carries the big backpack: water, food, medical kit, clothes and, if there is one, the pet.
- **If only one adult is there**: {{c1}} in arms or in the baby carrier, {{c2}} holding on to the backpack or to a strap tied to the adult's wrist. {{C2}} can help with simple tasks (holding the torch, giving the dummy), but **is never left in charge of {{c1}}**.
- The meeting point, out-of-area contact and code word are the same for everyone. They are on each child's card and in the [family plan](#/t/plano).
- **Practise** once a month: "who picks up whom", with the backpacks, in 30 seconds. It becomes automatic.

## Transport

- **Car**: a child restraint suited to each child's weight and height, always fitted. {{C1}} in a rear-facing car seat for as long as possible; {{c2}} in a high-back booster seat (compulsory up to age 12 or 135 cm). In an evacuation there are no exceptions: in a crash at 50 km/h, nobody can hold on to a child on their lap.
- **On foot**: {{c1}} is carried in arms, in an ergonomic baby carrier or in a hiking child carrier backpack (it takes the child plus some load), or goes in a sturdy pushchair, which carries a load but cannot get through stairs, rubble, mud or crowds. {{C2}} walks **5 to 8 km a day**, with 10-minute breaks every 40 minutes. Realistic distance for the family: **8 to 12 km a day**.
- **Bicycle**: rear child seat for {{c1}}; {{c2}} on their own bike or in a trailer. You get 3 to 4 times further than on foot.
- More in [evacuating with children](#/s/familia/evacuar-com-criancas).
` },
    'crianca-pequena': { title: '{{c1_titulo}}: what changes', desc: 'Written for {{c1}}: nappies, milk, choking, being carried, fever, sleep and dangers at home.', md: `
## What changes at this age

- Does not understand danger, does not keep still, cannot say the parents' names or the address and cannot walk far. **Everything depends on you.** Never leave them alone, not even "just for a minute".
- Needs routine, sleep, meals on time and cuddles. Cries, has tantrums, regresses (dummy, nappies, waking at night): this is how they cope with stress, not bad behaviour.
- Dehydrates and gets cold within hours, because a small body has few reserves. Offer water every hour; layers of clothing, a hat, dry socks.
- Puts everything in their mouth: medicines, diluted bleach, button batteries, water purification tablets, silica gel sachets, plants, coins. See [safe home](#/s/familia/seguranca-criancas).
- Can drown in **5 cm of water**, silently: buckets and basins with water in them stay covered or out of reach.

## Food and drink

- Eats the family's food, **soft and in small pieces** (the size of the nail on the little finger). Little salt, nothing spicy.
- **Milk**: 400 to 500 ml a day, full-fat UHT or powdered. Long-life yoghurts and cheese also count.
- **Water**: about {{c1_water}} L a day for drinking and cooking, offered every hour in the usual cup. Sugary juices do not replace water and make diarrhoea worse.
- **Choking** is one of the main causes of accidental death at this age. No whole nuts, whole grapes or whole cherry tomatoes, boiled sweets, popcorn, raw carrot or apple in large pieces, or sausages cut into rounds. Cut food into thin strips, lengthways. They eat sitting down, with an adult watching.
- The whole nuts in the pantry are for the adults and for {{c2}}; for {{c1}}, peanut butter or ground nuts.
- Eats little and often: 3 meals and 2 to 3 snacks. Under stress they may refuse food: do not force it, offer drinks and try again later. A day or two of eating badly does no harm; not drinking does.
- Their own 2-week supply: cereal porridge, purées in jars, soft biscuits, fruit in jars.

## Nappies and hygiene

- Nappies: {{diapers_line}}
- Coming out of nappies? In a crisis, going back to nappies is fine, without drama, and you pick it up again later.
- Last resort: cloth nappies or folded towels with plastic pants.
- Hands washed before eating: hands on the shelter floor and then in the mouth is how diarrhoea starts.
- Nappy rash: air, water, barrier cream. No wipes containing alcohol.

## Health

- **Fever**: paracetamol **{{c1_para_mg}} mg** ({{c1_para_ml}} ml of 40 mg/ml syrup) up to 4 times a day, or ibuprofen **{{c1_ibu_mg}} mg** ({{c1_ibu_ml}} ml of 20 mg/ml syrup) up to 3 times a day, with food. Light clothing, fluids. See [fever and illness](#/s/familia/febre-doenca) and the [dose calculator](#/t/doses).
- **Seizure with fever**: between 6 months and 5 years it is common and almost always harmless. Lay them on their side, protect the head, time it, put nothing in the mouth. Longer than 5 minutes, or they do not recover: 112. See [seizures](#/s/socorros/convulsoes).
- **Diarrhoea and vomiting**: oral rehydration solution (ORS), {{c1_sro}} after each stool, by spoon or syringe, in small sips. If already dehydrated: {{c1_sro4h}}. Warning signs: nappy dry for 6 hours, no tears, very drowsy, sunken eyes: 112. See [diarrhoea](#/s/socorros/diarreia).
- **CPR and choking**: the **child** technique (from age 1), not the baby one. CPR: 5 initial rescue breaths, chest compressions with one hand, 5 cm deep, 30:2. Choking: 5 back blows and 5 gentle abdominal thrusts, with the child leaning forward. See [CPR](#/s/socorros/rcp), [choking](#/s/socorros/engasgamento) and the [CPR metronome](#/t/rcp).
- **Poisoning**: CIAV (Poison Information Centre) 800 250 250. Do not make them vomit. Keep the packaging. See [poisoning](#/s/socorros/intoxicacao).
- **Cold and heat**: watch for cold hands and feet, shivering, drowsiness; in the heat, a very red face, floppiness, a dry nappy. At this age they do not complain in time.
- Child health booklet and vaccination record in the [vault](#/t/cofre) and on paper in the grab bag.

## Getting around

- Ergonomic baby carrier or child carrier backpack: hands free, gets through stairs and rubble, and the child can sleep in it. Practise beforehand: {{c1_kg}} kg on your back for 2 hours is tiring.
- A sturdy pushchair for roads and for carrying loads.
- **Car seat always fitted in the car.** No car seat, no journey, even in an evacuation.
- In crowds: in arms or in the baby carrier, never walking. Name and phone number written on the arm in permanent marker, and on the card.
- Brightly coloured clothes. A complete change of clothes in a waterproof bag in the adults' bag.

## Shelter, noise and sleep

- Sirens, explosions and crowded shelters frighten them and hurt their ears: **children's ear defenders**, headphone style. Earplugs are no good at this age.
- Sleep: their own sleeping bag, the cuddly toy, the dummy, the same song and the same sequence every day, even in the shelter. A dim night light (the red light of the [torch](#/t/lanterna) uses little power).
- Tantrums in the shelter: fewer words, more cuddles, a change of scene, wait. Tiredness and hunger cause most of them. Nobody will enjoy it, and nobody dies of it.
- Waking at night and wetting the bed are normal in a crisis. No punishment: change them and put them back to bed.
- One adult always with the child. Take turns between the two of you to rest.

## What to teach now

- The first name of each adult in the home. By around age 3, the full names.
- "When I say **up now**, you come straight away." Practise it as a game.
- "Don't touch" batteries, medicines and bottles. But do not rely on it: keep everything out of reach.
` },
    'crianca-escolar': { title: '{{c2_titulo}}: what changes', desc: 'Written for {{c2}}: what they can already do, what to teach, school, fear and doses.', md: `
## What they can already do

- Understand simple, truthful explanations, follow rules and help for real.
- Walk **5 to 8 km a day** with breaks and carry a backpack of **2 to 3 kg** (at most 10% of their body weight).
- Learn by heart: full name, address, the parents' phone numbers, 112, the meeting point, the code word and the name of the out-of-area contact.
- Use a torch, whistle and radio, count bottles, carry out specific tasks.
- **Cannot** look after {{c1}} on their own: can hold hands, give the dummy, sing, but an adult is always the one in charge.
- Read and play: [distress signals](#/s/comunicar/sinais) and [Morse](#/t/morse) make good games at this age.

## Teach now (10 minutes a week, as a game)

- Call 112 and say where they are and what is happening. Practise by pretending, with the phone switched off, and never press call: even in Aeroplane mode or without a SIM card, a call to 112 can really go through. 112 works on any mobile phone, even when it is locked.
- "If you get lost: **stay where you are**, shout our names and ask for help from a mum with children, a police officer or someone who works in the shop. Never go with a stranger, even if they say we sent them, unless they know the code word."
- "We don't touch anything strange on the ground": batteries, chemicals, military objects, syringes. Mark the spot with a stick and call an adult.
- **Drop, cover, hold on** (earthquake). **Get out low and don't go back** (smoke). **Go to the shelter and stay there** (siren). Where the shelter is at home and at school.
- Whistle: 3 blasts, pause, repeat. Torch: SOS with 3 short, 3 long, 3 short.
- Open the grab bag and know what is inside. Put on layers and change wet socks.
- Wash their hands without running water.

## Food, water and health

- About {{c2_water}} L of water and {{c2_kcal}} kcal a day. Eats like a small adult, with snacks. Do not ration a child of this age like an adult: they get weak and ill faster.
- **Fever and pain**: paracetamol **{{c2_para_mg}} mg** ({{c2_para_ml}} ml of 40 mg/ml syrup{{c2_para_tab}}) up to 4 times a day; ibuprofen **{{c2_ibu_mg}} mg** ({{c2_ibu_ml}} ml of 20 mg/ml syrup) up to 3 times a day, with food. See the [dose calculator](#/t/doses).
- **Diarrhoea**: oral rehydration solution (ORS), {{c2_sro}} after each stool; if already dehydrated, {{c2_sro4h}}. At this age they drink on their own: give them the bottle and a target ("down to the line").
- Baby teeth falling out: a knocked-out baby tooth is **not** put back in; a permanent tooth is (kept in milk, dentist within 1 hour). See [teeth](#/s/socorros/olhos-ouvidos).
- CPR and choking: child technique (one or two hands, 5 cm). See [CPR](#/s/socorros/rcp).
- Vaccines: there is a booster at age 5 (tetanus, diphtheria, whooping cough, polio); check the vaccination record.

## School

The school's emergency plan, who does the pick-up, the list of authorised people and what to do if it happens during school hours: see [school, nursery and separation](#/s/familia/escola-creche).

## Fear and behaviour

- Asks about everything and understands more than it seems. Answer with the simple truth, without frightening details: "There is a big problem (a fire, an earthquake, a war). The adults are dealing with it. We have a plan and we are together." Repeat it as many times as needed.
- **News, videos and frightened adult conversations: keep them out.** Children soak up panic from screens and from our faces.
- Nightmares, fear of sleeping alone, bedwetting, clinginess, irritability, "acting like a baby": normal. No punishment; more routine and more cuddles.
- **Real responsibilities**: torch captain, in charge of the batteries, counting the water bottles, reading to {{c1}}, writing the family diary. Feeling useful is the best remedy for fear at this age.
- "School" for 20 minutes a day, even in the shelter: reading, sums, drawing, writing about what happened. It gives structure and normality.
- Playing at what happened (firefighters, shelter, war) is how they process it. Let them, and join in if you are invited.
- Get help if it lasts for weeks: not sleeping, not talking, new aggression, only playing violent games, constant physical complaints. See [mental health](#/s/saude/mental).

## Their own equipment

- Their own small backpack (see [grab bag](#/s/kit/mala-evacuacao)): water, snack, torch, whistle, jacket, change of clothes, small toy, book, ID card.
- Closed shoes, already worn in and comfortable, and spare socks. A blister ends a walk after 2 km.
- Brightly coloured clothes. Hat and gloves even in summer: nights get cold and children lose heat quickly.
` },
    'escola-creche': { title: 'School, nursery and separation', desc: 'What to agree with {{c2_s}} school and {{c1_s}} nursery, what to do during school hours, and what to do if we get separated.', md: `
## Before (done within a week)

- [ ] Ask {{c2_s}} school and {{c1_s}} nursery or childminder for their **emergency plan**: where they gather after evacuating, how they notify parents, who they hand the children over to, where they shelter in an earthquake or an alert.
- [ ] Update the **list of people authorised** to collect each child: both adults, grandparents, a trusted neighbour or friend who lives or works nearby. If nobody on the list can go, the school will not hand the child over to anyone else, and that is how it should be.
- [ ] Agree between the two adults **who collects which child, in what order, and what happens if they cannot get there**. Write it in the [family plan](#/t/plano).
- [ ] Family code word: {{c2}} knows to go only with someone who knows it.
- [ ] ID card in each child's backpack and in {{c1_s}} pocket, with the out-of-area contact. [Print](#/t/cartoes).
- [ ] A small bag at the school and at the nursery, if they accept it: change of clothes, a snack that does not go off, a nappy, a family photo, a note with contact details.
- [ ] Teach {{c2}} where the school's meeting point and the family's meeting point are, and to stay with the teacher until an adult from the list arrives.

## During an emergency in school hours

- **Do not rush to the school during an air raid alert, a chemical cloud, a severe storm or shooting nearby.** Schools keep the children safely sheltered; out on the street you are at risk, you block access for the emergency services and you will not get there. Wait for the alert to end and then go.
- **Earthquake or fire**: the school evacuates to an outdoor meeting point. Go there, not to the classroom. Take ID: they only hand children over to people on the list.
- The school's phones get jammed: use the school's app or website, SMS, the parents' group, or go there. **One adult goes to collect, the other stays put to receive and pass on information** (radio, out-of-area contact).
- The order: first the child at greatest risk or furthest from help, usually the youngest. Agree on it beforehand, not in the moment.
- If it is a choice between collecting the children and anything else, collect the children.
- Then everyone goes to the meeting point or home, as planned. Tell the out-of-area contact: "we have the children, we are at X".

## If we are separated for hours or days

- {{C2}} should know by heart: the parents' full names, a phone number, the address, the out-of-area contact and the meeting point. Practise once a month.
- {{C1}} cannot say any of this yet: **card in the pocket and a label on the clothes** with name, parents, phone numbers, allergies and "speaks very little". When on the move, name and phone number written on the arm in permanent marker.
- A recent photo of each child on each adult's phone and on paper in the grab bag, to show to people searching.
- Agree with the grandparents, or with the trusted person on the list: if they cannot reach you within X hours, they collect the children and take them to their home. Write this in the plan and tell the school.
- If someone gets lost during an evacuation or in a shelter: Cruz Vermelha (Red Cross, which runs Restoring Family Links), Proteção Civil (Civil Protection), police. Register with photos and a description. Do not leave the place where the child was last seen without leaving a note.
- Reunion: first cuddles and calm, then food and sleep, and only then questions. In the days that follow they will want to cling to you all the time: let them.
` },
    'febre-doenca': { title: 'Fever and illness: {{kids_de}} health', desc: 'Fever, vomiting, diarrhoea, coughs and rashes: what to do at home and when it is urgent.', md: `
## Fever

- A fever starts at **38 °C**. It is not an illness: it is the body fighting. Medicine is there for comfort, not to bring the temperature down to normal.
- **Paracetamol**, up to 4 times a day, at least 4 to 6 hours apart:
  - {{c1_n}}: **{{c1_para_mg}} mg** = {{c1_para_ml}} ml of 40 mg/ml syrup
  - {{c2_n}}: **{{c2_para_mg}} mg** = {{c2_para_ml}} ml of 40 mg/ml syrup{{c2_para_tab}}
- **Ibuprofen**, if the fever does not come down or there is pain, up to 3 times a day, with food:
  - {{c1_n}}: **{{c1_ibu_mg}} mg** = {{c1_ibu_ml}} ml of 20 mg/ml syrup
  - {{c2_n}}: **{{c2_ibu_mg}} mg** = {{c2_ibu_ml}} ml of 20 mg/ml syrup
- Do not give ibuprofen to a child who is dehydrated, has chickenpox, or has asthma that gets worse with anti-inflammatories. With a high fever the two can be alternated, without going over the daily maximum of either.
- Use the **dosing syringe** and **log every dose** in the [dose calculator](#/t/doses): at 3 in the morning, two tired adults give the same dose twice. Check the concentration on the label: syrups come in different concentrations.
- Light clothing, a cool room, frequent drinks (water, oral rehydration solution, soup, milk). No cold baths and no alcohol on the skin. They can sleep; wake them only to drink.
- If they vomit the syrup: a paracetamol suppository in the strength closest to the dose for their weight, without going over (check the leaflet).

## When to call SNS 24, the national health helpline (808 24 24 24), or go to A&E

- Fever above **40 °C**, or lasting more than **3 days** (2 days under age 3).
- **Purple or red spots that do not fade when you press a glass against them**: 112 (it may be meningitis).
- Stiff neck, bad headache with vomiting, light is very uncomfortable.
- Difficulty breathing: very fast breathing, skin sucking in between the ribs or at the neck with each breath, bluish lips, noisy breathing, cannot say a full sentence: **112**.
- Very floppy, hard to wake, does not smile or react, moans constantly, cries inconsolably for hours.
- Seizure: if it lasts more than 5 minutes or is the first one, 112.
- Dehydration: no urine for 6 to 8 hours, dry mouth, no tears, sunken eyes.
- Severe, constant tummy pain (especially on the right side), green vomit, blood in the stools.
- Anything that really worries you: parents are right more often than they think.

## Vomiting and diarrhoea

- The treatment is **rehydration**: oral rehydration solution (ORS), small, frequent sips.
  - {{c1_n}}: {{c1_sro}} after each stool or vomit, by spoon or syringe (one teaspoon every 1 to 2 minutes if vomiting).
  - {{c2_n}}: {{c2_sro}}, with a marked bottle and a target.
- Wait 10 minutes after vomiting and start again slowly. Cold drinks are easier to keep down.
- Eat as soon as they can: rice, potato, bread, banana, stewed apple, soup, cream crackers. Their usual milk can continue. No juice, fizzy drinks or fried food.
- **No antidiarrhoeal medicines (loperamide) for children.** No antibiotics without a doctor.
- Everyone washes their hands after every nappy change and every trip to the toilet: in a shelter, diarrhoea spreads to everyone within 2 days.
- Recipe for homemade rehydration solution in [diarrhoea](#/s/socorros/diarreia).

## Coughs, blocked nose, ears

- Fluids, humid air (a wet towel in the room), head of the bed raised, saline in the nose: essential up to age 3 or 4, because they cannot blow their nose yet. Nasal aspirator.
- Honey for coughs from age 1 (one teaspoon). Cough syrups are not given under age 6: they do not work and carry risks.
- Earache: paracetamol or ibuprofen. If it lasts more than 2 days, pus comes out or there is a high fever, they need a doctor.
- Wheezing or fast breathing, especially if they have had bronchiolitis or asthma before: inhaler with a spacer, if prescribed; if there is no improvement, A&E.

## Skin

- **Chickenpox** (itchy blisters that come in waves): paracetamol, **never ibuprofen**, short nails, lukewarm baths; contagious until all the blisters have dried.
- **Hives** (raised patches that move around): cetirizine. {{c1_n}}: {{c1_cet}}. {{c2_n}}: {{c2_cet}}. If the lips or tongue swell, or there is difficulty breathing: adrenaline if you have it, and 112.
- **Impetigo** (honey-coloured crusts around the mouth and nose, common in shelters): wash with soap and water, cover, a towel only for the person who has it; it needs antibiotics.
- **Head lice and scabies** turn up in shelters: fine-tooth comb, clothes washed at 60 °C or sealed in a bag for a week; permethrin from the pharmacy.

## Medicine supplies for the children

- [ ] Paracetamol syrup 40 mg/ml (2 bottles) and suppositories in the strengths for the children's weights
- [ ] Ibuprofen syrup 20 mg/ml (2 bottles)
- [ ] Oral rehydration solution sachets (10) and dosing syringes (3)
- [ ] Saline in single-dose vials (nose and eyes) and a nasal aspirator
- [ ] Digital thermometer (2) and a children's finger pulse oximeter
- [ ] Cetirizine drops, 1% hydrocortisone cream
- [ ] Barrier cream, ointment for insect bites, children's sunscreen, insect repellent suitable for their age
- [ ] The children's inhalers and long-term medication, if any, for 1 to 2 months
- [ ] Child health booklets and vaccination records in the [vault](#/t/cofre) and on paper
` },
    'evacuar-com-criancas': { title: 'Evacuating with {{kids_para}}', desc: 'By car, on foot, on public transport and in shared shelters, with {{kids_desc}}.', md: `
## Decide early

With small children, **leave before everyone else**. You avoid a 6-hour queue in the heat with no nappies or water, or a walk at night with both children, by leaving at the first warning, while the roads and petrol stations are still working. If most people decide to stay, you have less margin than most.

## By car

- Car seat and booster seat fitted, always. Luggage in the boot; one adult in the back with the children, if possible.
- Within reach: water bottles with a spout, snacks, nappies and wipes, a sick bag, a change of clothes, toys, blankets, ear defenders. Stories and music downloaded to the phone (with the screen off they use little battery).
- 10-minute stops every hour and a half. **Never** leave them in the car, not even in a stationary queue in the sun.
- With children, never let the tank drop below half. A long queue with no air conditioning: windows, damp cloths, water.
- If you have to abandon the car: baby carrier and backpacks; the car seat stays behind.

## On foot

- {{C1}} goes in the ergonomic baby carrier or the hiking child carrier backpack (which still takes a load underneath and has a rain cover). An all-terrain pushchair works on roads and carries a lot, but cannot get through stairs, rubble, deep mud or tightly packed crowds. Ideally take both: the pushchair for the load, the baby carrier rolled up as a backup.
- {{C2}} holds an adult's hand on streets with traffic and in crowds, or is attached by a strap to the adult's wrist, and carries their own 2 to 3 kg backpack. Child pace: 2 to 3 km/h, 10-minute breaks every 40 minutes, short goals ("as far as that tree"), snacks as rewards.
- **Realistic distance for the family: 8 to 12 km a day.** Plan stops and shelter at that distance, not at the distance two adults would cover.
- Load: whoever carries {{c1}} ({{c1_kg}} kg) carries only a small backpack on the front (documents, water, nappies; up to 5 kg). The other adult carries the big backpack (up to 15 kg). See [travelling on foot](#/s/navegar/caminhar).
- Layers of clothing for both children, hats, a dry change of clothes in a waterproof bag. Children warm up and cool down faster than adults: check hands, feet and the back of the neck every hour.
- Check {{c2_s}} feet at every stop: a blister at 3 km ends the walk.
- Brightly coloured clothes and backpacks; a coloured ribbon on each child's arm so you can spot them in a crowd.

## Transport and crowds

- Names and phone numbers on the arm in permanent marker, card in the pocket. A photo of each child taken that day, in the clothes they are wearing, on both adults' phones.
- Evacuation trains and buses give priority to families with small children: ask.
- In a crowd: {{c1}} always in arms or in the baby carrier; {{c2}} in front of you, between your arms, or on your shoulders if it gets tight. If you get separated, the last place you were together is the immediate meeting point: {{c2}} stays put and calls out.
- Do not get on a vehicle unless you all fit. Nobody stays behind "to take the next one".

## Shared shelters and other people's homes

- A corner of your own, away from the door and the noise: mattress, blankets, a sheet hung up as a divider. The same bedtime routine as at home.
- Ear defenders, quiet toys, books, cards, paper and pencils. A "boredom bag" packed in advance is worth its weight in gold.
- One adult always with the children, no exceptions. Take turns.
- Hands washed more often (diarrhoea spreads fast in shelters), used nappies in a closed bag and taken outside, rubbish tied up.
- Introduce yourselves to the families around you: other children are the best entertainment, and other parents the best support.
- At relatives' or friends' homes: bring your own food and the children's things, help out, and agree on house rules from day one (sleep, noise, kitchen). Long stays go sour over small things.
` },
    'ocupar-e-acalmar': { title: 'Calm and play for {{kids_para}}', desc: 'Games without electricity for ages {{c1_age}} and {{c2_age}}, routines, sleep, tantrums, fear and what to say.', md: `
## Golden rules

- **Calm adults, calm children.** They read our faces before our words. Breathe before you speak. Agree that arguments between adults happen away from them.
- **Routine**: set times for eating, playing, "school" and sleeping, even in the shelter or in the car. Routine is the home you take with you.
- **Simple truth, repeated.** For {{c2}}: "There is a big problem out there (they can be told what it is: a fire, an earthquake, a war). The adults are dealing with it. We are safe here and we are going to stay together." For {{c1}}: fewer words and more cuddles, "it's all right, I'm here".
- **Tasks**: {{c2}} is torch captain, counts the bottles, reads to {{c1}}, writes the diary. {{C1}} helps tidy up, chooses the song, gives a toy to {{c2}}. Feeling useful calms them down.
- **Screens**: the battery is for essentials. If they use them, downloaded cartoons and never news or disaster videos.

## Games without electricity

### For {{c1}} (aged {{c1_age}})

- Hiding objects under cups; towers of cups and tins; fitting lids onto jars.
- Pouring rice or beans from one container to another with a spoon, always with an adult watching (it goes in the mouth).
- Songs with actions, "Head, shoulders, knees and toes", clapping rhythms.
- Shadows on the wall with the torch; treasure hunts with the light.
- "Cooking" with pans and wooden spoons; balls of socks to throw into a bucket.
- Board books and made-up stories with cuddly toys.
- Homemade play dough: 2 cups of flour, half a cup of salt, half a cup of water and a spoonful of oil.
- Being carried around the shelter to "visit" people: it uses up energy and makes friends.

### For {{c2}} (aged {{c2_age}})

- Cards: Go Fish, Old Maid, pairs, patience. Dominoes and dice.
- Battleships, hangman, noughts and crosses, "Who am I?" on paper.
- Riddles, I spy, 20 questions, chain stories (everyone adds a sentence).
- Origami (boats, planes, frogs), drawing a map of the shelter, a picture diary of the day.
- Morse with the torch (the [code table](#/t/morse) is in the app), the phonetic alphabet, knots with a piece of string ([knots](#/s/saber/nos)).
- Reading aloud to {{c1}}; shadow theatre; making up a play for the family.
- Responsibility tasks: battery inventory, map of the meeting points, checking the torches at night.

### All together

- A blanket den: it is also a safe place for fears and for sleeping.
- Charades, Simon says, musical statues with sung music, a car track made with tape on the floor.
- Family songs, always the same ones. A "going to the shelter" song turns the trip into a game.

## Sleep

- The same sequence every day: wash, pyjamas, story, song, night light. The same sleeping bag and the same cuddly toy.
- A dim red night light: it uses little power and does not keep them awake. The app's [red torch](#/t/lanterna) will do.
- Noise: ear defenders, a quiet song, a hand on their back. Explosions and sirens: "It's just noise. We're safe here. Come for a cuddle."
- Nightmares: wake them, cuddle, water, "it was a dream, I'm here", back to bed. Talk about the dream only in the morning, and only if they want to.
- Bedwetting: normal in a crisis. Waterproof mattress protector, quick change, no comments.
- Everyone sleeping in the same room is normal and advisable in a crisis. If {{c1}} will only sleep holding on to someone, let them.

## Tantrums, crying and fear

- Tantrums at age 2: fewer words, more cuddles, a change of scene, wait for it to pass, then water and a snack. Tiredness and hunger cause most of them. In a shelter nobody likes it, but all parents understand.
- If {{c1}} cries non-stop, check in this order: pain (ears, teeth, tummy), hunger, nappy, tiredness, cold or heat, noise, wanting to be held. If nothing works and they are not their usual self, they may be ill: see [fever and illness](#/s/familia/febre-doenca).
- Fear at age 7: listen without correcting, put a name to the feeling ("you're scared; I am a little bit too, and we're together"), breathe together (breathe in for 4 seconds, hold for 4, breathe out for 6, 5 times) and give them a task. Do not promise what you cannot control ("nothing is going to happen"); promise what you can control ("I'll stay with you").
- Aggression or "going back to being a baby": normal for weeks. Calm limits and more attention, no punishment.
- Warning signs and when to seek help: [children in conflict](#/s/guerra/criancas) and [mental health](#/s/saude/mental).

## The adults

Nobody can look after two children in a crisis without sleeping and eating. Proper shifts: 4 hours of unbroken sleep each, taking turns. Ten minutes alone every day. Asking neighbours and other parents for help is not weakness: it is part of the plan.
` },
    'seguranca-criancas': { title: 'A safe home for {{kids_para}}', desc: 'The new dangers a crisis brings into the home, and the checklist to get rid of them.', md: `
In a crisis the home fills up with dangers that were not there before: candles, camping stoves, diluted bleach in bottles, buckets of water, a generator, tools, medicines left out, broken glass, stairs in the dark. And there is **less supervision**, because the adults are busy and tired. With a 2-year-old, this can kill more than the crisis itself. Go through this list once and repeat it whenever you move to another home or shelter.

## Water, chemicals and small objects

- [ ] Water stored in **closed** jugs, never in buckets, basins or a bath within {{c1_s}} reach: a small child can drown in 5 cm of water, silently, in a minute. Full bath: bathroom door shut with a latch placed high up.
- [ ] Bleach (and water with bleach), alcohol gel, fuels, purification tablets, iodine: up high, closed, **never in water or juice bottles**.
- [ ] **Button batteries** (watches, small LED lights, thermometers, scales): if swallowed, they burn through the oesophagus within 2 hours. Devices with a screwed-down battery cover; loose batteries locked away.
- [ ] Medicines, including the syrups that "taste nice", in a closed box and up high. Some adult medicines (for the heart, blood pressure, diabetes, antidepressants, opioids) can be dangerous with just one or two tablets.
- [ ] Silica gel sachets, coins, small magnets, lids, marbles and {{c2_s}} toys with small parts: out of {{c1_s}} reach.
- [ ] Plastic bags and cords put away (suffocation).
- [ ] CIAV (Poison Information Centre) **800 250 250** written on the kitchen wall and saved on your phone.

## Fire, heat and light

- [ ] No candles with children around. LED torches and camping lanterns with no small loose parts.
- [ ] Camping stove on a high table, only with an adult, pan handle turned inwards, children more than 1 metre away. Turn it off and let it cool out of reach.
- [ ] Generator outside the house; heaters with a guard; CO detector with a new battery.
- [ ] Matches and lighters up high and shut away. {{C2}} knows that only adults light fires.
- [ ] Hot water for basin baths tested with your elbow; the kettle never on the floor.

## Home and falls

- [ ] Stairs: a safety gate at the top and bottom; night lights on the stairs and in the hallway (solar lights or battery LED lights).
- [ ] Windows and balconies: locks or restrictors, nothing to climb on near the window, safety netting on the balcony.
- [ ] Broken glass after an earthquake or explosion: no-go area, shoes on at all times, sweep it up straight away.
- [ ] Furniture and shelves fixed to the wall (aftershocks and children who climb).
- [ ] Tools, knives, scissors, wire and nails in a closed box, up high.
- [ ] Doors to the street and the garage with a latch placed high up: at age 2 children can already open doors.
- [ ] In the shelter or basement: check the floor, stairs and loose objects, and decide where the children stay while you sort things out.

## Food

- [ ] {{C1}} always eats sitting down, with an adult watching, food cut into small pieces, no whole nuts, whole grapes, boiled sweets or sausages cut into rounds.
- [ ] Out-of-date food or food from dented tins: throw it out, even if it looks fine. Food poisoning in a {{c1_kg}} kg child becomes urgent within hours.
- [ ] Hands washed before eating, both the children's and the adults'.

## Outside the home

- [ ] {{C1}} always held by the hand or carried near water, roads, rubble and loose animals.
- [ ] {{C2}} does not touch strange objects, does not go to look at the river, the fire or the damage, and does not go into damaged houses.
- [ ] Loose, frightened dogs: children do not run or scream; they stand sideways, still, behind an adult.
- [ ] Fallen cables, holes and floodwater: off-limits, explained and repeated.
` },
  }
};
