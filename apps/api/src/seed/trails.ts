import { type PersonName } from "./data";

export type Step =
  | { k: "typed"; to: string }
  | { k: "link"; to: string }
  | { k: "history"; to: string }
  | { k: "search"; q: string }
  | { k: "hit"; to: string }
  | { k: "back" }
  | { k: "fwd" };

const T = (to: string): Step => ({ k: "typed", to });
const L = (to: string): Step => ({ k: "link", to });
const J = (to: string): Step => ({ k: "history", to });
const S = (q: string): Step => ({ k: "search", q });
const H = (to: string): Step => ({ k: "hit", to });
const B: Step = { k: "back" };
const F: Step = { k: "fwd" };

export interface Trail {
  person: PersonName;
  startsAt: number;
  steps: Step[];
}

export const TRAILS: Trail[] = [
  {
    person: "Ada Okafor",
    startsAt: 0,
    steps: [
      T("tidepool.io"),
      L("kelpforest.org"),
      L("saltmarsh.guide"),
      L("birdwatch.club"),
      B,
      B,
      B,
      L("moonphase.io"),
      L("weatherlore.net"),
      L("lanternroom.com"),
      L("tidepool.io"),
      L("seastar-atlas.io"),
      B,
      S("tide"),
      H("weatherlore.net")
    ]
  },
  {
    person: "Bram Larsen",
    startsAt: 3,
    steps: [
      T("sourdough.club"),
      L("bakerlog.io"),
      L("curdandwhey.net"),
      L("cheese-caves.net"),
      B,
      B,
      L("weatherlore.net"),
      L("moonphase.io"),
      L("stargazers.space"),
      S("bread"),
      H("sourdough.club"),
      L("flour-atlas.com"),
      B,
      B,
      H("bakerlog.io"),
      B,
      F
    ]
  },
  {
    person: "Chiara Rossi",
    startsAt: 8,
    steps: [
      T("stargazers.space"),
      L("cartography.dev"),
      L("lost-islands.dev"),
      B,
      L("lanternroom.com"),
      L("tidepool.io"),
      L("moonphase.io"),
      B,
      B,
      F,
      L("kelpforest.org"),
      S("kelp"),
      H("kelpforest.org")
    ]
  },
  {
    person: "Dmitri Volkov",
    startsAt: 20,
    steps: [T("mischief.io"), L("tidepool.io"), B, T("cartography.dev"), L("stargazers.space"), L("moonphase.io"), L("weatherlore.net"), J("mischief.io"), B, B]
  },
  {
    person: "Esi Mensah",
    startsAt: 2,
    steps: [
      T("birdwatch.club"),
      L("saltmarsh.guide"),
      L("lanternroom.com"),
      L("weatherlore.net"),
      L("moonphase.io"),
      L("stargazers.space"),
      L("cartography.dev"),
      B,
      B,
      B,
      L("birdwatch.club"),
      L("kelpforest.org"),
      L("tidepool.io"),
      L("seastar-atlas.io"),
      B,
      L("moonphase.io"),
      L("tidepool.io"),
      S("moon"),
      H("stargazers.space"),
      B,
      H("weatherlore.net"),
      L("lanternroom.com"),
      L("saltmarsh.guide"),
      B,
      F
    ]
  },
  {
    person: "Farah Haddad",
    startsAt: 0,
    steps: [
      T("tidepool.io"),
      L("kelpforest.org"),
      L("kelp-census.org"),
      B,
      L("saltmarsh.guide"),
      L("birdwatch.club"),
      L("weatherlore.net"),
      L("moonphase.io"),
      L("stargazers.space"),
      L("cartography.dev"),
      L("lost-islands.dev"),
      B,
      L("lanternroom.com"),
      L("tidepool.io"),
      L("seastar-atlas.io"),
      B,
      T("sourdough.club"),
      L("bakerlog.io"),
      L("curdandwhey.net"),
      L("cheese-caves.net"),
      B,
      L("sourdough.club"),
      L("flour-atlas.com"),
      B,
      B,
      B,
      F,
      B,
      T("mischief.io"),
      L("tidepool.io"),
      B,
      S("tide"),
      H("moonphase.io"),
      B,
      H("saltmarsh.guide"),
      L("tidepool.io"),
      L("saltmarsh.guide")
    ]
  }
];
