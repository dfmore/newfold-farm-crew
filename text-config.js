/**
 * TEXT CONFIGURATION — Newfold Farm Crew
 *
 * Single source of truth for all user-facing strings.
 * Edit here; index.html contains no hard-coded copy.
 */

const TEXT_CONFIG = {

  // === SITE META (also hard-coded in <head> for social crawlers) ===
  site: {
    title: 'Newfold Farm Crew · 1–4 May 2026',
    description: 'Ey up. Three days camping at Newfold Farm, Edale. Walks, pizza, muddy kids, and the odd sheep.',
    ogUrl: 'https://dfmore.github.io/newfold-farm-crew/',
  },

  // === HERO ===
  hero: {
    headline: "Ey up — we’re off to Edale",
    subhead: 'Newfold Farm · 1–4 May 2026 · Grouse Field',
  },

  // === TODAY'S MISSION ===
  mission: {
    heading: "Today’s Mission",
    // Keyed by YYYY-MM-DD in local time
    days: {
      '2026-05-01': 'Find a Y-shaped stick.',
      '2026-05-02': 'Build a tiny cairn by the stream.',
      '2026-05-03': 'Spot something older than Grandad.',
      '2026-05-04': 'Leave the pitch cleaner than we found it.',
    },
    before: 'Mission briefing starts Friday.',
    after: 'Mission complete. See you in the group chat.',
  },

  // === GETTING THERE ===
  gettingThere: {
    heading: 'Getting There',
    campsite: 'Newfold Farm Edale',
    address: 'Edale, Hope Valley, S33 7ZD',
    pitch: 'Grouse Field',
    arrival: 'Arrive Friday afternoon, any time from mid-afternoon onwards.',
    campsiteUrl: 'https://www.newfoldfarmedale.com/',
    campsiteLabel: 'newfoldfarmedale.com',
    mapsUrl: 'https://maps.google.com/?q=Newfold+Farm+Edale+S33+7ZD',
    mapsLabel: 'Open in Google Maps',
    w3w: '///fills.remove.ropes',
    w3wLabel: 'what3words: ///fills.remove.ropes',
    w3wUrl: 'https://w3w.co/fills.remove.ropes',
  },

  // === WEATHER ===
  weather: {
    heading: 'Check Before You Pack',
    intro: 'Peak District weather has opinions. Both are worth a glance the night before.',
    links: [
      { label: 'Met Office — Edale', url: 'https://www.metoffice.gov.uk/weather/forecast/gcqqr04xf' },
      { label: 'BBC Weather — Edale', url: 'https://www.bbc.co.uk/weather/2650416' },
    ],
  },

  // === THE PLAN ===
  plan: {
    heading: 'The Plan',
    prelude: 'Rough plan. Most of it will evolve — the group chat is the source of truth.',
    days: [
      {
        label: 'Friday',
        items: [
          'Arrive and pitch up late afternoon.',
          'Group dinner at camp once the tents are sorted.',
        ],
      },
      {
        label: 'Saturday',
        items: [
          'Out in the hills or down in the valley, whichever the weather rewards.',
          'Evening together at camp.',
        ],
      },
      {
        label: 'Sunday',
        items: [
          "A bigger walk if it's dry, something gentler if not.",
          'Pub option in the evening.',
        ],
      },
      {
        label: 'Monday',
        items: [
          'Slow breakfast.',
          'Pack up and head off after lunch.',
        ],
      },
    ],
  },

  // === THE PEAKS ===
  peaks: {
    heading: 'Worth Doing Nearby',
    flavour: [
      '📜 Edale = Old English “water valley”. The village is made of five historic **Booths** — 13th-century shepherd shelters that grew into hamlets.',
      '🪨 Peep at the dry stone walls — many stones hide 300-million-year-old fossils from when the Peaks were a tropical sea. Free paleontology.',
      '🚶 Kinder Mass Trespass, 1932 — walkers marched up the moors to claim the right to roam. You’re enjoying the dividend.',
      '⛰️ England’s first organised mountain rescue team formed near here in 1928, after an accident on Laddow Rocks.',
    ],
    groups: [
      {
        label: 'Walks',
        items: [
          {
            name: 'Edale Circular',
            desc: 'Walkable from camp, valley-level, 1–1.5h. Packhorse bridge kids remember.',
            url: 'https://www.nationaltrust.org.uk/visit/peak-district-derbyshire/kinder-edale-and-the-high-peak/edale-circular-walk',
            image: 'assets/peaks/vale-of-edale-640.jpg',
            imageAlt: 'View down Vale of Edale from Hollins Cross.',
          },
          {
            name: 'Grindsbrook Clough',
            desc: 'From camp or a 5-min drive. Proper stream walking — expect wet feet.',
            url: 'https://peakdistrictwalks.net/best-walks-from-edale-peak-district/',
            image: 'assets/peaks/grindsbrook-clough-640.jpg',
            imageAlt: 'Stream-cut valley of Grindsbrook Clough above Edale.',
          },
          {
            name: 'Mam Tor — “The Shivering Mountain”',
            desc: 'Drive to footpath, easy-ish climb, huge views. The hill slips from shale underneath.',
            url: 'https://visitpeakdistrict.com/business-directory/mam-tor-shivering-mountain',
            image: 'assets/peaks/mam-tor-640.jpg',
            imageAlt: 'Mam Tor ridge above Castleton.',
          },
        ],
      },
      {
        label: 'Pub',
        items: [
          {
            name: 'The Rambler Inn',
            desc: 'Walkable from camp. Beer garden, kids’ play area, home-cooked food.',
            url: 'https://www.dorbiere.co.uk/the-rambler-inn/',
          },
          {
            name: "Old Nag’s Head (trivia)",
            desc: 'Opposite the Rambler. Official start of the Pennine Way — since 1577.',
            url: 'https://maps.google.com/?q=Old+Nags+Head+Edale',
          },
        ],
      },
      {
        label: 'Kid-friendly',
        items: [
          {
            name: 'Speedwell Cavern',
            desc: 'Underground boat trip through a flooded lead mine. Age 5+, 106 wet steps. £16/£9, book ahead.',
            url: 'https://peakdistrictkids.co.uk/speedwell-cavern/',
            image: 'assets/peaks/speedwell-cavern-640.jpg',
            imageAlt: 'Entrance to Speedwell Cavern in Castleton.',
          },
          {
            name: 'Castleton village',
            desc: 'Free alternative. Ice cream, river paddle, mooching. Rainy-afternoon rescue.',
            url: 'https://maps.google.com/?q=Castleton+village+Derbyshire',
            image: 'assets/peaks/castleton-village-640.jpg',
            imageAlt: 'Castleton village in Derbyshire.',
          },
          {
            name: 'Chestnut Centre Wildlife Park',
            desc: 'Otters and owls. Wet-day backup.',
            url: 'https://www.chestnutcentre.co.uk/',
          },
        ],
      },
    ],
  },

  // === CHECKLIST (Kit List panel heading + reset button copy; items live in kitCategories below) ===
  checklist: {
    heading: 'Gear & Food',
    resetLabel: 'Reset list',
  },

  // === KIDS' CORNER (parent heading + shared copy) ===
  kidsCorner: {
    heading: "Kids' Corner",
    disclaimer: "📱 One phone, one game. Bingo cards and welly ratings live on this device only — they don’t sync between parents. Pass the phone around if you’re playing together.",
    missionNudge: 'See today’s mission at the top ↑',
  },

  // === NATURE BINGO ===
  bingo: {
    heading: 'Nature Bingo',
    emptyState: 'Nowt spotted yet — eyes peeled.',
    fullCard: 'Grand! Full card.',
    reshuffleLabel: "Shake for a new ‘un",
    storageKeyPrefix: 'newfold:bingo:',
    pool: [
      { id: 'b-sheep', label: '🐑 A sheep with a black face (Swaledale)' },
      { id: 'b-wall', label: '🧱 A dry stone wall' },
      { id: 'b-puddle', label: '💦 A proper muddy puddle' },
      { id: 'b-gorse', label: '🟡 Gorse flowers (yellow, smell like coconut)' },
      { id: 'b-cottongrass', label: '🌿 Cotton grass (white fluff on stalks)' },
      { id: 'b-trig', label: '🪨 A trig point' },
      { id: 'b-kissinggate', label: '🚪 A kissing gate' },
      { id: 'b-stile', label: '🧗 A stile' },
      { id: 'b-stream', label: '🌊 A stream crossing' },
      { id: 'b-cloud', label: '☁️ A cloud shaped like something' },
      { id: 'b-raptor', label: '🦅 A bird of prey' },
      { id: 'b-cow', label: '🐄 A cow (stay chill, don’t get close)' },
      { id: 'b-tree', label: '🌲 A tree older than you think' },
      { id: 'b-boot', label: '🥾 Someone else’s muddy boot' },
      { id: 'b-signpost', label: '🗺️ A trail signpost' },
      { id: 'b-mamtor', label: '🏔️ Mam Tor (the big one)' },
      { id: 'b-campfire', label: '🔥 A real campfire' },
      { id: 'b-moon', label: '🌙 The moon before bedtime' },
    ],
  },

  // === SQUELCH-O-METER ===
  squelch: {
    heading: 'Squelch-o-Meter',
    subhead: 'Who got muddiest?',
    emptyPrompt: 'Add the kids once you know who’s turned up.',
    addPlaceholder: 'Kid’s name',
    addLabel: 'Add a camper',
    ratingLabel: 'Welly points',
    removeLabel: 'Remove',
    revealHeading: '🏆 Muddiest Camper',
    storageKidsList: 'newfold:kids:list',
    storageSquelchPrefix: 'newfold:squelch:',
  },

  // === MEMORY WALL ===
  memoryWall: {
    heading: 'Memory Wall',
    subhead: 'No sign-up needed. Just pop your name and upload.',
    body: 'Best bits, worst bits, muddiest bits. Photos and videos both welcome.',
    buttonLabel: '📸 Chuck yer photos in here',
    dropboxUrl: 'https://www.dropbox.com/request/8zhrdnjwh5h0sc3iz0ws',
  },

  // === SHARE / QR ===
  share: {
    heading: 'Share with another parent →',
    body: 'Point a phone camera at this to send someone the site.',
  },

  // === KIT LIST — drillable categories (v2) ===
  kitCategories: [
    {
      id: 'tent',
      emoji: '🏕️',
      title: 'Tent stuff',
      items: [
        { id: 'kit-tent-tents',       label: 'Tent' },
        { id: 'kit-tent-airmats',     label: 'Sleep mat (per person)' },
        { id: 'kit-tent-sleepbags',   label: 'Sleep bag (per person)' },
        { id: 'kit-tent-pillows',     label: 'Pillow' },
        { id: 'kit-tent-duvets',      label: 'Duvet or extra blanket' },
        { id: 'kit-tent-lights',      label: 'Lantern / torch' },
        { id: 'kit-tent-brush',       label: 'Tent brush' },
        { id: 'kit-tent-mallet',      label: 'Mallet' },
        { id: 'kit-tent-gaffer',      label: 'Gaffer tape' },
        { id: 'kit-tent-windbreak',   label: 'Wind break' },
        { id: 'kit-tent-fairylights', label: 'Fairy lights' },
      ],
    },
    {
      id: 'gear',
      emoji: '🛠️',
      title: 'Gear & practical',
      items: [
        { id: 'kit-gear-headtorch',   label: 'Head torch' },
        { id: 'kit-gear-charger',     label: 'Phone charger' },
        { id: 'kit-gear-firstaid',    label: '1st aid kit' },
        { id: 'kit-gear-paracetamol', label: 'Paracetamol' },
        { id: 'kit-gear-ibuprofen',   label: 'Ibuprofen' },
        { id: 'kit-gear-powerbank',   label: 'Powerbank' },
        { id: 'kit-gear-camera',      label: 'Camera' },
        { id: 'kit-gear-lighter',     label: 'Lighter' },
        { id: 'kit-gear-batteries',   label: 'Batteries' },
        { id: 'kit-gear-knife',       label: 'Knife' },
        { id: 'kit-gear-towels',      label: 'Towel' },
        { id: 'kit-gear-teatowel',    label: 'Tea towel' },
      ],
    },
    {
      id: 'clothes',
      emoji: '👕',
      title: 'Clothes',
      items: [
        { id: 'kit-clothes-rain',         label: 'Waterproof jacket' },
        { id: 'kit-clothes-puffa',        label: 'Warm jacket' },
        { id: 'kit-clothes-wellies',      label: 'Wellies' },
        { id: 'kit-clothes-pantssocks',   label: 'Pants & socks' },
        { id: 'kit-clothes-fleece',       label: 'Fleece / mid layer' },
        { id: 'kit-clothes-tshirts',      label: 'T-shirts' },
        { id: 'kit-clothes-shorts',       label: 'Shorts & leggings' },
        { id: 'kit-clothes-gloves',       label: 'Gloves' },
        { id: 'kit-clothes-caps',         label: 'Sun hat / cap' },
        { id: 'kit-clothes-woolyhats',    label: 'Wooly hat' },
        { id: 'kit-clothes-trunks',       label: 'Trunks' },
        { id: 'kit-clothes-suncream',     label: 'Sun cream' },
        { id: 'kit-clothes-sunglasses',   label: 'Sunglasses' },
      ],
    },
    {
      id: 'food',
      emoji: '🍴',
      title: 'Food',
      items: [
        { id: 'kit-food-pasta',       label: 'Fresh pasta' },
        { id: 'kit-food-tinnedtoms',  label: 'Tinned tomatoes & corn' },
        { id: 'kit-food-mozz',        label: 'Mozzarella' },
        { id: 'kit-food-beans',       label: 'Beans' },
        { id: 'kit-food-bread',       label: 'Bread & marg' },
        { id: 'kit-food-bananas',     label: 'Bananas' },
        { id: 'kit-food-apples',      label: 'Apples' },
        { id: 'kit-food-granola',     label: 'Granola' },
        { id: 'kit-food-teabags',     label: 'Tea bags' },
        { id: 'kit-food-milk',        label: 'Milk' },
        { id: 'kit-food-bacon',       label: 'Bacon' },
        { id: 'kit-food-pringles',    label: 'Pringles' },
        { id: 'kit-food-juicecartons',label: 'Juice cartons' },
        { id: 'kit-food-lager',       label: 'Lager' },
        { id: 'kit-food-coke',        label: 'Coke' },
      ],
    },
    {
      id: 'kitchen',
      emoji: '🍳',
      title: 'Kitchen',
      items: [
        { id: 'kit-kitchen-stove',       label: 'Gas stove' },
        { id: 'kit-kitchen-pans',        label: 'Pans' },
        { id: 'kit-kitchen-bowlscups',   label: 'Bowls, cups & cutlery' },
        { id: 'kit-kitchen-watercarrier',label: 'Water carrier' },
        { id: 'kit-kitchen-tables',      label: '2× tables' },
        { id: 'kit-kitchen-chairs',      label: '3× chairs' },
        { id: 'kit-kitchen-washingliq',  label: 'Washing-up liquid' },
        { id: 'kit-kitchen-washingbowl', label: 'Washing-up bowl' },
        { id: 'kit-kitchen-tinfoil',     label: 'Tin foil' },
        { id: 'kit-kitchen-ziplock',     label: 'Ziplock bags' },
      ],
    },
    {
      id: 'toiletry',
      emoji: '🧼',
      title: 'Toiletry',
      items: [
        { id: 'kit-toiletry-shampoo',    label: 'Shampoo' },
        { id: 'kit-toiletry-toothbrush', label: 'Toothbrush' },
        { id: 'kit-toiletry-loo',        label: 'Toilet paper' },
        { id: 'kit-toiletry-suncream',   label: 'Sun cream' },
        { id: 'kit-toiletry-insect',     label: 'Insect repellant' },
        { id: 'kit-toiletry-wetwipes',   label: 'Wet wipes' },
      ],
    },
    {
      id: 'kids-gear',
      emoji: '🎮',
      title: "Kids' gear",
      items: [
        { id: 'kit-kids-books',    label: 'Books' },
        { id: 'kit-kids-teddies',  label: 'Teddy' },
        { id: 'kit-kids-football', label: 'Football' },
        { id: 'kit-kids-cricket',  label: 'Cricket' },
        { id: 'kit-kids-guitar',   label: 'Guitar' },
        { id: 'kit-kids-frisbee',  label: 'Frisbee' },
        { id: 'kit-kids-kite',     label: 'Kite' },
        { id: 'kit-kids-cars',     label: 'Toy cars' },
      ],
    },
  ],

  // === FOOTER ===
  footer: {
    campsiteLabel: 'Newfold Farm Edale',
    campsiteUrl: 'https://www.newfoldfarmedale.com/',
    campsitePhone: '01433 670310',
    wink: "Built for t' group chat.",
    heroCredit: 'Hero photo by Donnchadh H, via Wikimedia Commons, CC BY 2.0.',
    peaksCredit: 'Peak photos via Wikimedia Commons (various contributors, CC BY / CC BY-SA / Attribution).',
  },
};

// Make globally available (social crawlers won't execute JS — meta tags in <head> handle that)
if (typeof window !== 'undefined') {
  window.TEXT_CONFIG = TEXT_CONFIG;
}
