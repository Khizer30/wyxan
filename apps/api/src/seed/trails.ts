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
    person: "Ayesha Malik",
    startsAt: 0,
    steps: [
      T("lahorenama.pk"),
      L("mughalnama.pk"),
      L("peshawarnama.pk"),
      L("chaikhana.pk"),
      B,
      B,
      B,
      L("dastarkhwan.pk"),
      L("karachisea.pk"),
      L("turtle-beach.pk"),
      B,
      S("biryani"),
      H("dastarkhwan.pk")
    ]
  },
  {
    person: "Hamza Qureshi",
    startsAt: 4,
    steps: [
      T("karakoram.pk"),
      L("hunza.pk"),
      L("skardu.pk"),
      L("deosai-wildlife.pk"),
      B,
      B,
      L("chaikhana.pk"),
      L("dastarkhwan.pk"),
      S("apricot"),
      H("hunza.pk"),
      B,
      F
    ]
  },
  {
    person: "Zainab Siddiqui",
    startsAt: 8,
    steps: [
      T("chaikhana.pk"),
      L("peshawarnama.pk"),
      L("khyber-pass.pk"),
      B,
      L("mughalnama.pk"),
      L("lahorenama.pk"),
      L("cricketnama.pk"),
      B,
      B,
      F,
      L("dastarkhwan.pk"),
      S("nihari"),
      H("lahorenama.pk")
    ]
  },
  {
    person: "Bilal Khan",
    startsAt: 20,
    steps: [T("mischief.pk"), L("karakoram.pk"), B, T("cricketnama.pk"), L("karachisea.pk"), L("indusriver.pk"), L("mohenjodaro.pk"), J("mischief.pk"), B, B]
  },
  {
    person: "Mariam Chaudhry",
    startsAt: 2,
    steps: [
      T("karachisea.pk"),
      L("indusriver.pk"),
      L("karakoram.pk"),
      L("hunza.pk"),
      L("skardu.pk"),
      L("karakoram.pk"),
      B,
      B,
      B,
      L("gilgit-baltistan-atlas.pk"),
      B,
      L("skardu.pk"),
      L("deosai-wildlife.pk"),
      B,
      L("hunza.pk"),
      L("chaikhana.pk"),
      L("peshawarnama.pk"),
      L("mughalnama.pk"),
      S("mughal"),
      H("lahorenama.pk"),
      B,
      H("mughalnama.pk"),
      L("lahorenama.pk"),
      L("cricketnama.pk"),
      B,
      F
    ]
  },
  {
    person: "Usman Farooqui",
    startsAt: 0,
    steps: [
      T("karakoram.pk"),
      L("hunza.pk"),
      L("chaikhana.pk"),
      L("peshawarnama.pk"),
      L("khyber-pass.pk"),
      B,
      L("mughalnama.pk"),
      L("lahorenama.pk"),
      L("dastarkhwan.pk"),
      L("karachisea.pk"),
      L("turtle-beach.pk"),
      B,
      L("indusriver.pk"),
      L("mohenjodaro.pk"),
      L("harappa-museum.pk"),
      B,
      L("lahorenama.pk"),
      L("cricketnama.pk"),
      L("karachisea.pk"),
      B,
      B,
      B,
      F,
      B,
      B,
      L("karakoram.pk"),
      L("indusriver.pk"),
      B,
      L("skardu.pk"),
      L("karakoram.pk"),
      L("gilgit-baltistan-atlas.pk"),
      B,
      T("mischief.pk"),
      L("karakoram.pk"),
      B,
      S("river"),
      H("mohenjodaro.pk"),
      B,
      H("skardu.pk")
    ]
  }
];
