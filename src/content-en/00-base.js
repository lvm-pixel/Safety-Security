/* Versão inglesa dos guias. Tem os mesmos ids que src/content/ e só o texto: ícones, ordem, figuras e ferramentas vêm da versão portuguesa.
   Formato igual ao de src/content/00-base.js (Markdown simplificado, sem acento grave nem "${").
   Cada lista "- [ ]" tem de ter os mesmos itens, pela mesma ordem, que em português: as marcações ficam guardadas nas chaves portuguesas.
   Uma página sem tradução aparece em português. */
const CONTENT_EN = { sections: {} };
const FIGS_EN = {};
const GUIAS_EN = {};

CONTENT_EN.about = `
## What this is

**Safety & Security** is an emergency and survival guide that works completely offline, in a single file, with no installation, no account and without sending data anywhere. It was made to be on a mobile phone, a PC or a USB stick when the network, the electricity or services fail.

Everything you write (checklists, plan, inventory, notes, vault) stays **only on this device and in this browser**. Make [backups](#/t/backup).

The app is tailored to the family described in the [family profile](#/t/familia): the amounts of water and food, the children's doses, the ID cards and the guides in the “Our family” section are calculated from it.

## Important disclaimers

>x **If a life is in danger, call 112.** This guide does not replace the emergency services, doctors, Proteção Civil (Civil Protection) or the authorities. Always follow official instructions when there are any.

- The first aid information follows general European guidelines (ERC/INEM: European Resuscitation Council and the Portuguese medical emergency service) but it is a summary. Take an in-person course: it is the best investment you can make.
- Medicine and bleach doses are a guide for healthy adults. Check the label, and check with a professional whenever possible.
- The app does not know where you are or what is happening. Use common sense and adapt.
- The authors accept no responsibility for the use of this information. Use it at your own risk.

## Keeping it useful

- Review the content and the family plan **every 6 months** (tip: when the clocks change).
- Print the critical pages (first aid, numbers, plan) and keep them in the kit. Paper needs no battery.
- Share the file with your family and neighbours.

## Privacy and security

- No tracking and no accounts. The code is in the file itself and anyone can read it.
- Only these use the internet, and only when you use them: the [News and alerts](#/t/noticias) page, the [map](#/t/mapa) and the Refresh button in “Situation now” and in [Near me](#/t/perto). The detailed map background comes from OpenStreetMap, OpenStreetMap France or OpenTopoMap, which receive the request for the tiles of the area you are looking at. “Refresh alerts” connects to the official sources, and “Download area” sends OpenStreetMap only the coordinates of the requested rectangle. They all see your IP address, as any website does, and never receive names or family data.
- The “Google Maps”, “Open in Google Maps”, “Open in Apple Maps” and “Directions” buttons send the point's coordinates to Google or Apple. This only happens when you tap them.
- [Phone alerts](#/t/alertas) go through GitHub and ntfy.sh, which receive the areas and the topic you chose and nothing else. The test notification goes straight from here to ntfy.sh.
- The SMS messages, the medical card, the lock screen image and the QR codes are made on the phone itself, without internet.
- The Video tab shows YouTube thumbnails and videos. The thumbnails load when you open the tab, and the videos only when you tap them, through the youtube-nocookie.com address.
- The vault uses AES-256-GCM with a key derived by PBKDF2 (250,000 iterations) through the browser's Web Crypto. The password is never stored. If you lose it, the contents cannot be recovered.
- If the device is shared or could be seized, lock the vault and think twice about keeping data in it that could put you at risk.

## Sources and general references

Proteção Civil (ANEPC), INEM, SNS 24 (national health helpline), IPMA (weather institute), Cruz Vermelha (Portuguese Red Cross), World Health Organization, European Commission (preparedness strategy, 72-hour kit), civil defence guides from several countries, FEMA/ready.gov, CDC. Check these organisations' official websites when you have internet.
`;

CONTENT_EN.battery = `
## Making the battery last for days

- **Low Power Mode** on (or an ultra power saving mode, if there is one).
- **Aeroplane mode** when you do not need the network; reconnect only once an hour to check messages. With no network, the phone uses a lot of power searching for a signal.
- Brightness at the lowest usable level. Dark screen (this app has dark and red themes).
- Turn off Wi-Fi, Bluetooth, GPS, mobile data, syncing and background apps.
- Do not use your phone as a torch for long: use a battery torch.
- Extreme cold drains the battery: keep the phone close to your body.
- Do not let it run completely flat; charge it whenever you get the chance, even a little.
- Power bank: charge it every month; 10,000 mAh gives 2 to 3 full charges.
- In the car, charge with the engine running (10 min every hour is enough). Never in a closed garage.
- SMS uses less power than calls and gets through on congested networks.

## Alternative power sources

- Folding solar panel of 10 to 20 W: charges a phone in 2 to 4 hours of direct sunlight.
- Dynamo (hand-crank) charger: 1 minute of cranking gives about 1 minute of talk time. Tiring but reliable.
- 12 V car battery with an inverter, or a USB adapter for the cigarette lighter socket.
- Battery or dynamo radio to receive information: it uses much less power than a phone.
`;

CONTENT_EN.vaultHelp = `
## What to keep in the vault

- Cartão de Cidadão (Portuguese ID card) or passport (front and back), driving licence, European Health Insurance Card.
- Insurance policies, tenancy agreement or property deed, proof of address.
- Prescriptions, medical reports, medication list, vaccination card, blood group.
- Important contacts, essential passwords, access codes.
- A recent photo of each family member (it helps with identification and searches).
- Photos of the things in your home (for insurance).

## Good practice

- A long password (a phrase of 4 or 5 words) that only you and one trusted person know.
- Also keep paper copies in a waterproof bag, and an encrypted copy (the export) on a USB stick or another phone.
- Lock the vault when you finish. It locks itself after 5 minutes.
`;
