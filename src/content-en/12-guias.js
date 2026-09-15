GUIAS_EN['incendio-casa'] = { t: 'Fire at home', passos: [
  { /* 0 */ t: 'How big is the fire?', d: 'Decide quickly: smoke fills a home in a few minutes.', p: { q: 'Is it small (smaller than a bin) and is the way out behind you?' } },
  { /* 1 pequeno */ t: 'Put it out only if it is safe', d: 'Pan of oil: cover it with a lid or a wet cloth and turn off the cooker, **never water**. Electrical appliance: unplug it or switch off at the fuse box. Extinguisher: pull the pin, aim at the base of the flames, squeeze and sweep from side to side.', tempoT: 'No control in 30 seconds: get out', p: { q: 'Is it out?' } },
  { /* 2 apagado */ t: 'Check and air the room', d: 'Make sure no embers are left and no smoke is coming from appliances or walls. If in doubt, call 112 anyway.' },
  { /* 3 sair */ t: 'Shout “FIRE” and get out now', d: 'Wake everyone up. Do not waste time getting dressed or taking things. **Never use the lift.**' },
  { /* 4 */ t: 'Keep low and close the doors', d: 'Smoke kills more than fire: crawl, with a damp cloth over your nose and mouth. Touch doors with the back of your hand before opening: if a door is hot, do not open it. Close the doors behind you.', p: { q: 'Are you already outside?' } },
  { /* 5 fora */ t: 'Call 112 and count everyone', d: 'Go to the meeting point: {{plano_encontro1}}. **Never go back inside.**' },
  { /* 6 preso */ t: 'Shut yourself in a room with a window', d: 'Ideally one facing the street. Seal the gaps around the door with wet towels or clothes and cover the vents. Open the window, signal with a cloth or a light and call 112 saying exactly where you are.' },
] };

GUIAS_EN['sismo'] = { t: 'Earthquake', passos: [
  { /* 0 */ t: 'Drop, cover, hold on', d: 'Under a sturdy table, holding on to its legs. No table: by an inside wall, away from windows and shelves, arms protecting your head and neck. **Do not run outside.** In bed, stay there and protect your head with the pillow.' },
  { /* 1 */ t: 'When it stops, expect aftershocks', d: 'Put on closed shoes (there is broken glass) and take the torch and the kit.' },
  { /* 2 */ t: 'Check for gas', d: 'A smell of gas is the most urgent danger after the shaking.', p: { q: 'Can you smell gas?' } },
  { /* 3 gas */ t: 'Do not light anything; get out', d: 'Do not use light switches or lighters. Open the windows, turn off the gas valve and get out.' },
  { /* 4 feridos */ t: 'Is anyone injured?', d: 'First treat anyone who is not breathing, then anyone bleeding heavily.' },
  { /* 5 */ t: 'Check the building', d: 'Large cracks, cracked pillars or doors that no longer close are serious damage.', p: { q: 'Does the building have visible damage?' } },
  { /* 6 danos */ t: 'Leave calmly by the stairs', d: 'Do not go back in. Outside, keep away from building fronts, balconies and chimneys.' },
  { /* 7 mar */ t: 'Tsunami risk?', d: 'Portugal is at risk of tsunamis.', p: { q: 'Are you near the sea and was the earthquake strong or long (hard to stay standing or lasting more than 20 seconds)?' } },
  { /* 8 tsunami */ t: 'Go to high ground now', d: '**Do not wait for an official warning.** More than 30 m above sea level or 2 km inland, on foot if possible. If you cannot: the 3rd floor or higher of a solid concrete building. Stay there for several hours: the first wave may not be the biggest.' },
  { /* 9 encontro */ t: 'Meeting point and radio', d: 'Go to the meeting point: {{plano_encontro1}}. Turn on {{radio_zona}}. Use the phone only for SMS: [quick messages](#/t/mensagens).' },
] };

GUIAS_EN['incendio-rural'] = { t: 'Approaching wildfire', passos: [
  { /* 0 */ t: 'What is the situation?', d: 'Listen to {{radio_zona}} and read the SMS alerts from Proteção Civil (Civil Protection).', p: { q: 'Is there an evacuation order, thick smoke or flames in sight?' } },
  { /* 1 sair */ t: 'Leave early', d: 'Leaving late, through smoke and closed roads, is the deadliest situation. Take people, animals, the grab bag, documents and medication.' },
  { /* 2 */ t: 'On the road with smoke or flames', d: '**Stay in the car** in a spot with no vegetation, headlights and hazard lights on, windows and vents closed, engine running. Lie down below the windows and cover yourself with clothing or a wool blanket. Get out when the fire front has passed.' },
  { /* 3 */ t: 'Trapped on foot', d: '**Never run uphill** or ahead of the fire. Go sideways or downhill, to ground that has already burnt, a wide road, water or rock. No way out: lie down in a spot with no vegetation, face down, feet towards the fire, and cover yourself with soil or a wool blanket.' },
  { /* 4 preparar */ t: 'Prepare the house', d: 'Close doors, windows, shutters and vents, and take down the curtains. Fill buckets and the bath and connect the hose. Move gas cylinders, firewood and garden furniture away from the house.' },
  { /* 5 */ t: 'Prepare the car and clothing', d: 'Car facing the way out, key ready, windows closed. Long cotton clothes, boots, gloves, goggles and a damp cloth for your face. Grab bag by the door.' },
  { /* 6 */ t: 'If the order comes, leave', d: 'Only stay if the area around the house is cleared of vegetation, there is water and there is no thick smoke. While the fire front passes (10 to 20 minutes), stay inside; afterwards put out small fires on the roof and around the house.' },
] };

GUIAS_EN['cheia'] = { t: 'Flood', passos: [
  { /* 0 */ t: 'Never cross moving water', d: '15 cm of moving water knocks a person over and 30 cm sweeps a car away. Not on foot, not by car: the road surface may have gone.' },
  { /* 1 */ t: 'Switch off the power and turn off the gas', d: 'At the fuse box, **before** the water reaches the sockets. Never touch electrical appliances with wet feet.' },
  { /* 2 */ t: 'Move up with the essentials', d: 'Upper floors, the roof if necessary. Take the kit, water, mobile phone, radio and warm clothes. Avoid basements, garages, tunnels and underpasses.', p: { q: 'Are you in a car with the water rising?' } },
  { /* 3 carro */ t: 'Get out now and go to high ground', d: 'Do not wait. If the car goes into the water: undo your seatbelt, open or break the window (the metal prongs of the headrest break the glass at a corner) and get out through the window **before** the car fills up.' },
  { /* 4 sinal */ t: 'Signal and ask for help', d: 'A cloth at the window, a light at night. Call 112 if you are in danger.' },
] };

GUIAS_EN['apagao'] = { t: 'Blackout', passos: [
  { /* 0 */ t: 'Just your home or the whole area?', d: 'Check the fuse box, the neighbours and the street. Turn on a battery radio or the car radio: {{radio_zona}}.' },
  { /* 1 */ t: 'Switch off sensitive appliances', d: 'Computer, TV and anything with electronics, because of surges when the power comes back. Leave one light switched on so you know when it is back.' },
  { /* 2 */ t: 'Store water now', d: 'Bottles and the bath, while there is still pressure: the pumps in blocks of flats may stop.' },
  { /* 3 */ t: 'Tell your family and save battery', d: 'SMS gets through better than calls: [quick messages](#/t/mensagens). Then Aeroplane mode, and turn the network on for 5 minutes every hour.', ios: 'Low Power Mode in Control Centre. On an iPhone 15 or later, you can charge another phone through the USB-C cable.' },
  { /* 4 */ t: 'Keep the fridge and freezer closed', d: 'The fridge stays cold for 4 hours; a full freezer for 48 hours and a half-full one for 24. Blackout mode keeps track of the time for you.' },
  { /* 5 */ t: 'Safety in the hours that follow', d: 'Torches instead of candles. Generators, charcoal and barbecues **never indoors**. Traffic lights out: treat junctions as a STOP sign. Check on neighbours who are elderly, ill or have babies.' },
] };

GUIAS_EN['ataque'] = { t: 'Explosion, air raid or gunfire', passos: [
  { /* 0 */ t: 'What is happening?', d: 'The two situations need different responses.', p: { q: 'Explosion or air raid alert, or gunfire and an armed attacker?', simT: 'Explosion or air raid alert', naoT: 'Gunfire or attacker' } },
  { /* 1 chao */ t: 'Get down on the ground now', d: 'Face down, head away from windows, hands protecting your head and the back of your neck, mouth slightly open. Behind something solid, if possible.' },
  { /* 2 */ t: 'Wait 1 to 2 minutes', d: 'There may be a second explosion or falling debris.', tempoT: 'Wait on the ground' },
  { /* 3 */ t: 'Go to the nearest shelter', d: 'Basement, underground car park, metro, or the lowest inside room, with **two walls** between you and the outside. At home: {{plano_abrigo}}. During an air raid alert, go to the shelter, not home, and stay until the all-clear.' },
  { /* 4 */ t: 'Do not go closer or take photos', d: 'There may be another attack. Do not touch suspicious objects. With casualties, severe bleeding is the priority.' },
  { /* 5 fugir */ t: 'Run, if there is a safe way out', d: 'Leave everything, hands visible and empty. Take anyone you can, but do not wait for anyone who will not come. Get several streets away.', p: { q: 'Did you get away?' } },
  { /* 6 esconder */ t: 'Hide in silence', d: 'A room with a door that locks or that you can block with furniture. Lights off, phone on silent with vibration off, away from the door and windows, behind concrete. Call 112 silently and leave the line open.', ios: 'With Call Quietly turned on in Emergency SOS, pressing the side button 5 times calls 112 without the warning sound.' },
  { /* 7 */ t: 'Fight back only as a last resort', d: 'Only if life is in immediate danger: as a group, with whatever is at hand, with total commitment.' },
  { /* 8 policia */ t: 'When the police arrive', d: 'Hands empty, open and raised, no shouting or running towards them, and obey their orders. Then let your family know by SMS.' },
] };

GUIAS_EN['nuclear-quimico'] = { t: 'Nuclear, radiological or chemical', passos: [
  { /* 0 */ t: 'What kind of danger?', d: 'Follow the authorities’ orders as soon as you hear them.', p: { q: 'Radiation (nuclear accident, explosion) or a chemical cloud and gas leaks?', simT: 'Radiation', naoT: 'Chemical or gas' } },
  { /* 1 entra */ t: 'Get into the nearest solid building', d: 'Concrete or brick, in the middle or in the basement. **Do not go to fetch family members** from elsewhere: they should also shelter where they are. You have 10 to 15 minutes before radioactive fallout starts coming down.', tempoT: 'Time to take shelter' },
  { /* 2 */ t: 'Close everything and stay in for at least 24 hours', d: 'Windows, doors and vents closed, air conditioning off. The first 24 hours are the most dangerous.' },
  { /* 3 */ t: 'If you were outside, take off your outer clothes', d: 'Put them in a closed bag away from people. Shower with soap, or use a damp cloth, no conditioner. Blow your nose.' },
  { /* 4 */ t: 'Listen to the radio', d: 'Tune in to {{radio_zona}} and wait for instructions: when to leave, where to go, whether iodine tablets are being handed out.' },
  { /* 5 */ t: 'Iodine tablets only when the authorities say so', d: 'They only protect the thyroid from radioactive iodine. Doses: {{familia_ki}}. Do not take tincture of iodine or disinfectants.' },
  { /* 6 onde */ t: 'Where is it coming from?', d: 'A leak inside the house and a cloud outside are handled in opposite ways.', p: { q: 'Is the cloud coming from outside, or is there a smell of gas inside the house?', simT: 'From outside', naoT: 'Gas indoors' } },
  { /* 7 nuvem */ t: 'Get inside, close everything and go upstairs', d: 'Many gases are heavier than air. Seal the room with wet towels and tape, and switch off the ventilation. Outside: move away with the wind in your face, to high ground, with a damp cloth over your nose and mouth.' },
  { /* 8 */ t: 'Contamination on the skin: wash for 15 minutes', d: 'Cut clothing off instead of pulling it over the head. Lots of soap and water; rinse eyes under running water. Coughing, burning eyes, shortness of breath or confusion: 112.', tempoT: 'Washing' },
  { /* 9 gas */ t: 'Do not light anything, open the windows and get out', d: 'Do not touch switches. Turn off the valve, get out and call 112 and the gas company from outside.' },
] };

GUIAS_EN['evacuar'] = { t: 'Evacuation order', passos: [
  { /* 0 */ t: 'How much time do you have?', d: 'With young children, leave early.', p: { q: 'Do you have to leave in less than 10 minutes?', simT: 'Leave now', naoT: 'I have 1 to 2 hours' } },
  { /* 1 ja */ t: 'People and animals first', d: 'Who takes whom: {{plano_levar}}.' },
  { /* 2 */ t: 'Take the grab bag and the essentials', d: 'Grab bag, documents, cash, medication, mobile phone and charger, keys, clothes and shoes for the weather.' },
  { /* 3 rota */ t: 'Close the door and take the agreed route', d: 'Routes: {{plano_rotas}}. Do not turn back. Go on foot if the roads are at a standstill.' },
  { /* 4 */ t: 'Tell your family', d: 'Meeting point: {{plano_encontro2}}. Out-of-area contact: {{plano_contactoFora}}. [Quick messages](#/t/mensagens).', ios: 'In Messages, use Check In: your family gets a notification when you arrive.' },
  { /* 5 tempo */ t: 'Listen to the radio and check the route', d: 'Where it is safe to go, and which way: {{radio_zona}}.' },
  { /* 6 */ t: 'Gather the essentials', d: 'Documents, cash, medication, glasses, chargers and power bank, water (2 L per person) and food for 1 to 2 days, clothes for 3 days and whatever the children and animals need.' },
  { /* 7 */ t: 'Secure the house', d: 'Gas and water off; the electricity at the fuse box if there is a risk of flood or fire. Switch off appliances and close windows and shutters.' },
  { /* 8 */ t: 'Leave a note on the door', d: 'Who left, when, where to, and a phone number. Tell the out-of-area contact and the neighbours, and offer a lift to anyone without transport.' },
  { /* 9 */ t: 'Fuel and route', d: 'Below half a tank, fill up on your way out of the area. Avoid low-lying areas, weakened bridges and roads next to burning scrubland.' },
] };
