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
    arrival: 'Arrive from ~5pm Friday 1 May',
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
    days: [
      {
        label: 'Friday evening',
        items: [
          'Arrive ~5pm, pitch up.',
          'Mass pasta cookout on Luke’s double gas hob — fresh pasta, toms, cheese, sweetcorn. Everyone piles in.',
        ],
      },
      {
        label: 'Saturday',
        items: [
          'Free day. Walks, mooching, river. Do as much or as little as you like.',
        ],
      },
      {
        label: 'Saturday evening',
        items: [
          'Pizza night at the long table by the campsite pizza oven.',
          'Adults: eat + drink. Kids: play (and leave the saplings alone).',
        ],
      },
      {
        label: 'Sunday',
        items: [
          'Big walk day — Mam Tor ridge if weather holds.',
        ],
      },
      {
        label: 'Monday',
        items: [
          'Lazy breakfast, pack up, leave clean.',
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
          },
          {
            name: 'Grindsbrook Clough',
            desc: 'From camp or a 5-min drive. Proper stream walking — expect wet feet.',
            url: 'https://peakdistrictwalks.net/best-walks-from-edale-peak-district/',
          },
          {
            name: 'Mam Tor — “The Shivering Mountain”',
            desc: 'Drive to footpath, easy-ish climb, huge views. The hill slips from shale underneath.',
            url: 'https://visitpeakdistrict.com/business-directory/mam-tor-shivering-mountain',
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
          },
          {
            name: 'Castleton village',
            desc: 'Free alternative. Ice cream, river paddle, mooching. Rainy-afternoon rescue.',
            url: 'https://maps.google.com/?q=Castleton+village+Derbyshire',
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

  // === CHECKLIST ===
  checklist: {
    heading: 'Gear & Food',
    resetLabel: 'Reset list',
    groups: [
      {
        id: 'tents',
        label: 'Tents & Camping',
        items: [
          { id: 'c-tent1', label: '3× tents' },
          { id: 'c-airmat', label: '3× airmats' },
          { id: 'c-sleepbag', label: '6× sleep bags' },
          { id: 'c-pillows', label: '3× pillows' },
          { id: 'c-duvets', label: '2× duvets' },
          { id: 'c-lights', label: '3× lights' },
          { id: 'c-tentbrush', label: 'Tent brush' },
          { id: 'c-mallet', label: 'Mallet' },
          { id: 'c-pans', label: 'Pans' },
          { id: 'c-bowlscups', label: 'Bowls, cups & cutlery' },
          { id: 'c-watercarrier', label: 'Water carrier' },
          { id: 'c-tables', label: '2× tables' },
          { id: 'c-chairs', label: '3× chairs' },
          { id: 'c-washingliquid', label: 'Washing-up liquid' },
          { id: 'c-washingbowl', label: 'Bowl for washing up' },
          { id: 'c-lighter', label: 'Lighter' },
          { id: 'c-towels', label: 'Towels ×2' },
          { id: 'c-teatowel', label: 'Tea towel' },
        ],
      },
      {
        id: 'clothes',
        label: 'Clothes',
        items: [
          { id: 'c-rain', label: 'Rain jackets ×3' },
          { id: 'c-puffa', label: 'Puffa jackets ×3' },
          { id: 'c-wellies', label: 'Wellies' },
          { id: 'c-pantssocks', label: 'Pants & socks' },
          { id: 'c-fleece', label: 'Fleece ×3' },
          { id: 'c-tshirts', label: 'T-shirts' },
          { id: 'c-shortsleggings', label: 'Shorts & leggings' },
          { id: 'c-gloves', label: 'Gloves' },
          { id: 'c-caps', label: 'Caps ×3' },
          { id: 'c-woolyhats', label: 'Woolly hats ×3' },
          { id: 'c-trunks', label: 'Trunks' },
          { id: 'c-suncream', label: 'Sun cream' },
          { id: 'c-sunnies', label: 'Sunglasses' },
        ],
      },
      {
        id: 'kids',
        label: 'Kids',
        items: [
          { id: 'c-books', label: 'Books ×3' },
          { id: 'c-teddies', label: 'Teddies ×2' },
          { id: 'c-phonecharger', label: 'Phone & charger' },
        ],
      },
      {
        id: 'food',
        label: 'Food & Kitchen',
        items: [
          { id: 'c-freshpasta', label: 'Fresh pasta' },
          { id: 'c-tinnedtoms', label: 'Tinned tomatoes & corn' },
          { id: 'c-mozz', label: 'Mozzarella' },
          { id: 'c-beans', label: 'Beans' },
          { id: 'c-breadmarg', label: 'Bread & marg' },
          { id: 'c-bananas', label: 'Bananas' },
          { id: 'c-apples', label: 'Apples' },
          { id: 'c-granola', label: 'Granola' },
          { id: 'c-teabags', label: 'Tea bags' },
          { id: 'c-milk', label: 'Milk' },
          { id: 'c-bacon', label: 'Bacon' },
          { id: 'c-pringles', label: 'Pringles' },
          { id: 'c-juicecartons', label: 'Juice cartons' },
          { id: 'c-lager', label: 'Lager' },
          { id: 'c-coke', label: 'Coke' },
        ],
      },
      {
        id: 'fun',
        label: 'Fun',
        items: [
          { id: 'c-football', label: 'Football' },
          { id: 'c-cricket', label: 'Cricket' },
          { id: 'c-guitar', label: 'Guitar' },
        ],
      },
    ],
  },

  // === KIDS' CORNER (parent heading + shared copy) ===
  kidsCorner: {
    heading: "Kids' Corner",
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

  // === FOOTER ===
  footer: {
    campsiteLabel: 'Newfold Farm Edale',
    campsiteUrl: 'https://www.newfoldfarmedale.com/',
    campsitePhone: '01433 670310',
    wink: 'Built for t’ group chat.',
  },
};

// Make globally available (social crawlers won't execute JS — meta tags in <head> handle that)
if (typeof window !== 'undefined') {
  window.TEXT_CONFIG = TEXT_CONFIG;
}
