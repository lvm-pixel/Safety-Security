GUIAS_EN['nao-respira'] = { t: 'Unresponsive or not breathing', passos: [
  { /* 0 */ t: 'Check it is safe to approach', d: 'Traffic, fire, electricity, gas, an attacker, an unstable structure. If there is danger, move away first: an injured rescuer is one more casualty.' },
  { /* 1 */ t: 'Shake their shoulders and ask loudly', d: '“Are you all right? Can you hear me?” Shout for help to call over anyone nearby.', p: { q: 'Do they respond?' } },
  { /* 2 via */ t: 'Open the airway and check breathing', d: 'Have someone call 112, or call on speaker yourself while you check. Turn them onto their back. One hand on the forehead, tilt the head back; two fingers under the chin, lift it. **Look, listen and feel for no more than 10 seconds.** Gasping, noisy or very slow breathing is not normal.', tempoT: 'Look, listen and feel', p: { q: 'Are they breathing normally?' } },
  { /* 3 idade */ t: 'Not breathing: start now', d: 'Do not waste time feeling for a pulse. Giving CPR to someone who turns out not to need it does little harm; not giving it to someone who needs it is fatal.', p: { q: 'Is it an adult or a child?', simT: 'Adult', naoT: 'Child or baby' } },
  { /* 4 adulto */ t: 'Call 112 on speaker and ask for an AED', d: 'Say “not breathing”. Send someone to fetch a defibrillator (AED): pharmacies, shopping centres, stations and gyms have them.' },
  { /* 5 */ t: 'Chest compressions: 30', d: 'Heel of one hand in the centre of the chest, the other hand on top, arms straight. Press down **5 to 6 cm**, **100 to 120 times a minute**, and let the chest rise fully. The metronome sets the pace. **Drowning:** 5 rescue breaths before you start.' },
  { /* 6 */ t: '2 rescue breaths, then repeat 30:2 non-stop', d: 'Tilt the head, lift the chin, pinch the nose and blow for 1 second until the chest rises. If you do not know how or do not want to, give **continuous chest compressions only**. If someone else is there, swap every 2 minutes.', tempoT: 'Swap rescuers' },
  { /* 7 dae */ t: 'When the AED arrives, switch it on and follow the voice', d: 'Uncover and dry the chest and stick on the pads as shown in the picture. Nobody touches the casualty during the analysis and the shock. Restart chest compressions straight after.' },
  { /* 8 naopares */ t: 'Do not stop', d: 'Only when help arrives and takes over, the casualty moves or breathes normally, or you cannot go on. If they recover: turn them on their side (next step), and keep watching them.' },
  { /* 9 crianca */ t: '5 gentle rescue breaths', d: 'In our family, {{cpr_line}}. **Baby (under 1 year):** head in a neutral position (do not tilt it far back), your mouth covers the baby’s mouth and nose; use only the air in your cheeks. **Child:** pinch the nose. Watch the chest rise.' },
  { /* 10 */ t: 'Chest compressions 30:2', d: '**Child:** one hand (two if the child is big), 5 cm. **Baby:** both thumbs in the centre of the chest, just below the nipple line, hands encircling the chest, 4 cm (on your own, two fingers). 100 to 120 a minute, 30 compressions and 2 rescue breaths.' },
  { /* 11 */ t: 'If nobody has called 112 yet, call now and carry on', d: 'On speaker, without stopping CPR. On your own without a phone: do 1 minute of CPR and only then go for help. If there is an AED, use paediatric pads; if there are none, adult pads, one on the front and one on the back.' },
  { /* 12 pls */ t: 'Recovery position', d: 'Arm nearest you at a right angle, the other arm across the chest with the hand against the cheek. Bend the far leg and roll the casualty towards you. Head tilted back, mouth facing the ground.' },
  { /* 13 */ t: 'Call 112 and monitor breathing', d: 'Check every minute. If they stop breathing normally, start CPR.' },
  { /* 14 responde */ t: 'Leave them as they are and ask what happened', d: 'What hurts, illnesses, medication, allergies. Look for bleeding, deformities and burns, and treat the most serious first. If in doubt, call 112. Keep them warm and do not leave them alone.' },
] };

GUIAS_EN['hemorragia'] = { t: 'Severe bleeding', passos: [
  { /* 0 */ t: 'Press hard on the wound, without stopping', d: 'Gauze pad, folded cloth, clothing or just your hands (gloves if you have them). Push with your body weight, without easing off to look. If the cloth soaks through, **do not remove it**: put more on top.' },
  { /* 1 */ t: 'Lay the casualty down and call 112', d: 'On speaker while you press, or ask someone else. Do not ease the pressure to look.' },
  { /* 2 */ t: 'Deep wound in the groin, armpit or neck: pack it', d: 'Push gauze or clean cloth into the wound, as much as will fit, and press on top for at least 3 minutes. Then bandage it tightly.', tempoT: 'Pressure on the packed wound' },
  { /* 3 */ t: 'Decide if you need a tourniquet', d: 'It is for arms and legs.', p: { q: 'Is it on an arm or leg and still bleeding after 1 to 2 minutes of pressure, is there an amputation, or do you have several casualties and cannot keep pressing?' } },
  { /* 4 torniquete */ t: 'Tourniquet: tighten until it stops', d: '5 to 7 cm above the wound, never over a joint. A wide strip (scarf, tie, strip of shirt; **never** wire or string), a knot, a stick on top, twist until the bleeding stops and fix the stick in place. It will hurt a lot: do not loosen it.', hora: 'Tourniquet applied' },
  { /* 5 */ t: 'Write the time and do not remove it', d: 'Write T and the time on the casualty’s forehead or on the tourniquet. Do not remove or loosen it, even after hours: only professionals take it off. If one is not enough, put another just above it.' },
  { /* 6 penso */ t: 'Pressure bandage', d: 'Wrap a bandage, scarf, tape or belt over the gauze pads, pulled tight.' },
  { /* 7 vigiar */ t: 'Keep them warm and lying down, and watch them', d: 'Blanket under and over them, nothing to drink. Pale, cold skin, a fast pulse or confusion are signs of shock: raise the legs if there are no fractures, and tell 112. **Do not remove embedded objects.**' },
] };

GUIAS_EN['engasgamento'] = { t: 'Choking', passos: [
  { /* 0 */ t: 'Check if they can still cough', d: 'They were eating or playing with small objects and suddenly cannot speak, clutch at their throat, turn red or bluish.', p: { q: 'Are they coughing hard or able to speak?' } },
  { /* 1 tosse */ t: 'Encourage them to cough and watch', d: 'Do not slap their back or give them anything to drink. If they can no longer cough, go back.' },
  { /* 2 quem */ t: 'Who is choking?', d: 'The technique is different for babies.', p: { q: 'Are they under 1 year old?', simT: 'Baby', naoT: 'Child or adult' } },
  { /* 3 costas */ t: '5 back blows', d: 'Lean the person forwards, support their chest with one hand and give 5 firm blows between the shoulder blades with the heel of the other. Check after each one whether it has come out.' },
  { /* 4 */ t: '5 abdominal thrusts', d: 'From behind, arms around the waist, a clenched fist just above the belly button (thumb inwards), the other hand over it. Pull hard **inwards and upwards**. Pregnant or very obese people: chest thrusts.', p: { q: 'Has it come out?' } },
  { /* 5 alternar */ t: 'Alternate 5 and 5 until it comes out', d: 'If someone else is there, they call 112 now. If they become unconscious: lay them on the floor, call 112 and start CPR. Before each rescue breath, look in the mouth and remove the object only if you can see it. When it comes out, go to the next step.' },
  { /* 6 medico */ t: 'They must be seen by a doctor', d: 'Abdominal thrusts can leave internal injuries, even if everything went well.' },
  { /* 7 bebe */ t: '5 back blows for the baby', d: 'Face down on your forearm, head lower than the body, holding the jaw without pressing on the throat. 5 blows between the shoulder blades with the heel of your hand.' },
  { /* 8 */ t: '5 chest thrusts', d: 'Turn the baby face up onto your other forearm, head low. Two fingers in the centre of the chest, just below the nipple line, slower and firmer than in CPR. **Never give abdominal thrusts to babies.**' },
  { /* 9 */ t: 'Look in the mouth and repeat', d: 'Remove only what you can see. Repeat 5 and 5 until it clears. If the baby becomes unconscious: baby CPR and 112.' },
] };

GUIAS_EN['convulsao'] = { t: 'Seizure', passos: [
  { /* 0 */ t: 'The stopwatch has already started', d: 'How long it lasts is the most important information. Leave this screen counting.', cronoT: 'Over 5 minutes: call 112' },
  { /* 1 */ t: 'Protect without holding down', d: 'Move dangerous objects away and put something soft under the head. **Do not hold the person down and do not put anything in their mouth.** Loosen clothing around the neck and remove glasses.' },
  { /* 2 */ t: 'Check if 112 is needed', d: 'Call if it lasts **more than 5 minutes** or repeats without recovery, if it is the first seizure, if they do not regain consciousness within 10 to 15 minutes, if they are injured, pregnant or diabetic, or if it happened in water.', p: { q: 'Any of these?' } },
  { /* 3 ligar */ t: 'Call 112', d: 'Say how long it has lasted: see the stopwatch in the log.' },
  { /* 4 depois */ t: 'When it stops, turn them on their side', d: 'On their side, head tilted back and mouth facing the ground, top knee bent to stop them rolling: they breathe better and will not choke on vomit. Stay with them until they are fully awake: 10 to 30 minutes of confusion and sleepiness are normal. Nothing to eat or drink until fully conscious.' },
  { /* 5 */ t: 'If it is a child with a fever', d: 'Remove extra clothing and do not put the child in cold water. Then paracetamol by weight: {{familia_para}}. If it is the first seizure, SNS 24 (health helpline, 808 24 24 24) or A&E.' },
] };

GUIAS_EN['alergia'] = { t: 'Severe allergic reaction', passos: [
  { /* 0 */ t: 'Recognise anaphylaxis', d: 'Minutes after food, a medicine or a sting: swelling of the tongue, lips or throat, difficulty breathing or swallowing, widespread hives, dizziness, collapse.' },
  { /* 1 */ t: 'Adrenaline into the thigh, if available', d: 'Remove the safety cap, jab it into the outer side of the thigh (it can go through clothing) and hold for 10 seconds. Doses in the family: {{familia_adr}}.', hora: 'Adrenaline given' },
  { /* 2 */ t: 'Call 112 and say “anaphylaxis”', d: 'Even if they are already better.' },
  { /* 3 */ t: 'Lay them down with legs raised', d: 'If they have trouble breathing, sitting up; if pregnant, on their left side. **Do not let them stand up suddenly.**' },
  { /* 4 */ t: 'No better after 5 minutes: second dose', d: 'If there is another auto-injector. Antihistamines and inhalers help, but they do not replace adrenaline. If they stop breathing, CPR.', tempoT: 'Wait for the second dose' },
  { /* 5 */ t: 'They must go to hospital', d: 'Even if they get better: the reaction can come back hours later.' },
] };

GUIAS_EN['avc-enfarte'] = { t: 'Stroke or chest pain', passos: [
  { /* 0 */ t: 'What is happening?', d: 'Every minute counts in both cases.', p: { q: 'Is it pain or tightness in the chest?', simT: 'Chest pain', naoT: 'Face, arm or speech' } },
  { /* 1 avc */ t: 'Quick test: face, arms, speech', d: 'Ask them to smile: does one side of the face droop? To raise both arms: does one drop? To repeat a sentence: is their speech slurred or making no sense? **One sign is enough.**', hora: 'Signs started (or last seen well)' },
  { /* 2 */ t: 'Call 112: “suspected stroke”', d: 'Give the exact time it started. The treatments that save lives only work in the first few hours.' },
  { /* 3 */ t: 'While you wait', d: 'Lay them down with head and shoulders slightly raised. Nothing to eat or drink, **do not give aspirin**, loosen clothing and write down their usual medication.' },
  { /* 4 enfarte */ t: 'Call 112 now', d: 'Do not drive to hospital: if the heart stops in the car, nobody can help.' },
  { /* 5 */ t: 'Sit them down and do not let them walk', d: 'Back supported and knees bent. Complete rest, loosened clothing, fresh air.' },
  { /* 6 */ t: 'Chewed aspirin, if they can take it', d: '1 tablet of 150 to 300 mg, chewed, if they are not allergic, have no active ulcer or bleeding, and 112 does not advise against it.' },
  { /* 7 */ t: 'If they pass out and are not breathing: CPR', d: 'Switch on the AED if there is one.' },
] };

GUIAS_EN['crianca-perdida'] = { t: 'Missing child', passos: [
  { /* 0 */ t: 'Search the most dangerous places now', d: 'Water (pools, rivers, tanks), roads and balconies first. Call out the child’s name loudly. This screen counts the time since you started.', cronoT: '10 minutes have passed: if you have not called 112 yet, call now', ios: 'If the child has a phone or watch with location sharing, see where it is in the Find My app.' },
  { /* 1 */ t: 'Call 112 without waiting', d: 'There is no minimum time before raising the alarm. Say where and at what time the child was last seen, their age, height, clothes and shoes. In the family: {{kids_desc}}.' },
  { /* 2 */ t: 'Someone stays where the child was last seen', d: 'Many children go back there or stay put where they got lost. In a shop or shopping centre, tell security straight away so they watch the exits.' },
  { /* 3 */ t: 'Show a recent photo', d: 'To the police and security staff. Before spreading it on social media, talk to the police.' },
  { /* 4 */ t: 'Raise the alarm and use the helpline', d: 'SOS Criança Desaparecida (missing children helpline): **116 000**. Tell the family, the school and the neighbours: [quick messages](#/t/mensagens).' },
] };

GUIAS_EN['queimadura'] = { t: 'Burn', passos: [
  { /* 0 */ t: 'Remove the cause', d: 'Flames: “stop, drop, roll” or smother with a blanket. Electrical: cut the power **before** touching. Chemical: remove contaminated clothing. Move the person away from smoke.' },
  { /* 1 */ t: 'Cool running water for 20 minutes', d: 'Cool, not icy; **never ice**. It works up to 3 hours later. Only the burnt area: keep the rest of the body warm, especially in children.', tempoT: 'Cool with water' },
  { /* 2 */ t: 'Remove rings, watch, belt and loose clothing', d: 'Before it swells. Do **not** remove clothing stuck to the skin. Do not burst blisters.' },
  { /* 3 */ t: 'Is it serious?', d: 'Bigger than the palm of the casualty’s hand; deep (white, brownish, painless, leathery); on the face, hands, feet, genitals or joints, or all the way round the neck or a limb; electrical; chemical; with smoke inhalation (cough, hoarseness, singed nose hairs); in a baby, small child or elderly person.', p: { q: 'Any of these?' } },
  { /* 4 ligar */ t: 'Call 112', d: 'Say how it happened, how big it is and whether there is any difficulty breathing. Electrical: the heart can be affected hours later, keep watching. Smoke: the airway can close hours later.' },
  { /* 5 cobre */ t: 'Cover loosely', d: 'Kitchen cling film, laid on loosely (not wrapped round), or a clean, damp dressing. No cotton wool, pastes, butter or toothpaste.' },
  { /* 6 */ t: 'Pain and fluids', d: 'Paracetamol or ibuprofen; children’s doses by weight: {{familia_para}}. Give drinks (a large burn loses a lot of fluid). Keep the person warm and keep burnt joints moving.' },
  { /* 7 */ t: 'Over the next days', d: 'Small, superficial burn: wash once a day with water and mild soap and cover with a non-stick dressing or cling film; watch for infection (pus, smell, fever, spreading redness). Every electrical burn, and any burn on a baby or small child, is seen by a doctor, even a small one.' },
] };

GUIAS_EN['asma'] = { t: 'Asthma attack', passos: [
  { /* 0 */ t: 'Sit them up and keep calm', d: 'Sitting upright (not lying down), loose clothing, away from smoke, dust and cold. Speak slowly and calmly: panic makes the breathlessness worse.' },
  { /* 1 */ t: 'Any danger signs?', d: 'Cannot talk or drink, bluish lips or nails, becoming drowsy or confused. In a child: the skin sucking in between the ribs or at the neck with each breath, very quiet or very agitated.', p: { q: 'Any of these signs, or no inhaler?' } },
  { /* 2 ligar */ t: 'Call 112 now', d: 'Say “severe asthma attack”. Without an inhaler nothing replaces it: keep the person sitting and calm until help arrives. With an inhaler, carry on with the next step while you wait.' },
  { /* 3 puffs */ t: 'Reliever inhaler: 1 puff at a time', d: 'Salbutamol (the “blue inhaler”, e.g. Ventolin), with a spacer if there is one (with the mask for a small child). **1 puff, 4 normal breaths, another puff: 4 to 10 puffs.** Without a spacer it still works.' },
  { /* 4 */ t: 'Wait 4 minutes', d: 'Person sitting and calm. If the doctor prescribed an oral steroid (prednisolone) for attacks, give it now.', tempoT: 'Wait before repeating', p: { q: 'Better?' } },
  { /* 5 repete */ t: 'Repeat the 4 to 10 puffs', d: 'Another round, 1 puff at a time, with 4 breaths between puffs.', p: { q: 'Better after the second round?' } },
  { /* 6 ligar2 */ t: 'Call 112 and keep giving puffs', d: 'Two rounds without improvement: call. Until help arrives, 4 to 10 puffs every 4 minutes, sitting, calm. If they stop responding and are not breathing: CPR.' },
  { /* 7 depois */ t: 'Keep watching and see a doctor', d: 'If this was the **first attack ever**, call 112 even if it has passed. Otherwise, an attack that needed more than 10 puffs, or that came back the same day, must be seen within 24 hours (SNS 24, 808 24 24 24, or a doctor). Keep an inhaler and a spacer in the kit and in the grab bag.' },
] };

GUIAS_EN['intoxicacao'] = { t: 'Poisoning or carbon monoxide', passos: [
  { /* 0 */ t: 'Could it be carbon monoxide (CO)?', d: 'No colour, no smell. Suspect it if there is a gas water heater, brazier, fireplace, generator, barbecue or engine in an enclosed space, and **several people (or animals) with headache, dizziness, nausea or confusion** at the same time, better outdoors.', p: { q: 'Do you suspect CO?' } },
  { /* 1 co */ t: 'Get everyone out into the open air now', d: 'Open doors and windows only if it is quick. **Do not go back in.** Help anyone who cannot walk.' },
  { /* 2 */ t: 'Call 112', d: 'Even those who seem fine must be checked: CO stays in the blood. Do not use the appliance again until it has been inspected. If someone is not responding and not breathing: CPR, in the open air.' },
  { /* 3 estado */ t: 'How is the person?', d: 'Keep the packaging, plant, mushroom or vomit to show. If they are breathing but not responding: lay them on their side. If they are not breathing: CPR, compressions only if there is a risk of contaminating yourself.', p: { q: 'Unconscious, struggling to breathe or having a seizure?' } },
  { /* 4 ligar */ t: 'Call 112', d: 'Say what it was, how much, at what time, and the person’s age and weight. Have the packaging to hand.' },
  { /* 5 ciav */ t: 'Call the poisons centre (CIAV): 800 250 250', d: 'Centro de Informação Antivenenos, 24 hours, free. Say the product, the amount, the time, the age and the weight. Do what they tell you. **Do not make them vomit** and do not give milk or “home antidotes” on your own initiative.' },
  { /* 6 */ t: 'If it was on the skin, in the eyes or inhaled', d: 'Skin: remove contaminated clothing and rinse with plenty of water for **at least 20 minutes**. Eyes: lukewarm water for 15 to 20 minutes, from the inner corner outwards, then A&E. Smoke or gases: fresh air, sitting, no exertion; with coughing, wheezing or confusion, 112.', tempoT: 'Rinse the skin' },
  { /* 7 */ t: 'Cases that always go to A&E', d: 'Paracetamol overdose (no symptoms in the first hours, but it destroys the liver). Caustics such as bleach or drain cleaner (rinse the mouth, do not vomit). Paraffin, petrol or thinners. A swallowed button battery (it burns through the gullet in 2 hours; on the way, honey 10 ml every 10 minutes, only over 1 year old). Mushrooms (symptoms may only appear 6 to 24 hours later). Watch breathing and consciousness until they are seen.' },
] };

GUIAS_EN['calor'] = { t: 'Heatstroke', passos: [
  { /* 0 */ t: 'Get the person out of the heat', d: 'Shade or a cool place now. Lay them down with legs raised and remove excess clothing.' },
  { /* 1 */ t: 'Is it heatstroke?', d: '**Confusion, aggression, strange speech, seizures or loss of consciousness**, very hot skin (dry or still damp), temperature above 40 °C. With heavy sweating, cold clammy skin, dizziness, nausea and cramps, but thinking clearly, it is heat exhaustion.', p: { q: 'Confused, having a seizure or unconscious?' } },
  { /* 2 golpe */ t: 'Call 112', d: 'Say “heatstroke”. It kills or leaves lasting damage if the person is not cooled within minutes: while you wait, cooling is what saves them (next step).' },
  { /* 3 */ t: 'Cool them as fast as you can', d: 'Best: immerse in cold water up to the neck (bath, tank, river), with someone holding the head. If you cannot: wet the whole body and fan without stopping, ice or cold packs on the neck, armpits and groin, a fan. Keep going until the temperature drops to 39 °C or help arrives.', hora: 'Cooling started' },
  { /* 4 */ t: 'Drinks only if fully awake', d: 'Conscious: water in small sips. Drowsy or unconscious: nothing by mouth, lay them on their side and watch their breathing. If they stop breathing: CPR.' },
  { /* 5 esgotamento */ t: 'Cool down and give drinks', d: 'Wet the skin with cool water, damp cloths on the neck, armpits and groin, fan them. Water or oral rehydration solution in small sips, **with salt**: not just large amounts of plain water.' },
  { /* 6 */ t: 'Reassess after 30 minutes', d: 'If they get worse before that (confusion, hot skin, they stop sweating, fainting), do not wait: it is heatstroke.', tempoT: 'Reassess', p: { q: 'Better?' } },
  { /* 7 bem */ t: 'Rest for the rest of the day', d: 'Cool place, keep drinking, no exertion or sun. Cramps: stretch gently, massage, rehydration solution or water with a pinch of salt. Watch babies, the elderly and anyone on diuretics especially.' },
] };
